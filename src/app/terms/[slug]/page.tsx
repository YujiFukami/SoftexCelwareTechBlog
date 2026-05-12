import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllTerms,
  getRelatedTerms,
  getTermBySlug,
} from "@/lib/terms";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllTerms().map((term) => ({ slug: term.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const term = getTermBySlug(slug);
  if (!term) return {};

  return {
    title: `${term.title}とは`,
    description: term.summary,
    openGraph: {
      title: `${term.title}とは`,
      description: term.summary,
      type: "article",
    },
  };
}

export default async function TermDetailPage({ params }: Props) {
  const { slug } = await params;
  const term = getTermBySlug(slug);
  if (!term) notFound();

  const relatedTerms = getRelatedTerms(term);
  const googleQuery = term.googleQuery ?? `${term.title} とは`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/terms" className="hover:text-blue-600">
          用語集
        </Link>
      </nav>

      <header className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
            {term.category}
          </span>
          {term.reading && (
            <span className="text-xs text-gray-500">{term.reading}</span>
          )}
        </div>
        <h1 className="mb-3 text-3xl font-bold text-gray-900">
          {term.title}とは
        </h1>
        <p className="text-lg leading-8 text-gray-700">{term.summary}</p>
      </header>

      <article className="space-y-8">
        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900">簡単にいうと</h2>
          <div className="space-y-3 text-sm leading-7 text-gray-700">
            {term.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900">
            どんな場面で使うか
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-gray-700">
            {term.useCases.map((useCase) => (
              <li key={useCase}>{useCase}</li>
            ))}
          </ul>
        </section>

        {relatedTerms.length > 0 && (
          <section>
            <h2 className="mb-3 text-xl font-bold text-gray-900">関連用語</h2>
            <div className="flex flex-wrap gap-2">
              {relatedTerms.map((related) => (
                <Link
                  key={related.slug}
                  href={`/terms/${related.slug}`}
                  className="rounded bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  {related.title}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900">さらに調べる</h2>
          <div className="space-y-2 text-sm">
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(googleQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-600 hover:text-blue-700"
            >
              Googleで「{googleQuery}」を検索する ↗
            </a>
            {(term.references ?? []).map((reference) => (
              <a
                key={reference.url}
                href={reference.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:text-blue-700"
              >
                {reference.title} ↗
              </a>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
