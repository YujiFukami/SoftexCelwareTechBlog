#!/usr/bin/env node
import path from "node:path";
import {
  extractHeadings,
  extractInternalArticleLinks,
  getAllArticles,
  normalizeText,
  parseArticle,
  resolveArticlePath,
  rootDir,
  toPosixPath,
} from "./shared.mjs";

const articlePath = resolveArticlePath(process.argv[2]);
const target = parseArticle(articlePath);
const existingLinks = new Set(extractInternalArticleLinks(target.content));

const stopWords = new Set([
  "この記事",
  "場合",
  "よう",
  "ため",
  "こと",
  "もの",
  "できます",
  "します",
  "です",
  "ます",
  "する",
  "した",
  "して",
  "から",
  "として",
  "今回",
  "関連",
  "関連記事",
  "関連する技術記事",
  "まとめ",
  "構成",
  "Google",
  "GAS",
  "フォーム",
  "スプレッドシート",
  "Web",
]);

function collectTokens(article) {
  const weighted = new Map();
  const parts = [
    [article.meta.title, 5],
    [article.meta.description, 3],
    [article.meta.category, 4],
    [article.meta.tags.join(" "), 6],
    [extractHeadings(article.content).join(" "), 4],
    [article.content, 1],
  ];

  for (const [text, weight] of parts) {
    const normalized = normalizeText(text);
    const matches = normalized.match(/[A-Za-z0-9.+#-]{2,}|[ぁ-んァ-ヶ一-龠ー]{2,30}/g) ?? [];
    for (const token of matches) {
      if (stopWords.has(token)) continue;
      if (/^\d+$/.test(token)) continue;
      weighted.set(token, (weighted.get(token) ?? 0) + weight);
    }
  }

  return weighted;
}

const targetTokens = collectTokens(target);
const articles = getAllArticles();

const candidates = [];
for (const candidate of articles) {
  if (candidate.filePath === target.filePath) continue;
  if (existingLinks.has(candidate.href)) continue;

  const candidateText = normalizeText(
    [
      candidate.meta.title,
      candidate.meta.description,
      candidate.meta.category,
      candidate.meta.tags.join(" "),
      extractHeadings(candidate.content).join(" "),
    ].join(" ")
  );
  const candidateTextLower = candidateText.toLowerCase();

  let score = 0;
  const reasons = [];

  if (candidate.meta.category === target.meta.category) {
    score += 18;
    reasons.push("same category");
  }

  const sharedTags = candidate.meta.tags.filter((tag) =>
    target.meta.tags.includes(tag)
  );
  if (sharedTags.length > 0) {
    score += sharedTags.length * 12;
    reasons.push(`shared tags: ${sharedTags.join(", ")}`);
  }

  const matchedTokens = [];
  for (const [token, weight] of targetTokens.entries()) {
    if (candidateTextLower.includes(token.toLowerCase())) {
      score += Math.min(weight, 8);
      if (matchedTokens.length < 5) matchedTokens.push(token);
    }
  }
  if (matchedTokens.length > 0) {
    reasons.push(`matched: ${matchedTokens.join(", ")}`);
  }

  if (score > 0) {
    candidates.push({ candidate, score, reasons });
  }
}

candidates.sort((a, b) => b.score - a.score);

console.log("[article:links]");
console.log(`target: ${toPosixPath(path.relative(rootDir, articlePath))}`);
console.log("");

for (const item of candidates.slice(0, 10)) {
  console.log(`score ${item.score}  ${item.candidate.meta.title}`);
  console.log(`  href: ${item.candidate.href}`);
  console.log(`  reason: ${item.reasons.join("; ")}`);
}

if (candidates.length === 0) {
  console.log("No link candidates found.");
}
