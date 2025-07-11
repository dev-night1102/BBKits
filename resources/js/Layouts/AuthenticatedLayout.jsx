import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import NotificationBell from "@/Components/NotificationBell";
import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Add the same premium styles from Welcome page */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
                
                :root {
                    --primary-color: #D4A574;
                    --secondary-color: #F5E6D3;
                    --accent-color: #E8B4CB;
                    --accent-dark: #C8869B;
                    --text-dark: #2C2C2C;
                    --text-light: #666;
                    --white: #FFFFFF;
                    --gradient: linear-gradient(135deg, #D4A574 0%, #E8B4CB 100%);
                    --gradient-soft: linear-gradient(135deg, #F5E6D3 0%, #FFFFFF 100%);
                    --gradient-hero: linear-gradient(135deg, rgba(212, 165, 116, 0.95) 0%, rgba(232, 180, 203, 0.95) 100%);
                    --shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    --shadow-hover: 0 25px 50px rgba(0, 0, 0, 0.2);
                    --shadow-glow: 0 0 30px rgba(212, 165, 116, 0.3);
                }

                * {
                    font-family: 'Poppins', sans-serif;
                }

                .premium-bg {
                    background: linear-gradient(135deg, #F5E6D3 0%, #FFFFFF 30%, #F0F9FF 70%, #FDF2F8 100%);
                    position: relative;
                    overflow: hidden;
                }

                .floating-particles {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    pointer-events: none;
                    z-index: 0;
                }

                .particle {
                    position: absolute;
                    background: rgba(212, 165, 116, 0.1);
                    border-radius: 50%;
                    animation: float 15s infinite linear;
                }

                @keyframes float {
                    0% {
                        transform: translateY(100vh) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.3;
                    }
                    90% {
                        opacity: 0.3;
                    }
                    100% {
                        transform: translateY(-100px) rotate(360deg);
                        opacity: 0;
                    }
                }

                .navbar-glass {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(212, 165, 116, 0.2);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .navbar-scrolled {
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(25px);
                    box-shadow: var(--shadow);
                    border-bottom: 2px solid var(--primary-color);
                }

                .logo-container {
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                }

                .logo-container::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: var(--gradient);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    opacity: 0;
                    transition: all 0.4s ease;
                    z-index: -1;
                }

                .logo-container:hover::before {
                    width: 120%;
                    height: 120%;
                    opacity: 0.1;
                }

                .logo-container:hover {
                    transform: scale(1.1) rotate(5deg);
                    filter: drop-shadow(0 0 20px rgba(212, 165, 116, 0.4));
                }

                .nav-link {
                    position: relative;
                    padding: 12px 20px;
                    border-radius: 15px;
                    font-weight: 600;
                    color: var(--text-dark);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow: hidden;
                }

                .nav-link::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: var(--gradient-soft);
                    transition: left 0.5s ease;
                    z-index: -1;
                }

                .nav-link:hover::before,
                .nav-link.active::before {
                    left: 0;
                }

                .nav-link:hover {
                    color: var(--primary-color);
                    transform: translateY(-3px);
                    box-shadow: 0 10px 25px rgba(212, 165, 116, 0.2);
                }

                .nav-link.active {
                    color: var(--primary-color);
                    background: var(--gradient-soft);
                    box-shadow: 0 8px 20px rgba(212, 165, 116, 0.3);
                }

                .user-dropdown {
                    background: var(--gradient-soft);
                    border: 2px solid transparent;
                    background-clip: padding-box;
                    border-radius: 20px;
                    padding: 8px 16px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }

                .user-dropdown::before {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    background: var(--gradient);
                    border-radius: 20px;
                    z-index: -1;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .user-dropdown:hover::before {
                    opacity: 1;
                }

                .user-dropdown:hover {
                    transform: translateY(-2px) scale(1.05);
                    box-shadow: var(--shadow-hover);
                }

                .user-avatar {
                    background: var(--gradient);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(212, 165, 116, 0.3);
                }

                .user-avatar:hover {
                    transform: scale(1.1) rotate(10deg);
                    box-shadow: var(--shadow-glow);
                }

                .dropdown-content {
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(212, 165, 116, 0.2);
                    border-radius: 20px;
                    box-shadow: var(--shadow-hover);
                    overflow: hidden;
                    margin-top: 8px;
                }

                .dropdown-header {
                    background: var(--gradient-soft);
                    padding: 16px;
                    border-bottom: 1px solid rgba(212, 165, 116, 0.1);
                }

                .dropdown-link {
                    padding: 12px 16px;
                    transition: all 0.3s ease;
                    border-radius: 0;
                    margin: 4px 8px;
                    border-radius: 12px;
                }

                .dropdown-link:hover {
                    background: var(--gradient-soft);
                    color: var(--primary-color);
                    transform: translateX(5px);
                }

                .mobile-menu {
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(20px);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    border-bottom: 1px solid rgba(212, 165, 116, 0.2);
                }

                .mobile-toggle {
                    background: var(--gradient-soft);
                    border-radius: 15px;
                    padding: 8px;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }

                .mobile-toggle:hover {
                    background: var(--gradient);
                    color: white;
                    transform: scale(1.1);
                    box-shadow: 0 5px 15px rgba(212, 165, 116, 0.3);
                }

                .header-section {
                    background: var(--gradient-soft);
                    border-bottom: 2px solid var(--primary-color);
                    box-shadow: var(--shadow);
                    position: relative;
                    overflow: hidden;
                }

                .header-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, rgba(212, 165, 116, 0.05) 0%, rgba(232, 180, 203, 0.05) 100%);
                    pointer-events: none;
                }

                .main-content {
                    position: relative;
                    z-index: 1;
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out forwards;
                    opacity: 0;
                    transform: translateY(30px);
                }

                .animate-fadeInUp.delay-200 {
                    animation-delay: 0.2s;
                }

                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .icon-hover {
                    transition: all 0.3s ease;
                }

                .icon-hover:hover {
                    transform: scale(1.2) rotate(10deg);
                    color: var(--primary-color);
                }

                /* Mobile responsive menu animations */
                .mobile-nav-item {
                    transition: all 0.3s ease;
                    margin: 4px 0;
                }

                .mobile-nav-item:hover {
                    transform: translateX(10px) scale(1.02);
                    background: var(--gradient-soft);
                    border-radius: 15px;
                }

                /* Scroll indicator */
                .scroll-indicator {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 4px;
                    background: var(--gradient);
                    z-index: 9999;
                    transition: width 0.3s ease;
                }

                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                }

                ::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                ::-webkit-scrollbar-thumb {
                    background: var(--gradient);
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: var(--accent-color);
                }
            `}</style>

            <div className="min-h-screen premium-bg">
                {/* Floating particles */}
                <div className="floating-particles">
                    {Array.from({ length: 25 }, (_, i) => (
                        <div
                            key={i}
                            className="particle"
                            style={{
                                left: Math.random() * 100 + "%",
                                width: Math.random() * 10 + 4 + "px",
                                height: Math.random() * 10 + 4 + "px",
                                animationDelay: Math.random() * 15 + "s",
                                animationDuration:
                                    Math.random() * 10 + 15 + "s",
                            }}
                        />
                    ))}
                </div>

                <nav
                    className={`fixed top-0 w-full z-50 navbar-glass ${
                        isScrolled ? "navbar-scrolled" : ""
                    }`}
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between items-center">
                            <div className="flex items-center">
                                <div className="flex shrink-0 items-center">
                                    <Link href="/" className="logo-container">
                                        <img
                                            src="/images/logo.webp"
                                            alt="BBKits Logo"
                                            className="object-contain drop-shadow-xl hover:drop-shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-3 filter hover:brightness-110 hover:saturate-125 cursor-pointer animate-pulse hover:animate-none rounded-xl bg-white from-white/20 to-transparent backdrop-blur-sm border border-white/30 p-1 shadow-xl hover:shadow-yellow-400/50"
                                        />
                                    </Link>
                                </div>

                                <div className="hidden space-x-2 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                        className={`nav-link flex items-center gap-2 ${
                                            route().current("dashboard")
                                                ? "active"
                                                : ""
                                        }`}
                                    >
                                        <svg
                                            className="w-4 h-4 icon-hover"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                                            />
                                        </svg>
                                        Dashboard
                                    </NavLink>

                                    <NavLink
                                        href={route("sales.index")}
                                        active={route().current("sales.*")}
                                        className={`nav-link flex items-center gap-2 ${
                                            route().current("sales.*")
                                                ? "active"
                                                : ""
                                        }`}
                                    >
                                        <svg
                                            className="w-4 h-4 icon-hover"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                            />
                                        </svg>
                                        💼 Vendas
                                    </NavLink>

                                    {(user.role === "admin" ||
                                        user.role === "financeiro") && (
                                        <>
                                            <NavLink
                                                href={route("admin.dashboard")}
                                                active={route().current(
                                                    "admin.dashboard"
                                                )}
                                                className={`nav-link flex items-center gap-2 ${
                                                    route().current(
                                                        "admin.dashboard"
                                                    )
                                                        ? "active"
                                                        : ""
                                                }`}
                                            >
                                                <svg
                                                    className="w-4 h-4 icon-hover"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                    />
                                                </svg>
                                                🛡️ Admin
                                            </NavLink>

                                            <NavLink
                                                href={route(
                                                    "admin.sales.index"
                                                )}
                                                active={route().current(
                                                    "admin.sales.*"
                                                )}
                                                className={`nav-link flex items-center gap-2 ${
                                                    route().current(
                                                        "admin.sales.*"
                                                    )
                                                        ? "active"
                                                        : ""
                                                }`}
                                            >
                                                <svg
                                                    className="w-4 h-4 icon-hover"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                    />
                                                </svg>
                                                💰 Financeiro
                                            </NavLink>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="hidden sm:ms-6 sm:flex sm:items-center gap-3">
                                <NotificationBell />
                                <div className="relative ms-3">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="user-dropdown"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="user-avatar w-8 h-8 text-xs">
                                                            {user.name
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </div>
                                                        <span className="hidden md:block font-semibold text-gray-700">
                                                            {user.name}
                                                        </span>
                                                        <svg
                                                            className="-me-0.5 ms-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-180"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content className="dropdown-content w-64">
                                            <div className="dropdown-header">
                                                <div className="flex items-center gap-3">
                                                    <div className="user-avatar w-12 h-12 text-sm">
                                                        {user.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-800">
                                                            {user.name}
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            {user.email}
                                                        </div>
                                                        <div className="text-xs text-purple-600 font-medium mt-1">
                                                            ✨{" "}
                                                            {user.role ===
                                                            "vendedora"
                                                                ? "Vendedora BBKits"
                                                                : user.role ===
                                                                  "admin"
                                                                ? "Administrador"
                                                                : "Financeiro"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                                className="dropdown-link flex items-center gap-3"
                                            >
                                                <svg
                                                    className="w-4 h-4 icon-hover"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                                👤 Meu Perfil
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                                className="dropdown-link flex items-center gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 w-full text-left"
                                            >
                                                <svg
                                                    className="w-4 h-4 icon-hover"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                    />
                                                </svg>
                                                🚪 Sair
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            !showingNavigationDropdown
                                        )
                                    }
                                    className="mobile-toggle"
                                >
                                    <div className="relative w-6 h-6">
                                        <div
                                            className={`absolute inset-0 transition-all duration-300 ${
                                                showingNavigationDropdown
                                                    ? "opacity-0 rotate-45"
                                                    : "opacity-100 rotate-0"
                                            }`}
                                        >
                                            <svg
                                                className="h-6 w-6"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M4 6h16M4 12h16M4 18h16"
                                                />
                                            </svg>
                                        </div>
                                        <div
                                            className={`absolute inset-0 transition-all duration-300 ${
                                                showingNavigationDropdown
                                                    ? "opacity-100 rotate-0"
                                                    : "opacity-0 -rotate-45"
                                            }`}
                                        >
                                            <svg
                                                className="h-6 w-6"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`sm:hidden mobile-menu transition-all duration-500 ease-in-out overflow-hidden ${
                            showingNavigationDropdown
                                ? "max-h-screen opacity-100"
                                : "max-h-0 opacity-0"
                        }`}
                    >
                        <div className="space-y-2 pb-4 pt-4 px-4">
                            <ResponsiveNavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                                className="mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl"
                            >
                                <svg
                                    className="w-4 h-4 icon-hover"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                                    />
                                </svg>
                                📊 Dashboard
                            </ResponsiveNavLink>

                            <ResponsiveNavLink
                                href={route("sales.index")}
                                active={route().current("sales.*")}
                                className="mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl"
                            >
                                <svg
                                    className="w-4 h-4 icon-hover"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                </svg>
                                💼 Minhas Vendas
                            </ResponsiveNavLink>

                            {(user.role === "admin" ||
                                user.role === "financeiro") && (
                                <>
                                    <ResponsiveNavLink
                                        href={route("admin.dashboard")}
                                        active={route().current(
                                            "admin.dashboard"
                                        )}
                                        className="mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl"
                                    >
                                        <svg
                                            className="w-4 h-4 icon-hover"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                            />
                                        </svg>
                                        🛡️ Admin Dashboard
                                    </ResponsiveNavLink>

                                    <ResponsiveNavLink
                                        href={route("admin.sales.index")}
                                        active={route().current(
                                            "admin.sales.*"
                                        )}
                                        className="mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl"
                                    >
                                        <svg
                                            className="w-4 h-4 icon-hover"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                            />
                                        </svg>
                                        💰 Painel Financeiro
                                    </ResponsiveNavLink>
                                </>
                            )}
                        </div>

                        <div className="border-t border-pink-200 mx-4 py-4">
                            <div className="px-4 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="user-avatar w-12 h-12 text-sm">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="text-base font-bold text-gray-800">
                                            {user.name}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {user.email}
                                        </div>
                                        <div className="text-xs text-purple-600 font-medium mt-1">
                                            ✨{" "}
                                            {user.role === "vendedora"
                                                ? "Vendedora BBKits"
                                                : user.role === "admin"
                                                ? "Administrador"
                                                : "Financeiro"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <ResponsiveNavLink
                                    href={route("profile.edit")}
                                    className="mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl"
                                >
                                    <svg
                                        className="w-4 h-4 icon-hover"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    👤 Meu Perfil
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                    className="mobile-nav-item flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 w-full text-left"
                                >
                                    <svg
                                        className="w-4 h-4 icon-hover"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    🚪 Sair
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="header-section mt-16 border-b border-pink-100/50 relative z-10">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 relative z-10">
                            <div className="animate-fadeInUp">{header}</div>
                        </div>
                    </header>
                )}

                <main className="pt-16 min-h-screen main-content">
                    <div className="animate-fadeInUp delay-200 relative z-10">
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}
