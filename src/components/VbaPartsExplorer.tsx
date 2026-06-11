"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

interface ArticleMeta {
  title: string;
  category: string;
  slug: string;
  tags: string[];
  description: string;
  date: string;
  image?: string;
}

interface VbaPartArticle extends ArticleMeta {
  partCategory: string;
  procedureType?: string;
  hasSample?: boolean;
}

interface PartCategory {
  id: string;
  label: string;
  description: string;
}

interface VbaPartsExplorerProps {
  articles: VbaPartArticle[];
  categories: PartCategory[];
}

function normalizeSearchTerms(value: string): string[] {
  return value
    .toLocaleLowerCase("ja")
    .replace(/\u3000/g, " ")
    .split(/\s+/)
    .map((term) => term.trim())
    .filter(Boolean);
}

export default function VbaPartsExplorer({
  articles,
  categories,
}: VbaPartsExplorerProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categoryById = useMemo(
    () => new Map(categories.map((category) => [category.id, category])),
    [categories]
  );

  const categoryCounts = useMemo(() => {
    return articles.reduce<Record<string, number>>((counts, article) => {
      counts[article.partCategory] = (counts[article.partCategory] ?? 0) + 1;
      return counts;
    }, {});
  }, [articles]);

  const searchTerms = useMemo(() => normalizeSearchTerms(query), [query]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      if (
        selectedCategory !== "all" &&
        article.partCategory !== selectedCategory
      ) {
        return false;
      }

      if (searchTerms.length === 0) return true;

      const category = categoryById.get(article.partCategory);
      const searchableText = [
        article.title,
        article.description,
        article.tags.join(" "),
        category?.label ?? article.partCategory,
        category?.description ?? "",
        article.procedureType ?? "",
      ]
        .join(" ")
        .toLocaleLowerCase("ja");

      return searchTerms.every((term) => searchableText.includes(term));
    });
  }, [articles, categoryById, searchTerms, selectedCategory]);

  const groupedArticles = useMemo(() => {
    const visibleCategoryIds =
      selectedCategory === "all"
        ? categories.map((category) => category.id)
        : [selectedCategory];

    return visibleCategoryIds
      .map((categoryId) => ({
        category: categoryById.get(categoryId),
        articles: filteredArticles.filter(
          (article) => article.partCategory === categoryId
        ),
      }))
      .filter(
        (
          group
        ): group is {
          category: PartCategory;
          articles: VbaPartArticle[];
        } => Boolean(group.category) && group.articles.length > 0
      );
  }, [categories, categoryById, filteredArticles, selectedCategory]);

  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <label
          htmlFor="vba-parts-search"
          className="block text-sm font-medium text-gray-700"
        >
          VBA部品を検索
        </label>
        <input
          id="vba-parts-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="タイトル、説明、タグから検索"
          autoComplete="off"
          className="mt-2 min-h-11 w-full rounded-md border border-gray-300 px-3 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <div className="mt-4 flex flex-wrap gap-2" aria-label="分類で絞り込む">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            aria-pressed={selectedCategory === "all"}
            className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
              selectedCategory === "all"
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:text-blue-700"
            }`}
          >
            すべて ({articles.length})
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              aria-pressed={selectedCategory === category.id}
              className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
                selectedCategory === category.id
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:text-blue-700"
              }`}
            >
              {category.label} ({categoryCounts[category.id] ?? 0})
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-gray-600">
          該当するVBA部品:{" "}
          <span className="font-semibold text-gray-900">
            {filteredArticles.length}件
          </span>
        </p>
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            検索をクリア
          </button>
        )}
      </div>

      {groupedArticles.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
          <p className="text-sm font-medium text-gray-700">
            条件に一致するVBA部品はありません。
          </p>
          <p className="mt-2 text-sm text-gray-500">
            検索語を短くするか、別の分類を選択してください。
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {groupedArticles.map(({ category, articles: categoryArticles }) => (
            <section key={category.id} aria-labelledby={`category-${category.id}`}>
              <div className="mb-3">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2
                    id={`category-${category.id}`}
                    className="text-lg font-bold text-gray-900"
                  >
                    {category.label}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {categoryArticles.length}件
                  </span>
                </div>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {categoryArticles.map((article) => (
                  <Link
                    key={`${article.category}/${article.slug}`}
                    href={`/articles/${article.category}/${article.slug}`}
                    className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      {article.procedureType && (
                        <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                          {article.procedureType}
                        </span>
                      )}
                      <span className="text-xs text-gray-400">{article.date}</span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {article.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {article.description}
                    </p>
                    {article.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  );
}
