import Link from "next/link";
import { notFound } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import { clearLocation, selectLocation } from "@/app/location-actions";
import { buildEpisodeBrief, briefToMarkdown } from "@/lib/brief";

export default async function EpisodePage({ params }: { params: Promise<{ id: string }> }) {
  const brief = await buildEpisodeBrief((await params).id.toUpperCase());
  if (!brief?.episode) notFound();
  const { idea, group } = brief;
  const context = brief.episode;
  const episode = context.episode;
  const markdown = briefToMarkdown(brief);
  const location = episode.location;

  return (
    <>
      <Link className="back-link" href={`/chronology#${episode.chronology.group_id}`}>← Chronology</Link>
      <header className="page-header concept-header">
        <div className="eyebrow">
          {episode.id} / film {episode.chronology.global_position} of 98 / {group?.title} #{episode.chronology.position_in_group} / {episode.status}
        </div>
        <h1>{episode.title}</h1>
        <p>{episode.logline}</p>
        <div className="actions">
          <CopyButton text={markdown} label="Copy episode brief" />
          <a className="button" href={`/api/episodes/${episode.id}?format=md`} target="_blank" rel="noreferrer">Open as Markdown</a>
          <a className="button" href={`/api/episodes/${episode.id}`} target="_blank" rel="noreferrer">JSON for agents</a>
          <Link className="button" href={`/ideas/${idea.id}`}>Idea {idea.id}</Link>
        </div>
      </header>

      <div className="concept-layout">
        <article className="source-stack">
          <section className="source-document">
            <div className="source-document-head"><div><span>Continuity</span><h2>Where this film sits</h2></div></div>
            <div className="layer-grid">
              <div>
                <span className="layer-label">Comes from</span>
                <p>{context.previous ? <Link href={`/episodes/${context.previous.id}`}>{context.previous.title}</Link> : "The start of the journey"}: {episode.thread_in.thread}</p>
              </div>
              <div>
                <span className="layer-label">Leads to</span>
                <p>{context.next ? <Link href={`/episodes/${context.next.id}`}>{context.next.title}</Link> : "The crowd → Episode 100"}: {episode.thread_out.thread}</p>
              </div>
              <div className="layer-depth">
                <span className="layer-label">Object</span>
                <p>
                  {episode.object.acquires ? <>This film is where <b>{episode.object.acquires}</b> is acquired. </> : null}
                  {episode.object.appears.length ? <>Planned appearances: {episode.object.appears.join(", ")}. </> : null}
                  {episode.object.note}
                </p>
                <p className="panel-note">Planned as owned by now: {context.owned_objects.join(", ") || "none"}.</p>
              </div>
            </div>
          </section>

          <section className="source-document">
            <div className="source-document-head"><div><span>Screenplay</span><h2>{
              context.next_stage === "blocked_location" ? "Waiting for Chathura's location choice"
                : context.next_stage === "complete" ? "Production screenplay ready"
                : `Next: ${context.next_stage.replace("_", " ")}`
            }</h2></div></div>
            <div className="chip-list">
              {(["treatment", "scene_outline", "production"] as const).map((stage) => {
                const version = context.stages[stage];
                return version
                  ? <Link key={stage} href={`/screenplays/${version.id}`}>{stage.replace("_", " ")} v{version.version} · {version.status}</Link>
                  : <span className="chip-static" key={stage}>{stage.replace("_", " ")}: not yet</span>;
              })}
            </div>
            {context.next_stage !== "blocked_location" && context.next_stage !== "complete" && (
              <p className="panel-note">Copy the episode brief and give it to an AI with <code>docs/planning/prompts/screenplay-brief.md</code>, or ask Claude to write the next stage for {episode.id}.</p>
            )}
          </section>

          <section className="source-document">
            <p className="lead-question">{idea.human_question}</p>
            <div className="layer-grid">
              <div><span className="layer-label">Story</span><p>{idea.premise.story}</p></div>
              <div><span className="layer-label">Place</span><p>{idea.premise.place}</p></div>
              <div><span className="layer-label">Experience</span><p>{idea.premise.experience}</p></div>
            </div>
            <p className="panel-note">Concepts: {brief.concepts.map((concept) => `${concept.id} (${concept.role})`).join(" · ")}</p>
          </section>
        </article>

        <aside className="concept-aside">
          <section className="panel location-panel">
            <h2>Location, Chathura&apos;s choice</h2>
            {location.selected_location_id ? (
              <>
                <p className="panel-note"><b>Selected:</b> {context.place?.name}, {context.place?.region}</p>
                <p className="panel-note">Name reveal: {location.name_reveal_policy} · decision {location.selected_location_decision_id}</p>
                <form action={clearLocation}>
                  <input type="hidden" name="episode_id" value={episode.id} />
                  <button className="button subtle" type="submit">Clear selection</button>
                </form>
              </>
            ) : (
              <p className="panel-note warn">No location selected. Treatment and screenplay work waits for this.</p>
            )}
            <span className="layer-label">Requirements</span>
            <ul>{location.requirements.map((item) => <li key={item}>{item}</li>)}</ul>

            <form action={selectLocation} className="location-form">
              <input type="hidden" name="episode_id" value={episode.id} />
              <span className="layer-label">Choose</span>
              {location.suggestions.map((suggestion, index) => (
                <label key={suggestion.name} className="choice">
                  <input type="radio" name="choice" value={`s:${index}`} required />
                  <span><b>{suggestion.name}</b>, {suggestion.region}. <em>AI suggestion.</em> {suggestion.why} <small>Verify: {suggestion.verify}</small></span>
                </label>
              ))}
              <label className="choice">
                <input type="radio" name="choice" value="custom" required />
                <span>My own location:</span>
              </label>
              <input name="custom_name" placeholder="Location name" />
              <input name="custom_region" placeholder="Region / district" />
              <label>
                Name reveal
                <select name="name_reveal_policy" defaultValue={location.name_reveal_policy}>
                  <option value="undecided">undecided</option>
                  <option value="early">early</option>
                  <option value="later">later</option>
                  <option value="never">never</option>
                </select>
              </label>
              <textarea name="note" placeholder="Note (optional)" rows={2} />
              <button className="button primary" type="submit">Record my selection</button>
              <small className="muted-note">Records a decision attributed to Chathura. AI tools never use this form.</small>
            </form>
          </section>
        </aside>
      </div>
    </>
  );
}
