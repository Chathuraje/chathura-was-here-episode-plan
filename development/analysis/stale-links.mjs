import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Finds cross-references between ideas that have gone stale.
 *
 * When an idea is rewritten onto a new location — or merged into a sibling and its record
 * repurposed — every OTHER idea that points at it keeps a `connections` note describing the film
 * it used to be. Nothing in check-data.mjs can catch that, because the reference still resolves
 * and the prose still reads correctly. It has to be found by comparing dates and read by a person.
 *
 * KNOWN LIMITATION. The staleness test is date-based: it suspects a note whose target was updated
 * after the referring idea was. That conflates "the film changed" with "the metadata was tidied", so
 * a housekeeping edit to the target produces false positives on every idea pointing at it — which is
 * exactly what the 2026-09-25 clearing of legacy merge fields did. Read the notes; do not trust the
 * count. If you make a metadata-only edit, consider leaving updated_at alone so this stays useful.
 *
 * Run: node development/analysis/stale-links.mjs
 * Exit status is always 0; this reports, it does not gate.
 */

const analysisDir = path.dirname(fileURLToPath(import.meta.url));
const developmentDir = path.dirname(analysisDir);

const ideas = fs.readdirSync(path.join(developmentDir, "ideas"))
  .filter((name) => name.endsWith(".json")).sort()
  .map((name) => JSON.parse(fs.readFileSync(path.join(developmentDir, "ideas", name), "utf8")));
const byId = new Map(ideas.map((idea) => [idea.id, idea]));

const dangling = [];
const suspect = [];
const oneWayMerges = [];

for (const idea of ideas) {
  for (const link of idea.connections ?? []) {
    const target = byId.get(link.idea_id);
    if (!target) {
      dangling.push(`${idea.id} -> ${link.idea_id} (no such idea)`);
      continue;
    }
    // The referring note was written before the target was last rewritten, so it may well
    // describe a film the target no longer is.
    if (target.updated_at > (idea.updated_at ?? "")) {
      suspect.push(`${idea.id} (${idea.updated_at}) -> ${link.idea_id} (${target.updated_at})`
        + `  "${(link.note ?? "").slice(0, 80)}${(link.note ?? "").length > 80 ? "…" : ""}"`);
    }
  }
  // A merge should be recorded at both ends.
  for (const absorbed of idea.selection?.merged_with ?? []) {
    const target = byId.get(absorbed);
    if (!target) {
      dangling.push(`${idea.id} merged_with ${absorbed} (no such idea)`);
      continue;
    }
    const pointsBack = (target.connections ?? []).some((link) => link.idea_id === idea.id);
    if (!pointsBack) oneWayMerges.push(`${idea.id} merged_with ${absorbed}, but ${absorbed} does not reference ${idea.id}`);
  }
}

const section = (title, rows) => {
  console.log(`\n${title}: ${rows.length}`);
  for (const row of rows) console.log(`  ${row}`);
};

section("Dangling references", dangling);
section("Possibly stale notes (target rewritten after the referrer)", suspect);
section("One-way merges", oneWayMerges);
console.log(`\nRead the suspect notes before trusting them — a metadata-only edit to a target flags\nevery referrer without any film having changed. ${ideas.length} ideas checked.`);
