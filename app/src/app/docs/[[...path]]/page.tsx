import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "@/components/Markdown";
import { CONTENT_NAME, DIRS, readDoc } from "@/lib/content";
import { docHref, routeForRepoPath } from "@/lib/routes";

const ROOTS = [
  { path: `${CONTENT_NAME}/${DIRS.sources}`, label: "Sources" },
  { path: `${CONTENT_NAME}/${DIRS.concepts}`, label: "Concepts" },
];

export default async function DocPage({ params, searchParams }: { params: Promise<{ path?: string[] }>; searchParams: Promise<{ raw?: string }> }) {
  const { path: segments = [] } = await params;
  const { raw } = await searchParams;

  if (!segments.length) {
    return (
      <>
        <header className="page-header"><div className="eyebrow">Files</div><h1>Library</h1><p>Browse the source and concept files directly.</p></header>
        <div className="library-roots">{ROOTS.map((root) => <Link href={docHref(root.path)} key={root.path}><span aria-hidden="true">↳</span><strong>{root.label}</strong><small>{root.path}</small></Link>)}</div>
      </>
    );
  }

  const rel = segments.map((segment) => decodeURIComponent(segment)).join("/");
  const doc = await readDoc(rel);
  if (!doc) notFound();
  const crumbs = doc.path.split("/");
  const breadcrumb = (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link href="/docs">Library</Link>
      {crumbs.map((crumb, index) => <span key={`${crumb}-${index}`}>/ {index < crumbs.length - 1 ? <Link href={docHref(crumbs.slice(0, index + 1).join("/"))}>{crumb}</Link> : crumb}</span>)}
    </nav>
  );

  if (doc.isDir) {
    return (
      <>
        {breadcrumb}
        <h1>{crumbs.at(-1)}</h1>
        <div className="file-list">
          {doc.entries.map(({ name, isDir }) => {
            const childPath = `${doc.path}/${name}`;
            const special = routeForRepoPath(childPath);
            const readable = isDir || name.endsWith(".md");
            return readable ? <Link href={special} key={name}><span>{isDir ? "Folder" : "Document"}</span><strong>{name}</strong><b aria-hidden="true">→</b></Link> : <div className="unavailable-file" key={name}><span>Local file</span><strong>{name}</strong></div>;
          })}
        </div>
      </>
    );
  }

  const frontMatter = doc.text.match(/^---\n([\s\S]*?)\n---\n/);
  const body = frontMatter ? doc.text.slice(frontMatter[0].length) : doc.text;
  return (
    <>
      {breadcrumb}
      <div className="document-toolbar">
        <Link className="button" href={raw ? docHref(doc.path) : `${docHref(doc.path)}?raw=1`}>{raw ? "Rendered view" : "Line-numbered view"}</Link>
        <code>{doc.path}</code>
      </div>
      {raw ? (
        <div className="raw">{doc.text.split("\n").map((line, index) => <div id={`L${index + 1}`} key={index}><a href={`#L${index + 1}`}>{index + 1}</a><span>{line || " "}</span></div>)}</div>
      ) : (
        <section className="source-document"><Markdown text={body} docPath={doc.path} /></section>
      )}
    </>
  );
}
