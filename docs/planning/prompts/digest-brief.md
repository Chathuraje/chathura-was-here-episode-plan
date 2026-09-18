# Concept digest brief (Step 2, Chathura Was Here)

## Project context

*Chathura Was Here* is a cinematic documentary series (100 films, mainly Sri Lanka). Its governing sequence is Story → Place → Experience. Abhidhamma concepts from a Sinhala source library sit *underneath* real people, places and journeys. Films are never lectures, and real people are never used as props to illustrate doctrine. Your prompt tells you which chronological group the concept belongs to, including that group's emotional stage and human question. Each of the ten groups is one emotional stage of the journey, and the concepts sit underneath it.

A **concept digest** has three jobs:
1. Faithfully explain the source in clear Sinhala, keeping the Buddhist terms. This is the *source teaching* evidence class.
2. Translate its human meaning into simple English without jargon. This is *editorial interpretation*.
3. Offer story seeds: real-world situations where the idea could be *observed*, not lectured. This is also editorial.

## Hard rules

- Read every assigned extract file **completely** (use offset/limit to page through long files). Do not skim.
- Never modify anything under `content/`. Never run git commit. Write only the output file(s) you are told to write.
- Every claim in the Sinhala explanation must carry a citation in the form `[C001-P:L25–L27]`, where `P` = `Abhidhammattha Pradeepika.md`, `P4` = `Abhidhammattha Pradeepika Book 4.md`, and `M` = `Abhidharma Margaya.md`. Line numbers are the physical line numbers in the extract file (as shown by the Read tool).
- Keep the two sources side by side where they differ. Do not merge them into one invented taxonomy. Record the differences in `cross_source_notes`.
- If the text has a gap, an OCR problem, or a numbering mismatch, record it in `uncertainties`. Never fill it in.
- The English interpretation must not use Buddhist jargon (no "dhamma", "citta", "kamma", "paramattha" and so on). Explain in ordinary human terms. Say where the idea does **not** transfer cleanly to a modern slogan (`does_not_transfer`).
- Story seeds describe *kinds* of situations and places in Sri Lanka (for example "a family that has rebuilt the same boat many times"). Do **not** name or choose specific real locations or real people. Location choice belongs to Chathura alone. Seeds must be things a camera could genuinely observe, and must be worth a film even if the doctrine were never mentioned.
- Do not invent facts about any real place or person.

## Output: JSON file (UTF-8, 2-space indent, `ensure_ascii` false)

```json
{
  "schema_version": 1,
  "id": "DIG-C001",
  "record_type": "concept_digest",
  "concept_id": "C001",
  "group_id": "<given in your prompt>",
  "title_si": "<exact Sinhala concept title from the folder name>",
  "title_en": "<short English title>",
  "status": "draft",
  "version": 1,
  "created_at": "2026-09-18",
  "updated_at": "2026-09-18",
  "created_by": "claude",
  "updated_by": "claude",
  "sources_read": [
    { "ref": "C001-P", "path": "content/02-concepts/.../sources/Abhidhammattha Pradeepika.md", "lines": "1-59", "complete": true, "markers": "Book 1, ch. 1, pdf 24–28 / printed 13–17" }
  ],
  "summary_en": "2–4 sentences: what the source actually teaches, plainly stated (source-teaching class, English).",
  "sinhala_explanation": [
    { "heading": "<Sinhala heading>", "text": "<clear Sinhala paragraph(s) with [C001-P:Lx–Ly] citations>" }
  ],
  "key_terms": [
    { "term_si": "ප්‍රඥප්තිය", "pali": "paññatti", "en": "conventional designation / concept", "note": "optional" }
  ],
  "human_interpretation_en": [
    { "heading": "<English heading>", "text": "<plain English, no jargon>" }
  ],
  "does_not_transfer": ["<where a modern slogan would distort the source>"],
  "story_seeds": [
    {
      "seed": "<one-line situation>",
      "what_camera_could_observe": "<concrete, filmable>",
      "why_it_fits": "<the link to the concept, stated honestly>",
      "setting_type": "<kind of place in Sri Lanka, not a named location>",
      "risk": "<how this could become forced or exploitative>"
    }
  ],
  "cross_source_notes": ["<how Pradeepika and Margaya differ or agree>"],
  "uncertainties": ["<gaps, OCR issues, numbering mismatches, doctrinal points needing expert check>"],
  "evidence_class_note": "sinhala_explanation and summary_en = source teaching; human_interpretation_en and story_seeds = editorial interpretation; nothing here is documentary evidence."
}
```

Depth guidance:
- `sinhala_explanation`: 3–6 sections covering the concept's full substance. Be faithful and clear, not a word-for-word copy.
- `key_terms`: 5–15 terms.
- `human_interpretation_en`: 2–4 sections.
- `story_seeds`: 4–6.

When finished, validate the file with `python3 -c "import json;json.load(open(PATH))"` and report back in under 150 words: the file path, how many lines you read of each source, and the most important uncertainty.

## Partial digests (when your prompt says you cover only PART of a concept)

Write only these fields: `sources_read` (your exact line ranges), `summary_en` (your part only), `sinhala_explanation`, `key_terms`, `human_interpretation_en`, `does_not_transfer`, `story_seeds` (3–4), `cross_source_notes`, `uncertainties`. Use real line numbers from the full file. Another step merges the parts.

## Story seed quality bar

A good seed names a situation a camera can actually be present for, carries its own human stake, and would be worth watching even if the doctrine were never mentioned. Avoid seeds that need staging, depend on filming someone's private suffering without clear consent, or require a lecture to make sense.
