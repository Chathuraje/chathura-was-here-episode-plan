import Link from "next/link";
import LocationMap from "@/components/LocationMap";
import { getDevelopment, ideasAtLocation, orderedIdeas } from "@/lib/development";
import { formatCoordinates, googleMapsUrl, isInSriLanka } from "@/lib/geo";

export default async function LocationsPage() {
  const dev = await getDevelopment();
  const places = [...dev.places.values()].sort((a, b) => a.name.localeCompare(b.name));
  const ideas = orderedIdeas(dev);
  const placedIdeas = ideas.filter((idea) => idea.location.location_id);
  const confirmedWithout = ideas.filter((idea) => idea.review.status === "confirmed" && !idea.location.location_id);
  const regions = new Set(places.map((place) => place.region.trim()).filter(Boolean));

  const withCoordinates = places.filter((place) => place.coordinates);
  const withoutCoordinates = places.filter((place) => !place.coordinates);
  const pins = withCoordinates.map((place) => ({
    id: place.id,
    name: place.name,
    region: place.region,
    note: place.note,
    lat: place.coordinates!.lat,
    lng: place.coordinates!.lng,
    ideas: ideasAtLocation(dev, place.id).map((idea) => ({ id: idea.id, title: idea.title })),
  }));
  const outsideSriLanka = withCoordinates.filter((place) => !isInSriLanka(place.coordinates!));

  return (
    <>
      <header className="page-header">
        <div className="eyebrow">05 / Chathura&apos;s decision</div>
        <h1>Locations</h1>
        <p>
          Every place the confirmed ideas are set in, on one map. Places are created on the idea that uses them, never
          here: an idea has one location, and a location exists only while at least one idea still points at it. Location
          choice belongs to Chathura alone, and a pin verifies nothing about access, permissions or the people there.
        </p>
      </header>

      <section className="summary" aria-label="Location summary">
        <div><strong>{places.length}</strong><span>locations in use</span></div>
        <div><strong>{withCoordinates.length}/{places.length}</strong><span>with coordinates</span></div>
        <div><strong>{placedIdeas.length}/{ideas.length}</strong><span>ideas with a location</span></div>
        <div><strong className={confirmedWithout.length ? "warn" : ""}>{confirmedWithout.length}</strong><span>confirmed ideas still waiting</span></div>
      </section>

      {places.length === 0 ? (
        <div className="empty-state">
          <h2>No locations yet</h2>
          <p>
            A location is added from the idea it belongs to. Open an idea, name the place and type its coordinates, and it
            appears on this map.
          </p>
          <p><Link className="button primary" href="/ideas">Review ideas</Link></p>
        </div>
      ) : (
        <LocationMap pins={pins} apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""} />
      )}

      {outsideSriLanka.length > 0 && (
        <p className="notice warn">
          {outsideSriLanka.map((place) => place.name).join(", ")} {outsideSriLanka.length === 1 ? "sits" : "sit"} outside
          Sri Lanka. That may be deliberate — check the coordinates on the idea if it is not.
        </p>
      )}

      {places.length > 0 && (
        <section className="concept-section">
          <div className="section-heading">
            <span>{String(places.length).padStart(2, "0")}</span>
            <h2>Places in use</h2>
            <small>{regions.size} region{regions.size === 1 ? "" : "s"} · {placedIdeas.length} idea link{placedIdeas.length === 1 ? "" : "s"}</small>
          </div>
          {withoutCoordinates.length > 0 && (
            <p className="muted-note">
              {withoutCoordinates.length} place{withoutCoordinates.length === 1 ? " has" : "s have"} no coordinates yet, so
              {withoutCoordinates.length === 1 ? " it is" : " they are"} missing from the map. Add them on the idea below.
            </p>
          )}
          <div className="table-wrap">
            <table className="location-table">
              <thead><tr><th>Location</th><th>Coordinates</th><th>Note</th><th>Used by</th></tr></thead>
              <tbody>
                {places.map((place) => {
                  const users = ideasAtLocation(dev, place.id);
                  return (
                    <tr key={place.id} id={place.id}>
                      <td>
                        <b>{place.name}</b><br />
                        <small className="muted-note">{place.region || "no region set"} · {place.id}</small>
                      </td>
                      <td>
                        {place.coordinates
                          ? <a href={googleMapsUrl(place.coordinates)} target="_blank" rel="noreferrer">{formatCoordinates(place.coordinates)} ↗</a>
                          : <span className="warn">not set</span>}
                      </td>
                      <td>{place.note || <span className="muted-note">—</span>}</td>
                      <td>
                        {users.length
                          ? <div className="chip-list">{users.map((idea) => <Link key={idea.id} href={`/ideas/${idea.id}`}>{idea.id}</Link>)}</div>
                          : <span className="muted-note">unused — it will be removed</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="muted-note">
            To rename a place, move its pin or drop it, open the idea that uses it. Editing happens there so the place and
            the idea never drift apart.
          </p>
        </section>
      )}

      {confirmedWithout.length > 0 && (
        <section className="concept-section">
          <div className="section-heading"><span>→</span><h2>Confirmed ideas without a location</h2><small>{confirmedWithout.length} ideas</small></div>
          <p className="muted-note">These are the next ones to place.</p>
          <div className="chip-list">
            {confirmedWithout.map((idea) => <Link key={idea.id} href={`/ideas/${idea.id}`}>{idea.id} {idea.title}</Link>)}
          </div>
        </section>
      )}
    </>
  );
}
