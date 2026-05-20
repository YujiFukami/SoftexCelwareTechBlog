Dim FilePath As String

FilePath = SelectFile( _
    Environ$("USERPROFILE") & "\Documents", _
    "読み込むExcelブックを選択してください", _
    "xlsx", "xlsm")

If FilePath = "" Then
    Exit Sub
End If

Workbooks.Open FilePath
