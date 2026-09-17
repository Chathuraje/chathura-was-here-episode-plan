# Processing Report — Idea Bank to Story Discovery

> **Folder note (2026-09-17, after this report):** the repository was reorganised into `content/01-sources` … `content/05-story-leads`. Paths in this report were updated to the new layout, except git commands that refer to commits made before the move. See [../PATH-MAP.md](../PATH-MAP.md).

**Date:** 2026-09-17
**Task:** Build the story-discovery layer (philosophy map, overlap map, potential matrix, research shortlist, lead template, research agent instruction) from the accepted idea bank.
**Scope:** Editorial analysis of existing files only. No internet research, no real people or stories, no episode planning, no screenplay material.

## 1. Repository and snapshots

| Item | Value |
|---|---|
| Repository | https://github.com/Chathuraje/chathura-was-here-episode-plan.git |
| Branch | `main` |
| Commit reviewed | `e2059cdd976a0aa386f870c9fdcea48fdd15e054` (`e2059cd`) |
| Commit at session start | `635f901` |
| Change between them | One commit, `e2059cd`, a pure rename of `CONCEPT_TO_IDEA_WORKFLOW.md` to `instructions/CONCEPT_TO_IDEA_WORKFLOW.md` (0 lines changed). It was made outside this task during the session. The idea bank is identical in both commits. |
| Source snapshot used by the idea cards | `ef70024` (`ef70024ac8e40ee19b8e4e5f9a3eed890bd3f873`). All 172 cards record `source_snapshot: ef70024` and `instruction_version: concept-to-idea v1 (2026-09-17)`. |
| Working location | Repository stored on a Windows network share, mounted on macOS. |

### Have the concept sources changed since `ef70024`?

**No material change was found.** The source traces in the cards remain current.

- **Committed history:** `git diff ef70024 e2059cd -- notes/concepts notes/original-sources` is empty (paths as they were at that commit; see `content/PATH-MAP.md`). No commit since the snapshot touched the sources.
- **Uncommitted modifications:** 70 files show as modified (69 under `content/02-concepts/` and `content/01-sources/PDF to Markdown Extraction Guide.md`). Each was compared byte by byte with its `HEAD` version after normalising line endings. **All 70 are identical except for CRLF/LF line endings.** The concept register already records that the working tree differs from the snapshot only in line endings.
- **Untracked paths:** 71 untracked files appear under `content/02-concepts/`. Each is a Unicode-normalisation variant (composed versus decomposed Sinhala vowel signs) of an existing tracked path. **All 71 have content identical to their tracked twin.** This pattern is consistent with a Windows network share presenting the same filenames in a different Unicode form. No new concept content exists.
- **Affected concepts:** none.

Recommendation for the repository owner (not acted on): consider a `.gitattributes` line-ending rule and checking filename normalisation on the share, so that future diffs do not show false changes.

## 2. Files read and processed

| Input | Coverage |
|---|---|
| `instructions/concept-to-idea.md` | Read in full. |
| `instructions/CONCEPT_TO_IDEA_WORKFLOW.md` | Read in full. The task brief names it at the repository root; it now lives in `instructions/` (see section 1). |
| `content/03-idea-bank/index.md` | Read in full; all 172 rows parsed and validated. |
| `content/03-idea-bank/concept-register.md` | Read in full; all 102 rows parsed and validated. |
| `content/03-idea-bank/ideas/` (172 files) | Front matter of all 172 parsed. **All 148 accepted cards read in full.** Held and merged cards were not used as candidates; merged cards' `merged_into` values were checked. |
| `content/03-idea-bank/source-notes/` (102 files) | Counted and link-checked. Not read in full: accepted cards contained enough detail for editorial work, and no clarification required a source note. |
| `content/03-idea-bank/batch-reports/` (34 files) | Scanned for warnings, suspected source-text errors, safeguarding notes and open reviewer questions. Relevant items are recorded in sections 5 and 6. |
| `content/02-concepts/`, `content/01-sources/` | Not read for content. Checked only for changes (section 1). |

## 3. Counts

| Item | Expected (brief) | Found | Match |
|---|---|---|---|
| Source notes | 102 | 102 | Yes |
| Idea-card files | 172 | 172 | Yes |
| Accepted for research | 148 | 148 | Yes |
| Held | 10 | 10 | Yes |
| Merged aliases | 14 | 14 | Yes |
| Concepts marked `no suitable idea` | 23 | 23 | Yes |

- **Held (10):** C008-I02, C016-I02, C028-I01, C032-I03, C037-I01, C050-I01, C067-I02, C068-I01, C075-I03, C085-I03.
- **Merged (14):** C010-I01→C034-I01, C011-I01→C075-I01, C012-I01→C074-I03, C019-I01→C075-I01, C028-I02→C007-I02, C033-I02→C013-I03, C042-I01→C034-I01, C045-I01→C040-I01, C065-I02→C020-I02, C074-I02→C022-I01, C087-I02→C076-I03, C099-I01→C087-I01, C099-I02→C088-I03, C101-I01→C089-I03.
- **No suitable idea (23):** C002, C015, C017, C018, C025, C029, C031, C035, C041, C044, C049, C051, C053, C054, C057, C063, C064, C070, C071, C072, C078, C079, C083.

## 4. Validation results

All checks were scripted against the files and then reviewed.

| Check | Result |
|---|---|
| Every card file has parseable front matter | Pass (172/172) |
| Duplicate IDs among card files | None |
| Filename matches `<id> - <title>.md` | Pass (172/172) |
| Every index row has a card file | Pass (172/172) |
| Every card file has an index row | Pass |
| Index title matches card title | Pass |
| Index status matches card status (including `merged into <ID>`) | Pass |
| Broken links in index | None |
| Every merge target exists and is `accepted for research` | Pass (14/14) |
| Every `related_ideas` ID exists | Pass |
| Register idea lists match card files per concept | Pass (102/102) |
| Broken source-note links in register | None |
| `source_snapshot` consistent | Pass (all `ef70024`) |

### Missing or inconsistent items

No missing files, broken links, duplicate IDs or status disagreements were found. Three minor issues were recorded and **not repaired**, as instructed:

1. **Inconsistent concept-level status convention in the register.** Concepts whose only card was merged are marked `held` in some rows (C010, C012, C019) and `ready` in others (C042, C045, C099). C028 is `held` with one held card and one merged card. The register's `held: 7` counts concepts, while the index's 10 held counts cards. This does not affect card-level data.
2. **Unverified line locators in 15 accepted cards.** Consolidation notes dated 2026-09-17 say "line locators still to be spot-checked" in C001-I01, C005-I02, C006-I01, C011-I02, C013-I02, C016-I01, C024-I03, C040-I02, C047-I02, C056-I03, C060-I02, C062-I01, C069-I01, C073-I03 and C076-I02. Five of these are shortlisted leads (C001-I01, C005-I02, C011-I02, C073-I03, C076-I02). The central claims of these cards rest on their primary locators, which are not affected.
3. **Stale `data.md` references** in several source-extract header notes (reported in batch reports). They were renamed `Abhidharma Margaya.md` in `ef70024`. This is metadata, not a text error.

Suspected source-text errors listed in batch reports (for example C013 Pradeepika line 56, C045 chart rows, C052 lifespan figures, C069 Margaya line 11, C080 Pradeepika line 1322, C087 line 259) were noted. None changes the central claim of a shortlisted card.

## 5. How every accepted card was read

1. The 148 accepted IDs were extracted from front matter and saved as a checklist.
2. Cards were bundled in ID order into eight reading files of 18–19 complete cards each, with no text removed.
3. Each file was read in full, including continuation pages where the reader truncated long files.
4. After each file, a private ledger entry was written for every card: open question, mechanism and tension, hypothetical directions, limits, ethical risks, supporting concepts, related and merged IDs, and editorial notes.
5. A script confirmed that the ledger contained exactly 148 unique IDs matching the accepted set, with none missing and none extra.

Keyword matching was not used to assign territories, overlaps, scores or tiers. Scripts were used only for inventory, validation, consistency checks and table generation.

## 6. Ethical and fidelity concerns

### Card not advanced

**C093-I02 — *When the same thing disgusts once out of place*: Do not advance.**
- *Fidelity:* The card uses the source's examples for the opposite purpose to the source (the source treats them as evidence that the body is foul). Batch report reviewers asked for a decision on whether this is acceptable or the card should be held. No resolution is recorded.
- *Ethics:* Its research directions (objects from a funeral house, purity rules, where food was grown) lead toward purity and pollution beliefs. In Sri Lanka these can overlap with caste-based and funeral-work stigma.
- *Effect:* Excluded from research selection. C009-I02 and C090-I01 cover disgust with lower risk. **The card's `accepted for research` status is unchanged.**

### Open reviewer questions from batch reports (unresolved in the bank)

These cards remain usable but carry the open question into the matrix cautions:

| Card | Open question | Effect in this layer |
|---|---|---|
| C004-I01 | Are the limits strong enough given livelihoods in fishing and animals? | Tier B; caution against labelling livelihoods. |
| C007-I03 | Are the ethical limits adequate for mourners? | Tier C; supporting only. |
| C013-I03 | Is widening "doubt" from doctrinal doubt acceptable? | Tier C. |
| C020-I03 | Does the card read as a clinical or moral judgement of worry? | Shortlisted (SQ04) with explicit non-clinical caution. |
| C030-I01 | Does it understate one source's ranking of joyful good states? | Shortlisted (SQ17); the ranking is noted in the brief. |
| C043-I01, C046-I01 | Source disagreement about where attention or recognition sits in the process. | Tier C and Tier B; neither shortlisted. |
| C055-I01 | Could it imply that misfortune repays wrongdoing? | Tier B; not shortlisted. |
| C056-I03 | Is it too close to a devotional warning against doubt? | Tier B; reserve only. |
| C066-I02 | Is applying intimation to recorded voices a limited analogy or a distortion? | Shortlisted (SQ18); the brief marks the grief application as the card's extension. The reviewer question should be settled before any lead advances to selection. |
| C095-I03 | Is the card faithful enough without the source's ownership-of-action basis? | Tier B; supporting to SQ16. The basis must not be carried in any case. |
| C006-I01 / C026-I02 | Do they conflict? | Treated as a pair distinguishing knowing in general from seeing in the moment (overlap group G20). |
| C080-I01 / C081-I02; C013-I02 / C074-I01; C088-I03 / C089-I01; C080-I03 / C060-I01; C086-I03 / C013-I03 | Possible merges. | Kept separate, with reasons, in the overlap map. |

Several consolidation questions in batch reports (supporting passages for C001-I01, C011-I02, C013-I02, C016-I01, C040-I02, C056-I03, C062-I01, C073-I03) have already been resolved in the cards through added supporting passages.

### New concerns identified in this editorial pass

These did not change any status. They are reflected in tiers and cautions:

- **C052-I02:** Its origin myth is part of the same passage whose following lines (C052 Pradeepika 194–204) give caste etymologies. Any research must not legitimise a ruler, rank or caste. Tier B.
- **C022-I03:** The source frames a low self-estimate as a form of conceit. Research on "not for people like us" could shift structural exclusion onto individuals. Tier B, reserve.
- **C080-I02:** The gem-miner simile could stereotype gem-mining communities. Tier B, reserve.
- **C097-I01:** Monastic-deceit material applied to people who depend on patrons (including domestic workers) risks implying manipulation by vulnerable people or religious workers. Tier C.
- **C086-I01, C086-I03:** Both rest on temperament typology, which the bank's safeguards bar from use on real people. Tier C.
- **C082-I02:** Research risks framing subjects as being on a slope toward harm. Tier C.
- **C092-I03, C061-I01, C007-I03:** High safeguarding risk (self-harm adjacency, dying people, judgement of mourners). Tier C.
- **C046-I01:** Its "threat / one of us" example could invite illustration of communal prejudice. Tier B, reserve.
- **Disaster and conflict memory (SQ20, T13):** Politically and ethnically sensitive in Sri Lanka. Stated in the brief and territory cautions.

## 7. Issues that prevented complete processing

None. Every accepted card was read and processed.

The only partial coverage is by design: source notes and original concept sources were not read in full, because the task's source-authority order places cards, index and register first, and no card needed clarification from them.

## 8. Outputs

| File | Contents |
|---|---|
| `content/04-story-discovery/README.md` | Purpose, relation to the idea bank, how to use the files, what this stage does not establish. |
| `content/04-story-discovery/processing-report.md` | This report. |
| `content/04-story-discovery/philosophy-map.md` | 14 human territories; every accepted card mapped to one primary territory (77 secondary links); appendix proving all 148 mapped. |
| `content/04-story-discovery/overlap-map.md` | 38 overlap groups (123 cards) plus 25 distinct cards; lead cards; merged-alias references; distinctions preserved. |
| `content/04-story-discovery/documentary-potential-matrix.md` | Eight-criterion scores, totals, tiers, reasons and cautions for all 148 accepted cards. Tier A 29, Tier B 78, Tier C 40, Do not advance 1. |
| `content/04-story-discovery/research-shortlist.md` | Selection method, territory balance, 24 full research briefs, reserve list of 18. |
| `content/04-story-discovery/story-lead-template.md` | Reusable lead card; all leads start `unverified`. |
| `content/04-story-discovery/research-agent-instruction.md` | Reusable instruction for researching one shortlisted question. |

## 9. Quality-control checklist

| Check | Result |
|---|---|
| Every accepted card was read | Yes (148/148, ledger verified) |
| Every accepted card has a primary territory | Yes (148/148, no duplicates) |
| Held cards excluded from research selection | Yes |
| Merged aliases not treated as separate ideas | Yes (no rows or shortlist places; referenced through surviving cards) |
| No-suitable-idea concepts not reopened | Yes |
| Every shortlisted question is open rather than leading | Yes. Three were refined to remove a built-in assumption (SQ05, SQ13, SQ23); the card's wording is shown beside each. |
| No real person, community, location or event invented or named as a subject | Yes |
| No hypothetical example presented as a verified story | Yes |
| No idea assigned to an episode, season, object, coordinate or chronology | Yes |
| No screenplay material created | Yes |
| Every shortlist item carries source IDs and limits | Yes (checked by script: lead ID, title and exact card question in each brief) |
| Shortlist balanced across territories | Yes (all 14 represented; maximum 3 per territory) |
| Philosophy remains guidance, not the visible subject | Yes |
| Documentaries can exist independently of doctrine | Required in every brief and in the lead template |
| All eight required files created | Yes |
| Existing repository files unchanged | Yes. `git status` after creation shows only the new untracked folder `content/04-story-discovery/`, in addition to the line-ending and Unicode-normalisation differences that existed before this task (section 1). |

## 10. Completion statement

All 148 accepted idea cards were read in full and processed. All eight required files were created under `content/04-story-discovery/`. No file in `content/02-concepts/`, `content/01-sources/`, `content/03-idea-bank/` or `instructions/` was modified, renamed or deleted by this task. Nothing was committed or pushed.
