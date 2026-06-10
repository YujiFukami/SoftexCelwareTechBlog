import type { Metadata } from "next";
import Link from "next/link";
import LearningLessonNav from "@/components/LearningLessonNav";
import Term from "@/components/Term";
import ZoomableImage from "@/components/ZoomableImage";
import { getLessonNavigation } from "@/lib/learning";

const lessonImage = "/learn/excel/excel-workbook-sheet-cell.png";

export const metadata: Metadata = {
  title: "Excel・ブック・シート・セルの関係を初心者向けに解説",
  description:
    "Excel、ブック、シート、セルの違いと階層構造、セル番地、セル範囲を初心者向けに整理します。",
  openGraph: {
    title: "Excel・ブック・シート・セルの関係",
    description: "Excelの基本構造を、ブック、シート、セルの順に整理します。",
    images: [lessonImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Excel・ブック・シート・セルの関係",
    description: "Excel初心者向けに、ブック、シート、セルの違いを解説します。",
    images: [lessonImage],
  },
};

const structureExamples = [
  {
    title: "ブック",
    description: "Excelで作成・保存するファイルです。",
    examples: ["売上管理.xlsx", "請求書.xlsx", "顧客一覧.xlsx"],
  },
  {
    title: "シート",
    description: "ブックの中にある作業ページです。目的ごとに分けて使います。",
    examples: ["売上一覧", "商品マスタ", "集計表"],
  },
  {
    title: "セル",
    description: "シート上の1つ1つのマス目で、Excelが情報を扱う基本単位です。",
    examples: ["A1", "B3", "C10"],
  },
];

export default function ExcelWorkbookSheetCellLessonPage() {
  const { previous, next } = getLessonNavigation("excel-workbook-sheet-cell");

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/learn" className="hover:text-blue-600">学ぶ</Link>
        <span className="mx-2">/</span>
        <Link href="/learn/excel" className="hover:text-blue-600">Excel</Link>
        <span className="mx-2">/</span>
        <Link href="/learn/excel/beginner" className="hover:text-blue-600">初心者向け</Link>
      </nav>

      <header className="mb-10 border-b border-gray-200 pb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">Lesson 01</p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Excel・ブック・シート・セルの関係
        </h1>
        <p className="leading-7 text-gray-600">
          <Term>Excel</Term>を使うときは、ファイルを開き、シートを選び、
          セルへ入力しています。この操作の土台になる「Excel → ブック → シート → セル」
          という階層構造を、最初に整理します。
        </p>
      </header>

      <section className="mb-10 rounded border border-blue-200 bg-blue-50 p-5">
        <h2 className="mb-3 text-lg font-bold text-gray-900">今回学ぶこと</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-gray-700">
          <li>Excelというアプリと、ブックというファイルの違い</li>
          <li>ブック、シート、セルの階層関係</li>
          <li>A1やB3などのセル番地の読み方</li>
          <li>A1:C5など、複数セルを示すセル範囲の考え方</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-5 text-2xl font-bold text-gray-900">Excelの階層構造</h2>
        <ZoomableImage
          src={lessonImage}
          alt="Excel、ブック、シート、セル、セルに含まれる情報の階層関係を示す解説図"
          className="border border-gray-200"
        />
        <p className="mt-3 text-sm leading-6 text-gray-500">
          画像をクリックすると拡大できます。まずは「ブックの中にシートがあり、
          シートの中にセルがある」と覚えると整理しやすくなります。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-5 text-2xl font-bold text-gray-900">
          Excelはアプリ、ブックはファイル
        </h2>
        <p className="leading-7 text-gray-600">
          Excelは表計算を行うためのアプリケーションです。一方、普段「Excelファイル」と
          呼んでいるものはブックです。Wordというアプリで文書ファイルを開くのと同じように、
          Excelというアプリでブックを開きます。
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {structureExamples.map((item) => (
            <section key={item.title} className="rounded border border-gray-200 p-5">
              <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-gray-600">{item.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.examples.map((example) => (
                  <code key={example} className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                    {example}
                  </code>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">ブックとシートの関係</h2>
        <p className="leading-7 text-gray-600">
          1つのブックには、複数のシートを入れられます。例えば
          <code className="mx-1 rounded bg-gray-100 px-1">売上管理.xlsx</code>
          の中を「売上一覧」「商品マスタ」「顧客マスタ」「集計表」に分けると、
          入力する場所と集計する場所を整理できます。
        </p>
        <pre className="mt-5 overflow-x-auto rounded bg-gray-950 p-5 text-sm leading-7 text-gray-100">
{`売上管理.xlsx
├─ 売上一覧
├─ 商品マスタ
├─ 顧客マスタ
└─ 集計表`}
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">セル番地の考え方</h2>
        <p className="leading-7 text-gray-600">
          <Term query="Excelセル">セル</Term>は、列と行の交差点で決まります。
          列はA、B、Cのように横方向へ並び、行は1、2、3のように縦方向へ並びます。
          A列と1行目が交わる場所はA1セル、B列と3行目が交わる場所はB3セルです。
        </p>
        <div className="mt-5 rounded border border-gray-200 bg-gray-50 p-5">
          <p className="font-mono text-sm leading-8 text-gray-800">
            A列 × 1行目 = A1セル<br />
            B列 × 3行目 = B3セル<br />
            C列 × 10行目 = C10セル
          </p>
        </div>
        <p className="mt-5 leading-7 text-gray-600">
          <Term query="Excel数式">数式</Term>では、セル番地を使って値の場所を指定します。
          例えば <code className="rounded bg-gray-100 px-2 py-1">=B3+C3</code> は、
          B3セルとC3セルの値を足すという意味です。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">セル範囲の考え方</h2>
        <p className="leading-7 text-gray-600">
          複数のセルをまとめて指定する場合は、左上と右下のセル番地をコロンでつなぎます。
          <code className="mx-1 rounded bg-gray-100 px-2 py-1">A1:C5</code>
          は、A1セルからC5セルまでの四角形の範囲です。
        </p>
        <p className="mt-4 leading-7 text-gray-600">
          例えば <code className="rounded bg-gray-100 px-2 py-1">=SUM(A1:A10)</code> は、
          A1セルからA10セルまでの値を合計します。セル範囲は、関数、表作成、
          書式設定、印刷範囲、VBAなどで繰り返し使います。
        </p>
      </section>

      <section className="mb-10 border-y border-gray-200 py-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">よくある間違い</h2>
        <div className="space-y-5 text-sm leading-7 text-gray-600">
          <div>
            <h3 className="font-bold text-gray-900">Excelとブックを同じものだと思う</h3>
            <p>Excelはアプリ、ブックはExcelで作成・保存するファイルです。</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">シートとブックを混同する</h3>
            <p>シートはブックの中にあります。1つのブックに複数のシートを持てます。</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">A1を入力内容だと思う</h3>
            <p>A1はセルの場所を表す番地です。A1セルに入力されている値とは別です。</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Excelで試してみる</h2>
        <ol className="list-decimal space-y-3 pl-5 leading-7 text-gray-600">
          <li>新しいExcelブックを開き、画面下部のシート名を確認します。</li>
          <li>A1セルとB3セルを順番にクリックし、名前ボックスへ表示される番地を確認します。</li>
          <li>A1セルからC5セルまでドラッグして、複数セルを範囲として選択します。</li>
          <li>A1からA3へ数値を入力し、別のセルで <code>=SUM(A1:A3)</code> を試します。</li>
        </ol>
      </section>

      <section className="mb-10 rounded border border-gray-200 bg-gray-50 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">まとめ</h2>
        <p className="text-sm leading-7 text-gray-600">
          Excelは「ブック → シート → セル」という階層構造で情報を管理しています。
          セル番地とセル範囲を理解すると、数式や関数がどの場所を使っているかを読みやすくなります。
          次のレッスンでは、そのセルに含まれる値、数式、書式、入力規則などを整理します。
        </p>
      </section>

      <LearningLessonNav previous={previous} next={next} />
    </article>
  );
}
