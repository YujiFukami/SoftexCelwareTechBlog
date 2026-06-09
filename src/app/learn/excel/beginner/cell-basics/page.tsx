import type { Metadata } from "next";
import Link from "next/link";
import LearningLessonNav from "@/components/LearningLessonNav";
import { getLessonNavigation } from "@/lib/learning";

export const metadata: Metadata = {
  title: "セルに保存される情報",
  description:
    "Excelのセルが持つ値、数式、書式、入力規則、コメントなどの情報を初心者向けに整理します。",
};

const informationGroups = [
  {
    label: "セルの内容",
    items: ["値", "数式"],
    description: "計算や集計で直接利用される中心的な情報です。",
  },
  {
    label: "表示の設定",
    items: ["表示形式", "フォント・色", "罫線・配置"],
    description: "内容を変えずに、画面上の見え方を整えます。",
  },
  {
    label: "入力の制御",
    items: ["入力規則", "ドロップダウン"],
    description: "入力できる内容を制限し、入力ミスを減らします。",
  },
  {
    label: "付加情報",
    items: ["コメント・メモ", "ハイパーリンク"],
    description: "値とは別に、補足や移動先をセルへ関連付けます。",
  },
];

export default function CellBasicsLessonPage() {
  const { previous, next } = getLessonNavigation("cell-basics");

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/learn" className="hover:text-blue-600">学ぶ</Link>
        <span className="mx-2">/</span>
        <Link href="/learn/excel" className="hover:text-blue-600">Excel</Link>
        <span className="mx-2">/</span>
        <Link href="/learn/excel/beginner" className="hover:text-blue-600">
          初心者向け
        </Link>
      </nav>

      <header className="mb-10 border-b border-gray-200 pb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">Lesson 02</p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          セルに保存される情報
        </h1>
        <p className="leading-7 text-gray-600">
          Excelのセルには、見えている文字や数字以外にも複数の情報が関連付いています。
          まずは「内容」「表示」「入力制御」「付加情報」に分けて考えましょう。
        </p>
      </header>

      <section className="mb-10 rounded border border-blue-200 bg-blue-50 p-5">
        <h2 className="mb-3 text-lg font-bold text-gray-900">今回学ぶこと</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-gray-700">
          <li>セルに見えている内容と、実際に保存されている情報の違い</li>
          <li>値・数式と、書式設定を分けて考える理由</li>
          <li>入力規則やコメントなど、セルに関連付く補助的な情報</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          最初に覚えるポイント
        </h2>
        <p className="leading-7 text-gray-600">
          セルを理解するときは、画面に表示された結果だけを見ないことが重要です。
          例えば、画面に「6月10日」と表示されていても、内部では日付を表す数値が保存され、
          表示形式によって日付らしく見せている場合があります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-5 text-2xl font-bold text-gray-900">セル情報の全体像</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {informationGroups.map((group) => (
            <div key={group.label} className="rounded border border-gray-200 p-5">
              <h3 className="mb-3 text-lg font-bold text-gray-900">{group.label}</h3>
              <div className="mb-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-sm leading-6 text-gray-600">{group.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Excelで試してみる</h2>
        <ol className="list-decimal space-y-3 pl-5 leading-7 text-gray-600">
          <li>空のセルへ数値の「1000」を入力します。</li>
          <li>セルの表示形式を通貨へ変更し、表示だけが変わることを確認します。</li>
          <li>数式バーを確認し、セルの内容は「1000」のままであることを確認します。</li>
          <li>別のセルへ入力規則のリストを設定し、入力できる値を制御します。</li>
        </ol>
      </section>

      <section className="mb-10 border-y border-gray-200 py-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">よくある間違い</h2>
        <div className="space-y-5 text-sm leading-7 text-gray-600">
          <div>
            <h3 className="font-bold text-gray-900">表示されている内容が、そのまま値だと思う</h3>
            <p>
              日付、パーセント、通貨などは、保存された値と表示形式の組み合わせで見え方が決まります。
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">色や罫線も値の一部だと思う</h3>
            <p>
              色や罫線は書式設定です。セルの値を消しても、書式だけが残ることがあります。
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">確認問題</h2>
        <div className="space-y-3">
          <details className="rounded border border-gray-200 p-4">
            <summary className="cursor-pointer font-medium text-gray-900">
              「50%」と表示されたセルには、どのような値が保存されていますか？
            </summary>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              通常は数値の「0.5」が保存され、パーセント表示形式によって「50%」と表示されます。
            </p>
          </details>
          <details className="rounded border border-gray-200 p-4">
            <summary className="cursor-pointer font-medium text-gray-900">
              セルの値を削除したのに背景色が残るのはなぜですか？
            </summary>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              値と書式設定は別の情報だからです。背景色を消すには、書式もクリアする必要があります。
            </p>
          </details>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">次に調べる</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/terms" className="font-medium text-blue-600 hover:text-blue-700">
            用語集で確認する &rarr;
          </Link>
          <Link href="/articles/vba" className="font-medium text-blue-600 hover:text-blue-700">
            Excel VBAの記事を見る &rarr;
          </Link>
          <Link href="/search" className="font-medium text-blue-600 hover:text-blue-700">
            サイト内検索を使う &rarr;
          </Link>
        </div>
      </section>

      <LearningLessonNav previous={previous} next={next} />
    </article>
  );
}
