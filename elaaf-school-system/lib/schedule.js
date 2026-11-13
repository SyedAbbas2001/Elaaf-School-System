import ScheduleConfig from "@/lib/models/ScheduleConfig";
import { DEFAULT_GRID, normGrid } from "@/lib/scheduleCore";

// Loads the saved setup, or sensible defaults when nothing has been saved yet
export async function loadConfig() {
  const c = await ScheduleConfig.findOne({ key: "main" }).lean();
  return {
    startDate: c?.startDate || "",
    skipSundays: c ? c.skipSundays !== false : true,
    holidays: c?.holidays || [],
    skips: (c?.skips || []).map((x) => ({ date: x.date, className: x.className, note: x.note || "" })),
    grid: c?.grid?.length ? normGrid(c.grid) : DEFAULT_GRID,
    assignments: (c?.assignments || []).map((a) => ({ className: a.className, subject: a.subject, teacher: String(a.teacher) })),
  };
}
