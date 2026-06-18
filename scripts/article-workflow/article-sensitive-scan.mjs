#!/usr/bin/env node
import path from "node:path";
import {
  findSensitiveCandidates,
  parseArticle,
  resolveArticlePath,
  rootDir,
  toPosixPath,
} from "./shared.mjs";

const articlePath = resolveArticlePath(process.argv[2]);
const article = parseArticle(articlePath);
const candidates = findSensitiveCandidates(article.raw);

console.log("[article:sensitive]");
console.log(`target: ${toPosixPath(path.relative(rootDir, articlePath))}`);
console.log("");

if (candidates.length === 0) {
  console.log("No sensitive review candidates found.");
} else {
  for (const item of candidates) {
    console.log(`${item.label}: ${item.value}`);
    console.log(`  line ${item.line}, column ${item.column}: ${item.lineText}`);
  }
  console.log("");
  console.log("Review only: this command does not edit article files.");
}

