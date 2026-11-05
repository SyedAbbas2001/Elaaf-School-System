import mongoose from "mongoose";
import { isYmd } from "@/lib/dates";

export const param = (sp, k) => {
  const x = sp?.[k];
  return String(Array.isArray(x) ? x[0] : x ?? "");
};

// Admins can filter by any teacher; teachers are always limited to their own entries
export function diaryFilter(sp, session) {
  const f = {};
  if (session.user.role === "admin") {
    const t = param(sp, "teacher");
    if (t && mongoose.isValidObjectId(t)) f.teacher = t;
  } else {
    f.teacher = session.user.id;
  }
  const c = param(sp, "className");
  const s = param(sp, "subject");
  const from = param(sp, "from");
  const to = param(sp, "to");
  if (c) f.className = c;
  if (s) f.subject = s;
  if (isYmd(from) || isYmd(to)) {
    f.date = {};
    if (isYmd(from)) f.date.$gte = from;
    if (isYmd(to)) f.date.$lte = to;
  }
  return f;
}
