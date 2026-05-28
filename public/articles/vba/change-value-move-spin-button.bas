' === Module: ModEventSelectionChange ===

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

