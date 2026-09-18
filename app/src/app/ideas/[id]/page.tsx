import Link from "next/link";
import { notFound } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import { buildIdeaBrief, briefToMarkdown } from "@/lib/brief";

export default async function IdeaPage({ params }: { params: Promise<{ id: string }> }) {
  const brief = await buildIdeaBrief((await params).id.toUpperCase());
  if (!brief) notFound();
  const { idea, group, object } = brief;
  const markdown = briefToMarkdown(brief);
  const location = idea.location;

  return (
    <>
      <Link className="back-link" href={group ? `/arc/${group.id}` : "/ideas"}>← {group ? group.title : "All ideas"}</Link>
      <header className="page-header concept-header">
        <div className="eyebrow">{idea.id}{idea.aliases.length ? ` (${idea.aliases.join(", ")})` : ""} / {group ? `Group ${String(group.chronological_position).padStart(2, "0")}` : "unassigned"} / {idea.status}</div>
        <h1>{idea.title}</h1>
        <p>{idea.logline}</p>
        <div className="actions">
          <CopyButton text={markdown} label="Copy complete brief" />
          <a className="button" href={`/api/ideas/${idea.id}?format=md`} target="_blank" rel="noreferrer">Open as Markdown</a>
          <a className="button" href={`/api/ideas/${idea.id}`} target="_blank" rel="noreferrer">JSON for agents</a>
        </div>
      </header>

      <div className="concept-layout">
        <article className="source-stack">
          <section className="source-document">
            <p className="lead-question">{idea.human_question}</p>
            <div className="layer-grid">
              <div><span className="layer-label">Story</span><p>{idea.premise.story}</p></div>
              <div><span className="layer-label">Place</span><p>{idea.premise.place}</p></div>
              <div><span className="layer-label">Experience</span><p>{idea.premise.experience}</p></div>
            </div>
          </section>

          <section className="source-document">
            <div className="source-document-head"><div><span>Film</span><h2>What the camera could observe</h2></div></div>
            <ul className="plain-list">{idea.what_camera_could_observe.map((item) => <li key={item}>{item}</li>)}</ul>
            <p><b>Must be real:</b> {idea.what_must_be_real}</p>
            <ol className="arc-steps">
              <li><b>Opening</b>{idea.possible_arc.opening}</li>
              <li><b>Turn</b>{idea.possible_arc.turn}</li>
              <li><b>Ending (left open)</b>{idea.possible_arc.ending_open}</li>
            </ol>
          </section>

          <section className="source-document">
            <div className="source-document-head"><div><span>Concepts</span><h2>What sits underneath</h2></div></div>
            {brief.concepts.map((concept) => (
              <div className="idea-concept" key={concept.id}>
                <div><Link className="id-link" href={`/concepts/${concept.id}`}>{concept.id}</Link> <span className="badge">{concept.role}</span> {concept.title_si}</div>
                <p>{concept.why}</p>
                {concept.digest
                  ? <p className="panel-note">{concept.digest.summary_en}</p>
                  : <p className="panel-note warn">Concept digest pending.</p>}
              </div>
            ))}
          </section>

          <section className="source-document">
            <div className="source-document-head"><div><span>Check</span><h2>Risks and exit tests</h2></div></div>
            <div className="two-col">
              <div><span className="layer-label">Risks</span><ul className="plain-list">{idea.risks.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div><span className="layer-label">Drop or revise if</span><ul className="plain-list">{idea.drop_if.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
          </section>
        </article>

        <aside className="concept-aside">
          <section className="panel location-panel">
            <h2>Location</h2>
            <p className="panel-note"><b>Selected:</b> {location.selected_location_id ?? "none, awaiting Chathura"}</p>
            <p className="panel-note"><b>Name reveal:</b> {location.name_reveal_policy}</p>
            <span className="layer-label">Requirements</span>
            <ul>{location.requirements.map((item) => <li key={item}>{item}</li>)}</ul>
            {location.suggestions.length > 0 && (
              <>
                <span className="layer-label">AI suggestions (not selections)</span>
                <ul>
                  {location.suggestions.map((suggestion) => (
                    <li key={suggestion.name}>
                      <b>{suggestion.name}</b>, {suggestion.region}. {suggestion.why}
                      {suggestion.season_notes && <> Season: {suggestion.season_notes}.</>}
                      <em> Verify: {suggestion.verify}</em>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
          <section className="panel">
            <h2>Placement</h2>
            <p className="panel-note">{idea.position_hint}</p>
            {object && <p className="panel-note">Group object: {object.title} (identity not chosen)</p>}
          </section>
          {brief.related_ideas.length > 0 && (
            <section className="panel">
              <h2>Connections</h2>
              <ul>{brief.related_ideas.map((related) => <li key={related.id}><Link href={`/ideas/${related.id}`}>{related.id} {related.title}</Link>: {related.relation}</li>)}</ul>
            </section>
          )}
        </aside>
      </div>
    </>
  );
}
