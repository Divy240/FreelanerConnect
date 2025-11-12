import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "freelancer",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "freelancer") {
        window.location.href = "/freelancer-dashboard";
      } else {
        window.location.href = "/client-dashboard";
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />

        <select name="role" onChange={handleChange}>
          <option value="freelancer">Freelancer</option>
          <option value="client">Client</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
