import {
  getArticle,
  getAllArticles,
  categoryLabels,
} from "@/lib/articles";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import CTA from "@/components/CTA";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({
    category: a.category,
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) return {};

  return {
    title: article.meta.title,
    description: article.meta.description,
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      type: "article",
      publishedTime: article.meta.date,
      tags: article.meta.tags,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) notFound();

  const { meta, content } = article;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-1">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/articles" className="hover:text-blue-600">
          記事
        </Link>
        <span>/</span>
        <Link
          href={`/articles/${meta.category}`}
          className="hover:text-blue-600"
        >
          {categoryLabels[meta.category] || meta.category}
        </Link>
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
            {categoryLabels[meta.category] || meta.category}
          </span>
          <span className="text-xs text-gray-400">{meta.date}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {meta.title}
        </h1>
        <p className="text-gray-600">{meta.description}</p>
        {meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Article Body */}
      <article className="prose prose-gray prose-headings:text-gray-900 prose-a:text-blue-600 prose-code:text-sm prose-pre:bg-gray-900 prose-pre:text-gray-100 max-w-none">
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              rehypePlugins: [rehypeHighlight, rehypeSlug],
            },
          }}
        />
      </article>

      {/* CTA */}
      <CTA />
    </div>
  );
}
