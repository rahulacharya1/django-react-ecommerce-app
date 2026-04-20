import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Signup() {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (token) {
            navigate("/", { replace: true });
        }
    }, [token, navigate]);

    const handleSignup = async () => {
        // Validation
        if (!form.first_name || !form.last_name || !form.username || !form.email || !form.password || !form.confirm_password) {
            setError("Please fill in all fields.");
            return;
        }

        if (form.password !== form.confirm_password) {
            setError("Passwords do not match.");
            return;
        }

        if (form.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const res = await API.post("signup/", {
                first_name: form.first_name,
                last_name: form.last_name,
                username: form.username,
                email: form.email,
                password: form.password,
                confirm_password: form.confirm_password,
            });

            // Save authentication data
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("username", res.data.username);
            sessionStorage.setItem("is_staff", String(res.data.is_staff));

            // Redirect to home page for regular users
            navigate("/", { replace: true });

        } catch (err) {
            console.error("Signup error:", err);
            const errorMessage = err.response?.data?.detail || 
                                err.response?.data?.username?.[0] ||
                                err.response?.data?.email?.[0] ||
                                err.response?.data?.password?.[0] ||
                                "Signup failed. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col bg-gray-100">
            <Header />

            <main className="flex flex-1 min-h-screen items-center justify-center px-6 py-12">
                <div className="w-full max-w-md rounded-[1.5rem] border border-gray-100 bg-white p-10 shadow-sm transition-all hover:shadow-md">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Create Account</h2>
                        <p className="mt-2 text-sm text-gray-500 font-medium">
                            Join us and start shopping today.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 rounded-2xl bg-red-50 p-4 text-center text-sm font-medium text-red-600 border border-red-100 animate-in fade-in slide-in-from-top-1">
                            {error}
                        </div>
                    )}

                    <div className="space-y-3">
                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-1/2 rounded-2xl border border-gray-100 bg-gray-50/50 p-4 font-medium text-gray-900 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                                value={form.first_name}
                                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-1/2 rounded-2xl border border-gray-100 bg-gray-50/50 p-4 font-medium text-gray-900 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                                value={form.last_name}
                                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-4 font-medium text-gray-900 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-4 font-medium text-gray-900 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-4 font-medium text-gray-900 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-4 font-medium text-gray-900 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                                value={form.confirm_password}
                                onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
                            />
                        </div>

                        <button
                            onClick={handleSignup}
                            disabled={loading}
                            className="mt-2 w-full rounded-2xl bg-gray-900 py-4 font-bold text-white transition-all hover:bg-indigo-600 active:scale-95 disabled:opacity-50 shadow-lg shadow-gray-200"
                        >
                            {loading ? "Creating Account..." : "Sign Up"}
                        </button>
                    </div>

                    <div className="mt-6 text-center text-sm">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
