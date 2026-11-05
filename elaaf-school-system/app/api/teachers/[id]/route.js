import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getAdminSession } from "@/lib/adminOnly";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function PUT(req, { params }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Admins only" }, { status: 403 });
  const { id } = await params;
  const b = await req.json();

  await connectDB();
  let user = null;
  try {
    user = await User.findById(id);
  } catch {}
  if (!user) return NextResponse.json({ error: "Account not found" }, { status: 404 });

  if (typeof b.active === "boolean") {
    if (user._id.toString() === session.user.id && !b.active) {
      return NextResponse.json({ error: "You cannot deactivate your own account" }, { status: 400 });
    }
    user.active = b.active;
  }
  if (b.password !== undefined) {
    if (String(b.password).length < 8) return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    user.passwordHash = await bcrypt.hash(String(b.password), 10);
  }
  await user.save();
  return NextResponse.json({ ok: true });
}
