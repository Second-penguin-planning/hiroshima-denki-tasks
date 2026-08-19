import Link from "next/link";
import { ArrowLeft, Construction, type LucideIcon } from "lucide-react";

export function ComingSoon({
  icon: Icon,
  agency,
  title,
  description,
}: {
  icon: LucideIcon;
  agency: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
          <Icon className="h-7 w-7" />
        </div>
        <p className="text-xs font-bold tracking-wide text-blue-600">{agency}</p>
        <h1 className="mt-1 text-lg font-bold text-slate-800">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">{description}</p>

        <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700">
          <Construction className="h-4 w-4" />
          準備中です
        </div>

        <Link
          href="/"
          className="mt-6 flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          ポータルトップへ戻る
        </Link>
      </div>
    </div>
  );
}
