import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function AddProduct() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        discount_price: "",
        category: "",
        image: null,
    });

    useEffect(() => {
        API.get("categories/").then(res => setCategories(res.data));
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            const file = files[0];
            setForm({ ...form, image: file });
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setImagePreview(reader.result);
                reader.readAsDataURL(file);
            } else {
                setImagePreview(null);
            }
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async () => {
        if (!form.name || !form.description || !form.price || !form.category || !form.image) {
            setError("Please fill all required fields and upload an image.");
            return;
        }

        const formData = new FormData();
        Object.keys(form).forEach(key => {
            if (form[key]) formData.append(key, form[key]);
        });

        try {
            setLoading(true);
            setError("");
            await API.post("products/create/", formData);
            navigate("/admin/products", { replace: true });
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to add product. Check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-full max-w-3xl space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Add New Product</h2>
                    <p className="text-gray-500 mt-2">Fill in the details to list a new item in your store.</p>
                </div>

                <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 md:p-12 shadow-sm">
                    {error && (
                        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <div className="space-y-6">
                        {/* Image Upload Area */}
                        <div className="group relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 transition-all hover:border-indigo-400 hover:bg-white">
                            {imagePreview ? (
                                <div className="relative h-40 w-40 overflow-hidden rounded-2xl shadow-md">
                                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                                    <button
                                        onClick={() => { setImagePreview(null); setForm({ ...form, image: null }) }}
                                        className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white shadow-sm hover:bg-red-600"
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm transition-colors group-hover:text-indigo-600">
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Upload Product Image</p>
                                </div>
                            )}
                            <input
                                type="file"
                                name="image"
                                onChange={handleChange}
                                accept="image/*"
                                className="absolute inset-0 cursor-pointer opacity-0"
                            />
                        </div>

                        {/* Basic Info */}
                        <div className="grid gap-6">
                            <div>
                                <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-widest text-gray-400">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. Minimalist Leather Watch"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-4 font-medium text-gray-900 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                                />
                            </div>

                            <div>
                                <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-widest text-gray-400">Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Describe the features and materials..."
                                    value={form.description}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-4 font-medium text-gray-900 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 resize-none"
                                />
                            </div>
                        </div>

                        {/* Pricing & Category Grid */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-widest text-gray-400">Base Price (₹)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-4 font-medium text-gray-900 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                                />
                            </div>
                            <div>
                                <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-widest text-gray-400">Category</label>
                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="w-full appearance-none rounded-2xl border border-gray-100 bg-gray-50/50 p-4 font-medium text-gray-900 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-10 flex flex-col gap-4 border-t border-gray-50 pt-8 sm:flex-row">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-1 rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-50 shadow-lg shadow-indigo-100"
                        >
                            {loading ? "Adding Product..." : "Add Product"}
                        </button>
                        <button
                            onClick={() => navigate("/admin/products")}
                            className="flex-1 rounded-2xl border border-gray-100 bg-white px-8 py-4 text-sm font-bold text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-700"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
