import { useEffect, useState } from "react";
import API from "../../services/api";

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const itemsPerPage = 8;

    const fetchUsers = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await API.get("users/", {
                params: {
                    page: currentPage,
                    page_size: itemsPerPage,
                    search: searchTerm,
                    role: roleFilter,
                },
            });
            const payload = res.data || {};
            setUsers(payload.results || []);
            setTotalCount(Number(payload.count || 0));
            setTotalPages(Number(payload.total_pages || 1));
            if (payload.current_page && payload.current_page !== currentPage) {
                setCurrentPage(payload.current_page);
            }
        } catch (err) {
            setError("Failed to load users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [currentPage, searchTerm, roleFilter]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, roleFilter]);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Users</h1>
                    <p className="mt-1 text-sm font-medium text-gray-500">Manage and monitor registered users.</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Total</p>
                    <p className="text-2xl font-bold text-gray-900">{loading ? "..." : totalCount}</p>
                </div>
            </div>

            {error && (
                <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600">
                    {error}
                </div>
            )}

            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
                <div className="flex flex-col gap-3 border-b border-gray-100 bg-gray-50/40 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search username, email, or name"
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 sm:w-80"
                    />
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr className="text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                <th className="px-6 py-4">Username</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td className="px-6 py-6 text-sm text-gray-500" colSpan={6}>Loading users...</td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td className="px-6 py-6 text-sm text-gray-500" colSpan={6}>No matching users found.</td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="text-sm text-gray-700">
                                        <td className="px-6 py-4 font-semibold text-gray-900">{user.username}</td>
                                        <td className="px-6 py-4">{user.email || "-"}</td>
                                        <td className="px-6 py-4">{`${user.first_name || ""} ${user.last_name || ""}`.trim() || "-"}</td>
                                        <td className="px-6 py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-bold ${user.is_staff ? "bg-indigo-50 text-indigo-600" : "bg-gray-100 text-gray-600"}`}>
                                                {user.is_staff ? "Admin" : "User"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`rounded-full px-3 py-1 text-xs font-bold ${user.is_active ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                                                {user.is_active ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{user.date_joined ? new Date(user.date_joined).toLocaleDateString() : "-"}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

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
