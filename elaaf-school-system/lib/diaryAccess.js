import { CLASSES, SUBJECTS } from "@/lib/constants";
import { isYmd, todayPK, addDays, DIARY_EDIT_DAYS } from "@/lib/dates";

export function cleanEntry(b) {
  const data = {
    date: String(b.date || ""),
    className: String(b.className || ""),
    subject: String(b.subject || ""),
    topic: String(b.topic || "").trim().slice(0, 500),
    homework: String(b.homework || "").trim().slice(0, 1000),
    prevHwChecked: ["yes", "no", "na"].includes(b.prevHwChecked) ? b.prevHwChecked : "na",
  };
  if (!isYmd(data.date)) return { error: "Choose a valid date" };
  if (!CLASSES.includes(data.className) || !SUBJECTS.includes(data.subject)) return { error: "Choose a class and subject" };
  if (!data.topic) return { error: "Enter the topic or chapter taught" };
  return { data };
}

export function dateError(date, role) {
  const today = todayPK();
  if (date > today) return "You cannot add an entry for a future date";
  if (role !== "admin" && date < addDays(today, -DIARY_EDIT_DAYS)) {
    return `Teachers can only add or edit entries from the last ${DIARY_EDIT_DAYS} days`;
  }
  return null;
}
