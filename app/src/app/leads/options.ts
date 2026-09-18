import { getData } from "@/lib/content";
import { nextLeadId } from "@/lib/leads";
import type { PickOption, SqOption } from "./LeadForm";

export async function shortlistOptions(): Promise<SqOption[]> {
  const d = await getData();
  return Promise.all(
    [...d.shortlist.values()].map(async (s) => ({
      id: s.id,
      heading: s.heading,
      lead: s.lead,
      supporting: s.supporting,
      territory: s.territory,
      question: s.question,
      nextId: await nextLeadId(s.id),
    })),
  );
}

/** Accepted ideas and territories for the editor's pickers. */
export async function pickOptions(): Promise<{ ideas: PickOption[]; territories: PickOption[] }> {
  const d = await getData();
  return {
    ideas: [...d.ideas.values()].filter((i) => i.status === "accepted for research").map((i) => ({ id: i.id, label: i.title })),
    territories: [...d.territories.values()].map((t) => ({ id: t.id, label: t.name })),
  };
}
