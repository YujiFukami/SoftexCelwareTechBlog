import type { Metadata } from "next";
import Link from "next/link";

const appUrl = "https://rakulog-app.vercel.app";
const guideUrl =
  "https://www.softex-celware.com/post/rakulog-task-work-time-management";
const githubUrl = "https://github.com/YujiFukami/rakulog-app";

export const metadata: Metadata = {
  title: "らくログタスク β0.5.7 更新内容",
  description:
    "らくログタスク β0.5.7 の更新内容を解説します。複数端末・別ウィンドウで開いたときの入力画面同期と、操作直前の最新状態チェックを改善しました。",
  openGraph: {
    title: "らくログタスク β0.5.7 更新内容",
    description:
      "別ウィンドウ・別端末で利用したときの作業履歴ズレを抑えるため、Realtime同期、フォーカス復帰時の再取得、操作直前の最新状態チェックを追加しました。",
    images: ["/tools/rakulog-task/images/01-overview.png"],
  },
};

const userBenefits = [
  {
    title: "別ウィンドウで開いていてもズレにくい",
    body: "同じ日の入力画面を複数開いている場合でも、他の画面で登録された作業履歴や退勤操作を取り込みやすくしました。",
  },
  {
    title: "PCとスマホの併用でも安心しやすい",
    body: "PCで出勤し、スマホで作業を切り替えるような使い方でも、古い画面状態を引きずりにくくなります。",
  },
  {
    title: "二重登録や履歴順のズレを抑える",
    body: "作業開始や退勤の直前に最新状態を取り直し、古い画面からの操作による二重登録リスクを下げています。",
  },
];

const improvements = [
  {
    title: "入力画面のリアルタイム同期",
    body: "Supabase Realtimeで work_days、work_history、task_master の変更を監視し、別ウィンドウや別端末で更新された内容を入力画面へ反映しやすくしました。",
  },
  {
    title: "フォーカス復帰時の再取得",
    body: "ブラウザウィンドウへ戻ったとき、非表示だったタブが表示状態に戻ったときに、入力画面のデータを再取得します。",
  },
  {
    title: "操作直前の最新状態チェック",
    body: "出勤、退勤、現在作業終了、作業開始・作業切替の直前に、当日の勤務日と作業履歴を取り直すようにしました。",
  },
  {
    title: "作業切替時の並び順決定を改善",
    body: "画面上の件数ではなく、最新の作業履歴から最大 sort_order を確認し、その次の番号で新しい作業を追加します。",
  },
  {
    title: "古い状態で操作した場合の案内",
    body: "他の画面ですでに出勤済み、作業終了済みなどの場合は、画面を最新化したうえでメッセージを表示します。",
  },
];

const relatedTechArticles = [
  {
    title: "Promise.allでSupabaseクエリを並列化してページ表示を高速化する方法",
    href: "/articles/nextjs/promise-all-parallel",
  },
  {
    title: "Supabaseで1000件以上のデータを全件取得するページネーション実装",
    href: "/articles/nextjs/supabase-pagination",
  },
  {
    title: "前回作業日の未完了データを入口画面で補正するUI",
    href: "/articles/nextjs/previous-workday-incomplete-data-ui",
  },
  {
    title: "トースト通知をライブラリなしで実装する",
    href: "/articles/nextjs/toast-notification",
  },
];

export default function RakulogTaskBeta057Page() {
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
          らくログタスク β0.5.7 更新内容
        </h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          2026年5月27日に、らくログタスク β0.5.7 を更新しました。
          今回の中心は、別ウィンドウ・別端末で同じ入力画面を開いているときの同期改善です。
          古い画面状態のまま操作した場合でも、作業履歴の二重登録や順番ズレが起きにくくなるようにしました。
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

      <section className="mb-10 rounded-lg border border-blue-100 bg-blue-50 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">
          今回の更新テーマ
        </h2>
        <p className="text-sm leading-7 text-gray-700">
          作業時間管理アプリは、PC、スマホ、別ウィンドウなど、複数の画面で開いたまま使われることがあります。
          片方の画面で作業切替や退勤を行ったあと、もう片方の画面が古い状態のままだと、さらに作業開始や退勤を押したときに履歴が重複する可能性があります。
          β0.5.7では、この「古い画面状態からの操作」を減らすため、画面の自動同期と操作直前の最新確認を追加しました。
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
          入力画面では、Supabase Realtime の postgres_changes を購読し、対象テーブルに変更が入ったときにデータを再取得する構成にしました。
          監視対象は work_days、work_history、task_master です。短時間に通知が連続しても再取得が走りすぎないよう、短い遅延を挟んで更新します。
        </p>
        <pre className="overflow-x-auto rounded-lg bg-gray-950 p-4 text-sm leading-7 text-gray-100">
{`supabase
  .channel(\`rakulog-input-sync-\${user.id}\`)
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "work_days", filter: \`user_id=eq.\${user.id}\` },
    scheduleReload
  )
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "work_history", filter: \`user_id=eq.\${user.id}\` },
    scheduleReload
  )
  .subscribe()`}
        </pre>
        <p className="mt-4 text-sm leading-7 text-gray-700">
          Realtimeは便利ですが、完全な排他制御ではありません。そのため、作業開始や退勤の直前にも当日の最新状態を取り直し、画面表示が古くても保存処理の直前に整合性を確認するようにしています。
        </p>
      </section>

      <section className="mb-10 rounded-lg border border-gray-200 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">
          今回あえて行っていないこと
        </h2>
        <p className="text-sm leading-7 text-gray-700">
          β0.5.7では、作業切替処理をDB側のRPCへ完全に寄せるところまでは行っていません。
          現在の進行中作業を終了し、次の sort_order を決め、新しい作業を追加する処理を1つのRPCにまとめれば、より強い整合性を持たせられます。
          ただし今回は、既存構造を大きく変えずに改善できる範囲として、入力画面側の自動同期と操作直前の最新確認を優先しました。
        </p>
      </section>

      <section className="mb-10 rounded-lg border border-blue-100 bg-blue-50 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">
          関連する実装ノウハウ
        </h2>
        <p className="mb-4 text-sm leading-7 text-gray-700">
          今回の更新に近い、Supabaseのデータ取得、入口UI、通知まわりの実装ノウハウです。
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
        <h2 className="mb-3 text-xl font-bold text-gray-900">運用上の注意</h2>
        <p className="mb-3 text-sm leading-7 text-gray-700">
          Supabase Realtimeを利用するため、Supabase側で work_days、work_history、task_master がRealtime対象になっている必要があります。
        </p>
        <p className="text-sm leading-7 text-gray-700">
          Realtimeが未設定でも、操作直前の最新状態確認は動作します。
          そのため完全ではないものの、以前より古い画面状態による二重登録リスクは下がります。
        </p>
      </section>
    </div>
  );
}
