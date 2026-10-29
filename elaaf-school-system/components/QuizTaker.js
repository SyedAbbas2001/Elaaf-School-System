"use client";
import { useEffect, useRef, useState } from "react";
import "@/app/portal/portal.css";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export default function QuizTaker({ code, quiz }) {
  const [step, setStep] = useState("info"); // info | quiz | done
  const [info, setInfo] = useState({ studentName: "", rollNo: "", className: quiz.className });
  const [answers, setAnswers] = useState(Array(quiz.questions.length).fill(null));
  const [left, setLeft] = useState(quiz.timeLimitMin * 60);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submitted = useRef(false);
  const latest = useRef();

  async function submit() {
    if (submitted.current) return;
    submitted.current = true;
    setBusy(true);
    const res = await fetch("/api/quiz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, ...info, answers }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      submitted.current = false;
      setError(data.error || "Your answers could not be submitted. Please try again.");
      if (res.status === 409) setStep("info");
      return;
    }
    setResult(data);
    setStep("done");
    window.scrollTo({ top: 0 });
  }
  latest.current = submit;

  useEffect(() => {
    if (step !== "quiz" || !quiz.timeLimitMin) return;
    const t = setInterval(() => setLeft((l) => l - 1), 1000);
    return () => clearInterval(t);
  }, [step, quiz.timeLimitMin]);

  useEffect(() => {
    if (step === "quiz" && quiz.timeLimitMin && left <= 0) latest.current();
  }, [left, step, quiz.timeLimitMin]);

  function start(e) {
    e.preventDefault();
    if (!info.studentName.trim() || !info.rollNo.trim()) return setError("Enter your name and roll number.");
    setError("");
    setStep("quiz");
  }

  const answered = answers.filter((a) => a !== null).length;
  const total = quiz.questions.length;
  const mm = String(Math.max(0, Math.floor(left / 60))).padStart(2, "0");
  const ss = String(Math.max(0, left % 60)).padStart(2, "0");
  const percent = result && result.total ? Math.round((result.score / result.total) * 100) : 0;

  return (
    <div className="pt-quiz">
      <header className="pt-hero">
        <div className="pt-wrap">
          <p className="pt-school">Elaaf School</p>
          <h1>{quiz.title}</h1>
          <span className="pt-chip">{quiz.className}</span>
          <span className="pt-chip">{quiz.subject}</span>
          <span className="pt-chip">{total} questions</span>
          {quiz.timeLimitMin > 0 && <span className="pt-chip">{quiz.timeLimitMin} minutes</span>}
        </div>
      </header>

      <div className="pt-sheet">
        {step === "info" && (
          <form className="pt-card" onSubmit={start}>
            <h2 style={{ marginBottom: 14 }}>Your details</h2>
            <div className="pt-field">
              <label htmlFor="n">Full name</label>
              <input id="n" value={info.studentName} onChange={(e) => setInfo({ ...info, studentName: e.target.value })} autoComplete="name" required />
            </div>
            <div className="pt-field">
              <label htmlFor="r">Roll number</label>
              <input id="r" value={info.rollNo} onChange={(e) => setInfo({ ...info, rollNo: e.target.value })} required />
            </div>
            {error && <p className="pt-error" role="alert">{error}</p>}
            <button className="pt-btn">Start quiz</button>
          </form>
        )}

        {step === "quiz" && (
          <>
            <div className="pt-bar">
              <span className="pt-count">{answered} of {total} answered</span>
              <div className="pt-track" aria-hidden="true"><div className="pt-fill" style={{ width: `${(answered / total) * 100}%` }} /></div>
              {quiz.timeLimitMin > 0 && <span className={`pt-timer ${left <= 60 ? "low" : ""}`} role="timer">{mm}:{ss}</span>}
            </div>

            {quiz.questions.map((q, i) => (
              <fieldset className="pt-card" key={i} style={{ margin: "0 0 14px" }}>
                <legend className="pt-qtext" style={{ padding: 0 }}>
                  <span>{i + 1}.</span>
                  <span>{q.text}</span>
                </legend>
                {q.options.map((o, k) => (
                  <label className="pt-choice" key={k}>
                    <input type="radio" name={`q${i}`} checked={answers[i] === k} onChange={() => setAnswers(answers.map((a, j) => (j === i ? k : a)))} />
                    <span><strong>{LETTERS[k]}.</strong> {o}</span>
                  </label>
                ))}
              </fieldset>
            ))}

            {error && <p className="pt-error" role="alert">{error}</p>}
            {answered < total && <p className="pt-hint" style={{ marginBottom: 10 }}>{total - answered} question(s) are still unanswered.</p>}
            <button className="pt-btn" disabled={busy} onClick={submit}>{busy ? "Submitting..." : "Submit answers"}</button>
          </>
        )}

        {step === "done" && result && (
          <div className="pt-card pt-done">
            <h2>Answers submitted, {info.studentName}</h2>
            <div className="pt-score">{result.score} / {result.total}</div>
            <p className="pt-muted">{percent}% correct. Your teacher can now see your result.</p>
          </div>
        )}
      </div>
    </div>
  );
}
