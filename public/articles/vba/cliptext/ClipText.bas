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
