import Link from "next/link";
import IdeaList from "@/components/IdeaList";
import { getDevelopment } from "@/lib/development";

export default async function IdeasPage() {
  const dev = await getDevelopment();
  const byGroup = dev.groups.map((group) => ({ group, ideas: dev.ideas.filter((idea) => idea.group_id === group.id) }));

  return (
    <>
      <header className="page-header">
        <div className="eyebrow">04 / Candidate ideas</div>
        <h1>Ideas</h1>
        <p>{dev.ideas.length} candidate ideas so far. Each idea page has a complete brief you can copy, or an agent can fetch it as JSON.</p>
      </header>
      {byGroup.map(({ group, ideas }) => (
        <section className="concept-section" key={group.id}>
          <div className="section-heading">
            <span>{String(group.chronological_position).padStart(2, "0")}</span>
            <h2><Link href={`/arc/${group.id}`}>{group.title}</Link></h2>
            <small>{ideas.length} ideas for {group.draft_film_count} films</small>
          </div>
          {ideas.length ? <IdeaList ideas={ideas} /> : <p className="muted-note">Not started yet.</p>}
        </section>
      ))}
    </>
  );
}

