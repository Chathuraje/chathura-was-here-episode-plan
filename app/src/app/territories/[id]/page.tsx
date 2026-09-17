import { notFound } from "next/navigation";
import { getData } from "@/lib/content";
import Markdown from "@/components/Markdown";
import { Box, Chips, GraphLink } from "@/components/ui";

export default async function TerritoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const d = await getData();
  const t = d.territories.get(id);
  if (!t) notFound();
  const byTier = (tier: string) => t.primary.filter((i) => d.ideas.get(i)?.score?.tier === tier);
  const groups = [...d.groups.values()].filter((g) => [g.lead, ...g.supporting, ...g.related].some((i) => i && t.primary.includes(i))).map((g) => g.id);

  return (
    <div className="split">
      <article>
        <div className="kicker">04 · Territory {t.id}</div>
        <h1>{t.name}</h1>
        <div className="row" style={{ marginBottom: 12 }}><GraphLink id={t.id} /></div>
        <section className="card">
          <Markdown text={t.body} docPath="content/04-story-discovery/philosophy-map.md" />
        </section>
      </article>
      <aside className="aside">
        <Box title="Research questions">
          <Chips d={d} ids={t.shortlist} empty="None shortlisted" />
        </Box>
        {["Tier A", "Tier B", "Tier C", "Do not advance"].map((tier) => {
          const ids = byTier(tier);
          return ids.length ? (
            <Box key={tier} title={`${tier} · ${ids.length}`}>
              <Chips d={d} ids={ids} />
            </Box>
          ) : null;
        })}
        <Box title="Secondary ideas">
          <Chips d={d} ids={t.secondary} />
        </Box>
        <Box title="Overlap groups touching this territory">
          <Chips d={d} ids={groups} />
        </Box>
      </aside>
    </div>
  );
}
