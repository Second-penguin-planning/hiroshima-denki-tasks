import { create } from "zustand";
import type { TaskStatus, UploadedFile } from "./types";

interface RemoteState {
  targetStartDate: string | null;
  taskStatuses: Record<string, TaskStatus>;
  taskFiles: Record<string, UploadedFile[]>;
}

interface ChecklistState extends RemoteState {
  isLoaded: boolean;
  isSyncing: boolean;
  refresh: () => Promise<void>;
  setTargetStartDate: (value: string | null) => Promise<void>;
  setTaskStatus: (taskId: string, status: TaskStatus) => Promise<void>;
  addTaskFile: (taskId: string, file: UploadedFile) => void;
  removeTaskFile: (taskId: string, pathname: string) => void;
}

function applyRemote(data: Partial<RemoteState>) {
  return {
    targetStartDate: data.targetStartDate ?? null,
    taskStatuses: data.taskStatuses ?? {},
    taskFiles: data.taskFiles ?? {},
    isLoaded: true,
  };
}

export const useChecklistStore = create<ChecklistState>()((set) => ({
  targetStartDate: null,
  taskStatuses: {},
  taskFiles: {},
  isLoaded: false,
  isSyncing: false,

  refresh: async () => {
    try {
      const res = await fetch("/api/state", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as RemoteState;
      set(applyRemote(data));
    } catch {
      // オフライン等。次回のポーリングで再試行。
    }
  },

  setTargetStartDate: async (value) => {
    set({ targetStartDate: value, isSyncing: true });
    try {
      const res = await fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "setTargetDate", targetStartDate: value }),
      });
      if (res.ok) {
        const data = (await res.json()) as RemoteState;
        set(applyRemote(data));
      }
    } finally {
      set({ isSyncing: false });
    }
  },

  setTaskStatus: async (taskId, status) => {
    set((state) => ({
      taskStatuses: { ...state.taskStatuses, [taskId]: status },
      isSyncing: true,
    }));
    try {
      const res = await fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "setTaskStatus", taskId, status }),
      });
      if (res.ok) {
        const data = (await res.json()) as RemoteState;
        set(applyRemote(data));
      }
    } finally {
      set({ isSyncing: false });
    }
  },

  addTaskFile: (taskId, file) =>
    set((state) => ({
      taskFiles: {
        ...state.taskFiles,
        [taskId]: [...(state.taskFiles[taskId] ?? []), file],
      },
    })),

  removeTaskFile: (taskId, pathname) =>
    set((state) => ({
      taskFiles: {
        ...state.taskFiles,
        [taskId]: (state.taskFiles[taskId] ?? []).filter((f) => f.pathname !== pathname),
      },
    })),
}));
