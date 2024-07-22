import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import toast from "react-hot-toast";

const ProtectedRoute = () => {
  const user = localStorage.getItem("roles") === "ADMIN";

  useEffect(() => {
    if (user) {
      toast.success("You are logged in as ADMIN");
    } else {
      toast.error("Please log in as an ADMIN");
    }
  }, [user]);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
