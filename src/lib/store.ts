import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TaskStatus } from "./types";

interface ChecklistState {
  /** 就労開始目標日（YYYY-MM-DD）。未設定なら null。 */
  targetStartDate: string | null;
  /** taskId -> ステータス。未登録のタスクは not_started 扱い。 */
  taskStatuses: Record<string, TaskStatus>;
  setTargetStartDate: (value: string | null) => void;
  setTaskStatus: (taskId: string, status: TaskStatus) => void;
  resetAll: () => void;
}

export const useChecklistStore = create<ChecklistState>()(
  persist(
    (set) => ({
      targetStartDate: null,
      taskStatuses: {},
      setTargetStartDate: (value) => set({ targetStartDate: value }),
      setTaskStatus: (taskId, status) =>
        set((state) => ({
          taskStatuses: { ...state.taskStatuses, [taskId]: status },
        })),
      resetAll: () => set({ targetStartDate: null, taskStatuses: {} }),
    }),
    {
      name: "tokutei-ginou-checklist-storage",
    },
  ),
);
