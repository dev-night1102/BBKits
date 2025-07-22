<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sale extends Model
{
    protected $fillable = [
        'user_id',
        'client_name',
        'total_amount',
        'shipping_amount',
        'payment_method',
        'received_amount',
        'payment_date',
        'payment_receipt',
        'receipt_data',
        'notes',
        'status',
        'admin_notes',
        'approved_by',
        'approved_at',
        'rejected_by',
        'rejected_at',
        'rejection_reason',
        'corrected_by',
        'corrected_at',
        'correction_reason',
        'original_status'
    ];

    protected $casts = [
        'payment_date' => 'date',
        'approved_at' => 'datetime',
        'rejected_at' => 'datetime',
        'corrected_at' => 'datetime',
        'total_amount' => 'decimal:2',
        'shipping_amount' => 'decimal:2',
        'received_amount' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
    
    public function rejectedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'rejected_by');
    }

    public function getCommissionBaseAmount(): float
    {
        // If sale has payment records, use the approved payments total
        if ($this->hasPartialPayments()) {
            return $this->getTotalPaidAmount() - $this->shipping_amount;
        }
        
        // Fallback to original received_amount for backward compatibility
        return $this->received_amount - $this->shipping_amount;
    }

    public function isPending(): bool
    {
        return $this->status === 'pendente';
    }

    public function isApproved(): bool
    {
        return $this->status === 'aprovado';
    }

    public function isRejected(): bool
    {
        return $this->status === 'recusado';
    }

    public function getReceiptUrl(): ?string
    {
        // If we have base64 data, return it as data URL
        if ($this->receipt_data) {
            return $this->receipt_data;
        }
        
        // Fallback to file path if it exists
        if ($this->payment_receipt) {
            return asset('storage/' . $this->payment_receipt);
        }
        
        return null;
    }

    public function hasReceipt(): bool
    {
        return !empty($this->receipt_data) || !empty($this->payment_receipt);
    }

    // Payment relationships and methods
    public function payments(): HasMany
    {
        return $this->hasMany(SalePayment::class);
    }

    public function approvedPayments(): HasMany
    {
        return $this->hasMany(SalePayment::class)->where('status', 'approved');
    }

    public function pendingPayments(): HasMany
    {
        return $this->hasMany(SalePayment::class)->where('status', 'pending');
    }

    public function getTotalPaidAmount(): float
    {
        return $this->approvedPayments()->sum('amount');
    }

    public function getTotalPendingAmount(): float
    {
        return $this->pendingPayments()->sum('amount');
    }

    public function getRemainingAmount(): float
    {
        return $this->total_amount - $this->getTotalPaidAmount();
    }

    public function isFullyPaid(): bool
    {
        return $this->getTotalPaidAmount() >= $this->total_amount;
    }

    public function hasPartialPayments(): bool
    {
        return $this->payments()->count() > 0;
    }

    public function getPaymentProgress(): float
    {
        if ($this->total_amount <= 0) {
            return 0;
        }
        return ($this->getTotalPaidAmount() / $this->total_amount) * 100;
    }

    public function getPaymentStatus(): string
    {
        if ($this->isFullyPaid()) {
            return 'fully_paid';
        } elseif ($this->getTotalPaidAmount() > 0) {
            return 'partially_paid';
        } else {
            return 'unpaid';
        }
    }

    // Override the original commission base calculation for partial payments
    public function getCommissionBaseAmountForPayments(): float
    {
        if (!$this->isFullyPaid()) {
            return 0; // No commission until fully paid
        }
        return $this->getTotalPaidAmount() - $this->shipping_amount;
    }
}
