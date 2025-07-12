<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
        'rejection_reason'
    ];

    protected $casts = [
        'payment_date' => 'date',
        'approved_at' => 'datetime',
        'rejected_at' => 'datetime',
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
}
