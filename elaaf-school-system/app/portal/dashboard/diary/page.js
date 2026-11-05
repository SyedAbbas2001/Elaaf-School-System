import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import DiaryEntry from "@/lib/models/DiaryEntry";
import DiaryCheck from "@/lib/models/DiaryCheck";
import DiaryEntryForm from "@/components/portal/DiaryEntryForm";
import DiaryEntries from "@/components/portal/DiaryEntries";
import { todayPK, addDays, fmtDate, canEditDate, DIARY_EDIT_DAYS } from "@/lib/dates";

export const dynamic = "force-dynamic";

const YN = { yes: "Yes", no: "No", "": "Not checked yet" };

export default async function MyDiaryPage() {
  const session = await getServerSession(authOptions);
  await connectDB();
  const today = todayPK();
  const month = today.slice(0, 7);
  const admin = session.user.role === "admin";

  const [entries, check] = await Promise.all([
    DiaryEntry.find({ teacher: session.user.id, date: { $gte: addDays(today, -30) } }).sort({ date: -1, createdAt: -1 }).lean(),
    DiaryCheck.findOne({ teacher: session.user.id, month }).lean(),
  ]);

  const groups = [];
  for (const e of entries) {
    let g = groups[groups.length - 1];
    if (!g || g.date !== e.date) groups.push((g = { date: e.date, label: fmtDate(e.date), entries: [] }));
    g.entries.push({
      id: String(e._id),
      date: e.date,
      className: e.className,
      subject: e.subject,
      topic: e.topic,
      homework: e.homework,
      prevHwChecked: e.prevHwChecked,
      adminRemark: e.adminRemark,
      reviewed: e.reviewed,
      editable: admin || (!e.reviewed && canEditDate(e.date)),
    });
  }
  const todayCount = entries.filter((e) => e.date === today).length;
  const minDate = admin ? undefined : addDays(today, -DIARY_EDIT_DAYS);

  return (
    <>
      <div className="pt-head">
        <h1>My daily diary</h1>
        <p>
          Record what you taught and the homework you gave. {todayCount > 0 ? `You have added ${todayCount} ${todayCount === 1 ? "entry" : "entries"} today.` : "You have not added an entry today."}
        </p>
      </div>

      {check && (
        <div className="pt-card">
          <strong>This month, checked by the admin</strong>
          <div className="pt-chips" style={{ marginTop: 10 }}>
            <span className="pt-tag">Lesson plan: {YN[check.lessonPlan]}</span>
            <span className="pt-tag">Homework diary: {YN[check.homeworkDiary]}</span>
            <span className="pt-tag">Notebooks corrected: {YN[check.notebooksCorrected]}</span>
          </div>
        </div>
      )}

      <h2 style={{ fontSize: "1.15rem", margin: "6px 0 10px" }}>Add an entry</h2>
      <DiaryEntryForm minDate={minDate} maxDate={today} />

      <h2 style={{ fontSize: "1.15rem", margin: "26px 0 0" }}>Last 30 days</h2>
      <p className="pt-hint">Entries can be edited for {DIARY_EDIT_DAYS} days, or until the admin reviews them. After that they are locked.</p>
      <DiaryEntries groups={groups} minDate={minDate} maxDate={today} />
    </>
  );
}
