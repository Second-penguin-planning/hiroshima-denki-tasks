"use client";

import { useEffect } from "react";
import type { ChecklistStore } from "@/lib/store";

const POLL_INTERVAL_MS = 20_000;

export function StateSync({ store }: { store: ChecklistStore }) {
  const refresh = store((s) => s.refresh);

  useEffect(() => {
    refresh();

    const interval = setInterval(refresh, POLL_INTERVAL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refresh]);

  return null;
}
