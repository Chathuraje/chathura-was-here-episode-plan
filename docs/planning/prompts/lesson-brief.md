# Lesson brief: "What the viewer learns"

For each chronological group and each of its episodes, write what a viewer comes to understand, grounded in the Abhidhamma source texts but expressed in simple human terms.

## Read first
- Your group record: `development/groups/<GRP>.json` (emotional stage, question, depth).
- The group's episodes: `development/episodes/EPD-*.json` where `chronology.group_id` is your group. Read `title`, `logline`, `idea_ids`, `concept_ids`, `thread_in` and `thread_out`.
- Every idea in each episode's `idea_ids`: `development/ideas/<IDEA-ID>.json`. Read every linked idea's question, premise, concept links, observability, risks, revision/drop conditions, unknowns, location context, connections, and evidence boundary. No attached idea may silently disappear.
- Every concept digest those episodes link to: `development/digests/<CID>.json`. Read `summary_en`, `human_interpretation_en`, `key_terms`, `does_not_transfer`, `uncertainties` and the cited Sinhala sections.
- The previous group's `lesson`, if one exists, so your group lesson can say how it builds on it.

## Rules
- **Grounded.** Every teaching statement must come from a digest's `summary_en`, `sinhala_explanation` or `key_terms`. Copy one to three exact citations (for example `C084-M:L7`) from the digest into `sources`. Do not add Abhidhamma claims that the digests do not contain.
- **Never teach an uncertain point.** If a digest's `uncertainties` flags a claim (a contradiction, a misprint, or a sensitive claim about disability, gender, caste or status), leave it out of the lesson.
- **Simple.** `in_simple_terms` is written so a curious 15-year-old understands it: no jargon and no Pāli, one or two sentences.
- **Humble.** Write "the texts describe…" or "the Abhidhamma teaches…", never "science proves…" or "this means you must…". Do not promise enlightenment or change.
- **Not a lecture.** `how_the_film_shows_it` explains how the lesson emerges from what is observed (people, process, sound, a turn in the story). Narration never states the lesson outright.
- **Sinhala.** `in_simple_terms_si` is one clear, natural Sinhala sentence carrying the same meaning, in everyday language. It may use one familiar Buddhist term.
- Use they/them for any hypothetical person. Never name real people.

## Episode field (add `lesson` to each episode JSON; change no other field)
```json
"lesson": {
  "in_simple_terms": "One or two plain English sentences: what the viewer walks away understanding.",
  "in_simple_terms_si": "එකම අදහස සරල සිංහලෙන් එක් වාක්‍යයකින්.",
  "the_teaching": "Two to four sentences: what the Abhidhamma texts actually teach behind it, in plain English, naming the concept(s).",
  "how_the_film_shows_it": "Two or three sentences: the moments in this film where the viewer can notice it for themselves.",
  "key_terms": [{ "pali": "paññatti", "si": "ප්‍රඥප්තිය", "en": "concept, conventional name" }],
  "sources": [{ "concept_id": "C084", "citations": ["C084-M:L7", "C084-P:L25"] }],
  "caution": "One sentence: what this does NOT mean (drawn from does_not_transfer).",
  "builds_on": "One sentence on how this lesson builds on the previous film's lesson (for the first film of a group, the previous group's).",
  "status": "draft",
  "evidence_class": "editorial interpretation grounded in cited source teaching"
}
```
- `key_terms`: one to four terms taken from the digests.
- `sources[].concept_id` must be one of the episode's `concept_ids`.

## Group field (add `lesson` to the group JSON; change no other field)
```json
"lesson": {
  "in_simple_terms": "Two or three plain sentences: what this whole stage of the journey teaches.",
  "in_simple_terms_si": "සිංහලෙන් වාක්‍ය එකක් හෝ දෙකක්.",
  "the_teaching": "Three to five sentences: the Abhidhamma teaching this group unfolds, in plain English.",
  "progression": ["One line per film in order: 'EPD-00xx <title>: <the step this film adds>'"],
  "builds_on": "How this group's lesson grows from the previous group's (for GRP-01: how it opens the series).",
  "hands_to_next": "What question it leaves for the next group.",
  "sources": [{ "concept_id": "C084", "citations": ["C084-M:L7"] }],
  "status": "draft",
  "evidence_class": "editorial interpretation grounded in cited source teaching"
}
```

## How to write
- Load, modify and save the JSON with a Python script (`json.load`, then add the `lesson` key, then `json.dump(..., ensure_ascii=False, indent=2)` plus a trailing newline), so no other field changes.
- Never modify `content/`. Never commit. Touch only your group's files.
- A substantial lesson addition increments the record `version` once and updates `updated_at` and `updated_by` truthfully.
- Group `sources` must use exact citations already present in the relevant concept digests; never fabricate a citation.
- When done, run `cd app && npm run check` from the repository root and fix any failure caused by your changes.
- Report in under 150 words: the group's `in_simple_terms`, and any film where the lesson was hard to ground.
