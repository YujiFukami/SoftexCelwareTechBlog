Sub Sample_CreateButton()

    Dim Btn As Button
    Set Btn = MakeCommandButtonAtCell(ActiveSheet.Range("B2:C3"), _
                                      "テスト", _
                                      "S_メッセージ表示のみ", _
                                      "メッセージ表示")

End Sub

Public Sub S_メッセージ表示のみ()
    MsgBox "実行を確認", vbInformation
End Sub
