import CountUp from "@/components/portal/CountUp";

const Empty = ({ text = "No activity in this period yet." }) => <p className="pt-muted pt-chart-empty">{text}</p>;

export function StatTile({ value, label, i = 0 }) {
  return (
    <div className="pt-stat pt-rise" style={{ "--i": i }}>
      <b><CountUp value={value} /></b>
      <span>{label}</span>
    </div>
  );
}

export function ChartCard({ title, hint, i = 0, children }) {
  return (
    <section className="pt-card pt-chart pt-rise" style={{ "--i": i }}>
      <h2 className="pt-card-title">{title}</h2>
      {hint && <p className="pt-hint">{hint}</p>}
      {children}
    </section>
  );
}

// data: [{ key, label, value, tip }]
export function BarChart({ data, label }) {
  if (data.every((d) => !d.value)) return <Empty />;
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="pt-vbars" role="img" aria-label={label}>
      {data.map((d, i) => (
        <div className="pt-vcol" key={d.key} title={d.tip}>
          <span className="pt-vval">{d.value || ""}</span>
          <div className="pt-vtrack">
            <div className="pt-vbar" style={{ height: `${(d.value / max) * 100}%`, minHeight: d.value ? 4 : 0, "--i": i }} />
          </div>
          <span className="pt-vlab">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// rows: [{ key, label, value, text, tip }]
export function HBars({ rows, max, tone = "green", empty }) {
  if (!rows.length) return <Empty text={empty || "No data yet."} />;
  const top = max ?? Math.max(1, ...rows.map((r) => r.value));
  return (
    <ul className={`pt-hbars ${tone}`}>
      {rows.map((r, i) => (
        <li key={r.key || r.label} title={r.tip}>
          <span className="pt-hlab">{r.label}</span>
          <div className="pt-htrack"><div className="pt-hfill" style={{ width: `${Math.min(100, (r.value / top) * 100)}%`, "--i": i }} /></div>
          <span className="pt-hval">{r.text ?? r.value}</span>
        </li>
      ))}
    </ul>
  );
}

export function LineChart({ data, label }) {
  const vals = data.map((d) => d.value);
  if (vals.every((v) => !v)) return <Empty />;
  const W = 600;
  const H = 170;
  const max = Math.max(1, ...vals);
  const step = W / (data.length - 1);
  const pts = vals.map((v, i) => [i * step, H - 8 - (v / max) * (H - 20)]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${W} ${H} L0 ${H} Z`;
  return (
    <div className="pt-line" role="img" aria-label={label}>
      <div className="pt-line-max">Peak: {max}</div>
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        {[0.25, 0.5, 0.75].map((f) => <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} className="pt-grid" />)}
        <path d={area} className="pt-area" />
        <path d={line} className="pt-stroke" pathLength="1" />
        {data.map((d, i) => (
          <rect key={d.key} x={Math.max(0, i * step - step / 2)} y="0" width={step} height={H} fill="transparent"><title>{d.tip}</title></rect>
        ))}
      </svg>
      <div className="pt-line-x">
        <span>{data[0].full}</span>
        <span>{data[Math.floor(data.length / 2)].full}</span>
        <span>{data[data.length - 1].full}</span>
      </div>
    </div>
  );
}

export function Donut({ value, total, label }) {
  const pct = total ? Math.round((value / total) * 100) : 0;
  const r = 48;
  const C = 2 * Math.PI * r;
  const dash = (pct / 100) * C;
  return (
    <div className="pt-donut" role="img" aria-label={`${label}: ${value} of ${total}`}>
      <svg viewBox="0 0 120 120" width="140" height="140" aria-hidden="true">
        <circle cx="60" cy="60" r={r} className="pt-d-track" />
        <circle cx="60" cy="60" r={r} className="pt-d-val" transform="rotate(-90 60 60)" style={{ "--c": C.toFixed(2), "--d": dash.toFixed(2) }} />
      </svg>
      <div className="pt-d-center"><b>{pct}%</b><span>{value} of {total}</span></div>
    </div>
  );
}

// days: [{ key, label, on, tip }]
export function DayStrip({ days, label }) {
  return (
    <div className="pt-strip" role="img" aria-label={label}>
      {days.map((d, i) => (
        <div key={d.key} className={`pt-cell ${d.on ? "on" : ""}`} style={{ "--i": i }} title={d.tip}>{d.label}</div>
      ))}
    </div>
  );
}
