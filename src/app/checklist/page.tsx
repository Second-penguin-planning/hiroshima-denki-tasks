import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, HardHat } from "lucide-react";
import { Dashboard } from "@/components/Dashboard";
import { PhaseTabs } from "@/components/PhaseTabs";
import { StateSync } from "@/components/StateSync";

export const metadata: Metadata = {
  title: "特定技能1号 認定申請＆受入準備チェックリスト",
};

export default function ChecklistPage() {
  return (
    <div className="flex flex-1 flex-col">
      <StateSync />
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-5 sm:px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
            <HardHat className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold tracking-wide text-blue-600">
              広島電気興業 株式会社
            </p>
            <h1 className="text-lg font-bold text-slate-800 sm:text-xl">
              建設分野「特定技能1号」認定申請＆受入準備チェックリスト
            </h1>
            <p className="text-sm text-slate-500">
              受入手続きの進行状況を一元管理します
            </p>
          </div>
          <Link
            href="/"
            className="hidden shrink-0 items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500 transition-colors hover:bg-slate-50 sm:flex"
          >
            <ArrowLeft className="h-4 w-4" />
            ポータルへ戻る
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 space-y-6 px-4 py-6 sm:px-6">
        <Dashboard />
        <PhaseTabs />
      </main>

      <footer className="mt-8 border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        このページにアクセスした方全員でチェックリストとPDF資料を共有・編集できます。
      </footer>
    </div>
  );
}
