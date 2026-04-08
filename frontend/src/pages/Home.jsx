import { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";

function Home() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/categories/")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <main className="min-h-screen bg-slate-50/50 pb-20">
            <div className="bg-white border-b border-slate-100 mb-8">
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Categories
                    </h1>
                    <p className="mt-2 text-slate-500 max-w-2xl">
                        Browse and manage your item categories. Organized by relevance and recent activity.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-48 rounded-2xl bg-slate-100 animate-pulse" />
                        ))}
                    </div>
                ) : categories.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((cat) => (
                            <CategoryCard key={cat.id} cat={cat} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                        <div className="mx-auto w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <span className="text-2xl">📁</span>
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">No categories found</h3>
                        <p className="text-slate-500 mt-1">Try adding a new category to get started.</p>
                    </div>
                )}
            </div>
        </main>
    );
}

export default Home;
