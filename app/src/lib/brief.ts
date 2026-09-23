import { getData, readDoc } from "./content";
import { getDevelopment, latestStages, orderedIdeas, ownedObjectsAt, screenplayNextStage, type Digest, type ScreenplayVersion, type Episode, type Group, type Idea, type Place, type ScreenplayNextStage, type StoryObject } from "./development";
import { formatCoordinates } from "./geo";
import { citationsInText } from "./citation-utils.mjs";
import { resolveBriefSourceIdeas } from "./brief-ideas.mjs";

export const PROJECT_RULES = [
  "Chathura Was Here is a cinematic documentary series, mainly set in Sri Lanka. The governing sequence is Story → Place → Experience.",
  "Each film stands on its own and follows Chathura's outward-looking point of view through real people, places and journeys. It is not a travel vlog and not a philosophical lecture.",
  "Abhidhamma concepts sit underneath the human story. Real people and events are never forced to illustrate doctrine.",
  "Never invent participants, dialogue, events, access, or facts about real places. Planned material is marked as planned; placeholders are marked as placeholders.",
  "Location selection belongs to Chathura alone. AI may describe requirements and suggest places, but never selects one. An idea records the location Chathura chose for it, taken from the saved locations; AI must treat that field as read-only.",
  "Films begin inside the story with footage and early voice-over. Season/episode, coordinates and title arrive after curiosity develops. A location name is not automatically revealed.",
  "Natural sound, observation and room to breathe come before explanation. Target length is 5–10 minutes, ideally 6–8.",
  "Every film ends with 'A Film by Chathura', then the project logo.",
  "Narration is written in English for now; Sinhala translation comes later.",
  "Keep the evidence classes separate: source teaching, editorial interpretation, documentary possibility, verified evidence.",
  "The ordinary public structure is Episodes 1–99 across 10 seasons. Season 1 has exactly 8 episodes; later seasons may have unequal counts. Episode 100 keeps its number but is hidden/discoverable outside the ordinary public structure.",
  "The chronology, the learning path and the earlier per-film location work have been cleared. The live step is idea review: each idea is confirmed, pending or rejected by Chathura, and confirmed ideas are given a location. Rejected ideas are kept so they can be regenerated.",
];

const MAX_LINES_PER_SOURCE = 250;

type Range = [number, number];
export type CitedSource = { ref: string; path: string; markers?: string; ranges: Range[]; lines: { n: number; text: string }[]; truncated: boolean };

function citedRanges(digest: Digest): Map<string, Range[]> {
  const text = [
    ...digest.sinhala_explanation.map((section) => section.text),
    ...digest.cross_source_notes,
    ...digest.uncertainties,
  ].join("\n");
  const ranges = new Map<string, Range[]>();
  for (const citation of citationsInText(text)) {
    const { start, end } = citation;
    const list = ranges.get(citation.ref) ?? [];
    list.push([Math.min(start, end), Math.max(start, end)]);
    ranges.set(citation.ref, list);
  }
  for (const [ref, list] of ranges) {
    list.sort((a, b) => a[0] - b[0]);
    const merged: Range[] = [];
    for (const range of list) {
      const last = merged.at(-1);
      if (last && range[0] <= last[1] + 2) last[1] = Math.max(last[1], range[1]);
      else merged.push([...range]);
    }
    ranges.set(ref, merged);
  }
  return ranges;
}

async function citedSources(digest: Digest): Promise<CitedSource[]> {
  const result: CitedSource[] = [];
  for (const [ref, ranges] of citedRanges(digest)) {
    const source = digest.sources_read.find((entry) => entry.ref === ref);
    if (!source) continue;
    const doc = await readDoc(source.path);
    if (!doc || doc.isDir) continue;
    const all = doc.text.split("\n");
    const lines: { n: number; text: string }[] = [];
    let truncated = false;
    for (const [start, end] of ranges) {
      for (let n = start; n <= end && n <= all.length; n++) {
        if (lines.length >= MAX_LINES_PER_SOURCE) { truncated = true; break; }
        lines.push({ n, text: all[n - 1] });
      }
    }
    result.push({ ref, path: source.path, markers: source.markers, ranges, lines, truncated });
  }
  return result;
}

export type IdeaBrief = {
  generated_at: string;
  idea: Idea;
  source_ideas: {
    presentation_role: "primary" | "linked";
    idea: Idea;
    related_ideas: { id: string; title: string; relation: string; note: string }[];
  }[];
  group: Group | null;
  object: StoryObject | null;
  place: Place | null;
  previous: { id: string; title: string } | null;
  next: { id: string; title: string } | null;
  related_ideas: { id: string; title: string; relation: string; note: string }[];
  /** Full records of every idea this one points at, so an agent gets the whole neighbourhood. */
  connected_ideas: Idea[];
  /** Every other idea proposing the same place, if any. */
  same_place_ideas: { id: string; title: string; location: string }[];
  concepts: {
    id: string;
    title_si: string;
    role: string;
    why: string;
    digest: Digest | null;
    idea_links: { idea_id: string; role: string; why: string }[];
  }[];
  citations: CitedSource[];
  rules: string[];
  manifest: { id: string; version: number; status: string }[];
  episode?: EpisodeContext;
};

export type EpisodeContext = {
  episode: Episode;
  previous: { id: string; title: string } | null;
  next: { id: string; title: string } | null;
  owned_objects: string[];
  place: Place | null;
  is_first: boolean;
  is_last: boolean;
  stages: Partial<Record<ScreenplayVersion["stage"], ScreenplayVersion>>;
  next_stage: ScreenplayNextStage;
};

async function buildBrief(ideaIds: string[]): Promise<IdeaBrief | null> {
  const [data, dev] = await Promise.all([getData(), getDevelopment()]);
  const resolvedIdeas = resolveBriefSourceIdeas(ideaIds, dev.ideas);
  if (!resolvedIdeas.length || resolvedIdeas.some((context) => !context)) return null;
  const sourceIdeas = resolvedIdeas as { presentation_role: "primary" | "linked"; idea: Idea }[];
  const ideas = sourceIdeas.map((context) => context.idea);
  const idea = ideas[0];
  const group = dev.groups.find((entry) => entry.id === idea.group_id) ?? null;
  const object = group ? dev.objects.get(group.object_id) ?? null : null;
  const place = null; // An idea carries its own proposed place; LOC records are retired.
  const ordered = orderedIdeas(dev);
  const index = ordered.findIndex((entry) => entry.id === idea.id);
  const neighbour = (offset: number) => {
    const entry = index < 0 ? undefined : ordered[index + offset];
    return entry ? { id: entry.id, title: entry.title } : null;
  };
  const source_ideas = sourceIdeas.map(({ idea: sourceIdea, presentation_role }) => ({
    presentation_role,
    idea: sourceIdea,
    related_ideas: sourceIdea.connections.map((connection) => ({
      id: connection.idea_id,
      title: dev.ideas.find((entry) => entry.id === connection.idea_id)?.title ?? "",
      relation: connection.relation,
      note: connection.note,
    })),
  }));
  const concepts = [...new Set(ideas.flatMap((sourceIdea) => sourceIdea.concept_links.map((link) => link.concept_id)))].map((conceptId) => {
    const idea_links = ideas.flatMap((sourceIdea) => sourceIdea.concept_links
      .filter((link) => link.concept_id === conceptId)
      .map((link) => ({ idea_id: sourceIdea.id, role: link.role, why: link.why })));
    const first = idea_links[0];
    return {
      id: conceptId,
      title_si: data.concepts.get(conceptId)?.title ?? "",
      role: first.role,
      why: first.why,
      digest: dev.digests.get(conceptId) ?? null,
      idea_links,
    };
  });
  // Verbatim passages are included once for every concept that is primary to any attached source idea.
  const cited = (await Promise.all(concepts.map((concept) => concept.digest
    && concept.idea_links.some((link) => link.role === "primary") ? citedSources(concept.digest) : []))).flat();
  const citations = cited.filter((source, index) => cited.findIndex((candidate) => candidate.ref === source.ref
    && candidate.path === source.path
    && JSON.stringify(candidate.ranges) === JSON.stringify(source.ranges)) === index);
  const related_ideas = source_ideas.flatMap((context) => context.related_ideas)
    .filter((related, index, all) => all.findIndex((candidate) => candidate.id === related.id
      && candidate.relation === related.relation && candidate.note === related.note) === index);
  // Whole records, not just labels: an agent handed this brief should not need a second fetch.
  const connectedIds = new Set(ideas.flatMap((entry) => entry.connections.map((c) => c.idea_id)));
  for (const entry of ideas) connectedIds.delete(entry.id);
  const connected_ideas = [...connectedIds]
    .map((id) => dev.ideas.find((entry) => entry.id === id))
    .filter((entry): entry is Idea => Boolean(entry));
  const ownPlace = idea.suggested_location?.name;
  const same_place_ideas = ownPlace
    ? dev.ideas.filter((entry) => entry.id !== idea.id && entry.suggested_location?.name === ownPlace)
      .map((entry) => ({ id: entry.id, title: entry.title, location: entry.suggested_location!.name }))
    : [];
  const manifest = [...ideas, ...connected_ideas, group, object, ...concepts.map((concept) => concept.digest)]
    .filter((record): record is NonNullable<typeof record> => Boolean(record))
    .map((record) => ({ id: record.id, version: record.version, status: record.status }));
  return {
    connected_ideas,
    same_place_ideas,
    generated_at: new Date().toISOString(),
    idea,
    source_ideas,
    group,
    object,
    place,
    previous: neighbour(-1),
    next: neighbour(1),
    related_ideas,
    concepts,
    citations,
    rules: PROJECT_RULES,
    manifest,
  };
}

export async function buildIdeaBrief(ideaId: string): Promise<IdeaBrief | null> {
  return buildBrief([ideaId]);
}

export async function buildEpisodeBrief(episodeId: string): Promise<IdeaBrief | null> {
  const dev = await getDevelopment();
  const index = dev.episodes.findIndex((entry) => entry.id === episodeId);
  if (index < 0) return null;
  const episode = dev.episodes[index];
  const brief = await buildBrief(episode.idea_ids);
  if (!brief) return null;
  const previous = dev.episodes[index - 1];
  const next = dev.episodes[index + 1];
  brief.episode = {
    episode,
    previous: previous ? { id: previous.id, title: previous.title } : null,
    next: next ? { id: next.id, title: next.title } : null,
    owned_objects: ownedObjectsAt(dev, episode),
    place: episode.location.selected_location_id ? dev.places.get(episode.location.selected_location_id) ?? null : null,
    is_first: index === 0,
    is_last: index === dev.episodes.length - 1,
    stages: latestStages(dev, episode.id),
    next_stage: screenplayNextStage(dev, episode),
  };
  brief.manifest.unshift({ id: episode.id, version: episode.version, status: episode.status });
  return brief;
}

const list = (items: string[]) => items.map((item) => `- ${item}`).join("\n");

export function briefToMarkdown(brief: IdeaBrief): string {
  const { idea, group, object } = brief;
  const out: string[] = [];
  const ep = brief.episode;
  const sourceIdeaIds = brief.source_ideas.map((context) => context.idea.id).join(", ");
  out.push(ep ? `# Episode brief: ${ep.episode.title} (${ep.episode.id}, from ${sourceIdeaIds})` : `# Idea brief: ${idea.title} (${idea.id})`);
  out.push(`Generated ${brief.generated_at} from the Chathura Was Here development records. Status: **${idea.status}**. This is a snapshot; the records are the source of truth.`);

  const review = idea.review;
  out.push(`## 0. Chathura's review
**Verdict:** ${review.status}${review.decided_at ? ` (recorded ${review.decided_at})` : " (not recorded yet)"}.${review.note ? ` Note: ${review.note}` : ""}
${review.status === "rejected"
    ? "This idea was rejected. A replacement may be generated for the same group and concepts; do not present this one as live."
    : review.status === "pending"
      ? "This idea is still awaiting Chathura's verdict. Do not treat it as settled."
      : "This idea is confirmed. It may move on to a location and, later, to a film."}
_Chathura's verdict, not the machine's. The \`selection\` field further down is only the AI's recommendation and never overrides this._`);

  out.push(`## 1. Project rules (always apply)\n${list(brief.rules)}`);

  if (group) {
    out.push(`## 2. Where this idea sits in the chronology
**Group ${String(group.chronological_position).padStart(2, "0")}: ${group.title}** (emotional stage: ${group.emotional_stage}; tone: ${group.tone})

- Group question: ${group.human_question}
- Journey: ${group.journey}
- Surface (what the viewer feels): ${group.surface}
- Depth (what the book teaches underneath): ${group.depth}
- Group arc: opening: ${group.arc.opening} Middle: ${group.arc.middle} Closing: ${group.arc.closing}
- Hands off to next group: ${group.hands_off}
- Group object: ${object?.title ?? group.object_id}. Identity not chosen yet (Chathura decides). It is acquired in the group's first chronological film and appears subtly in later ones.
- Suggested position for this idea: ${idea.position_hint}`);
  }

  if (ep) {
    const e = ep.episode;
    out.push(`## 2b. Chronology and continuity
- Chronological position: film ${e.chronology.global_position} of 98 (Episodes 2–99 pool); ${e.chronology.position_in_group} in ${e.chronology.group_id}.
- Release: ${e.release.public_number ? `Episode ${e.release.public_number}` : "public number not assigned yet"}${e.release.pinned_note ? ` (${e.release.pinned_note})` : ""}.
- Previous film in story time: ${ep.previous ? `${ep.previous.id} ${ep.previous.title}` : "none. This is the first development film; nothing comes before it in the 98-film pool."}
- Thread coming in: ${e.thread_in.thread || "n/a"}
- Next film in story time: ${ep.next ? `${ep.next.id} ${ep.next.title}` : "none. After this film the chronology reaches the crowded-location event, then Episode 100 Part A."}
- Thread going out: ${e.thread_out.thread || "n/a"}
- Objects planned as owned in this film: ${ep.owned_objects.length ? ep.owned_objects.join(", ") : "none yet"}.
- ${e.object.acquires ? `**This film is where ${e.object.acquires} is acquired.** It must come from a real moment, never staged. The object's identity is not chosen yet.` : `Object appearances planned: ${e.object.appears.length ? e.object.appears.join(", ") : "none required"}. Keep them subtle; they are not explained.`}
- Object note: ${e.object.note}
- Visibility is separate from ownership: an owned object need not appear on screen.${ep.is_last ? "\n- **Framing:** this film is released as Episode 99 and must end on the crowded-location footage that opens Episodes 1 and 100. Do not invent what happens in the crowd." : ""}`);
  }

  if (ep?.episode.lesson) {
    const lesson = ep.episode.lesson;
    out.push(`## 2c. What the viewer learns (${lesson.status})
**In simple terms:** ${lesson.in_simple_terms}
**සරලව:** ${lesson.in_simple_terms_si}

**The teaching behind it:** ${lesson.the_teaching}
Sources: ${lesson.sources.map((source) => `${source.concept_id} (${source.citations.join(", ")})`).join("; ")}

**How the film shows it (never state it in narration):** ${lesson.how_the_film_shows_it}

**Key terms:** ${lesson.key_terms.map((term) => [term.en, term.pali, term.si].filter(Boolean).join(" / ")).join("; ")}
**What it does not mean:** ${lesson.caution}
**Builds on:** ${lesson.builds_on}`);
  }
  if (group?.lesson) {
    out.push(`**Group lesson (${group.title}):** ${group.lesson.in_simple_terms}`);
  }

  const ideaBlocks = brief.source_ideas.map((context, index) => {
    const sourceIdea = context.idea;
    return `### ${index + 1}. ${sourceIdea.id} ${sourceIdea.title} (${context.presentation_role})
${sourceIdea.aliases.length ? `**Also filed as:** ${sourceIdea.aliases.join("; ")}\n` : ""}**Record:** version ${sourceIdea.version}, updated ${sourceIdea.updated_at} by ${sourceIdea.updated_by}. Group ${sourceIdea.group_id}. Status ${sourceIdea.status}.

**In one line:** ${sourceIdea.logline}

**Human question:** ${sourceIdea.human_question}

${sourceIdea.place ? `**The place**
- What kind of place: ${sourceIdea.place.what_kind_of_place}
- Why it is worth watching: ${sourceIdea.place.why_it_is_worth_watching}
- What moves or changes: ${sourceIdea.place.what_moves_or_changes}
- When it looks best: ${sourceIdea.place.when_it_looks_best}
` : sourceIdea.situation ? `**The situation**
- What happens: ${sourceIdea.situation.what_happens}
- Who is involved: ${sourceIdea.situation.who_is_involved}
- What is at stake: ${sourceIdea.situation.what_is_at_stake}
- How it unfolds: ${sourceIdea.situation.how_it_unfolds}
` : "_This idea has not been written yet._\n"}${sourceIdea.two_layers ? `
**Two layers**
- With the sound off: ${sourceIdea.two_layers.without_the_philosophy}
- With the philosophy: ${sourceIdea.two_layers.with_the_philosophy}
` : ""}${sourceIdea.sequence?.length ? `
**Sequence**
${sourceIdea.sequence.map((beat, beatIndex) => `${beatIndex + 1}. *On screen:* ${beat.on_screen}\n   *Voice:* "${beat.voice}"${beat.concept_id ? ` [${beat.concept_id}]` : ""}`).join("\n")}
` : ""}
**Why these concepts merge:** ${sourceIdea.concept_merge.why_together}
**What the merge reveals:** ${sourceIdea.concept_merge.what_it_reveals}

**What the viewer could come to understand:** ${sourceIdea.what_the_viewer_could_understand}

**What must be real:** ${sourceIdea.what_must_be_real}

**Where it sits in the group:** ${sourceIdea.position_hint}

**Risks**
${list(sourceIdea.risks)}

**Drop or revise if**
${list(sourceIdea.drop_if)}

**Connections to other ideas**
${context.related_ideas.length ? list(context.related_ideas.map((related) => `${related.id} ${related.title}: ${related.relation}. ${related.note}`)) : "- none"}

**Unknowns**
${list(sourceIdea.unknowns)}

**Selection:** ${sourceIdea.selection.recommendation}${sourceIdea.selection.merged_with.length ? ` (merged with ${sourceIdea.selection.merged_with.join(", ")})` : ""}. ${sourceIdea.selection.reason}

**Evidence boundary:** ${sourceIdea.evidence_class_note}

_Ideas carry no scene or shot decisions. Those are chosen later._`;
  });
  out.push(`## 3. Source idea context${brief.source_ideas.length > 1 ? "s" : ""}
${ideaBlocks.join("\n\n")}`);

  if (!ep) {
    const spot = idea.suggested_location;
    out.push(`## 4. Location (proposed with the idea; Chathura confirms)
**Proposed location:** ${spot
      ? `${spot.name}${spot.region ? `, ${spot.region}` : ""}. Coordinates: ${formatCoordinates(spot.coordinates)}.${spot.elevation_m ? ` Elevation: ${spot.elevation_m} m.` : ""}`
      : "none yet. This idea has not been rewritten, so no place has been proposed."}
${spot ? `**Verdict:** the idea's own review status (${idea.review.status}) covers this place; there is no separate location verdict.

**Why here:** ${spot.why_here}

**What to film:**
${spot.what_to_film.map((item) => `- ${item}`).join("\n")}

**Access:** ${spot.access}
**Best time:** ${spot.best_time}${spot.also_known_as?.length ? `
**Also known as:** ${spot.also_known_as.map((entry) => `${entry.name} (${entry.meaning}; ${entry.used_by})`).join("; ")}` : ""}${spot.research_note ? `

**Research note:** ${spot.research_note}` : ""}${spot.sources?.length ? `
**Sources:** ${spot.sources.join(", ")}` : ""}${spot.images?.length ? `

**Reference images** (external archive stills, not production assets)
${spot.images.map((image) => `- ${image.caption}\n  - file: ${image.url}\n  - source page: ${image.source}${image.licence_note ? `\n  - licence: ${image.licence_note}` : ""}`).join("\n")}` : "\n\n**Reference images:** none found for this place."}` : ""}

The place is proposed by Claude from desk research and is confirmed or rejected together with the idea. Access, participants, permissions and the documentary facts are all still unresearched.`);
  }

  const location = ep?.episode.location;
  if (location) {
  out.push(`## 4. Location (Chathura selects)
**Selected location:** ${ep?.place ? `${ep.place.name}, ${ep.place.region} (${ep.place.id}, chosen by Chathura, decision ${ep.place.decision_id})${ep.place.note ? `. Note: ${ep.place.note}` : ""}` : location.selected_location_id ?? "none; awaiting Chathura's choice. Location-dependent work (treatment, screenplay) cannot advance until Chathura selects."}
**Name reveal policy:** ${location.name_reveal_policy}
${ep ? `**Research readiness:** ${ep.episode.research.status}. Access: ${ep.episode.research.access_status}; participants: ${ep.episode.research.participant_status}; permissions: ${ep.episode.research.permission_status}. Location selection alone does not verify documentary reality or unlock a production screenplay.` : ""}

**Requirements**
${list(location.requirements)}

**AI suggestions (not selections)**
${location.suggestions.length ? list(location.suggestions.map((s) => `${s.name}, ${s.region}. ${s.why}${s.season_notes ? ` Season: ${s.season_notes}.` : ""}${s.access_notes ? ` Access: ${s.access_notes}.` : ""} Verify: ${s.verify ?? "unverified"}`)) : "- none offered"}`);
  }

  const conceptBlocks = brief.concepts.map((concept) => {
    const digest = concept.digest;
    const isPrimary = concept.idea_links.some((link) => link.role === "primary");
    const head = `### ${concept.id} ${concept.title_si}${isPrimary ? " (primary in at least one source idea)" : " (supporting)"}\n${concept.idea_links.map((link) => `- ${link.idea_id} (${link.role}): ${link.why}`).join("\n")}`;
    if (!digest) return `${head}\n\n_Concept digest pending._`;
    if (!isPrimary) {
      return `${head}

Digest ${digest.id} v${digest.version} (${digest.status}): ${digest.title_en}. Supporting concept, so it is summarised here; the full digest is in the JSON brief and on the concept page.

**What the source teaches:** ${digest.summary_en}

**Human interpretation (editorial)**
${digest.human_interpretation_en.map((section) => `**${section.heading}**\n${section.text}`).join("\n\n")}

**Source uncertainties**
${list(digest.uncertainties)}`;
    }
    return `${head}

Digest ${digest.id} v${digest.version} (${digest.status}): ${digest.title_en}

**What the source teaches:** ${digest.summary_en}

**සිංහල පැහැදිලි කිරීම (source teaching)**
${digest.sinhala_explanation.map((section) => `**${section.heading}**\n${section.text}`).join("\n\n")}

**Human interpretation (editorial)**
${digest.human_interpretation_en.map((section) => `**${section.heading}**\n${section.text}`).join("\n\n")}

**Key terms**
${list(digest.key_terms.map((term) => `${term.term_si}${term.pali ? ` (${term.pali})` : ""}: ${term.en}${term.note ? `. ${term.note}` : ""}`))}

**Does not transfer**
${list(digest.does_not_transfer)}

**Source uncertainties**
${list(digest.uncertainties)}`;
  });
  out.push(`## 5. Concepts\n${conceptBlocks.join("\n\n")}`);

  if (brief.citations.length) {
    out.push(`## 6. Cited source passages for the primary concepts (verbatim)\n${brief.citations.map((source) => `### ${source.ref}: ${source.path}${source.markers ? `\n${source.markers}` : ""}
Cited lines: ${source.ranges.map(([a, b]) => (a === b ? `L${a}` : `L${a}–L${b}`)).join(", ")}${source.truncated ? ` (truncated at ${MAX_LINES_PER_SOURCE} lines; open the file for the rest)` : ""}

${source.lines.map((line) => `> L${line.n}: ${line.text}`).join("\n")}`).join("\n\n")}`);
  }

  if (ep) {
    const stageLabel: Record<string, string> = { treatment: "treatment", scene_outline: "scene outline", production: "production screenplay" };
    const previous = ep.next_stage === "scene_outline" || ep.next_stage === "awaiting_treatment_approval" ? ep.stages.treatment
      : ep.next_stage === "production" || ep.next_stage === "blocked_research" || ep.next_stage === "awaiting_outline_approval" ? ep.stages.scene_outline
        : ep.next_stage === "production_ready" || ep.next_stage === "awaiting_production_approval" ? ep.stages.production : undefined;
    const lines = [`## 7. Screenplay stage`];
    if (ep.next_stage === "blocked_location") {
      lines.push("**Blocked:** Chathura has not selected a location for this film. Do not write a treatment or screenplay. Research questions and location requirements are fine.");
    } else if (ep.next_stage === "awaiting_treatment_approval") {
      lines.push(`**Awaiting Chathura:** treatment ${ep.stages.treatment?.id} v${ep.stages.treatment?.version} exists but is not approved. Do not write the scene outline.`);
    } else if (ep.next_stage === "awaiting_outline_approval") {
      lines.push(`**Awaiting Chathura:** scene outline ${ep.stages.scene_outline?.id} v${ep.stages.scene_outline?.version} exists but is not approved. Do not write the production screenplay.`);
    } else if (ep.next_stage === "blocked_research") {
      lines.push("**Blocked by research readiness:** the outline may be approved, but research is not marked sufficient for production. Verify access, participants, permissions and the documentary facts before writing a production screenplay.");
    } else if (ep.next_stage === "awaiting_production_approval") {
      lines.push(`**Awaiting Chathura:** production screenplay ${ep.stages.production?.id} v${ep.stages.production?.version} exists but is not approved for production.`);
    } else if (ep.next_stage === "production_ready") {
      lines.push(`The production screenplay is approved (${ep.stages.production?.id} v${ep.stages.production?.version}). A post-filming version may only be written from captured footage, transcripts and field notes.`);
    } else {
      lines.push(`**Next to write:** the ${stageLabel[ep.next_stage]}. Follow \`docs/planning/prompts/screenplay-brief.md\` exactly (gate, non-negotiables, stage format, JSON record). Set \`based_on\` to ${previous ? `\`${previous.id}\`` : "null"} and \`location_id\` to \`${ep.episode.location.selected_location_id}\`.`);
    }
    if (previous) lines.push(`### Latest ${stageLabel[previous.stage] ?? previous.stage} (${previous.id} v${previous.version}, ${previous.status})\n\n${previous.body_markdown}`);
    out.push(lines.join("\n\n"));
  }

  out.push(`## ${ep ? 8 : 7}. Instructions for the next step
- Use this brief to refine the idea, write research questions, or describe the kinds of participants and moments to look for.
- Do not invent people, dialogue, events, access or facts about real places. Mark every assumption.
- Do not choose the location. If a location is needed, describe requirements or add clearly labelled suggestions.
- Keep the doctrine under the story: the film must work even if no Buddhist term is ever spoken.
- Write any narration in English.

Record versions: ${brief.manifest.map((record) => `${record.id} v${record.version} (${record.status})`).join(", ")}`);

  return out.join("\n\n");
}
