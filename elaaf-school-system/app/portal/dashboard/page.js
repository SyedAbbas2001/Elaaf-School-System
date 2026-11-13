import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Quiz from "@/lib/models/Quiz";
import Attempt from "@/lib/models/Attempt";
import DiaryEntry from "@/lib/models/DiaryEntry";
import User from "@/lib/models/User";
import { CLASSES } from "@/lib/constants";
import { todayPK, addDays, fmtDate, TZ } from "@/lib/dates";
import { lastDays, dayNum, fmtShort, dayExpr, pctExpr } from "@/lib/stats";
import QuizDuty from "@/components/portal/QuizDuty";
import { StatTile, ChartCard, BarChart, HBars, LineChart, Donut, DayStrip } from "@/components/portal/charts";

export const dynamic = "force-dynamic";

const when = (d) => new Date(d).toLocaleString("en-GB", { timeZone: TZ, day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
const short = (t, n = 90) => (t.length > n ? t.slice(0, n) + "..." : t);
const since = () => new Date(Date.now() - 16 * 24 * 60 * 60 * 1000);

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  await connectDB();
  const today = todayPK();
  const first = (session.user.name || "").split(" ")[0] || "there";
  const admin = session.user.role === "admin";

  return (
    <>
      <div className="pt-head pt-rise">
        <h1>Welcome, {first}</h1>
        <p>{fmtDate(today)}</p>
      </div>
      {admin ? <AdminHome today={today} /> : <TeacherHome uid={session.user.id} today={today} />}
    </>
  );
}

async function TeacherHome({ uid, today }) {
  const month = today.slice(0, 7);
  const days = lastDays(today);
  const quizzes = await Quiz.find({ teacher: uid }).sort({ createdAt: -1 }).select("title className subject status").lean();
  const ids = quizzes.map((q) => q._id);
  const titleOf = Object.fromEntries(quizzes.map((q) => [String(q._id), q.title]));

  const [submissions, recent, todayCount, monthCount, remarks, perDay, byQuiz, diaryDates] = await Promise.all([
    ids.length ? Attempt.countDocuments({ quiz: { $in: ids } }) : 0,
    ids.length ? Attempt.find({ quiz: { $in: ids } }).sort({ createdAt: -1 }).limit(5).lean() : [],
    DiaryEntry.countDocuments({ teacher: uid, date: today }),
    DiaryEntry.countDocuments({ teacher: uid, date: { $gte: `${month}-01`, $lte: `${month}-31` } }),
    DiaryEntry.find({ teacher: uid, adminRemark: { $ne: "" }, date: { $gte: addDays(today, -14) } }).sort({ date: -1 }).limit(3).lean(),
    ids.length ? Attempt.aggregate([{ $match: { quiz: { $in: ids }, createdAt: { $gte: since() } } }, { $group: { _id: dayExpr, n: { $sum: 1 } } }]) : [],
    ids.length ? Attempt.aggregate([{ $match: { quiz: { $in: ids } } }, { $group: { _id: "$quiz", avg: { $avg: pctExpr }, n: { $sum: 1 } } }, { $sort: { n: -1 } }, { $limit: 6 }]) : [],
    DiaryEntry.find({ teacher: uid, date: { $gte: days[0] } }).select("date").lean(),
  ]);
  const published = quizzes.filter((q) => q.status === "published").length;

  const subMap = Object.fromEntries(perDay.map((x) => [x._id, x.n]));
  const subData = days.map((d) => ({ key: d, label: dayNum(d), value: subMap[d] || 0, tip: `${fmtShort(d)}: ${subMap[d] || 0} submissions` }));
  const subTotal = subData.reduce((s, d) => s + d.value, 0);

  const quizRows = byQuiz.map((x) => ({
    key: String(x._id),
    label: short(titleOf[String(x._id)] || "Quiz", 24),
    value: Math.round(x.avg),
    text: `${Math.round(x.avg)}% (${x.n})`,
    tip: `${titleOf[String(x._id)] || "Quiz"}: average ${Math.round(x.avg)}% from ${x.n} submissions`,
  }));

  const diaryCount = {};
  diaryDates.forEach((e) => (diaryCount[e.date] = (diaryCount[e.date] || 0) + 1));
  const strip = days.map((d) => ({ key: d, label: dayNum(d), on: Boolean(diaryCount[d]), tip: `${fmtShort(d)}: ${diaryCount[d] || 0} entries` }));
  const activeDays = strip.filter((s) => s.on).length;

  return (
    <>
      <div className={`pt-card pt-today pt-rise ${todayCount ? "done" : ""}`} style={{ "--i": 1 }}>
        <div>
          <h2 className="pt-card-title" style={{ marginBottom: 0 }}>{todayCount ? "Today's diary is updated" : "Today's diary is empty"}</h2>
          <p>{todayCount ? `You have added ${todayCount} ${todayCount === 1 ? "entry" : "entries"} for today.` : "Record what you taught and the homework you gave."}</p>
        </div>
        <Link className="pt-btn" href="/portal/dashboard/diary">{todayCount ? "Add another entry" : "Add today's entry"}</Link>
      </div>

      <QuizDuty uid={uid} admin={false} />

      <div className="pt-stats">
        <StatTile i={2} value={quizzes.length} label="My quizzes" />
        <StatTile i={3} value={published} label="Published" />
        <StatTile i={4} value={submissions} label="Student submissions" />
        <StatTile i={5} value={monthCount} label="Diary entries this month" />
      </div>

      <div className="pt-actions pt-rise" style={{ "--i": 6 }}>
        <Link className="pt-btn" href="/portal/dashboard/quizzes/new">Create quiz</Link>
        <Link className="pt-btn alt" href="/portal/dashboard/quizzes">My quizzes</Link>
      </div>

      <div className="pt-charts">
        <ChartCard i={7} title="Student submissions" hint={`Last 14 days, ${subTotal} in total`}>
          <BarChart data={subData} label={`Student submissions per day for the last 14 days, ${subTotal} in total`} />
        </ChartCard>
        <ChartCard i={8} title="Average score by quiz" hint="Quizzes with the most submissions, number of submissions in brackets">
          <HBars rows={quizRows} max={100} empty="Scores will appear here once students submit your quizzes." />
        </ChartCard>
        <ChartCard i={9} title="Diary activity" hint="Last 14 days. Green means at least one entry was added that day.">
          <DayStrip days={strip} label={`Diary entries were added on ${activeDays} of the last 14 days`} />
          <p className="pt-strip-note"><strong>{activeDays} of 14</strong> days have an entry.</p>
        </ChartCard>
      </div>

      <div className="pt-two">
        <div className="pt-card pt-rise" style={{ "--i": 10 }}>
          <h2 className="pt-card-title">Recent quizzes</h2>
          {quizzes.length === 0 ? (
            <p className="pt-muted">You have not created any quizzes yet.</p>
          ) : (
            <ul className="pt-list">
              {quizzes.slice(0, 5).map((q) => (
                <li key={String(q._id)}>
                  <div>
                    <Link href={`/portal/dashboard/quizzes/${q._id}`}>{q.title}</Link>
                    <span className="meta">{q.className}, {q.subject}</span>
                  </div>
                  <span className={`pt-badge ${q.status === "published" ? "live" : ""}`}>{q.status === "published" ? "Published" : "Draft"}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="pt-card pt-rise" style={{ "--i": 11 }}>
          <h2 className="pt-card-title">Latest student submissions</h2>
          {recent.length === 0 ? (
            <p className="pt-muted">No student has submitted one of your quizzes yet.</p>
          ) : (
            <ul className="pt-list">
              {recent.map((a) => (
                <li key={String(a._id)}>
                  <div>
                    <Link href={`/portal/dashboard/quizzes/${a.quiz}/results`}>{a.studentName}</Link>
                    <span className="meta">{titleOf[String(a.quiz)] || "Quiz"}, {when(a.createdAt)}</span>
                  </div>
                  <strong>{a.score} / {a.total}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {remarks.length > 0 && (
        <div className="pt-card pt-rise" style={{ "--i": 12 }}>
          <h2 className="pt-card-title">Remarks from the admin</h2>
          <ul className="pt-list">
            {remarks.map((e) => (
              <li key={String(e._id)}>
                <div>
                  {e.adminRemark}
                  <span className="meta">{fmtDate(e.date)}, {e.className} {e.subject}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

async function AdminHome({ today }) {
  const month = today.slice(0, 7);
  const days = lastDays(today);
  const recentFrom = addDays(today, -30);
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [users, doneIds, todayCount, unreviewedCount, unreviewed, quizCount, publishedCount, weekSubs, recentQuizzes, teachersPerDay, subsPerDay, byClass, daysByTeacher] = await Promise.all([
    User.find().select("name email role active").lean(),
    DiaryEntry.distinct("teacher", { date: today }),
    DiaryEntry.countDocuments({ date: today }),
    DiaryEntry.countDocuments({ reviewed: false, date: { $gte: recentFrom } }),
    DiaryEntry.find({ reviewed: false, date: { $gte: recentFrom } }).sort({ date: -1, createdAt: -1 }).limit(3).lean(),
    Quiz.countDocuments(),
    Quiz.countDocuments({ status: "published" }),
    Attempt.countDocuments({ createdAt: { $gte: weekAgo } }),
    Quiz.find().sort({ createdAt: -1 }).limit(5).select("title className subject status teacher").lean(),
    DiaryEntry.aggregate([{ $match: { date: { $gte: days[0] } } }, { $group: { _id: { d: "$date", t: "$teacher" } } }, { $group: { _id: "$_id.d", n: { $sum: 1 } } }]),
    Attempt.aggregate([{ $match: { createdAt: { $gte: since() } } }, { $group: { _id: dayExpr, n: { $sum: 1 } } }]),
    Attempt.aggregate([{ $group: { _id: "$className", avg: { $avg: pctExpr }, n: { $sum: 1 } } }]),
    DiaryEntry.aggregate([{ $match: { date: { $gte: `${month}-01`, $lte: `${month}-31` } } }, { $group: { _id: { t: "$teacher", d: "$date" } } }, { $group: { _id: "$_id.t", n: { $sum: 1 } } }]),
  ]);

  const nameOf = Object.fromEntries(users.map((u) => [String(u._id), u.name || u.email]));
  const teachers = users.filter((u) => u.role === "teacher" && u.active !== false);
  const done = new Set(doneIds.map(String));
  const pending = teachers.filter((u) => !done.has(String(u._id)));

  const tpd = Object.fromEntries(teachersPerDay.map((x) => [x._id, x.n]));
  const lineData = days.map((d) => ({ key: d, label: dayNum(d), full: fmtShort(d), value: tpd[d] || 0, tip: `${fmtShort(d)}: ${tpd[d] || 0} teachers submitted` }));

  const spd = Object.fromEntries(subsPerDay.map((x) => [x._id, x.n]));
  const subData = days.map((d) => ({ key: d, label: dayNum(d), value: spd[d] || 0, tip: `${fmtShort(d)}: ${spd[d] || 0} submissions` }));
  const subTotal = subData.reduce((s, d) => s + d.value, 0);

  const order = (c) => (CLASSES.indexOf(c) < 0 ? 999 : CLASSES.indexOf(c));
  const classRows = [...byClass]
    .sort((a, b) => order(a._id) - order(b._id))
    .map((x) => ({ key: String(x._id), label: String(x._id || "Unknown"), value: Math.round(x.avg), text: `${Math.round(x.avg)}% (${x.n})`, tip: `${x._id}: average ${Math.round(x.avg)}% from ${x.n} submissions` }));

  const dbt = Object.fromEntries(daysByTeacher.map((x) => [String(x._id), x.n]));
  const teacherRows = teachers
    .map((u) => ({ key: String(u._id), label: short(u.name || u.email, 22), value: dbt[String(u._id)] || 0 }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8)
    .map((r) => ({ ...r, text: `${r.value} ${r.value === 1 ? "day" : "days"}`, tip: `${r.label}: entries on ${r.value} days this month` }));

  return (
    <>
      <div className="pt-stats">
        <StatTile i={1} value={teachers.length} label="Active teachers" />
        <StatTile i={2} value={todayCount} label="Diary entries today" />
        <StatTile i={3} value={pending.length} label="Not submitted today" />
        <StatTile i={4} value={unreviewedCount} label="Awaiting review" />
        <StatTile i={5} value={quizCount} label={`Quizzes (${publishedCount} published)`} />
        <StatTile i={6} value={weekSubs} label="Quiz submissions this week" />
      </div>

      <div className="pt-actions pt-rise" style={{ "--i": 7 }}>
        <Link className="pt-btn" href="/portal/dashboard/diary/all">All diaries</Link>
        <Link className="pt-btn alt" href="/portal/dashboard/diary/checklist">Monthly checklist</Link>
        <Link className="pt-btn alt" href="/portal/dashboard/teachers">Teachers</Link>
        <Link className="pt-btn alt" href="/portal/dashboard/quizzes/new">Create quiz</Link>
      </div>

      <div className="pt-two">
        <QuizDuty uid="" admin />
        <div className="pt-card pt-rise" style={{ "--i": 8 }}>
          <h2 className="pt-card-title">Recent quizzes</h2>
          {recentQuizzes.length === 0 ? (
            <p className="pt-muted">No quizzes have been created yet.</p>
          ) : (
            <ul className="pt-list">
              {recentQuizzes.map((q) => (
                <li key={String(q._id)}>
                  <div>
                    <Link href={`/portal/dashboard/quizzes/${q._id}`}>{q.title}</Link>
                    <span className="meta">{q.className}, {q.subject}, by {nameOf[String(q.teacher)] || "Unknown"}</span>
                  </div>
                  <span className={`pt-badge ${q.status === "published" ? "live" : ""}`}>{q.status === "published" ? "Published" : "Draft"}</span>
                </li>
              ))}
            </ul>
          )}
          <Link className="pt-more" href="/portal/dashboard/quizzes">See all quizzes</Link>
        </div>
      </div>


      <div className="pt-two">
        <div className="pt-card pt-rise" style={{ "--i": 13 }}>
          <h2 className="pt-card-title">Not submitted today ({pending.length})</h2>
          {pending.length === 0 ? (
            <p className="pt-ok" style={{ margin: 0 }}>Every active teacher has added an entry dated today.</p>
          ) : (
            <div className="pt-chips">
              {pending.map((u) => <span className="pt-tag warn" key={String(u._id)}>{u.name || u.email}</span>)}
            </div>
          )}
          <Link className="pt-more" href="/portal/dashboard/diary/all">Open all diaries</Link>
        </div>

        <div className="pt-card pt-rise" style={{ "--i": 14 }}>
          <h2 className="pt-card-title">Awaiting review</h2>
          {unreviewed.length === 0 ? (
            <p className="pt-muted">Nothing is waiting for review from the last 30 days.</p>
          ) : (
            <ul className="pt-list">
              {unreviewed.map((e) => (
                <li key={String(e._id)}>
                  <div>
                    <strong>{nameOf[String(e.teacher)] || "Unknown"}</strong>
                    <span className="meta">{fmtDate(e.date)}, {e.className} {e.subject}</span>
                    <span className="meta">{short(e.topic)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <Link className="pt-more" href="/portal/dashboard/diary/all">Review in All diaries</Link>
        </div>
      </div>
        <div className="pt-charts">
        <ChartCard i={8} title="Diary submissions" hint="Teachers who added at least one entry each day, last 14 days">
          <LineChart data={lineData} label="Number of teachers who submitted a diary entry on each of the last 14 days" />
        </ChartCard>
        <ChartCard i={9} title="Submitted today" hint="Active teachers with an entry dated today">
          <Donut value={teachers.length - pending.length} total={teachers.length} label="Teachers who have submitted today" />
        </ChartCard>
        <ChartCard i={10} title="Quiz submissions" hint={`Last 14 days, ${subTotal} in total`}>
          <BarChart data={subData} label={`Quiz submissions per day for the last 14 days, ${subTotal} in total`} />
        </ChartCard>
        <ChartCard i={11} title="Average quiz score by class" hint="Number of submissions in brackets">
          <HBars rows={classRows} max={100} empty="Scores will appear here once students submit quizzes." />
        </ChartCard>
        <ChartCard i={12} title="Diary days this month" hint="Number of days each teacher added an entry">
          <HBars rows={teacherRows} tone="crimson" empty="Add teacher accounts to see their diary activity." />
        </ChartCard>
      </div>
    </>
  );
}