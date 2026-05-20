import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCases, getCaseBySlug } from "@/lib/cases";
import { DEFAULT_OG_IMAGE, SITE_NAME, TWITTER_CARD } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

const visibilityLabels = {
  public: "公開事例",
  limited: "一部公開",
  anonymous: "匿名事例",
};

export function generateStaticParams() {
  return getAllCases().map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseBySlug(slug);
  if (!caseStudy) return {};
  const image = caseStudy.ogImage
    ? {
        url: caseStudy.ogImage,
        width: 1731,
        height: 909,
        alt: caseStudy.title,
      }
    : DEFAULT_OG_IMAGE;

  return {
    title: `${caseStudy.title} | 開発事例`,
    description: caseStudy.summary,
    openGraph: {
      title: `${caseStudy.title} | 開発事例`,
      description: caseStudy.summary,
      type: "article",
      siteName: SITE_NAME,
      url: `/cases/${slug}`,
      images: [image],
    },
    twitter: {
      card: TWITTER_CARD,
      title: caseStudy.title,
      description: caseStudy.summary,
      images: [image.url],
    },
  };
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = getCaseBySlug(slug);
  if (!caseStudy) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/cases" className="hover:text-blue-600">
          開発事例
        </Link>
      </nav>

      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
            {caseStudy.category}
          </span>
          <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
            {visibilityLabels[caseStudy.visibility]}
          </span>
        </div>
        <h1 className="mb-3 text-3xl font-bold text-gray-900">
          {caseStudy.title}
        </h1>
        <p className="mb-4 text-lg font-medium text-gray-600">
          {caseStudy.subtitle}
        </p>
        <p className="text-base leading-8 text-gray-700">{caseStudy.summary}</p>
      </header>

      <div className="mb-8 flex flex-wrap gap-3">
        {caseStudy.projectUrl && (
          <a
            href={caseStudy.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            アプリを見る
          </a>
        )}
        {caseStudy.githubUrl && (
          <a
            href={caseStudy.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            GitHubを見る
          </a>
        )}
        {caseStudy.externalArticleUrl && (
          <a
            href={caseStudy.externalArticleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            解説記事を見る
          </a>
        )}
      </div>

      <article className="space-y-8">
        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900">概要</h2>
          <div className="space-y-3 text-sm leading-7 text-gray-700">
            {caseStudy.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900">使用技術</h2>
          <div className="flex flex-wrap gap-2">
            {caseStudy.stack.map((item) => (
              <span
                key={item}
                className="rounded bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900">
            実装・設計のポイント
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-gray-700">
            {caseStudy.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>

        {caseStudy.images && caseStudy.images.length > 0 && (
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              画面・出力イメージ
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {caseStudy.images.map((image) => (
                <figure
                  key={image.src}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-auto w-full"
                  />
                  <figcaption className="border-t border-gray-100 px-4 py-3 text-sm leading-6 text-gray-600">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900">
            関連する技術記事
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {caseStudy.relatedArticles.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="block rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:bg-blue-50/40"
              >
                <span className="mb-2 inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  {article.category}
                </span>
                <div className="text-sm font-semibold leading-6 text-gray-900">
                  {article.title}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-blue-100 bg-blue-50 p-5">
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            同様の業務アプリ開発について
          </h2>
          <p className="mb-4 text-sm leading-7 text-gray-700">
            現場ごとの入力項目、帳票レイアウト、保存先フォルダ、承認フローに合わせた
            GAS・Webアプリ・Excel VBAの業務改善ツール開発に対応しています。
          </p>
          <a
            href="https://www.softex-celware.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            相談する
          </a>
        </section>
      </article>
    </div>
  );
}
