export type LearningLesson = {
  slug: string;
  number: number;
  title: string;
  summary: string;
  status: "available" | "planned";
};

export type LearningCourse = {
  slug: string;
  title: string;
  summary: string;
  audience: string;
  lessons: LearningLesson[];
};

export type LearningTrack = {
  slug: string;
  title: string;
  summary: string;
  status: "available" | "planned";
  courses: LearningCourse[];
};

export const excelBeginnerCourse: LearningCourse = {
  slug: "beginner",
  title: "Excelの基本を仕組みから学ぶ",
  summary:
    "セル、値、数式、書式、入力規則など、Excelを使ううえで土台になる考え方を順番に学びます。",
  audience: "Excelを使い始めた方、操作を覚えたものの仕組みを整理したい方",
  lessons: [
    {
      slug: "excel-workbook-sheet-cell",
      number: 1,
      title: "Excel・ブック・シート・セルの関係",
      summary: "Excelファイルを構成する基本単位を整理します。",
      status: "available",
    },
    {
      slug: "cell-basics",
      number: 2,
      title: "セルに含まれる・関連付く情報",
      summary: "値、数式、書式、入力規則など、セルに関連する情報を整理します。",
      status: "available",
    },
    {
      slug: "cell-value-types",
      number: 3,
      title: "値の種類",
      summary: "文字列、数値、日付、真偽値の違いを学びます。",
      status: "planned",
    },
    {
      slug: "formulas-and-functions",
      number: 4,
      title: "数式と関数",
      summary: "数式の基本構造と関数の役割を学びます。",
      status: "planned",
    },
    {
      slug: "cell-references",
      number: 5,
      title: "セル参照",
      summary: "相対参照、絶対参照、複合参照を整理します。",
      status: "planned",
    },
    {
      slug: "cell-formatting",
      number: 6,
      title: "書式設定",
      summary: "値と表示方法を分けて考えるための基本を学びます。",
      status: "planned",
    },
    {
      slug: "data-validation",
      number: 7,
      title: "入力規則",
      summary: "入力できる値を制御し、入力ミスを減らす方法を学びます。",
      status: "planned",
    },
    {
      slug: "cell-notes-links",
      number: 8,
      title: "コメント・メモ・ハイパーリンク",
      summary: "セルに付加できる補足情報の使い分けを学びます。",
      status: "planned",
    },
  ],
};

export const learningTracks: LearningTrack[] = [
  {
    slug: "excel",
    title: "Excel",
    summary:
      "Excelの基本構造から、実務で迷いやすい機能までを段階的に学びます。",
    status: "available",
    courses: [excelBeginnerCourse],
  },
  {
    slug: "vba",
    title: "Excel VBA",
    summary: "マクロの基本から、再利用できる実務コードへ進みます。",
    status: "planned",
    courses: [],
  },
  {
    slug: "gas",
    title: "Google Apps Script",
    summary: "Googleサービスを連携した自動化とWebアプリ開発を学びます。",
    status: "planned",
    courses: [],
  },
  {
    slug: "web",
    title: "Webアプリ開発",
    summary: "画面、データ、公開まで、Webアプリ開発の流れを学びます。",
    status: "planned",
    courses: [],
  },
];

export function getLessonNavigation(slug: string) {
  const lessons = excelBeginnerCourse.lessons;
  const index = lessons.findIndex((lesson) => lesson.slug === slug);

  return {
    current: index >= 0 ? lessons[index] : undefined,
    previous: index > 0 ? lessons[index - 1] : undefined,
    next: index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : undefined,
  };
}
