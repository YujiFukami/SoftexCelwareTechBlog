' === Module: Mod01_最小公倍数計算 ===

Public Sub S_立法数の和が42確認()
    '値を文字列型で生成
    Dim StrValue1 As String: StrValue1 = "80538738812075974"
    Dim StrValue2 As String: StrValue2 = "80435758145817515"
    Dim StrValue3 As String: StrValue3 = "12602123297335631"
    
    '一次元配列に変換
    Dim ValueArray1() As Long: ValueArray1 = ConvStrArray1DLong(StrValue1)
    Dim ValueArray2() As Long: ValueArray2 = ConvStrArray1DLong(StrValue2)
    Dim ValueArray3() As Long: ValueArray3 = ConvStrArray1DLong(StrValue3)
    
    ShowValueArray1D ValueArray1, "X"
    ShowValueArray1D ValueArray2, "Y"
    ShowValueArray1D ValueArray3, "Z"
    
    '3乗する
    Dim Expo1() As Long: Expo1 = MultArray1DValue(ValueArray1, ValueArray1)
    Dim Expo2() As Long: Expo2 = MultArray1DValue(ValueArray2, ValueArray2)
    Dim Expo3() As Long: Expo3 = MultArray1DValue(ValueArray3, ValueArray3)
    
    Expo1 = MultArray1DValue(Expo1, ValueArray1)
    Expo2 = MultArray1DValue(Expo2, ValueArray2)
    Expo3 = MultArray1DValue(Expo3, ValueArray3)
        
    ShowValueArray1D Expo1, "X^3"
    ShowValueArray1D Expo2, "Y^3"
    ShowValueArray1D Expo3, "Z^3"
        
    '和を計算
    Dim Output() As Long
    Output = AddArray1DValue(Expo2, Expo3)
    ShowValueArray1D Output, "Y^3+Z^3"
    Output = SubtractionArray1DValue(Output, Expo1)
    
    ShowValueArray1D Output, "-X^3+Y^3+Z^3"
End Sub

Private Sub ShowValueArray1D(ValueArray1D() As Long, Optional Str As String = "")
'ValueArray1Dの中身を表示する

    Dim Output As String
    Dim I As Long
    For I = UBound(ValueArray1D, 1) To 1 Step -1
        Output = Output & ValueArray1D(I)
    Next
    
    If Str <> "" Then
        Debug.Print Str, Output
    Else
        Debug.Print Output
        Call ClipText(Output)
    End If
End Sub

Public Function ConvStrArray1DLong(Str As String) As Long()
'文字列型の数字を1桁ずつ要素となる一次元配列にする

    Dim N        As Long: N = Len(Str)
    Dim Output() As Long: ReDim Output(1 To N)
    Dim I        As Long
    For I = 1 To N
        Output(N - I + 1) = Mid(Str, I, 1)
    Next
    ConvStrArray1DLong = Output
End Function

Public Function MultArray1DValue(ValueArray1() As Long, ValueArray2() As Long) As Long()
'0～9の値が入った一次元配列同士を乗算する

    '要素数取得
    Dim N2 As Long: N2 = UBound(ValueArray2, 1)
    
    '計算
    Dim Output() As Long
    Dim I        As Long
    Dim Dummy()  As Long
    For I = 1 To N2
        If I = 1 Then
            Output = MultValue1_9Array1DValue(ValueArray1, ValueArray2(I))
'            ShowValueArray1D Output
        Else
            Dummy = MultValue1_9Array1DValue(ValueArray1, ValueArray2(I))
            Dummy = MultValue10Array1DValue(Dummy, I - 1) '10のべき乗倍
'            ShowValueArray1D Dummy
            Output = AddArray1DValue(Output, Dummy)
        End If
    Next
    
    '出力
    MultArray1DValue = Output

End Function

Public Function MultValue10Array1DValue(ByRef ValueArray() As Long, _
                                               ByRef Digit As Long) _
                                                           As Long()
'0～9の値が入った一次元配列に10のべき乗をかける
'ValueArray = [1,2,3]、Digit = 3 → Output = [0,0,0,1,2,3]

'引数
'ValueArray()・・・0～9の値が入った一次元配列
'Digit       ・・・桁数
    
    '要素数取得
    Dim N As Long: N = UBound(ValueArray, 1)
    
    '計算
    Dim Output() As Long: ReDim Output(1 To N + Digit)
    Dim I As Long
    For I = 1 To N
        Output(Digit + I) = ValueArray(I)
    Next
    
    '出力
    MultValue10Array1DValue = Output

End Function

Public Function MultValue1_9Array1DValue(ValueArray() As Long, Value1_9 As Long) As Long()
'0～9の値が入った一次元配列に1桁の値を乗算する
    
    '要素数取得
    Dim N As Long: N = UBound(ValueArray, 1)
    
    '計算
    Dim Output() As Long: ReDim Output(1 To N)
    Dim I        As Long
    For I = 1 To N
        If I < N Then
            If Output(I) + ValueArray(I) * Value1_9 > 10 Then '10を超える場合は次の位に足す
                Output(I + 1) = Mid(Output(I) + ValueArray(I) * Value1_9, 1, 1)
                Output(I) = Right(Output(I) + ValueArray(I) * Value1_9, 1)
            Else
                Output(I) = Output(I) + ValueArray(I) * Value1_9
            End If
        Else
            If Output(I) + ValueArray(I) * Value1_9 > 10 Then '10を超える場合は次の位に足す
                ReDim Preserve Output(1 To N + 1)
                Output(I + 1) = Mid(Output(I) + ValueArray(I) * Value1_9, 1, 1)
                Output(I) = Right(Output(I) + ValueArray(I) * Value1_9, 1)
            Else
                Output(I) = Output(I) + ValueArray(I) * Value1_9
            End If
        End If
    Next
    
    '出力
    MultValue1_9Array1DValue = Output

End Function

Public Function AddArray1DValue(ValueArray1() As Long, ValueArray2() As Long) As Long()
'2つの0～9の値が入った一次元配列を加算する。
'一次元配列の要素番号が桁数に該当し、大きな数をあらわす。
'20230420
    
    '要素数を取得する
    Dim N1   As Long: N1 = UBound(ValueArray1, 1)
    Dim N2   As Long: N2 = UBound(ValueArray2, 1)
    Dim MaxN As Long: MaxN = WorksheetFunction.Max(N1, N2)
    
    '2つの一次元配列を同じ要素数にする
    If N1 < N2 Then
        ReDim Preserve ValueArray1(1 To MaxN)
    ElseIf N1 > N2 Then
        ReDim Preserve ValueArray2(1 To MaxN)
    End If
    
    '配列の準備
    Dim Output() As Long: ReDim Output(1 To MaxN) 'まずは最大要素分用意する
    Dim I        As Long
    For I = 1 To MaxN
        If I < MaxN Then
            If Output(I) + ValueArray1(I) + ValueArray2(I) >= 10 Then '10を超える場合は次の位に+1
                Output(I) = Output(I) + ValueArray1(I) + ValueArray2(I) - 10
                Output(I + 1) = 1
            Else
                Output(I) = Output(I) + ValueArray1(I) + ValueArray2(I)
            End If
        Else
            If Output(I) + ValueArray1(I) + ValueArray2(I) >= 10 Then '10を超える場合は次の位に+1
                ReDim Preserve Output(1 To MaxN + 1) '桁数が1つ増える
                Output(I) = Output(I) + ValueArray1(I) + ValueArray2(I) - 10
                Output(I + 1) = 1
            Else
                Output(I) = Output(I) + ValueArray1(I) + ValueArray2(I)
            End If
        End If
    Next
        
    '出力
    AddArray1DValue = Output
    
End Function

Public Function SubtractionArray1DValue(ValueArray1() As Long, ValueArray2() As Long) As Long()
'2つの0～9の値が入った一次元配列を減算する。
'一次元配列の要素番号が桁数に該当し、大きな数をあらわす。
'20230420
    
    '要素数を取得する
    Dim N1   As Long: N1 = UBound(ValueArray1, 1)
    Dim N2   As Long: N2 = UBound(ValueArray2, 1)
    Dim MaxN As Long: MaxN = WorksheetFunction.Max(N1, N2)
    
    '2つの一次元配列を同じ要素数にする
    If N1 < N2 Then
        ReDim Preserve ValueArray1(1 To MaxN)
    ElseIf N1 > N2 Then
        ReDim Preserve ValueArray2(1 To MaxN)
    End If
    
    '大小関係を調べる
    Dim BiggerValueArray()  As Long
    Dim SmallerValueArray() As Long
    Dim I                   As Long
    Dim IsMinus             As Boolean
    For I = MaxN To 1 Step -1
        If ValueArray1(I) < ValueArray2(I) Then
            BiggerValueArray = ValueArray2
            SmallerValueArray = ValueArray1
            IsMinus = True
            Exit For
        ElseIf ValueArray1(I) > ValueArray2(I) Then
            BiggerValueArray = ValueArray1
            SmallerValueArray = ValueArray2
            IsMinus = False
            Exit For
        End If
    Next
    
    If IsEmpty(BiggerValueArray) = True Then
        ReDim SubtractionArray1DValue(1 To 1)
        Exit Function
    End If
    
    '配列の準備
    Dim Output() As Long: ReDim Output(1 To MaxN) 'まずは最大要素分用意する
    For I = 1 To MaxN
        If I < MaxN Then
            If BiggerValueArray(I) - SmallerValueArray(I) < 0 Then '0より小さくなる場合
                Output(I) = 10 + BiggerValueArray(I) - SmallerValueArray(I)
                BiggerValueArray(I + 1) = BiggerValueArray(I + 1) - 1
            Else
                Output(I) = BiggerValueArray(I) - SmallerValueArray(I)
            End If
        Else
            Output(I) = BiggerValueArray(I) - SmallerValueArray(I)
        End If
    Next
        
    '大きい桁から0の値が連続していたら除外する
    For I = MaxN To 1 Step -1
        If Output(I) = 0 Then
            ReDim Preserve Output(1 To I - 1)
        Else
            Exit For
        End If
    Next I
    
    '正負の部分は最大桁が正か負として返す
    If IsMinus = True Then
        Output(UBound(Output, 1)) = Output(UBound(Output, 1)) * -1
    End If
    
    '出力
    SubtractionArray1DValue = Output
    
End Function

' === Module: Mod99_アドインから ===

Public Sub ClipText(ByVal Text As Variant)
'テキストをクリップボードに格納
'テキストが配列ならば列方向をTab区切り、行方向を改行
'https://www.softex-celware.com/post/cliptext

'引数
'Text・・・クリップボードに格納するテキスト
'          文字列、一次元配列、二次元配列に対応
    
    '※※※※※※※※※※※※※※※※※※※※※※※※※※
    '引数処理
    '入力した引数が文字列、一次元配列、二次元配列のどれかを判定
    Dim Dimension  As Long
    Dim Dummy      As Long
    If IsArray(Text) = False Then '配列でない場合
        Dimension = 0
    Else '配列の場合
        On Error Resume Next
        Dummy = UBound(Text, 2)
        On Error GoTo 0
        If Dummy = 0 Then
            Dimension = 1 '一次元配列と判定
        Else
            Dimension = 2 '二次元配列と判定
        End If
    End If
    
    '※※※※※※※※※※※※※※※※※※※※※※※※※※
    '処理
    'クリップボードに格納用のテキスト変数を作成
    Dim Output As String
    Dim I      As Long
    Dim J      As Long
    
    If Dimension = 0 Then
        '文字列の場合
        Output = Text
        
    ElseIf Dimension = 1 Then
        '一次元配列の場合
        Output = ""
        For I = LBound(Text, 1) To UBound(Text, 1)
            If I = LBound(Text, 1) Then
                Output = Text(I)
            Else
                Output = Output & vbCrLf & Text(I)
            End If
        Next I
        
    ElseIf Dimension = 2 Then
        '二次元配列の場合
        Output = ""
        For I = LBound(Text, 1) To UBound(Text, 1)
            For J = LBound(Text, 2) To UBound(Text, 2)
                If J < UBound(Text, 2) Then
                    '列方向Tab区切り
                    Output = Output & Text(I, J) & Chr(9)
                Else
                    Output = Output & Text(I, J)
                End If
            Next J
            
            If I < UBound(Text, 1) Then
                '行方向を改行
                Output = Output & vbCrLf
            End If
        Next I
    End If
    
    'クリップボードに格納
    With CreateObject("Forms.TextBox.1")
        .MultiLine = True
        .Text = Output
        .SelStart = 0
        .SelLength = .TextLength
        .Copy
    End With
    
End Sub

