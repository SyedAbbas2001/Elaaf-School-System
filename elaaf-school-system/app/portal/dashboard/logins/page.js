import { redirect } from "next/navigation";
import mongoose from "mongoose";
import { getAdminSession } from "@/lib/adminOnly";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import LoginLog from "@/lib/models/LoginLog";
import { param } from "@/lib/diaryQuery";
import { ago, fmtDateTime } from "@/lib/timeago";

export const dynamic = "force-dynamic";
const LIMIT = 10;

export default async function LoginActivityPage({ searchParams }) {
  if (!(await getAdminSession())) redirect("/portal/dashboard");
  const sp = await searchParams;
  const who = param(sp, "user");

  await connectDB();
  const users = await User.find().sort({ lastLoginAt: -1, name: 1 }).lean();
  const filter = mongoose.isValidObjectId(who) ? { user: who } : {};
  const found = await LoginLog.find(filter).sort({ createdAt: -1 }).limit(LIMIT + 1).lean();
  const truncated = found.length > LIMIT;
  const logs = found.slice(0, LIMIT);

  return (
    <>
      <div className="pt-head">
        <h1>Login activity</h1>
        <p>Who signed in and when.</p>
      </div>

      <h2 style={{ fontSize: "1.15rem", margin: "0 0 10px" }}>Last login of everyone</h2>
      <div className="pt-table-wrap">
        <table className="pt-table">
          <thead><tr><th>Name</th><th>Role</th><th>Last login</th><th>When</th><th>Account</th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={String(u._id)}>
                <td><strong>{u.name || u.email}</strong></td>
                <td>{u.role === "admin" ? "Admin" : "Teacher"}</td>
                <td>{u.lastLoginAt ? fmtDateTime(u.lastLoginAt) : <span className="pt-muted">Not recorded yet</span>}</td>
                <td>{u.lastLoginAt ? ago(u.lastLoginAt) : ""}</td>
                <td><span className={`pt-badge ${u.active === false ? "" : "live"}`}>{u.active === false ? "Deactivated" : "Active"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: "1.15rem", margin: "28px 0 10px" }}>All logins</h2>
      <form className="pt-filters" method="GET" style={{ alignItems: "end" }}>
        <div className="pt-field" style={{ margin: 0 }}>
          <label htmlFor="user">Person</label>
          <select id="user" name="user" defaultValue={who}>
            <option value="">Everyone</option>
            {users.map((u) => <option key={String(u._id)} value={String(u._id)}>{u.name || u.email}</option>)}
          </select>
        </div>
        <button className="pt-btn alt">Apply filter</button>
        <span className="pt-hint">{logs.length} {logs.length === 1 ? "login" : "logins"}{truncated ? `, showing the latest ${LIMIT}` : ""}. Records are kept for one year.</span>
      </form>

      {logs.length === 0 ? (
        <div className="pt-card pt-empty"><p className="pt-muted">No logins have been recorded yet. They appear here after the next sign in.</p></div>
      ) : (
        <div className="pt-table-wrap">
          <table className="pt-table">
            <thead><tr><th>Date and time</th><th>Name</th><th>Email</th><th>Role</th></tr></thead>
            <tbody>
              {logs.map((l) => (
                <tr key={String(l._id)}>
                  <td>{fmtDateTime(l.createdAt)}</td>
                  <td><strong>{l.name || "Unknown"}</strong></td>
                  <td>{l.email}</td>
                  <td>{l.role === "admin" ? "Admin" : "Teacher"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
