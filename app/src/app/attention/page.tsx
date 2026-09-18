import Link from "next/link";
import { ISSUE_TYPES, getSeries, seriesCounts } from "@/lib/series";
import { Counts, StoryLink } from "@/components/series-ui";

export default async function AttentionPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type = "" } = await searchParams;
  const s = await getSeries();
  const types = ISSUE_TYPES.map((t) => ({ ...t, stories: s.stories.filter((st) => st.issues.some((i) => i.code === t.code)) }));
  const shown = type ? types.filter((t) => t.code === type) : types.filter((t) => t.stories.length);

  return (
    <>
      <div className="kicker">Series · Needs attention</div>
      <h1>Needs attention</h1>
      <p className="lede">
        Actionable gaps, generated from the lead cards, <code>stories.json</code> and <code>connections.json</code> each time the page loads. Every line is a specific missing item on a specific record. There are no percentages here.
      </p>
      <Counts c={seriesCounts(s)} />

      <h2>Series decisions still open</h2>
      <ul>
        <li><strong>Season 1&apos;s length</strong> is not documented anywhere; 8 episodes is a proposal (CONFLICT-02).</li>
        <li><strong>The ten season pieces</strong> are not documented; no slot has an object (CONFLICT-03).</li>
        <li><strong>Repository visibility.</strong> The GitHub repository is public and this layer, spoiler files included, has been pushed. This app cannot make those files private (CONFLICT-04).</li>
        {s.spoilersHidden ? null : <li><strong>Episode 1&apos;s footage</strong> has not been checked against the Episode 100 Part A material.</li>}
        {s.conflicts.map((c) => <li key={c.id}><Link href={`/series/chronology#${c.id}`}>{c.id}</Link> {c.title} — {c.needs}</li>)}
        <li><strong>Held leads.</strong> Two of the three held leads concern Tamil communities in the north in disputes with the state; that pattern is a portfolio bias for the owner to decide on.</li>
      </ul>

      <h2>By type</h2>
      <div className="filters">
        <Link className={`btn small ${!type ? "btn-primary" : ""}`} href="/attention">All types</Link>
        {types.map((t) => (
          <Link key={t.code} className={`btn small ${type === t.code ? "btn-primary" : ""}`} href={`/attention?type=${t.code}`}>
            {t.label} ({t.stories.length})
          </Link>
        ))}
      </div>
      {shown.map((t) => (
        <section key={t.code} style={{ marginBottom: 18 }}>
          <h3>{t.label} <span className="muted small">({t.stories.length} candidates)</span></h3>
          {t.stories.length ? (
            <div className="table-wrap">
              <table>
                <thead><tr><th>Candidate</th><th>What is missing</th><th>Where to fix it</th></tr></thead>
                <tbody>
                  {t.stories.map((st) => (
                    <tr key={st.id}>
                      <td style={{ minWidth: 240 }}><StoryLink s={st} /></td>
                      <td className="small">{st.issues.filter((i) => i.code === t.code).map((i, n) => <div key={n}>{i.detail}</div>)}</td>
                      <td className="small nowrap">{["premise", "continuity", "calendar"].includes(t.code) ? <span className="muted">stories.json / connections.json</span> : <Link href={`/leads/${st.leadId}/edit`}>Edit lead {st.leadId}</Link>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className="muted small">None.</p>}
        </section>
      ))}
    </>
  );
}
