import SearchClient from "@/components/SearchClient";
import { getSearchItems } from "@/lib/search";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "サイト内検索",
  description: "Softex Celware Tech Blog内の記事、用語集、開発事例をまとめて検索できます。",
};

export default function SearchPage() {
  const items = getSearchItems();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">サイト内検索</h1>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          技術記事、用語集、開発事例を横断して検索できます。実装方法を探すときは技術名、考え方を探すときは用語や作業名で検索してください。
        </p>
      </div>
      <SearchClient items={items} />
    </div>
  );
}
