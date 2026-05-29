import type { Metadata } from "next";
import Link from "next/link";

const appUrl = "https://cubic-spline-learning-tool.netlify.app/";
const githubUrl = "https://github.com/YujiFukami/Spline_Study_WebApp";
const normalSplineArticle =
  "https://www.softex-celware.com/post/spline-excelvba";
const closedSplineArticle =
  "https://www.softex-celware.com/post/closed-spline-interpolation-excel-vba";

export const metadata: Metadata = {
  title: "スプライン補間学習計算ツール",
  description:
    "通常スプライン補間、パラメトリックスプライン補間、閉曲線スプライン補間の導出過程を、式・行列・グラフで確認できる学習用Webアプリの紹介ページです。",
  openGraph: {
    title: "スプライン補間学習計算ツール",
    description:
      "三次スプライン補間の条件式、行列、係数、補間式をSTEP形式で確認できる学習用Webアプリです。",
    type: "website",
    url: "/tools/spline-study",
  },
};

const modes = [
  {
    title: "通常スプライン補間",
    description:
      "Xが単調増加する点列を対象に、自然スプライン補間の条件式、未知数、行列、係数、補間式を確認します。",
    articleLabel: "三次スプライン補間の解説記事",
    articleUrl: normalSplineArticle,
  },
  {
    title: "パラメトリックスプライン補間",
    description:
      "X=x(t)、Y=y(t)として扱うことで、Xが単調でない曲線やループ形状も学習できるようにします。",
    articleLabel: "三次スプライン補間の解説記事",
    articleUrl: normalSplineArticle,
  },
  {
    title: "閉曲線スプライン補間",
    description:
      "最後の点から最初の点へ戻る区間と周期条件を含め、閉じた輪郭をなめらかにつなぐ考え方を確認します。",
    articleLabel: "閉曲線スプライン補間の解説記事",
    articleUrl: closedSplineArticle,
  },
];

const steps = [
  "入力点、区間幅、未知数、条件数を整理する",
  "定数や条件式を導出し、どの式がどの行に入るかを見る",
  "一般形の係数行列と右辺ベクトルを確認する",
  "点数が少ない場合は、実際の数値行列として展開する",
  "解ベクトル、係数表、最終的な補間式まで順番に追う",
];

const featureArticles = [
  {
    href: "/articles/vanillajs/formula-derivation-step-ui",
    title: "数式導出をSTEPで見せる学習UIの作り方",
  },
  {
    href: "/articles/vanillajs/matrix-condition-coloring",
    title: "係数行列の条件式を色分けして見せるUI設計",
  },
  {
    href: "/articles/vanillajs/clickable-calculation-cell-detail",
    title: "計算表のセルをクリックして式と代入値を確認できるUI",
  },
  {
    href: "/articles/vanillajs/blog-linked-webapp-navigation",
    title: "技術ブログとWebアプリを相互リンクさせる導線設計",
  },
];

export default function SplineStudyToolPage() {
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
          数値計算学習Webアプリ
        </p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          スプライン補間学習計算ツール
        </h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          三次スプライン補間を、数式だけでなくグラフ、条件式、係数行列、右辺ベクトル、係数表まで順番に追えるようにした学習用Webアプリです。
          通常補間、パラメトリック補間、閉曲線補間を切り替えながら、どの条件がどの計算につながっているかを確認できます。
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
        {modes.map((mode) => (
          <div key={mode.title} className="rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-bold text-gray-900">{mode.title}</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              {mode.description}
            </p>
            <a
              href={mode.articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              {mode.articleLabel}を見る
            </a>
          </div>
        ))}
      </section>

      <section className="mb-10 rounded-lg border border-gray-200 p-6">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          学習の流れ
        </h2>
        <ol className="space-y-3">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-3 text-sm leading-7 text-gray-700">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          実装・UIの技術記事
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {featureArticles.map((article) => (
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
          使っている主な技術
        </h2>
        <p className="text-sm leading-7 text-gray-700">
          HTML、CSS、JavaScriptで構成した静的Webアプリとして作り、計算処理は
          JavaScript、グラフ描画はChart.js、数式表示はMathJaxを利用しています。
          学習用のツールとして、画面の操作と式の導出順が対応するように設計しています。
        </p>
      </section>
    </div>
  );
}
