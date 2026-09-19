import Link from "next/link";
import { notFound } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import Markdown from "@/components/Markdown";
import { getDevelopment } from "@/lib/development";

const STAGE_LABEL: Record<string, string> = {
  treatment: "Treatment",
  scene_outline: "Scene outline",
  production: "Production screenplay",
  post_filming: "Post-filming version",
};

export default async function ScreenplayPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id.toUpperCase();
  const dev = await getDevelopment();
  const version = dev.screenplays.find((entry) => entry.id === id);
  if (!version) notFound();
  const episode = dev.episodes.find((entry) => entry.id === version.episode_id);
  const place = version.location_id ? dev.places.get(version.location_id) : undefined;
  const totalSeconds = version.scenes.reduce((total, scene) => total + (scene.estimated_seconds || 0), 0);

  return (
    <>
      <Link className="back-link" href={`/episodes/${version.episode_id}`}>← {episode?.title ?? version.episode_id}</Link>
      <header className="page-header concept-header">
        <div className="eyebrow">{version.id} / {STAGE_LABEL[version.stage]} v{version.version} / {version.status}</div>
        <h1>{version.title}</h1>
        <p>{version.guide.narrative_function}</p>
        <div className="concept-header-meta">
          <span>{version.guide.runtime.range}</span>
          <span>Narration {version.guide.runtime.narration_target}</span>
          {version.scenes.length ? <span>{version.scenes.length} scenes · {Math.floor(totalSeconds / 60)}:{String(totalSeconds % 60).padStart(2, "0")} estimated</span> : null}
          <span>{place ? `${place.name}` : "location missing"}</span>
        </div>
        <div className="actions"><CopyButton text={version.body_markdown} label="Copy text" /></div>
      </header>

      <div className="concept-layout">
        <article className="source-stack">
          <section className="source-document prose">
            <Markdown text={version.body_markdown} />
          </section>
          {version.scenes.length > 0 && (
            <section className="source-document">
              <div className="source-document-head"><div><span>Scene table</span><h2>{version.scenes.length} scenes</h2></div></div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>#</th><th>Scene</th><th>Footage and sound</th><th>Narration</th><th>Time</th><th>Gaps and continuity</th></tr></thead>
                  <tbody>
                    {version.scenes.map((scene) => (
                      <tr key={scene.n}>
                        <td>{scene.n}{scene.required ? "" : " (opt)"}</td>
                        <td><b>{scene.heading}</b><br /><small>{scene.purpose}</small></td>
                        <td><ul className="plain-list">{scene.footage.map((item) => <li key={item}>{item}</li>)}</ul><small>{scene.sound}</small></td>
                        <td><small>{scene.narration}</small>{scene.real_speech_placeholders.map((item) => <div key={item}><small className="warn">{item}</small></div>)}</td>
                        <td>{scene.estimated_seconds}s</td>
                        <td><small>{scene.research_gaps.join(" · ")}</small><br /><small>{scene.continuity}</small></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </article>
        <aside className="concept-aside">
          <section className="panel">
            <h2>Guide</h2>
            <span className="layer-label">Visual approach</span>
            <ul>{version.guide.visual_approach.map((item) => <li key={item}>{item}</li>)}</ul>
            <span className="layer-label">Sound approach</span>
            <ul>{version.guide.sound_approach.map((item) => <li key={item}>{item}</li>)}</ul>
            <span className="layer-label">Reveal order</span>
            <ol>{version.guide.information_reveal.order.map((item) => <li key={item}>{item}</li>)}</ol>
            <p className="panel-note">{version.guide.information_reveal.location_name_policy}</p>
          </section>
          <section className="panel">
            <h2>Continuity hooks</h2>
            <ul>{version.guide.continuity_hooks.map((item) => <li key={item}>{item}</li>)}</ul>
            <p className="panel-note"><em>{version.guide.evidence_boundary}</em></p>
          </section>
          {version.unknowns.length > 0 && (
            <section className="panel"><h2>Unknowns</h2><ul>{version.unknowns.map((item) => <li key={item}>{item}</li>)}</ul></section>
          )}
        </aside>
      </div>
    </>
  );
}
