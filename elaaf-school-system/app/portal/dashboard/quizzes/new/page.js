"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CLASSES, SUBJECTS } from "@/lib/constants";

export default function NewQuizPage() {
  const router = useRouter();
  const [f, setF] = useState({ title: "", className: CLASSES[0], subject: SUBJECTS[0], timeLimitMin: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/quizzes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
    const data = await res.json();
    if (!res.ok) {
      setBusy(false);
      return setError(data.error || "Could not create the quiz.");
    }
    router.push(`/portal/dashboard/quizzes/${data.id}`);
  }

  return (
    <>
      <div className="pt-head">
        <h1>Create quiz</h1>
        <p>Choose the class and subject, then add questions on the next screen.</p>
      </div>
      <form className="pt-card pt-form" onSubmit={onSubmit}>
        <div className="pt-field">
          <label htmlFor="title">Quiz title</label>
          <input id="title" value={f.title} onChange={set("title")} placeholder="Example: Chapter 3 test" required />
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
    </>
  );
}
