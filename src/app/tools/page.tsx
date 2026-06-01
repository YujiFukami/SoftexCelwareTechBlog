import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "公開ツール",
  description:
    "Softex Celwareで公開しているツールやアプリの使い方、導入手順、関連ドキュメントをまとめたページです。",
};

const tools = [
  {
    href: "/tools/rakulog-task",
    title: "らくログタスク",
    category: "作業時間管理Webアプリ",
    description:
      "出勤、作業切替、退勤の記録から、日別・月別・作業別の集計まで行える作業時間管理Webアプリです。スマートフォンからの記録にも対応しています。",
    tags: ["Next.js", "Supabase", "Vercel", "作業時間管理"],
  },
  {
    href: "/tools/kaiso",
    title: "階層化フォーム (Kaiso)",
    category: "Excel VSTOアドイン",
    description:
      "Excel VBAプロジェクトを解析し、プロシージャの階層関係、検索、外部参照整理を支援するVSTOアドインです。",
    tags: ["Excel", "VBA", "VSTO", "コード解析"],
  },
  {
    href: "/tools/spline-study",
    title: "スプライン補間学習計算ツール",
    category: "数値計算学習Webアプリ",
    description:
      "通常スプライン補間、パラメトリックスプライン補間、閉曲線スプライン補間の導出過程、行列、係数、補間式を順番に確認できる学習用Webアプリです。",
    tags: ["Vanilla JS", "Chart.js", "MathJax", "スプライン補間"],
  },
  {
    href: "/tools/coconala-fee-calculator",
    title: "ココナラ見積・手取り・予算逆算ツール",
    category: "料金シミュレーター",
    description:
      "ココナラ出品者向けに、見積額から支払総額と手取りを計算し、予算上限や目標手取りから必要な見積額も逆算できる参考計算Webアプリです。",
    tags: ["Vanilla JS", "料金計算", "二分探索", "レスポンシブUI"],
  },
  {
    href: "/tools/spherical-lissajous-explorer",
    title: "球面リサージュ曲面 / 内トロコイド曲面 Webアプリ",
    category: "3D数式曲面学習Webアプリ",
    description:
      "球面リサージュ曲面と内トロコイド曲面をブラウザ上で3D可視化し、パラメータ調整とSTL出力まで確認できる学習・検証用Webアプリです。",
    tags: ["Vanilla JS", "Three.js", "3D", "STL出力"],
  },
];

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-10">
        <p className="mb-2 text-sm font-medium text-blue-600">Tools</p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          公開ツール
        </h1>
        <p className="max-w-3xl text-base leading-7 text-gray-600">
          配布しているツールやアプリの概要、インストール手順、使い方をまとめています。
          配布ページはダウンロード中心、こちらのページ群は詳しい使い方と補足解説を担当します。
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group block rounded-lg border border-gray-200 p-5 transition-colors hover:border-blue-300 hover:bg-blue-50/40"
          >
            <div className="mb-3 text-xs font-medium text-blue-600">
              {tool.category}
            </div>
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-700">
              {tool.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              {tool.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
