import type { ArticleMeta } from "@/lib/articles";

export interface VbaPartCategory {
  id: string;
  label: string;
  description: string;
}

export interface VbaPartArticle extends ArticleMeta {
  partCategory: string;
  procedureType?: string;
  hasSample?: boolean;
}

export const vbaPartCategories: VbaPartCategory[] = [
  {
    id: "array-search",
    label: "配列・検索",
    description: "一次元・二次元配列の変換、検索、繰り返し処理に使う部品です。",
  },
  {
    id: "cell-range",
    label: "セル・Range操作",
    description: "セルの取得、値の変更、Rangeを使った処理を共通化します。",
  },
  {
    id: "input-validation",
    label: "入力支援・入力規則",
    description: "入力漏れ確認や入力規則リストなど、入力画面を扱いやすくします。",
  },
  {
    id: "shape-ui",
    label: "図形・ボタン・画面操作",
    description: "Shapeやボタンを使った操作画面と視覚的なフィードバックを作ります。",
  },
  {
    id: "userform",
    label: "UserForm",
    description: "UserForm上のコントロール生成や入力操作に使う部品です。",
  },
  {
    id: "file-clipboard",
    label: "ファイル・クリップボード",
    description: "ファイル選択、ZIP確認、クリップボード入出力を共通化します。",
  },
  {
    id: "development-support",
    label: "コード生成・VBE開発支援",
    description: "定型コードの生成やVBE操作を補助し、コーディングを効率化します。",
  },
  {
    id: "common-control",
    label: "エラー処理・待機・共通制御",
    description: "エラー回避、短時間待機など、複数処理から使う基礎部品です。",
  },
];

const categoryOverrides: Record<string, string> = {
  "immediate-window-cui-procedure-generator": "development-support",
  "make-clip-code-loop-array1d": "development-support",
  "make-clip-code-loop-array2d": "development-support",
  "mcc-error-escape": "development-support",
  "show-code-window-delay": "development-support",
  cliptext: "file-clipboard",
  getcliptext: "file-clipboard",
  getfilelistinzip: "file-clipboard",
  selectfile: "file-clipboard",
  "utf8bytes-utf8decode": "file-clipboard",
  "event-show-move-spin-button": "input-validation",
  "event-show-move-spin-button-value": "input-validation",
  "change-value-move-spin-button": "input-validation",
  "get-cell-validation": "input-validation",
  "msg-input-check": "input-validation",
  "down-up-value-by-move-button": "input-validation",
  "change-value-cell": "cell-range",
  "get-selection-cell": "cell-range",
  "change-pushed-button-color": "shape-ui",
  "draw-rectangle-round": "shape-ui",
  "get-shape-by-name": "shape-ui",
  "get-shape-pushed": "shape-ui",
  "make-command-button-at-cell": "shape-ui",
  "rotate-shape-fit-cell": "shape-ui",
  "changevaluetextbox-bykey": "userform",
  "make-label-on-user-form": "userform",
  "conv-array1d-start1": "array-search",
  "get-num-from-array1d": "array-search",
  "xlookup-2col": "array-search",
  "wait-by-doevents": "common-control",
};

function inferProcedureType(article: ArticleMeta): string | undefined {
  if (article.title.includes("関数")) return "Function";
  if (article.title.includes("プロシージャ")) return "Sub / Procedure";
  if (article.tags.includes("SelectionChange")) return "Event";
  return undefined;
}

function inferPartCategory(article: ArticleMeta): string {
  const override = categoryOverrides[article.slug];
  if (override) return override;

  const tags = article.tags.join(" ");
  if (/UserForm|TextBox|MSForms/.test(tags)) return "userform";
  if (/コード生成|VBE|VBIDE|イミディエイトウィンドウ/.test(tags)) {
    return "development-support";
  }
  if (/ZIP|FileDialog|ファイル|クリップボード/.test(tags)) {
    return "file-clipboard";
  }
  if (/配列|検索|XLOOKUP/.test(tags)) return "array-search";
  if (/入力|Validation|SelectionChange/.test(tags)) return "input-validation";
  if (/Shape|図形|フォームコントロール|UI/.test(tags)) return "shape-ui";
  if (/エラー|DoEvents|待機/.test(tags)) return "common-control";
  return "cell-range";
}

export function getVbaParts(articles: ArticleMeta[]): VbaPartArticle[] {
  return articles
    .filter(
      (article) =>
        article.category === "vba" &&
        (article.tags.includes("汎用プロシージャ") ||
          article.slug === "immediate-window-cui-procedure-generator" ||
          article.slug === "utf8bytes-utf8decode")
    )
    .map((article) => ({
      ...article,
      partCategory: inferPartCategory(article),
      procedureType: inferProcedureType(article),
      hasSample: article.tags.some((tag) =>
        ["サンプルブック", "実行サンプル", "デモ"].includes(tag)
      ),
    }));
}
