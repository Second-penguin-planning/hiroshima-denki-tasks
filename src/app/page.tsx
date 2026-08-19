import Link from "next/link";
import { ArrowRight, Building2, HandCoins, HardHat, LayoutGrid, Lock } from "lucide-react";

const SERVICES = [
  {
    href: "/checklist",
    icon: HardHat,
    agency: "外国人材の受入",
    title: "特定技能1号 認定申請＆受入準備チェックリスト",
    description: "国交省・入管への申請準備から就労開始後の手続きまでを一元管理します。",
    available: true,
  },
  {
    href: "/keiei-shinsa",
    icon: Building2,
    agency: "国土交通省",
    title: "競争入札参加のための経営事項審査",
    description: "経営事項審査の申請準備・管理機能です。",
    available: false,
  },
  {
    href: "/josei-kin",
    icon: HandCoins,
    agency: "厚生労働省",
    title: "人材確保等支援助成金（外国人労働者就労環境整備助成コース）申請",
    description: "外国人労働者の就労環境整備に関する助成金申請の管理機能です。",
    available: false,
  },
];

export default function PortalPage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-6 sm:px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
            <LayoutGrid className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold tracking-wide text-blue-600">広島電気興業 株式会社</p>
            <h1 className="text-lg font-bold text-slate-800 sm:text-xl">
              各種申請・手続きサポートポータル
            </h1>
            <p className="text-sm text-slate-500">
              外国人材の受入や許認可・助成金の申請など、必要な手続きをここから選択してください
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 space-y-4 px-4 py-8 sm:px-6">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.href}
              href={service.href}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50/30 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                    service.available ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wide text-slate-400">{service.agency}</p>
                  <p className="font-bold text-slate-800">{service.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{service.description}</p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
                {service.available ? (
                  <span className="flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white">
                    <Lock className="h-3.5 w-3.5" />
                    開く
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                ) : (
                  <span className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                    準備中
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </main>

      <footer className="mt-8 border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        各サービスはパスワードで保護されています。
      </footer>
    </div>
  );
}
