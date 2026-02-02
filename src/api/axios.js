import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  withCredentials: true, // THIS IS REQUIRED FOR SESSION. Without this → login will work ONCE but session won’t persist
});

export default api;
