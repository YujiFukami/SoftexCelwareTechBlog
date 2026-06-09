import type { Metadata } from "next";
import Link from "next/link";
import { learningTracks } from "@/lib/learning";

export const metadata: Metadata = {
  title: "体系的に学ぶ",
  description:
    "Excel、Excel VBA、GAS、Webアプリ開発を、基礎から順番に学べる講座ページです。",
};

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-10 max-w-3xl">
        <p className="mb-2 text-sm font-medium text-blue-600">Learning</p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900">体系的に学ぶ</h1>
        <p className="leading-7 text-gray-600">
          個別の技術記事を読む前に、基礎から順番に理解したい方向けの学習ページです。
          各講座から、関連する用語解説、実装記事、公開ツールへ進めます。
        </p>
      </div>

      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-900">学習分野</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {learningTracks.map((track) =>
            track.status === "available" ? (
              <Link
                key={track.slug}
                href={`/learn/${track.slug}`}
                className="rounded border border-blue-200 p-5 transition-colors hover:bg-blue-50"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-gray-900">{track.title}</h3>
                  <span className="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                    学習できます
                  </span>
                </div>
                <p className="text-sm leading-6 text-gray-600">{track.summary}</p>
                <span className="mt-4 inline-block text-sm font-medium text-blue-600">
                  講座を見る &rarr;
                </span>
              </Link>
            ) : (
              <div
                key={track.slug}
                className="rounded border border-gray-200 bg-gray-50 p-5"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-gray-700">{track.title}</h3>
                  <span className="rounded bg-white px-2 py-1 text-xs text-gray-500">
                    準備中
                  </span>
                </div>
                <p className="text-sm leading-6 text-gray-500">{track.summary}</p>
              </div>
            ),
          )}
        </div>
      </section>

      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="mb-3 text-xl font-bold text-gray-900">
          調べたい内容が決まっている場合
        </h2>
        <p className="mb-4 text-sm leading-6 text-gray-600">
          特定の実装方法や専門用語を探す場合は、記事一覧・検索・用語集も利用できます。
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/articles" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            技術記事を見る &rarr;
          </Link>
          <Link href="/search" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            サイト内検索 &rarr;
          </Link>
          <Link href="/terms" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            用語集を見る &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
