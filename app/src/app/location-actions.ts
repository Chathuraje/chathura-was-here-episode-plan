"use server";

import fs from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { DEVELOPMENT_DIR, IDEA_REVIEW_STATUSES, type Idea, type IdeaReviewStatus, type Place } from "@/lib/development";
import { parseCoordinates, toCoordinates, type Coordinates } from "@/lib/geo";

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

/**
 * Coordinates are typed in by hand on the idea page, either as one "lat, lng" field
 * or as separate ones. Blank means no pin; anything unparseable is reported rather
 * than silently dropped, so a mistyped pin never lands on the map as a real place.
 */
function readCoordinates(formData: FormData): Coordinates | null {
  const combined = String(formData.get("coordinates") ?? "").trim();
  if (combined) {
    const point = parseCoordinates(combined);
    if (!point) throw new Error("Coordinates must look like 7.2906, 80.6337");
    return point;
  }
  const lat = String(formData.get("lat") ?? "").trim();
  const lng = String(formData.get("lng") ?? "").trim();
  if (!lat && !lng) return null;
  const point = toCoordinates(Number(lat), Number(lng));
  if (!point) throw new Error("Latitude must be between -90 and 90, longitude between -180 and 180");
  return point;
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

/**
 * A location exists only because an idea uses it. Once the last idea lets go of one,
 * its record goes too, rather than being left behind as an orphan on the map.
 */
async function dropIfUnused(locationId: string | null | undefined) {
  if (!locationId) return;
  const ideas = await allIdeas();
  if (ideas.some(({ idea }) => idea.location?.location_id === locationId)) return;
  await fs.rm(locationFile(locationId), { force: true });
}

async function attachLocation(ideaId: string, locationId: string, note: string) {
  const file = ideaFile(ideaId);
  const idea = await readJson<Idea>(file);
  const previous = idea.location?.location_id ?? null;

  let decisionId: string | null = null;
  if (locationId) {
    const place = await readJson<Place>(locationFile(locationId));
    decisionId = await recordDecision({
      decision_type: "idea_location_selection",
      target: { record_id: idea.id, version: idea.version },
      outcome: { selected_location_id: place.id, name: place.name, region: place.region, coordinates: place.coordinates },
      note,
    });
  }

  // An idea holds at most one location, so this replaces the previous one rather than adding to it.
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

  if (previous && previous !== locationId) await dropIfUnused(previous);
  revalidatePath("/", "layout");
}

/** Creates the place an idea will be shot in and attaches it in the same step. AI tools never call this. */
export async function createLocationForIdea(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Enter a location name");
  const coordinates = readCoordinates(formData);

  const id = await nextId("locations", "LOC");
  await writeJson(locationFile(id), {
    schema_version: 1,
    id,
    record_type: "location",
    title: name,
    name,
    region: String(formData.get("region") ?? "").trim(),
    origin: "entered_by_chathura",
    note: String(formData.get("location_note") ?? "").trim(),
    coordinates,
    decision_id: null,
    status: "approved",
    version: 1,
    created_at: today(),
    updated_at: today(),
    created_by: "chathura",
    updated_by: "chathura",
  });
  await attachLocation(String(formData.get("idea_id")), id, String(formData.get("note") ?? "").trim());
}

/** Points an idea at a place another idea already uses, or clears it with an empty value. */
export async function setIdeaLocation(formData: FormData) {
  await attachLocation(
    String(formData.get("idea_id")),
    String(formData.get("location_id") ?? "").trim(),
    String(formData.get("note") ?? "").trim(),
  );
}

/** Edits the place itself: name, region, note and hand-entered coordinates. */
export async function updateLocation(formData: FormData) {
  const file = locationFile(String(formData.get("location_id")));
  const place = await readJson<Place>(file);
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Enter a location name");

  place.title = name;
  place.name = name;
  place.region = String(formData.get("region") ?? "").trim();
  place.note = String(formData.get("location_note") ?? "").trim();
  place.coordinates = readCoordinates(formData);
  place.version += 1;
  place.updated_at = today();
  place.updated_by = "chathura";
  await writeJson(file, place);
  revalidatePath("/", "layout");
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
