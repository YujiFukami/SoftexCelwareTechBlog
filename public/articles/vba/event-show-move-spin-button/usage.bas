Private Sub Worksheet_SelectionChange(ByVal Target As Range)
    Dim CellArea As Range: Set CellArea = Sheet1.Range("入力範囲") 'B2:E15
    Call EventShowMoveSpinButton(Target, CellArea)
End Sub
