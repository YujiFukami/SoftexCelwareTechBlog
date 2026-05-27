import type { Metadata } from "next";
import Link from "next/link";
import { KaisoImage, KaisoToolNav } from "@/components/KaisoToolNav";

const downloadUrl = "https://yujifukami.github.io/IKI-Kaiso-VSTO/";

export const metadata: Metadata = {
  title: "階層化フォーム v3.1.0.54 更新内容",
  description:
    "階層化フォーム v3.1.0.54 の更新内容です。Excelリボンと設定画面に、使い方・配布ページへのリンクを追加しました。",
  openGraph: {
    title: "階層化フォーム v3.1.0.54 更新内容",
    description:
      "Excelリボン側と設定画面側から、使い方ページや配布ページへ移動しやすくした導線改善を紹介します。",
    images: ["/tools/kaiso/images/v3-1-0-54-ribbon-links.jpg"],
  },
};

const usefulScenes = [
  "初めて階層化フォームを使うときに、Excelから使い方ページをすぐ開きたい場合",
  "インストール手順や最新版の配布場所を、Excel作業中に確認したい場合",
  "社内でツールを案内するときに、操作画面から関連ページへ誘導したい場合",
  "設定を見直している途中で、補足説明や配布ページを確認したい場合",
];

const relatedLinks = [
  { label: "階層化フォーム 概要", href: "/tools/kaiso" },
  { label: "インストール手順", href: "/tools/kaiso/install" },
  { label: "クイックスタート", href: "/tools/kaiso/quickstart" },
  { label: "開発事例: VSTO階層化フォーム", href: "/cases/vsto-hierarchical-form" },
  { label: "配布ページ", href: downloadUrl, external: true },
];

export default function KaisoReleaseV31054Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-blue-600">公開ツール</Link>
        <span>/</span>
        <Link href="/tools/kaiso" className="hover:text-blue-600">
          階層化フォーム
        </Link>
      </nav>

      <header className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">
          Release Notes
        </p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          階層化フォーム v3.1.0.54 更新内容
        </h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          v3.1.0.54では、階層化フォームの使い方や配布ページへ移動しやすくするため、
          Excelリボンと設定画面に関連リンクを追加しました。機能そのものを大きく変える更新ではなく、
          使い始めや確認作業の途中で迷いにくくするための導線改善です。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/tools/kaiso/quickstart"
            className="rounded bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            使い方を見る
          </Link>
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-blue-200 px-5 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50"
          >
            配布ページを開く
          </a>
        </div>
      </header>

      <KaisoToolNav />

      <section className="mb-10 rounded-lg border border-blue-100 bg-blue-50 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">更新概要</h2>
        <p className="text-sm leading-7 text-gray-700">
          今回の更新では、Excel上で階層化フォームを使っている最中に、
          「使い方を確認したい」「最新版やインストール手順を見たい」と思ったときの移動先を分かりやすくしました。
          リボン側と設定画面側の両方から関連ページを開けるため、利用者がWebページを探し直す手間を減らせます。
        </p>
      </section>

      <section className="mb-10 space-y-10">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            リボンに使い方・配布ページリンクを追加
          </h2>
          <p className="mb-4 text-sm leading-7 text-gray-700">
            Excelの開発タブに表示される階層化フォームのリボンに、使い方ページと配布ページへのリンクを追加しました。
            操作中に手順を確認したい場合や、別のPCへ導入するために配布ページを開きたい場合に、
            Excel画面からそのまま移動できます。
          </p>
          <KaisoImage
            src="/tools/kaiso/images/v3-1-0-54-ribbon-links.jpg"
            alt="階層化フォームのExcelリボンに追加された使い方と配布ページのリンク"
            caption="Excelリボンから、階層化フォームの使い方ページと配布ページを開けるようにしました。"
          />
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            設定画面にも関連リンクを追加
          </h2>
          <p className="mb-4 text-sm leading-7 text-gray-700">
            設定画面にも、使い方ページと配布ページへのリンクを追加しました。
            設定を確認しているときは、インストール状態、表示設定、使い方の説明を見直したくなる場面が多いため、
            設定画面から関連情報へ移動できるようにしています。
          </p>
          <KaisoImage
            src="/tools/kaiso/images/v3-1-0-54-settings-links.jpg"
            alt="階層化フォームの設定画面に追加された使い方と配布ページのリンク"
            caption="設定画面からも、使い方ページと配布ページを開けるようにしました。"
          />
        </div>
      </section>

      <section className="mb-10 rounded-lg border border-gray-200 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">便利になる場面</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-gray-700">
          {usefulScenes.map((scene) => (
            <li key={scene}>{scene}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-gray-200 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">関連リンク</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {relatedLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded bg-white p-4 text-sm font-medium text-blue-700 ring-1 ring-blue-100 hover:bg-blue-50"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="rounded bg-white p-4 text-sm font-medium text-blue-700 ring-1 ring-blue-100 hover:bg-blue-50"
              >
                {link.label}
              </Link>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
