import { addDays, fmtDate, isYmd } from "@/lib/dates";

export const DAYS = 6;

// Rotation from the school's quiz schedule (names match the portal's class and subject lists)
export const DEFAULT_GRID = [
  { className: "Class 5", subjects: [["English"], ["Urdu"], ["Math"], ["Science"], ["Social Studies"], ["Islamiyat"]] },
  { className: "Class 6", subjects: [["Urdu"], ["Math"], ["Science"], ["Social Studies"], ["Islamiyat"], ["English"]] },
  { className: "Class 7", subjects: [["Math"], ["Science"], ["Social Studies"], ["Islamiyat"], ["English"], ["Urdu"]] },
  { className: "Class 8", subjects: [["Science"], ["Social Studies"], ["Islamiyat"], ["English"], ["Urdu"], ["Math"]] },
  { className: "Class 9", subjects: [["Social Studies"], ["Islamiyat"], ["English"], ["Urdu"], ["Math"], ["Science"]] },
  { className: "Class 10", subjects: [["Islamiyat"], ["English"], ["Urdu"], ["Math"], ["Science"], ["Social Studies"]] },
];

// Older saved setups had one subject (a string) per day. This turns them into lists.
export const normGrid = (grid) =>
  grid.map((r) => ({
    className: r.className,
    subjects: r.subjects.map((d) => (Array.isArray(d) ? [...d] : [d])),
  }));

const isSunday = (ymd) => new Date(ymd + "T00:00:00Z").getUTCDay() === 0;

export function isSchoolDay(ymd, cfg) {
  if (cfg.skipSundays && isSunday(ymd)) return false;
  return !cfg.holidays.includes(ymd);
}

// Day number (1 to 6) of the rotation for a date, or null (before the start, Sunday or holiday)
export function dayFor(ymd, cfg) {
  if (!cfg.startDate || !isYmd(ymd) || ymd < cfg.startDate || !isSchoolDay(ymd, cfg)) return null;
  let n = 0;
  for (let d = cfg.startDate; d < ymd; d = addDays(d, 1)) if (isSchoolDay(d, cfg)) n++;
  return (n % DAYS) + 1;
}

export function nextSchoolDays(cfg, from, count) {
  const out = [];
  let d = from;
  for (let i = 0; i < 400 && out.length < count; i++) {
    if (dayFor(d, cfg)) out.push(d);
    d = addDays(d, 1);
  }
  return out;
}

export function recentSchoolDays(cfg, before, count) {
  const out = [];
  let d = addDays(before, -1);
  for (let i = 0; i < 60 && out.length < count; i++) {
    if (dayFor(d, cfg)) out.unshift(d);
    d = addDays(d, -1);
  }
  return out;
}

export const teacherFor = (cfg, className, subject) =>
  cfg.assignments.find((a) => a.className === className && a.subject === subject)?.teacher || "";

// "No quiz" can be chosen in the rotation table instead of a subject: that class has no quiz on that day
export const NO_QUIZ = "No quiz";

// why a class has no quiz on a date (a "No quiz" day in the rotation, or an older date-based entry), otherwise undefined
export function skipFor(cfg, date, className) {
  const manual = (cfg.skips || []).find((x) => x.date === date && x.className === className);
  if (manual) return manual;
  const day = dayFor(date, cfg);
  const row = cfg.grid.find((r) => r.className === className);
  if (day && row && row.subjects[day - 1].includes(NO_QUIZ)) return { date, className, note: "" };
  return undefined;
}
export const isSkipped = (cfg, date, className) => Boolean(skipFor(cfg, date, className));
export const skippedOn = (cfg, date) => cfg.grid.map((r) => skipFor(cfg, date, r.className)).filter(Boolean);

// every class with its subject(s) and teacher for one date (classes with no quiz that day are left out)
export function slotsFor(cfg, date) {
  const day = dayFor(date, cfg);
  if (!day) return [];
  return cfg.grid
    .filter((r) => !isSkipped(cfg, date, r.className))
    .flatMap((r) =>
      r.subjects[day - 1].map((subject) => ({ date, day, className: r.className, subject, teacherId: teacherFor(cfg, r.className, subject) }))
    );
}

export const slotKey = (d, c, s) => `${d}|${c}|${s}`;

// quizzes made for the schedule, keyed by date|class|subject (a published one wins)
export function quizMap(quizzes) {
  const m = {};
  for (const q of quizzes) {
    const k = slotKey(q.scheduledFor, q.className, q.subject);
    if (!m[k] || (q.status === "published" && m[k].status !== "published")) m[k] = q;
  }
  return m;
}

export function statusOf(quiz, date, today) {
  if (quiz) {
    if (quiz.status === "published") return { key: "published", label: "Published" };
    return date < today ? { key: "late", label: "Draft, overdue" } : { key: "draft", label: "Draft" };
  }
  if (date < today) return { key: "late", label: "Overdue" };
  if (date === today) return { key: "todo", label: "Not created" };
  return { key: "upcoming", label: "Upcoming" };
}

export const badgeClass = (key) => ({ published: "live", late: "late", upcoming: "muted" }[key] || "");

export function relDay(date, today) {
  if (date === today) return "Today";
  if (date === addDays(today, 1)) return "Tomorrow";
  if (date === addDays(today, -1)) return "Yesterday";
  return fmtDate(date);
}

export const newQuizHref = (s) =>
  `/portal/dashboard/quizzes/new?${new URLSearchParams({ className: s.className, subject: s.subject, date: s.date })}`;

export const subClass = (subject) => "pt-sub-" + String(subject).replace(/\s+/g, "");

// Subjects without a fixed colour in schedule.css get a pleasant pastel from their name
const KNOWN = ["English", "Urdu", "Math", "Science", "Social Studies", "Islamiyat", "Physics", "Chemistry", "Biology", "Computer"];
export function subStyle(subject) {
  if (KNOWN.includes(subject)) return undefined;
  let h = 0;
  for (const ch of String(subject)) h = (h * 31 + ch.charCodeAt(0)) % 360;
  return { background: `hsl(${h} 60% 90%)`, color: "#1e293b" };
}