const mongoose = require("mongoose");

const ContactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    match: [/^(\+614|04)\d{8}$/, "Invalid Australian phone number"],
  },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ContactMessage", ContactMessageSchema);
