# Screenplay brief (Step 8, Chathura Was Here)

Use this with an **episode brief** (dashboard: *Copy episode brief*, or `GET /api/episodes/EPD-xxxx?format=md`). It covers Episodes 2–99 only. Episodes 1 and 100 are framing films and are never generated.

## Gate — check before writing anything

1. The episode brief must show a **Selected location chosen by Chathura** (section 4). If it says "awaiting Chathura's choice", stop: write nothing and say that the location is needed.
2. Write the stages in order and never skip one: **treatment → scene outline → production screenplay**. Each stage builds on the latest version of the previous stage, and Chathura should review each before the next.
3. A post-filming version is written only from captured footage, transcripts and field notes. Never write one from imagination.

## Non-negotiables

- **Story → Place → Experience.** The film is Chathura's outward-looking experience of real people and a real place. The Abhidhamma concepts stay underneath, and the film must work if no Buddhist term is ever spoken.
- **Never invent** participants, names, dialogue, events, access, permissions, or facts about the place. Where a real person would speak, write a placeholder: `[REAL SPEECH: what we hope to learn from them — to be replaced by recorded speech or cut]`. Where a fact is unverified, write `[VERIFY: …]`.
- **Narration** is English, written in Chathura's first-person voice. It stays sparse and observational: questions and noticing, never lectures or doctrine. Mark every line as draft: `VO (draft):`. Target about 2:00–3:00 of narration inside a 6–8 minute film. Natural sound is the default.
- **Cold open.** Begin inside the story with footage and early VO. Reveal the season/episode, coordinates and title over moving footage only after curiosity develops, in this order: `Season N — Episode N` (leave the numbers as `[RELEASE NUMBER]` until the release plan assigns them), coordinates as `[COORDINATES — from Chathura's location]`, then the title. Follow the episode's **name reveal policy**: if it is `never` or `undecided`, do not display or say the place name.
- **Ending.** End on observation, not a moral. The last frames are followed by "A Film by Chathura" and then the project logo.
- **Objects.** If the brief says this film acquires an object, the acquisition must come from a real moment and can never be staged. Write it as `[OBJECT N — acquired only if a real moment allows; identity chosen by Chathura]`. If the object only appears, keep it subtle and unexplained. Visibility never proves ownership.
- **Continuity threads.** Honour the "thread coming in" and "thread going out" from section 2b, but only through image, sound or question, never exposition.
- **Episode 99 only** (the last film in story time): end on the crowded-location footage shared with Episodes 1 and 100. Describe it as the planned shared shot. Do not invent what happens in the crowd.
- Respect every item in the brief's *Risks*, *Drop or revise if*, *Does not transfer* and *Source uncertainties*. Never put a flagged uncertain doctrinal claim into narration.

## Stage 1: treatment

About 700–1,200 words of prose, written in present tense:

- the story question and why it matters to the people in it;
- how the film opens, turns and ends (give alternatives where reality is unknown);
- the observation strategy: what the camera waits for, and from where;
- the narration approach and its voice;
- the sound world;
- what must be researched and verified before filming;
- ethical and consent notes.

## Stage 2: scene outline

Write 8–16 scenes. Each scene has: its purpose, what must be filmed, the sound, the narration intent (not full lines), an estimated duration in seconds, research gaps, and continuity or object notes. Mark each scene as **required** or **optional**. The durations must add up to 6–8 minutes, or else explain why the story needs a different length.

## Stage 3: production screenplay

This is the full shooting screenplay. Each scene has:
- a heading;
- a short action description of what we see;
- sound;
- the `VO (draft):` lines;
- `[REAL SPEECH: …]` placeholders;
- an estimated duration;
- research gaps;
- continuity notes.

It also includes:
- the reveal cards (season/episode, coordinates, title) placed on the scene where they appear;
- the closing card "A Film by Chathura" and then the logo.

## Output record

Save one JSON file per version as `development/screenplays/SPV-NNNN.json`. `NNNN` is the next free number, and IDs are never reused. Do not commit.

```json
{
  "schema_version": 1,
  "id": "SPV-0001",
  "record_type": "screenplay_version",
  "episode_id": "EPD-0001",
  "title": "<episode title>",
  "stage": "treatment | scene_outline | production",
  "version": 1,
  "status": "draft",
  "based_on": null,
  "location_id": "<the episode's selected_location_id at time of writing>",
  "created_at": "YYYY-MM-DD",
  "updated_at": "YYYY-MM-DD",
  "created_by": "claude",
  "updated_by": "claude",
  "guide": {
    "genre": "Cinematic documentary",
    "runtime": { "range": "6–8 minutes", "editorial_target": "~7 minutes", "narration_target": "~2:00–2:45" },
    "narrative_function": "<one or two sentences>",
    "visual_approach": ["..."],
    "sound_approach": ["..."],
    "information_reveal": { "method": "...", "order": ["Season [N] — Episode [RELEASE NUMBER]", "[COORDINATES]", "<title>"], "location_name_policy": "<from the reveal policy>" },
    "editorial_priorities": ["..."],
    "continuity_hooks": ["..."],
    "evidence_boundary": "Planned material only. Not evidence of captured footage, speech, permissions or events."
  },
  "scenes": [
    {
      "n": 1,
      "heading": "...",
      "required": true,
      "purpose": "...",
      "footage": ["..."],
      "sound": "...",
      "narration": "VO (draft): ... (production stage) | intent only (outline stage)",
      "real_speech_placeholders": ["[REAL SPEECH: ...]"],
      "estimated_seconds": 40,
      "research_gaps": ["..."],
      "continuity": "..."
    }
  ],
  "body_markdown": "<the treatment prose, or the full readable outline or screenplay>",
  "unknowns": ["..."]
}
```

- For a treatment, `scenes` is `[]`.
- `based_on` holds the ID of the version this one builds on: `null` for a first treatment, the treatment's ID for an outline, and the outline's ID for a production screenplay.
- After writing, run `cd app && node scripts/check-data.mjs`. It checks that the location gate and the stage order are respected.
