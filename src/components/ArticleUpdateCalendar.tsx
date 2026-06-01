"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type DayArticleMap = Record<string, ArticleMeta[]>;

interface ArticleMeta {
  title: string;
  category: string;
  slug: string;
  tags: string[];
  description: string;
  date: string;
  image?: string;
}

const monthNames = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];

const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

function getDateKey(date: string): string {
  return date.slice(0, 10);
}

function formatDateLabel(dateKey: string): string {
  const [year, month, day] = dateKey.split("-");
  return `${year}年${Number(month)}月${Number(day)}日`;
}

function buildDayArticleMap(articles: ArticleMeta[]): DayArticleMap {
  return articles.reduce<DayArticleMap>((acc, article) => {
    const key = getDateKey(article.date);
    if (!acc[key]) acc[key] = [];
    acc[key].push(article);
    return acc;
  }, {});
}

function getYearOptions(articles: ArticleMeta[]): number[] {
  const years = new Set<number>();
  for (const article of articles) {
    const year = Number(getDateKey(article.date).slice(0, 4));
    if (!Number.isNaN(year)) years.add(year);
  }
  return Array.from(years).sort((a, b) => a - b);
}

function getDayClass(count: number): string {
  if (count >= 8) return "border-blue-400 bg-blue-700 text-white";
  if (count >= 5) return "border-blue-300 bg-blue-500 text-white";
  if (count >= 3) return "border-blue-200 bg-blue-100 text-blue-900";
  if (count >= 1) return "border-blue-100 bg-blue-50 text-blue-800";
  return "border-transparent bg-white text-gray-300";
}

function buildMonthCells(year: number, monthIndex: number) {
  const firstDate = new Date(year, monthIndex, 1);
  const lastDate = new Date(year, monthIndex + 1, 0);
  const cells: Array<number | null> = [];

  for (let i = 0; i < firstDate.getDay(); i += 1) {
    cells.push(null);
  }
  for (let day = 1; day <= lastDate.getDate(); day += 1) {
    cells.push(day);
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

export default function ArticleUpdateCalendar({
  articles,
  categoryLabels,
}: {
  articles: ArticleMeta[];
  categoryLabels: Record<string, string>;
}) {
  const dayArticleMap = useMemo(() => buildDayArticleMap(articles), [articles]);
  const years = useMemo(() => getYearOptions(articles), [articles]);
  const latestYear = years[years.length - 1] ?? new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(latestYear);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const selectedArticles = selectedDate ? dayArticleMap[selectedDate] ?? [] : [];
  const minYear = years[0] ?? selectedYear;
  const maxYear = years[years.length - 1] ?? selectedYear;
  const yearArticleCount = articles.filter(
    (article) => Number(getDateKey(article.date).slice(0, 4)) === selectedYear
  ).length;
  const activeDays = Object.keys(dayArticleMap).filter((dateKey) =>
    dateKey.startsWith(`${selectedYear}-`)
  ).length;

  if (articles.length === 0) return null;

  return (
    <section className="mb-8 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            Update Calendar
          </p>
          <h2 className="mt-1 text-xl font-bold text-gray-900">
            記事更新カレンダー
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            日付ごとの記事公開数を年単位で確認できます。件数のある日を選ぶと、下に記事一覧を表示します。
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setSelectedDate(null);
              setSelectedYear((year) => Math.max(minYear, year - 1));
            }}
            disabled={selectedYear <= minYear}
            className="rounded border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            前年
          </button>
          <div className="min-w-24 rounded border border-gray-200 bg-gray-50 px-4 py-2 text-center text-sm font-semibold text-gray-900">
            {selectedYear}年
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedDate(null);
              setSelectedYear((year) => Math.min(maxYear, year + 1));
            }}
            disabled={selectedYear >= maxYear}
            className="rounded border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            翌年
          </button>
        </div>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded border border-gray-100 bg-gray-50 px-3 py-2">
          <p className="text-xs text-gray-500">この年の記事数</p>
          <p className="text-lg font-bold text-gray-900">{yearArticleCount}件</p>
        </div>
        <div className="rounded border border-gray-100 bg-gray-50 px-3 py-2">
          <p className="text-xs text-gray-500">更新がある日数</p>
          <p className="text-lg font-bold text-gray-900">{activeDays}日</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {monthNames.map((monthName, monthIndex) => (
          <div key={monthName} className="rounded border border-gray-100 p-3">
            <h3 className="mb-2 text-sm font-semibold text-gray-800">
              {monthName}
            </h3>
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-gray-400">
              {weekDays.map((day) => (
                <div key={day} className="py-1 font-medium">
                  {day}
                </div>
              ))}
              {buildMonthCells(selectedYear, monthIndex).map((day, index) => {
                if (day === null) {
                  return <div key={`blank-${index}`} className="h-10" />;
                }

                const dateKey = `${selectedYear}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const count = dayArticleMap[dateKey]?.length ?? 0;
                const isSelected = selectedDate === dateKey;

                return (
                  <button
                    key={dateKey}
                    type="button"
                    onClick={() => setSelectedDate(count > 0 ? dateKey : null)}
                    disabled={count === 0}
                    title={
                      count > 0
                        ? `${formatDateLabel(dateKey)}: ${count}件`
                        : `${formatDateLabel(dateKey)}: 記事なし`
                    }
                    className={`h-10 rounded border text-xs transition ${getDayClass(count)} ${
                      isSelected ? "ring-2 ring-blue-500 ring-offset-1" : ""
                    } ${count > 0 ? "hover:scale-[1.02] hover:shadow-sm" : "cursor-default"}`}
                  >
                    <span className="block leading-none">{day}</span>
                    {count > 0 && (
                      <span className="mt-1 block text-[10px] leading-none">
                        {count}件
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded border border-gray-100 bg-gray-50 p-4">
        {selectedDate ? (
          <>
            <h3 className="text-sm font-bold text-gray-900">
              {formatDateLabel(selectedDate)}の記事
            </h3>
            <div className="mt-3 grid gap-2">
              {selectedArticles.map((article) => (
                <Link
                  key={`${article.category}-${article.slug}`}
                  href={`/articles/${article.category}/${article.slug}`}
                  className="rounded border border-gray-200 bg-white p-3 transition hover:border-blue-300 hover:shadow-sm"
                >
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                      {categoryLabels[article.category] || article.category}
                    </span>
                    <span className="text-xs text-gray-400">{article.date}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {article.title}
                  </p>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-600">
            件数が表示されている日付を選択すると、その日の記事を確認できます。
          </p>
        )}
      </div>
    </section>
  );
}
