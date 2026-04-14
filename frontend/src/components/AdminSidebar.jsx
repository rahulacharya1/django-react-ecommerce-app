import { NavLink, useNavigate } from "react-router-dom";

const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
        : "text-gray-400 hover:bg-white/5 hover:text-gray-100"
    }`;

export default function AdminSidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        navigate("/login", { replace: true });
    };

    return (
        <aside className="sticky top-16 h-[calc(100vh-64px)] w-72 border-r border-gray-800 bg-[#0F172A] p-6">
            <div className="mb-8 px-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    Management
                </p>
            </div>

            <nav className="space-y-1.5">
                <NavLink to="/admin" end className={navItemClass}>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                </NavLink>

                <NavLink to="/admin/categories" className={navItemClass}>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    Categories
                </NavLink>

                <NavLink to="/admin/products" className={navItemClass}>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Products
                </NavLink>
            </nav>

            <div className="absolute bottom-6 left-6 right-6 border-t border-gray-800 pt-6">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all active:scale-95"
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </div>
        </aside>
    );
}
