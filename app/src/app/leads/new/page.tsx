import Link from "next/link";
import { templateLead, writesEnabled } from "@/lib/leads";
import LeadForm from "../LeadForm";
import { pickOptions, shortlistOptions } from "../options";

export default async function NewLeadPage({ searchParams }: { searchParams: Promise<{ sq?: string }> }) {
  const { sq = "" } = await searchParams;
  const template = await templateLead();
  const options = await shortlistOptions();
  const chosen = options.find((o) => o.id === sq);

  return (
    <>
      <div className="kicker">05 · Story leads</div>
      <h1>New story lead</h1>
      <p className="lede">
        Record one real possibility found while researching a shortlisted question. It will be saved as <strong>unverified</strong>. Keep verified facts, participant accounts and unverified claims in their own sections.
        {chosen ? <> Research brief: <Link href={`/shortlist/${chosen.id}`}>{chosen.id}</Link>.</> : null}
      </p>
      <LeadForm
        options={options}
        {...await pickOptions()}
        writable={writesEnabled()}
        initial={{
          id: chosen?.nextId ?? "",
          description: "",
          dateOpened: template.dateOpened,
          researcher: "",
          shortlistQuestion: chosen?.id ?? "",
          leadIdeaId: chosen?.lead ?? "",
          supportingIdeaIds: chosen?.supporting ?? [],
          territory: chosen?.territory ?? "",
          review: template.review,
          researchStatus: "unverified",
          screenplayReadiness: "not ready",
          sections: template.sections,
        }}
      />
    </>
  );
}
