import type { Metadata } from "next";
import Link from "next/link";
import { KaisoImage, KaisoToolNav } from "@/components/KaisoToolNav";

export const metadata: Metadata = {
  title: "階層化フォームの表示設定とカスタマイズ",
  description:
    "階層化フォームの色、フォント、テーマ、シンタックスカラーなどの表示設定を変更する方法を解説します。",
};

export default function KaisoCustomizePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link><span>/</span>
        <Link href="/tools" className="hover:text-blue-600">公開ツール</Link><span>/</span>
        <Link href="/tools/kaiso" className="hover:text-blue-600">階層化フォーム</Link>
      </nav>
      <header className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">Customize</p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">表示設定とカスタマイズ</h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          階層化フォームは、長時間コードを読む前提のツールです。テーマ、フォント、シンタックスカラー、各ペインの配色を調整して、
          自分の作業環境に合わせた見やすい表示にできます。
        </p>
      </header>
      <KaisoToolNav />

      <section className="mb-10 grid gap-6">
        <KaisoImage
          src="/tools/kaiso/images/05-01.jpg"
          alt="階層化フォームの設定画面"
          caption="設定画面からテーマ、フォント、各種表示色をまとめて変更できます。"
        />
        <KaisoImage
          src="/tools/kaiso/images/05-02a.jpg"
          alt="ライトテーマの表示例"
          caption="明るい画面で確認したい場合はライト系の配色にできます。"
        />
        <KaisoImage
          src="/tools/kaiso/images/05-02b.jpg"
          alt="ダークテーマの表示例"
          caption="暗い環境や長時間作業では、ダーク系の配色が見やすい場合があります。"
        />
        <KaisoImage
          src="/tools/kaiso/images/05-03.jpg"
          alt="コード表示色の設定例"
          caption="キーワード、コメント、文字列などの表示色を調整し、コードの読みやすさを上げます。"
        />
      </section>

      <section className="mb-10 rounded-lg border border-gray-200 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">設定できる主な項目</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-gray-700">
          <li>フォーム全体のテーマと背景色。</li>
          <li>コード表示用フォントと文字サイズ。</li>
          <li>キーワード、コメント、文字列などのシンタックスカラー。</li>
          <li>プロジェクト、モジュール、プロシージャなど各ペインの表示色。</li>
          <li>作業中に見失いやすい選択状態や強調表示の色。</li>
        </ul>
      </section>

      <section className="rounded-lg border border-blue-100 bg-blue-50 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">設定変更の考え方</h2>
        <p className="text-sm leading-7 text-gray-700">
          最初は標準設定のまま使い、コード量が多いブックを読むときに「文字が小さい」「コメントが埋もれる」「選択行が見つけにくい」と感じた箇所だけ調整するのがおすすめです。
          表示設定は作業効率に直結するため、見た目よりも読み間違いを減らせるかを基準にします。
        </p>
      </section>
    </div>
  );
}
