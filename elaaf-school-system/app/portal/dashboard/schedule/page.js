import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Quiz from "@/lib/models/Quiz";
import Attempt from "@/lib/models/Attempt";
import User from "@/lib/models/User";
import { param } from "@/lib/diaryQuery";
import { todayPK, isYmd, fmtDate } from "@/lib/dates";
import { loadConfig } from "@/lib/schedule";
import { dayFor, skipFor, nextSchoolDays, recentSchoolDays, slotsFor, slotKey, quizMap, statusOf } from "@/lib/scheduleCore";
import { RotationTable, DutyList, BoardTable, Guidelines } from "@/components/portal/ScheduleViews";

export const dynamic = "force-dynamic";

export default async function SchedulePage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const admin = session.user.role === "admin";
  const uid = session.user.id;
  const sp = await searchParams;

  await connectDB();
  const cfg = await loadConfig();
  const today = todayPK();

  if (!cfg.startDate) {
    return (
      <>
        <div className="pt-head"><h1>Quiz schedule</h1></div>
        <div className="pt-card pt-empty">
          <p className="pt-muted">The quiz schedule has not been set up yet.</p>
          {admin && <Link className="pt-btn" href="/portal/dashboard/schedule/setup">Set up the schedule</Link>}
        </div>
      </>
    );
  }

  const upcoming = nextSchoolDays(cfg, today, 6);
  const past = recentSchoolDays(cfg, today, 2);
  const asked = param(sp, "date");
  const boardDate = isYmd(asked) ? asked : upcoming[0] || today;
  const dates = [...new Set([...past, ...upcoming, boardDate])];

  const [quizzes, users] = await Promise.all([
    Quiz.find({ scheduledFor: { $in: dates } }).select("className subject status scheduledFor teacher").lean(),
    User.find().select("name email").lean(),
  ]);
  const qm = quizMap(quizzes);
  const nameOf = Object.fromEntries(users.map((u) => [String(u._id), u.name || u.email]));
  const todayDay = dayFor(today, cfg);

  // ---- teacher view: my quizzes ----
  const duties = [...past, ...upcoming]
    .flatMap((d) => slotsFor(cfg, d))
    .filter((s) => s.teacherId === uid)
    .map((s) => {
      const q = qm[slotKey(s.date, s.className, s.subject)];
      return { ...s, quizId: q ? String(q._id) : "", status: statusOf(q, s.date, today) };
    })
    .filter((it) => it.date >= today || it.status.key !== "published");

  // ---- admin view: the board for one date ----
  let board = [];
  const boardDay = dayFor(boardDate, cfg);
  if (admin && boardDay) {
    const slots = slotsFor(cfg, boardDate);
    const ids = slots.map((s) => qm[slotKey(s.date, s.className, s.subject)]).filter(Boolean).map((q) => q._id);
    const counts = ids.length ? await Attempt.aggregate([{ $match: { quiz: { $in: ids } } }, { $group: { _id: "$quiz", n: { $sum: 1 } } }]) : [];
    const countOf = Object.fromEntries(counts.map((c) => [String(c._id), c.n]));
    board = cfg.grid.flatMap((g) => {
      const off = skipFor(cfg, boardDate, g.className);
      if (off) return [{ className: g.className, skipped: true, note: off.note }];
      return slots
        .filter((s) => s.className === g.className)
        .map((s) => {
          const q = qm[slotKey(s.date, s.className, s.subject)];
          return {
            className: s.className,
            subject: s.subject,
            teacherName: nameOf[s.teacherId] || "",
            status: statusOf(q, s.date, today),
            quizId: q ? String(q._id) : "",
            attempts: q ? countOf[String(q._id)] || 0 : 0,
          };
        });
    });
  }
  const unassigned = board.filter((r) => !r.skipped && !r.teacherName).length;

  return (
    <>
      <div className="pt-head">
        <h1>Quiz schedule</h1>
        <p>
          Chapter-wise quizzes on a 6-day rotation.
          {todayDay ? ` Today is Day ${todayDay}.` : " There is no quiz today (Sunday or holiday)."}
        </p>
      </div>

      {admin ? (
        <>
          <div className="pt-row" style={{ marginBottom: 14 }}>
            <Link className="pt-btn" href="/portal/dashboard/schedule/setup">Schedule setup</Link>
          </div>

          <h2 style={{ fontSize: "1.15rem", margin: "0 0 10px" }}>
            Board for {boardDay ? `${fmtDate(boardDate)}, Day ${boardDay}` : fmtDate(boardDate)}
          </h2>
          <form className="pt-filters" method="GET" style={{ alignItems: "end" }}>
            <div className="pt-field" style={{ margin: 0 }}>
              <label htmlFor="date">Date</label>
              <input id="date" type="date" name="date" defaultValue={boardDate} style={{ width: "auto" }} />
            </div>
            <button className="pt-btn alt">Show date</button>
          </form>
          {unassigned > 0 && (
            <p className="pt-notice">{unassigned} {unassigned === 1 ? "class has" : "classes have"} no teacher assigned for this date. Assign teachers in Schedule setup.</p>
          )}
          {board.length === 0 ? (
            <div className="pt-card pt-empty"><p className="pt-muted">No quizzes are scheduled on this date (before Day 1, Sunday or a holiday).</p></div>
          ) : (
            <BoardTable rows={board} />
          )}
        </>
      ) : (
        <>
          <h2 style={{ fontSize: "1.15rem", margin: "0 0 4px" }}>My quizzes to publish</h2>
          {duties.length === 0 ? (
            <div className="pt-card"><p className="pt-muted">No quizzes are assigned to you in the next school days.</p></div>
          ) : (
            <DutyList items={duties} today={today} />
          )}
        </>
      )}

      <h2 style={{ fontSize: "1.15rem", margin: "28px 0 10px" }}>Next 6 school days</h2>
      {!admin && <p className="pt-hint" style={{ margin: "-6px 0 10px" }}>Your own quizzes are outlined in red.</p>}
      <RotationTable cfg={cfg} dates={upcoming} today={today} uid={uid} admin={admin} nameOf={nameOf} />

      <div style={{ marginTop: 20 }}>
        <Guidelines />
      </div>
    </>
  );
}
