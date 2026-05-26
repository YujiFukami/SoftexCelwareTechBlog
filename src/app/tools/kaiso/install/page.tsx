import type { Metadata } from "next";
import Link from "next/link";
import { KaisoImage, KaisoToolNav } from "@/components/KaisoToolNav";

export const metadata: Metadata = {
  title: "階層化フォームのインストール手順",
  description:
    "VSTOアドイン「階層化フォーム」をインストールするための証明書登録、Excel設定、setup.exe実行、起動確認の手順です。",
};

const requirements = [
  "Windows版 Microsoft Excel",
  "VSTOアドインを利用できるOffice環境",
  "VBAプロジェクトを扱うブック",
  "VBAプロジェクトオブジェクトモデルへのアクセス許可",
];

export default function KaisoInstallPage() {
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
        <p className="mb-2 text-sm font-medium text-blue-600">Install</p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          階層化フォームのインストール手順
        </h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          自己署名証明書の登録、Excelの開発タブ表示、マクロセキュリティ設定、
          setup.exeの実行、起動確認までを順番に進めます。
        </p>
      </header>

      <KaisoToolNav />

      <section className="mb-10 rounded-lg border border-gray-200 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">動作要件</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-gray-700">
          {requirements.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="space-y-10">
        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            STEP 1: 証明書を登録する
          </h2>
          <p className="mb-4 text-sm leading-7 text-gray-700">
            配布ページから `install_cert.cmd` をダウンロードして実行します。
            自己署名証明書を信頼済みに登録してからsetup.exeを実行すると、インストール時の警告を減らせます。
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <KaisoImage src="/tools/kaiso/images/02-01.jpg" alt="証明書登録ファイルのダウンロード" caption="配布ページの証明書登録用ボタンから install_cert.cmd を取得します。" />
            <KaisoImage src="/tools/kaiso/images/02-02.jpg" alt="install_cert.cmd実行時の警告" caption="Windowsの確認画面が出たら、内容を確認して実行します。" />
            <KaisoImage src="/tools/kaiso/images/02-03.jpg" alt="証明書ストア登録の確認" caption="証明書ストアへの登録確認が出たら、信頼して登録します。" />
            <KaisoImage src="/tools/kaiso/images/02-04.jpg" alt="証明書登録完了" caption="コマンドプロンプトで Done. が表示されれば証明書登録は完了です。" />
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            STEP 2: Excelの開発タブを表示する
          </h2>
          <p className="mb-4 text-sm leading-7 text-gray-700">
            開発タブを表示しておくと、階層化フォームの起動ボタンとマクロのセキュリティ設定にアクセスしやすくなります。
          </p>
          <KaisoImage src="/tools/kaiso/images/02-12.jpg" alt="Excelで開発タブを表示する手順" caption="リボンを右クリックし、リボンのユーザー設定から開発タブを有効にします。" />
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            STEP 3: VBAプロジェクトへのアクセスを許可する
          </h2>
          <p className="mb-4 text-sm leading-7 text-gray-700">
            階層化フォームはVBAプロジェクトを解析するため、Excel側で
            「VBA プロジェクト オブジェクト モデルへのアクセスを信頼する」を有効にします。
          </p>
          <KaisoImage src="/tools/kaiso/images/02-10.jpg" alt="マクロのセキュリティ設定" caption="開発タブからマクロのセキュリティを開き、VBAプロジェクトへのアクセスを信頼します。" />
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            STEP 4: setup.exeを実行する
          </h2>
          <p className="mb-4 text-sm leading-7 text-gray-700">
            配布ページからsetup.exeをダウンロードし、SmartScreenの警告が表示された場合は詳細情報から実行します。
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <KaisoImage src="/tools/kaiso/images/02-05.jpg" alt="setup.exeダウンロード" caption="配布ページからsetup.exeをダウンロードします。" />
            <KaisoImage src="/tools/kaiso/images/02-06.jpg" alt="SmartScreen警告への対応" caption="SmartScreen警告が出た場合は、詳細情報を開いて実行します。" />
            <KaisoImage src="/tools/kaiso/images/02-08.jpg" alt="VSTOインストーラー進行中" caption="Officeカスタマイズインストーラーが表示されたら、完了まで待ちます。" />
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            STEP 5: Excelで起動確認する
          </h2>
          <p className="mb-4 text-sm leading-7 text-gray-700">
            Excelを開き、開発タブに「階層化フォーム」グループが表示されていれば導入完了です。
          </p>
          <KaisoImage src="/tools/kaiso/images/02-11.jpg" alt="階層化フォームの起動ボタン" caption="開発タブにフォームを開くボタンが表示されます。" />
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            アンインストール
          </h2>
          <p className="mb-4 text-sm leading-7 text-gray-700">
            本体はWindowsのアプリ一覧から削除できます。証明書を削除したい場合は `uninstall_cert.cmd` を実行します。
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <KaisoImage src="/tools/kaiso/images/02-13.jpg" alt="階層化フォーム本体のアンインストール" caption="Windowsのインストール済みアプリからKaisoを削除します。" />
            <KaisoImage src="/tools/kaiso/images/02-14.jpg" alt="証明書削除コマンドの実行結果" caption="uninstall_cert.cmdで登録済み証明書を削除できます。" />
          </div>
        </div>
      </section>
    </div>
  );
}

