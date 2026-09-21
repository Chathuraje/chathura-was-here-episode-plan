import Link from "next/link";
import { notFound } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import { createLocationForIdea, setIdeaLocation, setIdeaReview, updateLocation } from "@/app/location-actions";
import { buildIdeaBrief, briefToMarkdown } from "@/lib/brief";
import { getDevelopment, ideasAtLocation, IDEA_REVIEW_STATUSES } from "@/lib/development";
import { formatCoordinates, googleMapsUrl, isInSriLanka } from "@/lib/geo";

const reviewBlurb: Record<string, string> = {
  confirmed: "Confirmed. Ready for a location.",
  pending: "Not decided yet.",
  rejected: "Rejected. Kept on file so a replacement can be generated for this group.",
};

export default async function IdeaPage({ params }: { params: Promise<{ id: string }> }) {
  const [brief, dev] = await Promise.all([buildIdeaBrief((await params).id.toUpperCase()), getDevelopment()]);
  if (!brief) notFound();
  const { idea, group, object, place } = brief;
  const markdown = briefToMarkdown(brief);
  // Places another idea already uses. A place exists only while an idea points at it.
  const places = [...dev.places.values()].sort((a, b) => a.name.localeCompare(b.name));
  const sharedWith = place ? ideasAtLocation(dev, place.id).filter((entry) => entry.id !== idea.id) : [];

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
            <div className="layer-grid">
              <div><span className="layer-label">What happens</span><p>{idea.situation.what_happens}</p></div>
              <div><span className="layer-label">Who is involved</span><p>{idea.situation.who_is_involved}</p></div>
              <div><span className="layer-label">What is at stake</span><p>{idea.situation.what_is_at_stake}</p></div>
              <div><span className="layer-label">How it unfolds</span><p>{idea.situation.how_it_unfolds}</p></div>
            </div>
            <p className="panel-note">An idea carries no scene or shot decisions. Those come later.</p>
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
            <span className="layer-label">Chathura&apos;s review</span>
            <h2 className={`review-heading review-${idea.review.status}`}>{idea.review.status}</h2>
            <p className="panel-note">{reviewBlurb[idea.review.status]}</p>
            {idea.review.decided_at && <p className="panel-note">Recorded {idea.review.decided_at}{idea.review.note ? ` · ${idea.review.note}` : ""}</p>}
            <form action={setIdeaReview} className="location-form">
              <input type="hidden" name="idea_id" value={idea.id} />
              <label>
                Set status
                <select name="status" defaultValue={idea.review.status}>
                  {IDEA_REVIEW_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
              </label>
              <textarea name="note" rows={2} placeholder="Why (optional)" defaultValue={idea.review.note} />
              <button className="button primary" type="submit">Save status</button>
              <small className="muted-note">Chathura&apos;s verdict. The AI recommendation below never changes it.</small>
            </form>
          </section>

          <section className="panel location-panel">
            <span className="layer-label">Location</span>
            {place ? (
              <>
                <h2>{place.name}</h2>
                <p className="panel-note">
                  {place.region || "no region set"} · {place.id}{idea.location.set_at ? ` · set ${idea.location.set_at}` : ""}
                </p>
                {place.coordinates ? (
                  <p className="panel-note">
                    <a href={googleMapsUrl(place.coordinates)} target="_blank" rel="noreferrer">{formatCoordinates(place.coordinates)} ↗</a>
                    {!isInSriLanka(place.coordinates) && <span className="warn"> · outside Sri Lanka</span>}
                  </p>
                ) : <p className="panel-note warn">No coordinates yet, so it is missing from the map.</p>}
                {place.note && <p className="panel-note">{place.note}</p>}
                {idea.location.note && <p className="panel-note">Note on this choice: {idea.location.note}</p>}
                {sharedWith.length > 0 && (
                  <p className="panel-note">
                    Also used by {sharedWith.map((entry) => <Link key={entry.id} href={`/ideas/${entry.id}`}>{entry.id} </Link>)}
                  </p>
                )}

                <details className="new-location">
                  <summary className="small-link">Edit this place</summary>
                  <form action={updateLocation} className="location-form">
                    <input type="hidden" name="location_id" value={place.id} />
                    <label>Place name<input name="name" defaultValue={place.name} required /></label>
                    <label>Region or district<input name="region" defaultValue={place.region} /></label>
                    <label>
                      Coordinates
                      <input name="coordinates" defaultValue={place.coordinates ? formatCoordinates(place.coordinates) : ""} placeholder="7.29060, 80.63370" />
                    </label>
                    <label>About the place<textarea name="location_note" rows={2} defaultValue={place.note} /></label>
                    <button className="button primary" type="submit">Save place</button>
                    <small className="muted-note">
                      Paste &ldquo;lat, lng&rdquo; from Google Maps. Leaving it empty takes the place off the map.
                      {sharedWith.length > 0 ? ` This place is shared with ${sharedWith.length} other idea${sharedWith.length === 1 ? "" : "s"}.` : ""}
                    </small>
                  </form>
                </details>

                <form action={setIdeaLocation} className="location-form">
                  <input type="hidden" name="idea_id" value={idea.id} />
                  <input type="hidden" name="location_id" value="" />
                  <button className="button subtle" type="submit">Remove the location from this idea</button>
                  <small className="muted-note">
                    {sharedWith.length ? "Other ideas keep using the place." : "Nothing else uses this place, so the record goes with it."}
                  </small>
                </form>
              </>
            ) : (
              <>
                <h2>Not chosen</h2>
                <p className="panel-note">This idea has no place yet. An idea holds one location, added here.</p>

                <form action={createLocationForIdea} className="location-form">
                  <input type="hidden" name="idea_id" value={idea.id} />
                  <label>Place name<input name="name" placeholder="e.g. Sri Pada / Adam&apos;s Peak" required /></label>
                  <label>Region or district<input name="region" placeholder="e.g. Ratnapura–Nuwara Eliya" /></label>
                  <label>
                    Coordinates
                    <input name="coordinates" placeholder="7.29060, 80.63370" />
                  </label>
                  <label>About the place<textarea name="location_note" rows={2} placeholder="Access, season, who to ask (optional)" /></label>
                  <label>Note about this choice<textarea name="note" rows={2} placeholder="Why here, for this idea (optional)" /></label>
                  <button className="button primary" type="submit">Add this place</button>
                  <small className="muted-note">
                    Paste &ldquo;lat, lng&rdquo; from Google Maps to put it on the <Link href="/locations">Locations</Link> map.
                  </small>
                </form>

                {places.length > 0 && (
                  <details className="new-location">
                    <summary className="small-link">Or reuse a place another idea already has</summary>
                    <form action={setIdeaLocation} className="location-form">
                      <input type="hidden" name="idea_id" value={idea.id} />
                      <label>
                        Place
                        <select name="location_id" required defaultValue="">
                          <option value="" disabled>Choose a place…</option>
                          {places.map((entry) => (
                            <option key={entry.id} value={entry.id}>{entry.name}{entry.region ? ` (${entry.region})` : ""}</option>
                          ))}
                        </select>
                      </label>
                      <textarea name="note" rows={2} placeholder="Note about this choice (optional)" />
                      <button className="button primary" type="submit">Use this place</button>
                    </form>
                  </details>
                )}
              </>
            )}

            <p className="panel-note">Choosing a place verifies nothing about access, participants or permissions.</p>
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
