const mongoose = require("mongoose");

// Declare DB_URI properly with `const`
const DB_URI = "mongodb://localhost:27017/issuesTracker";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
