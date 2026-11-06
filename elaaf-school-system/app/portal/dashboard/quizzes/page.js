import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Quiz from "@/lib/models/Quiz";
import Attempt from "@/lib/models/Attempt";
import { CLASSES, SUBJECTS } from "@/lib/constants";
import User from "@/lib/models/User";

export const dynamic = "force-dynamic";

export default async function QuizzesPage({ searchParams }) {
  const sp = await searchParams;
  const session = await getServerSession(authOptions);
  await connectDB();

  const filter = session.user.role === "admin" ? {} : { teacher: session.user.id };
  if (sp?.className) filter.className = sp.className;
  if (sp?.subject) filter.subject = sp.subject;
  const quizzes = await Quiz.find(filter).sort({ createdAt: -1 }).lean();

  const ids = quizzes.map((q) => q._id);
  const submissions = ids.length ? await Attempt.countDocuments({ quiz: { $in: ids } }) : 0;
  const published = quizzes.filter((q) => q.status === "published").length;
  const filtered = Boolean(sp?.className || sp?.subject);
  const admin = session.user.role === "admin";

  let nameOf = {};
if (admin) {
  const users = await User.find().select("name email").lean();
  nameOf = Object.fromEntries(users.map((u) => [String(u._id), u.name || u.email]));
}

  // Group: class -> subject -> quizzes
  const byClass = {};
  for (const q of quizzes) {
    ((byClass[q.className] ||= {})[q.subject] ||= []).push(q);
  }
  const classOrder = [
    ...CLASSES.filter((c) => byClass[c]),
    ...Object.keys(byClass).filter((c) => !CLASSES.includes(c)),
  ];

  return (
    <>
      <div className="pt-head">
        <h1>{admin ? "All quizzes" : "My quizzes"}</h1>
        <p>Quizzes grouped by class and subject. Share the link of a published quiz with students.</p>
      </div>

      <div className="pt-stats">
        <div className="pt-stat"><b>{quizzes.length}</b><span>Total quizzes</span></div>
        <div className="pt-stat"><b>{published}</b><span>Published</span></div>
        <div className="pt-stat"><b>{submissions}</b><span>Student submissions</span></div>
      </div>

      <form className="pt-filters" method="GET">
        <select name="className" defaultValue={sp?.className || ""} aria-label="Filter by class">
          <option value="">All classes</option>
          {CLASSES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select name="subject" defaultValue={sp?.subject || ""} aria-label="Filter by subject">
          <option value="">All subjects</option>
          {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
        </select>
        <button className="pt-btn alt">Apply filter</button>
        {filtered && <Link className="pt-btn alt" href="/portal/dashboard/quizzes">Clear filter</Link>}
        <Link className="pt-btn" href="/portal/dashboard/quizzes/new" style={{ marginLeft: "auto" }}>Create quiz</Link>
      </form>

      {quizzes.length === 0 ? (
        <div className="pt-card pt-empty">
          <p className="pt-muted">{filtered ? "No quizzes match this filter." : "No quizzes have been created yet."}</p>
          {!filtered && <Link className="pt-btn" href="/portal/dashboard/quizzes/new">Create the first quiz</Link>}
        </div>
      ) : (
        classOrder.map((cls) => {
          const subjects = byClass[cls];
          const count = Object.values(subjects).reduce((n, list) => n + list.length, 0);
          const subjectOrder = [
            ...SUBJECTS.filter((s) => subjects[s]),
            ...Object.keys(subjects).filter((s) => !SUBJECTS.includes(s)),
          ];
          return (
            <details className="pt-group" key={cls} open>
              <summary>
                <span>{cls}</span>
                <span className="pt-pill">{count} {count === 1 ? "quiz" : "quizzes"}</span>
              </summary>

              {subjectOrder.map((sub) => (
                <div className="pt-subgroup" key={sub}>
                  <h3>{sub} <span>{subjects[sub].length}</span></h3>
                  <div className="pt-table-wrap">
                    <table className="pt-table">
                      <thead>
                        <tr><th>Title</th>{admin && <th>Teacher</th>}<th>Questions</th><th>Status</th><th>Code</th><th>Actions</th></tr>
                      </thead>
                      <tbody>
                        {subjects[sub].map((q) => (
                          <tr key={String(q._id)}>
                            <td><strong>{q.title}</strong></td>
                            {admin && <td>{nameOf[String(q.teacher)] || "Unknown"}</td>}
                            <td>{q.questions.length}</td>
                            <td><span className={`pt-badge ${q.status === "published" ? "live" : ""}`}>{q.status === "published" ? "Published" : "Draft"}</span></td>
                            <td>{q.code}</td>
                            <td>
                              <Link href={`/portal/dashboard/quizzes/${q._id}`}>Edit</Link>
                              <Link href={`/portal/dashboard/quizzes/${q._id}/results`}>Results</Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </details>
          );
        })
      )}
    </>
  );
}
