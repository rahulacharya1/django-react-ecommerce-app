import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";

export default function EditProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        discount_price: "",
        category: "",
        image: null,
    });
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        Promise.all([API.get(`products/${id}/`), API.get("categories/")])
            .then(([productRes, categoriesRes]) => {
                setForm({
                    name: productRes.data.name,
                    description: productRes.data.description,
                    price: productRes.data.price,
                    discount_price: productRes.data.discount_price || "",
                    category: productRes.data.category,
                    image: null,
                });
                setImagePreview(productRes.data.image);
                setCategories(categoriesRes.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                navigate("/admin/products", { replace: true });
            });
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            const file = files[0];
            setForm({ ...form, image: file });
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setImagePreview(reader.result);
                reader.readAsDataURL(file);
            }
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async () => {
        if (!form.name || !form.description || !form.price || !form.category) {
            setError("Please fill all required fields.");
            return;
        }

        const formData = new FormData();
        Object.keys(form).forEach(key => {
            if (form[key] !== null && form[key] !== "") {
                formData.append(key, form[key]);
            }
        });

        try {
            setUpdating(true);
            setError("");
            await API.put(`products/${id}/update/`, formData);
            navigate("/admin/products", { replace: true });
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to update product.");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-100 border-t-indigo-600" />
                <p className="text-gray-400 font-medium font-inter">Syncing product details...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-full max-w-3xl space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Edit Product</h2>
                    <p className="text-gray-500 mt-2">Update information for <span className="text-indigo-600 font-semibold">"{form.name}"</span></p>
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
                        {/* Image Preview & Upload */}
                        <div className="flex flex-col items-center gap-6 pb-6 border-b border-gray-50">
                            <div className="relative h-48 w-48 overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 shadow-inner">
                                <img
                                    src={imagePreview}
                                    alt="Product"
                                    className="h-full w-full object-cover"
                                    onError={(e) => { e.target.src = "https://via.placeholder.com/200?text=None"; }}
                                />
                            </div>
                            <div className="text-center">
                                <label className="cursor-pointer rounded-xl bg-gray-900 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-indigo-600">
                                    Change Image
                                    <input type="file" name="image" onChange={handleChange} accept="image/*" className="hidden" />
                                </label>
                                <p className="mt-2 text-[10px] font-medium text-gray-400">Leave blank to keep the current file</p>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid gap-6">
                            <div>
                                <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-widest text-gray-400">Product Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-4 font-medium text-gray-900 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                                />
                            </div>

                            <div>
                                <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-widest text-gray-400">Description *</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-4 font-medium text-gray-900 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 resize-none"
                                />
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-widest text-gray-400">Price (₹)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-4 font-medium text-gray-900 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                                />
                            </div>
                            <div>
                                <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-widest text-gray-400">Discounted Price (₹)</label>
                                <input
                                    type="number"
                                    name="discount_price"
                                    value={form.discount_price}
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-4 font-medium text-gray-900 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 ml-1 block text-xs font-bold uppercase tracking-widest text-gray-400">Category</label>
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 p-4 font-medium text-gray-900 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                            >
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-10 flex flex-col gap-4 border-t border-gray-50 pt-8 sm:flex-row">
                        <button
                            onClick={handleSubmit}
                            disabled={updating}
                            className="flex-1 rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-50 shadow-lg shadow-indigo-100"
                        >
                            {updating ? "Saving Changes..." : "Save Changes"}
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
