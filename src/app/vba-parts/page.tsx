import Link from "next/link";
import type { Metadata } from "next";
import VbaPartsExplorer from "@/components/VbaPartsExplorer";
import { getAllArticles } from "@/lib/articles";
import { getVbaParts, vbaPartCategories } from "@/lib/vba-parts";

export const metadata: Metadata = {
  title: "Excel VBA 部品集",
  description:
    "実務で再利用できるExcel VBAの汎用プロシージャ・関数を、配列、セル操作、入力支援、図形、UserForm、開発支援などの用途別に整理しています。",
};

export default function VbaPartsPage() {
  const parts = getVbaParts(getAllArticles());

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-5 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/articles/vba" className="hover:text-blue-600">
          Excel VBA記事
        </Link>
        <span className="mx-2">/</span>
        VBA部品集
      </nav>

      <section className="mb-9 border-b border-gray-200 pb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">
          Reusable Excel VBA Parts
        </p>
        <h1 className="text-3xl font-bold text-gray-900">Excel VBA 部品集</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600">
          実務開発で繰り返し使える汎用プロシージャ・関数を、目的別に整理したコードライブラリです。
          必要な部品を探し、解説、依存する処理、注意点、コピー可能な実装コードを確認できます。
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/articles/vba/vba-componentization-technique"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            部品化の考え方を読む
          </Link>
          <Link
            href="/articles/vba"
            className="rounded border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:border-blue-300 hover:bg-blue-50"
          >
            Excel VBA記事をすべて見る
          </Link>
        </div>
      </section>

      <VbaPartsExplorer articles={parts} categories={vbaPartCategories} />
    </div>
  );
}
