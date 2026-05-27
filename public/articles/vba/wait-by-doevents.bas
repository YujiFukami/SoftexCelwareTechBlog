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

