import { notFound } from "next/navigation";
import { getData } from "@/lib/content";
import Markdown from "@/components/Markdown";
import { Box, Chip, Chips, GraphLink } from "@/components/ui";

export default async function GroupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const d = await getData();
  const g = d.groups.get(id);
  if (!g) notFound();
  const members = [g.lead, ...g.supporting, ...g.related].filter(Boolean) as string[];

  return (
    <div className="split">
      <article>
        <div className="kicker">04 · Overlap group {g.id}</div>
        <h1>{g.theme}</h1>
        <div className="row" style={{ marginBottom: 12 }}>
          <span className="badge">{g.kind}</span>
          <GraphLink id={g.id} />
        </div>
        <section className="card">
          <Markdown text={g.body || "_No detail recorded._"} docPath={g.file} />
        </section>
        <h2>Cards side by side</h2>
        <div className="grid grid-2">
          {members.map((i) => {
            const idea = d.ideas.get(i);
            if (!idea) return null;
            const role = i === g.lead ? "lead" : g.supporting.includes(i) ? "supporting" : "related";
            return (
              <section className="card" key={i}>
                <div className="row" style={{ justifyContent: "space-between" }}>
                  <Chip id={i} />
                  <span className="muted small">{role}</span>
                </div>
                <h3 style={{ margin: "8px 0 4px" }}>{idea.title}</h3>
                <p className="small" style={{ margin: "0 0 6px" }}>{idea.coreIdea}</p>
                <p className="small muted" style={{ margin: 0 }}><em>{idea.openQuestion}</em></p>
              </section>
            );
          })}
        </div>
      </article>
      <aside className="aside">
        <Box title="Lead card">{g.lead ? <Chip id={g.lead} label={d.ideas.get(g.lead)?.title} /> : <span className="muted small">No lead: research separately</span>}</Box>
        <Box title="Supporting (travel with the lead)"><Chips d={d} ids={g.supporting} /></Box>
        <Box title="Related, kept separate"><Chips d={d} ids={g.related} /></Box>
      </aside>
    </div>
  );
}
