// Load environment variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

// CORS Middleware (allow only frontend domains)
const allowedOrigins = [
  "http://localhost:3000",
  "https://ajpplumbing.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin like mobile apps or curl
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Handle preflight and headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

// Middleware to parse JSON
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// ============================================
// CONTACT ROUTES
// ============================================

const ContactMessage = require("./models/ContactMessage");

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res
        .status(400)
        .json({ success: false, error: "All fields required" });
    }

    const newMessage = new ContactMessage({ name, email, phone, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: "Message received!" });
  } catch (err) {
    console.error("❌ Contact form error:", err);
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

// ============================================
// REVIEWS ROUTES
// ============================================

const Review = require("./models/Review");

app.post("/api/reviews", async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;

    if (!name || !email || !rating || !message) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    const review = new Review({ name, email, rating, message });
    await review.save();

    res.status(201).json({ success: true, message: "Review submitted!" });
  } catch (err) {
    console.error("❌ Error saving review:", err);
    res.status(500).json({ success: false, error: "Failed to submit review" });
  }
});

app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// ============================================
// SERVICES ROUTES
// ============================================

const Service = require("./models/Service");

app.get("/api/services", async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

app.post("/api/services", async (req, res) => {
  try {
    const { title, description, priceRange } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, error: "Title and description are required" });
    }

    const service = new Service({ title, description, priceRange });
    await service.save();

    res.status(201).json({ success: true, message: "Service added!" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to add service" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
