// Main entry point for the backend server
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

// Import route files
const authRoutes = require("./routes/auth");
const styleRoutes = require("./routes/styles");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded images

// API routes
app.use("/api/auth", authRoutes); // Authentication (register/login)
app.use("/api/styles", styleRoutes); // Salon styles (CRUD)
app.get("/", function (req, res) {
    res.send("Hello There❤️❤️")
})

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error(err));
