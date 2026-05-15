' === Module: ModClipboard ===

Private Pri_Arg1          As Variant

Private Pri_Num           As Long

Private Pri_Scope         As String

Private Pri_SubFunction   As String

Private Pri_ProcedureName As String

Private Pri_ReturnType    As String

Private Pri_Dict_ArgName  As Dictionary

Private Pri_Dict_ArgType  As Dictionary

Private Pri_RunProcName   As String
Public Sub ICMD1(Arg1 As Variant)
'イミディエイトウィンドウで実行させて入力した引数をPri_Numに渡す
'20250114

    Pri_Arg1 = Arg1
    Call Application.Run(Pri_RunProcName, Pri_Num)
End Sub

Public Sub MCCP(Optional Num As Long = 0)
'20250114
'イミディエイトウィンドウをCUIのように利用してプロシージャのテンプレートを半自動生成する

    Dim Code          As String
    Static Lng_ArgNum As Long
    Dim Str_ArgCode   As String
    Dim Dict_ArgType  As Dictionary
    Pri_RunProcName = "ReceiveArg_MCCP"
    
    If Num = 0 Then
        '全部初期化
        Pri_Scope = ""
        Pri_SubFunction = ""
        Pri_ProcedureName = ""
        Pri_ReturnType = ""
        Lng_ArgNum = 1
        Set Pri_Dict_ArgName = New Dictionary
        Set Pri_Dict_ArgType = New Dictionary
    
        'スコープがPublicかPrivateか入力
        Debug.Print ""
        Debug.Print "PublicならPまたは[空白],PrivateならR"
        Debug.Print "ICMD1 " & """" & """"
        Call Set__InputArg
        
        Pri_Num = 1
    
    ElseIf Num = 1 Then
        'SubかFunctionプロシージャか入力
        Debug.Print ""
        Debug.Print "SubならSまたは[空白],FunctionならF"
        Debug.Print "ICMD1 " & """" & """"
        Call Set__InputArg
        
        Pri_Num = 2
    
    ElseIf Num = 2 Then
        'プロシージャ名入力
        Debug.Print ""
        Debug.Print "プロシージャ名入力"
        Debug.Print "ICMD1 " & """" & """"
        Call Set__InputArg
        
        Pri_Num = 3
    
    ElseIf Num = 3 Then
        'プロシージャの返り値入力(Functionのみ)
            
        If Pri_SubFunction = "Function" Then
            Debug.Print ""
            Debug.Print "返り値の型の一部を入力"
            Debug.Print "ICMD1 " & """" & """"
            Call Set__InputArg
            Pri_Num = 4
        Else
            Pri_Num = 4
            Call MCCP(4)
        End If

    ElseIf Num = 4 Then
        '引数の名前入力
    
        Debug.Print ""
        Debug.Print "引数名" & Lng_ArgNum & "個目"
        Debug.Print "ICMD1 " & """" & """"
        Call Set__InputArg
        Pri_Num = 5
        
    ElseIf Num = 5 Then
        '引数の型入力
        Debug.Print ""
        Debug.Print "引数の型" & Lng_ArgNum & "個目"
        Debug.Print "ICMD1 " & """" & """"
        Call Set__InputArg
        Lng_ArgNum = Lng_ArgNum + 1
        Pri_Num = 6
    
    ElseIf Num = 6 Then
        'コード生成
        Str_ArgCode = Conv__ArgCode(Pri_Dict_ArgName, Pri_Dict_ArgType)
        If Pri_SubFunction = "Sub" Then
            If Pri_Scope = "Public" Then
                Pri_ProcedureName = "S_" & Pri_ProcedureName
            Else
                Pri_ProcedureName = "S__" & Pri_ProcedureName
            End If
            
            Code = Pri_Scope & " " & Pri_SubFunction & " " & Pri_ProcedureName & "(" & Str_ArgCode & ")"
            
        Else
            If Pri_Scope = "Public" Then
                Pri_ProcedureName = "Get_" & Pri_ProcedureName
            Else
                Pri_ProcedureName = "Get__" & Pri_ProcedureName
            End If
            
            Code = Pri_Scope & " " & Pri_SubFunction & " " & Pri_ProcedureName & "(" & Str_ArgCode & ")" & " As " & Pri_ReturnType
            
        End If
        
        Code = Code & vbLf & "'" & Format(Date, "YYYYMMDD")
        
        If Pri_SubFunction = "Function" Then
            Set Dict_ArgType = Get__DictArgType
            Code = Code & vbLf
            If Dict_ArgType.Exists(Pri_ReturnType) = True Then
                If Dict_ArgType(Pri_ReturnType) = "" Then
                    Code = Code & vbLf & "    " & Pri_ProcedureName & " = "
                Else
                    Code = Code & vbLf & "    " & "Set " & Pri_ProcedureName & " = "
                End If
            Else
                Code = Code & vbLf & "    " & "Set " & Pri_ProcedureName & " = "
            End If
        End If
        
        Code = Code & vbLf
        Code = Code & vbLf & "End " & Pri_SubFunction
            
        Debug.Print ""
        Debug.Print "コードを生成してクリップボードに格納しました"
        Debug.Print Code
        
        Call ClipText(Code)
        Call ShowCodeWindowDelay
    End If
        
End Sub

Public Sub ReceiveArg_MCCP(Num As Long)
'ICMD1で入力されたPri_Arg1を受け取って生成コードの部品を各Private変数に格納する
'20250114
    
    Dim Str_ArgName As String
    Dim Str_ArgType As String
    If Num = 1 Then
        If Pri_Arg1 = "R" Or Pri_Arg1 = "r" Then
            Pri_Scope = "Private"
        Else
            Pri_Scope = "Public"
        End If
            
        Debug.Print "スコープ：" & Pri_Scope
        Call MCCP(1)
        
    ElseIf Num = 2 Then
        If Pri_Arg1 = "F" Then
            Pri_SubFunction = "Function"
        Else
            Pri_SubFunction = "Sub"
        End If
        
        Debug.Print "種類：" & Pri_SubFunction & "プロシージャ"
        Call MCCP(2)
    
    ElseIf Num = 3 Then
        Pri_ProcedureName = Pri_Arg1
        
        Debug.Print "プロシージャ名：" & Pri_ProcedureName
        Call MCCP(3)
        
    ElseIf Num = 4 Then
        Pri_ReturnType = Conv__ValueType(CStr(Pri_Arg1))
        
        Debug.Print "返り値型：" & Pri_ReturnType
        Call MCCP(4)
    
    ElseIf Num = 5 Then
        Str_ArgName = Pri_Arg1
        If Str_ArgName <> "" Then
            Pri_Dict_ArgName.Add CStr(Pri_Dict_ArgName.Count + 1), Str_ArgName
            Debug.Print "引数名：" & Str_ArgName
            Call MCCP(5)
        Else
            Call MCCP(6)
        End If
        
    ElseIf Num = 6 Then
        Str_ArgType = Pri_Arg1
        Str_ArgType = Conv__ValueType(Str_ArgType)
        Pri_Dict_ArgType.Add CStr(Pri_Dict_ArgType.Count + 1), Str_ArgType
        Debug.Print "引数型：" & Str_ArgType
        Call MCCP(4)
        
    End If
End Sub

Private Function Conv__ArgCode(ByRef Dict_ArgName As Dictionary, _
                               ByRef Dict_ArgType As Dictionary) _
                                                  As String
    
    If Dict_ArgName.Count = 0 Then
        Exit Function
    End If
    
    Dim List_ArgName As Variant: List_ArgName = Dict_ArgName.Items
    Dim List_ArgType As Variant: List_ArgType = Dict_ArgType.Items
    
    Dim I           As Long
    Dim Str_ArgName As String
    Dim Str_ArgType As String
    Dim Output      As String
    For I = 0 To UBound(List_ArgName)
        Str_ArgName = List_ArgName(I)
        Str_ArgType = List_ArgType(I)
        If I = 0 Then
            Output = Str_ArgName & " As " & Str_ArgType
        Else
            Output = Output & ", " & Str_ArgName & " As " & Str_ArgType
        End If
    Next
    
    Conv__ArgCode = Output
    
End Function

Private Function Conv__ValueType(Str_Input As String) As String
    Dim Dict_Type As Dictionary: Set Dict_Type = Get__DictArgType
    
    Dim List_Type As Variant: List_Type = Dict_Type.Keys
    List_Type = WorksheetFunction.Transpose(WorksheetFunction.Transpose(List_Type))
    
    Dim Output   As String
    Dim I        As Long
    Dim Tmp_Type As String
    For I = 1 To UBound(List_Type, 1)
        Tmp_Type = List_Type(I)
        If InStr(Tmp_Type, Str_Input) > 0 Then
            Output = Tmp_Type
            Exit For
        End If
    Next
    
    If Output = "" Then
        Output = Str_Input
    End If
    
    Conv__ValueType = Output
    
End Function

Private Function Get__DictArgType() As Dictionary
    Dim Dict_Type As New Dictionary
    Dict_Type.Add "Long", ""
    Dict_Type.Add "Double", ""
    Dict_Type.Add "String", ""
    Dict_Type.Add "Boolean", ""
    Dict_Type.Add "Date", ""
    Dict_Type.Add "Variant", ""
    Dict_Type.Add "Object", "Set"
    Dict_Type.Add "Range", "Set"
    Dict_Type.Add "Worksheet", "Set"
    Dict_Type.Add "Workbook", "Set"
    Dict_Type.Add "Shape", "Set"
    
    '全て小文字、大文字も追加しておく
    Dim List_Type As Variant: List_Type = Dict_Type.Keys
    List_Type = WorksheetFunction.Transpose(WorksheetFunction.Transpose(List_Type))
    Dim I        As Long
    Dim Str_Type As String
    For I = 1 To UBound(List_Type, 1)
        Str_Type = List_Type(I)
        Dict_Type.Add StrConv(Str_Type, vbUpperCase), Dict_Type(Str_Type)
        Dict_Type.Add StrConv(Str_Type, vbLowerCase), Dict_Type(Str_Type)
    Next
     
    Set Get__DictArgType = Dict_Type
End Function

Private Sub Set__InputArg()

'    Dim WshShell As New WshShell
    Dim WshShell As Object
    Set WshShell = CreateObject("WScript.Shell")
    
    Call WshShell.SendKeys("^G")
    Call WshShell.SendKeys("{LEFT}")
    Call WshShell.SendKeys("{LEFT}")
End Sub

Public Sub ClipText(ByVal Text As String)
'文字列(Text)をクリップボードに格納
'https://www.softex-celware.com/post/cliptext
'20251007 テキストのみの処理に変更

'引数
'Text・・・クリップボードに格納するテキスト
    
    'クリップボードに格納
    With CreateObject("Forms.TextBox.1")
        .MultiLine = True
        .Text = Text
        .SelStart = 0
        .SelLength = .TextLength
        .Copy
    End With
    
End Sub

' === Module: ModOther ===

Public Sub ShowCodeWindowDelay()
'少し送らせてから「ShowCodeWindow」を実行する
'イミディエイトウィンドウから実行する場合はこの処理を行わないとイミディエイトウィンドウに残ったままになる
'20251007
    
'    Dim Time_    As Date: Time_ = Now() + TimeSerial(0, 0, 1) / 100 '少し遅らせる
'    Dim Time_    As Date: Time_ = Now() '検証したらこれでも上手くいく。理由はわからん。
'    Dim Time_    As Date: Time_ = Now() + TimeSerial(0, 0, 1) '少し遅らせる(なぜか↑で上手くいかなくなった)'20251030
    Dim Time_    As Date: Time_ = Now() 'やっぱり戻す'20251031
    Dim BookName As String: BookName = ThisWorkbook.Name
    Dim ProcName As String: ProcName = "ShowCodeWindow"
    Dim FullProc As String: FullProc = BookName & "!" & ProcName
    
    Call Application.OnTime(EarliestTime:=Time_, Procedure:=FullProc, Schedule:=True)
    
End Sub


