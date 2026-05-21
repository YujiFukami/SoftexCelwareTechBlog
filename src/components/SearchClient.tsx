"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SearchItem, SearchItemType } from "@/lib/search";

const typeLabels: Record<SearchItemType, string> = {
  article: "技術記事",
  term: "用語集",
  case: "開発事例",
};

const typeStyles: Record<SearchItemType, string> = {
  article: "bg-blue-50 text-blue-700",
  term: "bg-emerald-50 text-emerald-700",
  case: "bg-amber-50 text-amber-700",
};

function normalizeQuery(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/　/g, " ")
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function scoreItem(item: SearchItem, terms: string[]): number {
  const title = item.title.toLowerCase();
  const description = item.description.toLowerCase();
  const tags = item.tags.join(" ").toLowerCase();
  const searchText = item.searchText.toLowerCase();

  return terms.reduce((score, term) => {
    if (title.includes(term)) return score + 8;
    if (tags.includes(term)) return score + 5;
    if (description.includes(term)) return score + 4;
    if (searchText.includes(term)) return score + 1;
    return score;
  }, 0);
}

export default function SearchClient({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"all" | SearchItemType>("all");

  const queryTerms = useMemo(() => normalizeQuery(query), [query]);
  const results = useMemo(() => {
    if (queryTerms.length === 0) return items.slice(0, 20);

    return items
      .map((item) => ({ item, score: scoreItem(item, queryTerms) }))
      .filter(({ item, score }) => {
        if (score <= 0) return false;
        return type === "all" || item.type === type;
      })
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, "ja"))
      .slice(0, 80)
      .map(({ item }) => item);
  }, [items, queryTerms, type]);

  const visibleResults =
    queryTerms.length === 0 && type !== "all"
      ? results.filter((item) => item.type === type)
      : results;

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <label htmlFor="site-search" className="block text-sm font-medium text-gray-700">
          サイト内検索
        </label>
        <div className="mt-2 flex flex-col gap-3 md:flex-row">
          <input
            id="site-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例: ZIP PowerShell / GAS PDF / Codex AGENTS.md"
            className="min-h-11 flex-1 rounded-md border border-gray-300 px-3 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            autoComplete="off"
          />
          <select
            value={type}
            onChange={(event) => setType(event.target.value as "all" | SearchItemType)}
            className="min-h-11 rounded-md border border-gray-300 px-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            aria-label="検索対象"
          >
            <option value="all">すべて</option>
            <option value="article">技術記事</option>
            <option value="term">用語集</option>
            <option value="case">開発事例</option>
          </select>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          複数語を空白で区切ると、タイトル、説明、タグ、本文、用語集、開発事例からまとめて探します。
        </p>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-gray-600">
          {queryTerms.length === 0 ? "最近追加された項目" : `検索結果: ${visibleResults.length}件`}
        </p>
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            クリア
          </button>
        )}
      </div>

      {visibleResults.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
          <p className="text-sm font-medium text-gray-700">一致する項目がありません。</p>
          <p className="mt-2 text-sm text-gray-500">
            用語を短くするか、カテゴリ名や技術名だけで検索してください。
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {visibleResults.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded px-2 py-0.5 text-xs font-medium ${typeStyles[item.type]}`}>
                  {typeLabels[item.type]}
                </span>
                <span className="text-xs text-gray-500">{item.category}</span>
              </div>
              <h2 className="mt-2 text-base font-bold text-gray-900">{item.title}</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">{item.description}</p>
              {item.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.tags.slice(0, 6).map((tag) => (
                    <span key={tag} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
