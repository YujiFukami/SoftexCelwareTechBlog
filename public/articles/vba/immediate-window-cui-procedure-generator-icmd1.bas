' === Module: ModClipboard ===

Private Pri_Arg1          As Variant

Private Pri_Num           As Long

Private Pri_RunProcName   As String

Public Sub ICMD1(Arg1 As Variant)
'イミディエイトウィンドウで実行させて入力した引数をPri_Numに渡す
'20250114

    Pri_Arg1 = Arg1
    Call Application.Run(Pri_RunProcName, Pri_Num)
End Sub


