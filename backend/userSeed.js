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

    // ADMIN
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (existingAdmin) {
      console.log("Admin already exists!");
    } else {
      const hashPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

      const admin = new User({
        name: process.env.ADMIN_NAME || "Admin",
        email: process.env.ADMIN_EMAIL,
        password: hashPassword,
        role: "admin",
      });

      await admin.save();
      console.log("✅ Admin created!");
    }

  } catch (error) {
    console.log("❌ Error creating users:", error);
  } finally {
    mongoose.disconnect();
  }
};

userRegister();
