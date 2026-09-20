import Link from "next/link";
import DepthConceptTable from "@/components/DepthConceptTable";
import { docHref } from "@/lib/routes";
import { getDepthMap, type DepthStatus } from "@/lib/development";
import styles from "./depth-map.module.css";

const statusLabels: Record<DepthStatus, string> = {
  missing: "Missing",
  surface_only: "Surface only",
  introduced: "Introduced",
  built: "Built",
  integrated: "Integrated",
  dangerously_compressed: "Dangerously compressed",
};

const shortStatus: Record<DepthStatus, string> = {
  missing: "None",
  surface_only: "Surface",
  introduced: "Intro",
  built: "Built",
  integrated: "Integrated",
  dangerously_compressed: "Compressed",
};

export default async function DepthMapPage() {
  const depthMap = await getDepthMap();
  const summary = depthMap.summary;
  const highRiskConcepts = depthMap.concepts
    .filter((concept) => concept.review_priority === "high")
    .sort((a, b) => {
      const order = ["GRP-09", "GRP-10", "GRP-08", "GRP-04"];
      return (order.indexOf(a.group_id) === -1 ? 99 : order.indexOf(a.group_id)) - (order.indexOf(b.group_id) === -1 ? 99 : order.indexOf(b.group_id));
    })
    .slice(0, 12);
  const highRiskMechanisms = depthMap.mechanisms.filter((mechanism) => mechanism.review_priority === "high");
  const reviewGroups = depthMap.groups.filter((group) => group.review_priority !== "low").sort((a, b) => a.review_priority === "high" ? -1 : b.review_priority === "high" ? 1 : 0);

  return (
    <div className={styles.page}>
      <header className="page-header">
        <div className="eyebrow">Analysis / viewer understanding</div>
        <h1>Abhidhamma Depth Map</h1>
        <p>Does the current 98-film chronology build a deeper mental model, or only place concepts on screen? This draft analysis separates presence from teaching depth without changing the slate.</p>
      </header>

      <section className={styles.verdict} aria-labelledby="verdict-title">
        <div>
          <span>Overall verdict</span>
          <h2 id="verdict-title">Mixed: real depth, unevenly distributed</h2>
          <p>{summary.verdict_text}</p>
        </div>
        <Link className={`button ${styles.reportLink}`} href={docHref("docs/planning/07-abhidhamma-depth-map.md")}>Read planning report</Link>
      </section>

      <section className={styles.summaryGrid} aria-label="Depth map summary">
        <div className={styles.summaryCard}><strong>{summary.total_concepts}</strong><span>concepts assessed</span></div>
        <div className={styles.summaryCard}><strong>{summary.concepts_with_adequate_depth}</strong><span>built or integrated</span></div>
        <div className={styles.summaryCard}><strong>{summary.concept_status_counts.introduced}</strong><span>introduced</span></div>
        <div className={styles.summaryCard}><strong>{summary.concept_status_counts.surface_only}</strong><span>surface only</span></div>
        <div className={styles.summaryCard}><strong>{summary.concept_status_counts.dangerously_compressed}</strong><span>dangerously compressed</span></div>
        <div className={styles.summaryCard}><strong>{summary.major_mechanisms_assessed}</strong><span>major mechanisms</span></div>
      </section>

      <section className={styles.section} aria-labelledby="method-title">
        <div className={styles.sectionHead}>
          <div><span className="eyebrow">How judgments were made</span><h2 id="method-title">Three levels of learning</h2></div>
          <div className={styles.legend}>
            {(Object.keys(statusLabels) as DepthStatus[]).map((status) => <span key={status} className={styles.statusChip} data-status={status}>{statusLabels[status]}</span>)}
          </div>
        </div>
        <div className={styles.methodGrid}>
          {Object.entries(depthMap.methodology.levels).map(([level, description]) => (
            <article className={styles.methodCard} key={level}><span>{level}</span><h3>{level === "experience" ? "Notice it" : level === "understanding" ? "Explain it" : "Place it in the system"}</h3><p>{description}</p></article>
          ))}
        </div>
        <p className={styles.boundary}>{depthMap.analytical_boundary}</p>
      </section>

      <section className={styles.section} id="groups" aria-labelledby="groups-title">
        <div className={styles.sectionHead}><div><span className="eyebrow">GRP-01 → GRP-10</span><h2 id="groups-title">Group teaching depth</h2><p>Each card separates the group&apos;s experiential strength from the structures it compresses.</p></div></div>
        <div className={styles.groupGrid}>
          {depthMap.groups.map((group) => (
            <article className={styles.groupCard} data-status={group.overall_teaching_depth_status} key={group.group_id}>
              <div className={styles.groupTop}>
                <div><small>{group.group_id}</small><h3><Link href={`/arc/${group.group_id}`}>{group.title}</Link></h3><p>{group.emotional_stage}</p></div>
                <span className={styles.statusChip} data-status={group.overall_teaching_depth_status}>{statusLabels[group.overall_teaching_depth_status]}</span>
              </div>
              <p className={styles.groupLearn}>{group.what_a_viewer_likely_learns}</p>
              <div className={styles.groupMeta}><span>{group.concept_count} concepts</span><span>{group.episode_count} films</span><span>{group.review_priority} review priority</span></div>
              <div className={styles.groupMechanisms}>
                <div><b>Strongest</b><span>{group.strongest_mechanisms.length ? group.strongest_mechanisms.slice(0, 3).map((mechanism) => mechanism.name).join(" · ") : "No mechanism reaches built depth here"}</span></div>
                <div><b>Most compressed</b><span>{group.most_compressed_mechanisms.length ? group.most_compressed_mechanisms.map((mechanism) => mechanism.name).join(" · ") : "No major mechanism flagged"}</span></div>
              </div>
              <p className={styles.groupRecommendation}>{group.recommendation_summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="matrix" aria-labelledby="matrix-title">
        <div className={styles.sectionHead}>
          <div><span className="eyebrow">Mechanism × group</span><h2 id="matrix-title">Depth heatmap</h2><p>A coloured cell means teaching presence, not mere concept linkage. Hover a cell for its status and episode evidence.</p></div>
        </div>
        <div className={styles.matrixWrap}>
          <table className={styles.matrix}>
            <thead><tr><th>Mechanism</th>{depthMap.groups.map((group) => <th key={group.group_id}><Link href={`/arc/${group.group_id}`}>{group.group_id.replace("GRP-", "G")}</Link></th>)}</tr></thead>
            <tbody>
              {depthMap.mechanisms.map((mechanism) => (
                <tr key={mechanism.mechanism_id} id={mechanism.mechanism_id}>
                  <th><Link href={`#detail-${mechanism.mechanism_id}`}><span>{mechanism.mechanism_id}</span>{mechanism.name}</Link></th>
                  {mechanism.group_coverage.map((coverage) => (
                    <td key={coverage.group_id} title={`${mechanism.name} / ${coverage.group_id}: ${statusLabels[coverage.status]}${coverage.episode_ids.length ? ` — ${coverage.episode_ids.join(", ")}` : ""}`}>
                      <div className={styles.matrixCell} data-status={coverage.status}><span>{shortStatus[coverage.status]}</span></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section} id="mechanisms" aria-labelledby="mechanisms-title">
        <div className={styles.sectionHead}><div><span className="eyebrow">First introduced → built → recalled</span><h2 id="mechanisms-title">Mechanism assessments</h2><p>The key question is what the viewer can explain after the sequence, not how many links exist in the data.</p></div></div>
        <div className={styles.mechanismCards}>
          {depthMap.mechanisms.map((mechanism) => {
            const episodeIds = [mechanism.first_introduced_episode, ...mechanism.development_episodes, ...mechanism.integration_episodes, ...mechanism.recall_episodes];
            return (
              <article className={styles.mechanismCard} id={`detail-${mechanism.mechanism_id}`} key={mechanism.mechanism_id}>
                <div className={styles.mechanismCardHead}><span>{mechanism.mechanism_id}</span><span className={styles.statusChip} data-status={mechanism.current_depth_status}>{statusLabels[mechanism.current_depth_status]}</span></div>
                <h3>{mechanism.name}</h3><p>{mechanism.summary}</p>
                <div className={styles.milestones}>{Array.from(new Set(episodeIds)).map((id) => <Link href={`/episodes/${id}`} key={id}>{id.replace("EPD-", "")}</Link>)}</div>
                <p className={styles.mechanismViewer}>{mechanism.viewer_understanding_summary}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.section} id="concepts" aria-labelledby="concepts-title">
        <div className={styles.sectionHead}><div><span className="eyebrow">C001 → C102</span><h2 id="concepts-title">Concept-depth table</h2><p>Filter by group or status. Episode links are evidence locations; they do not by themselves imply adequate depth.</p></div></div>
        <DepthConceptTable rows={depthMap.concepts.map((concept) => ({ conceptId: concept.concept_id, title: concept.title, groupId: concept.group_id, episodeIds: concept.linked_episode_ids, status: concept.depth_status, note: concept.viewer_understanding_summary }))} />
      </section>

      <section className={styles.section} id="risks" aria-labelledby="risks-title">
        <div className={styles.sectionHead}><div><span className="eyebrow">Review first</span><h2 id="risks-title">Compression risks</h2><p>These are review prompts, not automatic changes or rejections.</p></div></div>
        <div className={styles.riskGrid}>
          <article className={styles.riskPanel}><h3>Concepts</h3><p>Highest-risk concepts, prioritised toward the groups that need review first.</p><ul className={styles.riskList}>{highRiskConcepts.map((concept) => <li key={concept.concept_id}><strong><Link href={`/concepts/${concept.concept_id}`}>{concept.concept_id}</Link></strong><span>{concept.title} · {concept.group_id}</span></li>)}</ul></article>
          <article className={styles.riskPanel}><h3>Mechanisms</h3><p>Systems whose internal logic is not yet fully reconstructable.</p><ul className={styles.riskList}>{highRiskMechanisms.map((mechanism) => <li key={mechanism.mechanism_id}><strong><Link href={`#detail-${mechanism.mechanism_id}`}>{mechanism.mechanism_id}</Link></strong><span>{mechanism.name} · {statusLabels[mechanism.current_depth_status]}</span></li>)}</ul></article>
          <article className={styles.riskPanel}><h3>Groups</h3><p>Recommended order for depth-focused chronology review.</p><ul className={styles.riskList}>{reviewGroups.map((group) => <li key={group.group_id}><strong><Link href={`/arc/${group.group_id}`}>{group.group_id}</Link></strong><span>{group.title} · {group.review_priority} priority</span></li>)}</ul></article>
        </div>
      </section>

      <section className={styles.section} id="recommendations" aria-labelledby="recommendations-title">
        <div className={styles.sectionHead}><div><span className="eyebrow">Non-destructive layer</span><h2 id="recommendations-title">Recommendations for Chronology v1 review</h2></div></div>
        <div className={styles.recommendations}>
          {depthMap.recommendations.map((recommendation) => <article className={styles.recommendation} data-priority={recommendation.priority} key={`${recommendation.target}-${recommendation.category}`}><span>{recommendation.priority}</span><strong>{recommendation.target}</strong><p>{recommendation.text}</p></article>)}
        </div>
      </section>
    </div>
  );
}
