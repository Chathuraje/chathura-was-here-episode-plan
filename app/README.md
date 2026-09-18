# Research Explorer

An editorial workspace for the *Chathura Was Here* research pipeline. It reads [`../content`](../content) live and connects it: sources → concepts → idea cards → territories and overlap groups → research questions → story leads → **the 98 episode candidates (Episodes 2–99)**.

Nothing is duplicated into a database. Each entity has one authoritative file (see the table in [`../content/06-series-architecture/README.md`](../content/06-series-architecture/README.md)), and the app re-reads them on demand.

## Running it

Run this on the machine where the repository lives (the Windows PC). Node 20.9 or newer is required.

```bash
cd app
npm install
npm run dev          # http://localhost:3000
```

`npm run build && npm start` also works. `next start` listens on every network interface by default; add `-H 127.0.0.1` (for example `npx next start -H 127.0.0.1`) to keep the explorer, and its spoiler pages, on this machine only.

`npm run check` runs the data checks (Node 22.18 or newer, and `python3` on the path): every lead card is re-saved in memory through the editor's own code and must keep its mappings; the app's derived values must match `EPISODE-MATRIX.csv`; and a save followed by `tools/rebuild.py` is run on a temporary copy of the content. Pages are rendered on each request, because the app reads the Markdown files live.

If `node_modules` already exists from another machine, delete it first — the Next.js compiler binary is platform-specific:

```powershell
rmdir /s /q node_modules    # cmd
Remove-Item -Recurse -Force node_modules   # PowerShell
npm install
```

### Opening the repository over a network share (macOS)

If you instead open this repository from a Mac over SMB, Next.js is unusable from the share: Turbopack cannot `fsync` its cache (`Operation not supported (os error 45)`), and loading Next.js takes minutes per start.

`npm run setup` handles that case. On macOS, when the project path starts with `/Volumes/`, it points `node_modules` and `.next/dev/cache` at `~/.cache/cwh-explorer/<id>/` and installs there with `npm install --prefix`, so npm never replaces the symlinks. Then use `npm run dev` as usual. On Windows and on local paths the script does nothing.

Two rules for that setup: delete any real `node_modules` folder inside `app/` first, and never run plain `npm install` inside `app/` on the share, because npm replaces the symlink with a real folder. If symlinks are not possible at all, disable the disk cache instead in `next.config.ts`:

```ts
const nextConfig: NextConfig = {
  experimental: { turbopackFileSystemCacheForDev: false },
};
```

### Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `CONTENT_DIR` | `../content` | Where the research Markdown lives. |
| `EXPLORER_READ_ONLY` | unset | Set to `1` to disable saving story leads. |
| `EXPLORER_SPOILERS` | unset (shown) | Set to `hide` to withhold the hidden chronology, Episode 100, continuity and chronology fields, spoiler-weight connections, and every document under `content/06-series-architecture/` (including direct `/docs/...` requests, which return 404). Enforced on the server. It does **not** make files in the public GitHub repository private. |

## What each page does

| Route | Purpose |
|---|---|
| `/` | Pipeline overview, tier counts, shortlist by territory. |
| `/graph` | Force-directed connection graph. Click a node for its connections, right-click to open its page, filter by type or preset, focus on a neighbourhood. |
| `/search` | Search across ideas, questions, territories, groups, concepts and leads. Typing an exact ID jumps straight to it. |
| `/sources` | Book extracts, source maps and instruction files. |
| `/concepts`, `/concepts/C006` | Concept register, Sinhala titles, source extracts, source note and the ideas drawn from it. |
| `/ideas`, `/ideas/C006-I01` | Filterable idea bank (status, tier, territory, tags) with a score view; full card plus every connection and its cautions. |
| `/territories`, `/territories/T13` | The 14 human territories, their ideas by tier and their research questions. |
| `/groups`, `/groups/G24` | Overlap groups: lead card, supporting cards, cards kept separate, side-by-side comparison. |
| `/shortlist`, `/shortlist/SQ05` | The 24 research questions and their full briefs. |
| `/leads`, `/leads/new`, `/leads/SL-SQ05-001` | Story leads: list, editor and view. Each lead shows its linked story and episode. |
| `/episodes` | **The 98 episode candidates** in release order, with search, filters (season, research status, territory, idea ID, location, continuity, unresolved issue) and sorting (release order, season, research readiness). Episode 1 and Episode 100 appear separately as framing references. |
| `/episodes/ST-007`, `/episodes/12`, `/episodes/SEG-E001` | One candidate's story page (verified / reported / interpretation / proposal / still-to-check blocks), or a framing segment. A number redirects to the story at that episode. |
| `/attention` | Needs attention: every actionable gap generated from the records, by type and by candidate, plus open series decisions. |
| `/series` | Release order: ten seasons and their proposed sequence. |
| `/series/chronology` | Hidden chronology: the fixed framing sequence, source-reported links, proposed phases and unresolved calendar conflicts. Spoiler-sensitive. |
| `/series/connections?cx=CX-005` | Every connection with its basis, evidence status and what is still required; filter by philosophical, chronological or object/footage continuity. |
| `/docs/...` | Any Markdown file in `content/` or `instructions/`, rendered or with line numbers (useful for checking a source trace such as “lines 64–66”). |

IDs written anywhere in the Markdown (`C006-I01`, `SQ05`, `T03`, `G12`, `SL-SQ05-001`, `ST-007`, `SEG-E001`, `CX-005`) become links automatically, and relative links between files resolve to the matching page.

## The lead editor

`/leads/new` builds a story-lead file from [`story-lead-template.md`](../content/04-story-discovery/story-lead-template.md). Saving writes Markdown to `content/05-story-leads/`. The lead card is the authoritative research record; the series tools read it and never overwrite it.

Rules enforced when saving (`src/lib/lead-format.ts`, `applyLeadEdit`):

- The lead ID must match `SL-SQ<nn>-<nnn>` and belong to the chosen question.
- **An existing lead keeps its own primary idea, supporting ideas and territory.** They are editable fields pre-filled from the card. The research question's defaults are used only when creating a new lead and a field is left blank. (Before this fix, saving any lead replaced its researched idea and territory with the question's defaults; 85 of the 112 cards would have been changed.)
- Unknown idea IDs and territories are rejected.
- Front-matter keys the editor does not manage are kept exactly as they were.
- **Evidence and access review** fields (`subject_identified`, `consent_status`, `filming_access`, `claim_review`) are set explicitly and never inferred from the text. A lead can be `verified` only when the claim is supported, a subject identified, consent documented and access confirmed; screenplay readiness stays `not ready` until then.
- Status changes are appended to the status history, with the date.

**Planning data is read-only in the app.** Episode placement, premises, seasons, chronology, anchors and connections live in `content/06-series-architecture/data/`; edit those files and run `python3 tools/rebuild.py`. The app says so on every page that shows them.

The editor never edits idea cards, concepts or story-discovery files.

## How the data is parsed

`src/lib/content.ts` reads and connects:

- **Concepts** from the folder names under `content/02-concepts/`, plus English glosses, coverage and status from `concept-register.md`.
- **Ideas** from the front matter and sections of each card in `content/03-idea-bank/ideas/`.
- **Territories** from `philosophy-map.md` (Appendix A is the authoritative mapping).
- **Overlap groups** from the summary table and detail sections of `overlap-map.md`.
- **Scores and tiers** from the table rows of `documentary-potential-matrix.md`.
- **Research questions** from the `## SQxx` sections of `research-shortlist.md`.
- **Leads** from `content/05-story-leads/` (`src/lib/lead-format.ts`, which also extracts place, sources and their review status, access and next action).
- **Episode candidates** from `content/06-series-architecture/data/stories.json` and `connections.json`, joined to the lead cards (`src/lib/series.ts`, rules in `src/lib/series-rules.ts`, mirrored by `tools/series.py`).

Everything is cached in memory for the life of the server process. After editing Markdown outside the app, press **↻ Reload files** in the sidebar.

## Notes

- `AGENTS.md` and `CLAUDE.md` in this folder are generated by `next dev` itself.
- The app shows research material that must not be treated as verified fact. It repeats the project's rule in the places it matters: hypothetical directions are not stories, and leads start `unverified`.
