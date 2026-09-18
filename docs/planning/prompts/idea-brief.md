# Candidate idea brief (Step 3, Chathura Was Here)

You write candidate film ideas for one chronological group of *Chathura Was Here*, a cinematic documentary series of 100 films, mainly in Sri Lanka.

## Read first
1. Project rules: `/Volumes/chathura-pc/chathura-was-here-notes/docs/planning/02-project-rules.md`
2. The channel reference: `/Volumes/chathura-pc/chathura-was-here-notes/docs/planning/references/channel-details-2026-09-18.md`
3. Your group record: `development/groups/<GRP>.json`. Its emotional stage, question, journey, surface/depth, arc and hand-off are the frame for every idea.
4. Every concept digest for your group: `development/digests/<CID>.json`. Read `summary_en`, `human_interpretation_en`, `does_not_transfer`, `story_seeds`, `uncertainties` and the Sinhala sections.
5. The exemplar ideas from Group 1: `development/ideas/IDEA-0001.json`, `IDEA-0002.json` and `IDEA-0012.json`. Match their schema **exactly** and match their quality.
6. To avoid duplicating another group's idea, skim the titles and loglines of all existing `development/ideas/*.json`.

## What a good idea is
- **Story → Place → Experience.** A real human situation with its own stake, in a place with texture, giving the viewer an experience. It must be worth watching even if no Buddhist term is ever spoken.
- It follows Chathura's **outward-looking** point of view. He meets people, places and journeys; he is not the subject of a confession.
- The concept sits **underneath**. Never make people illustrate doctrine; never stage events.
- A camera can genuinely be there: a process, a season, a journey, a practice, a community event.
- Each idea within a group feels different in place, tone and scale (intimate vs. epic, coast vs. hills, city vs. village).
- Spread settings across Sri Lanka (north, east, south, west, hill country, dry zone, coast, cities). Releases are packaged by location later, so geographic variety matters.

## Hard rules
- Write only the files named in your job. Never modify `content/`. Never commit.
- Use exactly the IDs you are given, in order, with no gaps before the last one you use.
- `group_id` is your group. `status` is `"draft"`, `version` 1, dates `"2026-09-18"`, created_by/updated_by `"claude"`.
- **Locations:** `selected_location_id` and `selected_location_decision_id` are always `null`, `selection_status` is `"awaiting_chathura"`, and `name_reveal_policy` is `"undecided"`. Give 0–2 `suggestions` per idea, each with `"status": "ai_suggestion"`. Only suggest well-known real places you are confident exist, and use a region-level suggestion when unsure. Put anything uncertain in `verify`. Never invent facts about places. Never name real private people.
- Every concept in your group must be linked by at least one idea, as `primary` or `supporting`. Technical or enumerative concepts can be supporting. You may also link concepts from other groups as `supporting` when it is genuinely meaningful.
- `position_hint` must say whether the idea is an **opening candidate** (the group's first film, where the group's Object N is acquired, only if a real moment allows), a **closing candidate** (hands off to the next group's emotional stage), or **middle**. Give at least 2 opening candidates and 2 closing candidates.
- `connections` link to other ideas in your group by ID (pairs with, mirrors, leads into, alternative to). Every idea needs at least one.
- `unknowns` always includes: "No participant, access or event has been found or confirmed. Everything above is a research direction."
- `evidence_class_note`: "All content is editorial proposal. Location suggestions are AI suggestions only; selection belongs to Chathura."
- `source_doc` is `null` unless you import a pilot idea.
- Use they/them for any hypothetical person.

## Finish
Validate every file with `python3 -c "import json,sys;[json.load(open(f)) for f in sys.argv[1:]]" <files>`. Then report in under 200 words: the IDs you wrote with titles, and which ideas you rank as the best opening and the best closing.
