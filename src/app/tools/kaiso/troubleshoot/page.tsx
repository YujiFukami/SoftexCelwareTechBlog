import type { Metadata } from "next";
import Link from "next/link";
import { KaisoImage, KaisoToolNav } from "@/components/KaisoToolNav";

export const metadata: Metadata = {
  title: "階層化フォームのFAQとトラブル対応",
  description:
    "階層化フォームを使うときにつまずきやすいインストール、VBAプロジェクトアクセス、解析更新、検索、VBA連携の確認ポイントをまとめます。",
};

const faqs = [
  {
    q: "リボンに階層化フォームのボタンが表示されません。",
    a: "インストール後にExcelを再起動し、アドインが無効化されていないか確認します。初回起動時は発行元や証明書の確認が必要になる場合があります。",
  },
  {
    q: "VBAプロジェクトを読み込めません。",
    a: "Excelのマクロ設定で、VBAプロジェクトオブジェクトモデルへのアクセスが信頼されているか確認します。保護されたブックやパスワード付きプロジェクトでは解析できない場合があります。",
  },
  {
    q: "編集したコードが画面に反映されません。",
    a: "階層化フォームは、明示的に読み込みまたは更新した時点の情報を表示します。VBE側でコードを編集した後は、再読み込みまたは更新を実行してください。",
  },
  {
    q: "検索結果からVBEへ移動できません。",
    a: "対象ブックが開いていること、該当モジュールが削除または名前変更されていないことを確認します。解析後に構成が変わった場合は更新してから検索します。",
  },
  {
    q: "VBA APIの戻り値が取得できません。",
    a: "階層化フォーム側で対象プロジェクトを読み込んでいるか、検索条件が現在の解析結果に一致しているかを確認します。必要に応じてサンプルコードから最小構成で動作確認します。",
  },
];

export default function KaisoTroubleshootPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link><span>/</span>
        <Link href="/tools" className="hover:text-blue-600">公開ツール</Link><span>/</span>
        <Link href="/tools/kaiso" className="hover:text-blue-600">階層化フォーム</Link>
      </nav>
      <header className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">FAQ</p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">FAQとトラブル対応</h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          階層化フォームはExcel、VBE、VSTOアドインをまたいで動くため、環境設定の影響を受けます。
          まずは、よくある確認ポイントから順番に切り分けてください。
        </p>
      </header>
      <KaisoToolNav />

      <section className="mb-10 grid gap-6">
        <KaisoImage
          src="/tools/kaiso/images/04-06.jpg"
          alt="VBAプロジェクトアクセス設定のエラー"
          caption="VBAプロジェクトへのアクセス権限がない場合は、Excelのマクロセキュリティ設定を確認します。"
        />
        <KaisoImage
          src="/tools/kaiso/images/02-10.jpg"
          alt="インストール時の確認画面"
          caption="インストール時や初回起動時は、証明書や発行元の確認が必要になる場合があります。"
        />
      </section>

      <section className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.q} className="rounded-lg border border-gray-200 p-5">
            <h2 className="mb-2 text-lg font-bold text-gray-900">{faq.q}</h2>
            <p className="text-sm leading-7 text-gray-700">{faq.a}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
