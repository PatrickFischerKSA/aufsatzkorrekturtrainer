# Lokale PDF-Bibliothek (optional)

Für den Betriebsmodus `Lokal/abgeschottet` kann die PDF-Verarbeitung ohne Internet nur funktionieren,
wenn diese zwei Dateien lokal vorliegen:

- `pdf.min.js`
- `pdf.worker.min.js`

Lege beide Dateien in diesen Ordner (`vendor/`).

Dann kann `ai-korrektur.html` PDF-Dateien auch ohne externe CDN-Verbindung einlesen.
