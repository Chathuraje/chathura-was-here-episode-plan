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
  release: { public_number: number; status: string };
  chronology: { position: string };
  reference_snapshot: string;
  external_screenplay: string;
  sequence: string[];
  objects: string;
};

export type Development = {
  groups: Group[];
  objects: Map<string, StoryObject>;
  framing: FramingEpisode[];
  conceptGroup: Map<string, Group>;
  draftFilmTotal: number;
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
  const [groups, objects, framing] = await Promise.all([
    readRecords<Group>("groups"),
    readRecords<StoryObject>("objects"),
    readRecords<FramingEpisode>("framing"),
  ]);
  groups.sort((a, b) => a.chronological_position - b.chronological_position);
  const conceptGroup = new Map<string, Group>();
  for (const group of groups) for (const concept of group.concepts) conceptGroup.set(concept.id, group);
  return {
    groups,
    objects: new Map(objects.map((object) => [object.id, object])),
    framing,
    conceptGroup,
    draftFilmTotal: groups.reduce((total, group) => total + group.draft_film_count, 0),
  };
}
