import type { Metadata } from "next";
import Link from "next/link";

const appUrl = "https://rakulog-app.vercel.app";
const guideUrl =
  "https://www.softex-celware.com/post/rakulog-task-work-time-management";
const githubUrl = "https://github.com/YujiFukami/rakulog-app";

export const metadata: Metadata = {
  title: "らくログタスク β0.5.8 更新内容",
  description:
    "らくログタスク β0.5.8 の更新内容を解説します。作業名候補キャッシュを追加し、入力画面と特定作業集計の作業名候補取得を軽量化しました。",
  openGraph: {
    title: "らくログタスク β0.5.8 更新内容",
    description:
      "作業履歴が増えても入力画面が重くなりにくいように、task_name_suggestionsによる作業名候補キャッシュを追加しました。",
    images: ["/tools/rakulog-task/images/01-overview.png"],
  },
};

const userBenefits = [
  {
    title: "入力画面が重くなりにくい",
    body: "作業名候補を出すためだけに過去の作業履歴全体を読みに行く構成を避け、日々の記録画面で必要な情報だけを取得しやすくしました。",
  },
  {
    title: "作業名候補を軽く表示できる",
    body: "新規作業名の候補表示では、履歴全体ではなく軽量な候補テーブルを参照します。長く使い続けても候補表示の負荷が増えにくくなります。",
  },
  {
    title: "特定作業集計の選択も軽量化",
    body: "特定作業集計タブで対象作業名を選ぶ場面でも、作業名候補キャッシュを使うようにしました。集計前の作業名選択を軽くするための改善です。",
  },
];

const improvements = [
  {
    title: "task_name_suggestions テーブルを追加",
    body: "作業名、最終利用日時、利用回数などを保持する候補専用テーブルを追加しました。元データは work_history と task_master のままにし、表示高速化用の派生キャッシュとして扱います。",
  },
  {
    title: "入力画面の全履歴スキャンを廃止",
    body: "入力画面では、今日の勤務情報、今日の作業履歴、作業マスタ、最近使った作業名、作業名候補だけを中心に取得する構成へ整理しました。",
  },
  {
    title: "新規作業開始時に候補キャッシュを更新",
    body: "作業を開始したときに touch_task_name_suggestion RPC を呼び出し、候補の追加、最終利用日時の更新、利用回数の加算を行います。",
  },
  {
    title: "特定作業集計の作業名一覧も軽量化",
    body: "対象作業名を選ぶだけの段階では work_history 全件を読み込まず、task_name_suggestions を使って候補を表示します。",
  },
  {
    title: "SQL未適用環境へのフォールバック",
    body: "候補テーブルが未作成の環境でも、作業マスタや直近履歴を使って最低限の候補表示ができるようにしています。",
  },
];

const relatedTechArticles = [
  {
    title: "Supabaseで1000件以上のデータを全件取得するページネーション実装",
    href: "/articles/nextjs/supabase-pagination",
  },
  {
    title: "Promise.allでSupabaseクエリを並列化してページ表示を高速化する方法",
    href: "/articles/nextjs/promise-all-parallel",
  },
  {
    title: "ドロップダウンを外クリックで閉じる",
    href: "/articles/nextjs/dropdown-outside-click",
  },
  {
    title: "公開アプリ更新時にREADME・仕様書・画面導線を揃える",
    href: "/articles/codex/public-app-docs-links-sync",
  },
];

const releaseLinks = [
  {
    version: "β0.5.8",
    href: "/tools/rakulog-task/releases/beta-0-5-8",
    summary: "作業名候補キャッシュを追加し、入力画面と特定作業集計の候補取得を軽量化。",
  },
  {
    version: "β0.5.7",
    href: "/tools/rakulog-task/releases/beta-0-5-7",
    summary: "複数端末・別ウィンドウ利用時の入力画面同期を改善。",
  },
  {
    version: "β0.5.6",
    href: "/tools/rakulog-task/releases/beta-0-5-6",
    summary: "退勤忘れ補正、使い方ガイド導線、Googleログイン安定化を追加。",
  },
];

export default function RakulogTaskBeta058Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-6 flex items-center gap-1 text-sm text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-blue-600">公開ツール</Link>
        <span>/</span>
        <Link href="/tools/rakulog-task" className="hover:text-blue-600">
          らくログタスク
        </Link>
      </nav>

      <header className="mb-8">
        <p className="mb-2 text-sm font-medium text-blue-600">Release Notes</p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          らくログタスク β0.5.8 更新内容
        </h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          2026年5月27日に、らくログタスク β0.5.8 を更新しました。
          今回の中心は、作業履歴が増えても入力画面と特定作業集計の作業名候補を軽く表示できるようにする改善です。
          過去履歴全体を毎回読むのではなく、作業名だけをまとめた軽量な候補キャッシュを参照する構成にしました。
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
            href={guideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-blue-200 px-5 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50"
          >
            使い方ガイドを見る
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
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-5">
          <p className="mb-1 text-sm font-medium text-blue-700">確認時点の履歴</p>
          <p className="text-3xl font-bold text-gray-900">19,216件</p>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            work_history に蓄積されていた作業履歴数です。
          </p>
        </div>
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-5">
          <p className="mb-1 text-sm font-medium text-blue-700">候補キャッシュ</p>
          <p className="text-3xl font-bold text-gray-900">949件</p>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            task_name_suggestions に作成された作業名候補数です。
          </p>
        </div>
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-5">
          <p className="mb-1 text-sm font-medium text-blue-700">改善対象</p>
          <p className="text-3xl font-bold text-gray-900">2画面</p>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            入力画面と特定作業集計画面の候補取得を見直しました。
          </p>
        </div>
      </section>

      <section className="mb-10 rounded-lg border border-blue-100 bg-blue-50 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">
          今回の更新テーマ
        </h2>
        <p className="text-sm leading-7 text-gray-700">
          作業ログアプリは、使い続けるほど履歴が増えていきます。
          履歴が少ないうちは候補表示のために過去履歴を参照しても問題になりにくいですが、数万件規模になると入力画面の初期表示や再取得の負担になります。
          β0.5.8では、日々の入力に必要な候補だけを軽く扱えるように、作業名候補専用のキャッシュを追加しました。
        </p>
      </section>

      <section className="mb-10 grid gap-4 md:grid-cols-3">
        {userBenefits.map((benefit) => (
          <article key={benefit.title} className="rounded-lg border border-gray-200 p-5">
            <h2 className="mb-2 text-lg font-bold text-gray-900">
              {benefit.title}
            </h2>
            <p className="text-sm leading-7 text-gray-700">{benefit.body}</p>
          </article>
        ))}
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          追加・改善した機能
        </h2>
        <div className="grid gap-4">
          {improvements.map((item, index) => (
            <article key={item.title} className="rounded-lg border border-gray-200 p-5">
              <p className="mb-2 text-sm font-medium text-blue-600">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                {item.title}
              </h3>
              <p className="text-sm leading-7 text-gray-700">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-10 rounded-lg border border-gray-200 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">
          技術的な裏側
        </h2>
        <p className="mb-4 text-sm leading-7 text-gray-700">
          追加したSQLでは、作業名候補専用の <code>task_name_suggestions</code> テーブル、インデックス、RLSポリシー、候補を更新するRPCを作成します。
          既存の <code>work_history</code> から候補を作るバックフィルも含めています。
        </p>
        <pre className="overflow-x-auto rounded-lg bg-gray-950 p-4 text-sm leading-7 text-gray-100">
{`supabase/migrations/20260527_task_name_suggestions.sql

SELECT COUNT(*) FROM task_name_suggestions;
-- 949`}
        </pre>
        <p className="mt-4 text-sm leading-7 text-gray-700">
          入力画面と特定作業集計画面では、共通処理 <code>lib/task-suggestions.ts</code> を通して候補を取得します。
          作業マスタ、候補キャッシュ、直近履歴などをマージし、重複や空文字を除外することで、画面ごとに同じ候補生成ロジックを使えるようにしました。
        </p>
      </section>

      <section className="mb-10 rounded-lg border border-gray-200 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">
          今回あえて行っていないこと
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-gray-700">
          <li><code>work_history</code> の既存カラム構造は変更していません。</li>
          <li>作業開始・作業切替処理全体のRPC化は、次の改善候補として残しています。</li>
          <li>月別集計や全期間集計の結果キャッシュ化は、今回の対象外です。</li>
        </ul>
      </section>

      <section className="mb-10 rounded-lg border border-blue-100 bg-blue-50 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">
          関連する実装ノウハウ
        </h2>
        <p className="mb-4 text-sm leading-7 text-gray-700">
          今回の更新に近い、Supabaseのデータ取得、候補UI、公開アプリ運用まわりの実装ノウハウです。
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {relatedTechArticles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="rounded bg-white p-4 text-sm font-medium text-blue-700 ring-1 ring-blue-100 hover:bg-blue-50"
            >
              {article.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">更新履歴</h2>
        <div className="divide-y divide-gray-100">
          {releaseLinks.map((release) => (
            <div key={release.version} className="grid gap-2 py-3 text-sm md:grid-cols-[7rem_1fr]">
              <Link href={release.href} className="font-bold text-blue-700 hover:underline">
                {release.version}
              </Link>
              <p className="leading-6 text-gray-700">{release.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
