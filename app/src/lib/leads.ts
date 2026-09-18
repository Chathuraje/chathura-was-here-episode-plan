import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { CONTENT_DIR, DIRS, repoRel } from "./content";
import { defaultReview, parseLead, serializeLead, safeFileName, splitSections, type Lead } from "./lead-format";

export {
  LEAD_ID_RE, READINESS, RESEARCH_STATUSES, REVIEW_FIELDS, REVIEW_KEYS, leadFields, serializeLead, safeFileName,
} from "./lead-format";
export type { Lead, LeadSection, Review, ReviewKey, LeadFields, CardSource } from "./lead-format";

export const LEADS_DIR = path.join(CONTENT_DIR, DIRS.leads);
export const TEMPLATE_PATH = path.join(CONTENT_DIR, DIRS.discovery, "story-lead-template.md");

export const writesEnabled = () => process.env.EXPLORER_READ_ONLY !== "1";

/** Local calendar date (not UTC), so a lead opened late at night carries the right day. */
export const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/** The blank lead, taken from the template file so the editor always matches it. */
export async function templateLead(): Promise<Lead> {
  const raw = (await fs.readFile(TEMPLATE_PATH, "utf8")).replace(/\r\n/g, "\n");
  const fence = raw.match(/```markdown\n([\s\S]*)\n```\s*$/)?.[1] ?? "";
  const { content } = matter(fence);
  return {
    id: "",
    description: "",
    dateOpened: today(),
    researcher: "",
    shortlistQuestion: "",
    leadIdeaId: "",
    supportingIdeaIds: [],
    territory: "",
    researchStatus: "unverified",
    screenplayReadiness: "not ready",
    lastUpdated: today(),
    review: defaultReview(),
    extraFrontMatter: [],
    sections: splitSections(content),
  };
}

export async function listLeads(): Promise<Lead[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(LEADS_DIR);
  } catch {
    return [];
  }
  const leads: Lead[] = [];
  for (const f of files) {
    if (!/^SL-SQ\d{2}-\d{3}.*\.md$/.test(f)) continue;
    const abs = path.join(LEADS_DIR, f);
    const lead = parseLead(await fs.readFile(abs, "utf8"), repoRel(abs));
    if (lead) leads.push(lead);
  }
  return leads.sort((a, b) => a.id.localeCompare(b.id));
}

export async function getLead(id: string) {
  return (await listLeads()).find((l) => l.id === id) ?? null;
}

export async function nextLeadId(sq: string) {
  const used = (await listLeads()).filter((l) => l.shortlistQuestion === sq).map((l) => Number(l.id.slice(-3)));
  return `SL-${sq}-${String((used.length ? Math.max(...used) : 0) + 1).padStart(3, "0")}`;
}

export async function writeLead(lead: Lead, previous: Lead | null): Promise<string> {
  await fs.mkdir(LEADS_DIR, { recursive: true });
  const fileName = safeFileName(lead.id, lead.description);
  const abs = path.join(LEADS_DIR, fileName);
  if (path.dirname(abs) !== LEADS_DIR) throw new Error("Invalid lead file path.");
  const text = serializeLead(lead);
  // Keep the line endings the card already uses (the repository stores some files with CRLF).
  let crlf = false;
  if (previous?.file) {
    const prevAbs = path.join(CONTENT_DIR, "..", previous.file);
    crlf = (await fs.readFile(prevAbs, "utf8").catch(() => "")).includes("\r\n");
  }
  await fs.writeFile(abs, crlf ? text.replace(/\n/g, "\r\n") : text, "utf8");
  if (previous?.file) {
    const prevAbs = path.join(CONTENT_DIR, "..", previous.file);
    if (path.resolve(prevAbs) !== path.resolve(abs)) await fs.rm(prevAbs, { force: true });
  }
  return repoRel(abs);
}
