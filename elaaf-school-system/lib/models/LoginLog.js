import mongoose from "mongoose";

// One record per successful sign in. Old records are removed automatically after a year.
const LoginLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    name: String,
    email: String,
    role: String,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);
LoginLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 365 });

export default mongoose.models.LoginLog || mongoose.model("LoginLog", LoginLogSchema);
