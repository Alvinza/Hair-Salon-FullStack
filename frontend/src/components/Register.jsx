import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("/auth/register", { username, password, isAdmin: false });
      toast.success('Registration successfully')
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#fce4ec] px-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-center text-[#d63384] text-2xl font-bold mb-4">
          Register
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label text-gray-700 font-medium">Username</label>
            <input
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn btn-secondary w-full"
            style={{ backgroundColor: "#d63384", color: "#fff", fontWeight: "bold" }}
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-[#d63384]">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
