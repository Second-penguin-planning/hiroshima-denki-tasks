import type { Metadata } from "next";
import { KeieiShinsaApp } from "@/components/KeieiShinsaApp";

export const metadata: Metadata = {
  title: "経営事項審査 サポートチェックリスト",
};

export default function KeieiShinsaPage() {
  return <KeieiShinsaApp />;
}
