import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { setAuth } from "../utils/auth";
import "../styles/auth.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      // ❌ BLOCK NON-THERAPISTS
      if (res.data.role !== "therapist") {
        alert("Only therapists are allowed to login.");
        return;
      }

      // ✅ store auth
      setAuth(res.data);

      // ✅ always go to therapist dashboard
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Therapist Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter therapist email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p onClick={() => navigate("/register")} className="link">
  Don’t have an account? Register
</p>
    </div>
  );
}

export default Login;