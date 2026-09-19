# Master roadmap: from the concept library to 98 full screenplays

Status: **implemented foundation; Chronology v1 draft awaiting Chathura's creative review**
Prepared: 2026-09-18
Builds on: [01 audit](01-current-state-audit.md), [02 rules](02-project-rules.md), [03 workflow](03-development-workflow.md), [04 data model](04-data-model-proposal.md), [05 continuity](05-episode-001-100-continuity.md), [Pilot 01](pilot-01/README.md)

This document began as the implementation roadmap. The steps remain as historical design context; the current-state table and progress section are authoritative for what now exists. The next human phase is **CHATHURA — CHRONOLOGY V1 REVIEW, GRP-01 → GRP-10**.

---

## 1. Where we are now

| Area | State |
|---|---|
| Sources | 4 Pradeepika books (Markdown + local PDFs), 4 source maps, 2 extraction guides |
| Concepts | 102 concepts (`C001`–`C102`) in 9 chapters, 212 source extracts |
| Channel & framing | Channel Details, *The Beginning* (Ep 1) and *The Way Back* (Ep 100) summarised in [`references/`](references/) |
| Rules & data model | Implemented file-backed development layer with validation and versioned envelopes |
| Digests and ideas | 102 concept digests plus the candidate idea pool |
| Chronology | 10 draft groups and a complete 98-film Chronology v1 slate; pending Chathura approval |
| Objects and lessons | 10 planned acquisition points; episode and group learning layers with exact source provenance |
| Dashboard | Sources, concepts, arc, ideas, chronology, lessons, locations, proposal-only release planner, briefs, and screenplay pipeline |
| Locations and research | Selection mechanism implemented; current episodes remain unselected/unresearched unless a Chathura decision says otherwise |
| Release | Ordinary public structure locked to Episodes 1–99 and 10 seasons (Season 1 = 8 episodes); remaining order is unassigned and human-controlled; Episode 100 is hidden/discoverable outside the ordinary structure |
| Screenplays | Treatment → explicit Chathura approval → outline → explicit Chathura approval → research-ready production pipeline implemented; no approval inferred from file existence |

---

## 2. The shape of the finished series

Three orders exist. Each is kept independent of the others.

```text
CHRONOLOGICAL ORDER (story time, Chathura's lived journey)
  Group 1 ─▶ Group 2 ─▶ … ─▶ Group 10 ─▶ crowd ─▶ Ep100 Part A ─▶ Ep 1 ─▶ Ep100 Part B
  (98 development films, Object N acquired     (room, 10 objects,   (monastery,  (beyond the
   in the first film of Group N)                 packing, road)       forest)      forest)

ORDINARY PUBLIC RELEASE (human-controlled after chronology approval)
  Ep 1 "The Beginning" ─▶ unassigned positions 2–98 ─▶ Ep 99 (final chronological development film)
  10 seasons total; Season 1 = exactly 8 episodes; later season sizes may differ

HIDDEN / DISCOVERABLE
  Ep 100 "The Way Back" retains its number outside the ordinary public 1–99 structure

FILMING ORDER (production logistics)
  Grouped by selected location / trip. Derived later, never changes the other two.
```

Fixed facts:

- **100 numbered identities = Ep 1 + 98 development films occupying public slots 2–99 + hidden/discoverable Ep 100.**
- Ep 1 and Ep 100 are the same event told two ways. They are stored as **continuity references**. The screenplay system never generates them; it only reads them.
- **10 chronological groups ("categories")**. Each explores one connected cluster of Abhidhamma concepts. Group sizes are flexible (e.g. 5, 8, 10, 14) and must total 98.
- **Object N** (unnamed for now: Object 1 … Object 10) belongs to Group N. It is acquired in that group's **first chronological film** and appears subtly in the group's later films. Earlier objects may reappear in later groups. By Ep 1's chronology all ten are owned; Ep 100 shows all ten in one frame before packing.
- **Locations:** AI may describe requirements and suggest places. **Only Chathura selects.** Suggested and selected are separate fields; nothing auto-promotes.
- **Release planning is human-controlled.** Region grouping is a proposal that Chathura may merge, split, replace with journey-based series, reorder, and assign to seasons/public numbers.

---

## 3. The steps

Each step ends at a review gate. Nothing downstream starts on a step's output until Chathura approves it (approval can be partial, e.g. per group).

### Step 0: Lock the library *(small)*

- Normalise line endings (add `.gitattributes`) so the 70 "modified" files stop showing as changes; commit.
- Tag the library version (`library-v1`). Every later citation points at this version.
- **Chathura decides:** nothing, other than confirming no concept text edits are pending.

### Step 1: Draft the 10-category map

Cluster the 102 concepts into 10 connected categories, put them in story order, and set a draft film count for each. A starting hypothesis is in [§4](#4-draft-category-map-starting-hypothesis).

- **Output:** `development/groups/GRP-01…10.json`: name, concept IDs, the human question behind the category, the arc across it, draft film count, and a placeholder `OBJ-0N`.
- **Chathura decides:** clusters, order, draft sizes. Sizes stay provisional until Step 4.

### Step 2: Concept digests *(batched per category)*

For every concept in the category being worked on:

1. **Sinhala explanation**: faithful to the source, keeps the Buddhist terms, cites the extract lines.
2. **Plain-English human interpretation**: no jargon; what this looks like in an ordinary life.
3. **Story seeds**: 3–5 real-world situations in Sri Lanka where this could be *observed* rather than lectured (a trade, a ritual, a journey, a relationship, a place).

- **Output:** `development/interpretations/…` plus a per-category digest page on the dashboard.
- **Chathura decides:** doctrinal accuracy and tone. Approves the batch or flags concepts for revision.
- Pilot concepts C020/C032/C084 already have dossiers; they are folded in here.

### Step 3: Ideas *(batched per category)*

Turn digests into film ideas. One idea may carry several concepts when the link is natural. Aim for roughly **1.4× the category's film count** in candidates, so there is something to choose from.

Each idea record contains:

- working title, the human question, premise (Story → Place → Experience)
- linked concepts and interpretations, with the reason each is attached
- what the camera can observe; what must be real (people, events) and never staged
- **location requirements** (what the story needs from a place)
- **suggested locations** from AI, clearly marked as suggestions (`selected_location_id` stays `null`)
- risks, unknowns, and a "drop this idea if…" test

- **Chathura decides:** keep / merge / revise / reject per idea. Pilot ideas P01-A and P01-B join the pool.

### Step 4: Chronological slate *(the main order)*

From approved ideas, build the 98-film chronology.

- Pick exactly 98 ideas → create episode records (`EPD-…`, stable IDs, no public number).
- Order films **within** each group; finalise group sizes (they must sum to 98).
- **First film of each group = Object N acquisition film.** Plan where Object N appears in the group's later films.
- Write the **connection thread** for every adjacent pair: what carries from film *n* into film *n+1* (a person, a question, a road, the object, a season). This thread is what makes the chronological order feel like one journey.
- The **last film of Group 10** leads chronologically into the crowd → Ep 100 Part A.
- **Output:** `development/episodes/*.json`, group membership, object plan, connection records, and a chronology board on the dashboard.
- **Chathura decides:** approves "Chronology v1". After that, changes are versioned rather than silent.

### Step 5: Location selection *(Chathura only)*

- The dashboard shows every episode with its location requirements and AI suggestions (with reasons, season/weather notes, access notes).
- Chathura picks a suggested location, enters a different one, or marks "undecided". Chathura also sets the **name-reveal policy** (early / later / never).
- The select action writes a review decision attributed to Chathura; AI tooling has no path to fill this field.
- Research follows selection: access, permissions, people, safety, best season.
- **Done when:** every episode has a selected location or an explicit "undecided" hold.

### Step 6: Release-plan proposal *(human-controlled)*

- Group episodes into **release series by location/region/trip** (e.g. a 6-film series in one valley, a 3-film series along one coast). No fixed series length.
- Ep 1 is fixed at public Episode 1; the last chronological development film is fixed at public Episode 99. Chathura assigns positions 2–98 and all season/series membership. Episode 100 remains hidden/discoverable outside this ordinary public structure.
- Check that the audience experience works out of chronological order: objects appearing before their acquisition film is shown becomes a deliberate mystery, not a continuity error.
- Recommended: the **chronologically last film (end of Group 10) is released as Ep 99**, so its crowd ending lands immediately before Ep 100 opens on the same crowd.
- **Output:** `development/release-series/*.json`, public numbers, and a release planner view.
- **Chathura decides:** series boundaries and order.

### Step 7: Complete episode briefs *(the copy-paste / AI-agent handoff)*

Each of the 98 episodes gets a **complete brief**, generated from its linked records, that can be pasted into any AI tool or fetched by an agent. It contains:

1. identity + the three positions (chronological group/position, release series/number, filming block)
2. source extracts with exact paths and line/page citations
3. approved Sinhala explanation + English interpretation
4. the approved idea, human question, premise
5. selected location + reveal policy + research findings
6. object state: which objects are owned, what the group's object is doing in this film
7. previous/next film in **chronology** (connection threads) and in **release** order
8. channel rules: Story → Place → Experience, cold open, title/coordinates after curiosity, 6–8 min, natural sound, "A Film by Chathura" + logo
9. forbidden inventions: no fabricated dialogue, people, events; unknowns listed
10. instructions for the next artefact to generate (treatment / scene outline / screenplay)

- Available as **Copy brief (Markdown)**, **Copy brief (JSON)**, and a URL endpoint (`/api/brief/EPD-…`) an agent can read.

### Step 8: Screenplays *(Episodes 2–99 only)*

Per episode: **treatment → scene outline → production screenplay**, each a versioned record, each approved before the next.

- Work in **release-series batches**, because filming happens by location, so a whole series is ready to shoot together.
- Every screenplay scene carries: purpose, required footage, sound, narration (draft VO clearly marked), estimated timing, research gaps, continuity/object notes.
- Placeholders for real people's words are marked as placeholders; they are replaced by real recordings or removed.
- Ep 1 and Ep 100 screenplays are read-only references in the system, used for continuity checks only.

### Step 9: After filming *(later)*

Post-filming screenplay versions grounded in captured footage, a variance log against the production version, and verified object/scene events. The production version is never overwritten.

---

## 4. Category map v1: emotional life-story arc

Chathura chose an **emotional life-story arc** (2026-09-18). Each group is one emotional stage of the journey. Underneath, the order also walks the book's philosophy, so a viewer who watches closely sees the teaching unfold. The source of truth is `development/groups/GRP-01…10.json`; review it on the dashboard at **/arc**.

| # | Group | Emotional stage | Concepts | Films |
|---|---|---|---|---:|
| 01 | **The Names of Things** | Wonder | C001, C002, C003, C018, C077, C084 | 8 |
| 02 | **Wanting** | Desire | C004, C005, C006, C021, C032 | 10 |
| 03 | **Anger and Fear** | Resistance | C007, C022, C026, C028 | 9 |
| 04 | **Lost** | Confusion | C008, C033, C049, C074, C086 | 8 |
| 05 | **Slowing Down** *(turning point)* | Attention | C009, C010, C020, C025, C029, C034–C048 | 12 |
| 06 | **Kindness** | Warmth | C011, C012, C019, C023, C024, C027, C030, C091, C095 | 10 |
| 07 | **The Body** | Vulnerability | C063–C072, C093, C094 | 9 |
| 08 | **Endings** | Grief | C050–C062, C092 | 12 |
| 09 | **Nothing Stands Alone** | Understanding | C075, C078–C083 | 8 |
| 10 | **The Way Through** | Peace | C013–C017, C031, C073, C076, C085, C087–C090, C096–C102 | 12 |
| | | | **102 concepts** | **98** |

**The emotional curve:** wonder → rising desire → heat → fog → *the turn* → warmth → fragility → grief → understanding → peace → the crowd, where Chathura turns toward the road (Ep 99 → Ep 100).

**The philosophical spine underneath:**

- **Group 1** names the map: conventional vs. ultimate truth, and the four ultimates (mind, mental factors, matter, Nibbāna).
- **Groups 2–4** are the unwholesome roots: greed, hatred, delusion.
- **Group 5** is the hinge. The cognitive process shows how a moment is built, and where in it choice happens.
- **Group 6** is the wholesome roots and the beautiful mental factors.
- **Group 7** is matter.
- **Group 8** is kamma, death and rebirth.
- **Group 9** reveals **dependent origination** as the chain running through all the earlier groups: ignorance (4) → formations/consciousness (5) → contact/feeling (2) → craving/clinging (2–3) → becoming, birth, ageing and death (7–8). The earlier groups turn out to be one story.
- **Group 10** is the path, and **Nibbāna** completes the four ultimates first named in Group 1.

Notes:

- Meditation subjects are placed at the life stage they belong to: breath and body in *The Body*, death in *Endings*, loving-kindness and faith in *Kindness*, kasiṇa, jhāna and insight in *The Way Through*.
- Step 4 produced a complete 98-film Chronology v1 and fixed the current per-group counts. The slate remains a draft pending Chathura's creative approval; count completion does not approve titles, ideas, or order. Concept roles remain working glosses unless separately approved.
- Each group record also carries an optional *symbolic hint* for its object. It is only a suggestion; Chathura chooses every object.

## 5. Dashboard build plan (runs alongside the steps)

The existing Next.js app gains a `development/` data layer (file-backed JSON, per [doc 04](04-data-model-proposal.md)). It is built in slices, each slice landing just before the step that needs it:

| Slice | Needed by | Adds |
|---|---|---|
| D1: Data layer | Step 1 | `development/` loader, schemas, validator (`npm run check` draft mode), stable ID allocation |
| D2: Categories & digests | Steps 1–2 | Group pages, concept digest pages, review status badges |
| D3: Ideas board | Step 3 | Idea cards per group, concept links, keep/merge/reject decisions |
| D4: Chronology board | Step 4 | Ordered 98-film timeline, group sizes (sum = 98 check), object acquisition/appearance map, connection threads |
| D5: Locations | Step 5 | Requirements vs. suggestions vs. **Chathura's selection** (separate UI, attributed decision), reveal policy |
| D6: Release planner | Step 6 | Proposal-only region clusters that Chathura may merge, split, reorder, replace with journey series, and assign to seasons/public numbers 2–98; Ep 1 and Ep 99 pinned; hidden Episode 100 shown separately |
| D7: Briefs & export | Step 7 | Copy brief (MD/JSON), `/api/brief/[id]`, bulk export folder |
| D8: Screenplays | Step 8 | Treatment / outline / screenplay versions per episode, status pipeline view |

A **pipeline overview** on the home page shows, for every episode, how far it has got (digest → idea → slate → location → release → brief → treatment → outline → screenplay).

---

## 6. Decisions log

Recorded in `development/decisions/2026-09-18.json`.

| ID | Decision | By |
|---|---|---|
| REV-0001 | Groups follow an emotional life-story arc whose depth reveals the book's philosophy | Chathura |
| REV-0002 | The chronologically last film (end of GRP-10) is released as **Episode 99** and ends on the crowd | Chathura |
| REV-0003 | Screenplay narration in **English** for now; Sinhala translation later | Chathura |
| REV-0004 | Pilot 01 stays as draft candidates, reviewed inside its category (P01-B → GRP-01, P01-A → GRP-05) | Delegated to Claude |
| REV-0005 | Review one full category at a time (concept digests + ideas together), starting with GRP-01 | Delegated to Claude |

## 7. Progress and next step

- **Step 0: done.** Added `.gitattributes` (LF everywhere) and normalised the 70 CRLF extracts (content verified byte-identical apart from line endings). Also set `core.precomposeunicode` for this repo, so macOS stops reporting the Sinhala folders as untracked duplicates.
- **Step 1: drafted.** Ten group records, ten object placeholders, and the Ep 1/Ep 100 framing records are in `development/`. They are visible at **/arc** and validated by `npm run check`.
- **Dashboard D1 + part of D2: done.** `/arc` timeline and group pages, and a group link on every concept page.
- **Group-level emotional arc reviewed and committed by Chathura** (2026-09-18). This does not constitute approval of the later 98-film Chronology v1 slate.
- **Step 2 + 3 for Group 1: drafted.** Six concept digests (`development/digests/C001, C002, C003, C018, C077, C084`), each read in full from both sources, with cited Sinhala explanation, plain-English interpretation, story seeds and flagged uncertainties. Twelve candidate ideas for eight films (`development/ideas/IDEA-0001…0012`; IDEA-0003 is the pilot P01-B).
- **Dashboard D2 + D3 + first part of D7: done.** Digests show on each concept page. `/ideas` board and idea pages have **Copy complete brief**, plus `/api/ideas/[id]` (JSON) and `?format=md` for agents. Briefs carry the rules, group context, idea, location status, digests, and verbatim cited source lines.
- **Steps 2–4 for all groups: drafted (2026-09-19).** All 102 concept digests (the six largest were read in parts and merged), 136 candidate ideas, and the 98-film chronological slate (`development/episodes/EPD-0001…0098`, plus `development/slate-notes.md` for chosen, held and dropped ideas). Objects are acquired in each group's first film. EPD-0098 *The Emptied Room* is pinned as Episode 99 and ends on the crowd.
- **Dashboard build-tested (2026-09-19):** `/chronology`, `/episodes/[id]`, `/learning`, `/locations`, `/release`, `/screenplays`, and the home pipeline compile and load. The release view is explicitly proposal-only.
- **Screenplay system ready (Step 8 infrastructure):** each episode brief names one gated state. Location selection permits treatment planning; exact-version Chathura approval is required before outline and production stages; production also requires `research.status: sufficient_for_production`. Draft existence never counts as approval.
- **Viewer lessons added (2026-09-19):** every episode and group now has a versioned `lesson` with exact citations resolved against digest `sources_read`, declared/actual source line ranges, and digest evidence. Group-level teaching provenance is explicit rather than inherited implicitly.
- **Now with Chathura:** **CHRONOLOGY V1 REVIEW — GRP-01 → GRP-10.** Revisions arising from that review come before location selection becomes the primary creative step. Locations, object identities, real participants/access, release/seasons beyond the locked rules, and every screenplay-stage approval remain open human decisions.
