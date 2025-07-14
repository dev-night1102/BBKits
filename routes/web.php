<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminReportsController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\Admin\CommissionRangeController;
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
        $currentMonth = now()->month;
        $currentYear = now()->year;
        
        if ($user->role === 'vendedora') {
            // Get commission service instance
            $commissionService = app(\App\Services\CommissionService::class);
            
            // Get real sales data for the user
            $monthlySalesCount = $user->sales()
                ->whereYear('payment_date', $currentYear)
                ->whereMonth('payment_date', $currentMonth)
                ->count();
                
            $approvedSalesCount = $user->sales()
                ->whereYear('payment_date', $currentYear)
                ->whereMonth('payment_date', $currentMonth)
                ->where('status', 'aprovado')
                ->count();
                
            $approvedSalesTotal = $user->sales()
                ->whereYear('payment_date', $currentYear)
                ->whereMonth('payment_date', $currentMonth)
                ->where('status', 'aprovado')
                ->sum('received_amount');
                
            $monthlyCommission = $user->getMonthlyCommissionTotal($currentMonth, $currentYear);
            $monthlySalesTotal = $user->getMonthlySalesTotal($currentMonth, $currentYear);
            
            // Get recent sales for the user  
            $recentSales = $user->sales()
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get();
                
            // Add debugging
            \Log::info('Sales Debug', [
                'user_id' => $user->id,
                'total_sales' => $user->sales()->count(),
                'recent_sales_count' => $recentSales->count(),
                'monthly_total' => $monthlySalesTotal,
                'first_sale' => $user->sales()->first()
            ]);
            
            // Get comprehensive monthly progress including commission insights
            $monthlyProgress = $commissionService->getMonthlyProgress($user, $currentMonth, $currentYear);
            
            return Inertia::render('Dashboard', [
                'salesData' => [
                    'monthlySalesCount' => $monthlySalesCount,
                    'approvedSalesCount' => $approvedSalesCount,
                    'approvedSalesTotal' => $approvedSalesTotal,
                    'monthlyCommission' => $monthlyCommission,
                    'monthlySalesTotal' => $monthlySalesTotal,
                    'monthlyGoal' => $monthlyProgress['remaining_to_goal'] + $monthlySalesTotal,
                    'progressPercentage' => round($monthlyProgress['progress_percentage'], 1),
                    'currentRate' => $monthlyProgress['current_rate'],
                    'nextBracket' => $monthlyProgress['next_bracket'],
                    'potentialEarnings' => $monthlyProgress['potential_earnings'],
                    'opportunityAlert' => $monthlyProgress['opportunity_alert'],
                    'commissionRanges' => $monthlyProgress['commission_ranges']
                ],
                'recentSales' => $recentSales,
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
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::resource('sales', SaleController::class);
    
    // Admin routes
    Route::middleware('admin')->group(function () {
        Route::get('/admin/sales', [SaleController::class, 'adminIndex'])->name('admin.sales.index');
        Route::post('/admin/sales/{sale}/approve', [SaleController::class, 'approve'])->name('admin.sales.approve');
        Route::post('/admin/sales/{sale}/reject', [SaleController::class, 'reject'])->name('admin.sales.reject');
        
        // Queue-based approval routes with fallback
        Route::post('/admin/sales/{sale}/approve-queue', [SaleController::class, 'approveWithQueue'])->name('admin.sales.approve.queue');
        Route::post('/admin/sales/{sale}/reject-queue', [SaleController::class, 'rejectWithQueue'])->name('admin.sales.reject.queue');
        Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
        
        // Reports routes
        Route::get('/admin/reports', [AdminReportsController::class, 'index'])->name('admin.reports.index');
        Route::get('/admin/reports/team', [AdminController::class, 'generateTeamReport'])->name('admin.reports.team');
        
        // Excel Export routes
        Route::get('/admin/export/sales', [ExportController::class, 'exportSales'])->name('admin.export.sales');
        Route::get('/admin/export/commissions', [ExportController::class, 'exportCommissions'])->name('admin.export.commissions');
        
        // Commission Range Management routes
        Route::get('/admin/commission-ranges', [CommissionRangeController::class, 'index'])->name('admin.commission-ranges.index');
        Route::post('/admin/commission-ranges', [CommissionRangeController::class, 'store'])->name('admin.commission-ranges.store');
        Route::put('/admin/commission-ranges/{commissionRange}', [CommissionRangeController::class, 'update'])->name('admin.commission-ranges.update');
        Route::delete('/admin/commission-ranges/{commissionRange}', [CommissionRangeController::class, 'destroy'])->name('admin.commission-ranges.destroy');
    });
    
    // Sales report routes (accessible by sales users for their own reports)
    Route::get('/reports/sales', [SaleController::class, 'generateSalesReport'])->name('reports.sales');
    Route::get('/reports/commission', [SaleController::class, 'generateCommissionReport'])->name('reports.commission');
    
    // Notification routes
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::get('/notifications/unread-count', [NotificationController::class, 'unreadCount'])->name('notifications.unread-count');
    Route::post('/notifications/{notification}/read', [NotificationController::class, 'markAsRead'])->name('notifications.mark-as-read');
    Route::post('/notifications/mark-all-read', [NotificationController::class, 'markAllAsRead'])->name('notifications.mark-all-read');
    
    // Test PDF route (temporary for debugging)
    Route::get('/test-pdf', function () {
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('test-pdf');
        return $pdf->download('test-bbkits.pdf');
    })->name('test.pdf');
});

require __DIR__.'/auth.php';
