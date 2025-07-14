<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isVendedora(): bool
    {
        return $this->role === 'vendedora';
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isFinanceiro(): bool
    {
        return $this->role === 'financeiro';
    }

    public function hasRole(string $role): bool
    {
        return $this->role === $role;
    }

    public function sales(): HasMany
    {
        return $this->hasMany(Sale::class);
    }

    public function commissions(): HasMany
    {
        return $this->hasMany(Commission::class);
    }

    public function getMonthlyCommissionTotal(int $month, int $year): float
    {
        return $this->commissions()
            ->where('month', $month)
            ->where('year', $year)
            ->sum('commission_amount');
    }

    public function getMonthlySalesTotal(int $month, int $year): float
    {
        return $this->sales()
            ->whereYear('payment_date', $year)
            ->whereMonth('payment_date', $month)
            ->where('status', 'aprovado')
            ->sum('received_amount');
    }
}
