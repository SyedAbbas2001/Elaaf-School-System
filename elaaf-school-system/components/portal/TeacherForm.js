"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TeacherForm() {
  const router = useRouter();
  const [f, setF] = useState({ name: "", email: "", password: "", role: "teacher" });
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setMsg({ type: "", text: "" });
    const res = await fetch("/api/teachers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) return setMsg({ type: "error", text: data.error || "Could not create the account." });
    setMsg({ type: "ok", text: `Account created for ${f.email}. Share the password with them privately.` });
    setF({ name: "", email: "", password: "", role: "teacher" });
    router.refresh();
  }

  return (
    <form className="pt-card" onSubmit={onSubmit}>
      <h2 style={{ fontSize: "1.15rem", marginBottom: 14 }}>Add an account</h2>
      <div className="pt-grid2">
        <div className="pt-field">
          <label htmlFor="t-name">Full name</label>
          <input id="t-name" value={f.name} onChange={set("name")} required />
        </div>
        <div className="pt-field">
          <label htmlFor="t-email">Email</label>
          <input id="t-email" type="email" value={f.email} onChange={set("email")} autoComplete="off" required />
        </div>
        <div className="pt-field">
          <label htmlFor="t-pass">Password</label>
          <input id="t-pass" type="text" value={f.password} onChange={set("password")} autoComplete="off" minLength={8} required />
          <span className="pt-hint">At least 8 characters.</span>
        </div>
        <div className="pt-field">
          <label htmlFor="t-role">Role</label>
          <select id="t-role" value={f.role} onChange={set("role")}>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
      {msg.text && <p className={msg.type === "error" ? "pt-error" : "pt-ok"} role="status">{msg.text}</p>}
      <button className="pt-btn" disabled={busy}>{busy ? "Creating..." : "Create account"}</button>
    </form>
  );
}
