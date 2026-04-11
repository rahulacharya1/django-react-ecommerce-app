import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function ManageCategories() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({ type: "", text: "" });

  const fetchData = () => {
    API.get("categories/")
      .then(res => setData(res.data))
      .catch(() => setStatus({ type: "error", text: "Failed to load categories." }));
  };

  useEffect(() => { fetchData(); }, []);

  // ❌ DELETE
  const deleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setStatus({ type: "", text: "" });
      API.delete(`categories/${id}/delete/`)
        .then(() => {
          setStatus({ type: "success", text: "Category deleted successfully." });
          fetchData();
        })
        .catch(err => setStatus({ type: "error", text: err.response?.data?.message || "Failed to delete category." }));
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Manage Categories</h2>
        <button
          onClick={() => navigate("/admin/categories/add", { replace: true })}
          className="rounded-lg bg-cyan-600 px-5 py-2 text-white hover:bg-cyan-700"
        >
          + Add New Category
        </button>
      </div>

      {status.text && (
        <div
          className={`mb-4 rounded border p-3 text-sm ${
            status.type === "error"
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-green-200 bg-green-50 text-green-700"
          }`}
        >
          {status.text}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {data.length === 0 ? (
          <p className="py-8 text-center text-slate-500">No categories found. Create one to get started.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 text-slate-600">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map(c => (
                  <tr key={c.id} className="border-t border-slate-200 hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-800">{c.name}</td>
                    <td className="p-3 text-slate-600">{c.description}</td>
                    <td className="space-x-2 p-3 text-center">
                      <button
                        onClick={() => navigate(`/admin/categories/${c.id}/edit`, { replace: true })}
                        className="rounded bg-amber-400 px-3 py-1 text-black hover:bg-amber-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCategory(c.id)}
                        className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
