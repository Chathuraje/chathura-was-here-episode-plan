"use server";

import fs from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { DEVELOPMENT_DIR, getDevelopment, isScreenplayStageApproved, type ScreenplayVersion } from "@/lib/development";

const today = () => new Date().toISOString().slice(0, 10);

async function nextDecisionId(): Promise<string> {
  const directory = path.join(DEVELOPMENT_DIR, "decisions");
  const names = await fs.readdir(directory).catch(() => [] as string[]);
  let max = 0;
  for (const name of names.filter((entry) => entry.endsWith(".json"))) {
    const text = await fs.readFile(path.join(directory, name), "utf8");
    for (const match of text.matchAll(/REV-(\d{4})/g)) max = Math.max(max, Number(match[1]));
  }
  return `REV-${String(max + 1).padStart(4, "0")}`;
}

export async function recordScreenplayReview(formData: FormData) {
  const screenplayId = String(formData.get("screenplay_id") ?? "").toUpperCase();
  const decision = String(formData.get("decision") ?? "");
  const note = String(formData.get("note") ?? "").trim();
  if (!/^SPV-\d{4}$/.test(screenplayId)) throw new Error("Invalid screenplay version id");
  if (!new Set(["approved", "needs_revision"]).has(decision)) throw new Error("Invalid review decision");

  const dev = await getDevelopment();
  const version = dev.screenplays.find((entry) => entry.id === screenplayId);
  if (!version || version.stage === "post_filming") throw new Error("Only pre-filming screenplay stages can use this review gate");

  const requiredBase: Partial<Record<ScreenplayVersion["stage"], ScreenplayVersion["stage"]>> = {
    scene_outline: "treatment",
    production: "scene_outline",
  };
  const baseStage = requiredBase[version.stage];
  if (baseStage) {
    const base = dev.screenplays.find((entry) => entry.id === version.based_on && entry.stage === baseStage && entry.episode_id === version.episode_id);
    if (!base || !isScreenplayStageApproved(dev, base)) throw new Error(`The ${baseStage.replace("_", " ")} must be approved first`);
  }
  if (version.stage === "production") {
    const episode = dev.episodes.find((entry) => entry.id === version.episode_id);
    if (episode?.research.status !== "sufficient_for_production") throw new Error("Research is not sufficient for production");
  }

  const id = await nextDecisionId();
  const date = today();
  const record = {
    schema_version: 1,
    id,
    record_type: "review_decision",
    title: `${version.stage.replace("_", " ")} review for ${version.id}`,
    status: "recorded",
    version: 1,
    created_at: date,
    updated_at: date,
    created_by: "chathura",
    updated_by: "chathura",
    reviewer_role: "chathura",
    decision_type: "screenplay_stage_approval",
    target: { record_id: version.id, version: version.version },
    outcome: { decision },
    note,
  };
  await fs.mkdir(path.join(DEVELOPMENT_DIR, "decisions"), { recursive: true });
  await fs.writeFile(path.join(DEVELOPMENT_DIR, "decisions", `${id}.json`), `${JSON.stringify(record, null, 2)}\n`, "utf8");
  revalidatePath("/", "layout");
}
