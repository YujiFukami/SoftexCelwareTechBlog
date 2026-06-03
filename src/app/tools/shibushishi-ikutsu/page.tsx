import type { Metadata } from "next";
import Link from "next/link";

const appUrl = "https://shibushishi-ikutsu.vercel.app/";
const githubUrl = "https://github.com/YujiFukami/shibushishi-ikutsu";
const shibushiOfficialUrl = "https://www.city.shibushi.lg.jp/";
const ogImage = "/tools/shibushishi-ikutsu/images/board-20x20.png";

export const metadata: Metadata = {
  title: "志布志市いくつ？",
  description:
    "鹿児島県志布志市のユニークな地名を題材にした、志・布・志・市の4文字を盤面から探すタイムアタックWebゲームです。",
  openGraph: {
    title: "志布志市いくつ？",
    description:
      "志・布・志・市の4文字を、横・縦・斜め8方向から探すブラウザゲームです。4x4から20x20まで盤面サイズを変えて遊べます。",
    images: [ogImage],
    type: "website",
    url: "/tools/shibushishi-ikutsu",
  },
  twitter: {
    card: "summary_large_image",
    title: "志布志市いくつ？",
    description:
      "日本一インパクトのある地名を題材にした、志布志市探しタイムアタックWebゲームです。",
    images: [ogImage],
  },
};

const features = [
  {
    title: "8方向から探す",
    body: "横、縦、斜めの8方向を対象に、隣接する4マスが「志、布、志、市」の順に並ぶ場所を探します。",
  },
  {
    title: "盤面サイズを選べる",
    body: "4x4の初級から20x20の超上級まで、17段階の盤面サイズを切り替えられます。",
  },
  {
    title: "全件発見で自動クリア",
    body: "正解数と発見数を見ながら進め、すべて見つけると自動でクリアし、タイムを記録します。",
  },
];

const difficultyRows = [
  ["初級", "4x4 - 6x6", "1個"],
  ["中級", "7x7 - 10x10", "2 - 6個"],
  ["上級", "11x11 - 15x15", "8 - 16個"],
  ["超上級", "16x16 - 20x20", "19 - 31個"],
];

const specs = [
  ["アプリ名", "志布志市いくつ？"],
  ["URL", appUrl],
  ["GitHub", githubUrl],
  ["技術構成", "HTML / CSS / JavaScript"],
  ["盤面サイズ", "4x4 - 20x20"],
  ["探索方向", "横・縦・斜めの8方向"],
  ["タイマー", "0.1秒精度"],
];

export default function ShibushishiIkutsuPage() {
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
          地名タイムアタックWebゲーム
        </p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          志布志市いくつ？
        </h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          鹿児島県の「志布志市」を題材にしたブラウザゲームです。
          盤面にランダム配置された「志」「布」「市」の中から、
          「志→布→志→市」の順に4文字が一直線に並ぶ場所を探します。
          日本語の地名の面白さを、短時間で遊べるタイムアタックにしました。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            ゲームを開く
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            GitHubを見る
          </a>
          <a
            href={shibushiOfficialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-blue-200 px-5 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50"
          >
            志布志市公式サイト
          </a>
        </div>
      </header>

      <section className="mb-10">
        <video
          src="/tools/shibushishi-ikutsu/demo.mp4"
          controls
          preload="metadata"
          className="aspect-video w-full rounded-lg border border-gray-200 bg-black shadow-sm"
        >
          動画を再生できません。
        </video>
      </section>

      <section className="mb-10 grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-bold text-gray-900">{feature.title}</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">{feature.body}</p>
          </div>
        ))}
      </section>

      <section className="mb-10 rounded-lg border border-gray-200 p-6">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          遊び方
        </h2>
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <ol className="space-y-4 text-sm leading-7 text-gray-700">
              <li>
                <span className="font-semibold text-gray-900">1. 盤面サイズを選ぶ</span>
                <br />
                4x4から20x20までの盤面サイズを選び、ゲームを開始します。
              </li>
              <li>
                <span className="font-semibold text-gray-900">2. 4マスを順番になぞる</span>
                <br />
                「志」から始めて、「布」「志」「市」と隣接するマスをクリックします。
              </li>
              <li>
                <span className="font-semibold text-gray-900">3. 全件発見を目指す</span>
                <br />
                正しく見つけると矢印が表示され、すべて見つけるとクリアです。
              </li>
            </ol>
          </div>
          <a
            href="/tools/shibushishi-ikutsu/images/board-size.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/tools/shibushishi-ikutsu/images/board-size.png"
              alt="志布志市いくつ？の盤面サイズ選択画面"
              className="h-auto w-full rounded-lg border border-gray-200"
            />
          </a>
        </div>
      </section>

      <section className="mb-10 rounded-lg border border-gray-200 p-6">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          難易度と盤面サイズ
        </h2>
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-900">
              <tr>
                <th className="px-4 py-3 font-semibold">難易度</th>
                <th className="px-4 py-3 font-semibold">サイズ</th>
                <th className="px-4 py-3 font-semibold">志布志市の数</th>
              </tr>
            </thead>
            <tbody>
              {difficultyRows.map(([level, size, count]) => (
                <tr key={level} className="border-t border-gray-200">
                  <td className="px-4 py-3 font-medium text-gray-900">{level}</td>
                  <td className="px-4 py-3 text-gray-700">{size}</td>
                  <td className="px-4 py-3 text-gray-700">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10 grid gap-6">
        <figure className="rounded-lg border border-gray-200 p-4">
          <a
            href="/tools/shibushishi-ikutsu/images/board-10x10.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/tools/shibushishi-ikutsu/images/board-10x10.png"
              alt="10x10盤面で志布志市を探す画面"
              className="h-auto w-full rounded border border-gray-200"
            />
          </a>
          <figcaption className="mt-3 text-sm leading-7 text-gray-600">
            10x10盤面の例です。中級サイズでは、適度な数の「志布志市」を探すタイムアタックになります。
          </figcaption>
        </figure>

        <figure className="rounded-lg border border-gray-200 p-4">
          <a
            href="/tools/shibushishi-ikutsu/images/board-20x20.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/tools/shibushishi-ikutsu/images/board-20x20.png"
              alt="20x20盤面で志布志市を探す画面"
              className="h-auto w-full rounded border border-gray-200"
            />
          </a>
          <figcaption className="mt-3 text-sm leading-7 text-gray-600">
            20x20盤面では、31個前後の「志布志市」を探す超上級モードになります。
            見つけられなかった箇所は、ギブアップ後に答え合わせできます。
          </figcaption>
        </figure>
      </section>

      <section className="mb-10 rounded-lg border border-gray-200 p-6">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          実装のポイント
        </h2>
        <div className="space-y-5 text-sm leading-7 text-gray-700">
          <div>
            <h3 className="font-bold text-gray-900">HTML / CSS / JavaScriptだけで構成</h3>
            <p>
              サーバーやフレームワークを使わず、静的なWebゲームとして構成しています。
              そのため、Vercelに配置しやすく、ブラウザだけで遊べます。
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">期待値で正解数を調整</h3>
            <p>
              ランダム盤面でも難易度が大きくぶれないように、盤面サイズごとの期待値を使って
              「志布志市」の出現数を調整しています。たとえば、10x10では約6個、
              20x20では約31個を目安にしています。
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">SVGで矢印を描画</h3>
            <p>
              正解箇所は、SVGの線、三角形、円を組み合わせて矢印として描画します。
              見つけた場所が盤面上で残るため、進捗と答え合わせが分かりやすくなります。
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10 rounded-lg border border-gray-200 p-6">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          8方向探索アルゴリズム
        </h2>
        <p className="mb-4 text-sm leading-7 text-gray-700">
          各マスを起点に、右、左、下、上、右下、左上、右上、左下の8方向を調べます。
          4文字分が盤面外に出ないかを確認し、「志→布→志→市」と一致した場合だけ正解として扱います。
        </p>
        <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-100">
          <code>{`const dirs = [
  [ 0,  1], [ 0, -1],  // right / left
  [ 1,  0], [-1,  0],  // down / up
  [ 1,  1], [-1, -1],  // down-right / up-left
  [-1,  1], [ 1, -1],  // up-right / down-left
];`}</code>
        </pre>
      </section>

      <section className="rounded-lg border border-gray-200 p-6">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          基本情報
        </h2>
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-left text-sm">
            <tbody>
              {specs.map(([label, value]) => (
                <tr key={label} className="border-b border-gray-200 last:border-b-0">
                  <th className="w-32 bg-gray-50 px-4 py-3 font-semibold text-gray-900">
                    {label}
                  </th>
                  <td className="px-4 py-3 leading-7 text-gray-700">
                    {value.startsWith("https://") ? (
                      <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:text-blue-700"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
