import Link from "next/link";
import { EVIDENCE_LABEL, FAMILY_LABEL, getSeries, type Family } from "@/lib/series";
import { ConnectionCard, EndLink } from "@/components/series-ui";

export default async function ConnectionsPage({ searchParams }: { searchParams: Promise<{ cx?: string; family?: string; status?: string }> }) {
  const { cx, family = "", status = "" } = await searchParams;
  const s = await getSeries();
  const selected = cx ? s.connections.find((x) => x.id === cx.toUpperCase()) : undefined;
  const list = s.connections.filter((x) => (!family || x.family === family) && (!status || x.status === status));
  const families = Object.keys(FAMILY_LABEL) as Family[];
  const q = (p: Record<string, string>) => {
    const u = new URLSearchParams({ ...(family ? { family } : {}), ...(status ? { status } : {}), ...p });
    for (const [k, v] of [...u.entries()]) if (!v) u.delete(k);
    return `/series/connections${u.size ? `?${u}` : ""}`;
  };

  return (
    <>
      <div className="kicker">Series · Connections{s.spoilersHidden ? "" : " · spoiler-sensitive"}</div>
      <h1>Connections</h1>
      <p className="lede">
        {s.connections.length} recorded relationships between candidates and framing segments. Each has a stated basis, an evidence status and what is still required. {s.spoilersHidden ? "Spoilers are hidden on this server: only low-spoiler philosophical pairings between candidates are shown." : null}
      </p>
      <div className="notice" style={{ marginBottom: 14 }}>
        A connection is only what is listed here. Two episodes sitting near each other in the <Link href="/graph?preset=series">graph</Link>, sharing an idea or a place, are not thereby connected. No connection is an established fact: none of their sources has been opened and checked.
      </div>

      {selected ? (
        <section style={{ marginBottom: 18 }}>
          <div className="kicker">Selected connection</div>
          <ConnectionCard x={selected} series={s} />
          <div className="card small" style={{ marginTop: 8 }}>
            <p style={{ margin: "0 0 4px" }}><strong>What the audience reads first:</strong> {selected.first_reading || "Not recorded"}</p>
            <p style={{ margin: "0 0 4px" }}><strong>What it would later become:</strong> {selected.later_reading || "Not recorded"}</p>
            <p style={{ margin: 0 }} className="muted">Spoiler weight: {selected.spoiler}. <Link href={`/graph?focus=${selected.from_id}&preset=series`}>Show in graph</Link> · <Link href={q({ cx: "" })}>Clear selection</Link></p>
          </div>
        </section>
      ) : cx ? <div className="notice error" style={{ marginBottom: 14 }}>{cx} is not a known connection{s.spoilersHidden ? " or is withheld on this server" : ""}.</div> : null}

      <div className="filters">
        <span className="small muted">Relationship:</span>
        <Link className={`btn small ${!family ? "btn-primary" : ""}`} href={q({ family: "" })}>All</Link>
        {families.map((f) => <Link key={f} className={`btn small ${family === f ? "btn-primary" : ""}`} href={q({ family: f })}>{FAMILY_LABEL[f]} ({s.connections.filter((x) => x.family === f).length})</Link>)}
      </div>
      <div className="filters" style={{ marginTop: -6 }}>
        <span className="small muted">Evidence:</span>
        <Link className={`btn small ${!status ? "btn-primary" : ""}`} href={q({ status: "" })}>All</Link>
        {(Object.keys(EVIDENCE_LABEL) as (keyof typeof EVIDENCE_LABEL)[]).map((k) => <Link key={k} className={`btn small ${status === k ? "btn-primary" : ""}`} href={q({ status: k })}>{EVIDENCE_LABEL[k]} ({s.connections.filter((x) => x.status === k).length})</Link>)}
      </div>

      <div className="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>From → to</th><th>Relationship</th><th>Evidence</th><th>Explanation</th><th>Still required</th></tr></thead>
          <tbody>
            {list.map((x) => (
              <tr key={x.id} style={x.id === selected?.id ? { background: "var(--accent-soft)" } : undefined}>
                <td><Link className="id-link" href={q({ cx: x.id })}>{x.id}</Link></td>
                <td className="small"><div className="chips"><EndLink id={x.from_id} series={s} /><EndLink id={x.to_id} series={s} /></div></td>
                <td className="small">{FAMILY_LABEL[x.family]}<div className="muted">{x.type}</div></td>
                <td className="small">{EVIDENCE_LABEL[x.status]}</td>
                <td className="small">{x.explanation}</td>
                <td className="small">{x.required || "Not recorded"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
