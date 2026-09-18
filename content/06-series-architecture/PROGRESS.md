# Progress and Checkpoint

Resume from **Next concrete actions** at the bottom. Nothing already recorded needs regenerating.

- **Repository commit inspected:** `43559b5` (`main`, 2026-09-17 22:54 +0530)
- **Working tree at start:** modified files under `content/01-sources/` and `content/02-concepts/`, pre-existing and untouched by this work
- **Instruction version:** `series-architecture v1 (2026-09-18)`
- **Last updated:** 2026-09-18
- **State:** desk research done; portfolio proposed; data repaired to one authoritative source per entity (Checkpoint 03); all machine checks pass. No field work has started.

---

## Checkpoint 00 — audit

### Files read

`content/PATH-MAP.md`; `04-story-discovery/README.md`, `research-agent-instruction.md`, `story-lead-template.md`,
`documentary-potential-matrix.md`, `philosophy-map.md`, `research-shortlist.md`, `overlap-map.md`;
`05-story-leads/README.md`; all 172 idea cards under `03-idea-bank/ideas/` (parsed; a sample read in full);
`03-idea-bank/concept-register.md`; `instructions/concept-to-idea.md`;
`app/src/lib/content.ts`, `leads.ts`, `routes.ts`; `app/AGENTS.md`, `app/CLAUDE.md`, `app/package.json`.

**There is no root `AGENTS.md`.** The only one is `app/AGENTS.md`, which is the Next.js generated block and carries no project rules.

### Inventory recounted

| Item | Reported | Recounted |
|---|---|---|
| Concepts | 102 | **102** |
| Idea cards | 172 | **172** |
| Accepted ideas | 148 | **148** |
| Story territories | 14 | **14** |
| Research questions | 24 | **24** |
| Overlap groups | — | 38 |
| Existing story leads | — | **0** at audit time (112 now; see *Current totals*) |

Tiers over the 148: A 29, B 78, C 40, Do-not-advance 1 (`C093-I02`). Reproduces the matrix's own summary exactly.

### Findings

1. **The original channel plan, Episode 1 material, Episode 100 material, season rules and continuity rules are absent from this repository.** Verified by filename search, full-text search across all Markdown/TypeScript/JSON, and inspection of every non-source path in all 12 commits, including the three non-source documents that existed only in early commits and were opened and read.
2. `04-story-discovery` forbids assigning anything to an episode, season, object, coordinate or chronology. CONFLICT-01; resolved by keeping every episode field inside `06-series-architecture/`.
3. Season 1's episode count is **not documented**. CONFLICT-02.
4. The ten season pieces are **not documented**. CONFLICT-03; ten empty slots kept, no object invented.
5. **The GitHub repository is public.** CONFLICT-04, unresolved, owner's decision.

---

## Checkpoint 01 — research, batches B01 to B14

Fourteen batches. Each one took a theme plus the geographic or thematic gap the previous batch exposed, then ended with a duplicate check, a diversity review and a gap list for the next batch. Batch sizes vary between 4 and 18 because leads with thin evidence were dropped before a card was opened rather than kept to make a batch look full.

**Duplicate and merge decisions taken during research**

| Decision | Detail |
|---|---|
| Merged | A prison-overcrowding lead into `SL-SQ04-001`. Same figures, same institutions, two ends of one situation. |
| Merged | Schools-as-shelters after Cyclone Ditwah into `SL-SQ03-005`. Same event, same sources. |
| Merged | Weekly village *pola* markets into `SL-SQ24-004`. The *pola* is the retail end of the same chain. |
| Merged | The Royal-Thomian big match into `SL-SQ10-006`, with the stronger cricket evidence added. Two episodes would have split one argument. |
| Kept separate | `SL-SQ21-008` from `SL-SQ07-001` (coconut toddy in the west against palmyrah tapping in the north): different palm, region, regulation and question. |
| Kept separate | `SL-SQ07-004` from `SL-SQ23-006` and `SL-SQ07-001`: different crop, ownership structure and measured trend. |
| Kept separate | `SL-SQ22-010` from `SL-SQ22-003`: a spoken language in households against a written script in institutional custody. |
| Dropped before a card | Spice smallholders (a seventh crop-price story), kite flying and new-year games, village post offices, inland reservoir fish stocking. |
| Corrected | `SL-SQ19-002`: primary idea changed from `C089-I03` to `C066-I02` after re-reading both cards. The seventh-day alms is not an apology. |

**Known limitation.** All research was in English. **No Sinhala or Tamil source was searched.** Every lead is weaker for it and a Sri Lanka-based researcher should expect to overturn some of it.

---

## Checkpoint 02 — selection and architecture

- 112 leads opened; 3 held; **109 reached selection; 98 placed (91 `evidenced-situation`, 7 `unverified-lead`); 11 rejected (3 `direction`, 8 `unverified-lead`)** with reasons recorded in `EPISODE-MATRIX.md`.
- Stable story IDs `ST-001` to `ST-098`, assigned in lead-ID order and **not derived from episode numbers**.
- Ten seasons totalling 99 core episodes including Episode 1: 8, 9, 10, 10, 11, 10, 10, 11, 10, 10.
- **Nine continuity anchors**, the recommended count within the permitted 8–10, with the reasoning in `CONTINUITY-ANCHORS.md`. Seasons 4 and 7 carry none, deliberately.
- 52 connections, each with a stated basis and marked `established fact` or `proposal`.
- Chronology is a **partial order**: seven phases plus the three framing segments, with a contradiction among the fixed-date stories recorded rather than smoothed away.
- 112 lead cards written to `../05-story-leads/` in the existing template, all parsing against the app's ID pattern, filename pattern, front-matter keys, enum values and 22-section structure.
- All 21 checks in `VALIDATION-REPORT.md` pass; four are judgements rather than machine checks and are the ones to read.

## Checkpoint 03 — data repair and editorial workspace (2026-09-18)

- **One authoritative source per entity.** Lead cards in `05-story-leads/` hold every research field; `data/stories.json` holds planning only; `data/connections.json` holds connections; `data/leads.json` is a frozen desk-research archive. See the table in `README.md`. Migration `tools/migrations/m001_single_authority.py` made the change after checking that every removed copy matched the card.
- **Seed scripts locked.** `b01.py` … `b13_14.py`, `architect.py` and `connections.py` now refuse to run. `write_leads.py` only creates a card for a lead that has none; it never overwrites.
- **One safe regeneration command:** `python3 tools/rebuild.py` (writes generated files only; `--check` changes nothing).
- **Premises.** 82 of the 98 premises were the first 400 characters of the situation text, cut mid-sentence. All 98 are now one-sentence summaries written only from each lead's own record, with hedges kept.
- **Evidence labels.** Connections no longer say `established fact`: 47 are `proposal`, 5 are `source-reported` (sources seen only as search results). Anchor notes that called future footage "observed" now say what is reported and what is planned.
- **Lead cards.** Section 1 carried the question ID instead of the question; section 4 was cut at 600 characters in 33 cards. Both fixed. Nothing else in a card changed.
- **Calendar conflicts** recorded explicitly as `CC-01` … `CC-05`, all unresolved.
- **App.** Episodes overview, episode pages, series views, needs-attention view, two-way navigation, a lead editor that keeps researched mappings, and a server-side spoiler setting. See `app/README.md`.

<!-- GENERATED BY tools/progress.py. Edit the records, not this block. -->

## Current totals

| Measure | Count |
|---|---|
| Lead cards on disk | **112** |
| Placed in Episodes 2-99 as candidates | 98 |
| Rejected at the selection stage (reasons in `EPISODE-MATRIX.md`) | 11 |
| On hold | 3 |
| Leads that absorbed a merged lead during research | 4 |
| Source citations on lead cards | 360 |
| Distinct source URLs | 359 |
| Citations opened and checked | 2 |

Placed, rejected and held add up to 112 of the 112 cards.

| Lead `research_status` | Count (all cards) |
|---|---|
| `unverified` | 18 |
| `in research` | 91 |
| `verified` | 0 |
| `on hold` | 3 |
| `rejected` | 0 |

| Candidate status (the 98 placed) | Count |
|---|---|
| `direction` | 0 |
| `unverified-lead` | 7 |
| `evidenced-situation` | 91 |
| `evidenced-subject` | 0 |
| `production-ready` | 0 |

**No candidate is production-ready.** Nobody has been contacted, so no subject is identified, no consent exists and there is no filming access anywhere.

## Coverage (all 112 leads)

### By research batch (desk-research archive)

| Batch | Theme | Leads | Evidenced situations | Territories touched |
|---|---|---|---|---|
| B01 | Inherited craft and skill under pressure | 18 | 14 | T01,T02,T05,T06,T13,T14 |
| B02 | Land, water and livelihood change | 15 | 13 | T02,T04,T05,T07,T08,T09,T12,T13,T14 |
| B03 | Ritual, religious practice and monastic life | 11 | 7 | T01,T02,T04,T07,T08,T10,T12,T13,T14 |
| B04 | Work, movement and urban life | 8 | 7 | T01,T05,T10,T12,T13,T14 |
| B05 | Grief, mortality, memory and the east | 9 | 8 | T02,T06,T07,T11,T13 |
| B06 | Waiting, old pulls, learning and conscience | 7 | 6 | T01,T03,T06,T14 |
| B07 | Value, price, trade and what is owed to animals | 6 | 6 | T04,T05,T09,T14 |
| B08 | Transmission, language, performance and what a restoration cannot restore | 5 | 5 | T06,T11,T13 |
| B09 | Disaster, land, relocation and what a place becomes | 6 | 6 | T02,T05,T13,T14 |
| B10 | Daily commerce, food, campus life and unintended harm | 6 | 5 | T02,T04,T07,T09,T13 |
| B11 | Waterways, seasonal nature and heritage designations | 4 | 2 | T01,T04,T05 |
| B12 | Consequences: a judgment, a policy, a departure, a wage | 6 | 6 | T05,T06,T07,T12,T14 |
| B13 | Looking, access and the price of being looked at | 5 | 4 | T02,T04,T05,T11,T12 |
| B14 | Care at a distance, language at the edge, and new ground | 6 | 4 | T01,T02,T10,T13 |

### By human territory (primary, from the lead cards)

| Territory | Leads | Placed stories |
|---|---|---|
| T01 | 11 | 10 |
| T02 | 9 | 8 |
| T03 | 2 | 2 |
| T04 | 6 | 5 |
| T05 | 11 | 9 |
| T06 | 11 | 11 |
| T07 | 7 | 6 |
| T08 | 2 | 2 |
| T09 | 7 | 7 |
| T10 | 7 | 6 |
| T11 | 5 | 5 |
| T12 | 5 | 4 |
| T13 | 16 | 13 |
| T14 | 13 | 10 |

### Research questions used

SQ01 (6), SQ02 (6), SQ03 (8), SQ04 (2), SQ05 (2), SQ06 (4), SQ07 (4), SQ08 (6), SQ09 (3), SQ10 (8), SQ11 (4), SQ12 (3), SQ13 (2), SQ14 (2), SQ15 (4), SQ16 (3), SQ17 (4), SQ18 (5), SQ19 (3), SQ20 (1), SQ21 (8), SQ22 (10), SQ23 (9), SQ24 (5).

**Questions not yet used:** none.

### Accepted ideas used

- Across all 112 leads: **82** distinct ideas as primary.
- Across the 98 placed candidates: **76** distinct ideas as primary, **100** as primary or supporting (of 148 accepted).
- Ideas leading more than one placed candidate: `C039-I01` (3), `C009-I01` (2), `C020-I01` (2), `C084-I01` (2), `C077-I03` (2), `C003-I02` (2), `C089-I01` (2), `C076-I01` (2), `C073-I03` (2), `C100-I02` (2), `C011-I02` (2), `C082-I02` (2), `C052-I01` (2), `C086-I02` (2), `C080-I03` (2), `C032-I02` (2), `C055-I01` (2), `C066-I02` (2), `C047-I01` (2), `C066-I03` (2), `C091-I01` (2). Each is differentiated in `IDEA-COVERAGE.csv`.

## Episode slots

98 of 98 slots (Episodes 2-99) hold a candidate, each with a stable story ID (`ST-001` to `ST-098`). 7 of them are `unverified-lead` and are the most likely to empty on first contact. An emptied slot should be left empty and reported, not filled from the rejected list.

<!-- END GENERATED -->

---

## Unresolved canon questions

1. **Season 1's episode count.** Not documented. Proposed at 8 and provisional.
2. **The ten season pieces.** Not documented. No slot has an object. Two of the ten objects in the Part A room are *proposed* from anchors (the drum and the woven piece); neither has been acquired or filmed.
3. **Episode 1's actual footage.** Nothing in this repository describes it. If it contradicts the Part A material, Part A bends, not Episode 1. This cannot be checked here.
4. **Repository visibility.** Public, and this folder has been pushed to it. Spoiler-sensitive files carry a label that enforces nothing; the app's `EXPLORER_SPOILERS=hide` protects only the app's own pages.
5. **The bias in the held leads.** Two of the three held leads concern Tamil communities in the north in disputes with the state. That is a pattern, not a neutral outcome, and the owner should decide about it rather than inherit it.

## Next concrete actions

1. **Decide about repository visibility.** This folder, including the spoiler-sensitive files, has already been pushed to the public repository (`origin/main` at `b7f561c`). See CONFLICT-04 in `SERIES-CANON.md`.
2. Check the Episode 1 footage against the Episode 100 Part A description. This is the only check that could invalidate the framing.
3. Supply Season 1's episode count and the ten season pieces if they exist outside this repository, record them in `data/stories.json`, then run `python3 tools/rebuild.py`. (`tools/architect.py` is a seed script and now refuses to run.)
4. Open in full every source currently marked *search result only* and record which claims survive, in the lead card (section 18 note: `page opened and read`; claim review in the lead editor). 2 of the 360 citations on the 112 lead cards (323 on the 98 placed candidates) have been opened and read.
5. Repeat the highest-value searches in Sinhala and Tamil.
6. For each of the 7 `unverified-lead` candidates, resolve the single question named in its matrix row, or vacate the slot.
7. Only then begin field contact, starting with organisations rather than individuals, and starting with the low-difficulty, low-risk candidates.
