# Series Architecture

This folder arranges verified-and-provisional documentary candidates into a ten-season release order, a hidden event chronology and a connection matrix for **Chathura Was Here — Stories • Journeys • Memories**.

It sits after story discovery and research, and before any screenplay work:

```
01-sources → 02-concepts → 03-idea-bank → 04-story-discovery → 05-story-leads → 06-series-architecture → (human selection) → screenplay
   sources      concepts      148 ideas      14 territories       real leads       release order,            ← decision
                                             24 questions                          chronology, matrix
```

> **Read [SERIES-CANON.md](SERIES-CANON.md) first.** It records what this repository actually establishes, what it does not, the user requirements this layer works under, and four open conflicts — including the fact that **the original channel plan is not in this repository** and that **the GitHub repository is public**.

## What this layer is, and is not

| It is | It is not |
|---|---|
| A provisional arrangement of documentary candidates. | A commissioning document. |
| A record of what evidence supports each candidate, and what does not. | Proof that any candidate can be filmed. |
| A proposal for how release order could create a philosophical experience. | A claim about what any real person's life means. |
| Two independent orderings — release and chronology — over the same stable IDs. | A dated record of real events. |

**A catalog entry is not a story.** Counts of cataloged candidates, evidenced candidates and production-ready candidates are reported separately in every report. They are never added together.

## Files

| File | Use it to |
|---|---|
| [SERIES-CANON.md](SERIES-CANON.md) | Find out what is documented, what is a user requirement, what is a proposal, and which conflicts are open. |
| [PROGRESS.md](PROGRESS.md) | Resume work. Checkpoint after every batch: what was read, what was created, what is left. |
| [STORY-CANDIDATE-CATALOG.md](STORY-CANDIDATE-CATALOG.md) | Read the developed candidates in full — premise, evidence, ethics, philosophical connection. |
| [EPISODE-MATRIX.md](EPISODE-MATRIX.md) | Read the episode matrix as prose and tables. |
| [EPISODE-MATRIX.csv](EPISODE-MATRIX.csv) | The same rows as data, one row per episode 2–99. |
| [STORY-CONNECTIONS.csv](STORY-CONNECTIONS.csv) | One row per justified connection between two story or segment IDs. |
| [IDEA-COVERAGE.csv](IDEA-COVERAGE.csv) | One row per accepted idea: where it is used, where it is not, and repetition concerns. |
| [SEASON-ARC-MAP.md](SEASON-ARC-MAP.md) | The ten-season progression: each season's question, opening assumption, contrasts, shift and episode count. |
| [CONTINUITY-ANCHORS.md](CONTINUITY-ANCHORS.md) | The 8–10 continuity stories, what each requires, and what is observed versus planned. |
| [HIDDEN-CHRONOLOGY.md](HIDDEN-CHRONOLOGY.md) | The event order behind the release order. **Spoiler-sensitive.** |
| [EPISODE-001-TO-100-CONNECTION.md](EPISODE-001-TO-100-CONNECTION.md) | The `E100A → E1 → E100B` sequence and every payoff that depends on it. **Spoiler-sensitive.** |
| [VALIDATION-REPORT.md](VALIDATION-REPORT.md) | Check every count, every ID reference and every consistency rule. Read before trusting any number here. |
| [NEEDS-ATTENTION.md](NEEDS-ATTENTION.md) | Every actionable gap, per candidate, generated from the records. |

### Where each thing is recorded (one authoritative source per entity)

| Entity | Authoritative source | Edited with | Read-only views |
|---|---|---|---|
| Concepts | `02-concepts/` folders and `03-idea-bank/concept-register.md` | by hand | app `/concepts` |
| Ideas | `03-idea-bank/ideas/*.md` | by hand | app `/ideas` |
| Territories, overlap groups, research questions | `04-story-discovery/*.md` | by hand | app |
| **Leads**: idea mapping, territory, research status, sources and their review, subject, place, access, next action | **the lead card** `05-story-leads/SL-*.md` | the app's lead editor, or by hand | everything else |
| **Stories / episodes**: story ID, working title, premise, candidate status, release order (`seasons[].eps`), chronology phase, anchors, calendar conflicts, framing segments | **`data/stories.json`** | by hand (the app shows it read-only) | app `/episodes`, `/series`, generated `.md`/`.csv` |
| **Connections** (stable `CX-` IDs, evidence status) | **`data/connections.json`** | by hand (the app shows it read-only) | app `/series/connections`, `/graph` |
| Desk-research archive (what the 2026-09-18 batches found, merges, batch provenance) | `data/leads.json` | **frozen**; not edited | progress history only |
| Batch themes | `data/batch-notes.json` | by hand | `PROGRESS.md` |

Episode numbers, season positions and anchor flags are **derived** from `seasons[].eps` and `anchors`; they are not stored
twice. No research field is copied into `stories.json`, so an edit to a lead card cannot be overwritten by a planning file.

#### Review fields on a lead card

Four optional front-matter keys record progress that online research cannot establish. When a key is absent, the
conservative default applies. **Nothing is inferred from prose**, and filling in a section never changes them.

| Key | Values | Default |
|---|---|---|
| `subject_identified` | `no`, `yes` | `no` |
| `consent_status` | `none`, `partial`, `documented` | `none` |
| `filming_access` | `none`, `requested`, `confirmed` | `none` |
| `claim_review` | `not reviewed`, `partly supported`, `supported`, `contradicted` | `not reviewed` |

A source counts as **opened and checked** only when its section 18 note says `page opened and read` (or `opened and
checked`). The readiness ladder shown everywhere is: source found through search → source opened and checked → claim
supported → subject identified → consent confirmed → filming access confirmed → ready for production. A step is
reached only when every earlier step is also met. A lead can be saved as `verified` only when the claim is supported,
the subject identified, consent documented and access confirmed.

### Commands

| Command | What it does | Writes |
|---|---|---|
| `python3 tools/rebuild.py` | **The one regeneration command.** Builds every generated file, refreshes the generated block of `PROGRESS.md`, runs the checks. | generated files only |
| `python3 tools/rebuild.py --check` | Changes nothing; fails if a generated file is out of date or a check fails. | nothing |
| `python3 tools/validate.py` | The checks alone; rewrites `VALIDATION-REPORT.md`. | that report |
| `cd app && npm run check` | App-side checks: saving all 112 cards changes no mapping, app and Python agree on every matrix row, and a save followed by `rebuild.py` survives (run on a temporary copy). | nothing in `content/` |
| `python3 tools/write_leads.py [--dry-run]` | Seeds a card only for an archived lead that has **no** card. Never overwrites. | new cards only |

**Seed scripts (do not run).** `tools/b01.py` … `tools/b13_14.py`, `tools/architect.py` and `tools/connections.py`
created the first data on 2026-09-18. They now exit immediately (`tools/_seedguard.py`) because re-running them would
replace researched and edited data with the values hard-coded inside them. They are kept for provenance.
`tools/migrations/m001_single_authority.py` records the one-time move to the model above (and refuses to run twice).

**Generated files** (never edit by hand; `rebuild.py --check` catches it): `EPISODE-MATRIX.md/.csv`,
`STORY-CONNECTIONS.csv`, `IDEA-COVERAGE.csv`, `SEASON-ARC-MAP.md`, `CONTINUITY-ANCHORS.md`, `HIDDEN-CHRONOLOGY.md`,
`EPISODE-001-TO-100-CONNECTION.md`, `STORY-CANDIDATE-CATALOG.md`, `NEEDS-ATTENTION.md`, `VALIDATION-REPORT.md` and the
marked block of `PROGRESS.md`. `README.md` and `SERIES-CANON.md` are written by hand.

### Typical edits

- **Move an episode or change a season:** reorder lead IDs in `seasons[].eps` in `data/stories.json` and update that
  season's declared `episodes`; run `rebuild.py`. Story IDs do not change.
- **Record that a source was opened:** in the lead card's section 18, change the note to end `— page opened and read`,
  then record the claim review in the lead editor.
- **Mark a subject identified, consent or access:** use the lead editor's *Evidence and access review* fields.
- **Change a connection's evidence status:** edit `status` in `data/connections.json` (`proposal`, `source-reported`,
  `source-checked`). Nothing is labelled an established fact until its sources have been opened and checked.

## ID conventions used here

| Pattern | Entity |
|---|---|
| `ST-001` … | Story candidate. Assigned in lead-ID order and **never** derived from an episode number. |
| `SEG-E001`, `SEG-E100A`, `SEG-E100B` | The three fixed framing segments. |
| `CX-001` … | One connection. Stored in `data/connections.json`, so deleting one never renumbers the rest. |
| `CC-01` … | One recorded calendar conflict. |
| `S01` … `S10` | Release-order seasons. |
| `P1` … `P7` | Proposed chronology phases (P7 claims no position). |
| `SP-01` … `SP-10` | Season piece slots. No object is assigned to any of them. |
| `SL-SQ05-001` | Story lead, in the existing convention, under `../05-story-leads/`. |

## Relationship to the story-lead layer

`05-story-leads/` holds research; this folder holds arrangement. They join on the story ID. Every catalogued story
has a `lead_id`; every lead card names its `story_id` in section 1 of the body. **No lead card carries an episode
number, season, coordinate, object or chronology position** (CONFLICT-01).

## The explorer app

The app (`../../app`) reads this folder live: `/episodes` (the 98 candidates), `/episodes/ST-007` (a story page),
`/episodes/SEG-E001` (framing segments), `/attention`, `/series` (release order), `/series/chronology`,
`/series/connections` and `/graph`. Planning data is **read-only** in the app; lead cards are edited there.

**Spoilers.** With `EXPLORER_SPOILERS=hide` the server withholds the chronology page, Episode 100, chronology and
continuity fields, spoiler-weight connections, and every document in this folder requested under `/docs/...` (they
return 404). This protects the app's own pages only. **This folder has already been pushed to a public GitHub
repository**, and nothing in the app can make those files private. See CONFLICT-04 in `SERIES-CANON.md`.

## Rules that do not change

- **Every documentary must stand on its own.** If every reference to the philosophy, the seasons, the chronology and the connections were removed, each episode must still be worth watching. A candidate retained only because it fits a concept or fills a slot is rejected here, not kept.
- **No real person proves anything.** The philosophical connection is an interpretation held by the production team. It is never told to a participant as an explanation of their life, and evidence that could challenge it is recorded alongside it.
- **Nothing here is footage.** Visual and sound notes describe what exists in a place, as a proposed opportunity. No shot is claimed to have been filmed.
- **Nothing here is consent.** No participant has agreed to anything. No one has been contacted.
