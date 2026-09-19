import Link from "next/link";
import { notFound } from "next/navigation";
import { getData } from "@/lib/content";
import IdeaList from "@/components/IdeaList";
import { GroupLessonView } from "@/components/LessonView";
import { getDevelopment } from "@/lib/development";

export default async function GroupPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id.toUpperCase();
  const [data, dev] = await Promise.all([getData(), getDevelopment()]);
  const index = dev.groups.findIndex((group) => group.id === id);
  if (index < 0) notFound();

  const group = dev.groups[index];
  const object = dev.objects.get(group.object_id);
  const previous = dev.groups[index - 1];
  const next = dev.groups[index + 1];
  const ideas = dev.ideas.filter((idea) => idea.group_id === group.id);
  const digested = group.concepts.filter((concept) => dev.digests.has(concept.id)).length;
  const firstFilm = 1 + dev.groups.slice(0, index).reduce((total, item) => total + item.draft_film_count, 0);
  const lastFilm = firstFilm + group.draft_film_count - 1;

  return (
    <>
      <Link className="back-link" href="/arc">← Complete story arc</Link>
      <header className="page-header concept-header">
        <div className="eyebrow">Stage {String(group.chronological_position).padStart(2, "0")} / {group.emotional_stage}</div>
        <h1>{group.title}</h1>
        <p className="lead-question">{group.human_question}</p>
        <div className="concept-header-meta">
          <span>Chronology {firstFilm}–{lastFilm}</span>
          <span>{group.concepts.length} concepts</span>
          <span>{digested} readable overviews</span>
          <span>{ideas.length} candidate ideas</span>
        </div>
      </header>

      <div className="concept-layout">
        <article className="source-stack">
          <section className="source-document" id="overview">
            <div className="source-document-head"><div><span>Stage overview</span><h2>The movement of this part of the journey</h2></div></div>
            <div className="layer-grid">
              <div><span className="layer-label">Journey</span><p>{group.journey}</p></div>
              <div><span className="layer-label">What the viewer feels</span><p>{group.surface}</p></div>
              <div className="layer-depth"><span className="layer-label">What the source material explores underneath</span><p>{group.depth}</p></div>
            </div>
          </section>

          {group.lesson ? <GroupLessonView lesson={group.lesson} /> : null}

          <section className="source-document" id="episode-shape">
            <div className="source-document-head"><div><span>Development films {firstFilm}–{lastFilm}</span><h2>How this stage develops</h2></div></div>
            <div className="arc-phase-grid">
              <div><span>01</span><b>Opening</b><p>{group.arc.opening}</p></div>
              <div><span>02</span><b>Middle</b><p>{group.arc.middle}</p></div>
              <div><span>03</span><b>Closing</b><p>{group.arc.closing}</p></div>
            </div>
            <p className="hands-off"><strong>Handoff to the next stage:</strong> {group.hands_off}</p>
          </section>

          <section className="source-document" id="concepts">
            <div className="source-document-head">
              <div><span>Concept cluster</span><h2>{group.concepts.length} connected concepts</h2></div>
              <span className="badge">{digested} overviews</span>
            </div>
            <div className="arc-concept-list">
              {group.concepts.map((concept) => {
                const sourceConcept = data.concepts.get(concept.id);
                const digest = dev.digests.get(concept.id);
                return (
                  <Link href={`/concepts/${concept.id}`} className="arc-concept-row" key={concept.id}>
                    <strong>{concept.id}</strong>
                    <span>
                      <b>{sourceConcept?.title ?? "Missing concept"}</b>
                      {digest ? <small>{digest.title_en}</small> : null}
                    </span>
                    <small>{concept.role}</small>
                    <em className={digest ? "badge" : "badge pending"}>{digest ? "Overview" : "Pending"}</em>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="source-document" id="ideas">
            <div className="source-document-head">
              <div><span>Candidate ideas</span><h2>{ideas.length} ideas for {group.draft_film_count} episodes</h2></div>
            </div>
            {ideas.length ? <IdeaList ideas={ideas} /> : <p className="muted-note">Ideas are drafted after this group&apos;s concept overviews.</p>}
          </section>
        </article>

        <aside className="concept-aside">
          <section className="panel concept-on-page">
            <h2>On this page</h2>
            <nav aria-label="Story stage sections">
              <a href="#overview">Stage overview</a>
              {group.lesson ? <a href="#lesson">What this stage teaches</a> : null}
              <a href="#episode-shape">Episode progression</a>
              <a href="#concepts">Concept cluster</a>
              <a href="#ideas">Candidate ideas</a>
            </nav>
          </section>
          <section className="panel">
            <span className="layer-label">Journey object</span>
            <h2>{object?.title ?? group.object_id}</h2>
            <p className="panel-note">Identity: {object?.identity ?? "not chosen yet"}</p>
            <p className="panel-note">Planned acquisition: {object?.planned_acquisition.where}</p>
            {object?.symbolic_hint ? <p className="panel-note"><em>Suggestion: {object.symbolic_hint.text}</em></p> : null}
          </section>
          {group.unknowns.length ? (
            <section className="panel">
              <h2>Still to decide</h2>
              <ul>{group.unknowns.map((unknown) => <li key={unknown}>{unknown}</li>)}</ul>
            </section>
          ) : null}
          <nav className="previous-next" aria-label="Previous and next story stages">
            {previous
              ? <Link href={`/arc/${previous.id}`}><span>Previous stage</span><strong>← {previous.title}</strong></Link>
              : <Link href="/arc#episode-1"><span>Series opening</span><strong>← Episode 1</strong></Link>}
            {next
              ? <Link href={`/arc/${next.id}`}><span>Next stage</span><strong>{next.title} →</strong></Link>
              : <Link href="/arc#episode-100"><span>Series finale</span><strong>Episode 100 →</strong></Link>}
          </nav>
        </aside>
      </div>
    </>
  );
}
