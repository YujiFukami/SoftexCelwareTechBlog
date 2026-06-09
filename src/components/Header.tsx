"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navItems = [
  { href: "/learn", label: "学ぶ" },
  { href: "/articles", label: "記事" },
  { href: "/cases", label: "開発事例" },
  { href: "/tools", label: "公開ツール" },
  { href: "/terms", label: "用語集" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt="Softex Celware"
            width={652}
            height={96}
            className="h-7 w-auto"
            priority
          />
          <span className="text-sm font-medium text-gray-500">Tech Blog</span>
        </Link>

        <nav className="hidden md:flex items-center gap-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/search"
            className="p-1.5 text-gray-600 transition-colors hover:text-blue-600"
            aria-label="サイト内検索"
            title="サイト内検索"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </Link>
          <a
            href="https://www.softex-celware.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded transition-colors"
          >
            開発のご依頼
          </a>
        </nav>

        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-sm text-gray-600 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/search"
            className="block text-sm text-gray-600 hover:text-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            検索
          </Link>
          <a
            href="https://www.softex-celware.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-blue-600 font-medium"
          >
            開発のご依頼 &rarr;
          </a>
        </nav>
      )}
    </header>
  );
}
