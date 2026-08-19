"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Building2, HardHat, Lock, type LucideIcon } from "lucide-react";
import Link from "next/link";

const LOGIN_TARGETS: Record<string, { title: string; icon: LucideIcon }> = {
  "/checklist": {
    title: "建設分野「特定技能1号」認定申請＆受入準備チェックリスト",
    icon: HardHat,
  },
  "/keiei-shinsa": {
    title: "国土交通省 経営事項審査（競争入札参加のため）サポートチェックリスト",
    icon: Building2,
  },
};

const DEFAULT_NEXT_PATH = "/checklist";

function resolveNextPath(value: string | null): string {
  if (value && value in LOGIN_TARGETS) return value;
  return DEFAULT_NEXT_PATH;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = resolveNextPath(searchParams.get("next"));
  const target = LOGIN_TARGETS[nextPath];
  const TargetIcon = target.icon;

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "ログインに失敗しました");
      }
      router.replace(nextPath);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "ログインに失敗しました");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
            <TargetIcon className="h-6 w-6" />
          </div>
          <p className="text-xs font-bold tracking-wide text-blue-600">広島電気興業 株式会社</p>
          <h1 className="mt-1 text-lg font-bold text-slate-800">{target.title}</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1 flex items-center gap-1.5 text-sm font-medium text-slate-600">
              <Lock className="h-4 w-4" />
              パスワード
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-base text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "確認中..." : "ログイン"}
          </button>
        </form>
        <Link
          href="/"
          className="mt-5 flex items-center justify-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-slate-600"
        >
          <ArrowLeft className="h-4 w-4" />
          ポータルトップへ戻る
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
