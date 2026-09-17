import { getData } from "@/lib/content";
import { nextLeadId } from "@/lib/leads";
import type { SqOption } from "./LeadForm";

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
