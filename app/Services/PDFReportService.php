<?php

namespace App\Services;

use App\Models\User;
use App\Models\Sale;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;

class PDFReportService
{
    public function generateSalesReport(User $user, string $month = null, string $year = null): string
    {
        $month = $month ?? Carbon::now()->month;
        $year = $year ?? Carbon::now()->year;
        $monthName = Carbon::create($year, $month)->translatedFormat('F Y');

        $sales = Sale::where('user_id', $user->id)
            ->whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->with(['user', 'approvedBy', 'rejectedBy'])
            ->orderBy('payment_date', 'desc')
            ->get();

        $summary = [
            'total_sales' => $sales->count(),
            'approved_sales' => $sales->where('status', 'aprovado')->count(),
            'pending_sales' => $sales->where('status', 'pendente')->count(),
            'rejected_sales' => $sales->where('status', 'recusado')->count(),
            'total_revenue' => $sales->where('status', 'aprovado')->sum('received_amount'),
            'commission_base' => $sales->where('status', 'aprovado')->sum(function($sale) {
                return $sale->received_amount - $sale->shipping_amount;
            }),
            'commission_earned' => $this->calculateCommission($user, $month, $year),
        ];

        $data = [
            'user' => $user,
            'sales' => $sales,
            'summary' => $summary,
            'month_name' => $monthName,
            'generated_at' => now()->format('d/m/Y H:i'),
        ];

        $pdf = PDF::loadView('reports.sales', $data)
                  ->setPaper('a4', 'portrait');

        $filename = "relatorio_vendas_{$user->name}_{$month}_{$year}.pdf";
        
        return $pdf->download($filename);
    }

    public function generateCommissionReport(User $user, string $month = null, string $year = null): string
    {
        $month = $month ?? Carbon::now()->month;
        $year = $year ?? Carbon::now()->year;
        $monthName = Carbon::create($year, $month)->translatedFormat('F Y');

        $sales = Sale::where('user_id', $user->id)
            ->where('status', 'aprovado')
            ->whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->with('user')
            ->orderBy('payment_date', 'desc')
            ->get();

        $commissionDetails = [];
        $totalCommissionBase = 0;
        $totalCommission = 0;

        foreach ($sales as $sale) {
            $commissionBase = $sale->received_amount - $sale->shipping_amount;
            $totalCommissionBase += $commissionBase;
            
            $commissionDetails[] = [
                'sale' => $sale,
                'commission_base' => $commissionBase,
                'commission_rate' => $this->getCommissionRate($totalCommissionBase),
                'commission_amount' => $commissionBase * $this->getCommissionRate($totalCommissionBase),
            ];
        }

        $totalCommission = $this->calculateCommission($user, $month, $year);

        $data = [
            'user' => $user,
            'commission_details' => $commissionDetails,
            'total_commission_base' => $totalCommissionBase,
            'total_commission' => $totalCommission,
            'commission_rate' => $this->getCommissionRate($totalCommissionBase),
            'month_name' => $monthName,
            'generated_at' => now()->format('d/m/Y H:i'),
        ];

        $pdf = PDF::loadView('reports.commission', $data)
                  ->setPaper('a4', 'portrait');

        $filename = "relatorio_comissoes_{$user->name}_{$month}_{$year}.pdf";
        
        return $pdf->download($filename);
    }

    public function generateTeamReport(string $month = null, string $year = null): string
    {
        $month = $month ?? Carbon::now()->month;
        $year = $year ?? Carbon::now()->year;
        $monthName = Carbon::create($year, $month)->translatedFormat('F Y');

        $teamData = User::where('role', 'vendedora')
            ->withCount([
                'sales as total_sales' => function ($query) use ($month, $year) {
                    $query->whereYear('payment_date', $year)
                          ->whereMonth('payment_date', $month);
                },
                'sales as approved_sales' => function ($query) use ($month, $year) {
                    $query->where('status', 'aprovado')
                          ->whereYear('payment_date', $year)
                          ->whereMonth('payment_date', $month);
                }
            ])
            ->withSum([
                'sales as total_revenue' => function ($query) use ($month, $year) {
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
            ->orderBy('total_revenue', 'desc')
            ->get()
            ->map(function ($user) use ($month, $year) {
                $user->commission_earned = $this->calculateCommission($user, $month, $year);
                $user->commission_rate = $this->getCommissionRate($user->commission_base ?? 0);
                return $user;
            });

        $teamSummary = [
            'total_sellers' => $teamData->count(),
            'total_sales' => $teamData->sum('total_sales'),
            'total_approved_sales' => $teamData->sum('approved_sales'),
            'total_revenue' => $teamData->sum('total_revenue'),
            'total_commissions' => $teamData->sum('commission_earned'),
            'avg_sales_per_seller' => $teamData->count() > 0 ? round($teamData->sum('total_sales') / $teamData->count(), 1) : 0,
            'top_performer' => $teamData->first(),
        ];

        $data = [
            'team_data' => $teamData,
            'team_summary' => $teamSummary,
            'month_name' => $monthName,
            'generated_at' => now()->format('d/m/Y H:i'),
        ];

        $pdf = PDF::loadView('reports.team', $data)
                  ->setPaper('a4', 'landscape');

        $filename = "relatorio_equipe_{$month}_{$year}.pdf";
        
        return $pdf->download($filename);
    }

    private function calculateCommission(User $user, int $month, int $year): float
    {
        $commissionBase = Sale::where('user_id', $user->id)
            ->where('status', 'aprovado')
            ->whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->sum(DB::raw('received_amount - shipping_amount'));

        return $commissionBase * $this->getCommissionRate($commissionBase);
    }

    private function getCommissionRate(float $commissionBase): float
    {
        if ($commissionBase >= 60000) {
            return 0.04; // 4%
        } elseif ($commissionBase >= 50000) {
            return 0.03; // 3%
        } elseif ($commissionBase >= 40000) {
            return 0.02; // 2%
        }
        
        return 0; // No commission below R$40k
    }
}