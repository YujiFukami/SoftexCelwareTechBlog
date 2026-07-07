"use client";

import { useEffect, useRef, useState } from "react";

type BookmarkletId =
  | "coconala-reservation-copy"
  | "coconala-sales-total"
  | "coconala-client-name"
  | "coconala-client-name-sama";

const bookmarklets: Record<BookmarkletId, string> = {
  "coconala-reservation-copy": String.raw`javascript:(function(){var P='d-reservationProviderCalendarContents_';var c=document.querySelector('.d-reservationProviderCalendarContents');function SP(text,copied){var old=document.getElementById('bm-reserve-panel');if(old)old.remove();var b=document.createElement('div');b.id='bm-reserve-panel';b.style.cssText='position:fixed;top:20px;right:20px;z-index:2147483647;background:#fff;border:2px solid #2ea98c;border-radius:10px;box-shadow:0 4px 18px rgba(0,0,0,.28);padding:16px 18px 14px;font-family:sans-serif;font-size:14px;color:#222;max-width:380px';var x=document.createElement('button');x.textContent='×';x.style.cssText='position:absolute;top:4px;right:8px;border:none;background:none;font-size:20px;line-height:1;cursor:pointer;color:#999';x.onclick=function(){b.remove();};var h=document.createElement('div');h.textContent=copied?'予約枠（クリップボードにコピー済み）':'予約枠（コピー失敗：下を選択してコピー）';h.style.cssText='font-weight:bold;margin-bottom:8px;padding-right:16px;color:'+(copied?'#2ea98c':'#c0392b');var bd=document.createElement('div');bd.textContent=text;bd.style.cssText='white-space:pre-wrap;line-height:1.7;user-select:all';b.appendChild(x);b.appendChild(h);b.appendChild(bd);document.body.appendChild(b);}if(!c){SP('カレンダーが見つかりません。\n予約管理カレンダーのページで実行してください。',false);return;}var WD=['日','月','火','水','木','金','土'],U=30;function V(e,n){return parseFloat(e.style.getPropertyValue(n));}function F(m){var h=Math.floor(m/60),x=m-h*60;return h+':'+(x<10?'0'+x:x);}var ttl=document.querySelector('.d-reservationProviderCalendarHeading_termText');var ym=(ttl?ttl.textContent:'').match(/(\d{4})年(\d{1,2})月/);var now=new Date();var yy=ym?parseInt(ym[1],10):now.getFullYear();var mm=ym?parseInt(ym[2],10):now.getMonth()+1;var DT=[],pv=-1;document.querySelectorAll('.d-reservationProviderCalendarDays_dayWrapper .d-reservationProviderCalendarDays_day').forEach(function(el){var dn=parseInt(el.textContent,10);if(pv!==-1&&dn<pv){mm++;if(mm>12){mm=1;yy++;}}DT.push(new Date(yy,mm-1,dn));pv=dn;});var L=[];c.querySelectorAll('.'+P+'dayWrapper').forEach(function(col,i){var d=DT[i]||new Date();var lb=(d.getMonth()+1)+'/'+d.getDate()+'('+WD[d.getDay()]+')';var S=[];col.querySelectorAll('.'+P+'reservationFrameCell').forEach(function(f){var tp=V(f,'--reservation-frame-cell-top'),un=V(f,'--reservation-frame-cell-unit');if(isNaN(tp)||isNaN(un))return;S.push({s:tp*U,e:(tp+un)*U});});S.sort(function(a,b){return a.s-b.s;});L.push(lb+' '+(S.length?S.map(function(s){return F(s.s)+'～'+F(s.e);}).join(' '):'空き無し'));});var O=L.join('\n');function FIN(ok){SP(O,ok);}function EC(){var t=document.createElement('textarea');t.value=O;document.body.appendChild(t);t.select();var ok=false;try{ok=document.execCommand('copy');}catch(e){}document.body.removeChild(t);FIN(ok);}if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(O).then(function(){FIN(true);},function(){EC();});}else{EC();}})();`,
  "coconala-sales-total": String.raw`javascript:(()=>{try{const num=t=>{const m=String(t||'').replace(/[,，\s円￥]/g,'').match(/-?\d+/);return m?Number(m[0]):0};let priceEls=[...document.querySelectorAll('.d-providerTalkroomCassetteBlock-pc .d-providerTalkroomCassettePrice_price')];if(priceEls.length===0)priceEls=[...document.querySelectorAll('.d-providerTalkroomCassettePrice_price')];const seen=new Set();let total=0,count=0;for(const priceEl of priceEls){const card=priceEl.closest('.d-providerTalkroomCassette')||priceEl.closest('.d-transactionListProviderMain_item');if(!card||seen.has(card))continue;seen.add(card);total+=num(priceEl.textContent);count++;}if(count===0)throw new Error('販売金額の要素が見つかりませんでした。取引管理ページで実行してください。');alert('販売金額合計: '+total.toLocaleString('ja-JP')+'円\n（'+count+'件）');}catch(e){console.error(e);alert('取得に失敗しました。\n'+e.message);}})();`,
  "coconala-client-name": String.raw`javascript:(()=>{try{const setVal=(el,val)=>{const proto=el.tagName==="TEXTAREA"?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,"value").set.call(el,val);el.dispatchEvent(new Event("input",{bubbles:true}));el.dispatchEvent(new Event("change",{bubbles:true}));};const insertAtCursor=(el,text)=>{el.focus();if(document.execCommand("insertText",false,text))return;const s=el.selectionStart!=null?el.selectionStart:el.value.length,e=el.selectionEnd!=null?el.selectionEnd:s,v=el.value;setVal(el,v.slice(0,s)+text+v.slice(e));const p=s+text.length;try{el.setSelectionRange(p,p);}catch(_){}};let name="",ta=null;const dmTa=document.querySelector("#DirectMessageBody")||document.querySelector('textarea[name="data[DirectMessage][body]"]');if(dmTa){const a=document.querySelector(".threadParticipants a");name=a?a.textContent.trim():"";if(!name){const dm=document.querySelector(".data-message");name=dm&&dm.dataset?(dm.dataset.clientName||"").trim():"";}ta=dmTa;}else{const a=document.querySelector(".d-userInfo_name");name=a?a.textContent.trim():"";ta=document.querySelector(".js-talkroomMessageArea textarea")||document.querySelector(".d-messageForm textarea")||document.querySelector("textarea.input.textarea");}if(!name)throw new Error("相手の名前が見つかりませんでした。メッセージ詳細またはトークルームのページで実行してください。");if(!ta)throw new Error("メッセージ入力欄が見つかりませんでした。");insertAtCursor(ta,name);}catch(e){console.error(e);alert(e.message);}})();`,
  "coconala-client-name-sama": String.raw`javascript:(()=>{try{const setVal=(el,val)=>{const proto=el.tagName==="TEXTAREA"?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,"value").set.call(el,val);el.dispatchEvent(new Event("input",{bubbles:true}));el.dispatchEvent(new Event("change",{bubbles:true}));};const insertAtCursor=(el,text)=>{el.focus();if(document.execCommand("insertText",false,text))return;const s=el.selectionStart!=null?el.selectionStart:el.value.length,e=el.selectionEnd!=null?el.selectionEnd:s,v=el.value;setVal(el,v.slice(0,s)+text+v.slice(e));const p=s+text.length;try{el.setSelectionRange(p,p);}catch(_){}};let name="",ta=null;const dmTa=document.querySelector("#DirectMessageBody")||document.querySelector('textarea[name="data[DirectMessage][body]"]');if(dmTa){const a=document.querySelector(".threadParticipants a");name=a?a.textContent.trim():"";if(!name){const dm=document.querySelector(".data-message");name=dm&&dm.dataset?(dm.dataset.clientName||"").trim():"";}ta=dmTa;}else{const a=document.querySelector(".d-userInfo_name");name=a?a.textContent.trim():"";ta=document.querySelector(".js-talkroomMessageArea textarea")||document.querySelector(".d-messageForm textarea")||document.querySelector("textarea.input.textarea");}if(!name)throw new Error("相手の名前が見つかりませんでした。メッセージ詳細またはトークルームのページで実行してください。");if(!ta)throw new Error("メッセージ入力欄が見つかりませんでした。");insertAtCursor(ta,name+"様\n");}catch(e){console.error(e);alert(e.message);}})();`,
};

type BookmarkletInstallProps = {
  id?: BookmarkletId;
  src?: string;
  label: string;
};

export default function BookmarkletInstall({ id, src, label }: BookmarkletInstallProps) {
  const [loadedBookmarklet, setLoadedBookmarklet] = useState("");
  const bookmarklet = id ? bookmarklets[id] : loadedBookmarklet;
  const anchorRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!src) return;

    let cancelled = false;

    fetch(src)
      .then((response) => {
        if (!response.ok) throw new Error("bookmarklet source not found");
        return response.text();
      })
      .then((text) => {
        if (!cancelled) setLoadedBookmarklet(text.trim());
      })
      .catch(() => {
        if (!cancelled) setLoadedBookmarklet("");
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    anchorRef.current?.setAttribute("href", bookmarklet || "#");
  }, [bookmarklet]);

  return (
    <div className="my-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
      <a
        ref={anchorRef}
        className="inline-flex cursor-grab items-center justify-center rounded-md bg-emerald-600 px-5 py-3 text-sm font-bold text-white no-underline shadow-sm transition hover:bg-emerald-700 active:cursor-grabbing"
        href="#"
        onClick={(event) => event.preventDefault()}
        onDragStart={(event) => {
          if (!bookmarklet) return;
          event.dataTransfer.setData("text/uri-list", bookmarklet);
          event.dataTransfer.setData("text/plain", bookmarklet);
        }}
        draggable
      >
        {label}
      </a>
      <p className="mt-3 text-sm text-slate-700">
        クリックではなく、このボタンをChromeのブックマークバーへドラッグして登録します。
        {!bookmarklet ? " コードを読み込み中です。" : ""}
      </p>
    </div>
  );
}
