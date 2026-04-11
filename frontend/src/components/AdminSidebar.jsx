import { NavLink } from "react-router-dom";

const navItemClass = ({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-cyan-500 text-slate-900"
      : "text-slate-200 hover:bg-slate-700 hover:text-white"
  }`;

export default function AdminSidebar() {
  return (
    <aside className="min-h-[calc(100vh-73px)] w-72 border-r border-slate-700 bg-slate-800 p-4">
      <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Admin Navigation
      </p>
      <nav className="space-y-2">
        <NavLink to="/admin" end className={navItemClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/categories" className={navItemClass}>
          Categories
        </NavLink>
        <NavLink to="/admin/products" className={navItemClass}>
          Products
        </NavLink>
      </nav>
    </aside>
  );
}