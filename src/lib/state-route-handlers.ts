import { NextResponse } from "next/server";
import { readSharedState, writeSharedState } from "@/lib/shared-state";
import type { TaskStatus } from "@/lib/types";

type StatePatch =
  | { type: "setTargetDate"; targetStartDate: string | null }
  | { type: "setTaskStatus"; taskId: string; status: TaskStatus }
  | { type: "setTaskAssignee"; taskId: string; assignee: string }
  | { type: "setTaskDeadline"; taskId: string; deadline: string | null };

export function createStateRouteHandlers(statePathname: string) {
  async function GET() {
    const state = await readSharedState(statePathname);
    return NextResponse.json(state);
  }

  async function POST(request: Request) {
    let patch: StatePatch;
    try {
      patch = await request.json();
    } catch {
      return NextResponse.json({ error: "invalid json" }, { status: 400 });
    }

    const current = await readSharedState(statePathname);
    const updatedAt = new Date().toISOString();

    if (patch.type === "setTargetDate") {
      const next = { ...current, targetStartDate: patch.targetStartDate, updatedAt };
      await writeSharedState(statePathname, next);
      return NextResponse.json(next);
    }

    if (patch.type === "setTaskStatus" && typeof patch.taskId === "string") {
      const next = {
        ...current,
        taskStatuses: { ...current.taskStatuses, [patch.taskId]: patch.status },
        updatedAt,
      };
      await writeSharedState(statePathname, next);
      return NextResponse.json(next);
    }

    if (patch.type === "setTaskAssignee" && typeof patch.taskId === "string") {
      const next = {
        ...current,
        taskAssignees: { ...current.taskAssignees, [patch.taskId]: patch.assignee },
        updatedAt,
      };
      await writeSharedState(statePathname, next);
      return NextResponse.json(next);
    }

    if (patch.type === "setTaskDeadline" && typeof patch.taskId === "string") {
      const next = {
        ...current,
        taskDeadlines: { ...current.taskDeadlines, [patch.taskId]: patch.deadline },
        updatedAt,
      };
      await writeSharedState(statePathname, next);
      return NextResponse.json(next);
    }

    return NextResponse.json({ error: "invalid patch" }, { status: 400 });
  }

  return { GET, POST };
}
