javascript:(() => {
  try {
    // 値をセットしてフレームワーク(React/Vue)にも反映（フォールバック用）
    const setVal = (el, val) => {
      const proto = el.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(proto, "value").set.call(el, val);
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    };
    // カーソル位置に挿入（入力中の文章を消さない。選択中ならその範囲を置換）
    const insertAtCursor = (el, text) => {
      el.focus();
      if (document.execCommand("insertText", false, text)) return; // 標準: Undo対応・framework更新
      const s = el.selectionStart != null ? el.selectionStart : el.value.length;
      const e = el.selectionEnd != null ? el.selectionEnd : s;
      const v = el.value;
      setVal(el, v.slice(0, s) + text + v.slice(e));
      const p = s + text.length;
      try { el.setSelectionRange(p, p); } catch (_) {}
    };

    let name = "", ta = null;

    // パターンA: メッセージ詳細ページ (/mypage/direct_message/...)
    const dmTa = document.querySelector("#DirectMessageBody")
      || document.querySelector('textarea[name="data[DirectMessage][body]"]');
    if (dmTa) {
      const a = document.querySelector(".threadParticipants a");
      name = a ? a.textContent.trim() : "";
      if (!name) {
        const dm = document.querySelector(".data-message");
        name = dm && dm.dataset ? (dm.dataset.clientName || "").trim() : "";
      }
      ta = dmTa;
    } else {
      // パターンB: トークルーム (/talkrooms/...) ※Vueアプリ
      const a = document.querySelector(".d-userInfo_name");
      name = a ? a.textContent.trim() : "";
      ta = document.querySelector(".js-talkroomMessageArea textarea")
        || document.querySelector(".d-messageForm textarea")
        || document.querySelector("textarea.input.textarea");
    }

    if (!name) throw new Error("相手の名前が見つかりませんでした。メッセージ詳細またはトークルームのページで実行してください。");
    if (!ta) throw new Error("メッセージ入力欄が見つかりませんでした。");

    insertAtCursor(ta, name); // カーソル位置に名前を挿入
  } catch (e) {
    console.error(e);
    alert(e.message);
  }
})();
