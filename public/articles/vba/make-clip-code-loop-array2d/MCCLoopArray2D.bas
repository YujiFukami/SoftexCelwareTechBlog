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

Public Function GetClipText() As String
'クリップボードに格納中の文字列データを取得する
'参考：http://officetanaka.net/excel/vba/tips/tips20.htm
'「Microsoft Forms 2.0 Object Library」ライブラリを参照すること
'20240105
'https://www.softex-celware.com/post/getcliptext

    '処理
    'クリップボードに格納されているのが画像以外の場合のエラー回避
    On Error Resume Next
    Dim Output As String
    Dim Clip   As New DataObject
    With Clip
        .GetFromClipboard
        Output = .GetText
    End With
    On Error GoTo 0

    '出力
    GetClipText = Output

End Function

Public Sub MCCLoopArray2D()
'クリップボード格納の文字列から二次元配列をループする処理を記述する
'「MakeClipCodeLoopArray2D」の短縮型
'20250106
    Call MakeClipCodeLoopArray2D

End Sub

Public Sub MakeClipCodeLoopArray2D()
'クリップボード格納の文字列から二次元配列をループする処理を記述する
'20250106

    'クリップボードから文字列取得
    Dim Text As String: Text = GetClipText
    If Text = "" Then
        Call Beep
        Debug.Print "クリップボード格納に文字列が格納されていません"
        Exit Sub
    End If

    Text = Replace(Text, vbLf, "")
    Text = Replace(Text, vbCr, "")

    'コード作成
    Dim Str As String
    Str = Str & "    Dim I As Long" & vbLf
    Str = Str & "    Dim J As Long" & vbLf
    Str = Str & "    Dim N As Long: N = UBound(" & Text & ", 1)" & vbLf
    Str = Str & "    Dim M As Long: M = UBound(" & Text & ", 2)" & vbLf
    Str = Str & "    For I = 1 To N" & vbLf
    Str = Str & "        For J = 1 To M" & vbLf
    Str = Str & "            " & Text & "(I, J)" & vbLf
    Str = Str & "        Next" & vbLf
    Str = Str & "    Next"

    'クリップボード格納
    Call ClipText(Str)

    'コードウィンドウへ戻す
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

    '階層化フォームで参照道連れ用
    If True = False Then
        Call ShowCodeWindow
    End If

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

    'コードウィンドウを探して表示
    Dim Window As Object
    For Each Window In Application.VBE.Windows
        On Error Resume Next
        If Window.Type = vbext_wt_CodeWindow And Window.WindowState = vbext_ws_Maximize Then
            'コードウィンドウかつ最大表示のものを条件とする
            On Error GoTo 0
'            Debug.Print Window.Caption '開発確認用
            Window.Visible = True
            Window.SetFocus '前面に
            Exit For
        End If
        On Error GoTo 0
    Next
End Sub
