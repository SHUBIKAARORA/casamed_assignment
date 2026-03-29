import axios from "axios";

const API = axios.create({
  baseURL: "https://casamed-assignment.onrender.com/api", // change if needed
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;