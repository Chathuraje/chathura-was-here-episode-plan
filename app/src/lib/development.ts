import fs from "node:fs/promises";
import path from "node:path";
import { REPO_DIR } from "./content";

export const DEVELOPMENT_DIR = path.join(REPO_DIR, "development");

export const TARGET_DEVELOPMENT_FILMS = 98;
export const TARGET_GROUPS = 10;

type Envelope = {
  schema_version: number;
  id: string;
  record_type: string;
  title: string;
  status: string;
  version: number;
  updated_at: string;
  updated_by: string;
};

export type EpisodeLesson = {
  in_simple_terms: string;
  in_simple_terms_si: string;
  the_teaching: string;
  how_the_film_shows_it: string;
  key_terms: { pali?: string; si?: string; en: string }[];
  sources: { concept_id: string; citations: string[] }[];
  caution: string;
  builds_on: string;
  status: string;
  evidence_class: string;
};

export type GroupLesson = {
  in_simple_terms: string;
  in_simple_terms_si: string;
  the_teaching: string;
  progression: string[];
  builds_on: string;
  hands_to_next: string;
  sources: { concept_id: string; citations: string[] }[];
  status: string;
  evidence_class: string;
};

export type GroupConcept = { id: string; role: string; role_status: string };

export type Group = Envelope & {
  chronological_position: number;
  emotional_stage: string;
  tone: string;
  human_question: string;
  journey: string;
  surface: string;
  depth: string;
  arc: { opening: string; middle: string; closing: string };
  hands_off: string;
  draft_film_count: number;
  concepts: GroupConcept[];
  object_id: string;
  candidate_idea_refs: string[];
  episode_ids: string[];
  unknowns: string[];
  lesson?: GroupLesson;
};

export type StoryObject = Envelope & {
  group_id: string;
  identity: string | null;
  image: string | null;
  symbolic_hint: { text: string; status: string } | null;
  planned_acquisition: { where: string; episode_id: string | null };
  planned_appearances: string;
};

export type FramingEpisode = Envelope & {
  record_role: "continuity_reference";
  generated_by_screenplay_system: false;
  release: {
    public_number: number;
    status: string;
    distribution_mode: "ordinary_public" | "hidden_discoverable";
    public_structure?: "outside_ordinary_public_1_99";
  };
  chronology: { position: string };
  reference_snapshot: string;
  external_screenplay: string;
  sequence: string[];
  screenplay_guide?: {
    scope: string;
    genre: string;
    runtime: { range: string; editorial_target: string; narration_target: string };
    narrative_function: string;
    primary_locations: string[];
    participants: string[];
    visual_approach: string[];
    sound_approach: string[];
    information_reveal: { method: string; order: string[]; location_name_policy: string };
    editorial_priorities: string[];
    continuity_hooks: string[];
    evidence_boundary: string;
  };
  objects: string;
};

export type Section = { heading: string; text: string };

export type Digest = Envelope & {
  concept_id: string;
  group_id: string;
  title_si: string;
  title_en: string;
  sources_read: { ref: string; path: string; lines: string; complete: boolean; markers?: string }[];
  summary_en: string;
  sinhala_explanation: Section[];
  key_terms: { term_si: string; pali?: string; en: string; note?: string }[];
  human_interpretation_en: Section[];
  does_not_transfer: string[];
  story_seeds: { seed: string; what_camera_could_observe: string; why_it_fits: string; setting_type: string; risk?: string }[];
  cross_source_notes: string[];
  uncertainties: string[];
};

export type LocationSuggestion = {
  name: string;
  region: string;
  why: string;
  season_notes?: string;
  access_notes?: string;
  verify?: string;
  status: "ai_suggestion";
};

export type Idea = Envelope & {
  aliases: string[];
  group_id: string;
  logline: string;
  human_question: string;
  premise: { story: string; place: string; experience: string };
  concept_links: { concept_id: string; role: string; why: string }[];
  what_camera_could_observe: string[];
  what_must_be_real: string;
  possible_arc: { opening: string; turn: string; ending_open: string };
  position_hint: string;
  location: {
    requirements: string[];
    suggestions: LocationSuggestion[];
    selected_location_id: string | null;
    selected_location_decision_id: string | null;
    selection_status: string;
    name_reveal_policy: string;
  };
  risks: string[];
  drop_if: string[];
  connections: { idea_id: string; relation: string; note: string }[];
  source_doc: string | null;
  unknowns: string[];
  evidence_class_note: string;
};

export type EpisodeLocation = {
  requirements: string[];
  suggestions: LocationSuggestion[];
  selected_location_id: string | null;
  selected_location_decision_id: string | null;
  selection_status: string;
  name_reveal_policy: string;
};

export type EpisodeResearch = {
  status: "not_started" | "researching" | "sufficient_for_treatment" | "sufficient_for_production";
  access_status: "unverified" | "researching" | "verified";
  participant_status: "unverified" | "researching" | "verified";
  permission_status: "unverified" | "researching" | "verified";
  evidence_ids: string[];
};

export type Episode = Envelope & {
  record_role: "development_episode";
  idea_ids: string[];
  concept_ids: string[];
  chronology: { group_id: string; position_in_group: number; global_position: number };
  object: { acquires: string | null; appears: string[]; note: string };
  thread_in: { from_episode_id: string | null; thread: string };
  thread_out: { to_episode_id: string | null; thread: string };
  release: { series_id: string | null; position: number | null; public_number: number | null; pinned_note?: string };
  filming: { block_id: string | null; position: number | null; target_window: string | null };
  location: EpisodeLocation;
  research: EpisodeResearch;
  logline: string;
  lesson?: EpisodeLesson;
};

export type Place = Envelope & {
  name: string;
  region: string;
  origin: "ai_suggestion_chosen_by_chathura" | "entered_by_chathura";
  note: string;
  decision_id: string;
};

export type ScreenplayScene = {
  n: number;
  heading: string;
  required: boolean;
  purpose: string;
  footage: string[];
  sound: string;
  narration: string;
  real_speech_placeholders: string[];
  estimated_seconds: number;
  research_gaps: string[];
  continuity: string;
};

export type ScreenplayVersion = Envelope & {
  episode_id: string;
  stage: "treatment" | "scene_outline" | "production" | "post_filming";
  based_on: string | null;
  location_id: string | null;
  guide: {
    genre: string;
    runtime: { range: string; editorial_target: string; narration_target: string };
    narrative_function: string;
    visual_approach: string[];
    sound_approach: string[];
    information_reveal: { method: string; order: string[]; location_name_policy: string };
    editorial_priorities: string[];
    continuity_hooks: string[];
    evidence_boundary: string;
  };
  scenes: ScreenplayScene[];
  body_markdown: string;
  unknowns: string[];
};

export type ReviewDecision = {
  schema_version: number;
  id: string;
  record_type: string;
  reviewer_role?: string;
  decision_type?: string;
  target?: { record_id: string; version: number };
  outcome?: { decision?: string; [key: string]: unknown };
  created_at?: string;
};

export const SCREENPLAY_STAGES = ["treatment", "scene_outline", "production", "post_filming"] as const;

export type Development = {
  groups: Group[];
  objects: Map<string, StoryObject>;
  framing: FramingEpisode[];
  conceptGroup: Map<string, Group>;
  draftFilmTotal: number;
  digests: Map<string, Digest>;
  ideas: Idea[];
  episodes: Episode[];
  places: Map<string, Place>;
  screenplays: ScreenplayVersion[];
  decisions: ReviewDecision[];
};

async function readRecords<T>(dir: string): Promise<T[]> {
  const abs = path.join(DEVELOPMENT_DIR, dir);
  const names = await fs.readdir(abs).catch(() => [] as string[]);
  const records = await Promise.all(
    names
      .filter((name) => name.endsWith(".json"))
      .sort()
      .map(async (name) => JSON.parse(await fs.readFile(path.join(abs, name), "utf8")) as T),
  );
  return records;
}

export async function getDevelopment(): Promise<Development> {
  const [groups, objects, framing, digests, ideas] = await Promise.all([
    readRecords<Group>("groups"),
    readRecords<StoryObject>("objects"),
    readRecords<FramingEpisode>("framing"),
    readRecords<Digest>("digests"),
    readRecords<Idea>("ideas"),
  ]);
  const [episodes, places, screenplays, decisions] = await Promise.all([
    readRecords<Episode>("episodes"),
    readRecords<Place>("locations"),
    readRecords<ScreenplayVersion>("screenplays"),
    readRecords<ReviewDecision>("decisions"),
  ]);
  episodes.sort((a, b) => a.chronology.global_position - b.chronology.global_position);
  groups.sort((a, b) => a.chronological_position - b.chronological_position);
  const conceptGroup = new Map<string, Group>();
  for (const group of groups) for (const concept of group.concepts) conceptGroup.set(concept.id, group);
  return {
    groups,
    objects: new Map(objects.map((object) => [object.id, object])),
    framing,
    conceptGroup,
    draftFilmTotal: groups.reduce((total, group) => total + group.draft_film_count, 0),
    digests: new Map(digests.map((digest) => [digest.concept_id, digest])),
    ideas,
    episodes,
    places: new Map(places.map((place) => [place.id, place])),
    screenplays,
    decisions,
  };
}

/** Latest version of each screenplay stage for one episode. */
export function latestStages(dev: Development, episodeId: string): Partial<Record<ScreenplayVersion["stage"], ScreenplayVersion>> {
  const latest: Partial<Record<ScreenplayVersion["stage"], ScreenplayVersion>> = {};
  for (const version of dev.screenplays.filter((entry) => entry.episode_id === episodeId)) {
    const current = latest[version.stage];
    if (!current || version.version > current.version) latest[version.stage] = version;
  }
  return latest;
}

export function screenplayApproval(dev: Development, version: ScreenplayVersion): ReviewDecision | null {
  return dev.decisions
    .filter((decision) => decision.record_type === "review_decision"
      && decision.reviewer_role === "chathura"
      && decision.decision_type === "screenplay_stage_approval"
      && decision.target?.record_id === version.id
      && decision.target.version === version.version)
    .sort((a, b) => `${a.created_at ?? ""}:${a.id}`.localeCompare(`${b.created_at ?? ""}:${b.id}`))
    .at(-1) ?? null;
}

export function isScreenplayStageApproved(dev: Development, version: ScreenplayVersion | undefined): boolean {
  return Boolean(version && screenplayApproval(dev, version)?.outcome?.decision === "approved");
}

export type ScreenplayNextStage = ScreenplayVersion["stage"]
  | "blocked_location"
  | "blocked_research"
  | "awaiting_treatment_approval"
  | "awaiting_outline_approval"
  | "awaiting_production_approval"
  | "production_ready";

export function screenplayNextStage(dev: Development, episode: Episode): ScreenplayNextStage {
  if (!episode.location.selected_location_id) return "blocked_location";
  const stages = latestStages(dev, episode.id);
  if (!stages.treatment) return "treatment";
  if (!isScreenplayStageApproved(dev, stages.treatment)) return "awaiting_treatment_approval";
  if (!stages.scene_outline) return "scene_outline";
  if (!isScreenplayStageApproved(dev, stages.scene_outline)) return "awaiting_outline_approval";
  if (episode.research.status !== "sufficient_for_production") return "blocked_research";
  if (!stages.production) return "production";
  if (!isScreenplayStageApproved(dev, stages.production)) return "awaiting_production_approval";
  return "production_ready";
}

/** Objects planned as owned at the start of an episode, in chronological order. */
export function ownedObjectsAt(dev: Development, episode: Episode): string[] {
  return dev.episodes
    .filter((other) => other.chronology.global_position <= episode.chronology.global_position && other.object.acquires)
    .map((other) => other.object.acquires as string);
}
