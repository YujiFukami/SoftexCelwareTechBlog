import type { Metadata } from "next";
import Link from "next/link";

const appUrl = "https://rakulog-app.vercel.app";
const guideUrl =
  "https://www.softex-celware.com/post/rakulog-task-work-time-management";

export const metadata: Metadata = {
  title: "らくログタスク β0.5.6 更新内容",
  description:
    "らくログタスク β0.5.6 の更新内容を解説します。使い方ガイドへの導線追加、退勤忘れ修正の改善、Googleログイン安定化を行いました。",
  openGraph: {
    title: "らくログタスク β0.5.6 更新内容",
    description:
      "前回作業日の退勤忘れに気づきやすくし、その場で修正できるようにした更新内容を画面付きで紹介します。",
    images: [
      "/tools/rakulog-task/images/beta-0-5-6-previous-day-clockout-guide.jpg",
    ],
  },
};

const updates = [
  {
    title: "使い方ガイドへのリンクを追加",
    body: "ログイン画面、ログイン後のナビゲーション、設定画面から使い方ガイドを開けるようにしました。初めて使う方や、集計・退勤忘れ対応を確認したい方が、アプリ内から解説ページへ移動しやすくなっています。",
  },
  {
    title: "会社ロゴを横長ロゴに差し替え",
    body: "画面右上に表示している Softex-Celware のロゴを横長タイプに変更しました。ヘッダー内で会社名が分かりやすくなり、公式サイトへの導線としても見やすくしています。",
  },
  {
    title: "前回作業日の退勤忘れを入力画面で修正可能に",
    body: "前回作業日の退勤時刻が未登録の場合、入力画面の上部に案内カードを表示します。前日が休日の場合でも、直近で作業を行った日を確認するため、月曜日に金曜日の退勤忘れに気づけるような動きになります。",
  },
  {
    title: "退勤忘れ一覧に最後の作業開始時刻を表示",
    body: "退勤忘れ一覧に、最後に開始した作業の開始時刻と作業名を表示するようにしました。退勤時刻を思い出す際の参考情報として使えます。",
  },
  {
    title: "退勤忘れ修正時の作業履歴更新を改善",
    body: "退勤忘れを登録したときに、勤務日の退勤時刻だけでなく、最後の作業履歴の終了時刻と作業時間も連動して更新されるようにしました。修正後の集計結果にも作業時間が反映されやすくなります。",
  },
  {
    title: "Googleログインの安定化",
    body: "Googleログイン後にセッションが確定する前に入力画面の認証チェックが走る場合があったため、認証用のコールバック処理を追加しました。ログイン後にセッションを確定してから入力画面へ移動します。",
  },
];

function ReleaseImage({
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

export default function RakulogTaskBeta056Page() {
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
        <p className="mb-2 text-sm font-medium text-blue-600">
          Release Notes
        </p>
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          らくログタスク β0.5.6 更新内容
        </h1>
        <p className="max-w-3xl text-base leading-8 text-gray-700">
          2026年5月27日に、らくログタスク β0.5.6 を更新しました。
          今回の中心は、作業時間管理で起きやすい「退勤を押し忘れた」場面への対応です。
          次にアプリを開いたときに退勤忘れへ気づきやすくし、記憶が新しいうちに退勤時刻を登録できるようにしました。
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
        </div>
      </header>

      <section className="mb-10 grid gap-6">
        <ReleaseImage
          src="/tools/rakulog-task/images/beta-0-5-6-previous-day-clockout-guide.jpg"
          alt="前回作業日の退勤忘れ表示と使い方ガイドへのリンク"
          caption="前回作業日の退勤が未登録の場合、入力画面でお知らせします。退勤時刻をその場で登録できるため、記憶が新しいうちに修正できます。使い方ガイドへのリンクも追加しました。"
        />
        <ReleaseImage
          src="/tools/rakulog-task/images/beta-0-5-6-missing-clockout-last-task.jpg"
          alt="退勤忘れ一覧で最終作業開始を表示"
          caption="退勤忘れ一覧に、最後の作業開始時刻と作業名を表示するようにしました。退勤時刻を思い出すための参考情報として使えます。"
        />
      </section>

      <section className="mb-10 rounded-lg border border-blue-100 bg-blue-50 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">
          今回の改善ポイント
        </h2>
        <p className="text-sm leading-7 text-gray-700">
          退勤忘れは、翌日や翌週に気づくと正しい時刻を思い出しにくくなります。
          β0.5.6では、直近の作業日の未退勤を入力画面で目に入りやすくし、最後に開始した作業の情報を表示することで、修正判断を助ける形にしました。
        </p>
      </section>

      <section className="mb-10 space-y-4">
        {updates.map((update) => (
          <article key={update.title} className="rounded-lg border border-gray-200 p-5">
            <h2 className="mb-2 text-lg font-bold text-gray-900">
              {update.title}
            </h2>
            <p className="text-sm leading-7 text-gray-700">{update.body}</p>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-gray-200 p-5">
        <h2 className="mb-3 text-xl font-bold text-gray-900">技術的な補足</h2>
        <p className="mb-3 text-sm leading-7 text-gray-700">
          今回の変更は、既存のSupabaseテーブル構造を変更せずに実装しています。
          更新対象は入力画面、退勤忘れ一覧、Google OAuth callback、ナビゲーション、設定画面のバージョン情報です。
        </p>
        <p className="text-sm leading-7 text-gray-700">
          リリース前の確認として、アプリ側では lint と build の成功を確認しています。
          利用者向けには、使い方ガイドへの導線と退勤忘れ修正の導線を中心に改善しています。
        </p>
      </section>
    </div>
  );
}
