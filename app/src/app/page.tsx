import Link from "next/link";
import { getData } from "@/lib/content";

export default async function Home() {
  const data = await getData();
  const chapters = new Set([...data.concepts.values()].map((concept) => concept.chapter)).size;
  const extracts = [...data.concepts.values()].reduce((total, concept) => total + concept.sources.length, 0);

  return (
    <div className="home">
      <header className="hero">
        <div className="eyebrow">Knowledge library</div>
        <h1>Sources and concepts</h1>
        <p>Read the original source material and browse the concepts extracted from it. These are the only two content layers in this workspace.</p>
        <div className="actions">
          <Link className="button primary" href="/concepts">Browse concepts</Link>
          <Link className="button" href="/sources">Open sources</Link>
        </div>
      </header>

      <section className="summary" aria-label="Library summary">
        <div><strong>{data.docs.sources.length}</strong><span>source documents</span></div>
        <div><strong>{data.concepts.size}</strong><span>concepts</span></div>
        <div><strong>{chapters}</strong><span>chapters</span></div>
        <div><strong>{extracts}</strong><span>concept extracts</span></div>
      </section>

      <div className="feature-grid">
        <Link className="feature-card" href="/sources">
          <span className="feature-index">01</span>
          <div><h2>Sources</h2><p>Original texts, source maps, and extraction references.</p></div>
          <span className="feature-arrow" aria-hidden="true">→</span>
        </Link>
        <Link className="feature-card" href="/concepts">
          <span className="feature-index">02</span>
          <div><h2>Concepts</h2><p>All extracted concepts, grouped by chapter with their supporting text.</p></div>
          <span className="feature-arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
