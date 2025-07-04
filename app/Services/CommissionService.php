<?php

namespace App\Services;

use App\Models\User;
use App\Models\Sale;
use App\Models\Commission;

class CommissionService
{
    const COMMISSION_TIERS = [
        40000 => 2,
        50000 => 3,
        60000 => 4,
    ];

    const COMPANY_GOAL = 220000;
    const INDIVIDUAL_MINIMUM = 40000;

    public function calculateCommissionRate(float $monthlyTotal): float
    {
        if ($monthlyTotal < self::INDIVIDUAL_MINIMUM) {
            return 0;
        }

        foreach (self::COMMISSION_TIERS as $threshold => $rate) {
            if ($monthlyTotal >= $threshold) {
                $currentRate = $rate;
            }
        }

        return $currentRate ?? 0;
    }

    public function createCommissionForSale(Sale $sale): ?Commission
    {
        if (!$sale->isApproved()) {
            return null;
        }

        $month = $sale->payment_date->month;
        $year = $sale->payment_date->year;
        
        $monthlyTotal = $sale->user->getMonthlySalesTotal($month, $year);
        $commissionRate = $this->calculateCommissionRate($monthlyTotal);
        
        if ($commissionRate === 0) {
            return null;
        }

        $baseAmount = $sale->getCommissionBaseAmount();
        $commissionAmount = $baseAmount * ($commissionRate / 100);

        return Commission::create([
            'user_id' => $sale->user_id,
            'sale_id' => $sale->id,
            'commission_rate' => $commissionRate,
            'commission_amount' => $commissionAmount,
            'base_amount' => $baseAmount,
            'month' => $month,
            'year' => $year
        ]);
    }

    public function recalculateMonthlyCommissions(User $user, int $month, int $year): void
    {
        $user->commissions()
            ->where('month', $month)
            ->where('year', $year)
            ->delete();

        $sales = $user->sales()
            ->whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->where('status', 'aprovado')
            ->get();

        foreach ($sales as $sale) {
            $this->createCommissionForSale($sale);
        }
    }

    public function getMonthlyProgress(User $user, int $month, int $year): array
    {
        $monthlyTotal = $user->getMonthlySalesTotal($month, $year);
        $commission = $user->getMonthlyCommissionTotal($month, $year);
        $progress = ($monthlyTotal / self::INDIVIDUAL_MINIMUM) * 100;

        return [
            'monthly_total' => $monthlyTotal,
            'commission_total' => $commission,
            'progress_percentage' => min($progress, 100),
            'remaining_to_goal' => max(self::INDIVIDUAL_MINIMUM - $monthlyTotal, 0),
            'current_rate' => $this->calculateCommissionRate($monthlyTotal),
        ];
    }
}
