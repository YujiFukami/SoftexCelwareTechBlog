import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "記事一覧",
  description: "Excel VBA・GAS・Next.jsの開発テクニック記事一覧",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">記事一覧</h1>
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
    </div>
  );
}
