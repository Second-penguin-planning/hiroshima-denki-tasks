export type TaskStatus = "not_started" | "in_progress" | "done";

export interface ChecklistTask {
  id: string;
  /** 通しナンバー（1〜）。ミーティングやLINEでの参照用。 */
  no: number;
  title: string;
  documents: string[];
  notes: string;
}

export interface UploadedFile {
  pathname: string;
  filename: string;
  size: number;
  uploadedAt: string;
}

export interface ChecklistPhase {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  /** 就労開始目標日からのオフセット（月数）。負の値は「前」、正の値は「後」。 */
  windowStartMonthOffset: number;
  windowEndMonthOffset: number;
  tasks: ChecklistTask[];
}

export type AlertLevel = "none" | "warning" | "overdue";
