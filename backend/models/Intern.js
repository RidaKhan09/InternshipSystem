import mongoose from "mongoose";

const internSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String },
  joinDate: { type: Date, required: true },
  endDate: { type: Date, default: null },
  
  gender: { type: String, required: true },
  domain: { type: String },
  type: { type: String, enum: ["internship"], required: true },
  payment: { type: mongoose.Schema.Types.Mixed }, // can be true/false or object
  stipend: { type: Number, default: 0 }, // 💰 per month stipend if paid
  deleted: { type: Boolean, default: false }, // ✅ Soft delete flag
}, { timestamps: true });

export default mongoose.model("intern", internSchema, "intern"); // 🔥 force exact collection
