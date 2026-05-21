import { getArticle, getAllArticles, categoryLabels } from "@/lib/articles";
import { getAllCases } from "@/lib/cases";
import { getAllTerms } from "@/lib/terms";

export type SearchItemType = "article" | "term" | "case";

export type SearchItem = {
  id: string;
  type: SearchItemType;
  title: string;
  description: string;
  href: string;
  category: string;
  tags: string[];
  searchText: string;
};

function normalizeText(value: string): string {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[{}[\]()`*_#>|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function excerpt(value: string, maxLength = 180): string {
  const text = normalizeText(value);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

export function getSearchItems(): SearchItem[] {
  const articleItems = getAllArticles().map((article) => {
    const fullArticle = getArticle(article.category, article.slug);
    const body = fullArticle?.content ?? "";
    const category = categoryLabels[article.category] ?? article.category;

    return {
      id: `article:${article.category}:${article.slug}`,
      type: "article" as const,
      title: article.title,
      description: article.description || excerpt(body),
      href: `/articles/${article.category}/${article.slug}`,
      category,
      tags: article.tags,
      searchText: normalizeText(
        [
          article.title,
          article.description,
          category,
          article.tags.join(" "),
          body,
        ].join(" ")
      ),
    };
  });

  const termItems = getAllTerms().map((term) => ({
    id: `term:${term.slug}`,
    type: "term" as const,
    title: term.title,
    description: term.summary,
    href: `/terms/${term.slug}`,
    category: `用語集 / ${term.category}`,
    tags: term.aliases ?? [],
    searchText: normalizeText(
      [
        term.title,
        term.reading,
        term.category,
        term.aliases?.join(" "),
        term.summary,
        term.description.join(" "),
        term.useCases.join(" "),
      ]
        .filter(Boolean)
        .join(" ")
    ),
  }));

  const caseItems = getAllCases().map((caseStudy) => ({
    id: `case:${caseStudy.slug}`,
    type: "case" as const,
    title: caseStudy.title,
    description: caseStudy.summary,
    href: `/cases/${caseStudy.slug}`,
    category: `開発事例 / ${caseStudy.category}`,
    tags: caseStudy.stack,
    searchText: normalizeText(
      [
        caseStudy.title,
        caseStudy.subtitle,
        caseStudy.category,
        caseStudy.summary,
        caseStudy.description.join(" "),
        caseStudy.stack.join(" "),
        caseStudy.highlights.join(" "),
      ].join(" ")
    ),
  }));

  return [...articleItems, ...termItems, ...caseItems];
}
