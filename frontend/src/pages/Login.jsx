import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
      console.log("Login Success:", res.data);

      if (res.data && res.data.user) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // Redirect by role
        if (res.data.user.role === "freelancer") {
          window.location.href = "/freelancer-dashboard";
        } else if (res.data.user.role === "client") {
          window.location.href = "/client-dashboard";
        } else {
          alert("Unknown user role!");
        }
      } else {
        setError("Login response incomplete.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h1>Welcome Back 👋</h1>
        <p>Please log in to continue</p>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-box">{error}</div>}

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="register-text">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
