<?php

namespace App\Services;

use App\Models\User;
use App\Models\Sale;
use App\Models\Notification;
use Illuminate\Support\Facades\Log;

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

    // New order lifecycle notifications with integrations

    /**
     * Notify when payment is approved and trigger WhatsApp
     */
    public function notifyPaymentApproved(Sale $sale)
    {
        try {
            // Send internal notification to seller
            $this->createNotification(
                $sale->user_id,
                'payment_approved',
                "Pagamento do pedido #{$sale->unique_token} foi aprovado! 🎉",
                ['sale_id' => $sale->id, 'order_token' => $sale->unique_token]
            );

            // Send WhatsApp notification to client
            $whatsAppService = app(WhatsAppService::class);
            $whatsAppResult = $whatsAppService->sendPaymentApproved($sale);
            
            if (!$whatsAppResult['success']) {
                Log::warning('WhatsApp payment approved notification failed', [
                    'sale_id' => $sale->id,
                    'error' => $whatsAppResult['message']
                ]);
            }

            return ['success' => true, 'whatsapp' => $whatsAppResult];
        } catch (\Exception $e) {
            Log::error('Payment approved notification error', [
                'sale_id' => $sale->id,
                'error' => $e->getMessage()
            ]);
            
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    /**
     * Notify when production starts and trigger WhatsApp
     */
    public function notifyProductionStarted(Sale $sale)
    {
        try {
            // Send internal notification to seller
            $this->createNotification(
                $sale->user_id,
                'production_started',
                "Produção do pedido #{$sale->unique_token} foi iniciada! 🏭",
                ['sale_id' => $sale->id, 'order_token' => $sale->unique_token]
            );

            // Send WhatsApp notification to client
            $whatsAppService = app(WhatsAppService::class);
            $whatsAppResult = $whatsAppService->sendProductionStarted($sale);
            
            if (!$whatsAppResult['success']) {
                Log::warning('WhatsApp production started notification failed', [
                    'sale_id' => $sale->id,
                    'error' => $whatsAppResult['message']
                ]);
            }

            return ['success' => true, 'whatsapp' => $whatsAppResult];
        } catch (\Exception $e) {
            Log::error('Production started notification error', [
                'sale_id' => $sale->id,
                'error' => $e->getMessage()
            ]);
            
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    /**
     * Notify when photo is sent for approval
     */
    public function notifyPhotoSent(Sale $sale)
    {
        try {
            // Send internal notification to seller
            $this->createNotification(
                $sale->user_id,
                'photo_sent',
                "Foto do pedido #{$sale->unique_token} enviada para aprovação! 📸",
                ['sale_id' => $sale->id, 'order_token' => $sale->unique_token]
            );

            // Send WhatsApp photo approval request to client
            $whatsAppService = app(WhatsAppService::class);
            $whatsAppResult = $whatsAppService->sendPhotoApprovalRequest($sale);
            
            if (!$whatsAppResult['success']) {
                Log::warning('WhatsApp photo approval request failed', [
                    'sale_id' => $sale->id,
                    'error' => $whatsAppResult['message']
                ]);
            }

            return ['success' => true, 'whatsapp' => $whatsAppResult];
        } catch (\Exception $e) {
            Log::error('Photo sent notification error', [
                'sale_id' => $sale->id,
                'error' => $e->getMessage()
            ]);
            
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    /**
     * Notify when order is shipped with Tiny ERP integration
     */
    public function notifyOrderShipped(Sale $sale)
    {
        try {
            // Generate invoice and shipping label via Tiny ERP
            $tinyErpService = app(TinyErpService::class);
            
            // Generate shipping label (will also create invoice if needed)
            $shippingResult = $tinyErpService->generateShippingLabel($sale);
            
            if (!$shippingResult['success']) {
                Log::warning('Tiny ERP shipping label generation failed', [
                    'sale_id' => $sale->id,
                    'error' => $shippingResult['message']
                ]);
            }

            // Send internal notification to seller
            $this->createNotification(
                $sale->user_id,
                'order_shipped',
                "Pedido #{$sale->unique_token} foi enviado! Código: {$sale->tracking_code} 🚚",
                [
                    'sale_id' => $sale->id,
                    'order_token' => $sale->unique_token,
                    'tracking_code' => $sale->tracking_code
                ]
            );

            // Send WhatsApp shipping notification to client
            $whatsAppService = app(WhatsAppService::class);
            $whatsAppResult = $whatsAppService->sendShippingNotification($sale);
            
            if (!$whatsAppResult['success']) {
                Log::warning('WhatsApp shipping notification failed', [
                    'sale_id' => $sale->id,
                    'error' => $whatsAppResult['message']
                ]);
            }

            return [
                'success' => true,
                'tiny_erp' => $shippingResult,
                'whatsapp' => $whatsAppResult
            ];
        } catch (\Exception $e) {
            Log::error('Order shipped notification error', [
                'sale_id' => $sale->id,
                'error' => $e->getMessage()
            ]);
            
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    /**
     * Notify when payment is rejected
     */
    public function notifyPaymentRejected(Sale $sale, $reason)
    {
        try {
            // Send internal notification to seller
            $this->createNotification(
                $sale->user_id,
                'payment_rejected',
                "Pagamento do pedido #{$sale->unique_token} foi rejeitado. Motivo: {$reason}",
                [
                    'sale_id' => $sale->id,
                    'order_token' => $sale->unique_token,
                    'reason' => $reason
                ]
            );

            // Send WhatsApp notification to client
            $whatsAppService = app(WhatsAppService::class);
            $whatsAppResult = $whatsAppService->sendPaymentRejected($sale, $reason);
            
            if (!$whatsAppResult['success']) {
                Log::warning('WhatsApp payment rejected notification failed', [
                    'sale_id' => $sale->id,
                    'error' => $whatsAppResult['message']
                ]);
            }

            return ['success' => true, 'whatsapp' => $whatsAppResult];
        } catch (\Exception $e) {
            Log::error('Payment rejected notification error', [
                'sale_id' => $sale->id,
                'error' => $e->getMessage()
            ]);
            
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    /**
     * Send order confirmation with WhatsApp
     */
    public function notifyOrderCreated(Sale $sale)
    {
        try {
            // Send internal notification to seller
            $this->createNotification(
                $sale->user_id,
                'order_created',
                "Novo pedido #{$sale->unique_token} criado para {$sale->client_name}! 🎉",
                ['sale_id' => $sale->id, 'order_token' => $sale->unique_token]
            );

            // Send WhatsApp confirmation to client
            $whatsAppService = app(WhatsAppService::class);
            $whatsAppResult = $whatsAppService->sendOrderConfirmation($sale);
            
            if (!$whatsAppResult['success']) {
                Log::warning('WhatsApp order confirmation failed', [
                    'sale_id' => $sale->id,
                    'error' => $whatsAppResult['message']
                ]);
            }

            return ['success' => true, 'whatsapp' => $whatsAppResult];
        } catch (\Exception $e) {
            Log::error('Order created notification error', [
                'sale_id' => $sale->id,
                'error' => $e->getMessage()
            ]);
            
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    /**
     * Send final payment reminder
     */
    public function notifyFinalPaymentReminder(Sale $sale)
    {
        try {
            // Send internal notification to seller
            $remainingAmount = $sale->getRemainingAmount();
            $this->createNotification(
                $sale->user_id,
                'final_payment_reminder',
                "Lembrete: Pedido #{$sale->unique_token} aguarda pagamento final de R$ " . number_format($remainingAmount, 2, ',', '.'),
                [
                    'sale_id' => $sale->id,
                    'order_token' => $sale->unique_token,
                    'remaining_amount' => $remainingAmount
                ]
            );

            // Send WhatsApp reminder to client
            $whatsAppService = app(WhatsAppService::class);
            $whatsAppResult = $whatsAppService->sendFinalPaymentReminder($sale);
            
            if (!$whatsAppResult['success']) {
                Log::warning('WhatsApp final payment reminder failed', [
                    'sale_id' => $sale->id,
                    'error' => $whatsAppResult['message']
                ]);
            }

            return ['success' => true, 'whatsapp' => $whatsAppResult];
        } catch (\Exception $e) {
            Log::error('Final payment reminder notification error', [
                'sale_id' => $sale->id,
                'error' => $e->getMessage()
            ]);
            
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
}