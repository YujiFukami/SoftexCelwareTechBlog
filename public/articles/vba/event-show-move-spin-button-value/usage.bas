Private Sub Worksheet_SelectionChange(ByVal Target As Range)

    Call EventShowMoveSpinButton_Value(Target, Me.Range("B2:B20"))

End Sub
