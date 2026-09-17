import Link from "next/link";
import { getData } from "@/lib/content";

export default async function ConceptsPage() {
  const d = await getData();
  const chapters = new Map<number, typeof d.concepts extends Map<string, infer C> ? C[] : never>();
  for (const c of d.concepts.values()) {
    if (!chapters.has(c.chapter)) chapters.set(c.chapter, []);
    chapters.get(c.chapter)!.push(c);
  }
  return (
    <>
      <div className="kicker">02 · Concepts</div>
      <h1>Concepts</h1>
      <p className="lede">{d.concepts.size} Abhidhamma concepts across {chapters.size} chapters. Each links to its source extracts, source note and the ideas drawn from it.</p>
      {[...chapters.entries()].map(([ch, list]) => (
        <section key={ch}>
          <h2>Chapter {ch}</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>ID</th><th>Concept</th><th>Sinhala title</th><th>Sources</th><th>Ideas</th><th>Status</th></tr>
              </thead>
              <tbody>
                {list.map((c) => {
                  const accepted = c.ideaIds.filter((i) => d.ideas.get(i)?.status === "accepted for research").length;
                  return (
                    <tr key={c.id}>
                      <td><Link href={`/concepts/${c.id}`} className="id-link">{c.id}</Link></td>
                      <td><Link href={`/concepts/${c.id}`}>{c.titleEn || "—"}</Link></td>
                      <td>{c.titleSi}</td>
                      <td className="num">{c.sources.length}</td>
                      <td className="num">{c.ideaIds.length ? `${accepted}/${c.ideaIds.length}` : "—"}</td>
                      <td className="small">{c.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </>
  );
}
