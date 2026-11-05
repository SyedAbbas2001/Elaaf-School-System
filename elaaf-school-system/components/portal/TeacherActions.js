"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TeacherActions({ user }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function update(body, okMessage) {
    setBusy(true);
    const res = await fetch(`/api/teachers/${user.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) return alert(data.error || "Something went wrong.");
    if (okMessage) alert(okMessage);
    router.refresh();
  }

  function resetPassword() {
    const pw = window.prompt(`New password for ${user.name} (at least 8 characters):`);
    if (pw) update({ password: pw }, "Password changed. Share it with the teacher privately.");
  }

  return (
    <div className="pt-row">
      <button type="button" className="pt-btn alt" disabled={busy} onClick={resetPassword}>Reset password</button>
      {!user.isSelf && (
        <button type="button" className={`pt-btn ${user.active ? "danger" : "alt"}`} disabled={busy} onClick={() => update({ active: !user.active })}>
          {user.active ? "Deactivate" : "Activate"}
        </button>
      )}
    </div>
  );
}
