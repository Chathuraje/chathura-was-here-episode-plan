import Link from "next/link";
import { notFound } from "next/navigation";
import { CONTENT_NAME, readDoc } from "@/lib/content";
import { docHref, routeForRepoPath } from "@/lib/routes";
import Markdown from "@/components/Markdown";

const ROOTS = [
  { path: CONTENT_NAME, label: `${CONTENT_NAME} — research pipeline` },
  { path: "instructions", label: "instructions — agent instructions" },
];

export default async function DocPage({ params, searchParams }: { params: Promise<{ path?: string[] }>; searchParams: Promise<{ raw?: string }> }) {
  const { path: segs = [] } = await params;
  const { raw } = await searchParams;

  if (segs.length === 0) {
    return (
      <>
        <div className="kicker">Files</div>
        <h1>Library</h1>
        <p className="lede">Browse every Markdown file in the repository. Pages for ideas, concepts, territories, groups, questions and leads add connections on top of these files.</p>
        <ul className="tree">
          {ROOTS.map((r) => <li key={r.path}>📁 <Link href={docHref(r.path)}>{r.label}</Link></li>)}
        </ul>
      </>
    );
  }

  const rel = segs.map((s) => decodeURIComponent(s)).join("/");
  const doc = await readDoc(rel);
  if (!doc) notFound();
  const crumbs = doc.path.split("/");

  const breadcrumb = (
    <div className="small muted" style={{ marginBottom: 8 }}>
      <Link href="/docs">Library</Link>
      {crumbs.map((c, i) => (
        <span key={i}> / {i < crumbs.length - 1 ? <Link href={docHref(crumbs.slice(0, i + 1).join("/"))}>{c}</Link> : c}</span>
      ))}
    </div>
  );

  if (doc.isDir) {
    return (
      <>
        {breadcrumb}
        <h1>{crumbs[crumbs.length - 1]}</h1>
        <ul className="tree">
          {doc.entries.map(({ name, isDir }) => {
            const p = `${doc.path}/${name}`;
            if (!isDir && !name.endsWith(".md")) return <li key={name} className="muted">📄 {name}</li>;
            const special = routeForRepoPath(p);
            return (
              <li key={name}>
                {isDir ? "📁" : "📄"} <Link href={docHref(p)}>{name}</Link>
                {special !== docHref(p) ? <> · <Link className="small" href={special}>open in explorer</Link></> : null}
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  const text = doc.text;
  const front = text.match(/^---\n([\s\S]*?)\n---\n/);
  const body = front ? text.slice(front[0].length) : text;
  const special = routeForRepoPath(doc.path);

  return (
    <>
      {breadcrumb}
      <div className="row" style={{ marginBottom: 12 }}>
        <Link className="btn" href={raw ? docHref(doc.path) : `${docHref(doc.path)}?raw=1`}>{raw ? "Rendered view" : "Line-numbered view"}</Link>
        {special !== docHref(doc.path) ? <Link className="btn" href={special}>Open in explorer</Link> : null}
        <span className="muted small"><code>{doc.path}</code></span>
      </div>
      {raw ? (
        <div className="raw">
          {text.split("\n").map((line, i) => (
            <div id={`L${i + 1}`} key={i}>
              <a href={`#L${i + 1}`}>{i + 1}</a>
              <span>{line || " "}</span>
            </div>
          ))}
        </div>
      ) : (
        <>
          {front ? (
            <details className="section" style={{ marginBottom: 12 }}>
              <summary className="small">Front matter</summary>
              <pre className="small" style={{ whiteSpace: "pre-wrap" }}>{front[1]}</pre>
            </details>
          ) : null}
          <section className="card">
            <Markdown text={body} docPath={doc.path} />
          </section>
        </>
      )}
    </>
  );
}
