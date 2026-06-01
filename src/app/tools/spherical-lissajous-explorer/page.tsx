import type { Metadata } from "next";
import Link from "next/link";

const appUrl = "https://spherical-lissajous-explorer.vercel.app/";
const githubUrl = "https://github.com/YujiFukami/spherical-lissajous-explorer";

export const metadata: Metadata = {
  title: "球面リサージュ曲面 / 内トロコイド曲面 Webアプリ",
  description:
    "球面リサージュ曲面と内トロコイド曲面をブラウザ上で3D可視化し、STL出力できる学習・検証用Webアプリの紹介ページです。",
  openGraph: {
    title: "球面リサージュ曲面 / 内トロコイド曲面 Webアプリ",
    description:
      "Three.jsで3次元パラメトリック曲面をリアルタイム表示し、STL出力まで行える学習・検証ツールです。",
    type: "website",
    url: "/tools/spherical-lissajous-explorer",
  },
};

const features = [
  {
    title: "球面リサージュ曲面",
    description:
      "A、B、C、Dなどの係数を変えながら、球面上に広がるリサージュ系の曲面形状を確認できます。",
  },
  {
    title: "内トロコイド曲面",
    description:
      "θ方向とφ方向に内トロコイドの考え方を組み合わせ、閉じた曲面や周期的な形状を確認できます。",
  },
  {
    title: "STL出力",
    description:
      "表示中の曲面をASCII STLとして出力できます。形状検証や3Dデータ化の学習にも使いやすい構成です。",
  },
];

const techArticles = [
  {
    href: "/articles/vanillajs/importmap-threejs-cdn-buildless",
    title: "importmapでThree.jsをCDNから読み込むビルドレス3D Web構成",
  },
  {
    href: "/articles/vanillajs/schema-driven-parameter-ui-mode-registry",
    title: "スキーマ駆動パラメータUIとモードレジストリで分岐を減らす",
  },
  {
    href: "/articles/vanillajs/slider-preview-debounce",
    title: "重い計算UIでスライダー操作中プレビューとデバウンスを両立する",
  },
  {
    href: "/articles/vanillajs/threejs-preserve-camera-position",
    title: "Three.jsでパラメータ変更時にカメラ位置を保持するパターン",
  },
];

const specs = [
  ["曲面タイプ", "球面リサージュ曲面、内トロコイド曲面"],
  ["表示", "Three.jsによる3D表示、OrbitControls操作、Axis / Grid / Wire / Transparent切替"],
  ["出力", "ASCII STLダウンロード"],
  ["構成", "Vanilla JS、ES Modules、importmap、Three.js CDN"],
  ["公開", "Vercel静的サイト、GitHubリポジトリ公開"],
];

export default function SphericalLissajousExplorerPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-blue-600">
          公開ツール
        </Link>
      </nav>

      <header className="mb-10">
        <p className="mb-2 text-sm font-medium text-blue-600">
          3D数式曲面学習Webアプリ
        </p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          球面リサージュ曲面 / 内トロコイド曲面 Webアプリ
        </h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          球面リサージュ曲面と内トロコイド曲面を、ブラウザ上でリアルタイムに生成・3D可視化・STL出力できる学習用Webアプリです。
          スライダーで係数や分割数を調整しながら、数式パラメータが曲面形状へどう反映されるかを確認できます。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            アプリを開く
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            GitHubを見る
          </a>
        </div>
      </header>

      <section className="mb-10 grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-bold text-gray-900">{feature.title}</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </section>

      <section className="mb-10 rounded-lg border border-gray-200 p-6">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          主な仕様
        </h2>
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm">
            <tbody>
              {specs.map(([label, value]) => (
                <tr key={label} className="border-b border-gray-200 last:border-b-0">
                  <th className="w-36 bg-gray-50 px-4 py-3 font-semibold text-gray-900">
                    {label}
                  </th>
                  <td className="px-4 py-3 leading-7 text-gray-700">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          実装・UIの技術記事
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {techArticles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="rounded-lg border border-gray-200 p-4 text-sm font-medium text-blue-700 hover:border-blue-300 hover:bg-blue-50/40"
            >
              {article.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h2 className="mb-3 text-xl font-bold text-gray-900">
          開発メモ
        </h2>
        <p className="text-sm leading-7 text-gray-700">
          このアプリは、npmやビルドツールを使わず、importmapでThree.jsをCDNから読み込む静的Webアプリとして構成しています。
          計算処理、3Dビューア、STL出力、パラメータUIを分け、学習用ツールとして拡張しやすい形にしています。
        </p>
      </section>
    </div>
  );
}
