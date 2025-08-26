// Middleware to protect routes using JWT authentication
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Extract token from "Authorization: Bearer <token>"
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer token

  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
