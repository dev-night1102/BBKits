import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="BBKits - Sistema de Vendas" />
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
                <div className="container mx-auto px-4 py-8">
                    <nav className="flex items-center justify-between mb-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">BB</span>
                            </div>
                            <span className="text-2xl font-bold text-gray-900">BBKits</span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
                                >
                                    Acessar Sistema
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg font-medium transition duration-200"
                                    >
                                        Entrar
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
                                    >
                                        Cadastrar
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>

                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Sistema de Vendas e Comissões
                            <span className="block text-pink-600 mt-2">BBKits</span>
                        </h1>
                        
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Plataforma completa para gestão de vendas, controle de comissões e 
                            acompanhamento de metas para vendedoras de bolsas maternidade premium.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            {!auth.user && (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        Fazer Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-white hover:bg-gray-50 text-pink-600 border-2 border-pink-600 px-8 py-4 rounded-lg text-lg font-semibold transition duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        Criar Conta
                                    </Link>
                                </>
                            )}
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mt-16">
                            <div className="bg-white p-8 rounded-2xl shadow-lg">
                                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Controle de Vendas</h3>
                                <p className="text-gray-600">
                                    Registre suas vendas com comprovantes e acompanhe o status de aprovação em tempo real.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-lg">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cálculo de Comissões</h3>
                                <p className="text-gray-600">
                                    Sistema automático de cálculo de comissões baseado em metas e valores recebidos.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-lg">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Dashboard Motivacional</h3>
                                <p className="text-gray-600">
                                    Acompanhe seu progresso, ranking e metas com interface gamificada e motivacional.
                                </p>
                            </div>
                        </div>

                        <div className="mt-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8 text-white">
                            <h2 className="text-2xl font-bold mb-4">
                                "Você não vende bolsas. Você entrega histórias, segurança e amor." 💼👶
                            </h2>
                            <p className="text-pink-100">
                                Sistema desenvolvido especialmente para as vendedoras BBKits
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
