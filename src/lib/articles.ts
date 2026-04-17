import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface ArticleMeta {
  title: string;
  category: string;
  slug: string;
  tags: string[];
  description: string;
  date: string;
}

export interface Article {
  meta: ArticleMeta;
  content: string;
}

export function getAllArticles(): ArticleMeta[] {
  const categories = fs
    .readdirSync(contentDir)
    .filter((f) => fs.statSync(path.join(contentDir, f)).isDirectory());

  const articles: ArticleMeta[] = [];

  for (const category of categories) {
    const categoryDir = path.join(contentDir, category);
    const files = fs
      .readdirSync(categoryDir)
      .filter((f) => f.endsWith(".mdx"));

    for (const file of files) {
      const raw = fs.readFileSync(path.join(categoryDir, file), "utf-8");
      const { data } = matter(raw);
      articles.push({
        title: data.title,
        category: data.category,
        slug: data.slug,
        tags: data.tags || [],
        description: data.description,
        date: data.date,
      });
    }
  }

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getArticle(category: string, slug: string): Article | null {
  const filePath = path.join(contentDir, category, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: {
      title: data.title,
      category: data.category,
      slug: data.slug,
      tags: data.tags || [],
      description: data.description,
      date: data.date,
    },
    content,
  };
}

export function getCategories(): string[] {
  return fs
    .readdirSync(contentDir)
    .filter((f) => fs.statSync(path.join(contentDir, f)).isDirectory());
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return getAllArticles().filter((a) => a.category === category);
}

export const categoryLabels: Record<string, string> = {
  gas: "Google Apps Script",
  nextjs: "Next.js + Supabase",
  vanillajs: "バニラJS Webアプリ",
  vba: "Excel VBA",
};
