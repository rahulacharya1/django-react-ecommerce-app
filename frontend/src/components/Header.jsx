import { Link, useLocation } from "react-router-dom";

function Header() {
    const location = useLocation();

    const linkStyle = (path) =>
        `px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${location.pathname === path
            ? "bg-slate-100 text-slate-900"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">M</span>
                    </div>
                    <h1 className="text-lg font-semibold tracking-tight text-slate-800">
                        My App
                    </h1>
                </div>

                <nav className="flex items-center gap-2">
                    <Link to="/" className={linkStyle("/")}>
                        Home
                    </Link>
                    <Link to="/add" className={linkStyle("/add")}>
                        Add Category
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
