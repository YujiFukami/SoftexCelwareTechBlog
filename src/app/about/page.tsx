import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Softex Celware - Excel VBA・GAS・Webアプリ開発で業務を自動化する技術者集団",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">About</h1>

      <section className="space-y-4 text-gray-700">
        <p>
          <strong>Softex Celware（ソフテックスセルウェア）</strong>
          は、Excel VBAとGoogle Apps
          Scriptを中心に、中小企業の業務改善・DX推進をサポートしています。
        </p>
        <p>
          このTech
          Blogでは、実務で培った開発テクニックやノウハウを、コード付きで分かりやすく解説しています。
          「同じ課題で悩んでいる方の助けになれば」という思いで発信しています。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          対応可能な技術
        </h2>
        <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
          <li className="bg-gray-50 px-3 py-2 rounded">Excel VBA</li>
          <li className="bg-gray-50 px-3 py-2 rounded">Google Apps Script</li>
          <li className="bg-gray-50 px-3 py-2 rounded">
            Next.js / React
          </li>
          <li className="bg-gray-50 px-3 py-2 rounded">Supabase</li>
          <li className="bg-gray-50 px-3 py-2 rounded">
            デスクトップアプリ開発
          </li>
          <li className="bg-gray-50 px-3 py-2 rounded">
            プログラミング教育
          </li>
        </ul>
      </section>

      <section className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          お仕事のご依頼・ご相談
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          業務の自動化やシステム開発のご相談は、公式サイトからお気軽にお問い合わせください。
          累計750件超の対応実績があります。
        </p>
        <a
          href="https://www.softex-celware.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded transition-colors"
        >
          公式サイトへ &rarr;
        </a>
      </section>
    </div>
  );
}
