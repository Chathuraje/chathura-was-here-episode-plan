export function hrefForId(id: string): string {
  return /^C\d{3}$/.test(id) ? `/concepts/${id}` : "/";
}

export function docHref(repoPath: string): string {
  return "/docs/" + repoPath.split("/").map(encodeURIComponent).join("/");
}

export function routeForRepoPath(repoPath: string): string {
  const clean = decodeURIComponent(repoPath.replace(/\/$/, ""));
  const concept = clean.match(/\/02-concepts\/Chapter\s+\d+\/Concept\s+(\d+)\s+-\s+[^/]+$/);
  if (concept) return `/concepts/C${concept[1].padStart(3, "0")}`;
  return docHref(clean);
}
