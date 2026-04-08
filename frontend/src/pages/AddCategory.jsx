import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCategory() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch("http://127.0.0.1:8000/api/categories/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description }),
        })
            .then((res) => res.json())
            .then(() => {
                navigate("/");
            })
            .finally(() => setLoading(false));
    };

    const inputClasses = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none";

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-10">

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">Create Category</h2>
                    <p className="text-slate-500 mt-1 text-sm">Fill in the details below to organize your collection.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Category Name</label>
                        <input
                            type="text"
                            required
                            className={inputClasses}
                            placeholder="e.g. Electronics, Home Decor"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Description</label>
                        <textarea
                            rows="4"
                            className={`${inputClasses} resize-none`}
                            placeholder="Briefly describe what goes in this category..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="flex-1 px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? "Saving..." : "Create Category"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCategory;
