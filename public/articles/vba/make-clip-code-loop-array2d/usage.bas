Private Sub Test()

    Dim Array2D As Variant
    ReDim Array2D(1 To 2, 1 To 2)

    Array2D(1, 1) = "A": Array2D(1, 2) = "B"
    Array2D(2, 1) = "C": Array2D(2, 2) = "D"

    ' Array2D の文字だけをコピーしてから、
    ' イミディエイトウィンドウで MCCLoopArray2D を実行します。

End Sub
