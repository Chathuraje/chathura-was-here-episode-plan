# Agent prompt: take one idea, find its location, write the record

Copy the block below, replace `IDEA-XXXX`, hand it to an agent. It runs end to end — search, decide, write,
validate — without checking back. Run **no more than two agents at a time**: five concurrent caused
simultaneous stalls, and a session rate limit killed one mid-run.

---

```
You are finding the real shooting location for ONE film in *Chathura Was Here*, a 98-film documentary
series on Abhidhamma philosophy shot entirely in Sri Lanka, and then writing that film's record.

Repo: /Volumes/192.168.1.5/chathura-was-here-notes
Your idea: IDEA-XXXX

You have full authority to go all the way to a finished, validated record without checking back. Work in
local files and web research only: create no artifacts on any external service, no MCP integrations, and no
files outside this repo.

## Read first, in this order

1. docs/planning/prompts/how-to-select-a-location.md — THE METHOD. Read every line and follow it exactly.
   Everything below is additions to it, not a summary of it.
2. development/ideas/IDEA-XXXX.json — the record you will overwrite.
3. The digest in development/digests/ for EACH concept in that record's `concept_links`: summary_en,
   human_interpretation_en, key_terms, does_not_transfer, uncertainties, evidence. SKIP sinhala_explanation.
4. docs/planning/prompts/footage-led-idea-brief.md — the house style.
5. docs/planning/10-standing-creative-decisions.md — binding.
6. docs/planning/08-the-footage-led-slate.md — the other films: the district table and the archetypes.
7. development/ideas/IDEA-0001.json — your model for depth and field order.

## Sequence

**Phase 1 — search.** Do not open the record's existing location with any intention of saving it; ignore it
entirely. Ask what the concept needs in order to be SEEN, then find where a documented or genuinely disputed
story already asks that question AND the place is worth travelling to photograph. Both halves, or reject it.

**Phase 2 — decide, against yourself.** Before you write anything, state the strongest objection to your own
choice and answer it. Check it against every archetype on the slate (kinds of place and story shapes, not
place names), against every other film in its group for visual approach, and against the district budget.

**Phase 3 — write the record.** Only once phase 2 survives. Full depth, not a patch.

**Phase 4 — validate.** `cd app && node scripts/check-data.mjs`. Do not stop until it prints that all checks
passed.

## Non-negotiable, because these are the things that get skipped

- **The concepts are fixed.** Do not change, reorder, add or drop anything in `concept_links` to make a
  location work. The first is primary. If it only fits after you adjust them, it is the wrong location.
- **A perfect doctrinal fit in an ordinary location is not a location.** This is the specific failure that
  forced an entire group to be redone. If you are excited about how neatly the philosophy lands and vague
  about what the camera would see, you have hit it — stop and start again.
- **Assume at least one thing you first read is wrong, and find which.** Test for all eight failure modes in
  the method file by name. Ask of every story: who first wrote this down, when, and what did they stand to
  gain? Name the earliest attestation you can actually reach. Separate firm / disputed / could-not-confirm,
  and never average a variant. Verify the district yourself — online sources get Sri Lankan districts wrong
  constantly.
- **Do not write a claim you could not source.** Not in the voice, not as fact anywhere. If a beat needs a
  document you cannot reach, build the beat on something you can, or say the film is not yet earned. An
  unsourced claim that "sounds like history" is the single most common defect in this project.
- **No identifiable person in a mental state**, in narration or in framing. No place name outside
  `suggested_location`. No bereavement or remembrance register. No civil war as subject. No kamma-as-fate.
  No living community as subject or exhibit, and no live ownership, religious or territorial dispute entered.
  Never narrate traditional teaching as observable fact. Obey the digest's `does_not_transfer` as a list of
  things the film may not say — and use its exemptions, which are usually the film's best protection.
- **Citations are machine-checked and range-aware** against that concept's own digest evidence. An off-by-one
  range fails the build. Only cite lines you have read and verified carry the claim you attach to them.

## Writing mechanics

Keep `id`, `record_type`, `group_id`, `created_at`, `created_by`, `schema_version` and the concepts in
`concept_links`. Bump `version`. Set `updated_at` to today and `updated_by` to "claude". Reset `review` to
pending with a full-paragraph note. `selection.recommendation` stays "keep". No `confirmation` key.
`suggested_location` carries name, region (district named early), coordinates, why_here, what_to_film, access,
best_time, images, sources, research_note, and a `historical_thread` block (story / how_it_binds /
what_is_certain / what_is_disputed / sources). 5–8 beats, each with BOTH `on_screen` and `voice`. You may
change the title; keep the old one in `aliases`.

Images: Wikimedia Commons search API (generator=search&gsrnamespace=6) with a DESCRIPTIVE user agent — a bare
"Mozilla/5.0" returns HTTP 429. Confirm every file with action=query&titles=File:…&prop=imageinfo before
writing its URL, as Special:FilePath/<FILE>. NEVER write an unconfirmed URL. An empty array is an honest
answer — explain it in research_note. If you carry an image that is not the site, caption it in capitals
saying so, and never substitute another site's material.

Write with Python: json.dumps(obj, indent=2, ensure_ascii=False) + "\n" — Pali diacritics must survive.

NEVER: git add, git commit, or touch content/, app source, or any other idea file.

## If nothing passes

Do not write a weak record to fill the slot, and do not pad a thin location. Report the refusal with its
reasons and propose either reopening the slot or relaxing the district rule for a genuinely first-rate story.
A recorded refusal is a result. Writing something you do not believe in is not.

## Report, in your final message

- The location, its district and where that district's count moves to.
- What you CORRECTED in your sources, and what the source actually said. Be specific; this is the most useful
  part of your report.
- Which digest lines you cited and what each one carries.
- How your treatment differs from every other film in its group and from the slate's nearest archetypes.
- The images you confirmed, or why there are none.
- The check-data result.
- What is still weak, what you could not verify, and the strongest objection to the film. Do not sell it.
```
