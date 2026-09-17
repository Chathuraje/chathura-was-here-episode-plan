import Link from "next/link";
import { notFound } from "next/navigation";
import { getData, readDoc } from "@/lib/content";
import { docHref } from "@/lib/routes";
import Markdown from "@/components/Markdown";
import { Box, Chips, GraphLink, StatusBadge } from "@/components/ui";

export default async function ConceptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const d = await getData();
  const c = d.concepts.get(id);
  if (!c) notFound();
  const note = c.sourceNotePath ? await readDoc(c.sourceNotePath) : null;
  const noteBody = note?.text.replace(/^---[\s\S]*?\n---\n/, "") ?? "";
  const prev = d.concepts.get(`C${String(c.num - 1).padStart(3, "0")}`);
  const next = d.concepts.get(`C${String(c.num + 1).padStart(3, "0")}`);

  return (
    <div className="split">
      <div>
        <div className="kicker">02 · Concept · Chapter {c.chapter}</div>
        <h1>{c.id} — {c.titleEn}</h1>
        <p className="lede">{c.titleSi}</p>
        <div className="row" style={{ marginBottom: 16 }}>
          <StatusBadge status={c.status} />
          <span className="muted small">Coverage: {c.coverage}</span>
          <GraphLink id={c.id} />
        </div>
        {note ? (
          <section className="card" id="source-note">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div className="kicker">Source understanding note</div>
              <Link className="small" href={docHref(note.path)}>Open file</Link>
            </div>
            <Markdown text={noteBody} docPath={note.path} />
          </section>
        ) : (
          <p className="muted">No source note found.</p>
        )}
      </div>
      <aside className="aside">
        <Box title="Source extracts">
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {c.sources.map((s) => (
              <li key={s.path}>
                <Link href={docHref(s.path)}>{s.name}</Link>{" "}
                <Link className="small muted" href={`${docHref(s.path)}?raw=1`}>(lines)</Link>
              </li>
            ))}
          </ul>
          <div className="small muted" style={{ marginTop: 6 }}><Link href={docHref(c.folder)}>Open folder</Link></div>
        </Box>
        <Box title={`Ideas from this concept (${c.ideaIds.length})`}>
          <Chips d={d} ids={c.ideaIds} empty="No suitable idea" notes={Object.fromEntries(c.ideaIds.map((i) => [i, d.ideas.get(i)?.status === "accepted for research" ? "" : d.ideas.get(i)?.status ?? ""]))} />
        </Box>
        <Box title="Supports other ideas">
          <Chips d={d} ids={c.supportsIdeaIds} />
        </Box>
        <div className="row">
          {prev ? <Link className="btn" href={`/concepts/${prev.id}`}>← {prev.id}</Link> : null}
          {next ? <Link className="btn" href={`/concepts/${next.id}`}>{next.id} →</Link> : null}
        </div>
      </aside>
    </div>
  );
}
