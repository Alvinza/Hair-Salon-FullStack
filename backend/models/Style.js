const mongoose = require("mongoose");

const StyleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  image: String, // path to uploaded image
});

module.exports = mongoose.model("Style", StyleSchema);
