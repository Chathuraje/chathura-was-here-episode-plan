import Link from "next/link";
import IdeaList from "@/components/IdeaList";
import { getDevelopment, IDEA_REVIEW_STATUSES, orderedIdeas, type IdeaReviewStatus } from "@/lib/development";

function isStatus(value: string | undefined): value is IdeaReviewStatus {
  return Boolean(value) && IDEA_REVIEW_STATUSES.includes(value as IdeaReviewStatus);
}

export default async function IdeasPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const [dev, query] = await Promise.all([getDevelopment(), searchParams]);
  const filter = isStatus(query.status) ? query.status : null;
  const all = orderedIdeas(dev);
  const shown = filter ? all.filter((idea) => idea.review.status === filter) : all;
  const count = (status: IdeaReviewStatus) => all.filter((idea) => idea.review.status === status).length;
  const placed = all.filter((idea) => idea.suggested_location).length;
  const byGroup = dev.groups.map((group) => ({ group, ideas: shown.filter((idea) => idea.group_id === group.id) }));

  return (
    <>
      <header className="page-header">
        <div className="eyebrow">04 / Candidate ideas</div>
        <h1>Ideas</h1>
        <p>
          {all.length} candidate ideas so far. Open one to read its complete brief, set it to confirmed, pending or rejected,
          and give it a location from the <Link href="/locations">Locations</Link> tab. Rejected ideas stay in place so they
          can be regenerated later.
        </p>
      </header>

      <section className="summary" aria-label="Idea review summary">
        <div><strong>{count("confirmed")}</strong><span>confirmed</span></div>
        <div><strong>{count("pending")}</strong><span>pending</span></div>
        <div><strong className={count("rejected") ? "warn" : ""}>{count("rejected")}</strong><span>rejected</span></div>
        <div><strong>{placed}/{all.length}</strong><span>with a location</span></div>
      </section>

      <nav className="chip-list status-filter" aria-label="Filter ideas by review status">
        <Link href="/ideas" aria-current={filter ? undefined : "page"}>All {all.length}</Link>
        {IDEA_REVIEW_STATUSES.map((status) => (
          <Link key={status} href={`/ideas?status=${status}`} aria-current={filter === status ? "page" : undefined}>
            {status} {count(status)}
          </Link>
        ))}
      </nav>

      {shown.length === 0 ? (
        <div className="empty-state">
          <h2>No {filter} ideas</h2>
          <p>Nothing carries that status yet. <Link href="/ideas">Show every idea</Link>.</p>
        </div>
      ) : byGroup.map(({ group, ideas }) => (
        <section className="concept-section" key={group.id}>
          <div className="section-heading">
            <span>{String(group.chronological_position).padStart(2, "0")}</span>
            <h2><Link href={`/arc/${group.id}`}>{group.title}</Link></h2>
            <small>{ideas.length} ideas for {group.draft_film_count} films</small>
          </div>
          {ideas.length ? <IdeaList ideas={ideas} /> : <p className="muted-note">{filter ? `No ${filter} ideas in this group.` : "Not started yet."}</p>}
        </section>
      ))}
    </>
  );
}
