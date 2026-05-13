<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Tech Blog Article Rules

When adding or updating an article in this site, do not stop at the article body.

- Wrap important technical terms in article MDX with `<Term>...</Term>`.
- If an important term is not registered, add it to `src/lib/terms.ts`.
- Set term `title` and `aliases` so glossary pages can cross-link naturally.
- Add related links between articles, glossary terms, and case studies when they help readers continue.
- Avoid link stuffing. Prefer links that clarify a term or create a useful next step.
- Run `npm run build` before publishing.
