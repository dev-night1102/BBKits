<?php

namespace App\Observers;

use App\Models\Sale;
use Illuminate\Support\Str;

class SaleObserver
{
    /**
     * Handle the Sale "creating" event.
     */
    public function creating(Sale $sale): void
    {
        // Generate unique token for personalized client page
        if (!$sale->unique_token) {
            do {
                $token = Str::random(32);
            } while (Sale::where('unique_token', $token)->exists());
            
            $sale->unique_token = $token;
        }
    }
}