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

