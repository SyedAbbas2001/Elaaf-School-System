"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SUBJECTS } from "@/lib/constants";
import { fmtDate } from "@/lib/dates";
import { NO_QUIZ } from "@/lib/scheduleCore";

const MAX_PER_DAY = 4;

export default function ScheduleSetup({ initial, teachers }) {
  const router = useRouter();
  const [startDate, setStartDate] = useState(initial.startDate);
  const [skipSundays, setSkipSundays] = useState(initial.skipSundays);
  const [holidays, setHolidays] = useState(initial.holidays);
  const [newHoliday, setNewHoliday] = useState("");
  const [grid, setGrid] = useState(initial.grid);
  const [assign, setAssign] = useState(Object.fromEntries(initial.assignments.map((a) => [`${a.className}|${a.subject}`, a.teacher])));
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [busy, setBusy] = useState(false);

  const inClass = (r, s) => r.subjects.some((d) => d.includes(s));
  const subjectsUsed = SUBJECTS.filter((s) => grid.some((r) => inClass(r, s)));

  // change the list of subjects of one class on one day
  const updateDay = (ri, di, fn) =>
    setGrid(grid.map((r, i) => (i === ri ? { ...r, subjects: r.subjects.map((d, j) => (j === di ? fn(d) : d)) } : r)));
  const setSubject = (ri, di, si, value) =>
    updateDay(ri, di, (d) => (value === NO_QUIZ ? [NO_QUIZ] : d.map((x, k) => (k === si ? value : x))));
  const removeSubject = (ri, di, si) => updateDay(ri, di, (d) => d.filter((_, k) => k !== si));
  const addSubject = (ri, di) =>
    updateDay(ri, di, (d) => {
      const next = SUBJECTS.find((x) => !d.includes(x));
      return next ? [...d, next] : d;
    });

  function addHoliday() {
    if (newHoliday && !holidays.includes(newHoliday)) setHolidays([...holidays, newHoliday].sort());
    setNewHoliday("");
  }

  async function save() {
    setBusy(true);
    setMsg({ type: "", text: "" });
    try {
      const assignments = [];
      for (const r of grid) {
        for (const s of new Set(r.subjects.flat())) {
          const t = assign[`${r.className}|${s}`];
          if (t) assignments.push({ className: r.className, subject: s, teacher: t });
        }
      }
      const res = await fetch("/api/schedule", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startDate, skipSundays, holidays, grid, assignments }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return setMsg({ type: "error", text: data.error || `Could not save (server error ${res.status}). Check the terminal for details.` });
      }
      setMsg({ type: "ok", text: "Schedule saved." });
      router.refresh();
    } catch {
      setMsg({ type: "error", text: "Could not reach the server. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div className="pt-card">
        <h2 className="pt-card-title">Dates</h2>
        <div className="pt-field" style={{ maxWidth: 360 }}>
          <label htmlFor="start">Date of Day 1</label>
          <input id="start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <span className="pt-hint">The first school day of the rotation. Day numbers repeat from 1 to 6.</span>
        </div>
        <label className="pt-check">
          <input type="checkbox" checked={skipSundays} onChange={(e) => setSkipSundays(e.target.checked)} />
          Sundays are not school days
        </label>

        <div className="pt-field" style={{ marginTop: 16 }}>
          <label htmlFor="holiday">Holidays</label>
          <div className="pt-row">
            <input id="holiday" type="date" value={newHoliday} onChange={(e) => setNewHoliday(e.target.value)} style={{ width: "auto" }} />
            <button type="button" className="pt-btn alt" onClick={addHoliday}>Add holiday</button>
          </div>
          <span className="pt-hint">The rotation does not move forward on holidays.</span>
          <div className="pt-holidays">
            {holidays.map((h) => (
              <span className="pt-holiday" key={h}>
                {fmtDate(h)}
                <button type="button" aria-label={`Remove holiday ${h}`} onClick={() => setHolidays(holidays.filter((x) => x !== h))}>&times;</button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-card">
        <h2 className="pt-card-title">Rotation</h2>
        <p className="pt-hint" style={{ marginBottom: 10 }}>
          The subjects each class has a quiz in, on each day of the 6-day cycle. Use Add subject when a class has more than one quiz on the same day, or choose No quiz when it has none.
        </p>
        <div className="pt-table-wrap">
          <table className="pt-table pt-setup">
            <thead><tr><th>Class</th>{[1, 2, 3, 4, 5, 6].map((d) => <th key={d}>Day {d}</th>)}</tr></thead>
            <tbody>
              {grid.map((r, ri) => (
                <tr key={r.className}>
                  <td><strong>{r.className}</strong></td>
                  {r.subjects.map((list, di) => (
                    <td key={di}>
                      {list.map((s, si) => (
                        <div className="pt-cellrow" key={si}>
                          <select value={s} onChange={(e) => setSubject(ri, di, si, e.target.value)} aria-label={`${r.className} day ${di + 1} subject ${si + 1}`}>
                            {SUBJECTS.map((x) => <option key={x}>{x}</option>)}
                            <option>{NO_QUIZ}</option>
                          </select>
                          {list.length > 1 && (
                            <button type="button" className="pt-x" aria-label={`Remove ${s} from ${r.className} day ${di + 1}`} onClick={() => removeSubject(ri, di, si)}>&times;</button>
                          )}
                        </div>
                      ))}
                      {list.length < MAX_PER_DAY && !list.includes(NO_QUIZ) && (
                        <button type="button" className="pt-addsub" onClick={() => addSubject(ri, di)}>+ Add subject</button>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pt-card">
        <h2 className="pt-card-title">Who prepares each quiz</h2>
        <p className="pt-hint" style={{ marginBottom: 10 }}>Choose the subject teacher of each class. They will see that quiz in their schedule.</p>
        <div className="pt-table-wrap">
          <table className="pt-table pt-setup">
            <thead><tr><th>Class</th>{subjectsUsed.map((s) => <th key={s}>{s}</th>)}</tr></thead>
            <tbody>
              {grid.map((r) => (
                <tr key={r.className}>
                  <td><strong>{r.className}</strong></td>
                  {subjectsUsed.map((s) => {
                    const key = `${r.className}|${s}`;
                    return (
                      <td key={s}>
                        {inClass(r, s) ? (
                          <select value={assign[key] || ""} onChange={(e) => setAssign({ ...assign, [key]: e.target.value })} aria-label={`Teacher for ${r.className} ${s}`}>
                            <option value="">Unassigned</option>
                            {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                          </select>
                        ) : (
                          ""
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {msg.text && <p className={msg.type === "error" ? "pt-error" : "pt-ok"} role="status">{msg.text}</p>}
      <button type="button" className="pt-btn" disabled={busy} onClick={save}>{busy ? "Saving..." : "Save schedule"}</button>
    </>
  );
}