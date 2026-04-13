import { Link } from "react-router-dom";

export default function AdminHeader() {
    return (
        <header className="sticky top-0 z-50 border-b border-gray-800 bg-[#0F172A]/90 backdrop-blur-md text-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16 md:px-8">

                {/* Logo Section */}
                <div className="flex items-center gap-4">
                    <Link
                        to="/admin"
                        className="group flex items-center gap-2 text-lg font-semibold tracking-tight transition-colors hover:text-indigo-400"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-bold text-sm text-white shadow-lg shadow-indigo-500/20 group-hover:bg-indigo-500">
                            A
                        </div>
                        <span>Admin <span className="text-gray-400 font-normal">Console</span></span>
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    <nav className="hidden md:block">
                        <ul className="flex gap-6 text-sm font-medium text-gray-400">
                            <li><Link to="/admin/products" className="hover:text-white transition-colors">Products</Link></li>
                            <li><Link to="/admin/categories" className="hover:text-white transition-colors">Categories</Link></li>
                        </ul>
                    </nav>

                    <div className="h-4 w-[1px] bg-gray-700 hidden md:block"></div>

                    <Link
                        to="/"
                        className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 border border-white/10 transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Store
                    </Link>
                </div>
            </div>
        </header>
    );
}
