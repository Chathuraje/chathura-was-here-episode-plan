import Link from "next/link";
import { notFound } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import ImageCarousel from "@/components/ImageCarousel";
import { groupQuota, setIdeaReview } from "@/app/idea-actions";
import { buildIdeaBrief, briefToMarkdown } from "@/lib/brief";
import { IDEA_REVIEW_STATUSES } from "@/lib/development";
import { formatCoordinates, googleMapsUrl, isInSriLanka } from "@/lib/geo";

// One verdict covers the idea and the place it proposes: the sequence is built from that
// place's own visuals, so the two cannot be accepted or refused separately.
const reviewBlurb: Record<string, string> = {
  confirmed: "Confirmed, place included. Ready for the next step.",
  pending: "Not decided yet. Confirming accepts the proposed place along with the idea.",
  rejected: "Rejected. Kept on file so a replacement can be written for this group.",
};

export default async function IdeaPage({ params }: { params: Promise<{ id: string }> }) {
  const brief = await buildIdeaBrief((await params).id.toUpperCase());
  if (!brief) notFound();
  const { idea, group, object } = brief;
  const markdown = briefToMarkdown(brief);
  // A group makes a fixed number of films, so confirming is capped. An idea already confirmed
  // is excluded from the count, so re-saving it never trips its own cap.
  const quota = await groupQuota(idea.group_id, idea.id);
  const alreadyIn = idea.review.status === "confirmed";
  const quotaBlocks = quota.full && !alreadyIn;
  const statuses = IDEA_REVIEW_STATUSES.filter((status) => status !== "confirmed" || !quotaBlocks);

  return (
    <>
      <Link className="back-link" href={group ? `/arc/${group.id}` : "/ideas"}>← {group ? group.title : "All ideas"}</Link>
      <header className="page-header concept-header">
        <div className="eyebrow">{idea.id}{idea.aliases.length ? ` (${idea.aliases.join(", ")})` : ""} / {group ? `Group ${String(group.chronological_position).padStart(2, "0")}` : "unassigned"} / <span className={`badge review-${idea.review.status}`}>{idea.review.status}</span></div>
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
            {idea.place ? (
              <div className="layer-grid">
                <div><span className="layer-label">What kind of place</span><p>{idea.place.what_kind_of_place}</p></div>
                <div><span className="layer-label">Why it is worth watching</span><p>{idea.place.why_it_is_worth_watching}</p></div>
                <div><span className="layer-label">What moves or changes</span><p>{idea.place.what_moves_or_changes}</p></div>
                <div><span className="layer-label">When it looks best</span><p>{idea.place.when_it_looks_best}</p></div>
              </div>
            ) : idea.situation ? (
              <div className="layer-grid">
                <div><span className="layer-label">What happens</span><p>{idea.situation.what_happens}</p></div>
                <div><span className="layer-label">Who is involved</span><p>{idea.situation.who_is_involved}</p></div>
                <div><span className="layer-label">What is at stake</span><p>{idea.situation.what_is_at_stake}</p></div>
                <div><span className="layer-label">How it unfolds</span><p>{idea.situation.how_it_unfolds}</p></div>
              </div>
            ) : <p className="panel-note warn">This idea has not been written yet.</p>}
            <p className="panel-note">An idea carries no scene or shot decisions. Those come later.</p>
          </section>

          {idea.two_layers && (
            <section className="source-document">
              <div className="source-document-head"><div><span>Two layers</span><h2>What each viewer gets</h2></div></div>
              <div className="layer-grid">
                <div><span className="layer-label">With the sound off</span><p>{idea.two_layers.without_the_philosophy}</p></div>
                <div className="layer-depth"><span className="layer-label">With the philosophy</span><p>{idea.two_layers.with_the_philosophy}</p></div>
              </div>
            </section>
          )}

          {idea.sequence?.length ? (
            <section className="source-document">
              <div className="source-document-head"><div><span>Sequence</span><h2>What is seen, and what is said over it</h2></div></div>
              {idea.sequence.map((beat, index) => (
                <div className="idea-concept" key={`${index}-${beat.on_screen.slice(0, 24)}`}>
                  <div>
                    <span className="badge">{index + 1}</span>
                    {beat.concept_id && <> <Link className="id-link" href={`/concepts/${beat.concept_id}`}>{beat.concept_id}</Link></>}
                  </div>
                  <p><b>On screen:</b> {beat.on_screen}</p>
                  <p className="panel-note">&ldquo;{beat.voice}&rdquo;</p>
                </div>
              ))}
            </section>
          ) : null}

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
            <span className="layer-label">Chathura&apos;s review</span>
            <h2 className={`review-heading review-${idea.review.status}`}>{idea.review.status}</h2>
            <p className="panel-note">{reviewBlurb[idea.review.status]}</p>
            {idea.review.decided_at && <p className="panel-note">Recorded {idea.review.decided_at}{idea.review.note ? ` · ${idea.review.note}` : ""}</p>}
            <form action={setIdeaReview} className="location-form">
              <input type="hidden" name="idea_id" value={idea.id} />
              <label>
                Set status
                <select name="status" defaultValue={idea.review.status}>
                  {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
              </label>
              <textarea name="note" rows={2} placeholder="Why (optional)" defaultValue={idea.review.note} />
              <button className="button primary" type="submit">Save status</button>
              <small className="muted-note">
                Chathura&apos;s verdict, covering the proposed place as well. The AI recommendation below never changes it.
              </small>
              <p className={`panel-note${quotaBlocks ? " warn" : ""}`}>
                {alreadyIn
                  ? `This is one of ${idea.group_id}'s ${quota.cap} confirmed ideas (${quota.confirmed + 1}/${quota.cap} used). Setting it back to pending or rejected frees a slot.`
                  : quotaBlocks
                    ? `${idea.group_id} is full: all ${quota.cap} of its films are already confirmed. Release one from its own page before confirming this.`
                    : `${idea.group_id} has ${quota.confirmed} of ${quota.cap} films confirmed, so ${quota.cap - quota.confirmed} slot${quota.cap - quota.confirmed === 1 ? "" : "s"} remain${quota.cap - quota.confirmed === 1 ? "s" : ""}.`}
              </p>
            </form>
          </section>

          <section className="panel location-panel">
            <span className="layer-label">Proposed location</span>
            {idea.suggested_location ? (
              <>
                <h2>{idea.suggested_location.name}</h2>
                <p className="panel-note">
                  {idea.suggested_location.region}
                  {idea.suggested_location.elevation_m ? ` · ${idea.suggested_location.elevation_m} m` : ""}
                  {" · proposed by "}{idea.suggested_location.proposed_by}
                </p>
                <p className="panel-note">
                  <a href={googleMapsUrl(idea.suggested_location.coordinates)} target="_blank" rel="noreferrer">
                    {formatCoordinates(idea.suggested_location.coordinates)} ↗
                  </a>
                  {!isInSriLanka(idea.suggested_location.coordinates) && <span className="warn"> · outside Sri Lanka</span>}
                </p>

                <ImageCarousel images={idea.suggested_location.images} />

                <p><b>Why here:</b> {idea.suggested_location.why_here}</p>
                <div>
                  <span className="layer-label">What to film</span>
                  <ul className="plain-list">{idea.suggested_location.what_to_film.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <p className="panel-note"><b>Access:</b> {idea.suggested_location.access}</p>
                <p className="panel-note"><b>Best time:</b> {idea.suggested_location.best_time}</p>
                {idea.suggested_location.also_known_as?.length ? (
                  <div>
                    <span className="layer-label">Also known as</span>
                    <ul className="plain-list">
                      {idea.suggested_location.also_known_as.map((entry) => (
                        <li key={entry.name}><b>{entry.name}</b> — {entry.meaning} ({entry.used_by})</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {idea.suggested_location.research_note && (
                  <p className="panel-note warn">{idea.suggested_location.research_note}</p>
                )}
                {idea.suggested_location.sources?.length ? (
                  <p className="panel-note">
                    Sources: {idea.suggested_location.sources.map((url) => (
                      <a key={url} href={url} target="_blank" rel="noreferrer">{new URL(url).hostname} ↗ </a>
                    ))}
                  </p>
                ) : null}
              </>
            ) : (
              <>
                <h2>None proposed</h2>
                <p className="panel-note">
                  This idea has not been rewritten yet, so no place has been proposed for it. A location arrives with the
                  rewrite, together with the reason it fits, and is confirmed or rejected here.
                </p>
              </>
            )}

            <p className="panel-note">
              Confirmed or rejected with the idea above, not separately. A proposed place verifies nothing
              about access, participants or permissions.
            </p>
          </section>

          <section className="panel">
            <span className="layer-label">AI recommendation</span>
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
          <nav className="previous-next" aria-label="Previous and next ideas">
            {brief.previous
              ? <Link href={`/ideas/${brief.previous.id}`}><span>Previous</span><strong>← {brief.previous.id}</strong></Link>
              : <span />}
            {brief.next
              ? <Link href={`/ideas/${brief.next.id}`}><span>Next</span><strong>{brief.next.id} →</strong></Link>
              : null}
          </nav>
        </aside>
      </div>
    </>
  );
}
