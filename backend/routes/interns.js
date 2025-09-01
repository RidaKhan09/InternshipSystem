import express from "express";
import Intern from "../models/Intern.js";

const router = express.Router();

// Get all interns
router.get("/", async (req, res) => {
  try {
    const interns = await Intern.find().sort({ createdAt: -1 });

    // Format endDate: agar null ho toh "Continue" show kare
    const formattedInterns = interns.map(intern => ({
      ...intern._doc,
      endDate: intern.endDate || "Continue"
    }));

    res.json(formattedInterns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new intern
router.post("/", async (req, res) => {
  try {
    const intern = new Intern(req.body);
    const savedIntern = await intern.save();
    res.status(201).json(savedIntern);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Edit intern
router.put("/:id", async (req, res) => {
  try {
    const updatedIntern = await Intern.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // return updated doc
    );
    if (!updatedIntern) return res.status(404).json({ error: "Intern not found" });
    res.json(updatedIntern);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Soft delete intern
router.put("/soft-delete/:id", async (req, res) => {
  try {
    const updatedIntern = await Intern.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    if (!updatedIntern) return res.status(404).json({ error: "Intern not found" });
    res.json(updatedIntern);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



export default router;
