import Link from "next/link";
import { getData } from "@/lib/content";
import { ISSUE_TYPES, getSeries, seriesCounts } from "@/lib/series";
import { Counts, FramingCards } from "@/components/series-ui";
import EpisodeTable, { type EpisodeRow } from "./EpisodeTable";

export default async function EpisodesPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const d = await getData();
  const s = await getSeries();
  const seasonTitle = new Map(s.seasons.map((x) => [x.id, x.title]));

  const rows: EpisodeRow[] = s.stories.map((st) => {
    const f = st.fields;
    const r = st.review;
    return {
      id: st.id,
      leadId: st.leadId,
      episode: st.episode,
      season: st.season,
      seasonTitle: seasonTitle.get(st.season) ?? "",
      pos: st.posInSeason,
      seasonLen: st.seasonLen,
      title: st.title,
      premise: st.premise,
      subject: f?.subject ?? "",
      place: f?.place && f.place !== "not established" ? f.place : "",
      district: f?.district ?? "",
      province: f?.province ?? "",
      primaryIdea: st.primaryIdea,
      primaryIdeaTitle: d.ideas.get(st.primaryIdea)?.title ?? "",
      supportingIdeas: st.supportingIdeas,
      territory: st.territory,
      researchStatus: st.researchStatus,
      candidateStatus: st.candidateStatus,
      stage: st.ladder.stage,
      stageLabel: st.ladder.stageLabel,
      opened: st.ladder.opened,
      total: st.ladder.total,
      access: r ? `Filming access: ${r.filming_access}. Contact made: ${f?.contactMade || "not recorded"}.` : "Not yet established",
      continuity: st.anchor
        ? `Proposed anchor ${st.anchor.rank} (${st.anchor.kind})`
        : st.connections.length ? `Standalone · ${st.connections.length} proposed link${st.connections.length > 1 ? "s" : ""}` : "Standalone · no connection",
      anchorRank: st.anchor?.rank ?? 0,
      connectionCount: st.connections.length,
      mainMissing: st.mainMissing,
      issues: [...new Set(st.issues.map((i) => i.code))],
    };
  });

  const issueTypes = ISSUE_TYPES.filter((t) => rows.some((r) => r.issues.includes(t.code))).map((t) => ({ value: t.code, label: t.label }));

  return (
    <>
      <div className="kicker">Series · Episodes 2–99</div>
      <h1>Episodes</h1>
      <p className="lede">
        {s.stories.length} provisional documentary candidates, one for each of Episodes 2 to 99, in the proposed release order. Each one is a candidate built from desk research, not a finished story.
      </p>
      <Counts c={seriesCounts(s)} />
      <h2 style={{ marginTop: 8 }}>Framing references <span className="muted small">(not counted among the {s.stories.length})</span></h2>
      <FramingCards segments={s.segments} hidden={s.spoilersHidden} />
      <p className="small muted">
        Planning data (release order, seasons, chronology, premises) is read from <code>content/06-series-architecture/data/stories.json</code> and is <strong>read-only here</strong>. Edit that file and run <code>python3 tools/rebuild.py</code>. Research fields come from each lead card; edit those in the <Link href="/leads">lead editor</Link>.
      </p>
      <EpisodeTable
        rows={rows}
        seasons={s.seasons.map((x) => ({ value: x.id, label: `${x.id} — ${x.title}` }))}
        territories={[...d.territories.values()].map((t) => ({ value: t.id, label: `${t.id} ${t.name}` }))}
        issueTypes={issueTypes}
        showContinuity={!s.spoilersHidden}
        initial={Object.fromEntries(Object.entries(sp).filter(([, v]) => typeof v === "string")) as Record<string, string>}
      />
    </>
  );
}
