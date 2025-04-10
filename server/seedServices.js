require("dotenv").config();
const mongoose = require("mongoose");
const Service = require("./models/Service");

const services = [
  {
    title: "Blocked Drain Cleaning",
    description: "We unblock drains quickly and professionally.",
    priceRange: "$80 - $200",
  },
  {
    title: "Hot Water System Repair",
    description: "Repair or replace your hot water system.",
    priceRange: "$150 - $500",
  },
  {
    title: "Leak Detection & Repair",
    description: "Find and fix water leaks in your plumbing system.",
    priceRange: "$100 - $300",
  },
  {
    title: "Toilet Installation & Repair",
    description: "Install or fix your toilets and cisterns.",
    priceRange: "$120 - $400",
  },
  {
    title: "Emergency Plumbing Services",
    description: "24/7 emergency plumbing support across all areas.",
    priceRange: "$200+",
  },
];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    await Service.deleteMany({});
    await Service.insertMany(services);

    console.log("✅ Services seeded successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ Error seeding services:", err);
  });
