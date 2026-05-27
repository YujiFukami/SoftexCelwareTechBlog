' === Module: ModEventSelectionChange ===

Public Sub UpValue_ByMoveButton()
'移動するスピンボタン用の増加処理マクロ
'20260423
    
    Call ChangePushedButtonColor(rgbLightCoral, rgbLightGrey) 'ボタンの色変更
    
    Dim SelectCell As Range: Set SelectCell = GetSelectionCell
    If SelectCell Is Nothing Then Exit Sub
    Call ChangeValueCell(SelectCell, 1, True)
End Sub

Public Sub DownValue_ByMoveButton()
'移動するスピンボタン用の減少処理マクロ
'20260423

    Call ChangePushedButtonColor(rgbLightCoral, rgbLightGrey) 'ボタンの色変更
    
    Dim SelectCell As Range: Set SelectCell = GetSelectionCell
    If SelectCell Is Nothing Then Exit Sub
    Call ChangeValueCell(SelectCell, 1, False)
End Sub

Public Sub EventShowMoveSpinButton(ByRef Target As Range, _
                                 ByRef CellArea As Range)
'指定のセル範囲内なら移動するスピンボタンを表示する
'使用する際は「UpValue_ByMoveButton」「DownValue_ByMoveButton」を同じブック内に記述すること
'20260423

'引数
'Target  ・・・
'CellArea・・・

    'ボタンの位置計算
    Dim Left   As Double: Left = Target.Left
    Dim Top    As Double: Top = Target.Top + Target.Height
    Dim Width  As Double: Width = 30
    Dim Height As Double: Height = Width
    
    '作成済みのボタン取得
    Dim Sheet     As Worksheet: Set Sheet = Target.Worksheet
    Dim ShapeDown As Shape: Set ShapeDown = GetShapeByName(Sheet, "減少ボタン") '指定名のシェイプ取得
    Dim ShapeUp   As Shape: Set ShapeUp = GetShapeByName(Sheet, "増加ボタン") '指定名のシェイプ取得
    
    '増減のセル範囲外ならシェイプ消去
    If Intersect(Target, CellArea) Is Nothing Then
        If Not ShapeDown Is Nothing Then ShapeDown.Delete
        If Not ShapeUp Is Nothing Then ShapeUp.Delete
        Exit Sub
    End If
    
    If ShapeDown Is Nothing Or ShapeUp Is Nothing Then
        If Not ShapeDown Is Nothing Then ShapeDown.Delete
        If Not ShapeUp Is Nothing Then ShapeUp.Delete
        
        'まだボタンを作っていないなら新しく作る
        Set ShapeDown = DrawRectangleRound(Left, Top, Width, Height) '角が丸い図形描写
        Set ShapeUp = DrawRectangleRound(Left + Width, Top, Width, Height) '角が丸い図形描写
    
        ShapeDown.TextFrame2.TextRange.Text = ChrW(9664) '左三角形
        ShapeUp.TextFrame2.TextRange.Text = ChrW(9654) '右三角形
        
        Call Set__FontColor(ShapeDown)
        Call Set__FontColor(ShapeUp)
        
        ShapeDown.OnAction = "DownValue_ByMoveButton"
        ShapeUp.OnAction = "UpValue_ByMoveButton"
        
        ShapeDown.Name = "減少ボタン"
        ShapeUp.Name = "増加ボタン"
        
    Else
        'すでにボタンを作っているなら移動
        ShapeDown.Visible = msoTrue
        ShapeUp.Visible = msoTrue
        
        Call Move__UpDownButton(ShapeDown, ShapeUp, Left, Width, Top)
        
'        ShapeDown.Left = Left
'        ShapeDown.Top = Top
'
'        ShapeUp.Left = Left + Width
'        ShapeUp.Top = Top
    End If
    
End Sub

Private Sub Move__UpDownButton(ByRef ShapeDown As Shape, _
                                 ByRef ShapeUp As Shape, _
                                    ByRef Left As Double, _
                                   ByRef Width As Double, _
                                     ByRef Top As Double)
'増減ボタンのアニメーション移動
                                                    
    Dim Lng_コマ数     As Long: Lng_コマ数 = 4
    Dim StartLeft_Down As Double: StartLeft_Down = ShapeDown.Left
    Dim StartTop_Down  As Double: StartTop_Down = ShapeDown.Top
    Dim StartLeft_Up   As Double: StartLeft_Up = ShapeUp.Left
    Dim StartTop_Up    As Double: StartTop_Up = ShapeUp.Top

    On Error GoTo ErrorEscape
    Dim I As Long
    For I = 1 To Lng_コマ数
        ShapeDown.Left = StartLeft_Down + (Left - StartLeft_Down) * I / Lng_コマ数
        ShapeDown.Top = StartTop_Down + (Top - StartTop_Down) * I / Lng_コマ数
    
        ShapeUp.Left = StartLeft_Up + (Left + Width - StartLeft_Up) * I / Lng_コマ数
        ShapeUp.Top = StartTop_Up + (Top - StartTop_Up) * I / Lng_コマ数
        
'        ShapeDown.Rotation = 360 * (I - 1) / (Lng_コマ数 - 1)
'        ShapeUp.Rotation = 360 * (I - 1) / (Lng_コマ数 - 1)
        
        DoEvents
    Next
    
    GoTo ErrorEscapeEnd
    
ErrorEscape:
    ''エラーが生じたらエラーメッセージをイミディエイトウィンドウに表示
    If Err.Description <> "" Then
        Debug.Print Err.Description, Now()
    End If
ErrorEscapeEnd:

End Sub

Private Sub Set__FontColor(Shape As Shape)
'文字と色設定

    '文字入力
    With Shape.TextFrame2
        .HorizontalAnchor = msoAnchorCenter
        .VerticalAnchor = msoAnchorMiddle
        .TextRange.Font.size = Shape.Width * 0.5
    End With
    
    '色設定
    With Shape
        .Fill.ForeColor.RGB = rgbLightGray
        .line.ForeColor.RGB = rgbBlack
        .TextFrame2.TextRange.Font.Fill.ForeColor.RGB = rgbBlack
    End With

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

