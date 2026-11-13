import mongoose from "mongoose";

// A single document (key "main") holds the whole quiz schedule setup
const ScheduleSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, default: "main" },
    startDate: { type: String, default: "" }, // YYYY-MM-DD, the date of Day 1
    skipSundays: { type: Boolean, default: true },
    holidays: [String],
    // classes that have no quiz on a particular date (the rotation itself carries on)
    skips: [{ date: String, className: String, note: String, _id: false }],
    // one row per class; subjects[0..5] is the list of subjects (one or more) for Day 1..Day 6
    grid: [{ className: String, subjects: [[String]], _id: false }],
    assignments: [{ className: String, subject: String, teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, _id: false }],
  },
  { timestamps: true }
);

export default mongoose.models.ScheduleConfig || mongoose.model("ScheduleConfig", ScheduleSchema);
