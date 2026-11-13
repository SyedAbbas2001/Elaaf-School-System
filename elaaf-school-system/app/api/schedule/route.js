import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getAdminSession } from "@/lib/adminOnly";
import { connectDB } from "@/lib/mongodb";
import ScheduleConfig from "@/lib/models/ScheduleConfig";
import User from "@/lib/models/User";
import { CLASSES, SUBJECTS } from "@/lib/constants";
import { isYmd } from "@/lib/dates";
import { DAYS, NO_QUIZ } from "@/lib/scheduleCore";

const bad = (error) => NextResponse.json({ error }, { status: 400 });
const MAX_PER_DAY = 4;

async function save(req) {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Admins only" }, { status: 403 });
  const b = await req.json();

  if (!isYmd(b.startDate)) return bad("Choose the date of Day 1");
  const holidays = [...new Set((b.holidays || []).filter(isYmd))].sort();

  if (!Array.isArray(b.grid) || b.grid.length === 0) return bad("The rotation table is empty");
  const grid = [];
  for (const r of b.grid) {
    if (!CLASSES.includes(r.className)) return bad(`Unknown class: ${r.className}`);
    if (!Array.isArray(r.subjects) || r.subjects.length !== DAYS) return bad(`${r.className} needs a subject list for each of the ${DAYS} days`);
    const days = r.subjects.map((d) => (Array.isArray(d) ? d : [d]));
    for (const d of days) {
      const onlyNoQuiz = d.length === 1 && d[0] === NO_QUIZ;
      if (!onlyNoQuiz && (d.length < 1 || d.length > MAX_PER_DAY || d.some((s) => !SUBJECTS.includes(s)) || new Set(d).size !== d.length)) {
        return bad(`${r.className}: each day needs 1 to ${MAX_PER_DAY} different subjects`);
      }
    }
    grid.push({ className: r.className, subjects: days });
  }

  const skips = [];
  const seenSkip = new Set();
  for (const x of b.skips || []) {
    const k = `${x.date}|${x.className}`;
    if (!isYmd(x.date) || !CLASSES.includes(x.className) || seenSkip.has(k)) continue;
    seenSkip.add(k);
    skips.push({ date: x.date, className: x.className, note: String(x.note || "").trim().slice(0, 80) });
  }
  skips.sort((a, b2) => a.date.localeCompare(b2.date) || a.className.localeCompare(b2.className));

  await connectDB();
  const ids = [...new Set((b.assignments || []).map((a) => a.teacher).filter((t) => mongoose.isValidObjectId(t)))];
  const valid = new Set((await User.find({ _id: { $in: ids } }).select("_id").lean()).map((u) => String(u._id)));
  const seen = new Set();
  const assignments = [];
  for (const a of b.assignments || []) {
    const key = `${a.className}|${a.subject}`;
    if (!CLASSES.includes(a.className) || !SUBJECTS.includes(a.subject) || !valid.has(String(a.teacher)) || seen.has(key)) continue;
    seen.add(key);
    assignments.push({ className: a.className, subject: a.subject, teacher: a.teacher });
  }

  await ScheduleConfig.findOneAndUpdate(
    { key: "main" },
    { $set: { startDate: b.startDate, skipSundays: b.skipSundays !== false, holidays, skips, grid, assignments } },
    { upsert: true, setDefaultsOnInsert: true }
  );
  return NextResponse.json({ ok: true });
}

export async function PUT(req) {
  try {
    return await save(req);
  } catch (e) {
    console.error("Schedule save failed", e);
    return NextResponse.json({ error: "Could not save the schedule. See the terminal for details." }, { status: 500 });
  }
}