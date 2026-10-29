import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Quiz from "@/lib/models/Quiz";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Please sign in first" }, { status: 401 });

  const { title, className, subject, timeLimitMin } = await req.json();
  if (!title?.trim() || !className || !subject) {
    return NextResponse.json({ error: "Title, class and subject are required" }, { status: 400 });
  }
  await connectDB();
  const quiz = await Quiz.create({
    title: title.trim(),
    className,
    subject,
    timeLimitMin: Number(timeLimitMin) || 0,
    teacher: session.user.id,
    code: randomBytes(3).toString("hex").toUpperCase(),
  });
  return NextResponse.json({ id: quiz._id.toString() });
}
