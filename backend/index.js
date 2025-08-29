import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";

import authRoutes from "./routes/auth.js";
import internsRoutes from "./routes/interns.js";
import trainingRoutes from "./routes/trainingRoutes.js";
import adminRoutes from "./routes/admin.js";
import notificationRoutes from "./routes/notificationRoutes.js";

import cron from "node-cron";

import Intern from "./models/Intern.js";
import Training from "./models/Training.js";
import Notification from "./models/Notification.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/interns", internsRoutes);
app.use("/api/trainings", trainingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);

// Make io accessible in routes if needed
app.set("io", io);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

  // ---- Cron job ----
  cron.schedule("* * * * *", async () => { // every minute for testing
    console.log("🔔 Running 3-month check...");

    const today = new Date();
    today.setHours(0,0,0,0); // ✅ ignore time

    // --- Check Interns ---
    const interns = await Intern.find({ deleted: false });
    for (let intern of interns) {
      if (!intern.joinDate) continue;

      const joinDate = new Date(intern.joinDate);
      const endDate = new Date(joinDate);
      endDate.setMonth(endDate.getMonth() + 3);
      endDate.setHours(0,0,0,0); // ✅ ignore time

      if (today >= endDate) {
        const exists = await Notification.findOne({
          userId: intern._id,
          type: "intern",
        });

        if (!exists) {
          const newNotif = await Notification.create({
            userId: intern._id,
            type: "intern",
            message: `${intern.name} (Internship) has completed 3 months.`,
          });
          console.log(`✅ Notification added for Intern: ${intern.name}`);
          io.emit("newNotification", newNotif);
        }
      }
    }

    // --- Check Trainings ---
    const trainings = await Training.find();
    for (let trainee of trainings) {
      if (!trainee.joinDate) continue;

      const joinDate = new Date(trainee.joinDate);
      const endDate = new Date(joinDate);
      endDate.setMonth(endDate.getMonth() + 3);
      endDate.setHours(0,0,0,0); // ✅ ignore time

      if (today >= endDate) {
        const exists = await Notification.findOne({
          userId: trainee._id,
          type: "training",
        });

        if (!exists) {
          const newNotif = await Notification.create({
            userId: trainee._id,
            type: "training",
            message: `${trainee.name} (Training) has completed 3 months.`,
          });
          console.log(`✅ Notification added for Trainee: ${trainee.name}`);
          io.emit("newNotification", newNotif);
        }
      }
    }
  });

  // ---- Test route ----
  app.get("/api/test-cron", async (req, res) => {
    const today = new Date();
    today.setHours(0,0,0,0);

    const interns = await Intern.find();
    let created = [];

    for (let intern of interns) {
      if (!intern.joinDate) continue;

      const joinDate = new Date(intern.joinDate);
      const endDate = new Date(joinDate);
      endDate.setMonth(endDate.getMonth() + 3);
      endDate.setHours(0,0,0,0);

      if(today >= endDate) {
        const exists = await Notification.findOne({
          userId: intern._id,
          type: "intern",
        });
        if(!exists) {
          const newNotif = await Notification.create({
            userId: intern._id,
            type: "intern",
            message: `${intern.name} has completed 3 months Internship.`,
          });
          created.push(newNotif);
          io.emit("newNotification", newNotif); // real-time
        }
      }
    }

    res.json({ success: true, created });
  });

};

startServer();
