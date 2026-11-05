import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getAdminSession } from "@/lib/adminOnly";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function POST(req) {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Admins only" }, { status: 403 });
  const b = await req.json();
  const name = String(b.name || "").trim();
  const email = String(b.email || "").trim().toLowerCase();
  const password = String(b.password || "");
  const role = b.role === "admin" ? "admin" : "teacher";

  if (!name) return NextResponse.json({ error: "Enter the teacher name" }, { status: 400 });
  if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });

  await connectDB();
  if (await User.exists({ email })) return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
  await User.create({ name, email, role, passwordHash: await bcrypt.hash(password, 10) });
  return NextResponse.json({ ok: true });
}
