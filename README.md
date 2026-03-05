# aufsatzkorrekturtrainer

Interaktive Lern- und Feedbackumgebung zum Maturaufsatz von Max Frisch.

Schüler*innen übernehmen die Rolle von Deutschlehrpersonen, vergeben Teilnoten nach Raster und begründen jede Bewertung schriftlich. Für jeden Kommentar erzeugt die Umgebung ein qualifiziertes inhaltliches Feedback mit Stärken, Lücken und nächstem Verbesserungsschritt.

## Lernziele

- kriteriengeleitete Aufsatzkorrektur (Inhalt, Aufbau, sprachlicher Ausdruck, sprachliche Korrektheit)
- differenzierte Notenbegründung mit Textbezug
- metakognitive Verbesserung durch automatisches Qualitätsfeedback

## Enthaltene Funktionen

- Volltext des Maturaufsatzes (Max Frisch, 1930)
- Pflicht-Kriterienfelder pro Bereich (Teilaspekte + Teilnote + Kommentar)
- Pflichtfeld für Gesamtbegründung der Schlussnote
- automatische Teilnote **sprachliche Korrektheit** nach Excel-Schlüssel (Stufe 1-4, mit/ohne Korrekturprogramm)
- gewichtete Gesamtnote (0.4 / 0.2 / 0.2 / 0.2)
- qualitatives Feedback zu jedem Kommentar
- Export eines Markdown-Berichts

## Start lokal

1. Repository klonen oder herunterladen.
2. `index.html` im Browser öffnen.

Alternativ mit lokalem Server:

```bash
cd aufsatzkorrekturtrainer
python3 -m http.server 8080
```

Dann im Browser: `http://localhost:8080`

## Einsatz im Unterricht

1. Schüler*innen lesen den Aufsatztext.
2. Sie bewerten jeden Bereich und schreiben pro Bereich eine Begründung.
3. Die App gibt direkt kriterienspezifisches Feedback.
4. Schüler*innen überarbeiten ihre Kommentare in einer zweiten Runde.
5. Bericht als Markdown exportieren und auf GitHub als Abgabe hochladen.

Begleitmaterial: [`AUFGABE.md`](AUFGABE.md)

## GitHub-Lernumgebung

- Das Projekt ist als statische Seite ausgelegt und kann direkt über GitHub Pages veröffentlicht werden.
- Ein Workflow unter `.github/workflows/deploy-pages.yml` ist vorbereitet.

### Einmalige Einrichtung in GitHub

1. Repository-Name: `aufsatzkorrekturtrainer`
2. In den Repository-Einstellungen unter **Pages** die Quelle auf **GitHub Actions** setzen.
3. Nach dem Push auf `main` wird die Lernumgebung automatisch deployt.

## Datenbasis

- Aufsatztext aus: `Max Frisch_Maturaufsatz.docx`
- Fehlerschlüssel aus: `GYM  FMS Berechnung sprachliche Korrektheit Aufsatznote ab 01.xlsx`

Die Excel-Logik für die Teilnote sprachliche Korrektheit wurde technisch in JavaScript übernommen (Schwellenwert-Matching entsprechend der Tabellen).
