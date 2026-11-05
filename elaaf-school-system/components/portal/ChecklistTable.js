"use client";
import { useState } from "react";

const FIELDS = [
  ["lessonPlan", "Lesson plan"],
  ["homeworkDiary", "Homework diary"],
  ["notebooksCorrected", "Notebooks corrected"],
];

export default function ChecklistTable({ month, rows }) {
  const [vals, setVals] = useState(Object.fromEntries(rows.map((r) => [r.teacherId, { lessonPlan: r.lessonPlan, homeworkDiary: r.homeworkDiary, notebooksCorrected: r.notebooksCorrected }])));
  const [state, setState] = useState({});

  const change = (id, k, v) => setVals({ ...vals, [id]: { ...vals[id], [k]: v } });

  async function save(id) {
    setState({ ...state, [id]: "saving" });
    const res = await fetch("/api/diary/checklist", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teacherId: id, month, ...vals[id] }),
    });
    setState({ ...state, [id]: res.ok ? "saved" : "error" });
  }

  return (
    <div className="pt-table-wrap">
      <table className="pt-table">
        <thead>
          <tr><th>Teacher</th>{FIELDS.map(([, label]) => <th key={label}>{label}</th>)}<th></th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.teacherId}>
              <td><strong>{r.name}</strong></td>
              {FIELDS.map(([k, label]) => (
                <td key={k}>
                  <select value={vals[r.teacherId][k]} onChange={(e) => change(r.teacherId, k, e.target.value)} aria-label={`${label} for ${r.name}`}>
                    <option value="">Not checked</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </td>
              ))}
              <td>
                <button type="button" className="pt-btn" disabled={state[r.teacherId] === "saving"} onClick={() => save(r.teacherId)}>Save</button>{" "}
                {state[r.teacherId] === "saved" && <span className="pt-ok" style={{ margin: 0 }}>Saved</span>}
                {state[r.teacherId] === "error" && <span className="pt-error" style={{ margin: 0 }}>Failed</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
