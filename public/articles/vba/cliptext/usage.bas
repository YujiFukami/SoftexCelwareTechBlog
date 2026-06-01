Public Sub Sample_ClipText()

    Call ClipText("この文字列をクリップボードにコピーします。")

End Sub

Public Sub Sample_ClipText_MultiLine()

    Dim s As String

    s = "1行目の文字列" & vbCrLf & _
        "2行目の文字列" & vbCrLf & _
        "3行目の文字列"

    Call ClipText(s)

End Sub
