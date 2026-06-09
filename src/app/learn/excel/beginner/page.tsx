import type { Metadata } from "next";
import Link from "next/link";
import { excelBeginnerCourse } from "@/lib/learning";

export const metadata: Metadata = {
  title: "Excelの基本を仕組みから学ぶ",
  description:
    "セル、値、数式、書式、入力規則など、Excelの土台になる考え方を順番に学ぶ講座です。",
};

export default function ExcelBeginnerCoursePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/learn" className="hover:text-blue-600">学ぶ</Link>
        <span className="mx-2">/</span>
        <Link href="/learn/excel" className="hover:text-blue-600">Excel</Link>
        <span className="mx-2">/</span>
        初心者向け
      </nav>

      <div className="mb-10 max-w-3xl">
        <p className="mb-2 text-sm font-medium text-blue-600">Excel Beginner</p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          {excelBeginnerCourse.title}
        </h1>
        <p className="leading-7 text-gray-600">{excelBeginnerCourse.summary}</p>
        <p className="mt-3 text-sm text-gray-500">
          対象: {excelBeginnerCourse.audience}
        </p>
      </div>

      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-900">レッスン一覧</h2>
        <ol className="divide-y divide-gray-200 border-y border-gray-200">
          {excelBeginnerCourse.lessons.map((lesson) => (
            <li key={lesson.slug}>
              {lesson.status === "available" ? (
                <Link
                  href={`/learn/excel/beginner/${lesson.slug}`}
                  className="grid gap-2 px-2 py-5 transition-colors hover:bg-blue-50 sm:grid-cols-[3rem_1fr_auto] sm:items-center"
                >
                  <span className="text-sm font-medium text-blue-600">
                    {String(lesson.number).padStart(2, "0")}
                  </span>
                  <span>
                    <strong className="block text-gray-900">{lesson.title}</strong>
                    <span className="mt-1 block text-sm text-gray-600">
                      {lesson.summary}
                    </span>
                  </span>
                  <span className="text-sm font-medium text-blue-600">
                    学ぶ &rarr;
                  </span>
                </Link>
              ) : (
                <div className="grid gap-2 px-2 py-5 sm:grid-cols-[3rem_1fr_auto] sm:items-center">
                  <span className="text-sm font-medium text-gray-400">
                    {String(lesson.number).padStart(2, "0")}
                  </span>
                  <span>
                    <strong className="block text-gray-700">{lesson.title}</strong>
                    <span className="mt-1 block text-sm text-gray-500">
                      {lesson.summary}
                    </span>
                  </span>
                  <span className="text-xs text-gray-400">準備中</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
