import type { Metadata } from "next";
import Link from "next/link";

const appUrl = "https://imabari-excel-yoyaku.vercel.app";
const githubUrl = "https://github.com/YujiFukami/imabari-excel-yoyaku";
const lpImage = "/tools/imabari-excel-booking/images/lp.png";

export const metadata: Metadata = {
  title: "今治Excel教室 予約管理アプリ",
  description:
    "今治Excel教室の個別指導・グループ指導を、スマートフォンから空き枠を確認して予約できるWebアプリの紹介ページです。",
  openGraph: {
    title: "今治Excel教室 予約管理アプリ",
    description:
      "30分単位の予約グリッド、料金の即時計算、移動時間バッファ、管理画面を備えた地域密着型の予約Webアプリです。",
    type: "website",
    url: "/tools/imabari-excel-booking",
    images: [lpImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "今治Excel教室 予約管理アプリ",
    description:
      "空き枠を見て、30分単位で選び、スマートフォンから予約できるWebアプリです。",
    images: [lpImage],
  },
};

const features = [
  {
    title: "30分単位の予約グリッド",
    body: "向こう1週間の空き状況を一覧表示し、連続する時間帯を選択できます。スマートフォンでは横スクロールと固定時刻列で確認できます。",
  },
  {
    title: "料金をその場で確認",
    body: "選択したコマ数から合計時間と料金を即時計算します。予約フォームへ進む前に内容を把握できます。",
  },
  {
    title: "準備・移動時間を自動確保",
    body: "予約の前後30分を準備中として自動的に選択不可にし、対面指導や移動を含む運用を支援します。",
  },
  {
    title: "講師側の管理も一元化",
    body: "受付枠の追加、繰り返し設定、予約一覧、ステータス、場所候補を管理画面から確認できます。",
  },
];

const bookingSteps = [
  "週グリッドから予約可能な日時を選ぶ",
  "連続する30分コマを選び、時間と料金を確認する",
  "氏名、連絡先、相談内容、オンライン・対面などを入力する",
  "予約を確定し、届いた確認メールで内容を確認する",
];

const implementationArticles = [
  {
    href: "/articles/design-philosophy/booking-app-line-notification-idea",
    title: "予約管理アプリからLINEで顧客へ通知する仕組みのアイデア",
    description:
      "メール通知を基本に残しながら、希望者へLINE通知と前日リマインドを届ける段階的な構想です。",
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
          地域密着型 予約Webアプリ
        </p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          今治Excel教室 予約管理アプリ
        </h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          今治Excel教室の個別指導・グループ指導を、空き枠から手軽に予約できるWebアプリです。
          スマートフォンで予約可能な時間を確認し、30分単位で選択して申し込めます。
          講師側では受付枠と予約状況を一元管理できます。
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
        <a href={lpImage} target="_blank" rel="noopener noreferrer">
          <img
            src={lpImage}
            alt="今治Excel教室 予約管理アプリの機能と予約の流れ"
            className="h-auto w-full rounded-lg border border-gray-200"
          />
        </a>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          画像をクリックすると、予約の流れと主要機能を大きく確認できます。
        </p>
      </section>

      <section className="mb-10 grid gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-bold text-gray-900">{feature.title}</h2>
            <p className="mt-3 text-sm leading-7 text-gray-700">{feature.body}</p>
          </div>
        ))}
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

      <section className="mb-10 rounded-lg border border-gray-200 p-6">
        <h2 className="mb-3 text-2xl font-bold text-gray-900">
          個別指導とグループ指導
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <h3 className="font-bold text-emerald-800">個別指導</h3>
            <p className="mt-2 text-sm leading-7 text-gray-700">
              1対1でじっくり相談できます。オンライン、教室・指定場所での対面、
              自宅や事務所への訪問など、相談内容に応じた受講方法を予約時に選択できます。
            </p>
          </div>
          <div>
            <h3 className="font-bold text-amber-700">グループ指導</h3>
            <p className="mt-2 text-sm leading-7 text-gray-700">
              少人数でExcelやパソコンの基礎を学ぶ形式です。予約画面では定員と残席を確認できます。
            </p>
          </div>
        </div>
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

      <section className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h2 className="mb-3 text-xl font-bold text-gray-900">技術構成</h2>
        <p className="text-sm leading-7 text-gray-700">
          画面はNext.js App Router、TypeScript、Tailwind CSSで構築し、Vercelで公開しています。
          予約データはGoogleスプレッドシートへ保存し、Google Apps ScriptのWeb APIを経由して操作します。
          小規模な予約管理で、運営者がデータを直接確認・修正しやすい構成です。
        </p>
      </section>
    </div>
  );
}
