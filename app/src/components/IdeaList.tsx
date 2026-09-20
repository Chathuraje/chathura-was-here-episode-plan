import Link from "next/link";
import type { Idea, Place } from "@/lib/development";

export default function IdeaList({ ideas, places }: { ideas: Idea[]; places: Map<string, Place> }) {
  return (
    <div className="concept-list">
      {ideas.map((idea) => {
        const place = idea.location.location_id ? places.get(idea.location.location_id) : undefined;
        return (
          <Link className="idea-row" href={`/ideas/${idea.id}`} key={idea.id}>
            <strong>{idea.id}</strong>
            <div><b>{idea.title}</b><span>{idea.logline}</span></div>
            <small>{place ? place.name : <span className="muted-note">no location</span>}</small>
            <em className={`badge review-${idea.review.status}`}>{idea.review.status}</em>
          </Link>
        );
      })}
    </div>
  );
}
