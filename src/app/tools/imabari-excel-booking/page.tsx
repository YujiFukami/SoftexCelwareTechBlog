import type { Metadata } from "next";
import Link from "next/link";
import ZoomableImage from "@/components/ZoomableImage";

const appUrl = "https://imabari-excel-yoyaku.vercel.app";
const githubUrl = "https://github.com/YujiFukami/imabari-excel-yoyaku";
const lineUrl = "https://line.me/R/ti/p/%40283qcrpx";
const lpImage =
  "/tools/imabari-excel-booking/images/lp-system-overview.png";
const architectureImage =
  "/tools/imabari-excel-booking/images/system-architecture.png";

export const metadata: Metadata = {
  title: "今治Excel教室 予約管理アプリ",
  description:
    "個別・グループ指導の予約受付、予約枠管理、メール・LINE通知を一元化した、今治Excel教室の予約管理Webアプリです。",
  openGraph: {
    title: "今治Excel教室 予約管理アプリ",
    description:
      "スマホからの予約、講師側の予約管理、メール・LINE通知を一つにまとめた地域密着型の予約管理Webアプリです。",
    type: "website",
    url: "/tools/imabari-excel-booking",
    images: [lpImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "今治Excel教室 予約管理アプリ",
    description:
      "個別・グループ指導の予約受付、予約枠管理、メール・LINE通知を一元化しています。",
    images: [lpImage],
  },
};

const userBenefits = [
  {
    title: "スマホ・PCから簡単予約",
    body: "ログインせずに空き状況を確認し、個別指導またはグループ指導を予約できます。",
  },
  {
    title: "メールとLINEで通知",
    body: "予約受付・確定・キャンセル通知に加え、連携した利用者へ前日リマインドを送信します。",
  },
  {
    title: "予約内容を自分で確認・キャンセル",
    body: "確認メールに記載された専用URLから、ログインせずに予約をキャンセルできます。",
  },
];

const systemFeatures = [
  {
    title: "個別指導の30分予約グリッド",
    body: "向こう1週間の空き枠を確認し、開始・終了時刻を選択します。連続する時間帯と料金をその場で確認できます。",
  },
  {
    title: "グループ指導の残席表示",
    body: "月カレンダーと日程一覧から開催日と残席を確認し、空きのある回へ申し込めます。",
  },
  {
    title: "準備・移動時間を自動確保",
    body: "個別予約の前後30分を「準備中」として自動的に予約不可にし、連続予約による運用負荷を抑えます。",
  },
  {
    title: "予約枠・料金・場所候補を管理",
    body: "講師側の管理画面から、受付枠の追加・繰り返し設定、料金、対面時の場所候補を管理できます。",
  },
  {
    title: "予約ステータスを一覧管理",
    body: "申込、確定、完了、キャンセルを一覧で確認し、ステータス変更に合わせて通知を送ります。",
  },
  {
    title: "Googleスプレッドシート連携",
    body: "予約枠、予約、場所候補、ログ、LINE連携情報を、運営者が確認しやすいスプレッドシートへ保存します。",
  },
];

const bookingSteps = [
  "個別指導またはグループ指導を選ぶ",
  "空き枠から希望日時を選び、時間と料金を確認する",
  "氏名、連絡先、相談内容、受講方法などを入力する",
  "予約完了画面と確認メールで予約番号・内容を確認する",
  "希望者はLINE公式アカウントと連携し、通知を受け取る",
];

const notifications = [
  "予約受付・確定・キャンセルの確認メール",
  "講師グループへの新規予約・キャンセル通知",
  "連携済み利用者への予約受付・確定・キャンセル通知",
  "予約前日のLINEリマインド",
];

const implementationArticles = [
  {
    href: "/articles/design-philosophy/booking-app-line-notification-idea",
    title: "予約管理アプリからLINEで顧客へ通知する仕組み",
    description:
      "メールを基本通知として残しながら、LINE連携と前日リマインドを段階的に追加する設計です。",
  },
  {
    href: "/articles/nextjs/nextjs-gas-spreadsheet-booking-app",
    title: "Next.jsとGASスプレッドシートDBで予約アプリを作る構成",
    description:
      "Next.js、GAS Web API、Googleスプレッドシートの役割分担と、安全な中継構成を解説します。",
  },
  {
    href: "/articles/nextjs/weekly-booking-grid-30-minute-slots",
    title: "30分コマの週グリッド予約UIをNext.jsで実装する",
    description:
      "連続選択、予約済み表示、移動時間バッファ、料金計算を含む予約UIの設計です。",
  },
  {
    href: "/articles/nextjs/hmac-cookie-admin-auth",
    title: "単独管理者向けの軽量HMAC Cookie認証",
    description:
      "管理画面を保護するために採用した、用途を限定した軽量認証の実装方法です。",
  },
  {
    href: "/articles/nextjs/router-refresh-after-mutation",
    title: "mutation後のrouter.refreshで画面が反転する問題",
    description:
      "予約完了後の表示を安定させるために、画面遷移と再描画の責務を整理した記事です。",
  },
  {
    href: "/articles/gas/reservation-number-line-account-linking",
    title: "予約番号送信でLINEアカウントを連携する",
    description:
      "LIFFやLINEログインを使わず、予約番号とLINE userIdを紐づける軽量な設計です。",
  },
  {
    href: "/articles/gas/gas-dopost-line-webhook-app-routing",
    title: "GASのdoPostをLINE WebhookとアプリAPIで分岐する",
    description:
      "1つのGAS WebアプリURLで、予約APIとLINE WebhookのPOSTを処理する方法です。",
  },
  {
    href: "/articles/gas/gas-line-webhook-constraints",
    title: "GASをLINE Webhookに使うときの構成上の制約",
    description:
      "リダイレクト、署名検証、必要に応じた中継サーバーの判断基準を整理します。",
  },
  {
    href: "/articles/gas/gas-log-retention-read-skip-auto-trim",
    title: "GASログの肥大化を防ぐ",
    description:
      "読み取り成功を記録せず、古いログを日次で間引いて運用負荷を抑える方法です。",
  },
  {
    href: "/articles/nextjs/css-grid-minmax-max-width",
    title: "CSS Gridの列幅を可変にし、最大幅で頭打ちにする",
    description:
      "予約グリッドをスマートフォンでは収め、PCでは広がりすぎないように調整します。",
  },
  {
    href: "/articles/nextjs/gas-script-properties-admin-settings",
    title: "設定値をGASスクリプトプロパティと管理画面で運用する",
    description:
      "料金やリマインド時刻をコードへ埋めず、管理画面から安全に更新する設計です。",
  },
];

export default function ImabariExcelBookingToolPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-blue-600">
          公開ツール
        </Link>
      </nav>

      <header className="mb-8">
        <p className="mb-2 text-sm font-medium text-emerald-700">
          予約受付・管理・LINE通知を一つに
        </p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          今治Excel教室 予約管理アプリ
        </h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          今治Excel教室の個別指導・グループ指導を、スマートフォンから予約できるWebアプリです。
          受講者は空き枠を見て申し込み、講師は予約枠・予約状況・通知を一元管理できます。
          メールに加えてLINE公式アカウントとも連携し、予約通知や前日リマインドを届けます。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-800"
          >
            予約アプリを開く
          </a>
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-emerald-300 px-5 py-2.5 text-sm font-medium text-emerald-800 hover:bg-emerald-50"
          >
            LINE公式アカウント
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            GitHubを見る
          </a>
        </div>
      </header>

      <section className="mb-10">
        <ZoomableImage
          src={lpImage}
          alt="今治Excel教室 予約管理アプリの予約画面、管理画面、LINE通知、技術構成"
          className="border border-gray-200"
        />
        <p className="mt-2 text-sm leading-6 text-gray-500">
          画像をクリックすると、予約受付・管理・通知の全体像を大きく確認できます。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          受講者が使いやすい予約体験
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {userBenefits.map((benefit) => (
            <div key={benefit.title} className="rounded-lg border border-gray-200 p-5">
              <h3 className="font-bold text-emerald-800">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-700">{benefit.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 rounded-lg border border-emerald-100 bg-emerald-50 p-6">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">予約の流れ</h2>
        <ol className="space-y-3">
          {bookingSteps.map((step, index) => (
            <li key={step} className="flex gap-3 text-sm leading-7 text-gray-700">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">主な機能</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {systemFeatures.map((feature) => (
            <div key={feature.title} className="rounded-lg border border-gray-200 p-5">
              <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-700">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="mb-3 text-xl font-bold text-gray-900">
            個別指導とグループ指導に対応
          </h2>
          <p className="text-sm leading-7 text-gray-700">
            個別指導では30分単位で連続する空き時間を選択できます。グループ指導では、
            開催日と残席を確認して申し込めます。料金や受講方法は予約画面で確認できます。
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="mb-3 text-xl font-bold text-gray-900">
            管理者向けの一元管理
          </h2>
          <p className="text-sm leading-7 text-gray-700">
            予約枠カレンダー、予約一覧、場所候補、料金、リマインド時刻を管理画面から設定できます。
            予約の変更操作とエラーはログへ記録し、日々の運用を確認しやすくしています。
          </p>
        </div>
      </section>

      <section className="mb-10 rounded-lg border border-green-200 bg-green-50 p-6">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          メール・LINE通知
        </h2>
        <p className="mb-4 text-sm leading-7 text-gray-700">
          メールを基本の予約控えとして残しながら、LINE公式アカウントと連携した受講者へも通知します。
          予約番号をLINEへ送信すると予約情報と連携され、同じメールアドレスでの次回予約にも連携情報を引き継ぎます。
        </p>
        <ul className="grid gap-2 text-sm leading-7 text-gray-700 md:grid-cols-2">
          {notifications.map((notification) => (
            <li key={notification} className="flex gap-2">
              <span className="text-emerald-700">✓</span>
              <span>{notification}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          この公開ツールで利用した実装技術
        </h2>
        <p className="mb-5 max-w-3xl text-sm leading-7 text-gray-700">
          実際の開発で得られた設計判断や実装上の注意点を、再利用できる技術記事として整理しています。
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {implementationArticles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="rounded-lg border border-gray-200 p-5 hover:border-emerald-300 hover:bg-emerald-50/50"
            >
              <h3 className="font-bold text-emerald-800">{article.title}</h3>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                {article.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10 rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h2 className="mb-3 text-xl font-bold text-gray-900">技術構成</h2>
        <p className="text-sm leading-7 text-gray-700">
          画面・入力・管理者認証はNext.js App Router、TypeScript、Tailwind CSSで構築し、
          Vercelで公開しています。GAS Web APIが予約ロジック、メール・LINE通知、
          Googleスプレッドシートへのデータ保存を担当します。APIトークンやLINEトークンは
          ブラウザへ公開せず、サーバー側で管理しています。
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          予約システムの構成図
        </h2>
        <ZoomableImage
          src={architectureImage}
          alt="利用者と講師、Next.js、GAS Web API、Googleスプレッドシート、LINE、メールをつなぐ今治Excel教室予約管理アプリの技術構成図"
          className="border border-gray-200"
        />
        <p className="mt-3 text-sm leading-6 text-gray-500">
          受講者・講師の操作から、予約処理、データ保存、メール・LINE通知までの流れを示しています。
          画像をクリックすると拡大できます。
        </p>
      </section>
    </div>
  );
}
