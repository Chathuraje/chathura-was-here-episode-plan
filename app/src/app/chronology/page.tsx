import Link from "next/link";
import { getDevelopment, orderedIdeas, TARGET_DEVELOPMENT_FILMS } from "@/lib/development";

export default async function ChronologyPage() {
  const dev = await getDevelopment();
  const selected = dev.episodes.filter((episode) => episode.location.selected_location_id).length;
  const confirmed = orderedIdeas(dev).filter((idea) => idea.review.status === "confirmed").length;

  return (
    <>
      <header className="page-header">
        <div className="eyebrow">06 / Main order</div>
        <h1>Chronology</h1>
        <p>
          The 98 development films in story order, the order of Chathura&apos;s journey. ● marks the film where a group&apos;s object is
          acquired; ○ marks planned appearances. Release order is separate and never changes this order.
        </p>
      </header>

      <section className="summary" aria-label="Chronology summary">
        <div><strong className={dev.episodes.length === TARGET_DEVELOPMENT_FILMS ? "" : "warn"}>{dev.episodes.length}/{TARGET_DEVELOPMENT_FILMS}</strong><span>films in the slate</span></div>
        <div><strong>{dev.episodes.filter((episode) => episode.object.acquires).length}/10</strong><span>object acquisitions placed</span></div>
        <div><strong>{selected}/{dev.episodes.length}</strong><span>locations chosen by Chathura</span></div>
        <div><strong>{dev.episodes.filter((episode) => episode.status === "approved").length}</strong><span>approved</span></div>
      </section>

      {dev.episodes.length === 0 && (
        <div className="empty-state">
          <h2>No slate yet</h2>
          <p>
            The chronology has been cleared. It gets rebuilt from the ideas Chathura confirms, once each of them has a
            location. {confirmed} idea{confirmed === 1 ? " is" : "s are"} confirmed so far.
          </p>
          <p><Link className="button primary" href="/ideas">Review ideas</Link> <Link className="button" href="/locations">Locations</Link></p>
        </div>
      )}

      {dev.groups.map((group) => {
        const episodes = dev.episodes.filter((episode) => episode.chronology.group_id === group.id);
        if (!episodes.length) return null;
        return (
          <section className="concept-section" key={group.id} id={group.id}>
            <div className="section-heading">
              <span>{String(group.chronological_position).padStart(2, "0")}</span>
              <h2><Link href={`/arc/${group.id}`}>{group.title}</Link> <small className="muted-inline">{group.emotional_stage}</small></h2>
              <small>{episodes.length} films · {group.object_id}</small>
            </div>
            <div className="concept-list">
              {episodes.map((episode) => (
                <Link className="chrono-row" href={`/episodes/${episode.id}`} key={episode.id}>
                  <strong>{String(episode.chronology.global_position).padStart(2, "0")}</strong>
                  <span className="object-mark" title={episode.object.acquires ? `Acquires ${episode.object.acquires}` : episode.object.appears.join(", ")}>
                    {episode.object.acquires ? "●" : episode.object.appears.length ? "○" : ""}
                  </span>
                  <div>
                    <b>{episode.title}</b>
                    <span>{episode.thread_out.thread}</span>
                  </div>
                  <small className={episode.location.selected_location_id ? "" : "warn"}>
                    {episode.location.selected_location_id ? dev.places.get(episode.location.selected_location_id)?.name : "location: awaiting"}
                  </small>
                  <em>{episode.release.public_number ? `Ep ${episode.release.public_number}` : ""}</em>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {dev.episodes.length > 0 && (
        <p className="notice">After the last film: the crowded-location event → Episode 100 Part A → Episode 1 → Episode 100 Part B.</p>
      )}
    </>
  );
}
