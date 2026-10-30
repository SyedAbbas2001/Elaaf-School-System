import mongoose from "mongoose";

const AttemptSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", index: true },
    studentName: String,
    rollNo: String,
    className: String,
    answers: [Number],
    score: Number,
    total: Number,
    tabSwitches: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Attempt || mongoose.model("Attempt", AttemptSchema);
