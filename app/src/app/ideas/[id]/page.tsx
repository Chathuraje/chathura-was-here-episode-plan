import Link from "next/link";
import { notFound } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import { buildIdeaBrief, briefToMarkdown } from "@/lib/brief";

export default async function IdeaPage({ params }: { params: Promise<{ id: string }> }) {
  const brief = await buildIdeaBrief((await params).id.toUpperCase());
  if (!brief) notFound();
  const { idea, group, object } = brief;
  const markdown = briefToMarkdown(brief);

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
              <div><span className="layer-label">What happens</span><p>{idea.situation.what_happens}</p></div>
              <div><span className="layer-label">Who is involved</span><p>{idea.situation.who_is_involved}</p></div>
              <div><span className="layer-label">What is at stake</span><p>{idea.situation.what_is_at_stake}</p></div>
              <div><span className="layer-label">How it unfolds</span><p>{idea.situation.how_it_unfolds}</p></div>
            </div>
            <p className="panel-note">An idea carries no location, scene or shot decisions. Those come later, on the episode.</p>
          </section>

          <section className="source-document">
            <div className="source-document-head"><div><span>Concept merge</span><h2>Why these concepts belong together</h2></div></div>
            <div className="layer-grid">
              <div><span className="layer-label">Why together</span><p>{idea.concept_merge.why_together}</p></div>
              <div className="layer-depth"><span className="layer-label">What the merge reveals</span><p>{idea.concept_merge.what_it_reveals}</p></div>
              <div><span className="layer-label">What the viewer could come to understand</span><p>{idea.what_the_viewer_could_understand}</p></div>
            </div>
            <p><b>Must be real:</b> {idea.what_must_be_real}</p>
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
          <section className="panel">
            <span className="layer-label">Selection</span>
            <h2>{idea.selection.recommendation}</h2>
            <p className="panel-note">{idea.selection.reason}</p>
            {idea.selection.merged_with.length > 0 && (
              <p className="panel-note">Merged with: {idea.selection.merged_with.map((id) => <Link key={id} href={`/ideas/${id}`}>{id} </Link>)}</p>
            )}
            {idea.selection.superseded_by && <p className="panel-note">Superseded by <Link href={`/ideas/${idea.selection.superseded_by}`}>{idea.selection.superseded_by}</Link></p>}
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
