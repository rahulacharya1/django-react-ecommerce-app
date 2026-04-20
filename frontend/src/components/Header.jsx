import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useState, useEffect, useRef } from "react";

export default function Header() {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Get auth data from sessionStorage
    const token = sessionStorage.getItem("token");
    const isStaff = sessionStorage.getItem("is_staff") === "true";
    const username = sessionStorage.getItem("username") || "User";

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await API.post("logout/");
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            sessionStorage.clear();
            navigate("/", { replace: true });
            setShowDropdown(false);
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 transition-transform group-hover:scale-110">
                        <span className="text-sm font-bold text-white">M</span>
                    </div>
                    <h1 className="text-xl font-semibold tracking-tight text-gray-900">
                        My<span className="text-indigo-600">Store</span>
                    </h1>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-8">
                    <ul className="flex items-center gap-6 text-sm font-medium text-gray-600">
                        
                        {/* Conditional Cart Button */}
                        <li>
                            {/* THE CHANGE: If token exists, go to cart. If not, go to login */}
                            <Link 
                                to={token ? "/cart" : "/login"} 
                                className="relative flex items-center gap-2 rounded-xl p-2 transition-colors hover:bg-gray-50 hover:text-indigo-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="hidden md:inline">Cart</span>
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">0</span>
                            </Link>
                        </li>

                        {token ? (
                            <li className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-indigo-700 transition-all hover:bg-indigo-100 active:scale-95"
                                >
                                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                                    <span className="text-xs font-bold uppercase tracking-wider">{username}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border border-gray-100 bg-white p-2 shadow-xl ring-1 ring-black ring-opacity-5 animate-in fade-in zoom-in duration-200">
                                        {isStaff && (
                                            <Link
                                                to="/admin"
                                                onClick={() => setShowDropdown(false)}
                                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                                            >
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        
                                        <button
                                            onClick={handleLogout}
                                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50"
                                        >
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </li>
                        ) : (
                            <li className="flex items-center gap-3">
                                <Link to="/login" className="px-3 py-2 text-gray-500 hover:text-indigo-600 transition-colors">
                                    Login
                                </Link>
                                <Link to="/signup" className="rounded-xl bg-gray-900 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-gray-200 transition-all hover:bg-indigo-600 active:scale-95">
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
