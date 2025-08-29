import express from "express";
import Notification from "../models/Notification.js";

const router = express.Router();

// Get all notifications
router.get("/", async (req, res) => {
  const notifications = await Notification.find().sort({ createdAt: -1 });
  res.json(notifications);
});

// Mark as read
router.put("/:id/read", async (req, res) => {
    const notif = await Notification.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.json(notif);
  });
  
  // Mark as unread
  router.put("/:id/unread", async (req, res) => {
    const notif = await Notification.findByIdAndUpdate(req.params.id, { isRead: false }, { new: true });
    res.json(notif);
  });
  
  // Delete notification
  router.delete("/:id", async (req, res) => {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  });
export default router;
