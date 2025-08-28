import mongoose from "mongoose";

const internSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  joinDate: { type: Date, required: true },
  endDate: { type: Date },
  gender: { type: String, required: true },
  university: { type: String },
  domain: { type: String },
  type: { type: String, enum: ["internship", "training"], required: true },
  payment: { type: mongoose.Schema.Types.Mixed },
  deleted: { type: Boolean, default: false }, // ✅ Soft delete flag
}, { timestamps: true });

export default mongoose.model("Intern", internSchema, "intern"); // 🔥 force exact collection
