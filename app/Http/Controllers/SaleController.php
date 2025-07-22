<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Services\PDFReportService;
use App\Services\NotificationService;
use App\Services\CommissionService;
use App\Jobs\ProcessSaleApproval;

class SaleController extends Controller
{
    protected $notificationService;
    protected $commissionService;

    public function __construct(NotificationService $notificationService, CommissionService $commissionService)
    {
        $this->notificationService = $notificationService;
        $this->commissionService = $commissionService;
    }

    public function index()
    {
        $sales = Sale::with('user')
            ->where('user_id', auth()->id())
            ->latest()
            ->paginate(10);

        return Inertia::render('Sales/Index', [
            'sales' => $sales
        ]);
    }

    public function create()
    {
        return Inertia::render('Sales/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'total_amount' => 'required|numeric|min:0',
            'shipping_amount' => 'required|numeric|min:0',
            'payment_method' => 'required|in:pix,boleto,cartao,dinheiro',
            'received_amount' => 'required|numeric|min:0',
            'payment_date' => 'required|date',
            'payment_receipt' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048',
            'notes' => 'nullable|string'
        ]);

        if ($request->hasFile('payment_receipt')) {
            $file = $request->file('payment_receipt');
            $fileContent = file_get_contents($file->getRealPath());
            $mimeType = $file->getMimeType();
            
            // Store as base64 data URL
            $validated['receipt_data'] = 'data:' . $mimeType . ';base64,' . base64_encode($fileContent);
            
            // Still store the file path for backward compatibility
            $validated['payment_receipt'] = $request->file('payment_receipt')->store('receipts', 'public');
        }

        $validated['user_id'] = auth()->id();
        $validated['status'] = 'pendente';

        $sale = Sale::create($validated);
        
        $this->notificationService->notifyNewSale($sale);

        return redirect()->route('sales.index')->with('message', 'Venda registrada com sucesso!');
    }

    public function show(Sale $sale)
    {
        $this->authorize('view', $sale);
        
        return Inertia::render('Sales/Show', [
            'sale' => $sale->load(['user', 'approvedBy', 'rejectedBy'])
        ]);
    }

    public function edit(Sale $sale)
    {
        $this->authorize('update', $sale);

        return Inertia::render('Sales/Edit', [
            'sale' => $sale
        ]);
    }

    public function update(Request $request, Sale $sale)
    {
        $this->authorize('update', $sale);

        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'total_amount' => 'required|numeric|min:0',
            'shipping_amount' => 'required|numeric|min:0',
            'payment_method' => 'required|in:pix,boleto,cartao,dinheiro',
            'received_amount' => 'required|numeric|min:0',
            'payment_date' => 'required|date',
            'payment_receipt' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048',
            'notes' => 'nullable|string'
        ]);

        if ($request->hasFile('payment_receipt')) {
            $file = $request->file('payment_receipt');
            $fileContent = file_get_contents($file->getRealPath());
            $mimeType = $file->getMimeType();
            
            // Store as base64 data URL
            $validated['receipt_data'] = 'data:' . $mimeType . ';base64,' . base64_encode($fileContent);
            
            // Delete old file if exists
            if ($sale->payment_receipt) {
                Storage::disk('public')->delete($sale->payment_receipt);
            }
            
            // Still store the file path for backward compatibility
            $validated['payment_receipt'] = $request->file('payment_receipt')->store('receipts', 'public');
        }

        $sale->update($validated);

        return redirect()->route('sales.index')->with('message', 'Venda atualizada com sucesso!');
    }

    public function destroy(Sale $sale)
    {
        $this->authorize('delete', $sale);

        if ($sale->payment_receipt) {
            Storage::disk('public')->delete($sale->payment_receipt);
        }

        $sale->delete();

        return redirect()->route('sales.index')->with('message', 'Venda excluída com sucesso!');
    }
    
    // Admin methods
    public function adminIndex()
    {
        if (auth()->user()->role !== 'admin' && auth()->user()->role !== 'financeiro') {
            abort(403, 'Unauthorized');
        }
        
        $sales = Sale::with(['user', 'approvedBy', 'rejectedBy'])
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Sales/Index', [
            'sales' => $sales
        ]);
    }
    
    public function approve(Sale $sale)
    {
        if (auth()->user()->role !== 'admin' && auth()->user()->role !== 'financeiro') {
            abort(403, 'Unauthorized');
        }
        
        try {
            DB::beginTransaction();
            
            // Verify sale is still pending
            if ($sale->status !== 'pendente') {
                throw new \Exception('Sale is no longer pending approval');
            }
            
            $sale->update([
                'status' => 'aprovado',
                'approved_by' => auth()->id(),
                'approved_at' => now()
            ]);
            
            // Create commission record
            $commission = $this->commissionService->createCommissionForSale($sale->fresh());
            
            DB::commit();
            
            Log::info('Sale approved successfully', [
                'sale_id' => $sale->id,
                'approved_by' => auth()->id(),
                'commission_created' => $commission ? $commission->id : null
            ]);
            
            $this->notificationService->notifySaleApproved($sale);
            
            return back()->with('message', 'Venda aprovada com sucesso!');
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Failed to approve sale', [
                'sale_id' => $sale->id,
                'error' => $e->getMessage(),
                'user_id' => auth()->id()
            ]);
            
            return back()->withErrors(['error' => 'Erro ao aprovar venda. Tente novamente.']);
        }
    }
    
    public function reject(Request $request, Sale $sale)
    {
        if (auth()->user()->role !== 'admin' && auth()->user()->role !== 'financeiro') {
            abort(403, 'Unauthorized');
        }
        
        try {
            $validated = $request->validate([
                'rejection_reason' => 'required|string|max:500'
            ]);
            
            DB::beginTransaction();
            
            // Verify sale is still pending
            if ($sale->status !== 'pendente') {
                throw new \Exception('Sale is no longer pending approval');
            }
            
            $sale->update([
                'status' => 'recusado',
                'rejected_by' => auth()->id(),
                'rejected_at' => now(),
                'rejection_reason' => $validated['rejection_reason']
            ]);
            
            DB::commit();
            
            Log::info('Sale rejected', [
                'sale_id' => $sale->id,
                'rejected_by' => auth()->id(),
                'reason' => $validated['rejection_reason']
            ]);
            
            $this->notificationService->notifySaleRejected($sale, $validated['rejection_reason']);
            
            return back()->with('message', 'Venda recusada.');
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Failed to reject sale', [
                'sale_id' => $sale->id,
                'error' => $e->getMessage(),
                'user_id' => auth()->id()
            ]);
            
            return back()->withErrors(['error' => 'Erro ao recusar venda. Tente novamente.']);
        }
    }
    
    // Queued payment processing methods with fallback
    public function approveWithQueue(Sale $sale)
    {
        if (auth()->user()->role !== 'admin' && auth()->user()->role !== 'financeiro') {
            abort(403, 'Unauthorized');
        }
        
        try {
            // Try to dispatch to queue first
            ProcessSaleApproval::dispatch($sale->id, auth()->id(), 'approve');
            
            Log::info('Sale approval queued', [
                'sale_id' => $sale->id,
                'approved_by' => auth()->id()
            ]);
            
            return back()->with('message', 'Venda está sendo processada para aprovação...');
            
        } catch (\Exception $e) {
            Log::warning('Queue failed, falling back to synchronous processing', [
                'sale_id' => $sale->id,
                'error' => $e->getMessage()
            ]);
            
            // Fallback to synchronous processing
            return $this->approve($sale);
        }
    }
    
    public function rejectWithQueue(Request $request, Sale $sale)
    {
        if (auth()->user()->role !== 'admin' && auth()->user()->role !== 'financeiro') {
            abort(403, 'Unauthorized');
        }
        
        try {
            $validated = $request->validate([
                'rejection_reason' => 'required|string|max:500'
            ]);
            
            // Try to dispatch to queue first
            ProcessSaleApproval::dispatch(
                $sale->id, 
                auth()->id(), 
                'reject', 
                $validated['rejection_reason']
            );
            
            Log::info('Sale rejection queued', [
                'sale_id' => $sale->id,
                'rejected_by' => auth()->id()
            ]);
            
            return back()->with('message', 'Venda está sendo processada para recusa...');
            
        } catch (\Exception $e) {
            Log::warning('Queue failed, falling back to synchronous processing', [
                'sale_id' => $sale->id,
                'error' => $e->getMessage()
            ]);
            
            // Fallback to synchronous processing
            return $this->reject($request, $sale);
        }
    }
    
    // PDF Report methods
    public function generateSalesReport(Request $request)
    {
        $month = $request->get('month');
        $year = $request->get('year');
        
        $pdfService = new PDFReportService();
        return $pdfService->generateSalesReport(auth()->user(), $month, $year);
    }
    
    public function generateCommissionReport(Request $request)
    {
        $month = $request->get('month');
        $year = $request->get('year');
        
        $pdfService = new PDFReportService();
        return $pdfService->generateCommissionReport(auth()->user(), $month, $year);
    }

    public function correct(Request $request, Sale $sale)
    {
        $validated = $request->validate([
            'total_amount' => 'required|numeric|min:0',
            'shipping_amount' => 'required|numeric|min:0',
            'received_amount' => 'required|numeric|min:0',
            'payment_date' => 'required|date',
            'correction_reason' => 'required|string|max:1000',
        ]);

        DB::transaction(function () use ($sale, $validated) {
            $originalStatus = $sale->status;
            $originalMonth = $sale->payment_date ? $sale->payment_date->month : null;
            $originalYear = $sale->payment_date ? $sale->payment_date->year : null;

            $sale->update([
                'total_amount' => $validated['total_amount'],
                'shipping_amount' => $validated['shipping_amount'],
                'received_amount' => $validated['received_amount'],
                'payment_date' => $validated['payment_date'],
                'corrected_by' => auth()->id(),
                'corrected_at' => now(),
                'correction_reason' => $validated['correction_reason'],
                'original_status' => $originalStatus,
            ]);

            if ($originalMonth && $originalYear) {
                $this->commissionService->recalculateMonthlyCommissions(
                    $sale->user,
                    $originalMonth,
                    $originalYear
                );
            }

            $newMonth = $sale->payment_date->month;
            $newYear = $sale->payment_date->year;
            if ($newMonth !== $originalMonth || $newYear !== $originalYear) {
                $this->commissionService->recalculateMonthlyCommissions(
                    $sale->user,
                    $newMonth,
                    $newYear
                );
            }
        });

        return back()->with('success', 'Venda corrigida com sucesso.');
    }

    public function cancel(Request $request, Sale $sale)
    {
        $validated = $request->validate([
            'correction_reason' => 'required|string|max:1000',
        ]);

        DB::transaction(function () use ($sale, $validated) {
            $originalStatus = $sale->status;
            $originalMonth = $sale->payment_date ? $sale->payment_date->month : null;
            $originalYear = $sale->payment_date ? $sale->payment_date->year : null;

            $sale->update([
                'status' => 'cancelado',
                'corrected_by' => auth()->id(),
                'corrected_at' => now(),
                'correction_reason' => $validated['correction_reason'],
                'original_status' => $originalStatus,
            ]);

            if ($originalMonth && $originalYear) {
                $this->commissionService->recalculateMonthlyCommissions(
                    $sale->user,
                    $originalMonth,
                    $originalYear
                );
            }
        });

        return back()->with('success', 'Venda cancelada com sucesso.');
    }
}
