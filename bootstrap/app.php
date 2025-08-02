<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

// Import your custom middlewares
use App\Http\Middleware\FinanceAdminMiddleware;
use App\Http\Middleware\ProductionAdminMiddleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Existing web middlewares
        $middleware->web(append: [
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);

        // Existing aliases + new aliases for Finance & Production
        $middleware->alias([
            'admin' => \App\Http\Middleware\EnsureUserIsAdmin::class,
            'approved' => \App\Http\Middleware\EnsureUserIsApproved::class,

            // ✅ New middleware aliases
            'financeAdmin' => FinanceAdminMiddleware::class,
            'productionAdmin' => ProductionAdminMiddleware::class,
        ]);
    })
    ->withCommands([
        \App\Console\Commands\MigrateReceiptsToBase64::class,
    ])
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
