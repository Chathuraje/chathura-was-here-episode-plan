import Link from "next/link";
import LocationMap from "@/components/LocationMap";
import { createLocation, deleteLocation, placeLocation, updateLocation } from "@/app/location-actions";
import { getDevelopment, ideasAtLocation, orderedIdeas } from "@/lib/development";

export default async function LocationsPage() {
  const dev = await getDevelopment();
  const places = [...dev.places.values()].sort((a, b) => a.name.localeCompare(b.name));
  const ideas = orderedIdeas(dev);
  const placedIdeas = ideas.filter((idea) => idea.location.location_id);
  const confirmedWithout = ideas.filter((idea) => idea.review.status === "confirmed" && !idea.location.location_id);
  const regions = new Set(places.map((place) => place.region.trim()).filter(Boolean));

  const pins = places
    .filter((place) => place.coordinates)
    .map((place) => ({
      id: place.id,
      name: place.name,
      region: place.region,
      lat: place.coordinates!.lat,
      lng: place.coordinates!.lng,
      ideaCount: ideasAtLocation(dev, place.id).length,
    }));
  const unpinned = places.filter((place) => !place.coordinates);

  return (
    <>
      <header className="page-header">
        <div className="eyebrow">05 / Chathura&apos;s decision</div>
        <h1>Locations</h1>
        <p>
          Every place this series can be shot in, on one map. Add a place here or straight from an idea — either way it
          shows up in both. Location choice belongs to Chathura alone: AI may describe requirements, but it never picks a
          place, and pinning one verifies nothing about access, permissions or the people there.
        </p>
      </header>

      <section className="summary" aria-label="Location summary">
        <div><strong>{places.length}</strong><span>locations saved</span></div>
        <div><strong>{pins.length}</strong><span>pinned on the map</span></div>
        <div><strong>{placedIdeas.length}/{ideas.length}</strong><span>ideas with a location</span></div>
        <div><strong className={confirmedWithout.length ? "warn" : ""}>{confirmedWithout.length}</strong><span>confirmed ideas still waiting</span></div>
      </section>

      <LocationMap
        pins={pins}
        unplaced={unpinned.map((place) => ({ id: place.id, name: place.name }))}
        createLocation={createLocation}
        placeLocation={placeLocation}
      />

      {places.length === 0 ? (
        <div className="empty-state">
          <h2>No locations yet</h2>
          <p>
            Click the island above to drop a pin and name the place, or add one from an idea page while you are reviewing.
            Either way it appears here and in every idea&apos;s location list.
          </p>
          <p><Link className="button primary" href="/ideas">Review ideas</Link></p>
        </div>
      ) : (
        <section className="concept-section">
          <div className="section-heading">
            <span>{String(places.length).padStart(2, "0")}</span>
            <h2>Saved locations</h2>
            <small>{regions.size} region{regions.size === 1 ? "" : "s"} · {placedIdeas.length} idea links</small>
          </div>
          {unpinned.length > 0 && (
            <p className="muted-note">
              {unpinned.length} location{unpinned.length === 1 ? " has" : "s have"} no pin yet: {unpinned.map((place) => place.name).join(", ")}.
              Click a spot on the map above and use &ldquo;move a saved location here&rdquo;.
            </p>
          )}
          <div className="table-wrap">
            <table className="location-table">
              <thead><tr><th>Location</th><th>Note</th><th>Used by</th><th>Edit</th></tr></thead>
              <tbody>
                {places.map((place) => {
                  const users = ideasAtLocation(dev, place.id);
                  return (
                    <tr key={place.id} id={place.id}>
                      <td>
                        <b>{place.name}</b><br />
                        <small className="muted-note">
                          {place.region || "no region set"} · {place.id}
                          {place.coordinates
                            ? ` · ${place.coordinates.lat.toFixed(3)}, ${place.coordinates.lng.toFixed(3)}`
                            : " · not pinned"}
                        </small>
                      </td>
                      <td>{place.note || <span className="muted-note">—</span>}</td>
                      <td>
                        {users.length
                          ? <div className="chip-list">{users.map((idea) => <Link key={idea.id} href={`/ideas/${idea.id}`}>{idea.id}</Link>)}</div>
                          : <span className="muted-note">no ideas yet</span>}
                      </td>
                      <td>
                        <details>
                          <summary className="small-link">Edit</summary>
                          <form action={updateLocation} className="location-form">
                            <input type="hidden" name="location_id" value={place.id} />
                            <label>Name<input name="name" defaultValue={place.name} required /></label>
                            <label>Region<input name="region" defaultValue={place.region} /></label>
                            <label>Note<textarea name="note" rows={2} defaultValue={place.note} /></label>
                            <button className="button primary" type="submit">Save changes</button>
                            <small className="muted-note">The map pin is kept. Move it by clicking the map above.</small>
                          </form>
                          <form action={deleteLocation} className="location-form">
                            <input type="hidden" name="location_id" value={place.id} />
                            <button className="button subtle" type="submit">Delete location</button>
                            <small className="muted-note">
                              {users.length
                                ? `This also clears the location on ${users.length} idea${users.length === 1 ? "" : "s"}.`
                                : "Not attached to any idea."}
                            </small>
                          </form>
                        </details>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {confirmedWithout.length > 0 && (
        <section className="concept-section">
          <div className="section-heading"><span>→</span><h2>Confirmed ideas without a location</h2><small>{confirmedWithout.length} ideas</small></div>
          <p className="muted-note">These are the next ones to place. Open an idea and pick a place, or add a new one there.</p>
          <div className="chip-list">
            {confirmedWithout.map((idea) => <Link key={idea.id} href={`/ideas/${idea.id}`}>{idea.id} {idea.title}</Link>)}
          </div>
        </section>
      )}
    </>
  );
}
