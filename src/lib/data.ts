import type { ChecklistPhase } from "./types";

export const CHECKLIST_PHASES: ChecklistPhase[] = [
  {
    id: "phase1",
    order: 1,
    title: "フェーズ1: 事前インフラ準備",
    subtitle: "受入4〜6ヶ月前",
    windowStartMonthOffset: -6,
    windowEndMonthOffset: -4,
    tasks: [
      {
        id: "p1-t1",
        no: 1,
        title: "ハローワーク求人（国内人材確保の証明）",
        documents: [
          "ハローワーク求人申込書（控）の写し",
          "会社パンフレットや事業所概要",
          "採用に至らなかった理由・対応記録",
        ],
        notes:
          "特定技能の雇用条件と同等以上の内容で日本人向けに求人を出す必要あり。国交省への申請時までに求人活動を完了していること。",
      },
      {
        id: "p1-t2",
        no: 2,
        title: "CCUS事業者登録（受入企業の登録）",
        documents: [
          "建設業許可証の写し",
          "履歴事項全部証明書（発行3ヶ月以内）",
          "税務署の納税証明書（直近）",
          "登録料支払を証明する振込受領書等",
        ],
        notes: "ID発行まで1ヶ月程度要することがあるため真っ先に進める。",
      },
      {
        id: "p1-t3",
        no: 3,
        title: "受入事業実施法人への加入（全中連などを経由）",
        documents: [
          "加入申込書",
          "建設業許可証の写し",
          "履歴事項全部証明書",
          "直近の決算書（確定申告書）の写し",
        ],
        notes:
          "全中連などの正会員団体を経由して加入することで優遇措置あり。団体により必要書類が若干異なる。",
      },
    ],
  },
  {
    id: "phase2",
    order: 2,
    title: "フェーズ2: 雇用契約と事前説明",
    subtitle: "受入3〜4ヶ月前",
    windowStartMonthOffset: -4,
    windowEndMonthOffset: -3,
    tasks: [
      {
        id: "p2-t1",
        no: 4,
        title: "特定技能雇用契約の締結",
        documents: [
          "特定技能雇用契約書（写し）",
          "特定技能雇用条件書（写し）",
          "賃金の内訳や各種手当が確認できる規定",
        ],
        notes: "報酬額は「同等の技能を有する日本人」と同等以上。",
      },
      {
        id: "p2-t2",
        no: 5,
        title: "外国人への重要事項説明",
        documents: ["雇用契約に係る重要事項事前説明書（写し）※母国語併記版"],
        notes:
          "外国人が正しく理解できるよう母国語併記の様式を用いて説明し、自筆署名を得る。",
      },
      {
        id: "p2-t3",
        no: 6,
        title: "日本人との報酬比較・説明資料の作成",
        documents: [
          "同等報酬説明書",
          "比較対象とする日本人の実務経験証明書・賃金台帳",
          "就業規則や賃金規定",
        ],
        notes:
          "比較対象の日本人がいない場合は周辺地域の平均賃金や設計労務単価等から根拠を提示。",
      },
    ],
  },
  {
    id: "phase3",
    order: 3,
    title: "フェーズ3: 国土交通省への受入計画認定申請",
    subtitle: "受入2〜3ヶ月前",
    windowStartMonthOffset: -3,
    windowEndMonthOffset: -2,
    tasks: [
      {
        id: "p3-t1",
        no: 7,
        title: "オンラインシステム入力",
        documents: [
          "外国人就労管理システムのアカウント情報",
          "建設特定技能受入計画申請情報",
        ],
        notes:
          "添付資料をPDF/JPEG化。引き戻しがあると審査が後回しになるため慎重に入力。解像度300dpi以上推奨。",
      },
      {
        id: "p3-t2",
        no: 8,
        title: "受入企業側の添付資料",
        documents: [
          "登記事項証明書",
          "建設業許可証の写し",
          "社会保険加入証明",
          "CCUS事業者登録証明",
        ],
        notes: "",
      },
      {
        id: "p3-t3",
        no: 9,
        title: "外国人本人の添付資料",
        documents: ["技能検定の合格証書の写し", "日本語能力要件を証明する書類"],
        notes: "",
      },
      {
        id: "p3-t4",
        no: 10,
        title: "契約・説明関係の添付資料",
        documents: [
          "特定技能雇用契約書・条件書",
          "重要事項事前説明書",
          "同等報酬説明書等",
        ],
        notes: "",
      },
      {
        id: "p3-t5",
        no: 11,
        title: "事前活動の証明資料",
        documents: [
          "ハローワーク求人票（控）の写し",
          "JACまたはJAC正会員団体への加入証明書類",
        ],
        notes: "",
      },
    ],
  },
  {
    id: "phase4",
    order: 4,
    title: "フェーズ4: 出入国在留管理局への在留資格申請",
    subtitle: "受入1〜2ヶ月前",
    windowStartMonthOffset: -2,
    windowEndMonthOffset: -1,
    tasks: [
      {
        id: "p4-t1",
        no: 12,
        title: "【超重要】国交省の認定証",
        documents: ["国土交通省が交付した「建設特定技能受入計画認定書」の写し"],
        notes:
          "これがないと入管の許可はおりない。並行申請は可能だが最終的に提出必須。",
      },
      {
        id: "p4-t2",
        no: 13,
        title: "入管向け申請書類一式",
        documents: [
          "在留資格認定証明書(COE)交付申請書または変更許可申請書",
          "写真・パスポート・在留カード写し",
          "直近の決算書・納税証明書",
          "雇用契約書コピー等",
        ],
        notes: "",
      },
    ],
  },
  {
    id: "phase5",
    order: 5,
    title: "フェーズ5: 就労開始後の必須手続き",
    subtitle: "就労開始後〜1ヶ月以内",
    windowStartMonthOffset: 0,
    windowEndMonthOffset: 1,
    tasks: [
      {
        id: "p5-t1",
        no: 14,
        title: "国土交通省への受入報告",
        documents: ["1号特定技能外国人受入報告書", "在留カードの写し"],
        notes: "就労開始後速やかにオンライン提出。",
      },
      {
        id: "p5-t2",
        no: 15,
        title: "外国人本人のCCUS技能者登録",
        documents: ["外国人本人のCCUS技能者登録手続き", "CCUS技能者IDを明らかにする書類"],
        notes:
          "原則として入国後1ヶ月以内に提出。就労開始前から本人の登録準備を進めておくこと。",
      },
    ],
  },
];

export const TOTAL_TASK_COUNT = CHECKLIST_PHASES.reduce(
  (sum, phase) => sum + phase.tasks.length,
  0,
);
