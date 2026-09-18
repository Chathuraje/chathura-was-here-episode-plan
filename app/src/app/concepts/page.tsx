import Link from "next/link";
import { getData, type Concept } from "@/lib/content";

export default async function ConceptsPage() {
  const data = await getData();
  const chapters = new Map<number, Concept[]>();
  for (const concept of data.concepts.values()) {
    if (!chapters.has(concept.chapter)) chapters.set(concept.chapter, []);
    chapters.get(concept.chapter)!.push(concept);
  }

  return (
    <>
      <header className="page-header">
        <div className="eyebrow">02 / Catalogue</div>
        <h1>Concepts</h1>
        <p>{data.concepts.size} concepts across {chapters.size} chapters. Open a concept to read its supporting source extracts.</p>
      </header>
      <nav className="chapter-nav" aria-label="Jump to chapter">
        {[...chapters.keys()].map((chapter) => <a key={chapter} href={`#chapter-${chapter}`}>Chapter {chapter}</a>)}
      </nav>
      {[...chapters.entries()].map(([chapter, concepts]) => (
        <section className="concept-section" id={`chapter-${chapter}`} key={chapter}>
          <div className="section-heading"><span>{String(chapter).padStart(2, "0")}</span><h2>Chapter {chapter}</h2><small>{concepts.length} concepts</small></div>
          <div className="concept-list">
            {concepts.map((concept) => (
              <Link className="concept-row" href={`/concepts/${concept.id}`} key={concept.id}>
                <strong>{concept.id}</strong>
                <span>{concept.title}</span>
                <small>{concept.sources.length} source {concept.sources.length === 1 ? "extract" : "extracts"}</small>
                <b aria-hidden="true">→</b>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
