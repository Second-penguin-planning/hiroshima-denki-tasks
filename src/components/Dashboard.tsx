"use client";

import { CalendarDays, RotateCcw } from "lucide-react";
import { daysBetween, formatDateJa, parseDateInput, toDateInputValue } from "@/lib/date-utils";
import { computePhaseStats, computeStats, getPhaseWindow } from "@/lib/derive";
import type { ChecklistStore } from "@/lib/store";
import type { ChecklistPhase } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";

export function Dashboard({
  phases,
  store,
  dateLabel,
  dateDescription,
  resetLabel,
  resetConfirmMessage,
}: {
  phases: ChecklistPhase[];
  store: ChecklistStore;
  dateLabel: string;
  dateDescription: string;
  resetLabel: string;
  resetConfirmMessage: string;
}) {
  const targetStartDate = store((s) => s.targetStartDate);
  const taskStatuses = store((s) => s.taskStatuses);
  const setTargetStartDate = store((s) => s.setTargetStartDate);

  const targetDate = parseDateInput(targetStartDate ?? "");
  const stats = computeStats(phases, taskStatuses);
  const today = new Date();

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
              <CalendarDays className="h-5 w-5 text-blue-600" />
              {dateLabel}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{dateDescription}</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="date"
              value={targetStartDate ? toDateInputValue(new Date(`${targetStartDate}T00:00:00`)) : ""}
              onChange={(e) => setTargetStartDate(e.target.value || null)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-base font-medium text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            {targetStartDate && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(resetConfirmMessage)) {
                    setTargetStartDate(null);
                  }
                }}
                title={resetLabel}
                className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 transition-colors hover:bg-slate-50 cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                {resetLabel}
              </button>
            )}
          </div>
        </div>

        {targetDate && (
          <p className="mt-4 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-800">
            {dateLabel}: {formatDateJa(targetDate)}
          </p>
        )}
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">全体の進捗状況</h2>
          <span className="text-2xl font-extrabold text-blue-600">{stats.percent}%</span>
        </div>
        <ProgressBar value={stats.percent} className="mt-3" />
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <Badge tone="success">完了 {stats.done}</Badge>
          <Badge tone="warning">進行中 {stats.inProgress}</Badge>
          <Badge tone="neutral">未着手 {stats.notStarted}</Badge>
          <Badge tone="info">全{stats.total}タスク</Badge>
        </div>
      </Card>

      {targetDate && (
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-bold text-slate-800">フェーズ別スケジュール</h2>
          <div className="space-y-3">
            {phases.map((phase) => {
              const { start, end } = getPhaseWindow(phase, targetDate);
              const phaseStats = computePhaseStats(phase, taskStatuses);
              const isComplete = phaseStats.done === phaseStats.total;
              const isOverdue = !isComplete && daysBetween(today, end) < 0;
              return (
                <div
                  key={phase.id}
                  className="flex flex-col gap-2 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-800">{phase.title}</p>
                    <p className="text-sm text-slate-500">
                      期限目安: {formatDateJa(start)} 〜 {formatDateJa(end)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isComplete ? (
                      <Badge tone="success">完了</Badge>
                    ) : isOverdue ? (
                      <Badge tone="danger">期限超過</Badge>
                    ) : (
                      <Badge tone="neutral">
                        {phaseStats.done}/{phaseStats.total} 完了
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
