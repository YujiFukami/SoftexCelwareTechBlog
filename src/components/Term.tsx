import type { ReactNode } from "react";
import { findTermByText } from "@/lib/terms";

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
  const visibleText = label ?? reactNodeToText(children) ?? query ?? "";
  const baseQuery = query ?? visibleText;
  const term =
    (baseQuery ? findTermByText(baseQuery) : undefined) ??
    (visibleText ? findTermByText(visibleText) : undefined);
  const href = term
    ? `/terms/${term.slug}`
    : `https://www.google.com/search?q=${encodeURIComponent(
        suffix ? `${baseQuery} ${suffix}` : baseQuery
      )}`;
  const accessibleLabel = term
    ? `用語集で「${term.title}」を開きます`
    : `Googleで「${baseQuery}」を検索します（新しいタブ）`;

  return (
    <a
      href={href}
      target={term ? undefined : "_blank"}
      rel={term ? undefined : "noopener noreferrer"}
      aria-label={accessibleLabel}
      title={accessibleLabel}
      className="term-search-link text-inherit decoration-dotted underline underline-offset-4 hover:text-blue-700 hover:decoration-solid"
    >
      {displayText}
      {!term && (
        <span aria-hidden="true" className="ml-0.5 text-[0.72em] opacity-60">
          ↗
        </span>
      )}
    </a>
  );
}
