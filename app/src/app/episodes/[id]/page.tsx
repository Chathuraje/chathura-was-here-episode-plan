import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getData } from "@/lib/content";
import { ISSUE_TYPES, getSeries, segmentLabel, type Story } from "@/lib/series";
import { docHref } from "@/lib/routes";
import { Box, Chip, Chips, Claim, GraphLink, StatusBadge, Val } from "@/components/ui";
import { ConnectionCard, LadderList, StoryLink } from "@/components/series-ui";

export default async function EpisodePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: raw } = await params;
  const id = decodeURIComponent(raw).toUpperCase();
  const s = await getSeries();

  if (/^\d+$/.test(id)) {
    const n = Number(id);
    if (n === 1) redirect("/episodes/SEG-E001");
    const st = s.stories.find((x) => x.episode === n);
    if (st) redirect(`/episodes/${st.id}`);
    notFound();
  }
  if (id.startsWith("SEG-")) return <SegmentPage id={id} />;
  const st = s.byId.get(id);
  if (!st) notFound();
  return <StoryPage st={st} />;
}

async function StoryPage({ st }: { st: Story }) {
  const d = await getData();
  const s = await getSeries();
  const f = st.fields;
  const lead = st.lead;
  const season = s.seasons.find((x) => x.id === st.season)!;
  const sq = d.shortlist.get(st.sq);
  const primary = d.ideas.get(st.primaryIdea);
  const ideaIds = [st.primaryIdea, ...st.supportingIdeas];
  const concepts = [...new Set(ideaIds.flatMap((i) => { const x = d.ideas.get(i); return x ? [x.primaryConcept, ...x.supportingConcepts] : []; }))].filter((c) => d.concepts.has(c));
  const prev = s.stories.find((x) => x.episode === st.episode - 1);
  const next = s.stories.find((x) => x.episode === st.episode + 1);
  const claims = new Map((f?.claims ?? []).map((c) => [c.source, c.claim]));
  const issueLabel = Object.fromEntries(ISSUE_TYPES.map((t) => [t.code, t.label]));
  const conflicts = s.conflicts.filter((c) => c.stories.includes(st.id));
  const posRole = st.posInSeason === 1 ? "Opens the season." : st.posInSeason === st.seasonLen ? "Closes the season." : "Develops the season's contrast.";
  const verified: string[] = [];
  if (st.ladder.met.claim) verified.push("The core claim is recorded as supported by opened sources.");
  if (st.ladder.met.subject) verified.push("A subject is recorded as identified.");
  if (st.ladder.met.consent) verified.push("Consent is recorded as documented.");
  if (st.ladder.met.access) verified.push("Filming access is recorded as confirmed.");

  return (
    <div className="split">
      <article>
        <div className="kicker">Episode {st.episode} · {st.season} position {st.posInSeason} of {st.seasonLen} · proposed release position</div>
        <h1>{st.title}</h1>
        <div className="row" style={{ marginBottom: 10 }}>
          <span className="badge" style={{ color: "var(--c-story)" }}>{st.id}</span>
          <span className="badge">{st.candidateStatus}</span>
          <span className="badge">{st.ladder.stageLabel}</span>
          {lead ? <StatusBadge status={lead.researchStatus} /> : null}
          <Link className="btn" href={`/leads/${st.leadId}`}>Lead {st.leadId}</Link>
          {lead ? <Link className="btn btn-primary" href={`/leads/${st.leadId}/edit`}>Edit research</Link> : null}
          <GraphLink id={st.id} />
        </div>
        <div className="legend-kinds">
          <span className="lk-verified">Verified</span>
          <span className="lk-reported">Reported in sources, not verified</span>
          <span className="lk-interpretation">Interpretation</span>
          <span className="lk-proposal">Proposed production choice</span>
          <span className="lk-missing">Still to check</span>
        </div>
        <div className="grid">
          <Claim kind="verified" title="Verified">
            {verified.length ? <ul>{verified.map((v) => <li key={v}>{v}</li>)}</ul> : <p><strong>Nothing on this page has been verified.</strong> No one has been contacted, and {st.ladder.opened} of {st.ladder.total} cited sources have been opened and checked.</p>}
          </Claim>

          <Claim kind="reported" title="What the story is">
            <p><Val v={st.premise} /></p>
            <details>
              <summary className="small">What the sources report is happening</summary>
              <p className="small"><Val v={f?.situation} /></p>
            </details>
          </Claim>

          <Claim kind="reported" title="Who or what we follow">
            <p><Val v={f?.subject} /></p>
            <p className="small muted">Subject identified: <strong>{st.review?.subject_identified === "yes" ? "yes" : "no"}</strong>. This describes a kind of subject drawn from published sources, not a person who has agreed to anything.</p>
          </Claim>

          <Claim kind="reported" title="Where it happens">
            <p><Val v={f?.place} /></p>
            <p className="small muted">District: <Val v={f?.district} /> · Province: <Val v={f?.province} /></p>
          </Claim>

          <Claim kind="proposal" title="What could be observed on camera">
            <p><Val v={f?.activity} /></p>
            <p className="small muted">What the sources report happens there. Nothing has been filmed and no footage is known to exist.</p>
          </Claim>

          <Claim kind="interpretation" title="The central human question">
            {sq ? <p className="question" style={{ margin: "4px 0" }}>{sq.question}</p> : <p><Val v="" /></p>}
            <p className="small muted">Carried from research question {sq ? <Link href={`/shortlist/${sq.id}`}>{sq.id}</Link> : "—"}. It is the team&apos;s question, not a claim about what any participant thinks.</p>
          </Claim>

          <Claim kind="missing" title="What is at stake or unresolved">
            <p><strong>What is changing (reported):</strong> <Val v={f?.change} /></p>
            <p><strong>Open question:</strong> <Val v={f?.unresolved} /></p>
          </Claim>

          <Claim kind="interpretation" title="Why it connects to the idea bank">
            {primary ? (
              <>
                <p><Link href={`/ideas/${primary.id}`}><strong>{primary.id} — {primary.title}</strong></Link></p>
                <p className="small">{primary.coreIdea || <Val v="" />}</p>
              </>
            ) : <p><Val v="" /></p>}
            <p className="small muted">An interpretation held privately by the production team. It is never offered to a participant as an explanation of their life, and the idea card&apos;s own limits apply.</p>
            {s.ideaDifferentiation[st.primaryIdea] ? <p className="small"><strong>How this differs from other stories led by the same idea:</strong> {s.ideaDifferentiation[st.primaryIdea]}</p> : null}
          </Claim>

          <Claim kind="reported" title="Evidence and source-review status">
            <LadderList ladder={st.ladder} />
            {f?.sources.length ? (
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Ref</th><th>What it is cited for</th><th>Type</th><th>Review</th></tr></thead>
                  <tbody>
                    {f.sources.map((x) => (
                      <tr key={x.ref}>
                        <td className="nowrap"><a href={x.url} target="_blank" rel="noreferrer">{x.ref}</a></td>
                        <td className="small">{claims.get(x.ref) ?? x.notes}</td>
                        <td className="small">{x.type}</td>
                        <td className="small">{x.review === "opened" ? <span className="badge tier-a">opened and checked</span> : <span className="badge tier-c">search result only</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <p><Val v="" /></p>}
            <p className="small muted">A source counts as opened only when the lead card&apos;s section 18 says so. Core claim review: <strong>{st.review?.claim_review ?? "not reviewed"}</strong>.</p>
          </Claim>

          <Claim kind="missing" title="What still needs checking">
            {st.issues.length ? (
              <ul>{st.issues.map((i, n) => <li key={n}><strong>{issueLabel[i.code]}.</strong> {i.detail}</li>)}</ul>
            ) : <p>Nothing recorded as missing.</p>}
          </Claim>

          <Claim kind="missing" title="Next research action">
            <p><Val v={f?.nextAction} /></p>
            <p className="small muted">Owner: <Val v={f?.nextOwner === "unassigned" ? "" : f?.nextOwner} /> · By: <Val v={f?.nextBy === "unassigned" ? "" : f?.nextBy} /></p>
          </Claim>

          <Claim kind="proposal" title="Proposed season role">
            <p><Link href={`/series#${season.id}`}><strong>{season.id} — {season.title}</strong></Link>. {posRole}</p>
            <p className="small">Season question: {season.question}</p>
            {st.posInSeason === st.seasonLen ? <p className="small">Carries the season&apos;s intended shift: {season.shift}</p> : null}
            <p className="small muted">Season boundaries and positions are proposals (Season 1&apos;s length is not documented anywhere).</p>
          </Claim>

          <Claim kind="proposal" title="Connected episodes">
            {st.connections.length ? (
              <div className="grid" style={{ gap: 8 }}>{st.connections.map((x) => <ConnectionCard key={x.id} x={x} series={s} from={st.id} />)}</div>
            ) : <p className="muted">{s.spoilersHidden ? "Connections are withheld on this server except low-spoiler philosophical pairings; this episode has none." : "No connection is recorded. The episode is meant to stand on its own."}</p>}
            {s.spoilersHidden ? null : <p className="small muted">Being near another episode in the graph is not a connection. Only the links listed here have a stated basis.</p>}
          </Claim>

          {s.spoilersHidden ? null : (
            <>
              <Claim kind="proposal" title="Proposed chronological position">
                <p>Phase <Link href={`/series/chronology#${st.chronPhase}`}><strong>{st.chronPhase}</strong></Link> {s.phases.find((p) => p.id === st.chronPhase)?.name} · confidence <code>{st.chronConfidence}</code></p>
                <p className="small">Calendar constraint: <Val v={st.calendar} /></p>
                {conflicts.length ? (
                  <ul className="small">{conflicts.map((c) => <li key={c.id}><Link href={`/series/chronology#${c.id}`}>{c.id}</Link> {c.title} ({c.status})</li>)}</ul>
                ) : null}
                <p className="small muted">A proposal. Stories inside a phase are not ordered, and no date is claimed. The only fixed relationship is Episode 100 Part A → Episode 1 → Episode 100 Part B.</p>
              </Claim>
              <Claim kind="proposal" title="Continuity contribution">
                {st.anchor ? (
                  <>
                    <p><strong>Proposed anchor {st.anchor.rank}</strong> ({st.anchor.kind}), status: {st.anchor.status}.</p>
                    <p className="small"><strong>What the audience sees first:</strong> {st.anchor.audience_first}</p>
                    <p className="small"><strong>What Episode 100 would later clarify:</strong> {st.anchor.ep100_later}</p>
                    <p className="small"><strong>Practical requirement:</strong> {st.anchor.requirement}</p>
                    <p className="small"><strong>Evidence, and what is only planned:</strong> {st.anchor.evidence}</p>
                  </>
                ) : <p className="muted">Not a continuity anchor. This episode has no structural job in the series.</p>}
              </Claim>
            </>
          )}
        </div>
      </article>

      <aside className="aside">
        <Box title="Follow the pipeline">
          <div className="grid" style={{ gap: 8 }}>
            <div><div className="small muted">Lead</div><Chip id={st.leadId} label={lead?.description} /></div>
            <div><div className="small muted">Research question</div>{sq ? <Chip id={sq.id} label={sq.heading} /> : <Val v="" />}</div>
            <div><div className="small muted">Primary idea</div><Chips d={d} ids={[st.primaryIdea].filter(Boolean)} empty="Not yet established" /></div>
            <div><div className="small muted">Supporting ideas</div><Chips d={d} ids={st.supportingIdeas} /></div>
            <div><div className="small muted">Source concepts (through these ideas)</div><Chips d={d} ids={concepts} /></div>
            <div><div className="small muted">Territory</div><Chips d={d} ids={st.territory ? [st.territory] : []} empty="Not yet established" /></div>
          </div>
        </Box>
        <Box title="Neighbouring episodes (release order)">
          <div className="grid" style={{ gap: 6 }}>
            {prev ? <StoryLink s={prev} /> : st.episode === 2 ? <Link href="/episodes/SEG-E001" className="small">Episode 1 (framing)</Link> : null}
            {next ? <StoryLink s={next} /> : <span className="small muted">Episode 100 follows (framing)</span>}
          </div>
        </Box>
        <Box title="Editing">
          <p className="small" style={{ margin: 0 }}>
            Research fields on this page come from the lead card; change them with <Link href={`/leads/${st.leadId}/edit`}>Edit research</Link>.
            Planning fields (title, premise, season, chronology, continuity) are <strong>read-only here</strong>: edit <code>content/06-series-architecture/data/stories.json</code>, then run <code>python3 tools/rebuild.py</code>.
          </p>
          {lead?.file ? <p className="small" style={{ marginBottom: 0 }}><Link href={docHref(lead.file)}>Open the lead card file</Link></p> : null}
        </Box>
      </aside>
    </div>
  );
}

async function SegmentPage({ id }: { id: string }) {
  const s = await getSeries();
  const seg = s.segments.find((x) => x.id === id);
  if (!seg) notFound();
  const links = s.connections.filter((x) => x.from_id === id || x.to_id === id);
  const seq = ["SEG-E100A", "SEG-E001", "SEG-E100B"];
  return (
    <div className="split">
      <article>
        <div className="kicker">Framing segment · not one of the {s.stories.length} candidates</div>
        <h1>{seg.name}</h1>
        <div className="row" style={{ marginBottom: 12 }}>
          <span className="badge" style={{ color: "var(--c-segment)" }}>{seg.id}</span>
          {seg.status ? <span className="badge">{seg.status}</span> : null}
          <GraphLink id={seg.id} />
        </div>
        <div className="grid">
          <Claim kind="interpretation" title="Content, as supplied by the project owner">
            <p>{seg.content}</p>
            {seg.source ? <p className="small muted">{seg.source}</p> : null}
          </Claim>
          {s.spoilersHidden ? null : (
            <Claim kind="proposal" title="Place in the hidden chronology">
              <div className="seq">
                {seq.map((x, i) => (
                  <span key={x} className="row">
                    {i ? <span className="arrow">→</span> : null}
                    {x === id ? <strong>{segmentLabel(x)}</strong> : <Link href={`/episodes/${x}`}>{segmentLabel(x)}</Link>}
                  </span>
                ))}
              </div>
              <p className="small muted">This order is fixed by the owner (user-supplied canon). The 98 candidates come before it in a partial order that is only proposed; see <Link href="/series/chronology">Chronology</Link>.</p>
            </Claim>
          )}
          <Claim kind="proposal" title={`Connections (${links.length})`}>
            {links.length ? <div className="grid" style={{ gap: 8 }}>{links.map((x) => <ConnectionCard key={x.id} x={x} series={s} from={id} />)}</div> : <p className="muted">None recorded.</p>}
            {links.length ? <p className="small muted">All of these describe footage or objects that do not exist yet.</p> : null}
          </Claim>
        </div>
      </article>
      <aside className="aside">
        <Box title="Framing references">
          <div className="grid" style={{ gap: 6 }}>
            {s.segments.map((x) => <Link key={x.id} href={`/episodes/${x.id}`} className="small">{x.name} · {x.id}</Link>)}
          </div>
        </Box>
        <Box title="Editing">
          <p className="small" style={{ margin: 0 }}>Read-only here. The segments are recorded in <code>data/stories.json</code> under <code>segments</code>.</p>
        </Box>
      </aside>
    </div>
  );
}
