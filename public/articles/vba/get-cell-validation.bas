' === Module: ModCell ===

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

