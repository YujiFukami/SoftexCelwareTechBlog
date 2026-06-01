' === Module: ModOther ===

Public Function MakeCommandButtonAtCell(ByRef Cell As Range, _
                                     ByRef Caption As String, _
                                 ByRef RegistMacro As String, _
                         Optional ByRef ButtonName As String) _
                                                   As Button

'特定のセル範囲に同じ大きさのコマンドボタンを設定する
'20250207
'20260602 マクロの登録はブックのフルパスも設定する形とする

'引数
'Cell        ・・・ボタンを設置するセル範囲
'Caption     ・・・ボタンのキャプション
'RegistMacro ・・・登録するマクロのプロシージャ名
'[ButtonName]・・・ボタンのシェイプ名

    '対象シートの参照
    Dim Sheet  As Worksheet
    Set Sheet = Cell.Worksheet

    'シェイプ名からすでに作成済みかどうか確認
    If ButtonName = "" Then
        ButtonName = Caption
    End If
    Dim Shape As Shape: Set Shape = GetShapeByName(Sheet, ButtonName)
    If Not Shape Is Nothing Then 'すでに作成済み
        Exit Function
    End If

    'セルの大きさと同じものを作成する
    Dim Button As Button
    Set Button = Sheet.Buttons.Add(Cell.Left, Cell.Top, Cell.Width, Cell.Height)
    Button.Text = Caption

    '親ブックのフルパス取得
    Dim BookFullPath As String: BookFullPath = Cell.Worksheet.Parent.FullName

    'マクロの登録
    Button.OnAction = "'" & BookFullPath & "'!" & RegistMacro
'    Button.OnAction = RegistMacro 'これだけだと「MakeCommandButtonAtCell」をxlamなど外部ブックにある場合は上手くいかない

    'ボタンのシェイプ名設定
    Button.ShapeRange.Name = ButtonName

    '出力
    Set MakeCommandButtonAtCell = Button

End Function

' === Module: ModShape ===

Public Function GetShapeByName(ByRef Sheet As Worksheet, _
                           ByRef ShapeName As String) _
                                           As Shape
'指定シート内の指定名のシェイプを取得する
'指定名のシェイプが無かった場合はNothingを返す
'20221124

'引数
'Sheet    ・・・指定シート
'ShapeName・・・指定シェイプの名前

    On Error Resume Next
    Dim Output As Shape: Set Output = Sheet.Shapes(ShapeName)
    On Error GoTo 0
    Set GetShapeByName = Output

End Function
