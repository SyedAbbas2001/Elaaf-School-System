import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Quiz from "@/lib/models/Quiz";
import Attempt from "@/lib/models/Attempt";

// Tells the student page whether this roll number has already taken the quiz
export async function POST(req) {
  const { code, rollNo, className } = await req.json();
  if (!rollNo?.trim()) {
    return NextResponse.json({ error: "Enter your roll number" }, { status: 400 });
  }
  await connectDB();
  const quiz = await Quiz.findOne({ code: String(code).toUpperCase(), status: "published" }).select("_id className");
  if (!quiz) return NextResponse.json({ error: "This quiz was not found or is closed" }, { status: 404 });

  const attempted = await Attempt.exists({
    quiz: quiz._id,
    rollNo: rollNo.trim(),
    className: (className || quiz.className).trim(),
  });
  return NextResponse.json({ attempted: Boolean(attempted) });
}