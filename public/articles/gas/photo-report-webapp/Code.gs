/**
 * 工事写真付き報告書作成 Webアプリ
 *
 * 想定:
 * - コンテナバインド型GASとして、対象スプレッドシートに紐づけて使う
 * - 「設定」シート B:D 列に入力1〜3の選択肢がある
 * - 「レポート」シート 1ページ目に6枚分の帳票ひな形が作成済み
 */

const APP_CONFIG = {
  settingsSheetName: '設定',
  reportSheetName: 'レポート',
  outputSheetPrefix: 'レポート_出力_',
  imageFolderName: '報告書アップロード画像',
  shareImagesForImageFormula: true,
  imageFormulaRenderWaitMs: 3000,
  templateRowsPerPage: 15,
  exportStartColumn: 2,
  exportColumnCount: 5,
  firstChoiceRow: 3,
  choiceColumns: [2, 3, 4],
  // 実シートの枠位置に合わせて、必要に応じてここだけ調整する。
  slots: [
    { imageCell: 'B2', textCells: ['B3', 'B4', 'B5'] },
    { imageCell: 'D2', textCells: ['D3', 'D4', 'D5'] },
    { imageCell: 'B7', textCells: ['B8', 'B9', 'B10'] },
    { imageCell: 'D7', textCells: ['D8', 'D9', 'D10'] },
    { imageCell: 'B12', textCells: ['B13', 'B14', 'B15'] },
    { imageCell: 'D12', textCells: ['D13', 'D14', 'D15'] },
  ],
  titleCell: 'B1',
  pageNumberCell: 'D1',
};

function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('写真付き報告書作成')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover');
}

function getInitialData() {
  return {
    choices: getChoices_(),
    maxFilesHint: 30,
  };
}

function submitReport(payload) {
  validatePayload_(payload);

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const parentFolder = getSpreadsheetParentFolder_(ss);
    const reportTitle = sanitizeTitle_(payload.reportTitle);
    const folderTimestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd_HHmm');
    const outputFolderName = folderTimestamp + '_' + reportTitle;
    const outputFolder = parentFolder.createFolder(outputFolderName);

    const savedItems = payload.items.map(function(item, index) {
      const blob = decodeImageBlob_(item, reportTitle, index + 1);
      const file = outputFolder.createFile(blob);
      if (APP_CONFIG.shareImagesForImageFormula) {
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      }
      return {
        imageFileId: file.getId(),
        imageFileName: file.getName(),
        imageUrl: createDriveImageViewUrl_(file.getId()),
        values: normalizeItemValues_(item.values),
      };
    });

    const reportSheet = ss.getSheetByName(APP_CONFIG.reportSheetName);
    if (!reportSheet) {
      throw new Error('「' + APP_CONFIG.reportSheetName + '」シートが見つかりません。');
    }

    let outputSheets = [];
    let pdfFile;

    try {
      outputSheets = buildReportSheets_(ss, reportSheet, reportTitle, savedItems);
      waitForImageFormulaRender_();

      const pdfFileName = folderTimestamp + ' ' + reportTitle + '.pdf';
      pdfFile = exportOutputSheetsToPdf_(ss, outputSheets, outputFolder, pdfFileName);
    } finally {
      cleanupOutputSheets_(ss, outputSheets);
    }

    return {
      message: '報告書PDFを作成しました。',
      pdfFileName: pdfFile.getName(),
      pdfUrl: pdfFile.getUrl(),
      imageFolderUrl: outputFolder.getUrl(),
      imageCount: savedItems.length,
    };
  } finally {
    lock.releaseLock();
  }
}

function getChoices_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(APP_CONFIG.settingsSheetName);
  if (!sheet) {
    throw new Error('「' + APP_CONFIG.settingsSheetName + '」シートが見つかりません。');
  }

  const lastRow = Math.max(sheet.getLastRow(), APP_CONFIG.firstChoiceRow);
  const rowCount = lastRow - APP_CONFIG.firstChoiceRow + 1;

  return APP_CONFIG.choiceColumns.map(function(col) {
    return sheet
      .getRange(APP_CONFIG.firstChoiceRow, col, rowCount, 1)
      .getDisplayValues()
      .map(function(row) { return String(row[0]).trim(); })
      .filter(function(value) { return value !== ''; });
  });
}

function validatePayload_(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('送信データが不正です。');
  }
  if (!String(payload.reportTitle || '').trim()) {
    throw new Error('レポートタイトルを入力してください。');
  }
  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    throw new Error('写真を1枚以上登録してください。');
  }
  payload.items.forEach(function(item, index) {
    if (!item || !item.base64 || !item.mimeType) {
      throw new Error((index + 1) + '枚目の写真データが不足しています。');
    }
  });
}

function normalizeItemValues_(values) {
  const result = Array.isArray(values) ? values : [];
  return [0, 1, 2].map(function(index) {
    return String(result[index] || '').trim();
  });
}

function decodeImageBlob_(item, reportTitle, number) {
  const mimeType = String(item.mimeType || 'image/jpeg');
  const extension = getExtensionFromMimeType_(mimeType, item.fileName);
  const fileName = reportTitle + '_' + zeroPad_(number, 2) + '.' + extension;
  const bytes = Utilities.base64Decode(String(item.base64));
  return Utilities.newBlob(bytes, mimeType, fileName);
}

function buildReportSheets_(ss, templateSheet, reportTitle, items) {
  const pageCount = Math.max(1, Math.ceil(items.length / APP_CONFIG.slots.length));
  templateSheet.showSheet();
  cleanupExistingOutputSheets_(ss);

  const outputSheets = [];
  for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
    const sheet = copyTemplateSheetForOutput_(ss, templateSheet, pageIndex + 1);
    clearPageOutputArea_(sheet);
    setPageHeader_(sheet, reportTitle, pageIndex + 1);
    outputSheets.push(sheet);
  }

  items.forEach(function(item, index) {
    const pageIndex = Math.floor(index / APP_CONFIG.slots.length);
    const slotIndex = index % APP_CONFIG.slots.length;
    const slot = APP_CONFIG.slots[slotIndex];
    const sheet = outputSheets[pageIndex];

    setImageFormulaIntoCell_(sheet, item.imageUrl, slot.imageCell);
    slot.textCells.forEach(function(cellA1, valueIndex) {
      setCellOrMergedValue_(sheet, cellA1, item.values[valueIndex] || '');
    });
  });

  SpreadsheetApp.flush();
  return outputSheets;
}

function setPageHeader_(sheet, reportTitle, pageNumber) {
  const titleRange = getCellDisplayRange_(sheet.getRange(APP_CONFIG.titleCell));
  titleRange.clearContent();
  titleRange.getCell(1, 1).setValue(reportTitle);
  titleRange.setHorizontalAlignment('left');
  titleRange.setVerticalAlignment('middle');
  titleRange.setFontWeight('bold');
  titleRange.setFontSize(16);

  const pageRange = getCellDisplayRange_(sheet.getRange(APP_CONFIG.pageNumberCell));
  pageRange.clearContent();
  pageRange.getCell(1, 1).setValue('P.' + pageNumber);
  pageRange.setHorizontalAlignment('right');
  pageRange.setVerticalAlignment('middle');
  pageRange.setFontWeight('bold');
  pageRange.setFontSize(16);
}

function copyTemplateSheetForOutput_(ss, templateSheet, pageNumber) {
  const sheet = templateSheet.copyTo(ss);
  sheet.setName(APP_CONFIG.outputSheetPrefix + pageNumber);
  ss.setActiveSheet(sheet);
  ss.moveActiveSheet(ss.getNumSheets());
  sheet.getRange('A1').clearNote();

  if (sheet.getMaxRows() > APP_CONFIG.templateRowsPerPage) {
    sheet.deleteRows(APP_CONFIG.templateRowsPerPage + 1, sheet.getMaxRows() - APP_CONFIG.templateRowsPerPage);
  }
  const keepColumns = APP_CONFIG.exportStartColumn + APP_CONFIG.exportColumnCount - 1;
  if (sheet.getMaxColumns() > keepColumns) {
    sheet.deleteColumns(keepColumns + 1, sheet.getMaxColumns() - keepColumns);
  }
  return sheet;
}

function clearPageOutputArea_(sheet) {
  APP_CONFIG.slots.forEach(function(slot) {
    clearCellOrMergedRange_(sheet, slot.imageCell);
    slot.textCells.forEach(function(cellA1) {
      clearCellOrMergedRange_(sheet, cellA1);
    });
  });
}

function setImageFormulaIntoCell_(sheet, imageUrl, cellA1) {
  const cell = sheet.getRange(cellA1);
  const displayRange = getCellDisplayRange_(cell);
  const width = getRangeWidth_(sheet, displayRange);
  const height = getRangeHeight_(sheet, displayRange);
  const formula = '=IMAGE("' + imageUrl + '", 1' + ')';

  displayRange.clearContent();
  const topLeft = displayRange.getCell(1, 1);
  topLeft.setFormula(formula);
  displayRange.setHorizontalAlignment('center');
  displayRange.setVerticalAlignment('middle');
}

function setCellOrMergedValue_(sheet, cellA1, value) {
  const displayRange = getCellDisplayRange_(sheet.getRange(cellA1));
  displayRange.clearContent();
  const topLeft = displayRange.getCell(1, 1);
  topLeft.setValue(value);
  displayRange.setHorizontalAlignment('center');
  displayRange.setVerticalAlignment('middle');
  displayRange.setFontWeight('bold');
}

function clearCellOrMergedRange_(sheet, cellA1) {
  getCellDisplayRange_(sheet.getRange(cellA1)).clearContent();
}

function getCellDisplayRange_(cell) {
  const mergedRanges = cell.getMergedRanges();
  if (mergedRanges.length > 0) {
    return mergedRanges[0];
  }
  return cell;
}

function exportOutputSheetsToPdf_(ss, outputSheets, folder, fileName) {
  const visibilityState = captureSheetVisibility_(ss);

  try {
    showOnlySheets_(ss, outputSheets);
    SpreadsheetApp.flush();

    const pdfFile = exportVisibleSheetsToPdf_(ss, folder, fileName);
    restoreSheetVisibility_(ss, visibilityState);
    return pdfFile;
  } catch (error) {
    restoreSheetVisibility_(ss, visibilityState);
    throw error;
  }
}

function exportVisibleSheetsToPdf_(ss, folder, fileName) {
  const url = 'https://docs.google.com/spreadsheets/d/' + ss.getId() + '/export?' + [
    'format=pdf',
    'size=A4',
    'portrait=true',
    'fitw=true',
    'sheetnames=false',
    'printtitle=false',
    'pagenumbers=false',
    'gridlines=false',
    'fzr=false',
    'printnotes=false',
    'horizontal_alignment=CENTER',
    'vertical_alignment=MIDDLE',
    'top_margin=0.1',
    'bottom_margin=0.1',
    'left_margin=0.1',
    'right_margin=0.1',
  ].join('&');

  const token = ScriptApp.getOAuthToken();
  const response = UrlFetchApp.fetch(url, {
    headers: { Authorization: 'Bearer ' + token },
    muteHttpExceptions: true,
  });

  if (response.getResponseCode() !== 200) {
    throw new Error('PDF出力に失敗しました。HTTP ' + response.getResponseCode());
  }

  return folder.createFile(response.getBlob().setName(fileName));
}

function captureSheetVisibility_(ss) {
  return ss.getSheets().map(function(sheet) {
    return {
      sheet,
      hidden: sheet.isSheetHidden(),
    };
  });
}

function showOnlySheets_(ss, visibleSheets) {
  const visibleIds = visibleSheets.map(function(sheet) { return sheet.getSheetId(); });
  ss.getSheets().forEach(function(sheet) {
    if (visibleIds.indexOf(sheet.getSheetId()) >= 0) {
      sheet.showSheet();
    } else {
      sheet.hideSheet();
    }
  });
}

function restoreSheetVisibility_(ss, visibilityState) {
  visibilityState.forEach(function(state) {
    const sheet = state.sheet;
    if (ss.getSheetByName(sheet.getName()) === null) return;
    if (state.hidden) {
      sheet.hideSheet();
    } else {
      sheet.showSheet();
    }
  });
}

function cleanupExistingOutputSheets_(ss) {
  ss.getSheets().forEach(function(sheet) {
    if (sheet.getName().indexOf(APP_CONFIG.outputSheetPrefix) === 0) {
      ss.deleteSheet(sheet);
    }
  });
}

function cleanupOutputSheets_(ss, sheets) {
  sheets.forEach(function(sheet) {
    if (ss.getSheetByName(sheet.getName()) !== null) {
      ss.deleteSheet(sheet);
    }
  });
}

function getSpreadsheetParentFolder_(ss) {
  const file = DriveApp.getFileById(ss.getId());
  const parents = file.getParents();
  if (parents.hasNext()) {
    return parents.next();
  }
  return DriveApp.getRootFolder();
}

function getOrCreateFolder_(parentFolder, folderName) {
  const folders = parentFolder.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return parentFolder.createFolder(folderName);
}

function createDriveImageViewUrl_(fileId) {
  return 'https://drive.google.com/uc?export=view&id=' + encodeURIComponent(fileId);
}

function waitForImageFormulaRender_() {
  SpreadsheetApp.flush();
  if (APP_CONFIG.imageFormulaRenderWaitMs > 0) {
    Utilities.sleep(APP_CONFIG.imageFormulaRenderWaitMs);
  }
}

function getRangeWidth_(sheet, range) {
  let width = 0;
  for (let col = range.getColumn(); col < range.getColumn() + range.getNumColumns(); col++) {
    width += sheet.getColumnWidth(col);
  }
  return width;
}

function getRangeHeight_(sheet, range) {
  let height = 0;
  for (let row = range.getRow(); row < range.getRow() + range.getNumRows(); row++) {
    height += sheet.getRowHeight(row);
  }
  return height;
}

function offsetRangeA1_(rangeA1, rowOffset) {
  if (!rowOffset) return rangeA1;
  return rangeA1.replace(/([A-Z]+)(\d+)/g, function(_, col, row) {
    return col + (Number(row) + rowOffset);
  });
}

function offsetCellA1_(cellA1, rowOffset) {
  if (!rowOffset) return cellA1;
  return cellA1.replace(/^([A-Z]+)(\d+)$/, function(_, col, row) {
    return col + (Number(row) + rowOffset);
  });
}

function sanitizeTitle_(title) {
  const cleaned = String(title || '')
    .trim()
    .replace(/[\\/:*?"<>|#%{}~&]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');
  return cleaned || '工事報告書';
}

function getExtensionFromMimeType_(mimeType, fileName) {
  const map = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/heic': 'heic',
    'image/heif': 'heif',
  };
  if (map[mimeType]) return map[mimeType];

  const lowerName = String(fileName || '').toLowerCase();
  const match = lowerName.match(/\.([a-z0-9]+)$/);
  if (match) return match[1] === 'jpeg' ? 'jpg' : match[1];

  return 'jpg';
}

function zeroPad_(value, length) {
  return String(value).padStart(length, '0');
}
