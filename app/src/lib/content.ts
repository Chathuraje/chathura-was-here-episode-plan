import fs from "node:fs/promises";
import path from "node:path";

export const CONTENT_DIR = path.resolve(process.env.CONTENT_DIR ?? path.join(process.cwd(), "..", "content"));
export const REPO_DIR = path.dirname(CONTENT_DIR);
export const CONTENT_NAME = path.basename(CONTENT_DIR);

export const DIRS = {
  sources: "01-sources",
  concepts: "02-concepts",
} as const;

export type SourceFile = { name: string; path: string };
export type Concept = {
  id: string;
  num: number;
  chapter: number;
  title: string;
  folder: string;
  sources: SourceFile[];
};
export type DocKind = "primary-source" | "source-map" | "guide";
export type Doc = { path: string; title: string; kind: DocKind };
export type Data = {
  concepts: Map<string, Concept>;
  docs: { sources: Doc[] };
  loadedAt: string;
};
export type DirEntry = { name: string; isDir: boolean };

const nfc = (value: string) => value.normalize("NFC");

export function repoRel(abs: string): string {
  return path.relative(REPO_DIR, abs).split(path.sep).join("/");
}

export function contentRel(...segments: string[]): string {
  return repoRel(path.join(CONTENT_DIR, ...segments));
}

async function read(abs: string): Promise<string> {
  return (await fs.readFile(abs, "utf8")).replace(/\r\n/g, "\n");
}

async function listDir(abs: string): Promise<string[]> {
  try {
    return (await fs.readdir(abs))
      .filter((name) => !name.startsWith("."))
      .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  } catch {
    return [];
  }
}

function titleOf(markdown: string, fallback: string): string {
  return markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? fallback;
}

async function loadConcepts(): Promise<Map<string, Concept>> {
  const root = path.join(CONTENT_DIR, DIRS.concepts);
  const concepts = new Map<string, Concept>();

  for (const chapterDir of await listDir(root)) {
    const chapter = Number(chapterDir.match(/\d+/)?.[0] ?? 0);
    const chapterAbs = path.join(root, chapterDir);
    for (const conceptDir of await listDir(chapterAbs)) {
      const match = nfc(conceptDir).match(/^Concept\s+(\d+)\s*-\s*(.*)$/);
      if (!match) continue;
      const num = Number(match[1]);
      const id = `C${String(num).padStart(3, "0")}`;
      if (concepts.has(id)) continue;
      const folderAbs = path.join(chapterAbs, conceptDir);
      const sourcesAbs = path.join(folderAbs, "sources");
      const sources = (await listDir(sourcesAbs))
        .filter((name) => name.endsWith(".md"))
        .map((name) => ({ name: nfc(name), path: repoRel(path.join(sourcesAbs, name)) }));

      concepts.set(id, {
        id,
        num,
        chapter,
        title: match[2].trim(),
        folder: repoRel(folderAbs),
        sources,
      });
    }
  }

  return new Map([...concepts.entries()].sort((a, b) => a[1].num - b[1].num));
}

async function markdownDocs(dirRel: string): Promise<Doc[]> {
  const abs = path.join(REPO_DIR, dirRel);
  const docs: Doc[] = [];
  for (const name of await listDir(abs)) {
    if (!name.endsWith(".md")) continue;
    const full = path.join(abs, name);
    const kind: DocKind = name.endsWith("Source Map.md")
      ? "source-map"
      : name.endsWith("Guide.md") || name.startsWith("Splitting a Book")
        ? "guide"
        : "primary-source";
    docs.push({ path: repoRel(full), title: titleOf(await read(full), name.replace(/\.md$/, "")), kind });
  }
  return docs;
}

async function loadAll(): Promise<Data> {
  const [concepts, sources] = await Promise.all([
    loadConcepts(),
    markdownDocs(contentRel(DIRS.sources)),
  ]);
  return { concepts, docs: { sources }, loadedAt: new Date().toISOString() };
}

const cache = globalThis as unknown as { __sourceConceptData?: { version: number; data: Promise<Data> } };
const MODULE_VERSION = Date.now();

export function getData(): Promise<Data> {
  if (!cache.__sourceConceptData || cache.__sourceConceptData.version !== MODULE_VERSION) {
    const data = loadAll().catch((error) => {
      cache.__sourceConceptData = undefined;
      throw error;
    });
    cache.__sourceConceptData = { version: MODULE_VERSION, data };
  }
  return cache.__sourceConceptData.data;
}

export function clearDataCache() {
  cache.__sourceConceptData = undefined;
}

export function safeRepoPath(rel: string): string | null {
  const abs = path.resolve(REPO_DIR, rel);
  if (abs !== CONTENT_DIR && !abs.startsWith(CONTENT_DIR + path.sep)) return null;
  return abs;
}

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
    const match = (await listDir(current)).find((name) => nfc(name) === nfc(segment));
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
    const entries = await Promise.all((await listDir(abs)).map(async (name) => ({
      name,
      isDir: (await fs.stat(path.join(abs, name)).catch(() => null))?.isDirectory() ?? false,
    })));
    return { path: repoRel(abs), text: "", isDir: true, entries };
  }
  if (!abs.endsWith(".md")) return null;
  return { path: repoRel(abs), text: await read(abs), isDir: false, entries: [] };
}

export async function knownIds(): Promise<string[]> {
  return [...(await getData()).concepts.keys()];
}
