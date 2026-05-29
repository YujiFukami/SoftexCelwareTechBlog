import { getAllArticles, categoryLabels, getCategories } from "@/lib/articles";
import { getAllCases } from "@/lib/cases";
import ArticleCard from "@/components/ArticleCard";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const articles = getAllArticles();
  const categories = getCategories();
  const cases = getAllCases().slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Softex Celware Tech Blog
        </h1>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          実務開発とAIコーディングで得た知見を、再利用できる開発資産として整理し、
          技術記事として公開しています。
          <br className="hidden md:block" />
          GAS・Next.js・Electron・Python・WPF・VSTOなどの実践ノウハウを発信しています。
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/articles"
            className="inline-flex justify-center rounded bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            記事を読む
          </Link>
          <Link
            href="/cases"
            className="inline-flex justify-center rounded border border-blue-200 px-5 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors"
          >
            開発事例を見る
          </Link>
          <Link
            href="/knowledge-flow"
            className="inline-flex justify-center rounded border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            知識資産化を見る
          </Link>
        </div>
      </section>

      <section className="mb-10">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/articles/${cat}`}
              className="text-sm border border-blue-200 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full transition-colors"
            >
              {categoryLabels[cat] || cat}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12 border-y border-gray-200 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600 mb-2">
              開発ノウハウを次へ残す仕組み
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              実務で得た知見を、再利用できる技術記事へ
            </h2>
            <p className="text-sm leading-7 text-gray-600 mb-5">
              このブログでは、開発中に見つかった課題、実装パターン、注意点、
              再利用判断をMarkdownで整理し、AI開発でも人間の確認でも使いやすい形に残します。
              その一部を、読者にも分かる技術記事として公開しています。
            </p>
            <Link
              href="/knowledge-flow"
              className="inline-flex text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              このブログの作り方を見る &rarr;
            </Link>
          </div>
          <Link href="/knowledge-flow" className="block group">
            <Image
              src="/knowledge-flow.png"
              alt="開発現場から知識資産化、技術記事公開、次の開発への再利用までの流れ"
              width={1792}
              height={1024}
              className="w-full rounded-lg border border-gray-200 shadow-sm transition-shadow group-hover:shadow-md"
            />
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-blue-600 mb-2">Portfolio</p>
            <h2 className="text-2xl font-bold text-gray-900">開発事例</h2>
          </div>
          <Link
            href="/cases"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            すべて見る &rarr;
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {cases.map((caseStudy) => (
            <Link
              key={caseStudy.slug}
              href={`/cases/${caseStudy.slug}`}
              className="block rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:bg-blue-50/40"
            >
              <div className="mb-2 text-xs font-medium text-blue-600">
                {caseStudy.category}
              </div>
              <h3 className="font-semibold text-gray-900">{caseStudy.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                {caseStudy.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12 rounded-lg border border-gray-200 p-5">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-blue-600 mb-2">Tools</p>
            <h2 className="text-2xl font-bold text-gray-900">公開ツール</h2>
          </div>
          <Link
            href="/tools"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            一覧を見る &rarr;
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/tools/kaiso"
            className="block rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:bg-blue-50/40"
          >
            <div className="mb-2 text-xs font-medium text-blue-600">
              Excel VSTOアドイン
            </div>
            <h3 className="font-semibold text-gray-900">
              階層化フォーム (Kaiso)
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Excel VBAプロジェクトのプロシージャ階層、検索、外部参照整理を支援する公開ツールです。
              インストール手順と使い方をまとめています。
            </p>
          </Link>
          <Link
            href="/tools/spline-study"
            className="block rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:bg-blue-50/40"
          >
            <div className="mb-2 text-xs font-medium text-blue-600">
              数値計算学習Webアプリ
            </div>
            <h3 className="font-semibold text-gray-900">
              スプライン補間学習計算ツール
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              通常補間、パラメトリック補間、閉曲線補間の導出過程を、
              式・行列・グラフで確認できる学習用ツールです。
            </p>
          </Link>
          <Link
            href="/tools/coconala-fee-calculator"
            className="block rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:bg-blue-50/40"
          >
            <div className="mb-2 text-xs font-medium text-blue-600">
              料金シミュレーター
            </div>
            <h3 className="font-semibold text-gray-900">
              ココナラ見積・手取り・予算逆算ツール
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              見積額、購入者支払総額、出品者手取りを確認し、予算や手取りから逆算できる参考計算ツールです。
            </p>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">最新の記事</h2>
        {articles.length === 0 ? (
          <p className="text-gray-500 text-sm">記事を準備中です。</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard
                key={`${article.category}-${article.slug}`}
                article={article}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
