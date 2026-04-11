import { useEffect, useState } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [totals, setTotals] = useState({ categories: 0, products: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([API.get("categories/"), API.get("products/")])
      .then(([categoriesRes, productsRes]) => {
        setTotals({
          categories: categoriesRes.data.length,
          products: productsRes.data.length,
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load dashboard summary.");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="mt-1 text-slate-500">Quick overview of your catalog.</p>
      </div>

      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Categories</p>
          <p className="mt-2 text-4xl font-bold text-slate-900">
            {loading ? "..." : totals.categories}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Products</p>
          <p className="mt-2 text-4xl font-bold text-slate-900">
            {loading ? "..." : totals.products}
          </p>
        </div>
      </div>
    </div>
  );
}