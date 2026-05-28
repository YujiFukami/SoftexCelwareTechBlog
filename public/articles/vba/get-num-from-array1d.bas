' === Module: ModArray ===

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

