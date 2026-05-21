Sub Test_GetFileListInZip()

    Dim arr As Variant
    Dim i As Long

    arr = GetFileListInZip("C:\Test")

    If IsEmpty(arr) Then
        MsgBox "ファイルは見つかりませんでした。"
        Exit Sub
    End If

    For i = LBound(arr, 1) To UBound(arr, 1)
        Debug.Print arr(i, 1), arr(i, 2)
    Next i

End Sub
