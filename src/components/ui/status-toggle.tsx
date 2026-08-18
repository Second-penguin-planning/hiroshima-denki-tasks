import { Circle, CheckCircle2, Clock } from "lucide-react";
import type { TaskStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const OPTIONS: { value: TaskStatus; label: string; icon: typeof Circle }[] = [
  { value: "not_started", label: "未着手", icon: Circle },
  { value: "in_progress", label: "進行中", icon: Clock },
  { value: "done", label: "完了", icon: CheckCircle2 },
];

const ACTIVE_CLASSES: Record<TaskStatus, string> = {
  not_started: "bg-slate-600 text-white",
  in_progress: "bg-amber-500 text-white",
  done: "bg-emerald-600 text-white",
};

export function StatusToggle({
  value,
  onChange,
}: {
  value: TaskStatus;
  onChange: (status: TaskStatus) => void;
}) {
  return (
    <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
      {OPTIONS.map((option) => {
        const Icon = option.icon;
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer",
              isActive
                ? ACTIVE_CLASSES[option.value]
                : "text-slate-500 hover:bg-slate-200/70",
            )}
            aria-pressed={isActive}
          >
            <Icon className="h-4 w-4" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
