import Link from "next/link";
import { notFound } from "next/navigation";
import { getData } from "@/lib/content";
import { listLeads } from "@/lib/leads";
import Markdown from "@/components/Markdown";
import { Box, Chip, Chips, GraphLink, StatusBadge } from "@/components/ui";

export default async function ShortlistItemPage({ params }: { params: Promise<{ sq: string }> }) {
  const { sq } = await params;
  const d = await getData();
  const s = d.shortlist.get(sq);
  if (!s) notFound();
  const lead = d.ideas.get(s.lead);
  const territory = d.territories.get(s.territory);
  const leads = (await listLeads()).filter((l) => l.shortlistQuestion === sq);
  const ids = [...d.shortlist.keys()];
  const idx = ids.indexOf(sq);

  return (
    <div className="split">
      <article>
        <div className="kicker">04 · Research question {s.id}</div>
        <h1>{s.heading}</h1>
        <p className="question">{s.question}</p>
        <div className="row" style={{ marginBottom: 14 }}>
          <Link className="btn btn-primary" href={`/leads/new?sq=${s.id}`}>+ New story lead for {s.id}</Link>
          <GraphLink id={s.id} />
        </div>
        <section className="card">
          <Markdown text={s.body} docPath={s.file} />
        </section>
      </article>
      <aside className="aside">
        <Box title="Lead idea">
          {lead ? <Chip id={lead.id} label={lead.title} /> : null}
          {lead?.score ? <p className="small muted" style={{ marginBottom: 0 }}>{lead.score.total}/40 · {lead.score.tier}. {lead.score.caution}</p> : null}
        </Box>
        <Box title="Supporting ideas (carry their limits)"><Chips d={d} ids={s.supporting} empty="None required" /></Box>
        <Box title="Related ideas"><Chips d={d} ids={s.related} /></Box>
        {territory ? <Box title="Territory"><Chip id={territory.id} label={territory.name} /></Box> : null}
        <Box title={`Story leads (${leads.length})`}>
          {leads.length ? (
            <div className="grid">
              {leads.map((l) => (
                <Link key={l.id} href={`/leads/${l.id}`} className="card card-link" style={{ padding: "8px 10px" }}>
                  <div className="row" style={{ justifyContent: "space-between" }}>
                    <span className="id-link">{l.id}</span>
                    <StatusBadge status={l.researchStatus} />
                  </div>
                  <div className="small">{l.description}</div>
                </Link>
              ))}
            </div>
          ) : (
            <span className="muted small">No leads yet.</span>
          )}
        </Box>
        <div className="row">
          {idx > 0 ? <Link className="btn" href={`/shortlist/${ids[idx - 1]}`}>← {ids[idx - 1]}</Link> : null}
          {idx < ids.length - 1 ? <Link className="btn" href={`/shortlist/${ids[idx + 1]}`}>{ids[idx + 1]} →</Link> : null}
        </div>
      </aside>
    </div>
  );
}
