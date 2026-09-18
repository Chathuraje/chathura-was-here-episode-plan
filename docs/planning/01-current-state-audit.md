# Current-state audit

Audit date: 2026-09-18  
Repository: `https://github.com/Chathuraje/chathura-was-here-episode-plan.git`  
Checkout: `D:\chathura-was-here-notes`  
Branch and revision at audit start: `main`, `aeb0eca` (`origin/main`)  
Working tree at audit start: clean

## Scope and confidence

This is a structural inventory and a representative traceability review. It is not a full doctrinal, translation, transcription, or passage-by-passage quality audit. Counts below were calculated from the checkout. Representative extract headers and passages were sampled at the beginning, middle, and end of the catalogue, but all 212 extracts were not semantically verified.

Only this repository was inspected. It is the only Git repository in the supplied workspace. No unrelated folders were searched.

## Verified inventory

The repository currently has two content layers and one read-only browsing app:

| Layer | Exact path | Verified contents |
|---|---|---|
| Source library | `content/01-sources/` | 10 tracked Markdown documents: four source-book transcriptions, four source maps, and two extraction/routing guides |
| Local source scans | `content/01-sources/` | Four locally present PDFs, ignored by `*.pdf` in `.gitignore` and therefore not version-controlled |
| Concept catalogue | `content/02-concepts/` | 102 concept directories in nine chapter directories; 212 Markdown extracts |
| Browser app | `app/` | Next.js app for browsing and searching the two existing content layers |

### Source files

Tracked source-book transcriptions:

- `content/01-sources/Abhidhammattha Pradeepika Book 1.md` — 9,287 lines
- `content/01-sources/Abhidhammattha Pradeepika Book 2.md` — 8,641 lines
- `content/01-sources/Abhidhammattha Pradeepika Book 3.md` — 12,248 lines
- `content/01-sources/Abhidhammattha Pradeepika Book 4.md` — 9,726 lines

Tracked source maps:

- `content/01-sources/Pradeepika Book 1 Source Map.md`
- `content/01-sources/Pradeepika Book 2 Source Map.md`
- `content/01-sources/Pradeepika Book 3 Source Map.md`
- `content/01-sources/Pradeepika Book 4 Source Map.md`

Tracked extraction guidance:

- `content/01-sources/PDF to Markdown Extraction Guide.md`
- `content/01-sources/Splitting a Book MD into Concepts.md`

Locally present, ignored scans:

- `content/01-sources/Abhidhammattha Pradeepika Book 1.pdf`
- `content/01-sources/Abhidhammattha Pradeepika Book 2.pdf`
- `content/01-sources/Abhidhammattha Pradeepika Book 3.pdf`
- `content/01-sources/Abhidhammattha Pradeepika Book 4.pdf`

The app enumerates Markdown only, so it reports 10 source documents and presents the PDFs as unavailable local files in the direct file browser.

### Concept identifiers and chapter organization

The app derives identifiers from directory names: concept number 1 becomes `C001`, and so on. All integers 1–102 occur exactly once; there are no numeric gaps or duplicates.

| Chapter | Concepts | Identifier span | Extract files |
|---|---:|---|---:|
| 1 | 18 | `C001`–`C018` | 36 |
| 2 | 13 | `C019`–`C031` | 26 |
| 3 | 6 | `C032`–`C037` | 12 |
| 4 | 13 | `C038`–`C050` | 26 |
| 5 | 12 | `C051`–`C062` | 24 |
| 6 | 11 | `C063`–`C073` | 22 |
| 7 | 4 | `C074`–`C077` | 8 |
| 8 | 7 | `C078`–`C084` | 14 |
| 9 | 18 | `C085`–`C102` | 44 |
| **Total** | **102** | **`C001`–`C102`** | **212** |

Every concept has `sources/Abhidharma Margaya.md`. Every concept also has an `Abhidhammattha Pradeepika` extract. Ninety-four concepts have two extracts; the following eight Chapter 9 concepts have three:

- `C085`, `C089`, `C090`, `C093`, `C099`, `C100`, `C101`, and `C102`.

Their third file is `sources/Abhidhammattha Pradeepika Book 4.md`; the additional generic `sources/Abhidhammattha Pradeepika.md` comes from an earlier volume whose relevant passage was deliberately routed across chapter boundaries.

### Source-map coverage

The four source-map tables contain 110 unique book-to-concept assignments in total:

| Map | Assignment rows | Notes |
|---|---:|---|
| `content/01-sources/Pradeepika Book 1 Source Map.md` | 69 | `C001`–`C062` plus seven cross-chapter assignments in Chapter 9 |
| `content/01-sources/Pradeepika Book 2 Source Map.md` | 16 | `C063`–`C077` plus `C093` |
| `content/01-sources/Pradeepika Book 3 Source Map.md` | 7 | `C078`–`C084` |
| `content/01-sources/Pradeepika Book 4 Source Map.md` | 18 | `C085`–`C102` |

Those 110 rows match the 92 files named `Abhidhammattha Pradeepika.md` plus the 18 named `Abhidhammattha Pradeepika Book 4.md`. The maps explicitly document deliberate overlap and routing judgments. They also state that no commentary passages were abandoned. This audit verified the presence and structural correspondence of those claims; it did not independently reproduce the full line-coverage audit.

The 110 Pradeepika extracts begin with structured front matter including source book, section/pages, extract scope, and concept. The 102 `Abhidharma Margaya.md` extracts begin directly with headings and do not carry an equivalent structured provenance envelope.

Representative files inspected included:

- `content/02-concepts/Chapter 1/Concept 1 - අභිධර්මය, ප්‍රඥප්තිය සහ පරමාර්ථය/sources/Abhidhammattha Pradeepika.md`
- `content/02-concepts/Chapter 1/Concept 1 - අභිධර්මය, ප්‍රඥප්තිය සහ පරමාර්ථය/sources/Abhidharma Margaya.md`
- `content/02-concepts/Chapter 4/Concept 38 - චිත්ත වීථි/sources/Abhidhammattha Pradeepika.md`
- `content/02-concepts/Chapter 4/Concept 38 - චිත්ත වීථි/sources/Abhidharma Margaya.md`
- `content/02-concepts/Chapter 9/Concept 102 - නිරෝධ සමාපත්ති වීථිය/sources/Abhidhammattha Pradeepika Book 4.md`
- `content/02-concepts/Chapter 9/Concept 102 - නිරෝධ සමාපත්ති වීථිය/sources/Abhidhammattha Pradeepika.md`
- `content/02-concepts/Chapter 9/Concept 102 - නිරෝධ සමාපත්ති වීථිය/sources/Abhidharma Margaya.md`

The sample confirmed that Pradeepika extracts preserve page/routing metadata and that the same concept can intentionally contain more than one source-book passage. It does not establish that every cut, translation, or doctrinal association is correct.

## Dashboard capabilities

The application is file-backed and currently read-only with respect to project content.

| Capability | Verified implementation |
|---|---|
| Content root | `app/src/lib/content.ts` resolves `CONTENT_DIR`, defaulting to `../content` from the app working directory |
| Concept loading | Folder names under `content/02-concepts/Chapter N/Concept N - title/` are parsed into `Cnnn`; Markdown files under each `sources/` directory are listed |
| Source loading | Top-level Markdown files under `content/01-sources/` are listed; title comes from the first H1 when present |
| Caching | One process-global promise cache, cleared by `app/src/app/actions.ts`; reload revalidates the app layout |
| Storage writes | None for project records; there is no database, API persistence, edit form, or episode-development schema |
| Path safety | `readDoc` restricts browsing to the resolved `content/` directory and reads Markdown only |
| Validation | `app/scripts/check-data.mjs` requires exactly the two current content directories and checks only basic presence/supporting-Markdown conditions |

Verified routes:

- `/` — counts and links (`app/src/app/page.tsx`)
- `/sources` — tracked Markdown source catalogue (`app/src/app/sources/page.tsx`)
- `/concepts` — concepts grouped by chapter (`app/src/app/concepts/page.tsx`)
- `/concepts/[id]` — one concept and its extracts (`app/src/app/concepts/[id]/page.tsx`)
- `/search` — searches concept IDs/titles/chapters and source-document titles/paths, not passage body text (`app/src/app/search/page.tsx`)
- `/docs/[[...path]]` — safe Markdown/directory browser inside `content/` (`app/src/app/docs/[[...path]]/page.tsx`)

The dashboard does **not** currently support interpretations, ideas, episodes, groups, objects, locations, research, chronology, release planning, shared scenes, review decisions, exports, or screenplay versions.

At Step 1 verification, `npm run check`, `npm run typecheck`, and `npm run build` all passed from `app/`. The production build emitted eight Turbopack warnings that dynamic filesystem access in `app/src/lib/content.ts` causes broad project tracing; these warnings pre-date and are unaffected by this documentation-only change.

## Available project and continuity references

No channel instruction documents, screenplays, episode briefs, treatments, or prior planning documents were found in the repository. Searches for relevant filenames and for terms including `episode`, `screenplay`, `season`, `Hunnasgiriya`, `Meemure`, `crowd`, and `forest` found no project continuity material outside the new brief.

Therefore:

- no Episode 1 screenplay is available to verify;
- no Episode 100 screenplay is available to verify;
- no Episode 99 crowd-scene document is available to verify;
- no exact shared-footage edit boundaries can be extracted;
- no channel-specific creative instructions beyond the supplied brief can be incorporated.

The continuity requirements in `05-episode-001-100-continuity.md` are consequently separated into “repository evidence” and “requirements supplied in the current brief.” No missing dialogue, action, or scene has been invented.

### Dated follow-up — 2026-09-18

The statements above preserve what was available **inside the repository at the time of the original audit**. The three relevant documents are still not present in the repository, but their external Google Docs references have since been identified and were successfully retrieved through the authorized Google Drive connection on 2026-09-18:

- [Channel Details](https://docs.google.com/document/d/1unE3metwZwMDAjgNPPtCJ97_BDV5SeHL-oF0itFijHU) — retrieved; planning snapshot: `docs/planning/references/channel-details-2026-09-18.md`
- [The Beginning](https://docs.google.com/document/d/10fWaF9Vl_4_IzohQfDQLiXu2Y0nI2GVVFPHAy3B2KHs) — retrieved; planning snapshot: `docs/planning/references/the-beginning-2026-09-18.md`
- [The Way Back](https://docs.google.com/document/d/1IjQCv2l4ECAc_MLG18a71a-flpB3gEFsdpvNxCpxVmY) — retrieved; planning snapshot: `docs/planning/references/the-way-back-2026-09-18.md`

These are now identified external references, not repository files. Their contents establish intended creative and screenplay relationships, but they do not supply footage IDs, timecodes, edit-decision data, or independent verification that planned events were captured or occurred. The Episode 99 crowd relationship remains provisional under the current instruction.

## Gaps and tensions

1. The full original `Abhidharma Margaya` book is not present in `content/01-sources/`, although all 102 concepts contain extracts named `Abhidharma Margaya.md`. That source family has weaker repository-level provenance than the four Pradeepika volumes.
2. The ignored PDFs are available only in this local checkout. A fresh clone would contain the Markdown transcriptions but not the scans used to independently check them.
3. Only Pradeepika extracts have consistent structured front matter. `Abhidharma Margaya` extracts rely on path, filename, and headings.
4. Current concept IDs are deterministic but derived from mutable folder names rather than stored as explicit record fields.
5. The current validator and app intentionally recognize only two content layers. A future episode system must extend loaders/validation deliberately; it is not already supported.
6. The brief supersedes older rules in some areas, but the older channel documents that would show their exact wording are absent. The 99-public-plus-hidden-100 model, season-linked objects, and eight-episode Season 1 rule are recorded as supplied unresolved alternatives, not repository-verified facts.
7. Physical object identities, acquisition details, object images, selected locations, participant dialogue, verified events, research evidence, and exact edit boundaries remain unknown.

The dated follow-up above resolves “no reference identified” for the channel document and the two framing screenplays, but does not change their absence from the repository. It also confirms that the older distribution and season/object language exists in an external historical reference; current instructions still take precedence.

## Audit limits

- No complete content-quality review of all 212 extracts was performed.
- No claim is made that every source-map page range, overlap, Sinhala transcription, or doctrinal interpretation is correct.
- The four PDFs were inventoried but not page-by-page compared with the Markdown.
- Application source and existing content were inspected but not changed.
