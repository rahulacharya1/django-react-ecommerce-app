import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username") || "Admin";

    return (
        <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo Section */}
                <a href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                        <span className="text-sm font-bold text-white">M</span>
                    </div>
                    <h1 className="text-xl font-semibold tracking-tight text-gray-900">
                        My<span className="text-indigo-600">Store</span>
                    </h1>
                </a>

                {/* Navigation */}
                <nav className="flex items-center gap-8">
                    <ul className="flex items-center gap-6 text-sm font-medium text-gray-600">
                        <li>
                            <Link to="#" className="relative flex items-center gap-2 rounded-xl p-2 transition-colors hover:bg-gray-50 hover:text-indigo-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="hidden md:inline">Cart</span>
                                {/* Cart Badge Placeholder */}
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">0</span>
                            </Link>
                        </li>
                        {token ? (
                            // Show this if LOGGED IN
                            <li className="flex items-center gap-6">
                                <div className="flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">
                                    <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></div>
                                    <span className="text-xs font-bold">Hello, {username}</span>
                                </div>
                                <a
                                    href="/admin"
                                    className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-2 transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Admin Dashboard
                                </a>

                            </li>
                        ) : (
                            // Show this if NOT LOGGED IN
                            <li className="flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className="text-gray-600 transition-colors hover:text-indigo-600"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="#"
                                    className="rounded-xl bg-gray-900 px-5 py-2 text-xs font-bold text-white transition-all hover:bg-indigo-600 active:scale-95 shadow-lg shadow-gray-200"
                                >
                                    Sign Up
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
