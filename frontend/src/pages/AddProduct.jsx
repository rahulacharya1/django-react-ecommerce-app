import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function AddProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
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
      
      // Create preview
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
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

    if (!form.image) {
      setError("Please select an image.");
      return;
    }

    const formData = new FormData();
    for (let key in form) {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    }

    try {
      setError("");
      await API.post("products/", formData);
      navigate("/admin/products", { replace: true });
    } catch (err) {
      console.error("Error:", err.response?.data);
      setError(err.response?.data?.detail || "Failed to add product.");
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

        {error && (
          <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Product Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              name="description"
              placeholder="Enter product description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price *</label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                value={form.price}
                onChange={handleChange}
                step="0.01"
                className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Discount Price</label>
              <input
                type="number"
                name="discount_price"
                placeholder="Enter discount price (optional)"
                value={form.discount_price}
                onChange={handleChange}
                step="0.01"
                className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Product Image *</label>
            {imagePreview && (
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-24 w-24 object-cover rounded border"
                />
              </div>
            )}
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="w-full border p-3 rounded"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-cyan-600 px-6 py-2 text-white hover:bg-cyan-700"
          >
            Add Product
          </button>
          <button
            onClick={() => navigate("/admin/products", { replace: true })}
            className="rounded-lg bg-slate-200 px-6 py-2 text-slate-700 hover:bg-slate-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
