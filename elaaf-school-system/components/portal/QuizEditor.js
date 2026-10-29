"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const blank = () => ({ text: "", options: ["", "", "", ""], correctIndex: 0, marks: 1 });
const LETTERS = ["A", "B", "C", "D"];

export default function QuizEditor({ quiz }) {
  const router = useRouter();
  const [qs, setQs] = useState(quiz.questions.length ? quiz.questions : [blank()]);
  const [status, setStatus] = useState(quiz.status);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [busy, setBusy] = useState(false);
  const [origin, setOrigin] = useState("");
  useEffect(() => setOrigin(window.location.origin), []);

  const upd = (i, patch) => setQs(qs.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const updOpt = (i, k, v) => upd(i, { options: qs[i].options.map((o, j) => (j === k ? v : o)) });
  const link = `${origin}/quiz/${quiz.code}`;

  async function save(nextStatus = status) {
    setBusy(true);
    setMsg({ type: "", text: "" });
    const res = await fetch(`/api/quizzes/${quiz.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questions: qs, status: nextStatus }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) return setMsg({ type: "error", text: data.error || "Could not save the quiz." });
    setStatus(nextStatus);
    setMsg({
      type: "ok",
      text: nextStatus === status ? "Changes saved." : nextStatus === "published" ? "Quiz published. Share the student link with your class." : "Quiz moved back to draft.",
    });
  }

  async function remove() {
    if (!confirm("Delete this quiz and all of its results? This cannot be undone.")) return;
    const res = await fetch(`/api/quizzes/${quiz.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/portal/dashboard");
      router.refresh();
    }
  }

  async function copyLink() {
    await navigator.clipboard.writeText(link);
    setMsg({ type: "ok", text: "Link copied." });
  }

  return (
    <>
      <div className="pt-head">
        <h1>{quiz.title}</h1>
        <p>
          {quiz.className}, {quiz.subject}
          {quiz.timeLimitMin ? `, ${quiz.timeLimitMin} minutes` : ""}{" "}
          <span className={`pt-badge ${status === "published" ? "live" : ""}`}>{status === "published" ? "Published" : "Draft"}</span>
        </p>
      </div>

      {status === "published" && (
        <div className="pt-share">
          <div>
            <strong>Student link</strong>
            <div className="pt-hint">Code: {quiz.code}</div>
          </div>
          <code>{link}</code>
          <button type="button" className="pt-btn alt" onClick={copyLink}>Copy link</button>
        </div>
      )}

      {qs.map((q, i) => (
        <div className="pt-q" key={i}>
          <div className="pt-q-head">
            <span className="pt-qnum">{i + 1}</span>
            <span className="grow">Question {i + 1}</span>
            <label className="pt-marks">
              Marks
              <input type="number" min="1" value={q.marks} onChange={(e) => upd(i, { marks: e.target.value })} />
            </label>
            {qs.length > 1 && (
              <button type="button" className="pt-btn danger" onClick={() => setQs(qs.filter((_, j) => j !== i))}>Remove</button>
            )}
          </div>
          <div className="pt-field">
            <input value={q.text} onChange={(e) => upd(i, { text: e.target.value })} placeholder="Type the question" aria-label={`Question ${i + 1} text`} />
          </div>
          {q.options.map((o, k) => (
            <div className={`pt-opt ${q.correctIndex === k ? "correct" : ""}`} key={k}>
              <input type="radio" name={`correct-${i}`} checked={q.correctIndex === k} onChange={() => upd(i, { correctIndex: k })} aria-label={`Mark option ${LETTERS[k]} as correct`} />
              <span className="pt-letter">{LETTERS[k]}</span>
              <input type="text" value={o} onChange={(e) => updOpt(i, k, e.target.value)} placeholder={`Option ${LETTERS[k]}`} aria-label={`Option ${LETTERS[k]} for question ${i + 1}`} />
            </div>
          ))}
          <span className="pt-hint">Select the button next to the correct answer.</span>
        </div>
      ))}

      <div className="pt-row" style={{ margin: "18px 0 8px" }}>
        <button type="button" className="pt-btn alt" onClick={() => setQs([...qs, blank()])}>Add question</button>
        <button type="button" className="pt-btn" disabled={busy} onClick={() => save()}>Save changes</button>
        {status === "draft" ? (
          <button type="button" className="pt-btn" disabled={busy} onClick={() => save("published")}>Publish quiz</button>
        ) : (
          <button type="button" className="pt-btn alt" disabled={busy} onClick={() => save("draft")}>Move to draft</button>
        )}
        <Link className="pt-btn alt" href={`/portal/dashboard/quizzes/${quiz.id}/results`}>View results</Link>
        <button type="button" className="pt-btn danger" style={{ marginLeft: "auto" }} onClick={remove}>Delete quiz</button>
      </div>
      {msg.text && <p className={msg.type === "error" ? "pt-error" : "pt-ok"} role="status">{msg.text}</p>}
      {status === "published" && <p className="pt-hint">Editing questions does not change scores that students have already received.</p>}
    </>
  );
}
