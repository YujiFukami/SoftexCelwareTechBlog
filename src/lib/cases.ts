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
  toolGuideUrl?: string;
  ogImage?: string;
  video?: {
    youtubeId: string;
    title: string;
    poster: string;
    availableFrom?: string;
  };
  workflow?: string[];
  workflowTitle?: string;
  mediaNote?: string;
  relatedCases?: { title: string; slug: string }[];
  images?: {
    src: string;
    width: number;
    height: number;
    title?: string;
    alt: string;
    caption: string;
  }[];
  visibility: "public" | "limited" | "anonymous";
  relatedArticles: RelatedArticle[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "excel-vba-3d-rubiks-cube",
    title: "Excelの図形だけで動く3Dルービックキューブ",
    subtitle: "12クラスで幾何計算・描画・回転状態を分けた自主制作",
    category: "Excel VBA・3D描画",
    summary: "Excelの平面図形を組み合わせ、立体の回転・陰影・前後関係を表現する自主制作プログラムです。2022年1月に制作し、ベクトルや行列による計算から、回転履歴の逆再生までをVBAで実装しました。",
    description: [
      "ワークシート上で動くキューブは、動画や3Dモデルを貼り付けたものではなく、Excelの図形の集まりです。空間内の頂点を画面上の座標へ変換し、面を多角形として描くことで立体に見せています。",
      "設計の中心は12個のクラスです。ベクトル・直線・平面の計算、空間の形、Excelへの描画、立方体、キューブ全体と回転管理を分けています。計算と描画、見た目と状態を混ぜずに扱う構成が、この作品の技術的なポイントです。",
      "各コマでは、視点に応じた座標を計算し、面の前後関係を判定して図形を重ね、光の向きに応じて色を調整します。見た目を少しずつ回す処理とは別に、90度ごとに部品の配置を3次元配列へ反映します。",
      "一辺の個数を変える構成で、紹介素材には1×1・2×2・5×5の例があります。内部に隠れる部品を描画対象から省くなど、表示しない要素を作らない工夫も取り入れています。大きさにかかわらず一定の速度で動くことを保証するものではありません。",
      "そろった状態へ戻す機能は、記録した回転を逆順・逆方向に実行する仕組みです。任意の配置から最短手順を探索する自動解法ではありません。操作履歴と再生を分ける設計は、編集ツールなどの状態管理を考えるうえでも参考になります。",
    ],
    stack: ["Excel", "VBA", "クラスモジュール", "ベクトル・行列", "図形描画", "3次元配列"],
    highlights: [
      "12クラスを数学・形・描画・部品・全体の5層に整理",
      "視点の基底ベクトルと逆行列から、画面に描く座標を計算",
      "Shapes.AddPolylineで面をExcelの多角形として描画",
      "裏向きの面を除き、交点と多角形の内外判定で面の前後を比較",
      "光と面の向きから色の明るさを計算",
      "連続的な見た目の回転と、90度単位の配列更新を分離",
      "回転の軸・段・回数・方向を記録して逆再生",
    ],
    workflowTitle: "描画と回転の流れ",
    workflow: ["視点と部品の向きを計算", "頂点を画面座標へ変換", "面の前後と陰影を反映して描画", "回転を進め、90度ごとに配列と履歴を更新"],
    ogImage: "/cases/excel-vba-3d-rubiks-cube/cover.webp",
    externalArticleUrl: "https://www.softex-celware.com/post/excel-vba-3d-rubiks-cube-shapes",
    video: {
      youtubeId: "Y2DAQUtxfS4",
      title: "Excelの図形だけで動く3Dルービックキューブの技術解説・本編",
      poster: "/cases/excel-vba-3d-rubiks-cube/cover.webp",
      availableFrom: "2026-11-13T12:00:00+09:00",
    },
    images: [
      {
        src: "/cases/excel-vba-3d-rubiks-cube/05_proof2.webp", width: 1600, height: 900,
        title: "1. 立体の正体は、一枚ずつ選べるExcelの図形",
        alt: "Excelのキューブから図形を引き抜き、内側の黒い面まで見せた画面",
        caption: "描画済みの面を動かすと、一枚ずつの図形に分かれます。元の立体には3次元の座標を持たせていますが、画面に出しているのはExcelの平面図形です。計算した座標と描く順番を組み合わせ、立体の見え方を作っています。",
      },
      {
        src: "/cases/excel-vba-3d-rubiks-cube/03_layers.webp", width: 1600, height: 900,
        title: "2. 12クラスを5つの層へ分ける",
        alt: "数学・形・描画・部品・全体の5層に分けた12クラスの構成図",
        caption: "数学の層はclsVector3D・clsLineEq・clsPlateEq、形の層はclsPlate3D・clsLine3Dが担当します。描画の層を通してExcelの図形へ変換し、clsCubeが部品、clsRubiksCubeとclsRubiksCubeRotationが全体と回転状態を管理します。役割を分け、幾何計算を表示処理から切り離しています。",
      },
      {
        src: "/cases/excel-vba-3d-rubiks-cube/07_vectors.webp", width: 1600, height: 900,
        title: "3. 基準点と方向ベクトルで立方体を表す",
        alt: "立方体の基準点・X方向・Y方向と外積による向きの表現",
        caption: "立方体は基準点とX・Y方向のベクトルを持ち、残るZ方向を外積から求めます。回転行列でこれらを更新し、各面の位置を再計算する構成です。画面に描いた四角形を直接動かすのではなく、元の3次元情報を更新して描き直します。",
      },
      {
        src: "/cases/excel-vba-3d-rubiks-cube/09_project2.webp", width: 1600, height: 900,
        title: "4. 3次元の頂点から、描画用の2次元座標へ",
        alt: "視点からの座標変換とAddPolylineによる多角形の描画",
        caption: "視点の右・前・上のベクトルで作った行列の逆行列を使い、頂点を視点基準の座標へ変換します。この実装では左右・上下の角度から画面上の位置を求め、頂点の座標配列をShapes.AddPolylineに渡して面を描きます。Excel側に3D描画を任せず、計算結果を平面図形へ変換しています。",
      },
      {
        src: "/cases/excel-vba-3d-rubiks-cube/12_judge.webp", width: 1600, height: 900,
        title: "5. 面を2枚ずつ比べて、正しい重なり順を決める",
        alt: "視点からの直線と平面の交点を使う面の前後判定図",
        caption: "裏を向く面は描画対象から外し、残る面について視点からの直線と平面の交点を求めます。交点が多角形の内側にあるかと距離を調べ、2枚の前後関係を比較。比較結果を順位に整理して奥から描くことで、後から描いた面が意図せず前に出る問題へ対応しています。",
      },
      {
        src: "/cases/excel-vba-3d-rubiks-cube/14_light.webp", width: 1600, height: 900,
        title: "6. 光の向きから面ごとの明るさを計算",
        alt: "光源と面の向きに応じてキューブの色の明るさを変える図",
        caption: "各面を同じ明るさで塗るだけでなく、光と面の向きに応じて色の強さを変えています。光の角度などから算出した明るさを面の色に反映することで、平面図形の集まりでも向きや奥行きを把握しやすくしています。",
      },
      {
        src: "/cases/excel-vba-3d-rubiks-cube/15_dual.webp", width: 1600, height: 900,
        title: "7. 見た目の回転と、配置データを別々に管理",
        alt: "少しずつ回す見た目と90度ごとに入れ替える配列の比較",
        caption: "アニメーションでは角度を少しずつ進めます。一方、『どの位置にどの部品があるか』は名前を格納した3次元配列で持ち、90度回り切った時点で配置を更新します。途中の見た目と、操作が確定した状態を区別する設計です。",
      },
      {
        src: "/cases/excel-vba-3d-rubiks-cube/16_array.webp", width: 1600, height: 900,
        title: "8. 対象の段を2次元配列として回転",
        alt: "3次元配列から段を取り出し90度回転させて戻す図",
        caption: "回す軸と段に応じて3次元配列の一面を取り出し、2次元配列上で90度の入れ替えを行ってから元へ戻します。回転する部品の選択と配置の更新を配列処理へまとめ、描画用の座標計算とは分離しています。",
      },
      {
        src: "/cases/excel-vba-3d-rubiks-cube/17_undo.webp", width: 1600, height: 900,
        title: "9. 操作ログを逆順・逆方向に再生して元へ戻す",
        alt: "回転のログを下から逆向きに実行して元の状態へ戻す図",
        caption: "軸・段・回数・方向を記録し、後から逆順にたどって方向を反転させます。既知の操作を取り消す仕組みなので、完成状態から崩した履歴を戻せます。ここでの『元に戻す』は解法探索ではなく、説明図のログ数値も仕組みを示すための例です。",
      },
      {
        src: "/cases/excel-vba-3d-rubiks-cube/18_anyn.webp", width: 1600, height: 900,
        title: "10. 個数をパラメーター化し、見えない内部は省く",
        alt: "1×1・2×2・5×5の表示例と、内部の部品を作らない構成",
        caption: "一辺の個数を変えて構成できる設計です。5×5では全125位置のうち内部27個を除き、外側の98個を扱います。表示に関係しない部品を作らない工夫ですが、個数が増えるほど面の計算・比較・描画の負荷も増えるため、対応サイズや速度は実行環境に依存します。",
      },
    ],
    mediaNote: "2022年1月に制作した自主制作プログラムを、公開紹介用の本編動画・図解で解説しています。回転ログの数値は説明用の例です。",
    visibility: "public",
    relatedCases: [{ title: "図形操作を業務ツールに活かした歯科の治療計画・見積書作成", slug: "dental-estimate-excel" }],
    relatedArticles: [
      { title: "Excel VBAの処理を汎用部品として残すための考え方", href: "/articles/vba/vba-componentization-technique", category: "Excel VBA・設計" },
      { title: "指定名の図形を取得するExcel VBA汎用関数 GetShapeByName", href: "/articles/vba/get-shape-by-name", category: "Excel VBA・図形" },
    ],
  },
  {
    slug: "development-brief-maker",
    title: "お客様向け説明資料メーカー",
    subtitle: "受託開発の日程と追加費用の考え方を一枚の資料に",
    category: "ローカルWebアプリ",
    summary: "一次納品・正式納品の日程、動作確認期間、追加相談の対応方針を図にまとめ、JPEGで保存できるローカル専用Webアプリの開発事例です。",
    description: [
      "納品後の相談が無償対応か追加見積もりか、共通の説明図と口頭だけでは案件ごとの条件が伝わりにくいことがあります。案件名と予定日を入れ、その案件の説明資料を作れるようにしました。",
      "開発の流れに『今ここです』の印を表示。追加相談の内容・報告日・原因を選ぶと、設定したルールに沿って該当経路と理由を表示します。判定は説明の補助であり、契約条件や対応の合意を自動的に確定するものではありません。",
      "資料はJPEGとして保存し、お客様への説明に利用できます。ローカル専用で運用するツールで、一般公開のWebサービスではありません。",
    ],
    stack: ["HTML", "JavaScript", "CSS", "JPEG出力"],
    highlights: ["案件ごとの納品予定日を反映", "動作確認期間と保守対応期間を図で区別", "相談内容に応じた経路と理由の表示", "説明資料をJPEGで保存"],
    workflow: ["案件名・予定日を入力", "日程と対応ルールを図示", "追加相談の条件を選択", "資料をJPEGで保存して共有"],
    ogImage: "/cases/development-brief-maker/cover.webp",
    video: { youtubeId: "Jz1qas1thAc", title: "受託開発のスケジュール説明と追加費用説明資料作成ツール", poster: "/cases/development-brief-maker/cover.webp" },
    images: [
      { src: "/cases/development-brief-maker/screen-1.webp", width: 1462, height: 1064, alt: "説明資料メーカーの条件入力画面", caption: "追加相談の条件を入力する画面。案件ごとの条件を資料に反映します。" },
      { src: "/cases/development-brief-maker/screen-2.webp", width: 1100, height: 680, alt: "開発日程と現在の段階を示す説明資料", caption: "日程と現在の段階を示した出力例です。日付はサンプルです。" },
      { src: "/cases/development-brief-maker/screen-3.webp", width: 1100, height: 640, alt: "追加相談の対応経路を示す図", caption: "ツールのルールに沿った対応経路を表示。実際の対応は契約と個別の合意に基づきます。" },
    ],
    mediaNote: "動画・画像は公開紹介用に加工した素材です。案件名・日付はサンプルです。",
    visibility: "public",
    relatedArticles: [{ title: "記事の流れ図と注釈画像をYAML・固定HTMLから作る", href: "/articles/python-windows/yaml-html-png-article-figures", category: "図解・資料作成" }],
  },
  {
    slug: "farm-direct-sales-gas",
    title: "農産物の受注・発送管理システム",
    subtitle: "注文フォームから送り状CSV・発送連絡まで",
    category: "GAS業務Webアプリ",
    summary: "スマートフォン対応の注文フォーム、送料計算、受付メール、送り状用CSV、発送連絡をGoogleスプレッドシートとGASでつなぐ農産物直販向けの開発事例です。",
    description: [
      "電話やメッセージで受けた注文を一覧へ転記し、送料や発送情報を別々に管理すると手間が増えます。お客様が使う注文フォームと、農園側の受注・発送管理をつなげました。",
      "商品・数量・届け先をもとに送料と合計金額を計算し、商品ごとの締切や受注上限を管理します。注文の受付メールはお客様と農園の両方へ送信します。",
      "発送予定日を登録して送り状用CSVを出力し、送り状発行後のデータから番号を取り込んで発送メールを送れます。送り状の発行そのものは外部の配送サービスで行います。",
    ],
    stack: ["Google Apps Script", "Googleスプレッドシート", "HTML", "メール送信", "CSV連携"],
    highlights: ["スマホ対応の注文フォームとカート", "送料・合計金額と受付条件の管理", "お客様と農園への受付メール", "ヤマトB2クラウド取込用CSVの出力", "送り状番号の取込みと発送メール"],
    workflow: ["フォームから商品を注文", "送料を計算して受付通知", "発送用CSVを出力", "送り状を発行して番号を取込", "発送メールを送信"],
    ogImage: "/cases/farm-direct-sales-gas/cover.webp",
    video: { youtubeId: "isHE-6YXPuM", title: "農産物受注販売システムの紹介", poster: "/cases/farm-direct-sales-gas/cover.webp", availableFrom: "2026-11-10T12:00:00+09:00" },
    images: [
      { src: "/cases/farm-direct-sales-gas/screen-1.webp", width: 1200, height: 2133, alt: "注文受付から発送連絡までの流れ図", caption: "利用者が行う操作と、システムが行う処理を分けた業務フローです。" },
      { src: "/cases/farm-direct-sales-gas/screen-2.webp", width: 1200, height: 1652, alt: "送料と合計金額を表示する注文確認画面", caption: "送料と合計金額を確認し、確認事項をチェックして注文する画面です。" },
      { src: "/cases/farm-direct-sales-gas/screen-3.webp", width: 1200, height: 819, alt: "送り状番号を注文管理へ取り込む画面", caption: "発行済みファイルの送り状番号を注文情報へ取り込みます。" },
    ],
    mediaNote: "動画・画像はサンプルデータを使用した公開紹介用素材です。一部の画面は加工しています。",
    visibility: "anonymous",
    relatedArticles: [{ title: "GASでShift-JISのCSVを出力する", href: "/articles/gas/google-sheets-shift-jis-csv-export", category: "GAS・CSV" }],
  },
  {
    slug: "dental-estimate-excel",
    title: "歯科の治療計画・見積書作成ツール",
    subtitle: "歯の図をクリックし、図入り見積書を作成",
    category: "Excel VBA・帳票作成",
    summary: "患者情報の呼び出しから、歯の位置・材料・治療内容の選択、図入り見積書の作成・PDF出力までを支援するExcel VBAツールの匿名事例です。",
    description: [
      "治療する歯の位置と治療内容、金額を別々に入力すると、患者向けの説明資料を整える手間がかかります。歯の図から対象を選び、治療計画と見積書をつなげる入力画面を作りました。",
      "患者を一覧から呼び出し、歯の位置・材料・治療内容をボタンで選択。登録した情報を歯の図と見積明細に反映し、PDFとして出力できます。治療計画の保存と過去の計画の呼び出しにも対応しています。",
      "歯科医院の説明・見積作成業務を支援するツールで、診断や治療方針を自動決定するものではありません。公開素材に実際の患者情報は使用していません。",
    ],
    stack: ["Excel", "VBA", "図形・画像操作", "PDF出力"],
    highlights: ["患者一覧からの呼び出し", "歯の図から位置・材料・治療内容を選択", "治療内容と金額を見積書へ反映", "図入り見積書のPDF出力", "治療計画の保存・呼び出し"],
    workflow: ["患者を登録・選択", "歯の位置をクリック", "材料・治療内容を選択", "図入り見積書を作成", "PDFで保存"],
    ogImage: "/cases/dental-estimate-excel/cover.webp",
    video: { youtubeId: "GzjkvXgv8dQ", title: "歯科治療計画・見積書作成ツールの紹介", poster: "/cases/dental-estimate-excel/cover.webp" },
    images: [
      { src: "/cases/dental-estimate-excel/screen-1.webp", width: 1200, height: 1593, alt: "患者登録から見積書保存までの流れ図", caption: "歯の選択・治療内容の入力から、PDF保存までの流れです。" },
      { src: "/cases/dental-estimate-excel/screen-2.webp", width: 1200, height: 1658, alt: "歯の図と治療内容の選択ボタン", caption: "位置と材料を視覚的に選択する入力画面の紹介です。" },
      { src: "/cases/dental-estimate-excel/screen-3.webp", width: 1200, height: 1174, alt: "歯の図と治療内容・金額が並ぶ見積書", caption: "サンプルの治療内容と金額を反映した見積書です。料金の目安を示すものではありません。" },
    ],
    externalArticleUrl: "https://www.softex-celware.com/post/dental-treatment-plan-estimate-excel",
    mediaNote: "動画・画像はサンプルデータを使用した公開紹介用素材です。一部の画面は加工しています。",
    visibility: "anonymous",
    relatedArticles: [{ title: "クリックされた図形を取得するExcel VBA汎用関数 GetShapePushed", href: "/articles/vba/get-shape-pushed", category: "Excel VBA" }],
  },
  {
    slug: "csv-medical-report-excel",
    title: "CSVから日報・週報・月報を作成するツール",
    subtitle: "受付記録の集計から既定様式への転記まで",
    category: "Excel VBA・CSV集計",
    summary: "受付システムのCSVを読み込み、診療科目別・午前午後別の件数を集計し、既定様式の日報・週報・月報を作成するExcel VBAツールの匿名事例です。",
    description: [
      "受付記録を数え直して報告書へ転記する作業を、CSVの取込みと帳票作成の流れにまとめました。既存の帳票様式を使いながら、集計と入力の作業を支援する構成です。",
      "CSV内の期間から作成可能な日・週・月を一覧化し、対象期間を選択して帳票を作成します。診療科目別や午前・午後別の件数、曜日別の件数・一日平均、案内できなかった件数などを整理します。",
      "複数期間を選ぶと、日ごとのシートを一つのファイルにまとめて出力できます。祝日の一覧を利用し、週・月の区切りを扱います。診療や相談内容の医学的判断は行いません。",
    ],
    stack: ["Excel", "VBA", "CSV取込み", "期間別集計", "帳票作成"],
    highlights: ["CSVの期間から作成対象を一覧化", "診療科目別・午前午後別の集計", "日報・週報・月報の作成", "複数日を1ファイルの複数シートへ出力", "祝日と週・月の区切りに対応"],
    workflow: ["受付CSVを読み込む", "日・週・月を選択", "区分別に件数を集計", "既定様式の帳票へ出力"],
    ogImage: "/cases/csv-medical-report-excel/cover.webp",
    video: { youtubeId: "EpHiJaYmRWg", title: "医療機関案内の帳票作成ツールの紹介", poster: "/cases/csv-medical-report-excel/cover.webp", availableFrom: "2026-11-19T12:00:00+09:00" },
    mediaNote: "動画はサンプルデータを使用した公開紹介用素材です。一部の画面は加工しています。",
    visibility: "anonymous",
    relatedArticles: [{ title: "2つの条件で二次元配列を検索するExcel VBA汎用プロシージャ", href: "/articles/vba/xlookup-2col", category: "Excel VBA" }],
  },
  {
    slug: "restaurant-shift-excel",
    title: "飲食店のシフト作成・労働時間集計ツール",
    subtitle: "希望入力から時間帯別の配置、年間集計まで",
    category: "Excel VBA・シフト管理",
    summary: "希望勤務時間と必要人数をもとに配置を作成し、不足日の再作成や期間をまたぐ労働時間の集計を行う、飲食店向けExcel VBAツールの匿名事例です。",
    description: [
      "シフト希望、時間帯ごとの必要人数、担当業務を照らし合わせる作業をExcel VBAで支援するツールです。希望入力を助ける時刻ボタンと、30分単位の配置処理を組み合わせています。",
      "希望時間いっぱいに候補を配置してから、条件を満たせる範囲で勤務の端を削る方法を採用。不足が残る日は管理者が出勤者を判断し、その日の配置だけを作り直します。自動処理だけで全条件を必ず満たすという設計ではありません。",
      "別ブックを含む労働時間の集計、前期間の勤務情報の読み込み、条件付き書式の修復も用意しました。動画中の処理時間はその録画環境での例であり、データ量や実行環境によって変わります。",
    ],
    stack: ["Excel", "VBA", "30分単位の配置", "複数ブック集計", "条件付き書式"],
    highlights: ["選択可能な時刻をボタンで入力", "必要人数と担当を考慮した時間帯別配置", "管理者の判断後、不足日だけ再作成", "前期間の勤務情報を読み込み", "年間労働時間の集計と書式修復"],
    workflow: ["勤務希望・必要人数を設定", "時間帯ごとの配置を作成", "不足箇所を管理者が確認", "必要な日を再作成", "労働時間を集計"],
    ogImage: "/cases/restaurant-shift-excel/cover.webp",
    video: { youtubeId: "8VDlEAzlZjQ", title: "シフト表ツールの工夫6選", poster: "/cases/restaurant-shift-excel/cover.webp", availableFrom: "2026-11-17T12:00:00+09:00" },
    images: [
      { src: "/cases/restaurant-shift-excel/screen-1.webp", width: 1600, height: 900, alt: "飲食店向けシフトの時間帯別配置の例", caption: "公開動画からの配置画面。表示される処理時間は録画環境での例です。" },
      { src: "/cases/restaurant-shift-excel/screen-2.webp", width: 1600, height: 900, alt: "複数ブックの労働時間を年間集計する画面", caption: "従業員名を置き換えた公開用画面。月別の時間と年間合計を確認します。" },
    ],
    mediaNote: "動画・画像はサンプルデータを使用した公開紹介用素材です。一部の画面は加工しています。",
    visibility: "anonymous",
    relatedCases: [{ title: "保育園のシフト入力・配置人数集計ツール", slug: "nursery-shift-excel" }],
    relatedArticles: [{ title: "複数シートの集計を名前定義と参照式で一覧化するExcel VBAの設計", href: "/articles/vba/named-range-formula-summary", category: "Excel VBA" }],
  },
  {
    slug: "sewer-survey-drawing-excel",
    title: "下水道調査の図面作成支援ツール",
    subtitle: "番号・記号の配置と色分けをキー操作で",
    category: "Excel VBA・作図支援",
    summary: "Excelの図面上に丸数字や記号を呼び出し、連番配置・数値変更・色分け・サイズ調整を支援する、下水道調査向けExcel VBAツールの匿名事例です。",
    description: [
      "図面上の番号や記号を一つずつコピーし、数字や色を変える作業をまとめて支援しました。テンプレート番号を指定し、マウス位置へ丸数字や登録済みの記号を配置できます。",
      "続きの番号をキー操作で配置し、数値の増減に合わせて設定した範囲の色へ切り替えます。丸数字の一括拡大・縮小、図形のまとめ選択・削除にも対応しています。",
      "ショートカットや倍率・色の設定を業務に合わせて調整できる構成です。専用CADへの置き換えではなく、Excelの図形で作る図面の反復操作を支援する事例です。",
    ],
    stack: ["Excel", "VBA", "図形操作", "ショートカットキー"],
    highlights: ["テンプレート番号からマウス位置へ配置", "連番と数値変更をキー操作で実行", "設定した数値範囲に応じた色分け", "丸数字の一括拡大・縮小", "記号登録とキー割当の調整"],
    workflow: ["テンプレート番号を指定", "図面上へ番号・記号を配置", "キー操作で番号を更新", "色とサイズを整える"],
    ogImage: "/cases/sewer-survey-drawing-excel/cover.webp",
    video: { youtubeId: "cssJbPsGD14", title: "下水道調査の図面作成ツールの紹介", poster: "/cases/sewer-survey-drawing-excel/cover.webp", availableFrom: "2026-11-12T12:00:00+09:00" },
    images: [
      { src: "/cases/sewer-survey-drawing-excel/screen-1.webp", width: 1200, height: 2133, alt: "図面に番号と数値を配置する流れ図", caption: "利用者の番号指定と、ツールによる配置・色変更の流れです。" },
      { src: "/cases/sewer-survey-drawing-excel/screen-2.webp", width: 1200, height: 880, alt: "丸数字を呼び出す番号入力画面", caption: "番号を指定し、図面上へ呼び出すための画面です。" },
      { src: "/cases/sewer-survey-drawing-excel/screen-3.webp", width: 1200, height: 1124, alt: "色分けと拡大縮小倍率の設定シート", caption: "数値の範囲ごとの色と、図形の拡大・縮小倍率を設定します。" },
    ],
    mediaNote: "動画・画像はサンプルデータを使用した公開紹介用素材です。一部の画面は加工しています。",
    visibility: "anonymous",
    relatedArticles: [{ title: "指定名の図形を取得するExcel VBA汎用関数 GetShapeByName", href: "/articles/vba/get-shape-by-name", category: "Excel VBA" }],
  },
  {
    slug: "nursery-shift-excel",
    title: "保育園のシフト入力・配置人数集計ツール",
    subtitle: "シフトとクラスをボタンで入力し、時間と人数を自動集計",
    category: "Excel VBA・シフト管理",
    summary: "シフト記号と担当クラスをボタンで入力し、勤務時間の合計・上限超過・クラスごとの配置人数を確認できる、保育園向けExcel VBAツールの匿名事例です。",
    description: [
      "毎月の勤務表にシフト記号を入力し、勤務時間とクラス別人数を数える作業を支援しました。セルを選び、シフトと担当クラスのボタンを押す入力方式です。",
      "勤務時間を計算して月の合計を表示し、設定された上限を超えると赤字で知らせます。クラスごとの配置人数を日ごとに集計し、担当クラスの色と併せて確認できます。",
      "年・月に応じて曜日や設定の上限時間を切り替え、常勤・パートを分けて管理します。最終的な配置調整は担当者が行います。表示人数や色だけで法令上の配置基準への適合を保証するものではありません。",
    ],
    stack: ["Excel", "VBA", "勤務時間集計", "配置人数集計"],
    highlights: ["シフト記号とクラスをボタン入力", "日ごと・月ごとの勤務時間を集計", "設定上限の超過を赤字表示", "クラス別の配置人数を自動集計", "年月による日付・曜日の切替"],
    workflow: ["年月と休み・行事を入力", "シフトとクラスをボタン入力", "勤務時間と人数を自動集計", "不足箇所を見て調整"],
    ogImage: "/cases/nursery-shift-excel/cover.webp",
    video: { youtubeId: "hB1k73gfGj4", title: "保育園のシフト表作成ツールの紹介", poster: "/cases/nursery-shift-excel/cover.webp", availableFrom: "2026-11-05T12:00:00+09:00" },
    images: [
      { src: "/cases/nursery-shift-excel/screen-1.webp", width: 1200, height: 2133, alt: "保育園の月間シフト表を作る流れ図", caption: "担当者による入力・調整と、自動集計を分けた流れです。" },
      { src: "/cases/nursery-shift-excel/screen-2.webp", width: 1200, height: 730, alt: "シフトとクラスのボタン付き入力シート", caption: "デモデータの入力シート。記号と担当クラスをボタンから入力します。" },
      { src: "/cases/nursery-shift-excel/screen-3.webp", width: 1200, height: 674, alt: "クラスごとの配置人数を示す集計表", caption: "日ごとの人数を確認し、担当者が配置を調整します。" },
    ],
    mediaNote: "動画・画像はデモデータを使用した公開紹介用素材です。一部の画面は加工しています。",
    visibility: "anonymous",
    relatedCases: [{ title: "飲食店のシフト作成・労働時間集計ツール", slug: "restaurant-shift-excel" }],
    relatedArticles: [{ title: "図形ボタンで選択セルの値を増減するExcel VBA汎用プロシージャ", href: "/articles/vba/down-up-value-by-move-button", category: "Excel VBA" }],
  },
  {
    slug: "gas-photo-report-webapp",
    title: "写真付き現場報告書作成Webアプリ",
    subtitle: "GASでスマホ写真からPDF報告書を自動作成",
    category: "GAS業務Webアプリ",
    summary:
      "工事現場や点検現場で、スマートフォンから写真と選択項目を送信し、Googleスプレッドシートの帳票テンプレートから写真付きPDF報告書を自動作成するGAS Webアプリの開発事例です。",
    description: [
      "現場写真を報告書へ貼り付ける作業は、写真整理、サイズ調整、帳票への貼り付け、PDF化が手作業になりやすい部分です。この事例では、スマートフォンから写真と3項目の選択値を送信するだけで、Drive上に写真とPDFをまとめて保存できる仕組みにしました。",
      "サーバー契約や専用DBを用意せず、Googleスプレッドシートを帳票テンプレート、Google Driveを保存先、Google Apps Scriptを処理基盤として使う構成です。小規模な現場DXや、まず試作して運用に合わせて育てる業務アプリに向いています。",
      "実際の現場に合わせて、選択項目、写真枚数、帳票レイアウト、承認フロー、保存フォルダ構成などを調整できます。",
    ],
    stack: ["Google Apps Script", "Googleスプレッドシート", "Google Drive", "HTML", "PDF出力"],
    highlights: [
      "スマートフォンから写真を撮影または選択して送信",
      "写真ごとに3項目のプルダウン入力を付与",
      "1ページ6枚、7枚以上は複数ページに自動分割",
      "送信ごとにDriveフォルダを作成し、画像とPDFをまとめて保存",
      "サーバー契約不要でGoogle Workspace上に構築",
    ],
    ogImage: "/articles/gas/construction-photo-report-webapp/cover.png",
    images: [
      {
        src: "/articles/gas/construction-photo-report-webapp/cover.png", width: 1731, height: 909,
        alt: "工事現場向け写真報告書Webアプリのカバー画像",
        caption: "現場写真の撮影・入力からDrive保存、PDF報告書作成までの流れをまとめたカバー画像です。",
      },
      {
        src: "/cases/gas-photo-report/09-usage-form.jpg", width: 4258, height: 2559,
        alt: "写真付き報告書作成Webアプリの入力画面",
        caption: "スマートフォンから写真と選択項目を登録する入力画面です。",
      },
      {
        src: "/cases/gas-photo-report/11-output-result.jpg", width: 2490, height: 2870,
        alt: "Driveに保存された画像とPDF報告書の出力結果",
        caption: "送信ごとに専用フォルダを作り、画像とPDFをまとめて保存します。",
      },
      {
        src: "/cases/gas-photo-report/02-report-template.jpg", width: 1143, height: 1649,
        alt: "Googleスプレッドシートの写真付き報告書テンプレート",
        caption: "スプレッドシートを帳票テンプレートとして使い、写真付きPDFへ変換します。",
      },
    ],
    visibility: "public",
    relatedArticles: [
      {
        title: "GASで作る工事現場向け写真付き報告書Webアプリ",
        href: "/articles/gas/construction-photo-report-webapp",
        category: "GAS",
      },
      {
        title: "GASでスマホ写真付きレポートをPDF出力する方法",
        href: "/articles/gas/image-function-photo-pdf-report",
        category: "GAS",
      },
      {
        title: "GAS Webアプリでスマホ写真を送信前に圧縮する方法",
        href: "/articles/gas/compress-smartphone-photo-before-submit",
        category: "GAS",
      },
      {
        title: "GASで送信ごとにGoogle Drive専用フォルダへ保存する方法",
        href: "/articles/gas/drive-submission-folder",
        category: "GAS",
      },
      {
        title: "GAS帳票のセル配置をslots配列で管理する方法",
        href: "/articles/gas/report-slots-cell-map",
        category: "GAS",
      },
      {
        title: "GASで結合セルの左上セルに安全に値を入れる方法",
        href: "/articles/gas/merged-cell-top-left-value",
        category: "GAS",
      },
      {
        title: "GASでテンプレートシートを複製して複数ページPDFを作る方法",
        href: "/articles/gas/template-sheet-multi-page-pdf",
        category: "GAS",
      },
      {
        title: "GAS Webアプリの入力途中離脱を防ぐ方法",
        href: "/articles/gas/beforeunload-dirty-form",
        category: "GAS",
      },
      {
        title: "GASのgoogle.script.runでエラーハンドリングを実装する方法",
        href: "/articles/gas/script-run-error-handling",
        category: "GAS",
      },
      {
        title: "GAS WebアプリをSPA風に画面遷移させる方法",
        href: "/articles/gas/spa-navigation",
        category: "GAS",
      },
    ],
  },
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
    toolGuideUrl: "/tools/rakulog-task",
    visibility: "public",
    relatedArticles: [
      {
        title: "前回作業日の未完了データを入口画面で補正するUI",
        href: "/articles/nextjs/previous-workday-incomplete-data-ui",
        category: "Next.js",
      },
      {
        title: "修正フォームの近くに参考情報を表示するUI",
        href: "/articles/nextjs/edit-form-reference-info",
        category: "Next.js",
      },
      {
        title: "Supabase OAuth後にcallback routeを挟む",
        href: "/articles/nextjs/supabase-oauth-callback-route",
        category: "Next.js",
      },
      {
        title: "公開アプリ更新時にREADME・仕様書・画面導線を揃える",
        href: "/articles/codex/public-app-docs-links-sync",
        category: "Codex",
      },
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
      "GitHub PagesとReleasesを使った配布ページ整備",
    ],
    projectUrl: "https://yujifukami.github.io/NandemoShortCut/",
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
      {
        title: "GitHub Pages + ReleasesでWindows EXE配布ページを作る",
        href: "/articles/python-windows/github-pages-releases-exe-distribution",
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
    toolGuideUrl: "/tools/kaiso",
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
