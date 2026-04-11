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
      setError("All fields are required.");
      return;
    }

    try {
      setError("");
      await API.put(`categories/${id}/update/`, form);
      navigate("/admin/categories", { replace: true });
    } catch (err) {
      console.error("Error:", err.response?.data);
      setError(err.response?.data?.detail || "Failed to update category.");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="w-full">
      <div className="max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Edit Category</h2>

        {error && (
          <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter category name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Enter description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-cyan-600 px-6 py-2 text-white hover:bg-cyan-700"
          >
            Update Category
          </button>
          <button
            onClick={() => navigate("/admin/categories", { replace: true })}
            className="rounded-lg bg-slate-200 px-6 py-2 text-slate-700 hover:bg-slate-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
