import express from "express";
import { loginUser, getProfile, createAdmin } from "../controllers/authController.js";
import authMiddleware, { authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/me", authMiddleware, getProfile);

// 👑 Superadmin only
router.post("/create-admin", authMiddleware, authorizeRoles("superadmin"), createAdmin);

export default router;
