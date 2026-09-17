import { getData } from "./content";
import { listLeads } from "./leads";

export type NodeType = "concept" | "idea" | "territory" | "group" | "shortlist" | "lead";

export type GNode = {
  id: string;
  type: NodeType;
  label: string;
  sub?: string; // status or tier
  chapter?: number;
  size: number;
};

export type GLink = { source: string; target: string; kind: string };

export async function buildGraph(): Promise<{ nodes: GNode[]; links: GLink[] }> {
  const d = await getData();
  const leads = await listLeads();
  const nodes: GNode[] = [];
  const links: GLink[] = [];
  const has = new Set<string>();
  const add = (n: GNode) => { nodes.push(n); has.add(n.id); };
  const link = (source: string, target: string, kind: string) => { if (has.has(source) && has.has(target)) links.push({ source, target, kind }); };

  for (const c of d.concepts.values()) add({ id: c.id, type: "concept", label: c.titleEn || c.titleSi, sub: c.status, chapter: c.chapter, size: 3 });
  for (const t of d.territories.values()) add({ id: t.id, type: "territory", label: t.name, size: 9 });
  for (const g of d.groups.values()) add({ id: g.id, type: "group", label: g.theme, sub: g.kind, size: 4 });
  for (const s of d.shortlist.values()) add({ id: s.id, type: "shortlist", label: s.heading, size: 6 });
  for (const i of d.ideas.values()) {
    const tier = i.score?.tier;
    const size = tier === "Tier A" ? 5 : tier === "Tier B" ? 4 : i.status === "accepted for research" ? 3 : 2;
    add({ id: i.id, type: "idea", label: i.title, sub: i.status === "accepted for research" ? tier ?? i.status : i.status, chapter: d.concepts.get(i.primaryConcept)?.chapter, size });
  }
  for (const l of leads) add({ id: l.id, type: "lead", label: l.description, sub: l.researchStatus, size: 5 });

  for (const i of d.ideas.values()) {
    link(i.primaryConcept, i.id, "source");
    i.supportingConcepts.forEach((c) => link(c, i.id, "supporting source"));
    if (i.territory) link(i.id, i.territory, "primary territory");
    i.secondaryTerritories.forEach((t) => link(i.id, t, "secondary territory"));
    if (i.mergedInto) link(i.id, i.mergedInto, "merged into");
    i.related.forEach((r) => { if (r < i.id || !d.ideas.get(r)?.related.includes(i.id)) link(i.id, r, "related"); });
  }
  for (const g of d.groups.values()) {
    if (g.lead) link(g.lead, g.id, "group lead");
    g.supporting.forEach((i) => link(i, g.id, "group supporting"));
    g.related.forEach((i) => link(i, g.id, "group related"));
  }
  for (const s of d.shortlist.values()) {
    link(s.id, s.lead, "question lead");
    s.supporting.forEach((i) => link(s.id, i, "question supporting"));
    link(s.id, s.territory, "question territory");
  }
  for (const l of leads) {
    link(l.id, l.shortlistQuestion, "lead question");
    link(l.id, l.leadIdeaId, "lead idea");
  }
  return { nodes, links };
}
