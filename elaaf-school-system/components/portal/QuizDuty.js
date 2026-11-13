import Link from "next/link";
import Quiz from "@/lib/models/Quiz";
import User from "@/lib/models/User";
import { todayPK } from "@/lib/dates";
import { loadConfig } from "@/lib/schedule";
import { dayFor, skippedOn, slotsFor, recentSchoolDays, quizMap, slotKey, statusOf, badgeClass } from "@/lib/scheduleCore";
import { DutyList } from "@/components/portal/ScheduleViews";

// Home page card: what has to be published today (teacher) or how today is going (admin)
export default async function QuizDuty({ uid, admin }) {
  const cfg = await loadConfig();
  const today = todayPK();

  if (!cfg.startDate) {
    if (!admin) return null;
    return (
      <div className="pt-card pt-rise">
        <h2 className="pt-card-title">Quiz schedule</h2>
        <p className="pt-muted">The quiz schedule has not been set up yet.</p>
        <Link className="pt-more" href="/portal/dashboard/schedule/setup">Set up the schedule</Link>
      </div>
    );
  }

  const day = dayFor(today, cfg);
  const past = recentSchoolDays(cfg, today, 2);
  const dates = day ? [...past, today] : past;
  const quizzes = dates.length ? await Quiz.find({ scheduledFor: { $in: dates } }).select("className subject status scheduledFor").lean() : [];
  const qm = quizMap(quizzes);

  if (admin) {
    if (!day) {
      return (
        <div className="pt-card pt-rise">
          <h2 className="pt-card-title">Quiz schedule</h2>
          <p className="pt-muted">There are no quizzes scheduled today (Sunday, holiday or before Day 1).</p>
          <Link className="pt-more" href="/portal/dashboard/schedule">Open the schedule</Link>
        </div>
      );
    }
    const users = await User.find().select("name email").lean();
    const nameOf = Object.fromEntries(users.map((u) => [String(u._id), u.name || u.email]));
    const rows = slotsFor(cfg, today).map((s) => ({ ...s, status: statusOf(qm[slotKey(s.date, s.className, s.subject)], s.date, today) }));
    const done = rows.filter((r) => r.status.key === "published").length;
    return (
      <div className="pt-card pt-rise pt-duty">
        <h2 className="pt-card-title">Quizzes for today, Day {day}</h2>
        <p className="pt-hint" style={{ marginBottom: 0 }}>
          {done} of {rows.length} published
          {skippedOn(cfg, today).length > 0 && `. No quiz today for ${skippedOn(cfg, today).map((x) => x.className).join(", ")}`}
        </p>
        <ul className="pt-list pt-duty-grid">
          {rows.map((r) => (
            <li key={r.className + r.subject}>
              <div>
                <strong>{r.className}, {r.subject}</strong>
                <span className="meta">{nameOf[r.teacherId] || "Unassigned"}</span>
              </div>
              <span className={`pt-badge ${badgeClass(r.status.key)}`}>{r.status.label}</span>
            </li>
          ))}
        </ul>
        <Link className="pt-more" href="/portal/dashboard/schedule">Open the schedule board</Link>
      </div>
    );
  }

  // teacher: today's quizzes, plus anything from the last two school days that is not published yet
  const items = [...past, ...(day ? [today] : [])]
    .flatMap((d) => slotsFor(cfg, d))
    .filter((s) => s.teacherId === uid)
    .map((s) => {
      const q = qm[slotKey(s.date, s.className, s.subject)];
      return { ...s, quizId: q ? String(q._id) : "", status: statusOf(q, s.date, today) };
    })
    .filter((it) => it.date === today || it.status.key !== "published");
  if (items.length === 0) return null;

  return (
    <div className="pt-rise pt-duty" style={{ marginBottom: 12 }}>
      <h2 className="pt-card-title" style={{ marginBottom: 0 }}>Quizzes to publish</h2>
      <DutyList items={items} today={today} />
      <Link className="pt-more" href="/portal/dashboard/schedule">Open the full schedule</Link>
    </div>
  );
}
