import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth, gamification } = usePage().props;
    
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Dashboard
                    </h2>
                    <div className="text-sm text-gray-600">
                        Bem-vinda, {auth.user.name}!
                    </div>
                </div>
            }
        >
            <Head title="Dashboard - BBKits" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white">
                            <div className="p-4 flex items-center">
                                <div className="p-3 rounded-full text-pink-500 bg-pink-100 mr-4">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-600">Vendas Este Mês</p>
                                    <p className="text-lg font-semibold text-gray-700">0</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white">
                            <div className="p-4 flex items-center">
                                <div className="p-3 rounded-full text-green-500 bg-green-100 mr-4">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-600">Comissão do Mês</p>
                                    <p className="text-lg font-semibold text-gray-700">R$ 0,00</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white">
                            <div className="p-4 flex items-center">
                                <div className="p-3 rounded-full text-blue-500 bg-blue-100 mr-4">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-600">Vendas Aprovadas</p>
                                    <p className="text-lg font-semibold text-gray-700">0</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white">
                            <div className="p-4 flex items-center">
                                <div className="p-3 rounded-full text-purple-500 bg-purple-100 mr-4">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-600">Meta do Mês</p>
                                    <p className="text-lg font-semibold text-gray-700">R$ 40.000,00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid gap-6 mb-8 md:grid-cols-2">
                        <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs">
                            <h4 className="mb-4 font-semibold text-gray-800">Progresso da Meta</h4>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-2.5 rounded-full" style={{width: '0%'}}></div>
                            </div>
                            <p className="text-sm text-gray-600">0% da meta mensal alcançada</p>
                            <div className="mt-4 p-4 bg-pink-50 rounded-lg">
                                <p className="text-sm font-medium text-pink-800">💪 Dica Motivacional</p>
                                <p className="text-sm text-pink-700 mt-1">"Cada venda é uma história de amor que você ajuda a criar. Continue brilhando!"</p>
                            </div>
                        </div>
                        
                        <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs">
                            <h4 className="mb-4 font-semibold text-gray-800">Últimas Vendas</h4>
                            <div className="text-center py-8">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="mt-2 text-sm text-gray-500">Nenhuma venda registrada ainda</p>
                                <p className="text-sm text-gray-400">Registre sua primeira venda para começar!</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg shadow-xs">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="mb-2 font-semibold text-white">
                                    {auth.user.role === 'vendedora' ? 'Pronta para vender mais?' : 'Gerencie o Sistema BBKits'}
                                </h4>
                                <p className="text-pink-100">
                                    {auth.user.role === 'vendedora' ? 
                                        'Registre uma nova venda e aumente suas comissões!' : 
                                        'Acesse as ferramentas administrativas'}
                                </p>
                            </div>
                            <div className="flex space-x-3">
                                {auth.user.role === 'vendedora' ? (
                                    <>
                                        <a href="/sales/create" className="px-4 py-2 text-sm font-medium text-pink-600 bg-white rounded-lg hover:bg-pink-50 transition-colors">
                                            Nova Venda
                                        </a>
                                        <a href="/reports/sales" className="px-4 py-2 text-sm font-medium text-white bg-pink-600 bg-opacity-30 border border-white border-opacity-30 rounded-lg hover:bg-opacity-40 transition-colors">
                                            Relatório PDF
                                        </a>
                                    </>
                                ) : (
                                    <>
                                        <a href="/admin/dashboard" className="px-4 py-2 text-sm font-medium text-pink-600 bg-white rounded-lg hover:bg-pink-50 transition-colors">
                                            Admin Dashboard
                                        </a>
                                        <a href="/admin/sales" className="px-4 py-2 text-sm font-medium text-white bg-pink-600 bg-opacity-30 border border-white border-opacity-30 rounded-lg hover:bg-opacity-40 transition-colors">
                                            Aprovar Vendas
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Gamification Section for Vendedoras */}
                    {auth.user.role === 'vendedora' && gamification && (
                        <>
                            {/* User Level and Progress */}
                            <div className="mt-8 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8 text-white">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2">
                                            {gamification.level.icon} Nível {gamification.level.level}
                                        </h2>
                                        <p className="text-pink-100">
                                            {gamification.level.message}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold">
                                            {Math.round(gamification.level.progress)}%
                                        </div>
                                        <div className="text-sm text-pink-200">Progresso</div>
                                    </div>
                                </div>
                                <div className="w-full bg-white bg-opacity-30 rounded-full h-3 mb-4">
                                    <div 
                                        className="bg-white h-3 rounded-full transition-all duration-300" 
                                        style={{width: `${gamification.level.progress}%`}}
                                    ></div>
                                </div>
                            </div>

                            {/* Motivational Quote */}
                            <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
                                <h3 className="text-lg font-bold mb-3">🎆 Frase Motivacional do Dia</h3>
                                <p className="text-lg italic">
                                    "{gamification.motivationalQuote}"
                                </p>
                            </div>

                            {/* Achievements */}
                            {gamification.achievements && gamification.achievements.length > 0 && (
                                <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">🏆 Suas Conquistas</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {gamification.achievements.map((achievement, index) => (
                                            <div key={index} className="bg-gradient-to-br from-yellow-100 to-orange-100 p-4 rounded-lg text-center border border-yellow-200">
                                                <div className="text-3xl mb-2">{achievement.icon}</div>
                                                <div className="font-semibold text-gray-900 text-sm">{achievement.name}</div>
                                                <div className="text-xs text-gray-600 mt-1">{achievement.description}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Monthly Ranking */}
                            {gamification.ranking && gamification.ranking.length > 0 && (
                                <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">🏅 Ranking Mensal</h3>
                                    <div className="space-y-3">
                                        {gamification.ranking.slice(0, 5).map((item) => (
                                            <div key={item.user.id} className={`flex items-center justify-between p-3 rounded-lg ${
                                                item.user.id === auth.user.id ? 'bg-pink-100 border-2 border-pink-300' : 'bg-gray-50'
                                            }`}>
                                                <div className="flex items-center">
                                                    <div className="flex items-center mr-3">
                                                        <span className="text-2xl mr-2">{item.badge.icon}</span>
                                                        <span className="font-bold text-lg">{item.position}º</span>
                                                    </div>
                                                    <div>
                                                        <div className={`font-semibold ${
                                                            item.user.id === auth.user.id ? 'text-pink-800' : 'text-gray-900'
                                                        }`}>
                                                            {item.user.name} 
                                                            {item.user.id === auth.user.id && ' (Você)'}
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            {item.monthly_sales_count} vendas • {item.level.level}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-green-600">
                                                        R$ {new Intl.NumberFormat('pt-BR').format(item.monthly_total)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {gamification.userPosition > 5 && (
                                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                            <div className="text-center text-blue-800">
                                                💪 Você está na {gamification.userPosition}ª posição! Continue vendendo para subir no ranking!
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
