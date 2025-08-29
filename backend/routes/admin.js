import express from "express";
import { getInternStats } from "../controllers/adminController.js";

const router = express.Router();

// Stats route
router.get("/stats", getInternStats);


export default router;
