import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ProductView() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("");

    useEffect(() => {
        Promise.all([API.get(`products/${id}/`), API.get("categories/")])
            .then(([productRes, categoriesRes]) => {
                setProduct(productRes.data);
                setCategories(categoriesRes.data || []);
            })
            .catch(() => setStatus("Unable to load product details."))
            .finally(() => setLoading(false));
    }, [id]);

    const displayCategoryName = product
        ? categories.find((c) => String(c.id) === String(product.category))?.name ||
        product.category_name ||
        "Uncategorized"
        : "Uncategorized";

    const addToCart = () => {
        if (!product) return;
        const existing = JSON.parse(localStorage.getItem("cart") || "[]");
        const found = existing.find((item) => item.id === product.id);

        if (found) {
            found.qty += 1;
        } else {
            existing.push({
                id: product.id,
                name: product.name,
                price: product.discount_price || product.price,
                image: product.image,
                qty: 1,
            });
        }

        localStorage.setItem("cart", JSON.stringify(existing));
        setStatus("Added to cart successfully.");
        setTimeout(() => setStatus(""), 3000); // Clear status after 3s
    };

    return (
        <div className="min-h-screen bg-[#FBFCFE]">
            <Header />

            <main className="mx-auto max-w-7xl px-6 py-8 md:py-12">
                {loading ? (
                    <ProductLoader />
                ) : product ? (
                    <div className="space-y-8">
                        {/* Minimal Breadcrumb */}
                        <nav className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gray-400">
                            <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-900">{displayCategoryName}</span>
                        </nav>

                        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
                            {/* Product Image - Large & Clean */}
                            <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-gray-100 shadow-sm border border-gray-100">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                    onError={(e) => { e.target.src = "https://via.placeholder.com/800x1000?text=No+Image"; }}
                                />
                            </div>

                            {/* Product Info */}
                            <div className="flex flex-col pt-4">
                                <span className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                                    {displayCategoryName}
                                </span>

                                <h1 className="mb-4 text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">
                                    {product.name}
                                </h1>

                                <div className="mb-8 flex items-baseline gap-4">
                                    {product.discount_price ? (
                                        <>
                                            <span className="text-3xl font-bold text-gray-900">₹{product.discount_price}</span>
                                            <span className="text-xl text-gray-400 line-through">₹{product.price}</span>
                                            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600 uppercase">Save Extra</span>
                                        </>
                                    ) : (
                                        <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                                    )}
                                </div>

                                <div className="mb-8 border-t border-gray-100 pt-8">
                                    <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-900">Description</h3>
                                    <p className="text-lg leading-relaxed text-gray-500">
                                        {product.description || "No description available for this item."}
                                    </p>
                                </div>

                                {/* Status Message */}
                                {status && (
                                    <div className="mb-6 flex items-center gap-2 rounded-xl bg-indigo-50 p-4 text-sm font-medium text-indigo-700 animate-in fade-in slide-in-from-bottom-2">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        {status}
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <button
                                        onClick={addToCart}
                                        className="flex-1 rounded-2xl bg-gray-900 px-8 py-5 text-sm font-bold text-white transition-all hover:bg-gray-800 active:scale-95 shadow-lg shadow-gray-200"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        className="flex-1 rounded-2xl border-2 border-gray-900 px-8 py-5 text-sm font-bold text-gray-900 transition-all hover:bg-gray-50 active:scale-95"
                                    >
                                        Buy It Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <h2 className="text-2xl font-semibold text-gray-900">Item not found</h2>
                        <Link to="/" className="mt-4 text-indigo-600 font-medium underline">Back to Shopping</Link>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

function ProductLoader() {
    return (
        <div className="grid gap-12 lg:grid-cols-2">
            <div className="aspect-[4/5] animate-pulse rounded-[2.5rem] bg-gray-100" />
            <div className="space-y-6 pt-4">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
                <div className="h-12 w-3/4 animate-pulse rounded bg-gray-100" />
                <div className="h-8 w-1/4 animate-pulse rounded bg-gray-100" />
                <div className="h-32 w-full animate-pulse rounded bg-gray-100" />
            </div>
        </div>
    );
}
