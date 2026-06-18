import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const rootDir = process.cwd();
export const contentDir = path.join(rootDir, "content");
export const publicDir = path.join(rootDir, "public");
export const termsPath = path.join(rootDir, "src", "lib", "terms.ts");

export function toPosixPath(value) {
  return value.split(path.sep).join("/");
}

export function readUtf8(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

export function getArticleFiles() {
  if (!fs.existsSync(contentDir)) {
    throw new Error(`content directory not found: ${contentDir}`);
  }

  const categories = fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const files = [];
  for (const category of categories) {
    const categoryDir = path.join(contentDir, category);
    for (const entry of fs.readdirSync(categoryDir, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith(".mdx")) {
        files.push(path.join(categoryDir, entry.name));
      }
    }
  }

  return files;
}

export function parseArticle(filePath) {
  const raw = readUtf8(filePath);
  const parsed = matter(raw);
  const categoryFromPath = path.basename(path.dirname(filePath));
  const slugFromPath = path.basename(filePath, ".mdx");
  const meta = {
    title: parsed.data.title ?? "",
    category: parsed.data.category ?? categoryFromPath,
    slug: parsed.data.slug ?? slugFromPath,
    tags: Array.isArray(parsed.data.tags) ? parsed.data.tags : [],
    description: parsed.data.description ?? "",
    date: parsed.data.date ?? "",
    image: parsed.data.image ?? "",
  };

  return {
    filePath,
    raw,
    content: parsed.content,
    meta,
    href: `/articles/${meta.category}/${meta.slug}`,
  };
}

export function resolveArticlePath(input) {
  if (input) {
    const candidate = path.isAbsolute(input)
      ? input
      : path.resolve(rootDir, input);
    if (!fs.existsSync(candidate)) {
      throw new Error(`article file not found: ${candidate}`);
    }
    return candidate;
  }

  const articles = getArticleFiles().map((filePath) => {
    const article = parseArticle(filePath);
    const dateTime = Date.parse(article.meta.date);
    const fallback = fs.statSync(filePath).mtimeMs;
    return {
      filePath,
      sortTime: Number.isNaN(dateTime) ? fallback : dateTime,
    };
  });

  if (articles.length === 0) {
    throw new Error("no article files found");
  }

  articles.sort((a, b) => b.sortTime - a.sortTime);
  return articles[0].filePath;
}

export function getAllArticles() {
  return getArticleFiles().map(parseArticle);
}

export function stripCodeBlocks(text) {
  return text.replace(/```[\s\S]*?```/g, " ");
}

export function stripMdxTags(text) {
  return text.replace(/<[^>]+>/g, " ");
}

export function stripMarkdownLinks(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/\/articles\/[^\s)]+/g, " ")
    .replace(/\/terms\/[^\s)]+/g, " ")
    .replace(/\/tools\/[^\s)]+/g, " ");
}

export function normalizeText(text) {
  return stripMdxTags(stripMarkdownLinks(stripCodeBlocks(text)))
    .replace(/[{}[\]()`*_#>|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractHeadings(content) {
  return [...content.matchAll(/^#{2,4}\s+(.+)$/gm)].map((match) =>
    match[1].trim()
  );
}

export function extractInternalArticleLinks(content) {
  const links = new Set();
  const patterns = [
    /\]\((\/articles\/[^)\s#]+)(?:#[^)]+)?\)/g,
    /href=["'](\/articles\/[^"'\s#]+)(?:#[^"']+)?["']/g,
  ];

  for (const pattern of patterns) {
    for (const match of content.matchAll(pattern)) {
      links.add(match[1]);
    }
  }

  return [...links];
}

export function extractImageRefs(article) {
  const refs = new Set();
  if (article.meta.image) refs.add(article.meta.image);

  for (const match of article.content.matchAll(/<img\s+[^>]*src=["']([^"']+)["']/g)) {
    refs.add(match[1]);
  }

  return [...refs];
}

export function publicPathExists(urlPath) {
  if (!urlPath.startsWith("/")) return true;
  const filePath = path.join(publicDir, urlPath);
  return fs.existsSync(filePath);
}

export function articleHrefExists(href) {
  const match = href.match(/^\/articles\/([^/]+)\/([^/]+)$/);
  if (!match) return true;
  return fs.existsSync(path.join(contentDir, match[1], `${match[2]}.mdx`));
}

export function getLinkedTermTexts(content) {
  return new Set(
    [...content.matchAll(/<Term(?:\s+[^>]*)?>([\s\S]*?)<\/Term>/g)].map(
      (match) => normalizeText(match[1])
    )
  );
}

export function removeLinkedTermBlocks(content) {
  return content.replace(/<Term(?:\s+[^>]*)?>[\s\S]*?<\/Term>/g, " ");
}

export function getTerms() {
  if (!fs.existsSync(termsPath)) return [];

  const source = readUtf8(termsPath);
  const terms = [];
  const termBlockPattern = /\{\s*slug:\s*"([^"]+)"([\s\S]*?)\n\s*\},/g;

  for (const match of source.matchAll(termBlockPattern)) {
    const slug = match[1];
    const block = match[2];
    const title = block.match(/title:\s*"([^"]+)"/)?.[1];
    if (!title) continue;

    const aliasesRaw = block.match(/aliases:\s*\[([\s\S]*?)\]/)?.[1] ?? "";
    const aliases = [...aliasesRaw.matchAll(/"([^"]+)"/g)].map((m) => m[1]);

    terms.push({
      slug,
      title,
      aliases,
      names: [title, ...aliases],
    });
  }

  return terms;
}

export function lineInfo(text, index) {
  const before = text.slice(0, index);
  const line = before.split(/\r?\n/).length;
  const lineStart = before.lastIndexOf("\n") + 1;
  const column = index - lineStart + 1;
  const lineText = text.split(/\r?\n/)[line - 1] ?? "";
  return { line, column, lineText: lineText.trim() };
}

export const sensitivePatterns = [
  {
    label: "Windows path",
    pattern: /[A-Za-z]:\\[^\s)"'<>]+/g,
  },
  {
    label: "Email address",
    pattern: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,
  },
  {
    label: "Phone number",
    pattern: /0\d{1,4}[-\s]?\d{1,4}[-\s]?\d{3,4}/g,
  },
  {
    label: "Money amount",
    pattern: /\d{1,3}(?:,\d{3})+\s*円|\d+\s*万円|\d+\s*円/g,
  },
  {
    label: "Bank/account keyword",
    pattern: /銀行|口座|振込先|支店番号|口座番号/g,
  },
  {
    label: "Personal/customer keyword",
    pattern: /顧客名|個人情報|実データ|案件固有|依頼者名|お客様名/g,
  },
  {
    label: "Known marketplace/source keyword",
    pattern: /ココナラ|見積|請求|納品/g,
  },
];

export function findSensitiveCandidates(text) {
  const results = [];
  for (const item of sensitivePatterns) {
    for (const match of text.matchAll(item.pattern)) {
      const value = match[0];
      const info = lineInfo(text, match.index ?? 0);
      results.push({
        label: item.label,
        value,
        ...info,
      });
    }
  }
  return results;
}
