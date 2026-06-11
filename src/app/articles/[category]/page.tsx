import {
  getArticlesByCategory,
  getCategories,
  categoryLabels,
} from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return getCategories().map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = categoryLabels[category] || category;
  return {
    title: `${label} の記事一覧`,
    description: `${label}に関する開発テクニック・ノウハウ記事の一覧`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const categories = getCategories();
  if (!categories.includes(category)) notFound();

  const articles = getArticlesByCategory(category);
  const label = categoryLabels[category] || category;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {label} の記事一覧
      </h1>
      {category === "vba" && (
        <section className="mb-8 border-y border-blue-100 bg-blue-50/60 px-5 py-5">
          <p className="text-xs font-medium text-blue-600">Excel VBA Parts</p>
          <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">VBA部品集から目的別に探す</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                汎用プロシージャ・関数を、配列、セル操作、入力支援、図形、開発支援などの用途別に整理しています。
              </p>
            </div>
            <Link
              href="/vba-parts"
              className="shrink-0 rounded bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
            >
              VBA部品集を見る
            </Link>
          </div>
        </section>
      )}
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
