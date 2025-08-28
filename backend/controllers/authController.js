// controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Create JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },         // payload
      process.env.JWT_KEY,                       // secret key
      { expiresIn: "7d" }                        // token expiry
    );

    res.status(200).json({
      message: "Login successful",
      token, // 👈 frontend will store this
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ Login Error:", err); 
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// controllers/authController.js
export const getProfile = async (req, res) => {
  if (!req.user) return res.status(404).json({ message: "User not found" });
  res.json({ user: req.user });
};
