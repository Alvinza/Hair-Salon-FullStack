import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function PrivateRoute({ children, adminOnly = false }) {
  // Check if user is logged in
  const token = localStorage.getItem("token");
  // Check if user has admin rights 
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // If no token, block access and show toast
  if (!token) {
    if (!toast.isActive("login-error")) {
      toast.error("You have to log in to book your hair appointment.", {
        toastId: "login-error",
      });
    }
    return <Navigate to="/login" replace />;
  }

  // If route is admin-only and user is not admin → redirect
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Authorized
  return children;
}

export default PrivateRoute;
