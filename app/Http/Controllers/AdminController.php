<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Services\PDFReportService;
use App\Services\CommissionService;

class AdminController extends Controller
{
    public function dashboard()
    {
        if (auth()->user()->role !== 'admin' && auth()->user()->role !== 'financeiro') {
            abort(403, 'Unauthorized');
        }

        $commissionService = new CommissionService();
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;
        
        // Basic stats
        $stats = [
            'totalSellers' => User::where('role', 'vendedora')->count(),
            'monthlyRevenue' => Sale::where('status', 'aprovado')
                ->whereYear('payment_date', $currentYear)
                ->whereMonth('payment_date', $currentMonth)
                ->sum('received_amount'),
            'pendingSales' => Sale::where('status', 'pendente')->count(),
            'approvedSales' => Sale::where('status', 'aprovado')
                ->whereYear('payment_date', $currentYear)
                ->whereMonth('payment_date', $currentMonth)
                ->count(),
            'totalSalesCount' => Sale::whereYear('payment_date', $currentYear)
                ->whereMonth('payment_date', $currentMonth)
                ->count(),
            'monthlyTarget' => 200000, // R$ 200k monthly target
        ];

        // Calculate monthly commissions using CommissionService
        $monthlyCommissions = 0;
        $sellers = User::where('role', 'vendedora')->get();
        
        foreach ($sellers as $seller) {
            $sellerMonthlyTotal = Sale::where('user_id', $seller->id)
                ->where('status', 'aprovado')
                ->whereYear('payment_date', $currentYear)
                ->whereMonth('payment_date', $currentMonth)
                ->get()
                ->sum(function ($sale) {
                    return ($sale->received_amount ?: 0) - ($sale->shipping_amount ?: 0);
                });
            
            $commissionRate = $commissionService->calculateCommissionRate($sellerMonthlyTotal);
            $monthlyCommissions += $sellerMonthlyTotal * ($commissionRate / 100);
        }

        $stats['monthlyCommissions'] = $monthlyCommissions;

        // Top performers this month
        $topPerformers = User::where('role', 'vendedora')
            ->withCount([
                'sales as sales_count' => function ($query) use ($currentYear, $currentMonth) {
                    $query->where('status', 'aprovado')
                        ->whereYear('payment_date', $currentYear)
                        ->whereMonth('payment_date', $currentMonth);
                }
            ])
            ->withSum([
                'sales as total_revenue' => function ($query) use ($currentYear, $currentMonth) {
                    $query->where('status', 'aprovado')
                        ->whereYear('payment_date', $currentYear)
                        ->whereMonth('payment_date', $currentMonth);
                }
            ], 'received_amount')
            // ->having('sales_count', '>', 0)
            ->orderBy('total_revenue', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($user) use ($commissionService, $currentYear, $currentMonth) {
                // Calculate commission for each top performer using CommissionService
                $commissionBase = Sale::where('user_id', $user->id)
                    ->where('status', 'aprovado')
                    ->whereYear('payment_date', $currentYear)
                    ->whereMonth('payment_date', $currentMonth)
                    ->get()
                    ->sum(function ($sale) {
                        return ($sale->received_amount ?: 0) - ($sale->shipping_amount ?: 0);
                    });
                
                $commissionRate = $commissionService->calculateCommissionRate($commissionBase);
                $commission = $commissionBase * ($commissionRate / 100);
                
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