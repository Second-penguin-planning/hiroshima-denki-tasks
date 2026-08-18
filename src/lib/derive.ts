import { CHECKLIST_PHASES, TOTAL_TASK_COUNT } from "./data";
import { addMonths } from "./date-utils";
import type { ChecklistPhase, TaskStatus } from "./types";

export function getPhaseWindow(
  phase: ChecklistPhase,
  targetDate: Date,
): { start: Date; end: Date } {
  return {
    start: addMonths(targetDate, phase.windowStartMonthOffset),
    end: addMonths(targetDate, phase.windowEndMonthOffset),
  };
}

/** フェーズの実務上の期限（ウィンドウの終端）。 */
export function getPhaseDeadline(phase: ChecklistPhase, targetDate: Date): Date {
  return getPhaseWindow(phase, targetDate).end;
}

export function getPhaseForTask(taskId: string): ChecklistPhase | undefined {
  return CHECKLIST_PHASES.find((phase) =>
    phase.tasks.some((task) => task.id === taskId),
  );
}

export interface ChecklistStats {
  total: number;
  done: number;
  inProgress: number;
  notStarted: number;
  percent: number;
}

export function computeStats(
  taskStatuses: Record<string, TaskStatus>,
): ChecklistStats {
  let done = 0;
  let inProgress = 0;

  for (const phase of CHECKLIST_PHASES) {
    for (const task of phase.tasks) {
      const status = taskStatuses[task.id] ?? "not_started";
      if (status === "done") done += 1;
      else if (status === "in_progress") inProgress += 1;
    }
  }

  const total = TOTAL_TASK_COUNT;
  const notStarted = total - done - inProgress;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return { total, done, inProgress, notStarted, percent };
}

export function computePhaseStats(
  phase: ChecklistPhase,
  taskStatuses: Record<string, TaskStatus>,
): ChecklistStats {
  let done = 0;
  let inProgress = 0;
  for (const task of phase.tasks) {
    const status = taskStatuses[task.id] ?? "not_started";
    if (status === "done") done += 1;
    else if (status === "in_progress") inProgress += 1;
  }
  const total = phase.tasks.length;
  const notStarted = total - done - inProgress;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return { total, done, inProgress, notStarted, percent };
}
