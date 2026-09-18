import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { CONTENT_DIR, DIRS, repoRel } from "./content";

export const LEADS_DIR = path.join(CONTENT_DIR, DIRS.leads);
export const TEMPLATE_PATH = path.join(CONTENT_DIR, DIRS.discovery, "story-lead-template.md");

export const RESEARCH_STATUSES = ["unverified", "in research", "verified", "on hold", "rejected"] as const;
export const READINESS = ["not ready", "ready for selection review"] as const;
export const LEAD_ID_RE = /^SL-SQ\d{2}-\d{3}$/;

export type LeadSection = { heading: string; content: string };

export type Lead = {
  id: string;
  description: string;
  file?: string; // repo-relative
  dateOpened: string;
  researcher: string;
  shortlistQuestion: string;
  leadIdeaId: string;
  supportingIdeaIds: string[];
  territory: string;
  researchStatus: string;
  screenplayReadiness: string;
  lastUpdated: string;
  sections: LeadSection[];
};

export const writesEnabled = () => process.env.EXPLORER_READ_ONLY !== "1";

/** Local calendar date (not UTC), so a lead opened late at night carries the right day. */
export const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

function splitSections(body: string): LeadSection[] {
  const out: LeadSection[] = [];
  let cur: LeadSection | null = null;
  for (const line of body.split("\n")) {
    const m = line.match(/^##\s+(\d+\.\s+.+)$/);
    if (m) {
      if (cur) out.push({ ...cur, content: cur.content.trim() });
      cur = { heading: m[1].trim(), content: "" };
    } else if (cur) cur.content += line + "\n";
  }
  if (cur) out.push({ ...cur, content: cur.content.trim() });
  return out;
}

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
    sections: splitSections(content),
  };
}

function parseLead(text: string, file: string): Lead | null {
  const { data, content } = matter(text.replace(/\r\n/g, "\n"));
  const id = String(data.lead_id ?? "");
  if (!LEAD_ID_RE.test(id)) return null;
  const heading = content.match(/^#\s+.+?—\s*(.+)$/m)?.[1]?.trim() ?? "";
  const s = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : v == null ? "" : String(v));
  return {
    id,
    description: heading,
    file,
    dateOpened: s(data.date_opened),
    researcher: s(data.researcher),
    shortlistQuestion: s(data.shortlist_question),
    leadIdeaId: s(data.lead_idea_id),
    supportingIdeaIds: Array.isArray(data.supporting_idea_ids) ? data.supporting_idea_ids.map(String) : [],
    territory: s(data.human_territory),
    researchStatus: s(data.research_status) || "unverified",
    screenplayReadiness: s(data.screenplay_readiness) || "not ready",
    lastUpdated: s(data.last_updated),
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

const yamlStr = (v: string) => (v === "" ? "" : /^[\w .\-/@]+$/.test(v) ? v : JSON.stringify(v));

export function serializeLead(l: Lead): string {
  const fm = [
    "---",
    `lead_id: ${l.id}`,
    `date_opened: ${l.dateOpened}`,
    `researcher: ${yamlStr(l.researcher)}`,
    `shortlist_question: ${l.shortlistQuestion}`,
    `lead_idea_id: ${l.leadIdeaId}`,
    `supporting_idea_ids: [${l.supportingIdeaIds.join(", ")}]`,
    `human_territory: ${l.territory}`,
    `research_status: ${l.researchStatus}   # unverified | in research | verified | on hold | rejected`,
    `screenplay_readiness: ${l.screenplayReadiness}   # not ready | ready for selection review`,
    `last_updated: ${l.lastUpdated}`,
    "---",
    "",
  ].join("\n");
  const banner =
    l.researchStatus === "verified"
      ? "> **Status: VERIFIED.** Verified facts are listed with sources in section 11. Participant accounts and unverified claims remain separate."
      : `> **Status: ${l.researchStatus.toUpperCase()}.** This lead has not been verified. Do not treat any statement below as fact unless it appears under *Verified facts* with a source.`;
  const body = l.sections.map((s) => `## ${s.heading}\n\n${s.content.trim()}\n`).join("\n");
  return `${fm}# ${l.id} — ${l.description}\n\n${banner}\n\n${body}`;
}

export function safeFileName(id: string, description: string) {
  const desc = description.replace(/[\\/:*?"<>|\r\n]+/g, " ").replace(/\s+/g, " ").trim().slice(0, 80);
  return `${id} - ${desc || "untitled"}.md`;
}

export async function writeLead(lead: Lead, previous: Lead | null): Promise<string> {
  await fs.mkdir(LEADS_DIR, { recursive: true });
  const fileName = safeFileName(lead.id, lead.description);
  const abs = path.join(LEADS_DIR, fileName);
  if (path.dirname(abs) !== LEADS_DIR) throw new Error("Invalid lead file path.");
  await fs.writeFile(abs, serializeLead(lead), "utf8");
  if (previous?.file) {
    const prevAbs = path.join(CONTENT_DIR, "..", previous.file);
    if (path.resolve(prevAbs) !== path.resolve(abs)) await fs.rm(prevAbs, { force: true });
  }
  return repoRel(abs);
}
