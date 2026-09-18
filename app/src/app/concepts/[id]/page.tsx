import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "@/components/Markdown";
import DigestView from "@/components/DigestView";
import { getData, readDoc } from "@/lib/content";
import { getDevelopment } from "@/lib/development";
import { docHref } from "@/lib/routes";

export default async function ConceptPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id.toUpperCase();
  const [data, dev] = await Promise.all([getData(), getDevelopment()]);
  const concept = data.concepts.get(id);
  if (!concept) notFound();

  const group = dev.conceptGroup.get(concept.id);
  const role = group?.concepts.find((entry) => entry.id === concept.id)?.role;
  const digest = dev.digests.get(concept.id);
  const documents = (await Promise.all(concept.sources.map(async (source) => ({
    source,
    doc: await readDoc(source.path),
  })))).filter((entry): entry is typeof entry & { doc: NonNullable<typeof entry.doc> } => Boolean(entry.doc));
  const previous = data.concepts.get(`C${String(concept.num - 1).padStart(3, "0")}`);
  const next = data.concepts.get(`C${String(concept.num + 1).padStart(3, "0")}`);

  return (
    <>
      <Link className="back-link" href="/concepts">← All concepts</Link>
      <header className="page-header concept-header">
        <div className="eyebrow">Chapter {concept.chapter} / {concept.id}</div>
        <h1>{concept.title}</h1>
        {digest ? <p className="concept-english-title">{digest.title_en}</p> : null}
        <div className="concept-header-meta">
          <span>{concept.sources.length} supporting {concept.sources.length === 1 ? "source" : "sources"}</span>
          <span>{digest ? "Readable overview available" : "Source extracts only"}</span>
          {group ? <span>Story group {String(group.chronological_position).padStart(2, "0")}</span> : null}
        </div>
      </header>

      <div className="concept-layout">
        <article className="source-stack">
          {digest ? <div className="concept-anchor"><DigestView digest={digest} /></div> : (
            <section className="source-document concept-overview-pending" id="overview">
              <span className="content-tag caution">Overview in progress</span>
              <h2>Start with the supporting extracts</h2>
              <p>A plain-language guide has not been prepared for this concept yet. The original extracts below remain available in full.</p>
            </section>
          )}

          <section className="source-extracts" aria-labelledby="supporting-sources">
            <div className="content-section-head">
              <div>
                <span className="eyebrow">Original material</span>
                <h2 id="supporting-sources">Supporting source extracts</h2>
              </div>
              <p>Open an extract to read the text used for this concept.</p>
            </div>
            <div className="source-stack">
              {documents.map(({ doc, source }, index) => (
                <details className="source-document source-extract" id={`source-${index + 1}`} key={doc.path} open={!digest && index === 0}>
                  <summary className="source-extract-summary">
                    <span className="source-index">Source {index + 1}</span>
                    <strong>{source.name.replace(/\.md$/, "")}</strong>
                    <span className="source-toggle"><span className="open-label">Read extract</span><span className="close-label">Close extract</span></span>
                  </summary>
                  <div className="source-extract-body">
                    <div className="source-extract-toolbar">
                      <span>Original supporting text</span>
                      <Link href={`${docHref(doc.path)}?raw=1`}>View numbered lines</Link>
                    </div>
                    <Markdown text={doc.text} docPath={doc.path} />
                  </div>
                </details>
              ))}
            </div>
          </section>
        </article>

        <aside className="concept-aside">
          <section className="panel concept-on-page">
            <h2>On this page</h2>
            <nav aria-label="Concept page sections">
              <a href="#overview">At a glance</a>
              {digest ? <a href="#plain-language">Everyday explanation</a> : null}
              {digest ? <a href="#sinhala-teaching">සිංහල පැහැදිලි කිරීම</a> : null}
              {digest ? <a href="#key-terms">Key terms</a> : null}
              {digest ? <a href="#boundaries">What it does not mean</a> : null}
              {digest ? <a href="#documentary-directions">Documentary directions</a> : null}
              <a href="#supporting-sources">Supporting extracts</a>
              {documents.map(({ source }, index) => <a href={`#source-${index + 1}`} key={source.path}>Source {index + 1}: {source.name.replace(/\.md$/, "")}</a>)}
            </nav>
          </section>
          {group ? (
            <section className="panel">
              <h2>In the story arc</h2>
              <p className="panel-note">
                <Link href={`/arc/${group.id}`}>Group {String(group.chronological_position).padStart(2, "0")}: {group.title}</Link>
              </p>
              {role ? <p className="panel-note">Role: {role}</p> : null}
            </section>
          ) : null}
          <section className="panel">
            <h2>Files and references</h2>
            <ul>{concept.sources.map((source) => <li key={source.path}><Link href={docHref(source.path)}>{source.name}</Link></li>)}</ul>
            <Link className="small-link" href={docHref(concept.folder)}>Open concept folder</Link>
          </section>
          <nav className="previous-next" aria-label="Previous and next concepts">
            {previous ? <Link href={`/concepts/${previous.id}`}><span>Previous</span><strong>← {previous.id}</strong></Link> : <span />}
            {next ? <Link href={`/concepts/${next.id}`}><span>Next</span><strong>{next.id} →</strong></Link> : null}
          </nav>
        </aside>
      </div>
    </>
  );
}
