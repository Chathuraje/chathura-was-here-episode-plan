import Link from "next/link";
import { notFound } from "next/navigation";
import { getData } from "@/lib/content";
import { getLead } from "@/lib/leads";
import { docHref } from "@/lib/routes";
import Markdown from "@/components/Markdown";
import { Box, Chip, Chips, GraphLink, StatusBadge } from "@/components/ui";

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const d = await getData();
  const lead = await getLead(id);
  if (!lead) notFound();
  const sq = d.shortlist.get(lead.shortlistQuestion);

  return (
    <div className="split">
      <article>
        <div className="kicker">05 · Story lead</div>
        <h1>{lead.id} — {lead.description}</h1>
        <div className="row" style={{ marginBottom: 12 }}>
          <StatusBadge status={lead.researchStatus} />
          <span className="badge">{lead.screenplayReadiness}</span>
          <Link className="btn btn-primary" href={`/leads/${lead.id}/edit`}>Edit</Link>
          <GraphLink id={lead.id} />
          {lead.file ? <Link className="btn" href={docHref(lead.file)}>Open file</Link> : null}
        </div>
        {lead.researchStatus !== "verified" ? (
          <div className="notice" style={{ marginBottom: 12 }}>
            <strong>Unverified.</strong> Do not treat anything here as fact unless it appears under <em>Verified facts</em> with a source.
          </div>
        ) : null}
        <div className="grid">
          {lead.sections.map((s) => (
            <section className="card" key={s.heading}>
              <h3 style={{ marginTop: 0 }}>{s.heading}</h3>
              <Markdown text={s.content || "_Not yet recorded._"} docPath={lead.file} />
            </section>
          ))}
        </div>
      </article>
      <aside className="aside">
        <Box title="Research question">{sq ? <Chip id={sq.id} label={sq.heading} /> : lead.shortlistQuestion}</Box>
        <Box title="Lead idea"><Chips d={d} ids={[lead.leadIdeaId]} /></Box>
        <Box title="Supporting ideas"><Chips d={d} ids={lead.supportingIdeaIds} /></Box>
        <Box title="Territory"><Chips d={d} ids={lead.territory ? [lead.territory] : []} /></Box>
        <Box title="Record">
          <div className="small">Opened {lead.dateOpened || "—"} · Updated {lead.lastUpdated || "—"}</div>
          <div className="small">Researcher: {lead.researcher || "—"}</div>
        </Box>
      </aside>
    </div>
  );
}
