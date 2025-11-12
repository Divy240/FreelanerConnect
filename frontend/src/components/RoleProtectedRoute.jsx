import React from "react";
import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" />;
  if (user.role !== allowedRole) return <Navigate to="/unauthorized" />;
  return children;
};

export default RoleProtectedRoute;
