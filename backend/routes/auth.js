// routes/auth.js
import express from "express";
import { loginUser } from "../controllers/authController.js";
import { getProfile } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // 👈 ye missing tha


const router = express.Router();

router.post("/login", loginUser);
router.get("/me", authMiddleware, getProfile); // 👈 secure route

export default router;
