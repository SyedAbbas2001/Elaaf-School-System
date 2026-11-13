"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CLASSES, SUBJECTS } from "@/lib/constants";
import { fmtDate } from "@/lib/dates";

export default function NewQuizForm({ initial }) {
  const router = useRouter();
  const [f, setF] = useState({
    title: initial.title,
    className: initial.className,
    subject: initial.subject,
    timeLimitMin: initial.timeLimitMin,
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/quizzes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...f, scheduledFor: initial.scheduledFor }),
    });
    const data = await res.json();
    if (!res.ok) {
      setBusy(false);
      return setError(data.error || "Could not create the quiz.");
    }
    router.push(`/portal/dashboard/quizzes/${data.id}`);
  }

  return (
    <form className="pt-card pt-form" onSubmit={onSubmit}>
      {initial.scheduledFor && (
        <p className="pt-notice">
          This quiz is part of the quiz schedule for {fmtDate(initial.scheduledFor)}. Guidelines: 10 to 15 MCQs, 10 to 15 minutes.
        </p>
      )}
      <div className="pt-field">
        <label htmlFor="title">Quiz title</label>
        <input id="title" value={f.title} onChange={set("title")} placeholder={initial.scheduledFor ? `Example: ${f.className} ${f.subject} Chapter 3 Quiz` : "Example: Chapter 3 test"} required />
      </div>
      <div className="pt-field">
        <label htmlFor="cls">Class</label>
        <select id="cls" value={f.className} onChange={set("className")}>{CLASSES.map((c) => <option key={c}>{c}</option>)}</select>
      </div>
      <div className="pt-field">
        <label htmlFor="sub">Subject</label>
        <select id="sub" value={f.subject} onChange={set("subject")}>{SUBJECTS.map((s) => <option key={s}>{s}</option>)}</select>
      </div>
      <div className="pt-field">
        <label htmlFor="time">Time limit (minutes)</label>
        <input id="time" type="number" min="0" value={f.timeLimitMin} onChange={set("timeLimitMin")} />
        <span className="pt-hint">Leave empty for no time limit.</span>
      </div>
      {error && <p className="pt-error" role="alert">{error}</p>}
      <button className="pt-btn" disabled={busy}>{busy ? "Creating..." : "Create quiz"}</button>
    </form>
  );
}
