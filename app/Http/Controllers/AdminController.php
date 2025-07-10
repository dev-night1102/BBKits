<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Services\PDFReportService;

class AdminController extends Controller
{
    public function dashboard()
    {
        if (auth()->user()->role !== 'admin' && auth()->user()->role !== 'financeiro') {
            abort(403, 'Unauthorized');
        }

        $currentMonth = Carbon::now()->format('Y-m');
        
        // Basic stats
        $stats = [
            'totalSellers' => User::where('role', 'vendedora')->count(),
            'monthlyRevenue' => Sale::where('status', 'aprovado')
                ->whereYear('payment_date', Carbon::now()->year)
                ->whereMonth('payment_date', Carbon::now()->month)
                ->sum('received_amount'),
            'pendingSales' => Sale::where('status', 'pendente')->count(),
            'approvedSales' => Sale::where('status', 'aprovado')
                ->whereYear('payment_date', Carbon::now()->year)
                ->whereMonth('payment_date', Carbon::now()->month)
                ->count(),
            'totalSalesCount' => Sale::whereYear('payment_date', Carbon::now()->year)
                ->whereMonth('payment_date', Carbon::now()->month)
                ->count(),
            'monthlyTarget' => 200000, // R$ 200k monthly target
        ];

        // Calculate monthly commissions
        $monthlyCommissions = Sale::where('status', 'aprovado')
            ->whereYear('payment_date', Carbon::now()->year)
            ->whereMonth('payment_date', Carbon::now()->month)
            ->get()
            ->sum(function ($sale) {
                $commissionBase = $sale->received_amount - $sale->shipping_amount;
                
                // Get seller's monthly total for commission calculation
                $sellerMonthlyTotal = Sale::where('user_id', $sale->user_id)
                    ->where('status', 'aprovado')
                    ->whereYear('payment_date', Carbon::now()->year)
                    ->whereMonth('payment_date', Carbon::now()->month)
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
            });

        $stats['monthlyCommissions'] = $monthlyCommissions;

        // Top performers this month
        $topPerformers = User::where('role', 'vendedora')
            ->withCount([
                'sales as sales_count' => function ($query) {
                    $query->where('status', 'aprovado')
                        ->whereYear('payment_date', Carbon::now()->year)
                        ->whereMonth('payment_date', Carbon::now()->month);
                }
            ])
            ->withSum([
                'sales as total_revenue' => function ($query) {
                    $query->where('status', 'aprovado')
                        ->whereYear('payment_date', Carbon::now()->year)
                        ->whereMonth('payment_date', Carbon::now()->month);
                }
            ], 'received_amount')
            // ->having('sales_count', '>', 0)
            ->orderBy('total_revenue', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($user) {
                // Calculate commission for each top performer
                $commissionBase = Sale::where('user_id', $user->id)
                    ->where('status', 'aprovado')
                    ->whereYear('payment_date', Carbon::now()->year)
                    ->whereMonth('payment_date', Carbon::now()->month)
                    ->sum(DB::raw('received_amount - shipping_amount'));
                
                if ($commissionBase >= 60000) {
                    $commission = $commissionBase * 0.04;
                } elseif ($commissionBase >= 50000) {
                    $commission = $commissionBase * 0.03;
                } elseif ($commissionBase >= 40000) {
                    $commission = $commissionBase * 0.02;
                } else {
                    $commission = 0;
                }
                
                $user->total_commission = $commission;
                return $user;
            });

        // Recent sales (last 10)
        $recentSales = Sale::with('user')
            ->latest()
            ->limit(10)
            ->get();

        // Monthly data for charts (last 6 months)
        $monthlyData = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $monthlyData[] = [
                'month' => $date->format('M Y'),
                'revenue' => Sale::where('status', 'aprovado')
                    ->whereYear('payment_date', $date->year)
                    ->whereMonth('payment_date', $date->month)
                    ->sum('received_amount'),
                'sales_count' => Sale::where('status', 'aprovado')
                    ->whereYear('payment_date', $date->year)
                    ->whereMonth('payment_date', $date->month)
                    ->count(),
            ];
        }

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'topPerformers' => $topPerformers,
            'recentSales' => $recentSales,
            'monthlyData' => $monthlyData,
        ]);
    }
    
    public function generateTeamReport(Request $request)
    {
        if (auth()->user()->role !== 'admin' && auth()->user()->role !== 'financeiro') {
            abort(403, 'Unauthorized');
        }
        
        $month = $request->get('month');
        $year = $request->get('year');
        
        $pdfService = new PDFReportService();
        return $pdfService->generateTeamReport($month, $year);
    }
}