import { notFound } from "next/navigation";
import { getOwnedQuiz } from "@/lib/quizAccess";
import QuizEditor from "@/components/portal/QuizEditor";

export const dynamic = "force-dynamic";

export default async function EditQuizPage({ params }) {
  const { id } = await params;
  const r = await getOwnedQuiz(id);
  if (r.error) notFound();
  const q = r.quiz.toObject();

  const data = {
    id: String(q._id),
    title: q.title,
    className: q.className,
    subject: q.subject,
    code: q.code,
    status: q.status,
    timeLimitMin: q.timeLimitMin,
    questions: q.questions.map((x) => ({ text: x.text, options: x.options, correctIndex: x.correctIndex, marks: x.marks })),
  };
  return <QuizEditor quiz={data} />;
}
