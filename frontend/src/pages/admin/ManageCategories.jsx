import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function ManageCategories() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState({ type: "", text: "" });
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 6;

    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = () => {
        setLoading(true);
        API.get("categories/", {
            params: {
                page: currentPage,
                page_size: itemsPerPage,
                search: searchTerm,
            },
        })
            .then(res => {
                const payload = res.data || {};
                setData(payload.results || []);
                setTotalCount(Number(payload.count || 0));
                setTotalPages(Number(payload.total_pages || 1));
                if (payload.current_page && payload.current_page !== currentPage) {
                    setCurrentPage(payload.current_page);
                }
            })
            .catch(() => setStatus({ type: "error", text: "Failed to load categories." }))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, searchTerm]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const deleteCategory = (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            setStatus({ type: "", text: "" });
            API.delete(`categories/${id}/delete/`)
                .then(() => {
                    setStatus({ type: "success", text: "Category removed successfully." });
                    fetchData();
                })
                .catch(err => setStatus({ type: "error", text: err.response?.data?.message || "Action failed." }));
        }
    };

    return (
        <div className="w-full space-y-8">
            {/* Header Section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-3xl font-semibold tracking-tight text-gray-900">Categories</h2>
                    <p className="text-gray-500 font-medium">Organize and structure your store collection.</p>
                </div>
                <button
                    onClick={() => navigate("/admin/categories/add", { replace: true })}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-100"
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                    New Category
                </button>
            </div>

            {/* Alert Status */}
            {status.text && (
                <div className={`flex items-center gap-3 rounded-2xl border p-4 text-sm font-medium animate-in fade-in slide-in-from-top-2 ${status.type === "error" ? "border-red-100 bg-red-50 text-red-600" : "border-emerald-100 bg-emerald-50 text-emerald-600"
                    }`}>
                    {status.text}
                </div>
            )}

            {/* Table Container */}
            <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
                <div className="flex flex-col gap-4 border-b border-gray-100 bg-gray-50/40 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm font-medium text-gray-500">
                        Showing {totalCount} categories
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search category by name or description"
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 sm:w-80"
                    />
                </div>

                {loading ? (
                    <div className="p-20 flex flex-col items-center gap-4">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-100 border-t-indigo-600" />
                        <p className="text-gray-400 font-medium">Syncing categories...</p>
                    </div>
                ) : data.length === 0 ? (
                    <div className="p-20 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 text-gray-300">
                            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                        </div>
                        <p className="text-gray-500 font-medium">No matching categories found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-50 bg-gray-50/50 text-xs font-bold uppercase tracking-widest text-gray-400">
                                    <th className="px-8 py-5">Category Name</th>
                                    <th className="px-8 py-5">Description</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {data.map(c => (
                                    <tr key={c.id} className="group transition-colors hover:bg-gray-50/50">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 font-bold">
                                                    {c.name.charAt(0)}
                                                </div>
                                                <span className="font-semibold text-gray-900">{c.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="max-w-xs truncate text-sm text-gray-500" title={c.description}>
                                                {c.description || "No description provided."}
                                            </p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => navigate(`/admin/categories/${c.id}/edit`, { replace: true })}
                                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-600 transition-all hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                                                    title="Edit"
                                                >
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                </button>
                                                <button
                                                    onClick={() => deleteCategory(c.id)}
                                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-600 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                                    title="Delete"
                                                >
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {!loading && totalCount > 0 && (
                    <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
                        <p className="text-sm text-gray-500">
                            Page {currentPage} of {Math.max(1, totalPages)}
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
