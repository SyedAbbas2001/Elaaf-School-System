import { TZ } from "@/lib/dates";

export const fmtDateTime = (d) =>
  new Date(d).toLocaleString("en-GB", { timeZone: TZ, day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true });

// "5 minutes ago", "3 hours ago", "2 days ago"
export function ago(d) {
  const s = Math.max(0, Math.round((Date.now() - new Date(d).getTime()) / 1000));
  if (s < 60) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m} ${m === 1 ? "minute" : "minutes"} ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} ${h === 1 ? "hour" : "hours"} ago`;
  const days = Math.round(h / 24);
  return `${days} ${days === 1 ? "day" : "days"} ago`;
}
