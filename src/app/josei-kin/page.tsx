import type { Metadata } from "next";
import { HandCoins } from "lucide-react";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "人材確保等支援助成金（準備中）",
};

export default function JoseiKinPage() {
  return (
    <ComingSoon
      icon={HandCoins}
      agency="厚生労働省"
      title="人材確保等支援助成金（外国人労働者就労環境整備助成コース）申請"
      description="助成金申請の準備・管理機能は現在準備中です。公開までしばらくお待ちください。"
    />
  );
}
