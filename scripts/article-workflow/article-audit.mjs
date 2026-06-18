#!/usr/bin/env node
import path from "node:path";
import {
  articleHrefExists,
  extractImageRefs,
  extractInternalArticleLinks,
  findSensitiveCandidates,
  getLinkedTermTexts,
  publicPathExists,
  resolveArticlePath,
  parseArticle,
  rootDir,
  toPosixPath,
} from "./shared.mjs";

const articlePath = resolveArticlePath(process.argv[2]);
const article = parseArticle(articlePath);
const relPath = toPosixPath(path.relative(rootDir, articlePath));

const errors = [];
const warnings = [];
const info = [];

function requireField(key, label = key) {
  if (!article.meta[key]) errors.push(`frontmatter '${label}' is missing`);
}

requireField("title");
requireField("category");
requireField("slug");
requireField("description");
requireField("date");

const expectedCategory = path.basename(path.dirname(articlePath));
const expectedSlug = path.basename(articlePath, ".mdx");
if (article.meta.category && article.meta.category !== expectedCategory) {
  errors.push(
    `category mismatch: frontmatter '${article.meta.category}', path '${expectedCategory}'`
  );
}
if (article.meta.slug && article.meta.slug !== expectedSlug) {
  errors.push(
    `slug mismatch: frontmatter '${article.meta.slug}', filename '${expectedSlug}'`
  );
}

if (article.meta.description.length < 60) {
  warnings.push("description is short; consider 60+ Japanese chars");
}
if (article.meta.description.length > 170) {
  warnings.push("description is long; consider keeping it around 120-160 chars");
}
if (article.meta.date && Number.isNaN(Date.parse(article.meta.date))) {
  errors.push(`date is not parseable: ${article.meta.date}`);
}

const images = extractImageRefs(article);
if (images.length === 0) {
  warnings.push("no frontmatter image or <img> reference found");
}
for (const image of images) {
  if (!publicPathExists(image)) {
    errors.push(`image path does not exist under public: ${image}`);
  }
}

const links = extractInternalArticleLinks(article.content);
for (const link of links) {
  if (!articleHrefExists(link)) {
    errors.push(`internal article link target not found: ${link}`);
  }
}

const linkedTerms = getLinkedTermTexts(article.content);
if (linkedTerms.size === 0) {
  warnings.push("no <Term> links found");
}

if (!/##\s+関連/.test(article.content)) {
  warnings.push("related article section was not found");
}

const sensitive = findSensitiveCandidates(article.raw);
if (sensitive.length > 0) {
  warnings.push(
    `sensitive review candidates found: ${sensitive.length}; run article:sensitive for details`
  );
}

info.push(`article: ${relPath}`);
info.push(`url: /articles/${article.meta.category}/${article.meta.slug}`);
info.push(`tags: ${article.meta.tags.join(", ") || "(none)"}`);
info.push(`images: ${images.length}`);
info.push(`internal article links: ${links.length}`);
info.push(`<Term> links: ${linkedTerms.size}`);

console.log("[article:audit]");
for (const item of info) console.log(`INFO  ${item}`);
for (const item of warnings) console.log(`WARN  ${item}`);
for (const item of errors) console.log(`ERROR ${item}`);

if (errors.length > 0) {
  process.exitCode = 1;
}

