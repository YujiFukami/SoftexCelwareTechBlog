import {
  getArticle,
  getAllArticles,
  categoryLabels,
} from "@/lib/articles";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import CTA from "@/components/CTA";
import CopyCode from "@/components/CopyCode";
import BookmarkletInstall from "@/components/BookmarkletInstall";
import Term from "@/components/Term";
import ZoomableImage from "@/components/ZoomableImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ComponentPropsWithoutRef } from "react";
import { DEFAULT_OG_IMAGE, SITE_NAME, TWITTER_CARD } from "@/lib/seo";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

function MarkdownTable({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-200">
      <table
        {...props}
        className={`my-0 w-full min-w-[560px] border-collapse text-sm ${className}`}
      />
    </div>
  );
}

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
  const image = article.meta.image
    ? {
        url: article.meta.image,
        width: 1731,
        height: 909,
        alt: article.meta.title,
      }
    : DEFAULT_OG_IMAGE;

  return {
    title: article.meta.title,
    description: article.meta.description,
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      type: "article",
      siteName: SITE_NAME,
      url: `/articles/${category}/${slug}`,
      images: [image],
      publishedTime: article.meta.date,
      tags: article.meta.tags,
    },
    twitter: {
      card: TWITTER_CARD,
      title: article.meta.title,
      description: article.meta.description,
      images: [image.url],
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
          components={{
            Term,
            CopyCode,
            BookmarkletInstall,
            img: ZoomableImage,
            table: MarkdownTable,
          }}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeHighlight, rehypeSlug],
            },
          }}
        />
      </article>

      {meta.category === "vba" &&
        (meta.tags.includes("汎用プロシージャ") ||
          meta.slug === "immediate-window-cui-procedure-generator") && (
          <aside className="mt-10 border-y border-blue-100 bg-blue-50/60 px-5 py-5">
            <p className="text-xs font-medium text-blue-600">Excel VBA Parts</p>
            <h2 className="mt-1 text-lg font-bold text-gray-900">
              関連するVBA部品を探す
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              VBA部品集では、汎用プロシージャ・関数を用途別に整理しています。
            </p>
            <Link
              href="/vba-parts"
              className="mt-4 inline-flex rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Excel VBA 部品集へ戻る
            </Link>
          </aside>
        )}

      {/* CTA */}
      <CTA />
    </div>
  );
}
