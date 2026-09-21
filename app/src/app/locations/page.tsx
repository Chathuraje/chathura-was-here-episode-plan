import Link from "next/link";
import LocationMap from "@/components/LocationMap";
import { getDevelopment, orderedIdeas } from "@/lib/development";
import { formatCoordinates, googleMapsUrl, isInSriLanka } from "@/lib/geo";

/**
 * The map of places the series is actually going to. A place earns a pin only once its idea
 * is confirmed: an idea proposes its own location, and confirming the idea accepts the place
 * with it, so an unconfirmed proposal is still a suggestion and does not belong here.
 */
export default async function LocationsPage() {
  const ideas = orderedIdeas(await getDevelopment());
  const confirmed = ideas
    .filter((idea) => idea.review.status === "confirmed" && idea.suggested_location)
    .sort((a, b) => a.suggested_location!.name.localeCompare(b.suggested_location!.name));
  const awaitingVerdict = ideas.filter((idea) => idea.review.status !== "confirmed" && idea.suggested_location);
  const confirmedWithout = ideas.filter((idea) => idea.review.status === "confirmed" && !idea.suggested_location);
  const regions = new Set(confirmed.map((idea) => idea.suggested_location!.region.trim()).filter(Boolean));

  const pins = confirmed.map((idea) => {
    const spot = idea.suggested_location!;
    return {
      id: idea.id,
      name: spot.name,
      region: spot.region,
      note: spot.why_here,
      lat: spot.coordinates.lat,
      lng: spot.coordinates.lng,
      ideas: [{ id: idea.id, title: idea.title }],
    };
  });
  const outsideSriLanka = confirmed.filter((idea) => !isInSriLanka(idea.suggested_location!.coordinates));

  return (
    <>
      <header className="page-header">
        <div className="eyebrow">05 / Chathura&apos;s decision</div>
        <h1>Locations</h1>
        <p>
          Every place a confirmed idea is set in, on one map. A place is proposed on the idea it belongs to and comes
          here only once that idea is confirmed, because confirming an idea accepts its place along with it. A pin
          verifies nothing about access, permissions or the people there.
        </p>
      </header>

      <section className="summary" aria-label="Location summary">
        <div><strong>{confirmed.length}</strong><span>confirmed locations</span></div>
        <div><strong>{regions.size}</strong><span>region{regions.size === 1 ? "" : "s"}</span></div>
        <div><strong>{awaitingVerdict.length}</strong><span>proposed, awaiting a verdict</span></div>
        <div><strong className={confirmedWithout.length ? "warn" : ""}>{confirmedWithout.length}</strong><span>confirmed ideas with no place</span></div>
      </section>

      {confirmed.length === 0 ? (
        <div className="empty-state">
          <h2>No confirmed locations yet</h2>
          <p>
            {awaitingVerdict.length
              ? `${awaitingVerdict.length} idea${awaitingVerdict.length === 1 ? " proposes a place that is" : "s propose places that are"} still waiting on a verdict. Confirm the idea and its place appears here.`
              : "A place arrives with the idea that proposes it. Once an idea is confirmed, its location is pinned here."}
          </p>
          <p><Link className="button primary" href="/ideas">Review ideas</Link></p>
        </div>
      ) : (
        <LocationMap pins={pins} apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""} />
      )}

      {outsideSriLanka.length > 0 && (
        <p className="notice warn">
          {outsideSriLanka.map((idea) => idea.suggested_location!.name).join(", ")}{" "}
          {outsideSriLanka.length === 1 ? "sits" : "sit"} outside Sri Lanka. That may be deliberate — check the
          coordinates on the idea if it is not.
        </p>
      )}

      {confirmed.length > 0 && (
        <section className="concept-section">
          <div className="section-heading">
            <span>{String(confirmed.length).padStart(2, "0")}</span>
            <h2>Places in use</h2>
            <small>{regions.size} region{regions.size === 1 ? "" : "s"}</small>
          </div>
          <div className="table-wrap">
            <table className="location-table">
              <thead><tr><th>Location</th><th>Coordinates</th><th>Best time</th><th>Idea</th></tr></thead>
              <tbody>
                {confirmed.map((idea) => {
                  const spot = idea.suggested_location!;
                  return (
                    <tr key={idea.id} id={idea.id}>
                      <td>
                        <b>{spot.name}</b><br />
                        <small className="muted-note">{spot.region || "no region set"}</small>
                      </td>
                      <td>
                        <a href={googleMapsUrl(spot.coordinates)} target="_blank" rel="noreferrer">
                          {formatCoordinates(spot.coordinates)} ↗
                        </a>
                      </td>
                      <td>{spot.best_time || <span className="muted-note">—</span>}</td>
                      <td>
                        <div className="chip-list"><Link href={`/ideas/${idea.id}`}>{idea.id} {idea.title}</Link></div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="muted-note">
            To change a place, open the idea that proposes it. Editing happens there so the place and the idea never
            drift apart.
          </p>
        </section>
      )}

      {awaitingVerdict.length > 0 && (
        <section className="concept-section">
          <div className="section-heading"><span>→</span><h2>Proposed, awaiting a verdict</h2><small>{awaitingVerdict.length} ideas</small></div>
          <p className="muted-note">These places are suggestions until their idea is confirmed, so they are not on the map.</p>
          <div className="chip-list">
            {awaitingVerdict.map((idea) => (
              <Link key={idea.id} href={`/ideas/${idea.id}`}>{idea.id} {idea.suggested_location!.name}</Link>
            ))}
          </div>
        </section>
      )}

      {confirmedWithout.length > 0 && (
        <section className="concept-section">
          <div className="section-heading"><span>→</span><h2>Confirmed ideas with no place</h2><small>{confirmedWithout.length} ideas</small></div>
          <p className="muted-note">These have not been rewritten yet, so nothing has been proposed for them.</p>
          <div className="chip-list">
            {confirmedWithout.map((idea) => <Link key={idea.id} href={`/ideas/${idea.id}`}>{idea.id} {idea.title}</Link>)}
          </div>
        </section>
      )}
    </>
  );
}
