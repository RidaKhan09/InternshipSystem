import mongoose from "mongoose";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import connectDB from "./db/db.js";
import dotenv from "dotenv";

dotenv.config();

const userRegister = async () => {
  try {
    await connectDB();

    // SUPERADMIN
    const existingSuperAdmin = await User.findOne({ email: process.env.SUPERADMIN_EMAIL });
    if (existingSuperAdmin) {
      console.log("Superadmin already exists!");
    } else {
      const hashPassword = await bcrypt.hash(process.env.SUPERADMIN_PASSWORD, 10);

      const superAdmin = new User({
        name: process.env.SUPERADMIN_NAME || "Super Admin",
        email: process.env.SUPERADMIN_EMAIL,
        password: hashPassword,
        role: "superadmin",
      });

      await superAdmin.save();
      console.log("✅ Superadmin created!");
    }

  } catch (error) {
    console.log("❌ Error creating users:", error);
  } finally {
    mongoose.disconnect();
  }
};

userRegister();
