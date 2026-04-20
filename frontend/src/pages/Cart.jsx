import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock data for initial UI build - Replace with your API logic
    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true);
            try {
                // const res = await API.get("cart/");
                // setCartItems(res.data);

                // TEMPORARY: Mock data to see the UI
                setCartItems([
                    { id: 1, name: "Minimalist Leather Watch", price: 1200, quantity: 1, image: "https://via.placeholder.com/150" },
                    { id: 2, name: "Premium Canvas Backpack", price: 2500, quantity: 1, image: "https://via.placeholder.com/150" }
                ]);
            } catch (err) {
                console.error("Cart fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);

    const updateQuantity = (id, delta) => {
        setCartItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 5000 ? 0 : 150;
    const total = subtotal + shipping;

    if (loading) return <div className="flex min-h-screen items-center justify-center">Loading Cart...</div>;

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header />

            <div className="mx-auto max-w-7xl px-6 py-12">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-10">Your Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-[2.5rem] bg-white p-20 shadow-sm border border-gray-100">
                        <div className="mb-6 rounded-full bg-gray-50 p-6 text-gray-300">
                            <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <p className="text-xl font-medium text-gray-500">Your cart is empty</p>
                        <Link to="/" className="mt-6 rounded-2xl bg-indigo-600 px-8 py-3 font-bold text-white transition-all hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-100">
                            Go Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">

                        {/* Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                                    <img src={item.image} alt={item.name} className="h-32 w-32 rounded-2xl object-cover border border-gray-50" />

                                    <div className="flex-1 text-center sm:text-left">
                                        <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                                        <p className="text-indigo-600 font-bold mt-1">₹{item.price}</p>

                                        <div className="mt-4 flex items-center justify-center sm:justify-start gap-4">
                                            <div className="flex items-center rounded-xl border border-gray-100 bg-gray-50 p-1">
                                                <button onClick={() => updateQuantity(item.id, -1)} className="h-8 w-8 rounded-lg bg-white text-gray-600 shadow-sm transition-hover hover:bg-gray-100">-</button>
                                                <span className="px-4 text-sm font-bold text-gray-700">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)} className="h-8 w-8 rounded-lg bg-white text-gray-600 shadow-sm transition-hover hover:bg-gray-100">+</button>
                                            </div>
                                            <button onClick={() => removeItem(item.id)} className="text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors">
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    <div className="hidden sm:block text-right">
                                        <p className="text-lg font-bold text-gray-900">₹{item.price * item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-28 rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm font-medium text-gray-500">
                                        <span>Subtotal</span>
                                        <span className="text-gray-900">₹{subtotal}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-medium text-gray-500">
                                        <span>Shipping</span>
                                        <span className="text-gray-900">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                                    </div>
                                    <div className="border-t border-gray-50 pt-4 flex justify-between">
                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                        <span className="text-2xl font-bold text-indigo-600">₹{total}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate("/checkout")}
                                    className="mt-8 w-full rounded-2xl bg-gray-900 py-4 font-bold text-white transition-all hover:bg-indigo-600 active:scale-95 shadow-xl shadow-gray-100"
                                >
                                    Proceed to Checkout
                                </button>

                                <p className="mt-4 text-center text-xs text-gray-400 font-medium">
                                    Taxes calculated at next step.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
