' === Module: ModCell ===

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

