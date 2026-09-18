import Link from "next/link";
import { EVIDENCE_LABEL, FAMILY_LABEL, LADDER, type Connection, type Ladder, type Segment, type Series, type Story, seriesCounts } from "@/lib/series";

type Counts = ReturnType<typeof seriesCounts>;

/** Separate counts. None of them is added to another, and none is a percentage. */
export function Counts({ c }: { c: Counts }) {
  const items: [string, string, string][] = [
    ["Candidates catalogued", String(c.cataloged), `${c.evidencedSituation} with the core situation reported in sources; ${c.unverifiedLead} unverified leads`],
    ["Sources opened", `${c.sourcesOpened} of ${c.sourcesTotal}`, `citations opened and checked; ${c.storiesWithAnOpenedSource} candidates have at least one`],
    ["Evidence reviewed", String(c.evidenceReviewed), `candidates with a recorded claim review; ${c.claimSupported} supported`],
    ["Subjects identified", String(c.subjectsIdentified), "a named person, family or group, recorded on the lead card"],
    ["Access confirmed", String(c.accessConfirmed), `filming access confirmed; consent documented for ${c.consentDocumented}`],
    ["Production-ready", String(c.productionReady), "every step met and a human selection made"],
  ];
  return (
    <>
      <div className="stat-grid">
        {items.map(([label, value, note]) => (
          <div className="card" key={label}>
            <div className="kicker" style={{ margin: 0 }}>{label}</div>
            <div className="stat" style={{ margin: "4px 0" }}>{value}</div>
            <div className="small muted">{note}</div>
          </div>
        ))}
      </div>
      <p className="small muted" style={{ marginTop: -8 }}>
        <strong>{c.cataloged} provisional candidates are not {c.cataloged} finished stories.</strong> Nobody has been contacted, so no subject is identified and there is no consent or filming access anywhere.
      </p>
    </>
  );
}

export function FramingCards({ segments, hidden }: { segments: Segment[]; hidden: boolean }) {
  return (
    <div className="framing">
      {segments.map((s) => (
        <Link key={s.id} href={`/episodes/${s.id}`} className="card card-link">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <strong>{s.name}</strong>
            <span className="muted small">{s.id}</span>
          </div>
          <div className="small" style={{ marginTop: 4 }}>{s.content}</div>
          {s.status ? <div className="small muted" style={{ marginTop: 4 }}>{s.status}</div> : null}
        </Link>
      ))}
      {hidden ? <div className="card small muted">Episode 100 is withheld because spoilers are hidden on this server (EXPLORER_SPOILERS=hide).</div> : null}
    </div>
  );
}

export function LadderList({ ladder }: { ladder: Ladder }) {
  return (
    <ol className="ladder">
      {LADDER.map((s, i) => {
        const met = ladder.met[s.key];
        const note = s.key === "found" || s.key === "opened" ? `${s.key === "found" ? ladder.total : ladder.opened} of ${ladder.total}` : "";
        return (
          <li key={s.key} className={met ? "met" : "unmet"}>
            <span className="tick">{met ? "✓" : i < ladder.stage ? "✓" : "–"}</span>
            <span>{s.label}</span>
            <span className="muted small">{met ? note || "recorded" : s.key === "opened" && ladder.opened ? `${note} (partial)` : "not yet"}</span>
          </li>
        );
      })}
    </ol>
  );
}

export function StoryLink({ s, showEp = true }: { s: Story; showEp?: boolean }) {
  return (
    <Link href={`/episodes/${s.id}`} className="chip" title={s.premise}>
      <span className="dot" style={{ background: "var(--c-story)" }} />
      {showEp ? <span className="id">E{s.episode}</span> : null}
      <span className="id">{s.id}</span>
      <span className="label">{s.title}</span>
    </Link>
  );
}

export function StoryLinks({ stories, empty = "None" }: { stories: Story[]; empty?: string }) {
  if (!stories.length) return <span className="muted small">{empty}</span>;
  return <div className="chips">{stories.map((s) => <StoryLink key={s.id} s={s} />)}</div>;
}

export function EndLink({ id, series }: { id: string; series: Series }) {
  const st = series.byId.get(id);
  if (st) return <StoryLink s={st} />;
  const seg = series.segments.find((x) => x.id === id);
  return (
    <Link href={`/episodes/${id}`} className="chip">
      <span className="dot" style={{ background: "var(--c-segment)" }} />
      <span className="id">{id}</span>
      <span className="label">{seg?.name ?? id}</span>
    </Link>
  );
}

export function ConnectionCard({ x, series, from }: { x: Connection; series: Series; from?: string }) {
  const other = from ? (x.from_id === from ? x.to_id : x.from_id) : undefined;
  return (
    <div className="card" id={x.id} style={{ padding: "10px 14px" }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div className="row">
          <Link className="id-link" href={`/series/connections?cx=${x.id}`}>{x.id}</Link>
          <span className="pill">{FAMILY_LABEL[x.family]}</span>
          <span className="pill">{x.type}</span>
        </div>
        <span className={`badge ${x.status === "proposal" ? "" : x.status === "source-reported" ? "tier-b" : "tier-a"}`} style={x.status === "proposal" ? { color: "var(--c-lead)" } : undefined}>
          {EVIDENCE_LABEL[x.status]}
        </span>
      </div>
      <div className="row" style={{ margin: "6px 0" }}>
        {other ? <EndLink id={other} series={series} /> : <><EndLink id={x.from_id} series={series} /><span className="muted">→</span><EndLink id={x.to_id} series={series} /></>}
      </div>
      <p className="small" style={{ margin: "4px 0" }}>{x.explanation}</p>
      <p className="small muted" style={{ margin: "4px 0" }}><strong>Basis:</strong> {x.basis}</p>
      <p className="small muted" style={{ margin: "4px 0" }}><strong>Still required:</strong> {x.required || "Not recorded"}</p>
    </div>
  );
}
