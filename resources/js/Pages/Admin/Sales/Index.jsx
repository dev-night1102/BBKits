import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import toast from 'react-hot-toast';

export default function Index({ sales }) {
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);

    const { data, setData, post, processing, reset } = useForm({
        rejection_reason: ''
    });

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

    const handleApprove = (sale) => {
        post(route('admin.sales.approve', sale.id), {
            onSuccess: () => {
                toast.success('Venda aprovada com sucesso!');
            },
            onError: () => {
                toast.error('Erro ao aprovar venda.');
            }
        });
    };

    const handleReject = (sale) => {
        setSelectedSale(sale);
        setShowRejectModal(true);
    };

    const submitRejection = (e) => {
        e.preventDefault();
        post(route('admin.sales.reject', selectedSale.id), {
            onSuccess: () => {
                toast.success('Venda recusada.');
                setShowRejectModal(false);
                setSelectedSale(null);
                reset();
            },
            onError: () => {
                toast.error('Erro ao recusar venda.');
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Painel Financeiro - Aprovação de Vendas
                    </h2>
                    <div className="text-sm text-gray-600">
                        {sales.data.filter(sale => sale.status === 'pendente').length} vendas pendentes
                    </div>
                </div>
            }
        >
            <Head title="Painel Financeiro - BBKits" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {sales.data.length === 0 ? (
                                <div className="text-center py-12">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma venda registrada</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        As vendas aparecerão aqui quando as vendedoras registrarem.
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Vendedora
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Cliente
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Valor Total
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Valor Recebido
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Data Pagamento
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Ações
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {sales.data.map((sale) => (
                                                <tr key={sale.id} className="hover:bg-gray-50">
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                        {sale.user.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        {sale.client_name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        {formatCurrency(sale.total_amount)}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        {formatCurrency(sale.received_amount)}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        {formatDate(sale.payment_date)}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        {getStatusBadge(sale.status)}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                                        <div className="flex space-x-2">
                                                            <Link 
                                                                href={route('sales.show', sale.id)}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                Ver
                                                            </Link>
                                                            {sale.status === 'pendente' && (
                                                                <>
                                                                    <button
                                                                        onClick={() => handleApprove(sale)}
                                                                        className="text-green-600 hover:text-green-900"
                                                                        disabled={processing}
                                                                    >
                                                                        Aprovar
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleReject(sale)}
                                                                        className="text-red-600 hover:text-red-900"
                                                                        disabled={processing}
                                                                    >
                                                                        Recusar
                                                                    </button>
                                                                </>
                                                            )}
                                                            {sale.payment_receipt && (
                                                                <a
                                                                    href={`/storage/${sale.payment_receipt}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-600 hover:text-blue-900"
                                                                >
                                                                    Comprovante
                                                                </a>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Pagination */}
                                    {sales.links && (
                                        <div className="mt-6 flex justify-between">
                                            <div className="text-sm text-gray-700">
                                                Mostrando {sales.from} a {sales.to} de {sales.total} resultados
                                            </div>
                                            <div className="flex space-x-2">
                                                {sales.links.map((link, index) => (
                                                    <Link
                                                        key={index}
                                                        href={link.url}
                                                        className={`px-3 py-2 text-sm rounded-md ${
                                                            link.active 
                                                                ? 'bg-pink-600 text-white' 
                                                                : 'bg-white text-gray-500 hover:text-gray-700'
                                                        }`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Recusar Venda
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Cliente: <strong>{selectedSale?.client_name}</strong><br />
                                Valor: <strong>{selectedSale && formatCurrency(selectedSale.received_amount)}</strong>
                            </p>
                            <form onSubmit={submitRejection}>
                                <div className="mb-4">
                                    <label htmlFor="rejection_reason" className="block text-sm font-medium text-gray-700 mb-2">
                                        Motivo da recusa
                                    </label>
                                    <textarea
                                        id="rejection_reason"
                                        value={data.rejection_reason}
                                        onChange={(e) => setData('rejection_reason', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        rows="3"
                                        required
                                        placeholder="Descreva o motivo da recusa..."
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowRejectModal(false);
                                            setSelectedSale(null);
                                            reset();
                                        }}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50"
                                    >
                                        {processing ? 'Recusando...' : 'Recusar Venda'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}