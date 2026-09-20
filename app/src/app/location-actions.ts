"use server";

import fs from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { DEVELOPMENT_DIR, IDEA_REVIEW_STATUSES, type Coordinates, type Idea, type IdeaReviewStatus, type Place } from "@/lib/development";
import { isOnIsland } from "@/lib/sri-lanka";

const today = () => new Date().toISOString().slice(0, 10);

/** Reads a map pin off a form. Coordinates are optional: a location may exist before it is placed. */
function readCoordinates(formData: FormData): Coordinates | null {
  const lat = Number(String(formData.get("lat") ?? "").trim());
  const lng = Number(String(formData.get("lng") ?? "").trim());
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  const point = { lat, lng };
  return isOnIsland(point) ? point : null;
}

/** Writes a new location record and returns its ID. */
async function writeLocation(fields: { name: string; region: string; note: string; coordinates: Coordinates | null }): Promise<string> {
  const id = await nextId("locations", "LOC");
  await writeJson(locationFile(id), {
    schema_version: 1,
    id,
    record_type: "location",
    title: fields.name,
    name: fields.name,
    region: fields.region,
    origin: "entered_by_chathura",
    note: fields.note,
    coordinates: fields.coordinates,
    decision_id: null,
    status: "approved",
    version: 1,
    created_at: today(),
    updated_at: today(),
    created_by: "chathura",
    updated_by: "chathura",
  });
  return id;
}

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

function locationFile(id: string): string {
  if (!/^LOC-\d{4}$/.test(id)) throw new Error("Invalid location id");
  return path.join(DEVELOPMENT_DIR, "locations", `${id}.json`);
}

function ideaFile(id: string): string {
  if (!/^IDEA-\d{4}$/.test(id)) throw new Error("Invalid idea id");
  return path.join(DEVELOPMENT_DIR, "ideas", `${id}.json`);
}

async function allIdeas(): Promise<{ file: string; idea: Idea }[]> {
  const dir = path.join(DEVELOPMENT_DIR, "ideas");
  const names = (await fs.readdir(dir).catch(() => [] as string[])).filter((name) => name.endsWith(".json"));
  return Promise.all(names.map(async (name) => {
    const file = path.join(dir, name);
    return { file, idea: await readJson<Idea>(file) };
  }));
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

/** Creates a location Chathura can then attach to any number of ideas. Only a person using the dashboard can call this. */
export async function createLocation(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const region = String(formData.get("region") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();
  if (!name) throw new Error("Enter a location name");

  await writeLocation({ name, region, note, coordinates: readCoordinates(formData) });
  revalidatePath("/", "layout");
}

/** Moves a saved location to the point Chathura clicked on the map. */
export async function placeLocation(formData: FormData) {
  const file = locationFile(String(formData.get("location_id")));
  const place = await readJson<Place>(file);
  const coordinates = readCoordinates(formData);
  if (!coordinates) throw new Error("Pick a point on the island first");

  place.coordinates = coordinates;
  place.version += 1;
  place.updated_at = today();
  place.updated_by = "chathura";
  await writeJson(file, place);
  revalidatePath("/", "layout");
}

export async function updateLocation(formData: FormData) {
  const file = locationFile(String(formData.get("location_id")));
  const place = await readJson<Place & { created_at?: string }>(file);
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Enter a location name");

  place.title = name;
  place.name = name;
  place.region = String(formData.get("region") ?? "").trim();
  place.note = String(formData.get("note") ?? "").trim();
  place.coordinates = readCoordinates(formData) ?? place.coordinates ?? null;
  place.version += 1;
  place.updated_at = today();
  place.updated_by = "chathura";
  await writeJson(file, place);
  revalidatePath("/", "layout");
}

/** Deletes a location and detaches it from every idea that pointed at it. */
export async function deleteLocation(formData: FormData) {
  const id = String(formData.get("location_id"));
  await fs.rm(locationFile(id), { force: true });
  for (const { file, idea } of await allIdeas()) {
    if (idea.location?.location_id !== id) continue;
    idea.location = { location_id: null, note: idea.location.note ?? "", set_at: today(), set_by: "chathura" };
    idea.version += 1;
    idea.updated_at = today();
    idea.updated_by = "chathura";
    await writeJson(file, idea);
  }
  revalidatePath("/", "layout");
}

async function attachLocation(ideaId: string, locationId: string, note: string) {
  const file = ideaFile(ideaId);
  const idea = await readJson<Idea>(file);

  let decisionId: string | null = null;
  if (locationId) {
    const place = await readJson<Place>(locationFile(locationId));
    decisionId = await recordDecision({
      decision_type: "idea_location_selection",
      target: { record_id: idea.id, version: idea.version },
      outcome: { selected_location_id: place.id, name: place.name, region: place.region },
      note,
    });
  }

  idea.location = {
    location_id: locationId || null,
    decision_id: decisionId,
    note,
    set_at: today(),
    set_by: "chathura",
  };
  idea.version += 1;
  idea.updated_at = today();
  idea.updated_by = "chathura";
  await writeJson(file, idea);
  revalidatePath("/", "layout");
}

/** Records Chathura's choice of an already-saved location for an idea. AI tools never call this. */
export async function setIdeaLocation(formData: FormData) {
  await attachLocation(
    String(formData.get("idea_id")),
    String(formData.get("location_id") ?? "").trim(),
    String(formData.get("note") ?? "").trim(),
  );
}

/** Creates a location from the idea page and attaches it in the same step. It then shows up in the Locations tab. */
export async function createLocationForIdea(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Enter a location name");
  const locationId = await writeLocation({
    name,
    region: String(formData.get("region") ?? "").trim(),
    note: String(formData.get("location_note") ?? "").trim(),
    coordinates: readCoordinates(formData),
  });
  await attachLocation(String(formData.get("idea_id")), locationId, String(formData.get("note") ?? "").trim());
}

/** Records Chathura's confirm / pending / reject verdict on an idea. */
export async function setIdeaReview(formData: FormData) {
  const file = ideaFile(String(formData.get("idea_id")));
  const idea = await readJson<Idea>(file);
  const status = String(formData.get("status") ?? "") as IdeaReviewStatus;
  if (!IDEA_REVIEW_STATUSES.includes(status)) throw new Error("Invalid review status");

  idea.review = {
    status,
    note: String(formData.get("note") ?? "").trim(),
    decided_at: today(),
    decided_by: "chathura",
  };
  idea.version += 1;
  idea.updated_at = today();
  idea.updated_by = "chathura";
  await writeJson(file, idea);
  revalidatePath("/", "layout");
}
