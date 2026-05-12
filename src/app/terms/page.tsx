import type { Metadata } from "next";
import Link from "next/link";
import { getAllTerms, getTermsByCategory } from "@/lib/terms";

export const metadata: Metadata = {
  title: "技術用語集",
  description:
    "Softex Celware Tech Blogの記事に出てくるIT用語・開発用語を初心者向けに解説する用語集です。",
};

function getIndexLabel(title: string): string {
  const first = title.trim().charAt(0).toUpperCase();
  if (/^[A-Z0-9]$/.test(first)) return first;
  return "日本語";
}

function getIndexId(label: string): string {
  return `index-${label}`;
}

export default function TermsPage() {
  const terms = getAllTerms();
  const byCategory = getTermsByCategory();
  const indexLabels = Array.from(new Set(terms.map((term) => getIndexLabel(term.title)))).sort(
    (a, b) => a.localeCompare(b, "ja")
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-10">
        <p className="text-sm font-medium text-blue-600 mb-2">Glossary</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          技術用語集
        </h1>
        <p className="max-w-3xl text-base leading-7 text-gray-600">
          Softex Celware Tech Blogの記事に出てくるIT用語・開発用語を、
          初心者にも読みやすい短い説明として整理しています。記事内の専門用語リンクから、
          関連記事や公式情報へたどれるようにするためのページです。
        </p>
      </header>

      <section className="mb-8 rounded-lg border border-blue-100 bg-blue-50 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">索引</h2>
        <div className="flex flex-wrap gap-2">
          {indexLabels.map((label) => (
            <a
              key={label}
              href={`#${getIndexId(label)}`}
              className="rounded border border-blue-200 bg-white px-3 py-1.5 text-sm text-blue-700 hover:bg-blue-100"
            >
              {label}
            </a>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">カテゴリ別</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(byCategory).map(([category, categoryTerms]) => (
            <div key={category} className="rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {categoryTerms.map((term) => (
                  <Link
                    key={term.slug}
                    href={`/terms/${term.slug}`}
                    className="rounded bg-gray-100 px-2.5 py-1 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  >
                    {term.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">用語一覧</h2>
        <div className="space-y-8">
          {indexLabels.map((label) => {
            const group = terms.filter((term) => getIndexLabel(term.title) === label);
            return (
              <div key={label} id={getIndexId(label)}>
                <h3 className="border-b border-gray-200 pb-2 text-xl font-bold text-gray-900">
                  {label}
                </h3>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {group.map((term) => (
                    <Link
                      key={term.slug}
                      href={`/terms/${term.slug}`}
                      className="block rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:bg-blue-50/40"
                    >
                      <div className="font-semibold text-gray-900">{term.title}</div>
                      <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                        {term.summary}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
