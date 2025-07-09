<?php

namespace App\Http\Controllers;

use App\Services\ExcelExportService;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ExportController extends Controller
{
    protected $excelService;

    public function __construct(ExcelExportService $excelService)
    {
        $this->excelService = $excelService;
    }

    public function exportSales(Request $request)
    {
        $month = $request->input('month', Carbon::now()->month);
        $year = $request->input('year', Carbon::now()->year);

        $csv = $this->excelService->exportSalesReport($month, $year);

        $filename = 'vendas_' . Carbon::create($year, $month)->format('Y_m') . '.csv';

        return response($csv)
            ->header('Content-Type', 'text/csv; charset=UTF-8')
            ->header('Content-Disposition', 'attachment; filename="' . $filename . '"')
            ->header('Content-Encoding', 'UTF-8');
    }

    public function exportCommissions(Request $request)
    {
        $month = $request->input('month', Carbon::now()->month);
        $year = $request->input('year', Carbon::now()->year);

        $csv = $this->excelService->exportCommissionsReport($month, $year);

        $filename = 'comissoes_' . Carbon::create($year, $month)->format('Y_m') . '.csv';

        return response($csv)
            ->header('Content-Type', 'text/csv; charset=UTF-8')
            ->header('Content-Disposition', 'attachment; filename="' . $filename . '"')
            ->header('Content-Encoding', 'UTF-8');
    }
}