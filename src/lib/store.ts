import { create } from "zustand";
import type { TaskStatus, UploadedFile } from "./types";

interface RemoteState {
  targetStartDate: string | null;
  taskStatuses: Record<string, TaskStatus>;
  taskFiles: Record<string, UploadedFile[]>;
  taskAssignees: Record<string, string>;
  taskDeadlines: Record<string, string | null>;
}

interface ChecklistState extends RemoteState {
  isLoaded: boolean;
  isSyncing: boolean;
  refresh: () => Promise<void>;
  setTargetStartDate: (value: string | null) => Promise<void>;
  setTaskStatus: (taskId: string, status: TaskStatus) => Promise<void>;
  setTaskAssignee: (taskId: string, assignee: string) => Promise<void>;
  setTaskDeadline: (taskId: string, deadline: string | null) => Promise<void>;
  addTaskFile: (taskId: string, file: UploadedFile) => void;
  removeTaskFile: (taskId: string, pathname: string) => void;
}

function applyRemote(data: Partial<RemoteState>) {
  return {
    targetStartDate: data.targetStartDate ?? null,
    taskStatuses: data.taskStatuses ?? {},
    taskFiles: data.taskFiles ?? {},
    taskAssignees: data.taskAssignees ?? {},
    taskDeadlines: data.taskDeadlines ?? {},
    isLoaded: true,
  };
}

/**
 * チェックリストアプリごとに独立した共有ステートストアを作る。
 * apiBase 配下の `${apiBase}/state` にGET/POSTしてサーバーと同期する。
 */
export function createChecklistStore(apiBase: string) {
  async function postPatch(patch: Record<string, unknown>): Promise<RemoteState | null> {
    const res = await fetch(`${apiBase}/state`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (!res.ok) return null;
    return (await res.json()) as RemoteState;
  }

  return create<ChecklistState>()((set) => ({
    targetStartDate: null,
    taskStatuses: {},
    taskFiles: {},
    taskAssignees: {},
    taskDeadlines: {},
    isLoaded: false,
    isSyncing: false,

    refresh: async () => {
      try {
        const res = await fetch(`${apiBase}/state`, { cache: "no-store" });
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
        const data = await postPatch({ type: "setTargetDate", targetStartDate: value });
        if (data) set(applyRemote(data));
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
        const data = await postPatch({ type: "setTaskStatus", taskId, status });
        if (data) set(applyRemote(data));
      } finally {
        set({ isSyncing: false });
      }
    },

    setTaskAssignee: async (taskId, assignee) => {
      set((state) => ({
        taskAssignees: { ...state.taskAssignees, [taskId]: assignee },
        isSyncing: true,
      }));
      try {
        const data = await postPatch({ type: "setTaskAssignee", taskId, assignee });
        if (data) set(applyRemote(data));
      } finally {
        set({ isSyncing: false });
      }
    },

    setTaskDeadline: async (taskId, deadline) => {
      set((state) => ({
        taskDeadlines: { ...state.taskDeadlines, [taskId]: deadline },
        isSyncing: true,
      }));
      try {
        const data = await postPatch({ type: "setTaskDeadline", taskId, deadline });
        if (data) set(applyRemote(data));
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
}

export type ChecklistStore = ReturnType<typeof createChecklistStore>;

export const useChecklistStore = createChecklistStore("/api");
export const useKeieiShinsaStore = createChecklistStore("/api/keiei-shinsa");
