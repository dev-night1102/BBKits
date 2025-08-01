<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductionController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!auth()->user()->canManageProduction()) {
                abort(403, 'Unauthorized');
            }
            return $next($request);
        });
    }

    public function ordersIndex(Request $request)
    {
        $statusFilter = $request->get('status', 'all');
        
        $query = Sale::with(['user', 'financeAdmin', 'productionAdmin']);
        
        // Filter based on status
        switch ($statusFilter) {
            case 'payment_approved':
                $query->where('order_status', 'payment_approved');
                break;
            case 'in_production':
                $query->where('order_status', 'in_production');
                break;
            case 'photo_sent':
                $query->where('order_status', 'photo_sent');
                break;
            case 'ready_for_shipping':
                $query->where('order_status', 'ready_for_shipping');
                break;
            case 'all':
            default:
                $query->whereIn('order_status', [
                    'payment_approved', 
                    'in_production', 
                    'photo_sent',
                    'ready_for_shipping'
                ]);
                break;
        }
        
        $orders = $query->latest()->get();
        
        return Inertia::render('Production/OrdersIndex', [
            'orders' => $orders,
            'statusFilter' => $statusFilter
        ]);
    }

    public function startProduction(Sale $sale)
    {
        if ($sale->order_status !== 'payment_approved') {
            return back()->withErrors(['error' => 'Pedido não está pronto para produção']);
        }
        
        try {
            $sale->update([
                'order_status' => 'in_production',
                'production_admin_id' => auth()->id(),
                'production_started_at' => now()
            ]);
            
            Log::info('Production started', [
                'order_id' => $sale->id,
                'production_admin_id' => auth()->id()
            ]);
            
            // Notify client
            $notificationService = app(\App\Services\NotificationService::class);
            $notificationService->notifyProductionStarted($sale);
            
            return back()->with('message', 'Produção iniciada com sucesso!');
            
        } catch (\Exception $e) {
            Log::error('Failed to start production', [
                'order_id' => $sale->id,
                'error' => $e->getMessage()
            ]);
            
            return back()->withErrors(['error' => 'Erro ao iniciar produção']);
        }
    }

    public function uploadPhoto(Request $request, Sale $sale)
    {
        if ($sale->order_status !== 'in_production') {
            return back()->withErrors(['error' => 'Pedido não está em produção']);
        }
        
        $validated = $request->validate([
            'product_photo' => 'required|file|mimes:jpeg,png,jpg|max:5120', // 5MB max
            'notes' => 'nullable|string|max:1000'
        ]);
        
        try {
            DB::beginTransaction();
            
            if ($request->hasFile('product_photo')) {
                $file = $request->file('product_photo');
                $fileContent = file_get_contents($file->getRealPath());
                $mimeType = $file->getMimeType();
                
                // Store as base64 data URL for easy display
                $photoData = 'data:' . $mimeType . ';base64,' . base64_encode($fileContent);
                
                // Also store file for backup
                $photoPath = $file->store('product_photos', 'public');
                
                $sale->update([
                    'product_photo_data' => $photoData,
                    'product_photo' => $photoPath,
                    'order_status' => 'photo_sent',
                    'photo_sent_at' => now(),
                    'notes' => $validated['notes'] ?? $sale->notes
                ]);
            }
            
            DB::commit();
            
            Log::info('Product photo uploaded', [
                'order_id' => $sale->id,
                'production_admin_id' => auth()->id()
            ]);
            
            // Notify client
            $notificationService = app(\App\Services\NotificationService::class);
            $notificationService->notifyPhotoSent($sale);
            
            return back()->with('message', 'Foto enviada para aprovação da cliente!');
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Failed to upload product photo', [
                'order_id' => $sale->id,
                'error' => $e->getMessage()
            ]);
            
            return back()->withErrors(['error' => 'Erro ao enviar foto']);
        }
    }

    public function generateShippingLabel(Sale $sale)
    {
        if ($sale->order_status !== 'ready_for_shipping') {
            return back()->withErrors(['error' => 'Pedido não está pronto para envio']);
        }
        
        try {
            // Generate tracking code
            $trackingCode = 'BB' . str_pad($sale->id, 6, '0', STR_PAD_LEFT) . 'BR';
            
            // Generate invoice number
            $invoiceNumber = 'NF-' . date('Y') . '-' . str_pad($sale->id, 6, '0', STR_PAD_LEFT);
            
            $sale->update([
                'tracking_code' => $trackingCode,
                'invoice_number' => $invoiceNumber,
                'order_status' => 'shipped',
                'shipped_at' => now()
            ]);
            
            Log::info('Shipping label generated', [
                'order_id' => $sale->id,
                'tracking_code' => $trackingCode,
                'invoice_number' => $invoiceNumber
            ]);
            
            // Notify client
            $notificationService = app(\App\Services\NotificationService::class);
            $notificationService->notifyOrderShipped($sale);
            
            return back()->with('message', 'Etiqueta de envio gerada! Código: ' . $trackingCode);
            
        } catch (\Exception $e) {
            Log::error('Failed to generate shipping label', [
                'order_id' => $sale->id,
                'error' => $e->getMessage()
            ]);
            
            return back()->withErrors(['error' => 'Erro ao gerar etiqueta de envio']);
        }
    }

    public function dashboard()
    {
        $paymentApproved = Sale::where('order_status', 'payment_approved')->count();
        $inProduction = Sale::where('order_status', 'in_production')->count();
        $photoSent = Sale::where('order_status', 'photo_sent')->count();
        $readyForShipping = Sale::where('order_status', 'ready_for_shipping')->count();
        
        $myProductions = Sale::where('production_admin_id', auth()->id())
                            ->whereDate('production_started_at', '>=', now()->subDays(30))
                            ->count();
        
        $recentOrders = Sale::with(['user'])
                           ->whereIn('order_status', ['payment_approved', 'in_production', 'photo_sent', 'ready_for_shipping'])
                           ->latest()
                           ->limit(10)
                           ->get();
        
        return Inertia::render('Production/Dashboard', [
            'stats' => [
                'payment_approved' => $paymentApproved,
                'in_production' => $inProduction,
                'photo_sent' => $photoSent,
                'ready_for_shipping' => $readyForShipping,
                'my_productions' => $myProductions
            ],
            'recent_orders' => $recentOrders
        ]);
    }
}