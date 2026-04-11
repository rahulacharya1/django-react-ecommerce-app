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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <Header />

      <main className="mx-auto max-w-7xl p-6 md:p-8">
        <section className="mb-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
          <p className="mb-3 inline-flex rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-700">
            New Collection
          </p>
          <h1 className="max-w-2xl text-3xl font-black leading-tight text-slate-900 md:text-5xl">
            Shop smarter with curated products and clean categories.
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600 md:text-lg">
            Discover trending products, better prices, and categories designed to help you find what you need fast.
          </p>
        </section>

        {/* Categories Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">
              Browse Categories
            </h2>
            <button className="text-cyan-700 hover:text-cyan-800 font-semibold text-sm">View All</button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={`category-skeleton-${i}`}
                    className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="mx-auto h-5 w-24 rounded bg-slate-200" />
                  </div>
                ))
              : categories.map((c) => (
                  <div
                    key={c.id}
                    className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-md"
                  >
                    <span className="font-semibold text-slate-700 group-hover:text-cyan-700">
                      {c.name}
                    </span>
                  </div>
                ))}
          </div>
        </section>

        {/* Products Section */}
        <section>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-slate-900">
            Featured Products
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={`product-skeleton-${i}`}
                    className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >
                    <div className="aspect-square bg-slate-200" />
                    <div className="space-y-3 p-5">
                      <div className="h-3 w-20 rounded bg-slate-200" />
                      <div className="h-5 w-3/4 rounded bg-slate-200" />
                      <div className="h-6 w-1/2 rounded bg-slate-200" />
                      <div className="h-10 w-full rounded bg-slate-200" />
                    </div>
                  </div>
                ))
              : products.map((p) => (
                  <div
                    key={p.id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-slate-200">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute right-2 top-2">
                        <button className="rounded-full bg-white/85 p-2 text-slate-600 shadow-sm backdrop-blur-sm hover:bg-white">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-cyan-700">
                        {categories.find(c => c.id === p.category)?.name || "Uncategorized"}
                      </p>
                      <h3 className="mb-2 truncate text-lg font-semibold text-slate-800">
                        {p.name}
                      </h3>

                      <div className="mb-4 flex items-end justify-between">
                        <div>
                          {p.discount_price ? (
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-black text-slate-900">₹{p.discount_price}</span>
                              <span className="text-sm text-slate-500 line-through">₹{p.price}</span>
                            </div>
                          ) : (
                            <span className="text-xl font-black text-slate-900">₹{p.price}</span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => navigate(`/product/${p.id}`)}
                        className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-700"
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
