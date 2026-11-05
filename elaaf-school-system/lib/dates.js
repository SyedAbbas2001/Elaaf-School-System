// Diary dates are stored as plain "YYYY-MM-DD" strings in Pakistan time
export const TZ = "Asia/Karachi";
export const DIARY_EDIT_DAYS = 2; // teachers can add/edit entries for today and this many days back

export const todayPK = () => new Date().toLocaleDateString("en-CA", { timeZone: TZ });

export function addDays(ymd, n) {
  const d = new Date(ymd + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export const isYmd = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s || "") && !isNaN(new Date(s + "T00:00:00Z"));

export const fmtDate = (ymd) =>
  new Date(ymd + "T00:00:00Z").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export const canEditDate = (ymd) => ymd >= addDays(todayPK(), -DIARY_EDIT_DAYS) && ymd <= todayPK();
