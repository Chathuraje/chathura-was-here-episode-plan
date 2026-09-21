import Link from "next/link";
import { getData } from "@/lib/content";
import { getDevelopment, orderedIdeas } from "@/lib/development";

export default async function Home() {
  const [data, dev] = await Promise.all([getData(), getDevelopment()]);
  const chapters = new Set([...data.concepts.values()].map((concept) => concept.chapter)).size;
  const extracts = [...data.concepts.values()].reduce((total, concept) => total + concept.sources.length, 0);
  const primarySources = data.docs.sources.filter((doc) => doc.kind === "primary-source").length;
  const ideas = orderedIdeas(dev);
  const confirmed = ideas.filter((idea) => idea.review.status === "confirmed").length;
  const placedIdeas = ideas.filter((idea) => idea.suggested_location).length;

  return (
    <div className="home">
      <header className="hero">
        <div className="eyebrow">Knowledge library</div>
        <h1>Sources and concepts</h1>
        <p>Read the source material, then work through the candidate ideas: confirm, hold or reject each one, and give the confirmed ones a location.</p>
        <div className="actions">
          <Link className="button primary" href="/ideas">Review ideas</Link>
          <Link className="button" href="/locations">Locations</Link>
          <Link className="button" href="/concepts">Browse concepts</Link>
          <Link className="button" href="/sources">Open sources</Link>
        </div>
      </header>

      <section className="summary" aria-label="Library summary">
        <div><strong>{primarySources}</strong><span>primary source volumes</span></div>
        <div><strong>{data.concepts.size}</strong><span>concepts</span></div>
        <div><strong>{chapters}</strong><span>chapters</span></div>
        <div><strong>{extracts}</strong><span>concept extracts</span></div>
      </section>

      <section className="pipeline" aria-label="Development pipeline">
        {[
          { label: "Concept digests", value: `${dev.digests.size}/${data.concepts.size}`, href: "/arc" },
          { label: "Ideas confirmed", value: `${confirmed}/${ideas.length}`, href: "/ideas" },
          { label: "Ideas with a location", value: `${placedIdeas}/${ideas.length}`, href: "/locations" },
          { label: "Films in slate", value: `${dev.episodes.length}/98`, href: "/chronology" },
          { label: "Release plan", value: "proposal only", href: "/release" },
          { label: "Screenplays", value: `${new Set(dev.screenplays.filter((version) => version.stage === "production").map((version) => version.episode_id)).size}/98`, href: "/screenplays" },
        ].map((step, index) => (
          <Link key={step.label} href={step.href} className="pipeline-step">
            <span>{String(index + 2).padStart(2, "0")}</span>
            <strong>{step.value}</strong>
            <small>{step.label}</small>
          </Link>
        ))}
      </section>

      <p className="notice">
        Current human gate: <b>CHATHURA — IDEA REVIEW</b>, GRP-01 → GRP-10. Set each idea to confirmed, pending or rejected,
        then give the confirmed ones a location. The chronology and learning path have been cleared and are rebuilt from
        that work; rejected ideas stay on file so replacements can be generated.
      </p>

      <div className="feature-grid">
        <Link className="feature-card" href="/sources">
          <span className="feature-index">01</span>
          <div><h2>Sources</h2><p>Primary texts, source maps, and clearly separated extraction guides.</p></div>
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
        <Link className="feature-card" href="/concepts/depth-map">
          <span className="feature-index">A</span>
          <div><h2>Abhidhamma depth</h2><p>Concept, mechanism, and group-level teaching depth. Lives under Concepts.</p></div>
          <span className="feature-arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
