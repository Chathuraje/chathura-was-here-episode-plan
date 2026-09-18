import Link from "next/link";
import { notFound } from "next/navigation";
import { getData } from "@/lib/content";
import IdeaList from "@/components/IdeaList";
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

  return (
    <>
      <Link className="back-link" href="/arc">← Story arc</Link>
      <header className="page-header concept-header">
        <div className="eyebrow">Group {String(group.chronological_position).padStart(2, "0")} / {group.emotional_stage} / {group.status}</div>
        <h1>{group.title}</h1>
        <p className="lead-question">{group.human_question}</p>
      </header>

      <div className="concept-layout">
        <article className="source-stack">
          <section className="source-document">
            <div className="layer-grid">
              <div><span className="layer-label">Journey</span><p>{group.journey}</p></div>
              <div><span className="layer-label">Surface: what the viewer feels</span><p>{group.surface}</p></div>
              <div className="layer-depth"><span className="layer-label">Depth: what the book teaches underneath</span><p>{group.depth}</p></div>
            </div>
          </section>

          <section className="source-document">
            <div className="source-document-head"><div><span>Arc across the group</span><h2>{group.draft_film_count} draft films</h2></div></div>
            <ol className="arc-steps">
              <li><b>Opening film</b>{group.arc.opening}</li>
              <li><b>Middle</b>{group.arc.middle}</li>
              <li><b>Closing</b>{group.arc.closing}</li>
            </ol>
            <p className="hands-off">Hands off to the next group: {group.hands_off}</p>
          </section>

          <section className="source-document">
            <div className="source-document-head">
              <div><span>Concept cluster</span><h2>{group.concepts.length} concepts · {digested} digested</h2></div>
            </div>
            <div className="table-wrap">
              <table>
                <thead><tr><th>ID</th><th>Concept</th><th>Role in this group (draft gloss)</th><th>Digest</th></tr></thead>
                <tbody>
                  {group.concepts.map((concept) => (
                    <tr key={concept.id}>
                      <td><Link className="id-link" href={`/concepts/${concept.id}`}>{concept.id}</Link></td>
                      <td>{data.concepts.get(concept.id)?.title ?? "Missing concept"}</td>
                      <td>{concept.role}</td>
                      <td>{dev.digests.has(concept.id) ? <Link href={`/concepts/${concept.id}`}>{dev.digests.get(concept.id)?.status}</Link> : "pending"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section className="source-document">
            <div className="source-document-head">
              <div><span>Candidate ideas</span><h2>{ideas.length} ideas for {group.draft_film_count} films</h2></div>
            </div>
            {ideas.length ? <IdeaList ideas={ideas} /> : <p className="muted-note">Ideas are drafted after this group's concept digests.</p>}
          </section>
        </article>

        <aside className="concept-aside">
          <section className="panel">
            <h2>{object?.title ?? group.object_id}</h2>
            <p className="panel-note">Identity: {object?.identity ?? "not chosen yet"}</p>
            <p className="panel-note">Acquired in: {object?.planned_acquisition.where}</p>
            {object?.symbolic_hint && (
              <p className="panel-note"><em>Suggestion: {object.symbolic_hint.text}</em></p>
            )}
          </section>
          {group.candidate_idea_refs.length > 0 && (
            <section className="panel">
              <h2>Candidate ideas already drafted</h2>
              <ul>{group.candidate_idea_refs.map((ref) => <li key={ref}><code>{ref.split("/").pop()}</code></li>)}</ul>
            </section>
          )}
          <section className="panel">
            <h2>Open questions</h2>
            <ul>{group.unknowns.map((unknown) => <li key={unknown}>{unknown}</li>)}</ul>
          </section>
          <div className="previous-next">
            {previous ? <Link href={`/arc/${previous.id}`}>← {previous.title}</Link> : <span />}
            {next ? <Link href={`/arc/${next.id}`}>{next.title} →</Link> : <span>→ Framing</span>}
          </div>
        </aside>
      </div>
    </>
  );
}
