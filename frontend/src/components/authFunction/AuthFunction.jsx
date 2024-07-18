// components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // Custom hook to get auth status
import toast from "react-hot-toast";

const ProtectedRoute = () => {
  const user = localStorage.getItem("roles") === "ADMIN";
  toast.error("login as an ADMIN");

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
