import { format, formatDistanceToNow, isToday, isYesterday, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";
import { pl } from "date-fns/locale";

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  if (isToday(d)) return "Dziś";
  if (isYesterday(d)) return "Wczoraj";
  return format(d, "d MMM yyyy", { locale: pl });
}

export function formatRelative(date: Date | string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: pl });
}

export function formatTime(date: Date | string): string {
  return format(new Date(date), "HH:mm");
}

export { isToday, isSameDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval };
