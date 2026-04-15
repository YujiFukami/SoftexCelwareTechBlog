import { getAllArticles, categoryLabels, getCategories } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
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
          実務で培った開発テクニックを、コピペで使えるコード付きで解説。
          <br className="hidden md:block" />
          Excel VBA・GAS・Next.js の実践的なノウハウを発信しています。
        </p>
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
