import type { Metadata } from "next";
import Link from "next/link";
import { KaisoImage, KaisoToolNav } from "@/components/KaisoToolNav";

export const metadata: Metadata = {
  title: "階層化フォームの画面構成",
  description: "階層化フォームのプロジェクト、モジュール、宣言、プロシージャ、コード、階層ビューの画面構成を解説します。",
};

const panes = [
  ["プロジェクト", "開いているVBAプロジェクトを一覧します。分析や外部参照整理の入口にもなります。"],
  ["モジュール", "標準モジュール、Class、UserFormなど、選択プロジェクト内のモジュールを確認します。"],
  ["宣言メンバー", "Type、Enum、Const、API宣言など、プロシージャ以外の宣言を確認します。"],
  ["プロシージャ", "Sub、Function、Propertyなどを一覧し、選択した処理のコードへ移動します。"],
  ["コード表示", "選択したプロシージャや宣言のコードを確認します。"],
  ["階層ビュー", "呼び出し元・呼び出し先の関係をツリーで追跡します。"],
];

export default function KaisoOverviewPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link><span>/</span>
        <Link href="/tools" className="hover:text-blue-600">公開ツール</Link><span>/</span>
        <Link href="/tools/kaiso" className="hover:text-blue-600">階層化フォーム</Link>
      </nav>
      <header className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">Features</p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">画面構成と全体像</h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          階層化フォームは、VBAプロジェクトの情報を複数のペインに分けて表示します。左から対象を絞り込み、右側でコードと呼び出し階層を確認する流れです。
        </p>
      </header>
      <KaisoToolNav />
      <section className="mb-10">
        <KaisoImage src="/tools/kaiso/images/04-01.jpg" alt="階層化フォームの画面構成" caption="画面全体の番号付きマップです。どのペインが何を担当するかを最初に把握しておくと、以降の操作が追いやすくなります。" />
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {panes.map(([name, description]) => (
          <div key={name} className="rounded-lg border border-gray-200 p-4">
            <h2 className="mb-2 text-lg font-bold text-gray-900">{name}</h2>
            <p className="text-sm leading-7 text-gray-700">{description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

