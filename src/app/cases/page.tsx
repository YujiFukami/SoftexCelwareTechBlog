import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
          Excel VBA・GAS・Webアプリなど、現場の業務に合わせて作ったツールを
          紹介しています。動画や画面とともに、できること・業務の流れ・設計の
          ポイントをご覧いただけます。
        </p>
        <p className="mt-3 text-sm text-gray-500">
          全{cases.length}件 / 紹介動画付き {cases.filter((item) => item.video).length}件（公開予定を含む）
        </p>
      </header>

      <section aria-label="開発事例一覧" className="grid items-start gap-6 md:grid-cols-2">
        {cases.map((caseStudy) => (
          <Link
            key={caseStudy.slug}
            href={`/cases/${caseStudy.slug}`}
            className="group block min-w-0 overflow-hidden rounded-lg border border-gray-200 transition-colors hover:border-blue-300 hover:bg-blue-50/40"
          >
            {caseStudy.ogImage && (
              <div className="relative aspect-video bg-gray-50">
                <Image
                  src={caseStudy.ogImage}
                  alt={caseStudy.title}
                  fill
                  sizes="(max-width: 767px) 100vw, 480px"
                  className="object-contain"
                />
                {caseStudy.video && (
                  <span className="absolute bottom-2 right-2 rounded bg-gray-900 px-2 py-1 text-xs font-medium text-white">
                    紹介動画
                  </span>
                )}
              </div>
            )}
            <div className="p-5">
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
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
