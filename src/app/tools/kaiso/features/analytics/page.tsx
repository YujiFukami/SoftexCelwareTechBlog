import type { Metadata } from "next";
import Link from "next/link";
import { KaisoImage, KaisoToolNav } from "@/components/KaisoToolNav";

export const metadata: Metadata = {
  title: "階層化フォームの分析機能",
  description:
    "階層化フォームでExcel VBAのブック、プロジェクト、モジュール、プロシージャを分析し、規模や構成を把握する使い方を解説します。",
};

export default function KaisoAnalyticsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link><span>/</span>
        <Link href="/tools" className="hover:text-blue-600">公開ツール</Link><span>/</span>
        <Link href="/tools/kaiso" className="hover:text-blue-600">階層化フォーム</Link>
      </nav>
      <header className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">Analytics</p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">ブック・モジュール・プロシージャの分析</h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          階層化フォームは、コードを探すだけでなく、VBAプロジェクト全体の規模や偏りを確認するための分析画面も備えています。
          大きくなったExcelマクロブックを保守する前に、どのモジュールが大きいか、どのプロシージャが複雑化しているかを把握できます。
        </p>
      </header>
      <KaisoToolNav />

      <section className="mb-10 grid gap-4 md:grid-cols-3">
        <KaisoImage
          src="/tools/kaiso/images/04-22.jpg"
          alt="ブックとプロジェクトの分析画面"
          caption="ブック、VBProject、モジュール数、プロシージャ数など、全体像を先に確認します。"
        />
        <KaisoImage
          src="/tools/kaiso/images/04-23.jpg"
          alt="モジュール分析画面"
          caption="モジュール単位で行数や宣言、プロシージャの分布を確認し、肥大化した箇所を探します。"
        />
        <KaisoImage
          src="/tools/kaiso/images/04-24.jpg"
          alt="プロシージャ分析画面"
          caption="プロシージャ単位で処理量を確認し、分割や整理の候補を見つけます。"
        />
      </section>

      <section className="mb-10 rounded-lg border border-gray-200 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">分析画面で確認するポイント</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-gray-700">
          <li>ブック全体に、どれくらいのモジュールとプロシージャが含まれているか。</li>
          <li>標準モジュール、クラスモジュール、ユーザーフォームのどこに処理が集中しているか。</li>
          <li>特定のモジュールだけが大きくなりすぎていないか。</li>
          <li>長すぎるプロシージャや、責務が広がりすぎた処理がないか。</li>
        </ul>
      </section>

      <section className="rounded-lg border border-blue-100 bg-blue-50 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">リファクタリング前の棚卸しに使う</h2>
        <p className="text-sm leading-7 text-gray-700">
          既存のVBA資産を整理するときは、いきなりコードを書き換えるより、まず分析画面で全体の偏りを見ます。
          「大きすぎるモジュール」「長すぎるプロシージャ」「役割が混ざった処理」を見つけてから分割方針を決めると、変更範囲を絞りやすくなります。
        </p>
      </section>
    </div>
  );
}
