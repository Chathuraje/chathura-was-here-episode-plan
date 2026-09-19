import Link from "next/link";
import { getData } from "@/lib/content";
import { type FramingEpisode, getDevelopment, TARGET_DEVELOPMENT_FILMS, TARGET_GROUPS } from "@/lib/development";

export default async function ArcPage() {
  const [data, dev] = await Promise.all([getData(), getDevelopment()]);
  const assigned = dev.conceptGroup.size;
  const unassigned = [...data.concepts.keys()].filter((id) => !dev.conceptGroup.has(id));
  const filmsOk = dev.draftFilmTotal === TARGET_DEVELOPMENT_FILMS;
  const episodeOne = dev.framing.find((episode) => episode.release.public_number === 1);
  const episodeOneHundred = dev.framing.find((episode) => episode.release.public_number === 100);
  let nextFilm = 1;
  const groups = dev.groups.map((group) => {
    const firstFilm = nextFilm;
    const lastFilm = firstFilm + group.draft_film_count - 1;
    nextFilm = lastFilm + 1;
    return { group, firstFilm, lastFilm };
  });

  return (
    <>
      <header className="page-header arc-page-header">
        <div className="eyebrow">03 / Series journey</div>
        <h1>Story arc</h1>
        <p>Review the draft story chronology across ten connected stages. The ordinary public structure is Episodes 1–99; Episode 100 keeps its identity but is hidden/discoverable outside that structure.</p>
        <div className="catalogue-summary" aria-label="Story arc summary">
          <span><strong>99</strong> ordinary public episodes</span>
          <span><strong>{dev.groups.length}</strong> story groups</span>
          <span><strong>{assigned}</strong> concepts placed</span>
        </div>
      </header>

      <nav className="arc-order" aria-label="Jump through the series order">
        <a className="arc-order-bookend" href="#episode-1"><span>Episode 1</span><small>Opening</small></a>
        {groups.map(({ group, firstFilm, lastFilm }) => (
          <a href={`#${group.id}`} key={group.id}>
            <span>{String(group.chronological_position).padStart(2, "0")}</span>
            <small>Film {firstFilm}–{lastFilm}</small>
          </a>
        ))}
        <a className="arc-order-bookend" href="#episode-100"><span>Episode 100</span><small>Hidden / discoverable</small></a>
      </nav>

      <section className="summary arc-summary" aria-label="Arc development status">
        <div><strong>{dev.groups.length}/{TARGET_GROUPS}</strong><span>groups structured</span></div>
        <div><strong className={filmsOk ? "" : "warn"}>{dev.draftFilmTotal}/{TARGET_DEVELOPMENT_FILMS}</strong><span>middle episodes planned</span></div>
        <div><strong className={unassigned.length ? "warn" : ""}>{assigned}/{data.concepts.size}</strong><span>concepts placed</span></div>
        <div><strong>{dev.objects.size}</strong><span>journey objects</span></div>
      </section>

      {unassigned.length > 0 ? <p className="notice warn">Concepts not yet placed in a group: {unassigned.join(", ")}</p> : null}

      <div className="arc-sequence">
        {episodeOne ? <FramingCard episode={episodeOne} label="The opening frame" /> : null}

        <section className="arc-middle" aria-labelledby="middle-journey">
          <div className="content-section-head">
            <div>
              <span className="eyebrow">Episodes 2–99</span>
              <h2 id="middle-journey">The journey in ten stages</h2>
            </div>
            <p>Each group connects a cluster of concepts to one emotional stage and one part of the journey.</p>
          </div>
          <div className="group-grid">
            {groups.map(({ group, firstFilm, lastFilm }) => {
              const object = dev.objects.get(group.object_id);
              const overviewCount = group.concepts.filter((concept) => dev.digests.has(concept.id)).length;
              return (
                <Link className="group-card" href={`/arc/${group.id}`} id={group.id} key={group.id}>
                  <div className="group-card-head">
                    <span className="group-number">Stage {String(group.chronological_position).padStart(2, "0")}</span>
                    <span className="badge">Chronology {firstFilm}–{lastFilm}</span>
                  </div>
                  <div className="group-stage">{group.emotional_stage}</div>
                  <h3>{group.title}</h3>
                  <p>{group.human_question}</p>
                  <div className="group-meta">
                    <span>{group.draft_film_count} development films</span>
                    <span>{group.concepts.length} concepts</span>
                    <span>{overviewCount} overviews</span>
                    <span>{object?.title ?? group.object_id}</span>
                  </div>
                  <strong className="group-card-action">Explore this stage <span aria-hidden="true">→</span></strong>
                </Link>
              );
            })}
          </div>
        </section>

        {episodeOneHundred ? <FramingCard episode={episodeOneHundred} label="The hidden frame" /> : null}
      </div>

      <p className="notice arc-continuity-note">
        <strong>Continuity note:</strong> Episode 100 is not a normal public finale. It is hidden/discoverable and deliberately surrounds Episode 1 in story time: Episode 100 Part A → Episode 1 → Episode 100 Part B.
      </p>
    </>
  );
}

function FramingCard({ episode, label }: { episode: FramingEpisode; label: string }) {
  return (
    <section className="framing-card" id={`episode-${episode.release.public_number}`}>
      <div className="framing-card-number">
        <span>{label}</span>
        <strong>{String(episode.release.public_number).padStart(3, "0")}</strong>
      </div>
      <div className="framing-card-copy">
        <div className="framing-card-title">
          <div><span>Episode {episode.release.public_number}</span><h2>{episode.title}</h2></div>
          <span className="badge">{episode.release.status}</span>
        </div>
        <p>{episode.screenplay_guide?.narrative_function ?? (episode.release.public_number === 1
          ? "The audience's first encounter with the journey and the event that Episode 100 later revisits."
          : "The final episode returns to the opening material, reveals the accumulated objects, and continues beyond it.")}</p>
        {episode.screenplay_guide ? (
          <div className="episode-guide-meta">
            <span>{episode.screenplay_guide.genre}</span>
            <span>Runtime {episode.screenplay_guide.runtime.range}</span>
            <span>Target {episode.screenplay_guide.runtime.editorial_target}</span>
            <span>Narration {episode.screenplay_guide.runtime.narration_target}</span>
          </div>
        ) : null}
        <div className="framing-card-details">
          <details>
            <summary>View key story beats</summary>
            <ol>{episode.sequence.map((step) => <li key={step}>{step}</li>)}</ol>
          </details>
          {episode.screenplay_guide ? <EpisodeGuide episode={episode} /> : null}
        </div>
      </div>
      <a className="button" href={episode.external_screenplay} target="_blank" rel="noreferrer">Open full screenplay <span aria-hidden="true">↗</span></a>
    </section>
  );
}

function EpisodeGuide({ episode }: { episode: FramingEpisode }) {
  const guide = episode.screenplay_guide;
  if (!guide) return null;
  return (
    <details className="episode-guide">
      <summary>View extracted episode guide</summary>
      <div className="episode-guide-body">
        <p className="episode-guide-scope">{guide.scope}</p>
        <div className="episode-guide-grid">
          <section><h3>Visual approach</h3><ul>{guide.visual_approach.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><h3>Sound approach</h3><ul>{guide.sound_approach.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><h3>Primary locations</h3><ul>{guide.primary_locations.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><h3>People on screen</h3><ul>{guide.participants.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><h3>Information reveal</h3><p>{guide.information_reveal.method}</p>{guide.information_reveal.order.length ? <ol>{guide.information_reveal.order.map((item) => <li key={item}>{item}</li>)}</ol> : null}<p>{guide.information_reveal.location_name_policy}</p></section>
          <section><h3>Editorial priorities</h3><ul>{guide.editorial_priorities.map((item) => <li key={item}>{item}</li>)}</ul></section>
        </div>
        <section className="episode-continuity"><h3>Continuity hooks</h3><ul>{guide.continuity_hooks.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <p className="episode-evidence-boundary"><strong>Evidence boundary:</strong> {guide.evidence_boundary}</p>
      </div>
    </details>
  );
}
