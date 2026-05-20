Private Sub txtHour_KeyDown(ByVal KeyCode As MSForms.ReturnInteger, ByVal Shift As Integer)
    Call ChangeValueTextBox_byKey(KeyCode, Me.txtHour, 0, 23)
End Sub

Private Sub txtMinute_KeyDown(ByVal KeyCode As MSForms.ReturnInteger, ByVal Shift As Integer)
    Call ChangeValueTextBox_byKey(KeyCode, Me.txtMinute, 0, 59)
End Sub

Private Sub txtSecond_KeyDown(ByVal KeyCode As MSForms.ReturnInteger, ByVal Shift As Integer)
    Call ChangeValueTextBox_byKey(KeyCode, Me.txtSecond, 0, 59)
End Sub
