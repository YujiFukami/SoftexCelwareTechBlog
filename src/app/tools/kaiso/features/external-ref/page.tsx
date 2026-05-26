import type { Metadata } from "next";
import Link from "next/link";
import { KaisoImage, KaisoToolNav } from "@/components/KaisoToolNav";

export const metadata: Metadata = {
  title: "階層化フォームで外部参照を独立化する",
  description: "外部VBProject参照のプロシージャや宣言メンバーをコピーし、関連ClassやUserFormを取り込んで独立動作させる流れを解説します。",
};

export default function KaisoExternalRefPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link><span>/</span>
        <Link href="/tools" className="hover:text-blue-600">公開ツール</Link><span>/</span>
        <Link href="/tools/kaiso" className="hover:text-blue-600">階層化フォーム</Link>
      </nav>
      <header className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">External Reference</p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">外部参照を独立化する</h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          共通アドインや別ブックのVBProjectを参照している場合、必要なプロシージャや宣言を自ブックへコピーし、関連ClassやUserFormを取り込むことで単独動作に近づけられます。
        </p>
      </header>
      <KaisoToolNav />
      <section className="space-y-10">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">STEP 1: 外部参照一覧を開く</h2>
          <p className="mb-4 text-sm leading-7 text-gray-700">プロジェクトを右クリックし、外部参照プロシージャ・宣言メンバー一覧を開きます。</p>
          <KaisoImage src="/tools/kaiso/images/04-16.jpg" alt="外部参照一覧を開く" caption="外部参照元と対象メンバーを一覧表示し、コピー対象を確認します。" />
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">STEP 2: プロシージャ・宣言をコピーする</h2>
          <p className="mb-4 text-sm leading-7 text-gray-700">全部コピーで必要なコードをクリップボードへ入れ、標準モジュールへ貼り付けます。</p>
          <KaisoImage src="/tools/kaiso/images/04-17.jpg" alt="外部参照コードを全部コピーする" caption="コピーしたコードには元場所コメントが付き、後から由来を確認しやすくなります。" />
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">STEP 3: 関連モジュールを取り込む</h2>
          <p className="mb-4 text-sm leading-7 text-gray-700">ClassやUserFormなど、コードコピーだけでは足りない関連モジュールを取り込みます。</p>
          <KaisoImage src="/tools/kaiso/images/04-18.jpg" alt="関連モジュールを取り込む" caption="取り込み対象を確認し、必要なモジュールをExport / Importします。" />
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">STEP 4: 参照解除とコンパイル確認</h2>
          <p className="mb-4 text-sm leading-7 text-gray-700">VBEの参照設定で外部参照を外し、VBAProjectのコンパイルが通るか確認します。</p>
          <KaisoImage src="/tools/kaiso/images/04-20.jpg" alt="外部参照解除とコンパイル確認" caption="参照を外してもコンパイルが通れば、対象ブックだけで動作できる状態に近づきます。" />
        </div>
      </section>
    </div>
  );
}

