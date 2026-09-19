# Chronological slate brief (Step 4, Chathura Was Here)

You build the **chronological slate**: the 98 development films (Episodes 2–99 pool) in story order. This is the main order of the series, the order of Chathura's journey.

## Read first
- `docs/planning/02-project-rules.md`, `docs/planning/05-episode-001-100-continuity.md`, `docs/planning/06-master-roadmap.md` §2 and §4
- All ten `development/groups/GRP-*.json`. Their `draft_film_count` values sum to 98 and are the target size of each group.
- All `development/ideas/IDEA-*.json` (about 140 candidates). Read `title`, `logline`, `human_question`, `premise`, `concept_links`, `position_hint`, `connections`, `risks` and `location.suggestions`.
- The concept digests are optional background (`development/digests/`).

## What to produce
Exactly 98 files `development/episodes/EPD-0001.json` … `EPD-0098.json`. The ID number equals the chronological position (1 = the first film of Group 1, 98 = the last film of Group 10). Groups occupy consecutive blocks in group order.

Choose ideas per group:
- Use exactly `draft_film_count` ideas from each group (8, 10, 9, 8, 12, 10, 9, 12, 8, 12).
- Prefer strong, varied, filmable ideas. Every concept in a group should still be linked by at least one chosen idea; if dropping an idea would orphan a concept, keep a different idea that links it.
- Where two ideas are near-duplicates (for example IDEA-0003 is the abstract form of IDEA-0001), choose one and list the other in `idea_ids` as a merged secondary.
- The first film of each group must be one of its **opening candidates**, and it is where the group's object is acquired. The last film should be a **closing candidate** that hands off to the next group's emotional stage.
- The final film (EPD-0098) must be a GRP-10 closing idea that ends on the crowded-location event (see the continuity doc). It is pinned as **Episode 99**.
- Across the slate, spread geography (north, east, south, west, hills, dry zone, coast, city) so that no long run of films sits in one region.

Order within each group follows the group's emotional arc (opening → middle → closing). Then write the **threads**. A thread is one or two sentences on what carries from one film into the next: a person, a question left open, a road, a season, a sound, a material, the object. Threads are the viewer's felt connection; they must not invent facts about real people. Phrase them as planned links ("the question left by…", "the same river…", "a smell of smoke carried from…").

## Episode schema (match exactly)
```json
{
  "schema_version": 1,
  "id": "EPD-0001",
  "record_type": "episode",
  "record_role": "development_episode",
  "title": "<working title, usually the idea title>",
  "logline": "<one or two sentences>",
  "status": "draft",
  "version": 1,
  "created_at": "2026-09-18",
  "updated_at": "2026-09-18",
  "created_by": "claude",
  "updated_by": "claude",
  "idea_ids": ["IDEA-0001", "IDEA-0003"],
  "concept_ids": ["C084", "C001", "C018"],
  "chronology": { "group_id": "GRP-01", "position_in_group": 1, "global_position": 1 },
  "object": {
    "acquires": "OBJ-01",
    "appears": [],
    "note": "<how the object could enter or appear, only if a real moment allows; never staged; identity not chosen>"
  },
  "thread_in": { "from_episode_id": null, "thread": "<for EPD-0001: 'The journey begins.'>" },
  "thread_out": { "to_episode_id": "EPD-0002", "thread": "<what carries forward>" },
  "release": { "series_id": null, "position": null, "public_number": null },
  "filming": { "block_id": null, "position": null, "target_window": null },
  "location": { "...": "copy the primary idea's location object exactly: requirements, suggestions, selected_location_id null, selected_location_decision_id null, selection_status awaiting_chathura, name_reveal_policy undecided" },
  "unknowns": ["No participant, access or event has been found or confirmed."],
  "provenance": { "derived_from": ["<idea ids>"], "note": "Chronological slate v1 (draft)." }
}
```

Object rules:
- In the first film of group N, `acquires` = `OBJ-0N` (OBJ-10 for group 10), and `appears` = []. In every later film of that group, `acquires` = null and `appears` includes `OBJ-0N` (a subtle appearance somewhere in the film).
- Objects from earlier groups may also recur in `appears` where it is meaningful (at most a few times per group). Never list an object before its acquisition film.
- `concept_ids` = the union of the chosen ideas' concept links.
- EPD-0098: `thread_out` = `{ "to_episode_id": null, "thread": "Ends on the crowded-location event → Episode 100 Part A." }` and `release` = `{ "series_id": null, "position": null, "public_number": 99, "pinned_note": "last film in story time; ends on the crowd shared with Episodes 1 and 100" }`.
- All other episodes have `public_number` null.

Also write `development/slate-notes.md`: for each group, the chosen ideas in order, the ideas not chosen (with a one-line reason: held, merged or dropped), and a short note on the geographic spread.

## Rules
- Never modify `content/`, never commit, and never set or change any `selected_location_*` field.
- Write valid JSON (2-space indent, UTF-8, not ASCII-escaped).
- When done, run `cd app && npm run check` from the repository root and fix anything failing in your files. Report in under 250 words: per group, the opening and closing films; any concept left without a chosen idea; any check failures.
