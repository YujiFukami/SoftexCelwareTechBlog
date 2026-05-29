import type { Metadata } from "next";
import Link from "next/link";

const appUrl = "https://coconala-fee-calculator.vercel.app/";
const githubUrl = "https://github.com/YujiFukami/coconala-fee-calculator";
const coconalaUserUrl = "https://coconala.com/users/737430";
const lpImage = "/tools/coconala-fee-calculator/images/lp.png";

const officialLinks = [
  {
    title: "サービス購入時の消費税の有無について",
    href: "https://coconala-support.zendesk.com/hc/ja/articles/29004583450777",
  },
  {
    title: "サービス手数料について",
    href: "https://coconala-support.zendesk.com/hc/ja/articles/900005462403",
  },
  {
    title: "販売時の手数料について",
    href: "https://coconala-support.zendesk.com/hc/ja/articles/230180287",
  },
];

export const metadata: Metadata = {
  title: "ココナラ見積・手取り・予算逆算ツール",
  description:
    "ココナラ出品者向けの参考計算ツールです。見積額から支払総額と出品者手取りを計算し、予算上限や目標手取りから必要見積額も逆算できます。",
  openGraph: {
    title: "ココナラ見積・手取り・予算逆算ツール",
    description:
      "見積額、購入者支払総額、出品者手取りをかんたん計算。予算上限や目標手取りからの逆算にも対応した参考計算Webアプリです。",
    images: [lpImage],
    type: "website",
    url: "/tools/coconala-fee-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "ココナラ見積・手取り・予算逆算ツール",
    description:
      "ココナラ出品者向けに、見積額・支払総額・手取り・予算逆算をまとめて確認できる参考計算ツールです。",
    images: [lpImage],
  },
};

const features = [
  {
    title: "見積額から計算",
    body: "提示したい見積額を入れると、消費税、購入者サービス手数料、お客様支払総額、販売時手数料、出品者手取りをまとめて確認できます。",
  },
  {
    title: "予算から逆算",
    body: "お客様の支払総額上限から、その範囲内で提示できる最大見積額を円単位で探索します。",
  },
  {
    title: "手取りから逆算",
    body: "最低限確保したい手取り額から、必要な見積額とお客様支払額を逆算します。",
  },
];

const relatedArticles = [
  {
    href: "/articles/vanillajs/pure-function-calculation-logic",
    title: "計算ロジックを純粋関数に分離する設計",
  },
  {
    href: "/articles/vanillajs/binary-search-yen-reverse-calculation",
    title: "円単位の逆算を二分探索で実装する",
  },
  {
    href: "/articles/vanillajs/mobile-number-pad",
    title: "モバイル向け数値入力パッド",
  },
  {
    href: "/articles/vanillajs/tab-state-preserving-ui",
    title: "タブごとに入力状態を保持するUI",
  },
  {
    href: "/articles/vanillajs/responsive-table-to-cards",
    title: "スマホでは表をカード表示に変換するCSS",
  },
];

export default function CoconalaFeeCalculatorPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-blue-600">
          公開ツール
        </Link>
      </nav>

      <header className="mb-10">
        <p className="mb-2 text-sm font-medium text-blue-600">
          ココナラ出品者向け 料金シミュレーター
        </p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          ココナラ見積・手取り・予算逆算ツール
        </h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          ココナラで見積を出すときに、見積額、お客様支払総額、出品者手取りをまとめて確認できる参考計算Webアプリです。
          予算上限から提示可能な見積額を逆算したり、欲しい手取り額から必要見積額を逆算したりできます。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            ツールを使う
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            GitHubを見る
          </a>
          <a
            href={coconalaUserUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-blue-200 px-5 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50"
          >
            ココナラ出品者ページ
          </a>
        </div>
      </header>

      <section className="mb-10">
        <a href={lpImage} target="_blank" rel="noopener noreferrer">
          <img
            src={lpImage}
            alt="ココナラ見積・手取り・予算逆算ツールの機能概要"
            className="h-auto w-full rounded-lg border border-gray-200 shadow-sm"
          />
        </a>
      </section>

      <section className="mb-10 grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-bold text-gray-900">{feature.title}</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              {feature.body}
            </p>
          </div>
        ))}
      </section>

      <section className="mb-10 rounded-lg border border-gray-200 p-6">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          確認できる主な金額
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            "見積額",
            "消費税",
            "購入者サービス手数料",
            "お客様支払総額",
            "販売時手数料",
            "出品者手取り",
          ].map((item) => (
            <div key={item} className="rounded bg-gray-50 px-4 py-3 text-sm text-gray-700">
              {item}
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm leading-7 text-gray-600">
          初期値は通常サービス向けの参考設定として、購入者手数料5.5%、販売時手数料22%、消費税10%を入れています。
          料率や端数処理は画面上で変更できます。
        </p>
      </section>

      <section className="mb-10 rounded-lg border border-blue-100 bg-blue-50 p-6">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          実装・UIの技術記事
        </h2>
        <p className="mb-4 text-sm leading-7 text-gray-700">
          このツールの開発で使った計算ロジック分離、円単位の逆算、スマホ入力、タブ状態保持、表のレスポンシブ表示を個別記事に整理しています。
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {relatedArticles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="rounded bg-white p-4 text-sm font-medium text-blue-700 ring-1 ring-blue-100 hover:bg-blue-50"
            >
              {article.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10 rounded-lg border border-amber-200 bg-amber-50 p-6">
        <h2 className="mb-3 text-xl font-bold text-gray-900">
          注意事項
        </h2>
        <p className="text-sm leading-7 text-gray-700">
          本ツールは、ココナラ公式ヘルプに記載された料率をもとにした参考計算ツールです。
          実際の請求額、売上金額は、ココナラ側の最新仕様、端数処理、有料オプション、おひねり、分割決済などにより、1円単位で差異が出る場合があります。
          最終的な金額は、ココナラの見積画面、購入画面、売上管理画面で必ず確認してください。
        </p>
      </section>

      <section className="rounded-lg border border-gray-200 p-6">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          参考にした公式ヘルプ
        </h2>
        <ul className="space-y-3 text-sm">
          {officialLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
