import type { Metadata } from "next";
import Link from "next/link";
import { KaisoImage, KaisoToolNav } from "@/components/KaisoToolNav";

export const metadata: Metadata = {
  title: "階層化フォームの解析・読み込み",
  description: "階層化フォームでVBAプロジェクトを読み込み、解析に失敗したときの確認ポイントを解説します。",
};

export default function KaisoAnalysisPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link><span>/</span>
        <Link href="/tools" className="hover:text-blue-600">公開ツール</Link><span>/</span>
        <Link href="/tools/kaiso" className="hover:text-blue-600">階層化フォーム</Link>
      </nav>
      <header className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">Analyze</p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">解析・読み込み</h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          階層化フォームは、Excelブックを開いた時点で自動解析するのではなく、読み込み / 更新ボタンで明示的に解析します。ブックを編集した後は再度更新してください。
        </p>
      </header>
      <KaisoToolNav />
      <section className="mb-10 grid gap-4 md:grid-cols-2">
        <KaisoImage src="/tools/kaiso/images/03-04.jpg" alt="読み込み更新ボタン" caption="読み込み / 更新ボタンで、現在開いているVBAプロジェクトを解析します。" />
        <KaisoImage src="/tools/kaiso/images/03-05.jpg" alt="解析完了後の画面" caption="解析後はプロジェクト、モジュール、宣言、プロシージャが各ペインに表示されます。" />
      </section>
      <section className="mb-10 rounded-lg border border-gray-200 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">解析前に確認すること</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-gray-700">
          <li>解析したいExcelブックを開いているか。</li>
          <li>Excelのマクロセキュリティで、VBAプロジェクトへのアクセスを信頼しているか。</li>
          <li>VBE側でコンパイルエラーが残っていないか。</li>
          <li>保護されたプロジェクトやパスワード付きプロジェクトではないか。</li>
        </ul>
      </section>
      <section>
        <h2 className="mb-3 text-xl font-bold text-gray-900">アクセス信頼がOFFの場合</h2>
        <p className="mb-4 text-sm leading-7 text-gray-700">
          VBAプロジェクトへのアクセスが無効だと、アドインからコード構造を読み取れません。インストール手順のセキュリティ設定を確認してください。
        </p>
        <KaisoImage src="/tools/kaiso/images/04-06.jpg" alt="VBAプロジェクトアクセス信頼OFFのエラー" caption="この種類のエラーが出た場合は、Excelのマクロセキュリティ設定を確認します。" />
      </section>
    </div>
  );
}

