import { NextResponse } from "next/server";
import { getOwnedQuiz } from "@/lib/quizAccess";
import Attempt from "@/lib/models/Attempt";

const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;

export async function GET(_req, { params }) {
  const { id } = await params;
  const r = await getOwnedQuiz(id);
  if (r.error) return NextResponse.json({ error: "Not allowed" }, { status: r.error });

  const attempts = await Attempt.find({ quiz: r.quiz._id }).sort({ rollNo: 1 }).lean();
  const rows = [["Roll no", "Student name", "Class", "Score", "Total", "Percent", "Tab switches", "Submitted"]].concat(
    attempts.map((a) => [
      a.rollNo,
      a.studentName,
      a.className,
      a.score,
      a.total,
      a.total ? Math.round((a.score / a.total) * 100) + "%" : "0%",
      a.tabSwitches || 0,
      new Date(a.createdAt).toLocaleString("en-GB", { timeZone: "Asia/Karachi" }),
    ])
  );
  const csv = "\uFEFF" + rows.map((row) => row.map(esc).join(",")).join("\n");
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${r.quiz.code}-results.csv"`,
    },
  });
}
