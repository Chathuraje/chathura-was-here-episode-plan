import Link from "next/link";
import type { Data, Idea } from "@/lib/content";
import { CRITERIA } from "@/lib/content";
import { hrefForId } from "@/lib/routes";

type Kind = "concept" | "idea" | "territory" | "group" | "shortlist" | "lead" | "story" | "segment" | "connection";

export function kindOf(id: string): Kind {
  if (id.startsWith("ST-")) return "story";
  if (id.startsWith("SEG-")) return "segment";
  if (id.startsWith("CX-")) return "connection";
  if (id.startsWith("SL-")) return "lead";
  if (/^C\d{3}-I\d{2}$/.test(id)) return "idea";
  if (/^C\d{3}$/.test(id)) return "concept";
  if (id.startsWith("SQ")) return "shortlist";
  if (id.startsWith("T")) return "territory";
  return "group";
}

export function labelFor(d: Data, id: string): string {
  switch (kindOf(id)) {
    case "idea": return d.ideas.get(id)?.title ?? "";
    case "concept": { const c = d.concepts.get(id); return c?.titleEn || c?.titleSi || ""; }
    case "territory": return d.territories.get(id)?.name ?? "";
    case "group": return d.groups.get(id)?.theme ?? "";
    case "shortlist": return d.shortlist.get(id)?.heading ?? "";
    case "segment": return id === "SEG-E001" ? "Episode 1" : id === "SEG-E100A" ? "Episode 100, Part A" : "Episode 100, Part B";
    default: return "";
  }
}

export function Chip({ id, label, note }: { id: string; label?: string; note?: string }) {
  const kind = kindOf(id);
  return (
    <Link href={hrefForId(id)} className="chip" title={label}>
      <span className="dot" style={{ background: `var(--c-${kind})` }} />
      <span className="id">{id}</span>
      {label ? <span className="label">{label}</span> : null}
      {note ? <span className="muted small">{note}</span> : null}
    </Link>
  );
}

export function Chips({ d, ids, empty = "None", notes }: { d: Data; ids: string[]; empty?: string; notes?: Record<string, string> }) {
  if (!ids.length) return <span className="muted small">{empty}</span>;
  return (
    <div className="chips">
      {ids.map((id) => (
        <Chip key={id} id={id} label={labelFor(d, id)} note={notes?.[id]} />
      ))}
    </div>
  );
}

export function TierBadge({ tier }: { tier?: string }) {
  if (!tier) return null;
  const cls = tier === "Tier A" ? "tier-a" : tier === "Tier B" ? "tier-b" : tier === "Tier C" ? "tier-c" : "tier-x";
  return <span className={`badge ${cls}`}>{tier}</span>;
}

export function StatusBadge({ status }: { status: string }) {
  const cls = status === "accepted for research" || status === "verified" ? "tier-a" : status === "held" || status === "on hold" ? "tier-c" : status === "rejected" ? "tier-x" : status === "merged" ? "tier-b" : "";
  return <span className={`badge ${cls}`} style={cls ? undefined : { color: "var(--c-lead)" }}>{status}</span>;
}

export function ScoreBars({ idea }: { idea: Idea }) {
  if (!idea.score) return <p className="muted small">Not scored (only accepted cards are scored).</p>;
  const s = idea.score;
  return (
    <div className="scores">
      {s.values.map((v, i) => (
        <div className="score-row" key={CRITERIA[i]}>
          <span>{CRITERIA[i]}</span>
          <span className="bar"><span style={{ width: `${(v / 5) * 100}%` }} /></span>
          <span className="small">{v}</span>
        </div>
      ))}
      <div className="row" style={{ marginTop: 6 }}>
        <strong>{s.total}/40</strong>
        <TierBadge tier={s.tier} />
      </div>
    </div>
  );
}

export function Box({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="card">
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 8 }}>
        <div className="kicker" style={{ margin: 0 }}>{title}</div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function GraphLink({ id }: { id: string }) {
  return (
    <Link className="btn" href={`/graph?focus=${encodeURIComponent(id)}`}>
      View connections in graph
    </Link>
  );
}

/** A labelled block that says what kind of statement it holds. */
export function Claim({ kind, title, children }: { kind: "verified" | "reported" | "interpretation" | "proposal" | "missing"; title: string; children: React.ReactNode }) {
  const label = { verified: "Verified", reported: "Reported in sources · not verified", interpretation: "Interpretation", proposal: "Proposed production choice", missing: "Still to check" }[kind];
  return (
    <section className={`claim claim-${kind}`}>
      <div className="claim-head">
        <h3>{title}</h3>
        <span className="claim-kind">{label}</span>
      </div>
      <div className="claim-body">{children}</div>
    </section>
  );
}

export const NOT_ESTABLISHED = "Not yet established";

export function Val({ v }: { v?: string | null }) {
  return v && v.trim() && !/^not established$/i.test(v.trim()) ? <>{v}</> : <span className="muted">{NOT_ESTABLISHED}</span>;
}
