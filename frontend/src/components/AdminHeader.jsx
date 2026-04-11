import { Link } from "react-router-dom";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-700 bg-slate-900 text-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 md:px-8">
        <Link to="/admin" className="text-lg font-bold tracking-wide hover:text-cyan-300">
          Admin Console
        </Link>
        <Link to="/" className="rounded-md border border-slate-500 px-3 py-1 text-sm hover:border-cyan-300 hover:text-cyan-300">
          View Store
        </Link>
      </div>
    </header>
  );
}
