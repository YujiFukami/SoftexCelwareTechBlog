' === Module: ModEventSelectionChange ===

Public Sub ChangeUpValue_MoveSpinButton()
'移動するスピンボタン用の増加処理マクロ
'値切替に利用
'20260528
    
    'ボタンの色変更
    Call ChangePushedButtonColor(rgbLightCoral, rgbLightGrey)
        
    '選択中のセル取得
    Dim SelectCell As Range: Set SelectCell = GetSelectionCell
    If SelectCell Is Nothing Then Exit Sub
    Call ModifyTargetCount(SelectCell) '選択セルの範囲を1セルにする
        
    '選択中セルの入力規則のリストを一次元配列として取得
    Dim List As Variant: List = GetCellValidation(SelectCell)
    If IsEmpty(List) = True Then Exit Sub
    
    '値変更処理(1つ次の値へ)
    Call Change__CellValueByList(SelectCell, List, True)
    
End Sub

Public Sub ChangeDownValue_MoveSpinButton()
'移動するスピンボタン用の減少処理マクロ
'値切替に利用
'20260528

    'ボタンの色変更
    Call ChangePushedButtonColor(rgbLightCoral, rgbLightGrey)
        
    '選択中のセル取得
    Dim SelectCell As Range: Set SelectCell = GetSelectionCell
    If SelectCell Is Nothing Then Exit Sub
    Call ModifyTargetCount(SelectCell) '選択セルの範囲を1セルにする
        
    '選択中セルの入力規則のリストを一次元配列として取得
    Dim List As Variant: List = GetCellValidation(SelectCell)
    If IsEmpty(List) = True Then Exit Sub
    
    '値変更処理(1つ前の値へ)
    Call Change__CellValueByList(SelectCell, List, False)

End Sub

Public Sub EventShowMoveSpinButton_Value(ByRef Target As Range, _
                                       ByRef CellArea As Range)
'指定のセル範囲内なら移動するスピンボタンを表示する
'数字の増減ではなくセルに設定してある入力規則の値の変化
'使用する際は「ChangeUpValue_MoveSpinButton」「ChangeDownValue_MoveSpinButton」を同じブック内に記述すること
'20260528

'引数
'Target  ・・・選択セル
'CellArea・・・処理対象セル範囲

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
        
        ShapeDown.OnAction = "ChangeDownValue_MoveSpinButton"
        ShapeUp.OnAction = "ChangeUpValue_MoveSpinButton"
        
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

Private Sub Change__CellValueByList(Target As Range, List As Variant, Up_True As Boolean)
    Dim NowValue As Variant: NowValue = Target.Value
    Dim N        As Long: N = UBound(List, 1)
    Dim NowRow   As Long: NowRow = GetNumFromArray1D(NowValue, List)
                                                                    
    Dim NextRow As Long
    If Up_True = True Then
        If NowRow = N Then
            NextRow = NowRow
        Else
            NextRow = NowRow + 1
        End If
    ElseIf Up_True = False Then
        If NowRow = 1 Or NowRow = 0 Then
            NextRow = 1
        Else
            NextRow = NowRow - 1
        End If
    End If
    
    Target.Value = List(NextRow)
    
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

' === Module: ModArray ===

Public Function IsArray1D(ByRef Array1D As Variant, _
               Optional ByRef ArrayName As String = "Array1D") _
                                        As Boolean
'入力配列が一次元配列かどうかチェックする
'20210804
'20220309 変数名変更
'20241230 Functionプロシージャにして判定結果を返す
'https://www.softex-celware.com/post/isarray1d

'引数
'Array1D    ・・・チェックする配列
'[ArrayName]・・・エラーメッセージで表示する時の名前

    On Error Resume Next
    Dim Dummy As Long: Dummy = UBound(Array1D, 2)
    On Error GoTo 0
    If Dummy <> 0 Then
        MsgBox ArrayName & "は一次元配列を入力してください", vbExclamation
        Stop 'エラーを確認するために一度停止する
        Exit Function 'Falseが返ってくる
    End If

    '出力
    IsArray1D = True
    
End Function

Public Function ConvArray1D_Start1(Array1D As Variant) As Variant
'開始要素番号が0の一次元配列を開始要素番号1に変換する
'20221027
'https://www.softex-celware.com/post/convarray1d_start1
    
    '引数チェック
    If IsArray1D(Array1D) = False Then Exit Function
    If LBound(Array1D, 1) = 1 Then
'        MsgBox "開始要素番号が1なので変換の必要はありません", vbExclamation
        ConvArray1D_Start1 = Array1D
        Exit Function
    End If
    
    '処理
    Dim N      As Long:    N = UBound(Array1D, 1)
    Dim Output As Variant: ReDim Output(1 To N + 1)
    Dim I      As Long
    For I = 1 To N + 1
        If IsObject(Array1D(I - 1)) = True Then
            Set Output(I) = Array1D(I - 1)
        Else
            Output(I) = Array1D(I - 1)
        End If
    Next
    
    '出力
    ConvArray1D_Start1 = Output
    
End Function

Public Function GetNumFromArray1D(ByRef Value As Variant, _
                                ByRef Array1D As Variant) _
                                              As Long
'ValueがArray1Dの何番目の要素に当たるかを取得す
'20250106
'20250419 Array1DがEmptyの場合に0を返す

'引数
'Value  ・・・探索する値
'Array1D・・・一次元配列
    
    If IsEmpty(Array1D) = True Then Exit Function

    Dim I      As Long
    Dim N      As Long: N = UBound(Array1D, 1)
    Dim Output As Long
    For I = 1 To N
        If Value = Array1D(I) Then
            Output = I
            Exit For
        End If
    Next
    
    GetNumFromArray1D = Output

End Function

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

Public Function GetCellValidation(ByVal Cell As Range) As Variant
'20230306
'指定されたセルに設定されている入力規則であるリストから一次元配列を取得する｡
'chatGPTで作成：https://chat.openai.com/chat/b91e48e5-a0b1-48e6-872d-454f9467a52f

'引数
'Cell・・・リストを取得する対象のセルを指定するRange型の引数｡

    ' 対象のセルのValidationオブジェクトを取得
    Dim validation As validation
    Set validation = Cell.validation
    
    ' リストの値を格納する配列
    Dim ListArray As Variant
    
    Dim Output As Variant
    
    ' ValidationオブジェクトのTypeプロパティを確認して、リスト形式かどうかを判定
    If validation.Type = xlValidateList Then
        ' リスト形式である場合、Formula1プロパティからリストの内容を取得
        Dim Formula As String
        Formula = validation.Formula1
        
        ' リストの内容が範囲参照である場合
        If Left(Formula, 1) = "=" Then
            ' Formula1プロパティの値からリストの範囲を取得
            Dim listRange As Range
            Set listRange = Range(Mid(Formula, 2))
            
            ' 配列をリストの要素数にリサイズ
            ReDim ListArray(1 To listRange.Cells.Count)
            
            ' リストの各セルから値を取得して配列に格納
            Dim I As Long
            For Each Cell In listRange.Cells
                I = I + 1
                ListArray(I) = Cell.Value
            Next
            
            ' 配列を返す
            Output = ListArray
        Else
            ' リストの内容が範囲参照でない場合は、カンマで区切られた文字列として扱う
            ListArray = Split(Formula, ",")
            ListArray = ConvArray1D_Start1(ListArray) '開始要素番号を1にする
            Output = ListArray
        End If
    Else
        ' リスト形式でない場合は、空の配列を返す
        Output = Empty
    End If
    
    '出力
    GetCellValidation = Output
    
End Function

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

' === Module: ModEvent ===

Public Sub ModifyTargetCount(Target As Range)
'イベント処理用にTargetの範囲を1セルに変更する
'毎回記述するのがめんどくさくなった
'20240208

    If Target.CountLarge > 1 Then Set Target = Target(1)
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

