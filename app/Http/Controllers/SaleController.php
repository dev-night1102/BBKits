<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Services\PDFReportService;

class SaleController extends Controller
{
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
            $validated['payment_receipt'] = $request->file('payment_receipt')->store('receipts', 'public');
        }

        $validated['user_id'] = auth()->id();
        $validated['status'] = 'pendente';

        Sale::create($validated);

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
            if ($sale->payment_receipt) {
                Storage::disk('public')->delete($sale->payment_receipt);
            }
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
        
        $sale->update([
            'status' => 'aprovado',
            'approved_by' => auth()->id(),
            'approved_at' => now()
        ]);
        
        return back()->with('message', 'Venda aprovada com sucesso!');
    }
    
    public function reject(Request $request, Sale $sale)
    {
        if (auth()->user()->role !== 'admin' && auth()->user()->role !== 'financeiro') {
            abort(403, 'Unauthorized');
        }
        
        $validated = $request->validate([
            'rejection_reason' => 'required|string|max:500'
        ]);
        
        $sale->update([
            'status' => 'recusado',
            'rejected_by' => auth()->id(),
            'rejected_at' => now(),
            'rejection_reason' => $validated['rejection_reason']
        ]);
        
        return back()->with('message', 'Venda recusada.');
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
}
