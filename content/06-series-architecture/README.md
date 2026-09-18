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

### Working files

| Path | Purpose |
|---|---|
| `data/leads.json` | **Source of truth for research.** Every lead with its sources, access dates, ethics notes and merge decisions. |
| `data/stories.json` | **Source of truth for architecture.** Selection, story IDs, seasons, release order, chronology phases, anchors and the three framing segments. |
| `data/connections.json` | Every justified connection. |
| `data/batch-notes.json` | One line per research batch, used by the progress generator. |
| `tools/b01.py` … `tools/b13_14.py` | The research batches, kept so that every lead can be traced to the batch that opened it. |
| `tools/architect.py` | Selection, story IDs, seasons, release order and chronology. Rebuilds `data/stories.json`. |
| `tools/connections.py` | Rebuilds `data/connections.json`. |
| `tools/build.py` | Regenerates every `.md` table and every `.csv` from `data/`. |
| `tools/write_leads.py` | Writes the lead cards into `../05-story-leads/` in the existing template. |
| `tools/validate.py` | Runs the checks and rewrites `VALIDATION-REPORT.md`. Exits non-zero on failure. |
| `tools/progress.py` | Rewrites the generated block in `PROGRESS.md`. |

Rebuild order after editing `data/`: `architect.py` → `connections.py` → `build.py` → `write_leads.py` → `validate.py` → `progress.py`.

The generated files are committed so the repository stays readable without running anything. **Edit `data/`, then run `tools/build.py`** — editing a generated table by hand will be overwritten, and the validation check that readable reports agree with the CSV data exists precisely to catch that.

## ID conventions used here

| Pattern | Entity |
|---|---|
| `ST-001` … | Story candidate. Assigned in discovery order and **never** derived from an episode number. |
| `SEG-E001`, `SEG-E100A`, `SEG-E100B` | The three fixed framing segments. |
| `CX-001` … | One connection between two story or segment IDs. |
| `S01` … `S10` | Release-order seasons. |
| `SP-01` … `SP-10` | Season piece slots. No object is assigned to any of them. |
| `SL-SQ05-001` | Story lead, in the existing convention, under `../05-story-leads/`. |

Episode numbers are an **attribute** of a story, not its identity. Re-planning a season changes episode numbers and leaves every source link intact.

## Relationship to the story-lead layer

`05-story-leads/` holds research. `06-series-architecture/` holds arrangement. They join on the story ID.

- Every catalogued story has a `lead_id`; every lead card names its `story_id` in the body, **not** in front matter.
- **No lead card carries an episode number, season, coordinate, object or chronology position.** The research layer's own instruction forbids it, and that boundary is kept. See CONFLICT-01 in the canon.
- Lead front matter uses only the fields and enum values the existing template and the app's parser define.

## How this connects to the explorer app

Read before changing anything in `app/`. **No existing parser has been modified by this layer and no app redesign has been undertaken.** The app was being edited in parallel while this layer was built; what follows describes `app/src/lib/content.ts`, `leads.ts` and `routes.ts` **as they stand on 2026-09-18**, and it should be re-checked after any further app work.

| App behaviour | Effect of this layer |
|---|---|
| `DIRS` in `content.ts` names `01-sources` … `05-story-leads`. `06-series-architecture` is not in it. | The typed loaders ignore this folder. No concept, idea, territory, group or shortlist parsing is affected. |
| `loadAll()` now scans the content root for folders **not** in `DIRS` and returns them as `extras`, taking each one's title from its `README.md`. | **This folder is discovered automatically.** Its `README.md` title is what the app shows. That is why this file starts with a title and a warning rather than a table. |
| `mdDocs()` indexes Markdown in a fixed list of folders, which does not include this one. | These documents do not appear in the app's document *lists*. They are still reachable, see the next row. |
| `readDoc()` / `safeRepoPath()` allow any `.md` under the content root or `instructions/`. | Every `.md` here is reachable at `/docs/content/06-series-architecture/<file>` — **including the spoiler-sensitive ones**. |
| `readDoc()` returns `null` for non-`.md` files. | The four `.csv` files are **not** served by the app. They are data for a future consumer, not app content. |
| `listLeads()` reads `05-story-leads/`, requires `lead_id` matching `SL-SQ\d{2}-\d{3}` and a matching filename. | All 112 lead cards satisfy both and appear normally. This was checked against the live regexes, not assumed. |
| `parseLead()` ignores unknown front-matter keys, but `serializeLead()` writes a fixed key list. | A lead edited in the app would **silently drop** any extra key. This is why `story_id`, `candidate_status` and every episode field are kept **out** of lead front matter and appear only in section 1 of the body. |
| `knownIds()` auto-links `C…`, `T…`, `G…`, `SQ…` and `SL-…` inside Markdown. | `ST-…`, `SEG-…`, `CX-…` and `SP-…` are **not** auto-linked and render as plain text. Adding them would need changes to `knownIds()` and `routes.ts`, which have not been made. |
| `routeForRepoPath()` now matches by numbered folder name rather than by a fixed `content/` prefix. | Nothing here depends on the content root being called `content`, so this layer survives that refactor. |

**Spoiler exposure inside the app.** The docs viewer already serves every `.md` under the content root, so `HIDDEN-CHRONOLOGY.md`, `EPISODE-001-TO-100-CONNECTION.md`, `CONTINUITY-ANCHORS.md` and the reveal columns of the matrix are readable by anyone who can reach a running explorer. If the explorer is ever exposed beyond the research team, those paths need excluding in `safeRepoPath()` or serving behind a flag. **A spoiler-sensitive heading is a label for humans; it enforces nothing.** No such exclusion has been added, because changing the parser was outside this commission.

## Rules that do not change

- **Every documentary must stand on its own.** If every reference to the philosophy, the seasons, the chronology and the connections were removed, each episode must still be worth watching. A candidate retained only because it fits a concept or fills a slot is rejected here, not kept.
- **No real person proves anything.** The philosophical connection is an interpretation held by the production team. It is never told to a participant as an explanation of their life, and evidence that could challenge it is recorded alongside it.
- **Nothing here is footage.** Visual and sound notes describe what exists in a place, as a proposed opportunity. No shot is claimed to have been filmed.
- **Nothing here is consent.** No participant has agreed to anything. No one has been contacted.
