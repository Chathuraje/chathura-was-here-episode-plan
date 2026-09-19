import Link from "next/link";
import { getDevelopment, latestStages } from "@/lib/development";

const STAGES = [
  ["treatment", "Treatment"],
  ["scene_outline", "Outline"],
  ["production", "Screenplay"],
] as const;

export default async function ScreenplaysPage() {
  const dev = await getDevelopment();
  const rows = dev.episodes.map((episode) => ({ episode, stages: latestStages(dev, episode.id) }));
  const count = (stage: string) => rows.filter((row) => row.stages[stage as keyof typeof row.stages]).length;
  const unlocked = dev.episodes.filter((episode) => episode.location.selected_location_id).length;

  return (
    <>
      <header className="page-header">
        <div className="eyebrow">Step 8 / Episodes 2–99</div>
        <h1>Screenplays</h1>
        <p>
          Treatment → scene outline → production screenplay, one film at a time. A film unlocks when Chathura chooses its location.
          Generate the next stage from the episode brief with <code>docs/planning/prompts/screenplay-brief.md</code>.
        </p>
      </header>

      <section className="summary" aria-label="Screenplay summary">
        <div><strong>{unlocked}/{dev.episodes.length}</strong><span>unlocked by location</span></div>
        <div><strong>{count("treatment")}</strong><span>treatments</span></div>
        <div><strong>{count("scene_outline")}</strong><span>scene outlines</span></div>
        <div><strong>{count("production")}</strong><span>production screenplays</span></div>
      </section>

      <div className="table-wrap">
        <table className="location-table">
          <thead><tr><th>Film</th><th>Location</th>{STAGES.map(([, label]) => <th key={label}>{label}</th>)}</tr></thead>
          <tbody>
            {rows.map(({ episode, stages }) => (
              <tr key={episode.id}>
                <td><Link href={`/episodes/${episode.id}`}>{String(episode.chronology.global_position).padStart(2, "0")} {episode.title}</Link></td>
                <td>{episode.location.selected_location_id ? dev.places.get(episode.location.selected_location_id)?.name : <span className="warn">awaiting</span>}</td>
                {STAGES.map(([stage, label]) => {
                  const version = stages[stage];
                  return <td key={label}>{version ? <Link href={`/screenplays/${version.id}`}>v{version.version} · {version.status}</Link> : "—"}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
