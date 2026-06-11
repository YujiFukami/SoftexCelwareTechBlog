import { categoryLabels, getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import ArticleUpdateCalendar from "@/components/ArticleUpdateCalendar";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "記事一覧",
  description: "Excel VBA・GAS・Next.jsの開発テクニック記事一覧",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">記事一覧</h1>
      <section className="mb-8 border-y border-blue-100 bg-blue-50/60 px-5 py-5">
        <p className="text-xs font-medium text-blue-600">Excel VBA Parts</p>
        <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Excel VBA 部品集</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              再利用できる汎用プロシージャ・関数を、目的別に検索できます。
            </p>
          </div>
          <Link
            href="/vba-parts"
            className="shrink-0 rounded bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
          >
            部品を探す
          </Link>
        </div>
      </section>
      <ArticleUpdateCalendar articles={articles} categoryLabels={categoryLabels} />
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
