import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Quiz from "@/lib/models/Quiz";
import Attempt from "@/lib/models/Attempt";

// Marking happens only on the server; correct answers never reach the student browser
export async function POST(req) {
  const { code, studentName, rollNo, className, answers } = await req.json();
  if (!studentName?.trim() || !rollNo?.trim()) {
    return NextResponse.json({ error: "Enter your name and roll number" }, { status: 400 });
  }
  await connectDB();
  const quiz = await Quiz.findOne({ code: String(code).toUpperCase(), status: "published" });
  if (!quiz) return NextResponse.json({ error: "This quiz was not found or is closed" }, { status: 404 });

  const roll = rollNo.trim();
  const cls = (className || quiz.className).trim();
  const dup = await Attempt.findOne({ quiz: quiz._id, rollNo: roll, className: cls });
  if (dup) return NextResponse.json({ error: "This roll number has already submitted this quiz" }, { status: 409 });

  let score = 0;
  let total = 0;
  quiz.questions.forEach((q, i) => {
    total += q.marks;
    if (answers?.[i] === q.correctIndex) score += q.marks;
  });

  await Attempt.create({
    quiz: quiz._id,
    studentName: studentName.trim(),
    rollNo: roll,
    className: cls,
    answers: (answers || []).map((a) => (typeof a === "number" ? a : -1)),
    score,
    total,
  });
  return NextResponse.json({ score, total });
}
