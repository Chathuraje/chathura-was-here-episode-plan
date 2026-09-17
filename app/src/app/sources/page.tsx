import Link from "next/link";
import { getData } from "@/lib/content";
import { docHref } from "@/lib/routes";

export default async function SourcesPage() {
  const d = await getData();
  const groups = [
    { title: "Book extracts and source maps", docs: d.docs.sources },
    { title: "Working instructions", docs: d.docs.instructions },
    { title: "Idea-bank reference files", docs: d.docs.ideaBank },
    { title: "Story-discovery files", docs: d.docs.discovery },
  ];
  return (
    <>
      <div className="kicker">01 · Sources</div>
      <h1>Sources and reference files</h1>
      <p className="lede">The original book extracts (PDFs are kept locally and ignored by git) and the instructions that govern each stage.</p>
      <div className="grid grid-2">
        {groups.map((g) => (
          <section className="card" key={g.title}>
            <h3>{g.title}</h3>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {g.docs.map((doc) => (
                <li key={doc.path}>
                  <Link href={docHref(doc.path)}>{doc.title}</Link>
                  <div className="muted small"><code>{doc.path.split("/").pop()}</code></div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="small muted">See also the <Link href={docHref("content/PATH-MAP.md")}>path map</Link> for how the folders were reorganised.</p>
    </>
  );
}
