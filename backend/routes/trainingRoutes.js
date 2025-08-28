import express from "express";
import Training from "../models/Training.js";

const router = express.Router();

// ✅ Get all trainings
router.get("/", async (req, res) => {
  try {
    const trainings = await Training.find();
    res.json(trainings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch trainings" });
  }
});

// ✅ Create new training
router.post("/", async (req, res) => {
  try {
    const training = new Training(req.body);
    await training.save();
    res.status(201).json(training);
  } catch (err) {
    res.status(400).json({ error: "Failed to create training" });
  }
});

// ✅ Update training
router.put("/:id", async (req, res) => {
  try {
    const training = await Training.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(training);
  } catch (err) {
    res.status(400).json({ error: "Failed to update training" });
  }
});

// ✅ Soft delete
router.put("/soft-delete/:id", async (req, res) => {
  try {
    const training = await Training.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    res.json(training);
  } catch (err) {
    res.status(400).json({ error: "Failed to soft delete" });
  }
});

export default router;
