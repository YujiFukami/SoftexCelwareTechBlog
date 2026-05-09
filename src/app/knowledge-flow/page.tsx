import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "知識資産化の仕組み",
  description:
    "Softex Celware Tech Blogが、実務開発とAIコーディングで得た知見を開発資産として整理し、技術記事として公開する流れを紹介します。",
};

const steps = [
  {
    title: "開発現場",
    body: "業務ツール、Webアプリ、デスクトップアプリの開発中に、実際に詰まった課題や解決した実装を拾い上げます。",
  },
  {
    title: "知識資産化",
    body: "課題、使う場面、実装パターン、注意点、再利用判断をMarkdownに整理し、次の開発で探して使える形にします。",
  },
  {
    title: "技術記事として公開",
    body: "内部メモのまま終わらせず、初心者にも流れが分かる記事に整えて、カテゴリ別に公開します。",
  },
  {
    title: "次の開発へ再利用",
    body: "記事と資産化メモを、次回開発、改善提案、相談対応に戻し、知見が積み上がる循環を作ります。",
  },
];

export default function KnowledgeFlowPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="mx-auto max-w-3xl text-center mb-10">
        <p className="text-sm font-medium text-blue-600 mb-2">
          About This Tech Blog
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          実務で得た知見を、再利用できる技術記事へ
        </h1>
        <p className="text-base leading-7 text-gray-600">
          Softex Celware Tech Blogは、AIコーディングと実務開発で得たノウハウを、
          次の開発に使える知識資産として蓄積し、人間にも読みやすい技術記事として公開するための場所です。
        </p>
      </header>

      <section className="mb-12">
        <Image
          src="/knowledge-flow.png"
          alt="Softex Celware Tech Blogの知識資産化と記事公開の流れ"
          width={1792}
          height={1024}
          priority
          className="w-full rounded-lg border border-gray-200 shadow-sm"
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">
          このブログで行っていること
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {steps.map((step, index) => (
            <article key={step.title} className="border border-gray-200 rounded-lg p-5">
              <div className="text-xs font-semibold text-blue-600 mb-2">
                Step {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm leading-7 text-gray-600">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-2 mb-12">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            なぜ記事として公開するのか
          </h2>
          <p className="text-sm leading-7 text-gray-600">
            開発中の知見は、その場で解決して終わると次に活かしにくくなります。
            そこで、実装の背景や注意点まで含めて記事化し、あとから自分でも確認でき、
            同じ課題で困っている方にも届く形にしています。
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            相談導線としての役割
          </h2>
          <p className="text-sm leading-7 text-gray-600">
            記事は単なるメモではなく、どのような開発課題を解決してきたかを示す実例でもあります。
            業務改善やツール開発を検討している方が、相談前に技術の考え方を確認できる入口になります。
          </p>
        </div>
      </section>

      <section className="bg-blue-50 border border-blue-100 rounded-lg p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          技術記事から開発相談へ
        </h2>
        <p className="text-sm leading-7 text-gray-600 mb-5">
          GAS、Next.js、Electron、Python、VSTO、WPF、コード解析など、
          実務で使った技術をカテゴリ別に整理しています。気になる記事からご覧ください。
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/articles"
            className="inline-flex justify-center rounded bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            記事一覧を見る
          </Link>
          <a
            href="https://www.softex-celware.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center rounded border border-blue-200 bg-white px-5 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors"
          >
            開発のご相談へ
          </a>
        </div>
      </section>
    </div>
  );
}
