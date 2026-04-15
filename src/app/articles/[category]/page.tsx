import {
  getArticlesByCategory,
  getCategories,
  categoryLabels,
} from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
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
