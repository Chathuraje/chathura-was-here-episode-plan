# Idea finalisation brief

You review, correct and finalise the candidate ideas of one chronological group of *Chathura Was Here*.

**An idea is a plan of a concept merger and the human situation it lives in. It is not a plan of shots.** Ideas carry no locations, no place names, no camera directions and no scene lists. Those are decided later, on the episode. Your job is to make each idea explain the situation and the thinking as fully as possible without imagining a single shot.

## Read first
- Your group record `development/groups/<GRP>.json`, including its `lesson`.
- Every idea of your group in `development/ideas/`.
- Every episode of your group in `development/episodes/` (`chronology.group_id`), especially `idea_ids`, `title`, `logline`, `concept_ids` and `lesson`.
- Every concept digest linked from those ideas, in `development/digests/`: `summary_en`, `human_interpretation_en`, `key_terms`, `does_not_transfer`, `uncertainties`.

## Task 1 — check the philosophy
For every idea, test each concept link against the digests:
- Does the digest actually support the link, or was the concept attached loosely?
- Is the link's `why` accurate, or does it state something the sources do not say?
- Does the idea rest on a claim the digest flags in `uncertainties`, or on a sensitive claim in `does_not_transfer` (disability, gender, caste, status, grief as fault, kamma as fate)?

Fix what you can: rewrite the `why`, change the role (primary/supporting), drop a link that is not supported, or add a link the situation genuinely carries. Record every finding in your report. Never invent doctrine, and never repair a source contradiction by choosing a side.

## Task 2 — rewrite every idea into the new shape
Keep the same `id`, `group_id`, `aliases` and `source_doc`. Replace the old fields (`premise`, `what_camera_could_observe`, `possible_arc`, `location`) with the shape below, and **delete those four keys**. Increment `version` by 1, set `updated_at` to `2026-09-19` and `updated_by` to `"claude"`.

```json
{
  "logline": "One sentence: the idea, with no place name and no shot language.",
  "human_question": "The question a viewer is left holding.",
  "situation": {
    "what_happens": "The real human situation, described as a process or event that genuinely occurs in life. 2–5 sentences. No places, no camera.",
    "who_is_involved": "The people by role and relationship (a weaver, an apprentice, the family who ordered the cloth). Never real names.",
    "what_is_at_stake": "What could be gained, lost, learned or failed, and for whom.",
    "how_it_unfolds": "How such a situation typically moves over time: its beginning, its pressures, its possible endings. Say plainly where reality decides the outcome."
  },
  "concept_merge": {
    "why_together": "Why these concepts belong in one film: what each contributes and how they meet in this situation. Name them.",
    "what_it_reveals": "What becomes visible when they are put together that neither shows alone."
  },
  "concept_links": [{ "concept_id": "C084", "role": "primary", "why": "Grounded in the digest." }],
  "what_the_viewer_could_understand": "One or two sentences, in plain language, of the understanding this film could leave. It must match the episode's lesson where one exists.",
  "what_must_be_real": "What may never be staged or arranged.",
  "position_hint": "opening candidate | middle | closing candidate, and why, with no location reasoning.",
  "risks": ["..."],
  "drop_if": ["..."],
  "connections": [{ "idea_id": "IDEA-00xx", "relation": "pairs with", "note": "..." }],
  "selection": { "recommendation": "keep", "merged_with": [], "superseded_by": null, "reason": "One line." },
  "unknowns": ["No participant or event has been found or confirmed. Everything here is a research direction."],
  "evidence_class_note": "Editorial proposal. No location, scene or shot decisions are made at the idea stage."
}
```

**Scrub every real place name** from all idea text (titles included). If a title depends on a place, rename it to something about the situation. Keep descriptions of *kinds* of settings only where the situation cannot be understood without them (for example "a household that depends on a well"), and never as a proposal.

## Task 3 — finalise the selection
Your group's episodes already use one idea each. Those are the current slate.

- The ideas used by an episode get `recommendation: "keep"`, unless your philosophy check shows one is unsound. If it is, say so in the report and recommend the replacement, but **do not** rewire the episode yourself.
- Every other idea gets:
  - **merge** — its substance is folded into a kept idea. Set `superseded_by` to that idea, and add its id to the kept idea's `merged_with`. Then actually enrich the kept idea: fold the useful situation detail and any concept link it brings into the kept idea's own fields. A merge must add something, not just a pointer.
  - **hold** — a strong idea with no slot in this group. Say what it is being held for.
  - **drop** — weak, or a duplicate of another group's idea. Give the reason.
- Each kept idea must end up rich enough to stand alone: a reader should understand the situation, the concepts, the stakes and the question without seeing any other file.
- **Coverage:** every concept in your group must be linked by at least one kept idea. If a concept is only weakly carried, strengthen a kept idea by folding in a merge, rather than inventing a film that does not exist.
- If your group's coverage genuinely needs a new idea, create it with the next free id in your spare block (given in your prompt) and mark it `hold`, explaining why it is needed.

## Task 4 — keep episodes consistent
Only where your rewrite changes them, update your group's episode files: `title`, `logline`, `concept_ids` (the union of the kept idea's links plus any folded in). Change nothing else: not `location`, `lesson`, `object`, `thread_in` or `thread_out`. If a rewrite makes an episode's `lesson` inaccurate, do not edit the lesson; list it in the report as needing an update.

## Finish
Write `docs/planning/idea-review/<GRP>.md` containing:
1. philosophy findings and what you changed;
2. the final kept list in episode order, one line each;
3. merges (which idea into which, and what it added);
4. holds and drops with reasons;
5. anything still weak, and any lesson needing an update.

Then run `cd /Volumes/chathura-pc/chathura-was-here-notes/app && npm run check` and fix any failure caused by your files. Never modify `content/`, never touch another group's files, and never commit. Report back in under 200 words.
