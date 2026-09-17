"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type IdeaRow = {
  id: string;
  title: string;
  status: string;
  mergedInto: string;
  concept: string;
  chapter: number;
  territory: string;
  tier: string;
  total: number;
  values: number[];
  question: string;
  tags: string[];
  shortlist: string;
  groups: string[];
};

const SHORT = ["Tension", "Active", "Visual", "Journey", "Breadth", "Ethics", "Indep.", "Distinct"];
const tierClass = (t: string) => (t === "Tier A" ? "tier-a" : t === "Tier B" ? "tier-b" : t === "Tier C" ? "tier-c" : "tier-x");

export default function IdeaTable({
  rows,
  territories,
  initial,
}: {
  rows: IdeaRow[];
  territories: { id: string; name: string }[];
  initial: { status: string; tier: string; territory: string; q: string; view: string };
}) {
  const [status, setStatus] = useState(initial.status);
  const [tier, setTier] = useState(initial.tier);
  const [territory, setTerritory] = useState(initial.territory);
  const [q, setQ] = useState(initial.q);
  const [onlyShortlist, setOnlyShortlist] = useState(false);
  const [view, setView] = useState(initial.view === "scores" ? "scores" : "list");
  const [sort, setSort] = useState<"id" | "total">("id");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows
      .filter((r) => !status || r.status === status)
      .filter((r) => !tier || r.tier === tier)
      .filter((r) => !territory || r.territory === territory)
      .filter((r) => !onlyShortlist || r.shortlist)
      .filter((r) => !needle || [r.id, r.title, r.question, r.tags.join(" ")].join(" ").toLowerCase().includes(needle))
      .sort((a, b) => (sort === "total" ? b.total - a.total || a.id.localeCompare(b.id) : a.id.localeCompare(b.id)));
  }, [rows, status, tier, territory, q, onlyShortlist, sort]);

  return (
    <>
      <div className="filters">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by title, question or tag" style={{ minWidth: 240 }} />
        <label>Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All</option>
            <option>accepted for research</option>
            <option>held</option>
            <option>merged</option>
          </select>
        </label>
        <label>Tier
          <select value={tier} onChange={(e) => setTier(e.target.value)}>
            <option value="">All</option>
            <option>Tier A</option>
            <option>Tier B</option>
            <option>Tier C</option>
            <option>Do not advance</option>
          </select>
        </label>
        <label>Territory
          <select value={territory} onChange={(e) => setTerritory(e.target.value)}>
            <option value="">All</option>
            {territories.map((t) => <option key={t.id} value={t.id}>{t.id} {t.name}</option>)}
          </select>
        </label>
        <label><input type="checkbox" checked={onlyShortlist} onChange={(e) => setOnlyShortlist(e.target.checked)} /> Shortlisted leads only</label>
        <label>Sort
          <select value={sort} onChange={(e) => setSort(e.target.value as "id" | "total")}>
            <option value="id">By ID</option>
            <option value="total">By score</option>
          </select>
        </label>
        <div className="row" style={{ marginLeft: "auto" }}>
          <button onClick={() => setView("list")} className={view === "list" ? "btn-primary" : ""}>Questions</button>
          <button onClick={() => setView("scores")} className={view === "scores" ? "btn-primary" : ""}>Scores</button>
        </div>
      </div>
      <p className="muted small">{filtered.length} of {rows.length} cards</p>
      <div className="table-wrap">
        <table>
          <thead>
            {view === "list" ? (
              <tr><th>ID</th><th>Title and open question</th><th>Territory</th><th>Tier</th><th>Research</th></tr>
            ) : (
              <tr><th>ID</th><th>Title</th>{SHORT.map((s) => <th key={s} className="num">{s}</th>)}<th className="num">Total</th><th>Tier</th></tr>
            )}
          </thead>
          <tbody>
            {filtered.map((r) =>
              view === "list" ? (
                <tr key={r.id}>
                  <td><Link className="id-link" href={`/ideas/${r.id}`}>{r.id}</Link></td>
                  <td>
                    <Link href={`/ideas/${r.id}`}><strong>{r.title}</strong></Link>
                    {r.status !== "accepted for research" ? <span className="muted small"> · {r.status}{r.mergedInto ? ` into ${r.mergedInto}` : ""}</span> : null}
                    {r.question ? <div className="muted small">{r.question}</div> : null}
                  </td>
                  <td>{r.territory ? <Link className="id-link" href={`/territories/${r.territory}`}>{r.territory}</Link> : "—"}</td>
                  <td>{r.tier ? <span className={`badge ${tierClass(r.tier)}`}>{r.tier}</span> : "—"}</td>
                  <td className="small">
                    {r.shortlist ? <Link className="id-link" href={`/shortlist/${r.shortlist}`}>{r.shortlist}</Link> : null}
                    {r.groups.map((g) => {
                      const [gid, role] = g.split(":");
                      return <div key={g}><Link className="id-link" href={`/groups/${gid}`}>{gid}</Link> <span className="muted">{role}</span></div>;
                    })}
                  </td>
                </tr>
              ) : (
                <tr key={r.id}>
                  <td><Link className="id-link" href={`/ideas/${r.id}`}>{r.id}</Link></td>
                  <td><Link href={`/ideas/${r.id}`}>{r.title}</Link></td>
                  {SHORT.map((s, i) => <td key={s} className="num">{r.values[i] ?? "—"}</td>)}
                  <td className="num"><strong>{r.total || "—"}</strong></td>
                  <td>{r.tier ? <span className={`badge ${tierClass(r.tier)}`}>{r.tier}</span> : "—"}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
