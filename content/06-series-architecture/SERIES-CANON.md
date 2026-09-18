# Series Canon

Audit of what this repository actually establishes about the series, what it does not, and which rules this planning layer works under.

- **Repository commit inspected:** `43559b5` (`main`, 2026-09-17 22:54 +0530), working tree with uncommitted modifications to source and concept files.
- **Audit date:** 2026-09-18.
- **Idea-bank source snapshot cited by the cards:** `ef70024`.
- **Story-discovery layer built from:** `e2059cd`.

---

## 1. Audit result: the original channel plan is not in this repository

**The original channel plan is absent.** So are the Episode 1 material, the Episode 100 material, the season rules and the continuity rules.

This was checked, not assumed:

| Check | Method | Result |
|---|---|---|
| Filename search | every `.md` outside `01-sources/` and `02-concepts/` listed | 13 files; none is a channel, series, season or episode plan |
| Content search | case-insensitive search for `episode 100`, `episode 1`, `season <n>`, `channel plan`, `Meemure`, `Hunnasgiriya` across all Markdown, TypeScript, JSON and CSV outside `node_modules`/`.next` | **no matches** |
| Structure keywords | search for `coordinate`, `notebook`, `collectible`, `continuity`, `chronology`, `release order`, `reveal` | matches occur **only inside prohibition lists** — e.g. research agents are told not to assign a lead to "an episode, season, episode number, coordinate, object, notebook clue or the hidden chronology" |
| Git history | all 12 commits on `main`; trees listed at the root commit, `50ad9ce`, `ef70024`, `main~4`, `main~1` and `main`; every non-source path inspected | no plan file has ever existed here under any path |
| Deleted files | the three non-source documents that existed only in early commits were opened and read: `README.md` (a one-line repository title), `Notes/Sources and Guidance/Guidance/Guidance and Informations.md` (a philosophy-research and extraction workflow) and `video/prompt.md` (a Sinhala transcription prompt) | none contains a channel, season, episode or continuity plan |

So the series structure is **referred to** by this repository but **never documented in it**. The prohibition lists are the only evidence that a hidden chronology, coordinates, a notebook and collectible objects exist at all, and they describe none of them.

**Consequence.** Nothing in this planning layer may be presented as a reading of the original plan. Where the user's instruction supplies a rule, it is recorded below as a user requirement. Where neither exists, the placement is a proposal and is labelled as one.

---

## 2. Documented canon — read from files in this repository

Every line here was read in the file named.

### 2.1 Channel identity

| Rule | Source |
|---|---|
| The project is *Chathura Was Here — Stories • Journeys • Memories*: a cinematic documentary project, mainly about Sri Lanka, telling real stories through people, places, journeys, history, culture, memories, traditions, objects and communities. | `04-story-discovery/research-agent-instruction.md` |
| Its principle is **Story → Place → Experience**: the story gives the journey meaning, the place gives the story a world, the filmmaking makes the audience feel present. | same |
| Chathura observes, travels and gradually understands. **He is not a presenter.** | same |
| Abhidhamma philosophy is the channel's hidden guidance. It decides which questions Chathura carries. Real people and places decide the stories he finds. The journey changes what the questions mean. | same |
| The philosophy must never be imposed on anyone, and **every documentary must stand on its own if all references to it are removed**. | same, and `04-story-discovery/README.md` |
| Real people and places must never become illustrations forced to prove a philosophy or serve a hidden puzzle. | `instructions/concept-to-idea.md` |

### 2.2 Pipeline

```
01-sources → 02-concepts → 03-idea-bank → 04-story-discovery → 05-story-leads → (selection) → screenplay
```
Documented in `04-story-discovery/README.md`. This layer, `06-series-architecture`, is new and is described in its own `README.md`.

### 2.3 Verified inventory (recounted 2026-09-18)

| Item | Last reported | Recounted | Agrees |
|---|---|---|---|
| Concepts | 102 | **102** | yes |
| Idea cards | 172 | **172** | yes |
| Accepted ideas | 148 | **148** (`status: accepted for research`) | yes |
| Held ideas | — | 10 | — |
| Merged ideas | — | 14 | — |
| Human territories | 14 | **14** (T01–T14) | yes |
| Research questions | 24 | **24** (SQ01–SQ24) | yes |
| Overlap groups | — | 38 (G01–G38) | — |
| Source notes | — | 102 | — |
| Existing story leads | — | **0** at the time of this audit (`05-story-leads/` then held only its README). **112 lead cards exist now**, written later the same day; see `PROGRESS.md`. | — |

Readiness tiers over the 148 accepted cards: **Tier A 29, Tier B 78, Tier C 40, Do not advance 1** (`C093-I02`). This reproduces the summary table in `documentary-potential-matrix.md` exactly.

### 2.4 Rules that carry forward into this layer

From `04-story-discovery/README.md` and `research-agent-instruction.md`:

- **A hypothetical direction is not a verified story.** Every "possible everyday expression" in an idea card and every "story signal" in the discovery layer describes a *kind* of situation to look for. None is evidence that such a situation exists.
- **Story research comes before screenplay development.** No scenes, narration, dialogue, shot lists or story arcs may be written from an idea card or from the discovery layer.
- **Never invent** a person, name, event, date, quotation, biography, place detail or outcome.
- **Never infer** anyone's inner state, motive or character from behaviour, occupation, appearance, community or circumstances.
- **Never use karma, past action or rebirth** to explain disability, poverty, social status, appearance, birth conditions or unequal circumstances.
- **Never carry forward** caste, racial or gendered claims, polemics against other religions or science, traditional physiology presented as neuroscience, supernatural powers presented as fact, or temperament typing.
- **Never label** anyone greedy, envious, hateful, proud, shameless, deluded or similar.
- **Do not contact anyone** unless contact has been authorised. Desk research comes first.
- Safeguarding protocol required before any contact where death, grief, illness, disability, addiction, suicide, self-harm, minors or legal proceedings are involved.
- A lead is **`verified` only** when sections 2–6 of its card are supported by verified facts or consented participant accounts, access and consent are documented, and ethical risks have mitigations. Fitting the question well is never a reason to mark it verified.

### 2.5 Identifier and status conventions already in force

Read from `04-story-discovery/story-lead-template.md` and from the app's parsers in `app/src/lib/leads.ts` and `app/src/lib/routes.ts`.

| Entity | Pattern | Enforced by |
|---|---|---|
| Concept | `C\d{3}` | `content.ts`, `routes.ts` |
| Idea | `C\d{3}-I\d{2}` | `content.ts` (`IDEA_RE`), `routes.ts` |
| Territory | `T\d{2}` | `content.ts`, `routes.ts` |
| Overlap group | `G\d{2}` | `content.ts`, `routes.ts` |
| Research question | `SQ\d{2}` | `content.ts`, `routes.ts` |
| Story lead | `SL-SQ\d{2}-\d{3}` | `leads.ts` (`LEAD_ID_RE`), filename must match `^SL-SQ\d{2}-\d{3}.*\.md$` |

`research_status` ∈ `unverified | in research | verified | on hold | rejected`.
`screenplay_readiness` ∈ `not ready | ready for selection review`.
Both enums are hard-coded in `app/src/lib/leads.ts` and are **not** extended by this layer.

---

## 3. User requirements for this commission

Supplied by the project owner in the commissioning instruction. These are authoritative and override conflicting older planning assumptions. They are **not** repository canon, because the repository contains none.

### 3.1 Series shape

| # | Requirement |
|---|---|
| U1 | Ten seasons. |
| U2 | Episodes 1–99 form the core public journey. |
| U3 | Episode 100 completes and reconstructs the journey. |
| U4 | Generate 98 documentary story candidates for Episodes 2–99. |
| U5 | Include 8–10 continuity-linked documentary stories within those 98. |
| U6 | Season lengths may vary. |
| U7 | Public release order and actual chronological order differ. |
| U8 | Philosophical progression guides the viewing experience. |
| U9 | Episode 1 is the destination of the core chronological journey, despite being released first. |
| U10 | Episode 100 supplies the missing events around Episode 1. |
| U11 | Season counts must total 99 core episodes, **including** Episode 1. |
| U12 | Episode 100 is not counted among the 98 new documentary stories. |
| U13 | Ten season pieces or objects and 8–10 continuity stories are **separate counts**; no mandatory one-to-one relationship. |

### 3.2 The Episode 1 / Episode 100 sequence

Preserved at segment level, exactly as supplied:

```
Episode 100 Part A  →  Episode 1  →  Episode 100 Part B
```

| Segment | Segment ID | Content as supplied by the user |
|---|---|---|
| Episode 100 Part A | `SEG-E100A` | The missing events *before* Episode 1: the crowded-location sequence; return to the room; ten accumulated objects shown together; packing; motorcycle departure; travel toward Hunnasgiriya / Meemure until the existing Episode 1 footage connects. |
| Episode 1 | `SEG-E001` | The monastery experience. Ends with Chathura disappearing into the forest. |
| Episode 100 Part B | `SEG-E100B` | Continues from that forest ending: the teacher, meditation / conversation, and reconstruction of the larger journey. |

Two clarifications the user made explicit, recorded so they are not lost:

- Episode 1 is the **destination** of the core journey; Part B is its **continuation and completion**. Part B must not be erased in order to make Episode 1 literally the final shot chronologically.
- Episode 100 is a **completion / reconstruction episode**, not one of the 98 new documentary stories.

### 3.3 Episode craft requirements

Each episode should work as a satisfying documentary on its own; let viewers experience a story through Chathura's point of view; use the location as the world in which something meaningful unfolds; contain observable activity, atmosphere, uncertainty or change; begin inside the story with footage and sound; reveal season/episode information, coordinates and title later; reveal the location name only when appropriate; and remain realistically researchable and filmable. No episode may become a travel guide or a history explainer by default.

### 3.4 Philosophy handling

Abhidhamma-derived ideas guide discovery and editorial interpretation **internally**. They are translated into ordinary human experience — attention, perception, intention, memory, expectation, attachment, identity, relationships, change, consequence — while preserving the source mechanism and ethical meaning. A complex idea is not reduced to a motivational slogan. Buddhist terminology does not enter an audience-facing premise unless the actual subject warrants it. Reality is permitted to complicate or contradict the interpretation, and a weak documentary is not retained because it fits a concept.

---

## 4. Recorded conflicts

Kept open rather than resolved silently.

### CONFLICT-01 — the discovery layer forbids episode assignment

`04-story-discovery/research-agent-instruction.md` prohibits a research agent from assigning a lead to "an episode, season, episode number, coordinate, object, notebook clue or the hidden chronology". `04-story-discovery/README.md` states that "no idea has been assigned to an episode, season, object, coordinate or chronology."

**Status:** not a contradiction of the user's instruction, but a stage boundary that must be kept visible.

**Resolution applied here.** That prohibition governs the *research* stage and the artifacts it produces. This commission is the later series-architecture stage, which the project owner has now opened. The boundary is preserved physically:

- Episode numbers, seasons, chronology and continuity roles exist **only** in `06-series-architecture/`.
- **No lead card in `05-story-leads/` carries an episode, season, coordinate or chronology field.** Lead cards stay research artifacts.
- The join between the two layers is the stable story ID, never an episode number.

No file in `01-sources/`, `02-concepts/`, `03-idea-bank/`, `instructions/` or the existing files of `04-story-discovery/` has been modified.

### CONFLICT-02 — Season 1's episode count is not documented

The instruction says to preserve Season 1's episode count "if documented". **It is not documented anywhere in this repository** (see §1). Season 1's length is therefore a proposal in `SEASON-ARC-MAP.md` and is marked provisional. If the owner holds a fixed Season 1 count outside this repository, supplying it will change season boundaries but not story IDs.

### CONFLICT-03 — the ten season pieces or objects are not documented

The user refers to "ten accumulated objects" in `SEG-E100A` and to "ten season pieces or objects". No object is named or described anywhere in this repository. This layer therefore:

- treats the existence of ten season pieces as **user-supplied canon**, not repository canon;
- records one **season piece slot** per season (`SP-01`…`SP-10`) with **no object assigned**;
- never invents an object, and never invents an episode in which an object is acquired;
- keeps the season-piece association separate from the continuity-anchor count, per U13.

### CONFLICT-04 — repository visibility versus spoiler-sensitive material

`https://github.com/Chathuraje/chathura-was-here-episode-plan` is **PUBLIC** (checked 2026-09-18 via the GitHub API: `"private": false`).

Hidden chronology, reveal planning and continuity payoffs are spoiler-sensitive by nature. A "spoiler-sensitive" label in a file header is an editorial marker; **it confers no confidentiality on a public repository.** Anything committed and pushed is world-readable and may be indexed and cached even if later deleted.

**Status: unresolved. This is the owner's decision.**

**Correction (2026-09-18, later the same day).** An earlier version of this file said nothing had been pushed. That is no longer true: `origin/main` is at commit `b7f561c` ("new update"), pushed 2026-09-18 05:12 UTC, and it contains this whole folder, including `HIDDEN-CHRONOLOGY.md`, `EPISODE-001-TO-100-CONNECTION.md`, `CONTINUITY-ANCHORS.md` and `data/`. The GitHub API still reported `"visibility": "public"` when this was checked. The spoiler material is therefore already world-readable and may already be cached or indexed.

What the explorer app can and cannot do about it:

- The app can keep spoilers off its **own** pages. Run it with `EXPLORER_SPOILERS=hide` and the server refuses the chronology, connection and framing-segment views, drops spoiler fields from episode pages, and returns 404 for spoiler documents requested directly under `/docs/...`. Hiding a navigation link alone would not be enough, which is why this is enforced on the server.
- The app **cannot** make a file in a public GitHub repository private. Only the repository owner can change the repository's visibility, move the spoiler material to a private repository, or rewrite history; none of those has been done, and none should be done without the owner's decision.

---

## 5. Identifiers introduced by this layer

New ID spaces, chosen so they cannot collide with the existing ones and so that episode placement can change without breaking a source link.

| Entity | Pattern | Meaning | Stable across re-planning |
|---|---|---|---|
| Story candidate | `ST-\d{3}` | A documentary candidate. Assigned in discovery order, **never** derived from an episode number. | yes |
| Framing segment | `SEG-E001`, `SEG-E100A`, `SEG-E100B` | The three fixed framing segments. | yes |
| Connection | `CX-\d{3}` | One justified relationship between two story or segment IDs. | yes |
| Season | `S01`…`S10` | A release-order season. | boundaries are provisional |
| Season piece slot | `SP-01`…`SP-10` | A slot for a season piece or object. No object is assigned. | yes |
| Story lead | `SL-SQ\d{2}-\d{3}` | Existing convention, unchanged. | yes |

A story ID never changes when an episode number changes. The episode number is an attribute of the story, not its identity.

---

## 6. Candidate status vocabulary

The instruction requires four evidence levels. The repository's `research_status` enum is fixed and is not extended. The four levels are carried in a **separate** `candidate_status` column that lives only in this layer's tables, and each maps onto an existing `research_status` value for the lead card.

| Candidate status | Meaning | Lead `research_status` | May be scheduled? |
|---|---|---|---|
| `direction` | A *type* of situation worth finding. No specific subject. | `unverified` | as a provisional slot only |
| `unverified-lead` | A specific possible subject, named or locatable, awaiting confirmation. | `unverified` | provisional |
| `evidenced-situation` | Reliable independent sources support the **core situation, practice, place or institution**. The individual participant is not yet identified or confirmed. | `in research` | provisional, with evidence |
| `evidenced-subject` | Reliable sources support the core situation **and** a specific identified subject. Consent and access still unknown. | `in research` | provisional, with evidence |
| `production-ready` | Access and practical checks completed, consent documented, human selection made. | `verified` | yes |

**Five separate questions, never conflated:**

1. **Factual verification** — is the core situation real, and sourced?
2. **Current situation** — is it still true now?
3. **Participant willingness** — has anyone agreed to take part?
4. **Filming access** — is there permission to film the place and the activity?
5. **Production feasibility** — season, travel, language, cost, safety.

Online research can only reach questions 1 and, partially, 2. **It can never establish 3, 4 or 5.** Every candidate produced by this layer therefore stands at `evidenced-situation` at best until a human does field work. No one has been contacted; no message has been sent; no booking has been made.

---

## 7. What this layer does not establish

- No real person has been identified as a participant, and no consent exists.
- No filming access exists anywhere.
- No footage is known to exist. Every visual or sound note is a **proposed opportunity**, not material in hand.
- The hidden chronology is a **provisional production plan**. It does not date any real documentary event, and it will change when real events and real footage arrive.
- Season boundaries, episode numbers and continuity roles are proposals, revisable without touching story IDs.
- A catalog entry is not a commission. 98 provisional candidates is not 98 verified stories, and the two counts are reported separately everywhere.
