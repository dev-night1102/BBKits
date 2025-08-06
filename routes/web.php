<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\SalePaymentController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminReportsController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\Admin\CommissionRangeController;
use App\Http\Controllers\FineController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    try {
        $user = auth()->user();

        if ($user->isFinanceAdmin()) {
            return redirect()->route('finance.dashboard');
        }

        if ($user->isProductionAdmin()) {
            return redirect()->route('production.dashboard');
        }

        $currentMonth = now()->month;
        $currentYear = now()->year;

        if ($user->role === 'vendedora') {
            $commissionService = app(\App\Services\CommissionService::class);
            $allMonthlySales = $user->sales()->whereYear('payment_date', $currentYear)->whereMonth('payment_date', $currentMonth)->get();

            $approvedSales = $allMonthlySales->where('status', 'aprovado');
            $pendingSales = $allMonthlySales->where('status', 'pendente');

            $monthlySalesCount = $allMonthlySales->count();
            $approvedSalesCount = $approvedSales->count();

            $totalSalesAmount = $allMonthlySales->sum(fn($sale) => $sale->hasPartialPayments() ? $sale->total_amount : $sale->received_amount);
            $approvedSalesTotal = $approvedSales->sum(fn($sale) => $sale->hasPartialPayments() ? $sale->getTotalPaidAmount() : $sale->received_amount);
            $pendingSalesTotal = $pendingSales->sum(fn($sale) => $sale->hasPartialPayments() ? $sale->getTotalPendingAmount() : $sale->received_amount);
            $totalShipping = $allMonthlySales->sum('shipping_amount');
            $commissionBase = $approvedSales->sum(fn($sale) => $sale->getCommissionBaseAmount());

            $monthlyCommission = $user->getMonthlyCommissionTotal($currentMonth, $currentYear);
            $monthlySalesTotal = $user->getMonthlySalesTotal($currentMonth, $currentYear);

            $recentSales = $user->sales()->orderBy('created_at', 'desc')->limit(5)->get();
            $monthlyProgress = $commissionService->getMonthlyProgress($user, $currentMonth, $currentYear);

            $defaultGoal = 40000;
            $calculatedGoal = $monthlyProgress['remaining_to_goal'] + $monthlySalesTotal;
            $actualGoal = max($defaultGoal, $calculatedGoal);
            $progressPercentage = $actualGoal > 0 ? round(($totalSalesAmount / $actualGoal) * 100, 1) : 0;

            return Inertia::render('Dashboard', [
                'salesData' => [
                    'monthlySalesCount' => $monthlySalesCount,
                    'approvedSalesCount' => $approvedSalesCount,
                    'totalSalesAmount' => $totalSalesAmount,
                    'approvedSalesTotal' => $approvedSalesTotal,
                    'pendingSalesTotal' => $pendingSalesTotal,
                    'totalShipping' => $totalShipping,
                    'commissionBase' => $commissionBase,
                    'monthlyCommission' => $monthlyCommission,
                    'monthlySalesTotal' => $monthlySalesTotal,
                    'monthlyGoal' => $actualGoal,
                    'progressPercentage' => $progressPercentage,
                    'currentRate' => $monthlyProgress['current_rate'],
                    'nextBracket' => $monthlyProgress['next_bracket'],
                    'potentialEarnings' => $monthlyProgress['potential_earnings'],
                    'opportunityAlert' => $monthlyProgress['opportunity_alert'],
                    'commissionRanges' => $monthlyProgress['commission_ranges']
                ],
                'recentSales' => $recentSales,
                'allMonthlySales' => $allMonthlySales,
                'gamification' => [
                    'level' => [
                        'level' => 1,
                        'icon' => '🌟',
                        'message' => 'Vendedora Iniciante - Pronta para brilhar!',
                        'progress' => 25
                    ],
                    'motivationalQuote' => 'Cada venda é uma história de amor que você ajuda a criar. Continue brilhando!',
                    'achievements' => [],
                    'ranking' => [],
                    'userPosition' => 1
                ]
            ]);
        }

        return Inertia::render('Dashboard');
    } catch (\Exception $e) {
        \Log::error('Dashboard Error: ' . $e->getMessage());
        return Inertia::render('Dashboard');
    }
})->middleware(['auth', 'verified', 'approved'])->name('dashboard');

Route::get('/pending-approval', fn() => Inertia::render('Auth/PendingApproval'))->middleware('auth')->name('pending-approval');

Route::get('/pedido/{token}', [SaleController::class, 'clientPage'])->name('sales.client-page');
Route::post('/pedido/{token}/update-address', [SaleController::class, 'clientUpdateAddress'])->name('sales.client.update-address');
Route::post('/pedido/{token}/upload-payment', [SaleController::class, 'clientUploadPayment'])->name('sales.client.upload-payment');
Route::post('/pedido/{token}/approve-photo', [SaleController::class, 'clientApprovePhoto'])->name('sales.client.approve-photo');

Route::middleware(['auth', 'approved'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/sales/create-expanded', [SaleController::class, 'createExpanded'])->name('sales.create-expanded');
    Route::resource('sales', SaleController::class);

    Route::get('/sales/{sale}/payments', [SalePaymentController::class, 'index'])->name('payments.index');
    Route::post('/sales/{sale}/payments', [SalePaymentController::class, 'store'])->name('payments.store');
    Route::put('/payments/{payment}/approve', [SalePaymentController::class, 'approve'])->name('payments.approve');
    Route::put('/payments/{payment}/reject', [SalePaymentController::class, 'reject'])->name('payments.reject');
    Route::delete('/payments/{payment}', [SalePaymentController::class, 'destroy'])->name('payments.destroy');

    Route::middleware(['finance.access'])->prefix('finance')->name('finance.')->group(function () {
        Route::get('/orders', [\App\Http\Controllers\FinanceController::class, 'ordersIndex'])->name('orders.index');
        Route::post('/orders/{sale}/approve', [\App\Http\Controllers\FinanceController::class, 'approveOrder'])->name('orders.approve');
        Route::post('/orders/{sale}/reject', [\App\Http\Controllers\FinanceController::class, 'rejectOrder'])->name('orders.reject');
        Route::get('/dashboard', [\App\Http\Controllers\FinanceController::class, 'dashboard'])->name('dashboard');
    });

    Route::middleware(['production.access'])->prefix('production')->name('production.')->group(function () {
        Route::get('/orders', [\App\Http\Controllers\ProductionController::class, 'ordersIndex'])->name('orders.index');
        Route::post('/orders/{sale}/start', [\App\Http\Controllers\ProductionController::class, 'startProduction'])->name('orders.start');
        Route::post('/orders/{sale}/upload-photo', [\App\Http\Controllers\ProductionController::class, 'uploadPhoto'])->name('orders.upload-photo');
        Route::post('/orders/{sale}/generate-shipping', [\App\Http\Controllers\ProductionController::class, 'generateShippingLabel'])->name('orders.generate-shipping');
        Route::get('/dashboard', [\App\Http\Controllers\ProductionController::class, 'dashboard'])->name('dashboard');
    });

    // ... rest of your admin, reports, notification, test-pdf routes ...
});

require __DIR__.'/auth.php';
