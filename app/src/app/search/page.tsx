import Link from "next/link";
import { redirect } from "next/navigation";
import { getData } from "@/lib/content";
import { getDevelopment } from "@/lib/development";
import { docHref } from "@/lib/routes";

type Hit = { key: string; label: string; detail: string; href: string; score: number };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const query = ((await searchParams).q ?? "").trim();
  const needle = query.toLocaleLowerCase();
  const [data, dev] = await Promise.all([getData(), getDevelopment()]);
  const upper = query.toUpperCase();
  if (data.concepts.has(upper)) redirect(`/concepts/${upper}`);

  const score = (...values: string[]) => values.reduce((total, value, index) => (
    total + (value.toLocaleLowerCase().includes(needle) ? 5 - Math.min(index, 4) : 0)
  ), 0);

  const conceptHits: Hit[] = needle.length >= 2 ? [...data.concepts.values()]
    .map((concept) => {
      const englishTitle = dev.digests.get(concept.id)?.title_en;
      return {
        key: concept.id,
        label: `${concept.id} - ${concept.title}`,
        detail: [englishTitle, `Chapter ${concept.chapter} / ${concept.sources.length} source extracts`].filter(Boolean).join(" · "),
        href: `/concepts/${concept.id}`,
        score: score(concept.id, concept.title, englishTitle ?? "", `chapter ${concept.chapter}`),
      };
    })
    .filter((hit) => hit.score)
    .sort((a, b) => b.score - a.score) : [];

  const sourceHits: Hit[] = needle.length >= 2 ? data.docs.sources
    .map((doc) => ({
      key: doc.path,
      label: doc.title,
      detail: doc.path,
      href: docHref(doc.path),
      score: score(doc.title, doc.path),
    }))
    .filter((hit) => hit.score)
    .sort((a, b) => b.score - a.score) : [];

  const total = conceptHits.length + sourceHits.length;
  return (
    <>
      <header className="page-header">
        <div className="eyebrow">Library search</div>
        <h1>{query ? `Results for “${query}”` : "Search"}</h1>
        <p>Search concept identifiers, Sinhala or English titles, chapters, and library documents.</p>
      </header>
      <form action="/search" className="page-search">
        <input name="q" defaultValue={query} autoFocus type="search" placeholder="Try C006, a Sinhala or English title, or a source name" />
        <button className="button primary" type="submit">Search</button>
      </form>
      {needle.length >= 2 ? <p className="result-count">{total} {total === 1 ? "result" : "results"}</p> : null}
      <SearchResults title="Concepts" hits={conceptHits} />
      <SearchResults title="Sources" hits={sourceHits} />
      {needle.length >= 2 && !total ? <div className="empty-state"><h2>No matches</h2><p>Try a shorter term or browse the full catalogue.</p><Link className="button" href="/concepts">Browse concepts</Link></div> : null}
    </>
  );
}

function SearchResults({ title, hits }: { title: string; hits: Hit[] }) {
  if (!hits.length) return null;
  return (
    <section className="search-section">
      <h2>{title} <span>{hits.length}</span></h2>
      <div className="search-results">
        {hits.map((hit) => <Link href={hit.href} key={hit.key}><strong>{hit.label}</strong><span>{hit.detail}</span><b aria-hidden="true">→</b></Link>)}
      </div>
    </section>
  );
}
