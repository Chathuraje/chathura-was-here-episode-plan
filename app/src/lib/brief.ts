import { getData, readDoc } from "./content";
import { getDevelopment, latestStages, ownedObjectsAt, type Digest, type ScreenplayVersion, type Episode, type Group, type Idea, type Place, type StoryObject } from "./development";

export const PROJECT_RULES = [
  "Chathura Was Here is a cinematic documentary series, mainly set in Sri Lanka. The governing sequence is Story → Place → Experience.",
  "Each film stands on its own and follows Chathura's outward-looking point of view through real people, places and journeys. It is not a travel vlog and not a philosophical lecture.",
  "Abhidhamma concepts sit underneath the human story. Real people and events are never forced to illustrate doctrine.",
  "Never invent participants, dialogue, events, access, or facts about real places. Planned material is marked as planned; placeholders are marked as placeholders.",
  "Location selection belongs to Chathura alone. AI may describe requirements and suggest places, but never selects one.",
  "Films begin inside the story with footage and early voice-over. Season/episode, coordinates and title arrive after curiosity develops. A location name is not automatically revealed.",
  "Natural sound, observation and room to breathe come before explanation. Target length is 5–10 minutes, ideally 6–8.",
  "Every film ends with 'A Film by Chathura', then the project logo.",
  "Narration is written in English for now; Sinhala translation comes later.",
  "Keep the evidence classes separate: source teaching, editorial interpretation, documentary possibility, verified evidence.",
];

const CITATION = /\b(C\d{3}-[A-Z0-9]+):L(\d+)(?:\s*[–-]\s*L?(\d+))?/g;
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
  for (const match of text.matchAll(CITATION)) {
    const start = Number(match[2]);
    const end = Number(match[3] ?? match[2]);
    const list = ranges.get(match[1]) ?? [];
    list.push([Math.min(start, end), Math.max(start, end)]);
    ranges.set(match[1], list);
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
  group: Group | null;
  object: StoryObject | null;
  related_ideas: { id: string; title: string; relation: string; note: string }[];
  concepts: { id: string; title_si: string; role: string; why: string; digest: Digest | null }[];
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
  next_stage: ScreenplayVersion["stage"] | "blocked_location" | "complete";
};

export async function buildIdeaBrief(ideaId: string): Promise<IdeaBrief | null> {
  const [data, dev] = await Promise.all([getData(), getDevelopment()]);
  const idea = dev.ideas.find((entry) => entry.id === ideaId);
  if (!idea) return null;
  const group = dev.groups.find((entry) => entry.id === idea.group_id) ?? null;
  const object = group ? dev.objects.get(group.object_id) ?? null : null;
  const concepts = idea.concept_links.map((link) => ({
    id: link.concept_id,
    title_si: data.concepts.get(link.concept_id)?.title ?? "",
    role: link.role,
    why: link.why,
    digest: dev.digests.get(link.concept_id) ?? null,
  }));
  // Verbatim passages only for primary concepts; supporting concepts stay summarised to keep the brief pasteable.
  const citations = (await Promise.all(
    concepts.map((concept) => (concept.digest && concept.role === "primary" ? citedSources(concept.digest) : [])),
  )).flat();
  const related_ideas = idea.connections.map((connection) => ({
    id: connection.idea_id,
    title: dev.ideas.find((entry) => entry.id === connection.idea_id)?.title ?? "",
    relation: connection.relation,
    note: connection.note,
  }));
  const manifest = [idea, group, object, ...concepts.map((concept) => concept.digest)]
    .filter((record): record is NonNullable<typeof record> => Boolean(record))
    .map((record) => ({ id: record.id, version: record.version, status: record.status }));
  return { generated_at: new Date().toISOString(), idea, group, object, related_ideas, concepts, citations, rules: PROJECT_RULES, manifest };
}

export async function buildEpisodeBrief(episodeId: string): Promise<IdeaBrief | null> {
  const dev = await getDevelopment();
  const index = dev.episodes.findIndex((entry) => entry.id === episodeId);
  if (index < 0) return null;
  const episode = dev.episodes[index];
  const brief = await buildIdeaBrief(episode.idea_ids[0]);
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
    next_stage: "blocked_location",
  };
  const stages = brief.episode.stages;
  if (episode.location.selected_location_id) {
    brief.episode.next_stage = !stages.treatment ? "treatment" : !stages.scene_outline ? "scene_outline" : !stages.production ? "production" : "complete";
  }
  brief.manifest.unshift({ id: episode.id, version: episode.version, status: episode.status });
  return brief;
}

const list = (items: string[]) => items.map((item) => `- ${item}`).join("\n");

export function briefToMarkdown(brief: IdeaBrief): string {
  const { idea, group, object } = brief;
  const out: string[] = [];
  const ep = brief.episode;
  out.push(ep ? `# Episode brief: ${ep.episode.title} (${ep.episode.id}, from ${idea.id})` : `# Idea brief: ${idea.title} (${idea.id})`);
  out.push(`Generated ${brief.generated_at} from the Chathura Was Here development records. Status: **${idea.status}**. This is a snapshot; the records are the source of truth.`);

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

  out.push(`## 3. The idea
**Logline:** ${idea.logline}

**Human question:** ${idea.human_question}

**Story:** ${idea.premise.story}
**Place:** ${idea.premise.place}
**Experience:** ${idea.premise.experience}

**What the camera could observe**
${list(idea.what_camera_could_observe)}

**What must be real:** ${idea.what_must_be_real}

**Possible arc:** opening: ${idea.possible_arc.opening} Turn: ${idea.possible_arc.turn} Ending (left open): ${idea.possible_arc.ending_open}

**Risks**
${list(idea.risks)}

**Drop or revise if**
${list(idea.drop_if)}

**Connections to other ideas**
${list(brief.related_ideas.map((related) => `${related.id} ${related.title}: ${related.relation}. ${related.note}`))}

**Unknowns**
${list(idea.unknowns)}`);

  const location = ep ? ep.episode.location : idea.location;
  out.push(`## 4. Location (Chathura selects)
**Selected location:** ${ep?.place ? `${ep.place.name}, ${ep.place.region} (${ep.place.id}, chosen by Chathura, decision ${ep.place.decision_id})${ep.place.note ? `. Note: ${ep.place.note}` : ""}` : location.selected_location_id ?? "none; awaiting Chathura's choice. Location-dependent work (treatment, screenplay) cannot advance until Chathura selects."}
**Name reveal policy:** ${location.name_reveal_policy}

**Requirements**
${list(location.requirements)}

**AI suggestions (not selections)**
${location.suggestions.length ? list(location.suggestions.map((s) => `${s.name}, ${s.region}. ${s.why}${s.season_notes ? ` Season: ${s.season_notes}.` : ""}${s.access_notes ? ` Access: ${s.access_notes}.` : ""} Verify: ${s.verify ?? "unverified"}`)) : "- none offered"}`);

  const conceptBlocks = brief.concepts.map((concept) => {
    const digest = concept.digest;
    const head = `### ${concept.id} ${concept.title_si} (${concept.role})\nWhy it is linked: ${concept.why}`;
    if (!digest) return `${head}\n\n_Concept digest pending._`;
    if (concept.role !== "primary") {
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
    const previous = ep.next_stage === "scene_outline" ? ep.stages.treatment : ep.next_stage === "production" ? ep.stages.scene_outline : ep.next_stage === "complete" ? ep.stages.production : undefined;
    const lines = [`## 7. Screenplay stage`];
    if (ep.next_stage === "blocked_location") {
      lines.push("**Blocked:** Chathura has not selected a location for this film. Do not write a treatment or screenplay. Research questions and location requirements are fine.");
    } else if (ep.next_stage === "complete") {
      lines.push(`The production screenplay exists (${ep.stages.production?.id} v${ep.stages.production?.version}). The next version comes only after filming, grounded in captured footage.`);
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
