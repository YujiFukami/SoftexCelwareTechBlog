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

## Excel VBA Generic Procedure Article Layout

For articles in `content/vba` that explain reusable Excel VBA generic procedures, use this fixed layout unless the user requests otherwise:

1. Overview: what the procedure solves and what it returns.
2. Use cases: when to use it in real Excel VBA work.
3. Process image: include the explanatory image when one is provided.
4. Usage example: show the shortest practical call pattern.
5. Copyable implementation code: use `CopyCode` so the full procedure can be copied.
6. Beginner explanation: explain the main lines and control flow in plain language.
7. Notes: limits, assumptions, and common mistakes.
8. Short summary.

Do not add customization examples by default. Keep the article focused on "when to use it", "how to call it", and "what the code is doing".
