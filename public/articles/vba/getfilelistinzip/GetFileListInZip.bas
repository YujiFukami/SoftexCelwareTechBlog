Public Function GetFileListInZip(ByVal FolderPath As String) As Variant
'ZIPファイル内のファイル一覧を1始まりの二次元配列で取得
'20260521

'引数
'zipFilePath・・・ZIPファイルのフルパス
'
'返り値:
'Variant配列
'arr(1 To 件数, 1 To 2)
'
'1列目 : ZIP内でのファイルパス
'2列目 : ファイル名
'
'備考:
'・ZIPはフォルダへ解凍しません。
'・ZIPの中にZIPがある場合、その中身も再帰的に取得します。
'・内側ZIPはメモリ上に読み込んで一覧取得します。

    Dim fso As Object
    Dim wsh As Object

    Dim tempFolderPath As String
    Dim ps1Path As String
    Dim outPath As String
    Dim errPath As String

    Dim psCode As String
    Dim cmd As String
    Dim exitCode As Long

    Dim txt As String
    Dim errTxt As String
    Dim lines As Variant
    Dim parts As Variant

    Dim arr() As String
    Dim rowCount As Long
    Dim I As Long
    Dim lineText As String
    Dim delimiterText As String

    On Error GoTo ErrHandler

    Set fso = CreateObject("Scripting.FileSystemObject")
    Set wsh = CreateObject("WScript.Shell")

    delimiterText = ChrW$(31)

    '--- 入力チェック
    If Len(Trim$(FolderPath)) = 0 Then
        Err.Raise vbObjectError + 1000, , "対象フォルダパスが空です。"
    End If

    If Not fso.FolderExists(FolderPath) Then
        Err.Raise vbObjectError + 1001, , _
            "指定されたフォルダが存在しません。" & vbCrLf & FolderPath
    End If

    FolderPath = fso.GetAbsolutePathName(FolderPath)

    '--- 作業用フォルダ作成
    tempFolderPath = fso.BuildPath( _
        Environ$("TEMP"), _
        "FolderZipListWork_" & Format$(Now, "yyyymmdd_hhnnss") & "_" & CStr(CLng(Timer * 1000)) _
    )

    fso.CreateFolder tempFolderPath

    ps1Path = fso.BuildPath(tempFolderPath, "GetFolderZipList.ps1")
    outPath = fso.BuildPath(tempFolderPath, "result.txt")
    errPath = fso.BuildPath(tempFolderPath, "error.txt")

    '--- PowerShellコード作成
    psCode = ""
    psCode = psCode & "param([string]$RootPath, [string]$OutPath, [string]$ErrPath)" & vbCrLf
    psCode = psCode & "$ErrorActionPreference = 'Stop'" & vbCrLf
    psCode = psCode & "$MaxDepth = 10" & vbCrLf
    psCode = psCode & "$Delimiter = [char]31" & vbCrLf
    psCode = psCode & "" & vbCrLf

    psCode = psCode & "function Add-ResultRow {" & vbCrLf
    psCode = psCode & "  param(" & vbCrLf
    psCode = psCode & "    [System.Collections.ArrayList]$Rows," & vbCrLf
    psCode = psCode & "    [string]$FolderPath," & vbCrLf
    psCode = psCode & "    [string]$FileName" & vbCrLf
    psCode = psCode & "  )" & vbCrLf
    psCode = psCode & "  [void]$Rows.Add($FolderPath + $Delimiter + $FileName)" & vbCrLf
    psCode = psCode & "}" & vbCrLf
    psCode = psCode & "" & vbCrLf

    psCode = psCode & "function Get-VirtualParentPath {" & vbCrLf
    psCode = psCode & "  param([string]$FullPath, [string]$FileName)" & vbCrLf
    psCode = psCode & "  if ([string]::IsNullOrEmpty($FileName)) { return $FullPath }" & vbCrLf
    psCode = psCode & "  $suffix = '\' + $FileName" & vbCrLf
    psCode = psCode & "  if ($FullPath.EndsWith($suffix, [System.StringComparison]::OrdinalIgnoreCase)) {" & vbCrLf
    psCode = psCode & "    return $FullPath.Substring(0, $FullPath.Length - $suffix.Length)" & vbCrLf
    psCode = psCode & "  }" & vbCrLf
    psCode = psCode & "  $idx = $FullPath.LastIndexOf('\')" & vbCrLf
    psCode = psCode & "  if ($idx -ge 0) { return $FullPath.Substring(0, $idx) }" & vbCrLf
    psCode = psCode & "  return ''" & vbCrLf
    psCode = psCode & "}" & vbCrLf
    psCode = psCode & "" & vbCrLf

    '--- ZIP内のエントリを再帰取得
    psCode = psCode & "function Add-ZipEntries {" & vbCrLf
    psCode = psCode & "  param(" & vbCrLf
    psCode = psCode & "    [System.IO.Compression.ZipArchive]$Zip," & vbCrLf
    psCode = psCode & "    [string]$Prefix," & vbCrLf
    psCode = psCode & "    [System.Collections.ArrayList]$Rows," & vbCrLf
    psCode = psCode & "    [System.Text.Encoding]$Enc," & vbCrLf
    psCode = psCode & "    [int]$Depth" & vbCrLf
    psCode = psCode & "  )" & vbCrLf
    psCode = psCode & "" & vbCrLf
    psCode = psCode & "  foreach ($e in $Zip.Entries) {" & vbCrLf
    psCode = psCode & "    if ([string]::IsNullOrEmpty($e.Name)) { continue }" & vbCrLf
    psCode = psCode & "" & vbCrLf
    psCode = psCode & "    $entryPath = $e.FullName.Replace('/', '\')" & vbCrLf
    psCode = psCode & "    $displayPath = $Prefix + '\' + $entryPath" & vbCrLf
    psCode = psCode & "    $folderPath = Get-VirtualParentPath -FullPath $displayPath -FileName $e.Name" & vbCrLf
    psCode = psCode & "" & vbCrLf
    psCode = psCode & "    Add-ResultRow -Rows $Rows -FolderPath $folderPath -FileName $e.Name" & vbCrLf
    psCode = psCode & "" & vbCrLf

    '--- ZIP内ZIPを再帰的に読む
    psCode = psCode & "    if ($Depth -lt $MaxDepth -and $e.Name.ToLower().EndsWith('.zip')) {" & vbCrLf
    psCode = psCode & "      $entryStream = $null" & vbCrLf
    psCode = psCode & "      $ms = $null" & vbCrLf
    psCode = psCode & "      $innerZip = $null" & vbCrLf
    psCode = psCode & "" & vbCrLf
    psCode = psCode & "      try {" & vbCrLf
    psCode = psCode & "        $entryStream = $e.Open()" & vbCrLf
    psCode = psCode & "        $ms = New-Object System.IO.MemoryStream" & vbCrLf
    psCode = psCode & "        $entryStream.CopyTo($ms)" & vbCrLf
    psCode = psCode & "        $ms.Position = 0" & vbCrLf
    psCode = psCode & "" & vbCrLf
    psCode = psCode & "        $mode = [System.IO.Compression.ZipArchiveMode]::Read" & vbCrLf
    psCode = psCode & "        $innerZip = New-Object System.IO.Compression.ZipArchive -ArgumentList $ms, $mode, $false, $Enc" & vbCrLf
    psCode = psCode & "" & vbCrLf
    psCode = psCode & "        Add-ZipEntries -Zip $innerZip -Prefix $displayPath -Rows $Rows -Enc $Enc -Depth ($Depth + 1)" & vbCrLf
    psCode = psCode & "      } catch {" & vbCrLf
    psCode = psCode & "        # ZIP内ZIPとして開けない場合は、そのZIPファイル自体だけを一覧に残して続行" & vbCrLf
    psCode = psCode & "      } finally {" & vbCrLf
    psCode = psCode & "        if ($innerZip -ne $null) { $innerZip.Dispose() }" & vbCrLf
    psCode = psCode & "        if ($ms -ne $null) { $ms.Dispose() }" & vbCrLf
    psCode = psCode & "        if ($entryStream -ne $null) { $entryStream.Dispose() }" & vbCrLf
    psCode = psCode & "      }" & vbCrLf
    psCode = psCode & "    }" & vbCrLf
    psCode = psCode & "  }" & vbCrLf
    psCode = psCode & "}" & vbCrLf
    psCode = psCode & "" & vbCrLf

    '--- 通常のZIPファイルを開いて中身を読む
    psCode = psCode & "function Add-ZipFileEntries {" & vbCrLf
    psCode = psCode & "  param(" & vbCrLf
    psCode = psCode & "    [string]$ZipPath," & vbCrLf
    psCode = psCode & "    [System.Collections.ArrayList]$Rows," & vbCrLf
    psCode = psCode & "    [System.Text.Encoding]$Enc" & vbCrLf
    psCode = psCode & "  )" & vbCrLf
    psCode = psCode & "" & vbCrLf
    psCode = psCode & "  $fs = $null" & vbCrLf
    psCode = psCode & "  $zip = $null" & vbCrLf
    psCode = psCode & "" & vbCrLf
    psCode = psCode & "  try {" & vbCrLf
    psCode = psCode & "    $mode = [System.IO.Compression.ZipArchiveMode]::Read" & vbCrLf
    psCode = psCode & "    $fs = [System.IO.File]::Open($ZipPath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)" & vbCrLf
    psCode = psCode & "    $zip = New-Object System.IO.Compression.ZipArchive -ArgumentList $fs, $mode, $false, $Enc" & vbCrLf
    psCode = psCode & "    Add-ZipEntries -Zip $zip -Prefix $ZipPath -Rows $Rows -Enc $Enc -Depth 0" & vbCrLf
    psCode = psCode & "  } catch {" & vbCrLf
    psCode = psCode & "    # ZIPとして開けない場合は、ZIPファイル自体だけを一覧に残して続行" & vbCrLf
    psCode = psCode & "  } finally {" & vbCrLf
    psCode = psCode & "    if ($zip -ne $null) { $zip.Dispose() }" & vbCrLf
    psCode = psCode & "    if ($fs -ne $null) { $fs.Dispose() }" & vbCrLf
    psCode = psCode & "  }" & vbCrLf
    psCode = psCode & "}" & vbCrLf
    psCode = psCode & "" & vbCrLf

    '--- メイン処理
    psCode = psCode & "try {" & vbCrLf
    psCode = psCode & "  Add-Type -AssemblyName System.IO.Compression" & vbCrLf
    psCode = psCode & "  Add-Type -AssemblyName System.IO.Compression.FileSystem" & vbCrLf
    psCode = psCode & "" & vbCrLf
    psCode = psCode & "  $enc = [System.Text.Encoding]::GetEncoding(932)" & vbCrLf
    psCode = psCode & "  $rows = New-Object System.Collections.ArrayList" & vbCrLf
    psCode = psCode & "" & vbCrLf
    psCode = psCode & "  $files = Get-ChildItem -LiteralPath $RootPath -File -Recurse -Force -ErrorAction SilentlyContinue" & vbCrLf
    psCode = psCode & "" & vbCrLf
    psCode = psCode & "  foreach ($file in $files) {" & vbCrLf
    psCode = psCode & "    Add-ResultRow -Rows $rows -FolderPath $file.DirectoryName -FileName $file.Name" & vbCrLf
    psCode = psCode & "" & vbCrLf
    psCode = psCode & "    if ($file.Extension.ToLower() -eq '.zip') {" & vbCrLf
    psCode = psCode & "      Add-ZipFileEntries -ZipPath $file.FullName -Rows $rows -Enc $enc" & vbCrLf
    psCode = psCode & "    }" & vbCrLf
    psCode = psCode & "  }" & vbCrLf
    psCode = psCode & "" & vbCrLf
    psCode = psCode & "  $utf8 = New-Object System.Text.UTF8Encoding($false)" & vbCrLf
    psCode = psCode & "  [string[]]$arr = $rows.ToArray([string])" & vbCrLf
    psCode = psCode & "  [System.IO.File]::WriteAllLines($OutPath, $arr, $utf8)" & vbCrLf
    psCode = psCode & "  exit 0" & vbCrLf
    psCode = psCode & "} catch {" & vbCrLf
    psCode = psCode & "  $utf8 = New-Object System.Text.UTF8Encoding($false)" & vbCrLf
    psCode = psCode & "  [System.IO.File]::WriteAllText($ErrPath, $_.Exception.ToString(), $utf8)" & vbCrLf
    psCode = psCode & "  exit 1" & vbCrLf
    psCode = psCode & "}" & vbCrLf

    '--- ps1をUnicodeで保存
    Call P__WriteTextFileUnicode(ps1Path, psCode)

    '--- PowerShell実行
    cmd = "powershell.exe -NoProfile -ExecutionPolicy Bypass -File " & _
          F__QuoteCommandArg(ps1Path) & " " & _
          F__QuoteCommandArg(FolderPath) & " " & _
          F__QuoteCommandArg(outPath) & " " & _
          F__QuoteCommandArg(errPath)

    exitCode = wsh.Run(cmd, 0, True)

    If exitCode <> 0 Then
        If fso.FileExists(errPath) Then
            errTxt = F__ReadTextFileUtf8(errPath)
        End If

        Err.Raise vbObjectError + 1002, , _
            "フォルダ内ファイル一覧の取得に失敗しました。" & vbCrLf & _
            "対象フォルダ：" & FolderPath & vbCrLf & vbCrLf & _
            errTxt
    End If

    If Not fso.FileExists(outPath) Then
        GetFileListInZip = Empty
        GoTo Finally
    End If

    txt = F__ReadTextFileUtf8(outPath)

    txt = Replace(txt, vbCrLf, vbLf)
    txt = Replace(txt, vbCr, vbLf)

    If Len(txt) = 0 Then
        GetFileListInZip = Empty
        GoTo Finally
    End If

    lines = Split(txt, vbLf)

    '--- 有効行数カウント
    rowCount = 0

    For I = LBound(lines) To UBound(lines)
        lineText = CStr(lines(I))

        If Len(lineText) > 0 Then
            If InStr(1, lineText, delimiterText, vbBinaryCompare) > 0 Then
                rowCount = rowCount + 1
            End If
        End If
    Next I

    If rowCount = 0 Then
        GetFileListInZip = Empty
        GoTo Finally
    End If

    '--- 1始まりの二次元配列へ格納
    ReDim arr(1 To rowCount, 1 To 2)

    rowCount = 0

    For I = LBound(lines) To UBound(lines)

        lineText = CStr(lines(I))

        If Len(lineText) > 0 Then

            If InStr(1, lineText, delimiterText, vbBinaryCompare) > 0 Then

                parts = Split(lineText, delimiterText, 2)

                If UBound(parts) >= 1 Then
                    rowCount = rowCount + 1

                    arr(rowCount, 1) = CStr(parts(0))
                    arr(rowCount, 2) = CStr(parts(1))
                End If

            End If

        End If

    Next I
    
    'ファイルパスで元フォルダの部分を消去
    Dim FilePath As String
    Dim N As Long: N = UBound(arr, 1)
    For I = 1 To N
        FilePath = arr(I, 1)
        FilePath = Replace(FilePath, FolderPath & Application.PathSeparator, "")
        FilePath = Replace(FilePath, FolderPath, "")
        arr(I, 1) = FilePath
    Next

    GetFileListInZip = arr

Finally:
    On Error Resume Next
    If Not fso Is Nothing Then
        If Len(tempFolderPath) > 0 Then
            If fso.FolderExists(tempFolderPath) Then
                fso.DeleteFolder tempFolderPath, True
            End If
        End If
    End If
    On Error GoTo 0

    Exit Function

ErrHandler:
    Dim errNo As Long
    Dim errMsg As String

    errNo = Err.Number
    errMsg = Err.Description

    On Error Resume Next
    If Not fso Is Nothing Then
        If Len(tempFolderPath) > 0 Then
            If fso.FolderExists(tempFolderPath) Then
                fso.DeleteFolder tempFolderPath, True
            End If
        End If
    End If
    On Error GoTo 0

    Err.Raise errNo, "F__GetFolderZipFileList2D", errMsg

End Function

'==================================================
' コマンドライン引数用のダブルクォート囲み
'==================================================
Private Function F__QuoteCommandArg(ByVal text As String) As String
    F__QuoteCommandArg = """" & Replace(text, """", """""") & """"
End Function

'==================================================
' テキストファイルをUnicodeで書き込み
' PowerShell 5系でも安全に読めるようにする
'==================================================
Private Sub P__WriteTextFileUnicode(ByVal FilePath As String, ByVal text As String)

    Dim fso As Object
    Dim ts As Object

    Set fso = CreateObject("Scripting.FileSystemObject")
    Set ts = fso.CreateTextFile(FilePath, True, True)

    ts.Write text
    ts.Close

End Sub

'==================================================
' UTF-8テキストファイルを読み込み
'==================================================
Private Function F__ReadTextFileUtf8(ByVal FilePath As String) As String

    Dim stm As Object

    Set stm = CreateObject("ADODB.Stream")

    With stm
        .Type = 2
        .Charset = "UTF-8"
        .Open
        .LoadFromFile FilePath
        F__ReadTextFileUtf8 = .ReadText(-1)
        .Close
    End With

End Function
