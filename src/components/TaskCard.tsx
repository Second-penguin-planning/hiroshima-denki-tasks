"use client";

import { useRef, useState, type ChangeEvent } from "react";
import {
  ChevronDown,
  FileText,
  Info,
  AlertTriangle,
  Clock3,
  Upload,
  Trash2,
  Loader2,
} from "lucide-react";
import type { ChecklistTask, TaskStatus } from "@/lib/types";
import { formatDateJa, getAlertLevel } from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import { useChecklistStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusToggle } from "@/components/ui/status-toggle";
import type { UploadedFile } from "@/lib/types";

const EMPTY_FILES: UploadedFile[] = [];

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
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const files = useChecklistStore((s) => s.taskFiles[task.id] ?? EMPTY_FILES);
  const addTaskFile = useChecklistStore((s) => s.addTaskFile);
  const removeTaskFile = useChecklistStore((s) => s.removeTaskFile);

  const alertLevel = getAlertLevel(deadline, status === "done");

  async function handleFileSelected(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      setUploadError("PDFファイルのみアップロードできます");
      return;
    }

    setUploadError(null);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("taskId", task.id);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "アップロードに失敗しました");
      }
      const data = await res.json();
      if (data.file) addTaskFile(task.id, data.file);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "アップロードに失敗しました");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(pathname: string) {
    if (!window.confirm("このファイルを削除しますか？")) return;
    removeTaskFile(task.id, pathname);
    try {
      await fetch("/api/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId: task.id, pathname }),
      });
    } catch {
      // 削除リクエスト失敗時は次回の同期ポーリングで状態が復元される
    }
  }

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
          className="flex flex-1 items-start gap-3 text-left cursor-pointer"
        >
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
            {task.no}
          </span>
          <ChevronDown
            className={cn(
              "mt-1.5 h-5 w-5 shrink-0 text-slate-400 transition-transform",
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
              {files.length > 0 && (
                <Badge tone="info">
                  <FileText className="h-3 w-3" />
                  資料 {files.length}件
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

          <div>
            <h4 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-slate-700">
              <Upload className="h-4 w-4 text-blue-600" />
              関連資料（PDF）
            </h4>

            {files.length > 0 && (
              <ul className="mb-2 space-y-1.5">
                {files.map((f) => (
                  <li
                    key={f.pathname}
                    className="flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-2 text-sm shadow-sm"
                  >
                    <a
                      href={`/api/download?pathname=${encodeURIComponent(f.pathname)}&filename=${encodeURIComponent(f.filename)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex min-w-0 flex-1 items-center gap-2 text-blue-700 hover:underline"
                    >
                      <FileText className="h-4 w-4 shrink-0" />
                      <span className="truncate">{f.filename}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDelete(f.pathname)}
                      title="削除"
                      className="shrink-0 rounded p-1 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2 text-sm text-slate-600 transition-colors hover:border-blue-400 hover:text-blue-700 disabled:opacity-50 cursor-pointer"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {uploading ? "アップロード中..." : "PDFをアップロード"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileSelected}
            />
            {uploadError && <p className="mt-1.5 text-xs text-red-600">{uploadError}</p>}
          </div>
        </div>
      )}
    </Card>
  );
}
