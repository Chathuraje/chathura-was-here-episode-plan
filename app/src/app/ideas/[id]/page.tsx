import Link from "next/link";
import { notFound } from "next/navigation";
import { getData } from "@/lib/content";
import { listLeads } from "@/lib/leads";
import { docHref } from "@/lib/routes";
import Markdown from "@/components/Markdown";
import { Box, Chip, Chips, GraphLink, ScoreBars, StatusBadge, TierBadge } from "@/components/ui";

export default async function IdeaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const d = await getData();
  const idea = d.ideas.get(id);
  if (!idea) notFound();
  const concept = d.concepts.get(idea.primaryConcept);
  const territory = idea.territory ? d.territories.get(idea.territory) : undefined;
  const leads = (await listLeads()).filter((l) => l.leadIdeaId === id || l.supportingIdeaIds.includes(id));
  const relatedBack = [...d.ideas.values()].filter((i) => i.related.includes(id) && !idea.related.includes(i.id)).map((i) => i.id);
  // Body without the duplicated H1 and status line.
  const body = idea.body.replace(/^#\s.+\n+/, "");

  return (
    <div className="split">
      <article>
        <div className="kicker">03 · Idea card</div>
        <h1>{idea.id} — {idea.title}</h1>
        <div className="row" style={{ marginBottom: 12 }}>
          <StatusBadge status={idea.status} />
          <TierBadge tier={idea.score?.tier} />
          {idea.shortlist ? <Chip id={idea.shortlist} label="Shortlisted" /> : null}
          <GraphLink id={idea.id} />
          <Link className="btn" href={docHref(idea.path)}>Open file</Link>
        </div>
        {idea.mergedInto ? (
          <div className="notice">This card is a merged alias. Its source trace lives in <Chip id={idea.mergedInto} label={d.ideas.get(idea.mergedInto)?.title} />. It is not a separate research candidate.</div>
        ) : null}
        {idea.status === "held" ? <div className="notice">Held cards need a fidelity or safety decision and are not research candidates.</div> : null}
        {idea.openQuestion ? <p className="question">{idea.openQuestion}</p> : null}
        <section className="card">
          <Markdown text={body} docPath={idea.path} />
        </section>
      </article>

      <aside className="aside">
        <Box title="Source">
          {concept ? <Chip id={concept.id} label={concept.titleEn} /> : <span className="muted">Unknown</span>}
          {idea.supportingConcepts.length ? (
            <div style={{ marginTop: 8 }}>
              <div className="small muted">Supporting concepts</div>
              <Chips d={d} ids={idea.supportingConcepts} />
            </div>
          ) : null}
        </Box>

        {territory ? (
          <Box title="Territory">
            <Chip id={territory.id} label={territory.name} note="primary" />
            {idea.secondaryTerritories.length ? (
              <div style={{ marginTop: 8 }}>
                <div className="small muted">Secondary</div>
                <Chips d={d} ids={idea.secondaryTerritories} />
              </div>
            ) : null}
          </Box>
        ) : null}

        {idea.score ? (
          <Box title="Documentary potential">
            <ScoreBars idea={idea} />
            <p className="small" style={{ marginBottom: 4 }}>{idea.score.reason}</p>
            <p className="small muted" style={{ margin: 0 }}><strong>Caution:</strong> {idea.score.caution}</p>
          </Box>
        ) : null}

        {idea.groups.length ? (
          <Box title="Overlap groups">
            <Chips d={d} ids={idea.groups.map((g) => g.id)} notes={Object.fromEntries(idea.groups.map((g) => [g.id, g.role]))} />
          </Box>
        ) : null}

        {idea.supportsShortlist.length ? (
          <Box title="Supports research questions">
            <Chips d={d} ids={idea.supportsShortlist} />
          </Box>
        ) : null}

        <Box title="Related ideas">
          <Chips d={d} ids={[...idea.related, ...relatedBack]} />
          {idea.aliases.length ? (
            <div style={{ marginTop: 8 }}>
              <div className="small muted">Merged aliases</div>
              <Chips d={d} ids={idea.aliases} />
            </div>
          ) : null}
        </Box>

        <Box title={`Story leads (${leads.length})`} action={idea.shortlist ? <Link className="small" href={`/leads/new?sq=${idea.shortlist}`}>+ New lead</Link> : undefined}>
          <Chips d={d} ids={leads.map((l) => l.id)} empty="No leads yet" notes={Object.fromEntries(leads.map((l) => [l.id, l.researchStatus]))} />
        </Box>
      </aside>
    </div>
  );
}
