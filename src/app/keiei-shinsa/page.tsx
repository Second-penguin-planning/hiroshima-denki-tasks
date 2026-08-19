import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "経営事項審査（準備中）",
};

export default function KeieiShinsaPage() {
  return (
    <ComingSoon
      icon={Building2}
      agency="国土交通省"
      title="競争入札参加のための経営事項審査"
      description="経営事項審査の申請準備・管理機能は現在準備中です。公開までしばらくお待ちください。"
    />
  );
}
