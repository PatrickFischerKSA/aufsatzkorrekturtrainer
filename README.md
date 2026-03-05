# aufsatzkorrekturtrainer

Interaktive Lern- und Feedbackumgebung mit drei Nutzungsszenarien:

1. `index.html`: Max-Frisch-Korrektur (manuelle Lehrpersonenrolle)
2. `ai-korrektur.html`: KI-Einzelkorrektur für beliebige Aufsätze (`.txt`/`.pdf`)
3. `ai-korrektur.html`: Klassenmodus mit Mehrfach-Uploads und Sammelauswertung

## Kernfunktionen

- Volltext des Maturaufsatzes von Max Frisch (1930)
- Bewertungsraster mit Pflichtbegründungen pro Kriterium
- automatische Teilnote sprachliche Korrektheit nach Excel-Schlüssel (Stufe 1-4, mit/ohne Korrekturprogramm)
- KI-Korrektur für `Inhalt`, `Aufbau`, `Ausdruck`
- Beurteilungslevels: `therapeutisch`, `mild`, `moderat`, `anspruchsvoll`, `streng`, `brutal`
- Kontrastscore gegenüber moderatem Bewertungslevel
- Klassenliste mit Mehrfach-Upload und tabellarischer Klassenübersicht
- Export von Einzel- und Klassenberichten als Markdown

## Start lokal (ohne API, lokale KI)

1. Repository öffnen.
2. `index.html` oder `ai-korrektur.html` direkt im Browser öffnen.

Alternativ via statischem Server:

```bash
cd aufsatzkorrekturtrainer
python3 -m http.server 8080
```

## Start lokal (mit API-KI)

Für echte LLM-Korrektur wird das integrierte Backend genutzt.

1. `.env.example` nach `.env` kopieren.
2. `OPENAI_API_KEY` in `.env` setzen.
3. Optional: `OPENAI_MODEL` und `OPENAI_BASE_URL` anpassen.
4. Server starten:

```bash
cd aufsatzkorrekturtrainer
npm start
```

5. Browser öffnen: `http://localhost:8080/ai-korrektur.html`

API-Endpunkte:

- `GET /api/health`
- `POST /api/ai-review`

## Klassenmodus

Im Klassenbereich von `ai-korrektur.html` kannst du:

1. mehrere Schüler*innenzeilen hinzufügen,
2. pro Person einen Aufsatz als TXT/PDF einlesen,
3. eine Sammelkorrektur für alle Texte starten,
4. Ergebnisse als Klassenbericht exportieren.

## Einsatz im Unterricht

1. Schüler*innen arbeiten zuerst im Max-Frisch-Modus als Lehrpersonen.
2. Danach vergleichen sie das eigene Urteil mit der KI-Variante.
3. Im Klassenmodus können Lehrpersonen mehrere Aufsätze in einem Durchlauf diagnostizieren.
4. Berichte werden als Markdown dokumentiert und archiviert.

Begleitmaterial: [`AUFGABE.md`](AUFGABE.md)

## GitHub Pages

- Statischer Betrieb (ohne API) ist über GitHub Pages möglich.
- Workflow: `.github/workflows/deploy-pages.yml`
- Im Pages-Betrieb ist nur lokale KI-Auswertung verfügbar (kein serverseitiger API-Endpunkt).

## Datenbasis

- Aufsatztext aus: `Max Frisch_Maturaufsatz.docx`
- Fehlerschlüssel aus: `GYM  FMS Berechnung sprachliche Korrektheit Aufsatznote ab 01.xlsx`

Die Excel-Logik für sprachliche Korrektheit wurde technisch in JavaScript übernommen (Schwellenwert-Matching entsprechend der Tabellen).
