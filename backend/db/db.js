// db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // 💀 Stop app if DB not connected
  }
};

export default connectDB;
