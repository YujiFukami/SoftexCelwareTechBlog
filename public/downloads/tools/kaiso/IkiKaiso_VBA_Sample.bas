Attribute VB_Name = "IkiKaiso_VBA_Sample"
'==============================================================================
' IkiKaiso (階層化フォーム) ? VBA から呼び出すサンプル + 短縮ラッパー
'
' [導入方法]
'   1. このファイルを VBE の「ファイル → ファイルのインポート...」で取り込む
'      (または PERSONAL.XLSB に取り込めばどのブックからも使える)
'   2. アドイン IkiKaiso がインストール済みであることを確認
'      Application.COMAddIns("IkiKaiso").Connect = True で確実に有効化される
'   3. イミディエイトウィンドウから ?ks("検索語") のように呼ぶ
'
' [前提]
'   - IkiKaiso v3.1.0.42 以上
'   - Microsoft Forms 2.0 Object Library 参照 (クリップボード送信を使う場合のみ)
'==============================================================================
Option Explicit

'--- アドイン窓口を取得 (起動チェック付き)
Public Function KaisoAddin() As Object
    On Error Resume Next
    Dim addin As COMAddIn
    Set addin = Application.COMAddIns("IkiKaiso")
    If addin Is Nothing Then
        MsgBox "IkiKaiso アドインが見つかりません。インストール状況を確認してください。", _
               vbCritical, "IkiKaiso"
        Exit Function
    End If
    If Not addin.Connect Then addin.Connect = True
    Set KaisoAddin = addin.Object
End Function

'==============================================================================
' [ 短縮ラッパー ] イミディエイトウィンドウからの検索用
'   ?ks("Fast")              → proc 名検索 (本文も含む、デフォルト ON)
'   ?ks("Fast", False)       → proc 名のみ検索 (本文除外)
'   ?ksd("Pri")              → 宣言メンバー名検索
'   ?ksa("FreezePanes")      → proc + decl 両方検索 (本文込み)
'==============================================================================

Public Function ks(query As String, Optional includeBody As Boolean = True) As String
    Dim Kaiso As Object: Set Kaiso = KaisoAddin()
    If Kaiso Is Nothing Then Exit Function
    ks = Kaiso.SearchProcedures(query, includeBody)
End Function

Public Function ksd(query As String) As String
    Dim Kaiso As Object: Set Kaiso = KaisoAddin()
    If Kaiso Is Nothing Then Exit Function
    ksd = Kaiso.SearchDeclarations(query)
End Function

Public Function ksa(query As String, Optional includeBody As Boolean = True) As String
    Dim Kaiso As Object: Set Kaiso = KaisoAddin()
    If Kaiso Is Nothing Then Exit Function
    ksa = Kaiso.SearchAll(query, includeBody)
End Function

'==============================================================================
' [ ユースケース 1 ] 外部参照プロシージャの一覧コピー + 関連 Class/Form 取り込み
'
' 「このブックが外部 (アドイン等) のプロシージャ・クラスを参照している分を
'  自ブックに取り込んで参照解除する」一連の作業を 1 マクロで実行する。
'==============================================================================
Public Sub TidyExternalReferences()
    Dim Kaiso As Object: Set Kaiso = KaisoAddin()
    If Kaiso Is Nothing Then Exit Sub

    ' 解析を最新化
    Kaiso.Reanalyze

    ' 1) 外部参照プロシージャ・宣言メンバーをテキスト化してクリップボードへ
    Dim refText As String
    refText = Kaiso.GetExternalReferenceCopyText("VBAProject")   ' ← 自プロジェクト名
    If Len(refText) > 0 Then
        SetClipboard refText
        Debug.Print "外部参照テキストをクリップボードへ送信 (" & Len(refText) & " 文字)"
    Else
        Debug.Print "外部参照プロシージャはありません"
    End If

    ' 2) 関連する Class/Form モジュールを自ブックに取り込み (無確認・完了時 MsgBox)
    Dim result As String
    result = Kaiso.ImportRelatedFormClassModules("VBAProject")
    Debug.Print result
End Sub

'==============================================================================
' [ ユースケース 2 ] イミディエイトからのコード検索
'
' VBE のイミディエイトウィンドウから ?ks("検索語") で即座に検索結果を表示。
' 過去に書いた汎用プロシージャを「こんなコード書いたっけな」で探すときに便利。
'
' 例:
'   ?ks("Fast")              ' "Fast" を含む proc を本文込み検索
'   ?ks("ArrayCopy", False)  ' proc 名だけマッチ (本文除外)
'   ?ksd("Pri")              ' "Pri" を含む宣言メンバー
'   ?ksa("FreezePanes")      ' proc + decl をまとめて検索
'==============================================================================
Public Sub Demo_Search()
    Debug.Print ks("Fast")
End Sub

'==============================================================================
' [ ユースケース 3 ] アドインウィンドウの起動 (リボン代替)
'==============================================================================
Public Sub OpenKaiso()
    Dim Kaiso As Object: Set Kaiso = KaisoAddin()
    If Kaiso Is Nothing Then Exit Sub
    Kaiso.ShowWindowAndLoad
End Sub

Public Sub CloseKaiso()
    Dim Kaiso As Object: Set Kaiso = KaisoAddin()
    If Kaiso Is Nothing Then Exit Sub
    Kaiso.HideWindow
End Sub

' ショートカット Ctrl+Shift+Kaiso で開く設定 (Workbook_Open 等から呼ぶ)
Public Sub RegisterKaisoShortcut()
    Application.OnKey "^+k", "'OpenKaiso'"
End Sub

'==============================================================================
' [ ヘルパー ] クリップボード送信 (Microsoft Forms 2.0 Object Library が必要)
'==============================================================================
Public Sub SetClipboard(text As String)
    Dim dataObj As Object
    Set dataObj = CreateObject("New:{1C3B4210-F441-11CE-B9EA-00AA006B1A69}")  ' MSForms.DataObject CLSID
    dataObj.SetText text
    dataObj.PutInClipboard
End Sub



'==============================================================================
' [ E. 一覧・コード取得 ] v3.1.0.56 以降
'   ?kls()                          → 全プロジェクトのプロシージャ一覧
'   ?kls("VBAProject")              → 指定プロジェクトのプロシージャ一覧
'   ?klm("VBAProject")              → モジュール一覧 (種別・行数・proc/decl 数)
'   ?kcode("VBAProject", "Mod01", "Main処理")        → プロシージャ単体コード
'   ?kcode("VBAProject", "Mod01", "Main処理", True)  → 関連込み (推移閉包、宣言先出し)
'==============================================================================

Public Function kls(Optional projectName As String = "") As String
    Dim Kaiso As Object: Set Kaiso = KaisoAddin()
    If Kaiso Is Nothing Then Exit Function
    kls = Kaiso.ListProcedures(projectName)
End Function

Public Function klm(Optional projectName As String = "") As String
    Dim Kaiso As Object: Set Kaiso = KaisoAddin()
    If Kaiso Is Nothing Then Exit Function
    klm = Kaiso.ListModules(projectName)
End Function

Public Function kcode(projectName As String, moduleName As String, procName As String, _
                      Optional withRelated As Boolean = False) As String
    Dim Kaiso As Object: Set Kaiso = KaisoAddin()
    If Kaiso Is Nothing Then Exit Function
    If withRelated Then
        kcode = Kaiso.GetProcedureCodeWithRelated(projectName, moduleName, procName)
    Else
        kcode = Kaiso.GetProcedureCode(projectName, moduleName, procName)
    End If
End Function

Public Function kmodcode(projectName As String, moduleName As String, _
                         Optional withRelated As Boolean = False) As String
    Dim Kaiso As Object: Set Kaiso = KaisoAddin()
    If Kaiso Is Nothing Then Exit Function
    If withRelated Then
        kmodcode = Kaiso.GetModuleCodeWithRelated(projectName, moduleName)
    Else
        kmodcode = Kaiso.GetModuleCode(projectName, moduleName)
    End If
End Function

'==============================================================================
' [ ユースケース 4 ] プロシージャ + 関連を 1 ファイルに保存
'   過去の汎用プロシージャを依存ごと抜き出して保管・移植する
'==============================================================================
Public Sub SaveProcWithRelated()
    Dim code As String
    code = kcode("VBAProject", "Mod01", "Main処理", True)   ' ← 対象を書き換え
    If Len(code) = 0 Or Left$(code, 1) = "(" Then
        Debug.Print "取得失敗: " & code
        Exit Sub
    End If

    Dim path As String
    path = ThisWorkbook.path & "\export_proc.bas"
    Dim n As Integer: n = FreeFile
    Open path For Output As #n
    Print #n, code
    Close #n
    Debug.Print "保存しました: " & path
End Sub
