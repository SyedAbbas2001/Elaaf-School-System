import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getAdminSession } from "@/lib/adminOnly";
import { connectDB } from "@/lib/mongodb";
import DiaryCheck from "@/lib/models/DiaryCheck";

const yn = (v) => (["yes", "no"].includes(v) ? v : "");

export async function PUT(req) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Admins only" }, { status: 403 });
  const b = await req.json();
  if (!mongoose.isValidObjectId(b.teacherId) || !/^\d{4}-\d{2}$/.test(b.month || "")) {
    return NextResponse.json({ error: "Invalid teacher or month" }, { status: 400 });
  }
  await connectDB();
  await DiaryCheck.findOneAndUpdate(
    { teacher: b.teacherId, month: b.month },
    { lessonPlan: yn(b.lessonPlan), homeworkDiary: yn(b.homeworkDiary), notebooksCorrected: yn(b.notebooksCorrected), updatedBy: session.user.id },
    { upsert: true }
  );
  return NextResponse.json({ ok: true });
}
