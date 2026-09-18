import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

/* ------------------------------------------------------------------ */
/* Locations                                                           */
/* ------------------------------------------------------------------ */

export const CONTENT_DIR = path.resolve(process.env.CONTENT_DIR ?? path.join(process.cwd(), "..", "content"));
export const REPO_DIR = path.dirname(CONTENT_DIR);
/** Folder name of the content root, normally "content". Used to build repo-relative paths. */
export const CONTENT_NAME = path.basename(CONTENT_DIR);

export const DIRS = {
  sources: "01-sources",
  concepts: "02-concepts",
  ideaBank: "03-idea-bank",
  discovery: "04-story-discovery",
  leads: "05-story-leads",
  series: "06-series-architecture",
} as const;

/** Repo-relative POSIX path, e.g. "content/03-idea-bank/index.md". */
export function repoRel(abs: string): string {
  return path.relative(REPO_DIR, abs).split(path.sep).join("/");
}

/** Repo-relative path inside the content folder. */
export function contentRel(...segments: string[]): string {
  return repoRel(path.join(CONTENT_DIR, ...segments));
}

const nfc = (s: string) => s.normalize("NFC");

async function read(abs: string): Promise<string> {
  return (await fs.readFile(abs, "utf8")).replace(/\r\n/g, "\n");
}

async function listDir(abs: string): Promise<string[]> {
  try {
    return (await fs.readdir(abs)).filter((f) => !f.startsWith(".")).sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  } catch {
    return [];
  }
}

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type SourceFile = { name: string; path: string };

export type Concept = {
  id: string; // C006
  num: number;
  chapter: number;
  titleSi: string;
  titleEn: string;
  folder: string; // repo-relative
  status: string;
  coverage: string;
  sources: SourceFile[];
  sourceNotePath?: string;
  ideaIds: string[];
  supportsIdeaIds: string[]; // ideas that list this concept as supporting
};

export type Idea = {
  id: string;
  title: string;
  status: "accepted for research" | "held" | "merged" | string;
  mergedInto?: string;
  aliases: string[]; // merged cards pointing here
  primaryConcept: string;
  supportingConcepts: string[];
  tags: string[];
  related: string[];
  path: string;
  body: string;
  openQuestion: string;
  coreIdea: string;
  territory?: string;
  secondaryTerritories: string[];
  score?: Score;
  groups: { id: string; role: "lead" | "supporting" | "related" }[];
  shortlist?: string; // SQxx when this idea leads a question
  supportsShortlist: string[];
};

export type Score = {
  values: number[]; // 8 criteria
  total: number;
  tier: string; // "Tier A" | "Tier B" | "Tier C" | "Do not advance"
  reason: string;
  caution: string;
};

export const CRITERIA = [
  "Human tension",
  "Active reality",
  "Visual world",
  "Place and journey",
  "Sri Lankan breadth",
  "Ethical readiness",
  "Independence from doctrine",
  "Distinctiveness",
];

export type Territory = {
  id: string;
  name: string;
  file: string;
  definition: string;
  tension: string;
  body: string;
  primary: string[];
  secondary: string[];
  shortlist: string[];
};

export type Group = {
  id: string;
  theme: string;
  file: string;
  lead?: string;
  supporting: string[];
  related: string[];
  kind: string;
  body: string;
};

export type ShortlistItem = {
  id: string; // SQ05
  heading: string;
  file: string;
  lead: string;
  supporting: string[];
  related: string[];
  territory: string;
  question: string;
  body: string;
};

export type Doc = { path: string; title: string };

export type ExtraFolder = { name: string; path: string; title: string; readme?: string };

export type Data = {
  concepts: Map<string, Concept>;
  ideas: Map<string, Idea>;
  territories: Map<string, Territory>;
  groups: Map<string, Group>;
  shortlist: Map<string, ShortlistItem>;
  docs: { discovery: Doc[]; ideaBank: Doc[]; sources: Doc[]; instructions: Doc[]; batchReports: Doc[] };
  /** Folders inside content/ that this app does not model, such as later pipeline stages. */
  extras: ExtraFolder[];
  loadedAt: string;
};

/* ------------------------------------------------------------------ */
/* Small parsing helpers                                               */
/* ------------------------------------------------------------------ */

const IDEA_RE = /C\d{3}-I\d{2}/g;
export const idsIn = (s: string) => Array.from(new Set(s.match(IDEA_RE) ?? []));
/** Idea IDs in a cell, ignoring anything inside parentheses (merged-alias notes). */
const idsOutsideParens = (s: string) => idsIn(s.replace(/\([^)]*\)/g, ""));

function sections(body: string, level = 2): Map<string, string> {
  const marker = "#".repeat(level) + " ";
  const out = new Map<string, string>();
  let current: string | null = null;
  let buf: string[] = [];
  for (const line of body.split("\n")) {
    if (line.startsWith(marker)) {
      if (current !== null) out.set(current, buf.join("\n").trim());
      current = line.slice(marker.length).trim();
      buf = [];
    } else if (current !== null) buf.push(line);
  }
  if (current !== null) out.set(current, buf.join("\n").trim());
  return out;
}

function tableRows(md: string): string[][] {
  return md
    .split("\n")
    .filter((l) => l.startsWith("| ") && !/^\|\s*-/.test(l))
    .map((l) => l.replace(/^\|/, "").replace(/\|\s*$/, "").split(" | ").map((c) => c.trim()));
}

function asArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String).filter(Boolean);
  if (typeof v === "string" && v.trim()) return v.split(/[,;]\s*/).filter(Boolean);
  return [];
}

function firstParagraph(s: string | undefined): string {
  return (s ?? "").split(/\n\s*\n/)[0]?.replace(/\n/g, " ").trim() ?? "";
}

function titleOf(md: string, fallback: string) {
  return md.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? fallback;
}

/* ------------------------------------------------------------------ */
/* Loaders                                                             */
/* ------------------------------------------------------------------ */

async function loadConcepts(): Promise<Map<string, Concept>> {
  const root = path.join(CONTENT_DIR, DIRS.concepts);
  const concepts = new Map<string, Concept>();
  const seen = new Set<string>();

  for (const chapterDir of await listDir(root)) {
    const chapter = Number(chapterDir.match(/\d+/)?.[0] ?? 0);
    const chapterAbs = path.join(root, chapterDir);
    for (const conceptDir of await listDir(chapterAbs)) {
      const m = nfc(conceptDir).match(/^Concept\s+(\d+)\s*-\s*(.*)$/);
      if (!m) continue;
      const num = Number(m[1]);
      const id = `C${String(num).padStart(3, "0")}`;
      if (seen.has(id)) continue; // guard against Unicode-normalisation twins on network shares
      seen.add(id);
      const sourcesAbs = path.join(chapterAbs, conceptDir, "sources");
      const sources = (await listDir(sourcesAbs))
        .filter((f) => f.endsWith(".md"))
        .map((f) => ({ name: nfc(f), path: repoRel(path.join(sourcesAbs, f)) }));
      concepts.set(id, {
        id,
        num,
        chapter,
        titleSi: m[2].trim(),
        titleEn: "",
        folder: repoRel(path.join(chapterAbs, conceptDir)),
        status: "",
        coverage: "",
        sources,
        ideaIds: [],
        supportsIdeaIds: [],
      });
    }
  }

  // English gloss, status and source-note links from the register.
  const registerAbs = path.join(CONTENT_DIR, DIRS.ideaBank, "concept-register.md");
  const register = await read(registerAbs).catch(() => "");
  for (const row of tableRows(register)) {
    const id = row[0];
    if (!/^C\d{3}$/.test(id)) continue;
    const c = concepts.get(id);
    if (!c) continue;
    c.titleEn = row[1];
    c.coverage = row[4];
    c.status = row[7] ?? "";
    const note = row[5]?.match(/\((source-notes\/[^)]+)\)/)?.[1];
    if (note) c.sourceNotePath = contentRel(DIRS.ideaBank, decodeURIComponent(note));
  }
  return new Map([...concepts.entries()].sort((a, b) => a[1].num - b[1].num));
}

async function loadIdeas(): Promise<Map<string, Idea>> {
  const dir = path.join(CONTENT_DIR, DIRS.ideaBank, "ideas");
  const ideas = new Map<string, Idea>();
  for (const file of await listDir(dir)) {
    if (!file.endsWith(".md")) continue;
    const abs = path.join(dir, file);
    const { data, content } = matter(await read(abs));
    const id = String(data.id ?? file.slice(0, 8));
    const secs = sections(content);
    ideas.set(id, {
      id,
      title: String(data.title ?? ""),
      status: String(data.status ?? ""),
      mergedInto: data.merged_into ? String(data.merged_into) : undefined,
      aliases: [],
      primaryConcept: String(data.primary_concept ?? id.slice(0, 4)),
      supportingConcepts: asArray(data.supporting_concepts),
      tags: asArray(data.tags),
      related: asArray(data.related_ideas),
      path: repoRel(abs),
      body: content.trim(),
      openQuestion: firstParagraph(secs.get("Open human question")),
      coreIdea: firstParagraph(secs.get("Core idea")),
      secondaryTerritories: [],
      groups: [],
      supportsShortlist: [],
    });
  }
  for (const idea of ideas.values()) {
    if (idea.mergedInto) ideas.get(idea.mergedInto)?.aliases.push(idea.id);
  }
  return ideas;
}

async function loadTerritories(ideas: Map<string, Idea>): Promise<Map<string, Territory>> {
  const md = await read(path.join(CONTENT_DIR, DIRS.discovery, "philosophy-map.md")).catch(() => "");
  const territories = new Map<string, Territory>();
  for (const [heading, raw] of sections(md)) {
    const m = heading.match(/^(T\d{2})\s+—\s+(.+)$/);
    if (!m) continue;
    const body = raw.replace(/\n---\s*$/, "").trim();
    const field = (label: string) => body.match(new RegExp(`\\*\\*${label}\\.?\\*\\*:?\\s*(.+)`))?.[1]?.trim() ?? "";
    territories.set(m[1], {
      id: m[1],
      name: m[2],
      file: contentRel(DIRS.discovery, "philosophy-map.md"),
      definition: field("Definition"),
      tension: field("Central tension"),
      body,
      primary: idsIn(field("Primary cards:").replace(/^:/, "")),
      secondary: idsIn(field("Secondary cards:").replace(/^:/, "")),
      shortlist: [],
    });
  }
  // Appendix A is the authoritative mapping.
  const appendix = md.split("## Appendix A")[1]?.split("## Appendix B")[0] ?? "";
  for (const row of tableRows(appendix)) {
    const id = idsIn(row[0])[0];
    const idea = id && ideas.get(id);
    if (!idea) continue;
    idea.territory = row[2];
    idea.secondaryTerritories = (row[3] ?? "").split(/,\s*/).filter((t) => /^T\d{2}$/.test(t));
  }
  for (const t of territories.values()) {
    t.primary = [...ideas.values()].filter((i) => i.territory === t.id).map((i) => i.id);
    t.secondary = [...ideas.values()].filter((i) => i.secondaryTerritories.includes(t.id)).map((i) => i.id);
  }
  return territories;
}

async function loadGroups(ideas: Map<string, Idea>): Promise<Map<string, Group>> {
  const md = await read(path.join(CONTENT_DIR, DIRS.discovery, "overlap-map.md")).catch(() => "");
  const groups = new Map<string, Group>();
  const summary = md.split("## Group summary")[1]?.split("## Groups in detail")[0] ?? "";
  for (const row of tableRows(summary)) {
    if (!/^G\d{2}$/.test(row[0])) continue;
    groups.set(row[0], {
      id: row[0],
      theme: row[1],
      file: contentRel(DIRS.discovery, "overlap-map.md"),
      lead: idsOutsideParens(row[2])[0],
      supporting: idsOutsideParens(row[3]),
      related: idsOutsideParens(row[4]),
      kind: row[5] ?? "",
      body: "",
    });
  }
  const detail = md.split("## Groups in detail")[1]?.split("\n## ")[0] ?? "";
  for (const [heading, body] of sections(detail, 3)) {
    const id = heading.match(/^G\d{2}/)?.[0];
    const g = id && groups.get(id);
    if (g) g.body = body.trim();
  }
  for (const g of groups.values()) {
    if (g.lead) ideas.get(g.lead)?.groups.push({ id: g.id, role: "lead" });
    g.supporting.forEach((i) => ideas.get(i)?.groups.push({ id: g.id, role: "supporting" }));
    g.related.forEach((i) => ideas.get(i)?.groups.push({ id: g.id, role: "related" }));
  }
  return groups;
}

async function loadScores(ideas: Map<string, Idea>) {
  const md = await read(path.join(CONTENT_DIR, DIRS.discovery, "documentary-potential-matrix.md")).catch(() => "");
  for (const row of tableRows(md)) {
    const idea = ideas.get(row[0]);
    if (!idea || row.length < 15) continue;
    const values = row.slice(3, 11).map(Number);
    if (values.some(Number.isNaN)) continue;
    idea.score = {
      values,
      total: Number(row[11]),
      tier: row[12].replace(/\*/g, ""),
      reason: row[13].replace(/\*\*Shortlisted\.\*\*\s*/, "").trim(),
      caution: row[14],
    };
  }
}

async function loadShortlist(ideas: Map<string, Idea>, territories: Map<string, Territory>) {
  const md = await read(path.join(CONTENT_DIR, DIRS.discovery, "research-shortlist.md")).catch(() => "");
  const items = new Map<string, ShortlistItem>();
  for (const [heading, raw] of sections(md)) {
    const m = heading.match(/^(SQ\d{2})\s+—\s+(.+)$/);
    if (!m) continue;
    const body = raw.replace(/\n---\s*$/, "").trim();
    const line = (label: string) => body.match(new RegExp(`\\*\\*${label}:\\*\\*\\s*(.+)`))?.[1] ?? "";
    const qSection = sections(body, 3).get("Open human question") ?? "";
    const refined = qSection.match(/\*\*Research form[^*]*\*\*\s*(.+)/)?.[1];
    const lead = idsIn(line("Lead idea"))[0];
    const item: ShortlistItem = {
      id: m[1],
      heading: m[2],
      file: contentRel(DIRS.discovery, "research-shortlist.md"),
      lead,
      supporting: idsOutsideParens(line("Supporting")),
      related: idsOutsideParens(line("Related")),
      territory: line("Primary territory").match(/T\d{2}/)?.[0] ?? "",
      question: (refined ?? firstParagraph(qSection)).trim(),
      body,
    };
    items.set(item.id, item);
    const leadIdea = ideas.get(lead);
    if (leadIdea) leadIdea.shortlist = item.id;
    item.supporting.forEach((i) => ideas.get(i)?.supportsShortlist.push(item.id));
    territories.get(item.territory)?.shortlist.push(item.id);
  }
  return items;
}

async function mdDocs(dirRel: string, recursive = false): Promise<Doc[]> {
  const abs = path.join(REPO_DIR, dirRel);
  const out: Doc[] = [];
  for (const f of await listDir(abs)) {
    const full = path.join(abs, f);
    const stat = await fs.stat(full);
    if (stat.isDirectory() && recursive) out.push(...(await mdDocs(`${dirRel}/${f}`, true)));
    else if (f.endsWith(".md")) {
      const text = await read(full);
      out.push({ path: repoRel(full), title: titleOf(text, f.replace(/\.md$/, "")) });
    }
  }
  return out;
}

async function loadAll(): Promise<Data> {
  const [concepts, ideas] = await Promise.all([loadConcepts(), loadIdeas()]);
  const [territories, groups] = await Promise.all([loadTerritories(ideas), loadGroups(ideas)]);
  await loadScores(ideas);
  const shortlist = await loadShortlist(ideas, territories);

  for (const idea of ideas.values()) {
    concepts.get(idea.primaryConcept)?.ideaIds.push(idea.id);
    idea.supportingConcepts.forEach((c) => concepts.get(c)?.supportsIdeaIds.push(idea.id));
  }

  const [discovery, ideaBank, sources, instructions, batchReports] = await Promise.all([
    mdDocs(contentRel(DIRS.discovery)),
    mdDocs(contentRel(DIRS.ideaBank)),
    mdDocs(contentRel(DIRS.sources)),
    mdDocs("instructions"),
    mdDocs(contentRel(DIRS.ideaBank, "batch-reports")),
  ]);

  const known = new Set<string>(Object.values(DIRS));
  const extras: ExtraFolder[] = [];
  for (const name of await listDir(CONTENT_DIR)) {
    if (known.has(name) || name.endsWith(".md")) continue;
    const abs = path.join(CONTENT_DIR, name);
    if (!(await fs.stat(abs)).isDirectory()) continue;
    const readmeAbs = path.join(abs, "README.md");
    const readme = (await fs.stat(readmeAbs).then(() => true).catch(() => false)) ? repoRel(readmeAbs) : undefined;
    extras.push({
      name,
      path: repoRel(abs),
      title: readme ? titleOf(await read(readmeAbs), name) : name,
      readme,
    });
  }

  return {
    concepts,
    ideas,
    territories,
    groups,
    shortlist,
    docs: { discovery, ideaBank, sources, instructions, batchReports },
    extras,
    loadedAt: new Date().toISOString(),
  };
}

/* ------------------------------------------------------------------ */
/* Cache                                                               */
/* ------------------------------------------------------------------ */

const g = globalThis as unknown as { __cwhData?: { version: number; data: Promise<Data> } };

/** Changes whenever this module is re-evaluated, so a hot reload in dev never serves stale parsing. */
const MODULE_VERSION = Date.now();

export function getData(): Promise<Data> {
  if (!g.__cwhData || g.__cwhData.version !== MODULE_VERSION) {
    const data = loadAll().catch((e) => { g.__cwhData = undefined; throw e; });
    g.__cwhData = { version: MODULE_VERSION, data };
  }
  return g.__cwhData.data;
}

export function clearDataCache() {
  g.__cwhData = undefined;
  (globalThis as unknown as { __cwhSeries?: unknown }).__cwhSeries = undefined;
}

/* ------------------------------------------------------------------ */
/* Generic document access (for the docs viewer)                       */
/* ------------------------------------------------------------------ */

export type DirEntry = { name: string; isDir: boolean };

/**
 * True when a path is spoiler material that must not be served while EXPLORER_SPOILERS=hide.
 * The whole series-architecture folder is withheld: its README, canon, progress notes and generated files all
 * describe the hidden chronology or the Episode 100 structure. Checked on the server for every document request.
 */
export function isSpoilerPath(abs: string): boolean {
  if ((process.env.EXPLORER_SPOILERS ?? "").toLowerCase() !== "hide") return false;
  const seriesDir = path.join(CONTENT_DIR, DIRS.series);
  return abs === seriesDir || abs.startsWith(seriesDir + path.sep);
}

/** Resolve a repo-relative path safely. Only Markdown inside the content folder or instructions/ is allowed. */
export function safeRepoPath(rel: string): string | null {
  const abs = path.resolve(REPO_DIR, rel);
  const allowed = [CONTENT_DIR, path.join(REPO_DIR, "instructions")];
  if (!allowed.some((a) => abs === a || abs.startsWith(a + path.sep))) return null;
  if (isSpoilerPath(abs)) return null;
  return abs;
}

/**
 * Walk a path segment by segment, tolerating Unicode normalisation differences.
 * Sinhala folder names on the SMB share can be stored decomposed while a link uses
 * the composed form (or the other way round), so an exact match may fail.
 */
async function resolveOnDisk(abs: string): Promise<string | null> {
  if (await fs.stat(abs).then(() => true).catch(() => false)) return abs;
  const rel = path.relative(REPO_DIR, abs);
  let current = REPO_DIR;
  for (const segment of rel.split(path.sep)) {
    const direct = path.join(current, segment);
    if (await fs.stat(direct).then(() => true).catch(() => false)) {
      current = direct;
      continue;
    }
    const want = nfc(segment);
    const match = (await listDir(current)).find((name) => nfc(name) === want);
    if (!match) return null;
    current = path.join(current, match);
  }
  return current;
}

export async function readDoc(rel: string): Promise<{ path: string; text: string; isDir: boolean; entries: DirEntry[] } | null> {
  const requested = safeRepoPath(rel);
  if (!requested) return null;
  const abs = await resolveOnDisk(requested);
  if (!abs || !safeRepoPath(path.relative(REPO_DIR, abs))) return null;
  const stat = await fs.stat(abs);
  if (stat.isDirectory()) {
    const names = (await listDir(abs)).filter((name) => !isSpoilerPath(path.join(abs, name)));
    const entries = await Promise.all(
      names.map(async (name) => ({ name, isDir: (await fs.stat(path.join(abs, name)).catch(() => null))?.isDirectory() ?? false })),
    );
    return { path: repoRel(abs), text: "", isDir: true, entries };
  }
  if (!abs.endsWith(".md")) return null;
  return { path: repoRel(abs), text: await read(abs), isDir: false, entries: [] };
}

export async function readRaw(rel: string) {
  return readDoc(rel);
}

/** Known entity IDs, used to auto-link references inside Markdown. */
export async function knownIds(): Promise<string[]> {
  const d = await getData();
  const { listLeads } = await import("./leads");
  const { getSeries } = await import("./series");
  const leads = await listLeads();
  const series = await getSeries().catch(() => null);
  return [
    ...d.ideas.keys(),
    ...d.concepts.keys(),
    ...d.territories.keys(),
    ...d.groups.keys(),
    ...d.shortlist.keys(),
    ...leads.map((l) => l.id),
    ...(series ? [...series.byId.keys(), ...series.segments.map((s) => s.id), ...series.connections.map((c) => c.id)] : []),
  ];
}
