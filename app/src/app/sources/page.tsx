import Link from "next/link";
import { type Doc, type DocKind, getData } from "@/lib/content";
import { docHref } from "@/lib/routes";

const sections: {
  kind: DocKind;
  number: string;
  title: string;
  description: string;
  action: string;
}[] = [
  {
    kind: "primary-source",
    number: "01",
    title: "Primary texts",
    description: "The four transcribed book volumes. These are the source material from which concepts are extracted.",
    action: "Read text",
  },
  {
    kind: "source-map",
    number: "02",
    title: "Source maps",
    description: "Volume-by-volume indexes for locating concepts and their corresponding passages in the primary texts.",
    action: "Open map",
  },
  {
    kind: "guide",
    number: "03",
    title: "Extraction guides",
    description: "Working guidance for converting PDF data to Markdown and splitting a book into concept extracts. These are process notes, not source material.",
    action: "Open guide",
  },
];

export default async function SourcesPage() {
  const data = await getData();
  return (
    <>
      <header className="page-header">
        <div className="eyebrow">01 / Library</div>
        <h1>Source library</h1>
        <p>Read the primary book texts, use the maps to locate material, or consult the workflow guides used to prepare and divide the extracts.</p>
      </header>
      <div className="source-catalogue">
        {sections.map((section) => {
          const documents = data.docs.sources.filter((doc) => doc.kind === section.kind);
          return (
            <section className="source-section" key={section.kind} aria-labelledby={`source-section-${section.kind}`}>
              <div className="source-section-head">
                <span className="source-section-index">{section.number}</span>
                <div className="source-section-copy">
                  <h2 id={`source-section-${section.kind}`}>{section.title}</h2>
                  <p>{section.description}</p>
                </div>
                <span className="source-section-count">{documents.length} {documents.length === 1 ? "document" : "documents"}</span>
              </div>
              <div className="document-grid">
                {documents.map((doc, index) => (
                  <DocumentCard doc={doc} action={section.action} index={index} key={doc.path} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

function DocumentCard({ doc, action, index }: { doc: Doc; action: string; index: number }) {
  const filename = doc.path.split("/").pop()?.replace(/\.md$/, "") ?? doc.title;
  return (
    <Link className="document-card" href={docHref(doc.path)}>
      <span className="document-number">{String(index + 1).padStart(2, "0")}</span>
      <h3>{filename}</h3>
      {doc.title.toLocaleLowerCase() !== filename.toLocaleLowerCase() ? <span className="document-title">{doc.title}</span> : null}
      <strong>{action} <span aria-hidden="true">→</span></strong>
    </Link>
  );
}
