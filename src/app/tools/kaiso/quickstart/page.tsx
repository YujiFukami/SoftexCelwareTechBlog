import type { Metadata } from "next";
import Link from "next/link";
import { KaisoImage, KaisoToolNav } from "@/components/KaisoToolNav";

export const metadata: Metadata = {
  title: "階層化フォーム 5分クイックスタート",
  description:
    "階層化フォームを起動し、VBAプロジェクトを解析して、プロシージャ検索と階層ビュー確認まで行う最短手順です。",
};

const steps = [
  "解析したいExcelブックを開く",
  "開発タブから階層化フォームを開く",
  "読み込み / 更新でVBAプロジェクトを解析する",
  "プロジェクト、モジュール、プロシージャを選ぶ",
  "検索で目的の処理を絞り込む",
];

export default function KaisoQuickstartPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-blue-600">公開ツール</Link>
        <span>/</span>
        <Link href="/tools/kaiso" className="hover:text-blue-600">階層化フォーム</Link>
      </nav>

      <header className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">Quick Start</p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          5分クイックスタート
        </h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          インストール後、Excelブックを開いてから、解析結果を確認し、目的のプロシージャを探すまでの最短手順です。
        </p>
      </header>

      <KaisoToolNav />

      <section className="mb-10 rounded-lg border border-blue-100 bg-blue-50 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">流れ</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-7 text-gray-700">
          {steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </section>

      <section className="space-y-10">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">1. 解析対象のブックを開く</h2>
          <p className="mb-4 text-sm leading-7 text-gray-700">
            まず、解析したいVBAコードを含むExcelブックを開きます。VBEを開いておくと、後でジャンプ動作も確認しやすくなります。
          </p>
          <KaisoImage src="/tools/kaiso/images/03-01.jpg" alt="解析対象ブックを開いた状態" caption="解析したいExcelブックとVBEを開いておきます。" />
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">2. 階層化フォームを開く</h2>
          <p className="mb-4 text-sm leading-7 text-gray-700">
            Excelの開発タブから「フォームを開く」を押します。初回起動時は、まだ解析結果が読み込まれていない状態です。
          </p>
          <div className="grid gap-6">
            <KaisoImage src="/tools/kaiso/images/03-02.jpg" alt="フォームを開くボタン" caption="開発タブの階層化フォームグループから起動します。" />
            <KaisoImage src="/tools/kaiso/images/03-03.jpg" alt="階層化フォーム初回起動直後" caption="初回表示では、読み込み前の空のペインが表示されます。" />
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">3. 読み込み / 更新で解析する</h2>
          <p className="mb-4 text-sm leading-7 text-gray-700">
            「読み込み / 更新」を押すと、開いているVBAプロジェクトを解析します。解析後は各ペインにデータが表示されます。
          </p>
          <div className="grid gap-6">
            <KaisoImage src="/tools/kaiso/images/03-04.jpg" alt="読み込み更新ボタン" caption="読み込み / 更新ボタンを押して解析を実行します。" />
            <KaisoImage src="/tools/kaiso/images/03-05.jpg" alt="解析完了後の画面" caption="解析が完了すると、各ペインにプロジェクト情報やコードが表示されます。" />
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">4. 階層とコードを確認する</h2>
          <p className="mb-4 text-sm leading-7 text-gray-700">
            プロジェクト、モジュール、プロシージャを選ぶと、コードと呼び出し階層が連動して表示されます。
            引き継ぎ時に「この処理はどこから呼ばれているか」を把握しやすくなります。
          </p>
          <KaisoImage src="/tools/kaiso/images/03-06.jpg" alt="プロシージャ選択と階層表示" caption="選択したプロシージャに応じて、コードと階層ビューが表示されます。" />
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">5. 検索で目的の処理を探す</h2>
          <p className="mb-4 text-sm leading-7 text-gray-700">
            検索欄にキーワードを入力すると、対象のプロシージャを絞り込めます。コード本文も検索対象に含めると、名前が分からない処理も探しやすくなります。
          </p>
          <KaisoImage src="/tools/kaiso/images/03-08.jpg" alt="検索結果の絞り込み" caption="検索バーとヒット件数を見ながら、目的のプロシージャへ移動できます。" />
        </div>
      </section>
    </div>
  );
}
