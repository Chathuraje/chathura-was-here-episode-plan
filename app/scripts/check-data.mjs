#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const app = path.resolve(import.meta.dirname, "..");
const content = path.resolve(process.env.CONTENT_DIR ?? path.join(app, "..", "content"));
const allowed = new Set(["01-sources", "02-concepts"]);
let failures = 0;

function check(name, okay, detail = "") {
  console.log(`${okay ? "PASS" : "FAIL"}  ${name}${detail ? ` - ${detail}` : ""}`);
  if (!okay) failures++;
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const rootEntries = fs.readdirSync(content, { withFileTypes: true });
const rootDirectories = rootEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
const rootFiles = rootEntries.filter((entry) => entry.isFile()).map((entry) => entry.name);
check("Content root contains exactly two directories", rootDirectories.length === 2 && rootDirectories.every((name) => allowed.has(name)), rootDirectories.join(", "));
check("Content root has no loose files", rootFiles.length === 0, rootFiles.join(", "));

const sourceDir = path.join(content, "01-sources");
const conceptDir = path.join(content, "02-concepts");
const sourceMarkdown = walk(sourceDir).filter((file) => file.endsWith(".md"));
const conceptFolders = walk(conceptDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => path.dirname(path.dirname(file)));
const uniqueConceptFolders = new Set(conceptFolders);

check("Source documents are present", sourceMarkdown.length > 0, `${sourceMarkdown.length} Markdown files`);
check("Concepts are present", uniqueConceptFolders.size > 0, `${uniqueConceptFolders.size} concept folders`);
check("Every concept has supporting Markdown", [...uniqueConceptFolders].every((folder) => walk(path.join(folder, "sources")).some((file) => file.endsWith(".md"))));

// Development layer (draft mode): groups, objects, framing films.
const development = path.resolve(content, "..", "development");
if (fs.existsSync(development)) {
  const readJson = (dir) => {
    const abs = path.join(development, dir);
    if (!fs.existsSync(abs)) return [];
    return fs.readdirSync(abs).filter((name) => name.endsWith(".json")).map((name) => ({ name, ...JSON.parse(fs.readFileSync(path.join(abs, name), "utf8")) }));
  };
  const conceptIds = new Set([...uniqueConceptFolders].map((folder) => {
    const num = path.basename(folder).normalize("NFC").match(/^Concept\s+(\d+)/)?.[1];
    return num ? `C${num.padStart(3, "0")}` : null;
  }).filter(Boolean));
  const groups = readJson("groups");
  const objects = readJson("objects");
  const framing = readJson("framing");

  check("Group IDs match file names", groups.every((group) => /^GRP-\d{2}$/.test(group.id) && group.name === `${group.id}.json`));
  const positions = groups.map((group) => group.chronological_position);
  check("Group chronological positions are unique", new Set(positions).size === positions.length);
  check("At most ten chronological groups", groups.length <= 10, `${groups.length} groups`);
  check("Every group has at least one draft film", groups.every((group) => Number.isInteger(group.draft_film_count) && group.draft_film_count >= 1));

  const placed = groups.flatMap((group) => group.concepts.map((concept) => concept.id));
  const unknownConcepts = placed.filter((id) => !conceptIds.has(id));
  const duplicates = placed.filter((id, index) => placed.indexOf(id) !== index);
  check("Group concepts exist in the library", unknownConcepts.length === 0, unknownConcepts.join(", "));
  check("Each concept is placed in at most one group", duplicates.length === 0, duplicates.join(", "));

  if (groups.length === 10) {
    const missing = [...conceptIds].filter((id) => !placed.includes(id));
    const films = groups.reduce((total, group) => total + group.draft_film_count, 0);
    check("All concepts are placed in the ten groups", missing.length === 0, missing.length ? missing.join(", ") : `${placed.length} concepts`);
    check("Draft film counts total 98 (Episodes 2-99)", films === 98, `${films} films`);
  }

  check("Each group's object exists and points back to it", groups.every((group) => objects.some((object) => object.id === group.object_id && object.group_id === group.id)));
  check("Object identities are not invented", objects.every((object) => object.identity === null || object.identity_decision_id), "identity requires a Chathura decision");

  const framingIds = framing.map((episode) => episode.id).sort().join(",");
  check("Framing films EP-001 and EP-100 are present", framingIds === "EP-001,EP-100", framingIds);
  check("Framing films are excluded from screenplay generation", framing.every((episode) => episode.generated_by_screenplay_system === false));

  const digests = readJson("digests");
  const groupOf = new Map(groups.flatMap((group) => group.concepts.map((concept) => [concept.id, group.id])));
  check("Digest files are named after their concept", digests.every((digest) => digest.name === `${digest.concept_id}.json` && digest.id === `DIG-${digest.concept_id}`));
  check("Digests belong to the concept's group", digests.every((digest) => groupOf.get(digest.concept_id) === digest.group_id), digests.filter((digest) => groupOf.get(digest.concept_id) !== digest.group_id).map((digest) => digest.id).join(", "));
  const citation = /\b(C\d{3}-[A-Z0-9]+):L\d+/g;
  const badRefs = digests.flatMap((digest) => {
    const refs = new Set(digest.sources_read.map((source) => source.ref));
    const text = digest.sinhala_explanation.map((section) => section.text).join(" ");
    return [...text.matchAll(citation)].map((match) => match[1]).filter((ref) => !refs.has(ref)).map((ref) => `${digest.id}:${ref}`);
  });
  check("Digest citations point to sources that were read", badRefs.length === 0, [...new Set(badRefs)].join(", "));

  const ideas = readJson("ideas");
  const ideaIds = new Set(ideas.map((idea) => idea.id));
  check("Idea IDs match file names", ideas.every((idea) => /^IDEA-\d{4}$/.test(idea.id) && idea.name === `${idea.id}.json`));
  check("Ideas point to existing groups and concepts", ideas.every((idea) => groups.some((group) => group.id === idea.group_id) && idea.concept_links.every((link) => conceptIds.has(link.concept_id))));
  check("Idea connections resolve", ideas.every((idea) => idea.connections.every((connection) => ideaIds.has(connection.idea_id))));
  check("Location suggestions are never selections", ideas.every((idea) => idea.location.suggestions.every((suggestion) => suggestion.status === "ai_suggestion") && (idea.location.selected_location_id === null || idea.location.selected_location_decision_id)));

  const episodes = readJson("episodes").sort((a, b) => a.chronology.global_position - b.chronology.global_position);
  if (episodes.length) {
    const places = new Set(readJson("locations").map((place) => place.id));
    const decisions = readJson("decisions");
    const chathuraDecisions = new Set(decisions.filter((decision) => decision.reviewer_role === "chathura").map((decision) => decision.id));
    check("Episode IDs match file names", episodes.every((episode) => /^EPD-\d{4}$/.test(episode.id) && episode.name === `${episode.id}.json`));
    check("Episode global positions run 1..n without gaps", episodes.every((episode, index) => episode.chronology.global_position === index + 1));
    check("Episodes reference existing ideas", episodes.every((episode) => episode.idea_ids.length && episode.idea_ids.every((id) => ideaIds.has(id))));
    const usedIdeas = episodes.flatMap((episode) => episode.idea_ids);
    check("Each idea is used by at most one episode", new Set(usedIdeas).size === usedIdeas.length);
    check("Episodes stay inside their group's block", groups.every((group) => {
      const positions = episodes.filter((episode) => episode.chronology.group_id === group.id).map((episode) => episode.chronology.global_position);
      return positions.length === 0 || Math.max(...positions) - Math.min(...positions) + 1 === positions.length;
    }));
    check("Each group's first film acquires its object, and no other film does", groups.every((group) => {
      const own = episodes.filter((episode) => episode.chronology.group_id === group.id);
      return own.length === 0 || (own[0].object.acquires === group.object_id && own.slice(1).every((episode) => !episode.object.acquires));
    }));
    check("Objects only appear after they are acquired", episodes.every((episode) => episode.object.appears.every((objectId) => {
      const source = episodes.find((other) => other.object.acquires === objectId);
      return source && source.chronology.global_position <= episode.chronology.global_position;
    })));
    check("Selected episode locations come from Chathura's decisions", episodes.every((episode) => !episode.location.selected_location_id
      || (places.has(episode.location.selected_location_id) && chathuraDecisions.has(episode.location.selected_location_decision_id))));
    const last = episodes.at(-1);
    check("The last chronological film is pinned as Episode 99", last.release.public_number === 99);
    if (groups.length === 10 && episodes.length === 98) {
      check("Finalised slate: group sizes match their film counts", groups.every((group) => episodes.filter((episode) => episode.chronology.group_id === group.id).length === group.draft_film_count));
    }
  }

  const allRecords = fs.readdirSync(development, { withFileTypes: true }).filter((entry) => entry.isDirectory()).flatMap((entry) => readJson(entry.name));
  const unauthorisedLocations = allRecords.filter((record) => record.selected_location_id && !record.selected_location_decision_id);
  check("Selected locations carry a Chathura decision", unauthorisedLocations.length === 0, unauthorisedLocations.map((record) => record.id).join(", "));
}

console.log(failures ? `\n${failures} check(s) failed.` : "\nAll checks passed.");
process.exit(failures ? 1 : 0);
