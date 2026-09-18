# Research Explorer

An interactive tool for the *Chathura Was Here* research pipeline. It reads the Markdown in [`../content`](../content) and connects it: sources → concepts → idea cards → territories and overlap groups → research questions → story leads.

Nothing is duplicated into a database. The Markdown files stay the single source of truth, and the app re-reads them on demand.

## Running it

Run this on the machine where the repository lives (the Windows PC). Node 20.9 or newer is required.

```bash
cd app
npm install
npm run dev          # http://localhost:3000
```

`npm run build && npm start` also works. Pages are rendered on each request, because the app reads the Markdown files live.

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
| `/leads`, `/leads/new`, `/leads/SL-SQ05-001` | Story leads: list, editor and view. |
| `/docs/...` | Any Markdown file in `content/` or `instructions/`, rendered or with line numbers (useful for checking a source trace such as “lines 64–66”). |

IDs written anywhere in the Markdown (`C006-I01`, `SQ05`, `T03`, `G12`, `SL-SQ05-001`) become links automatically, and relative links between files resolve to the matching page.

## The lead editor

`/leads/new` builds a story-lead file from [`story-lead-template.md`](../content/04-story-discovery/story-lead-template.md), so the template stays the single definition of the format. Saving writes Markdown to `content/05-story-leads/`.

Rules enforced when saving:

- The lead ID must match `SL-SQ<nn>-<nnn>` and belong to the chosen question.
- Lead idea, supporting ideas, territory and the open question are filled from the shortlist, so a lead cannot drift from its brief.
- Unknown idea IDs are rejected.
- Screenplay readiness stays `not ready` until the research status is `verified`.
- Status changes are appended to the status history, with the date.

The editor never edits idea cards, concepts or story-discovery files. Those are written by hand or by the research agents.

## How the data is parsed

`src/lib/content.ts` reads and connects:

- **Concepts** from the folder names under `content/02-concepts/`, plus English glosses, coverage and status from `concept-register.md`.
- **Ideas** from the front matter and sections of each card in `content/03-idea-bank/ideas/`.
- **Territories** from `philosophy-map.md` (Appendix A is the authoritative mapping).
- **Overlap groups** from the summary table and detail sections of `overlap-map.md`.
- **Scores and tiers** from the table rows of `documentary-potential-matrix.md`.
- **Research questions** from the `## SQxx` sections of `research-shortlist.md`.
- **Leads** from `content/05-story-leads/`.

Everything is cached in memory for the life of the server process. After editing Markdown outside the app, press **↻ Reload files** in the sidebar.

## Notes

- `AGENTS.md` and `CLAUDE.md` in this folder are generated by `next dev` itself.
- The app shows research material that must not be treated as verified fact. It repeats the project's rule in the places it matters: hypothetical directions are not stories, and leads start `unverified`.
