<?php

namespace App\Services;

use App\Models\User;
use App\Models\Sale;
use App\Models\Commission;
use App\Models\CommissionRange;

class CommissionService
{
    const COMPANY_GOAL = 220000;
    const INDIVIDUAL_MINIMUM = 40000;

    public function calculateCommissionRate(float $monthlyTotal): float
    {
        if ($monthlyTotal < self::INDIVIDUAL_MINIMUM) {
            return 0;
        }

        // Get active commission ranges from database
        $range = CommissionRange::active()
            ->ordered()
            ->where('min_amount', '<=', $monthlyTotal)
            ->where(function ($query) use ($monthlyTotal) {
                $query->where('max_amount', '>=', $monthlyTotal)
                      ->orWhereNull('max_amount');
            })
            ->first();

        return $range ? $range->percentage : 0;
    }

    public function getCommissionRanges()
    {
        return CommissionRange::active()->ordered()->get();
    }

    public function getNextCommissionBracket(float $currentAmount): ?array
    {
        if ($currentAmount < self::INDIVIDUAL_MINIMUM) {
            return [
                'min_amount' => self::INDIVIDUAL_MINIMUM,
                'amount_needed' => self::INDIVIDUAL_MINIMUM - $currentAmount,
                'percentage' => $this->calculateCommissionRate(self::INDIVIDUAL_MINIMUM),
            ];
        }

        $nextRange = CommissionRange::active()
            ->ordered()
            ->where('min_amount', '>', $currentAmount)
            ->first();

        if ($nextRange) {
            return [
                'min_amount' => $nextRange->min_amount,
                'amount_needed' => $nextRange->min_amount - $currentAmount,
                'percentage' => $nextRange->percentage,
            ];
        }

        return null;
    }

    public function calculatePotentialEarnings(float $currentAmount, float $additionalAmount): array
    {
        $newTotal = $currentAmount + $additionalAmount;
        
        $currentRate = $this->calculateCommissionRate($currentAmount);
        $newRate = $this->calculateCommissionRate($newTotal);
        
        $currentCommission = $currentAmount * ($currentRate / 100);
        $newCommission = $newTotal * ($newRate / 100);
        
        return [
            'current_commission' => $currentCommission,
            'new_commission' => $newCommission,
            'additional_commission' => $newCommission - $currentCommission,
            'current_rate' => $currentRate,
            'new_rate' => $newRate,
        ];
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

        // Get next bracket info
        $nextBracket = $this->getNextCommissionBracket($monthlyTotal);
        
        // Calculate potential earnings for different scenarios
        $potentialEarnings = null;
        if ($nextBracket) {
            $potentialEarnings = $this->calculatePotentialEarnings(
                $monthlyTotal, 
                $nextBracket['amount_needed']
            );
        }

        // Get opportunity alert
        $opportunityAlert = null;
        if ($monthlyTotal < self::INDIVIDUAL_MINIMUM) {
            $amountNeeded = self::INDIVIDUAL_MINIMUM - $monthlyTotal;
            $potentialCommission = self::INDIVIDUAL_MINIMUM * 0.02; // 2% minimum
            $opportunityAlert = [
                'message' => "Se você atingir R$ " . number_format(self::INDIVIDUAL_MINIMUM, 2, ',', '.') . 
                           " até o final do mês, você poderá ganhar R$ " . 
                           number_format($potentialCommission, 2, ',', '.') . 
                           " de comissão! Não perca essa chance!",
                'amount_needed' => $amountNeeded,
                'potential_commission' => $potentialCommission,
            ];
        }

        return [
            'monthly_total' => $monthlyTotal,
            'commission_total' => $commission,
            'progress_percentage' => min($progress, 100),
            'remaining_to_goal' => max(self::INDIVIDUAL_MINIMUM - $monthlyTotal, 0),
            'current_rate' => $this->calculateCommissionRate($monthlyTotal),
            'next_bracket' => $nextBracket,
            'potential_earnings' => $potentialEarnings,
            'opportunity_alert' => $opportunityAlert,
            'commission_ranges' => $this->getCommissionRanges(),
        ];
    }
}
