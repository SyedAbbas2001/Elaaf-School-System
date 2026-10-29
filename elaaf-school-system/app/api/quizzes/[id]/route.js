import { NextResponse } from "next/server";
import { getOwnedQuiz } from "@/lib/quizAccess";
import Attempt from "@/lib/models/Attempt";

const deny = (code) => NextResponse.json({ error: "Not allowed" }, { status: code });

export async function PUT(req, { params }) {
  const { id } = await params;
  const r = await getOwnedQuiz(id);
  if (r.error) return deny(r.error);
  const { quiz } = r;
  const b = await req.json();

  for (const k of ["title", "className", "subject", "timeLimitMin"]) {
    if (b[k] !== undefined) quiz[k] = b[k];
  }

  if (b.questions !== undefined) {
    const qs = b.questions.map((x) => ({
      text: String(x.text || "").trim(),
      options: (x.options || []).map((o) => String(o).trim()),
      correctIndex: Number(x.correctIndex),
      marks: Number(x.marks) || 1,
    }));
    const bad = qs.findIndex(
      (x) => !x.text || x.options.length < 2 || x.options.some((o) => !o) || !(x.correctIndex >= 0 && x.correctIndex < x.options.length)
    );
    if (bad !== -1) {
      return NextResponse.json({ error: `Question ${bad + 1} is incomplete: it needs question text, all options and a correct answer` }, { status: 400 });
    }
    quiz.questions = qs;
  }

  if (b.status !== undefined) {
    if (b.status === "published" && quiz.questions.length === 0) {
      return NextResponse.json({ error: "Add at least one question before publishing" }, { status: 400 });
    }
    quiz.status = b.status;
  }

  await quiz.save();
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req, { params }) {
  const { id } = await params;
  const r = await getOwnedQuiz(id);
  if (r.error) return deny(r.error);
  await Attempt.deleteMany({ quiz: r.quiz._id });
  await r.quiz.deleteOne();
  return NextResponse.json({ ok: true });
}
