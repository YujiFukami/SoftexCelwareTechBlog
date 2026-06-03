const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID";
const DB_SHEET_NAME = "顧客DB";
const LOG_SHEET_NAME = "ログ";

function doPost(e) {
  return handleRequest_(e);
}

function doGet(e) {
  return handleRequest_(e);
}

function handleRequest_(e) {
  let action = "";
  let targetId = "";

  try {
    const params = e && e.parameter ? e.parameter : {};
    const body = parseBody_(e);

    action = body.action || params.action || "";
    targetId = body.id || params.id || "";

    checkToken_(body.token || params.token || "");

    let result;

    switch (action) {
      case "list":
        result = listRecords_();
        break;
      case "get":
        result = getRecord_(targetId);
        break;
      case "create":
        result = createRecord_(body.data || {});
        targetId = result.id;
        break;
      case "update":
        result = updateRecord_(targetId, body.data || {});
        break;
      case "delete":
        result = deleteRecord_(targetId);
        break;
      default:
        throw new Error("不明なactionです: " + action);
    }

    writeLog_(action, targetId, "success", "");
    return json_({ ok: true, action, result });
  } catch (error) {
    const message = String(error && error.message ? error.message : error);
    writeLog_(action, targetId, "error", message);
    return json_({ ok: false, action, error: message });
  }
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) return {};
  return JSON.parse(e.postData.contents);
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function checkToken_(token) {
  const expected = PropertiesService.getScriptProperties().getProperty("API_TOKEN");
  if (!expected) throw new Error("スクリプトプロパティにAPI_TOKENが設定されていません。");
  if (token !== expected) throw new Error("API_TOKENが正しくありません。");
}

function getDbSheet_() {
  return SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(DB_SHEET_NAME);
}

function getLogSheet_() {
  return SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(LOG_SHEET_NAME);
}

function getTable_(sheet) {
  const values = sheet.getDataRange().getValues();
  if (values.length < 1) return { headers: [], rows: [] };

  const headers = values[0].map(String);
  const rows = values.slice(1);
  return { headers, rows };
}

function rowToObject_(headers, row) {
  return headers.reduce((obj, header, index) => {
    obj[header] = row[index];
    return obj;
  }, {});
}

function listRecords_() {
  const sheet = getDbSheet_();
  const table = getTable_(sheet);
  return table.rows
    .map((row) => rowToObject_(table.headers, row))
    .filter((record) => !record.deletedAt);
}

function getRecord_(id) {
  const found = findRecordRow_(id);
  if (!found) throw new Error("対象のレコードが見つかりません。");
  return rowToObject_(found.headers, found.row);
}

function createRecord_(data) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = getDbSheet_();
    const table = getTable_(sheet);
    const now = new Date();
    const record = {
      id: Utilities.getUuid(),
      createdAt: now,
      updatedAt: now,
      deletedAt: "",
      version: 1,
      name: data.name || "",
      email: data.email || "",
      tel: data.tel || "",
      status: data.status || "",
      memo: data.memo || ""
    };

    const row = table.headers.map((header) => record[header] ?? "");
    sheet.appendRow(row);
    return { id: record.id };
  } finally {
    lock.releaseLock();
  }
}

function updateRecord_(id, data) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const found = findRecordRow_(id);
    if (!found) throw new Error("対象のレコードが見つかりません。");

    const record = rowToObject_(found.headers, found.row);
    const nextRecord = {
      ...record,
      ...data,
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: new Date(),
      deletedAt: record.deletedAt || "",
      version: Number(record.version || 0) + 1
    };

    const row = found.headers.map((header) => nextRecord[header] ?? "");
    found.sheet.getRange(found.rowIndex, 1, 1, row.length).setValues([row]);
    return { id };
  } finally {
    lock.releaseLock();
  }
}

function deleteRecord_(id) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const found = findRecordRow_(id);
    if (!found) throw new Error("対象のレコードが見つかりません。");

    const deletedAtIndex = found.headers.indexOf("deletedAt");
    const updatedAtIndex = found.headers.indexOf("updatedAt");
    if (deletedAtIndex === -1) throw new Error("deletedAt列がありません。");

    const now = new Date();
    found.sheet.getRange(found.rowIndex, deletedAtIndex + 1).setValue(now);
    if (updatedAtIndex !== -1) {
      found.sheet.getRange(found.rowIndex, updatedAtIndex + 1).setValue(now);
    }

    return { id };
  } finally {
    lock.releaseLock();
  }
}

function findRecordRow_(id) {
  if (!id) throw new Error("idが指定されていません。");

  const sheet = getDbSheet_();
  const table = getTable_(sheet);
  const idIndex = table.headers.indexOf("id");
  if (idIndex === -1) throw new Error("id列がありません。");

  for (let i = 0; i < table.rows.length; i += 1) {
    if (String(table.rows[i][idIndex]) === String(id)) {
      return {
        sheet,
        headers: table.headers,
        row: table.rows[i],
        rowIndex: i + 2
      };
    }
  }

  return null;
}

function writeLog_(action, targetId, status, message) {
  try {
    const sheet = getLogSheet_();
    sheet.appendRow([new Date(), action, DB_SHEET_NAME, targetId, status, message]);
  } catch (error) {
    console.warn(error);
  }
}
