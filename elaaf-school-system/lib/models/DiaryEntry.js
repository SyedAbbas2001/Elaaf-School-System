import mongoose from "mongoose";

const DiaryEntrySchema = new mongoose.Schema(
  {
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    className: { type: String, required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    homework: { type: String, default: "" },
    prevHwChecked: { type: String, enum: ["yes", "no", "na"], default: "na" },
    adminRemark: { type: String, default: "" },
    reviewed: { type: Boolean, default: false },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewedAt: Date,
  },
  { timestamps: true }
);
DiaryEntrySchema.index({ teacher: 1, date: -1 });
DiaryEntrySchema.index({ date: -1 });

export default mongoose.models.DiaryEntry || mongoose.model("DiaryEntry", DiaryEntrySchema);
