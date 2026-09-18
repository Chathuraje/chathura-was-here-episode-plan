import Link from "next/link";
import { DIRS, contentRel, getData } from "@/lib/content";
import { RESEARCH_STATUSES, listLeads } from "@/lib/leads";
import { StatusBadge } from "@/components/ui";
import { getSeries } from "@/lib/series";

export default async function LeadsPage() {
  const d = await getData();
  const leads = await listLeads();
  const series = await getSeries();
  const leadsDir = `${contentRel(DIRS.leads)}/`;
  return (
    <>
      <div className="kicker">05 · Story leads</div>
      <h1>Story leads</h1>
      <p className="lede">
        Real-world possibilities found by researching the shortlist. A lead is not a story until it is verified, consent is documented and a human selection decision is made.
      </p>
      <div className="row" style={{ marginBottom: 14 }}>
        <Link className="btn btn-primary" href="/leads/new">+ New story lead</Link>
        {RESEARCH_STATUSES.map((s) => (
          <span key={s} className="small muted">{s}: {leads.filter((l) => l.researchStatus === s).length}</span>
        ))}
      </div>
      {leads.length === 0 ? (
        <div className="card">
          <p style={{ marginTop: 0 }}>No story leads yet. Research begins by picking a question on the <Link href="/shortlist">shortlist</Link>.</p>
          <p className="small muted" style={{ marginBottom: 0 }}>Leads are saved as Markdown in <code>{leadsDir}</code>, using the story-lead template.</p>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Lead</th><th>Description</th><th>Question</th><th>Lead idea</th><th>Episode</th><th>Status</th><th>Screenplay</th><th>Updated</th></tr></thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id}>
                  <td><Link className="id-link" href={`/leads/${l.id}`}>{l.id}</Link></td>
                  <td><Link href={`/leads/${l.id}`}>{l.description}</Link></td>
                  <td><Link className="id-link" href={`/shortlist/${l.shortlistQuestion}`}>{l.shortlistQuestion}</Link> <span className="small muted">{d.shortlist.get(l.shortlistQuestion)?.heading}</span></td>
                  <td><Link className="id-link" href={`/ideas/${l.leadIdeaId}`}>{l.leadIdeaId}</Link></td>
                  <td className="small nowrap">{series.byLead.get(l.id) ? <Link href={`/episodes/${series.byLead.get(l.id)!.id}`}>E{series.byLead.get(l.id)!.episode} · {series.byLead.get(l.id)!.id}</Link> : <span className="muted">{series.rejected[l.id] ? "rejected at selection" : "not placed"}</span>}</td>
                  <td><StatusBadge status={l.researchStatus} /></td>
                  <td className="small">{l.screenplayReadiness}</td>
                  <td className="small muted">{l.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
