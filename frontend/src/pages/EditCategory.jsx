import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

export default function EditCategory() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form, setForm] = useState({
        name: "",
        description: "",
    });
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        API.get(`categories/${id}/`)
            .then(res => {
                setForm(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching category:", err);
                navigate("/admin/categories", { replace: true });
            });
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async () => {
        if (!form.name || !form.description) {
            setError("Please ensure both the name and description are filled out.");
            return;
        }

        try {
            setUpdating(true);
            setError("");
            await API.put(`categories/${id}/update/`, form);
            navigate("/admin/categories", { replace: true });
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to save changes. Please try again.");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-100 border-t-indigo-600" />
                <p className="text-gray-400 font-medium">Loading category data...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header Area */}
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Edit Category</h2>
                <p className="text-gray-500 font-medium">Update the details for <span className="text-indigo-600">"{form.name}"</span></p>
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
                    {/* Input: Category Name */}
                    <div>
                        <label className="mb-2 ml-1 block text-sm font-bold uppercase tracking-widest text-gray-400">
                            Category Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="e.g. Premium Footwear"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-4 font-medium text-gray-900 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                        />
                    </div>

                    {/* Input: Description */}
                    <div>
                        <label className="mb-2 ml-1 block text-sm font-bold uppercase tracking-widest text-gray-400">
                            Description
                        </label>
                        <textarea
                            name="description"
                            placeholder="Describe what items belong in this category..."
                            value={form.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-4 font-medium text-gray-900 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 resize-none"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-10 flex items-center gap-4 border-t border-gray-50 pt-8">
                    <button
                        onClick={handleSubmit}
                        disabled={updating}
                        className="flex-1 rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-indigo-700 active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-indigo-100"
                    >
                        {updating ? "Saving Changes..." : "Update Category"}
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
