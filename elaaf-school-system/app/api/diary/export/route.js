import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import DiaryEntry from "@/lib/models/DiaryEntry";
import User from "@/lib/models/User";
import { diaryFilter } from "@/lib/diaryQuery";

// Quote every cell, and stop spreadsheet programs from running text that starts like a formula
const cell = (v) => {
  let s = String(v ?? "");
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return `"${s.replace(/"/g, '""')}"`;
};
const PREV = { yes: "Yes", no: "No", na: "Not applicable" };

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Please sign in first" }, { status: 401 });

  const sp = Object.fromEntries(new URL(req.url).searchParams);
  await connectDB();
  const users = await User.find().select("name email").lean();
  const nameOf = Object.fromEntries(users.map((u) => [String(u._id), u.name || u.email]));
  const entries = await DiaryEntry.find(diaryFilter(sp, session)).sort({ date: 1, createdAt: 1 }).lean();

  const rows = [["Date", "Teacher", "Class", "Subject", "Topic taught", "Homework given", "Previous homework checked", "Reviewed", "Admin remark"]].concat(
    entries.map((e) => [e.date, nameOf[String(e.teacher)] || "", e.className, e.subject, e.topic, e.homework, PREV[e.prevHwChecked], e.reviewed ? "Yes" : "No", e.adminRemark])
  );
  const csv = "\uFEFF" + rows.map((r) => r.map(cell).join(",")).join("\n");
  return new NextResponse(csv, {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="teacher-diary.csv"' },
  });
}
