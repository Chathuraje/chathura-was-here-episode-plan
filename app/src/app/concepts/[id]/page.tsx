import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "@/components/Markdown";
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

  const documents = (await Promise.all(concept.sources.map((source) => readDoc(source.path))))
    .filter((doc): doc is NonNullable<typeof doc> => Boolean(doc));
  const previous = data.concepts.get(`C${String(concept.num - 1).padStart(3, "0")}`);
  const next = data.concepts.get(`C${String(concept.num + 1).padStart(3, "0")}`);

  return (
    <>
      <Link className="back-link" href="/concepts">← All concepts</Link>
      <header className="page-header concept-header">
        <div className="eyebrow">Chapter {concept.chapter} / {concept.id}</div>
        <h1>{concept.title}</h1>
        <p>{concept.sources.length} supporting source {concept.sources.length === 1 ? "extract" : "extracts"}</p>
      </header>

      <div className="concept-layout">
        <article className="source-stack">
          {documents.map((doc, index) => (
            <section className="source-document" key={doc.path}>
              <div className="source-document-head">
                <div><span>Source {index + 1}</span><h2>{concept.sources[index]?.name.replace(/\.md$/, "")}</h2></div>
                <Link href={`${docHref(doc.path)}?raw=1`}>View lines</Link>
              </div>
              <Markdown text={doc.text} docPath={doc.path} />
            </section>
          ))}
        </article>
        <aside className="concept-aside">
          {group && (
            <section className="panel">
              <h2>Story arc</h2>
              <p className="panel-note">
                <Link href={`/arc/${group.id}`}>Group {String(group.chronological_position).padStart(2, "0")}: {group.title}</Link>
              </p>
              {role && <p className="panel-note">{role}</p>}
            </section>
          )}
          <section className="panel">
            <h2>Source files</h2>
            <ul>{concept.sources.map((source) => <li key={source.path}><Link href={docHref(source.path)}>{source.name}</Link></li>)}</ul>
            <Link className="small-link" href={docHref(concept.folder)}>Open concept folder</Link>
          </section>
          <div className="previous-next">
            {previous ? <Link href={`/concepts/${previous.id}`}>← {previous.id}</Link> : <span />}
            {next ? <Link href={`/concepts/${next.id}`}>{next.id} →</Link> : null}
          </div>
        </aside>
      </div>
    </>
  );
}
