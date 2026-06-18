#!/usr/bin/env node
import path from "node:path";
import {
  getLinkedTermTexts,
  getTerms,
  normalizeText,
  parseArticle,
  removeLinkedTermBlocks,
  resolveArticlePath,
  rootDir,
  stripCodeBlocks,
  toPosixPath,
} from "./shared.mjs";

const articlePath = resolveArticlePath(process.argv[2]);
const article = parseArticle(articlePath);
const linkedTexts = getLinkedTermTexts(article.content);
const searchable = normalizeText(stripCodeBlocks(removeLinkedTermBlocks(article.content)));
const searchableLower = searchable.toLowerCase();

const results = [];
const seen = new Set();

for (const term of getTerms()) {
  for (const name of term.names) {
    const normalizedName = normalizeText(name);
    if (normalizedName.length < 2) continue;
    if (linkedTexts.has(normalizedName)) continue;

    const key = `${term.slug}:${normalizedName}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const index = searchableLower.indexOf(normalizedName.toLowerCase());
    if (index === -1) continue;

    const contextStart = Math.max(0, index - 35);
    const contextEnd = Math.min(searchable.length, index + normalizedName.length + 35);
    results.push({
      title: term.title,
      slug: term.slug,
      matched: normalizedName,
      context: searchable.slice(contextStart, contextEnd),
    });
    break;
  }
}

results.sort((a, b) => b.matched.length - a.matched.length);

console.log("[article:terms]");
console.log(`target: ${toPosixPath(path.relative(rootDir, articlePath))}`);
console.log("");

for (const item of results.slice(0, 30)) {
  console.log(`${item.matched} -> ${item.title} (/terms/${item.slug})`);
  console.log(`  context: ${item.context}`);
}

if (results.length > 30) {
  console.log(`...and ${results.length - 30} more candidates.`);
}
if (results.length === 0) {
  console.log("No unlinked term candidates found.");
}

