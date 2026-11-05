"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DiaryEntryForm from "@/components/portal/DiaryEntryForm";

const PREV = { yes: "Yes", no: "No", na: "Not applicable" };

function EntryCard({ entry, minDate, maxDate }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);

  async function remove() {
    if (!confirm("Delete this diary entry?")) return;
    const res = await fetch(`/api/diary/${entry.id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  }

  if (editing) {
    return (
      <div className="pt-entry">
        <DiaryEntryForm entry={entry} minDate={minDate} maxDate={maxDate} onDone={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <div className="pt-entry">
      <div className="pt-entry-top">
        <span className="pt-tag crimson">{entry.className}</span>
        <span className="pt-tag">{entry.subject}</span>
        <span className="grow" />
        {entry.reviewed && <span className="pt-badge live">Reviewed</span>}
        {entry.editable ? (
          <>
            <button type="button" className="pt-btn alt" onClick={() => setEditing(true)}>Edit</button>
            <button type="button" className="pt-btn danger" onClick={remove}>Delete</button>
          </>
        ) : (
          <span className="pt-hint">Locked</span>
        )}
      </div>
      <dl>
        <dt>Topic or chapter taught</dt>
        <dd>{entry.topic}</dd>
        <dt>Homework given</dt>
        <dd>{entry.homework || "None"}</dd>
        <dt>Previous homework checked</dt>
        <dd>{PREV[entry.prevHwChecked]}</dd>
      </dl>
      {entry.adminRemark && <div className="pt-remark"><strong>Admin remark:</strong> {entry.adminRemark}</div>}
    </div>
  );
}

export default function DiaryEntries({ groups, minDate, maxDate }) {
  if (groups.length === 0) {
    return <div className="pt-card pt-empty"><p className="pt-muted">No diary entries in the last 30 days.</p></div>;
  }
  return groups.map((g) => (
    <section key={g.date}>
      <h3 className="pt-day">{g.label}</h3>
      {g.entries.map((e) => <EntryCard key={e.id} entry={e} minDate={minDate} maxDate={maxDate} />)}
    </section>
  ));
}
