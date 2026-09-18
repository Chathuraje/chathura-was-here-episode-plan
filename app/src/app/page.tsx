import Link from "next/link";
import { getData } from "@/lib/content";
import { getDevelopment } from "@/lib/development";

export default async function Home() {
  const [data, dev] = await Promise.all([getData(), getDevelopment()]);
  const chapters = new Set([...data.concepts.values()].map((concept) => concept.chapter)).size;
  const extracts = [...data.concepts.values()].reduce((total, concept) => total + concept.sources.length, 0);

  return (
    <div className="home">
      <header className="hero">
        <div className="eyebrow">Knowledge library</div>
        <h1>Sources and concepts</h1>
        <p>Read the original source material, browse the concepts extracted from it, and review how they become a 100-film story arc.</p>
        <div className="actions">
          <Link className="button primary" href="/concepts">Browse concepts</Link>
          <Link className="button" href="/arc">Review story arc</Link>
          <Link className="button" href="/sources">Open sources</Link>
        </div>
      </header>

      <section className="summary" aria-label="Library summary">
        <div><strong>{data.docs.sources.length}</strong><span>source documents</span></div>
        <div><strong>{data.concepts.size}</strong><span>concepts</span></div>
        <div><strong>{chapters}</strong><span>chapters</span></div>
        <div><strong>{extracts}</strong><span>concept extracts</span></div>
      </section>

      <section className="pipeline" aria-label="Development pipeline">
        {[
          { label: "Concept digests", value: `${dev.digests.size}/${data.concepts.size}`, href: "/arc" },
          { label: "Candidate ideas", value: String(dev.ideas.length), href: "/ideas" },
          { label: "Films in slate", value: `${dev.episodes.length}/98`, href: "/chronology" },
          { label: "Locations chosen", value: `${dev.episodes.filter((episode) => episode.location.selected_location_id).length}/${dev.episodes.length || 98}`, href: "/chronology" },
          { label: "Release plan", value: "after locations", href: "/release" },
          { label: "Screenplays", value: "after locations", href: "/chronology" },
        ].map((step, index) => (
          <Link key={step.label} href={step.href} className="pipeline-step">
            <span>{String(index + 2).padStart(2, "0")}</span>
            <strong>{step.value}</strong>
            <small>{step.label}</small>
          </Link>
        ))}
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
        <Link className="feature-card" href="/arc">
          <span className="feature-index">03</span>
          <div><h2>Story arc</h2><p>{dev.groups.length} chronological groups, {dev.draftFilmTotal} draft films, {dev.conceptGroup.size} concepts placed. Draft for review.</p></div>
          <span className="feature-arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
