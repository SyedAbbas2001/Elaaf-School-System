import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Quiz from "@/lib/models/Quiz";

// Checks sign-in and that the quiz belongs to this teacher (admins can access all)
export async function getOwnedQuiz(id) {
  const session = await getServerSession(authOptions);
  if (!session) return { error: 401 };
  await connectDB();
  let quiz = null;
  try {
    quiz = await Quiz.findById(id);
  } catch {}
  if (!quiz) return { error: 404 };
  if (session.user.role !== "admin" && quiz.teacher.toString() !== session.user.id) return { error: 403 };
  return { quiz, session };
}
