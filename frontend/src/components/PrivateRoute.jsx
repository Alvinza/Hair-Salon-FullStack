import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function PrivateRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!token) {
    if (!toast.isActive("login-error")) {
      toast.error("You have to log in to book your hair appointment.", {
        toastId: "login-error",
      });
    }
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    // Not admin, redirect home or anywhere you want
    return <Navigate to="/" replace />;
  }

  // Authorized
  return children;
}

export default PrivateRoute;
