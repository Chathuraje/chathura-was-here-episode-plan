# File-backed data model proposal

Status: proposal only. Nothing in this document is implemented by the current dashboard.

## Design goals

- Preserve `content/01-sources/` and `content/02-concepts/` unchanged as the source library.
- Add structured, reviewable files that the existing Node/Next.js app could later load with `fs/promises` and native JSON parsing.
- Avoid adding a third directory under `content/` because `app/scripts/check-data.mjs` currently requires exactly the two existing directories.
- Make provenance, approvals, unknowns, and separate evidence classes explicit.
- Keep internal identity independent of chronology, release order, seasons, and filming schedules.
- Represent many-to-many relationships directly instead of encoding them in filenames.

## Proposed repository layout

```text
development/
  schema-version.json
  sources/*.json
  concepts/*.json
  interpretations/*.json
  ideas/*.json
  groups/*.json
  episodes/*.json
  locations/*.json
  objects/*.json
  connections/*.json
  shared-scenes/*.json
  scene-appearances/*.json
  chronology-relations/*.json
  release-series/*.json
  screenplay-versions/*.json
  review-decisions/*.json
  evidence/*.json
  exports/                 # generated, reviewable exports; policy to be decided
```

Episodes 1 and 100 should live in `development/episodes/` with `record_role: "continuity_reference"`. The 98 development films use `record_role: "development_episode"`. This keeps their schemas interoperable without putting framing films into the 98-film allocation pool.

## Common record envelope

Every JSON record should include:

| Field | Purpose |
|---|---|
| `schema_version` | Allows controlled migrations |
| `id` | Stable, opaque identity; never derived from position |
| `record_type` | Entity discriminator |
| `title` | Human label; editable without changing `id` |
| `status` | `draft`, `in_review`, `approved`, `needs_revision`, `on_hold`, or `retired` |
| `created_at`, `updated_at` | ISO dates |
| `created_by`, `updated_by` | Attribution |
| `version` | Monotonic record version |
| `supersedes_id` | Optional explicit replacement link |
| `provenance` | Source paths, page/line spans, evidence IDs, and derivation notes |
| `unknowns` | Questions that must not be silently filled |
| `review_decision_ids` | Links to immutable review records |

Suggested ID namespaces:

- existing concepts: `C001`–`C102`
- sources: `SRC-0001`
- interpretations: `INT-0001`
- ideas: `IDEA-0001`
- chronological groups: `GRP-01`–`GRP-10`
- development episodes: `EPD-0001`
- framing continuity records: `EP-001`, `EP-100`
- locations: `LOC-0001`
- objects: `OBJ-01`–`OBJ-10`
- connections: `CONN-0001`
- shared scenes: `SHR-0001`
- scene appearances: `APP-0001`
- chronology relations: `CHR-0001`
- release series/seasons: `SER-0001`
- screenplay versions: `SPV-0001`
- evidence: `EVD-0001`
- review decisions: `REV-0001`

The numeric suffix is an allocation sequence only; it conveys no chronology or release position.

## Entity model

### Sources

`source` records point to immutable repository files and identify work, volume, author/editor if known, language, format, checksum, and archival status. They may refer to a full source transcription, source map, scan, or extraction guide. An extract citation records exact repository path plus page/line markers; it does not duplicate or rewrite the original passage by default.

### Concepts

`concept` records preserve `Cnnn`, current chapter, title, folder path, source citations, and coverage/audit state. `source_ids` and citations are arrays. Concept-to-episode relationships are not stored as a single episode field; they are expressed through idea/connection records so both sides can be many-to-many.

### Interpretations

Each interpretation links to one or more concepts and declares `interpretation_kind`:

- `source_explanation_si` — clear Sinhala, retaining Buddhist terms;
- `human_interpretation_en` — simple English without Buddhist jargon.

Fields include text, source-citation IDs, uncertainty notes, author/editor, status, and version. These records are editorial work, never source text.

### Ideas

An idea has a stable ID, working title, human question, story premise, `concept_ids`, `interpretation_ids`, documentary possibility, people/relationship needs, location requirements, suggested location IDs, selected location ID (nullable), research/evidence links, risks, unknowns, and review status. It has no permanent episode number.

The four truth classes should remain in separate fields or linked records:

1. `source_teaching_citations`
2. `editorial_interpretation_ids`
3. `documentary_possibility`
4. `verified_evidence_ids`

### Chronological groups

Finalized-slate mode requires exactly ten group records using stable IDs `GRP-01`–`GRP-10`. Each contains its arc, connection logic, ordered `episode_ids`, and assigned `object_id`. Draft/pilot mode may contain a partial set with unassigned episodes. A finalized-slate validator checks that every development episode appears once in group membership and that the ten group sizes total 98. No per-group maximum is encoded.

### Episodes

An episode record includes stable ID, role, working title, idea IDs, concept IDs (derived or explicitly confirmed), group ID, lifecycle status, and independent placement fields:

```json
{
  "chronology": { "group_id": "GRP-01", "position_in_group": null, "global_key": null },
  "release": { "series_id": null, "season_id": null, "position": null, "public_number": null },
  "filming": { "block_id": null, "position": null, "target_window": null }
}
```

`public_number` remains null during initial development. A release assignment never changes the episode ID or chronological key.

### Locations

Location records separate requirements, suggestions, and selection:

- idea/episode `location_requirements` describe what the story needs;
- `suggested_location_ids` may be populated by research or AI;
- `selected_location_id` is nullable and may be changed only by a recorded Chathura review decision;
- `selection_status` records `not_required`, `needed`, `awaiting_chathura`, or `selected`;
- `name_reveal_policy` records `early`, `later`, `never`, or `undecided`;
- research, access, permission, safety, participant, and logistics evidence remain linked separately.

No automation may copy a suggestion into `selected_location_id`.

### Objects and object events

Create `OBJ-01`–`OBJ-10`, each assigned to exactly one chronological group. Keep identity, image, and acquisition details nullable. Use an append-only event ledger:

- `planned_acquisition` for the group’s first chronological episode;
- `verified_acquisition` only after a real event/evidence supports it;
- `appearance`, `transfer`, `loss`, or other real change with evidence and chronology.

Store `planned_ownership_state` separately from `verified_ownership_state`. The current intended chronology says all ten objects are already acquired by Episode 1, while the verified acquisition records remain unknown until evidence is supplied. Verified ownership is derived from verified events; planned ownership is derived from approved continuity requirements. Neither state is derived from whether an object is visible in frame. Shot visibility is a separate scene-appearance fact. Ordinary shots need not display every owned object, but the Episode 100 room reveal has an explicit planned-visibility requirement: all ten objects together in one frame before packing. Model that exception as creative intent on the relevant scene appearance, not as verified footage or acquisition evidence. Earlier objects may appear in later groups.

### Connections

Connection records make relationships explicit: concept↔concept, idea↔concept, episode↔episode, group↔group, object↔episode, or another typed pair. Fields include relationship type, rationale, direction, strength/status, provenance, and review decision. This supports many-to-many links without bloating entity records.

### Shared scenes

A shared-scene record represents stable scene/event identity only: what the intended event is, its stable ID, planning status, verified-event status, and evidence/footage references when they exist. It must not derive its identity or sort order from an episode number or label such as `100A.crowd`.

A separate chronology-relation record places stable scenes/events relative to one another using relationships such as `before`, `after`, `same_event_as`, or a verified timestamp when available. Planned chronology and evidence-backed chronology are separate fields. Episode-derived labels may be human aliases, but they never determine chronological sorting.

A separate scene-appearance record represents each use of the shared scene in an episode. It links one stable `shared_scene_id` to one `container_episode_id` and carries that appearance’s planned or actual edit boundaries, intended meaning, narration/sound treatment, and evidence status. One shared scene may have any number of appearances across episodes. Unknown footage IDs, timecodes, and edit boundaries stay null; planned relationships are never promoted into verified facts.

### Release series and seasons

A release-series record holds public packaging and ordered episode references. Seasons may be records within or linked to a series. Neither structure owns chronological group membership. The older 99-public/hidden-100 and eight-episode Season 1 alternatives should be policy options with review status, not hard-coded validation rules.

### Screenplay versions

Each screenplay version links to one episode and declares `version_kind` as `production` or `post_filming`. It contains or references ordered scene versions. Required scene fields are purpose, required/captured footage, sound, narration, estimated/actual timing, research gaps, continuity notes, evidence, and chronology.

A post-filming version links to the production version it revises and includes a variance log. It cannot overwrite it.

## Episode-level and scene-level chronology

Episode chronology orders ordinary development films within groups. Scene chronology is a graph of stable scene/event identities and explicit before/after relationships independent of every containing episode. For example:

```text
SHR-0001 (crowded-location event)
  before SHR-0002 (room / packing)
  before SHR-0003 (departure / road journey)
  before SHR-0004 (monastery experience)
  before SHR-0005 (forest disappearance)
  before SHR-0006 (beyond-forest continuation)

APP-0001: SHR-0001 appears in EP-001 with its own cut boundary and meaning
APP-0002: SHR-0001 appears in EP-100 with a different continuation and meaning
APP-0003: SHR-0001 is planned to appear in Episode 99; provisional
```

This allows Episode 100 to contain material on both sides of Episode 1 while public episode numbers remain 1 and 100. Shared footage is referenced by stable shared-scene ID rather than duplicated, and each episode appearance retains its own boundaries and interpretation.

## Validation modes

### Draft/pilot

Allow partial records, nullable assignments, a partial group set, and unassigned chronological, release, or filming positions. Validate:

- schema shape and unique IDs among records that exist;
- every populated reference resolves;
- source and interpretation provenance is present;
- planned claims remain distinct from verified evidence;
- any existing group, object, location, chronology, or release assignment is internally consistent;
- only a Chathura review decision can populate `selected_location_id`.

Do not create placeholder episodes, groups, locations, objects, or assignments to make draft data look complete.

### Finalized slate

Require exactly ten chronological groups containing exactly 98 unique development episodes, with each development episode assigned once, plus the two framing-film records `EP-001` and `EP-100`. Enforce the approved object/group invariants and all required continuity links. Group sizes must total 98, but there is no ten-film maximum. Release and filming structures remain independently validated rather than being inferred from chronology.

## Review decisions and provenance

Review decisions should be immutable records containing reviewer, date, decision, target record/version, note, and any conditions. A location selection requires `decision_type: "location_selection"` and `reviewer_role: "chathura"`. Approvals for concept accuracy, idea development, group placement, release numbering, treatments, and screenplay stages remain distinct.

Evidence records classify observations, interviews/transcripts, documents, footage, location research, permissions, and other real-world support. They record verification state and access/ethical restrictions. Documentary possibilities may cite evidence but never masquerade as it.

## “Copy complete brief” and structured export

A future episode page may offer **Copy complete brief**, generated from approved linked records. It should include:

1. episode identity and all three independent positions (chronological, release, filming);
2. exact source extracts or bounded excerpts with paths and page/line citations;
3. approved Sinhala source explanations and simple-English human interpretations;
4. approved ideas and concept links;
5. Chathura-approved choices, especially selected location and reveal policy;
6. verified research/evidence with confidence and restrictions;
7. group/object state and continuity before, during, and after the episode;
8. shared-scene references and known edit boundaries;
9. explicit unknowns, research gaps, ethical constraints, and forbidden inventions;
10. generation instructions for the requested next artifact and its readiness gate.

The same resolver should produce a machine-readable JSON export with record IDs and versions. The copied text is a generated snapshot, not a new source of truth, and should include generation time plus a manifest of source record versions.

## Future compatibility work (not performed)

Later implementation would require schema validation, ID allocation, development-data loaders, route/UI work, updated validation scripts, dependency tracking, and export tests. The current app has none of these capabilities. This proposal does not authorize or perform those changes.
