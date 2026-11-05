import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminOnly";
import { connectDB } from "@/lib/mongodb";
import DiaryEntry from "@/lib/models/DiaryEntry";

export async function PUT(req, { params }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Admins only" }, { status: 403 });
  const { id } = await params;
  const { remark, reviewed } = await req.json();

  await connectDB();
  let entry = null;
  try {
    entry = await DiaryEntry.findById(id);
  } catch {}
  if (!entry) return NextResponse.json({ error: "Entry not found" }, { status: 404 });

  entry.adminRemark = String(remark || "").trim().slice(0, 500);
  entry.reviewed = Boolean(reviewed);
  entry.reviewedBy = reviewed ? session.user.id : undefined;
  entry.reviewedAt = reviewed ? new Date() : undefined;
  await entry.save();
  return NextResponse.json({ ok: true });
}
