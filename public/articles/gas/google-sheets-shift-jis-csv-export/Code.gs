function exportActiveSheetToShiftJisCsv() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const values = sheet.getDataRange().getDisplayValues();

  const csvText = valuesToCsv_(values);
  const fileName = sheet.getName() + '_shiftjis.csv';

  Logger.log('CSV文字数: ' + csvText.length);
  Logger.log('CSV先頭100文字: ' + csvText.substring(0, 100));

  const blob = Utilities.newBlob('', 'text/csv', fileName);
  blob.setDataFromString(csvText, 'Shift_JIS');

  Logger.log('Blobバイト数: ' + blob.getBytes().length);

  const file = createFileInSameFolder_(blob);

  Logger.log('Driveファイルサイズ: ' + file.getSize());
  Logger.log('CSVを出力しました');
  Logger.log(file.getName());
  Logger.log(file.getUrl());
}

function valuesToCsv_(values) {
  return values.map(row => {
    return row.map(value => {
      let text = value == null ? '' : String(value);
      text = text.replace(/"/g, '""');
      return '"' + text + '"';
    }).join(',');
  }).join('\r\n');
}

function createFileInSameFolder_(blob) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const spreadsheetFile = DriveApp.getFileById(spreadsheet.getId());
  const parents = spreadsheetFile.getParents();

  if (parents.hasNext()) {
    const folder = parents.next();
    return folder.createFile(blob);
  }

  return DriveApp.createFile(blob);
}
