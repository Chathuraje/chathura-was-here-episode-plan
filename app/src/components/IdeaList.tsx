import Link from "next/link";
import type { Idea } from "@/lib/development";

export default function IdeaList({ ideas }: { ideas: Idea[] }) {
  return (
    <div className="concept-list">
      {ideas.map((idea) => (
        <Link className="idea-row" href={`/ideas/${idea.id}`} key={idea.id}>
          <strong>{idea.id}</strong>
          <div>
            <b>{idea.title}</b>
            <span className="idea-row-logline">{idea.logline}</span>
          </div>
          <small className={idea.suggested_location ? "idea-row-place" : "muted-note"}>
            {idea.suggested_location ? idea.suggested_location.name : "no place yet"}
          </small>
          <em className={`badge review-${idea.review.status}`}>{idea.review.status}</em>
        </Link>
      ))}
    </div>
  );
}
