"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CLASSES, SUBJECTS } from "@/lib/constants";

export default function DiaryEntryForm({ entry, minDate, maxDate, onDone }) {
  const router = useRouter();
  const editing = Boolean(entry);
  const [f, setF] = useState({
    date: entry?.date || maxDate,
    className: entry?.className || CLASSES[0],
    subject: entry?.subject || SUBJECTS[0],
    topic: entry?.topic || "",
    homework: entry?.homework || "",
    prevHwChecked: entry?.prevHwChecked || "na",
  });
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setMsg({ type: "", text: "" });
    const res = await fetch(editing ? `/api/diary/${entry.id}` : "/api/diary", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) return setMsg({ type: "error", text: data.error || "Could not save the entry." });
    router.refresh();
    if (editing) return onDone?.();
    // keep date, class and subject so several entries can be added quickly
    setF({ ...f, topic: "", homework: "", prevHwChecked: "na" });
    setMsg({ type: "ok", text: "Entry added." });
  }

  const id = (n) => `${editing ? entry.id : "new"}-${n}`;
  return (
    <form className={editing ? "" : "pt-card"} onSubmit={onSubmit}>
      <div className="pt-grid2">
        <div className="pt-field">
          <label htmlFor={id("date")}>Date</label>
          <input id={id("date")} type="date" value={f.date} min={minDate} max={maxDate} onChange={set("date")} required />
        </div>
        <div className="pt-field">
          <label htmlFor={id("cls")}>Class</label>
          <select id={id("cls")} value={f.className} onChange={set("className")}>{CLASSES.map((c) => <option key={c}>{c}</option>)}</select>
        </div>
        <div className="pt-field">
          <label htmlFor={id("sub")}>Subject</label>
          <select id={id("sub")} value={f.subject} onChange={set("subject")}>{SUBJECTS.map((s) => <option key={s}>{s}</option>)}</select>
        </div>
        <div className="pt-field">
          <label htmlFor={id("prev")}>Previous homework checked</label>
          <select id={id("prev")} value={f.prevHwChecked} onChange={set("prevHwChecked")}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="na">Not applicable</option>
          </select>
        </div>
      </div>
      <div className="pt-field">
        <label htmlFor={id("topic")}>Topic or chapter taught</label>
        <textarea id={id("topic")} value={f.topic} onChange={set("topic")} maxLength={500} required />
      </div>
      <div className="pt-field">
        <label htmlFor={id("hw")}>Homework given</label>
        <textarea id={id("hw")} value={f.homework} onChange={set("homework")} maxLength={1000} />
        <span className="pt-hint">Leave empty if no homework was given.</span>
      </div>
      {msg.text && <p className={msg.type === "error" ? "pt-error" : "pt-ok"} role="status">{msg.text}</p>}
      <div className="pt-row">
        <button className="pt-btn" disabled={busy}>{busy ? "Saving..." : editing ? "Save changes" : "Add entry"}</button>
        {editing && <button type="button" className="pt-btn alt" onClick={onDone}>Cancel</button>}
      </div>
    </form>
  );
}
