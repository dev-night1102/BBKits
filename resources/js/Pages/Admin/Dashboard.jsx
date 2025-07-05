import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ stats, topPerformers, recentSales, monthlyData }) {
    const { auth } = usePage().props;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(amount);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('pt-BR');
    };

    const getStatusBadge = (status) => {
        const badges = {
            pendente: 'bg-yellow-100 text-yellow-800',
            aprovado: 'bg-green-100 text-green-800',
            recusado: 'bg-red-100 text-red-800',
        };
        
        const labels = {
            pendente: 'Pendente',
            aprovado: 'Aprovado',
            recusado: 'Recusado',
        };

        return (
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badges[status]}`}>
                {labels[status]}
            </span>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Dashboard Administrativo - BBKits
                    </h2>
                    <div className="text-sm text-gray-600">
                        Bem-vindo, {auth.user.name}!
                    </div>
                </div>
            }
        >
            <Head title="Admin Dashboard - BBKits" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    
                    {/* Stats Cards */}
                    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                        <div className="min-w-0 rounded-lg shadow-lg overflow-hidden bg-gradient-to-r from-pink-500 to-purple-600">
                            <div className="p-4 flex items-center text-white">
                                <div className="p-3 rounded-full bg-white bg-opacity-30 mr-4">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium">Total de Vendedoras</p>
                                    <p className="text-lg font-semibold">{stats.totalSellers}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="min-w-0 rounded-lg shadow-lg overflow-hidden bg-gradient-to-r from-green-500 to-blue-600">
                            <div className="p-4 flex items-center text-white">
                                <div className="p-3 rounded-full bg-white bg-opacity-30 mr-4">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium">Vendas Este Mês</p>
                                    <p className="text-lg font-semibold">{formatCurrency(stats.monthlyRevenue)}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="min-w-0 rounded-lg shadow-lg overflow-hidden bg-gradient-to-r from-yellow-500 to-orange-600">
                            <div className="p-4 flex items-center text-white">
                                <div className="p-3 rounded-full bg-white bg-opacity-30 mr-4">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium">Vendas Pendentes</p>
                                    <p className="text-lg font-semibold">{stats.pendingSales}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="min-w-0 rounded-lg shadow-lg overflow-hidden bg-gradient-to-r from-purple-500 to-indigo-600">
                            <div className="p-4 flex items-center text-white">
                                <div className="p-3 rounded-full bg-white bg-opacity-30 mr-4">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium">Comissões do Mês</p>
                                    <p className="text-lg font-semibold">{formatCurrency(stats.monthlyCommissions)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid gap-6 mb-8 md:grid-cols-2">
                        {/* Top Performers */}
                        <div className="min-w-0 p-4 bg-white rounded-lg shadow-lg">
                            <h4 className="mb-4 font-semibold text-gray-800">🏆 Top Vendedoras do Mês</h4>
                            <div className="space-y-3">
                                {topPerformers && topPerformers.length > 0 ? (
                                    topPerformers.map((performer, index) => (
                                        <div key={performer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                                                    index === 0 ? 'bg-yellow-500' : 
                                                    index === 1 ? 'bg-gray-400' : 
                                                    index === 2 ? 'bg-orange-600' : 'bg-gray-300'
                                                }`}>
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{performer.name}</p>
                                                    <p className="text-xs text-gray-500">{performer.sales_count} vendas</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-green-600">
                                                    {formatCurrency(performer.total_revenue)}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Comissão: {formatCurrency(performer.total_commission)}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center py-4">Nenhuma venda este mês ainda</p>
                                )}
                            </div>
                        </div>
                        
                        {/* Monthly Progress */}
                        <div className="min-w-0 p-4 bg-white rounded-lg shadow-lg">
                            <h4 className="mb-4 font-semibold text-gray-800">📈 Progresso Mensal</h4>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-gray-600">Meta Coletiva</span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {formatCurrency(stats.monthlyRevenue)} / {formatCurrency(stats.monthlyTarget)}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div 
                                            className="bg-gradient-to-r from-pink-500 to-purple-600 h-2.5 rounded-full transition-all duration-300" 
                                            style={{width: `${Math.min((stats.monthlyRevenue / stats.monthlyTarget) * 100, 100)}%`}}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {((stats.monthlyRevenue / stats.monthlyTarget) * 100).toFixed(1)}% da meta alcançada
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                    <div>
                                        <p className="text-xs text-gray-500">Vendas Aprovadas</p>
                                        <p className="text-lg font-semibold text-green-600">{stats.approvedSales}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Taxa de Aprovação</p>
                                        <p className="text-lg font-semibold text-blue-600">
                                            {stats.totalSalesCount > 0 ? 
                                                ((stats.approvedSales / stats.totalSalesCount) * 100).toFixed(1) + '%' : 
                                                '0%'
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Recent Sales */}
                    <div className="p-4 bg-white rounded-lg shadow-lg">
                        <h4 className="mb-4 font-semibold text-gray-800">📋 Vendas Recentes</h4>
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
                                            Valor
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Data
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {recentSales && recentSales.length > 0 ? (
                                        recentSales.map((sale) => (
                                            <tr key={sale.id} className="hover:bg-gray-50">
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                    {sale.user.name}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                    {sale.client_name}
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
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-sm text-gray-500 text-center">
                                                Nenhuma venda recente
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="mt-8 p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between text-white">
                            <div>
                                <h4 className="mb-2 font-semibold">Ações Rápidas</h4>
                                <p className="text-pink-100">Gerencie o sistema BBKits</p>
                            </div>
                            <div className="flex space-x-4">
                                <a 
                                    href="/admin/sales" 
                                    className="px-4 py-2 text-sm font-medium text-pink-600 bg-white rounded-lg hover:bg-pink-50 transition-colors"
                                >
                                    Aprovar Vendas
                                </a>
                                <a 
                                    href="/sales" 
                                    className="px-4 py-2 text-sm font-medium text-white bg-pink-600 bg-opacity-30 border border-white border-opacity-30 rounded-lg hover:bg-opacity-40 transition-colors"
                                >
                                    Ver Relatórios
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}