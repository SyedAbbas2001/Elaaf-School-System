import Link from "next/link";
import { notFound } from "next/navigation";
import { getOwnedQuiz } from "@/lib/quizAccess";
import Attempt from "@/lib/models/Attempt";
import PrintButton from "@/components/portal/PrintButton";

export const dynamic = "force-dynamic";

const pct = (a) => (a.total ? Math.round((a.score / a.total) * 100) : 0);

export default async function ResultsPage({ params }) {
  const { id } = await params;
  const r = await getOwnedQuiz(id);
  if (r.error) notFound();
  const quiz = r.quiz;
  const attempts = await Attempt.find({ quiz: quiz._id }).sort({ createdAt: -1 }).lean();

  const avg = attempts.length ? Math.round(attempts.reduce((s, a) => s + pct(a), 0) / attempts.length) : 0;
  const top = attempts.length ? Math.max(...attempts.map(pct)) : 0;

  return (
    <>
      <div className="pt-head">
        <h1>{quiz.title}</h1>
        <p>Results for {quiz.className}, {quiz.subject}</p>
      </div>

      <div className="pt-stats">
        <div className="pt-stat"><b>{attempts.length}</b><span>Submissions</span></div>
        <div className="pt-stat"><b>{avg}%</b><span>Average score</span></div>
        <div className="pt-stat"><b>{top}%</b><span>Highest score</span></div>
      </div>

      <div className="pt-row pt-noprint" style={{ marginBottom: 16 }}>
        <a className="pt-btn" href={`/api/quizzes/${id}/export`}>Download CSV</a>
        <PrintButton />
        <Link className="pt-btn alt" href={`/portal/dashboard/quizzes/${id}`}>Edit quiz</Link>
      </div>

      {/* Shown only on the printed page */}
      <div className="pt-printonly pt-print-results">
        <h2>{quiz.title}</h2>
        <p>{quiz.className}, {quiz.subject}</p>
        <p>{attempts.length} submissions, average {avg}%, highest {top}%</p>
      </div>

      {attempts.length === 0 ? (
        <div className="pt-card pt-empty"><p className="pt-muted">No student has submitted this quiz yet.</p></div>
      ) : (
        <div className="pt-table-wrap">
          <table className="pt-table">
            <thead>
              <tr>
                <th>Roll no</th><th>Student</th><th>Class</th><th>Score</th><th>Percent</th>
                <th className="pt-noprint">Tab switches</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((a) => (
                <tr key={String(a._id)}>
                  <td>{a.rollNo}</td>
                  <td>{a.studentName}</td>
                  <td>{a.className}</td>
                  <td>{a.score} / {a.total}</td>
                  <td>{pct(a)}%</td>
                  <td className="pt-noprint">{a.tabSwitches || 0}</td>
                  <td>{new Date(a.createdAt).toLocaleString("en-GB", { timeZone: "Asia/Karachi" })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
