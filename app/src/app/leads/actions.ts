"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearDataCache, getData } from "@/lib/content";
import { applyLeadEdit, REVIEW_KEYS, type Review } from "@/lib/lead-format";
import { getLead, today, writeLead, writesEnabled } from "@/lib/leads";

export type SaveState = { error?: string };

export async function saveLead(_prev: SaveState, form: FormData): Promise<SaveState> {
  if (!writesEnabled()) return { error: "The explorer is running read-only (EXPLORER_READ_ONLY=1). Leads cannot be saved." };

  const d = await getData();
  const str = (k: string) => String(form.get(k) ?? "").trim();
  const originalId = str("originalId");
  const id = str("id");
  const sq = d.shortlist.get(str("shortlistQuestion"));

  const previous = originalId ? await getLead(originalId) : null;
  if (originalId && !previous) return { error: `${originalId} no longer exists on disk. Reload and try again.` };
  if (id !== originalId && (await getLead(id))) return { error: `${id} already exists. Choose another number.` };

  const count = Number(form.get("sectionCount") ?? 0);
  const review: Partial<Review> = {};
  for (const k of REVIEW_KEYS) if (form.has(k)) review[k] = str(k);

  const result = applyLeadEdit(
    previous,
    {
      originalId,
      id,
      description: str("description"),
      dateOpened: str("dateOpened"),
      researcher: str("researcher"),
      shortlistQuestion: str("shortlistQuestion"),
      leadIdeaId: str("leadIdeaId"),
      supportingIdeaIds: str("supportingIdeaIds").split(/[\s,]+/).filter(Boolean),
      territory: str("territory"),
      researchStatus: str("researchStatus"),
      screenplayReadiness: str("screenplayReadiness"),
      review,
      sections: Array.from({ length: count }, (_, i) => ({
        heading: str(`sectionHeading_${i}`),
        content: String(form.get(`sectionContent_${i}`) ?? "").replace(/\r\n/g, "\n"),
      })),
    },
    {
      today: today(),
      shortlist: sq && { id: sq.id, lead: sq.lead, supporting: sq.supporting, territory: sq.territory, territoryLabel: sq.territory, question: sq.question },
      ideaExists: (i) => d.ideas.has(i),
      territoryLabel: (t) => (d.territories.has(t) ? t : undefined),
    },
  );
  if (result.error || !result.lead) return { error: result.error ?? "Could not build the lead." };

  try {
    await writeLead(result.lead, previous);
  } catch (e) {
    return { error: `Could not write the file: ${(e as Error).message}` };
  }
  clearDataCache();
  revalidatePath("/", "layout");
  redirect(`/leads/${id}`);
}
