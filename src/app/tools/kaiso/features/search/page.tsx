import type { Metadata } from "next";
import Link from "next/link";
import { KaisoImage, KaisoToolNav } from "@/components/KaisoToolNav";

export const metadata: Metadata = {
  title: "階層化フォームの検索・VBEジャンプ",
  description: "プロシージャ検索、コード本文検索、検索結果の絞り込み、VBEへのジャンプ機能を解説します。",
};

export default function KaisoSearchPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link><span>/</span>
        <Link href="/tools" className="hover:text-blue-600">公開ツール</Link><span>/</span>
        <Link href="/tools/kaiso" className="hover:text-blue-600">階層化フォーム</Link>
      </nav>
      <header className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">Search</p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">検索・ハイライト・VBEジャンプ</h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          検索機能を使うと、プロシージャ名だけでなくコード本文も含めて目的の処理を探せます。見つけた項目はVBEへジャンプして直接確認できます。
        </p>
      </header>
      <KaisoToolNav />
      <section className="mb-10 grid gap-4 md:grid-cols-2">
        <KaisoImage src="/tools/kaiso/images/04-11.jpg" alt="検索バーと検索結果" caption="検索バー、コードも検索、件数表示を見ながら候補を絞り込みます。" />
        <KaisoImage src="/tools/kaiso/images/04-13.jpg" alt="VBEへのジャンプ" caption="検索結果や一覧項目から、該当するVBE上のコードへ移動できます。" />
      </section>
      <section className="rounded-lg border border-gray-200 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">検索の使いどころ</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-gray-700">
          <li>処理名の一部だけ覚えているプロシージャを探す。</li>
          <li>本文中に特定の変数名や関数名を含む処理を探す。</li>
          <li>引き継ぎ時に、どこに実装があるかを素早く確認する。</li>
          <li>検索結果からVBEに移動し、コードを直接修正する。</li>
        </ul>
      </section>
    </div>
  );
}

