Option Explicit

Public Sub SwitchShowHideColByButton()
'クリックされたボタンの列範囲を表示/非表示を切り替える
'20260615

    'クリックしたボタンを取得
    Dim Button As Button: Set Button = GetButtonPushed
    If Button Is Nothing Then Exit Sub

    '現在の表示状態を取得と表示切替
    Dim StartCell As Range: Set StartCell = Button.TopLeftCell
    Dim EndCell   As Range: Set EndCell = Button.BottomRightCell.Offset(-1, -1)

    If StartCell.Offset(0, 1).EntireColumn.Hidden = True Then
        '非表示状態 -> 表示状態
        Range(StartCell, EndCell).EntireColumn.Hidden = False
    Else
        '表示状態 -> 非表示状態
        Range(StartCell.Offset(0, 1), EndCell).EntireColumn.Hidden = True
    End If

End Sub

Public Function GetButtonPushed() As Button
'クリックされたフォームコントロールボタンを取得する
'20241202

    Dim Sheet     As Worksheet: Set Sheet = ActiveSheet
    Dim ShapeName As String:    ShapeName = Application.Caller
    Dim Shape     As Shape:     Set Shape = GetShapeByName(Sheet, ShapeName)

    If Shape Is Nothing Then Exit Function

    Dim Button As Button: Set Button = Shape.DrawingObject
    Set GetButtonPushed = Button

End Function

Public Function GetShapeByName(ByRef Sheet As Worksheet, _
                               ByRef ShapeName As String) As Shape
'指定シート内の指定名のシェイプを取得する
'指定名のシェイプが無かった場合はNothingを返す
'20221124

    On Error Resume Next
    Set GetShapeByName = Sheet.Shapes(ShapeName)
    On Error GoTo 0

End Function

Public Sub S11_区分別時間表示切替()
    Call SwitchShowHideColByButton
End Sub

Public Sub S11_時間帯別表示切替()
    Call SwitchShowHideColByButton
End Sub

Public Sub S11_シフト表示切替()
    Call SwitchShowHideColByButton
End Sub
