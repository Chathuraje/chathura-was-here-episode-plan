import Link from "next/link";
import { getDevelopment } from "@/lib/development";

export default async function LearningPage() {
  const dev = await getDevelopment();
  const withLesson = dev.episodes.filter((episode) => episode.lesson).length;
  const empty = dev.episodes.length === 0;

  return (
    <>
      <header className="page-header">
        <div className="eyebrow">The series as a course</div>
        <h1>Learning path</h1>
        <p>
          What a viewer comes to understand, film by film, in story order. Each lesson is written in simple terms, grounded in the
          Abhidhamma source texts, and discovered through what the film shows, never lectured. {withLesson}/{dev.episodes.length} films
          have a lesson.
        </p>
      </header>

      {empty && (
        <div className="empty-state">
          <h2>No lessons yet</h2>
          <p>
            The learning path has been cleared along with the chronology. Each lesson belongs to a film, so this page fills
            up again once a slate is rebuilt from the confirmed ideas.
          </p>
          <p><Link className="button primary" href="/ideas">Review ideas</Link> <Link className="button" href="/concepts/depth-map">Depth map</Link></p>
        </div>
      )}

      {!empty && dev.groups.map((group) => {
        const episodes = dev.episodes.filter((episode) => episode.chronology.group_id === group.id);
        return (
          <section className="concept-section learning-group" key={group.id} id={group.id}>
            <div className="section-heading">
              <span>{String(group.chronological_position).padStart(2, "0")}</span>
              <h2><Link href={`/arc/${group.id}#lesson`}>{group.title}</Link> <small className="muted-inline">{group.emotional_stage}</small></h2>
              <small>{episodes.length} films</small>
            </div>
            {group.lesson ? (
              <div className="learning-group-lesson">
                <p><b>{group.lesson.in_simple_terms}</b></p>
                <p className="lesson-si">{group.lesson.in_simple_terms_si}</p>
              </div>
            ) : <p className="muted-note">Group lesson not written yet.</p>}
            <ol className="learning-list">
              {episodes.map((episode) => (
                <li key={episode.id}>
                  <Link href={`/episodes/${episode.id}#lesson`}>
                    <span className="learning-n">{String(episode.chronology.global_position).padStart(2, "0")}</span>
                    <span>
                      <b>{episode.title}</b>
                      {episode.lesson ? (
                        <>
                          <span className="learning-text">{episode.lesson.in_simple_terms}</span>
                          <span className="learning-si">{episode.lesson.in_simple_terms_si}</span>
                        </>
                      ) : <span className="learning-text muted-note">Lesson not written yet.</span>}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        );
      })}

      {!empty && <p className="notice">After the last film: the crowd → Episode 100 &ldquo;The Way Back&rdquo;, where the whole journey is seen again with new eyes.</p>}
    </>
  );
}
