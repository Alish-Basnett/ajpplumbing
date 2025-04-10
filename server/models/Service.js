const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String }, // optional
  priceRange: { type: String }, // optional, e.g. "$50 - $200"
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Service", ServiceSchema);
