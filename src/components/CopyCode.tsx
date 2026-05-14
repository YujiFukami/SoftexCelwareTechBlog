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
  "xlookup-2col-usage": `Dim Data As Variant
Dim Result As Variant

Data = Worksheets("Master").Range("A1:D100").Value
Result = F_XLookUp_2Col(Data, 4, "東京", 1, "A001", 2)

If IsEmpty(Result) = False Then
    MsgBox Result
End If`,
  "xlookup-2col-full": `' === Module: ModWSFunction ===

Public Function F_XLookUp_2Col(ByRef Array2D As Variant, _
                             ByRef ReturnCol As Long, _
                                ByRef Value1 As Variant, _
                            ByRef SearchCol1 As Long, _
                                ByRef Value2 As Variant, _
                            ByRef SearchCol2 As Long) _
                                             As Variant
'Xlookup関数の応用で、検索列を2つ指定する
'20250410

'引数
'Array2D   ・・・対象の二次元配列
'ReturnCol ・・・値を取得対象の列
'Value1    ・・・検索する値1
'SearchCol1・・・検索対象列番号1
'Value2    ・・・検索する値2
'SearchCol2・・・検索対象列番号2

    Dim Output As Variant
    Dim I      As Long
    Dim N      As Long: N = UBound(Array2D, 1)
    Dim Judge1 As Boolean
    Dim Judge2 As Boolean
    For I = 1 To N

        '検索対象列1の判定
        Judge1 = False
        If Array2D(I, SearchCol1) = Value1 Then
            Judge1 = True

        ElseIf IsNumeric(Array2D(I, SearchCol1)) = True And IsNumeric(Value1) = True Then
            If Val(Array2D(I, SearchCol1)) = Val(Value1) Then
                '両方数値型で表される場合は、数値型に変換も行って判定
                Judge1 = True
            End If
        End If

        '検索対象列2の判定
        Judge2 = False
        If Array2D(I, SearchCol2) = Value2 Then
            Judge2 = True

        ElseIf IsNumeric(Array2D(I, SearchCol2)) = True And IsNumeric(Value2) = True Then
            If Val(Array2D(I, SearchCol2)) = Val(Value2) Then
                '両方数値型で表される場合は、数値型に変換も行って判定
                Judge2 = True
            End If
        End If

        '判定結果をもとに処理
        If Judge1 = True And Judge2 = True Then
            Output = Array2D(I, ReturnCol)
            Exit For
        End If
    Next

    F_XLookUp_2Col = Output

End Function`,
  "make-label-on-user-form-usage": `Private Sub UserForm_Initialize()
    Dim NewLabel As MSForms.Label

    Set NewLabel = MakeLabelOnUserForm( _
        Me, 18, 120, 20, 10, "受付日", 10, "lblReceptionDate")
End Sub`,
  "make-label-on-user-form-full": `' === Module: ModUserForm ===

Public Function MakeLabelOnUserForm(ByRef TargetForm As UserForm, _
                                        ByRef Height As Double, _
                                         ByRef Width As Double, _
                                           ByRef Top As Double, _
                                          ByRef Left As Double, _
                                          ByRef Text As String, _
                                      ByRef FontSize As Double, _
                                   ByRef ControlName As String) _
                                                     As MSForms.Label

'ユーザーフォームにラベルを1つ設置する。
'1行でラベルのテキスト(Caption)、位置、サイズ、フォントサイズを設定できるようにする
'参考:https://docs.microsoft.com/ja-jp/office/vba/language/reference/user-interface-help/add-method-microsoft-forms
'20260420

'引数
'TargetForm ・・・対象のユーザーフォーム
'Height     ・・・ラベルの高さ
'Width      ・・・ラベルの幅
'Top        ・・・ラベルの上位置
'Left       ・・・ラベルの下位置
'Text       ・・・ラベルのテキスト
'Fontsize   ・・・ラベルのフォントサイズ
'ControlName・・・ラベルのコントロール名

    Dim Output As MSForms.Label '追加するラベル
    Set Output = TargetForm.Controls.Add("Forms.Label.1") 'ラベルの追加
    With Output
        .Name = ControlName
        .Top = Top
        .Left = Left
        .Height = Height
        .Width = Width
        .Font.size = FontSize
        .Caption = Text
    End With

    Set MakeLabelOnUserForm = Output

End Function`,
  "rotate-shape-fit-cell-usage": `Dim BarcodeShape As Shape

Set BarcodeShape = ActiveSheet.Shapes("BarcodeShape")
Set BarcodeShape = RotateShapeFitCell(BarcodeShape, ActiveSheet.Range("B2"))`,
  "rotate-shape-fit-cell-full": `' === Module: ModShape ===

Public Function RotateShapeFitCell(ByRef Shape As Shape, _
                                    ByRef Cell As Range) _
                                               As Shape
'Shapeを90度回転させてCellのサイズにあわせる
'20260122

'引数
'Shape・・・対象のShape
'Cell ・・・位置をあわせるCell

    '一旦移動する(左上から遠くに置いておかないと変形に影響が出る)
    Shape.Left = WorksheetFunction.Max(Shape.Width, Shape.Height) * 2
    Shape.Top = WorksheetFunction.Max(Shape.Width, Shape.Height) * 2

    '縦横比変更
    Shape.Width = Cell.Height
    Shape.Height = Cell.Width

    '90度回転
    Shape.Rotation = 90

    'CellとShapeの中心座標計算
    Dim ShapeCenterTop  As Double: ShapeCenterTop = Shape.Top + Shape.Height / 2
    Dim ShapeCenterLeft As Double: ShapeCenterLeft = Shape.Left + Shape.Width / 2
    Dim CellCenterTop   As Double: CellCenterTop = Cell.Top + Cell.Height / 2
    Dim CellCenterLeft  As Double: CellCenterLeft = Cell.Left + Cell.Width / 2

    '移動量計算(中心座標の差分が移動量)
    Dim MoveLeft As Double: MoveLeft = CellCenterLeft - ShapeCenterLeft
    Dim MoveTop As Double: MoveTop = CellCenterTop - ShapeCenterTop

    'Shape移動
    Call Shape.IncrementLeft(MoveLeft)
    Call Shape.IncrementTop(MoveTop)
    '※ 「Shape.Left = ** 」の処理はマイナスを指定できない

    '出力
    Set RotateShapeFitCell = Shape

End Function`,
} as const;

type SampleKey = keyof typeof codeSamples;

type CopyCodeProps = {
  code?: string;
  sample?: SampleKey;
  language?: string;
  filename?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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

  function handleOpenFullView() {
    const title = filename || "Code";
    const view = window.open("", "_blank", "width=1100,height=820");
    if (!view) return;

    view.document.write(`<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <style>
    :root { color-scheme: dark; }
    body {
      margin: 0;
      background: #020617;
      color: #e5e7eb;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }
    header {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 14px 18px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      background: #111827;
    }
    .title {
      min-width: 0;
    }
    .filename {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      font-weight: 700;
    }
    .language {
      margin-top: 4px;
      color: #9ca3af;
      font-size: 11px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    button {
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      cursor: pointer;
      font: inherit;
      font-size: 13px;
      padding: 8px 12px;
    }
    button:hover {
      background: rgba(255, 255, 255, 0.18);
    }
    pre {
      box-sizing: border-box;
      min-height: calc(100vh - 62px);
      margin: 0;
      overflow: auto;
      padding: 22px;
      white-space: pre;
      font-size: 14px;
      line-height: 1.7;
    }
  </style>
</head>
<body>
  <header>
    <div class="title">
      <div class="filename">${escapeHtml(title)}</div>
      <div class="language">${escapeHtml(language)}</div>
    </div>
    <button type="button" onclick="navigator.clipboard.writeText(document.querySelector('code').textContent)">コピー</button>
  </header>
  <pre><code>${escapeHtml(resolvedCode)}</code></pre>
</body>
</html>`);
    view.document.close();
    view.opener = null;
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
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={handleOpenFullView}
            className="rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/20"
          >
            全体表示
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/20"
          >
            {copied ? "コピー済み" : "コピー"}
          </button>
        </div>
      </div>
      <pre className="m-0 max-h-[560px] overflow-auto p-4 text-sm leading-relaxed text-gray-100">
        <code>{resolvedCode}</code>
      </pre>
    </div>
  );
}
