const CRITERIA = [
  {
    id: "inhalt",
    title: "Inhalt",
    weight: 0.4,
    description:
      "Gesamtidee, gedankliche Auseinandersetzung, Originalität, Stimmigkeit und Faktentreue.",
    aspects: [
      "Gesamtidee klar erkennbar",
      "Persönliche gedankliche Auseinandersetzung",
      "Originalität der Argumentation",
      "Richtigkeit von Tatsachen",
      "Interne Stimmigkeit",
      "Wissensbezug / Kontextwissen",
    ],
    keywords: [
      "these",
      "argument",
      "gedanke",
      "position",
      "beleg",
      "problem",
      "fakt",
      "stimmig",
      "widerspruch",
      "glück",
      "technik",
    ],
    nextStep:
      "Benenne eine zentrale These des Textes, belege sie mit einer konkreten Stelle und gewichte danach die inhaltliche Tragfähigkeit.",
  },
  {
    id: "aufbau",
    title: "Aufbau",
    weight: 0.2,
    description:
      "Innere und äußere Gliederung, Reihenfolge der Denkschritte, Textsortenpassung, Einleitung/Schluss.",
    aspects: [
      "Klarer roter Faden",
      "Sinnvolle Absatzstruktur",
      "Logische Übergänge",
      "Einleitung führt zum Thema",
      "Schluss rundet ab",
      "Textsortengemäße Struktur",
    ],
    keywords: [
      "einleitung",
      "schluss",
      "absatz",
      "struktur",
      "aufbau",
      "überleitung",
      "roter faden",
      "gliederung",
      "reihenfolge",
    ],
    nextStep:
      "Markiere mindestens zwei Übergänge zwischen Abschnitten und prüfe, ob der Gedankengang ohne Sprung nachvollziehbar bleibt.",
  },
  {
    id: "stil",
    title: "Sprachlicher Ausdruck",
    weight: 0.2,
    description:
      "Wortschatz, Syntax, Kohäsion, Angemessenheit, stilistische Eigenständigkeit und Rezipientenführung.",
    aspects: [
      "Präziser Wortschatz",
      "Variierte Satzstrukturen",
      "Kohäsion zwischen Sätzen",
      "Angemessener Tonfall",
      "Rhetorische Eigenständigkeit",
      "Adressatengerechte Führung",
    ],
    keywords: [
      "wortschatz",
      "syntax",
      "stil",
      "sprachmittel",
      "kohäsion",
      "ton",
      "rhetor",
      "satzbau",
      "präzise",
    ],
    nextStep:
      "Führe ein kurzes Beispielzitat an und erkläre, wie Wortwahl oder Satzbau die Überzeugungskraft stärkt oder schwächt.",
  },
  {
    id: "sprachliche-korrektheit",
    title: "Sprachliche Korrektheit",
    weight: 0.2,
    description: "Orthografie, Interpunktion und Grammatik gemäß Fehlerschlüssel.",
    aspects: [
      "Orthografie beurteilt",
      "Interpunktion beurteilt",
      "Grammatik beurteilt",
      "Fehlerkategorien benannt",
      "Schwere der Fehler gewichtet",
      "Urteil mit Zahlen begründet",
    ],
    keywords: [
      "orthografie",
      "interpunktion",
      "grammatik",
      "komma",
      "fehler",
      "norm",
      "regel",
      "korrekt",
    ],
    nextStep:
      "Nenne die häufigste Fehlerkategorie und leite aus der Fehlerdichte (pro 200 Wörter) eine präzise Teilnote ab.",
    autoGrade: true,
  },
];

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

const form = document.getElementById("evaluation-form");
const criteriaContainer = document.getElementById("criteria-container");
const levelInput = document.getElementById("level");
const errorsInput = document.getElementById("errors");
const wordsInput = document.getElementById("words");
const languageCalculation = document.getElementById("language-calculation");
const resultsSection = document.getElementById("results");
const criteriaFeedback = document.getElementById("criteria-feedback");
const overallGradeOutput = document.getElementById("overall-grade");
const overallFeedbackOutput = document.getElementById("overall-feedback");
const overallCommentInput = document.getElementById("overall-comment");
const downloadButton = document.getElementById("download-report");
const toggleTextButton = document.getElementById("toggle-text");
const essay = document.getElementById("essay");

let latestReport = null;

buildCriteriaCards();
wireInteractions();
updateLanguageCalculation();

function buildCriteriaCards() {
  const gradeOptions = buildGradeOptions();

  CRITERIA.forEach((criterion) => {
    const card = document.createElement("article");
    card.className = "criterion";
    card.dataset.criterion = criterion.id;

    const aspects = criterion.aspects
      .map(
        (aspect, index) => `
          <label class="aspect">
            ${aspect}
            <select required data-aspect="${criterion.id}-${index}">
              <option value="">Bewertung wählen</option>
              <option value="stark">stark erfüllt</option>
              <option value="teilweise">teilweise erfüllt</option>
              <option value="kaum">kaum erfüllt</option>
            </select>
          </label>
        `,
      )
      .join("");

    const gradeSelect = criterion.autoGrade
      ? `
      <label>
        Teilnote (automatisch aus Fehlerschlüssel)
        <select data-grade="${criterion.id}" disabled>
          <option value="">Zuerst Fehler, Wörter und Stufe eintragen</option>
        </select>
      </label>
      `
      : `
      <label>
        Teilnote
        <select data-grade="${criterion.id}" required>
          <option value="">Bitte wählen</option>
          ${gradeOptions}
        </select>
      </label>
      `;

    card.innerHTML = `
      <div class="criterion-head">
        <h3>${criterion.title}</h3>
        <span class="weight">Gewicht: ${criterion.weight}</span>
      </div>
      <p class="hint">${criterion.description}</p>
      <div class="aspect-grid">${aspects}</div>
      <div class="grade-line">${gradeSelect}</div>
      <label>
        Begründung (Pflicht, min. 80 Zeichen)
        <textarea
          data-comment="${criterion.id}"
          minlength="80"
          required
          placeholder="Begründe deine Teilnote mit konkreten Beobachtungen zum Text."
        ></textarea>
      </label>
      <p class="char-hint" data-charhint="${criterion.id}">0 Zeichen</p>
    `;

    criteriaContainer.appendChild(card);
  });
}

function wireInteractions() {
  [levelInput, errorsInput, wordsInput].forEach((input) => {
    input.addEventListener("input", updateLanguageCalculation);
    input.addEventListener("change", updateLanguageCalculation);
  });

  criteriaContainer.querySelectorAll("textarea").forEach((area) => {
    area.addEventListener("input", () => {
      const criterionId = area.dataset.comment;
      const hint = criteriaContainer.querySelector(`[data-charhint='${criterionId}']`);
      hint.textContent = `${area.value.trim().length} Zeichen`;
    });
  });

  form.addEventListener("submit", handleEvaluation);
  downloadButton.addEventListener("click", downloadReport);

  toggleTextButton.addEventListener("click", () => {
    const isHidden = essay.style.display === "none";
    essay.style.display = isHidden ? "block" : "none";
    toggleTextButton.textContent = isHidden ? "Text einklappen" : "Text ausklappen";
  });
}

function buildGradeOptions() {
  const options = [];
  for (let value = 6; value >= 1; value -= 0.25) {
    const grade = value.toFixed(2).replace(/\.00$/, "").replace(/0$/, "");
    options.push(`<option value="${grade}">${grade}</option>`);
  }
  return options.join("");
}

function calculateLanguageGrade(level, errors, words) {
  if (!level || !LANGUAGE_TABLES[level] || !words || words <= 0 || Number.isNaN(errors)) {
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

function updateLanguageCalculation() {
  const level = levelInput.value;
  const errors = Number.parseFloat(errorsInput.value);
  const words = Number.parseFloat(wordsInput.value);

  const result = calculateLanguageGrade(level, errors, words);
  const languageGradeSelect = criteriaContainer.querySelector(
    "[data-grade='sprachliche-korrektheit']",
  );

  if (!result) {
    languageCalculation.textContent = "Fehler pro 200 Wörter: – | Teilnote sprachliche Korrektheit: –";
    languageGradeSelect.innerHTML =
      "<option value=''>Zuerst Fehler, Wörter und Stufe eintragen</option>";
    return;
  }

  const gradeString = formatGrade(result.grade);
  languageCalculation.textContent = `Fehler pro 200 Wörter: ${result.errorsPer200
    .toFixed(2)
    .replace(".", ",")} | Teilnote sprachliche Korrektheit: ${gradeString}`;
  languageGradeSelect.innerHTML = `<option value='${gradeString}'>${gradeString}</option>`;
}

function handleEvaluation(event) {
  event.preventDefault();
  clearInvalidMarkers();

  const criterionPayload = CRITERIA.map((criterion) => collectCriterionData(criterion));
  const hasInvalid = criterionPayload.some((entry) => entry.invalid);

  const overallComment = overallCommentInput.value.trim();
  if (overallComment.length < 120) {
    markInvalid(overallCommentInput);
  }

  if (hasInvalid || overallComment.length < 120) {
    resultsSection.hidden = false;
    overallGradeOutput.textContent = "Bitte ergänze alle Pflichtfelder und Kommentare.";
    overallFeedbackOutput.textContent =
      "Jede Teilnote braucht eine vollständige Kriterienbewertung und eine aussagekräftige Begründung.";
    criteriaFeedback.innerHTML = "";
    return;
  }

  const weightedGrade = criterionPayload.reduce((sum, entry) => sum + entry.grade * entry.weight, 0);
  const overallGrade = formatGrade(weightedGrade);
  const overallCommentFeedback = evaluateComment(overallComment, {
    title: "Gesamturteil",
    keywords: ["gewicht", "stärke", "schwäche", "schluss", "gesamt", "note", "begründ"],
    nextStep:
      "Gewichte die vier Teilnoten explizit gegeneinander und begründe den Übergang von Teilnoten zur Schlussnote.",
  });

  renderResults({
    overallGrade,
    overallCommentFeedback,
    criteria: criterionPayload,
  });

  latestReport = {
    createdAt: new Date(),
    overallGrade,
    overallComment,
    overallCommentFeedback,
    criteria: criterionPayload,
    languageInputs: {
      level: levelInput.value,
      errors: errorsInput.value,
      words: wordsInput.value,
      calculation: languageCalculation.textContent,
    },
  };

  downloadButton.disabled = false;
}

function collectCriterionData(criterion) {
  const card = criteriaContainer.querySelector(`[data-criterion='${criterion.id}']`);
  const aspectFields = [...card.querySelectorAll("[data-aspect]")];
  const gradeField = card.querySelector(`[data-grade='${criterion.id}']`);
  const commentField = card.querySelector(`[data-comment='${criterion.id}']`);

  let invalid = false;

  const aspects = aspectFields.map((field) => {
    if (!field.value) {
      markInvalid(field);
      invalid = true;
    }
    return {
      label: field.closest("label").childNodes[0].textContent.trim(),
      rating: field.value,
    };
  });

  const grade = Number.parseFloat(gradeField.value);
  if (Number.isNaN(grade)) {
    markInvalid(gradeField);
    invalid = true;
  }

  const comment = commentField.value.trim();
  if (comment.length < 80) {
    markInvalid(commentField);
    invalid = true;
  }

  const commentFeedback = evaluateComment(comment, criterion);

  return {
    id: criterion.id,
    title: criterion.title,
    weight: criterion.weight,
    grade: Number.isNaN(grade) ? 0 : grade,
    aspects,
    comment,
    commentFeedback,
    invalid,
  };
}

function evaluateComment(comment, criterion) {
  const text = (comment || "").toLowerCase();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const keywordHits = criterion.keywords.filter((keyword) => text.includes(keyword.toLowerCase())).length;
  const hasEvidence = /(zitat|stelle|beispiel|im text|frisch|«|"|‚|“)/i.test(comment);
  const hasReasoning = /(weil|daher|deshalb|somit|jedoch|allerdings|folglich|denn)/i.test(comment);
  const hasBalance = /(stärk|gelungen|überzeugend|präzis)/i.test(comment) &&
    /(schwäch|problem|unklar|mangel|wenig|bruch)/i.test(comment);

  const aspectDepth =
    wordCount >= 65 ? "hoch" : wordCount >= 35 ? "mittel" : wordCount > 0 ? "niedrig" : "leer";

  let qualityScore = 0;
  qualityScore += wordCount >= 35 ? 1 : 0;
  qualityScore += keywordHits >= 2 ? 1 : 0;
  qualityScore += hasEvidence ? 1 : 0;
  qualityScore += hasReasoning ? 1 : 0;
  qualityScore += hasBalance ? 1 : 0;

  let level = "Ausbaufähig";
  if (qualityScore >= 4) level = "Sehr differenziert";
  else if (qualityScore >= 3) level = "Fundiert";

  const strengths = [];
  const gaps = [];

  if (wordCount >= 35) strengths.push("Deine Begründung hat ausreichende inhaltliche Tiefe.");
  else gaps.push("Die Begründung ist noch zu kurz; vertiefe deine Argumentation.");

  if (keywordHits >= 2) strengths.push(`Du triffst zentrale Fachaspekte zu "${criterion.title}".`);
  else gaps.push(`Nutze mehr Fachsprache aus dem Kriterium "${criterion.title}".`);

  if (hasEvidence) strengths.push("Du arbeitest mit textnahen Beobachtungen.");
  else gaps.push("Stütze dein Urteil mit einer konkreten Textstelle oder einem Kurzbeleg.");

  if (hasReasoning) strengths.push("Deine Argumentation zeigt nachvollziehbare Begründungslogik.");
  else gaps.push("Mache die Kausalität klarer (z. B. mit " + "weil, daher, deshalb" + ").");

  if (!hasBalance) {
    gaps.push("Gewichte Stärken und Schwächen explizit gegeneinander.");
  }

  return {
    level,
    strengths: strengths.slice(0, 2),
    gaps: gaps.slice(0, 2),
    nextStep: criterion.nextStep,
    metrics: {
      words: wordCount,
      keywordHits,
      depth: aspectDepth,
    },
  };
}

function renderResults(payload) {
  resultsSection.hidden = false;
  overallGradeOutput.textContent = `Gewichtete Aufsatznote: ${payload.overallGrade}`;

  const badgeClass = payload.overallCommentFeedback.level === "Ausbaufähig" ? "badge warn" : "badge";
  overallFeedbackOutput.innerHTML = `
    Meta-Feedback zur Gesamtbegründung:
    <span class="${badgeClass}">${payload.overallCommentFeedback.level}</span>
    ${payload.overallCommentFeedback.strengths[0] || ""}
    ${payload.overallCommentFeedback.gaps[0] ? "Verbesserung: " + payload.overallCommentFeedback.gaps[0] : ""}
  `;

  criteriaFeedback.innerHTML = payload.criteria
    .map((entry) => {
      const feedback = entry.commentFeedback;
      const badge = feedback.level === "Ausbaufähig" ? "badge warn" : "badge";

      return `
      <article class="feedback-card">
        <h4>${entry.title} <span class="${badge}">${feedback.level}</span></h4>
        <p><strong>Teilnote:</strong> ${formatGrade(entry.grade)} (Gewicht ${entry.weight})</p>
        <p><strong>Stark:</strong> ${feedback.strengths.join(" ") || "Noch kein klarer Stärkeaspekt erkennbar."}</p>
        <p><strong>Lücke:</strong> ${feedback.gaps.join(" ") || "Keine zentrale Lücke festgestellt."}</p>
        <p><strong>Nächster Schritt:</strong> ${feedback.nextStep}</p>
      </article>
    `;
    })
    .join("");
}

function downloadReport() {
  if (!latestReport) return;

  const lines = [];
  lines.push("# Feedbackbericht: Aufsatzkorrekturtrainer");
  lines.push("");
  lines.push(`- Datum: ${latestReport.createdAt.toLocaleString("de-CH")}`);
  lines.push(`- Gewichtete Aufsatznote: ${latestReport.overallGrade}`);
  lines.push(`- ${latestReport.languageInputs.calculation}`);
  lines.push("");
  lines.push("## Kriterienauswertung");
  lines.push("");

  latestReport.criteria.forEach((criterion) => {
    lines.push(`### ${criterion.title}`);
    lines.push(`- Teilnote: ${formatGrade(criterion.grade)} (Gewicht ${criterion.weight})`);
    lines.push(`- Kommentar der Lernperson: ${criterion.comment}`);
    lines.push(`- Feedbackstufe: ${criterion.commentFeedback.level}`);
    lines.push(`- Stärken: ${criterion.commentFeedback.strengths.join(" ") || "-"}`);
    lines.push(`- Lücken: ${criterion.commentFeedback.gaps.join(" ") || "-"}`);
    lines.push(`- Nächster Schritt: ${criterion.commentFeedback.nextStep}`);
    lines.push("");
  });

  lines.push("## Gesamtbegründung");
  lines.push(latestReport.overallComment);
  lines.push("");
  lines.push("## Meta-Feedback zur Gesamtbegründung");
  lines.push(`- Stufe: ${latestReport.overallCommentFeedback.level}`);
  lines.push(
    `- Stärken: ${latestReport.overallCommentFeedback.strengths.join(" ") || "Noch keine klare Stärke."}`,
  );
  lines.push(`- Lücken: ${latestReport.overallCommentFeedback.gaps.join(" ") || "Keine Lücke ausgewiesen."}`);
  lines.push(`- Nächster Schritt: ${latestReport.overallCommentFeedback.nextStep}`);

  const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "feedbackbericht-aufsatzkorrekturtrainer.md";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function formatGrade(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return "-";
  return num.toFixed(2).replace(/\.00$/, "").replace(/0$/, "").replace(".", ",");
}

function markInvalid(field) {
  if (!field) return;
  field.classList.add("invalid");
}

function clearInvalidMarkers() {
  form.querySelectorAll(".invalid").forEach((field) => field.classList.remove("invalid"));
}
