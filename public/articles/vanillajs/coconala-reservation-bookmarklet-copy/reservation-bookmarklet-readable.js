(function () {
  var prefix = "d-reservationProviderCalendarContents_";
  var calendar = document.querySelector(".d-reservationProviderCalendarContents");

  function showPanel(text, copied) {
    var old = document.getElementById("bm-reserve-panel");
    if (old) old.remove();

    var panel = document.createElement("div");
    panel.id = "bm-reserve-panel";
    panel.style.cssText =
      "position:fixed;top:20px;right:20px;z-index:2147483647;background:#fff;border:2px solid #2ea98c;border-radius:10px;box-shadow:0 4px 18px rgba(0,0,0,.28);padding:16px 18px 14px;font-family:sans-serif;font-size:14px;color:#222;max-width:380px";

    var close = document.createElement("button");
    close.textContent = "×";
    close.style.cssText =
      "position:absolute;top:4px;right:8px;border:none;background:none;font-size:20px;line-height:1;cursor:pointer;color:#999";
    close.onclick = function () {
      panel.remove();
    };

    var heading = document.createElement("div");
    heading.textContent = copied
      ? "予約枠（クリップボードにコピー済み）"
      : "予約枠（コピー失敗：下を選択してコピー）";
    heading.style.cssText =
      "font-weight:bold;margin-bottom:8px;padding-right:16px;color:" + (copied ? "#2ea98c" : "#c0392b");

    var body = document.createElement("div");
    body.textContent = text;
    body.style.cssText = "white-space:pre-wrap;line-height:1.7;user-select:all";

    panel.appendChild(close);
    panel.appendChild(heading);
    panel.appendChild(body);
    document.body.appendChild(panel);
  }

  if (!calendar) {
    showPanel("カレンダーが見つかりません。\n予約管理カレンダーのページで実行してください。", false);
    return;
  }

  var weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  var unitMinutes = 30;

  function cssNumber(element, name) {
    return parseFloat(element.style.getPropertyValue(name));
  }

  function formatTime(minutes) {
    var hour = Math.floor(minutes / 60);
    var minute = minutes - hour * 60;
    return hour + ":" + (minute < 10 ? "0" + minute : minute);
  }

  var title = document.querySelector(".d-reservationProviderCalendarHeading_termText");
  var yearMonth = (title ? title.textContent : "").match(/(\d{4})年(\d{1,2})月/);
  var now = new Date();
  var year = yearMonth ? parseInt(yearMonth[1], 10) : now.getFullYear();
  var month = yearMonth ? parseInt(yearMonth[2], 10) : now.getMonth() + 1;
  var dates = [];
  var previousDay = -1;

  document
    .querySelectorAll(".d-reservationProviderCalendarDays_dayWrapper .d-reservationProviderCalendarDays_day")
    .forEach(function (element) {
      var day = parseInt(element.textContent, 10);
      if (previousDay !== -1 && day < previousDay) {
        month++;
        if (month > 12) {
          month = 1;
          year++;
        }
      }
      dates.push(new Date(year, month - 1, day));
      previousDay = day;
    });

  var lines = [];
  calendar.querySelectorAll("." + prefix + "dayWrapper").forEach(function (column, index) {
    var date = dates[index] || new Date();
    var label = date.getMonth() + 1 + "/" + date.getDate() + "(" + weekdays[date.getDay()] + ")";
    var slots = [];

    column.querySelectorAll("." + prefix + "reservationFrameCell").forEach(function (frame) {
      var top = cssNumber(frame, "--reservation-frame-cell-top");
      var unit = cssNumber(frame, "--reservation-frame-cell-unit");
      if (isNaN(top) || isNaN(unit)) return;
      slots.push({ start: top * unitMinutes, end: (top + unit) * unitMinutes });
    });

    slots.sort(function (a, b) {
      return a.start - b.start;
    });

    lines.push(
      label +
        " " +
        (slots.length
          ? slots
              .map(function (slot) {
                return formatTime(slot.start) + "～" + formatTime(slot.end);
              })
              .join(" ")
          : "空き無し"),
    );
  });

  var output = lines.join("\n");

  function finish(copied) {
    showPanel(output, copied);
  }

  function execCommandCopy() {
    var textarea = document.createElement("textarea");
    textarea.value = output;
    document.body.appendChild(textarea);
    textarea.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (error) {}
    document.body.removeChild(textarea);
    finish(ok);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(output).then(
      function () {
        finish(true);
      },
      function () {
        execCommandCopy();
      },
    );
  } else {
    execCommandCopy();
  }
})();
