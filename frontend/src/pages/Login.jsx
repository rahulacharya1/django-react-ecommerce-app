import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (token) {
            // If already logged in, redirect based on user type
            const isStaff = sessionStorage.getItem("is_staff") === "true";
            navigate(isStaff ? "/admin" : "/", { replace: true });
        }
    }, [token, navigate]);

    const handleLogin = async () => {
        if (!form.username || !form.password) {
            setError("Please enter both username and password.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const res = await API.post("login/", form);

            // Save authentication data
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("username", res.data.username);
            sessionStorage.setItem("is_staff", String(res.data.is_staff));

            // Redirect based on user type
            if (res.data.is_staff) {
                navigate("/admin", { replace: true });
            } else {
                navigate("/", { replace: true });
            }

        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.error || "Invalid username or password.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <div className="flex flex-col bg-gray-100">
            <Header />

            <main className="flex flex-1 min-h-screen items-center justify-center px-6 py-12">
                <div className="w-full max-w-md rounded-[1.5rem] border border-gray-100 bg-white p-10 shadow-sm transition-all hover:shadow-md">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Sign In</h2>
                        <p className="mt-2 text-sm text-gray-500 font-medium">
                            Welcome back! Sign in to your account.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 rounded-2xl bg-red-50 p-4 text-center text-sm font-medium text-red-600 border border-red-100 animate-in fade-in slide-in-from-top-1">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-4 font-medium text-gray-900 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                onKeyPress={handleKeyPress}
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-4 font-medium text-gray-900 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                onKeyPress={handleKeyPress}
                            />
                        </div>

                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="mt-2 w-full rounded-2xl bg-gray-900 py-4 font-bold text-white transition-all hover:bg-indigo-600 active:scale-95 disabled:opacity-50 shadow-lg shadow-gray-200"
                        >
                            {loading ? "Authenticating..." : "Sign In"}
                        </button>
                    </div>

                    <div className="mt-6 text-center text-sm">
                        <p className="text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

