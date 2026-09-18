/**
 * Rules shared by the app and the data checks. No runtime imports, so scripts/check-data.mjs can load this file
 * directly with Node. The Python tools (content/06-series-architecture/tools/series.py) apply the same rules.
 */
import type { Lead, LeadFields } from "./lead-format";

export type Family = "philosophical" | "chronological" | "continuity";

export const FAMILY: Record<string, Family> = {
  "philosophical contrast": "philosophical", "philosophical development": "philosophical", "shared human question": "philosophical",
  "chronological continuation": "chronological", "context revealed later": "chronological",
  "object continuity": "continuity", "revisited person or place": "continuity", "visual or sound echo": "continuity",
};

export const LADDER = [
  { key: "found", label: "Source found through search" },
  { key: "opened", label: "Source opened and checked" },
  { key: "claim", label: "Claim supported" },
  { key: "subject", label: "Subject identified" },
  { key: "consent", label: "Consent confirmed" },
  { key: "access", label: "Filming access confirmed" },
  { key: "ready", label: "Ready for production" },
] as const;
export type LadderKey = (typeof LADDER)[number]["key"];
export type Ladder = { met: Record<LadderKey, boolean>; stage: number; stageLabel: string; opened: number; total: number; outOfOrder: string[] };

export const ISSUE_TYPES = [
  { code: "premise", label: "Incomplete premise" },
  { code: "unverified-lead", label: "Core situation not yet evidenced" },
  { code: "subject", label: "Subject not identified" },
  { code: "sources", label: "Sources not opened" },
  { code: "claim", label: "Claim awaiting verification" },
  { code: "access", label: "Access unknown" },
  { code: "continuity", label: "Continuity claim not yet supported" },
  { code: "calendar", label: "Calendar conflict" },
  { code: "reference", label: "Broken idea or lead reference" },
  { code: "next-action", label: "Next action missing or unassigned" },
  { code: "order", label: "Status recorded out of order" },
] as const;
export type IssueCode = (typeof ISSUE_TYPES)[number]["code"];
export type Issue = { code: IssueCode; detail: string };
/** Issue types that describe hidden structure and are withheld when spoilers are hidden. */
export const SPOILER_ISSUES = new Set<IssueCode>(["continuity", "calendar"]);

export function ladderFor(lead: Lead | null, f: LeadFields | null): Ladder {
  const src = f?.sources ?? [];
  const opened = src.filter((s) => s.review === "opened").length;
  const r = lead?.review;
  const met: Record<LadderKey, boolean> = {
    found: src.length > 0,
    opened: src.length > 0 && opened === src.length,
    claim: r?.claim_review === "supported",
    subject: r?.subject_identified === "yes",
    consent: r?.consent_status === "documented",
    access: r?.filming_access === "confirmed",
    ready: false,
  };
  met.ready = (["found", "opened", "claim", "subject", "consent", "access"] as LadderKey[]).every((k) => met[k]) &&
    lead?.researchStatus === "verified" && lead?.screenplayReadiness === "ready for selection review";
  let stage = 0;
  for (const s of LADDER) {
    if (!met[s.key]) break;
    stage++;
  }
  const outOfOrder = LADDER.slice(stage + 1).filter((s) => met[s.key]).map((s) => s.label);
  return { met, stage, stageLabel: stage ? LADDER[stage - 1].label : "No source recorded", opened, total: src.length, outOfOrder };
}

export function premiseProblem(premise: string, situation: string): string {
  const p = premise.trim();
  const sit = situation.trim();
  if (!p) return "No premise recorded.";
  if (!/[.!?]["'”’)]?$/.test(p)) return "Premise does not end with a full sentence.";
  if (sit && p.length < sit.length && sit.startsWith(p)) return "Premise is a mechanical cut of the situation text.";
  if (p.split(/\s+/).length > 60) return "Premise is longer than 60 words.";
  return "";
}

export function mainMissing(st: { candidateStatus: string; ladder: Ladder }): string {
  const l = st.ladder;
  if (st.candidateStatus === "direction" || st.candidateStatus === "unverified-lead") return "Confirm the core situation (unverified lead)";
  if (l.stage >= LADDER.length) return "Nothing recorded as missing";
  const key = LADDER[l.stage].key;
  if (key === "opened") return `Open and check sources (${l.opened} of ${l.total} opened)`;
  return ({ found: "Find a source", claim: "Check the core claim", subject: "Identify a subject", consent: "Obtain and document consent",
    access: "Confirm filming access", ready: "Human selection decision" } as Record<string, string>)[key];
}

