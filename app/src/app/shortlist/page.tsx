import Link from "next/link";
import { getData } from "@/lib/content";
import { listLeads } from "@/lib/leads";
import { docHref } from "@/lib/routes";
import { TierBadge } from "@/components/ui";

export default async function ShortlistPage() {
  const d = await getData();
  const leads = await listLeads();
  const shortlistDoc = [...d.shortlist.values()][0]?.file ?? "";
  return (
    <>
      <div className="kicker">04 · Story discovery</div>
      <h1>Research shortlist</h1>
      <p className="lede">
        {d.shortlist.size} open human questions for the first story-discovery cycle. Research one question at a time.{" "}
        <Link href={docHref(shortlistDoc)}>Selection method and reserve list</Link>.
      </p>
      <div className="grid grid-2">
        {[...d.shortlist.values()].map((s) => {
          const lead = d.ideas.get(s.lead);
          const n = leads.filter((l) => l.shortlistQuestion === s.id);
          return (
            <section key={s.id} className="card">
              <div className="row" style={{ justifyContent: "space-between" }}>
                <Link href={`/shortlist/${s.id}`} className="id-link">{s.id}</Link>
                <Link href={`/territories/${s.territory}`} className="small">{s.territory} · {d.territories.get(s.territory)?.name}</Link>
              </div>
              <h3 style={{ margin: "6px 0" }}><Link href={`/shortlist/${s.id}`}>{s.heading}</Link></h3>
              <p className="question" style={{ fontSize: "0.98rem", margin: "8px 0" }}>{s.question}</p>
              <div className="row small">
                <Link href={`/ideas/${s.lead}`} className="id-link">{s.lead}</Link>
                <TierBadge tier={lead?.score?.tier} />
                <span className="muted">+{s.supporting.length} supporting</span>
                <span style={{ marginLeft: "auto" }}>
                  {n.length} lead{n.length === 1 ? "" : "s"} · <Link href={`/leads/new?sq=${s.id}`}>+ New</Link>
                </span>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
