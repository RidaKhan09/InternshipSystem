import express from "express";
import { loginUser, getProfile, createAdmin } from "../controllers/authController.js";
import authMiddleware, { authorizeRoles } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// ✅ Login
router.post("/login", loginUser);

// ✅ Profile (logged in user)
router.get("/me", authMiddleware, getProfile);

// ✅ Create Admin (Superadmin only)
router.post("/create-admin", authMiddleware, authorizeRoles("superadmin"), createAdmin);

// ✅ Get all admins (Superadmin only)
router.get("/admins", authMiddleware, authorizeRoles("superadmin"), async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete admin (Superadmin only)
router.delete("/admins/:id", authMiddleware, authorizeRoles("superadmin"), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
