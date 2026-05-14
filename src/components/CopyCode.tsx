"use client";

import { useMemo, useState } from "react";

const codeSamples = {
  "msg-input-check-usage": `If MsgInputCheck("ユーザー名", UserName, "パスワード", Password) = False Then
    Exit Sub
End If`,
  "msg-input-check-full": `Public Function MsgInputCheck(ParamArray NameAndValue() As Variant) As Boolean
'入力値名(Name)、入力値(Value)を交互に引数として入れて、
'1つでもValueが空白「""」があったら警告メッセージを表示してFalseを返す
'20260514

'NameAndValue・・・入力値名(Name)、入力値(Value)を交互に入力

'記述例
'If MsgInputCheck("ユーザー名", UserName, "パスワード", Password) = False Then
'    Exit Sub
'End If

    '入力個数チェック
    Dim N As Long: N = UBound(NameAndValue, 1) + 1 '入力個数
    If N Mod 2 <> 0 Then '偶数である必要がある
        MsgBox "入力値名(Name)、入力値(Value)を交互に入力してください", vbExclamation
        Exit Function
    End If

    '処理
    Dim Name   As String
    Dim Value  As String
    Dim I      As Long
    Dim Row    As Long
    Dim Output As Boolean: Output = True
    For I = 0 To N / 2 - 1
        Row = I * 2
        Name = NameAndValue(Row)
        Value = NameAndValue(Row + 1)

        If Value = "" Then
            MsgBox "「" & Name & "」が入力されていません", vbExclamation
            Output = False
            Exit For
        End If
    Next

    '出力
    MsgInputCheck = Output

End Function`,
} as const;

type SampleKey = keyof typeof codeSamples;

type CopyCodeProps = {
  code?: string;
  sample?: SampleKey;
  language?: string;
  filename?: string;
};

export default function CopyCode({
  code,
  sample,
  language = "text",
  filename,
}: CopyCodeProps) {
  const [copied, setCopied] = useState(false);
  const resolvedCode = useMemo(() => {
    if (sample) return codeSamples[sample];
    return code ?? "";
  }, [code, sample]);

  async function handleCopy() {
    await navigator.clipboard.writeText(resolvedCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-gray-200 bg-gray-950 shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-gray-900 px-3 py-2">
        <div className="min-w-0">
          {filename && (
            <div className="truncate text-xs font-medium text-gray-200">
              {filename}
            </div>
          )}
          <div className="text-[11px] uppercase tracking-wide text-gray-400">
            {language}
          </div>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/20"
        >
          {copied ? "コピー済み" : "コピー"}
        </button>
      </div>
      <pre className="m-0 max-h-[560px] overflow-auto p-4 text-sm leading-relaxed text-gray-100">
        <code>{resolvedCode}</code>
      </pre>
    </div>
  );
}
