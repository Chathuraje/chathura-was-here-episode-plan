/**
 * Lead cards: parsing, the fields other layers read from them, and saving.
 *
 * Pure module with no relative imports, so scripts/check-data.mjs can load it directly with Node.
 * The lead card (content/05-story-leads/SL-*.md) is the authoritative research record. The Python tools read the
 * same fields with the same rules (content/06-series-architecture/tools/series.py); check-data.mjs compares them.
 */
import matter from "gray-matter";

export const RESEARCH_STATUSES = ["unverified", "in research", "verified", "on hold", "rejected"] as const;
export const READINESS = ["not ready", "ready for selection review"] as const;
export const LEAD_ID_RE = /^SL-SQ\d{2}-\d{3}$/;

/** Review fields. Absent from a card means the conservative default; nothing is inferred from prose. */
export const REVIEW_FIELDS = {
  subject_identified: { label: "Subject identified", values: ["no", "yes"], default: "no" },
  consent_status: { label: "Consent", values: ["none", "partial", "documented"], default: "none" },
  filming_access: { label: "Filming access", values: ["none", "requested", "confirmed"], default: "none" },
  claim_review: { label: "Core claim review", values: ["not reviewed", "partly supported", "supported", "contradicted"], default: "not reviewed" },
} as const;
export type ReviewKey = keyof typeof REVIEW_FIELDS;
export const REVIEW_KEYS = Object.keys(REVIEW_FIELDS) as ReviewKey[];
export type Review = Record<ReviewKey, string>;

/** Front-matter keys this module writes itself. Any other key found in a card is kept verbatim on save. */
const KNOWN_KEYS = new Set([
  "lead_id", "date_opened", "researcher", "shortlist_question", "lead_idea_id", "supporting_idea_ids",
  "human_territory", "research_status", "screenplay_readiness", "last_updated", ...REVIEW_KEYS,
]);

export type LeadSection = { heading: string; content: string };

export type Lead = {
  id: string;
  description: string;
  file?: string;
  dateOpened: string;
  researcher: string;
  shortlistQuestion: string;
  leadIdeaId: string;
  supportingIdeaIds: string[];
  territory: string;
  researchStatus: string;
  screenplayReadiness: string;
  lastUpdated: string;
  review: Review;
  /** Front-matter lines for keys this module does not manage, preserved exactly. */
  extraFrontMatter: string[];
  sections: LeadSection[];
};

export function defaultReview(): Review {
  return Object.fromEntries(REVIEW_KEYS.map((k) => [k, REVIEW_FIELDS[k].default])) as Review;
}

export function splitSections(body: string): LeadSection[] {
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

/** Lines of the raw front matter whose key is not managed here (with any indented continuation lines). */
function extraLines(raw: string): string[] {
  const fm = raw.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
  const out: string[] = [];
  let keep = false;
  for (const line of fm.split("\n")) {
    const key = line.match(/^([A-Za-z_][\w-]*):/)?.[1];
    if (key) keep = !KNOWN_KEYS.has(key);
    else if (!/^\s/.test(line)) keep = false;
    if (keep) out.push(line);
  }
  return out;
}

const str = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : v == null ? "" : String(v));

export function parseLead(text: string, file?: string): Lead | null {
  const raw = text.replace(/\r\n/g, "\n");
  const { data, content } = matter(raw);
  const id = str(data.lead_id);
  if (!LEAD_ID_RE.test(id)) return null;
  const review = defaultReview();
  for (const k of REVIEW_KEYS) {
    // gray-matter reads bare yes/no as booleans; map them back to the words used in the card.
    const v = data[k];
    if (v === true) review[k] = "yes";
    else if (v === false) review[k] = "no";
    else if (v != null && String(v).trim()) review[k] = String(v).trim();
  }
  return {
    id,
    description: content.match(/^#\s+.+?—\s*(.+)$/m)?.[1]?.trim() ?? "",
    file,
    dateOpened: str(data.date_opened),
    researcher: str(data.researcher),
    shortlistQuestion: str(data.shortlist_question),
    leadIdeaId: str(data.lead_idea_id),
    supportingIdeaIds: Array.isArray(data.supporting_idea_ids) ? data.supporting_idea_ids.map(String) : [],
    territory: str(data.human_territory),
    researchStatus: str(data.research_status) || "unverified",
    screenplayReadiness: str(data.screenplay_readiness) || "not ready",
    lastUpdated: str(data.last_updated),
    review,
    extraFrontMatter: extraLines(raw),
    sections: splitSections(content),
  };
}

const yamlStr = (v: string) => (v === "" ? "" : /^[\w .\-/@]+$/.test(v) ? v : JSON.stringify(v));

export function serializeLead(l: Lead): string {
  const review = REVIEW_KEYS.map((k) => `${k}: ${yamlStr(l.review[k])}   # ${REVIEW_FIELDS[k].values.join(" | ")}`);
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
    ...review,
    ...l.extraFrontMatter,
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

/* ------------------------------------------------------------------ */
/* Saving                                                              */
/* ------------------------------------------------------------------ */

export type ShortlistDefaults = { id: string; lead: string; supporting: string[]; territory: string; territoryLabel: string; question: string };

export type LeadInput = {
  originalId: string;
  id: string;
  description: string;
  dateOpened: string;
  researcher: string;
  shortlistQuestion: string;
  leadIdeaId: string;
  supportingIdeaIds: string[];
  territory: string;
  researchStatus: string;
  screenplayReadiness: string;
  review: Partial<Review>;
  sections: LeadSection[];
};

export type SaveContext = {
  today: string;
  shortlist: ShortlistDefaults | undefined;
  ideaExists: (id: string) => boolean;
  territoryLabel: (id: string) => string | undefined;
};

/** Replace the value after a bold label, keeping any trailing spaces (a Markdown line break) intact. */
function setLine(content: string, label: string, value: string) {
  const re = new RegExp(`(\\*\\*${label.replace(/[()]/g, "\\$&")}:\\*\\*)[^\\n]*?([ \\t]*)$`, "m");
  return re.test(content) ? content.replace(re, (_m, head: string, trail: string) => `${head} ${value}${trail}`) : content;
}

/**
 * Turn an edit into the lead to write.
 *
 * Existing leads keep their own researched mapping: the primary idea, supporting ideas and territory come from the
 * form, which is pre-filled from the card. Shortlist defaults are used only when a NEW lead is created and a field
 * was left blank. Review fields are never upgraded implicitly.
 */
export function applyLeadEdit(previous: Lead | null, input: LeadInput, ctx: SaveContext): { lead?: Lead; error?: string } {
  const { shortlist } = ctx;
  if (!LEAD_ID_RE.test(input.id)) return { error: "Lead ID must look like SL-SQ05-001." };
  if (!shortlist) return { error: "Choose a shortlist question." };
  if (!input.id.startsWith(`SL-${shortlist.id}-`)) return { error: `Lead ID must start with SL-${shortlist.id}- to match the shortlist question.` };
  if (!input.description.trim()) return { error: "Add a short plain description (no personal names without consent)." };
  if (!(RESEARCH_STATUSES as readonly string[]).includes(input.researchStatus)) return { error: "Unknown research status." };
  if (!(READINESS as readonly string[]).includes(input.screenplayReadiness)) return { error: "Unknown screenplay readiness value." };

  const isNew = !previous;
  const leadIdeaId = input.leadIdeaId.trim() || (isNew ? shortlist.lead : previous!.leadIdeaId);
  const supportingIdeaIds = input.supportingIdeaIds.length || !isNew ? input.supportingIdeaIds : shortlist.supporting;
  const territory = input.territory.trim() || (isNew ? shortlist.territory : previous!.territory);
  if (!leadIdeaId) return { error: "Choose a lead idea." };
  const unknown = [leadIdeaId, ...supportingIdeaIds].filter((i) => !ctx.ideaExists(i));
  if (unknown.length) return { error: `Unknown idea IDs: ${unknown.join(", ")}` };
  if (!ctx.territoryLabel(territory)) return { error: `Unknown territory: ${territory || "(blank)"}` };

  const review = { ...(previous?.review ?? defaultReview()) };
  for (const k of REVIEW_KEYS) {
    const v = input.review[k];
    if (v === undefined) continue;
    if (!(REVIEW_FIELDS[k].values as readonly string[]).includes(v)) return { error: `Unknown value for ${REVIEW_FIELDS[k].label}: ${v}` };
    review[k] = v;
  }
  if (input.researchStatus === "verified") {
    const missing = [
      review.claim_review !== "supported" && "core claim supported",
      review.subject_identified !== "yes" && "subject identified",
      review.consent_status !== "documented" && "consent documented",
      review.filming_access !== "confirmed" && "filming access confirmed",
    ].filter(Boolean);
    if (missing.length) return { error: `A lead can be “verified” only when these are recorded: ${missing.join(", ")}.` };
  }
  if (input.screenplayReadiness !== "not ready" && input.researchStatus !== "verified") {
    return { error: "Screenplay readiness can only move past “not ready” once the research status is “verified”." };
  }

  const sections = input.sections.map((s) => ({ ...s }));
  const territoryText = ctx.territoryLabel(territory)!;
  for (const s of sections) {
    if (/^1\.\s/.test(s.heading)) {
      // Rewrite a line only when its value changed (or for a new lead), so an unchanged save leaves the text alone.
      if (isNew || leadIdeaId !== previous!.leadIdeaId) s.content = setLine(s.content, "Lead idea ID", "`" + leadIdeaId + "`");
      if (isNew || supportingIdeaIds.join() !== previous!.supportingIdeaIds.join())
        s.content = setLine(s.content, "Supporting idea IDs", supportingIdeaIds.map((i) => "`" + i + "`").join(", ") || "none");
      if (isNew || territory !== previous!.territory) s.content = setLine(s.content, "Human territory", territoryText);
      s.content = s.content.replace(/(\*\*Open question \(as carried from the shortlist\):\*\*\n)>[ \t]*(\n|$)/, `$1> ${shortlist.question}$2`);
    }
    if (/^20\.\s/.test(s.heading)) {
      s.content = setLine(s.content, "Current status", input.researchStatus);
      if (isNew) s.content = s.content.replace("- YYYY-MM-DD — opened as unverified.", `- ${ctx.today} — opened as ${input.researchStatus}.`);
      if (previous && previous.researchStatus !== input.researchStatus) {
        s.content = s.content.replace(/(\*\*Status history:\*\*\n(?:- .*\n?)*)/, (m) => `${m.replace(/\n?$/, "\n")}- ${ctx.today} — status changed from ${previous.researchStatus} to ${input.researchStatus}.\n`);
      }
    }
    if (/^22\.\s/.test(s.heading)) s.content = setLine(s.content, "Readiness", input.screenplayReadiness);
  }

  return {
    lead: {
      id: input.id,
      description: input.description.trim(),
      dateOpened: input.dateOpened || ctx.today,
      researcher: input.researcher,
      shortlistQuestion: shortlist.id,
      leadIdeaId,
      supportingIdeaIds,
      territory,
      researchStatus: input.researchStatus,
      screenplayReadiness: input.screenplayReadiness,
      lastUpdated: ctx.today,
      review,
      extraFrontMatter: previous?.extraFrontMatter ?? [],
      sections,
    },
  };
}

/* ------------------------------------------------------------------ */
/* Fields other layers read from a card (mirrors tools/series.py)      */
/* ------------------------------------------------------------------ */

export type CardSource = { ref: string; type: string; url: string; accessed: string; notes: string; review: "opened" | "search-only" };
export type CardClaim = { ref: string; claim: string; source: string; checked: string; how: string };

export type LeadFields = {
  subject: string;
  place: string;
  district: string;
  province: string;
  situation: string;
  change: string;
  activity: string;
  sources: CardSource[];
  claims: CardClaim[];
  unresolved: string;
  contactMade: string;
  access: string;
  accessLevel: string;
  ethics: string;
  nextAction: string;
  nextOwner: string;
  nextBy: string;
  holdReason: string;
  cardStoryId: string;
};

const paras = (s: string) => s.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

function tableRows(s: string): string[][] {
  const rows = s
    .split("\n")
    .filter((l) => l.startsWith("|") && !/^\|\s*-/.test(l))
    .map((l) => l.trim().replace(/^\|/, "").replace(/\|$/, "").split(" | ").map((c) => c.trim()));
  return rows.slice(1);
}

const lineValue = (s: string, label: string) => s.match(new RegExp(`\\*\\*${label.replace(/[()]/g, "\\$&")}:\\*\\*\\s*(.*)`))?.[1]?.trim() ?? "";

export function sourceReview(notes: string): "opened" | "search-only" {
  const n = notes.toLowerCase();
  if (n.includes("not opened") || n.includes("search result only")) return "search-only";
  return /opened and (read|checked)/.test(n) ? "opened" : "search-only";
}

export function leadFields(lead: Lead): LeadFields {
  const sec = (n: number) => lead.sections.find((s) => s.heading.startsWith(`${n}. `))?.content ?? "";
  const s2 = paras(sec(2));
  const pl = lineValue(sec(3), "Place");
  const pm = pl.match(/^(.*)\s\(([^;()]*);\s*([^()]*?)\s+province\)$/);
  let s5 = paras(sec(5));
  if (s5[0]?.startsWith("Every point below")) s5 = s5.slice(1);
  let s9 = paras(sec(9));
  if (s9[0]?.startsWith("**Nothing below")) s9 = s9.slice(1);
  const sources: CardSource[] = tableRows(sec(18))
    .filter((r) => r.length >= 5 && /^S\d+/.test(r[0]))
    .map((r) => ({ ref: r[0], type: r[1], url: r[2].match(/<([^>]+)>/)?.[1] ?? r[2], accessed: r[3], notes: r[4], review: sourceReview(r[4]) }));
  const claims: CardClaim[] = tableRows(sec(11))
    .filter((r) => r.length >= 5 && /^F\d+/.test(r[0]))
    .map((r) => ({ ref: r[0], claim: r[1], source: r[2], checked: r[3], how: r[4] }));
  const s15 = sec(15);
  const s19 = sec(19);
  return {
    subject: s2[0] && !s2[0].startsWith("-") ? s2[0] : "",
    place: pm ? pm[1].trim() : pl,
    district: pm ? pm[2].trim() : "",
    province: pm ? pm[3].trim() : "",
    situation: s5.join("\n\n"),
    change: sec(6),
    activity: s9.join("\n\n"),
    sources,
    claims,
    unresolved: tableRows(sec(13)).find((r) => r[0] === "U1")?.[1] ?? "",
    contactMade: lineValue(s15, "Contact made"),
    access: lineValue(s15, "Gatekeepers or permissions needed"),
    accessLevel: lineValue(s15, "Current access level"),
    ethics: sec(17).split("\n|")[0].trim(),
    nextAction: lineValue(s19, "Action"),
    nextOwner: lineValue(s19, "Owner"),
    nextBy: lineValue(s19, "By (date)"),
    holdReason: sec(21),
    cardStoryId: sec(1).match(/\*\*Series-architecture story ID:\*\*\s*`(ST-\d{3})`/)?.[1] ?? "",
  };
}
