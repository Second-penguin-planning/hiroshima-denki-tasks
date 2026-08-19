import { get, put } from "@vercel/blob";
import type { TaskStatus, UploadedFile } from "./types";

const STATE_PATHNAME = "state/checklist-state.json";

export interface SharedState {
  targetStartDate: string | null;
  taskStatuses: Record<string, TaskStatus>;
  taskFiles: Record<string, UploadedFile[]>;
  /** taskId -> 担当者名（自由記入） */
  taskAssignees: Record<string, string>;
  /** taskId -> 期限（YYYY-MM-DD）。未設定はnullまたはキーなし。 */
  taskDeadlines: Record<string, string | null>;
  updatedAt: string;
}

const DEFAULT_STATE: SharedState = {
  targetStartDate: null,
  taskStatuses: {},
  taskFiles: {},
  taskAssignees: {},
  taskDeadlines: {},
  updatedAt: new Date(0).toISOString(),
};

export async function readSharedState(): Promise<SharedState> {
  try {
    const result = await get(STATE_PATHNAME, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200) return DEFAULT_STATE;
    const text = await new Response(result.stream).text();
    const parsed = JSON.parse(text) as Partial<SharedState>;
    return {
      targetStartDate: parsed.targetStartDate ?? null,
      taskStatuses: parsed.taskStatuses ?? {},
      taskFiles: parsed.taskFiles ?? {},
      taskAssignees: parsed.taskAssignees ?? {},
      taskDeadlines: parsed.taskDeadlines ?? {},
      updatedAt: parsed.updatedAt ?? DEFAULT_STATE.updatedAt,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export async function writeSharedState(state: SharedState): Promise<void> {
  await put(STATE_PATHNAME, JSON.stringify(state), {
    access: "private",
    contentType: "application/json",
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}
