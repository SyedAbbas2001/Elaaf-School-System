import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    options: [String],
    correctIndex: { type: Number, required: true },
    marks: { type: Number, default: 1 },
  },
  { _id: false }
);

const QuizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    className: { type: String, required: true },
    subject: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    code: { type: String, unique: true },
    timeLimitMin: { type: Number, default: 0 }, // 0 = no time limit
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    scheduledFor: { type: String, default: "", index: true }, // YYYY-MM-DD when the quiz was made for the quiz schedule
    questions: [QuestionSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);
