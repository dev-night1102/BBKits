<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\AdminController;
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
    if (auth()->user()->role === 'vendedora') {
        $gamificationService = new \App\Services\GamificationService();
        $gamificationData = $gamificationService->getGamificationData(auth()->user());
        
        return Inertia::render('Dashboard', [
            'gamification' => $gamificationData
        ]);
    }
    
    return Inertia::render('Dashboard');
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
        Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
        
        // PDF Report routes
        Route::get('/admin/reports/team', [AdminController::class, 'generateTeamReport'])->name('admin.reports.team');
    });
    
    // Sales report routes (accessible by sales users for their own reports)
    Route::get('/reports/sales', [SaleController::class, 'generateSalesReport'])->name('reports.sales');
    Route::get('/reports/commission', [SaleController::class, 'generateCommissionReport'])->name('reports.commission');
    
    // Test PDF route (temporary for debugging)
    Route::get('/test-pdf', function () {
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('test-pdf');
        return $pdf->download('test-bbkits.pdf');
    })->name('test.pdf');
});

require __DIR__.'/auth.php';
