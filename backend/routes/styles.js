// Routes for managing salon styles (CRUD)
const express = require("express");
const router = express.Router();
const multer = require("multer"); // For image upload
const path = require("path");
const authMiddleware = require("../middleware/authMiddleware");
const Style = require("../models/Style");

// Multer config for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Get all styles
router.get("/", async (req, res) => {
  try {
    const styles = await Style.find();
    res.json(styles);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add new style (admin only)
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: "Admin only" });

  try {
    const { name, description, price } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const style = new Style({ name, description, price, image });
    await style.save();

    res.status(201).json(style);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update style by ID (admin only)
router.put("/:id", authMiddleware, upload.single("image"), async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: "Admin only" });

  try {
    const style = await Style.findById(req.params.id);
    if (!style) return res.status(404).json({ message: "Style not found" });

    const { name, description, price } = req.body;
    if (name) style.name = name;
    if (description) style.description = description;
    if (price) style.price = price;
    if (req.file) style.image = `/uploads/${req.file.filename}`;

    await style.save();
    res.json(style);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete style by ID (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: "Admin only" });

  try {
    await Style.findByIdAndDelete(req.params.id);
    res.json({ message: "Style deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
