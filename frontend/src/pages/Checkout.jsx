import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Checkout() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await API.get("cart/");
                setCartItems(res.data || []);
            } catch (err) {
                if (err?.response?.status === 401) {
                    navigate("/login", { replace: true });
                    return;
                }
                setError("Unable to load checkout details.");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [navigate]);

    const subtotal = cartItems.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0);
    const shipping = subtotal > 5000 ? 0 : 150;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header />
            <main className="mx-auto max-w-5xl px-6 py-12">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Checkout</h1>
                        <p className="mt-2 text-sm text-gray-500">Review your order before placing it.</p>
                    </div>
                    <Link to="/cart" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">Back to cart</Link>
                </div>

                {loading ? (
                    <div className="rounded-3xl border border-gray-100 bg-white p-10 text-gray-500 shadow-sm">Loading checkout...</div>
                ) : error ? (
                    <div className="rounded-3xl border border-red-100 bg-red-50 p-6 text-sm font-medium text-red-600">{error}</div>
                ) : cartItems.length === 0 ? (
                    <div className="rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm">
                        <p className="text-gray-500">Your cart is empty.</p>
                        <Link to="/" className="mt-4 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white">Go Shopping</Link>
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                                    <img src={item.image || "https://via.placeholder.com/120"} alt={item.name} className="h-20 w-20 rounded-xl object-cover" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="font-bold text-gray-900">₹{Number(item.price) * Number(item.quantity)}</div>
                                </div>
                            ))}
                        </div>

                        <aside className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm h-fit">
                            <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                            <div className="mt-6 space-y-3 text-sm">
                                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span className="text-gray-900">₹{subtotal}</span></div>
                                <div className="flex justify-between text-gray-500"><span>Shipping</span><span className="text-gray-900">{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
                                <div className="flex justify-between border-t border-gray-100 pt-3 text-base font-bold text-gray-900"><span>Total</span><span>₹{total}</span></div>
                            </div>
                            <button className="mt-6 w-full rounded-2xl bg-gray-900 py-4 text-sm font-bold text-white transition-all hover:bg-indigo-600">Place Order</button>
                            <p className="mt-3 text-center text-xs text-gray-400">Demo checkout page for now.</p>
                        </aside>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
