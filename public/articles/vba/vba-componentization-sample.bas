Option Explicit

' 汎用部品の例:
' 1つの目的に絞り、入力、戻り値、副作用を分けて考える。

Public Function IsBlankText(ByVal Value As Variant) As Boolean
    IsBlankText = (Len(Trim$(CStr(Value))) = 0)
End Function

Public Function HasRequiredText(ByVal Label As String, ByVal Value As Variant) As Boolean
    If IsBlankText(Value) Then
        MsgBox Label & "が入力されていません。", vbExclamation
        HasRequiredText = False
        Exit Function
    End If

    HasRequiredText = True
End Function

Public Function AddItemToArray(ByRef SourceArray As Variant, ByVal NewValue As Variant) As Variant
    Dim Result() As Variant
    Dim I As Long
    Dim LowerIndex As Long
    Dim UpperIndex As Long

    If IsEmpty(SourceArray) Then
        ReDim Result(0 To 0)
        Result(0) = NewValue
        AddItemToArray = Result
        Exit Function
    End If

    LowerIndex = LBound(SourceArray)
    UpperIndex = UBound(SourceArray)

    ReDim Result(LowerIndex To UpperIndex + 1)
    For I = LowerIndex To UpperIndex
        Result(I) = SourceArray(I)
    Next I

    Result(UpperIndex + 1) = NewValue
    AddItemToArray = Result
End Function

Public Sub Sample_ComponentizedProcedure()
    Dim UserName As String
    UserName = Range("A1").Value

    If HasRequiredText("ユーザー名", UserName) = False Then
        Exit Sub
    End If

    Dim Items As Variant
    Items = Array("受付", "確認")
    Items = AddItemToArray(Items, "完了")

    Range("B1").Resize(UBound(Items) + 1, 1).Value = WorksheetFunction.Transpose(Items)
End Sub
