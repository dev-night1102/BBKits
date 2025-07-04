import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-pink-50 via-white to-purple-50 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/" className="flex items-center space-x-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">BB</span>
                    </div>
                    <span className="text-3xl font-bold text-gray-900">BBKits</span>
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-lg sm:max-w-md sm:rounded-lg border border-pink-100">
                {children}
            </div>
        </div>
    );
}
