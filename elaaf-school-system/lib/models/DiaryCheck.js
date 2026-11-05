import mongoose from "mongoose";

const yn = { type: String, enum: ["", "yes", "no"], default: "" };

const DiaryCheckSchema = new mongoose.Schema(
  {
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    month: { type: String, required: true }, // YYYY-MM
    lessonPlan: yn,
    homeworkDiary: yn,
    notebooksCorrected: yn,
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
DiaryCheckSchema.index({ teacher: 1, month: 1 }, { unique: true });

export default mongoose.models.DiaryCheck || mongoose.model("DiaryCheck", DiaryCheckSchema);
