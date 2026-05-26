import type { Metadata } from "next";
import Link from "next/link";
import { KaisoImage, KaisoToolNav } from "@/components/KaisoToolNav";

export const metadata: Metadata = {
  title: "階層化フォームの階層ビュー",
  description: "プロシージャの呼び出し元・呼び出し先を確認する階層ビューの読み方、深さ切替、上向き下向き切替を解説します。",
};

export default function KaisoHierarchyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link><span>/</span>
        <Link href="/tools" className="hover:text-blue-600">公開ツール</Link><span>/</span>
        <Link href="/tools/kaiso" className="hover:text-blue-600">階層化フォーム</Link>
      </nav>
      <header className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">Hierarchy</p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">階層ビューの読み方</h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          階層ビューでは、選択したプロシージャを起点に、呼び出し先または呼び出し元をツリー表示できます。処理の影響範囲や入口を追うときに使います。
        </p>
      </header>
      <KaisoToolNav />
      <section className="mb-10">
        <KaisoImage src="/tools/kaiso/images/03-06.jpg" alt="プロシージャ選択と階層ビュー" caption="プロシージャを選択すると、関連するコードと階層ビューが連動して表示されます。" />
      </section>
      <section className="mb-10 grid gap-4 md:grid-cols-2">
        <KaisoImage src="/tools/kaiso/images/04-08.jpg" alt="階層深さの切替" caption="階層深さを切り替えることで、浅い範囲だけ見るか、深く追うかを調整できます。" />
        <KaisoImage src="/tools/kaiso/images/04-09.jpg" alt="上向き下向き切替" caption="下向きは呼び出し先、上向きは呼び出し元を追うイメージです。" />
      </section>
      <section className="rounded-lg border border-blue-100 bg-blue-50 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">使い分け</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-gray-700">
          <li>処理の中で何を呼んでいるかを見たい場合は、下向きで確認します。</li>
          <li>この処理がどこから使われているかを見たい場合は、上向きで確認します。</li>
          <li>階層が深すぎる場合は、深さを浅くして入口だけ確認します。</li>
        </ul>
      </section>
    </div>
  );
}

