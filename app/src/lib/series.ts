/**
 * The series-architecture layer: 98 candidates for Episodes 2-99, the framing segments, seasons, chronology and
 * connections.
 *
 * Authoritative sources (see content/06-series-architecture/README.md):
 *   - research fields come from the lead card (lead-format.ts), never from the planning file;
 *   - planning comes from data/stories.json and data/connections.json, which this app shows READ-ONLY.
 * Episode numbers are derived from seasons[].eps. The Python tools (tools/series.py) apply the same rules and
 * scripts/check-data.mjs checks that both agree.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { CONTENT_DIR, DIRS, getData, type Data } from "./content";
import { leadFields, type Lead, type LeadFields } from "./lead-format";
import { listLeads } from "./leads";
import { FAMILY, ISSUE_TYPES, LADDER, SPOILER_ISSUES, ladderFor, mainMissing, premiseProblem, type Family, type Issue, type IssueCode, type Ladder } from "./series-rules";

export { FAMILY, ISSUE_TYPES, LADDER, ladderFor, mainMissing, premiseProblem };
export type { Family, Issue, IssueCode, Ladder };

export const SERIES_DIR = path.join(CONTENT_DIR, DIRS.series);
export const STORIES_FILE = `${DIRS.series}/data/stories.json`;
export const CONNECTIONS_FILE = `${DIRS.series}/data/connections.json`;

/** Server-side spoiler setting. When "hide", chronology, continuity and Episode 100 material never leave the server. */
export const spoilersHidden = () => (process.env.EXPLORER_SPOILERS ?? "").toLowerCase() === "hide";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type Season = {
  id: string; title: string; episodes: number; question: string; assumption: string; contrasts: string; shift: string;
  prepares: string; ep1_effect: string; piece: string; eps: string[]; status: string;
};
export type Phase = { id: string; name: string; description: string; status: string };
export type Anchor = { rank: number; kind: string; requirement: string; audience_first: string; ep100_later: string; status: string; evidence: string };
export type Segment = { id: string; name: string; chron_order: number; content: string; source: string; status: string };
export type Connection = {
  id: string; from_id: string; to_id: string; type: string; family: Family; explanation: string; basis: string;
  status: "proposal" | "source-reported" | "source-checked"; first_reading: string; later_reading: string;
  required: string; spoiler: string;
};
export type CalendarConflict = { id: string; status: string; title: string; stories: string[]; detail: string; needs: string };

export type Story = {
  id: string; // ST-007
  leadId: string;
  title: string;
  premise: string;
  candidateStatus: string;
  episode: number;
  season: string;
  posInSeason: number;
  seasonLen: number;
  seasonPiece: string;
  chronPhase: string;
  chronConfidence: string;
  calendar: string;
  anchor?: Anchor;
  lead: Lead | null;
  fields: LeadFields | null;
  sq: string;
  primaryIdea: string;
  supportingIdeas: string[];
  territory: string;
  researchStatus: string;
  review: Lead["review"] | null;
  ladder: Ladder;
  connections: Connection[];
  conflicts: string[];
  issues: Issue[];
  mainMissing: string;
};

export type Series = {
  spoilersHidden: boolean;
  stories: Story[];
  byId: Map<string, Story>;
  byLead: Map<string, Story>;
  seasons: Season[];
  phases: Phase[];
  segments: Segment[];
  connections: Connection[];
  conflicts: CalendarConflict[];
  rejected: Record<string, string>;
  ideaDifferentiation: Record<string, string>;
  about: string;
};

export const FAMILY_LABEL: Record<Family, string> = {
  philosophical: "Philosophical relationship",
  chronological: "Chronological relationship",
  continuity: "Object or footage continuity",
};

export const EVIDENCE_LABEL: Record<Connection["status"], string> = {
  proposal: "Proposal (editorial or production plan)",
  "source-reported": "Reported in sources not yet opened",
  "source-checked": "Checked against opened sources",
};

/* ------------------------------------------------------------------ */
/* Derivations (mirror tools/series.py)                                */
/* ------------------------------------------------------------------ */

function issuesFor(st: Story, d: Data, conflicts: CalendarConflict[]): Issue[] {
  const out: Issue[] = [];
  const add = (code: IssueCode, detail: string) => out.push({ code, detail });
  const { lead, fields: f, ladder } = st;
  const pp = premiseProblem(st.premise, f?.situation ?? "");
  if (pp) add("premise", pp);
  if (st.candidateStatus === "direction" || st.candidateStatus === "unverified-lead")
    add("unverified-lead", `Candidate status is ${st.candidateStatus}. ${f?.unresolved ?? ""}`.trim());
  if (!lead || !f) {
    add("reference", `No lead card found for ${st.leadId}.`);
    return out;
  }
  if (f.cardStoryId && f.cardStoryId !== st.id) add("reference", `Lead card names ${f.cardStoryId}, but this story is ${st.id}.`);
  for (const i of [lead.leadIdeaId, ...lead.supportingIdeaIds]) {
    const idea = d.ideas.get(i);
    if (!idea) add("reference", `Idea ${i} does not exist in the idea bank.`);
    else if (idea.status !== "accepted for research") add("reference", `Idea ${i} is “${idea.status}”, not accepted for research.`);
  }
  if (lead.review.subject_identified !== "yes") add("subject", "No individual, family or group has been identified or contacted.");
  if (ladder.opened < ladder.total) add("sources", `${ladder.opened} of ${ladder.total} cited sources opened and checked.`);
  if (lead.review.claim_review !== "supported") add("claim", `Core claim review: ${lead.review.claim_review}.`);
  if (lead.review.filming_access !== "confirmed") add("access", `Filming access: ${lead.review.filming_access}. Contact made: ${f.contactMade || "not recorded"}.`);
  for (const x of st.connections) {
    if (x.status === "source-reported") add("continuity", `${x.id} rests on sources that have not been opened and checked.`);
    else if ((x.family === "continuity" || x.family === "chronological") && x.status === "proposal")
      add("continuity", `${x.id} is a proposal that depends on work not yet done: ${x.required || "not stated"}`);
  }
  for (const c of conflicts) if (c.stories.includes(st.id) && c.status !== "resolved") add("calendar", `${c.id}: ${c.title}`);
  if (!f.nextAction) add("next-action", "Section 19 has no next research action.");
  else if (["", "unassigned"].includes(f.nextOwner) || ["", "unassigned"].includes(f.nextBy))
    add("next-action", `Next action has no owner or date (owner: ${f.nextOwner || "none"}; by: ${f.nextBy || "none"}).`);
  for (const s of ladder.outOfOrder) add("order", `“${s}” is recorded while an earlier step is not met.`);
  return out;
}

/* ------------------------------------------------------------------ */
/* Loading                                                             */
/* ------------------------------------------------------------------ */

type RawStories = {
  about: string;
  rejected: Record<string, string>;
  seasons: Season[];
  phases: Phase[];
  calendar_conflicts?: CalendarConflict[];
  anchors: Record<string, Anchor>;
  idea_differentiation?: Record<string, string>;
  stories: Record<string, { story_id: string; lead_id: string; title: string; premise: string; candidate_status: string; chron_phase: string; chron_confidence: string; calendar: string }>;
  segments: Record<string, Omit<Segment, "id">>;
};

async function loadSeries(): Promise<Series> {
  const hide = spoilersHidden();
  const d = await getData();
  const raw = JSON.parse(await fs.readFile(path.join(SERIES_DIR, "data", "stories.json"), "utf8")) as RawStories;
  const rawCx = JSON.parse(await fs.readFile(path.join(SERIES_DIR, "data", "connections.json"), "utf8")) as Omit<Connection, "family">[];
  const leads = new Map((await listLeads()).map((l) => [l.id, l]));

  let connections: Connection[] = rawCx.map((x) => ({ ...x, family: FAMILY[x.type] ?? "philosophical" }));
  let conflicts = raw.calendar_conflicts ?? [];
  let segments: Segment[] = Object.entries(raw.segments).map(([id, s]) => ({ id, ...s })).sort((a, b) => a.chron_order - b.chron_order);
  if (hide) {
    // Only story-to-story philosophical pairings of low spoiler weight survive; nothing that touches a framing segment.
    connections = connections.filter((x) => x.family === "philosophical" && x.spoiler === "low" && !x.from_id.startsWith("SEG-") && !x.to_id.startsWith("SEG-"));
    conflicts = [];
    segments = segments.filter((s) => s.id === "SEG-E001").map((s) => ({ ...s, chron_order: 0, source: "", status: "" }));
  }

  const stories: Story[] = [];
  let ep = 2;
  for (const s of raw.seasons) {
    s.eps.forEach((leadId, i) => {
      const base = raw.stories[leadId];
      const lead = leads.get(leadId) ?? null;
      const fields = lead ? leadFields(lead) : null;
      const st: Story = {
        id: base.story_id,
        leadId,
        title: base.title,
        premise: base.premise,
        candidateStatus: base.candidate_status,
        episode: ep++,
        season: s.id,
        posInSeason: i + 1,
        seasonLen: s.eps.length,
        seasonPiece: s.piece,
        chronPhase: hide ? "" : base.chron_phase,
        chronConfidence: hide ? "" : base.chron_confidence,
        calendar: hide ? "" : base.calendar,
        anchor: hide ? undefined : raw.anchors[leadId],
        lead,
        fields,
        sq: lead?.shortlistQuestion ?? "",
        primaryIdea: lead?.leadIdeaId ?? "",
        supportingIdeas: lead?.supportingIdeaIds ?? [],
        territory: lead?.territory ?? "",
        researchStatus: lead?.researchStatus ?? "",
        review: lead?.review ?? null,
        ladder: ladderFor(lead, fields),
        connections: [],
        conflicts: [],
        issues: [],
        mainMissing: "",
      };
      st.connections = connections.filter((x) => x.from_id === st.id || x.to_id === st.id);
      st.conflicts = conflicts.filter((c) => c.stories.includes(st.id)).map((c) => c.id);
      stories.push(st);
    });
  }
  for (const st of stories) {
    st.issues = issuesFor(st, d, conflicts).filter((i) => !hide || !SPOILER_ISSUES.has(i.code));
    st.mainMissing = mainMissing(st);
  }

  return {
    spoilersHidden: hide,
    stories,
    byId: new Map(stories.map((s) => [s.id, s])),
    byLead: new Map(stories.map((s) => [s.leadId, s])),
    seasons: raw.seasons.map((s) => ({ ...s, ep1_effect: hide ? "" : s.ep1_effect })),
    phases: hide ? [] : raw.phases,
    segments,
    connections,
    conflicts,
    rejected: raw.rejected,
    ideaDifferentiation: raw.idea_differentiation ?? {},
    about: raw.about,
  };
}

const g = globalThis as unknown as { __cwhSeries?: { key: string; data: Promise<Series> } };
const MODULE_VERSION = Date.now();

export function getSeries(): Promise<Series> {
  const key = `${MODULE_VERSION}:${spoilersHidden()}`;
  if (!g.__cwhSeries || g.__cwhSeries.key !== key) {
    const data = loadSeries().catch((e) => { g.__cwhSeries = undefined; throw e; });
    g.__cwhSeries = { key, data };
  }
  return g.__cwhSeries.data;
}

/* ------------------------------------------------------------------ */
/* Helpers used by several pages                                       */
/* ------------------------------------------------------------------ */

export function storiesForIdea(s: Series, ideaId: string) {
  return {
    primary: s.stories.filter((x) => x.primaryIdea === ideaId),
    supporting: s.stories.filter((x) => x.supportingIdeas.includes(ideaId)),
  };
}

export function storiesForConcept(s: Series, d: Data, conceptId: string) {
  const ideaIds = new Set([...d.ideas.values()].filter((i) => i.primaryConcept === conceptId || i.supportingConcepts.includes(conceptId)).map((i) => i.id));
  return s.stories.filter((x) => ideaIds.has(x.primaryIdea) || x.supportingIdeas.some((i) => ideaIds.has(i)));
}

/** Counts for dashboards. Each is a separate question; none is a percentage. */
export function seriesCounts(s: Series) {
  const st = s.stories;
  return {
    cataloged: st.length,
    evidencedSituation: st.filter((x) => x.candidateStatus === "evidenced-situation").length,
    unverifiedLead: st.filter((x) => x.candidateStatus === "unverified-lead").length,
    sourcesOpened: st.reduce((n, x) => n + x.ladder.opened, 0),
    sourcesTotal: st.reduce((n, x) => n + x.ladder.total, 0),
    storiesWithAnOpenedSource: st.filter((x) => x.ladder.opened > 0).length,
    evidenceReviewed: st.filter((x) => x.review && x.review.claim_review !== "not reviewed").length,
    claimSupported: st.filter((x) => x.review?.claim_review === "supported").length,
    subjectsIdentified: st.filter((x) => x.review?.subject_identified === "yes").length,
    consentDocumented: st.filter((x) => x.review?.consent_status === "documented").length,
    accessConfirmed: st.filter((x) => x.review?.filming_access === "confirmed").length,
    productionReady: st.filter((x) => x.ladder.stage === LADDER.length).length,
  };
}

export function segmentLabel(id: string) {
  return id === "SEG-E001" ? "Episode 1" : id === "SEG-E100A" ? "Episode 100, Part A" : id === "SEG-E100B" ? "Episode 100, Part B" : id;
}
