import type { Digest } from "@/lib/development";

export default function DigestView({ digest }: { digest: Digest }) {
  return (
    <section className="source-document digest">
      <div className="source-document-head digest-head">
        <div>
          <span>Concept guide</span>
          <h2>{digest.title_en}</h2>
        </div>
        <span className="badge">{digest.status} · v{digest.version}</span>
      </div>

      <section className="digest-at-a-glance" id="overview" aria-labelledby="at-a-glance-title">
        <span className="content-tag source-backed">Source-backed summary</span>
        <h3 id="at-a-glance-title">At a glance</h3>
        <p>{digest.summary_en}</p>
      </section>

      <div className="content-key" aria-label="How information is labelled on this page">
        <div><span className="content-tag source-backed">From the sources</span><p>Summaries and explanations grounded in the supporting extracts.</p></div>
        <div><span className="content-tag editorial">Editorial</span><p>Plain-language interpretation and film possibilities—not claims made by the books.</p></div>
      </div>

      <section className="digest-primary" id="plain-language" aria-labelledby="plain-language-title">
        <div className="digest-section-title">
          <div><span className="content-tag editorial">Editorial interpretation</span><h3 id="plain-language-title">Understand it in everyday language</h3></div>
          <p>Start here for the central idea without the specialist terminology.</p>
        </div>
        <div className="explanation-grid">
          {digest.human_interpretation_en.map((section, index) => (
            <article className="explanation-card" key={section.heading}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h4>{section.heading}</h4>
              <p>{section.text}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="digest-deeper">
        <details className="digest-drawer" id="sinhala-teaching">
          <summary>
            <span><span className="content-tag source-backed">From the sources</span><strong>සිංහල පැහැදිලි කිරීම</strong></span>
            <small>{digest.sinhala_explanation.length} sections</small>
          </summary>
          <div className="digest-drawer-body">
            {digest.sinhala_explanation.map((section) => (
              <section className="digest-section" key={section.heading}><h4>{section.heading}</h4><p>{section.text}</p></section>
            ))}
          </div>
        </details>

        <details className="digest-drawer" id="key-terms">
          <summary>
            <span><span className="content-tag source-backed">Reference</span><strong>Key terms</strong></span>
            <small>{digest.key_terms.length} terms</small>
          </summary>
          <div className="digest-drawer-body">
            <div className="table-wrap term-table">
              <table>
                <thead><tr><th>Sinhala</th><th>Pāli</th><th>Meaning</th></tr></thead>
                <tbody>{digest.key_terms.map((term) => (
                  <tr key={term.term_si}>
                    <td>{term.term_si}</td>
                    <td>{term.pali || "—"}</td>
                    <td><strong>{term.en}</strong>{term.note ? <small>{term.note}</small> : null}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        </details>

        <details className="digest-drawer digest-caution" id="boundaries">
          <summary>
            <span><span className="content-tag caution">Important</span><strong>What this concept does not mean</strong></span>
            <small>{digest.does_not_transfer.length} cautions</small>
          </summary>
          <div className="digest-drawer-body">
            <ul className="boundary-list">{digest.does_not_transfer.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </details>

        <details className="digest-drawer" id="documentary-directions">
          <summary>
            <span><span className="content-tag editorial">Editorial</span><strong>Possible documentary directions</strong></span>
            <small>{digest.story_seeds.length} possibilities</small>
          </summary>
          <div className="digest-drawer-body story-seed-grid">
            {digest.story_seeds.map((seed, index) => (
              <article className="story-seed-card" key={seed.seed}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h4>{seed.seed}</h4>
                <dl>
                  <div><dt>What the camera could observe</dt><dd>{seed.what_camera_could_observe}</dd></div>
                  <div><dt>Why it fits</dt><dd>{seed.why_it_fits}</dd></div>
                  <div><dt>Setting</dt><dd>{seed.setting_type}</dd></div>
                  {seed.risk ? <div><dt>Risk</dt><dd>{seed.risk}</dd></div> : null}
                </dl>
              </article>
            ))}
          </div>
        </details>

        <details className="digest-drawer" id="source-notes">
          <summary>
            <span><span className="content-tag source-backed">Verification</span><strong>Source notes and points to check</strong></span>
            <small>{digest.cross_source_notes.length + digest.uncertainties.length} notes</small>
          </summary>
          <div className="digest-drawer-body source-note-groups">
            <section><h4>Differences between the sources</h4><ul>{digest.cross_source_notes.map((item) => <li key={item}>{item}</li>)}</ul></section>
            <section><h4>Uncertainties to verify</h4><ul>{digest.uncertainties.map((item) => <li key={item}>{item}</li>)}</ul></section>
            <section><h4>Extracts reviewed</h4><ul>{digest.sources_read.map((source) => <li key={source.ref}><strong>{source.ref}</strong>: lines {source.lines}{source.complete ? " (complete)" : ""}{source.markers ? ` · ${source.markers}` : ""}</li>)}</ul></section>
          </div>
        </details>
      </div>
    </section>
  );
}
