import { getAllArticles, categoryLabels, getCategories } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const articles = getAllArticles();
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Hero Section */}
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
            href="/knowledge-flow"
            className="inline-flex justify-center rounded border border-blue-200 px-5 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors"
          >
            知識資産化の仕組みを見る
          </Link>
        </div>
      </section>

      {/* Category Links */}
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

      {/* Knowledge Flow */}
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
              その一部を、初めて読む方にも分かる技術記事として公開しています。
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

      {/* Latest Articles */}
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
