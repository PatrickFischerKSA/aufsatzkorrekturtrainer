import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

loadEnvFile();

const PORT = Number(process.env.PORT || 8080);
const ROOT_DIR = process.cwd();

const OPENAI_BASE_URL = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

    if (url.pathname === "/api/health") {
      return json(res, 200, {
        ok: true,
        configured: Boolean(OPENAI_API_KEY),
        acceptsClientKey: true,
        model: OPENAI_MODEL,
        baseUrl: OPENAI_BASE_URL,
      });
    }

    if (url.pathname === "/api/ai-review" && req.method === "POST") {
      return handleAiReview(req, res);
    }

    if (url.pathname.startsWith("/api/")) {
      return json(res, 404, { error: "API route not found" });
    }

    return serveStatic(url.pathname, res);
  } catch (error) {
    return json(res, 500, { error: `Serverfehler: ${error.message}` });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  // eslint-disable-next-line no-console
  console.log(`aufsatzkorrekturtrainer server läuft auf http://localhost:${PORT}`);
});

async function handleAiReview(req, res) {
  const body = await readJsonBody(req);
  const clientApiKey = String(body.apiKey || "").trim();
  const effectiveApiKey = clientApiKey || OPENAI_API_KEY;

  if (!effectiveApiKey) {
    return json(res, 503, {
      error: "API-Key fehlt. Bitte in der Oberfläche eingeben oder in .env setzen.",
    });
  }

  const text = String(body.text || "").trim();
  const levelSelection = body.levelSelection || {};

  if (!text || text.length < 200) {
    return json(res, 400, {
      error: "Zu wenig Text. Mindestens ca. 200 Zeichen erforderlich.",
    });
  }

  const promptPayload = {
    task: "Bewerte einen deutschsprachigen Aufsatz",
    output_scale: "Notenskala 1.00 bis 6.00 in 0.25-Schritten",
    criteria: ["inhalt", "aufbau", "ausdruck"],
    levelSelection,
    text,
  };

  const systemPrompt = [
    "Du bist eine präzise, faire Korrektur-KI für Deutschaufsätze.",
    "Gib nur JSON zurück (kein Markdown, keine Vorworte).",
    "JSON-Schema:",
    "{",
    '  "summary": "kurze Gesamtzusammenfassung",',
    '  "criteria": [',
    "    {",
    '      "id": "inhalt|aufbau|ausdruck",',
    '      "level": "therapeutisch|mild|moderat|anspruchsvoll|streng|brutal",',
    '      "score": 1.0-6.0,',
    '      "moderateScore": 1.0-6.0,',
    '      "strengths": ["...", "..."],',
    '      "gaps": ["...", "..."],',
    '      "nextStep": "konkreter nächster Schritt",',
    '      "comment": "qualifizierter Fließtext-Kommentar"',
    "    }",
    "  ]",
    "}",
    "Regeln:",
    "- moderateScore ist die hypothetische Bewertung auf moderatem Level.",
    "- score ist die Bewertung im jeweils gewünschten Level.",
    "- Nutze sachliche, konstruktive Sprache, auch bei streng/brutal.",
    "- Gib pro Kriterium genau einen Eintrag aus.",
  ].join("\n");

  const completionResponse = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${effectiveApiKey}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: JSON.stringify(promptPayload) },
      ],
    }),
  });

  const raw = await completionResponse.text();

  if (!completionResponse.ok) {
    return json(res, completionResponse.status, {
      error: "KI-API-Fehler",
      detail: raw.slice(0, 1200),
    });
  }

  let parsedApi;
  try {
    parsedApi = JSON.parse(raw);
  } catch {
    return json(res, 502, {
      error: "Ungültige Antwort vom KI-Anbieter.",
      detail: raw.slice(0, 1000),
    });
  }

  const content = parsedApi?.choices?.[0]?.message?.content;
  if (!content) {
    return json(res, 502, {
      error: "KI-Antwort ohne content.",
      detail: raw.slice(0, 1000),
    });
  }

  const structured = parseJsonObject(content);
  if (!structured || !Array.isArray(structured.criteria)) {
    return json(res, 502, {
      error: "KI-Antwort hatte kein gültiges Kriterien-JSON.",
      detail: content.slice(0, 1000),
    });
  }

  return json(res, 200, {
    summary: String(structured.summary || ""),
    criteria: structured.criteria,
    model: OPENAI_MODEL,
  });
}

async function serveStatic(pathname, res) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const normalized = normalize(decodeURIComponent(safePath)).replace(/^\.+/, "");
  const absolute = resolve(join(ROOT_DIR, `.${normalized}`));

  if (!absolute.startsWith(ROOT_DIR)) {
    return json(res, 403, { error: "Forbidden" });
  }

  if (!existsSync(absolute)) {
    return json(res, 404, { error: "Datei nicht gefunden" });
  }

  let filePath = absolute;
  const info = await stat(filePath);
  if (info.isDirectory()) {
    filePath = join(filePath, "index.html");
  }

  const data = await readFile(filePath);
  const ext = extname(filePath).toLowerCase();
  const type = MIME_TYPES[ext] || "application/octet-stream";

  res.writeHead(200, {
    "Content-Type": type,
    "Cache-Control": "no-cache",
  });
  res.end(data);
}

async function readJsonBody(req) {
  const MAX_BYTES = 4 * 1024 * 1024;
  const chunks = [];
  let size = 0;

  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BYTES) {
      throw new Error("Request body too large");
    }
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8") || "{}";
  return JSON.parse(raw);
}

function parseJsonObject(text) {
  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) return null;
    try {
      return JSON.parse(text.slice(start, end + 1));
    } catch {
      return null;
    }
  }
}

function json(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-cache",
  });
  res.end(JSON.stringify(payload));
}

function loadEnvFile() {
  const envPath = resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) return;

  const content = readFileSync(envPath, "utf8");
  const lines = content.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const index = line.indexOf("=");
    if (index < 0) continue;

    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim().replace(/^['"]|['"]$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}
