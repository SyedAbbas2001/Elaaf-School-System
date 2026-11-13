import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/adminOnly";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { loadConfig } from "@/lib/schedule";
import ScheduleSetup from "@/components/portal/ScheduleSetup";

export const dynamic = "force-dynamic";

export default async function ScheduleSetupPage() {
  if (!(await getAdminSession())) redirect("/portal/dashboard");
  await connectDB();
  const cfg = await loadConfig();
  const users = await User.find({ active: { $ne: false } }).sort({ name: 1 }).select("name email").lean();
  const teachers = users.map((u) => ({ id: String(u._id), name: u.name || u.email }));

  return (
    <>
      <div className="pt-head">
        <h1>Schedule setup</h1>
        <p>Set the start date, the rotation and which teacher is responsible for each class and subject.</p>
      </div>
      <ScheduleSetup initial={cfg} teachers={teachers} />
    </>
  );
}
