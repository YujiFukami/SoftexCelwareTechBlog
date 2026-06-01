' === Module: ModOther ===

Public Sub ShowCodeWindowDelay()
'少し遅らせてから「ShowCodeWindow」を実行する
'イミディエイトウィンドウから実行する場合はこの処理を行わないとイミディエイトウィンドウに残ったままになる
'20251007

'    Dim Time_    As Date: Time_ = Now() + TimeSerial(0, 0, 1) / 100 '少し遅らせる
'    Dim Time_    As Date: Time_ = Now() '検証したらこれでも上手くいく。理由はわからん。
'    Dim Time_    As Date: Time_ = Now() + TimeSerial(0, 0, 1) '少し遅らせる(なぜか↑で上手くいかなくなった)'20251030
    Dim Time_    As Date: Time_ = Now() 'やっぱり戻す'20251031
    Dim BookName As String: BookName = ThisWorkbook.Name
    Dim ProcName As String: ProcName = "ShowCodeWindow"
    Dim FullProc As String: FullProc = BookName & "!" & ProcName

    Call Application.OnTime(EarliestTime:=Time_, Procedure:=FullProc, Schedule:=True)

End Sub

Public Sub ShowCodeWindow()
'コードウィンドウを表示する
'20251007

    Dim Time As Double: Time = Timer
    Do
        DoEvents
        If (Timer - Time) > 0.05 Then '0.05秒過ぎたら抜ける
            Exit Do
        End If
    Loop

    'イミディエイトを探して表示
    Dim Window As Object
    For Each Window In Application.VBE.Windows
        On Error Resume Next
        If Window.Type = vbext_wt_CodeWindow And Window.WindowState = vbext_ws_Maximize Then
            'コードウィンドウかつ最大表示のものを条件とする
            On Error GoTo 0
'            Debug.Print Window.Caption'開発確認用
            'コードウィンドウかつ、最大表示状態のもの
            Window.Visible = True
            Window.SetFocus '前面に
            Exit For
        End If
        On Error GoTo 0
    Next

End Sub
