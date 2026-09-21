"use server";

import fs from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { DEVELOPMENT_DIR, IDEA_REVIEW_STATUSES, type Idea, type IdeaReviewStatus } from "@/lib/development";

const today = () => new Date().toISOString().slice(0, 10);

function ideaFile(id: string): string {
  if (!/^IDEA-\d{4}$/.test(id)) throw new Error("Invalid idea id");
  return path.join(DEVELOPMENT_DIR, "ideas", `${id}.json`);
}

async function readJson<T>(file: string): Promise<T> {
  return JSON.parse(await fs.readFile(file, "utf8")) as T;
}

async function writeJson(file: string, data: unknown) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2) + "\n", "utf8");
}

/**
 * How many ideas a group is allowed to confirm, and how many already are. A group makes a
 * fixed number of films, so confirming is a limited resource: once the quota is full the
 * only way to take a different idea is to release one that is already in.
 */
export async function groupQuota(groupId: string, exclude?: string) {
  const [group, names] = await Promise.all([
    readJson<{ draft_film_count: number }>(path.join(DEVELOPMENT_DIR, "groups", `${groupId}.json`)),
    fs.readdir(path.join(DEVELOPMENT_DIR, "ideas")),
  ]);
  const ideas = await Promise.all(names.filter((name) => name.endsWith(".json"))
    .map((name) => readJson<Idea>(path.join(DEVELOPMENT_DIR, "ideas", name))));
  const confirmed = ideas.filter((entry) => entry.group_id === groupId
    && entry.review?.status === "confirmed" && entry.id !== exclude).length;
  return { cap: group.draft_film_count, confirmed, full: confirmed >= group.draft_film_count };
}

/**
 * Chathura's confirm / pending / reject verdict on an idea. This is the only verdict there
 * is: the idea's sequence is built from its proposed place, so confirming the idea accepts
 * that place with it and rejecting it sends both back to be rewritten.
 *
 * Confirming is capped at the group's film count. The cap is enforced here rather than only
 * in the form, because the form can be bypassed and the count has to stay true.
 */
export async function setIdeaReview(formData: FormData) {
  const file = ideaFile(String(formData.get("idea_id")));
  const idea = await readJson<Idea>(file);
  const status = String(formData.get("status") ?? "") as IdeaReviewStatus;
  if (!IDEA_REVIEW_STATUSES.includes(status)) throw new Error("Invalid review status");

  if (status === "confirmed") {
    // Excluding this idea keeps re-saving an already-confirmed one from tripping its own cap.
    const { cap, confirmed, full } = await groupQuota(idea.group_id, idea.id);
    if (full) {
      throw new Error(`${idea.group_id} already has its ${cap} confirmed idea${cap === 1 ? "" : "s"} `
        + `(${confirmed} of ${cap}). Release one before confirming another.`);
    }
  }

  idea.review = {
    status,
    note: String(formData.get("note") ?? "").trim(),
    decided_at: status === "pending" ? null : today(),
    decided_by: status === "pending" ? null : "chathura",
  };
  idea.version += 1;
  idea.updated_at = today();
  idea.updated_by = "chathura";
  await writeJson(file, idea);
  revalidatePath("/", "layout");
}
