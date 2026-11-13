import Link from "next/link";
import { dayFor, teacherFor, skipFor, relDay, badgeClass, newQuizHref, subClass, subStyle } from "@/lib/scheduleCore";

// The rotation table for upcoming school days. Teachers see their own cells outlined.
export function RotationTable({ cfg, dates, today, uid, admin, nameOf }) {
  if (dates.length === 0) return <p className="pt-muted">No school days are scheduled yet.</p>;
  return (
    <div className="pt-table-wrap">
      <table className="pt-table pt-rot">
        <thead>
          <tr>
            <th>Class</th>
            {dates.map((d) => (
              <th key={d} className={d === today ? "today" : ""}>
                {relDay(d, today)}
                <span className="pt-rot-day">Day {dayFor(d, cfg)}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cfg.grid.map((r) => (
            <tr key={r.className}>
              <td><strong>{r.className}</strong></td>
              {dates.map((d) => {
                const off = skipFor(cfg, d, r.className);
                if (off) {
                  return (
                    <td key={d}>
                      <div className="pt-cellstack">
                        <div className="pt-subcell pt-skip" title={off.note || "No quiz"}>
                          No quiz
                          {off.note && <span className="pt-rot-t">{off.note}</span>}
                        </div>
                      </div>
                    </td>
                  );
                }
                const list = r.subjects[dayFor(d, cfg) - 1];
                return (
                  <td key={d}>
                    <div className="pt-cellstack">
                    {list.map((subject) => {
                      const t = teacherFor(cfg, r.className, subject);
                      const mine = !admin && t === uid;
                      return (
                        <div key={subject} className={`pt-subcell ${subClass(subject)} ${mine ? "mine" : ""}`} style={subStyle(subject)}>
                          {subject}
                          {admin && <span className="pt-rot-t">{nameOf[t] || "Unassigned"}</span>}
                        </div>
                      );
                    })}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// items: [{ date, day, className, subject, status: { key, label }, quizId, published }]
export function DutyList({ items, today }) {
  const dates = [...new Set(items.map((i) => i.date))];
  return dates.map((d) => {
    const rows = items.filter((i) => i.date === d);
    return (
      <section key={d}>
        <h3 className="pt-day">{relDay(d, today)}, Day {rows[0].day}</h3>
        <ul className="pt-list pt-card" style={{ padding: "4px 18px" }}>
          {rows.map((it) => (
            <li key={it.className + it.subject}>
              <div>
                <strong>{it.className}, {it.subject}</strong>
              </div>
              <div className="pt-row">
                <span className={`pt-badge ${badgeClass(it.status.key)}`}>{it.status.label}</span>
                {it.quizId ? (
                  <>
                    <Link className="pt-btn alt" href={`/portal/dashboard/quizzes/${it.quizId}`}>Edit quiz</Link>
                    {it.status.key === "published" && <Link className="pt-btn alt" href={`/portal/dashboard/quizzes/${it.quizId}/results`}>Results</Link>}
                  </>
                ) : (
                  <Link className="pt-btn" href={newQuizHref(it)}>Create quiz</Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  });
}

// rows: [{ className, subject, teacherName, status: { key, label }, quizId, attempts }]
export function BoardTable({ rows }) {
  return (
    <div className="pt-table-wrap">
      <table className="pt-table">
        <thead><tr><th>Class</th><th>Subject</th><th>Teacher</th><th>Status</th><th>Submissions</th><th>Actions</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            r.skipped ? (
              <tr key={r.className + "-off"}>
                <td><strong>{r.className}</strong></td>
                <td colSpan={2} className="pt-muted">{r.note || "No quiz for this class today"}</td>
                <td><span className="pt-badge muted">No quiz</span></td>
                <td></td>
                <td></td>
              </tr>
            ) : (
            <tr key={r.className + r.subject}>
              <td><strong>{r.className}</strong></td>
              <td><span className={`pt-subtag ${subClass(r.subject)}`} style={subStyle(r.subject)}>{r.subject}</span></td>
              <td>{r.teacherName || <span className="pt-badge late">Unassigned</span>}</td>
              <td><span className={`pt-badge ${badgeClass(r.status.key)}`}>{r.status.label}</span></td>
              <td>{r.quizId ? r.attempts : ""}</td>
              <td>
                {r.quizId ? (
                  <>
                    <Link href={`/portal/dashboard/quizzes/${r.quizId}`}>Open</Link>
                    <Link href={`/portal/dashboard/quizzes/${r.quizId}/results`}>Results</Link>
                  </>
                ) : null}
              </td>
            </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Guidelines() {
  const rows = [
    ["Quiz source", "The chapter already completed in class"],
    ["Questions", "10 to 15 MCQs per quiz"],
    ["Duration", "10 to 15 minutes"],
    ["Mode", "Online quiz in this portal"],
    ["Attempts", "One attempt per student (by roll number)"],
    ["Sharing", "Class-wise WhatsApp groups, using the quiz link"],
    ["Results", "Automatic. The subject teacher reviews responses the next day"],
  ];
  return (
    <div className="pt-card">
      <h2 className="pt-card-title">Quiz guidelines</h2>
      <dl className="pt-defs">
        {rows.map(([k, v]) => (
          <div key={k} style={{ display: "contents" }}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <p className="pt-hint" style={{ marginTop: 12 }}>
        Put the class, subject and chapter in the quiz title, and check the correct answers before publishing the link.
      </p>
    </div>
  );
}
