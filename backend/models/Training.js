import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  joinDate: { type: Date, required: true },
  endDate: { type: Date },
  isContinuing: { type: Boolean, default: false },
  gender: { type: String, required: true },
  university: { type: String, required: true },
  domain: { type: String, required: true },
  type: { type: String, default: "training" },

  // 👇 Payment for training
  payment: {
    total: { type: Number, required: true },
    paid: { type: Number, required: true },
  },

  deleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("training", trainingSchema, "training");
