export function hrefForId(id: string): string {
  if (/^SL-SQ\d{2}-\d{3}$/.test(id)) return `/leads/${id}`;
  if (/^C\d{3}-I\d{2}$/.test(id)) return `/ideas/${id}`;
  if (/^C\d{3}$/.test(id)) return `/concepts/${id}`;
  if (/^SQ\d{2}$/.test(id)) return `/shortlist/${id}`;
  if (/^T\d{2}$/.test(id)) return `/territories/${id}`;
  if (/^G\d{2}$/.test(id)) return `/groups/${id}`;
  return "/";
}

export function docHref(repoPath: string): string {
  return "/docs/" + repoPath.split("/").map(encodeURIComponent).join("/");
}

/** Map a repo-relative file path to the best page in the app. */
export function routeForRepoPath(p: string): string {
  const idea = p.match(/^content\/03-idea-bank\/ideas\/(C\d{3}-I\d{2})\b/);
  if (idea) return `/ideas/${idea[1]}`;
  const lead = p.match(/^content\/05-story-leads\/(SL-SQ\d{2}-\d{3})\b/);
  if (lead) return `/leads/${lead[1]}`;
  const special: Record<string, string> = {
    "content/04-story-discovery/research-shortlist.md": "/shortlist",
    "content/04-story-discovery/philosophy-map.md": "/territories",
    "content/04-story-discovery/overlap-map.md": "/groups",
    "content/04-story-discovery/documentary-potential-matrix.md": "/ideas?view=scores",
    "content/05-story-leads": "/leads",
  };
  return special[p.replace(/\/$/, "")] ?? docHref(p);
}

export const TYPE_COLORS: Record<string, string> = {
  concept: "#8a6d3b",
  idea: "#2f6fb0",
  territory: "#b0452f",
  group: "#6b4fa8",
  shortlist: "#1f8a5b",
  lead: "#c77d10",
};
