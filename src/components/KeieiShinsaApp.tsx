"use client";

import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";
import { Dashboard } from "@/components/Dashboard";
import { PhaseTabs } from "@/components/PhaseTabs";
import { StateSync } from "@/components/StateSync";
import { KEIEI_SHINSA_PHASES } from "@/lib/keiei-shinsa-data";
import { useKeieiShinsaStore } from "@/lib/store";

export function KeieiShinsaApp() {
  return (
    <div className="flex flex-1 flex-col">
      <StateSync store={useKeieiShinsaStore} />
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-5 sm:px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Building2 className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold tracking-wide text-blue-600">
              広島電気興業 株式会社
            </p>
            <h1 className="text-lg font-bold text-slate-800 sm:text-xl">
              国土交通省 経営事項審査（競争入札参加のため）サポートチェックリスト
            </h1>
            <p className="text-sm text-slate-500">
              経営状況分析から総合評定値の取得、入札参加資格申請までの進行状況を一元管理します
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
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-800">
          このチェックリストは一般的な手続きの流れをまとめた目安です。実際の期限・必要書類・提出先は許可行政庁（都道府県または地方整備局）や顧問の行政書士に必ずご確認ください。
        </p>
        <Dashboard
          phases={KEIEI_SHINSA_PHASES}
          store={useKeieiShinsaStore}
          dateLabel="基準決算日"
          dateDescription="直近の決算日を設定すると、各フェーズの目安期限が自動計算されます。"
          resetLabel="決算日をクリア"
          resetConfirmMessage="基準決算日をクリアしますか？（各タスクの進捗は変更されません）"
        />
        <PhaseTabs
          phases={KEIEI_SHINSA_PHASES}
          store={useKeieiShinsaStore}
          apiBase="/api/keiei-shinsa"
        />
      </main>

      <footer className="mt-8 border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        このページにアクセスした方全員でチェックリストとPDF資料を共有・編集できます。
      </footer>
    </div>
  );
}
