import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import authRoutes from "./routes/auth.js";
import internsRoutes from "./routes/interns.js";
import trainingRoutes from "./routes/trainingRoutes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/interns", internsRoutes);

app.use("/api/trainings", trainingRoutes);


// Connect DB and then start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB(); // ✅ wait for DB before starting server
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
