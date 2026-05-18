export type TermReference = {
  title: string;
  url: string;
};

export type TermEntry = {
  slug: string;
  title: string;
  reading?: string;
  category: string;
  aliases?: string[];
  summary: string;
  description: string[];
  useCases: string[];
  related?: string[];
  googleQuery?: string;
  references?: TermReference[];
};

export type LinkedTermTextSegment = {
  text: string;
  term?: TermEntry;
};

export const terms: TermEntry[] = [
  {
    slug: "electron",
    title: "Electron",
    reading: "エレクトロン",
    category: "デスクトップアプリ",
    aliases: ["Electron アプリ"],
    summary: "Web技術でWindowsやMac向けのデスクトップアプリを作るためのフレームワークです。",
    description: [
      "Electronは、HTML、CSS、JavaScriptで作った画面をデスクトップアプリとして配布できる仕組みです。",
      "Webアプリの開発体験を活かしながら、ファイル保存やローカルDBなど、PCアプリらしい機能を組み込めます。",
    ],
    useCases: [
      "業務用のデスクトップアプリをWeb技術で作る",
      "ローカルファイルやローカルDBを扱うツールを配布する",
      "ブラウザ版とデスクトップ版で画面実装を共通化する",
    ],
    related: ["ipc", "sqlite", "webassembly", "nodejs-module"],
    googleQuery: "Electron アプリ とは",
    references: [{ title: "Electron Documentation", url: "https://www.electronjs.org/docs/latest/" }],
  },
  {
    slug: "sqlite",
    title: "SQLite",
    category: "データベース",
    summary: "サーバーを立てずに、1つのファイルで使える軽量なデータベースです。",
    description: [
      "SQLiteは、アプリ内に組み込んで使いやすいデータベースです。",
      "小規模な業務ツールや単一ユーザーのデスクトップアプリでは、サーバー不要で扱える点が大きな利点です。",
    ],
    useCases: ["ローカルDBを使う業務アプリ", "設定やマスタデータの保存", "CSV取込み後の検索・集計"],
    related: ["sqljs", "electron", "localstorage"],
    googleQuery: "SQLite とは",
    references: [{ title: "SQLite Documentation", url: "https://www.sqlite.org/docs.html" }],
  },
  {
    slug: "sqljs",
    title: "sql.js",
    category: "データベース",
    summary: "SQLiteをWebAssemblyで動かし、ブラウザやElectron上で使えるようにしたライブラリです。",
    description: [
      "sql.jsは、SQLiteをWebAssemblyとして動かすJavaScriptライブラリです。",
      "ネイティブモジュールのビルドを避けたいElectronアプリや、ブラウザ上でDBを試したい場面で使いやすい選択肢です。",
    ],
    useCases: ["Electronでネイティブ依存を避ける", "ブラウザ上でSQLiteを扱う", "開発中にブラウザでDB処理をテストする"],
    related: ["sqlite", "webassembly", "electron"],
    googleQuery: "sql.js とは",
    references: [{ title: "sql.js GitHub", url: "https://github.com/sql-js/sql.js" }],
  },
  {
    slug: "webassembly",
    title: "WebAssembly",
    reading: "ウェブアセンブリ",
    category: "Web開発",
    aliases: ["WASM"],
    summary: "ブラウザなどで高速にプログラムを動かすための低レベルな実行形式です。",
    description: [
      "WebAssemblyは、JavaScriptだけでは重くなりやすい処理を高速に実行するために使われます。",
      "C/C++やRustなどで作られた処理をWeb上で動かす用途にも使われます。",
    ],
    useCases: ["sql.jsでSQLiteを動かす", "画像処理や音声処理など重い計算を高速化する", "既存ライブラリをWebで利用する"],
    related: ["sqljs", "sqlite", "web-audio-api"],
    googleQuery: "WebAssembly とは",
    references: [{ title: "MDN Web Docs - WebAssembly", url: "https://developer.mozilla.org/ja/docs/WebAssembly" }],
  },
  {
    slug: "ipc",
    title: "IPC",
    category: "アプリ設計",
    summary: "別々のプロセス同士がデータや命令をやり取りするための仕組みです。",
    description: [
      "IPCはInter-Process Communicationの略で、プロセス間通信と訳されます。",
      "Electronでは、画面側のレンダラープロセスと、ファイル操作を担当するメインプロセスの橋渡しに使います。",
    ],
    useCases: ["Electronでファイル保存をメインプロセスに任せる", "画面側から安全にOS機能を呼び出す"],
    related: ["electron", "nodejs-module"],
    googleQuery: "Electron IPC とは",
    references: [{ title: "Electron - IPC", url: "https://www.electronjs.org/docs/latest/tutorial/ipc" }],
  },
  {
    slug: "nextjs",
    title: "Next.js",
    category: "Web開発",
    summary: "Reactを使ったWebサイトやWebアプリを作るためのフレームワークです。",
    description: [
      "Next.jsは、ページ生成、ルーティング、画像最適化、サーバー側処理などをまとめて扱えるReactフレームワークです。",
      "静的サイトからログイン付きアプリまで幅広く使えます。",
    ],
    useCases: ["技術ブログを静的生成する", "Supabaseと組み合わせた業務アプリ", "SEOを意識したWebサイト構築"],
    related: ["middleware", "supabase", "vercel"],
    googleQuery: "Next.js とは",
    references: [{ title: "Next.js Documentation", url: "https://nextjs.org/docs" }],
  },
  {
    slug: "ogp",
    title: "OGP",
    category: "Web公開",
    aliases: ["Open Graph Protocol", "Open Graph", "OG画像", "OGP画像"],
    summary: "SNSやチャットにURLを貼ったとき、タイトル・説明文・画像をカード表示するためのメタ情報です。",
    description: [
      "OGPはOpen Graph Protocolの略で、WebページがSNSなどで共有されたときの見え方を指定する仕組みです。",
      "適切なタイトル、説明文、画像を設定しておくと、リンクだけを貼るより内容が伝わりやすくなります。",
    ],
    useCases: ["XやSNSで記事を紹介する", "リンクプレビューに画像を出す", "サイトのクリック率を上げる"],
    related: ["twitter-card", "nextjs", "metadata-base"],
    googleQuery: "OGP Open Graph とは",
    references: [{ title: "The Open Graph protocol", url: "https://ogp.me/" }],
  },
  {
    slug: "twitter-card",
    title: "Twitter Card",
    category: "SNS / Web公開",
    aliases: ["X Card", "summary_large_image", "twitter:card"],
    summary: "XにURLを貼ったときのカード表示を制御するためのメタ情報です。",
    description: [
      "Twitter Cardは、Xで共有されたURLのタイトル、説明文、画像の表示形式を指定する仕組みです。",
      "大きな画像で見せたい場合はsummary_large_imageを指定し、OGP画像と組み合わせて設定します。",
    ],
    useCases: ["Xでブログ記事を見やすく共有する", "大きなカード画像を表示する", "SNS投稿から記事への導線を作る"],
    related: ["ogp", "nextjs"],
    googleQuery: "Twitter Card summary_large_image とは",
    references: [{ title: "X Developer Platform - Cards", url: "https://developer.x.com/en/docs/x-for-websites/cards/overview/abouts-cards" }],
  },
  {
    slug: "metadata-base",
    title: "metadataBase",
    category: "Next.js",
    aliases: ["Next.js metadataBase", "Metadata API"],
    summary: "Next.jsのMetadata APIで、相対URLのOGP画像やcanonical URLを絶対URLへ解決するための基準URLです。",
    description: [
      "metadataBaseは、Next.jsのMetadata APIで使う基準URLです。",
      "OGP画像を /og-image.png のような相対パスで指定する場合でも、本番ドメインを基準に絶対URLとして出力できます。",
    ],
    useCases: ["Next.jsでOGP画像を設定する", "本番ドメインをメタデータに反映する", "SNSカード用画像URLを安定させる"],
    related: ["nextjs", "ogp", "twitter-card"],
    googleQuery: "Next.js metadataBase とは",
    references: [{ title: "Next.js Metadata API", url: "https://nextjs.org/docs/app/api-reference/functions/generate-metadata" }],
  },
  {
    slug: "seo",
    title: "SEO",
    category: "Web集客",
    aliases: ["検索エンジン最適化", "Search Engine Optimization"],
    summary: "検索エンジンからページを見つけてもらいやすくし、検索意図に合う内容へ改善する取り組みです。",
    description: [
      "SEOはSearch Engine Optimizationの略で、検索結果でページが適切に表示され、読者が求める内容へ届きやすくするための改善です。",
      "title、description、見出し、本文、内部リンク、表示速度、検索意図との一致などを総合的に見ます。",
    ],
    useCases: ["技術記事の改善", "問い合わせ導線の改善", "検索流入の分析"],
    related: ["google-search-console", "ctr", "internal-link"],
    googleQuery: "SEO とは",
    references: [{ title: "Google Search Central - SEO Starter Guide", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" }],
  },
  {
    slug: "google-search-console",
    title: "Google Search Console",
    category: "Web集客",
    aliases: ["GSC", "Search Console", "サーチコンソール"],
    summary: "Google検索での表示回数、クリック数、検索クエリ、インデックス状況などを確認できるGoogleの管理ツールです。",
    description: [
      "Google Search Consoleでは、どのURLがどの検索語で表示されたか、クリックされたか、平均掲載順位がどう変わったかを確認できます。",
      "記事改善では、表示回数が多いのにクリック率が低いページや、順位が落ちているページを見つける入口になります。",
    ],
    useCases: ["検索パフォーマンス確認", "インデックス登録確認", "SEO改善候補の抽出"],
    related: ["seo", "ctr"],
    googleQuery: "Google Search Console とは",
    references: [{ title: "Google Search Console Help", url: "https://support.google.com/webmasters/" }],
  },
  {
    slug: "ctr",
    title: "CTR",
    category: "Web集客",
    aliases: ["クリック率", "Click Through Rate"],
    summary: "表示された回数に対して、実際にクリックされた割合です。",
    description: [
      "CTRはClick Through Rateの略で、クリック数を表示回数で割った割合です。",
      "検索結果で表示されているのにCTRが低い場合、titleやdescription、検索意図とのずれを見直す候補になります。",
    ],
    useCases: ["検索結果の改善判断", "タイトル改善", "説明文改善"],
    related: ["seo", "google-search-console"],
    googleQuery: "CTR クリック率 とは",
  },
  {
    slug: "internal-link",
    title: "内部リンク",
    category: "Web集客",
    aliases: ["サイト内リンク"],
    summary: "同じサイト内の別ページへ移動するためのリンクです。",
    description: [
      "内部リンクは、記事、用語集、開発事例、問い合わせページなどを自然につなぐためのリンクです。",
      "読者が次に知りたい情報へ進みやすくなるため、SEOだけでなく回遊性や問い合わせ導線にも影響します。",
    ],
    useCases: ["関連記事への誘導", "用語集との接続", "開発事例と問い合わせ導線の整理"],
    related: ["seo"],
    googleQuery: "内部リンク SEO とは",
  },
  {
    slug: "supabase",
    title: "Supabase",
    category: "バックエンド",
    summary: "認証、データベース、ストレージなどをまとめて使えるバックエンドサービスです。",
    description: [
      "Supabaseは、PostgreSQLを中心に、認証やAPIをすぐ使える形で提供するサービスです。",
      "小規模から中規模のWebアプリで、バックエンドを素早く用意したいときに便利です。",
    ],
    useCases: ["ログイン付きWebアプリ", "データ保存と検索", "Google OAuth連携"],
    related: ["oauth", "middleware", "nextjs"],
    googleQuery: "Supabase とは",
    references: [{ title: "Supabase Docs", url: "https://supabase.com/docs" }],
  },
  {
    slug: "middleware",
    title: "Middleware",
    reading: "ミドルウェア",
    category: "Web開発",
    summary: "リクエストがページに届く前に、認証や転送などの共通処理を行う仕組みです。",
    description: [
      "Next.jsのMiddlewareは、ページ表示前に処理を差し込むための仕組みです。",
      "ログインしていないユーザーをログインページへ送る認証ガードなどに使われます。",
    ],
    useCases: ["認証ガード", "リダイレクト", "アクセス制御"],
    related: ["nextjs", "supabase", "oauth"],
    googleQuery: "Next.js Middleware とは",
    references: [{ title: "Next.js Middleware", url: "https://nextjs.org/docs/app/building-your-application/routing/middleware" }],
  },
  {
    slug: "oauth",
    title: "OAuth",
    category: "認証",
    summary: "Googleなど外部サービスのアカウントでログイン連携するためによく使われる認可の仕組みです。",
    description: [
      "OAuthは、パスワードを直接渡さずに外部サービスとの連携を許可するための仕組みです。",
      "Webアプリでは、GoogleログインやSNSログインの基盤としてよく登場します。",
    ],
    useCases: ["Googleログイン", "外部サービス連携", "ログイン情報の安全な扱い"],
    related: ["supabase", "middleware"],
    googleQuery: "OAuth とは",
    references: [{ title: "OAuth.net", url: "https://oauth.net/2/" }],
  },
  {
    slug: "localstorage",
    title: "localStorage",
    category: "Web開発",
    summary: "ブラウザ内に小さなデータを保存するための仕組みです。",
    description: [
      "localStorageは、ブラウザに文字列データを保存できるWeb Storage APIの一部です。",
      "設定値や一時的な保存には便利ですが、大容量データや機密情報の保存には向きません。",
    ],
    useCases: ["画面設定の保存", "下書き保存", "ブラウザ版の簡易キャッシュ"],
    related: ["base64", "indexeddb"],
    googleQuery: "localStorage とは",
    references: [{ title: "MDN Web Docs - localStorage", url: "https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage" }],
  },
  {
    slug: "pyinstaller",
    title: "PyInstaller",
    category: "Python / Windows",
    summary: "PythonアプリをWindows向けEXEなどにまとめるためのツールです。",
    description: [
      "PyInstallerは、Pythonスクリプトと必要なライブラリをまとめて、実行ファイルとして配布しやすくするツールです。",
      "tkinterで作った小さなWindowsツールを配布する場面でよく使います。",
    ],
    useCases: ["PythonツールのEXE化", "ZIP配布用の実行ファイル作成", "社内向けWindowsツール配布"],
    related: ["tkinter"],
    googleQuery: "PyInstaller とは",
    references: [{ title: "PyInstaller Manual", url: "https://pyinstaller.org/en/stable/" }],
  },
  {
    slug: "github-pages",
    title: "GitHub Pages",
    category: "Web公開",
    summary: "GitHubリポジトリ内の静的ファイルをWebサイトとして公開できるホスティング機能です。",
    description: [
      "GitHub Pagesは、リポジトリ内のHTML、CSS、画像などをそのまま公開できるGitHubの静的サイト公開機能です。",
      "ツールの紹介ページ、ドキュメント、ダウンロード導線を置く用途に向いています。",
    ],
    useCases: ["ツールの紹介ページを公開する", "READMEより見やすいダウンロードページを作る", "docsフォルダをWebサイトとして配信する"],
    related: ["github-releases", "github-actions", "vercel"],
    googleQuery: "GitHub Pages とは",
    references: [{ title: "GitHub Docs - GitHub Pages", url: "https://docs.github.com/pages" }],
  },
  {
    slug: "github-releases",
    title: "GitHub Releases",
    category: "配布",
    aliases: ["GitHub Release", "Release"],
    summary: "GitHub上でバージョンごとの配布ファイルやリリースノートを公開するための機能です。",
    description: [
      "GitHub Releasesは、タグに紐づけてZIP、EXE、インストーラーなどの配布ファイルを公開できる機能です。",
      "配布物をGit履歴に直接含めず、バージョンごとの成果物として管理できます。",
    ],
    useCases: ["Windows EXEのZIP配布", "バージョンごとの配布ファイル管理", "リリースノートとダウンロード導線をまとめる"],
    related: ["github-pages", "github-actions", "pyinstaller"],
    googleQuery: "GitHub Releases とは",
    references: [{ title: "GitHub Docs - Managing releases", url: "https://docs.github.com/repositories/releasing-projects-on-github/managing-releases-in-a-repository" }],
  },
  {
    slug: "github-actions",
    title: "GitHub Actions",
    category: "CI/CD",
    summary: "GitHub上でビルド、テスト、リリース作成などを自動実行できるワークフロー機能です。",
    description: [
      "GitHub Actionsは、push、pull request、タグ作成などをきっかけに処理を自動実行するCI/CD機能です。",
      "Windows向けPythonツールでは、タグpushをきっかけにPyInstallerでEXEを作り、GitHub ReleasesへZIPを添付する用途にも使えます。",
    ],
    useCases: ["タグpushでRelease ZIPを作る", "テストやビルドを自動化する", "配布作業の手順漏れを減らす"],
    related: ["github-releases", "github-pages", "pyinstaller"],
    googleQuery: "GitHub Actions とは",
    references: [{ title: "GitHub Docs - GitHub Actions", url: "https://docs.github.com/actions" }],
  },
  {
    slug: "tkinter",
    title: "tkinter",
    category: "Python / Windows",
    summary: "Python標準で使える、デスクトップ画面を作るためのGUIライブラリです。",
    description: [
      "tkinterはPythonに標準で付属するGUIライブラリです。",
      "小さな入力画面、設定画面、常駐ツールなどを素早く作る用途に向いています。",
    ],
    useCases: ["Python製デスクトップツール", "設定画面", "小規模な業務補助アプリ"],
    related: ["pyinstaller"],
    googleQuery: "tkinter とは",
    references: [{ title: "Python Docs - tkinter", url: "https://docs.python.org/ja/3/library/tkinter.html" }],
  },
  {
    slug: "vsto",
    title: "VSTO",
    category: "Office開発",
    summary: "ExcelなどのOfficeアプリに機能を追加する.NETベースのアドイン開発技術です。",
    description: [
      "VSTOはVisual Studio Tools for Officeの略です。",
      "ExcelやWordなどに独自のボタン、画面、処理を追加するアドインを作るときに使います。",
    ],
    useCases: ["Excelアドイン開発", "Office業務の自動化", "VBA資産と.NET画面の連携"],
    related: ["wpf", "com", "clickonce"],
    googleQuery: "VSTO とは",
    references: [{ title: "Microsoft Learn - Office solutions development", url: "https://learn.microsoft.com/en-us/visualstudio/vsto/office-solutions-development-overview-vsto" }],
  },
  {
    slug: "wpf",
    title: "WPF",
    category: "Windows UI",
    summary: "Windows向けのデスクトップ画面を作るための.NET UIフレームワークです。",
    description: [
      "WPFはWindows Presentation Foundationの略です。",
      "複雑な画面、データ表示、カスタムUIを作るWindowsデスクトップアプリで使われます。",
    ],
    useCases: ["WindowsデスクトップUI", "VSTOアドインの画面", "コードビューアや解析ツール"],
    related: ["vsto", "avalondock", "avalonedit"],
    googleQuery: "WPF とは",
    references: [{ title: "Microsoft Learn - WPF", url: "https://learn.microsoft.com/en-us/dotnet/desktop/wpf/" }],
  },
  {
    slug: "winforms",
    title: "WinForms",
    category: "Windows UI",
    aliases: ["Windows Forms", "WinForms Form", "System.Windows.Forms"],
    summary: "Windows向けの.NETデスクトップ画面を作るためのUIフレームワークです。",
    description: [
      "WinFormsはWindows Formsの略で、.NETで標準的なWindowsデスクトップ画面を作るためのUI技術です。",
      "VSTO環境では、WPF画面を載せる親ウィンドウや、Officeとの入力フォーカスを安定させる橋渡しとして使うことがあります。",
    ],
    useCases: ["VSTOアドインでWPF画面をホストする", "Windowsデスクトップ画面を作る", "ElementHostでWPF UIを載せる"],
    related: ["wpf", "vsto", "elementhost", "win32-window"],
    googleQuery: "WinForms とは",
    references: [{ title: "Microsoft Learn - Windows Forms", url: "https://learn.microsoft.com/en-us/dotnet/desktop/winforms/" }],
  },
  {
    slug: "elementhost",
    title: "ElementHost",
    category: "Windows UI",
    aliases: ["System.Windows.Forms.Integration.ElementHost"],
    summary: "WinForms画面の中にWPFコントロールを埋め込むための橋渡し用コントロールです。",
    description: [
      "ElementHostは、WinForms上にWPFのUserControlなどを表示するためのWindowsFormsIntegrationの部品です。",
      "既存のWinForms画面やVSTOアドインのウィンドウに、WPFで作った複雑なUIを載せたいときに使います。",
    ],
    useCases: ["WinForms FormにWPF UserControlを載せる", "VSTOアドインでWPF UIを安定表示する", "既存WinForms画面へWPF部品を段階導入する"],
    related: ["winforms", "wpf", "wpf-usercontrol", "vsto"],
    googleQuery: "ElementHost とは",
    references: [{ title: "Microsoft Learn - ElementHost Class", url: "https://learn.microsoft.com/en-us/dotnet/api/system.windows.forms.integration.elementhost" }],
  },
  {
    slug: "custom-task-pane",
    title: "CustomTaskPane",
    category: "Office開発",
    aliases: ["Office CustomTaskPane", "カスタムタスクペイン"],
    summary: "Officeアプリの横などに、アドイン独自の画面を追加するためのVSTO公式拡張ポイントです。",
    description: [
      "CustomTaskPaneは、ExcelやWordなどのOfficeアプリに独自のタスクペインを追加するための仕組みです。",
      "ドック型の補助画面には向いていますが、Floating表示を独立ウィンドウのように完全制御したい場合は制約が出ることがあります。",
    ],
    useCases: ["Excelアドインに補助画面を追加する", "Office画面の横に操作パネルを置く", "WPFやWinFormsのUIをOffice内に組み込む"],
    related: ["vsto", "wpf", "winforms"],
    googleQuery: "VSTO CustomTaskPane とは",
    references: [{ title: "Microsoft Learn - Custom task panes", url: "https://learn.microsoft.com/en-us/visualstudio/vsto/custom-task-panes" }],
  },
  {
    slug: "wpf-usercontrol",
    title: "WPF UserControl",
    category: "Windows UI",
    aliases: ["UserControl"],
    summary: "WPF画面を、独立Windowではなく埋め込み可能な部品として作るための単位です。",
    description: [
      "WPF UserControlは、複数の画面部品や処理をまとめた再利用可能なUI部品です。",
      "VSTOやWinFormsと組み合わせる場合、Windowとして直接表示するよりも、ElementHostに載せる部品として作る方が扱いやすいことがあります。",
    ],
    useCases: ["ElementHostに載せるWPF画面を作る", "複雑な画面を部品化する", "Window依存を避けてUIを再利用する"],
    related: ["wpf", "elementhost", "winforms"],
    googleQuery: "WPF UserControl とは",
    references: [{ title: "Microsoft Learn - UserControl Class", url: "https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.usercontrol" }],
  },
  {
    slug: "win32-window",
    title: "Win32 ウィンドウ",
    category: "Windows開発",
    aliases: ["Win32 window", "Win32", "HWND", "ウィンドウハンドル"],
    summary: "Windows OSが管理するネイティブなウィンドウです。前後関係や親子関係の制御に関わります。",
    description: [
      "Win32ウィンドウは、Windows OSレベルで扱われるウィンドウです。",
      "Excelのメインウィンドウをownerとして渡す場合や、Z-order、終了時の親子関係を考える場合に理解しておくと役立ちます。",
    ],
    useCases: ["Excelのウィンドウハンドルを取得する", "子ウィンドウのownerを指定する", "ウィンドウの前後関係を制御する"],
    related: ["iwin32window", "z-order", "winforms"],
    googleQuery: "Win32 ウィンドウ HWND とは",
    references: [{ title: "Microsoft Learn - Windows", url: "https://learn.microsoft.com/en-us/windows/win32/" }],
  },
  {
    slug: "iwin32window",
    title: "IWin32Window",
    category: "Windows UI",
    aliases: ["System.Windows.Forms.IWin32Window"],
    summary: "WinFormsでownerウィンドウのハンドルを渡すために使うインターフェースです。",
    description: [
      "IWin32Windowは、WinFormsのShow(owner)などに渡すownerウィンドウを表すためのインターフェースです。",
      "VSTOアドインではExcelのメインウィンドウハンドルを包み、独立FormをExcelの子に近い扱いで表示するために使えます。",
    ],
    useCases: ["Form.Show(owner)にExcelのウィンドウを渡す", "Win32ハンドルをWinForms APIへ渡す", "Officeアドインのウィンドウ前後関係を整える"],
    related: ["win32-window", "winforms", "vsto"],
    googleQuery: "IWin32Window とは",
    references: [{ title: "Microsoft Learn - IWin32Window Interface", url: "https://learn.microsoft.com/en-us/dotnet/api/system.windows.forms.iwin32window" }],
  },
  {
    slug: "z-order",
    title: "Z-order",
    category: "Windows開発",
    aliases: ["Zオーダー", "ウィンドウの重なり順"],
    summary: "複数のウィンドウが画面上で前後どの順番に重なるかを表す考え方です。",
    description: [
      "Z-orderは、ウィンドウの前後関係や重なり順を表す用語です。",
      "Excelとアドイン側の独立ウィンドウを併用する場合、owner指定が不十分だと、前後関係や終了時の挙動が不自然になることがあります。",
    ],
    useCases: ["Excelの上にツール画面を自然に表示する", "独立ウィンドウの前後関係を整理する", "owner指定の必要性を判断する"],
    related: ["win32-window", "iwin32window", "winforms"],
    googleQuery: "Z-order ウィンドウ とは",
    references: [{ title: "Microsoft Learn - Window Features", url: "https://learn.microsoft.com/en-us/windows/win32/winmsg/window-features" }],
  },
  {
    slug: "com",
    title: "COM",
    category: "Windows / Office",
    summary: "Windowsアプリ同士やOffice機能を連携させるために使われる古くからある部品化技術です。",
    description: [
      "COMはComponent Object Modelの略です。",
      "Office自動化やVBE操作では、COMオブジェクトを経由してExcelやVBAプロジェクトへアクセスすることがあります。",
    ],
    useCases: ["ExcelやVBEの操作", "Officeアドイン開発", "既存Windows資産との連携"],
    related: ["vsto", "vbide", "dto"],
    googleQuery: "COM Component Object Model とは",
    references: [{ title: "Microsoft Learn - COM", url: "https://learn.microsoft.com/en-us/windows/win32/com/component-object-model--com--portal" }],
  },
  {
    slug: "clickonce",
    title: "ClickOnce",
    category: "Windows配布",
    summary: "Windowsアプリをインストール・更新しやすくするMicrosoftの配布方式です。",
    description: [
      "ClickOnceは、VSTOやWPFアプリをユーザー環境へ配布するために使える仕組みです。",
      "共有フォルダやWebサーバーを使って、起動時に更新確認を行う構成も取れます。",
    ],
    useCases: ["VSTOアドイン配布", "WPFアプリ配布", "社内向け自動更新"],
    related: ["vsto", "wpf"],
    googleQuery: "ClickOnce とは",
    references: [{ title: "Microsoft Learn - ClickOnce", url: "https://learn.microsoft.com/en-us/visualstudio/deployment/clickonce-security-and-deployment" }],
  },
  {
    slug: "runtimeidentifier",
    title: "RuntimeIdentifier",
    category: ".NET",
    aliases: ["RuntimeIdentifiers", "RID"],
    summary: ".NETで対象OSや実行環境を識別するためのランタイムID指定です。",
    description: [
      "RuntimeIdentifierは、win-x64やlinux-x64のように、アプリの実行対象環境を表す値です。",
      "VSTOなど旧形式csprojでも、参照先プロジェクトやNuGetの都合でRuntimeIdentifiersの指定が必要になることがあります。",
    ],
    useCases: ["ClickOnce発行エラー対応", "NuGet復元", ".NETビルド設定"],
    related: ["clickonce", "vsto", "nuget"],
    googleQuery: "RuntimeIdentifier RuntimeIdentifiers とは",
  },
  {
    slug: "nuget",
    title: "NuGet",
    category: ".NET",
    aliases: ["PackageReference", "NuGet package"],
    summary: ".NET向けのライブラリ管理・パッケージ復元の仕組みです。",
    description: [
      "NuGetは、.NETプロジェクトで外部ライブラリを参照し、必要なパッケージを復元するために使われます。",
      "SDK形式プロジェクトやPackageReferenceを使うと、ランタイムIDや依存ライブラリの検証がビルド時に影響することがあります。",
    ],
    useCases: ["外部ライブラリ参照", "PackageReference管理", "ビルド時の依存解決"],
    related: ["runtimeidentifier", "clickonce"],
    googleQuery: "NuGet とは",
  },
  {
    slug: "lexer",
    title: "Lexer",
    reading: "レキサー",
    category: "コード解析",
    summary: "ソースコードの文字列を、識別子や記号などの小さな単位に分ける処理です。",
    description: [
      "Lexerは字句解析器とも呼ばれます。",
      "文字列検索だけでは誤検出しやすいコード解析で、まずソースをトークンに分ける役割を持ちます。",
    ],
    useCases: ["VBAコード解析", "識別子の抽出", "コメントや文字列リテラルの除外"],
    related: ["parser", "resolver", "symboltable"],
    googleQuery: "Lexer 字句解析 とは",
  },
  {
    slug: "parser",
    title: "Parser",
    reading: "パーサー",
    category: "コード解析",
    summary: "トークン列から、宣言や手続きなどの構造を読み取る処理です。",
    description: [
      "Parserは構文解析器とも呼ばれます。",
      "Lexerが分けたトークンを使って、関数、引数、宣言、ブロック構造などを解釈します。",
    ],
    useCases: ["コード構造の抽出", "関数一覧の作成", "参照解析の前処理"],
    related: ["lexer", "resolver", "symboltable"],
    googleQuery: "Parser 構文解析 とは",
  },
  {
    slug: "dto",
    title: "DTO",
    category: "設計",
    summary: "層の間でデータを受け渡すための、処理を持たないシンプルなデータ構造です。",
    description: [
      "DTOはData Transfer Objectの略です。",
      "COMなど外部依存が強い処理と、テストしやすい解析エンジンの境界を分けるときに役立ちます。",
    ],
    useCases: ["COM境界の分離", "テストしやすいデータ受け渡し", "UIとロジックの分離"],
    related: ["com", "resolver"],
    googleQuery: "DTO Data Transfer Object とは",
  },
  {
    slug: "cache-service",
    title: "CacheService",
    category: "Google Apps Script",
    summary: "Google Apps Scriptで一時的なデータを保存し、処理を高速化するためのサービスです。",
    description: [
      "CacheServiceを使うと、スプレッドシート読み込みなど重い処理の結果を短時間キャッシュできます。",
      "同じデータを何度も読み込むWebアプリでは、体感速度の改善に役立ちます。",
    ],
    useCases: ["スプレッドシート読み込みの高速化", "検索候補の一時保存", "API結果の短期キャッシュ"],
    related: ["google-script-run"],
    googleQuery: "GAS CacheService とは",
    references: [{ title: "Apps Script - CacheService", url: "https://developers.google.com/apps-script/reference/cache/cache-service" }],
  },
  {
    slug: "google-script-run",
    title: "google.script.run",
    category: "Google Apps Script",
    summary: "GASのHTML画面からサーバー側のApps Script関数を呼び出すためのAPIです。",
    description: [
      "google.script.runは、GAS Webアプリのフロントエンドからサーバー側関数を非同期で呼び出す仕組みです。",
      "成功時と失敗時のハンドラを必ず用意すると、ユーザーに分かりやすい画面になります。",
    ],
    useCases: ["フォーム送信", "スプレッドシート保存", "サーバー側データ取得"],
    related: ["cache-service"],
    googleQuery: "google.script.run とは",
    references: [{ title: "Apps Script - google.script.run", url: "https://developers.google.com/apps-script/guides/html/reference/run" }],
  },
  {
    slug: "xss",
    title: "XSS",
    category: "セキュリティ",
    summary: "Webページに悪意あるスクリプトを埋め込まれてしまう脆弱性です。",
    description: [
      "XSSはCross-Site Scriptingの略です。",
      "ユーザー入力をHTMLにそのまま出すと、意図しないJavaScriptが実行される危険があります。",
    ],
    useCases: ["HTMLエスケープの必要性", "入力値表示の安全対策", "Webアプリのセキュリティ確認"],
    related: ["html-escape"],
    googleQuery: "XSS とは",
    references: [{ title: "MDN Web Docs - Cross-site scripting", url: "https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting" }],
  },
  {
    slug: "canvas",
    title: "Canvas",
    category: "Web開発",
    summary: "ブラウザ上で図形や画像をプログラムから描画するためのHTML要素です。",
    description: [
      "Canvasは、JavaScriptからピクセル単位で描画できるHTMLの機能です。",
      "画像合成、グラフ描画、ゲーム、エクスポート用画像生成などで使われます。",
    ],
    useCases: ["画像の合成出力", "グリッドや図形の描画", "PNGダウンロード"],
    related: ["base64", "uint8array"],
    googleQuery: "Canvas HTML とは",
    references: [{ title: "MDN Web Docs - Canvas API", url: "https://developer.mozilla.org/ja/docs/Web/API/Canvas_API" }],
  },
  {
    slug: "base64",
    title: "base64",
    category: "データ変換",
    summary: "バイナリデータを文字列として扱うためのエンコード方式です。",
    description: [
      "base64は、画像やDBバイナリのようなデータを文字列に変換する方式です。",
      "localStorageなど文字列保存が前提の場所へバイナリを保存したいときに使われます。",
    ],
    useCases: ["Uint8Arrayの保存", "画像データの文字列化", "ブラウザストレージへの保存"],
    related: ["uint8array", "localstorage"],
    googleQuery: "base64 とは",
    references: [{ title: "MDN Web Docs - Base64", url: "https://developer.mozilla.org/ja/docs/Glossary/Base64" }],
  },
  {
    slug: "uint8array",
    title: "Uint8Array",
    category: "JavaScript",
    summary: "0から255までの数値を並べた、バイナリデータ向けの配列です。",
    description: [
      "Uint8Arrayは、JavaScriptでバイナリデータを扱うための型付き配列です。",
      "ファイル、画像、WebAssembly、SQLite DBなどのバイナリ表現で登場します。",
    ],
    useCases: ["DBファイルの読み書き", "base64変換", "バイナリデータ処理"],
    related: ["base64", "webassembly"],
    googleQuery: "Uint8Array とは",
    references: [{ title: "MDN Web Docs - Uint8Array", url: "https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array" }],
  },
  {
    slug: "web-audio-api",
    title: "WebAudio API",
    category: "Web開発",
    summary: "ブラウザで音声の生成、再生、加工、精密なスケジューリングを行うためのAPIです。",
    description: [
      "WebAudio APIは、単に音を鳴らすだけでなく、再生タイミングや音量、周波数などを細かく制御できます。",
      "モールス信号のように正確なタイミングが必要な音声処理で役立ちます。",
    ],
    useCases: ["モールス信号の再生", "音声タイミング制御", "ブラウザ上の音響処理"],
    related: ["audiocontext"],
    googleQuery: "Web Audio API とは",
    references: [{ title: "MDN Web Docs - Web Audio API", url: "https://developer.mozilla.org/ja/docs/Web/API/Web_Audio_API" }],
  },
  {
    slug: "iife",
    title: "IIFE",
    category: "JavaScript",
    summary: "定義した直後に実行するJavaScript関数の書き方です。",
    description: [
      "IIFEはImmediately Invoked Function Expressionの略です。",
      "フレームワークを使わないJavaScriptで、グローバル変数を増やさずにモジュール風の構造を作るときに使えます。",
    ],
    useCases: ["バニラJSの共通UIモジュール", "スコープ汚染の回避", "小規模アプリの整理"],
    related: ["javascript"],
    googleQuery: "IIFE JavaScript とは",
  },
  {
    slug: "nodejs-module",
    title: "Node.js モジュール",
    category: "JavaScript",
    aliases: ["Node.js module", "Node.jsモジュール"],
    summary: "Node.js上で読み込んで使う、機能単位に分けられたJavaScriptの部品です。",
    description: [
      "Node.js モジュールは、ファイル操作、DB接続、ビルド処理などの機能をアプリから読み込んで使うための部品です。",
      "Electronでは便利ですが、OSやNode.jsのバージョンに依存するネイティブモジュールはビルドや配布で注意が必要です。",
    ],
    useCases: ["ElectronアプリでOS機能を使う", "npmパッケージをアプリに組み込む", "機能をファイル単位で分割する"],
    related: ["electron", "electron-rebuild", "visual-cpp-build-tools"],
    googleQuery: "Node.js モジュール とは",
    references: [{ title: "Node.js - Modules", url: "https://nodejs.org/api/modules.html" }],
  },
  {
    slug: "visual-cpp-build-tools",
    title: "Visual C++ Build Tools",
    category: "Windows開発",
    aliases: ["Visual C++ Build Tools", "C++ Build Tools"],
    summary: "WindowsでC/C++を含むNode.jsネイティブモジュールをビルドするためのMicrosoft製ツール群です。",
    description: [
      "Visual C++ Build Toolsは、Visual Studio本体を入れなくてもC++コンパイラやWindows SDKを使えるようにする開発ツールです。",
      "better-sqlite3のようなネイティブモジュールをWindowsでインストール・再ビルドするときに必要になることがあります。",
    ],
    useCases: ["better-sqlite3をWindowsでビルドする", "Electron向けネイティブモジュールを再構築する", "node-gypのビルドエラーを解消する"],
    related: ["nodejs-module", "electron-rebuild", "electron"],
    googleQuery: "Visual C++ Build Tools とは",
    references: [{ title: "Microsoft C++ Build Tools", url: "https://visualstudio.microsoft.com/visual-cpp-build-tools/" }],
  },
  {
    slug: "electron-rebuild",
    title: "electron-rebuild",
    category: "デスクトップアプリ",
    summary: "Node.js向けネイティブモジュールを、Electronの実行環境に合わせて再ビルドするためのツールです。",
    description: [
      "Electronは通常のNode.jsとは内部のABIが異なるため、ネイティブモジュールをそのまま使えないことがあります。",
      "electron-rebuildを使うと、better-sqlite3などのモジュールをElectron版Nodeに合わせてビルドし直せます。",
    ],
    useCases: ["Electronでbetter-sqlite3を使う", "ABI不一致エラーを解消する", "配布前にネイティブ依存を検証する"],
    related: ["electron", "nodejs-module", "visual-cpp-build-tools", "abi-compatibility"],
    googleQuery: "electron-rebuild とは",
    references: [{ title: "electron/rebuild", url: "https://github.com/electron/rebuild" }],
  },
  {
    slug: "better-sqlite3",
    title: "better-sqlite3",
    category: "データベース",
    summary: "Node.jsからSQLiteを高速に扱うためのネイティブモジュールです。",
    description: [
      "better-sqlite3は同期APIでSQLiteを扱えるNode.jsライブラリです。",
      "ElectronアプリでローカルDBを使う場合に便利ですが、ネイティブモジュールなのでビルド環境やElectronとのABI互換に注意が必要です。",
    ],
    useCases: ["ElectronアプリでSQLiteを高速に扱う", "ローカルDBを同期APIでシンプルに操作する", "業務用デスクトップアプリのマスタ管理を作る"],
    related: ["sqlite", "electron", "electron-rebuild", "nodejs-module"],
    googleQuery: "better-sqlite3 とは",
    references: [{ title: "better-sqlite3", url: "https://github.com/WiseLibs/better-sqlite3" }],
  },
  {
    slug: "abi-compatibility",
    title: "ABI互換",
    category: "Windows開発",
    aliases: ["ABI 互換", "ABI"],
    summary: "コンパイル済みの部品同士が、同じ約束で関数やデータをやり取りできる状態です。",
    description: [
      "ABIはApplication Binary Interfaceの略で、実行時のバイナリ同士の接続ルールを指します。",
      "Node.jsやElectronのバージョンが変わるとABIが変わり、ネイティブモジュールの再ビルドが必要になることがあります。",
    ],
    useCases: ["Electronでネイティブモジュールを使う", "DLLやC++ライブラリを連携する", "実行時エラーの原因を切り分ける"],
    related: ["electron", "nodejs-module", "electron-rebuild"],
    googleQuery: "ABI互換 とは",
  },
  {
    slug: "indexeddb",
    title: "IndexedDB",
    category: "Web開発",
    summary: "ブラウザ内に大きめの構造化データを保存するためのデータベース機能です。",
    description: [
      "IndexedDBは、localStorageより大きなデータやバイナリデータをブラウザに保存したいときに使います。",
      "オフライン対応やブラウザ版アプリのローカルキャッシュに向いています。",
    ],
    useCases: ["ブラウザで大容量データを保存する", "オフライン対応アプリを作る", "base64変換せずにバイナリを保存する"],
    related: ["localstorage", "base64", "uint8array"],
    googleQuery: "IndexedDB とは",
    references: [{ title: "MDN Web Docs - IndexedDB", url: "https://developer.mozilla.org/ja/docs/Web/API/IndexedDB_API" }],
  },
  {
    slug: "audiocontext",
    title: "AudioContext",
    category: "Web開発",
    summary: "Web Audio APIで音声の生成・再生・加工を管理する中心的なオブジェクトです。",
    description: [
      "AudioContextは、ブラウザ上で音を鳴らすための時間軸や音声ノードをまとめて管理します。",
      "モールス信号やメトロノームのように、タイミング精度が重要な音声処理でよく使われます。",
    ],
    useCases: ["ブラウザで正確なタイミングの音を鳴らす", "発振器でビープ音を作る", "音量や再生時刻を細かく制御する"],
    related: ["web-audio-api"],
    googleQuery: "AudioContext とは",
    references: [{ title: "MDN Web Docs - AudioContext", url: "https://developer.mozilla.org/ja/docs/Web/API/AudioContext" }],
  },
  {
    slug: "recharts",
    title: "Recharts",
    category: "Web開発",
    summary: "Reactで折れ線グラフや円グラフなどを作るためのグラフ描画ライブラリです。",
    description: [
      "Rechartsは、Reactコンポーネントとしてグラフを組み立てられるライブラリです。",
      "ダッシュボードや集計画面で、データの傾向を視覚的に見せたいときに使います。",
    ],
    useCases: ["円グラフに割合を表示する", "作業時間や売上の推移をグラフ化する", "Next.jsアプリにグラフを組み込む"],
    related: ["nextjs"],
    googleQuery: "Recharts とは",
    references: [{ title: "Recharts", url: "https://recharts.org/" }],
  },
  {
    slug: "sheetjs",
    title: "SheetJS",
    category: "Web開発",
    aliases: ["xlsx"],
    summary: "JavaScriptでExcelファイルを読み書きするためのライブラリです。",
    description: [
      "SheetJSは、ブラウザやNode.jsでxlsxファイルを生成・読込できるライブラリです。",
      "Webアプリから集計結果をExcel形式で出力したい場面でよく使われます。",
    ],
    useCases: ["ブラウザでExcelファイルを生成する", "複数シートのxlsxを出力する", "業務アプリのエクスポート機能を作る"],
    related: ["nextjs"],
    googleQuery: "SheetJS とは",
    references: [{ title: "SheetJS Community Edition", url: "https://docs.sheetjs.com/" }],
  },
  {
    slug: "resolver",
    title: "Resolver",
    category: "コード解析",
    summary: "コード中の名前が、実際にはどの関数・変数・宣言を指すのかを解決する処理です。",
    description: [
      "Resolverは、Parserが取り出した構造やLexerが見つけた識別子をもとに、参照先を決める役割を持ちます。",
      "VBA解析では、同名の関数や外部ライブラリのPublicシンボルを区別するために重要です。",
    ],
    useCases: ["未使用コード検出", "参照グラフの作成", "外部プロジェクトのPublicシンボル解決"],
    related: ["lexer", "parser", "symboltable"],
    googleQuery: "Resolver コード解析 とは",
  },
  {
    slug: "symboltable",
    title: "SymbolTable",
    category: "コード解析",
    aliases: ["Symbol Table", "シンボルテーブル"],
    summary: "関数名・変数名・定数名など、コード中の名前と意味を登録しておく表です。",
    description: [
      "SymbolTableは、Parserで取り出した宣言や、Lexerで見つけた識別子を管理するためのデータ構造です。",
      "Resolverはこの表を参照して、名前がどの定義に対応するかを判断します。",
    ],
    useCases: ["VBAプロジェクト内の関数一覧を作る", "参照先の解決精度を上げる", "重複名や未定義名を検出する"],
    related: ["lexer", "parser", "resolver"],
    googleQuery: "Symbol Table コード解析 とは",
  },
  {
    slug: "avalondock",
    title: "AvalonDock",
    category: "Windows UI",
    summary: "WPFアプリで、Visual Studioのようなドッキング可能なペインUIを作るためのライブラリです。",
    description: [
      "AvalonDockを使うと、複数のツールウィンドウやドキュメントを分割・タブ化・ドッキングできるUIを作れます。",
      "コード解析ツールや業務支援ツールのように、複数ペインを並べて操作する画面で役立ちます。",
    ],
    useCases: ["WPFで複数ペインの画面を作る", "ツールウィンドウをドッキング可能にする", "コードビューアや解析ツールのUIを作る"],
    related: ["wpf", "avalonedit"],
    googleQuery: "AvalonDock とは",
    references: [{ title: "AvalonDock", url: "https://github.com/xceedsoftware/wpftoolkit/wiki/AvalonDock" }],
  },
  {
    slug: "avalonedit",
    title: "AvalonEdit",
    category: "Windows UI",
    summary: "WPFアプリにコードエディタやテキストビューアを組み込むためのライブラリです。",
    description: [
      "AvalonEditは、シンタックスハイライトや行番号表示など、コード表示に必要な機能を持つWPF向けエディタコンポーネントです。",
      "検索ハイライトや解析結果の表示など、コード解析ツールの画面部品として使いやすいライブラリです。",
    ],
    useCases: ["WPFでコードビューアを作る", "検索結果を本文中でハイライトする", "VBAや設定ファイルの閲覧画面を作る"],
    related: ["wpf", "avalondock"],
    googleQuery: "AvalonEdit とは",
    references: [{ title: "AvalonEdit", url: "https://github.com/icsharpcode/AvalonEdit" }],
  },
  {
    slug: "html-escape",
    title: "HTMLエスケープ",
    category: "セキュリティ",
    aliases: ["escapeHtml", "HTML Escape"],
    summary: "HTMLとして解釈される特殊文字を、安全な文字表現に置き換える処理です。",
    description: [
      "HTMLエスケープは、ユーザー入力に含まれる < や > などをそのままHTMLとして実行させないための基本対策です。",
      "GASやVanilla JSでinnerHTMLを使う場合、XSSを防ぐために特に重要です。",
    ],
    useCases: ["ユーザー入力を画面に表示する", "エラーメッセージをinnerHTMLへ入れる", "XSS対策を行う"],
    related: ["xss"],
    googleQuery: "HTMLエスケープ とは",
    references: [{ title: "OWASP - Cross Site Scripting Prevention", url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html" }],
  },
  {
    slug: "json",
    title: "JSON",
    category: "Web開発",
    summary: "Web APIやJavaScriptでよく使われる、軽量なデータ表現形式です。",
    description: [
      "JSONは、文字列・数値・真偽値・配列・オブジェクトを表現できるデータ形式です。",
      "GASのgoogle.script.runやWeb APIでは、受け渡しできる値がJSON互換に制限されることがあります。",
    ],
    useCases: ["クライアントとサーバー間でデータを渡す", "設定ファイルを保存する", "APIレスポンスを扱う"],
    related: ["google-script-run"],
    googleQuery: "JSON とは",
    references: [{ title: "MDN Web Docs - JSON", url: "https://developer.mozilla.org/ja/docs/Learn_web_development/Core/Scripting/JSON" }],
  },
  {
    slug: "datacontractjsonserializer",
    title: "DataContractJsonSerializer",
    category: ".NET",
    aliases: ["DataContractSerializer"],
    summary: ".NETでDataContract属性を付けたクラスをJSONとして保存・読み込みするためのシリアライザです。",
    description: [
      "DataContractJsonSerializerは、設定クラスやDTOをJSONへ変換し、後から読み戻すために使えます。",
      "読み込み時にコンストラクタやフィールド初期化子が期待通り動かないケースがあるため、古い設定ファイルとの互換性には注意が必要です。",
    ],
    useCases: ["設定ファイル保存", "JSON読み込み", "バージョン更新時の設定マイグレーション"],
    related: ["json", "on-deserialized", "wpf"],
    googleQuery: "DataContractJsonSerializer とは",
    references: [{ title: "Microsoft Learn - DataContractJsonSerializer", url: "https://learn.microsoft.com/dotnet/api/system.runtime.serialization.json.datacontractjsonserializer" }],
  },
  {
    slug: "on-deserialized",
    title: "OnDeserialized",
    category: ".NET",
    aliases: ["OnDeserializedAttribute", "[OnDeserialized]"],
    summary: "オブジェクトのデシリアライズ完了後に補正処理を実行するための属性です。",
    description: [
      "OnDeserializedを付けたメソッドは、DataContractSerializerなどでオブジェクトを復元したあとに呼ばれます。",
      "古い設定ファイルに存在しない新規プロパティへ既定値を補填するマイグレーション処理に使えます。",
    ],
    useCases: ["設定ファイルの互換性維持", "null補填", "データ移行"],
    related: ["datacontractjsonserializer", "json"],
    googleQuery: "OnDeserializedAttribute とは",
    references: [{ title: "Microsoft Learn - OnDeserializedAttribute", url: "https://learn.microsoft.com/dotnet/api/system.runtime.serialization.ondeserializedattribute" }],
  },
  {
    slug: "spa",
    title: "SPA",
    category: "Web開発",
    aliases: ["シングルページアプリケーション"],
    summary: "ページ全体を再読み込みせず、画面の一部を書き換えながら動くWebアプリの形式です。",
    description: [
      "SPAはSingle Page Applicationの略で、操作に応じて必要な部分だけを更新します。",
      "GASのHTML画面でも、innerHTMLの差し替えでSPA風の軽い画面遷移を作れます。",
    ],
    useCases: ["GAS Webアプリの画面遷移を軽くする", "フォーム画面と一覧画面を切り替える", "小規模Webツールをシンプルに作る"],
    related: ["google-script-run", "html-escape"],
    googleQuery: "SPA シングルページアプリケーション とは",
  },
  {
    slug: "markdown",
    title: "Markdown",
    category: "ドキュメント",
    summary: "見出し・箇条書き・コードブロックなどを、プレーンテキストで書ける文書形式です。",
    description: [
      "Markdownは、READMEや技術メモ、ブログ記事の原稿でよく使われる軽量な記法です。",
      "開発資産を1テクニック1ファイルで残す場合にも、検索しやすく差分管理しやすい形式です。",
    ],
    useCases: ["技術記事を書く", "READMEを整備する", "開発ノウハウを資産化する"],
    related: ["mdx"],
    googleQuery: "Markdown とは",
  },
  {
    slug: "mdx",
    title: "MDX",
    category: "ドキュメント",
    summary: "Markdownの中にReactコンポーネントを埋め込める記事記法です。",
    description: [
      "MDXを使うと、通常のMarkdown記事に、用語リンクやカードなどのReactコンポーネントを差し込めます。",
      "このテックブログでは、記事本文の中でTermコンポーネントを使い、用語集やGoogle検索へ誘導しています。",
    ],
    useCases: ["技術ブログの記事を書く", "記事内に独自コンポーネントを入れる", "コード例とUI部品を同じ記事に置く"],
    related: ["markdown", "nextjs"],
    googleQuery: "MDX とは",
    references: [{ title: "MDX", url: "https://mdxjs.com/" }],
  },
  {
    slug: "vbide",
    title: "VBIDE",
    category: "Office開発",
    summary: "VBAプロジェクトやコードモジュールをプログラムから操作するためのOffice開発向けオブジェクト群です。",
    description: [
      "VBIDEは、VBE上のプロジェクト、モジュール、コード行などへアクセスするために使われます。",
      "VBA解析ツールでは、ExcelやAccess内のVBAコードを読み出す入口として登場します。",
    ],
    useCases: ["VBAコードを自動で読み出す", "モジュール一覧を取得する", "VSTOからVBE情報を扱う"],
    related: ["com", "vsto", "dto"],
    googleQuery: "VBIDE とは",
    references: [{ title: "Microsoft Learn - Visual Basic Add-in Model", url: "https://learn.microsoft.com/en-us/office/vba/language/reference/visual-basic-add-in-model" }],
  },
  {
    slug: "vba",
    title: "VBA",
    category: "Excel VBA",
    aliases: ["Excel VBA", "Visual Basic for Applications"],
    summary: "ExcelやAccessなどのOffice製品で処理を自動化するためのプログラミング言語です。",
    description: [
      "VBAはVisual Basic for Applicationsの略で、Excelの入力処理、集計、帳票作成、チェック処理などを自動化するときによく使われます。",
      "小さな汎用プロシージャを部品として残しておくと、入力チェックやメッセージ表示のような繰り返し処理を再利用しやすくなります。",
    ],
    useCases: ["Excel作業の自動化", "入力チェック", "帳票作成", "業務マクロ"],
    related: ["vbide", "paramarray", "msgbox"],
    googleQuery: "VBA Excel とは",
    references: [{ title: "Microsoft Learn - VBA", url: "https://learn.microsoft.com/office/vba/api/overview/" }],
  },
  {
    slug: "procedure",
    title: "プロシージャ",
    category: "Excel VBA",
    aliases: ["Subプロシージャ", "Functionプロシージャ", "Procedure"],
    summary: "VBAで一まとまりの処理を名前付きで定義したものです。",
    description: [
      "プロシージャは、SubやFunctionで作る処理のまとまりです。",
      "1つのプロシージャを1つの目的に絞ると、呼び出しや再利用がしやすくなります。",
    ],
    useCases: ["処理の分割", "共通処理の再利用", "VBAコードの整理"],
    related: ["vba", "module", "argument", "return-value"],
    googleQuery: "VBA プロシージャ とは",
  },
  {
    slug: "module",
    title: "標準モジュール",
    category: "Excel VBA",
    aliases: ["VBAモジュール", "Module"],
    summary: "VBAのプロシージャや宣言をまとめて保存するコードの入れ物です。",
    description: [
      "標準モジュールは、複数のSubやFunctionをまとめて置く場所です。",
      "配列処理、セル操作、ファイル操作のように役割ごとにモジュールを分けると、あとから探しやすくなります。",
    ],
    useCases: ["共通関数の整理", "役割別のコード管理", "VBA部品化"],
    related: ["vba", "procedure", "refactoring"],
    googleQuery: "VBA 標準モジュール とは",
  },
  {
    slug: "argument",
    title: "引数",
    category: "プログラミング基礎",
    aliases: ["Argument", "パラメータ", "Parameter"],
    summary: "関数やプロシージャに外から渡す値です。",
    description: [
      "引数は、処理に必要な値を呼び出し側から渡すための入口です。",
      "引数名と型を明確にすると、部品として何を受け取る処理なのかが読みやすくなります。",
    ],
    useCases: ["共通関数への値渡し", "入力値の明確化", "処理の汎用化"],
    related: ["procedure", "return-value", "paramarray"],
    googleQuery: "プログラミング 引数 とは",
  },
  {
    slug: "return-value",
    title: "戻り値",
    category: "プログラミング基礎",
    aliases: ["返り値", "Return value"],
    summary: "関数が処理結果として呼び出し元へ返す値です。",
    description: [
      "戻り値は、Functionなどの処理結果を呼び出し元へ返すための値です。",
      "VBAの汎用部品では、成功失敗をBooleanで返す、加工済み配列を返す、Rangeを返すなど、戻り値の意味を明確にしておくことが重要です。",
    ],
    useCases: ["入力チェック結果", "変換結果の受け取り", "処理成功可否の判定"],
    related: ["procedure", "argument", "boolean"],
    googleQuery: "プログラミング 戻り値 とは",
  },
  {
    slug: "side-effect",
    title: "副作用",
    category: "プログラミング基礎",
    aliases: ["Side effect"],
    summary: "関数の戻り値以外に、外部の状態を変更する動きです。",
    description: [
      "副作用は、セルを書き換える、ファイルを保存する、画面を表示する、グローバル変数を変えるなど、処理の外側に影響を与える動きです。",
      "部品化では、副作用がある処理とない処理を分けると、再利用時の予期しない動作を減らせます。",
    ],
    useCases: ["安全な共通関数設計", "セル操作処理の分離", "ファイル操作の注意点整理"],
    related: ["refactoring", "procedure"],
    googleQuery: "プログラミング 副作用 とは",
  },
  {
    slug: "refactoring",
    title: "リファクタリング",
    category: "プログラミング基礎",
    aliases: ["Refactoring"],
    summary: "外から見た動きを変えずに、コードの構造を読みやすく保守しやすく直す作業です。",
    description: [
      "リファクタリングは、機能追加ではなくコードの整理を目的にした改善です。",
      "VBAでは、長いマクロを役割ごとのプロシージャに分ける、案件固有処理と汎用処理を分離する、といった作業が該当します。",
    ],
    useCases: ["長いVBAコードの整理", "共通処理の切り出し", "保守しやすい構成への改善"],
    related: ["vba", "procedure", "module", "side-effect"],
    googleQuery: "リファクタリング とは",
  },
  {
    slug: "paramarray",
    title: "ParamArray",
    category: "Excel VBA",
    summary: "VBAの関数やSubに、個数が決まっていない引数をまとめて渡すための引数宣言です。",
    description: [
      "ParamArrayを使うと、引数を1個、2個、4個のように可変個数で受け取れます。",
      "入力値名と入力値を交互に渡すような汎用チェック関数では、項目数が変わっても同じ関数を使えるため便利です。",
    ],
    useCases: ["入力チェック関数", "可変個数の条件指定", "共通メッセージ処理"],
    related: ["vba", "variant"],
    googleQuery: "VBA ParamArray とは",
    references: [{ title: "Microsoft Learn - ParamArray", url: "https://learn.microsoft.com/office/vba/language/reference/user-interface-help/paramarray-must-be-declared-as-an-array-of-variant" }],
  },
  {
    slug: "msgbox",
    title: "MsgBox",
    category: "Excel VBA",
    aliases: ["メッセージボックス"],
    summary: "VBAでユーザーに確認や警告のメッセージを表示するための関数です。",
    description: [
      "MsgBoxは、処理の途中で入力漏れや確認事項をユーザーに伝えるときに使います。",
      "入力チェックでは、どの項目が未入力なのかをその場で表示できるため、ユーザーが修正しやすくなります。",
    ],
    useCases: ["入力漏れ警告", "処理完了通知", "確認ダイアログ"],
    related: ["vba", "boolean"],
    googleQuery: "VBA MsgBox とは",
    references: [{ title: "Microsoft Learn - MsgBox function", url: "https://learn.microsoft.com/office/vba/language/reference/user-interface-help/msgbox-function" }],
  },
  {
    slug: "boolean",
    title: "Boolean",
    category: "プログラミング基礎",
    aliases: ["真偽値"],
    summary: "TrueまたはFalseのどちらかを表すデータ型です。",
    description: [
      "Booleanは、処理が成功したか、条件を満たしたか、といった二択の結果を返すときに使います。",
      "入力チェック関数では、問題がなければTrue、未入力があればFalseを返す形にすると呼び出し側で分岐しやすくなります。",
    ],
    useCases: ["条件判定", "入力チェック結果", "処理継続可否の返却"],
    related: ["vba", "msgbox"],
    googleQuery: "Boolean 真偽値 とは",
  },
  {
    slug: "variant",
    title: "Variant",
    category: "Excel VBA",
    summary: "VBAで文字列、数値、日付など複数種類の値を受け取れる汎用的なデータ型です。",
    description: [
      "Variantは値の型が固定されていないため、ParamArrayのようにさまざまな値をまとめて受け取る場面で使われます。",
      "便利な一方で、意図しない型が入る可能性もあるため、共通関数では入力の前提を明確にしておくことが重要です。",
    ],
    useCases: ["可変引数", "型が混在する値の受け取り", "Excelセル値の受け取り"],
    related: ["vba", "paramarray"],
    googleQuery: "VBA Variant とは",
  },
  {
    slug: "ubound",
    title: "UBound",
    category: "Excel VBA",
    summary: "VBAの配列で、指定した次元の最大インデックスを取得する関数です。",
    description: [
      "UBoundを使うと、配列に何番目まで値が入っているかを調べられます。",
      "ParamArrayで受け取った引数の個数を確認し、名前と値がペアで渡されているかを判定する用途に使えます。",
    ],
    useCases: ["配列の要素数確認", "ParamArrayの入力数確認", "ループ範囲の決定"],
    related: ["vba", "paramarray"],
    googleQuery: "VBA UBound とは",
    references: [{ title: "Microsoft Learn - UBound function", url: "https://learn.microsoft.com/office/vba/language/reference/user-interface-help/ubound-function" }],
  },
  {
    slug: "xlookup",
    title: "XLOOKUP",
    category: "Excel",
    aliases: ["XLOOKUP関数", "エックスルックアップ"],
    summary: "Excelで検索値に一致する行や列から対応する値を取得するための検索関数です。",
    description: [
      "XLOOKUPは、従来のVLOOKUPやHLOOKUPより柔軟に検索できるExcel関数です。",
      "VBAでは、標準関数をそのまま使うだけでなく、配列上の検索処理として考え方を応用することがあります。",
    ],
    useCases: ["マスタ参照", "コードから名称の取得", "検索条件に合う値の取得"],
    related: ["vba", "two-dimensional-array"],
    googleQuery: "Excel XLOOKUP 関数 とは",
    references: [{ title: "Microsoft Support - XLOOKUP function", url: "https://support.microsoft.com/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929" }],
  },
  {
    slug: "two-dimensional-array",
    title: "二次元配列",
    category: "プログラミング基礎",
    aliases: ["2次元配列", "2D Array", "Array2D"],
    summary: "行と列のように、2方向の添字で値を持つ配列です。",
    description: [
      "二次元配列は、表形式のデータをメモリ上で扱うときによく使われます。",
      "Excel VBAでは、セル範囲のValueをまとめて取得すると、行番号と列番号で参照できる二次元配列として扱えます。",
    ],
    useCases: ["Excel範囲の一括読み込み", "表データ検索", "高速な集計処理"],
    related: ["vba", "variant", "xlookup"],
    googleQuery: "VBA 二次元配列 とは",
  },
  {
    slug: "userform",
    title: "UserForm",
    category: "Excel VBA",
    aliases: ["ユーザーフォーム"],
    summary: "Excel VBAで独自の入力画面や操作画面を作るためのフォームです。",
    description: [
      "UserFormを使うと、テキストボックス、ラベル、ボタンなどを配置した独自画面をExcel上で表示できます。",
      "業務マクロでは、入力補助画面や設定画面を作るときによく使われます。",
    ],
    useCases: ["入力フォーム", "設定画面", "業務用操作パネル"],
    related: ["vba", "msforms"],
    googleQuery: "Excel VBA UserForm とは",
    references: [{ title: "Microsoft Learn - UserForm object", url: "https://learn.microsoft.com/office/vba/language/reference/user-interface-help/userform-object" }],
  },
  {
    slug: "msforms",
    title: "MSForms",
    category: "Excel VBA",
    aliases: ["Microsoft Forms", "MSForms.Label"],
    summary: "VBAのUserFormでラベルやテキストボックスなどのフォーム部品を扱うためのライブラリです。",
    description: [
      "MSFormsは、UserForm上のLabel、TextBox、CommandButtonなどを扱うために使われます。",
      "コードからControls.Addを使うと、フォーム上に部品を動的に追加できます。",
    ],
    useCases: ["UserForm部品の作成", "動的UI生成", "ラベルやボタンの制御"],
    related: ["vba", "userform"],
    googleQuery: "VBA MSForms とは",
  },
  {
    slug: "shape",
    title: "Shape",
    category: "Excel VBA",
    aliases: ["Excel Shape", "図形"],
    summary: "Excel上の図形、画像、線、テキストボックスなどを表すオブジェクトです。",
    description: [
      "Shapeは、Excelシート上に置かれた図形や画像をVBAから操作するためのオブジェクトです。",
      "位置、サイズ、回転角度などをコードから変更できるため、帳票や印刷レイアウトの自動調整に使えます。",
    ],
    useCases: ["画像配置", "バーコード配置", "図形の回転や移動"],
    related: ["vba", "range", "worksheetfunction"],
    googleQuery: "Excel VBA Shape とは",
    references: [{ title: "Microsoft Learn - Shape object", url: "https://learn.microsoft.com/office/vba/api/excel.shape" }],
  },
  {
    slug: "range",
    title: "Range",
    category: "Excel VBA",
    aliases: ["Excel Range", "セル範囲"],
    summary: "Excel VBAでセルやセル範囲を表す基本的なオブジェクトです。",
    description: [
      "Rangeは、単一セル、複数セル、結合セルなどをVBAから扱うためのオブジェクトです。",
      "Value、Top、Left、Width、Heightなどのプロパティを使って、値や位置、サイズを取得できます。",
    ],
    useCases: ["セル値の取得", "範囲指定", "図形の位置合わせ"],
    related: ["vba", "shape"],
    googleQuery: "Excel VBA Range とは",
    references: [{ title: "Microsoft Learn - Range object", url: "https://learn.microsoft.com/office/vba/api/excel.range" }],
  },
  {
    slug: "worksheetfunction",
    title: "WorksheetFunction",
    category: "Excel VBA",
    aliases: ["WorksheetFunction.Max"],
    summary: "VBAからExcelワークシート関数を呼び出すためのオブジェクトです。",
    description: [
      "WorksheetFunctionを使うと、MaxやSumなどのExcel関数をVBAコード内から呼び出せます。",
      "図形サイズの比較や集計処理など、既存のExcel関数を利用したい場面で使います。",
    ],
    useCases: ["Excel関数のVBA利用", "最大値や合計の計算", "ワークシート関数の再利用"],
    related: ["vba", "shape"],
    googleQuery: "VBA WorksheetFunction とは",
    references: [{ title: "Microsoft Learn - WorksheetFunction object", url: "https://learn.microsoft.com/office/vba/api/excel.worksheetfunction" }],
  },
  {
    slug: "arbitrary-precision-arithmetic",
    title: "多倍長整数",
    category: "プログラミング基礎",
    aliases: ["任意精度整数", "任意精度演算", "大きい桁数の計算", "BigInteger"],
    summary: "通常の整数型で扱える範囲を超える桁数の整数を、桁ごとに分けて正確に計算する考え方です。",
    description: [
      "多倍長整数は、64bit整数やDoubleでは表せない大きな整数を扱うための方法です。",
      "VBAに標準のBigInteger型はないため、文字列や配列で各桁を持ち、筆算と同じように加算や乗算を実装することがあります。",
    ],
    useCases: ["巨大整数の検算", "暗号や数論の実験", "桁あふれを避けた整数計算"],
    related: ["vba", "array"],
    googleQuery: "多倍長整数 任意精度演算 とは",
  },
  {
    slug: "immediate-window",
    title: "イミディエイトウィンドウ",
    category: "Excel VBA",
    aliases: ["Immediate Window"],
    summary: "VBEでDebug.Printの出力確認や簡単な式の実行に使うウィンドウです。",
    description: [
      "イミディエイトウィンドウは、VBAの実行中にDebug.Printで出した値を確認するときによく使います。",
      "計算結果の検算や、変数の中身を素早く確認したい場面で便利です。",
    ],
    useCases: ["Debug.Printの確認", "計算結果の検算", "VBA開発中の動作確認"],
    related: ["vba", "debug-print"],
    googleQuery: "VBA イミディエイトウィンドウ とは",
  },
  {
    slug: "debug-print",
    title: "Debug.Print",
    category: "Excel VBA",
    summary: "VBAで変数や計算結果をイミディエイトウィンドウへ出力する命令です。",
    description: [
      "Debug.Printを使うと、処理中の値を画面部品に表示せず、VBEのイミディエイトウィンドウへ出力できます。",
      "長い数値の検算や途中結果の確認に向いています。",
    ],
    useCases: ["デバッグ出力", "計算結果の確認", "途中値のログ表示"],
    related: ["vba", "immediate-window"],
    googleQuery: "VBA Debug.Print とは",
  },
  {
    slug: "cui",
    title: "CUI",
    category: "プログラミング基礎",
    aliases: ["キャラクタユーザーインターフェース", "Character User Interface", "コマンドライン"],
    summary: "文字入力と文字出力を中心に操作するユーザーインターフェースです。",
    description: [
      "CUIは、ボタンや画面部品をクリックするGUIと異なり、コマンドや短い文字列を入力して処理を進める考え方です。",
      "VBAでは専用のCUI画面を作らなくても、イミディエイトウィンドウを簡易的な入力欄として使い、対話的にマクロを進める設計ができます。",
    ],
    useCases: ["コマンド入力型ツール", "開発者向け補助マクロ", "短い入力で処理を進める操作"],
    related: ["immediate-window", "vba"],
    googleQuery: "CUI とは",
  },
  {
    slug: "sendkeys",
    title: "SendKeys",
    category: "Excel VBA",
    aliases: ["WScript.Shell SendKeys"],
    summary: "キーボード入力をプログラムから送信するための命令です。",
    description: [
      "SendKeysを使うと、指定したキー入力をアクティブなウィンドウへ送れます。",
      "イミディエイトウィンドウへ入力カーソルを戻すなど、開発支援マクロの操作補助に使える一方、アクティブウィンドウに依存するため安定性には注意が必要です。",
    ],
    useCases: ["VBE操作の補助", "簡易入力欄へのカーソル移動", "既存画面の操作自動化"],
    related: ["vba", "immediate-window", "cui"],
    googleQuery: "VBA SendKeys とは",
    references: [{ title: "Microsoft Learn - SendKeys statement", url: "https://learn.microsoft.com/office/vba/language/reference/user-interface-help/sendkeys-statement" }],
  },
  {
    slug: "application-ontime",
    title: "Application.OnTime",
    category: "Excel VBA",
    summary: "Excelで指定した時刻にプロシージャを実行予約するメソッドです。",
    description: [
      "Application.OnTimeを使うと、今すぐではなく少し後の時刻に指定したマクロを実行できます。",
      "イミディエイトウィンドウから処理を起動した直後にコードウィンドウへ戻したい場合など、タイミングをずらして別処理を走らせる用途に使えます。",
    ],
    useCases: ["遅延実行", "定時実行", "VBE操作後の画面復帰"],
    related: ["vba", "immediate-window"],
    googleQuery: "Excel VBA Application.OnTime とは",
    references: [{ title: "Microsoft Learn - Application.OnTime method", url: "https://learn.microsoft.com/office/vba/api/Excel.Application.OnTime" }],
  },
  {
    slug: "clipboard",
    title: "クリップボード",
    category: "Windows基礎",
    aliases: ["Clipboard"],
    summary: "コピーした文字列や画像などを一時的に保持し、別の場所へ貼り付けるための領域です。",
    description: [
      "コード生成ツールでは、生成したプロシージャコードをクリップボードへ入れておくと、コードウィンドウへすぐ貼り付けられます。",
      "VBAではForms.TextBoxなどを経由して、文字列をクリップボードへコピーする実装が使われることがあります。",
    ],
    useCases: ["生成コードの貼り付け", "テキストコピー", "画面間のデータ受け渡し"],
    related: ["vba"],
    googleQuery: "クリップボード とは",
  },
  {
    slug: "scripting-dictionary",
    title: "Scripting.Dictionary",
    category: "Excel VBA",
    aliases: ["Dictionary", "辞書"],
    summary: "キーと値の組み合わせを保持するVBAでよく使われる辞書型オブジェクトです。",
    description: [
      "Scripting.Dictionaryは、文字列などのキーに対して値を保存し、あとからキーで取り出せるオブジェクトです。",
      "入力された引数名と引数型をペアで保持するようなコード生成処理では、順番付きの入力情報を管理する用途に使えます。",
    ],
    useCases: ["キー付きデータ管理", "入力値の一時保存", "重複チェック"],
    related: ["vba", "array"],
    googleQuery: "VBA Scripting.Dictionary とは",
    references: [{ title: "Microsoft Learn - Dictionary object", url: "https://learn.microsoft.com/office/vba/language/reference/user-interface-help/dictionary-object" }],
  },
  {
    slug: "infinite-product",
    title: "無限積",
    category: "数学",
    aliases: ["無限積表示", "infinite product"],
    summary: "無限に続く因子を掛け合わせた極限として値を考える数学の表し方です。",
    description: [
      "無限積は、有限個の掛け算をどこまでも増やしたとき、その部分積がどの値へ近づくかを見る考え方です。",
      "Excelなどで途中までの部分積を計算すると、理論上の収束先を数値的に予想しやすくなります。",
    ],
    useCases: ["部分積の数値実験", "特殊関数の公式整理", "収束先の検算"],
    related: ["convergence", "gamma-function", "numerical-experiment"],
    googleQuery: "無限積 とは",
  },
  {
    slug: "convergence",
    title: "収束",
    category: "数学",
    aliases: ["極限", "収束先", "convergence"],
    summary: "数列や計算結果が、項を進めるほど特定の値へ近づいていく性質です。",
    description: [
      "収束は、計算を続けるほど値がある一定の数に近づくことを表します。",
      "数値実験では、途中結果が安定して同じ値へ近づくかを見ることで、証明前の見通しを立てられます。",
    ],
    useCases: ["数列の極限確認", "無限積の検算", "反復計算の安定性確認"],
    related: ["infinite-product", "numerical-experiment"],
    googleQuery: "数学 収束 極限 とは",
  },
  {
    slug: "gamma-function",
    title: "ガンマ関数",
    category: "数学",
    aliases: ["Gamma関数", "Γ関数", "gamma function"],
    summary: "階乗を整数以外にも拡張して扱えるようにした特殊関数です。",
    description: [
      "ガンマ関数は、整数の階乗を連続的な値へ広げたような関数です。",
      "分数を含む積や比を整理するときに、階乗に似た形として式変形に使われることがあります。",
    ],
    useCases: ["階乗型の積の整理", "無限積の証明", "特殊関数を使った式変形"],
    related: ["reflection-formula", "infinite-product"],
    googleQuery: "ガンマ関数 とは",
    references: [{ title: "NIST Digital Library of Mathematical Functions - Gamma Function", url: "https://dlmf.nist.gov/5" }],
  },
  {
    slug: "reflection-formula",
    title: "反射公式",
    category: "数学",
    aliases: ["オイラーの反射公式", "Euler reflection formula"],
    summary: "ガンマ関数の値どうしを三角関数と結び付ける公式です。",
    description: [
      "反射公式は、ガンマ関数の Γ(z) と Γ(1-z) の積を、sin(πz) を使って表す公式です。",
      "無限積をガンマ関数で整理したあと、三角関数の値へ落とすときに使われます。",
    ],
    useCases: ["ガンマ関数の式変形", "三角関数への変換", "無限積の収束値の確認"],
    related: ["gamma-function", "infinite-product"],
    googleQuery: "ガンマ関数 反射公式 とは",
    references: [{ title: "NIST Digital Library of Mathematical Functions - Reflection Formula", url: "https://dlmf.nist.gov/5.5.E3" }],
  },
  {
    slug: "numerical-experiment",
    title: "数値実験",
    category: "数学 / 開発",
    aliases: ["数値検算", "計算実験"],
    summary: "式やアルゴリズムの性質を、実際に数値を計算して確かめる方法です。",
    description: [
      "数値実験は、Excelやプログラムで具体的な値を出し、理論的な予想や実装の妥当性を確認する作業です。",
      "証明そのものではありませんが、どの値へ近づくか、どこで誤差が出るかを調べる入口になります。",
    ],
    useCases: ["Excelでの検算", "アルゴリズムの挙動確認", "数学記事の導入"],
    related: ["convergence", "infinite-product", "vba"],
    googleQuery: "数値実験 とは",
  },
  {
    slug: "cube-number",
    title: "立方数",
    category: "数学",
    aliases: ["三乗", "cube", "x^3"],
    summary: "ある数を3回掛けた値です。nの立方数はn^3と表します。",
    description: [
      "立方数は、n × n × nで得られる数です。",
      "3つの整数の立方数の和で特定の整数を表せるか、という問題は数論の有名なテーマの一つです。",
    ],
    useCases: ["数論の検算", "三乗計算", "大きい整数の計算例"],
    related: ["arbitrary-precision-arithmetic"],
    googleQuery: "立方数 三乗 とは",
  },
  {
    slug: "array",
    title: "配列",
    category: "プログラミング基礎",
    aliases: ["Array"],
    summary: "複数の値を番号付きでまとめて扱うためのデータ構造です。",
    description: [
      "配列を使うと、同じ種類の値を1つの変数名でまとめて管理できます。",
      "VBAでは、桁ごとの数値を配列に入れて、筆算のように加算や乗算を行う実装にも使えます。",
    ],
    useCases: ["複数値の管理", "表データ処理", "桁ごとの数値計算"],
    related: ["vba", "two-dimensional-array"],
    googleQuery: "配列 プログラミング とは",
  },
  {
    slug: "dns",
    title: "DNS",
    category: "Web公開",
    summary: "ドメイン名を、サーバーの場所を示す情報へ変換する仕組みです。",
    description: [
      "DNSはDomain Name Systemの略で、example.comのような名前をWebサーバーへ接続するために使います。",
      "Vercelなどへ独自ドメインを向けるときは、DNSレコードの設定が必要になります。",
    ],
    useCases: ["独自ドメインを設定する", "Vercelへドメインを接続する", "CNAMEやAレコードを管理する"],
    related: ["cname", "vercel"],
    googleQuery: "DNS とは",
  },
  {
    slug: "cname",
    title: "CNAME",
    category: "Web公開",
    summary: "あるドメイン名を別のドメイン名へ向けるためのDNSレコードです。",
    description: [
      "CNAMEは、www.example.comを別のホスト名へ向けるような場面で使われるDNSレコードです。",
      "VercelやGitHub Pagesでサブドメインを設定するときによく登場します。",
    ],
    useCases: ["www付きドメインを設定する", "Vercelへサブドメインを接続する", "ホスティング先をDNSで指定する"],
    related: ["dns", "vercel"],
    googleQuery: "CNAME とは",
  },
  {
    slug: "vercel",
    title: "Vercel",
    category: "デプロイ",
    summary: "Next.jsなどのWebサイトを簡単に公開できるホスティングサービスです。",
    description: [
      "Vercelは、GitHubと連携してWebサイトを自動ビルド・自動デプロイできるサービスです。",
      "Next.jsとの相性がよく、静的サイトやWebアプリの公開に使われます。",
    ],
    useCases: ["Next.jsサイトの公開", "GitHub pushによる自動デプロイ", "カスタムドメイン設定"],
    related: ["nextjs", "dns", "cname"],
    googleQuery: "Vercel とは",
    references: [{ title: "Vercel Docs", url: "https://vercel.com/docs" }],
  },
];

const termsBySlug = new Map(terms.map((term) => [term.slug, term]));
const termsByText = new Map<string, TermEntry>();

for (const term of terms) {
  termsByText.set(normalizeTermText(term.title), term);
  for (const alias of term.aliases ?? []) {
    termsByText.set(normalizeTermText(alias), term);
  }
}

function normalizeTermText(value: string): string {
  return value.trim().toLowerCase();
}

export function getAllTerms(): TermEntry[] {
  return [...terms].sort((a, b) => a.title.localeCompare(b.title, "ja"));
}

export function getTermBySlug(slug: string): TermEntry | undefined {
  return termsBySlug.get(slug);
}

export function findTermByText(value: string): TermEntry | undefined {
  return termsByText.get(normalizeTermText(value));
}

export function getTermsByCategory(): Record<string, TermEntry[]> {
  return getAllTerms().reduce<Record<string, TermEntry[]>>((acc, term) => {
    acc[term.category] ??= [];
    acc[term.category].push(term);
    return acc;
  }, {});
}

export function getRelatedTerms(term: TermEntry): TermEntry[] {
  return (term.related ?? [])
    .map((slug) => getTermBySlug(slug))
    .filter((value): value is TermEntry => Boolean(value));
}

function isAsciiWordChar(value: string | undefined): boolean {
  return Boolean(value && /[A-Za-z0-9_.-]/.test(value));
}

function canMatchAt(text: string, index: number, termText: string): boolean {
  const before = text[index - 1];
  const after = text[index + termText.length];
  const startsAscii = /[A-Za-z0-9]/.test(termText[0] ?? "");
  const endsAscii = /[A-Za-z0-9]/.test(termText[termText.length - 1] ?? "");

  if (startsAscii && isAsciiWordChar(before)) return false;
  if (endsAscii && isAsciiWordChar(after)) return false;

  return true;
}

function getLinkableTermTexts(term: TermEntry): string[] {
  return [term.title, ...(term.aliases ?? [])]
    .filter((value) => value.trim().length >= 2)
    .sort((a, b) => b.length - a.length);
}

export function getLinkedTermTextSegments(
  text: string,
  currentSlug?: string,
  maxLinks = 4
): LinkedTermTextSegment[] {
  if (!text) return [];

  const candidates = terms
    .filter((term) => term.slug !== currentSlug)
    .flatMap((term) => getLinkableTermTexts(term).map((label) => ({ term, label })))
    .sort((a, b) => b.label.length - a.label.length);

  const segments: LinkedTermTextSegment[] = [];
  const linkedSlugs = new Set<string>();
  const lowerText = text.toLowerCase();
  let cursor = 0;
  let linkCount = 0;

  while (cursor < text.length) {
    const match =
      linkCount < maxLinks
        ? candidates.find(({ term, label }) => {
            if (linkedSlugs.has(term.slug)) return false;

            const lowerLabel = label.toLowerCase();
            if (!lowerText.startsWith(lowerLabel, cursor)) return false;

            return canMatchAt(text, cursor, label);
          })
        : undefined;

    if (!match) {
      const last = segments[segments.length - 1];
      if (last && !last.term) {
        last.text += text[cursor];
      } else {
        segments.push({ text: text[cursor] });
      }
      cursor += 1;
      continue;
    }

    segments.push({
      text: text.slice(cursor, cursor + match.label.length),
      term: match.term,
    });
    linkedSlugs.add(match.term.slug);
    linkCount += 1;
    cursor += match.label.length;
  }

  return segments;
}
