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
    setStatus("Added to cart.");
  };

  const buyNow = () => {
    addToCart();
    setStatus("Added to cart. Checkout page coming next.");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="mx-auto max-w-6xl p-6 md:p-8">
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2">
            <div className="aspect-square animate-pulse rounded-2xl bg-slate-200" />
            <div className="space-y-4">
              <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
              <div className="h-10 w-3/4 animate-pulse rounded bg-slate-200" />
              <div className="h-6 w-1/3 animate-pulse rounded bg-slate-200" />
              <div className="h-24 w-full animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        ) : product ? (
          <div className="space-y-4">
            <nav className="text-sm text-slate-500">
              <Link to="/" className="hover:text-cyan-700">Home</Link>
              <span className="mx-2">/</span>
              <span>{displayCategoryName}</span>
              <span className="mx-2">/</span>
              <span className="font-medium text-slate-700">{product.name}</span>
            </nav>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-slate-700">Browse Categories</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => {
                  const isCurrent = String(c.id) === String(product.category);
                  return (
                    <span
                      key={c.id}
                      className={`rounded-full px-3 py-1 text-sm ${
                        isCurrent
                          ? "bg-cyan-600 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {c.name}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="grid items-start gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              <img
                src={product.image}
                alt={product.name}
                className="aspect-square w-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600?text=No+Image";
                }}
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-cyan-700">
                {displayCategoryName}
              </p>
              <p className="mb-2 text-sm text-slate-600">
                Category: <span className="font-semibold text-slate-800">{displayCategoryName}</span>
              </p>
              <h1 className="mb-3 text-3xl font-black text-slate-900">{product.name}</h1>

              <div className="mb-5">
                {product.discount_price ? (
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-black text-slate-900">₹{product.discount_price}</span>
                    <span className="text-lg text-slate-500 line-through">₹{product.price}</span>
                  </div>
                ) : (
                  <span className="text-3xl font-black text-slate-900">₹{product.price}</span>
                )}
              </div>

              <p className="mb-6 leading-relaxed text-slate-600">{product.description}</p>

              {status && (
                <div className="mb-4 rounded border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                  {status}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={addToCart}
                  className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Add to Cart
                </button>
                <button
                  onClick={buyNow}
                  className="rounded-lg bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-700"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          </div>
        ) : (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {status || "Product not found."}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}