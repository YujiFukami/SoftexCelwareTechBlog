import type { Metadata } from "next";
import Link from "next/link";
import { KaisoToolNav } from "@/components/KaisoToolNav";
import CopyCode from "@/components/CopyCode";

export const metadata: Metadata = {
  title: "階層化フォームをVBAから呼び出す方法",
  description:
    "階層化フォームのAutomation APIをVBAから呼び出し、検索、再解析、外部参照整理を自分のマクロに組み込む方法です。",
};

const apiRows = [
  ["Reanalyze()", "読み込み / 更新相当の再解析を実行"],
  ["ShowWindow()", "階層化フォームのウィンドウを表示"],
  ["ShowWindowAndLoad()", "表示してから再解析"],
  ["HideWindow()", "ウィンドウを隠す"],
  ["SearchProcedures(query, includeBody)", "プロシージャを検索"],
  ["SearchDeclarations(query)", "宣言メンバーを検索"],
  ["SearchAll(query, includeBody)", "プロシージャと宣言メンバーをまとめて検索"],
  ["GetExternalReferenceCopyText(targetProject)", "外部参照コードをコピー用文字列として取得"],
  ["ImportRelatedFormClassModules(targetProject)", "関連Class / UserFormモジュールを取り込み"],
];

export default function KaisoVbaApiPage() {
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
        <p className="mb-2 text-sm font-medium text-blue-600">Automation API</p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          VBAから階層化フォームを呼び出す
        </h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          階層化フォームは、Excelのリボン操作だけでなく、VBA側からAutomation APIとして呼び出すこともできます。
          イミディエイトウィンドウで即席検索したり、自分のマクロに検索・再解析・外部参照整理を組み込めます。
        </p>
      </header>

      <KaisoToolNav />

      <section className="mb-10 rounded-lg border border-blue-100 bg-blue-50 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">サンプルコード</h2>
        <p className="mb-4 text-sm leading-7 text-gray-700">
          次のサンプル `.bas` をVBEへインポートすると、`?ks("検索語")` のような短い呼び出しで検索できます。
        </p>
        <a
          href="/downloads/tools/kaiso/IkiKaiso_VBA_Sample.bas"
          download
          className="inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          IkiKaiso_VBA_Sample.bas をダウンロード
        </a>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-bold text-gray-900">使い始め方</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-7 text-gray-700">
          <li>VBEで「ファイル」から `IkiKaiso_VBA_Sample.bas` をインポートします。</li>
          <li>イミディエイトウィンドウを開きます。</li>
          <li>`?ks("ArrayCopy")` のように入力して検索を試します。</li>
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-bold text-gray-900">よく使うラッパー</h2>
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 font-semibold">呼び出し</th>
                <th className="px-4 py-3 font-semibold">用途</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="px-4 py-3 font-mono">?ks("検索語")</td><td className="px-4 py-3">プロシージャを本文込みで検索</td></tr>
              <tr><td className="px-4 py-3 font-mono">?ks("検索語", False)</td><td className="px-4 py-3">プロシージャ名のみ検索</td></tr>
              <tr><td className="px-4 py-3 font-mono">?ksd("検索語")</td><td className="px-4 py-3">宣言メンバーを検索</td></tr>
              <tr><td className="px-4 py-3 font-mono">?ksa("検索語")</td><td className="px-4 py-3">プロシージャと宣言メンバーをまとめて検索</td></tr>
              <tr><td className="px-4 py-3 font-mono">OpenKaiso</td><td className="px-4 py-3">アドインウィンドウを開いて再解析</td></tr>
              <tr><td className="px-4 py-3 font-mono">TidyExternalReferences</td><td className="px-4 py-3">外部参照を一括コピーし、関連Class / Formを取り込み</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-bold text-gray-900">公開メソッド</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {apiRows.map(([name, description]) => (
            <div key={name} className="rounded-lg border border-gray-200 p-4">
              <div className="mb-2 font-mono text-sm font-semibold text-gray-900">
                {name}
              </div>
              <p className="text-sm leading-6 text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-bold text-gray-900">ショートカット割り当て例</h2>
        <p className="mb-4 text-sm leading-7 text-gray-700">
          ブックの `ThisWorkbook` に次のように書くと、Ctrl+Shift+Kで階層化フォームを開けます。
        </p>
        <CopyCode
          filename="ThisWorkbook"
          language="vba"
          code={`Private Sub Workbook_Open()
    Application.OnKey "^+k", "'OpenKaiso'"
End Sub`}
        />
      </section>
    </div>
  );
}

