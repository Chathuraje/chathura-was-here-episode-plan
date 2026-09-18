"use server";

import fs from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { DEVELOPMENT_DIR, type Episode } from "@/lib/development";

const REVEAL_POLICIES = new Set(["early", "later", "never", "undecided"]);
const today = () => new Date().toISOString().slice(0, 10);

async function readJson<T>(file: string): Promise<T> {
  return JSON.parse(await fs.readFile(file, "utf8")) as T;
}

async function writeJson(file: string, data: unknown) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2) + "\n", "utf8");
}

/** Next free number for an ID prefix, scanning both file names and IDs inside decision logs. */
async function nextId(dir: string, prefix: string): Promise<string> {
  const names = await fs.readdir(path.join(DEVELOPMENT_DIR, dir)).catch(() => [] as string[]);
  let max = 0;
  for (const name of names.filter((entry) => entry.endsWith(".json"))) {
    const text = await fs.readFile(path.join(DEVELOPMENT_DIR, dir, name), "utf8");
    for (const match of text.matchAll(new RegExp(`${prefix}-(\\d{4})`, "g"))) max = Math.max(max, Number(match[1]));
  }
  return `${prefix}-${String(max + 1).padStart(4, "0")}`;
}

async function loadEpisode(id: string): Promise<{ file: string; episode: Episode }> {
  if (!/^EPD-\d{4}$/.test(id)) throw new Error("Invalid episode id");
  const file = path.join(DEVELOPMENT_DIR, "episodes", `${id}.json`);
  return { file, episode: await readJson<Episode>(file) };
}

async function recordDecision(decision: Record<string, unknown>): Promise<string> {
  const id = await nextId("decisions", "REV");
  await writeJson(path.join(DEVELOPMENT_DIR, "decisions", `${id}.json`), {
    schema_version: 1,
    id,
    record_type: "review_decision",
    reviewer_role: "chathura",
    created_at: today(),
    ...decision,
  });
  return id;
}

/** Records Chathura's location choice for an episode. Only a person using the dashboard can call this. */
export async function selectLocation(formData: FormData) {
  const { file, episode } = await loadEpisode(String(formData.get("episode_id")));
  const choice = String(formData.get("choice") ?? "");
  const reveal = String(formData.get("name_reveal_policy") ?? "undecided");
  const note = String(formData.get("note") ?? "").trim();
  if (!REVEAL_POLICIES.has(reveal)) throw new Error("Invalid reveal policy");

  let name: string;
  let region: string;
  let origin: "ai_suggestion_chosen_by_chathura" | "entered_by_chathura";
  if (choice.startsWith("s:")) {
    const suggestion = episode.location.suggestions[Number(choice.slice(2))];
    if (!suggestion) throw new Error("Unknown suggestion");
    ({ name, region } = suggestion);
    origin = "ai_suggestion_chosen_by_chathura";
  } else {
    name = String(formData.get("custom_name") ?? "").trim();
    region = String(formData.get("custom_region") ?? "").trim();
    origin = "entered_by_chathura";
    if (!name) throw new Error("Enter a location name");
  }

  const placeId = await nextId("locations", "LOC");
  const decisionId = await recordDecision({
    decision_type: "location_selection",
    target: { record_id: episode.id, version: episode.version },
    outcome: { selected_location_id: placeId, name, region, name_reveal_policy: reveal },
    note,
  });
  await writeJson(path.join(DEVELOPMENT_DIR, "locations", `${placeId}.json`), {
    schema_version: 1,
    id: placeId,
    record_type: "location",
    title: name,
    name,
    region,
    origin,
    note,
    decision_id: decisionId,
    status: "approved",
    version: 1,
    created_at: today(),
    updated_at: today(),
    created_by: "chathura",
    updated_by: "chathura",
  });

  episode.location = {
    ...episode.location,
    selected_location_id: placeId,
    selected_location_decision_id: decisionId,
    selection_status: "selected",
    name_reveal_policy: reveal,
  };
  episode.version += 1;
  episode.updated_at = today();
  episode.updated_by = "chathura";
  await writeJson(file, episode);
  revalidatePath("/", "layout");
}

export async function clearLocation(formData: FormData) {
  const { file, episode } = await loadEpisode(String(formData.get("episode_id")));
  const decisionId = await recordDecision({
    decision_type: "location_cleared",
    target: { record_id: episode.id, version: episode.version },
    outcome: { previous_location_id: episode.location.selected_location_id },
    note: String(formData.get("note") ?? "").trim(),
  });
  episode.location = {
    ...episode.location,
    selected_location_id: null,
    selected_location_decision_id: decisionId,
    selection_status: "awaiting_chathura",
  };
  episode.version += 1;
  episode.updated_at = today();
  episode.updated_by = "chathura";
  await writeJson(file, episode);
  revalidatePath("/", "layout");
}
