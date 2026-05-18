using System.Runtime.Serialization;

[DataContract]
public sealed class ColorProfile
{
    [DataMember(Order = 0)]
    public string Name { get; set; } = "";

    [DataMember(Order = 10)]
    public string AccentColor { get; set; } = "#2F80ED";

    // 後から追加したプロパティ。
    // 旧JSONにはキーが無いため、読み込み後にnullになる可能性がある。
    [DataMember(Order = 20)]
    public string HeaderBackground { get; set; } = "#F0F0F0";

    [DataMember(Order = 21)]
    public string HeaderForeground { get; set; } = "#000000";

    [DataMember(Order = 30)]
    public string EditorFontFamily { get; set; } = "Consolas";

    [DataMember(Order = 31)]
    public double EditorFontSize { get; set; } = 12;

    [OnDeserialized]
    private void OnDeserialized(StreamingContext context)
    {
        if (string.IsNullOrWhiteSpace(Name)) Name = "Default";
        if (string.IsNullOrWhiteSpace(AccentColor)) AccentColor = "#2F80ED";
        if (string.IsNullOrWhiteSpace(HeaderBackground)) HeaderBackground = "#F0F0F0";
        if (string.IsNullOrWhiteSpace(HeaderForeground)) HeaderForeground = "#000000";
        if (string.IsNullOrWhiteSpace(EditorFontFamily)) EditorFontFamily = "Consolas";
        if (EditorFontSize < 6 || EditorFontSize > 72) EditorFontSize = 12;
    }
}
