' === Module: ModClipboard ===

Public Function GetClipText() As String
'クリップボードに格納中の文字列データを取得する
'参考：http://officetanaka.net/excel/vba/tips/tips20.htm
'「Microsoft Forms 2.0 Object Library」ライブラリを参照すること
'20240105
'https://www.softex-celware.com/post/getcliptext
    
    '処理
    'クリップボードに格納されているのが画像以外の場合のエラー回避
    On Error Resume Next
    Dim Output As String
    Dim Clip   As New DataObject
    With Clip
        .GetFromClipboard
        Output = .GetText
    End With
    On Error GoTo 0
    
    '出力
    GetClipText = Output

End Function

