import type { Metadata } from "next";
import Link from "next/link";
import { excelBeginnerCourse } from "@/lib/learning";

export const metadata: Metadata = {
  title: "Excelを体系的に学ぶ",
  description: "Excelの基本構造から実務で使う機能まで、順番に学べる講座です。",
};

export default function ExcelLearningPage() {
  const availableCount = excelBeginnerCourse.lessons.filter(
    (lesson) => lesson.status === "available",
  ).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/learn" className="hover:text-blue-600">学ぶ</Link>
        <span className="mx-2">/</span>
        Excel
      </nav>

      <div className="mb-10 max-w-3xl">
        <p className="mb-2 text-sm font-medium text-blue-600">Excel Learning</p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Excelを仕組みから学ぶ
        </h1>
        <p className="leading-7 text-gray-600">
          操作手順だけでなく、Excelがどのような情報を持ち、どの機能がどこで働くのかを整理します。
          基礎を理解したうえで、関数、VBA、自動化へ進むための学習入口です。
        </p>
      </div>

      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-900">講座一覧</h2>
        <Link
          href="/learn/excel/beginner"
          className="block rounded border border-blue-200 p-5 transition-colors hover:bg-blue-50"
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-bold text-gray-900">
              {excelBeginnerCourse.title}
            </h3>
            <span className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
              {availableCount}/{excelBeginnerCourse.lessons.length} レッスン公開中
            </span>
          </div>
          <p className="text-sm leading-6 text-gray-600">
            {excelBeginnerCourse.summary}
          </p>
          <p className="mt-3 text-xs text-gray-500">
            対象: {excelBeginnerCourse.audience}
          </p>
        </Link>
      </section>

      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="mb-3 text-xl font-bold text-gray-900">関連する実践情報</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/articles/vba" className="font-medium text-blue-600 hover:text-blue-700">
            Excel VBAの記事 &rarr;
          </Link>
          <Link href="/tools/kaiso" className="font-medium text-blue-600 hover:text-blue-700">
            Excel VBA解析ツール &rarr;
          </Link>
          <Link href="/terms" className="font-medium text-blue-600 hover:text-blue-700">
            用語集 &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
