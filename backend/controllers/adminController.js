import Internship from "../models/Intern.js";
import Training from "../models/Training.js";

// Get counts for dashboard charts
export const getInternStats = async (req, res) => {
  try {
    const internshipCount = await Internship.countDocuments({ deleted: false });
    const trainingCount = await Training.countDocuments({ deleted: false });

    // Optional: tech aggregation only for non-deleted items
    const internshipTechs = await Internship.aggregate([
      { $match: { deleted: false } },
      { $group: { _id: "$technology", count: { $sum: 1 } } }
    ]);
    const trainingTechs = await Training.aggregate([
      { $match: { deleted: false } },
      { $group: { _id: "$technology", count: { $sum: 1 } } }
    ]);

    const techData = [...internshipTechs, ...trainingTechs].map(item => ({
      name: item._id || "Unknown",
      value: item.count
    }));

    res.json({
      internshipCount,
      trainingCount,
      totalInterns: internshipCount + trainingCount,
      techData
    });
  } catch (err) {
    console.error("Error in getInternStats:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
