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
