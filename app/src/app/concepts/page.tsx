import Link from "next/link";
import { getData, type Concept } from "@/lib/content";
import { getDevelopment } from "@/lib/development";

export default async function ConceptsPage() {
  const [data, dev] = await Promise.all([getData(), getDevelopment()]);
  const chapters = new Map<number, Concept[]>();
  for (const concept of data.concepts.values()) {
    if (!chapters.has(concept.chapter)) chapters.set(concept.chapter, []);
    chapters.get(concept.chapter)!.push(concept);
  }

  return (
    <>
      <header className="page-header concept-catalogue-header">
        <div className="eyebrow">02 / Catalogue</div>
        <h1>Concepts</h1>
        <p>Explore the teachings chapter by chapter. Each concept brings together a readable overview and the original supporting extracts where available.</p>
        <div className="catalogue-summary" aria-label="Concept catalogue summary">
          <span><strong>{data.concepts.size}</strong> concepts</span>
          <span><strong>{chapters.size}</strong> chapters</span>
          <span><strong>{dev.digests.size}</strong> readable overviews</span>
        </div>
        <div className="actions">
          <Link className="button" href="/concepts/depth-map">Abhidhamma depth map →</Link>
        </div>
      </header>

      <form action="/search" className="page-search concept-search">
        <label className="sr-only" htmlFor="concept-search">Search concepts</label>
        <input id="concept-search" name="q" type="search" placeholder="Search by concept ID, Sinhala title, English title, or chapter" />
        <button className="button primary" type="submit">Search</button>
      </form>

      <nav className="chapter-nav" aria-label="Jump to chapter">
        {[...chapters.entries()].map(([chapter, concepts]) => (
          <a key={chapter} href={`#chapter-${chapter}`}>
            <span>Chapter {chapter}</span>
            <small>{concepts.length}</small>
          </a>
        ))}
      </nav>

      {[...chapters.entries()].map(([chapter, concepts]) => {
        const first = concepts[0]?.id;
        const last = concepts.at(-1)?.id;
        return (
          <section className="concept-section" id={`chapter-${chapter}`} key={chapter}>
            <div className="section-heading">
              <span>{String(chapter).padStart(2, "0")}</span>
              <div>
                <h2>Chapter {chapter}</h2>
                <small>{first}–{last}</small>
              </div>
              <small>{concepts.length} concepts</small>
            </div>
            <div className="concept-list">
              {concepts.map((concept) => {
                const digest = dev.digests.get(concept.id);
                return (
                  <Link className="concept-row" href={`/concepts/${concept.id}`} key={concept.id}>
                    <strong>{concept.id}</strong>
                    <span className="concept-copy">
                      <span>{concept.title}</span>
                      {digest ? <small>{digest.title_en}</small> : null}
                    </span>
                    <span className="concept-meta">
                      {digest ? <small className="badge">Overview</small> : null}
                      <small>{concept.sources.length} {concept.sources.length === 1 ? "source" : "sources"}</small>
                    </span>
                    <b aria-hidden="true">→</b>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}
