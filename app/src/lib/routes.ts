export function hrefForId(id: string): string {
  if (/^ST-\d{3}$/.test(id)) return `/episodes/${id}`;
  if (/^SEG-E(001|100A|100B)$/.test(id)) return `/episodes/${id}`;
  if (/^CX-\d{3}$/.test(id)) return `/series/connections?cx=${id}`;
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

/**
 * Map a repo-relative file path to the best page in the app.
 * Matching is by the numbered folder names, so the content root can be named anything.
 */
export function routeForRepoPath(p: string): string {
  const clean = p.replace(/\/$/, "");
  const idea = clean.match(/\/03-idea-bank\/ideas\/(C\d{3}-I\d{2})\b/);
  if (idea) return `/ideas/${idea[1]}`;
  const lead = clean.match(/\/05-story-leads\/(SL-SQ\d{2}-\d{3})\b/);
  if (lead) return `/leads/${lead[1]}`;
  const special: [RegExp, string][] = [
    [/\/04-story-discovery\/research-shortlist\.md$/, "/shortlist"],
    [/\/04-story-discovery\/philosophy-map\.md$/, "/territories"],
    [/\/04-story-discovery\/overlap-map\.md$/, "/groups"],
    [/\/04-story-discovery\/documentary-potential-matrix\.md$/, "/ideas?view=scores"],
    [/\/05-story-leads$/, "/leads"],
    [/\/06-series-architecture\/EPISODE-MATRIX\.md$/, "/episodes"],
    [/\/06-series-architecture\/NEEDS-ATTENTION\.md$/, "/attention"],
    [/\/06-series-architecture\/SEASON-ARC-MAP\.md$/, "/series"],
    [/\/06-series-architecture\/HIDDEN-CHRONOLOGY\.md$/, "/series/chronology"],
  ];
  return special.find(([re]) => re.test(clean))?.[1] ?? docHref(clean);
}

export const TYPE_COLORS: Record<string, string> = {
  concept: "#8a6d3b",
  idea: "#2f6fb0",
  territory: "#b0452f",
  group: "#6b4fa8",
  shortlist: "#1f8a5b",
  lead: "#c77d10",
  story: "#0f7c86",
  segment: "#8a3b6f",
};
