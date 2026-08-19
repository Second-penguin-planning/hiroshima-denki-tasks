import type { Metadata } from "next";
import { ChecklistApp } from "@/components/ChecklistApp";

export const metadata: Metadata = {
  title: "特定技能1号 認定申請＆受入準備チェックリスト",
};

export default function ChecklistPage() {
  return <ChecklistApp />;
}
