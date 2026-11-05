"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewCell({ entry }) {
  const router = useRouter();
  const [remark, setRemark] = useState(entry.adminRemark || "");
  const [busy, setBusy] = useState(false);

  async function save(reviewed) {
    setBusy(true);
    const res = await fetch(`/api/diary/${entry.id}/review`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ remark, reviewed }),
    });
    setBusy(false);
    if (res.ok) router.refresh();
  }

  return (
    <>
      <div className="pt-noprint">
        <span className={`pt-badge ${entry.reviewed ? "live" : ""}`}>{entry.reviewed ? "Reviewed" : "Pending"}</span>
        <input value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Remark (optional)" aria-label="Admin remark" maxLength={500} style={{ margin: "8px 0", minWidth: 180 }} />
        <div className="pt-row">
          <button type="button" className="pt-btn" disabled={busy} onClick={() => save(true)}>{entry.reviewed ? "Update" : "Mark reviewed"}</button>
          {entry.reviewed && <button type="button" className="pt-btn alt" disabled={busy} onClick={() => save(false)}>Undo review</button>}
        </div>
      </div>
      <div className="pt-printonly">{entry.reviewed ? "Reviewed" : ""}{entry.adminRemark ? `: ${entry.adminRemark}` : ""}</div>
    </>
  );
}
