import type { Digest } from "@/lib/development";

export default function DigestView({ digest }: { digest: Digest }) {
  return (
    <section className="source-document digest">
      <div className="source-document-head">
        <div><span>Concept digest / {digest.status} / v{digest.version}</span><h2>{digest.title_en}</h2></div>
      </div>
      <p className="digest-summary">{digest.summary_en}</p>

      <details open>
        <summary>සිංහල පැහැදිලි කිරීම <small>(source teaching)</small></summary>
        {digest.sinhala_explanation.map((section) => (
          <div className="digest-section" key={section.heading}><h3>{section.heading}</h3><p>{section.text}</p></div>
        ))}
      </details>

      <details open>
        <summary>Human interpretation <small>(editorial)</small></summary>
        {digest.human_interpretation_en.map((section) => (
          <div className="digest-section" key={section.heading}><h3>{section.heading}</h3><p>{section.text}</p></div>
        ))}
        <span className="layer-label">Does not transfer</span>
        <ul className="plain-list">{digest.does_not_transfer.map((item) => <li key={item}>{item}</li>)}</ul>
      </details>

      <details>
        <summary>Key terms ({digest.key_terms.length})</summary>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Sinhala</th><th>Pāli</th><th>Meaning</th></tr></thead>
            <tbody>{digest.key_terms.map((term) => (
              <tr key={term.term_si}><td>{term.term_si}</td><td>{term.pali}</td><td>{term.en}{term.note ? <small> ({term.note})</small> : null}</td></tr>
            ))}</tbody>
          </table>
        </div>
      </details>

      <details>
        <summary>Story seeds ({digest.story_seeds.length})</summary>
        {digest.story_seeds.map((seed) => (
          <div className="digest-section" key={seed.seed}>
            <h3>{seed.seed}</h3>
            <p><b>Camera:</b> {seed.what_camera_could_observe}</p>
            <p><b>Why it fits:</b> {seed.why_it_fits}</p>
            <p className="panel-note">Setting type: {seed.setting_type}{seed.risk ? ` · Risk: ${seed.risk}` : ""}</p>
          </div>
        ))}
      </details>

      <details>
        <summary>Source differences and uncertainties ({digest.cross_source_notes.length + digest.uncertainties.length})</summary>
        <span className="layer-label">Between the sources</span>
        <ul className="plain-list">{digest.cross_source_notes.map((item) => <li key={item}>{item}</li>)}</ul>
        <span className="layer-label">Uncertainties to check</span>
        <ul className="plain-list">{digest.uncertainties.map((item) => <li key={item}>{item}</li>)}</ul>
        <span className="layer-label">Lines read</span>
        <ul className="plain-list">{digest.sources_read.map((source) => <li key={source.ref}>{source.ref}: lines {source.lines}{source.complete ? " (complete)" : ""}{source.markers ? `, ${source.markers}` : ""}</li>)}</ul>
      </details>
    </section>
  );
}
