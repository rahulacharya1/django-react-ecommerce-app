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
        <div className="space-y-10">
            {/* Header Section */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                    Hello, <span className="text-gray-400 font-normal text-2xl">Admin</span>
                </h1>
                <p className="text-gray-500 font-medium">Here's a snapshot of your store's inventory.</p>
            </div>

            {error && (
                <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Categories Card */}
                <div className="group rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-indigo-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                        </div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Inventory</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-500">Total Categories</p>
                    <h2 className="mt-2 text-5xl font-bold tracking-tight text-gray-900">
                        {loading ? (
                            <div className="h-12 w-16 animate-pulse rounded-lg bg-gray-100" />
                        ) : (
                            totals.categories
                        )}
                    </h2>
                </div>

                {/* Products Card */}
                <div className="group rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-indigo-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Catalog</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-500">Total Products</p>
                    <h2 className="mt-2 text-5xl font-bold tracking-tight text-gray-900">
                        {loading ? (
                            <div className="h-12 w-16 animate-pulse rounded-lg bg-gray-100" />
                        ) : (
                            totals.products
                        )}
                    </h2>
                </div>
            </div>
        </div>
    );
}
