import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Quiz from "@/lib/models/Quiz";
import QuizTaker from "@/components/QuizTaker";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function QuizPage({ params }) {
  const { code } = await params;
  await connectDB();
  const quiz = await Quiz.findOne({ code: code.toUpperCase(), status: "published" }).lean();
  if (!quiz) notFound();

  // correctIndex is intentionally not sent to the browser
  const safe = {
    title: quiz.title,
    className: quiz.className,
    subject: quiz.subject,
    timeLimitMin: quiz.timeLimitMin || 0,
    questions: quiz.questions.map((q) => ({ text: q.text, options: q.options, marks: q.marks })),
  };
  return <QuizTaker code={code} quiz={safe} />;
}
