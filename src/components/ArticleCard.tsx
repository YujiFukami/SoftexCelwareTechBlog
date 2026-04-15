import Link from "next/link";
import { categoryLabels, type ArticleMeta } from "@/lib/articles";

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/articles/${article.category}/${article.slug}`}
      className="block border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
          {categoryLabels[article.category] || article.category}
        </span>
        <span className="text-xs text-gray-400">{article.date}</span>
      </div>
      <h3 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2">
        {article.title}
      </h3>
      <p className="text-sm text-gray-500 line-clamp-2">
        {article.description}
      </p>
      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
