import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import DiaryEntry from "@/lib/models/DiaryEntry";
import { cleanEntry, dateError } from "@/lib/diaryAccess";
import { canEditDate } from "@/lib/dates";

async function load(id) {
  const session = await getServerSession(authOptions);
  if (!session) return { status: 401 };
  await connectDB();
  let entry = null;
  try {
    entry = await DiaryEntry.findById(id);
  } catch {}
  if (!entry) return { status: 404 };
  const admin = session.user.role === "admin";
  if (!admin) {
    if (entry.teacher.toString() !== session.user.id) return { status: 403 };
    if (entry.reviewed) return { status: 403, error: "This entry has been reviewed and is locked" };
    if (!canEditDate(entry.date)) return { status: 403, error: "This entry is locked and can no longer be changed" };
  }
  return { entry, session };
}
const fail = (r) => NextResponse.json({ error: r.error || "Not allowed" }, { status: r.status });

export async function PUT(req, { params }) {
  const { id } = await params;
  const r = await load(id);
  if (r.status) return fail(r);
  const { data, error } = cleanEntry(await req.json());
  if (error) return NextResponse.json({ error }, { status: 400 });
  const dErr = dateError(data.date, r.session.user.role);
  if (dErr) return NextResponse.json({ error: dErr }, { status: 400 });
  Object.assign(r.entry, data);
  await r.entry.save();
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req, { params }) {
  const { id } = await params;
  const r = await load(id);
  if (r.status) return fail(r);
  await r.entry.deleteOne();
  return NextResponse.json({ ok: true });
}
