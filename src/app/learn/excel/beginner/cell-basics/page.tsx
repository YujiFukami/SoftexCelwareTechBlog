import type { Metadata } from "next";
import Link from "next/link";
import LearningLessonNav from "@/components/LearningLessonNav";
import Term from "@/components/Term";
import ZoomableImage from "@/components/ZoomableImage";
import { getLessonNavigation } from "@/lib/learning";

export const metadata: Metadata = {
  title: "Excelのセルには何が入っている？値・書式・入力規則まで解説",
  description:
    "Excelのセルには、値や数式だけでなく、書式設定、条件付き書式、ハイパーリンク、コメント、入力規則、保護設定、名前定義など、さまざまな情報が含まれます。初心者向けに体系的に解説します。",
  openGraph: {
    title: "Excelのセルには何が入っている？値・書式・入力規則まで解説",
    description:
      "Excelのセルに含まれる・関連付く8つの主な情報を、初心者向けに体系的に解説します。",
    images: ["/learn/excel/cell-information-overview.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Excelのセルには何が入っている？",
    description:
      "値・数式、書式設定、条件付き書式、入力規則など、セルに関連する情報を整理します。",
    images: ["/learn/excel/cell-information-overview.png"],
  },
};

const cellInformation = [
  {
    number: 1,
    title: "値・数式",
    termQuery: "Excel数式",
    importance: "基本",
    description:
      "文字、数値、日付などの値や、計算・参照を行う数式です。数式が入ったセルには、画面上では計算結果が表示されます。",
    examples: ["100", "山田太郎", "2026/6/10", "=A1+B1", "=SUM(A1:A10)"],
  },
  {
    number: 2,
    title: "書式設定",
    termQuery: "Excel書式設定",
    importance: "基本",
    description:
      "フォント、文字色、背景色、罫線、表示形式、配置など、セルの見た目に関する設定です。セルの中身と見た目は別物です。",
    examples: ["太字", "赤文字", "¥1,000表示", "中央揃え"],
  },
  {
    number: 3,
    title: "条件付き書式",
    termQuery: "Excel条件付き書式",
    importance: "基本",
    description:
      "セルの値や条件に応じて、見た目を自動で変える設定です。注意すべきデータを目立たせる用途でよく使われます。",
    examples: ["80点以上を緑色", "期限切れを赤色", "重複値を強調"],
  },
  {
    number: 4,
    title: "ハイパーリンク",
    termQuery: "ハイパーリンク",
    importance: "基本",
    description:
      "セルをクリックしたときの移動先です。Webページ、別シート、別ファイルなどへ移動できます。",
    examples: ["詳細ページ", "別シート", "PDF・Wordファイル"],
  },
  {
    number: 5,
    title: "コメント・メモ",
    termQuery: undefined,
    importance: "基本",
    description:
      "セルの値を変えずに、補足説明や確認事項を残すための情報です。共同作業での確認にも利用できます。",
    examples: ["この金額は仮入力です", "担当者に確認中"],
  },
  {
    number: 6,
    title: "入力規則",
    termQuery: "Excel入力規則",
    importance: "基本",
    description:
      "入力できる内容を制限したり、入力時の案内やエラーメッセージを表示したりする設定です。",
    examples: ["ドロップダウン", "1〜100のみ", "10文字以内"],
  },
  {
    number: 7,
    title: "保護設定",
    termQuery: "Excelシート保護",
    importance: "発展",
    description:
      "セルの編集を制限したり、数式を非表示にしたりする設定です。実際の編集制限には、通常シートの保護も必要です。",
    examples: ["セルのロック", "数式の非表示"],
  },
  {
    number: 8,
    title: "名前定義",
    termQuery: "名前付き範囲",
    importance: "発展",
    description:
      "セルやセル範囲に分かりやすい名前を付ける機能です。数式やVBAから範囲を扱いやすくできます。",
    examples: ["A1:A10 → 売上一覧", "=SUM(売上一覧)"],
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
          Excelのセルに含まれる主な情報
        </h1>
        <p className="leading-7 text-gray-600">
          Excelのセルは、単に文字や数字を入れる箱ではありません。
          「中身」「見た目」「条件」「リンク」「補足情報」「入力ルール」など、
          複数の情報をまとめて持つ単位です。
        </p>
      </header>

      <section className="mb-10 rounded border border-blue-200 bg-blue-50 p-5">
        <h2 className="mb-3 text-lg font-bold text-gray-900">今回学ぶこと</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-gray-700">
          <li>セルに見えている内容と、実際に入力されている内容の違い</li>
          <li>値・数式、書式設定、条件付き書式を分けて考える理由</li>
          <li>リンク、コメント、入力規則など、セルに紐づく情報の役割</li>
          <li>実務で使われる保護設定と名前定義の概要</li>
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
        <ZoomableImage
          src="/learn/excel/cell-information-overview.png"
          alt="Excelのセルに含まれる値・数式、書式設定、条件付き書式、ハイパーリンク、コメント・メモ、入力規則、保護設定、名前定義の解説図"
          className="border border-gray-200"
        />
        <p className="mt-3 text-sm leading-6 text-gray-500">
          Excelのセルには、値や数式だけでなく、見た目、条件、リンク、補足情報、
          入力ルールなど、複数の情報が紐づいています。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-5 text-2xl font-bold text-gray-900">
          セルに含まれる8つの主な情報
        </h2>
        <div className="space-y-5">
          {cellInformation.map((item) => (
            <section key={item.number} className="rounded border border-gray-200 p-5">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-sm font-bold text-white">
                  {item.number}
                </span>
                <h3 className="text-xl font-bold text-gray-900">
                  {item.termQuery ? (
                    <Term query={item.termQuery}>{item.title}</Term>
                  ) : (
                    item.title
                  )}
                </h3>
                <span
                  className={
                    item.importance === "基本"
                      ? "rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                      : "rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                  }
                >
                  {item.importance}
                </span>
              </div>
              <p className="text-sm leading-7 text-gray-600">{item.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.examples.map((example) => (
                  <code
                    key={example}
                    className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
                  >
                    {example}
                  </code>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Excelで試してみる</h2>
        <ol className="list-decimal space-y-3 pl-5 leading-7 text-gray-600">
          <li>空のセルへ数値の「1000」を入力します。</li>
          <li>表示形式を通貨へ変更し、「¥1,000」と表示されることを確認します。</li>
          <li>数式バーを確認し、実際の値は「1000」のままであることを確認します。</li>
          <li>条件付き書式を設定し、値に応じて見た目が変わることを確認します。</li>
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
          <div>
            <h3 className="font-bold text-gray-900">入力規則はドロップダウンだけだと思う</h3>
            <p>
              入力規則では、数値・日付・文字数の制限、入力時の案内、
              誤入力時のエラーメッセージも設定できます。
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">セルをロックすれば編集できなくなると思う</h3>
            <p>
              セルのロック設定だけでは編集制限は有効になりません。
              通常はシートの保護と組み合わせて使用します。
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
          <details className="rounded border border-gray-200 p-4">
            <summary className="cursor-pointer font-medium text-gray-900">
              条件付き書式と通常の書式設定は、何が違いますか？
            </summary>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              通常の書式設定は固定の見た目を設定します。条件付き書式は、
              セルの値や条件に応じて見た目を自動で変更します。
            </p>
          </details>
        </div>
      </section>

      <section className="mb-10 rounded border border-gray-200 bg-gray-50 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">
          VBAや自動化を学ぶ前にも重要です
        </h2>
        <p className="text-sm leading-7 text-gray-600">
          Excel VBAでセルを操作するときも、値、数式、書式、入力規則などは別々の情報として扱います。
          セルが持つ情報を区別できると、「値だけを変更する」「書式だけをコピーする」といった処理を
          正しく設計しやすくなります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">まとめ</h2>
        <p className="leading-7 text-gray-600">
          Excelのセルには、文字や数字だけでなく、書式設定、条件付き書式、
          ハイパーリンク、コメント・メモ、入力規則など、さまざまな情報が紐づいています。
          さらに実務では、保護設定や名前定義も重要です。セルを「値を入れる箱」ではなく、
          複数の情報をまとめて持つ単位として考えると、Excelの機能を整理して理解できます。
        </p>
      </section>

      <section className="mb-10 border-t border-gray-200 pt-8">
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
