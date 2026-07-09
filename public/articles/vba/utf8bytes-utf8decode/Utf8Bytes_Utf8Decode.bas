Attribute VB_Name = "Utf8Bytes_Utf8Decode"
Option Explicit

Private Const adTypeBinary As Long = 1
Private Const adTypeText As Long = 2
Private Const adReadAll As Long = -1

' String -> UTF-8 byte array.
' ADODB.Stream adds a UTF-8 BOM, so skip the first 3 bytes before returning.
Public Function Utf8Bytes(ByVal value As String) As Byte()
    Dim stream As Object

    Set stream = CreateObject("ADODB.Stream")
    stream.Type = adTypeText
    stream.Charset = "utf-8"
    stream.Open
    stream.WriteText value

    stream.Position = 0
    stream.Type = adTypeBinary
    stream.Position = 3
    Utf8Bytes = stream.Read(adReadAll)
    stream.Close
End Function

' UTF-8 byte array -> String.
' COM responseBody is a Variant containing a byte array, so receive Variant.
Public Function Utf8Decode(ByVal bytes As Variant) As String
    Dim stream As Object

    If IsEmpty(bytes) Then Exit Function
    If Not IsArray(bytes) Then Exit Function

    Set stream = CreateObject("ADODB.Stream")
    stream.Type = adTypeBinary
    stream.Open
    stream.Write bytes

    stream.Position = 0
    stream.Type = adTypeText
    stream.Charset = "utf-8"
    Utf8Decode = stream.ReadText(adReadAll)
    stream.Close
End Function

Public Sub TestUtf8()
    Dim sourceText As String
    Dim bytes() As Byte
    Dim restoredText As String

    sourceText = "日本語を含むテスト文字列"
    bytes = Utf8Bytes(sourceText)
    restoredText = Utf8Decode(bytes)

    MsgBox "UTF-8 bytes: " & (UBound(bytes) - LBound(bytes) + 1) & vbCrLf & _
           "first bytes: " & bytes(0) & " " & bytes(1) & " " & bytes(2) & vbCrLf & _
           "restored: " & restoredText, vbInformation
End Sub
