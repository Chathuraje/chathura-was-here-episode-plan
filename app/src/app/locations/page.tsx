import Link from "next/link";
import { getDevelopment } from "@/lib/development";

export default async function LocationsPage() {
  const dev = await getDevelopment();
  const selected = dev.episodes.filter((episode) => episode.location.selected_location_id);
  const regionCounts = new Map<string, number>();
  for (const episode of dev.episodes) {
    if (episode.location.selected_location_id) continue;
    const region = episode.location.suggestions[0]?.region ?? "No suggestion";
    regionCounts.set(region, (regionCounts.get(region) ?? 0) + 1);
  }
  const regions = [...regionCounts.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <>
      <header className="page-header">
        <div className="eyebrow">Step 5 / Chathura&apos;s decision</div>
        <h1>Locations</h1>
        <p>
          Every film with its requirements, the AI suggestions and your current choice. Suggestions are only suggestions:
          open a film and record your own decision. Treatments and screenplays unlock one film at a time as you choose.
        </p>
      </header>

      <section className="summary" aria-label="Location summary">
        <div><strong>{selected.length}/{dev.episodes.length}</strong><span>locations chosen</span></div>
        <div><strong>{dev.episodes.length - selected.length}</strong><span>waiting</span></div>
        <div><strong>{new Set([...dev.places.values()].map((place) => place.region)).size}</strong><span>regions chosen so far</span></div>
        <div><strong>{dev.episodes.filter((episode) => !episode.location.suggestions.length).length}</strong><span>films with no suggestion</span></div>
      </section>

      {regions.length > 0 && (
        <section className="concept-section">
          <div className="section-heading"><span>AI</span><h2>Where the suggestions cluster</h2><small>unchosen films, by first suggestion</small></div>
          <p className="muted-note">For trip planning only. A film appears here under its first AI suggestion, not under any decision.</p>
          <div className="chip-list">
            {regions.map(([region, count]) => <span className="chip-static" key={region}>{region} · {count}</span>)}
          </div>
        </section>
      )}

      {dev.groups.map((group) => {
        const episodes = dev.episodes.filter((episode) => episode.chronology.group_id === group.id);
        if (!episodes.length) return null;
        return (
          <section className="concept-section" key={group.id}>
            <div className="section-heading">
              <span>{String(group.chronological_position).padStart(2, "0")}</span>
              <h2>{group.title}</h2>
              <small>{episodes.filter((episode) => episode.location.selected_location_id).length}/{episodes.length} chosen</small>
            </div>
            <div className="table-wrap">
              <table className="location-table">
                <thead><tr><th>Film</th><th>What the place must offer</th><th>AI suggestions</th><th>Your choice</th></tr></thead>
                <tbody>
                  {episodes.map((episode) => {
                    const place = episode.location.selected_location_id ? dev.places.get(episode.location.selected_location_id) : undefined;
                    return (
                      <tr key={episode.id}>
                        <td><Link href={`/episodes/${episode.id}`}><b>{String(episode.chronology.global_position).padStart(2, "0")} {episode.title}</b></Link></td>
                        <td><ul className="plain-list">{episode.location.requirements.map((item) => <li key={item}>{item}</li>)}</ul></td>
                        <td>
                          {episode.location.suggestions.length
                            ? <ul className="plain-list">{episode.location.suggestions.map((suggestion) => <li key={suggestion.name}>{suggestion.name} <small>({suggestion.region})</small></li>)}</ul>
                            : <span className="muted-note">none</span>}
                        </td>
                        <td>
                          {place
                            ? <><b>{place.name}</b><br /><small>{place.region} · reveal: {episode.location.name_reveal_policy}</small></>
                            : <Link className="button subtle" href={`/episodes/${episode.id}`}>Choose →</Link>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </>
  );
}
