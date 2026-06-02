(async () => {
  try {
    const root =
      window.__NUXT__?.state?.pages?.analytics ||
      window.$nuxt?.$store?.state?.pages?.analytics;

    if (!root) {
      throw new Error("分析データが見つかりません。ココナラの分析ページで実行してください。");
    }

    const service = root.serviceAnalytics;

    if (!service) {
      throw new Error("サービス分析データが見つかりません。");
    }

    // 閲覧数・販売数
    const viewSaleList = service.numberOfTermsList || [];

    // 表示数
    const impressionList = service.serviceImpressions?.numberOfTermsList || [];

    const viewSaleMap = new Map(viewSaleList.map(item => [item.term, item]));
    const impressionMap = new Map(impressionList.map(item => [item.term, item]));

    const dates = [
      ...new Set([
        ...viewSaleList.map(item => item.term),
        ...impressionList.map(item => item.term),
      ]),
    ].sort();

    const rows = dates.map(date => {
      const viewSale = viewSaleMap.get(date) || {};
      const impression = impressionMap.get(date) || {};

      return [
        date,
        impression.impressionCount ?? "",
        viewSale.numberOfView ?? "",
        viewSale.numberOfSale ?? "",
      ];
    });

    const header = ["日付", "表示数", "閲覧数", "販売数"];

    // Excel・スプレッドシートに貼り付けやすいタブ区切り
    const outputText = [header, ...rows]
      .map(row => row.join("\t"))
      .join("\n");

    try {
      await navigator.clipboard.writeText(outputText);
    } catch (error) {
      const textarea = document.createElement("textarea");
      textarea.value = outputText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    console.table(
      rows.map(row => ({
        日付: row[0],
        表示数: row[1],
        閲覧数: row[2],
        販売数: row[3],
      }))
    );

    alert(
      "ココナラ分析データをクリップボードにコピーしました。\n" +
      "件数: " + rows.length + "日分\n\n" +
      "Excelやスプレッドシートに貼り付けできます。"
    );

  } catch (error) {
    console.error(error);
    alert("取得に失敗しました。\n" + error.message);
  }
})();