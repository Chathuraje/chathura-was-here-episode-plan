# Chathura Was Here - Sources and Concepts

This repository contains two content layers:

```text
content/01-sources/    original texts, source maps, and extraction references
content/02-concepts/   concepts grouped by chapter with supporting extracts
app/                   browser for the source and concept library
```

## Run the library

```text
cd app
npm install
npm run dev
```

Open <http://localhost:3000>. The home page links directly to the source library and concept catalogue.

## Episode-development planning

The reviewable Step 1 audit, consolidated rules, workflow, proposed data model, and Episode 1/100 continuity foundation are indexed in [`docs/planning/README.md`](docs/planning/README.md). These are planning documents only; the app does not yet implement the proposed episode-development features.

## Validate the content

From `app/`, run:

```text
npm run check
npm run typecheck
npm run build
```
