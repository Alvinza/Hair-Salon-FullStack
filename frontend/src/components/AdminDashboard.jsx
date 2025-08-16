import React, { useEffect, useState, useRef } from "react";
import API from "../api";

function AdminDashboard() {
  const [styles, setStyles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  // Fetch styles
  const fetchStyles = () => {
    API.get("/styles")
      .then((res) => setStyles(res.data))
      .catch((err) => setError("Failed to load styles"));
  };

  useEffect(() => {
    fetchStyles();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle add or update style
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.price) {
      setError("Name and price are required");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      if (formData.image) data.append("image", formData.image);

      if (editId) {
        await API.put(`/styles/${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post("/styles", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setFormData({ name: "", description: "", price: "", image: null });
      if (fileInputRef.current) fileInputRef.current.value = null;
      setEditId(null);
      fetchStyles();
    } catch (err) {
      setError("Failed to save style");
    }
  };

  // Edit button clicked
  const handleEdit = (style) => {
    setEditId(style._id);
    setFormData({
      name: style.name,
      description: style.description,
      price: style.price,
      image: null,
    });
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  // Delete style
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this style?")) return;

    try {
      await API.delete(`/styles/${id}`);
      fetchStyles();
    } catch {
      setError("Failed to delete style");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-6 md:p-12">
      <h2 className="text-2xl md:text-3xl font-bold text-[#ff4081] mb-6">
        Admin Dashboard
      </h2>

      {error && <div className="alert alert-danger mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        {/* Name */}
        <div className="mb-3">
          <label className="block mb-1">Name *</label>
          <input
            type="text"
            name="name"
            className="form-control w-full"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              backgroundColor: "#1e1e1e",
              color: "#fff",
              borderColor: "#444",
            }}
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            className="form-control w-full"
            value={formData.description}
            onChange={handleChange}
            style={{
              backgroundColor: "#1e1e1e",
              color: "#fff",
              borderColor: "#444",
            }}
          />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="block mb-1">Price *</label>
          <input
            type="number"
            name="price"
            className="form-control w-full"
            value={formData.price}
            onChange={handleChange}
            required
            style={{
              backgroundColor: "#1e1e1e",
              color: "#fff",
              borderColor: "#444",
            }}
          />
        </div>

        {/* Image */}
        <div className="mb-3">
          <label className="block mb-1">
            Image {editId ? "(Upload new to replace)" : ""}
          </label>
          <input
            type="file"
            name="image"
            className="form-control w-full"
            onChange={handleChange}
            ref={fileInputRef}
            accept="image/*"
            style={{ backgroundColor: "#1e1e1e", color: "#fff" }}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            className="btn"
            style={{
              backgroundColor: "#ff4081",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {editId ? "Update Style" : "Add Style"}
          </button>

          {editId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setEditId(null);
                setFormData({
                  name: "",
                  description: "",
                  price: "",
                  image: null,
                });
                if (fileInputRef.current) fileInputRef.current.value = null;
                setError("");
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <hr className="border-gray-700 mb-6" />

      <h3 className="text-xl md:text-2xl text-[#ff4081] mb-4">
        Existing Styles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {styles.map((style) => (
          <div
            key={style._id}
            className="bg-[#1e1e1e] rounded-lg shadow overflow-hidden"
          >
            {style.image && (
             <img
  src={`https://salon-backend-autl.onrender.com/uploads/${style.image)}`}
  alt={style.name}
  className="w-full h-48 object-cover"
/>

            )}
            <div className="p-4">
              <h5 className="text-lg font-semibold">{style.name}</h5>
              <p className="text-gray-300">{style.description}</p>
              <p className="text-[#ff4081] font-bold text-lg">R{style.price}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => handleEdit(style)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(style._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {styles.length === 0 && <p>No styles available.</p>}
      </div>
    </div>
  );
}

export default AdminDashboard;
