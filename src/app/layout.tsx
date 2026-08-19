import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "広島電気興業 各種申請・手続きサポートポータル",
    template: "%s｜広島電気興業 各種申請・手続きサポートポータル",
  },
  description:
    "広島電気興業の外国人材受入、経営事項審査、助成金申請など各種手続きをまとめて管理するポータル",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 font-sans">{children}</body>
    </html>
  );
}
