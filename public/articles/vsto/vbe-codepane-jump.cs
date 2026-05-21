// projectName / moduleNameで対象VBComponentを特定したあと:
var code = comp.CodeModule;
var pane = code.CodePane;

// 1. VBE本体を前面化する。
_vbe.MainWindow.Visible = true;
pane.Show();

// 2. 範囲選択せず、開始行1列目へカーソルを置く。
//    範囲選択すると、VBEが選択末尾基準でスクロールすることがある。
pane.SetSelection(startLine, 1, startLine, 1);

// 3. 開始行を画面トップに固定する。
try
{
    pane.TopLine = startLine;
}
catch
{
    // TopLineを設定できない状態では無視する。
}
