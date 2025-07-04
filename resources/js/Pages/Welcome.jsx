import { Link, Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            BBKits Sales System
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Sistema de Controle de Vendas e Comissões
                        </p>
                        <div className="space-x-4">
                            <Link 
                                href="/login" 
                                className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                            >
                                Login
                            </Link>
                            <Link 
                                href="/register" 
                                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                            >
                                Registrar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}