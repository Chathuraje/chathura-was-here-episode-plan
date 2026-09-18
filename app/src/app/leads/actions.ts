"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getData } from "@/lib/content";
import { LEAD_ID_RE, READINESS, RESEARCH_STATUSES, getLead, today, writeLead, writesEnabled, type Lead } from "@/lib/leads";

export type SaveState = { error?: string };

function setLine(content: string, label: string, value: string) {
  const re = new RegExp(`(\\*\\*${label.replace(/[()]/g, "\\$&")}:\\*\\*)[^\\n]*`);
  return re.test(content) ? content.replace(re, `$1 ${value}`) : content;
}

export async function saveLead(_prev: SaveState, form: FormData): Promise<SaveState> {
  if (!writesEnabled()) return { error: "The explorer is running read-only (EXPLORER_READ_ONLY=1). Leads cannot be saved." };

  const d = await getData();
  const str = (k: string) => String(form.get(k) ?? "").trim();
  const originalId = str("originalId");
  const id = str("id");
  const sq = str("shortlistQuestion");
  const item = d.shortlist.get(sq);

  if (!LEAD_ID_RE.test(id)) return { error: "Lead ID must look like SL-SQ05-001." };
  if (!item) return { error: "Choose a shortlist question." };
  if (!id.startsWith(`SL-${sq}-`)) return { error: `Lead ID must start with SL-${sq}- to match the shortlist question.` };
  if (!str("description")) return { error: "Add a short plain description (no personal names without consent)." };

  const previous = originalId ? await getLead(originalId) : null;
  if (id !== originalId && (await getLead(id))) return { error: `${id} already exists. Choose another number.` };

  const researchStatus = str("researchStatus");
  const readiness = str("screenplayReadiness");
  if (!(RESEARCH_STATUSES as readonly string[]).includes(researchStatus)) return { error: "Unknown research status." };
  if (!(READINESS as readonly string[]).includes(readiness)) return { error: "Unknown screenplay readiness value." };
  if (readiness !== "not ready" && researchStatus !== "verified") {
    return { error: "Screenplay readiness can only move past “not ready” once the research status is “verified”." };
  }

  const supporting = str("supportingIdeaIds").split(/[\s,]+/).filter(Boolean);
  const unknown = supporting.filter((i) => !d.ideas.has(i));
  if (unknown.length) return { error: `Unknown idea IDs: ${unknown.join(", ")}` };

  const count = Number(form.get("sectionCount") ?? 0);
  const sections = Array.from({ length: count }, (_, i) => ({
    heading: str(`sectionHeading_${i}`),
    content: String(form.get(`sectionContent_${i}`) ?? "").replace(/\r\n/g, "\n"),
  }));

  const territory = d.territories.get(item.territory);
  for (const s of sections) {
    if (/^1\.\s/.test(s.heading)) {
      s.content = setLine(s.content, "Lead idea ID", item.lead);
      s.content = setLine(s.content, "Supporting idea IDs", supporting.join(", ") || "none");
      s.content = setLine(s.content, "Human territory", territory ? `${territory.id} ${territory.name}` : item.territory);
      s.content = s.content.replace(/(\*\*Open question \(as carried from the shortlist\):\*\*\n)>[ \t]*(\n|$)/, `$1> ${item.question}$2`);
    }
    if (/^20\.\s/.test(s.heading)) {
      s.content = setLine(s.content, "Current status", researchStatus);
      if (!previous) s.content = s.content.replace("- YYYY-MM-DD — opened as unverified.", `- ${today()} — opened as ${researchStatus}.`);
      if (previous && previous.researchStatus !== researchStatus) {
        s.content = s.content.replace(/(\*\*Status history:\*\*\n(?:- .*\n?)*)/, (m) => `${m.replace(/\n?$/, "\n")}- ${today()} — status changed from ${previous.researchStatus} to ${researchStatus}.\n`);
      }
    }
    if (/^22\.\s/.test(s.heading)) s.content = setLine(s.content, "Readiness", readiness);
  }

  const lead: Lead = {
    id,
    description: str("description"),
    dateOpened: str("dateOpened") || today(),
    researcher: str("researcher"),
    shortlistQuestion: sq,
    leadIdeaId: item.lead,
    supportingIdeaIds: supporting,
    territory: item.territory,
    researchStatus,
    screenplayReadiness: readiness,
    lastUpdated: today(),
    sections,
  };

  try {
    await writeLead(lead, previous);
  } catch (e) {
    return { error: `Could not write the file: ${(e as Error).message}` };
  }
  revalidatePath("/", "layout");
  redirect(`/leads/${id}`);
}
