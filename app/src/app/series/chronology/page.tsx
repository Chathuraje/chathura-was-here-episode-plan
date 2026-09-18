import Link from "next/link";
import { notFound } from "next/navigation";
import { getSeries, segmentLabel } from "@/lib/series";
import { Claim } from "@/components/ui";
import { EndLink, StoryLink } from "@/components/series-ui";

export default async function ChronologyPage() {
  const s = await getSeries();
  if (s.spoilersHidden) notFound(); // enforced on the server, not by hiding a link
  const byPhase = new Map(s.phases.map((p) => [p.id, s.stories.filter((st) => st.chronPhase === p.id)]));
  const reported = s.connections.filter((x) => x.family === "chronological" && x.status !== "proposal");
  const proposedLinks = s.connections.filter((x) => x.family === "chronological" && x.status === "proposal");
  const fixed = s.stories.filter((st) => st.chronConfidence === "fixed-date");

  return (
    <>
      <div className="kicker">Series · Hidden chronology · spoiler-sensitive</div>
      <h1>Hidden chronology</h1>
      <p className="lede">
        The order events would have happened in, as opposed to the order they are released. Only the framing sequence is fixed. Everything else is a partial, proposed order: stories inside a phase are not ordered, and no date is claimed for any of them.
      </p>
      <div className="legend-kinds">
        <span className="lk-verified">Fixed by the owner</span>
        <span className="lk-reported">Reported in sources, not verified</span>
        <span className="lk-proposal">Proposed</span>
        <span className="lk-missing">Unresolved conflict</span>
      </div>

      <div className="grid">
        <Claim kind="verified" title="Fixed: the framing sequence">
          <div className="seq" style={{ fontSize: "1.05rem" }}>
            <span className="muted">… the 98 candidates, partially ordered (proposal) …</span>
            {["SEG-E100A", "SEG-E001", "SEG-E100B"].map((id) => (
              <span key={id} className="row"><span className="arrow">→</span><Link href={`/episodes/${id}`}><strong>{segmentLabel(id)}</strong></Link></span>
            ))}
          </div>
          <p className="small">Episode 100 Part A supplies what happened before Episode 1; Episode 1 is the destination of the journey though it is released first; Episode 100 Part B continues from Episode 1&apos;s forest ending. This sequence is user-supplied canon; nothing else in the repository documents it.</p>
          <p className="small muted">Episode 1&apos;s actual footage has not been checked against the Part A material. If they disagree, Part A changes, not Episode 1.</p>
        </Claim>

        <Claim kind="reported" title={`Reported in sources (${reported.length})`}>
          <p className="small">Chronological links whose basis is in published reporting, seen only as search results. None has been confirmed.</p>
          <ul className="small">
            {reported.map((x) => (
              <li key={x.id}><Link href={`/series/connections?cx=${x.id}`}>{x.id}</Link> <EndLink id={x.from_id} series={s} /> → <EndLink id={x.to_id} series={s} /> — {x.explanation}</li>
            ))}
          </ul>
        </Claim>

        <Claim kind="missing" title={`Calendar conflicts (${s.conflicts.length}, unresolved)`}>
          <p className="small">{fixed.length} of {s.stories.length} candidates are labelled <code>fixed-date</code>, and several of those dates cannot all be met in one pass through the island. These are recorded, not resolved, and no date has been invented to make them fit.</p>
          {s.conflicts.map((c) => (
            <div key={c.id} id={c.id} style={{ margin: "10px 0" }}>
              <strong>{c.id} — {c.title}</strong> <span className="pill">{c.status}</span>
              <p className="small" style={{ margin: "4px 0" }}>{c.detail}</p>
              {c.stories.length ? <div className="chips" style={{ margin: "4px 0" }}>{c.stories.map((id) => <EndLink key={id} id={id} series={s} />)}</div> : null}
              <p className="small muted" style={{ margin: "4px 0" }}><strong>Needed:</strong> {c.needs}</p>
            </div>
          ))}
        </Claim>

        <Claim kind="proposal" title="Proposed phases (a partial order)">
          <p className="small">Phases are ordered relative to one another; stories inside a phase are not. P7 claims no position at all.</p>
          <div className="seq small" style={{ margin: "6px 0 12px" }}>
            {s.phases.map((p, i) => (
              <span key={p.id} className="row">{i ? <span className="arrow">{p.id === "P7" ? "·" : "→"}</span> : null}<a href={`#${p.id}`}>{p.id} {p.name}</a> <span className="muted">({byPhase.get(p.id)?.length ?? 0})</span></span>
            ))}
          </div>
          <div className="phase-list">
            {s.phases.map((p) => (
              <div key={p.id} id={p.id}>
                <h3 style={{ margin: "0 0 4px" }}>{p.id} — {p.name} <span className="pill">{p.status}</span></h3>
                <p className="small muted" style={{ margin: "0 0 6px" }}>{p.description}</p>
                <div className="table-wrap">
                  <table>
                    <thead><tr><th>Candidate</th><th>Released as</th><th>Confidence</th><th>Calendar constraint</th></tr></thead>
                    <tbody>
                      {(byPhase.get(p.id) ?? []).map((st) => (
                        <tr key={st.id}>
                          <td><StoryLink s={st} showEp={false} /></td>
                          <td className="small">Episode {st.episode} ({st.season})</td>
                          <td className="small"><code>{st.chronConfidence}</code></td>
                          <td className="small">{st.calendar || <span className="muted">none recorded</span>}{st.conflicts.length ? <> · <span className="badge tier-x">{st.conflicts.join(", ")}</span></> : null}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </Claim>

        <Claim kind="proposal" title={`Proposed chronological links (${proposedLinks.length})`}>
          <ul className="small">
            {proposedLinks.map((x) => (
              <li key={x.id}><Link href={`/series/connections?cx=${x.id}`}>{x.id}</Link> <EndLink id={x.from_id} series={s} /> → <EndLink id={x.to_id} series={s} /> — {x.explanation}</li>
            ))}
          </ul>
        </Claim>
      </div>
    </>
  );
}
