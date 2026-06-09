import Link from "next/link";
import type { LearningLesson } from "@/lib/learning";

type LearningLessonNavProps = {
  previous?: LearningLesson;
  next?: LearningLesson;
};

function LessonLink({
  lesson,
  direction,
}: {
  lesson?: LearningLesson;
  direction: "previous" | "next";
}) {
  if (!lesson || lesson.status !== "available") {
    return (
      <div className="min-h-20 rounded border border-gray-200 bg-gray-50 p-4 text-sm text-gray-400">
        <span className="block text-xs">
          {direction === "previous" ? "前のレッスン" : "次のレッスン"}
        </span>
        <span className="mt-1 block">準備中</span>
      </div>
    );
  }

  return (
    <Link
      href={`/learn/excel/beginner/${lesson.slug}`}
      className="min-h-20 rounded border border-blue-200 p-4 text-sm text-blue-700 transition-colors hover:bg-blue-50"
    >
      <span className="block text-xs text-gray-500">
        {direction === "previous" ? "前のレッスン" : "次のレッスン"}
      </span>
      <span className="mt-1 block font-medium">{lesson.title}</span>
    </Link>
  );
}

export default function LearningLessonNav({
  previous,
  next,
}: LearningLessonNavProps) {
  return (
    <nav
      aria-label="レッスン移動"
      className="mt-12 grid gap-3 sm:grid-cols-[1fr_auto_1fr]"
    >
      <LessonLink lesson={previous} direction="previous" />
      <Link
        href="/learn/excel/beginner"
        className="flex min-h-20 items-center justify-center rounded border border-gray-200 px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
      >
        講座一覧へ
      </Link>
      <LessonLink lesson={next} direction="next" />
    </nav>
  );
}
