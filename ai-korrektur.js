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
  {
    id: "inhalt",
    label: "Inhalt",
    weight: 0.4,
    guide: "These, Argumenttiefe, Beispiele, gedankliche Stimmigkeit",
  },
  {
    id: "aufbau",
    label: "Aufbau",
    weight: 0.2,
    guide: "Einleitung-Hauptteil-Schluss, rote Linie, Übergänge",
  },
  {
    id: "ausdruck",
    label: "Ausdruck",
    weight: 0.2,
    guide: "Wortwahl, Satzbau, Präzision, Stilniveau",
  },
];

const ORTHOGRAPHY = {
  id: "sprachliche-korrektheit",
  label: "Sprachliche Korrektheit (Excel)",
  weight: 0.2,
};

const LANGUAGE_TABLES = {
  "1": [
    { errorsPer200: 1, grade: 6 },
    { errorsPer200: 1.75, grade: 5.75 },
    { errorsPer200: 2.5, grade: 5.5 },
    { errorsPer200: 3.25, grade: 5.25 },
    { errorsPer200: 4, grade: 5 },
    { errorsPer200: 4.75, grade: 4.75 },
    { errorsPer200: 5.5, grade: 4.5 },
    { errorsPer200: 6.25, grade: 4.25 },
    { errorsPer200: 7, grade: 4 },
    { errorsPer200: 7.75, grade: 3.75 },
    { errorsPer200: 8.5, grade: 3.5 },
    { errorsPer200: 9.25, grade: 3.25 },
    { errorsPer200: 10, grade: 3 },
    { errorsPer200: 10.75, grade: 2.75 },
    { errorsPer200: 11.5, grade: 2.5 },
    { errorsPer200: 12.25, grade: 2.25 },
    { errorsPer200: 13, grade: 2 },
    { errorsPer200: 13.75, grade: 1.75 },
    { errorsPer200: 14.5, grade: 1.5 },
    { errorsPer200: 15.25, grade: 1.25 },
    { errorsPer200: 16, grade: 1 },
  ],
  "2": [
    { errorsPer200: 1, grade: 6 },
    { errorsPer200: 1.625, grade: 5.75 },
    { errorsPer200: 2.25, grade: 5.5 },
    { errorsPer200: 2.875, grade: 5.25 },
    { errorsPer200: 3.5, grade: 5 },
    { errorsPer200: 4.125, grade: 4.75 },
    { errorsPer200: 4.75, grade: 4.5 },
    { errorsPer200: 5.375, grade: 4.25 },
    { errorsPer200: 6, grade: 4 },
    { errorsPer200: 6.625, grade: 3.75 },
    { errorsPer200: 7.25, grade: 3.5 },
    { errorsPer200: 7.875, grade: 3.25 },
    { errorsPer200: 8.5, grade: 3 },
    { errorsPer200: 9.125, grade: 2.75 },
    { errorsPer200: 9.75, grade: 2.5 },
    { errorsPer200: 10.375, grade: 2.25 },
    { errorsPer200: 11, grade: 2 },
    { errorsPer200: 11.625, grade: 1.75 },
    { errorsPer200: 12.25, grade: 1.5 },
    { errorsPer200: 12.875, grade: 1.25 },
    { errorsPer200: 13.5, grade: 1 },
  ],
  "3": [
    { errorsPer200: 1, grade: 6 },
    { errorsPer200: 1.5, grade: 5.75 },
    { errorsPer200: 2, grade: 5.5 },
    { errorsPer200: 2.5, grade: 5.25 },
    { errorsPer200: 3, grade: 5 },
    { errorsPer200: 3.5, grade: 4.75 },
    { errorsPer200: 4, grade: 4.5 },
    { errorsPer200: 4.5, grade: 4.25 },
    { errorsPer200: 5, grade: 4 },
    { errorsPer200: 5.5, grade: 3.75 },
    { errorsPer200: 6, grade: 3.5 },
    { errorsPer200: 6.5, grade: 3.25 },
    { errorsPer200: 7, grade: 3 },
    { errorsPer200: 7.5, grade: 2.75 },
    { errorsPer200: 8, grade: 2.5 },
    { errorsPer200: 8.5, grade: 2.25 },
    { errorsPer200: 9, grade: 2 },
    { errorsPer200: 9.5, grade: 1.75 },
    { errorsPer200: 10, grade: 1.5 },
    { errorsPer200: 10.5, grade: 1.25 },
    { errorsPer200: 11, grade: 1 },
  ],
  "4": [
    { errorsPer200: 1, grade: 6 },
    { errorsPer200: 1.375, grade: 5.75 },
    { errorsPer200: 1.75, grade: 5.5 },
    { errorsPer200: 2.125, grade: 5.25 },
    { errorsPer200: 2.5, grade: 5 },
    { errorsPer200: 2.875, grade: 4.75 },
    { errorsPer200: 3.25, grade: 4.5 },
    { errorsPer200: 3.625, grade: 4.25 },
    { errorsPer200: 4, grade: 4 },
    { errorsPer200: 4.375, grade: 3.75 },
    { errorsPer200: 4.75, grade: 3.5 },
    { errorsPer200: 5.125, grade: 3.25 },
    { errorsPer200: 5.5, grade: 3 },
    { errorsPer200: 5.875, grade: 2.75 },
    { errorsPer200: 6.25, grade: 2.5 },
    { errorsPer200: 6.625, grade: 2.25 },
    { errorsPer200: 7, grade: 2 },
    { errorsPer200: 7.375, grade: 1.75 },
    { errorsPer200: 7.75, grade: 1.5 },
    { errorsPer200: 8.125, grade: 1.25 },
    { errorsPer200: 8.5, grade: 1 },
  ],
  "1_m_KP": [
    { errorsPer200: 0.5, grade: 6 },
    { errorsPer200: 1.125, grade: 5.75 },
    { errorsPer200: 1.75, grade: 5.5 },
    { errorsPer200: 2.375, grade: 5.25 },
    { errorsPer200: 3, grade: 5 },
    { errorsPer200: 3.625, grade: 4.75 },
    { errorsPer200: 4.25, grade: 4.5 },
    { errorsPer200: 4.875, grade: 4.25 },
    { errorsPer200: 5.5, grade: 4 },
    { errorsPer200: 6.125, grade: 3.75 },
    { errorsPer200: 6.75, grade: 3.5 },
    { errorsPer200: 7.375, grade: 3.25 },
    { errorsPer200: 8, grade: 3 },
    { errorsPer200: 8.625, grade: 2.75 },
    { errorsPer200: 9.25, grade: 2.5 },
    { errorsPer200: 9.875, grade: 2.25 },
    { errorsPer200: 10.5, grade: 2 },
    { errorsPer200: 11.125, grade: 1.75 },
    { errorsPer200: 11.75, grade: 1.5 },
    { errorsPer200: 12.375, grade: 1.25 },
    { errorsPer200: 13, grade: 1 },
  ],
  "2_m_KP": [
    { errorsPer200: 0.5, grade: 6 },
    { errorsPer200: 1, grade: 5.75 },
    { errorsPer200: 1.5, grade: 5.5 },
    { errorsPer200: 2, grade: 5.25 },
    { errorsPer200: 2.5, grade: 5 },
    { errorsPer200: 3, grade: 4.75 },
    { errorsPer200: 3.5, grade: 4.5 },
    { errorsPer200: 4, grade: 4.25 },
    { errorsPer200: 4.5, grade: 4 },
    { errorsPer200: 5, grade: 3.75 },
    { errorsPer200: 5.5, grade: 3.5 },
    { errorsPer200: 6, grade: 3.25 },
    { errorsPer200: 6.5, grade: 3 },
    { errorsPer200: 7, grade: 2.75 },
    { errorsPer200: 7.5, grade: 2.5 },
    { errorsPer200: 8, grade: 2.25 },
    { errorsPer200: 8.5, grade: 2 },
    { errorsPer200: 9, grade: 1.75 },
    { errorsPer200: 9.5, grade: 1.5 },
    { errorsPer200: 10, grade: 1.25 },
    { errorsPer200: 10.5, grade: 1 },
  ],
  "3_m_KP": [
    { errorsPer200: 0.5, grade: 6 },
    { errorsPer200: 0.875, grade: 5.75 },
    { errorsPer200: 1.25, grade: 5.5 },
    { errorsPer200: 1.625, grade: 5.25 },
    { errorsPer200: 2, grade: 5 },
    { errorsPer200: 2.375, grade: 4.75 },
    { errorsPer200: 2.75, grade: 4.5 },
    { errorsPer200: 3.125, grade: 4.25 },
    { errorsPer200: 3.5, grade: 4 },
    { errorsPer200: 3.875, grade: 3.75 },
    { errorsPer200: 4.25, grade: 3.5 },
    { errorsPer200: 4.625, grade: 3.25 },
    { errorsPer200: 5, grade: 3 },
    { errorsPer200: 5.375, grade: 2.75 },
    { errorsPer200: 5.75, grade: 2.5 },
    { errorsPer200: 6.125, grade: 2.25 },
    { errorsPer200: 6.5, grade: 2 },
    { errorsPer200: 6.875, grade: 1.75 },
    { errorsPer200: 7.25, grade: 1.5 },
    { errorsPer200: 7.625, grade: 1.25 },
    { errorsPer200: 8, grade: 1 },
  ],
  "4_m_KP": [
    { errorsPer200: 0.5, grade: 6 },
    { errorsPer200: 0.75, grade: 5.75 },
    { errorsPer200: 1, grade: 5.5 },
    { errorsPer200: 1.25, grade: 5.25 },
    { errorsPer200: 1.5, grade: 5 },
    { errorsPer200: 1.75, grade: 4.75 },
    { errorsPer200: 2, grade: 4.5 },
    { errorsPer200: 2.25, grade: 4.25 },
    { errorsPer200: 2.5, grade: 4 },
    { errorsPer200: 2.75, grade: 3.75 },
    { errorsPer200: 3, grade: 3.5 },
    { errorsPer200: 3.25, grade: 3.25 },
    { errorsPer200: 3.5, grade: 3 },
    { errorsPer200: 3.75, grade: 2.75 },
    { errorsPer200: 4, grade: 2.5 },
    { errorsPer200: 4.25, grade: 2.25 },
    { errorsPer200: 4.5, grade: 2 },
    { errorsPer200: 4.75, grade: 1.75 },
    { errorsPer200: 5, grade: 1.5 },
    { errorsPer200: 5.25, grade: 1.25 },
    { errorsPer200: 5.5, grade: 1 },
  ],
};

const ARGUMENTATION_BENCHMARK = [
  {
    id: "these",
    label: "Klare These",
    patterns: [/\bthese\b/i, /\bposition\b/i, /\bstandpunkt\b/i, /\bkernaussage\b/i],
  },
  {
    id: "begruendung",
    label: "Begründungslogik",
    patterns: [/\bweil\b/i, /\bdaher\b/i, /\bdeshalb\b/i, /\bsomit\b/i, /\bfolglich\b/i, /\bdenn\b/i],
  },
  {
    id: "beleg",
    label: "Textbeleg / Beispiel",
    patterns: [/\bbeispiel\b/i, /\bstelle\b/i, /\bzitat\b/i, /\babsatz\b/i, /\bim text\b/i, /„|“|\"|«|»/],
  },
  {
    id: "einwand",
    label: "Einwand / Gegenposition",
    patterns: [/\bjedoch\b/i, /\ballerdings\b/i, /\bhingegen\b/i, /\bandererseits\b/i, /\bgegenargument\b/i],
  },
  {
    id: "entkraeftung",
    label: "Entkräftung / Abwägung",
    patterns: [/\bdennoch\b/i, /\btrotzdem\b/i, /\büberwiegt\b/i, /\bgewichtet\b/i, /\babwäg/i],
  },
  {
    id: "schluss",
    label: "Schlussfolgerung",
    patterns: [/\binsgesamt\b/i, /\babschließend\b/i, /\bfazit\b/i, /\bschluss\b/i],
  },
  {
    id: "logik",
    label: "Logische Kohärenz",
    patterns: [/\bwiderspruch\b/i, /\bstimmig\b/i, /\broter faden\b/i, /\bfolgerichtig\b/i],
  },
  {
    id: "fairness",
    label: "Faire, kriterienspezifische Sprache",
    patterns: [/\bkriterium\b/i, /\bdifferenziert\b/i, /\bstärke\b/i, /\bschwäche\b/i, /\bangemessen\b/i],
  },
];

const API_ENDPOINT = "/api/ai-review";
const API_HEALTH_ENDPOINT = "/api/health";
const API_KEY_STORAGE_KEY = "aufsatzkorrekturtrainer_api_key";
const PDF_CDN_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.min.js";
const PDF_CDN_WORKER_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.js";
const PDF_LOCAL_URL = "/vendor/pdf.min.js";
const PDF_LOCAL_WORKER_URL = "/vendor/pdf.worker.min.js";

const aiForm = document.getElementById("ai-form");
const runtimeModeInput = document.getElementById("runtime-mode");
const runtimeStatus = document.getElementById("runtime-status");
const engineModeInput = document.getElementById("engine-mode");
const apiKeyInput = document.getElementById("api-key-input");
const saveApiKeyButton = document.getElementById("save-api-key");
const clearApiKeyButton = document.getElementById("clear-api-key");
const apiKeyStatus = document.getElementById("api-key-status");
const apiStatus = document.getElementById("api-status");
const fileInput = document.getElementById("essay-file");
const parseButton = document.getElementById("parse-file");
const parseStatus = document.getElementById("parse-status");
const essayInput = document.getElementById("essay-input");
const orthLevelInput = document.getElementById("orth-level");
const orthErrorsInput = document.getElementById("orth-errors");
const orthWordsInput = document.getElementById("orth-words");
const orthCalculationOutput = document.getElementById("orth-calculation");
const orthCommentInput = document.getElementById("orth-comment");
const manualCriteriaContainer = document.getElementById("manual-criteria");
const saveManualButton = document.getElementById("save-manual");
const manualStatus = document.getElementById("manual-status");
const manualSummary = document.getElementById("manual-summary");
const benchmarkSummary = document.getElementById("benchmark-summary");
const partnerHeading = document.getElementById("partner-heading");
const manualPartnerFeedback = document.getElementById("manual-partner-feedback");
const runAiButton = document.getElementById("run-ai");
const toggleApiForEssayButton = document.getElementById("toggle-api-for-essay");
const essayApiStatus = document.getElementById("essay-api-status");
const resultsSection = document.getElementById("ai-results");
const cardsContainer = document.getElementById("ai-cards");
const metricsContainer = document.getElementById("ai-metrics");
const comparisonBlock = document.getElementById("comparison-block");
const comparisonTable = document.getElementById("comparison-table");
const comparisonFeedback = document.getElementById("comparison-feedback");
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
let manualEvaluation = null;
let manualDirty = true;
let studentCounter = 0;
let runtimeMode = "local";
let pdfLibrarySource = null;
let apiForCurrentEssayEnabled = false;
let apiHealth = {
  reachable: false,
  configured: false,
  model: null,
};

parseButton.addEventListener("click", parseSingleFile);
aiForm.addEventListener("submit", runAiCorrection);
saveManualButton.addEventListener("click", saveManualEvaluation);
downloadButton.addEventListener("click", downloadSingleReport);
essayInput.addEventListener("input", markManualAsDirty);
runtimeModeInput.addEventListener("change", handleRuntimeModeChange);
saveApiKeyButton.addEventListener("click", saveApiKeyFromInput);
clearApiKeyButton.addEventListener("click", clearSavedApiKey);
toggleApiForEssayButton.addEventListener("click", toggleApiForCurrentEssay);
manualCriteriaContainer.addEventListener("input", markManualFormChanged);
manualCriteriaContainer.addEventListener("change", markManualFormChanged);
[orthLevelInput, orthErrorsInput, orthWordsInput, orthCommentInput].forEach((field) => {
  field.addEventListener("input", () => {
    updateOrthographyCalculation();
    markManualFormChanged();
  });
  field.addEventListener("change", () => {
    updateOrthographyCalculation();
    markManualFormChanged();
  });
});

addStudentButton.addEventListener("click", () => addStudentRow());
evaluateClassButton.addEventListener("click", evaluateClassroom);
downloadClassButton.addEventListener("click", downloadClassReport);
studentList.addEventListener("click", handleStudentListClick);

engineModeInput.addEventListener("change", () => {
  if (runtimeMode === "local" && engineModeInput.value === "api") {
    engineModeInput.value = "local";
    parseStatus.textContent = "Im Lokalmodus ist nur lokale KI erlaubt.";
    return;
  }

  if (engineModeInput.value === "api" && (!apiHealth.reachable || !apiHealth.configured)) {
    parseStatus.textContent = "API-Modus gewählt, aber nicht bereit. Es wird bei Bedarf lokal analysiert.";
  }
});

init();

async function init() {
  buildManualCriteriaCards();
  loadSavedApiKeyIntoInput();
  applyRuntimeMode(runtimeModeInput.value);
  setEssayApiToggle(false);
  updateOrthographyCalculation();
  addStudentRow();
  if (runtimeMode === "internet") {
    await checkApiHealth();
  }
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

    if (apiHealth.reachable && (apiHealth.configured || hasClientApiKey())) {
      apiStatus.textContent = `API bereit (${apiHealth.model || "Modell konfiguriert"}).`;
    } else if (apiHealth.reachable) {
      apiStatus.textContent =
        "API-Server erreichbar, aber kein API-Key gesetzt. Hinterlege den Schlüssel im Feld oben oder in .env.";
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

function loadSavedApiKeyIntoInput() {
  try {
    const stored = localStorage.getItem(API_KEY_STORAGE_KEY) || "";
    if (stored) {
      apiKeyInput.value = stored;
      apiKeyStatus.textContent = "API-Key aus lokalem Speicher geladen.";
      return;
    }
  } catch {
    // Ignore storage issues and continue with empty key.
  }
  apiKeyStatus.textContent = "Kein API-Key gespeichert.";
}

function saveApiKeyFromInput() {
  const key = apiKeyInput.value.trim();
  if (!key) {
    apiKeyStatus.textContent = "Bitte zuerst einen API-Key eingeben.";
    return;
  }

  try {
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
    apiKeyStatus.textContent = "API-Key lokal gespeichert.";
  } catch {
    apiKeyStatus.textContent = "API-Key konnte nicht gespeichert werden (Browser-Speicher blockiert).";
  }

  if (runtimeMode === "internet") {
    checkApiHealth();
  }
}

function clearSavedApiKey() {
  apiKeyInput.value = "";
  try {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  } catch {
    // Ignore storage issues.
  }
  apiKeyStatus.textContent = "Gespeicherter API-Key wurde gelöscht.";
  if (runtimeMode === "internet") {
    checkApiHealth();
  }
}

function getClientApiKey() {
  return (apiKeyInput.value || "").trim();
}

function hasClientApiKey() {
  return Boolean(getClientApiKey());
}

async function handleRuntimeModeChange() {
  applyRuntimeMode(runtimeModeInput.value);
  if (runtimeMode === "internet") {
    await checkApiHealth();
  } else {
    apiStatus.textContent =
      "Im Lokalmodus werden keine externen KI-Endpunkte aufgerufen. API bleibt deaktiviert.";
  }
}

function applyRuntimeMode(mode) {
  runtimeMode = mode === "internet" ? "internet" : "local";

  const apiOption = engineModeInput.querySelector('option[value="api"]');
  if (runtimeMode === "local") {
    if (apiOption) apiOption.disabled = true;
    engineModeInput.value = "local";
    setEssayApiToggle(false);
    toggleApiForEssayButton.disabled = true;
    studentList.querySelectorAll(".student-toggle-api").forEach((button) => {
      button.disabled = true;
      setStudentApiToggle(button, false);
    });
    apiStatus.textContent =
      "Im Lokalmodus sind externe API-Aufrufe gesperrt. Für reine Offline-Nutzung bleibt die lokale KI aktiv.";
    runtimeStatus.textContent =
      "Lokalmodus aktiv: keine externen KI-Aufrufe. Verarbeitung bleibt lokal (heuristisch oder lokaler Endpoint).";
  } else {
    if (apiOption) apiOption.disabled = false;
    toggleApiForEssayButton.disabled = false;
    studentList.querySelectorAll(".student-toggle-api").forEach((button) => {
      button.disabled = false;
    });
    runtimeStatus.textContent =
      "Internetmodus aktiv: API-KI und externe Bibliotheken sind erlaubt.";
  }
}

function toggleApiForCurrentEssay() {
  if (runtimeMode !== "internet") {
    setEssayApiToggle(false);
    parseStatus.textContent = "API-KI kann nur im Internetmodus aktiviert werden.";
    return;
  }
  setEssayApiToggle(!apiForCurrentEssayEnabled);
}

function setEssayApiToggle(enabled) {
  apiForCurrentEssayEnabled = Boolean(enabled);
  toggleApiForEssayButton.textContent = `API-KI für diesen Aufsatz: ${
    apiForCurrentEssayEnabled ? "AN" : "AUS"
  }`;
  toggleApiForEssayButton.classList.toggle("primary-btn", apiForCurrentEssayEnabled);
  toggleApiForEssayButton.classList.toggle("secondary-btn", !apiForCurrentEssayEnabled);
  essayApiStatus.textContent = apiForCurrentEssayEnabled
    ? "Für diesen Aufsatz wird beim Start die externe API-KI genutzt (falls API erreichbar und Key vorhanden)."
    : "Diese Aufsatzkorrektur läuft aktuell ohne externen API-Aufruf.";
}

function setStudentApiToggle(button, enabled) {
  const on = Boolean(enabled);
  button.dataset.apiEnabled = on ? "1" : "0";
  button.classList.toggle("primary-btn", on);
  button.classList.toggle("secondary-btn", !on);
  button.textContent = `API-KI: ${on ? "AN" : "AUS"}`;
}

function buildManualCriteriaCards() {
  const gradeOptions = buildGradeOptions();
  manualCriteriaContainer.innerHTML = CRITERIA.map(
    (criterion) => `
      <article class="criterion">
        <div class="criterion-head">
          <h3>${criterion.label}</h3>
          <span class="weight">Gewicht: ${criterion.weight}</span>
        </div>
        <p class="hint">${criterion.guide}</p>
        <label>
          Teilnote ${criterion.label}
          <select data-manual-grade="${criterion.id}">
            <option value="">Bitte wählen</option>
            ${gradeOptions}
          </select>
        </label>
        <label>
          Begründung (mind. 80 Zeichen)
          <textarea
            data-manual-comment="${criterion.id}"
            minlength="80"
            placeholder="Begründe die Teilnote mit konkreten Beobachtungen aus dem Aufsatz."
          ></textarea>
        </label>
      </article>
    `,
  ).join("");
}

function buildGradeOptions() {
  const options = [];
  for (let value = 6; value >= 1; value -= 0.25) {
    const label = formatGrade(value);
    options.push(`<option value="${value.toFixed(2)}">${label}</option>`);
  }
  return options.join("");
}

function calculateOrthographyGrade(level, errors, words) {
  if (!level || !LANGUAGE_TABLES[level] || !Number.isFinite(errors) || !Number.isFinite(words) || words <= 0) {
    return null;
  }

  const errorsPer200 = (errors / words) * 200;
  const table = LANGUAGE_TABLES[level];
  const match = table.find((row) => errorsPer200 <= row.errorsPer200);
  const row = match || table[table.length - 1];

  return {
    errorsPer200,
    grade: row.grade,
  };
}

function updateOrthographyCalculation() {
  const level = orthLevelInput.value;
  const errors = Number.parseFloat(orthErrorsInput.value);
  const words = Number.parseFloat(orthWordsInput.value);
  const result = calculateOrthographyGrade(level, errors, words);

  if (!result) {
    orthCalculationOutput.textContent = "Fehler pro 200 Wörter: – | Teilnote sprachliche Korrektheit: –";
    return null;
  }

  orthCalculationOutput.textContent = `Fehler pro 200 Wörter: ${result.errorsPer200
    .toFixed(2)
    .replace(".", ",")} | Teilnote sprachliche Korrektheit: ${formatGrade(result.grade)}`;
  return result;
}

function markManualAsDirty() {
  setEssayApiToggle(false);
  manualDirty = true;
  runAiButton.disabled = true;
  downloadButton.disabled = true;
  comparisonBlock.hidden = true;
  partnerHeading.hidden = true;
  benchmarkSummary.hidden = true;
  manualPartnerFeedback.hidden = true;
  resultsSection.hidden = true;
  manualStatus.textContent =
    "Text wurde geändert. Bitte manuelle Korrektur erneut speichern, bevor die AI startet.";
}

function markManualFormChanged() {
  if (!manualEvaluation) return;
  manualDirty = true;
  runAiButton.disabled = true;
  downloadButton.disabled = true;
  comparisonBlock.hidden = true;
  partnerHeading.hidden = true;
  benchmarkSummary.hidden = true;
  manualPartnerFeedback.hidden = true;
  resultsSection.hidden = true;
  manualStatus.textContent =
    "Manuelle Eingaben wurden geändert. Bitte erneut speichern, damit der Vergleich mit AI aktuell bleibt.";
}

function saveManualEvaluation() {
  clearManualInvalidMarkers();

  const text = essayInput.value.trim();
  if (text.length < 200) {
    essayInput.classList.add("invalid");
    manualStatus.textContent =
      "Bitte zuerst einen Aufsatztext einfügen (mindestens ca. 200 Zeichen) und dann manuell korrigieren.";
    return;
  }

  const criteria = [];
  let hasErrors = false;

  for (const criterion of CRITERIA) {
    const gradeField = manualCriteriaContainer.querySelector(`[data-manual-grade="${criterion.id}"]`);
    const commentField = manualCriteriaContainer.querySelector(`[data-manual-comment="${criterion.id}"]`);
    const grade = Number.parseFloat(gradeField.value);
    const comment = commentField.value.trim();

    if (Number.isNaN(grade)) {
      hasErrors = true;
      gradeField.classList.add("invalid");
    }

    if (comment.length < 80) {
      hasErrors = true;
      commentField.classList.add("invalid");
    }

    criteria.push({
      id: criterion.id,
      label: criterion.label,
      weight: criterion.weight,
      grade: Number.isNaN(grade) ? 0 : grade,
      comment,
    });
  }

  const orthResult = updateOrthographyCalculation();
  const orthComment = orthCommentInput.value.trim();
  if (!orthResult) {
    hasErrors = true;
    orthLevelInput.classList.add("invalid");
    orthErrorsInput.classList.add("invalid");
    orthWordsInput.classList.add("invalid");
  }
  if (orthComment.length < 80) {
    hasErrors = true;
    orthCommentInput.classList.add("invalid");
  }

  criteria.push({
    id: ORTHOGRAPHY.id,
    label: ORTHOGRAPHY.label,
    weight: ORTHOGRAPHY.weight,
    grade: orthResult?.grade || 0,
    comment: orthComment,
    orthMeta: orthResult
      ? {
          level: orthLevelInput.value,
          errors: Number.parseFloat(orthErrorsInput.value),
          words: Number.parseFloat(orthWordsInput.value),
          errorsPer200: orthResult.errorsPer200,
        }
      : null,
  });

  if (hasErrors) {
    manualStatus.textContent =
      "Bitte alle Teilnoten setzen, Orthografie über den Fehlerschlüssel ausfüllen und jede Begründung mit mindestens 80 Zeichen ausformulieren.";
    return;
  }

  const weightedAverage = criteria.reduce((sum, item) => sum + item.grade * item.weight, 0);
  const benchmark = criteria.map((item) => evaluateCorrectionByBenchmark(item));
  const partnerFeedback = criteria.map((item) =>
    buildPartnerComment(item, benchmark.find((entry) => entry.id === item.id)),
  );
  const benchmarkScore =
    benchmark.reduce((sum, entry) => sum + entry.score * (CRITERIA.find((c) => c.id === entry.id)?.weight || 0), 0);

  manualEvaluation = {
    createdAt: new Date(),
    textSnapshot: text,
    criteria,
    benchmark,
    benchmarkScore,
    partnerFeedback,
    weightedAverage,
  };
  manualDirty = false;
  runAiButton.disabled = false;

  manualStatus.textContent =
    "Manuelle Korrektur gespeichert. Du kannst jetzt die AI-Korrektur starten und direkt vergleichen.";
  manualSummary.hidden = false;
  manualSummary.innerHTML = `
    <div class="feedback-card">
      <h4>Manuelle Basisbewertung</h4>
      <p><strong>Gewichtete Note:</strong> ${formatGrade(weightedAverage)}</p>
      <p>${criteria
        .map((item) => `${item.label}: ${formatGrade(item.grade)}`)
        .join(" | ")}</p>
    </div>
  `;

  benchmarkSummary.hidden = false;
  benchmarkSummary.innerHTML = `
    <div class="feedback-card">
      <h4>Gradmesser Korrektheit der Korrektur (Argumentationslehre)</h4>
      <p><strong>Gesamtscore:</strong> ${formatGrade(benchmarkScore)} / 6</p>
      <p>${benchmark
        .map((entry) => `${entry.label}: ${formatGrade(entry.score)} (${entry.level})`)
        .join(" | ")}</p>
    </div>
  `;

  manualPartnerFeedback.hidden = false;
  partnerHeading.hidden = false;
  manualPartnerFeedback.innerHTML = partnerFeedback
    .map(
      (item) => `
    <article class="feedback-card">
      <h4>KI-Partner: ${escapeHtml(item.label)}</h4>
      <p><strong>Argumentationslehre-Score:</strong> ${formatGrade(item.benchmark?.score || 0)} / 6 (${escapeHtml(
        item.benchmark?.level || "nicht berechnet",
      )})</p>
      <p><strong>Erfüllt:</strong> ${escapeHtml((item.benchmark?.fulfilled || []).join(", ") || "—")}</p>
      <p><strong>Fehlt:</strong> ${escapeHtml((item.benchmark?.missing || []).join(", ") || "—")}</p>
      <p><strong>Was schon stark ist:</strong> ${escapeHtml(item.strength)}</p>
      <p><strong>Was noch unklar bleibt:</strong> ${escapeHtml(item.gap)}</p>
      <p><strong>Partnerfrage:</strong> ${escapeHtml(item.question)}</p>
      <p><strong>Nächster Satzvorschlag:</strong> ${escapeHtml(item.nextSentence)}</p>
    </article>
  `,
    )
    .join("");
}

function clearManualInvalidMarkers() {
  manualCriteriaContainer.querySelectorAll(".invalid").forEach((field) => field.classList.remove("invalid"));
  essayInput.classList.remove("invalid");
  orthLevelInput.classList.remove("invalid");
  orthErrorsInput.classList.remove("invalid");
  orthWordsInput.classList.remove("invalid");
  orthCommentInput.classList.remove("invalid");
}

function evaluateCorrectionByBenchmark(criterionEvaluation) {
  const text = criterionEvaluation.comment || "";
  const fulfilled = [];
  const missing = [];

  for (const item of ARGUMENTATION_BENCHMARK) {
    const hit = item.patterns.some((pattern) => pattern.test(text));
    if (hit) fulfilled.push(item.label);
    else missing.push(item.label);
  }

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const depthBonus = words >= 60 ? 0.5 : words >= 40 ? 0.25 : 0;
  const base = (fulfilled.length / ARGUMENTATION_BENCHMARK.length) * 6;
  const score = clamp(roundQuarter(base + depthBonus), 1, 6);

  return {
    id: criterionEvaluation.id,
    label: criterionEvaluation.label,
    score,
    level: benchmarkLevel(score),
    fulfilled,
    missing: missing.slice(0, 4),
  };
}

function benchmarkLevel(score) {
  if (score >= 5) return "sehr tragfähig";
  if (score >= 4) return "solide";
  if (score >= 3) return "teilweise tragfähig";
  return "kritisch";
}

function buildPartnerComment(criterionEvaluation, benchmark) {
  const text = criterionEvaluation.comment.toLowerCase();
  const words = text.split(/\s+/).filter(Boolean).length;
  const hasEvidence = /(beispiel|stelle|zitat|absatz|im text|konkret)/i.test(criterionEvaluation.comment);
  const hasReasoning = /(weil|daher|deshalb|somit|folglich|jedoch|allerdings)/i.test(criterionEvaluation.comment);
  const hasBalance =
    /(stark|gelungen|präzis|überzeugend|klar)/i.test(criterionEvaluation.comment) &&
    /(schwach|unklar|mangel|problem|bruch|wenig)/i.test(criterionEvaluation.comment);

  const criterionQuestions = {
    inhalt: "Welche zentrale These des Aufsatzes trägt deine Teilnote am stärksten und warum genau diese?",
    aufbau: "An welcher Übergangsstelle kippt der rote Faden am deutlichsten?",
    ausdruck: "Welche konkrete Formulierung würdest du sprachlich umschreiben, um Präzision zu gewinnen?",
    "sprachliche-korrektheit":
      "Welche Fehlerkategorie (Orthografie/Interpunktion/Grammatik) prägt deine Teilnote am stärksten?",
  };

  const strengthParts = [];
  const gapParts = [];

  if (words >= 40) strengthParts.push("Deine Begründung hat eine gute inhaltliche Tiefe.");
  else gapParts.push("Die Begründung ist noch zu knapp; präzisiere mindestens zwei Beobachtungen.");

  if (hasEvidence) strengthParts.push("Du arbeitest textnah und argumentierst nicht nur allgemein.");
  else gapParts.push("Führe mindestens eine konkrete Textstelle als Beleg an.");

  if (hasReasoning) strengthParts.push("Die Begründungslogik ist nachvollziehbar aufgebaut.");
  else gapParts.push("Verknüpfe Urteil und Begründung klarer (z. B. mit weil, daher, somit).");

  if (!hasBalance) gapParts.push("Gewichte Stärken und Schwächen explizit gegeneinander.");

  const gradeHint =
    criterionEvaluation.grade >= 5
      ? "Die hohe Teilnote wirkt plausibel, wenn du sie noch stärker an Belegen absicherst."
      : criterionEvaluation.grade >= 4
        ? "Die mittlere Teilnote ist nachvollziehbar; mit präziseren Beispielen wird sie belastbarer."
        : "Die kritische Teilnote ist begründbar, wenn du die Hauptmängel klar priorisierst.";

  return {
    id: criterionEvaluation.id,
    label: criterionEvaluation.label,
    strength: `${strengthParts.join(" ")} ${gradeHint} ${
      benchmark ? `Gradmesser: ${benchmark.level} (${formatGrade(benchmark.score)}/6).` : ""
    }`.trim(),
    gap:
      gapParts.join(" ") ||
      (benchmark?.missing?.length
        ? `Für noch mehr Korrektheit ergänze: ${benchmark.missing.join(", ")}.`
        : "Die Begründung ist bereits ausgewogen und konkret."),
    question: criterionQuestions[criterionEvaluation.id] || "Welcher Einzelbeleg stützt dein Urteil am stärksten?",
    nextSentence:
      "Ich bewerte diese Stelle so, weil [konkreter Beleg], was im Kriterium [Inhalt/Aufbau/Ausdruck] zu [Auswirkung] führt.",
    benchmark,
  };
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
    markManualAsDirty();
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
  await ensurePdfJsLibrary();

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

async function ensurePdfJsLibrary() {
  if (window.pdfjsLib) {
    configurePdfWorker();
    return;
  }

  if (runtimeMode === "internet") {
    await loadScript(PDF_CDN_URL);
    pdfLibrarySource = "cdn";
    configurePdfWorker();
    return;
  }

  try {
    await loadScript(PDF_LOCAL_URL);
    pdfLibrarySource = "local";
    configurePdfWorker();
  } catch {
    throw new Error(
      "PDF-Verarbeitung im Lokalmodus benötigt lokale Dateien unter /vendor/pdf.min.js und /vendor/pdf.worker.min.js.",
    );
  }
}

function configurePdfWorker() {
  if (!window.pdfjsLib) return;
  if (pdfLibrarySource === "cdn") {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_CDN_WORKER_URL;
    return;
  }
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_LOCAL_WORKER_URL;
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-dynamic-src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "1") {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Script konnte nicht geladen werden: ${src}`)), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.dynamicSrc = src;
    script.addEventListener("load", () => {
      script.dataset.loaded = "1";
      resolve();
    });
    script.addEventListener("error", () => reject(new Error(`Script konnte nicht geladen werden: ${src}`)));
    document.head.appendChild(script);
  });
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

  if (!manualEvaluation || manualDirty || manualEvaluation.textSnapshot !== text) {
    parseStatus.textContent =
      "Bitte zuerst die manuelle Korrektur für den aktuellen Text speichern. Danach wird die AI-Korrektur freigeschaltet.";
    runAiButton.disabled = true;
    return;
  }

  const levelSelection = getLevelSelection();
  const requestedEngine = apiForCurrentEssayEnabled ? "api" : "local";
  if (apiForCurrentEssayEnabled && runtimeMode === "internet" && !hasClientApiKey() && !apiHealth.configured) {
    parseStatus.textContent =
      "API-KI ist für diesen Aufsatz aktiviert, aber kein API-Key vorhanden. Bitte Key eingeben oder API-KI ausschalten.";
    return;
  }

  parseStatus.textContent = "Analyse läuft...";

  try {
    const evaluation = await evaluateEssay(text, levelSelection, requestedEngine, { scope: "single" });
    const aiCriteriaWithOrthography = appendOrthographyCriterion(evaluation.criteria);

    renderMetrics(evaluation.metrics, levelSelection, evaluation);
    renderCards(aiCriteriaWithOrthography);
    renderComparison(aiCriteriaWithOrthography);

    latestAiReport = {
      createdAt: new Date(),
      text,
      manual: manualEvaluation,
      metrics: evaluation.metrics,
      criteria: aiCriteriaWithOrthography,
      levelSelection,
      apiToggle: apiForCurrentEssayEnabled,
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
  const effectiveEngine = runtimeMode === "local" ? "local" : requestedEngine;
  const apiKey = getClientApiKey();

  if (effectiveEngine === "api") {
    if (apiHealth.reachable && (apiHealth.configured || Boolean(apiKey))) {
      const apiResult = await evaluateViaApi(text, levelSelection, context, apiKey);
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
    summary:
      runtimeMode === "local"
        ? "Lokale heuristische KI-Bewertung (abgeschotteter Modus)."
        : "Lokale heuristische KI-Bewertung.",
    criteria: localResult.criteria,
    metrics,
  };
}

async function evaluateViaApi(text, levelSelection, context = {}, apiKey = "") {
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
      apiKey,
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
      const selectedLevel = LEVEL_CONFIG[criterion.level]?.label || criterion.level || "excel";
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

function appendOrthographyCriterion(criteria) {
  const existing = criteria.find((item) => item.id === ORTHOGRAPHY.id);
  if (existing) return criteria;
  if (!manualEvaluation) return criteria;

  const manualOrth = manualEvaluation.criteria.find((item) => item.id === ORTHOGRAPHY.id);
  if (!manualOrth) return criteria;

  const orthCriterion = {
    id: ORTHOGRAPHY.id,
    label: ORTHOGRAPHY.label,
    level: "excel",
    score: manualOrth.grade,
    moderateScore: manualOrth.grade,
    deltaText: "0",
    comment:
      "Diese Teilnote wird analog zum Frisch-Modus direkt aus dem Excel-Fehlerschlüssel berechnet.",
    strengths: [
      manualOrth.orthMeta
        ? `Fehlerdichte: ${manualOrth.orthMeta.errorsPer200.toFixed(2).replace(".", ",")} pro 200 Wörter.`
        : "Fehlerdichte wurde eingetragen.",
    ],
    gaps: [],
    nextStep: "Fehlerkategorien gezielt benennen (Orthografie/Interpunktion/Grammatik) und priorisieren.",
  };

  return [...criteria, orthCriterion];
}

function renderComparison(aiCriteria) {
  if (!manualEvaluation) {
    comparisonBlock.hidden = true;
    return;
  }

  const rows = manualEvaluation.criteria.map((manual) => {
    const benchmark = manualEvaluation.benchmark.find((item) => item.id === manual.id);
    const ai = aiCriteria.find((item) => item.id === manual.id);
    const aiScore = ai?.score ?? manual.grade;
    const delta = aiScore - (manual?.grade || 0);
    const trend =
      Math.abs(delta) < 0.01
        ? "gleich"
        : delta > 0
          ? "AI höher"
          : "AI strenger";

    return {
      id: manual.id,
      label: manual.label,
      weight: manual.weight,
      manual: manual?.grade || 0,
      ai: aiScore,
      delta,
      trend,
      manualComment: manual?.comment || "",
      benchmarkScore: benchmark?.score || 0,
      benchmarkLevel: benchmark?.level || "",
      benchmarkMissing: benchmark?.missing || [],
      aiHint: ai?.nextStep || "",
    };
  });

  const manualAvg = manualEvaluation.weightedAverage;
  const aiAvg = rows.reduce((sum, row) => sum + row.ai * row.weight, 0);
  const overallDelta = aiAvg - manualAvg;

  comparisonTable.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Kriterium</th>
          <th>Manuell</th>
          <th>AI</th>
          <th>Delta</th>
          <th>Gradmesser</th>
          <th>Tendenz</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (row) => `
          <tr>
            <td>${escapeHtml(row.label)}</td>
            <td>${formatGrade(row.manual)}</td>
            <td>${formatGrade(row.ai)}</td>
            <td>${row.delta >= 0 ? "+" : ""}${formatGrade(row.delta)}</td>
            <td>${formatGrade(row.benchmarkScore)} (${escapeHtml(row.benchmarkLevel)})</td>
            <td>${escapeHtml(row.trend)}</td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
      <tfoot>
        <tr>
          <th>Gesamt (gewichtet)</th>
          <th>${formatGrade(manualAvg)}</th>
          <th>${formatGrade(aiAvg)}</th>
          <th>${overallDelta >= 0 ? "+" : ""}${formatGrade(overallDelta)}</th>
          <th>${Math.abs(overallDelta) < 0.01 ? "gleich" : overallDelta > 0 ? "AI höher" : "AI strenger"}</th>
        </tr>
      </tfoot>
    </table>
  `;

  comparisonFeedback.innerHTML = rows
    .map(
      (row) => `
      <article class="feedback-card">
        <h4>${escapeHtml(row.label)}</h4>
        <p><strong>Manuelle Begründung:</strong> ${escapeHtml(row.manualComment)}</p>
        <p><strong>Gradmesser-Lücke:</strong> ${escapeHtml(row.benchmarkMissing.join(", ") || "Keine zentrale Lücke.")}</p>
        <p><strong>AI-Impuls für Überarbeitung:</strong> ${escapeHtml(row.aiHint)}</p>
      </article>
    `,
    )
    .join("");

  comparisonBlock.hidden = false;
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
        <input type="text" class="student-name" placeholder="z. B. Patrick Fischer" value="${escapeHtml(initialData.name || "")}" />
      </label>
      <label>
        Datei (.txt/.pdf)
        <input type="file" class="student-file" accept=".txt,.pdf,application/pdf,text/plain" />
      </label>
      <button type="button" class="secondary-btn student-read-file">Datei einlesen</button>
      <button type="button" class="secondary-btn student-toggle-api">API-KI: AUS</button>
    </div>
    <label>
      Aufsatztext
      <textarea class="student-text" placeholder="Aufsatztext hier einfügen...">${escapeHtml(initialData.text || "")}</textarea>
    </label>
    <p class="hint student-status">Bereit.</p>
  `;

  studentList.appendChild(row);
  const toggleButton = row.querySelector(".student-toggle-api");
  if (runtimeMode !== "internet") {
    toggleButton.disabled = true;
    setStudentApiToggle(toggleButton, false);
  } else {
    setStudentApiToggle(toggleButton, false);
  }
}

async function handleStudentListClick(event) {
  const target = event.target;
  const row = target.closest(".student-row");
  if (!row) return;
  const status = row.querySelector(".student-status");

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
    return;
  }

  if (target.classList.contains("student-toggle-api")) {
    if (runtimeMode !== "internet") {
      status.textContent = "API-KI pro Aufsatz ist nur im Internetmodus verfügbar.";
      target.classList.add("secondary-btn");
      target.classList.remove("primary-btn");
      target.textContent = "API-KI: AUS";
      return;
    }

    const enabled = target.dataset.apiEnabled === "1";
    const next = !enabled;
    setStudentApiToggle(target, next);
    status.textContent = next
      ? "Für diesen Aufsatz wird API-KI verwendet."
      : "Für diesen Aufsatz wird lokale KI verwendet.";
  }
}

async function evaluateClassroom() {
  const rows = [...studentList.querySelectorAll(".student-row")];
  const entries = rows
    .map((row, index) => {
      const name = row.querySelector(".student-name").value.trim() || `Schüler*in ${index + 1}`;
      const text = row.querySelector(".student-text").value.trim();
      const useApi = row.querySelector(".student-toggle-api")?.dataset.apiEnabled === "1";
      return { row, name, text, useApi };
    })
    .filter((entry) => entry.text.length >= 200);

  if (!entries.length) {
    classStatus.textContent = "Bitte mindestens einen Aufsatz mit ausreichend Text (mind. ca. 200 Zeichen) eingeben.";
    return;
  }

  const levelSelection = getLevelSelection();
  const results = [];

  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];
    const status = entry.row.querySelector(".student-status");
    const requestedEngine = entry.useApi ? "api" : "local";
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
    requestedEngine: "mixed-per-essay",
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
  lines.push(`- Betriebsmodus: ${runtimeMode === "local" ? "lokal/abgeschottet" : "internet"}`);
  lines.push(`- API-KI-Schalter (dieser Aufsatz): ${latestAiReport.apiToggle ? "AN" : "AUS"}`);
  lines.push(`- Engine: ${latestAiReport.source}${latestAiReport.model ? ` (${latestAiReport.model})` : ""}`);
  lines.push(`- Wörter: ${latestAiReport.metrics.wordCount}`);
  lines.push(`- Sätze: ${latestAiReport.metrics.sentenceCount}`);
  lines.push(`- Absätze: ${latestAiReport.metrics.paragraphCount}`);
  lines.push(`- Manuelle Ausgangsnote (gewichtet): ${formatGrade(latestAiReport.manual.weightedAverage)}`);
  lines.push(
    `- Gradmesser Korrektur-Korrektheit (Argumentationslehre): ${formatGrade(latestAiReport.manual.benchmarkScore)} / 6`,
  );
  if (latestAiReport.warning) lines.push(`- Hinweis: ${latestAiReport.warning}`);
  lines.push("");

  latestAiReport.criteria.forEach((criterion) => {
    const manual = latestAiReport.manual.criteria.find((item) => item.id === criterion.id);
    const partner = latestAiReport.manual.partnerFeedback.find((item) => item.id === criterion.id);
    const benchmark = latestAiReport.manual.benchmark.find((item) => item.id === criterion.id);
    const delta = criterion.score - (manual?.grade || 0);
    lines.push(`## ${criterion.label}`);
    lines.push(`- Manuelle Teilnote: ${formatGrade(manual?.grade || 0)}`);
    lines.push(`- Manuelle Begründung: ${manual?.comment || ""}`);
    lines.push(`- Gradmesser-Score: ${formatGrade(benchmark?.score || 0)} / 6 (${benchmark?.level || ""})`);
    lines.push(`- Gradmesser erfüllt: ${(benchmark?.fulfilled || []).join(", ")}`);
    lines.push(`- Gradmesser fehlt: ${(benchmark?.missing || []).join(", ")}`);
    lines.push(`- KI-Partner (Stärke): ${partner?.strength || ""}`);
    lines.push(`- KI-Partner (Lücke): ${partner?.gap || ""}`);
    lines.push(`- KI-Partner (Frage): ${partner?.question || ""}`);
    lines.push(`- Level: ${criterion.level}`);
    lines.push(`- KI-Score: ${formatGrade(criterion.score)}`);
    lines.push(`- Delta zu manuell: ${delta >= 0 ? "+" : ""}${formatGrade(delta)}`);
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
  lines.push(`- Betriebsmodus: ${runtimeMode === "local" ? "lokal/abgeschottet" : "internet"}`);
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
