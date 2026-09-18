import Link from "next/link";
import { getData } from "@/lib/content";
import { docHref } from "@/lib/routes";

export default async function SourcesPage() {
  const data = await getData();
  return (
    <>
      <header className="page-header">
        <div className="eyebrow">01 / Library</div>
        <h1>Sources</h1>
        <p>The original texts, source maps, and extraction references retained in the workspace.</p>
      </header>
      <div className="document-grid">
        {data.docs.sources.map((doc, index) => (
          <Link className="document-card" href={docHref(doc.path)} key={doc.path}>
            <span className="document-number">{String(index + 1).padStart(2, "0")}</span>
            <h2>{doc.title}</h2>
            <span className="document-path">{doc.path.split("/").pop()}</span>
            <strong>Read document <span aria-hidden="true">→</span></strong>
          </Link>
        ))}
      </div>
    </>
  );
}
