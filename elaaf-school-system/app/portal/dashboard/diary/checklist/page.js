import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/adminOnly";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import DiaryCheck from "@/lib/models/DiaryCheck";
import ChecklistTable from "@/components/portal/ChecklistTable";
import { param } from "@/lib/diaryQuery";
import { todayPK } from "@/lib/dates";

export const dynamic = "force-dynamic";

export default async function ChecklistPage({ searchParams }) {
  if (!(await getAdminSession())) redirect("/portal/dashboard");
  const sp = await searchParams;
  const m = param(sp, "month");
  const month = /^\d{4}-\d{2}$/.test(m) ? m : todayPK().slice(0, 7);

  await connectDB();
  const teachers = await User.find({ role: "teacher", active: { $ne: false } }).sort({ name: 1 }).lean();
  const checks = await DiaryCheck.find({ month }).lean();
  const byTeacher = Object.fromEntries(checks.map((c) => [String(c.teacher), c]));

  const rows = teachers.map((t) => {
    const c = byTeacher[String(t._id)] || {};
    return { teacherId: String(t._id), name: t.name || t.email, lessonPlan: c.lessonPlan || "", homeworkDiary: c.homeworkDiary || "", notebooksCorrected: c.notebooksCorrected || "" };
  });

  return (
    <>
      <div className="pt-head">
        <h1>Monthly checklist</h1>
        <p>Record whether each teacher kept a lesson plan, a homework diary and corrected notebooks this month.</p>
      </div>

      <form className="pt-filters" method="GET" style={{ alignItems: "end" }}>
        <div className="pt-field" style={{ margin: 0 }}>
          <label htmlFor="month">Month</label>
          <input id="month" type="month" name="month" defaultValue={month} style={{ width: "auto" }} />
        </div>
        <button className="pt-btn alt">Show month</button>
      </form>

      {rows.length === 0 ? (
        <div className="pt-card pt-empty"><p className="pt-muted">There are no active teacher accounts yet. Add teachers from the Teachers page.</p></div>
      ) : (
        <ChecklistTable key={month} month={month} rows={rows} />
      )}
    </>
  );
}
