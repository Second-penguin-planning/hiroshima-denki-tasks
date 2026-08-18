import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "特定技能1号 認定申請＆受入準備チェックリスト",
  description: "建設分野『特定技能1号』の受入手続きを進行・管理するための工程管理アプリ",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 font-sans">{children}</body>
    </html>
  );
}
