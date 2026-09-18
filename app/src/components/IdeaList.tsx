import Link from "next/link";
import type { Idea } from "@/lib/development";

export default function IdeaList({ ideas }: { ideas: Idea[] }) {
  return (
    <div className="concept-list">
      {ideas.map((idea) => (
        <Link className="idea-row" href={`/ideas/${idea.id}`} key={idea.id}>
          <strong>{idea.id}</strong>
          <div><b>{idea.title}</b><span>{idea.logline}</span></div>
          <small>{idea.concept_links.map((link) => link.concept_id).join(" · ")}</small>
          <em className="badge">{idea.status}</em>
        </Link>
      ))}
    </div>
  );
}
