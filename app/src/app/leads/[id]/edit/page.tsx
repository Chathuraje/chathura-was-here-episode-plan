import Link from "next/link";
import { notFound } from "next/navigation";
import { getLead, templateLead, writesEnabled } from "@/lib/leads";
import LeadForm from "../../LeadForm";
import { pickOptions, shortlistOptions } from "../../options";

export default async function EditLeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await getLead(id);
  if (!lead) notFound();
  const template = await templateLead();
  // Keep any template sections missing from an older file.
  const sections = template.sections.map((t) => lead.sections.find((s) => s.heading === t.heading) ?? t);
  const extra = lead.sections.filter((s) => !template.sections.some((t) => t.heading === s.heading));

  return (
    <>
      <div className="kicker">05 · Story leads</div>
      <h1>Edit {lead.id}</h1>
      <p className="lede"><Link href={`/leads/${lead.id}`}>Back to the lead</Link></p>
      <LeadForm
        originalId={lead.id}
        options={await shortlistOptions()}
        {...await pickOptions()}
        writable={writesEnabled()}
        initial={{
          id: lead.id,
          description: lead.description,
          dateOpened: lead.dateOpened,
          researcher: lead.researcher,
          shortlistQuestion: lead.shortlistQuestion,
          leadIdeaId: lead.leadIdeaId,
          supportingIdeaIds: lead.supportingIdeaIds,
          territory: lead.territory,
          review: lead.review,
          researchStatus: lead.researchStatus,
          screenplayReadiness: lead.screenplayReadiness,
          sections: [...sections, ...extra],
        }}
      />
    </>
  );
}
