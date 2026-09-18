import Link from "next/link";
import { getSeries } from "@/lib/series";

export default async function ReleaseOrderPage() {
  const s = await getSeries();
  const total = s.seasons.reduce((n, x) => n + x.episodes, 0);
  return (
    <>
      <div className="kicker">Series · Release order</div>
      <h1>Release order</h1>
      <p className="lede">
        Ten seasons, {total} core episodes including Episode 1, in the order the audience would see them. Episode 100 is separate. Every season, boundary and position here is a proposal.
      </p>
      <div className="notice" style={{ marginBottom: 16 }}>
        Release order, philosophical progression and chronological order are three different things. This page is release order only. {s.spoilersHidden ? null : <>The order events happened in is on the <Link href="/series/chronology">Chronology</Link> page.</>}
      </div>
      <div className="table-wrap" style={{ marginBottom: 20 }}>
        <table>
          <thead><tr><th>Season</th><th>Title</th><th className="num">Declared episodes</th><th className="num">Candidates placed</th><th>Range</th><th>Season piece</th></tr></thead>
          <tbody>
            {s.seasons.map((x) => {
              const eps = s.stories.filter((st) => st.season === x.id).map((st) => st.episode);
              return (
                <tr key={x.id}>
                  <td><a href={`#${x.id}`}>{x.id}</a></td>
                  <td>{x.title}</td>
                  <td className="num">{x.episodes}</td>
                  <td className="num">{eps.length}{x.id === "S01" ? " + Episode 1" : ""}</td>
                  <td>E{x.id === "S01" ? 1 : Math.min(...eps)}–E{Math.max(...eps)}</td>
                  <td className="small">{x.piece} <span className="muted">no object assigned</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="grid">
        {s.seasons.map((x) => {
          const eps = s.stories.filter((st) => st.season === x.id);
          return (
            <section className="card" key={x.id} id={x.id}>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <h2 style={{ margin: 0 }}>{x.id} — {x.title}</h2>
                <span className="badge" style={{ color: "var(--c-lead)" }}>{x.status}</span>
              </div>
              <p className="question">{x.question}</p>
              <p className="small"><strong>Where the season starts:</strong> {x.assumption}</p>
              <p className="small"><strong>Contrasts:</strong> {x.contrasts}</p>
              <p className="small"><strong>Intended shift:</strong> {x.shift}</p>
              <p className="small"><strong>Prepares:</strong> {x.prepares}</p>
              {x.ep1_effect ? <p className="small"><strong>What it is meant to change about Episode 1:</strong> {x.ep1_effect}</p> : null}
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Ep</th><th>Pos</th><th>Working title</th><th>Premise</th><th>Research status</th></tr></thead>
                  <tbody>
                    {x.id === "S01" ? (
                      <tr><td className="ep-num"><Link href="/episodes/SEG-E001">1</Link></td><td className="muted">—</td><td><Link href="/episodes/SEG-E001">Episode 1</Link> <span className="muted small">framing, not a candidate</span></td><td className="small muted">The existing framing documentary.</td><td className="small">—</td></tr>
                    ) : null}
                    {eps.map((st) => (
                      <tr key={st.id}>
                        <td className="ep-num"><Link href={`/episodes/${st.id}`}>{st.episode}</Link></td>
                        <td>{st.posInSeason} of {st.seasonLen}</td>
                        <td><Link href={`/episodes/${st.id}`}>{st.title}</Link> <span className="muted small">{st.id}</span>{st.anchor ? <span className="pill" style={{ marginLeft: 6 }}>proposed anchor</span> : null}</td>
                        <td className="small">{st.premise}</td>
                        <td className="small">{st.ladder.stageLabel}<div className="muted">{st.candidateStatus}</div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      </div>
      <p className="small muted" style={{ marginTop: 16 }}>Positions count candidates only. Season 1 is Episode 1 followed by its candidates, so Episode 2 is candidate 1 of Season 1.</p>
    </>
  );
}
