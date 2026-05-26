import Link from "next/link";

const pages = [
  { href: "/tools/kaiso", label: "概要" },
  { href: "/tools/kaiso/install", label: "インストール" },
  { href: "/tools/kaiso/quickstart", label: "クイックスタート" },
  { href: "/tools/kaiso/vba-api", label: "VBA連携" },
];

export function KaisoToolNav() {
  return (
    <nav className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-3">
      <div className="flex flex-wrap gap-2">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="rounded border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            {page.label}
          </Link>
        ))}
        <a
          href="https://yujifukami.github.io/IKI-Kaiso-VSTO/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          ダウンロード
        </a>
      </div>
    </nav>
  );
}

export function KaisoImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <a href={src} target="_blank" rel="noopener noreferrer">
        <img src={src} alt={alt} className="h-auto w-full" />
      </a>
      <figcaption className="border-t border-gray-100 px-4 py-3 text-sm leading-6 text-gray-600">
        {caption}
      </figcaption>
    </figure>
  );
}

