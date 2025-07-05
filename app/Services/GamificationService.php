<?php

namespace App\Services;

use App\Models\User;
use App\Models\Sale;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class GamificationService
{
    private array $motivationalQuotes = [
        "Você não vende bolsas. Você entrega histórias, segurança e amor. 💼👶",
        "Cada venda é uma oportunidade de transformar a vida de uma família. ✨",
        "Sua determinação hoje constrói o futuro dos seus sonhos! 🌟",
        "Vendedoras BBKits não desistem - elas inspiram! 💪",
        "Uma mãe feliz com sua BBKit é a melhor propaganda que existe! 😊",
        "Você está ajudando a criar memórias preciosas para toda a vida! 💕",
        "Cada 'não' te aproxima de um grande 'sim'! Continue! 🔥",
        "Seu trabalho toca vidas e transforma histórias! 👑",
        "BBKits: Mais que bolsas, são companheiras de jornada! 🌈",
        "Você é uma embaixadora da qualidade e do amor materno! 💖",
        "Grandes vendas começam com grande paixão pelo que você faz! ⭐",
        "Cada cliente satisfeita é uma nova amiga da BBKits! 🤝",
        "Sua energia positiva é contagiante - use isso a seu favor! ⚡",
        "BBKits confia em você porque você faz a diferença! 🏆",
        "Transforme cada conversa em uma oportunidade de ouro! 💰"
    ];

    private array $achievements = [
        'primeira_venda' => [
            'name' => 'Primeiro Passo',
            'description' => 'Realizou sua primeira venda!',
            'icon' => '🎯',
            'color' => 'green'
        ],
        'vendedora_mes' => [
            'name' => 'Vendedora do Mês',
            'description' => 'Foi a vendedora que mais vendeu este mês!',
            'icon' => '👑',
            'color' => 'yellow'
        ],
        'meta_40k' => [
            'name' => 'Destravou Comissão',
            'description' => 'Atingiu R$ 40.000 em vendas mensais!',
            'icon' => '🔓',
            'color' => 'blue'
        ],
        'meta_50k' => [
            'name' => 'Subiu de Nível',
            'description' => 'Atingiu R$ 50.000 em vendas mensais!',
            'icon' => '📈',
            'color' => 'purple'
        ],
        'meta_60k' => [
            'name' => 'Vendedora Elite',
            'description' => 'Atingiu R$ 60.000 em vendas mensais!',
            'icon' => '💎',
            'color' => 'pink'
        ],
        'sequencia_5' => [
            'name' => 'Em Chamas',
            'description' => '5 vendas aprovadas consecutivas!',
            'icon' => '🔥',
            'color' => 'red'
        ],
        'cliente_fiel' => [
            'name' => 'Fidelizadora',
            'description' => 'Cliente comprou novamente com você!',
            'icon' => '💝',
            'color' => 'indigo'
        ]
    ];

    public function getRandomMotivationalQuote(): string
    {
        return $this->motivationalQuotes[array_rand($this->motivationalQuotes)];
    }

    public function getUserLevel(User $user): array
    {
        $monthlyTotal = $this->getMonthlyTotal($user);
        
        if ($monthlyTotal >= 60000) {
            return [
                'level' => 'Elite',
                'icon' => '💎',
                'color' => 'from-pink-500 to-purple-600',
                'progress' => 100,
                'nextTarget' => null,
                'message' => 'Parabéns! Você atingiu o nível máximo!'
            ];
        } elseif ($monthlyTotal >= 50000) {
            return [
                'level' => 'Avançada',
                'icon' => '📈',
                'color' => 'from-purple-500 to-indigo-600',
                'progress' => (($monthlyTotal - 50000) / 10000) * 100,
                'nextTarget' => 60000,
                'message' => 'Quase Elite! Faltam ' . number_format(60000 - $monthlyTotal, 2, ',', '.') . ' para o próximo nível!'
            ];
        } elseif ($monthlyTotal >= 40000) {
            return [
                'level' => 'Intermediária',
                'icon' => '🔓',
                'color' => 'from-blue-500 to-purple-600',
                'progress' => (($monthlyTotal - 40000) / 10000) * 100,
                'nextTarget' => 50000,
                'message' => 'Você desbloqueou comissões! Próxima meta: R$ 50.000'
            ];
        } else {
            return [
                'level' => 'Iniciante',
                'icon' => '🎯',
                'color' => 'from-green-500 to-blue-600',
                'progress' => ($monthlyTotal / 40000) * 100,
                'nextTarget' => 40000,
                'message' => 'Continue vendendo para desbloquear comissões!'
            ];
        }
    }

    public function getMonthlyRanking(): array
    {
        $users = User::where('role', 'vendedora')
            ->withSum([
                'sales as monthly_total' => function ($query) {
                    $query->where('status', 'aprovado')
                        ->whereYear('payment_date', Carbon::now()->year)
                        ->whereMonth('payment_date', Carbon::now()->month);
                }
            ], DB::raw('received_amount - shipping_amount'))
            ->withCount([
                'sales as monthly_sales_count' => function ($query) {
                    $query->where('status', 'aprovado')
                        ->whereYear('payment_date', Carbon::now()->year)
                        ->whereMonth('payment_date', Carbon::now()->month);
                }
            ])
            ->having('monthly_total', '>', 0)
            ->orderBy('monthly_total', 'desc')
            ->get()
            ->map(function ($user, $index) {
                $level = $this->getUserLevel($user);
                return [
                    'position' => $index + 1,
                    'user' => $user,
                    'monthly_total' => $user->monthly_total ?? 0,
                    'monthly_sales_count' => $user->monthly_sales_count ?? 0,
                    'level' => $level,
                    'badge' => $this->getPositionBadge($index + 1)
                ];
            });

        return $users->toArray();
    }

    public function getUserAchievements(User $user): array
    {
        $achievements = [];
        $monthlyTotal = $this->getMonthlyTotal($user);
        $salesCount = $this->getMonthlySalesCount($user);

        // Primeira venda
        if ($salesCount > 0) {
            $achievements[] = $this->achievements['primeira_venda'];
        }

        // Metas de valor
        if ($monthlyTotal >= 40000) {
            $achievements[] = $this->achievements['meta_40k'];
        }
        if ($monthlyTotal >= 50000) {
            $achievements[] = $this->achievements['meta_50k'];
        }
        if ($monthlyTotal >= 60000) {
            $achievements[] = $this->achievements['meta_60k'];
        }

        // Vendedora do mês
        $ranking = $this->getMonthlyRanking();
        if (!empty($ranking) && $ranking[0]['user']->id === $user->id) {
            $achievements[] = $this->achievements['vendedora_mes'];
        }

        return $achievements;
    }

    public function getGamificationData(User $user): array
    {
        return [
            'level' => $this->getUserLevel($user),
            'achievements' => $this->getUserAchievements($user),
            'motivationalQuote' => $this->getRandomMotivationalQuote(),
            'ranking' => $this->getMonthlyRanking(),
            'userPosition' => $this->getUserPosition($user),
        ];
    }

    private function getMonthlyTotal(User $user): float
    {
        return $user->sales()
            ->where('status', 'aprovado')
            ->whereYear('payment_date', Carbon::now()->year)
            ->whereMonth('payment_date', Carbon::now()->month)
            ->sum(DB::raw('received_amount - shipping_amount')) ?? 0;
    }

    private function getMonthlySalesCount(User $user): int
    {
        return $user->sales()
            ->where('status', 'aprovado')
            ->whereYear('payment_date', Carbon::now()->year)
            ->whereMonth('payment_date', Carbon::now()->month)
            ->count();
    }

    private function getUserPosition(User $user): int
    {
        $ranking = $this->getMonthlyRanking();
        foreach ($ranking as $position => $data) {
            if ($data['user']->id === $user->id) {
                return $position + 1;
            }
        }
        return 0; // Not in ranking
    }

    private function getPositionBadge(int $position): array
    {
        switch ($position) {
            case 1:
                return ['icon' => '🥇', 'color' => 'text-yellow-500', 'name' => 'Ouro'];
            case 2:
                return ['icon' => '🥈', 'color' => 'text-gray-400', 'name' => 'Prata'];
            case 3:
                return ['icon' => '🥉', 'color' => 'text-orange-600', 'name' => 'Bronze'];
            default:
                return ['icon' => '🏅', 'color' => 'text-blue-500', 'name' => 'Top ' . $position];
        }
    }
}