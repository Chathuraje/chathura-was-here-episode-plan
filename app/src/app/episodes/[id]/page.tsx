import Link from "next/link";
import { notFound } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import { EpisodeLessonView } from "@/components/LessonView";
import { buildEpisodeBrief, briefToMarkdown } from "@/lib/brief";

export default async function EpisodePage({ params }: { params: Promise<{ id: string }> }) {
  const brief = await buildEpisodeBrief((await params).id.toUpperCase());
  if (!brief?.episode) notFound();
  const { idea, group } = brief;
  const context = brief.episode;
  const episode = context.episode;
  const markdown = briefToMarkdown(brief);
  const location = episode.location;
  const stageTitle: Record<typeof context.next_stage, string> = {
    blocked_location: "Waiting for Chathura's location choice",
    treatment: "Next: treatment",
    awaiting_treatment_approval: "Waiting for Chathura's treatment approval",
    scene_outline: "Next: scene outline",
    awaiting_outline_approval: "Waiting for Chathura's outline approval",
    blocked_research: "Waiting for production-level research",
    production: "Next: production screenplay",
    awaiting_production_approval: "Waiting for Chathura's production approval",
    production_ready: "Production screenplay approved",
    post_filming: "Post-filming revision",
  };

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
          {brief.source_ideas.map((sourceIdea) => <Link className="button" href={`/ideas/${sourceIdea.idea.id}`} key={sourceIdea.idea.id}>Idea {sourceIdea.idea.id}</Link>)}
        </div>
      </header>

      <div className="concept-layout">
        <article className="source-stack">
          {episode.lesson ? <EpisodeLessonView lesson={episode.lesson} /> : null}
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
            <div className="source-document-head"><div><span>Screenplay</span><h2>{stageTitle[context.next_stage]}</h2></div></div>
            <div className="chip-list">
              {(["treatment", "scene_outline", "production"] as const).map((stage) => {
                const version = context.stages[stage];
                return version
                  ? <Link key={stage} href={`/screenplays/${version.id}`}>{stage.replace("_", " ")} v{version.version} · {version.status}</Link>
                  : <span className="chip-static" key={stage}>{stage.replace("_", " ")}: not yet</span>;
              })}
            </div>
            {(["treatment", "scene_outline", "production"] as string[]).includes(context.next_stage) && (
              <p className="panel-note">Copy the episode brief and give it to an AI with <code>docs/planning/prompts/screenplay-brief.md</code>, or ask Claude to write the next stage for {episode.id}.</p>
            )}
            <p className="panel-note">Research: {episode.research.status}. Access: {episode.research.access_status}; participants: {episode.research.participant_status}; permissions: {episode.research.permission_status}.</p>
          </section>

          <section className="source-document">
            <p className="lead-question">{idea.human_question}</p>
            <div className="layer-grid">
              <div><span className="layer-label">What happens</span><p>{idea.situation.what_happens}</p></div>
              <div><span className="layer-label">Who is involved</span><p>{idea.situation.who_is_involved}</p></div>
              <div><span className="layer-label">What is at stake</span><p>{idea.situation.what_is_at_stake}</p></div>
              <div><span className="layer-label">How it unfolds</span><p>{idea.situation.how_it_unfolds}</p></div>
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
              </>
            ) : (
              <p className="panel-note warn">No location selected. Treatment and screenplay work waits for this.</p>
            )}
            <p className="panel-note">
              Location choice is now made on the idea this film came from, not here. Open{" "}
              {episode.idea_ids.map((id) => <Link key={id} href={`/ideas/${id}`}>{id} </Link>)}
              to change it, or add a new place in the <Link href="/locations">Locations</Link> tab.
            </p>
            <p className="panel-note"><b>Research readiness:</b> {episode.research.status}. Choosing a place does not verify access, participants, permissions or documentary facts.</p>
            <span className="layer-label">Requirements</span>
            <ul>{location.requirements.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </aside>
      </div>
    </>
  );
}
