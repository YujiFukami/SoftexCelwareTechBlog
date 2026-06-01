' === Module: ModClipboard ===

Public Sub ClipText(ByVal Text As String)
'文字列(Text)をクリップボードに格納
'https://www.softex-celware.com/post/cliptext
'20251007 テキストのみの処理に変更

'引数
'Text・・・クリップボードに格納するテキスト

    'クリップボードに格納
    With CreateObject("Forms.TextBox.1")
        .MultiLine = True
        .Text = Text
        .SelStart = 0
        .SelLength = .TextLength
        .Copy
    End With

End Sub

Public Sub MCCErrorEscape()
'エラー発生時の逃げのコードのテンプレートをクリップボードに格納する
'20250810

    Dim Str As String
    Str = Str & "    On Error GoTo ErrorEscape" & vbLf
    Str = Str & "    " & vbLf
    Str = Str & "    GoTo ErrorEscapeEnd" & vbLf
    Str = Str & "    " & vbLf
    Str = Str & "ErrorEscape:" & vbLf
    Str = Str & "    ''エラーが生じたらエラーメッセージをイミディエイトウィンドウに表示" & vbLf
    Str = Str & "    If Err.Description <> """" Then" & vbLf
    Str = Str & "        Debug.Print Err.Description, Now()" & vbLf
    Str = Str & "    End If" & vbLf
    Str = Str & "ErrorEscapeEnd:"

    'クリップボード格納
    Call ClipText(Str)

    'コードウィンドウ表示
    Debug.Print Str
    Call ShowCodeWindowDelay

End Sub

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
            Window.Visible = True
            Window.SetFocus '前面に
            Exit For
        End If
        On Error GoTo 0
    Next

End Sub
