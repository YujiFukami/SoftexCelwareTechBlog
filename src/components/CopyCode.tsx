"use client";

import { useState } from "react";

type CopyCodeProps = {
  code: string;
  language?: string;
  filename?: string;
};

export default function CopyCode({
  code,
  language = "text",
  filename,
}: CopyCodeProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-gray-200 bg-gray-950 shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-gray-900 px-3 py-2">
        <div className="min-w-0">
          {filename && (
            <div className="truncate text-xs font-medium text-gray-200">
              {filename}
            </div>
          )}
          <div className="text-[11px] uppercase tracking-wide text-gray-400">
            {language}
          </div>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/20"
        >
          {copied ? "コピー済み" : "コピー"}
        </button>
      </div>
      <pre className="m-0 max-h-[560px] overflow-auto p-4 text-sm leading-relaxed text-gray-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
