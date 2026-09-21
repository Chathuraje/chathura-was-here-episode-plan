#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { citationIsRepresented, citationsInText, digestEvidenceCitations, parseCitation, parseDeclaredLines } from "../src/lib/citation-utils.mjs";
import { resolveBriefSourceIdeas } from "../src/lib/brief-ideas.mjs";

const app = path.resolve(import.meta.dirname, "..");
const content = path.resolve(process.env.CONTENT_DIR ?? path.join(app, "..", "content"));
const allowed = new Set(["01-sources", "02-concepts"]);
const repo = path.resolve(app, "..");
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

function resolveNormalizedRepoPath(requested) {
  if (typeof requested !== "string" || path.isAbsolute(requested)) return null;
  let current = repo;
  for (const segment of requested.split(/[\\/]+/).filter(Boolean)) {
    if (segment === "." || segment === "..") return null;
    const match = fs.readdirSync(current, { withFileTypes: true })
      .find((entry) => entry.name.normalize("NFC") === segment.normalize("NFC"));
    if (!match) return null;
    current = path.join(current, match.name);
  }
  return current.startsWith(repo + path.sep) ? current : null;
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
  check("Exactly ten chronological groups", groups.length === 10, `${groups.length} groups`);
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
  check("Exactly ten story objects", objects.length === 10, `${objects.length} objects`);
  check("Object identities are not invented", objects.every((object) => object.identity === null || object.identity_decision_id), "identity requires a Chathura decision");

  const framingIds = framing.map((episode) => episode.id).sort().join(",");
  check("Framing films EP-001 and EP-100 are present", framingIds === "EP-001,EP-100", framingIds);
  check("Framing films are excluded from screenplay generation", framing.every((episode) => episode.generated_by_screenplay_system === false));
  const episode100 = framing.find((episode) => episode.id === "EP-100");
  check("Episode 100 keeps its number and hidden/discoverable distribution", episode100?.release.public_number === 100
    && episode100.release.distribution_mode === "hidden_discoverable"
    && episode100.release.public_structure === "outside_ordinary_public_1_99");

  const digests = readJson("digests");
  const groupOf = new Map(groups.flatMap((group) => group.concepts.map((concept) => [concept.id, group.id])));
  check("Digest files are named after their concept", digests.every((digest) => digest.name === `${digest.concept_id}.json` && digest.id === `DIG-${digest.concept_id}`));
  check("Digests belong to the concept's group", digests.every((digest) => groupOf.get(digest.concept_id) === digest.group_id), digests.filter((digest) => groupOf.get(digest.concept_id) !== digest.group_id).map((digest) => digest.id).join(", "));
  check("Every concept has a digest", digests.length === conceptIds.size && [...conceptIds].every((id) => digests.some((digest) => digest.concept_id === id)), `${digests.length}/${conceptIds.size} digests`);
  const badRefs = digests.flatMap((digest) => {
    const refs = new Set(digest.sources_read.map((source) => source.ref));
    return digest.sinhala_explanation.flatMap((section) => citationsInText(section.text)).map((citation) => citation.ref)
      .filter((ref) => !refs.has(ref)).map((ref) => `${digest.id}:${ref}`);
  });
  check("Digest citations point to sources that were read", badRefs.length === 0, [...new Set(badRefs)].join(", "));
  const digestByConcept = new Map(digests.map((digest) => [digest.concept_id, digest]));
  const digestEvidence = new Map(digests.map((digest) => [digest.concept_id, digestEvidenceCitations(digest)]));
  const sourceLineCounts = new Map();
  function validateLessonCitation(conceptId, value) {
    const digest = digestByConcept.get(conceptId);
    if (!digest) return "concept digest does not exist";
    const citation = parseCitation(value);
    if (!citation) return "citation syntax is invalid";
    const source = digest.sources_read.find((entry) => entry.ref === citation.ref);
    if (!source) return `${citation.ref} is not in ${digest.id}.sources_read`;
    const declared = parseDeclaredLines(source.lines);
    if (!declared.some((range) => citation.start >= range.start && citation.end <= range.end)) return `range is outside ${source.lines}`;
    const sourcePath = resolveNormalizedRepoPath(source.path);
    if (!sourcePath || !fs.statSync(sourcePath).isFile()) return `source path does not resolve: ${source.path}`;
    if (!sourceLineCounts.has(sourcePath)) sourceLineCounts.set(sourcePath, fs.readFileSync(sourcePath, "utf8").split(/\r?\n/).length);
    if (citation.start < 1 || citation.end < citation.start || citation.end > sourceLineCounts.get(sourcePath)) return `range exceeds source (${sourceLineCounts.get(sourcePath)} lines)`;
    if (!citationIsRepresented(citation, digestEvidence.get(conceptId) ?? [])) return `citation is not represented in ${digest.id} evidence`;
    return null;
  }

  const ideas = readJson("ideas");
  const ideaIds = new Set(ideas.map((idea) => idea.id));
  check("Idea IDs match file names", ideas.every((idea) => /^IDEA-\d{4}$/.test(idea.id) && idea.name === `${idea.id}.json`));
  check("Ideas point to existing groups and concepts", ideas.every((idea) => groups.some((group) => group.id === idea.group_id) && idea.concept_links.every((link) => conceptIds.has(link.concept_id))));
  check("Idea connections resolve", ideas.every((idea) => idea.connections.every((connection) => ideaIds.has(connection.idea_id))));
  check("Ideas carry no scene or shot decisions", ideas.every((idea) => !idea.what_camera_could_observe && !idea.possible_arc && !idea.premise),
    ideas.filter((idea) => idea.what_camera_could_observe || idea.possible_arc || idea.premise).map((idea) => idea.id).join(", "));
  const ideaShape = ["logline", "human_question", "what_the_viewer_could_understand", "what_must_be_real"];
  // The footage-led shape: the place carries the film, and the narration is locked to what is on screen.
  // The legacy human-situation shape is still accepted while the groups migrate across.
  const hasPlaceShape = (idea) => idea.place?.what_kind_of_place && idea.place?.why_it_is_worth_watching
    && idea.place?.what_moves_or_changes && idea.place?.when_it_looks_best
    && idea.two_layers?.without_the_philosophy && idea.two_layers?.with_the_philosophy
    && Array.isArray(idea.sequence) && idea.sequence.length
    && idea.sequence.every((beat) => beat.on_screen?.trim() && beat.voice?.trim());
  const hasLegacyShape = (idea) => idea.situation?.what_happens && idea.situation?.who_is_involved
    && idea.situation?.what_is_at_stake && idea.situation?.how_it_unfolds;
  check("Ideas describe a place or a situation, and a concept merge", ideas.every((idea) => ideaShape.every((field) => typeof idea[field] === "string" && idea[field].trim())
    && (hasPlaceShape(idea) || hasLegacyShape(idea))
    && idea.concept_merge?.why_together && idea.concept_merge?.what_it_reveals),
    ideas.filter((idea) => !(hasPlaceShape(idea) || hasLegacyShape(idea)) || !idea.concept_merge?.why_together).map((idea) => idea.id).join(", "));
  check("Footage-led migration progress", true, `${ideas.filter(hasPlaceShape).length}/${ideas.length} ideas carry the footage-led shape`);
  check("Every narration beat is anchored to something on screen", ideas.every((idea) => (idea.sequence ?? []).every((beat) => beat.on_screen?.trim() && beat.voice?.trim())),
    ideas.filter((idea) => (idea.sequence ?? []).some((beat) => !beat.on_screen?.trim() || !beat.voice?.trim())).map((idea) => idea.id).join(", "));
  check("Narration beats cite only concepts the idea links", ideas.every((idea) => (idea.sequence ?? []).every((beat) => !beat.concept_id
    || idea.concept_links.some((link) => link.concept_id === beat.concept_id))),
    ideas.filter((idea) => (idea.sequence ?? []).some((beat) => beat.concept_id && !idea.concept_links.some((link) => link.concept_id === beat.concept_id))).map((idea) => idea.id).join(", "));
  check("A film works with the sound off and with the sound on", ideas.every((idea) => !hasPlaceShape(idea)
    || (idea.two_layers.without_the_philosophy.trim() && idea.two_layers.with_the_philosophy.trim())),
    ideas.filter((idea) => hasPlaceShape(idea) && !(idea.two_layers.without_the_philosophy.trim() && idea.two_layers.with_the_philosophy.trim())).map((idea) => idea.id).join(", "));
  // One proposed location per idea, carried inside the idea and awaiting Chathura's verdict.
  const validPointValue = (c) => Number.isFinite(c?.lat) && Number.isFinite(c?.lng)
    && c.lat >= -90 && c.lat <= 90 && c.lng >= -180 && c.lng <= 180;
  const suggestedShape = (spot) => spot.name?.trim() && spot.region?.trim() && spot.why_here?.trim()
    && spot.access?.trim() && spot.best_time?.trim()
    && validPointValue(spot.coordinates)
    && Array.isArray(spot.what_to_film) && spot.what_to_film.length
    && Array.isArray(spot.images) && spot.images.every((image) => image.url?.trim() && image.caption?.trim() && image.source?.trim());
  check("A proposed location carries coordinates, framing notes and images", ideas.every((idea) => !idea.suggested_location || suggestedShape(idea.suggested_location)),
    ideas.filter((idea) => idea.suggested_location && !suggestedShape(idea.suggested_location)).map((idea) => idea.id).join(", "));
  // One verdict covers the idea and the place it proposes: idea.review.
  check("A proposed location carries no verdict of its own", ideas.every((idea) => !idea.suggested_location?.confirmation),
    ideas.filter((idea) => idea.suggested_location?.confirmation).map((idea) => idea.id).join(", "));
  check("Location proposals are Claude's, never recorded as Chathura's own entry", ideas.every((idea) => !idea.suggested_location
    || idea.suggested_location.proposed_by === "claude"),
  ideas.filter((idea) => idea.suggested_location && idea.suggested_location.proposed_by !== "claude").map((idea) => idea.id).join(", "));
  check("Proposed-location progress", true, `${ideas.filter((idea) => idea.suggested_location).length}/${ideas.length} ideas carry a proposed location`);
  const recommendations = new Set(["keep", "merge", "hold", "drop"]);
  check("Every idea carries a selection decision", ideas.every((idea) => recommendations.has(idea.selection?.recommendation)
    && (idea.selection.merged_with ?? []).every((id) => ideaIds.has(id))
    && (idea.selection.superseded_by === null || ideaIds.has(idea.selection.superseded_by))),
    ideas.filter((idea) => !recommendations.has(idea.selection?.recommendation)).map((idea) => idea.id).join(", "));

  const reviewStatuses = new Set(["confirmed", "pending", "rejected"]);
  check("Every idea carries a Chathura review status", ideas.every((idea) => reviewStatuses.has(idea.review?.status)),
    ideas.filter((idea) => !reviewStatuses.has(idea.review?.status)).map((idea) => idea.id).join(", "));
  // A group makes a fixed number of films, so it can only ever confirm that many ideas.
  const overQuota = groups.filter((group) => ideas.filter((idea) => idea.group_id === group.id
    && idea.review?.status === "confirmed").length > group.draft_film_count);
  check("No group confirms more ideas than it has films", overQuota.length === 0,
    overQuota.map((group) => `${group.id}: ${ideas.filter((idea) => idea.group_id === group.id && idea.review?.status === "confirmed").length}/${group.draft_film_count}`).join(", "));
  check("Confirmed-idea quota use", true, groups.map((group) => `${group.id} ${ideas.filter((idea) => idea.group_id === group.id && idea.review?.status === "confirmed").length}/${group.draft_film_count}`).join(", "));
  check("Recorded idea verdicts say when and by whom", ideas.every((idea) => idea.review?.status === "pending"
    || (idea.review?.decided_at && idea.review?.decided_by)),
  ideas.filter((idea) => idea.review?.status !== "pending" && !(idea.review?.decided_at && idea.review?.decided_by)).map((idea) => idea.id).join(", "));

  const places = readJson("locations");
  const placeIds = new Set(places.map((place) => place.id));
  check("Location IDs match file names", places.every((place) => /^LOC-\d{4}$/.test(place.id) && place.name === `${place.id}.json`),
    places.filter((place) => place.name !== `${place.id}.json`).map((place) => place.id).join(", "));
  check("Locations are entered by Chathura and carry a name", places.every((place) => place.origin === "entered_by_chathura"
    && typeof place.title === "string" && place.title.trim()),
  places.filter((place) => place.origin !== "entered_by_chathura" || !place.title?.trim()).map((place) => place.id).join(", "));
  const validPoint = (c) => Number.isFinite(c.lat) && Number.isFinite(c.lng)
    && c.lat >= -90 && c.lat <= 90 && c.lng >= -180 && c.lng <= 180;
  check("Location coordinates are valid or absent", places.every((place) => !place.coordinates || validPoint(place.coordinates)),
    places.filter((place) => place.coordinates && !validPoint(place.coordinates)).map((place) => place.id).join(", "));
  // Locations are no longer added as separate records: an idea proposes its own, and Chathura
  // confirms or rejects it in place. Any surviving LOC record is kept valid but is not required.
  check("A migrated idea has dropped the retired location-selection block", ideas.every((idea) => !idea.suggested_location
    || (!idea.location && !idea.location_suggestions)),
  ideas.filter((idea) => idea.suggested_location && (idea.location || idea.location_suggestions)).map((idea) => idea.id).join(", "));
  check("Retired location-block migration progress", true, `${ideas.filter((idea) => idea.location || idea.location_suggestions).length}/${ideas.length} ideas still hold the old block`);

  const episodes = readJson("episodes").sort((a, b) => a.chronology.global_position - b.chronology.global_position);
  const decisions = readJson("decisions");
  if (episodes.length) {
    const chathuraDecisions = new Set(decisions.filter((decision) => decision.reviewer_role === "chathura").map((decision) => decision.id));
    check("Episode IDs match file names", episodes.every((episode) => /^EPD-\d{4}$/.test(episode.id) && episode.name === `${episode.id}.json`));
    check("Exactly 98 development episodes", episodes.length === 98, `${episodes.length} episodes`);
    check("Episode global positions run 1..n without gaps", episodes.every((episode, index) => episode.chronology.global_position === index + 1));
    check("Episodes use only kept or merged ideas", episodes.every((episode) => episode.idea_ids.every((id) => {
      const idea = ideas.find((entry) => entry.id === id);
      return idea && (idea.selection?.recommendation === "keep" || idea.selection?.recommendation === "merge");
    })), episodes.filter((episode) => episode.idea_ids.some((id) => !["keep", "merge"].includes(ideas.find((entry) => entry.id === id)?.selection?.recommendation))).map((episode) => episode.id).join(", "));
    check("Episodes reference existing ideas", episodes.every((episode) => episode.idea_ids.length && episode.idea_ids.every((id) => ideaIds.has(id))));
    const usedIdeas = episodes.flatMap((episode) => episode.idea_ids);
    check("Each idea is used by at most one episode", new Set(usedIdeas).size === usedIdeas.length);
    const multiIdeaEpisodes = episodes.filter((episode) => episode.idea_ids.length > 1);
    const multiIdeaContexts = multiIdeaEpisodes.flatMap((episode) => resolveBriefSourceIdeas(episode.idea_ids, ideas)
      .map((context) => context?.idea.id));
    check("Multi-idea briefs resolve every attached idea", multiIdeaContexts.length === multiIdeaEpisodes.reduce((total, episode) => total + episode.idea_ids.length, 0)
      && multiIdeaEpisodes.every((episode) => resolveBriefSourceIdeas(episode.idea_ids, ideas).every((context, index) => context?.idea.id === episode.idea_ids[index])),
    multiIdeaEpisodes.map((episode) => `${episode.id}:${episode.idea_ids.join("+")}`).join(", "));
    const regressionEpisode = episodes.find((episode) => episode.id === "EPD-0001");
    check("EPD-0001 multi-idea briefing regression", regressionEpisode?.idea_ids.length === 2
      && resolveBriefSourceIdeas(regressionEpisode.idea_ids, ideas).map((context) => context?.idea.id).join(",") === regressionEpisode.idea_ids.join(","),
    regressionEpisode?.idea_ids.join(",") ?? "missing");
    check("Episodes stay inside their group's block", groups.every((group) => {
      const positions = episodes.filter((episode) => episode.chronology.group_id === group.id).map((episode) => episode.chronology.global_position);
      return positions.length === 0 || Math.max(...positions) - Math.min(...positions) + 1 === positions.length;
    }));
    check("Group episode lists exactly match chronology", groups.every((group) => {
      const expected = episodes.filter((episode) => episode.chronology.group_id === group.id).map((episode) => episode.id);
      return JSON.stringify(group.episode_ids) === JSON.stringify(expected);
    }), groups.filter((group) => JSON.stringify(group.episode_ids) !== JSON.stringify(episodes.filter((episode) => episode.chronology.group_id === group.id).map((episode) => episode.id))).map((group) => group.id).join(", "));
    check("Each group's first film acquires its object, and no other film does", groups.every((group) => {
      const own = episodes.filter((episode) => episode.chronology.group_id === group.id);
      return own.length === 0 || (own[0].object.acquires === group.object_id && own.slice(1).every((episode) => !episode.object.acquires));
    }));
    check("Object planned acquisitions point to each group's first film", objects.every((object) => {
      const first = episodes.find((episode) => episode.chronology.group_id === object.group_id);
      return first && object.planned_acquisition?.episode_id === first.id;
    }), objects.filter((object) => object.planned_acquisition?.episode_id !== episodes.find((episode) => episode.chronology.group_id === object.group_id)?.id).map((object) => object.id).join(", "));
    check("Objects only appear after they are acquired", episodes.every((episode) => episode.object.appears.every((objectId) => {
      const source = episodes.find((other) => other.object.acquires === objectId);
      return source && source.chronology.global_position <= episode.chronology.global_position;
    })));
    check("Adjacent episode threads are reciprocal", episodes.every((episode, index) => {
      const previous = episodes[index - 1];
      const next = episodes[index + 1];
      return episode.thread_in.from_episode_id === (previous?.id ?? null)
        && episode.thread_out.to_episode_id === (next?.id ?? null);
    }), episodes.filter((episode, index) => episode.thread_in.from_episode_id !== (episodes[index - 1]?.id ?? null)
      || episode.thread_out.to_episode_id !== (episodes[index + 1]?.id ?? null)).map((episode) => episode.id).join(", "));
    const researchStates = new Set(["not_started", "researching", "sufficient_for_treatment", "sufficient_for_production"]);
    check("Episode research readiness is explicit", episodes.every((episode) => researchStates.has(episode.research?.status)
      && episode.research.access_status && episode.research.participant_status && episode.research.permission_status
      && Array.isArray(episode.research.evidence_ids)), episodes.filter((episode) => !researchStates.has(episode.research?.status)).map((episode) => episode.id).join(", "));
    check("Selected episode locations come from Chathura's decisions", episodes.every((episode) => !episode.location.selected_location_id
      || (placeIds.has(episode.location.selected_location_id) && chathuraDecisions.has(episode.location.selected_location_decision_id))));
    const last = episodes.at(-1);
    check("The last chronological film is pinned as Episode 99", last.release.public_number === 99);
    if (groups.length === 10 && episodes.length === 98) {
      check("Finalised slate: group sizes match their film counts", groups.every((group) => episodes.filter((episode) => episode.chronology.group_id === group.id).length === group.draft_film_count));
    }
  }

  const lessonEpisodes = episodes.filter((episode) => episode.lesson);
  if (lessonEpisodes.length) {
    const lessonFields = ["in_simple_terms", "in_simple_terms_si", "the_teaching", "how_the_film_shows_it", "caution"];
    check("Episode lessons are complete", lessonEpisodes.every((episode) => lessonFields.every((field) => typeof episode.lesson[field] === "string" && episode.lesson[field].trim())),
      lessonEpisodes.filter((episode) => !lessonFields.every((field) => episode.lesson[field]?.trim?.())).map((episode) => episode.id).join(", "));
    const citationIssues = lessonEpisodes.flatMap((episode) => {
      if (!episode.lesson.sources?.length) return [`${episode.id}: no lesson sources`];
      return episode.lesson.sources.flatMap((source) => {
        if (!episode.concept_ids.includes(source.concept_id)) return [`${episode.id}:${source.concept_id}: not in episode concept_ids`];
        if (!source.citations?.length) return [`${episode.id}:${source.concept_id}: no citations`];
        return source.citations.map((citation) => {
          const issue = validateLessonCitation(source.concept_id, citation);
          return issue ? `${episode.id}:${citation}: ${issue}` : null;
        }).filter(Boolean);
      });
    });
    check("Episode lesson citations resolve to digest evidence and valid source lines", citationIssues.length === 0, citationIssues.join("; "));
    check("Lesson-bearing episode envelopes identify the consumed version", lessonEpisodes.every((episode) => episode.version >= 2
      && episode.updated_at >= episode.created_at && episode.updated_by), lessonEpisodes.filter((episode) => episode.version < 2 || !episode.updated_by).map((episode) => episode.id).join(", "));
  }
  const lessonGroups = groups.filter((group) => group.lesson);
  if (lessonGroups.length) {
    check("Group lessons are complete", lessonGroups.every((group) => group.lesson.in_simple_terms && group.lesson.the_teaching && group.lesson.progression?.length));
    const groupCitationIssues = lessonGroups.flatMap((group) => {
      const allowedConcepts = new Set(episodes.filter((episode) => episode.chronology.group_id === group.id).flatMap((episode) => episode.concept_ids));
      if (!group.lesson.sources?.length) return [`${group.id}: no lesson sources`];
      return group.lesson.sources.flatMap((source) => {
        if (!allowedConcepts.has(source.concept_id)) return [`${group.id}:${source.concept_id}: not used by a group episode`];
        if (!source.citations?.length) return [`${group.id}:${source.concept_id}: no citations`];
        return source.citations.map((citation) => {
          const issue = validateLessonCitation(source.concept_id, citation);
          return issue ? `${group.id}:${citation}: ${issue}` : null;
        }).filter(Boolean);
      });
    });
    check("Group lesson citations resolve to concepts used by the group", groupCitationIssues.length === 0, groupCitationIssues.join("; "));
    check("Lesson-bearing group envelopes identify the consumed version", lessonGroups.every((group) => group.version >= 2
      && group.updated_at >= group.created_at && group.updated_by), lessonGroups.filter((group) => group.version < 2 || !group.updated_by).map((group) => group.id).join(", "));
  }

  const depthMaps = readJson("analysis").filter((record) => record.record_type === "teaching_depth_analysis");
  check("Exactly one Abhidhamma depth map exists", depthMaps.length === 1, `${depthMaps.length} maps`);
  if (depthMaps.length === 1) {
    const depthMap = depthMaps[0];
    const depthStatuses = new Set(["missing", "surface_only", "introduced", "built", "integrated", "dangerously_compressed"]);
    const depthConceptIds = depthMap.concepts.map((concept) => concept.concept_id);
    const mechanismIds = new Set(depthMap.mechanisms.map((mechanism) => mechanism.mechanism_id));
    const episodeIds = new Set(episodes.map((episode) => episode.id));
    check("Depth map assesses every concept exactly once", depthConceptIds.length === conceptIds.size
      && new Set(depthConceptIds).size === conceptIds.size
      && [...conceptIds].every((id) => depthConceptIds.includes(id)), `${depthConceptIds.length}/${conceptIds.size} concepts`);
    check("Depth concept groups match the concept library", depthMap.concepts.every((concept) => groupOf.get(concept.concept_id) === concept.group_id));
    if (episodes.length) {
      check("Depth concept linked episodes match the slate", depthMap.concepts.every((concept) =>
        JSON.stringify(concept.linked_episode_ids) === JSON.stringify(episodes.filter((episode) => episode.concept_ids.includes(concept.concept_id)).map((episode) => episode.id))));
    } else {
      console.log("SKIP  Depth map episode references - the slate is empty; the map describes a cleared chronology");
    }
    check("Depth concept statuses and mechanism links are valid", depthMap.concepts.every((concept) => depthStatuses.has(concept.depth_status)
      && concept.related_mechanism_ids.every((id) => mechanismIds.has(id))));
    check("Depth map assesses ten groups and at least twenty major mechanisms", depthMap.groups.length === groups.length
      && groups.every((group) => depthMap.groups.some((entry) => entry.group_id === group.id))
      && depthMap.mechanisms.length >= 20, `${depthMap.groups.length} groups, ${depthMap.mechanisms.length} mechanisms`);
    const episodeRefsResolve = (ids) => episodes.length === 0 || ids.every((id) => episodeIds.has(id));
    check("Depth mechanism milestones and coverage resolve", depthMap.mechanisms.every((mechanism) => depthStatuses.has(mechanism.current_depth_status)
      && mechanism.concept_ids.every((id) => conceptIds.has(id))
      && episodeRefsResolve([mechanism.first_introduced_episode, ...mechanism.development_episodes, ...mechanism.integration_episodes, ...mechanism.recall_episodes])
      && mechanism.group_coverage.length === groups.length
      && mechanism.group_coverage.every((coverage) => depthStatuses.has(coverage.status)
        && groups.some((group) => group.id === coverage.group_id)
        && episodeRefsResolve(coverage.episode_ids)
        && (coverage.status === "missing" || coverage.episode_ids.length > 0))));
    const calculatedCounts = Object.fromEntries([...depthStatuses].map((status) => [status, depthMap.concepts.filter((concept) => concept.depth_status === status).length]));
    check("Depth summary counts match concept records", [...depthStatuses].every((status) => depthMap.summary.concept_status_counts[status] === calculatedCounts[status])
      && depthMap.summary.concepts_with_adequate_depth === calculatedCounts.built + calculatedCounts.integrated);
  }

  const screenplays = readJson("screenplays");
  const screenplayById = new Map(screenplays.map((version) => [version.id, version]));
  const stageDecisions = decisions.filter((decision) => decision.decision_type === "screenplay_stage_approval");
  check("Screenplay-stage decisions target an exact existing version", stageDecisions.every((decision) => {
    const target = screenplayById.get(decision.target?.record_id);
    return decision.record_type === "review_decision" && decision.reviewer_role === "chathura"
      && target && target.version === decision.target.version
      && new Set(["approved", "needs_revision"]).has(decision.outcome?.decision);
  }), stageDecisions.filter((decision) => {
    const target = screenplayById.get(decision.target?.record_id);
    return !target || target.version !== decision.target?.version || decision.reviewer_role !== "chathura";
  }).map((decision) => decision.id).join(", "));
  const isApproved = (version) => stageDecisions
    .filter((decision) => decision.target?.record_id === version?.id && decision.target?.version === version?.version && decision.reviewer_role === "chathura")
    .sort((a, b) => `${a.created_at ?? ""}:${a.id}`.localeCompare(`${b.created_at ?? ""}:${b.id}`))
    .at(-1)?.outcome?.decision === "approved";
  if (screenplays.length) {
    const episodeById = new Map(episodes.map((episode) => [episode.id, episode]));
    const previousStage = { scene_outline: "treatment", production: "scene_outline" };
    check("Screenplay IDs match file names", screenplays.every((version) => /^SPV-\d{4}$/.test(version.id) && version.name === `${version.id}.json`));
    check("Screenplays belong to development episodes (never Episodes 1 or 100)", screenplays.every((version) => episodeById.has(version.episode_id)));
    check("Screenplays are written only for a location Chathura selected", screenplays.every((version) => {
      const episode = episodeById.get(version.episode_id);
      return version.stage === "post_filming" || (version.location_id && episode?.location.selected_location_id === version.location_id);
    }), screenplays.filter((version) => version.location_id !== episodeById.get(version.episode_id)?.location.selected_location_id).map((version) => version.id).join(", "));
    check("Each screenplay stage builds on Chathura-approved previous stage", screenplays.every((version) => {
      const needed = previousStage[version.stage];
      if (!needed) return true;
      const base = screenplayById.get(version.based_on);
      return base && base.stage === needed && base.episode_id === version.episode_id && isApproved(base);
    }));
    check("Production screenplays require production-level research", screenplays.every((version) => version.stage !== "production"
      || episodeById.get(version.episode_id)?.research.status === "sufficient_for_production"), screenplays.filter((version) => version.stage === "production"
      && episodeById.get(version.episode_id)?.research.status !== "sufficient_for_production").map((version) => version.id).join(", "));
  }

  const allRecords = fs.readdirSync(development, { withFileTypes: true }).filter((entry) => entry.isDirectory()).flatMap((entry) => readJson(entry.name));
  const unauthorisedLocations = allRecords.filter((record) => record.selected_location_id && !record.selected_location_decision_id);
  check("Selected locations carry a Chathura decision", unauthorisedLocations.length === 0, unauthorisedLocations.map((record) => record.id).join(", "));
}

console.log(failures ? `\n${failures} check(s) failed.` : "\nAll checks passed.");
process.exit(failures ? 1 : 0);
