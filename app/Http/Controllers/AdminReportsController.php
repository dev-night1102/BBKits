<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminReportsController extends Controller
{
    public function index(Request $request)
    {
        if (auth()->user()->role !== 'admin' && auth()->user()->role !== 'financeiro') {
            abort(403, 'Unauthorized');
        }

        $month = $request->input('month', Carbon::now()->month);
        $year = $request->input('year', Carbon::now()->year);

        // Get sales data by seller
        $salesData = $this->getSalesDataBySeller($month, $year);
        
        // Get commission data
        $commissionData = $this->getCommissionData($month, $year);
        
        // Get total statistics
        $totalStats = $this->getTotalStatistics($month, $year);

        return Inertia::render('Admin/Reports/Index', [
            'salesData' => $salesData,
            'commissionData' => $commissionData,
            'totalStats' => $totalStats,
            'currentMonth' => $month,
            'currentYear' => $year,
        ]);
    }

    private function getSalesDataBySeller($month, $year)
    {
        $sellers = User::where('role', 'vendedora')
            ->withCount([
                'sales as total_sales_count' => function ($query) use ($month, $year) {
                    $query->whereYear('payment_date', $year)
                        ->whereMonth('payment_date', $month);
                },
                'sales as approved_sales_count' => function ($query) use ($month, $year) {
                    $query->where('status', 'aprovado')
                        ->whereYear('payment_date', $year)
                        ->whereMonth('payment_date', $month);
                }
            ])
            ->withSum([
                'sales as total_amount' => function ($query) use ($month, $year) {
                    $query->whereYear('payment_date', $year)
                        ->whereMonth('payment_date', $month);
                }
            ], 'total_amount')
            ->withSum([
                'sales as approved_amount' => function ($query) use ($month, $year) {
                    $query->where('status', 'aprovado')
                        ->whereYear('payment_date', $year)
                        ->whereMonth('payment_date', $month);
                }
            ], 'received_amount')
            ->withSum([
                'sales as commission_base' => function ($query) use ($month, $year) {
                    $query->where('status', 'aprovado')
                        ->whereYear('payment_date', $year)
                        ->whereMonth('payment_date', $month);
                }
            ], DB::raw('received_amount - shipping_amount'))
            ->get()
            ->map(function ($seller) use ($month, $year) {
                $commissionBase = $seller->commission_base ?: 0;
                $commission = $this->calculateCommissionForSeller($seller->id, $month, $year);
                
                return [
                    'id' => $seller->id,
                    'name' => $seller->name,
                    'email' => $seller->email,
                    'salesCount' => $seller->total_sales_count,
                    'approvedSalesCount' => $seller->approved_sales_count,
                    'totalSales' => $seller->total_amount ?: 0,
                    'approvedSales' => $seller->approved_amount ?: 0,
                    'commissionBase' => $commissionBase,
                    'totalCommission' => $commission,
                    'commissionRate' => $this->getCommissionRate($commissionBase),
                    'level' => $this->getPerformanceLevel($commissionBase),
                    'metaAchieved' => $commissionBase >= 40000
                ];
            });

        return $sellers;
    }

    private function getCommissionData($month, $year)
    {
        $commissions = Sale::where('status', 'aprovado')
            ->whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->with('user')
            ->get()
            ->groupBy('user_id')
            ->map(function ($sales, $userId) {
                $user = $sales->first()->user;
                $totalBase = $sales->sum(function ($sale) {
                    return $sale->received_amount - $sale->shipping_amount;
                });
                
                $totalCommission = $sales->sum(function ($sale) {
                    return $this->calculateSaleCommission($sale);
                });

                return [
                    'user_id' => $userId,
                    'user_name' => $user->name,
                    'total_base' => $totalBase,
                    'total_commission' => $totalCommission,
                    'commission_rate' => $this->getCommissionRate($totalBase),
                    'sales_count' => $sales->count(),
                ];
            });

        return $commissions->values();
    }

    private function getTotalStatistics($month, $year)
    {
        $totalSellers = User::where('role', 'vendedora')->count();
        
        $totalSales = Sale::whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->sum('received_amount');
            
        $approvedSales = Sale::where('status', 'aprovado')
            ->whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->sum('received_amount');
            
        $totalCommissions = Sale::where('status', 'aprovado')
            ->whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->get()
            ->sum(function ($sale) {
                return $this->calculateSaleCommission($sale);
            });

        $sellersWithMeta = User::where('role', 'vendedora')
            ->whereHas('sales', function ($query) use ($month, $year) {
                $query->where('status', 'aprovado')
                    ->whereYear('payment_date', $year)
                    ->whereMonth('payment_date', $month);
            })
            ->get()
            ->filter(function ($user) use ($month, $year) {
                $totalBase = Sale::where('user_id', $user->id)
                    ->where('status', 'aprovado')
                    ->whereYear('payment_date', $year)
                    ->whereMonth('payment_date', $month)
                    ->sum(DB::raw('received_amount - shipping_amount'));
                return $totalBase >= 40000;
            })
            ->count();

        return [
            'totalSellers' => $totalSellers,
            'totalSales' => $totalSales,
            'approvedSales' => $approvedSales,
            'totalCommissions' => $totalCommissions,
            'metaAchieved' => $sellersWithMeta,
            'approvalRate' => $totalSales > 0 ? ($approvedSales / $totalSales) * 100 : 0,
        ];
    }

    private function calculateCommissionForSeller($sellerId, $month, $year)
    {
        $sellerSales = Sale::where('user_id', $sellerId)
            ->where('status', 'aprovado')
            ->whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->get();

        $totalBase = $sellerSales->sum(function ($sale) {
            return $sale->received_amount - $sale->shipping_amount;
        });

        $rate = $this->getCommissionRate($totalBase);
        
        return $totalBase * ($rate / 100);
    }

    private function calculateSaleCommission($sale)
    {
        if ($sale->status !== 'aprovado') {
            return 0;
        }

        $commissionBase = $sale->received_amount - $sale->shipping_amount;
        
        // Get seller's monthly total for commission calculation
        $paymentDate = Carbon::parse($sale->payment_date);
        $sellerMonthlyTotal = Sale::where('user_id', $sale->user_id)
            ->where('status', 'aprovado')
            ->whereYear('payment_date', $paymentDate->year)
            ->whereMonth('payment_date', $paymentDate->month)
            ->sum(DB::raw('received_amount - shipping_amount'));
        
        // Commission tiers based on monthly total
        if ($sellerMonthlyTotal >= 60000) {
            return $commissionBase * 0.04; // 4%
        } elseif ($sellerMonthlyTotal >= 50000) {
            return $commissionBase * 0.03; // 3%
        } elseif ($sellerMonthlyTotal >= 40000) {
            return $commissionBase * 0.02; // 2%
        }
        
        return 0; // No commission if below R$40k
    }

    private function getCommissionRate($totalBase)
    {
        if ($totalBase >= 60000) {
            return 4;
        } elseif ($totalBase >= 50000) {
            return 3;
        } elseif ($totalBase >= 40000) {
            return 2;
        }
        
        return 0;
    }

    private function getPerformanceLevel($totalBase)
    {
        if ($totalBase >= 60000) {
            return 'Elite';
        } elseif ($totalBase >= 50000) {
            return 'Avançada';
        } elseif ($totalBase >= 40000) {
            return 'Intermediária';
        }
        
        return 'Iniciante';
    }
}