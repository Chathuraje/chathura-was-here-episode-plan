# Chathura Was Here — development foundation

This repository contains two content layers:

```text
content/01-sources/    original texts, source maps, and extraction references
content/02-concepts/   concepts grouped by chapter with supporting extracts
development/           digests, ideas, 98-film draft slate, lessons, objects, framing and decisions
app/                   dashboard, briefs, validation, location/release proposals and screenplay gates
```

## Run the library

```text
cd app
npm install
npm run dev
```

Open <http://localhost:3000>. The dashboard covers the source library through the gated screenplay pipeline.

## Current state

- Source library, 102 concepts, and 102 concept digests are complete.
- Ten chronological groups and the 98-film Chronology v1 slate exist as a draft awaiting Chathura's creative approval.
- Ten planned object-acquisition episodes and episode/group viewer lessons are recorded; object identities remain undecided.
- Location selection is implemented, but locations and real-world research remain human-controlled and conservative by default.
- The release planner is proposal-only. The ordinary public structure is Episodes 1–99 across ten seasons, with exactly eight episodes in Season 1. Public numbers 2–98 remain unassigned. Episode 100 keeps its number but is hidden/discoverable outside the ordinary public structure.
- The screenplay pipeline requires explicit Chathura approval between treatment, scene outline, and production; production also requires sufficient real-world research.

Next human phase: **CHATHURA — CHRONOLOGY V1 REVIEW, GRP-01 → GRP-10**.

## Episode-development planning

The dated Step 1 audit, consolidated current rules, historical data-model proposal, and Episode 1/100 continuity foundation are indexed in [`docs/planning/README.md`](docs/planning/README.md). The roadmap records both historical steps and current status. Review the candidate ideas at `/ideas`, then place the confirmed ones at `/locations`. The chronology, learning path and earlier per-film location data have been cleared and are rebuilt from that work.

## Validate the content

From `app/`, run:

```text
npm run check
npm run typecheck
npm run build
```
