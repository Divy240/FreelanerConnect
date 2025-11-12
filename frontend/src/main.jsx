import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Register from "./pages/Register";
import Login from "./pages/Login";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

const Unauthorized = () => (
  <div style={{ padding: 30 }}>
    <h2>Access Denied 🚫</h2>
    <p>You are not authorized to view this page.</p>
    <a href="/login">Go to Login</a>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Role-protected dashboards */}
     <Route
  path="/freelancer-dashboard"
  element={
    <RoleProtectedRoute allowedRole="freelancer">
      <FreelancerDashboard />
    </RoleProtectedRoute>
  }
/>
<Route
  path="/client-dashboard"
  element={
    <RoleProtectedRoute allowedRole="client">
      <ClientDashboard />
    </RoleProtectedRoute>
  }
/>

      {/* Payments */}
      <Route path="/payment" element={<Payment />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />

      {/* Unauthorized */}
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  </BrowserRouter>
);
