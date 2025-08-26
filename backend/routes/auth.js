// Authentication routes - register and login users
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // For password hashing
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

// Register new user (for admin or normal users)
router.post("/register", async (req, res) => {
  try {
    const { username, password, isAdmin } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "User exists" });

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword, isAdmin });
    await user.save();

    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // send response
    res.json({ token, username: user.username, isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
