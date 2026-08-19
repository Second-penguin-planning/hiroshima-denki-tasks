import { NextResponse } from "next/server";
import { del, put } from "@vercel/blob";
import { readSharedState, writeSharedState } from "@/lib/shared-state";

export const dynamic = "force-dynamic";

const MAX_SIZE = 20 * 1024 * 1024;

function sanitizeFilename(name: string): string {
  return name.replace(/[^\w.\-ぁ-んァ-ヶ一-龠々ー ]/g, "_");
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const taskId = formData.get("taskId");

  if (!(file instanceof File) || typeof taskId !== "string" || !taskId) {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (!isPdf) {
    return NextResponse.json({ error: "PDFファイルのみアップロードできます" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "ファイルサイズは20MB以下にしてください" }, { status: 400 });
  }

  const pathname = `uploads/${taskId}/${Date.now()}-${sanitizeFilename(file.name)}`;

  const blob = await put(pathname, file, {
    access: "private",
    contentType: file.type || "application/pdf",
  });

  const current = await readSharedState();
  const entry = {
    pathname: blob.pathname,
    filename: file.name,
    size: file.size,
    uploadedAt: new Date().toISOString(),
  };
  const next = {
    ...current,
    taskFiles: {
      ...current.taskFiles,
      [taskId]: [...(current.taskFiles[taskId] ?? []), entry],
    },
    updatedAt: new Date().toISOString(),
  };
  await writeSharedState(next);

  return NextResponse.json({ state: next, file: entry });
}

export async function DELETE(request: Request) {
  let body: { taskId?: string; pathname?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const { taskId, pathname } = body;
  if (typeof taskId !== "string" || typeof pathname !== "string" || !pathname.startsWith(`uploads/${taskId}/`)) {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  await del(pathname).catch(() => {});

  const current = await readSharedState();
  const next = {
    ...current,
    taskFiles: {
      ...current.taskFiles,
      [taskId]: (current.taskFiles[taskId] ?? []).filter((f) => f.pathname !== pathname),
    },
    updatedAt: new Date().toISOString(),
  };
  await writeSharedState(next);

  return NextResponse.json({ state: next });
}
