import { HardHat } from "lucide-react";
import { Dashboard } from "@/components/Dashboard";
import { PhaseTabs } from "@/components/PhaseTabs";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-5 sm:px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
            <HardHat className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 sm:text-xl">
              建設分野「特定技能1号」認定申請＆受入準備チェックリスト
            </h1>
            <p className="text-sm text-slate-500">
              受入手続きの進行状況を一元管理します
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 space-y-6 px-4 py-6 sm:px-6">
        <Dashboard />
        <PhaseTabs />
      </main>

      <footer className="mt-8 border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        入力データはお使いのブラウザ（localStorage）にのみ保存されます。
      </footer>
    </div>
  );
}
