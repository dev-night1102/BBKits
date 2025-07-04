import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ sales }) {
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

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Minhas Vendas
                    </h2>
                    <Link href={route('sales.create')}>
                        <PrimaryButton>
                            Nova Venda
                        </PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Vendas" />

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
                                        Comece registrando sua primeira venda.
                                    </p>
                                    <div className="mt-6">
                                        <Link href={route('sales.create')}>
                                            <PrimaryButton>
                                                Registrar Primera Venda
                                            </PrimaryButton>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
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
                                                                    <Link 
                                                                        href={route('sales.edit', sale.id)}
                                                                        className="text-yellow-600 hover:text-yellow-900"
                                                                    >
                                                                        Editar
                                                                    </Link>
                                                                </>
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
                                                                ? 'bg-indigo-600 text-white' 
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
        </AuthenticatedLayout>
    );
}