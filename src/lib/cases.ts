export type RelatedArticle = {
  title: string;
  href: string;
  category: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  description: string[];
  stack: string[];
  highlights: string[];
  projectUrl?: string;
  githubUrl?: string;
  externalArticleUrl?: string;
  visibility: "public" | "limited" | "anonymous";
  relatedArticles: RelatedArticle[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "rakulog-task",
    title: "らくログタスク",
    subtitle: "作業時間管理Webアプリ",
    category: "Webアプリ",
    summary:
      "Next.jsとSupabaseで構築した、出勤・退勤・作業時間の記録と集計を行うWebアプリです。",
    description: [
      "作業開始・終了の記録、日別・月別の集計、タスク別の可視化を行うためのWebアプリです。",
      "認証、カレンダー表示、色管理、通知、初回ガイドなど、業務アプリでよく必要になる機能を組み合わせています。",
      "このTech Blogでは、実装時に得られたNext.js、Supabase、UI実装、セキュリティ確認のノウハウを記事化しています。",
    ],
    stack: ["Next.js", "Supabase", "Vercel", "OAuth", "Tailwind CSS"],
    highlights: [
      "Supabase Authを使ったログイン制御",
      "作業時間をカレンダー・グラフ・一覧で確認できるUI",
      "タスク色をアプリ全体へ反映する設計",
      "初回利用時のガイドとトースト通知",
      "Vercel運用時のセキュリティ確認",
    ],
    projectUrl: "https://rakulog-app.vercel.app",
    visibility: "public",
    relatedArticles: [
      {
        title: "Next.js App RouterとSupabase Authでミドルウェア認証ガードを実装する方法",
        href: "/articles/nextjs/supabase-auth-middleware",
        category: "Next.js",
      },
      {
        title: "useRefとmousedownでドロップダウンを外側クリックで閉じる方法",
        href: "/articles/nextjs/dropdown-outside-click",
        category: "Next.js",
      },
      {
        title: "ライブラリ不要でトースト通知を実装する方法",
        href: "/articles/nextjs/toast-notification",
        category: "Next.js",
      },
      {
        title: "HEXカラーコードをRGBAへ変換して動的カラーを適用する方法",
        href: "/articles/nextjs/hex-rgba-dynamic-color",
        category: "Next.js",
      },
    ],
  },
  {
    slug: "kochsprint",
    title: "KochSprint モールス道場",
    subtitle: "モールス信号学習アプリ",
    category: "学習アプリ",
    summary:
      "モールス信号の聞き取り練習、タイムアタック、ワードチャレンジを備えたブラウザ学習アプリです。",
    description: [
      "Web Audio APIによる正確なモールス音再生、モバイルでも使いやすい入力UI、実績バッジ、ランキング向けUIを備えた学習アプリです。",
      "Vanilla JSで複数ページを構成し、共通UIやデプロイ手順を整理しながら継続開発できる形にしています。",
      "音声と視覚フィードバックを同期させ、音が出せない環境でも学習しやすいUIを目指しています。",
    ],
    stack: ["Vanilla JS", "Web Audio API", "Supabase", "Vercel", "CSS"],
    highlights: [
      "AudioContextによる正確な音声スケジューリング",
      "スマホ向けタップ入力グリッド",
      "実績バッジとゲスト・ログイン両対応",
      "音と同期する全画面フラッシュ",
      "共通UIモジュール化による重複削減",
    ],
    projectUrl: "https://morse-master-psi.vercel.app",
    githubUrl: "https://github.com/YujiFukami/morse-master",
    visibility: "public",
    relatedArticles: [
      {
        title: "Web Audio APIで正確な音声タイミングを実装する方法",
        href: "/articles/vanillajs/web-audio-precise-timing",
        category: "Vanilla JS",
      },
      {
        title: "モバイルでソフトキーボードを出さないタップ入力グリッド",
        href: "/articles/vanillajs/mobile-tap-grid",
        category: "Vanilla JS",
      },
      {
        title: "localStorageとSupabaseを併用した実績バッジシステム",
        href: "/articles/vanillajs/achievement-badge-system",
        category: "Vanilla JS",
      },
      {
        title: "共通UIをIIFEモジュールに集約する方法",
        href: "/articles/vanillajs/common-ui-iife",
        category: "Vanilla JS",
      },
    ],
  },
  {
    slug: "nonogram-solver",
    title: "イラストロジック自動解答Web版",
    subtitle: "パズル自動解答・作成Webアプリ",
    category: "Webツール",
    summary:
      "ノノグラムの自動解答、問題作成、印刷、画像保存、多言語対応を備えたWebツールです。",
    description: [
      "ブラウザ上でノノグラムの盤面を扱い、解答支援、問題作成、印刷、画像保存まで行えるWebアプリです。",
      "Canvas合成、非同期ループ、A4印刷向きの自動判定、多言語対応など、軽量Webアプリで使い回せる実装を多く含んでいます。",
      "このTech Blogでは、実装中に切り出した汎用パターンをVanilla JS記事として整理しています。",
    ],
    stack: ["Vanilla JS", "Canvas", "CSS Print", "i18n", "Vercel"],
    highlights: [
      "ヒント数字を含めたCanvas画像出力",
      "長時間処理中も固まらない非同期ループ",
      "盤面サイズに応じたA4縦横自動判定",
      "ビルドツール不要の多言語対応",
      "SVGとPythonによるファビコン生成",
    ],
    projectUrl: "https://nonogram-solver-creator.vercel.app/",
    githubUrl: "https://github.com/YujiFukami/nonogram-solver-creator",
    visibility: "public",
    relatedArticles: [
      {
        title: "Canvasに複数要素を合成してPNG保存する方法",
        href: "/articles/vanillajs/canvas-export",
        category: "Vanilla JS",
      },
      {
        title: "重い処理中もUIを固めない非同期ループパターン",
        href: "/articles/vanillajs/async-loop-progress",
        category: "Vanilla JS",
      },
      {
        title: "CSS @pageで印刷PDFの縦横を自動判定する方法",
        href: "/articles/vanillajs/print-pdf-orientation",
        category: "Vanilla JS",
      },
      {
        title: "ビルドツール不要でVanilla JSに多言語対応を入れる方法",
        href: "/articles/vanillajs/vanilla-i18n",
        category: "Vanilla JS",
      },
    ],
  },
  {
    slug: "nandemo-shortcut",
    title: "なんでもショートカット",
    subtitle: "Windows向けショートカット支援ツール",
    category: "Windowsツール",
    summary:
      "Pythonとtkinterで構築した、Windows作業を素早く呼び出すためのショートカット支援ツールです。",
    description: [
      "Windows上でよく使う操作やツールを素早く呼び出すためのデスクトップ補助ツールです。",
      "Python、tkinter、PyInstallerを使い、配布しやすいEXE構成、設定JSON、ランチャーEXE、タスクバー運用まで整理しています。",
      "小型Windowsツールを配布・運用するときの実装ノウハウを記事化しています。",
    ],
    stack: ["Python", "tkinter", "PyInstaller", "Windows"],
    highlights: [
      "本体EXEと呼び出し専用ランチャーEXEの分離",
      "JSON設定の読み書きとバックアップ",
      "タスクバー固定を前提にした運用設計",
      "ZIP配布向けのREADME・ライセンス整備",
    ],
    githubUrl: "https://github.com/YujiFukami/NandemoShortCut",
    externalArticleUrl:
      "https://www.softex-celware.com/post/nandemo-shortcut-windows-launcher",
    visibility: "public",
    relatedArticles: [
      {
        title: "PyInstallerで本体EXEとランチャーEXEを同時に作る方法",
        href: "/articles/python-windows/pyinstaller-dual-exe-build",
        category: "Python",
      },
      {
        title: "tkinterアプリのJSON設定を安全に読み書きする方法",
        href: "/articles/python-windows/tkinter-json-config-backup",
        category: "Python",
      },
      {
        title: "常駐型Windowsツールのタスクバー運用設計",
        href: "/articles/python-windows/windows-taskbar-launcher",
        category: "Python",
      },
    ],
  },
  {
    slug: "business-invoice-desktop-app",
    title: "請求・入金管理デスクトップアプリ",
    subtitle: "匿名事例：ローカルDBを使った業務管理アプリ",
    category: "デスクトップアプリ",
    summary:
      "Electron、Vite、sql.jsで構築した、請求・入金管理向けのローカルDBデスクトップアプリ開発事例です。",
    description: [
      "顧客名や業務固有情報は伏せたうえで、請求・入金管理に必要な業務データをローカルSQLite DBとして扱うElectronデスクトップアプリの事例として整理しています。",
      "sql.jsとIPCを使い、ネイティブモジュールのビルドトラブルを避けながら、ファイル永続化やCSV一括取込みに対応しています。",
      "Electronアプリの配布、DB永続化、高速化、バージョン管理、ソース納品のノウハウを、案件固有情報を出さない形で記事化しています。",
    ],
    stack: ["Electron", "Vite", "sql.js", "SQLite", "IPC"],
    highlights: [
      "sql.js + IPCによるローカルDB永続化",
      "CSV一括取込みの高速化",
      "削除済みIDの再利用ロジック",
      "package.jsonのversionをアプリ全体へ自動反映",
      "ソース納品用バッチ",
    ],
    visibility: "anonymous",
    relatedArticles: [
      {
        title: "sql.jsとElectron IPCでローカルDBを永続化する方法",
        href: "/articles/electron/sqljs-electron-ipc",
        category: "Electron",
      },
      {
        title: "sql.jsのCSV一括INSERTを高速化する方法",
        href: "/articles/electron/sqljs-bulk-insert",
        category: "Electron",
      },
      {
        title: "削除済みIDを再利用する採番ロジック",
        href: "/articles/electron/reuse-deleted-id",
        category: "Electron",
      },
      {
        title: "ElectronアプリのソースコードをGitHubへ納品する方法",
        href: "/articles/electron/github-source-delivery",
        category: "Electron",
      },
    ],
  },
  {
    slug: "vsto-hierarchical-form",
    title: "階層化フォーム VSTO版",
    subtitle: "Excel VBAプロジェクト解析・参照可視化アドイン",
    category: "Officeアドイン",
    summary:
      "Excel VBAプロジェクトの構造や参照関係を可視化するためのVSTO + WPFアドイン開発事例です。",
    description: [
      "Excel VBAプロジェクトのモジュール、関数、参照関係を解析・可視化するためのアドインです。",
      "VBA UserForm版からC#、VSTO、WPF構成へ移行し、UI、COM境界、VBIDE参照、ClickOnce配布、コード解析エンジンを整理しています。",
      "コード解析、Office連携、WPF UI、配布に関するノウハウを複数の記事として公開しています。",
    ],
    stack: ["VSTO", "WPF", "C#", "COM", "VBIDE", "Code Analysis"],
    highlights: [
      "CustomTaskPane + ElementHostによるWPF UI統合",
      "dynamic経由でVBIDE参照競合を回避",
      "Lexer / Parser / Resolverによるコード解析",
      "ClickOnce配布と自動更新設計",
    ],
    visibility: "limited",
    relatedArticles: [
      {
        title: "VSTOでWPF画面のフォーカス問題をCustomTaskPaneで解決する方法",
        href: "/articles/vsto/wpf-custom-task-pane-focus",
        category: "VSTO",
      },
      {
        title: "VSTOでWPF UIを独立ウィンドウ表示するWinForms Form + ElementHostパターン",
        href: "/articles/vsto/winforms-elementhost-wpf-window",
        category: "VSTO",
      },
      {
        title: "dynamic経由でVBIDE COM参照競合を回避する方法",
        href: "/articles/vsto/vbide-dynamic-com",
        category: "VSTO",
      },
      {
        title: "VBAコード解析をLexerとParserで安定させる基本パターン",
        href: "/articles/code-analysis/vba-lexer-parser",
        category: "Code Analysis",
      },
      {
        title: "COMオブジェクトをDTO境界で分離する設計",
        href: "/articles/code-analysis/com-dto-boundary",
        category: "Code Analysis",
      },
    ],
  },
  {
    slug: "anonymous-business-desktop-app",
    title: "業務系デスクトップアプリ開発",
    subtitle: "匿名事例：ローカルDB・CSV取込み・GitHub納品",
    category: "匿名事例",
    summary:
      "守秘義務に配慮し、顧客情報を伏せた形で紹介する業務系デスクトップアプリ開発事例です。",
    description: [
      "顧客情報や業務内容は公開できませんが、Electron、SQLite、CSV取込み、ローカルDB永続化、GitHub納品などの実務ノウハウを得た案件です。",
      "公開記事では、案件固有情報を伏せたうえで、再利用できる設計パターンや実装上の注意点だけを切り出しています。",
      "今後、匿名事例ページとして、技術選定、配布方式、保守運用の観点を整理していく予定です。",
    ],
    stack: ["Electron", "SQLite", "sql.js", "CSV", "GitHub"],
    highlights: [
      "顧客情報を含むファイルを除外したソース納品",
      "ネイティブモジュールを避けるDB構成",
      "大量CSV取込みの高速化",
      "削除済みIDの再利用",
      "バージョン表示の自動反映",
    ],
    visibility: "anonymous",
    relatedArticles: [
      {
        title: "ElectronアプリのソースコードをGitHubへワンクリックで納品する方法",
        href: "/articles/electron/github-source-delivery",
        category: "Electron",
      },
      {
        title: "sql.jsとElectron IPCでローカルDBを永続化する方法",
        href: "/articles/electron/sqljs-electron-ipc",
        category: "Electron",
      },
      {
        title: "100KB超のUint8Arrayをbase64へ安全に変換する方法",
        href: "/articles/vanillajs/base64-chunk-encode",
        category: "Vanilla JS",
      },
    ],
  },
];

export function getAllCases(): CaseStudy[] {
  return [...caseStudies];
}

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
