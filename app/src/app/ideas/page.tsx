import { getData } from "@/lib/content";
import IdeaTable, { type IdeaRow } from "./IdeaTable";

export default async function IdeasPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const d = await getData();
  const rows: IdeaRow[] = [...d.ideas.values()].map((i) => ({
    id: i.id,
    title: i.title,
    status: i.status,
    mergedInto: i.mergedInto ?? "",
    concept: i.primaryConcept,
    chapter: d.concepts.get(i.primaryConcept)?.chapter ?? 0,
    territory: i.territory ?? "",
    tier: i.score?.tier ?? "",
    total: i.score?.total ?? 0,
    values: i.score?.values ?? [],
    question: i.openQuestion,
    tags: i.tags,
    shortlist: i.shortlist ?? "",
    groups: i.groups.map((g) => `${g.id}:${g.role}`),
  }));
  const territories = [...d.territories.values()].map((t) => ({ id: t.id, name: t.name }));
  return (
    <>
      <div className="kicker">03 · Idea bank</div>
      <h1>Idea bank</h1>
      <p className="lede">
        {d.ideas.size} idea cards. Accepted cards carry documentary-potential scores and a primary territory. Held and merged cards are shown for traceability only.
      </p>
      <IdeaTable
        rows={rows}
        territories={territories}
        initial={{ status: sp.status ?? "accepted for research", tier: sp.tier ?? "", territory: sp.territory ?? "", q: sp.q ?? "", view: sp.view ?? "list" }}
      />
    </>
  );
}
