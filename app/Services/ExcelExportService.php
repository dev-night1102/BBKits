<?php

namespace App\Services;

use App\Models\Sale;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Services\CommissionService;

class ExcelExportService
{
    public function exportSalesReport($month = null, $year = null)
    {
        $month = $month ?: Carbon::now()->month;
        $year = $year ?: Carbon::now()->year;

        $sales = Sale::with(['user', 'approvedBy'])
            ->whereMonth('payment_date', $month)
            ->whereYear('payment_date', $year)
            ->orderBy('payment_date', 'desc')
            ->get();

        $csv = [];
        $csv[] = ['Relatório de Vendas - ' . Carbon::create($year, $month)->format('F Y')];
        $csv[] = [];
        $csv[] = [
            'ID',
            'Data',
            'Vendedora',
            'Cliente',
            'Valor Total',
            'Frete',
            'Valor Líquido',
            'Forma de Pagamento',
            'Status',
            'Comissão',
            'Aprovado Por',
            'Data Aprovação'
        ];

        foreach ($sales as $sale) {
            $commissionValue = $this->calculateCommission($sale);
            $csv[] = [
                $sale->id,
                $sale->payment_date->format('d/m/Y'),
                $sale->user->name,
                $sale->client_name,
                'R$ ' . number_format($sale->total_amount, 2, ',', '.'),
                'R$ ' . number_format($sale->shipping_amount, 2, ',', '.'),
                'R$ ' . number_format($sale->received_amount, 2, ',', '.'),
                $sale->payment_method,
                $this->getStatusLabel($sale->status),
                $commissionValue > 0 ? 'R$ ' . number_format($commissionValue, 2, ',', '.') : '-',
                $sale->approvedBy ? $sale->approvedBy->name : '-',
                $sale->approved_at ? $sale->approved_at->format('d/m/Y H:i') : '-'
            ];
        }

        $csv[] = [];
        $csv[] = ['Resumo por Vendedora'];
        $csv[] = ['Vendedora', 'Total Vendido', 'Total Aprovado', 'Comissões', 'Meta Atingida'];

        $vendedoras = User::where('role', 'vendedora')->get();
        foreach ($vendedoras as $vendedora) {
            $vendedoraSales = $sales->where('user_id', $vendedora->id);
            $totalVendido = $vendedoraSales->sum('received_amount');
            $totalAprovado = $vendedoraSales->where('status', 'aprovado')->sum('received_amount');
            $totalComissao = $vendedoraSales->where('status', 'aprovado')->sum(function ($sale) {
                return $this->calculateCommission($sale);
            });

            $csv[] = [
                $vendedora->name,
                'R$ ' . number_format($totalVendido, 2, ',', '.'),
                'R$ ' . number_format($totalAprovado, 2, ',', '.'),
                'R$ ' . number_format($totalComissao, 2, ',', '.'),
                $totalAprovado >= 40000 ? 'Sim' : 'Não'
            ];
        }

        return $this->arrayToCsv($csv);
    }

    public function exportCommissionsReport($month = null, $year = null)
    {
        $month = $month ?: Carbon::now()->month;
        $year = $year ?: Carbon::now()->year;

        $vendedoras = User::where('role', 'vendedora')
            ->with(['sales' => function ($query) use ($month, $year) {
                $query->whereMonth('payment_date', $month)
                    ->whereYear('payment_date', $year)
                    ->where('status', 'aprovado');
            }])
            ->get();

        $csv = [];
        $csv[] = ['Relatório de Comissões - ' . Carbon::create($year, $month)->format('F Y')];
        $csv[] = [];
        $csv[] = [
            'Vendedora',
            'Total Vendido Aprovado',
            'Total Base (sem frete)',
            'Faixa de Comissão',
            'Percentual',
            'Valor da Comissão'
        ];

        foreach ($vendedoras as $vendedora) {
            $totalAprovado = $vendedora->sales->sum('received_amount');
            $totalBase = $vendedora->sales->sum(function ($sale) {
                return $sale->received_amount - $sale->shipping_amount;
            });
            $totalComissao = $vendedora->sales->sum(function ($sale) {
                return $this->calculateCommission($sale);
            });

            $faixa = $this->getCommissionTier($totalBase);
            $percentual = $this->getCommissionPercentage($totalBase);

            $csv[] = [
                $vendedora->name,
                'R$ ' . number_format($totalAprovado, 2, ',', '.'),
                'R$ ' . number_format($totalBase, 2, ',', '.'),
                $faixa,
                $percentual . '%',
                'R$ ' . number_format($totalComissao, 2, ',', '.')
            ];
        }

        $csv[] = [];
        $csv[] = ['Total Geral', '', '', '', '', 'R$ ' . number_format($vendedoras->sum(function ($v) {
            return $v->sales->sum(function ($s) {
                return $this->calculateCommission($s);
            });
        }), 2, ',', '.')];

        return $this->arrayToCsv($csv);
    }

    private function arrayToCsv(array $data)
    {
        $output = fopen('php://temp', 'r+');

        foreach ($data as $row) {
            fputcsv($output, $row, ';');
        }

        rewind($output);
        $csv = stream_get_contents($output);
        fclose($output);

        return $csv;
    }

    private function getStatusLabel($status)
    {
        return match($status) {
            'pendente' => 'Pendente',
            'aprovado' => 'Aprovado',
            'recusado' => 'Recusado',
            default => $status
        };
    }

    private function calculateCommission($sale)
    {
        if ($sale->status !== 'aprovado') {
            return 0;
        }

        $commissionBase = $sale->received_amount - $sale->shipping_amount;
        
        // Get seller's monthly total for commission calculation
        $sellerMonthlyTotal = Sale::where('user_id', $sale->user_id)
            ->where('status', 'aprovado')
            ->whereYear('payment_date', $sale->payment_date->year)
            ->whereMonth('payment_date', $sale->payment_date->month)
            ->get()
            ->sum(function ($s) {
                return ($s->received_amount ?: 0) - ($s->shipping_amount ?: 0);
            });
        
        // Use CommissionService for rate calculation
        $commissionService = new CommissionService();
        $rate = $commissionService->calculateCommissionRate($sellerMonthlyTotal);
        
        return $commissionBase * ($rate / 100);
    }

    private function getCommissionTier($total)
    {
        if ($total < 40000) return 'Sem comissão';
        if ($total < 50000) return 'R$ 40.000 - R$ 49.999';
        if ($total < 60000) return 'R$ 50.000 - R$ 59.999';
        return 'R$ 60.000+';
    }

    private function getCommissionPercentage($total)
    {
        if ($total < 40000) return 0;
        if ($total < 50000) return 2;
        if ($total < 60000) return 3;
        return 4;
    }
}