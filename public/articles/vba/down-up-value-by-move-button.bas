' === Module: ModEventSelectionChange ===

Public Sub DownValue_ByMoveButton()
'移動するスピンボタン用の減少処理マクロ
'20260423

    Call ChangePushedButtonColor(rgbLightCoral, rgbLightGrey) 'ボタンの色変更
    
    Dim SelectCell As Range: Set SelectCell = GetSelectionCell
    If SelectCell Is Nothing Then Exit Sub
    Call ChangeValueCell(SelectCell, 1, False)
End Sub

Public Sub UpValue_ByMoveButton()
'移動するスピンボタン用の増加処理マクロ
'20260423
    
    Call ChangePushedButtonColor(rgbLightCoral, rgbLightGrey) 'ボタンの色変更
    
    Dim SelectCell As Range: Set SelectCell = GetSelectionCell
    If SelectCell Is Nothing Then Exit Sub
    Call ChangeValueCell(SelectCell, 1, True)
End Sub

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

Public Sub ChangeValueCell(ByRef Target As Range, _
                             ByRef Step As Double, _
                          ByRef Up_True As Boolean, _
                Optional ByRef MaxValue As Double = -9999, _
                Optional ByRef MinValue As Double = -9999)
'特定のセルの値を増減させる
'20241104

'引数
'Target    ・・・増減対象のセル
'Step      ・・・増減値
'Up_True   ・・・増加させるならTrue、減少させるならFalse
'[MaxValue]・・・増減の最大値
'[MinValue]・・・増減の最小値

    Dim NowValue As Double: NowValue = Target(1).Value
    
    If Up_True = True Then
        If Step > 0 Then
            If MaxValue <> -9999 Then
                If NowValue + Step <= MaxValue Then
                    Target.Value = NowValue + Step
                End If
            Else
                Target.Value = NowValue + Step
            End If
        Else
            If MinValue <> -9999 Then
                If NowValue + Step >= MinValue Then
                    Target.Value = NowValue + Step
                End If
            Else
                Target.Value = NowValue + Step
            End If
        End If
    Else
        If Step > 0 Then
            If MinValue <> -9999 Then
                If NowValue - Step >= MinValue Then
                    Target.Value = NowValue - Step
                End If
            Else
                Target.Value = NowValue - Step
            End If
        Else
            If MaxValue <> -9999 Then
                If NowValue - Step <= MaxValue Then
                    Target.Value = NowValue - Step
                End If
            Else
                Target.Value = NowValue - Step
            End If
        End If
    End If
    
End Sub

' === Module: ModOther ===

Public Sub WaitByDoEvents(ByRef MillSecond As Long)
'Do-Loop内のDoEventsを利用して処理を待機する
'20251226

'引数
'MillSecond・・・待ち時間(ミリ秒)
    
    Dim StartTime As Double: StartTime = Timer '開始時間取得
    Do
    
        DoEvents
        
        '待ち時間を超えたら抜ける
        If Timer - StartTime > MillSecond / 1000 Then
            Exit Do
        End If
        
    Loop
    
End Sub

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

Public Function GetShapePushed() As Shape
'クリックされたコマンドボタンなどのシェイプを取得する
'20241202

    'クリックされたシェイプの取得
    Dim Sheet     As Worksheet: Set Sheet = ActiveSheet
    Dim ShapeName As String:    ShapeName = Application.Caller
    Dim Shape     As Shape:     Set Shape = GetShapeByName(Sheet, ShapeName)
    Set GetShapePushed = Shape
End Function

Public Sub ChangePushedButtonColor(ByRef FillColor As Long, _
                                   ByRef FontColor As Long)
'クリックされた図形の色を変更する
'20251226

'引数
'FillColor・・・クリックしたときの背景色
'FontColor・・・クリックしたときのフォント色

    'クリックされた図形を取得
    Dim Shape As Shape: Set Shape = GetShapePushed
    If Shape Is Nothing Then Exit Sub
    
    '変更前の色（背景色、フォント色）を取っておく
    Dim LastFillColor As Long: LastFillColor = Shape.Fill.ForeColor.RGB '背景色
    Dim LastFontColor As Long: LastFontColor = Shape.TextFrame2.TextRange.Font.Fill.ForeColor.RGB 'フォント色
    
    '色を変更
    Shape.Fill.ForeColor.RGB = FillColor '背景色
    Shape.TextFrame2.TextRange.Font.Fill.ForeColor.RGB = FontColor 'フォント色
    
    '100ミリ秒程待機
    Call WaitByDoEvents(100)
    
    '変更前の色に戻す
    Shape.Fill.ForeColor.RGB = LastFillColor
    Shape.TextFrame2.TextRange.Font.Fill.ForeColor.RGB = LastFontColor

End Sub

