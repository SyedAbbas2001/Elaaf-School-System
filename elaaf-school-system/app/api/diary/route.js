import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import DiaryEntry from "@/lib/models/DiaryEntry";
import { cleanEntry, dateError } from "@/lib/diaryAccess";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Please sign in first" }, { status: 401 });

  const { data, error } = cleanEntry(await req.json());
  if (error) return NextResponse.json({ error }, { status: 400 });
  const dErr = dateError(data.date, session.user.role);
  if (dErr) return NextResponse.json({ error: dErr }, { status: 400 });

  await connectDB();
  const entry = await DiaryEntry.create({ ...data, teacher: session.user.id });
  return NextResponse.json({ id: entry._id.toString() });
}
