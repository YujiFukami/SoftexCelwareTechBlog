import type { Metadata } from "next";
import Link from "next/link";
import { getAllCases } from "@/lib/cases";

export const metadata: Metadata = {
  title: "開発事例",
  description:
    "Softex Celware Tech Blogで紹介している技術が、どのようなWebアプリ、デスクトップアプリ、業務ツール開発で使われているかをまとめた開発事例一覧です。",
};

const visibilityLabels = {
  public: "公開事例",
  limited: "一部公開",
  anonymous: "匿名事例",
};

export default function CasesPage() {
  const cases = getAllCases();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-10">
        <p className="mb-2 text-sm font-medium text-blue-600">Portfolio</p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          開発事例
        </h1>
        <p className="max-w-3xl text-base leading-7 text-gray-600">
          このTech Blogで紹介している技術記事が、どのようなアプリやツール開発で
          実際に使われているかを整理したページです。各事例ページから、関連する
          技術記事へたどれるようにしていきます。
        </p>
      </header>

      <section className="mb-10 rounded-lg border border-blue-100 bg-blue-50 p-5">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          今後の整理方針
        </h2>
        <p className="text-sm leading-7 text-gray-700">
          まずは開発事例の入口を作り、各事例ページに関連技術記事を紐づけます。
          今後は、技術記事側からも該当する開発事例へ戻れるようにし、実装ノウハウと
          実際の成果物を相互に参照できる構成に拡張していきます。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {cases.map((caseStudy) => (
          <Link
            key={caseStudy.slug}
            href={`/cases/${caseStudy.slug}`}
            className="group block rounded-lg border border-gray-200 p-5 transition-colors hover:border-blue-300 hover:bg-blue-50/40"
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                {caseStudy.category}
              </span>
              <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                {visibilityLabels[caseStudy.visibility]}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-700">
              {caseStudy.title}
            </h2>
            <p className="mt-1 text-sm font-medium text-gray-500">
              {caseStudy.subtitle}
            </p>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              {caseStudy.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {caseStudy.stack.slice(0, 5).map((item) => (
                <span
                  key={item}
                  className="rounded bg-white px-2 py-1 text-xs text-gray-600 ring-1 ring-gray-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
