import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!token) {
    // Not logged in
    alert("You have to log in to book your hair appointment.");
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
