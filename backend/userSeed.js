import mongoose from 'mongoose';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import connectDB from './db/db.js';
import dotenv from 'dotenv';

dotenv.config();

const userRegister = async () => {
  try {
    // Wait for database connection
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      return;
    }

    // Hash password
    const hashPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    // Create new admin
    const newUser = new User({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashPassword,
      role: 'admin',
    });

    await newUser.save();
    console.log('✅ Admin user created successfully!');
  } catch (error) {
    console.log('❌ Error creating admin user:', error);
  } finally {
    mongoose.disconnect(); // Close DB connection
  }
};

userRegister();
