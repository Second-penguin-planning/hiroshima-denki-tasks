"use client";

import { useState } from "react";
import { CHECKLIST_PHASES } from "@/lib/data";
import { getAlertLevel, parseDateInput } from "@/lib/date-utils";
import { getPhaseDeadline, computePhaseStats } from "@/lib/derive";
import { useChecklistStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { TaskCard } from "@/components/TaskCard";

export function PhaseTabs() {
  const [activePhaseId, setActivePhaseId] = useState(CHECKLIST_PHASES[0].id);
  const targetStartDate = useChecklistStore((s) => s.targetStartDate);
  const taskStatuses = useChecklistStore((s) => s.taskStatuses);
  const setTaskStatus = useChecklistStore((s) => s.setTaskStatus);

  const targetDate = parseDateInput(targetStartDate ?? "");
  const activePhase =
    CHECKLIST_PHASES.find((p) => p.id === activePhaseId) ?? CHECKLIST_PHASES[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {CHECKLIST_PHASES.map((phase) => {
          const phaseDeadline = targetDate ? getPhaseDeadline(phase, targetDate) : null;
          const hasOverdue = phase.tasks.some((task) => {
            const status = taskStatuses[task.id] ?? "not_started";
            return getAlertLevel(phaseDeadline, status === "done") === "overdue";
          });
          const hasWarning = phase.tasks.some((task) => {
            const status = taskStatuses[task.id] ?? "not_started";
            return getAlertLevel(phaseDeadline, status === "done") === "warning";
          });
          const stats = computePhaseStats(phase, taskStatuses);
          const isActive = phase.id === activePhaseId;

          return (
            <button
              key={phase.id}
              type="button"
              onClick={() => setActivePhaseId(phase.id)}
              className={cn(
                "relative flex flex-col items-start gap-0.5 rounded-xl border px-4 py-2.5 text-left transition-colors cursor-pointer",
                isActive
                  ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50/50",
              )}
            >
              {(hasOverdue || hasWarning) && (
                <span
                  className={cn(
                    "absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white",
                    hasOverdue ? "bg-red-500" : "bg-amber-500",
                  )}
                />
              )}
              <span className="text-sm font-bold">{phase.title.replace(/^フェーズ\d+:\s*/, "")}</span>
              <span
                className={cn(
                  "text-xs",
                  isActive ? "text-blue-100" : "text-slate-400",
                )}
              >
                {phase.subtitle} ・ {stats.done}/{stats.total}完了
              </span>
            </button>
          );
        })}
      </div>

      <Card className="p-5">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-800">{activePhase.title}</h3>
          <p className="text-sm text-slate-500">{activePhase.subtitle}</p>
        </div>
        <div className="space-y-3">
          {activePhase.tasks.map((task) => {
            const deadline = targetDate ? getPhaseDeadline(activePhase, targetDate) : null;
            return (
              <TaskCard
                key={task.id}
                task={task}
                deadline={deadline}
                status={taskStatuses[task.id] ?? "not_started"}
                onStatusChange={(status) => setTaskStatus(task.id, status)}
              />
            );
          })}
        </div>
      </Card>
    </div>
  );
}
