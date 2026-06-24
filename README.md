# tayfunkhojasteh.com

Deine persönliche Brand-Website — Next.js + Framer Motion.

## Starten

```bash
# 1. In den Projektordner wechseln
cd tayfunkhojasteh

# 2. Pakete installieren (nur einmal nötig)
npm install

# 3. Lokal starten
npm run dev
```

Dann öffne **http://localhost:3000** im Browser.

## Ordnerstruktur

```
src/
  app/
    page.tsx          ← Hauptseite (alle Sections hier eingebunden)
    layout.tsx        ← HTML-Grundgerüst + Metadaten
    globals.css       ← Farben, Schriften, globale Stile
  components/
    Hero.tsx          ← Cinematic Opener mit Shard-Explosion
    Hero.module.css   ← Stile für Hero
    About.tsx         ← "The Group" Sektion
    About.module.css  ← Stile für About
```

## Neue Sektion hinzufügen

1. Neue Datei in `src/components/` erstellen (z.B. `Projects.tsx`)
2. In `src/app/page.tsx` importieren und einbinden
3. Claude schickt dir genau wo und was du einfügen musst

## Auf Vercel deployen

1. Diesen Ordner als GitHub Repository pushen
2. In Vercel → "Import Project" → GitHub Repo auswählen
3. Deploy klicken → fertig
