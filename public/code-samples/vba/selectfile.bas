' === Module: ModFile ===

Public Function SelectFile(ByRef FolderPath As String, _
                              ByRef Caption As String, _
                    ParamArray Extensions() As Variant) _
                                            As String
'ファイルを選択するダイアログを表示してファイルを選択させる
'選択したファイルのフルパスを返す
'20210720
'20221210 引数Cancel追加
'20231218 リファクタリング
'20241217 拡張子を""で入力したら全ての拡張子を対象に
'https://www.softex-celware.com/post/selectfile

'引数
'FolderPath・・・選択ダイアログで最初に開くフォルダ
'FileName  ・・・選択するファイルの名前説明
'Extentions・・・選択するファイルの拡張子
'                複数入力可能
'                ""と入力するとすべての拡張子を対象とする

'返り値
'選択されたファイルのフルパス
'ファイルが選択されなかったら空白が返る

    'ダイアログで指定する拡張子の設定
    Dim K            As Long: K = 0
    Dim Extension    As Variant
    Dim StrExtension As String
    For Each Extension In Extensions
        K = K + 1
        If Extension <> "" Then
            If StrExtension = "" Then
                StrExtension = "*." & Extension
            Else
                StrExtension = StrExtension & ";*." & Extension
            End If
        End If
    Next
    
    'ファイル選択ダイアログからファイル選択
    Dim Output     As String
    Dim FileDialog As FileDialog
    Set FileDialog = Application.FileDialog(msoFileDialogFilePicker)
    
    With FileDialog
        .Filters.Clear '初期化
        If StrExtension <> "" Then
            .Filters.Add "", StrExtension, 1 '拡張性設定
        End If
        .Title = Caption 'キャプション設定
        
        '最初に表示するフォルダ設定
        .InitialFileName = FolderPath & Application.PathSeparator
        
        'ファイル選択
        If .Show = True Then
            '選択したファイルを取得
            Output = .SelectedItems(1)
        Else
            'ファイルが選択されなかった場合
            Output = "" '空白を返す
        End If
    End With
    
    '出力
    SelectFile = Output
    
End Function
