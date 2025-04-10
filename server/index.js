// Load environment variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Contact Message Post and Get Route

const ContactMessage = require("./models/ContactMessage");

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body; // <- Add phone here!

    const newMessage = new ContactMessage({ name, email, phone, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: "Message received!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

app.get("/api/contact", async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ submittedAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch messages" });
  }
});

// POST + GET Customer Reviews

const Review = require("./models/Review");

// Submit review
app.post("/api/reviews", async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;
    console.log("📥 Incoming Review:", req.body); // log incoming data

    if (!name || !email || !rating || !message) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    const review = new Review({ name, email, rating, message });
    await review.save();

    console.log("✅ Review saved:", review);
    res.status(201).json({ success: true, message: "Review submitted!" });
  } catch (err) {
    console.error("❌ Error saving review:", err);
    res.status(500).json({ success: false, error: "Failed to submit review" });
  }
});

// Get all reviews
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// GET + (Optional POST) Services

const Service = require("./models/Service");

// Get all services
app.get("/api/services", async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

// Optional: Add a new service (for admin use later)
app.post("/api/services", async (req, res) => {
  try {
    const { title, description, priceRange } = req.body;
    const service = new Service({ title, description, priceRange });
    await service.save();
    res.status(201).json({ success: true, message: "Service added!" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to add service" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
