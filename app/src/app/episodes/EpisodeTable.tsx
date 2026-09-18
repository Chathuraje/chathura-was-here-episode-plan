"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type EpisodeRow = {
  id: string;
  leadId: string;
  episode: number;
  season: string;
  seasonTitle: string;
  pos: number;
  seasonLen: number;
  title: string;
  premise: string;
  subject: string;
  place: string;
  district: string;
  province: string;
  primaryIdea: string;
  primaryIdeaTitle: string;
  supportingIdeas: string[];
  territory: string;
  researchStatus: string;
  candidateStatus: string;
  stage: number;
  stageLabel: string;
  opened: number;
  total: number;
  access: string;
  continuity: string;
  anchorRank: number;
  connectionCount: number;
  mainMissing: string;
  issues: string[];
};

type Opt = { value: string; label: string };

const NE = "Not yet established";

export default function EpisodeTable({
  rows,
  seasons,
  territories,
  issueTypes,
  showContinuity,
  initial,
}: {
  rows: EpisodeRow[];
  seasons: Opt[];
  territories: Opt[];
  issueTypes: Opt[];
  showContinuity: boolean;
  initial: Record<string, string>;
}) {
  const [q, setQ] = useState(initial.q ?? "");
  const [season, setSeason] = useState(initial.season ?? "");
  const [status, setStatus] = useState(initial.status ?? "");
  const [territory, setTerritory] = useState(initial.territory ?? "");
  const [idea, setIdea] = useState(initial.idea ?? "");
  const [location, setLocation] = useState(initial.location ?? "");
  const [anchor, setAnchor] = useState(initial.anchor ?? "");
  const [issue, setIssue] = useState(initial.issue ?? "");
  const [sort, setSort] = useState(initial.sort ?? "release");

  const provinces = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => r.province.split(/,| and /).map((p) => p.trim()).filter((p) => p && p !== "not established").forEach((p) => set.add(p)));
    return [...set].sort();
  }, [rows]);
  const stageLabels = useMemo(() => [...new Set(rows.map((r) => r.stageLabel))], [rows]);
  const candidateStatuses = useMemo(() => [...new Set(rows.map((r) => r.candidateStatus))].sort(), [rows]);
  const leadStatuses = useMemo(() => [...new Set(rows.map((r) => r.researchStatus))].sort(), [rows]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const ideaNeedle = idea.trim().toUpperCase();
    const loc = location.toLowerCase();
    const out = rows.filter((r) => {
      if (season && r.season !== season) return false;
      if (status) {
        const [kind, value] = status.split(":");
        if (kind === "candidate" && r.candidateStatus !== value) return false;
        if (kind === "lead" && r.researchStatus !== value) return false;
        if (kind === "stage" && r.stageLabel !== value) return false;
      }
      if (territory && r.territory !== territory) return false;
      if (ideaNeedle && !(r.primaryIdea.includes(ideaNeedle) || r.supportingIdeas.some((i) => i.includes(ideaNeedle)))) return false;
      if (loc && !(`${r.province} ${r.district} ${r.place}`.toLowerCase().includes(loc))) return false;
      if (anchor === "anchor" && !r.anchorRank) return false;
      if (anchor === "standalone" && r.anchorRank) return false;
      if (anchor === "connected" && !r.connectionCount) return false;
      if (anchor === "unconnected" && r.connectionCount) return false;
      if (issue && !r.issues.includes(issue)) return false;
      if (needle) {
        const hay = [r.id, r.leadId, r.title, r.premise, r.subject, r.place, r.district, r.province, r.primaryIdea, r.primaryIdeaTitle, `e${r.episode}`, `episode ${r.episode}`].join(" ").toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
    const readiness = (a: EpisodeRow, b: EpisodeRow) => b.stage - a.stage || b.opened / (b.total || 1) - a.opened / (a.total || 1) || a.issues.length - b.issues.length;
    if (sort === "readiness") out.sort((a, b) => readiness(a, b) || a.episode - b.episode);
    else if (sort === "season") out.sort((a, b) => a.season.localeCompare(b.season) || readiness(a, b) || a.episode - b.episode);
    else out.sort((a, b) => a.episode - b.episode);
    return out;
  }, [rows, q, season, status, territory, idea, location, anchor, issue, sort]);

  const reset = () => { setQ(""); setSeason(""); setStatus(""); setTerritory(""); setIdea(""); setLocation(""); setAnchor(""); setIssue(""); setSort("release"); };

  return (
    <>
      <div className="filters">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title, premise, subject, place or ID" style={{ minWidth: 260, flex: 1 }} aria-label="Search episodes" />
        <label>Season
          <select value={season} onChange={(e) => setSeason(e.target.value)}>
            <option value="">All</option>
            {seasons.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </label>
        <label>Research status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All</option>
            <optgroup label="Furthest step reached">
              {stageLabels.map((s) => <option key={s} value={`stage:${s}`}>{s}</option>)}
            </optgroup>
            <optgroup label="Candidate evidence level">
              {candidateStatuses.map((s) => <option key={s} value={`candidate:${s}`}>{s}</option>)}
            </optgroup>
            <optgroup label="Lead card status">
              {leadStatuses.map((s) => <option key={s} value={`lead:${s}`}>{s}</option>)}
            </optgroup>
          </select>
        </label>
        <label>Territory
          <select value={territory} onChange={(e) => setTerritory(e.target.value)}>
            <option value="">All</option>
            {territories.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </label>
        <label>Idea ID
          <input value={idea} onChange={(e) => setIdea(e.target.value)} placeholder="C039-I01" style={{ width: 110 }} />
        </label>
        <label>Location
          <input value={location} onChange={(e) => setLocation(e.target.value)} list="province-options" placeholder="Province, district or place" style={{ width: 170 }} />
          <datalist id="province-options">{provinces.map((p) => <option key={p} value={p} />)}</datalist>
        </label>
        {showContinuity ? (
          <label>Continuity
            <select value={anchor} onChange={(e) => setAnchor(e.target.value)}>
              <option value="">All</option>
              <option value="anchor">Proposed anchors only</option>
              <option value="standalone">Not an anchor</option>
              <option value="connected">Has any connection</option>
              <option value="unconnected">No connection</option>
            </select>
          </label>
        ) : null}
        <label>Unresolved issue
          <select value={issue} onChange={(e) => setIssue(e.target.value)}>
            <option value="">Any</option>
            {issueTypes.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}
          </select>
        </label>
        <label>Sort
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="release">Release order</option>
            <option value="season">Season, then research readiness</option>
            <option value="readiness">Research readiness (furthest first)</option>
          </select>
        </label>
        <button type="button" onClick={reset} className="small">Clear</button>
      </div>
      <p className="muted small">
        Showing {filtered.length} of {rows.length} candidates. “Research readiness” sorts by the furthest step reached, then by the share of sources opened; it is an ordering, not a score.
      </p>
      <div className="table-wrap">
        <table className="ep-table">
          <thead>
            <tr>
              <th>Ep</th>
              <th>Season · position</th>
              <th>Working title and premise</th>
              <th>Subject and location</th>
              <th>Primary idea</th>
              <th>Research status</th>
              <th>Access</th>
              {showContinuity ? <th>Continuity role</th> : null}
              <th>Main missing item</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td className="ep-num"><Link href={`/episodes/${r.id}`}>{r.episode}</Link></td>
                <td className="nowrap small">
                  <Link href={`/series#${r.season}`}>{r.season}</Link> · {r.pos} of {r.seasonLen}
                  <div className="muted">{r.seasonTitle}</div>
                </td>
                <td className="premise">
                  <Link href={`/episodes/${r.id}`}><strong>{r.title}</strong></Link>{" "}
                  <span className="muted small">{r.id}</span>
                  <div className="small">{r.premise || <span className="muted">{NE}</span>}</div>
                </td>
                <td className="small">
                  <div>{r.subject || <span className="muted">{NE}</span>}</div>
                  <div className="muted">{[r.place, r.district !== "not established" ? r.district : "", r.province !== "not established" ? r.province : ""].filter(Boolean).join(" · ") || NE}</div>
                </td>
                <td className="small">
                  <Link className="id-link" href={`/ideas/${r.primaryIdea}`}>{r.primaryIdea}</Link>
                  <div className="muted">{r.primaryIdeaTitle}</div>
                </td>
                <td className="small">
                  <div>{r.stageLabel}</div>
                  <div className="muted">{r.opened} of {r.total} sources opened · {r.candidateStatus}</div>
                </td>
                <td className="small">{r.access}</td>
                {showContinuity ? <td className="small">{r.continuity}</td> : null}
                <td className="small">{r.mainMissing}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
