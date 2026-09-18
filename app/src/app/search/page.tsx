import Link from "next/link";
import { redirect } from "next/navigation";
import { getData } from "@/lib/content";
import { listLeads } from "@/lib/leads";
import { hrefForId } from "@/lib/routes";
import { Chip, TierBadge } from "@/components/ui";
import { getSeries } from "@/lib/series";

type Hit = { id: string; label: string; snippet: string; score: number; extra?: string };

function snippet(text: string, needle: string) {
  const i = text.toLowerCase().indexOf(needle);
  if (i < 0) return "";
  const start = Math.max(0, i - 70);
  return (start > 0 ? "…" : "") + text.slice(start, i + needle.length + 110).replace(/\s+/g, " ") + "…";
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const needle = q.trim().toLowerCase();
  const d = await getData();
  const leads = await listLeads();
  const series = await getSeries();

  // Exact ID jumps straight to the page.
  const upper = q.trim().toUpperCase();
  const exists = d.ideas.has(upper) || d.concepts.has(upper) || d.shortlist.has(upper) || d.territories.has(upper) || d.groups.has(upper) || leads.some((l) => l.id === upper)
    || series.byId.has(upper) || series.segments.some((x) => x.id === upper) || series.connections.some((x) => x.id === upper);
  if (upper && exists) redirect(hrefForId(upper));

  const sections: { title: string; hits: Hit[] }[] = [];
  if (needle.length >= 2) {
    const score = (fields: [string, number][]) => fields.reduce((s, [f, w]) => s + (f.toLowerCase().includes(needle) ? w : 0), 0);
    const mk = (title: string, hits: Hit[]) => sections.push({ title, hits: hits.filter((h) => h.score > 0).sort((a, b) => b.score - a.score).slice(0, 60) });

    mk("Episode candidates", series.stories.map((s) => ({ id: s.id, label: `E${s.episode} ${s.title}`, score: score([[s.title, 5], [s.premise, 4], [s.fields?.place ?? "", 3], [s.fields?.subject ?? "", 2]]), snippet: snippet(s.premise, needle) || snippet(s.fields?.place ?? "", needle) })));
    mk("Research questions", [...d.shortlist.values()].map((s) => ({ id: s.id, label: s.heading, score: score([[s.heading, 5], [s.question, 4], [s.body, 1]]), snippet: snippet(s.question, needle) || snippet(s.body, needle) })));
    mk("Ideas", [...d.ideas.values()].map((i) => ({ id: i.id, label: i.title, score: score([[i.title, 5], [i.openQuestion, 4], [i.tags.join(" "), 3], [i.body, 1]]) + (i.status === "accepted for research" ? 0.5 : 0), snippet: snippet(i.openQuestion, needle) || snippet(i.body, needle), extra: i.score?.tier })));
    mk("Territories", [...d.territories.values()].map((t) => ({ id: t.id, label: t.name, score: score([[t.name, 5], [t.definition, 3], [t.body, 1]]), snippet: snippet(t.definition, needle) || snippet(t.body, needle) })));
    mk("Overlap groups", [...d.groups.values()].map((g) => ({ id: g.id, label: g.theme, score: score([[g.theme, 5], [g.body, 1]]), snippet: snippet(g.body, needle) })));
    mk("Concepts", [...d.concepts.values()].map((c) => ({ id: c.id, label: c.titleEn, score: score([[c.titleEn, 5], [c.titleSi, 5]]), snippet: c.titleSi })));
    mk("Story leads", leads.map((l) => ({ id: l.id, label: l.description, score: score([[l.description, 5], [l.sections.map((s) => s.content).join(" "), 1]]), snippet: snippet(l.sections.map((s) => s.content).join(" "), needle) })));
  }
  const total = sections.reduce((n, s) => n + s.hits.length, 0);

  return (
    <>
      <div className="kicker">Search</div>
      <h1>{q ? `Results for “${q}”` : "Search"}</h1>
      <form action="/search" className="search" style={{ marginBottom: 16 }}>
        <input name="q" defaultValue={q} autoFocus placeholder="grief, land, restraint, waiting, C006…" />
        <button type="submit">Search</button>
      </form>
      {needle.length > 0 && needle.length < 2 ? <p className="muted">Type at least two characters.</p> : null}
      {needle.length >= 2 ? <p className="muted small">{total} results</p> : null}
      {sections.filter((s) => s.hits.length).map((s) => (
        <section key={s.title}>
          <h2>{s.title} <span className="muted small">({s.hits.length})</span></h2>
          <div className="grid">
            {s.hits.map((h) => (
              <div key={h.id} className="card" style={{ padding: "10px 14px" }}>
                <div className="row">
                  <Chip id={h.id} label={h.label} />
                  {h.extra ? <TierBadge tier={h.extra} /> : null}
                </div>
                {h.snippet ? <div className="small muted" style={{ marginTop: 6 }}>{h.snippet}</div> : null}
              </div>
            ))}
          </div>
        </section>
      ))}
      {needle.length >= 2 && total === 0 ? <p>No matches. Try a broader word, or browse the <Link href="/ideas">idea bank</Link>.</p> : null}
    </>
  );
}
