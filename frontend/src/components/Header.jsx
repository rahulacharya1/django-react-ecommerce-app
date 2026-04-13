export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">M</span>
                    </div>
                    <h1 className="text-xl font-semibold tracking-tight text-gray-900">
                        My<span className="text-indigo-600">Store</span>
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="flex items-center gap-8">
                    <ul className="flex gap-6 text-sm font-medium text-gray-600">
                        <li><a href="/" className="hover:text-indigo-600 transition-colors">Home</a></li>
                    </ul>

                    <div className="h-4 w-[1px] bg-gray-200"></div>

                    <a
                        href="/admin"
                        className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-2 transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Admin
                    </a>
                </nav>
            </div>
        </header>
    );
}
