import type { Metadata } from "next";
import Link from "next/link";

const appUrl = "https://rakulog-app.vercel.app";
const officialArticleUrl =
  "https://www.softex-celware.com/post/rakulog-task-work-time-management";

export const metadata: Metadata = {
  title: "らくログタスク 使い方ガイド",
  description:
    "出勤、作業切替、退勤、集計、特定作業分析まで行える作業時間管理Webアプリ「らくログタスク」の使い方を、画面例付きで解説します。",
  openGraph: {
    title: "らくログタスク 使い方ガイド",
    description:
      "作業時間を記録し、日別・月別・作業別に見える化するWebアプリ「らくログタスク」の公開解説ページです。",
    images: ["/tools/rakulog-task/images/01-overview.png"],
  },
};

const featureCards = [
  {
    title: "出勤から退勤までを記録",
    body: "出勤、作業開始、作業切替、退勤の流れをWeb画面から記録できます。後で作業時間を集計しやすいよう、作業名単位でログを残します。",
  },
  {
    title: "作業時間を見える化",
    body: "日別、月別、作業別の集計で、どの作業に時間を使っているかを確認できます。カレンダーやグラフで振り返りやすくします。",
  },
  {
    title: "Webアプリなので導入しやすい",
    body: "ブラウザから使えるため、専用ソフトのインストールなしで利用できます。スマートフォンからの記録にも向いています。",
  },
];

const images = [
  { src: "/tools/rakulog-task/images/01-overview.png", alt: "らくログタスクの全体概要", caption: "らくログタスクの全体像。日々の作業時間を記録し、後から集計・分析できるWebアプリです。" },
  { src: "/tools/rakulog-task/images/02-input.png", alt: "作業記録の入力画面", caption: "入力画面では、出勤や作業開始など、日々の記録に必要な操作を行います。" },
  { src: "/tools/rakulog-task/images/03-clock.png", alt: "出勤と退勤の記録", caption: "出勤・退勤のタイミングを記録し、1日の作業ログの起点と終点を残します。" },
  { src: "/tools/rakulog-task/images/04-switch-task.png", alt: "作業切替の記録", caption: "作業が変わったタイミングで作業名を切り替え、どの作業に何時間使ったかを後から確認できるようにします。" },
  { src: "/tools/rakulog-task/images/05-calendar.png", alt: "カレンダー形式の作業時間表示", caption: "カレンダー表示で、日ごとの作業状況や作業時間の分布を確認できます。" },
  { src: "/tools/rakulog-task/images/06-summary.png", alt: "作業時間の集計画面", caption: "集計画面では、期間ごとの作業時間を確認し、振り返りや報告に使いやすくします。" },
  { src: "/tools/rakulog-task/images/07-task-analysis.png", alt: "特定作業の分析画面", caption: "特定の作業だけに絞って、どの日にどれくらい時間を使ったかを確認できます。" },
  { src: "/tools/rakulog-task/images/08-chart.png", alt: "グラフによる作業時間分析", caption: "グラフ表示により、作業時間の偏りや傾向を視覚的に把握できます。" },
  { src: "/tools/rakulog-task/images/09-history.png", alt: "作業履歴の確認と編集", caption: "履歴画面では、過去の記録を確認し、必要に応じて修正できます。" },
  { src: "/tools/rakulog-task/images/10-settings.png", alt: "設定画面", caption: "設定画面では、作業名や表示に関する項目を調整し、自分の使い方に合わせます。" },
  { src: "/tools/rakulog-task/images/11-mobile.png", alt: "スマートフォンでの利用イメージ", caption: "スマートフォンからも記録しやすく、作業開始・終了の入力をその場で行えます。" },
  { src: "/tools/rakulog-task/images/12-share.png", alt: "作業記録の共有や振り返り", caption: "記録した作業時間は、振り返りや作業報告の材料として活用できます。" },
];

const relatedArticles = [
  { title: "Supabase Authでミドルウェア認証を実装する", href: "/articles/nextjs/supabase-auth-middleware" },
  { title: "HEXカラーをRGBAへ変換して動的カラーを適用する", href: "/articles/nextjs/hex-rgba-dynamic-color" },
  { title: "ドロップダウンを外クリックで閉じる", href: "/articles/nextjs/dropdown-outside-click" },
  { title: "トースト通知をライブラリなしで実装する", href: "/articles/nextjs/toast-notification" },
];

function ToolImage({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <a href={src} target="_blank" rel="noopener noreferrer">
        <img src={src} alt={alt} className="h-auto w-full" />
      </a>
      <figcaption className="border-t border-gray-100 px-4 py-3 text-sm leading-6 text-gray-600">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function RakulogTaskToolPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-blue-600">公開ツール</Link>
      </nav>

      <header className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">Web App</p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          らくログタスク
        </h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          らくログタスクは、出勤、作業切替、退勤の記録から、作業時間の集計・分析までを行う作業時間管理Webアプリです。
          日々の作業を細かく記録しておくことで、どの作業に時間を使っているかを後から振り返りやすくします。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={appUrl} target="_blank" rel="noopener noreferrer" className="rounded bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
            アプリを開く
          </a>
          <a href={officialArticleUrl} target="_blank" rel="noopener noreferrer" className="rounded border border-blue-200 px-5 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50">
            公式紹介記事を見る
          </a>
          <Link href="/cases/rakulog-task" className="rounded border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
            開発事例を見る
          </Link>
        </div>
      </header>

      <section className="mb-10 grid gap-4 md:grid-cols-3">
        {featureCards.map((feature) => (
          <div key={feature.title} className="rounded-lg border border-gray-200 p-5">
            <h2 className="mb-2 text-lg font-bold text-gray-900">{feature.title}</h2>
            <p className="text-sm leading-7 text-gray-700">{feature.body}</p>
          </div>
        ))}
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">画面で見る使い方</h2>
        <div className="grid gap-6">
          {images.map((image) => (
            <ToolImage key={image.src} {...image} />
          ))}
        </div>
      </section>

      <section className="mb-10 rounded-lg border border-gray-200 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">このアプリでできること</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-gray-700">
          <li>出勤、作業開始、作業切替、退勤の記録。</li>
          <li>日別、月別、作業別の作業時間集計。</li>
          <li>特定作業に絞った時間分析。</li>
          <li>作業履歴の確認と修正。</li>
          <li>スマートフォンからの作業ログ入力。</li>
        </ul>
      </section>

      <section className="mb-10 rounded-lg border border-blue-100 bg-blue-50 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">開発面で使っている技術</h2>
        <p className="mb-4 text-sm leading-7 text-gray-700">
          らくログタスクは、Next.js、Supabase、Vercelを使って構築しています。
          このテックブログでは、実装時に得られたUI、認証、集計、色管理、通知などのノウハウも個別記事として整理しています。
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {relatedArticles.map((article) => (
            <Link key={article.href} href={article.href} className="rounded bg-white p-4 text-sm font-medium text-blue-700 ring-1 ring-blue-100 hover:bg-blue-50">
              {article.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
