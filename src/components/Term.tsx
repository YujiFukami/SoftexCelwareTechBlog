import type { ReactNode } from "react";

type TermProps = {
  children?: ReactNode;
  label?: string;
  query?: string;
  suffix?: string;
};

function reactNodeToText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(reactNodeToText).join("");
  }

  return "";
}

export default function Term({
  children,
  label,
  query,
  suffix = "とは",
}: TermProps) {
  const displayText = children ?? label ?? query;
  const baseQuery = query ?? label ?? reactNodeToText(children);
  const searchText = suffix ? `${baseQuery} ${suffix}` : baseQuery;
  const href = `https://www.google.com/search?q=${encodeURIComponent(searchText)}`;
  const accessibleLabel = `Googleで「${baseQuery}」を検索します（新しいタブ）`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={accessibleLabel}
      title={accessibleLabel}
      className="term-search-link text-inherit decoration-dotted underline underline-offset-4 hover:text-blue-700 hover:decoration-solid"
    >
      {displayText}
      <span aria-hidden="true" className="ml-0.5 text-[0.72em] opacity-60">
        ↗
      </span>
    </a>
  );
}
