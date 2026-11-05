import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/adminOnly";
import { connectDB } from "@/lib/mongodb";
import DiaryEntry from "@/lib/models/DiaryEntry";
import User from "@/lib/models/User";
import ReviewCell from "@/components/portal/ReviewCell";
import PrintButton from "@/components/portal/PrintButton";
import { CLASSES, SUBJECTS } from "@/lib/constants";
import { diaryFilter, param } from "@/lib/diaryQuery";
import { todayPK, addDays, fmtDate } from "@/lib/dates";

export const dynamic = "force-dynamic";

const PREV = { yes: "Yes", no: "No", na: "Not applicable" };

export default async function AllDiariesPage({ searchParams }) {
  const session = await getAdminSession();
  if (!session) redirect("/portal/dashboard");
  const sp = await searchParams;
  const today = todayPK();

  const f = {
    teacher: param(sp, "teacher"),
    className: param(sp, "className"),
    subject: param(sp, "subject"),
    from: param(sp, "from") || addDays(today, -6),
    to: param(sp, "to") || today,
  };

  await connectDB();
  const users = await User.find().sort({ name: 1 }).lean();
  const nameOf = Object.fromEntries(users.map((u) => [String(u._id), u.name || u.email]));

  const found = await DiaryEntry.find(diaryFilter(f, session)).sort({ date: -1, createdAt: -1 }).limit(301).lean();
  const truncated = found.length > 300;
  const rows = found.slice(0, 300);

  const doneToday = new Set((await DiaryEntry.distinct("teacher", { date: today })).map(String));
  const pending = users.filter((u) => u.role === "teacher" && u.active !== false && !doneToday.has(String(u._id)));

  const qs = new URLSearchParams(Object.entries(f).filter(([, v]) => v)).toString();

  return (
    <>
      <div className="pt-head">
        <h1>All diaries</h1>
        <p>See what every teacher has taught and assigned, and review entries.</p>
      </div>

      <div className="pt-card pt-noprint">
        <strong>Not submitted today ({pending.length})</strong>
        <div className="pt-chips" style={{ marginTop: 10 }}>
          {pending.length === 0 ? (
            <span className="pt-ok" style={{ margin: 0 }}>Every active teacher has added an entry dated today.</span>
          ) : (
            pending.map((u) => <span className="pt-tag warn" key={String(u._id)}>{u.name || u.email}</span>)
          )}
        </div>
      </div>

      <form className="pt-filters pt-noprint" method="GET" style={{ alignItems: "end" }}>
        <div className="pt-field" style={{ margin: 0 }}>
          <label htmlFor="teacher">Teacher</label>
          <select id="teacher" name="teacher" defaultValue={f.teacher}>
            <option value="">All teachers</option>
            {users.map((u) => <option key={String(u._id)} value={String(u._id)}>{u.name || u.email}</option>)}
          </select>
        </div>
        <div className="pt-field" style={{ margin: 0 }}>
          <label htmlFor="className">Class</label>
          <select id="className" name="className" defaultValue={f.className}>
            <option value="">All classes</option>
            {CLASSES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="pt-field" style={{ margin: 0 }}>
          <label htmlFor="subject">Subject</label>
          <select id="subject" name="subject" defaultValue={f.subject}>
            <option value="">All subjects</option>
            {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="pt-field" style={{ margin: 0 }}>
          <label htmlFor="from">From</label>
          <input id="from" type="date" name="from" defaultValue={f.from} style={{ width: "auto" }} />
        </div>
        <div className="pt-field" style={{ margin: 0 }}>
          <label htmlFor="to">To</label>
          <input id="to" type="date" name="to" defaultValue={f.to} style={{ width: "auto" }} />
        </div>
        <button className="pt-btn">Apply filter</button>
      </form>

      <div className="pt-row pt-noprint" style={{ marginBottom: 14 }}>
        <a className="pt-btn alt" href={`/api/diary/export?${qs}`}>Download CSV</a>
        <PrintButton />
        <span className="pt-hint">{rows.length} {rows.length === 1 ? "entry" : "entries"}{truncated ? ", showing the latest 300. Narrow the filter to see the rest." : ""}</span>
      </div>

      <div className="pt-printonly">
        <h2>Elaaf School: teacher daily diary</h2>
        <p>
          {f.teacher ? nameOf[f.teacher] || "Teacher" : "All teachers"}, {fmtDate(f.from)} to {fmtDate(f.to)}
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="pt-card pt-empty"><p className="pt-muted">No diary entries match this filter.</p></div>
      ) : (
        <div className="pt-table-wrap">
          <table className="pt-table">
            <thead>
              <tr><th>Date</th><th>Teacher</th><th>Class</th><th>Subject</th><th>Topic taught</th><th>Homework given</th><th>Prev. HW checked</th><th>Review</th></tr>
            </thead>
            <tbody>
              {rows.map((e) => (
                <tr key={String(e._id)}>
                  <td>{fmtDate(e.date)}</td>
                  <td>{nameOf[String(e.teacher)] || "Unknown"}</td>
                  <td>{e.className}</td>
                  <td>{e.subject}</td>
                  <td className="wrap">{e.topic}</td>
                  <td className="wrap">{e.homework || "None"}</td>
                  <td>{PREV[e.prevHwChecked]}</td>
                  <td className="wrap">
                    <ReviewCell entry={{ id: String(e._id), reviewed: e.reviewed, adminRemark: e.adminRemark }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
