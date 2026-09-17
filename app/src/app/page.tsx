import Link from "next/link";
import { getData } from "@/lib/content";
import { listLeads } from "@/lib/leads";
import { Chip, TierBadge } from "@/components/ui";

export default async function Home() {
  const d = await getData();
  const leads = await listLeads();
  const ideas = [...d.ideas.values()];
  const accepted = ideas.filter((i) => i.status === "accepted for research");
  const tiers = ["Tier A", "Tier B", "Tier C", "Do not advance"].map((t) => [t, accepted.filter((i) => i.score?.tier === t).length] as const);
  const noIdea = [...d.concepts.values()].filter((c) => c.status === "no suitable idea").length;

  const stages = [
    { num: "01", title: "Sources", href: "/sources", stat: d.docs.sources.length, note: "book extracts, source maps and guides", color: "muted" },
    { num: "02", title: "Concepts", href: "/concepts", stat: d.concepts.size, note: `${noIdea} with no suitable idea`, color: "concept" },
    { num: "03", title: "Idea bank", href: "/ideas", stat: accepted.length, note: `accepted · ${ideas.filter((i) => i.status === "held").length} held · ${ideas.filter((i) => i.status === "merged").length} merged`, color: "idea" },
    { num: "04", title: "Story discovery", href: "/shortlist", stat: d.shortlist.size, note: `shortlisted questions · ${d.territories.size} territories · ${d.groups.size} groups`, color: "shortlist" },
    { num: "05", title: "Story leads", href: "/leads", stat: leads.length, note: `${leads.filter((l) => l.researchStatus === "verified").length} verified`, color: "lead" },
  ];

  return (
    <>
      <div className="kicker">Research pipeline</div>
      <h1>From Abhidhamma sources to real stories</h1>
      <p className="lede">
        Every stage links to the next. Click any ID to follow it, or open the connection graph to see how a source concept becomes an idea, a territory, a research question and a story lead.
      </p>

      <div className="pipeline">
        {stages.map((s) => (
          <Link key={s.num} href={s.href} className="card card-link stage">
            <div className="num">{s.num}</div>
            <div className="row" style={{ gap: 6 }}>
              <span className="dot" style={{ background: s.color === "muted" ? "var(--muted)" : `var(--c-${s.color})` }} />
              <strong>{s.title}</strong>
            </div>
            <div className="stat" style={{ marginTop: 8 }}>{s.stat}</div>
            <div className="muted small">{s.note}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-2">
        <section className="card">
          <div className="kicker">Documentary potential of accepted ideas</div>
          <table>
            <tbody>
              {tiers.map(([t, n]) => (
                <tr key={t}>
                  <td><TierBadge tier={t} /></td>
                  <td className="num">{n}</td>
                  <td><Link href={`/ideas?tier=${encodeURIComponent(t)}`}>View</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="card">
          <div className="kicker">Quick start</div>
          <ol style={{ margin: 0, paddingLeft: 18 }}>
            <li>Pick a question on the <Link href="/shortlist">research shortlist</Link>.</li>
            <li>Read its brief and its lead and supporting ideas.</li>
            <li>Check the <Link href="/territories">territory</Link> cautions and the <Link href="/groups">overlap group</Link>.</li>
            <li>Open a <Link href="/leads/new">new story lead</Link> for each real possibility found.</li>
          </ol>
          <p className="small muted" style={{ marginBottom: 0 }}>Hypothetical research directions are not verified stories. Every new lead starts as <em>unverified</em>.</p>
        </section>
      </div>

      <h2>Research shortlist by territory</h2>
      <div className="grid grid-2">
        {[...d.territories.values()].map((t) => (
          <section className="card" key={t.id}>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <Link href={`/territories/${t.id}`}><strong>{t.id} · {t.name}</strong></Link>
              <span className="muted small">{t.primary.length} ideas</span>
            </div>
            <div className="chips" style={{ marginTop: 8 }}>
              {t.shortlist.map((sq) => (
                <Chip key={sq} id={sq} label={d.shortlist.get(sq)?.heading} note={`${leads.filter((l) => l.shortlistQuestion === sq).length} leads`} />
              ))}
            </div>
          </section>
        ))}
      </div>
      <p className="muted small" style={{ marginTop: 24 }}>Files loaded {new Date(d.loadedAt).toLocaleString()}. Use “Reload files” after editing Markdown outside the app.</p>
    </>
  );
}
