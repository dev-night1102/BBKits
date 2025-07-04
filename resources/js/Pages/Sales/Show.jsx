import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ sale }) {
    const getStatusBadge = (status) => {
        const badges = {
            pendente: 'bg-yellow-100 text-yellow-800',
            aprovado: 'bg-green-100 text-green-800',
            recusado: 'bg-red-100 text-red-800',
            cancelado: 'bg-gray-100 text-gray-800',
            estornado: 'bg-purple-100 text-purple-800'
        };
        
        const labels = {
            pendente: 'Pendente',
            aprovado: 'Aprovado',
            recusado: 'Recusado',
            cancelado: 'Cancelado',
            estornado: 'Estornado'
        };

        return (
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badges[status]}`}>
                {labels[status]}
            </span>
        );
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(amount);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('pt-BR');
    };

    const formatDateTime = (dateTime) => {
        return new Date(dateTime).toLocaleString('pt-BR');
    };

    const getPaymentMethodLabel = (method) => {
        const methods = {
            pix: 'PIX',
            boleto: 'Boleto',
            cartao: 'Cartão',
            dinheiro: 'Dinheiro'
        };
        return methods[method] || method;
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Detalhes da Venda
                </h2>
            }
        >
            <Head title={`Venda #${sale.id} - BBKits`} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Venda #{sale.id}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Registrada em {formatDateTime(sale.created_at)}
                                    </p>
                                </div>
                                <div>
                                    {getStatusBadge(sale.status)}
                                </div>
                            </div>

                            {/* Sale Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Informações da Venda</h4>
                                    <dl className="space-y-2">
                                        <div>
                                            <dt className="text-sm text-gray-500">Vendedora</dt>
                                            <dd className="text-sm font-medium text-gray-900">{sale.user.name}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm text-gray-500">Cliente</dt>
                                            <dd className="text-sm font-medium text-gray-900">{sale.client_name}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm text-gray-500">Forma de Pagamento</dt>
                                            <dd className="text-sm font-medium text-gray-900">{getPaymentMethodLabel(sale.payment_method)}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm text-gray-500">Data do Pagamento</dt>
                                            <dd className="text-sm font-medium text-gray-900">{formatDate(sale.payment_date)}</dd>
                                        </div>
                                    </dl>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Valores</h4>
                                    <dl className="space-y-2">
                                        <div>
                                            <dt className="text-sm text-gray-500">Valor Total do Pedido</dt>
                                            <dd className="text-sm font-medium text-gray-900">{formatCurrency(sale.total_amount)}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm text-gray-500">Valor do Frete</dt>
                                            <dd className="text-sm font-medium text-gray-900">{formatCurrency(sale.shipping_amount)}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm text-gray-500">Valor Recebido</dt>
                                            <dd className="text-lg font-semibold text-green-600">{formatCurrency(sale.received_amount)}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm text-gray-500">Base para Comissão</dt>
                                            <dd className="text-sm font-medium text-gray-900">{formatCurrency(sale.received_amount - sale.shipping_amount)}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            {/* Notes */}
                            {sale.notes && (
                                <div className="mb-6">
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Observações</h4>
                                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                                        {sale.notes}
                                    </p>
                                </div>
                            )}

                            {/* Payment Receipt */}
                            {sale.payment_receipt && (
                                <div className="mb-6">
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Comprovante de Pagamento</h4>
                                    <a
                                        href={`/storage/${sale.payment_receipt}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Ver Comprovante
                                    </a>
                                </div>
                            )}

                            {/* Approval/Rejection Information */}
                            {sale.status === 'aprovado' && sale.approved_by && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                                    <h4 className="text-sm font-medium text-green-900 mb-2">Venda Aprovada</h4>
                                    <p className="text-sm text-green-700">
                                        Aprovada em {formatDateTime(sale.approved_at)} por {sale.approved_by.name}
                                    </p>
                                </div>
                            )}

                            {sale.status === 'recusado' && sale.rejected_by && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                                    <h4 className="text-sm font-medium text-red-900 mb-2">Venda Recusada</h4>
                                    <p className="text-sm text-red-700 mb-2">
                                        Recusada em {formatDateTime(sale.rejected_at)} por {sale.rejected_by.name}
                                    </p>
                                    {sale.rejection_reason && (
                                        <div>
                                            <p className="text-sm font-medium text-red-900">Motivo:</p>
                                            <p className="text-sm text-red-700">{sale.rejection_reason}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Back Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={() => window.history.back()}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                                >
                                    Voltar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}