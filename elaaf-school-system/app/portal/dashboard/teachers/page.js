import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/adminOnly";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import TeacherForm from "@/components/portal/TeacherForm";
import TeacherActions from "@/components/portal/TeacherActions";
import { TZ } from "@/lib/dates";

export const dynamic = "force-dynamic";

export default async function TeachersPage() {
  const session = await getAdminSession();
  if (!session) redirect("/portal/dashboard");
  await connectDB();
  const users = await User.find().sort({ role: 1, name: 1 }).lean();

  return (
    <>
      <div className="pt-head">
        <h1>Teachers</h1>
        <p>Create accounts, reset passwords and deactivate accounts of teachers who have left.</p>
      </div>

      <TeacherForm />

      <div className="pt-table-wrap" style={{ marginTop: 20 }}>
        <table className="pt-table">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Created</th><th>Actions</th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={String(u._id)}>
                <td><strong>{u.name}</strong></td>
                <td>{u.email}</td>
                <td>{u.role === "admin" ? "Admin" : "Teacher"}</td>
                <td><span className={`pt-badge ${u.active === false ? "" : "live"}`}>{u.active === false ? "Deactivated" : "Active"}</span></td>
                <td>{new Date(u.createdAt).toLocaleDateString("en-GB", { timeZone: TZ })}</td>
                <td>
                  <TeacherActions user={{ id: String(u._id), name: u.name || u.email, active: u.active !== false, isSelf: String(u._id) === session.user.id }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
