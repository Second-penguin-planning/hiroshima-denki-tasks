"use client";

import { useState } from "react";
import { ChevronDown, FileText, Info, AlertTriangle, Clock3 } from "lucide-react";
import type { ChecklistTask, TaskStatus } from "@/lib/types";
import { formatDateJa, getAlertLevel } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusToggle } from "@/components/ui/status-toggle";

export function TaskCard({
  task,
  deadline,
  status,
  onStatusChange,
}: {
  task: ChecklistTask;
  deadline: Date | null;
  status: TaskStatus;
  onStatusChange: (status: TaskStatus) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const alertLevel = getAlertLevel(deadline, status === "done");

  return (
    <Card
      className={cn(
        "overflow-hidden transition-colors",
        alertLevel === "overdue" && "border-red-300",
        alertLevel === "warning" && "border-amber-300",
      )}
    >
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="flex flex-1 items-start gap-2 text-left cursor-pointer"
        >
          <ChevronDown
            className={cn(
              "mt-1 h-5 w-5 shrink-0 text-slate-400 transition-transform",
              isOpen && "rotate-180",
            )}
          />
          <div>
            <p className="font-semibold text-slate-800">{task.title}</p>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              {deadline && (
                <span className="flex items-center gap-1">
                  <Clock3 className="h-3.5 w-3.5" />
                  期限目安: {formatDateJa(deadline)}
                </span>
              )}
              {alertLevel === "overdue" && (
                <Badge tone="danger">
                  <AlertTriangle className="h-3 w-3" />
                  期限超過
                </Badge>
              )}
              {alertLevel === "warning" && (
                <Badge tone="warning">
                  <AlertTriangle className="h-3 w-3" />
                  期限間近
                </Badge>
              )}
            </div>
          </div>
        </button>
        <div className="sm:pl-4">
          <StatusToggle value={status} onChange={onStatusChange} />
        </div>
      </div>

      {isOpen && (
        <div className="space-y-4 border-t border-slate-100 bg-slate-50/60 p-4">
          <div>
            <h4 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-slate-700">
              <FileText className="h-4 w-4 text-blue-600" />
              必要な資料
            </h4>
            <ul className="space-y-1.5">
              {task.documents.map((doc) => (
                <li
                  key={doc}
                  className="flex items-start gap-2 rounded-lg bg-white px-3 py-2 text-sm text-slate-700 shadow-sm"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          {task.notes && (
            <div>
              <h4 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-slate-700">
                <Info className="h-4 w-4 text-amber-600" />
                留意点・補足説明
              </h4>
              <p className="rounded-lg bg-amber-50 px-3 py-2.5 text-sm leading-relaxed text-amber-900">
                {task.notes}
              </p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
