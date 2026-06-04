javascript:(() => {
  try {
    const num = t => {
      const m = String(t || '').replace(/[,，\s円￥]/g, '').match(/-?\d+/);
      return m ? Number(m[0]) : 0;
    };

    let priceEls = [
      ...document.querySelectorAll(
        '.d-providerTalkroomCassetteBlock-pc .d-providerTalkroomCassettePrice_price'
      ),
    ];

    if (priceEls.length === 0) {
      priceEls = [
        ...document.querySelectorAll('.d-providerTalkroomCassettePrice_price'),
      ];
    }

    const seen = new Set();
    let total = 0;
    let count = 0;

    for (const priceEl of priceEls) {
      const card =
        priceEl.closest('.d-providerTalkroomCassette') ||
        priceEl.closest('.d-transactionListProviderMain_item');

      if (!card || seen.has(card)) continue;

      seen.add(card);
      total += num(priceEl.textContent);
      count++;
    }

    if (count === 0) {
      throw new Error('販売金額の要素が見つかりませんでした。取引管理ページで実行してください。');
    }

    alert('販売金額合計: ' + total.toLocaleString('ja-JP') + '円\n（' + count + '件）');
  } catch (e) {
    console.error(e);
    alert('取得に失敗しました。\n' + e.message);
  }
})();
