import axios from "axios";

// Connects frontend to backend API and attaches token to requests
// Base URL points to my backend hosted on Render
const API = axios.create({
  baseURL: "https://salon-backend-autl.onrender.com/api",
});

// Attach token (if exists) to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
