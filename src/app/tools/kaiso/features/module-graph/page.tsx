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
          一覧表だけでは見えにくい依存関係や処理のまとまりを、詳細表示と簡易表示を切り替えながら追いやすくします。
        </p>
      </header>
      <KaisoToolNav />

      <section className="mb-10 grid gap-6">
        <KaisoImage
          src="/tools/kaiso/images/04-26-2.jpg"
          alt="モジュール関係図の詳細表示"
          caption="詳細表示では、モジュール内のプロシージャ同士の呼び出し関係まで線で結び、どの処理がどこへつながっているかを具体的に確認できます。"
        />
        <KaisoImage
          src="/tools/kaiso/images/04-26-3.jpg"
          alt="モジュール関係図の簡易表示"
          caption="簡易表示では、プロシージャ単位の線を省き、モジュール同士の関係だけを表示します。プロシージャ数が多く線が混み合う場合でも、全体構造を把握しやすくなります。"
        />
      </section>

      <section className="mb-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 p-4">
          <h2 className="mb-2 text-lg font-bold text-gray-900">詳細表示で処理を追う</h2>
          <p className="text-sm leading-7 text-gray-700">
            プロシージャ同士の線を見れば、修正したい処理がどの処理から呼ばれ、どの処理へつながっているかを追いやすくなります。
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 p-4">
          <h2 className="mb-2 text-lg font-bold text-gray-900">簡易表示で全体を見る</h2>
          <p className="text-sm leading-7 text-gray-700">
            プロシージャ数が多いプロジェクトでは、線が増えすぎることがあります。簡易表示なら、モジュール間の大まかな依存を先に把握できます。
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 p-4">
          <h2 className="mb-2 text-lg font-bold text-gray-900">整理候補を見つける</h2>
          <p className="text-sm leading-7 text-gray-700">
            依存が集中しているモジュールや、役割が混ざっているモジュールを見つけることで、保守前の確認や分割方針の検討に使えます。
          </p>
        </div>
      </section>
    </div>
  );
}
