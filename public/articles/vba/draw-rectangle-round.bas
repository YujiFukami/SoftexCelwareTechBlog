' === Module: ModDrawShape ===

Public Function DrawRectangleRound(ByRef Left As Double, _
                                    ByRef Top As Double, _
                                  ByRef Width As Double, _
                                 ByRef Height As Double, _
                         Optional ByRef Sheet As Worksheet) _
                                              As Shape
'角が丸い長方形を作図する
'20240830

'引数
'Left   ・・・左端のX座標
'Top    ・・・上端のY座標
'Width  ・・・幅
'Height ・・・高さ
'[Sheet]・・・対象シート(省略ならActiveSheet)

'返り値：作図したシェイプ

    If Sheet Is Nothing Then
        Set Sheet = ActiveSheet
    End If
       
    '基準点が四角形の4頂点のどこにあるかでTop,Left,Width,Heightを調整
    Dim DrawTop    As Double
    Dim DrawLeft   As Double
    Dim DrawWidth  As Double
    Dim DrawHeight As Double
    If Width >= 0 And Height >= 0 Then '基準点が左上
        DrawTop = Top
        DrawLeft = Left
        DrawHeight = Height
        DrawWidth = Width
    ElseIf Width < 0 And Height < 0 Then '基準点が右下
        DrawTop = Top + Height
        DrawLeft = Left + Width
        DrawHeight = -Height
        DrawWidth = -Width
    ElseIf Width < 0 And Height >= 0 Then '基準点が右上
        DrawTop = Top
        DrawLeft = Left + Width
        DrawHeight = Height
        DrawWidth = -Width
    ElseIf Width >= 0 And Height < 0 Then '基準点が左下
        DrawTop = Top + Height
        DrawLeft = Left
        DrawHeight = -Height
        DrawWidth = Width
    End If
    
    ' 指定した座標に四角形を作図
    Set DrawRectangleRound = Sheet.Shapes.AddShape(msoShapeRoundedRectangle, DrawLeft, DrawTop, DrawWidth, DrawHeight)
    
End Function

