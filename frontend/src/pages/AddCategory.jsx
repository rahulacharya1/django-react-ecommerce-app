import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function AddCategory() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async () => {
        if (!form.name || !form.description) {
            setError("Please fill in both the category name and description.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            await API.post("categories/", form);
            navigate("/admin/categories", { replace: true });
        } catch (err) {
            console.error("Error:", err.response?.data);
            setError(err.response?.data?.detail || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center justify-center">
            {/* Header */}
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">New Category</h2>
                <p className="text-gray-500 font-medium">Define a new segment for your product catalog.</p>
            </div>

            <div className="w-full max-w-2xl rounded-[2.5rem] border border-gray-100 bg-white p-10 shadow-sm">
                {error && (
                    <div className="mb-8 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </div>
                )}

                <div className="space-y-6">
                    {/* Category Name Input */}
                    <div>
                        <label className="block text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">
                            Category Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="e.g. Electronics, Home Decor..."
                            value={form.name}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-4 text-gray-900 transition-all focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 font-medium placeholder:text-gray-300"
                        />
                    </div>

                    {/* Description Input */}
                    <div>
                        <label className="block text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            placeholder="Provide a brief summary of what's in this category..."
                            value={form.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-4 text-gray-900 transition-all focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 font-medium placeholder:text-gray-300 resize-none"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 mt-10 pt-8 border-t border-gray-50">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-indigo-100"
                    >
                        {loading ? "Creating..." : "Create Category"}
                    </button>
                    <button
                        onClick={() => navigate("/admin/categories")}
                        className="flex-1 rounded-2xl border border-gray-100 bg-white px-8 py-4 text-sm font-bold text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-700"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
