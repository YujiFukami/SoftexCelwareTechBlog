javascript:(() => {
  try {
    const setVal = (el, val) => {
      const proto =
        el.tagName === "TEXTAREA"
          ? HTMLTextAreaElement.prototype
          : HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
      setter.call(el, val);
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    };

    let name = "";
    let ta = null;

    const dmTa =
      document.querySelector("#DirectMessageBody") ||
      document.querySelector('textarea[name="data[DirectMessage][body]"]');

    if (dmTa) {
      const a = document.querySelector(".threadParticipants a");
      name = a ? a.textContent.trim() : "";
      if (!name) {
        const dm = document.querySelector(".data-message");
        name = dm && dm.dataset ? (dm.dataset.clientName || "").trim() : "";
      }
      ta = dmTa;
    } else {
      const a = document.querySelector(".d-userInfo_name");
      name = a ? a.textContent.trim() : "";
      ta =
        document.querySelector(".js-talkroomMessageArea textarea") ||
        document.querySelector(".d-messageForm textarea") ||
        document.querySelector("textarea.input.textarea");
    }

    if (!name) {
      throw new Error(
        "相手の名前が見つかりませんでした。メッセージ詳細またはトークルームのページで実行してください。"
      );
    }
    if (!ta) {
      throw new Error("メッセージ入力欄が見つかりませんでした。");
    }

    setVal(ta, name);
    ta.focus();
    try {
      ta.setSelectionRange(name.length, name.length);
    } catch (e) {}
  } catch (e) {
    console.error(e);
    alert(e.message);
  }
})();
