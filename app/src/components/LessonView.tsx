import Link from "next/link";
import type { EpisodeLesson, GroupLesson } from "@/lib/development";

export function EpisodeLessonView({ lesson }: { lesson: EpisodeLesson }) {
  return (
    <section className="source-document lesson" id="lesson">
      <div className="source-document-head">
        <div><span>What the viewer learns · {lesson.status}</span><h2>{lesson.in_simple_terms}</h2></div>
      </div>
      <p className="lesson-si">{lesson.in_simple_terms_si}</p>
      <div className="layer-grid">
        <div className="layer-depth">
          <span className="layer-label">What the Abhidhamma teaches behind it</span>
          <p>{lesson.the_teaching}</p>
          <p className="panel-note">
            Sources:{" "}
            {lesson.sources.map((source, index) => (
              <span key={source.concept_id}>
                {index ? " · " : ""}
                <Link className="id-link" href={`/concepts/${source.concept_id}`}>{source.concept_id}</Link> ({source.citations.join(", ")})
              </span>
            ))}
          </p>
        </div>
        <div><span className="layer-label">How the film lets the viewer notice it</span><p>{lesson.how_the_film_shows_it}</p></div>
        <div className="lesson-row">
          <div><span className="layer-label">Key terms</span>
            <ul className="plain-list">{lesson.key_terms.map((term) => <li key={term.en}><b>{term.en}</b>{term.pali ? ` · ${term.pali}` : ""}{term.si ? ` · ${term.si}` : ""}</li>)}</ul>
          </div>
          <div><span className="layer-label">What it does not mean</span><p>{lesson.caution}</p></div>
        </div>
        <div><span className="layer-label">Builds on</span><p>{lesson.builds_on}</p></div>
      </div>
      <p className="panel-note"><em>{lesson.evidence_class}</em></p>
    </section>
  );
}

export function GroupLessonView({ lesson }: { lesson: GroupLesson }) {
  return (
    <section className="source-document lesson" id="lesson">
      <div className="source-document-head">
        <div><span>What this stage teaches · {lesson.status}</span><h2>{lesson.in_simple_terms}</h2></div>
      </div>
      <p className="lesson-si">{lesson.in_simple_terms_si}</p>
      <div className="layer-grid">
        <div className="layer-depth">
          <span className="layer-label">The teaching underneath</span><p>{lesson.the_teaching}</p>
          <p className="panel-note">
            Sources: {lesson.sources.map((source, index) => (
              <span key={source.concept_id}>
                {index ? " · " : ""}
                <Link className="id-link" href={`/concepts/${source.concept_id}`}>{source.concept_id}</Link> ({source.citations.join(", ")})
              </span>
            ))}
          </p>
        </div>
        <div><span className="layer-label">Film by film</span><ol className="arc-steps">{lesson.progression.map((step) => <li key={step}>{step}</li>)}</ol></div>
        <div className="lesson-row">
          <div><span className="layer-label">Builds on</span><p>{lesson.builds_on}</p></div>
          <div><span className="layer-label">Leaves for the next stage</span><p>{lesson.hands_to_next}</p></div>
        </div>
      </div>
      <p className="panel-note"><em>{lesson.evidence_class}</em></p>
    </section>
  );
}
