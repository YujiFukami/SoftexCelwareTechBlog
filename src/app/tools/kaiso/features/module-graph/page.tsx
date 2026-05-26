import type { Metadata } from "next";
import Link from "next/link";
import { KaisoImage, KaisoToolNav } from "@/components/KaisoToolNav";

export const metadata: Metadata = {
  title: "階層化フォームのモジュール関係図",
  description:
    "階層化フォームでVBAモジュール間の関係を図として確認し、処理のつながりや整理候補を把握する使い方を解説します。",
};

export default function KaisoModuleGraphPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link><span>/</span>
        <Link href="/tools" className="hover:text-blue-600">公開ツール</Link><span>/</span>
        <Link href="/tools/kaiso" className="hover:text-blue-600">階層化フォーム</Link>
      </nav>
      <header className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">Module Graph</p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">モジュール関係図でつながりを見る</h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          モジュール関係図は、VBAプロジェクト内のモジュール同士の関係を視覚的に確認するための画面です。
          一覧表だけでは見えにくい依存関係や処理のまとまりを、カードと線で追いやすくします。
        </p>
      </header>
      <KaisoToolNav />

      <section className="mb-10 grid gap-4 md:grid-cols-2">
        <KaisoImage
          src="/tools/kaiso/images/04-26-1.jpg"
          alt="モジュール関係図の全体画面"
          caption="モジュールをカードとして配置し、関係するモジュール同士を線で結んで確認します。"
        />
        <KaisoImage
          src="/tools/kaiso/images/04-26-2.jpg"
          alt="モジュール関係図の詳細表示"
          caption="関係が多いモジュール、中心になっているモジュール、分離できそうな処理を見つけやすくします。"
        />
      </section>

      <section className="mb-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 p-4">
          <h2 className="mb-2 text-lg font-bold text-gray-900">依存の集中を見る</h2>
          <p className="text-sm leading-7 text-gray-700">
            多くの処理から参照されているモジュールは、共通処理または影響範囲の大きい処理です。修正前に優先して確認します。
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 p-4">
          <h2 className="mb-2 text-lg font-bold text-gray-900">分割候補を探す</h2>
          <p className="text-sm leading-7 text-gray-700">
            役割の違う処理が同じモジュールに集まっている場合、関係図を見ながら整理方針を検討できます。
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 p-4">
          <h2 className="mb-2 text-lg font-bold text-gray-900">説明資料に使う</h2>
          <p className="text-sm leading-7 text-gray-700">
            保守対象の全体像を関係図で示すと、コードを直接読まない人にも構造を共有しやすくなります。
          </p>
        </div>
      </section>
    </div>
  );
}
