# Episode-development planning and implemented foundation

## Current implemented state — 2026-09-19

The repository contains the complete source library, 102 concepts and their digests, ten chronological groups with their story objects, and **137 candidate ideas on the footage-led shape, each proposing its own location for Chathura to confirm or reject**. The earlier episode layer has been removed: `development/episodes/` is empty, so Chronology v1, the object-acquisition points, the continuity threads, the episode lessons and the public numbering 2–99 all await rebuilding from the confirmed ideas. The Abhidhamma depth map still measures that removed slate and is stale until then. Chronology v1 is complete as a draft but is **not creatively approved**; Chathura's GRP-01 → GRP-10 review is the next primary creative phase. No locations, object identities, real participants/access, release order for public numbers 2–98, or screenplay stages are approved by this status summary.

The dated audit and proposal documents below preserve the reasoning and repository state that existed when they were written. Their historical statements do not override this current status.

## Documents

1. [Current-state audit](01-current-state-audit.md) — verified inventory, current dashboard, traceability, gaps, and audit limits.
2. [Project rules](02-project-rules.md) — consolidated current instructions, provisional assumptions, and unresolved decisions.
3. [Development workflow](03-development-workflow.md) — gated path from source audit through post-filming revision.
4. [Data-model proposal](04-data-model-proposal.md) — proposed file-backed records, relationships, chronology, reviews, and exports.
5. [Episode 001/100 continuity](05-episode-001-100-continuity.md) — framing structure with repository evidence separated from brief-supplied requirements.
6. [Master roadmap](06-master-roadmap.md) — the step-by-step plan from the concept library to 98 production screenplays, with the draft 10-category map and dashboard build slices.
7. [Abhidhamma Depth Map](07-abhidhamma-depth-map.md) — concept, mechanism, and group-level viewer-understanding audit for Chronology v1, with a separate non-destructive recommendation layer.
8. [The footage-led slate](08-the-footage-led-slate.md) — the current record of the 137 candidate ideas: what an idea is now, where the slate stands, the standing constraints that come from the concept digests, the full group-by-group table of titles, locations and districts, and what is still not done. The brief that produced it is [prompts/footage-led-idea-brief.md](prompts/footage-led-idea-brief.md).
9. [Concept coverage](09-concept-coverage.md) — which candidates carry which concepts, and which concepts rest on a single idea so that one rejection would remove them from the series. Regenerate with `node development/analysis/concept-coverage.mjs` after any confirmation or rejection.

The ten per-group idea reviews written under the retired human-situation model are kept as provenance in [idea-review/retired-2026-09-21/](idea-review/retired-2026-09-21/), with a README explaining what in them still holds. Their recommendations no longer apply.

Retrieved external-reference planning summaries:

- [Channel Details — 2026-09-18](references/channel-details-2026-09-18.md)
- [The Beginning — 2026-09-18](references/the-beginning-2026-09-18.md)
- [The Way Back — 2026-09-18](references/the-way-back-2026-09-18.md)

These repository files are dated, planning-relevant summaries of external Google Docs. They are not complete document or screenplay exports; the full originals remain external and are not present in the repository.

## Historical snapshot / original Step 2 pilot

The [Pilot 01 review package](pilot-01/README.md) uses the three Chathura-selected concepts C020, C032, and C084 to test only the early pipeline. It contains:

1. explicit concept/source dossiers without changes to existing extracts;
2. a draft Sinhala source explanation for each;
3. a separate draft simple-English human interpretation for each;
4. exactly two unnumbered candidate ideas with evidence classes and unknowns kept separate;
5. location requirements only, with `selected_location_id` left `null`;
6. one complete-brief preview in equivalent Markdown and JSON forms with a validated provenance manifest.

At the time it was created, the package stopped at idea review and did not assign release numbers, build groups, select locations, or write a screenplay. The repository has since implemented groups and the draft chronological slate; the pilot remains useful provenance, not the current project-state summary.

## Decisions still waiting for Chathura

- Approve or revise Chronology v1 across GRP-01 → GRP-10, including any episode revisions arising from that review.
- Select locations and later verify object identities, participants, access, permissions, and documentary facts.
- Approve release series, ten-season membership beyond the locked Season 1 count, and public numbers 2–98.
- Review and approve each treatment and scene outline before the next screenplay stage; approve production screenplays separately.
- Resolve source-specific uncertainties such as C084's “eight” heading with only seven supplied categories before doctrinal publication.

The ordinary public structure is Episodes 1–99 across ten seasons; Season 1 has exactly eight episodes. Episode 100 retains its identity but is hidden/discoverable outside that ordinary structure. The external channel and framing references remain planning evidence rather than verified footage records.

Location selection remains exclusively Chathura’s at every stage.

- [10-standing-creative-decisions.md](10-standing-creative-decisions.md) — Chathura's standing creative decisions, with the reasoning. Read before starting any group.
