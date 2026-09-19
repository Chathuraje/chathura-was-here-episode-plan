import Link from "next/link";
import { getDevelopment } from "@/lib/development";

export default async function ReleasePage() {
  const dev = await getDevelopment();
  const last = dev.episodes.at(-1);
  const pool = dev.episodes.filter((episode) => episode !== last);
  const byRegion = new Map<string, typeof pool>();
  const awaiting: typeof pool = [];
  for (const episode of pool) {
    const place = episode.location.selected_location_id ? dev.places.get(episode.location.selected_location_id) : undefined;
    if (!place) { awaiting.push(episode); continue; }
    const key = place.region.trim() || place.name;
    byRegion.set(key, [...(byRegion.get(key) ?? []), episode]);
  }
  const series = [...byRegion.entries()].sort((a, b) => b[1].length - a[1].length);

  return (
    <>
      <header className="page-header">
        <div className="eyebrow">06 / Release order</div>
        <h1>Release planner</h1>
        <p>
          Region clusters below are a proposal only. Chathura may merge or split them, create journey-based series, reorder films,
          assign the ten seasons, and assign public numbers 2–98. Season 1 must contain exactly eight episodes; later season counts may differ.
        </p>
      </header>

      <section className="summary" aria-label="Release summary">
        <div><strong>{pool.length - awaiting.length}/{pool.length}</strong><span>films with a location</span></div>
        <div><strong>{series.length}</strong><span>proposed series</span></div>
        <div><strong>2</strong><span>public pins (1 and 99)</span></div>
        <div><strong>{awaiting.length}</strong><span>waiting for a location</span></div>
      </section>

      <section className="concept-section">
        <div className="section-heading"><span>01</span><h2>Episode 1: The Beginning</h2><small>pinned · framing film</small></div>
      </section>

      {series.map(([region, episodes], index) => (
        <section className="concept-section" key={region}>
          <div className="section-heading"><span>P{index + 1}</span><h2>{region}</h2><small>{episodes.length} films · proposed cluster, not a season</small></div>
          <div className="concept-list">
            {episodes.map((episode) => (
              <Link className="chrono-row" href={`/episodes/${episode.id}`} key={episode.id}>
                <strong>{String(episode.chronology.global_position).padStart(2, "0")}</strong>
                <span className="object-mark">{episode.object.acquires ? "●" : episode.object.appears.length ? "○" : ""}</span>
                <div><b>{episode.title}</b><span>{dev.places.get(episode.location.selected_location_id ?? "")?.name}</span></div>
                <small>{episode.chronology.group_id}</small>
                <em />
              </Link>
            ))}
          </div>
        </section>
      ))}

      {last && (
        <section className="concept-section">
          <div className="section-heading"><span>99</span><h2>Episode 99: {last.title}</h2><small>pinned · last film in story time, ends on the crowd</small></div>
        </section>
      )}
      <section className="concept-section">
        <div className="section-heading"><span>100</span><h2>Episode 100: The Way Back</h2><small>hidden/discoverable · outside the ordinary public 1–99 structure</small></div>
      </section>

      <p className="notice">Chronology v1 remains draft until Chathura approves it. These clusters do not authorize release order, season membership, or public numbers.</p>

      {awaiting.length > 0 && (
        <section className="concept-section">
          <div className="section-heading"><span>…</span><h2>Waiting for Chathura&apos;s location choice</h2><small>{awaiting.length} films</small></div>
          <p className="muted-note">Open a film and record a location to place it in a series.</p>
          <div className="chip-list">
            {awaiting.map((episode) => <Link key={episode.id} href={`/episodes/${episode.id}`}>{episode.title}</Link>)}
          </div>
        </section>
      )}
    </>
  );
}
