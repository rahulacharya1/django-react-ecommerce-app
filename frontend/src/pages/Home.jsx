import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            API.get("categories/"),
            API.get("products/")
        ]).then(([catRes, prodRes]) => {
            setCategories(catRes.data);
            setProducts(prodRes.data);
        }).catch(() => {
            setCategories([]);
            setProducts([]);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div className="min-h-screen bg-[#FBFCFE]">
            <Header />

            <main className="mx-auto max-w-7xl px-6 py-10 md:px-8">
                {/* Hero Section - Clean & Simple */}
                <section className="mb-16 rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm md:p-16 text-center md:text-left">
                    <span className="mb-4 inline-flex rounded-full bg-indigo-50 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-indigo-600">
                        Spring 2026 Collection
                    </span>
                    <h1 className="max-w-3xl text-4xl font-bold leading-tight text-gray-900 md:text-6xl tracking-tight">
                        Shop smarter with <span className="text-gray-400">curated products.</span>
                    </h1>
                    <p className="mt-6 max-w-xl text-gray-500 text-lg">
                        Discover trending products and categories designed to help you find what you need fast.
                    </p>
                </section>

                {/* Categories Section */}
                <section className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
                            Browse Categories
                        </h2>
                        <button className="text-gray-400 hover:text-indigo-600 font-medium text-sm transition-colors">View All →</button>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {loading
                            ? Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="h-12 w-32 animate-pulse rounded-xl bg-gray-100" />
                            ))
                            : categories.map((c) => (
                                <button
                                    key={c.id}
                                    className="group rounded-xl border border-gray-100 bg-white px-6 py-3 text-sm font-medium text-gray-600 shadow-sm transition-all hover:border-indigo-600 hover:text-indigo-600"
                                >
                                    {c.name}
                                </button>
                            ))}
                    </div>
                </section>

                {/* Products Section */}
                <section>
                    <h2 className="mb-8 text-xl font-semibold tracking-tight text-gray-900">
                        Featured Products
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                        {loading
                            ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
                            : products.map((p) => (
                                <div
                                    key={p.id}
                                    className="group flex flex-col border border-gray-100 rounded-2xl bg-white p-4 shadow-md transition-all hover:shadow-lg cursor-pointer"
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {/* Floating Wishlist */}
                                        <button className="absolute right-3 top-3 rounded-full bg-white/80 p-2 text-gray-900 opacity-0 shadow-sm backdrop-blur-md transition-opacity group-hover:opacity-100 hover:bg-white">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Content */}
                                    <div className="pt-4 flex-grow flex flex-col">
                                        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-indigo-500">
                                            {categories.find(c => c.id === p.category)?.name || "Essentials"}
                                        </p>

                                        <h3 className="mb-1 truncate text-base font-semibold text-gray-800">
                                            {p.name}
                                        </h3>

                                        <div className="mb-4 mt-auto">
                                            {p.discount_price ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg font-bold text-gray-900">₹{p.discount_price}</span>
                                                    <span className="text-sm text-gray-400 line-through">₹{p.price}</span>
                                                </div>
                                            ) : (
                                                <span className="text-lg font-bold text-gray-900">₹{p.price}</span>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => navigate(`/product/${p.id}`)}
                                            className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-600 active:scale-95"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function ProductSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="aspect-[4/5] rounded-2xl bg-gray-200" />
            <div className="mt-4 space-y-2">
                <div className="h-3 w-1/4 rounded bg-gray-200" />
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-10 w-full rounded-xl bg-gray-200 mt-4" />
            </div>
        </div>
    );
}
