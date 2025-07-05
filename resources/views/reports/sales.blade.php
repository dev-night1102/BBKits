<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório de Vendas - BBKits</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #ec4899;
            padding-bottom: 20px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #ec4899;
            margin-bottom: 5px;
        }
        .subtitle {
            color: #666;
            font-size: 14px;
        }
        .info-section {
            margin-bottom: 25px;
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        .info-item {
            margin-bottom: 8px;
        }
        .info-label {
            font-weight: bold;
            color: #555;
        }
        .summary-cards {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-bottom: 30px;
        }
        .summary-card {
            background: #fff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
        }
        .summary-card .value {
            font-size: 18px;
            font-weight: bold;
            color: #ec4899;
            margin-bottom: 5px;
        }
        .summary-card .label {
            font-size: 11px;
            color: #666;
            text-transform: uppercase;
        }
        .sales-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .sales-table th,
        .sales-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        .sales-table th {
            background: #ec4899;
            color: white;
            font-weight: bold;
            font-size: 11px;
        }
        .sales-table td {
            font-size: 10px;
        }
        .status {
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 9px;
            font-weight: bold;
            text-align: center;
        }
        .status.aprovado {
            background: #dcfce7;
            color: #166534;
        }
        .status.pendente {
            background: #fef3c7;
            color: #92400e;
        }
        .status.recusado {
            background: #fee2e2;
            color: #991b1b;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 10px;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 15px;
        }
        .monetary {
            text-align: right;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">BBKits</div>
        <div class="subtitle">Relatório Individual de Vendas</div>
    </div>

    <div class="info-section">
        <div class="info-grid">
            <div>
                <div class="info-item">
                    <span class="info-label">Vendedora:</span> {{ $user->name }}
                </div>
                <div class="info-item">
                    <span class="info-label">Email:</span> {{ $user->email }}
                </div>
            </div>
            <div>
                <div class="info-item">
                    <span class="info-label">Período:</span> {{ $month_name }}
                </div>
                <div class="info-item">
                    <span class="info-label">Gerado em:</span> {{ $generated_at }}
                </div>
            </div>
        </div>
    </div>

    <div class="summary-cards">
        <div class="summary-card">
            <div class="value">{{ $summary['total_sales'] }}</div>
            <div class="label">Total de Vendas</div>
        </div>
        <div class="summary-card">
            <div class="value">{{ $summary['approved_sales'] }}</div>
            <div class="label">Vendas Aprovadas</div>
        </div>
        <div class="summary-card">
            <div class="value">R$ {{ number_format($summary['total_revenue'], 2, ',', '.') }}</div>
            <div class="label">Receita Total</div>
        </div>
        <div class="summary-card">
            <div class="value">R$ {{ number_format($summary['commission_base'], 2, ',', '.') }}</div>
            <div class="label">Base para Comissão</div>
        </div>
        <div class="summary-card">
            <div class="value">R$ {{ number_format($summary['commission_earned'], 2, ',', '.') }}</div>
            <div class="label">Comissão Gerada</div>
        </div>
        <div class="summary-card">
            <div class="value">{{ $summary['pending_sales'] }}</div>
            <div class="label">Vendas Pendentes</div>
        </div>
    </div>

    @if($sales->count() > 0)
    <table class="sales-table">
        <thead>
            <tr>
                <th>Data</th>
                <th>Cliente</th>
                <th>Pagamento</th>
                <th>Valor Total</th>
                <th>Frete</th>
                <th>Valor Recebido</th>
                <th>Status</th>
                <th>Processado por</th>
            </tr>
        </thead>
        <tbody>
            @foreach($sales as $sale)
            <tr>
                <td>{{ \Carbon\Carbon::parse($sale->payment_date)->format('d/m/Y') }}</td>
                <td>{{ $sale->client_name }}</td>
                <td>{{ ucfirst($sale->payment_method) }}</td>
                <td class="monetary">R$ {{ number_format($sale->total_amount, 2, ',', '.') }}</td>
                <td class="monetary">R$ {{ number_format($sale->shipping_amount, 2, ',', '.') }}</td>
                <td class="monetary">R$ {{ number_format($sale->received_amount, 2, ',', '.') }}</td>
                <td>
                    <span class="status {{ $sale->status }}">
                        {{ ucfirst($sale->status) }}
                    </span>
                </td>
                <td>
                    @if($sale->status === 'aprovado' && $sale->approvedBy)
                        {{ $sale->approvedBy->name }}
                    @elseif($sale->status === 'recusado' && $sale->rejectedBy)
                        {{ $sale->rejectedBy->name }}
                    @else
                        -
                    @endif
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
    @else
    <div style="text-align: center; padding: 40px; background: #f8f9fa; border-radius: 8px;">
        <p style="color: #666; font-size: 14px;">Nenhuma venda encontrada para o período selecionado.</p>
    </div>
    @endif

    <div class="footer">
        <p>Este relatório foi gerado automaticamente pelo Sistema BBKits</p>
        <p>BBKits - Bolsas Premium para Maternidade</p>
    </div>
</body>
</html>