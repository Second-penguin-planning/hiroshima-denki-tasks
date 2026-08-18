import type { AlertLevel } from "./types";

const WARNING_WINDOW_DAYS = 14;

/** 基準日に月数オフセット（負値=前、正値=後）を加算した日付を返す。 */
export function addMonths(base: Date, monthOffset: number): Date {
  const result = new Date(base);
  result.setMonth(result.getMonth() + monthOffset);
  return result;
}

export function formatDateJa(date: Date): string {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

export function formatDateShort(date: Date): string {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

export function parseDateInput(value: string): Date | null {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function toDateInputValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function daysBetween(from: Date, to: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / msPerDay);
}

/**
 * タスクの期限に対する現在のアラートレベルを判定する。
 * 完了済みタスクは常に none。
 */
export function getAlertLevel(
  deadline: Date | null,
  isDone: boolean,
  today: Date = new Date(),
): AlertLevel {
  if (isDone || !deadline) return "none";
  const remaining = daysBetween(today, deadline);
  if (remaining < 0) return "overdue";
  if (remaining <= WARNING_WINDOW_DAYS) return "warning";
  return "none";
}
