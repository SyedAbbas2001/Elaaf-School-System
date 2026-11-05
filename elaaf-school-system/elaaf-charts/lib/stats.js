import { addDays, TZ } from "@/lib/dates";

// last n days as YYYY-MM-DD, oldest first
export const lastDays = (today, n = 14) => Array.from({ length: n }, (_, i) => addDays(today, -(n - 1 - i)));
export const dayNum = (ymd) => String(Number(ymd.slice(8)));
export const fmtShort = (ymd) => new Date(ymd + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });

// MongoDB aggregation pieces
export const dayExpr = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt", timezone: TZ } };
export const pctExpr = { $cond: [{ $gt: ["$total", 0] }, { $multiply: [{ $divide: ["$score", "$total"] }, 100] }, 0] };
