const LEVEL_CONFIG = {
  therapeutisch: {
    label: "therapeutisch",
    scoreOffset: 0.75,
    opener: "Du hast bereits eine gute Grundlage gelegt.",
    focus: "Ich formuliere die Hinweise besonders unterstützend und ressourcenorientiert.",
    action: "Nimm dir einen Abschnitt vor und verbessere ihn Schritt für Schritt.",
  },
  mild: {
    label: "mild",
    scoreOffset: 0.4,
    opener: "Der Text zeigt solide Ansätze.",
    focus: "Die Rückmeldung bleibt freundlich, aber klar.",
    action: "Überarbeite zuerst die wichtigste Schwäche, dann den Feinschliff.",
  },
  moderat: {
    label: "moderat",
    scoreOffset: 0,
    opener: "Die Leistung liegt im mittleren Bereich.",
    focus: "Ausgewogene Diagnose mit normalem Prüfungsmaßstab.",
    action: "Priorisiere die zwei stärksten Hebel für die nächste Fassung.",
  },
  anspruchsvoll: {
    label: "anspruchsvoll",
    scoreOffset: -0.25,
    opener: "Die Anforderungen werden auf hohem Niveau gemessen.",
    focus: "Gute Ansätze zählen, aber Präzision und Tiefe werden stärker gewichtet.",
    action: "Arbeite gezielt an Argumentdichte, Strukturklarheit und sprachlicher Genauigkeit.",
  },
  streng: {
    label: "streng",
    scoreOffset: -0.55,
    opener: "Die Bewertung folgt einem klar hohen Leistungsanspruch.",
    focus: "Unklare Passagen und Leerstellen wirken sich deutlich aus.",
    action: "Überarbeite konsequent alle unpräzisen oder schwach begründeten Stellen.",
  },
  brutal: {
    label: "brutal",
    scoreOffset: -0.9,
    opener: "Die Bewertung ist maximal kritisch und kompromisslos.",
    focus: "Was nicht sauber belegt oder strukturiert ist, zählt klar als Mangel.",
    action: "Setze den Text praktisch neu auf: klare These, klare Struktur, präzise Sprache.",
  },
};

const CRITERIA = [
  { id: "inhalt", label: "Inhalt" },
  { id: "aufbau", label: "Aufbau" },
  { id: "ausdruck", label: "Ausdruck" },
];

const API_ENDPOINT = "/api/ai-review";
const API_HEALTH_ENDPOINT = "/api/health";

const aiForm = document.getElementById("ai-form");
const engineModeInput = document.getElementById("engine-mode");
const apiStatus = document.getElementById("api-status");
const fileInput = document.getElementById("essay-file");
const parseButton = document.getElementById("parse-file");
const parseStatus = document.getElementById("parse-status");
const essayInput = document.getElementById("essay-input");
const resultsSection = document.getElementById("ai-results");
const cardsContainer = document.getElementById("ai-cards");
const metricsContainer = document.getElementById("ai-metrics");
const downloadButton = document.getElementById("download-ai");

const addStudentButton = document.getElementById("add-student");
const evaluateClassButton = document.getElementById("evaluate-class");
const downloadClassButton = document.getElementById("download-class");
const classStatus = document.getElementById("class-status");
const studentList = document.getElementById("student-list");
const classResultsSection = document.getElementById("class-results");
const classTableContainer = document.getElementById("class-table");
const classDetailsContainer = document.getElementById("class-details");

let latestAiReport = null;
let latestClassReport = null;
let studentCounter = 0;
let apiHealth = {
  reachable: false,
  configured: false,
  model: null,
};

if (window.pdfjsLib) {
  window.pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.js";
}

parseButton.addEventListener("click", parseSingleFile);
aiForm.addEventListener("submit", runAiCorrection);
downloadButton.addEventListener("click", downloadSingleReport);

addStudentButton.addEventListener("click", () => addStudentRow());
evaluateClassButton.addEventListener("click", evaluateClassroom);
downloadClassButton.addEventListener("click", downloadClassReport);
studentList.addEventListener("click", handleStudentListClick);

engineModeInput.addEventListener("change", () => {
  if (engineModeInput.value === "api" && (!apiHealth.reachable || !apiHealth.configured)) {
    parseStatus.textContent = "API-Modus gewählt, aber nicht bereit. Es wird bei Bedarf lokal analysiert.";
  }
});

init();

async function init() {
  addStudentRow();
  await checkApiHealth();
}

async function checkApiHealth() {
  try {
    const response = await fetch(API_HEALTH_ENDPOINT, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error("Health-Endpunkt nicht erreichbar");
    }

    const payload = await response.json();
    apiHealth = {
      reachable: Boolean(payload.ok),
      configured: Boolean(payload.configured),
      model: payload.model || null,
    };

    if (apiHealth.reachable && apiHealth.configured) {
      apiStatus.textContent = `API bereit (${apiHealth.model || "Modell konfiguriert"}).`;
    } else if (apiHealth.reachable) {
      apiStatus.textContent =
        "API-Server erreichbar, aber API-Key fehlt. API-Modus bleibt deaktiviert und fällt lokal zurück.";
    } else {
      apiStatus.textContent =
        "API nicht erreichbar. Nur lokale KI-Bewertung verfügbar (z. B. in GitHub Pages).";
    }
  } catch (error) {
    apiHealth = { reachable: false, configured: false, model: null };
    apiStatus.textContent =
      "API nicht erreichbar. Nur lokale KI-Bewertung verfügbar (z. B. in GitHub Pages).";
  }
}

async function parseSingleFile() {
  const file = fileInput.files?.[0];
  if (!file) {
    parseStatus.textContent = "Bitte zuerst eine Datei auswählen.";
    return;
  }

  parseStatus.textContent = "Datei wird eingelesen...";

  try {
    const text = await readSupportedFile(file);
    essayInput.value = text.trim();
    parseStatus.textContent = `Datei erfolgreich eingelesen (${countWords(text)} Wörter erkannt).`;
  } catch (error) {
    parseStatus.textContent = `Fehler beim Einlesen: ${error.message}`;
  }
}

async function readSupportedFile(file) {
  const fileName = file.name.toLowerCase();
  if (fileName.endsWith(".txt") || file.type === "text/plain") {
    return file.text();
  }
  if (fileName.endsWith(".pdf") || file.type === "application/pdf") {
    return readPdfFile(file);
  }
  throw new Error("Nur .txt oder .pdf werden unterstützt.");
}

async function readPdfFile(file) {
  if (!window.pdfjsLib) {
    throw new Error("PDF-Parser konnte nicht geladen werden.");
  }

  const data = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({ data }).promise;
  const pages = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const line = content.items.map((item) => item.str).join(" ");
    pages.push(line);
  }

  return pages.join("\n\n");
}

async function runAiCorrection(event) {
  event.preventDefault();

  const text = essayInput.value.trim();
  if (text.length < 200) {
    parseStatus.textContent = "Bitte einen längeren Aufsatztext einfügen (mindestens ca. 200 Zeichen).";
    essayInput.classList.add("invalid");
    return;
  }
  essayInput.classList.remove("invalid");

  const levelSelection = getLevelSelection();
  const requestedEngine = engineModeInput.value;

  parseStatus.textContent = "Analyse läuft...";

  try {
    const evaluation = await evaluateEssay(text, levelSelection, requestedEngine, { scope: "single" });

    renderMetrics(evaluation.metrics, levelSelection, evaluation);
    renderCards(evaluation.criteria);

    latestAiReport = {
      createdAt: new Date(),
      text,
      metrics: evaluation.metrics,
      criteria: evaluation.criteria,
      levelSelection,
      source: evaluation.source,
      model: evaluation.model || null,
      summary: evaluation.summary || "",
      warning: evaluation.warning || "",
    };

    downloadButton.disabled = false;
    resultsSection.hidden = false;

    if (evaluation.warning) {
      parseStatus.textContent = evaluation.warning;
    } else {
      parseStatus.textContent =
        evaluation.source === "api"
          ? `KI-Korrektur via API abgeschlossen (${evaluation.model || "Modell"}).`
          : "KI-Korrektur lokal abgeschlossen.";
    }
  } catch (error) {
    parseStatus.textContent = `Analyse fehlgeschlagen: ${error.message}`;
  }
}

async function evaluateEssay(text, levelSelection, requestedEngine, context = {}) {
  const metrics = computeGlobalMetrics(text);

  if (requestedEngine === "api") {
    if (apiHealth.reachable && apiHealth.configured) {
      const apiResult = await evaluateViaApi(text, levelSelection, context);
      return {
        source: "api",
        model: apiResult.model || apiHealth.model || null,
        summary: apiResult.summary || "",
        criteria: normalizeApiCriteria(apiResult.criteria, levelSelection, text, metrics),
        metrics,
      };
    }

    const localFallback = evaluateLocal(text, levelSelection);
    return {
      source: "local",
      warning: "API nicht verfügbar oder nicht konfiguriert. Es wurde lokal bewertet.",
      summary: "Lokaler Fallback aktiv.",
      criteria: localFallback.criteria,
      metrics,
    };
  }

  const localResult = evaluateLocal(text, levelSelection);
  return {
    source: "local",
    summary: "Lokale heuristische KI-Bewertung.",
    criteria: localResult.criteria,
    metrics,
  };
}

async function evaluateViaApi(text, levelSelection, context = {}) {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      text,
      levelSelection,
      context,
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || `API-Fehler (${response.status})`);
  }

  if (!payload.criteria || !Array.isArray(payload.criteria)) {
    throw new Error("API-Antwort enthält keine gültigen Kriterien.");
  }

  return payload;
}

function normalizeApiCriteria(criteria, levelSelection, text, metrics) {
  const fallback = evaluateLocal(text, levelSelection).criteria;

  return CRITERIA.map((criterion) => {
    const incoming = criteria.find((item) => item.id === criterion.id) || {};
    const fallbackItem = fallback.find((item) => item.id === criterion.id);

    const level = incoming.level && LEVEL_CONFIG[incoming.level] ? incoming.level : levelSelection[criterion.id];
    const score = clamp(roundQuarter(Number(incoming.score)), 1, 6);
    const safeScore = Number.isFinite(score) ? score : fallbackItem.score;

    const moderateScore = Number.isFinite(Number(incoming.moderateScore))
      ? clamp(roundQuarter(Number(incoming.moderateScore)), 1, 6)
      : fallbackItem.moderateScore;

    const delta = safeScore - moderateScore;

    return {
      id: criterion.id,
      label: criterion.label,
      level,
      score: safeScore,
      moderateScore,
      deltaText: delta === 0 ? "0" : delta > 0 ? `+${delta.toFixed(2)}` : delta.toFixed(2),
      comment: incoming.comment || fallbackItem.comment,
      strengths: normalizeStringList(incoming.strengths, fallbackItem.strengths),
      gaps: normalizeStringList(incoming.gaps, fallbackItem.gaps),
      nextStep: incoming.nextStep || fallbackItem.nextStep,
    };
  });
}

function normalizeStringList(candidate, fallback) {
  if (Array.isArray(candidate) && candidate.length) {
    return candidate.map((entry) => String(entry));
  }
  return fallback;
}

function evaluateLocal(text, levelSelection) {
  const metrics = computeGlobalMetrics(text);
  const analyses = {
    inhalt: analyzeContent(text, metrics),
    aufbau: analyzeStructure(text, metrics),
    ausdruck: analyzeExpression(text, metrics),
  };

  const criteria = CRITERIA.map((criterion) => {
    const base = analyses[criterion.id];
    const level = levelSelection[criterion.id];
    const levelResult = applyLevel(base, level);

    return {
      id: criterion.id,
      label: criterion.label,
      level,
      score: levelResult.score,
      moderateScore: roundQuarter(base.baseScore),
      deltaText: levelResult.deltaText,
      comment: levelResult.comment,
      strengths: base.strengths,
      gaps: base.gaps,
      nextStep: base.recommendation,
    };
  });

  return {
    criteria,
    metrics,
  };
}

function renderMetrics(metrics, levelSelection, evaluation) {
  const sourceLabel = evaluation.source === "api" ? `API-KI${evaluation.model ? ` (${evaluation.model})` : ""}` : "Lokale KI";

  metricsContainer.innerHTML = `
    <div class="feedback-card">
      <h4>Textdiagnose</h4>
      <p><strong>Engine:</strong> ${escapeHtml(sourceLabel)}</p>
      <p><strong>Wörter:</strong> ${metrics.wordCount}</p>
      <p><strong>Sätze:</strong> ${metrics.sentenceCount}</p>
      <p><strong>Absätze:</strong> ${metrics.paragraphCount}</p>
      <p><strong>Durchschnittliche Satzlänge:</strong> ${formatNumber(metrics.avgSentenceLength)}</p>
      <p><strong>Lexikalische Vielfalt:</strong> ${formatNumber(metrics.lexicalDiversity * 100)}%</p>
      <p><strong>Level-Mix:</strong> Inhalt ${levelSelection.inhalt}, Aufbau ${levelSelection.aufbau}, Ausdruck ${levelSelection.ausdruck}</p>
      ${evaluation.summary ? `<p><strong>Zusammenfassung:</strong> ${escapeHtml(evaluation.summary)}</p>` : ""}
    </div>
  `;
}

function renderCards(criteria) {
  cardsContainer.innerHTML = criteria
    .map((criterion) => {
      const selectedLevel = LEVEL_CONFIG[criterion.level].label;
      const badgeClass = ["streng", "brutal"].includes(criterion.level) ? "badge warn" : "badge";

      return `
        <article class="feedback-card">
          <h4>${criterion.label} <span class="${badgeClass}">${selectedLevel}</span></h4>
          <p><strong>KI-Score (${selectedLevel}):</strong> ${formatGrade(criterion.score)}</p>
          <p><strong>Kontrastscore (moderat):</strong> ${formatGrade(criterion.moderateScore)} (${criterion.deltaText} durch Level)</p>
          <p><strong>Stärken:</strong> ${escapeHtml(criterion.strengths.join(" "))}</p>
          <p><strong>Baustellen:</strong> ${escapeHtml(criterion.gaps.join(" "))}</p>
          <p><strong>Nächster Schritt:</strong> ${escapeHtml(criterion.nextStep)}</p>
          <p>${escapeHtml(criterion.comment)}</p>
        </article>
      `;
    })
    .join("");
}

function addStudentRow(initialData = {}) {
  studentCounter += 1;
  const studentId = `student-${studentCounter}`;

  const row = document.createElement("article");
  row.className = "student-row";
  row.dataset.studentId = studentId;

  row.innerHTML = `
    <div class="student-head">
      <h3>Schüler*in ${studentCounter}</h3>
      <button type="button" class="ghost-btn student-remove">Entfernen</button>
    </div>
    <div class="field-grid student-grid">
      <label>
        Name
        <input type="text" class="student-name" placeholder="z. B. Lina Meier" value="${escapeHtml(initialData.name || "")}" />
      </label>
      <label>
        Datei (.txt/.pdf)
        <input type="file" class="student-file" accept=".txt,.pdf,application/pdf,text/plain" />
      </label>
      <button type="button" class="secondary-btn student-read-file">Datei einlesen</button>
    </div>
    <label>
      Aufsatztext
      <textarea class="student-text" placeholder="Aufsatztext hier einfügen...">${escapeHtml(initialData.text || "")}</textarea>
    </label>
    <p class="hint student-status">Bereit.</p>
  `;

  studentList.appendChild(row);
}

async function handleStudentListClick(event) {
  const target = event.target;
  const row = target.closest(".student-row");
  if (!row) return;

  if (target.classList.contains("student-remove")) {
    if (studentList.querySelectorAll(".student-row").length === 1) {
      row.querySelector(".student-name").value = "";
      row.querySelector(".student-text").value = "";
      row.querySelector(".student-status").textContent = "Leergezogen. Mindestens eine Zeile bleibt erhalten.";
      return;
    }

    row.remove();
    return;
  }

  if (target.classList.contains("student-read-file")) {
    const fileInputRow = row.querySelector(".student-file");
    const status = row.querySelector(".student-status");
    const textArea = row.querySelector(".student-text");
    const file = fileInputRow.files?.[0];

    if (!file) {
      status.textContent = "Bitte zuerst eine Datei auswählen.";
      return;
    }

    status.textContent = "Datei wird eingelesen...";

    try {
      const text = await readSupportedFile(file);
      textArea.value = text.trim();
      status.textContent = `Datei eingelesen (${countWords(text)} Wörter erkannt).`;
    } catch (error) {
      status.textContent = `Fehler: ${error.message}`;
    }
  }
}

async function evaluateClassroom() {
  const rows = [...studentList.querySelectorAll(".student-row")];
  const entries = rows
    .map((row, index) => {
      const name = row.querySelector(".student-name").value.trim() || `Schüler*in ${index + 1}`;
      const text = row.querySelector(".student-text").value.trim();
      return { row, name, text };
    })
    .filter((entry) => entry.text.length >= 200);

  if (!entries.length) {
    classStatus.textContent = "Bitte mindestens einen Aufsatz mit ausreichend Text (mind. ca. 200 Zeichen) eingeben.";
    return;
  }

  const levelSelection = getLevelSelection();
  const requestedEngine = engineModeInput.value;
  const results = [];

  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    const status = entry.row.querySelector(".student-status");
    classStatus.textContent = `Klassenkorrektur läuft: ${index + 1}/${entries.length} (${entry.name})`;
    status.textContent = "Analyse läuft...";

    try {
      const evaluation = await evaluateEssay(entry.text, levelSelection, requestedEngine, {
        scope: "class",
        studentName: entry.name,
      });

      const averageScore =
        evaluation.criteria.reduce((sum, criterion) => sum + criterion.score, 0) / evaluation.criteria.length;

      results.push({
        name: entry.name,
        source: evaluation.source,
        model: evaluation.model || null,
        summary: evaluation.summary || "",
        warning: evaluation.warning || "",
        text: entry.text,
        metrics: evaluation.metrics,
        criteria: evaluation.criteria,
        averageScore,
      });

      status.textContent = `Abgeschlossen (${formatGrade(averageScore)}).`;
    } catch (error) {
      status.textContent = `Fehler: ${error.message}`;
    }
  }

  if (!results.length) {
    classStatus.textContent = "Keine Analyse abgeschlossen. Bitte Eingaben prüfen.";
    return;
  }

  renderClassResults(results);

  latestClassReport = {
    createdAt: new Date(),
    levelSelection,
    requestedEngine,
    students: results,
  };

  downloadClassButton.disabled = false;
  classResultsSection.hidden = false;
  classStatus.textContent = `Klassenkorrektur abgeschlossen (${results.length} Aufsätze analysiert).`;
}

function renderClassResults(results) {
  const header = `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Inhalt</th>
          <th>Aufbau</th>
          <th>Ausdruck</th>
          <th>Durchschnitt</th>
          <th>Engine</th>
        </tr>
      </thead>
      <tbody>
        ${results
          .map((result) => {
            const inhalt = result.criteria.find((criterion) => criterion.id === "inhalt")?.score || 0;
            const aufbau = result.criteria.find((criterion) => criterion.id === "aufbau")?.score || 0;
            const ausdruck = result.criteria.find((criterion) => criterion.id === "ausdruck")?.score || 0;
            return `
              <tr>
                <td>${escapeHtml(result.name)}</td>
                <td>${formatGrade(inhalt)}</td>
                <td>${formatGrade(aufbau)}</td>
                <td>${formatGrade(ausdruck)}</td>
                <td><strong>${formatGrade(result.averageScore)}</strong></td>
                <td>${result.source === "api" ? "API" : "Lokal"}</td>
              </tr>
            `;
          })
          .join("")}
      </tbody>
    </table>
  `;

  classTableContainer.innerHTML = header;

  classDetailsContainer.innerHTML = results
    .map((result) => {
      const criteriaBlock = result.criteria
        .map(
          (criterion) => `
            <p><strong>${criterion.label} (${criterion.level}):</strong> ${formatGrade(criterion.score)} | ${escapeHtml(
              criterion.nextStep,
            )}</p>
          `,
        )
        .join("");

      return `
        <article class="feedback-card">
          <h4>${escapeHtml(result.name)} <span class="badge">${result.source === "api" ? "API" : "Lokal"}</span></h4>
          <p><strong>Durchschnitt:</strong> ${formatGrade(result.averageScore)}</p>
          <p><strong>Wörter:</strong> ${result.metrics.wordCount} | <strong>Sätze:</strong> ${result.metrics.sentenceCount}</p>
          ${result.warning ? `<p><strong>Hinweis:</strong> ${escapeHtml(result.warning)}</p>` : ""}
          ${criteriaBlock}
        </article>
      `;
    })
    .join("");
}

function getLevelSelection() {
  return {
    inhalt: document.getElementById("level-inhalt").value,
    aufbau: document.getElementById("level-aufbau").value,
    ausdruck: document.getElementById("level-ausdruck").value,
  };
}

function analyzeContent(text, metrics) {
  let score = 3.0;
  const strengths = [];
  const gaps = [];

  const thesisSignals = countMatches(text, /(ich meine|meiner ansicht|ich finde|these|position|ich behaupte)/gi);
  const argumentSignals = countMatches(text, /(weil|daher|deshalb|folglich|somit|denn|jedoch|allerdings)/gi);
  const exampleSignals = countMatches(text, /(zum beispiel|beispielsweise|etwa|konkret|etwa dann)/gi);
  const reflectionSignals = countMatches(text, /(warum|wieso|inwiefern|frage|problem)/gi);

  if (metrics.wordCount >= 350) {
    score += 0.5;
    strengths.push("Der Text bietet eine tragfähige inhaltliche Breite.");
  } else if (metrics.wordCount < 220) {
    score -= 0.7;
    gaps.push("Der Aufsatz ist knapp; zentrale Gedanken bleiben unterentwickelt.");
  }

  if (thesisSignals >= 1) {
    score += 0.45;
    strengths.push("Eine eigene Position ist erkennbar.");
  } else {
    score -= 0.45;
    gaps.push("Eine klar formulierte Leitthese fehlt.");
  }

  if (argumentSignals >= 6) {
    score += 0.55;
    strengths.push("Die Argumentation nutzt kausale und kontrastive Verknüpfungen.");
  } else {
    score -= 0.35;
    gaps.push("Die Begründung wirkt noch zu behauptend statt argumentativ.");
  }

  if (exampleSignals >= 2) {
    score += 0.35;
    strengths.push("Beispiele stützen die Aussagen nachvollziehbar.");
  } else {
    gaps.push("Konkrete Beispiele fehlen oder bleiben zu allgemein.");
  }

  if (reflectionSignals >= 3) {
    score += 0.25;
    strengths.push("Gedankliche Vertiefung ist vorhanden.");
  }

  return {
    baseScore: clamp(score, 1, 6),
    strengths: ensureList(strengths),
    gaps: ensureList(gaps),
    recommendation:
      "Verdichte die Kernaussage in 1-2 Sätzen und stütze jeden Hauptgedanken mit einem konkreten Beispiel.",
  };
}

function analyzeStructure(text, metrics) {
  let score = 3.0;
  const strengths = [];
  const gaps = [];
  const paragraphs = splitParagraphs(text);

  const introSignals = countMatches(
    paragraphs[0] || "",
    /(zunächst|einleitend|zu beginn|ausgangsfrage|im folgegenden|im folgenden)/gi,
  );
  const conclusionSignals = countMatches(
    paragraphs.at(-1) || "",
    /(abschließend|fazit|zusammenfassend|insgesamt|daher|schließlich)/gi,
  );
  const transitionSignals = countMatches(text, /(zudem|außerdem|hingegen|dennoch|dagegen|anschließend|erstens|zweitens)/gi);

  if (paragraphs.length >= 4) {
    score += 0.45;
    strengths.push("Die Absatzstruktur schafft eine erkennbare Gliederung.");
  } else {
    score -= 0.5;
    gaps.push("Die Gliederung ist zu flach; setze klarere Absätze.");
  }

  if (introSignals >= 1) {
    score += 0.2;
    strengths.push("Ein Einstieg mit erkennbarer Hinführung ist vorhanden.");
  } else {
    gaps.push("Ein strukturierender Einstieg fehlt.");
  }

  if (conclusionSignals >= 1) {
    score += 0.3;
    strengths.push("Der Schluss rahmt den Text nachvollziehbar ab.");
  } else {
    score -= 0.3;
    gaps.push("Der Schluss wirkt offen oder abrupt.");
  }

  if (transitionSignals >= 4) {
    score += 0.4;
    strengths.push("Übergänge zwischen Gedankenschritten sind sichtbar.");
  } else {
    score -= 0.25;
    gaps.push("Zwischen den Abschnitten fehlen klare Übergänge.");
  }

  if (metrics.sentenceVariance < 4) {
    score -= 0.2;
    gaps.push("Die Satzlängen wirken gleichförmig; Rhythmus und Strukturkraft leiden.");
  }

  return {
    baseScore: clamp(score, 1, 6),
    strengths: ensureList(strengths),
    gaps: ensureList(gaps),
    recommendation:
      "Baue eine klare Dreiteilung (Einleitung-Hauptteil-Schluss) mit sichtbaren Übergangssignalen aus.",
  };
}

function analyzeExpression(text, metrics) {
  let score = 3.0;
  const strengths = [];
  const gaps = [];

  const longSentences = metrics.sentenceLengths.filter((length) => length >= 28).length;
  const shortSentences = metrics.sentenceLengths.filter((length) => length <= 7).length;
  const fillerSignals = countMatches(text, /(irgendwie|halt|einfach|total|mega|sozusagen|quasi)/gi);
  const lexicalDiversity = metrics.lexicalDiversity;

  if (lexicalDiversity >= 0.47) {
    score += 0.55;
    strengths.push("Der Wortschatz wirkt differenziert und variantenreich.");
  } else if (lexicalDiversity < 0.33) {
    score -= 0.55;
    gaps.push("Der Wortschatz wiederholt sich stark.");
  }

  if (longSentences > 0 && shortSentences > 0) {
    score += 0.35;
    strengths.push("Die Satzlängen variieren und erzeugen sprachlichen Rhythmus.");
  } else {
    score -= 0.25;
    gaps.push("Mehr Variation im Satzbau würde den Ausdruck lebendiger machen.");
  }

  if (fillerSignals >= 3) {
    score -= 0.35;
    gaps.push("Umgangssprachliche Füllwörter schwächen die Präzision.");
  } else {
    strengths.push("Der Stil bleibt überwiegend sachlich und fokussiert.");
  }

  if (metrics.avgSentenceLength > 26) {
    score -= 0.2;
    gaps.push("Sehr lange Satzperioden mindern stellenweise die Klarheit.");
  } else if (metrics.avgSentenceLength >= 12 && metrics.avgSentenceLength <= 22) {
    score += 0.2;
    strengths.push("Die durchschnittliche Satzlänge unterstützt die Lesbarkeit.");
  }

  return {
    baseScore: clamp(score, 1, 6),
    strengths: ensureList(strengths),
    gaps: ensureList(gaps),
    recommendation:
      "Streiche Füllwörter, schärfe Verben und verkürze überlange Sätze zugunsten klarer Aussagekraft.",
  };
}

function applyLevel(baseAnalysis, levelKey) {
  const config = LEVEL_CONFIG[levelKey] || LEVEL_CONFIG.moderat;
  const adjusted = clamp(roundQuarter(baseAnalysis.baseScore + config.scoreOffset), 1, 6);
  const delta = adjusted - roundQuarter(baseAnalysis.baseScore);
  const deltaText = delta === 0 ? "0" : delta > 0 ? `+${delta.toFixed(2)}` : delta.toFixed(2);

  const comment = [
    config.opener,
    config.focus,
    `Stärken: ${baseAnalysis.strengths.join(" ")}`,
    `Hauptbaustellen: ${baseAnalysis.gaps.join(" ")}`,
    `Nächster Schritt: ${baseAnalysis.recommendation}`,
    config.action,
  ].join(" ");

  return {
    score: adjusted,
    deltaText,
    comment,
  };
}

function computeGlobalMetrics(text) {
  const words = getWords(text);
  const sentences = getSentences(text);
  const paragraphs = splitParagraphs(text);

  const sentenceLengths = sentences.map((sentence) => countWords(sentence)).filter(Boolean);
  const avgSentenceLength = sentenceLengths.length
    ? sentenceLengths.reduce((acc, value) => acc + value, 0) / sentenceLengths.length
    : 0;

  const variance = sentenceLengths.length
    ? Math.sqrt(
        sentenceLengths.reduce((acc, value) => acc + (value - avgSentenceLength) ** 2, 0) /
          sentenceLengths.length,
      )
    : 0;

  const uniqueWords = new Set(words.map((word) => word.toLowerCase()));
  const lexicalDiversity = words.length ? uniqueWords.size / words.length : 0;

  return {
    wordCount: words.length,
    sentenceCount: sentences.length,
    paragraphCount: paragraphs.length,
    avgSentenceLength,
    sentenceVariance: variance,
    lexicalDiversity,
    sentenceLengths,
  };
}

function splitParagraphs(text) {
  return text
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function getWords(text) {
  return text.match(/[A-Za-zÀ-ÖØ-öø-ÿÄÖÜäöüß]+/g) || [];
}

function getSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function countWords(text) {
  return getWords(text).length;
}

function countMatches(text, regex) {
  return (text.match(regex) || []).length;
}

function ensureList(items) {
  if (items.length) return items;
  return ["Kein klarer Marker erkannt; manuelle Prüfung ergänzen."];
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function roundQuarter(value) {
  return Math.round(value * 4) / 4;
}

function formatGrade(value) {
  return Number(value).toFixed(2).replace(/\.00$/, "").replace(/0$/, "").replace(".", ",");
}

function formatNumber(value) {
  return Number(value).toFixed(2).replace(".", ",");
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function downloadSingleReport() {
  if (!latestAiReport) return;

  const lines = [];
  lines.push("# KI-Korrekturbericht (Einzelmodus)");
  lines.push("");
  lines.push(`- Datum: ${latestAiReport.createdAt.toLocaleString("de-CH")}`);
  lines.push(`- Engine: ${latestAiReport.source}${latestAiReport.model ? ` (${latestAiReport.model})` : ""}`);
  lines.push(`- Wörter: ${latestAiReport.metrics.wordCount}`);
  lines.push(`- Sätze: ${latestAiReport.metrics.sentenceCount}`);
  lines.push(`- Absätze: ${latestAiReport.metrics.paragraphCount}`);
  if (latestAiReport.warning) lines.push(`- Hinweis: ${latestAiReport.warning}`);
  lines.push("");

  latestAiReport.criteria.forEach((criterion) => {
    lines.push(`## ${criterion.label}`);
    lines.push(`- Level: ${criterion.level}`);
    lines.push(`- KI-Score: ${formatGrade(criterion.score)}`);
    lines.push(`- Kontrastscore (moderat): ${formatGrade(criterion.moderateScore)}`);
    lines.push(`- Stärken: ${criterion.strengths.join(" ")}`);
    lines.push(`- Baustellen: ${criterion.gaps.join(" ")}`);
    lines.push(`- Nächster Schritt: ${criterion.nextStep}`);
    lines.push(`- Kommentar: ${criterion.comment}`);
    lines.push("");
  });

  lines.push("## Aufsatztext");
  lines.push(latestAiReport.text);

  triggerDownload("ki-korrekturbericht.md", lines.join("\n"));
}

function downloadClassReport() {
  if (!latestClassReport) return;

  const lines = [];
  lines.push("# Klassenbericht KI-Korrektur");
  lines.push("");
  lines.push(`- Datum: ${latestClassReport.createdAt.toLocaleString("de-CH")}`);
  lines.push(`- Engine-Wunsch: ${latestClassReport.requestedEngine}`);
  lines.push(
    `- Levels: Inhalt ${latestClassReport.levelSelection.inhalt}, Aufbau ${latestClassReport.levelSelection.aufbau}, Ausdruck ${latestClassReport.levelSelection.ausdruck}`,
  );
  lines.push("");

  latestClassReport.students.forEach((student) => {
    lines.push(`## ${student.name}`);
    lines.push(`- Engine: ${student.source}${student.model ? ` (${student.model})` : ""}`);
    lines.push(`- Durchschnitt: ${formatGrade(student.averageScore)}`);
    lines.push(`- Wörter: ${student.metrics.wordCount}`);

    student.criteria.forEach((criterion) => {
      lines.push(`  - ${criterion.label} (${criterion.level}): ${formatGrade(criterion.score)}`);
      lines.push(`    Nächster Schritt: ${criterion.nextStep}`);
    });

    lines.push("");
  });

  triggerDownload("klassenbericht-ki-korrektur.md", lines.join("\n"));
}

function triggerDownload(fileName, content) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
