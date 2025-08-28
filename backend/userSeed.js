import mongoose from 'mongoose';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import connectDB from './db/db.js';

const userRegister = async () => {
  try {
    // Wait for database connection
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      return;
    }

    // Hash password
    const hashPassword = await bcrypt.hash('admin', 10);

    // Create new admin
    const newUser = new User({
      name: 'Admin',
      email: 'admin@gmail.com',
      password: hashPassword,
      role: 'admin',
    });

    await newUser.save();
    console.log('Admin user created successfully!');
  } catch (error) {
    console.log('Error creating admin user:', error);
  } finally {
    mongoose.disconnect(); // Close DB connection
  }
};

userRegister();
