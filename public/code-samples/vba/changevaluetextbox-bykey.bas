' === Module: ModUserForm ===

Public Sub ChangeValueTextBox_byKey(ByVal KeyCode As MSForms.ReturnInteger, _
                                     ByVal Target As MSForms.TextBox, _
                                   ByVal MinValue As Long, _
                                   ByVal MaxValue As Long, _
                          Optional ByVal zeroPad2 As Boolean = True)
'上下キーをユーザーフォームのテキストボックス(TextBox)の値を増減させる共通処理
'20260105
'https://www.softex-celware.com/post/changevaluetextbox-bykey

'例
'Private Sub txt_時_KeyDown(ByVal KeyCode As MSForms.ReturnInteger, ByVal Shift As Integer)
'    '時：0～23
'    Call ChangeValueTextBox_byKey(KeyCode, Me.txt_時, 0, 23)
'End Sub
    
'引数
'KeyCode   ・・・イベントで受け取ったKeyCode
'Target    ・・・対象のテキストボックス(TextBox)
'MinValue  ・・・増減の最小値
'MaxValue  ・・・増減の最大値
'[zeroPad2]・・・ Trueなら2桁ゼロ埋め（時刻向け）


    Dim delta As Long

    '増減方向を決定（ここが「4つ目＝増減方向」に相当する設計の入口）
    Select Case KeyCode
        Case vbKeyUp:   delta = 1
        Case vbKeyDown: delta = -1
        Case Else
            Exit Sub
    End Select

    '上下キーのときはカーソル移動などの既定動作をさせない
    KeyCode = 0

    '実処理は「増減方向(delta)」を引数にした別プロシージャへパーツ化
    Call S__StepTextBoxValue(Target, MinValue, MaxValue, delta, zeroPad2)
    
End Sub

Private Sub S__StepTextBoxValue(ByVal Target As MSForms.TextBox, _
                              ByVal MinValue As Long, _
                              ByVal MaxValue As Long, _
                                 ByVal delta As Long, _
                     Optional ByVal zeroPad2 As Boolean = True)
'--- 値の増減処理（完全パーツ）
'20260105

'引数
'Target    ・・・対象のテキストボックス(TextBox)
'MinValue  ・・・増減の最小値
'MaxValue  ・・・増減の最大値
'delta     ・・・増減量
'[zeroPad2]・・・ Trueなら2桁ゼロ埋め（時刻向け）

                 
    Dim Str   As String: Str = Trim$(Target.Text)

    '未入力や数値以外は「MinValue」扱いで開始（好みで調整可）
    Dim Value As Long
    If Len(Str) = 0 Or (Not IsNumeric(Str)) Then
        Value = MinValue
    Else
        Value = CLng(Str)
    End If

    '範囲外入力が来ていた場合も丸める（好みで調整可）
    If Value < MinValue Then Value = MinValue
    If Value > MaxValue Then Value = MaxValue

    '増減
    Value = Value + delta

    '循環（上限超え→下限、下限未満→上限）
    If Value > MaxValue Then Value = MinValue
    If Value < MinValue Then Value = MaxValue

    '表示
    If zeroPad2 Then
        Target.Text = Format$(Value, "00")
    Else
        Target.Text = CStr(Value)
    End If

    'カーソル位置を末尾に（入力感を安定させる）
    Target.SelStart = Len(Target.Text)
    
End Sub
