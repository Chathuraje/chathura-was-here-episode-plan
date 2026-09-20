import Link from "next/link";
import { getDevelopment, latestStages, screenplayNextStage } from "@/lib/development";

const STAGES = [
  ["treatment", "Treatment"],
  ["scene_outline", "Outline"],
  ["production", "Screenplay"],
] as const;

export default async function ScreenplaysPage() {
  const dev = await getDevelopment();
  const rows = dev.episodes.map((episode) => ({ episode, stages: latestStages(dev, episode.id), next: screenplayNextStage(dev, episode) }));
  const count = (stage: string) => rows.filter((row) => row.stages[stage as keyof typeof row.stages]).length;
  const unlocked = dev.episodes.filter((episode) => episode.location.selected_location_id).length;

  return (
    <>
      <header className="page-header">
        <div className="eyebrow">Step 8 / Episodes 2–99</div>
        <h1>Screenplays</h1>
        <p>
          Selected location → treatment → Chathura approval → scene outline → Chathura approval → research-ready production screenplay.
          A draft file never unlocks the next stage by itself. Generate only the stage named by the episode brief.
        </p>
      </header>

      <section className="summary" aria-label="Screenplay summary">
        <div><strong>{unlocked}/{dev.episodes.length}</strong><span>locations selected</span></div>
        <div><strong>{count("treatment")}</strong><span>treatments</span></div>
        <div><strong>{count("scene_outline")}</strong><span>scene outlines</span></div>
        <div><strong>{count("production")}</strong><span>production screenplays</span></div>
      </section>

      {dev.episodes.length === 0 ? (
        <div className="empty-state">
          <h2>No films to write for</h2>
          <p>
            A screenplay hangs off a film with a chosen location. The slate has been cleared, so this page stays empty
            until a chronology is rebuilt from the confirmed ideas.
          </p>
          <p><Link className="button primary" href="/ideas">Review ideas</Link> <Link className="button" href="/locations">Locations</Link></p>
        </div>
      ) : (
      <div className="table-wrap">
        <table className="location-table">
          <thead><tr><th>Film</th><th>Location / research</th>{STAGES.map(([, label]) => <th key={label}>{label}</th>)}<th>Gate</th></tr></thead>
          <tbody>
            {rows.map(({ episode, stages, next }) => (
              <tr key={episode.id}>
                <td><Link href={`/episodes/${episode.id}`}>{String(episode.chronology.global_position).padStart(2, "0")} {episode.title}</Link></td>
                <td>{episode.location.selected_location_id ? dev.places.get(episode.location.selected_location_id)?.name : <span className="warn">awaiting</span>}<br /><small>research: {episode.research.status}</small></td>
                {STAGES.map(([stage, label]) => {
                  const version = stages[stage];
                  return <td key={label}>{version ? <Link href={`/screenplays/${version.id}`}>v{version.version} · {version.status}</Link> : "—"}</td>;
                })}
                <td>{next.replaceAll("_", " ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </>
  );
}
