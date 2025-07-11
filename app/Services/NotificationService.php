<?php

namespace App\Services;

use App\Models\User;
use App\Models\Sale;
use App\Models\Notification;

class NotificationService
{
    public function notifySaleApproved(Sale $sale)
    {
        $this->createNotification(
            $sale->user_id,
            'sale_approved',
            "Sua venda para {$sale->nome_cliente} foi aprovada! 🎉",
            ['sale_id' => $sale->id]
        );
    }

    public function notifySaleRejected(Sale $sale, $reason = null)
    {
        $message = "Sua venda para {$sale->nome_cliente} foi recusada.";
        if ($reason) {
            $message .= " Motivo: {$reason}";
        }

        $this->createNotification(
            $sale->user_id,
            'sale_rejected',
            $message,
            ['sale_id' => $sale->id, 'reason' => $reason]
        );
    }

    public function notifyNewSale(Sale $sale)
    {
        $admins = User::whereIn('role', ['admin', 'financeiro'])->get();
        
        foreach ($admins as $admin) {
            $vendedoraName = $sale->vendedora?->name ?? 'usuário desconhecido';

            $this->createNotification(
                $admin->id,
                'new_sale',
                "Nova venda registrada por {$vendedoraName} 📋",
                ['sale_id' => $sale->id]
            );
        }
    }

    public function notifyGoalReached(User $user, $goal)
    {
        $this->createNotification(
            $user->id,
            'goal_reached',
            "Parabéns! Você atingiu {$goal}% da sua meta! 🎯",
            ['goal_percentage' => $goal]
        );
    }

    protected function createNotification($userId, $type, $message, $data = [])
    {
        return Notification::create([
            'user_id' => $userId,
            'type' => $type,
            'message' => $message,
            'data' => json_encode($data),
            'read' => false
        ]);
    }

    public function markAsRead($notificationId, $userId)
    {
        Notification::where('id', $notificationId)
            ->where('user_id', $userId)
            ->update(['read' => true]);
    }

    public function markAllAsRead($userId)
    {
        Notification::where('user_id', $userId)
            ->where('read', false)
            ->update(['read' => true]);
    }

    public function getUserNotifications($userId, $limit = 10)
    {
        return Notification::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    public function getUnreadCount($userId)
    {
        return Notification::where('user_id', $userId)
            ->where('read', false)
            ->count();
    }
}