const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from backend/.env
dotenv.config({ path: path.join(__dirname, "../.env") });

// Check if MONGO_URI is loaded
const MONGO_URI = process.env.MONGO_URI;
console.log("🚀 MONGO_URI:", MONGO_URI);

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env file");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// Article Schema & Model
const articleSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    source: String,
  },
  { timestamps: true }
);
const Article = mongoose.model("Article", articleSchema);

// Force DB creation
async function forceCreateDB() {
  try {
    const article = await Article.create({
      title: "Force DB Creation",
      content: "This document forces MongoDB to create the database",
      source: "manual-test",
    });

    console.log("✅ Test Article Inserted:", article._id);

    await mongoose.connection.close();
    console.log("🔌 MongoDB Connection Closed");
  } catch (error) {
    console.error("❌ Insert Error:", error);
  }
}

// Run
forceCreateDB();
