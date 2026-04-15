"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        {/* Logo / Site Name */}
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/articles"
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            記事一覧
          </Link>
          <Link
            href="/about"
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            About
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

        {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-3">
          <Link
            href="/articles"
            className="block text-sm text-gray-600 hover:text-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            記事一覧
          </Link>
          <Link
            href="/about"
            className="block text-sm text-gray-600 hover:text-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            About
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
