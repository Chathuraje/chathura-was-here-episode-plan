# Progress and Checkpoint

Resume from **Next concrete actions** at the bottom. Nothing already recorded needs regenerating.

- **Repository commit inspected:** `43559b5` (`main`, 2026-09-17 22:54 +0530)
- **Working tree at start:** modified files under `content/01-sources/` and `content/02-concepts/`, pre-existing and untouched by this work
- **Instruction version:** `series-architecture v1 (2026-09-18)`
- **Last updated:** 2026-09-18
- **State:** research complete; portfolio selected; architecture built; all machine checks pass

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
| Existing story leads | — | **0** |

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

<!-- GENERATED BY tools/progress.py FROM data/. Edit data/, not this block. -->

## Research totals

| Measure | Count |
|---|---|
| Leads opened | **112** |
| Leads advancing to candidate development | 109 |
| Leads held | 3 |
| Leads rejected | 0 |
| Duplicates merged | 0 |
| Distinct sources cited | 359 |
| Sources confirmed by fetching the page | 2 |

**Candidate status.** No lead is production-ready. None can be: online research cannot establish participant willingness, filming access or production feasibility, and nobody has been contacted.

This table covers **all leads opened**, not the 98 selected for episodes. Of the 98 placed in the portfolio, 91 are
`evidenced-situation` and 7 are `unverified-lead`; the rest of the leads below were rejected or held. See
`VALIDATION-REPORT.md` for the portfolio breakdown.

| Candidate status | Count (all leads) |
|---|---|
| `direction` | 4 |
| `unverified-lead` | 15 |
| `evidenced-situation` | 93 |
| `evidenced-subject` | 0 |
| `production-ready` | 0 |

## Coverage

### By batch

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

### By province (place of the lead, not of the idea)

| Province | Leads |
|---|---|
| Western | 26 |
| Southern | 20 |
| Central | 16 |
| multiple | 16 |
| Uva | 13 |
| North Western | 13 |
| Northern | 12 |
| Eastern | 12 |
| Sabaragamuwa | 10 |
| all | 8 |
| North Central | 7 |
| others | 4 |
| elsewhere | 1 |
| the tea-growing provinces | 1 |
| *place not yet established* | 6 |

### By human territory

| Territory | Leads as primary |
|---|---|
| T01 | 11 |
| T02 | 9 |
| T03 | 2 |
| T04 | 6 |
| T05 | 11 |
| T06 | 11 |
| T07 | 7 |
| T08 | 2 |
| T09 | 7 |
| T10 | 7 |
| T11 | 5 |
| T12 | 5 |
| T13 | 16 |
| T14 | 13 |

### Research questions used

| Question | Leads |
|---|---|
| SQ01 | 6 |
| SQ02 | 6 |
| SQ03 | 8 |
| SQ04 | 2 |
| SQ05 | 2 |
| SQ06 | 4 |
| SQ07 | 4 |
| SQ08 | 6 |
| SQ09 | 3 |
| SQ10 | 8 |
| SQ11 | 4 |
| SQ12 | 3 |
| SQ13 | 2 |
| SQ14 | 2 |
| SQ15 | 4 |
| SQ16 | 3 |
| SQ17 | 4 |
| SQ18 | 5 |
| SQ19 | 3 |
| SQ20 | 1 |
| SQ21 | 8 |
| SQ22 | 10 |
| SQ23 | 9 |
| SQ24 | 5 |

**Questions not yet used:** none.

### Accepted ideas used

- Distinct ideas used as **primary**: **82** of 148 accepted.
- Distinct ideas used as primary **or** supporting: **103** of 148 accepted.
- Ideas used as primary more than once: `C039-I01` (3), `C100-I02` (2), `C073-I03` (2), `C052-I01` (2), `C001-I01` (2), `C080-I03` (2), `C009-I01` (2), `C089-I01` (2), `C096-I01` (2), `C020-I02` (2), `C013-I01` (2), `C066-I03` (2), `C003-I02` (2), `C076-I03` (2), `C047-I01` (2), `C082-I02` (2), `C055-I01` (2), `C052-I02` (2), `C020-I01` (2), `C005-I01` (2), `C086-I02` (2), `C084-I01` (2), `C066-I02` (2), `C011-I02` (2), `C091-I01` (2), `C081-I03` (2), `C076-I01` (2), `C032-I02` (2), `C077-I03` (2). Each repeated use must be differentiated in `IDEA-COVERAGE.csv`.

## Lead IDs created

```
SL-SQ01-001  SL-SQ01-002  SL-SQ01-003  SL-SQ01-004  SL-SQ01-005  SL-SQ01-006
SL-SQ02-001  SL-SQ02-002  SL-SQ02-003  SL-SQ02-004  SL-SQ02-005  SL-SQ02-006
SL-SQ03-001  SL-SQ03-002  SL-SQ03-003  SL-SQ03-004  SL-SQ03-005  SL-SQ03-006
SL-SQ03-007  SL-SQ03-008  SL-SQ04-001  SL-SQ04-002  SL-SQ05-001  SL-SQ05-002
SL-SQ06-001  SL-SQ06-002  SL-SQ06-003  SL-SQ06-004  SL-SQ07-001  SL-SQ07-002
SL-SQ07-003  SL-SQ07-004  SL-SQ08-001  SL-SQ08-002  SL-SQ08-004  SL-SQ08-005
SL-SQ08-006  SL-SQ08-007  SL-SQ09-001  SL-SQ09-002  SL-SQ09-003  SL-SQ10-001
SL-SQ10-002  SL-SQ10-003  SL-SQ10-004  SL-SQ10-005  SL-SQ10-006  SL-SQ10-007
SL-SQ10-008  SL-SQ11-001  SL-SQ11-002  SL-SQ11-003  SL-SQ11-004  SL-SQ12-001
SL-SQ12-002  SL-SQ12-003  SL-SQ13-001  SL-SQ13-002  SL-SQ14-001  SL-SQ14-002
SL-SQ15-001  SL-SQ15-002  SL-SQ15-003  SL-SQ15-004  SL-SQ16-001  SL-SQ16-002
SL-SQ16-003  SL-SQ17-001  SL-SQ17-002  SL-SQ17-003  SL-SQ17-004  SL-SQ18-001
SL-SQ18-002  SL-SQ18-003  SL-SQ18-004  SL-SQ18-005  SL-SQ19-001  SL-SQ19-002
SL-SQ19-003  SL-SQ20-001  SL-SQ21-001  SL-SQ21-002  SL-SQ21-003  SL-SQ21-004
SL-SQ21-005  SL-SQ21-006  SL-SQ21-007  SL-SQ21-008  SL-SQ22-001  SL-SQ22-002
SL-SQ22-003  SL-SQ22-004  SL-SQ22-005  SL-SQ22-006  SL-SQ22-007  SL-SQ22-008
SL-SQ22-009  SL-SQ22-010  SL-SQ23-001  SL-SQ23-002  SL-SQ23-003  SL-SQ23-004
SL-SQ23-005  SL-SQ23-006  SL-SQ23-007  SL-SQ23-008  SL-SQ23-009  SL-SQ24-001
SL-SQ24-002  SL-SQ24-003  SL-SQ24-004  SL-SQ24-005
```

## Remaining episode slots

98 of 98 (Episodes 2-99). Story IDs are assigned only at the selection stage, so no `ST-` ID exists yet.

<!-- END GENERATED -->

---

## Unresolved canon questions

1. **Season 1's episode count.** Not documented. Proposed at 8 and provisional.
2. **The ten season pieces.** Not documented. Eight of the ten slots have no object; two are matched to anchors only because the owner's Part A description names ten objects in a room.
3. **Episode 1's actual footage.** Nothing in this repository describes it. If it contradicts the Part A material, Part A bends, not Episode 1. This cannot be checked here.
4. **Repository visibility.** Public. Spoiler-sensitive files carry a label that enforces nothing.
5. **The bias in the held leads.** Two of the three held leads concern Tamil communities in the north in disputes with the state. That is a pattern, not a neutral outcome, and the owner should decide about it rather than inherit it.

## Remaining episode slots

**0 of 98 unfilled.** All of Episodes 2–99 carry a candidate. **7 of the 98 are `unverified-lead`** and are the slots most likely to empty on first contact. If one does, leave it empty and report it; do not fill it from the rejected list.

## Next concrete actions

1. **Decide about repository visibility** before anything here is pushed. Nothing has been pushed.
2. Check the Episode 1 footage against the Episode 100 Part A description. This is the only check that could invalidate the framing.
3. Supply Season 1's episode count and the ten season pieces if they exist outside this repository, then re-run `tools/architect.py` and `tools/build.py`.
4. Open in full every source currently marked *search result only* and record which claims survive. 2 of 366 citations have been read in full.
5. Repeat the highest-value searches in Sinhala and Tamil.
6. For each of the 7 `unverified-lead` candidates, resolve the single question named in its matrix row, or vacate the slot.
7. Only then begin field contact, starting with organisations rather than individuals, and starting with the low-difficulty, low-risk candidates.
