<?php

namespace App\Services;

use App\Models\Sale;
use App\Models\User;
use Carbon\Carbon;

class ExcelExportService
{
    public function exportSalesReport($month = null, $year = null)
    {
        $month = $month ?: Carbon::now()->month;
        $year = $year ?: Carbon::now()->year;

        $sales = Sale::with(['vendedora', 'financialApprover'])
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->orderBy('created_at', 'desc')
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
            $csv[] = [
                $sale->id,
                $sale->created_at->format('d/m/Y H:i'),
                $sale->vendedora->name,
                $sale->nome_cliente,
                'R$ ' . number_format($sale->valor_total, 2, ',', '.'),
                'R$ ' . number_format($sale->valor_frete, 2, ',', '.'),
                'R$ ' . number_format($sale->valor_total - $sale->valor_frete, 2, ',', '.'),
                $sale->forma_pagamento,
                $this->getStatusLabel($sale->status),
                $sale->commission ? 'R$ ' . number_format($sale->commission->value, 2, ',', '.') : '-',
                $sale->financialApprover ? $sale->financialApprover->name : '-',
                $sale->approved_at ? Carbon::parse($sale->approved_at)->format('d/m/Y H:i') : '-'
            ];
        }

        $csv[] = [];
        $csv[] = ['Resumo por Vendedora'];
        $csv[] = ['Vendedora', 'Total Vendido', 'Total Aprovado', 'Comissões', 'Meta Atingida'];

        $vendedoras = User::where('role', 'vendedora')->get();
        foreach ($vendedoras as $vendedora) {
            $vendedoraSales = $sales->where('user_id', $vendedora->id);
            $totalVendido = $vendedoraSales->sum('valor_total');
            $totalAprovado = $vendedoraSales->where('status', 'approved')->sum('valor_total');
            $totalComissao = $vendedoraSales->sum(function ($sale) {
                return $sale->commission ? $sale->commission->value : 0;
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
                $query->whereMonth('created_at', $month)
                    ->whereYear('created_at', $year)
                    ->where('status', 'approved')
                    ->with('commission');
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
            $totalAprovado = $vendedora->sales->sum('valor_total');
            $totalBase = $vendedora->sales->sum(function ($sale) {
                return $sale->valor_total - $sale->valor_frete;
            });
            $totalComissao = $vendedora->sales->sum(function ($sale) {
                return $sale->commission ? $sale->commission->value : 0;
            });

            $faixa = $this->getCommissionTier($totalAprovado);
            $percentual = $this->getCommissionPercentage($totalAprovado);

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
                return $s->commission ? $s->commission->value : 0;
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
            'pending' => 'Pendente',
            'approved' => 'Aprovado',
            'rejected' => 'Rejeitado',
            default => $status
        };
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