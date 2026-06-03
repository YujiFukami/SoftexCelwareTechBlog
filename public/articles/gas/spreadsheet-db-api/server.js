const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");

loadEnv();

const PORT = Number(process.env.PORT || 3000);
const GAS_API_URL = process.env.GAS_API_URL || "";
const GAS_API_TOKEN = process.env.GAS_API_TOKEN || "";

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname.startsWith("/api/customers")) {
      await handleCustomersApi(req, res, url);
      return;
    }

    sendJson(res, 404, {
      ok: false,
      error: "APIのパスが見つかりません。"
    });
  } catch (error) {
    sendJson(res, 500, {
      ok: false,
      error: error.message || String(error)
    });
  }
});

server.listen(PORT, () => {
  console.log(`Local app: http://localhost:${PORT}`);
});

function loadEnv() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

async function handleCustomersApi(req, res, url) {
  if (!GAS_API_URL || !GAS_API_TOKEN) {
    sendJson(res, 500, {
      ok: false,
      error: ".envにGAS_API_URLとGAS_API_TOKENを設定してください。"
    });
    return;
  }

  const id = decodeURIComponent(url.pathname.replace(/^\/api\/customers\/?/, "")).trim();

  if (req.method === "GET" && !id) {
    const result = await callGas({ action: "list" });
    sendJson(res, 200, { ok: true, result });
    return;
  }

  if (req.method === "GET" && id) {
    const result = await callGas({ action: "get", id });
    sendJson(res, 200, { ok: true, result });
    return;
  }

  if (req.method === "POST" && !id) {
    const data = await readJsonBody(req);
    const result = await callGas({ action: "create", data });
    sendJson(res, 201, { ok: true, result });
    return;
  }

  if (req.method === "PUT" && id) {
    const data = await readJsonBody(req);
    const result = await callGas({ action: "update", id, data });
    sendJson(res, 200, { ok: true, result });
    return;
  }

  if (req.method === "DELETE" && id) {
    const result = await callGas({ action: "delete", id });
    sendJson(res, 200, { ok: true, result });
    return;
  }

  sendJson(res, 404, {
    ok: false,
    error: "APIのパスまたはメソッドが正しくありません。"
  });
}

async function callGas(payload) {
  const response = await fetch(GAS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify({
      ...payload,
      token: GAS_API_TOKEN
    })
  });

  const result = await response.json();
  if (!result.ok) {
    throw new Error(result.error || "GAS APIの呼び出しに失敗しました。");
  }

  return result.result;
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });
  res.end(JSON.stringify(data));
}
