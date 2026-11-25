import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api" });

// Attach the saved token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Turn any error into a readable message
export const errorMessage = (err) =>
  err.response?.data?.message || (err.request ? "Can't reach the server. Check your connection." : "Something went wrong");

export default api;
