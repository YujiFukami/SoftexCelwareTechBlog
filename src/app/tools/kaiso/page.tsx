import type { Metadata } from "next";
import Link from "next/link";
import { KaisoImage, KaisoToolNav } from "@/components/KaisoToolNav";

export const metadata: Metadata = {
  title: "階層化フォーム (Kaiso) 使い方ガイド",
  description:
    "Excel VBAプロジェクトを解析し、プロシージャ階層、検索、外部参照整理を支援するVSTOアドイン「階層化フォーム」の使い方ガイドです。",
  openGraph: {
    title: "階層化フォーム (Kaiso) 使い方ガイド",
    description:
      "Excel VBAプロジェクトを解析し、プロシージャ階層、検索、外部参照整理を支援するVSTOアドインの使い方です。",
    images: ["/tools/kaiso/images/01-01.jpg"],
  },
};

const features = [
  "VBAプロジェクト内のモジュール・宣言・プロシージャを一覧化",
  "プロシージャ間の呼び出し関係を階層ビューで確認",
  "プロシージャ名やコード本文を検索し、VBEへジャンプ",
  "外部VBProject参照のプロシージャや宣言メンバーをコピー",
  "関連するClass / UserFormモジュールを取り込み",
  "VBAからAutomation APIで検索や整理処理を呼び出し",
];

export default function KaisoTopPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-blue-600">公開ツール</Link>
      </nav>

      <header className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">
          Excel VSTO Add-in
        </p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          階層化フォーム (Kaiso)
        </h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          階層化フォームは、肥大化したExcel VBAプロジェクトを解析し、
          モジュール、宣言、プロシージャ、呼び出し関係を確認しやすくするVSTOアドインです。
          引き継ぎ、リファクタリング、共通部品の整理で「どこから呼ばれているか」を追いやすくします。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://yujifukami.github.io/IKI-Kaiso-VSTO/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            配布ページを開く
          </a>
          <Link
            href="/tools/kaiso/quickstart"
            className="rounded border border-blue-200 px-5 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50"
          >
            5分で試す
          </Link>
          <Link
            href="/cases/vsto-hierarchical-form"
            className="rounded border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            開発事例を見る
          </Link>
        </div>
      </header>

      <KaisoToolNav />

      <section className="mb-10">
        <KaisoImage
          src="/tools/kaiso/images/01-01.jpg"
          alt="階層化フォームの解析画面全体"
          caption="解析画面では、プロジェクト、モジュール、宣言、プロシージャ、コード、階層ビューを並べて確認できます。画像クリックで原寸表示できます。"
        />
      </section>

      <section className="mb-10 grid gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <div key={feature} className="rounded-lg border border-gray-200 p-4">
            <p className="text-sm leading-7 text-gray-700">{feature}</p>
          </div>
        ))}
      </section>

      <section className="rounded-lg border border-blue-100 bg-blue-50 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">次に読むページ</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <Link href="/tools/kaiso/install" className="rounded bg-white p-4 text-sm font-medium text-blue-700 ring-1 ring-blue-100 hover:bg-blue-50">
            インストール手順
          </Link>
          <Link href="/tools/kaiso/quickstart" className="rounded bg-white p-4 text-sm font-medium text-blue-700 ring-1 ring-blue-100 hover:bg-blue-50">
            クイックスタート
          </Link>
          <Link href="/tools/kaiso/vba-api" className="rounded bg-white p-4 text-sm font-medium text-blue-700 ring-1 ring-blue-100 hover:bg-blue-50">
            VBAから呼び出す
          </Link>
          <Link href="/tools/kaiso/features/overview" className="rounded bg-white p-4 text-sm font-medium text-blue-700 ring-1 ring-blue-100 hover:bg-blue-50">
            画面構成と各機能
          </Link>
          <Link href="/tools/kaiso/features/analytics" className="rounded bg-white p-4 text-sm font-medium text-blue-700 ring-1 ring-blue-100 hover:bg-blue-50">
            分析機能
          </Link>
          <Link href="/tools/kaiso/features/module-graph" className="rounded bg-white p-4 text-sm font-medium text-blue-700 ring-1 ring-blue-100 hover:bg-blue-50">
            モジュール関係図
          </Link>
          <Link href="/tools/kaiso/customize" className="rounded bg-white p-4 text-sm font-medium text-blue-700 ring-1 ring-blue-100 hover:bg-blue-50">
            表示設定
          </Link>
          <Link href="/tools/kaiso/troubleshoot" className="rounded bg-white p-4 text-sm font-medium text-blue-700 ring-1 ring-blue-100 hover:bg-blue-50">
            FAQ
          </Link>
        </div>
      </section>
    </div>
  );
}
