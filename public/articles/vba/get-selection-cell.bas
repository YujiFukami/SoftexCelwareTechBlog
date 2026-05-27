' === Module: ModCell ===

Public Function GetSelectionCell() As Range
'選択中のセルを取得する
'セル以外を選択している場合はNothingを返す
'20220312
'https://www.softex-celware.com/post/getselectioncell
    
    '処理
    Dim Dummy  As Object: Set Dummy = Selection
    Dim Output As Range: Set Output = Nothing
    If TypeName(Dummy) = "Range" Then
        Set Output = Dummy
    End If
    
    '出力
    Set GetSelectionCell = Output
End Function

