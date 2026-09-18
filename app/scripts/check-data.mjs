#!/usr/bin/env node
/**
 * Data checks for the explorer.  Run:  npm run check   (Node 22.18+; loads the app's TypeScript rules directly)
 *
 *  1. Save round-trip: every lead card is re-saved through the same code the lead editor uses, and nothing
 *     researched may change (primary idea, supporting ideas, territory, review fields, extra front matter, sections).
 *  2. The old defect stays fixed: shortlist defaults are applied only to NEW leads.
 *  3. The app and the Python tools agree: every row of EPISODE-MATRIX.csv (written by tools/build.py) matches what
 *     the app derives from the same lead cards and stories.json.
 *  4. Save, then rebuild: on a temporary copy of the content, a lead is edited and saved, `tools/rebuild.py` runs,
 *     and the edit must survive untouched and appear in the regenerated outputs.
 *
 * Nothing in the real content folder is written.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { applyLeadEdit, leadFields, parseLead, serializeLead, safeFileName } from "../src/lib/lead-format.ts";
import { ladderFor, mainMissing, premiseProblem } from "../src/lib/series-rules.ts";

const APP = path.resolve(import.meta.dirname, "..");
const CONTENT = path.resolve(process.env.CONTENT_DIR ?? path.join(APP, "..", "content"));
const LEADS = path.join(CONTENT, "05-story-leads");
const SERIES = path.join(CONTENT, "06-series-architecture");

let failures = 0;
const ok = (name, cond, detail = "") => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
  if (!cond) failures++;
};

/* ---------------------------------------------------------------- context the save action would use */
const read = (p) => fs.readFileSync(p, "utf8").replace(/\r\n/g, "\n");
const shortlistMd = read(path.join(CONTENT, "04-story-discovery", "research-shortlist.md"));
const shortlist = new Map();
for (const m of shortlistMd.matchAll(/^## (SQ\d{2}) — .+?\n([\s\S]*?)(?=^## |(?![\s\S]))/gm)) {
  const body = m[2];
  const line = (label) => body.match(new RegExp(`\\*\\*${label}:\\*\\*\\s*(.+)`))?.[1] ?? "";
  const ids = (s) => [...s.replace(/\([^)]*\)/g, "").matchAll(/C\d{3}-I\d{2}/g)].map((x) => x[0]);
  const q = body.match(/^### Open human question\s*\n+([\s\S]*?)(?=\n### |(?![\s\S]))/m)?.[1] ?? "";
  shortlist.set(m[1], {
    id: m[1], lead: ids(line("Lead idea"))[0], supporting: ids(line("Supporting")),
    territory: line("Primary territory").match(/T\d{2}/)?.[0] ?? "", territoryLabel: "",
    question: (q.match(/\*\*Research form[^*]*\*\*\s*(.+)/)?.[1] ?? q.split(/\n\s*\n/)[0]).trim(),
  });
}
const ideaIds = new Set(fs.readdirSync(path.join(CONTENT, "03-idea-bank", "ideas")).map((f) => f.slice(0, 8)));
const ctx = (sq) => ({
  today: "2026-09-18",
  shortlist: shortlist.get(sq),
  ideaExists: (i) => ideaIds.has(i),
  territoryLabel: (t) => (/^T(0[1-9]|1[0-4])$/.test(t) ? t : undefined),
});
const inputFrom = (l, overrides = {}) => ({
  originalId: l.id, id: l.id, description: l.description, dateOpened: l.dateOpened, researcher: l.researcher,
  shortlistQuestion: l.shortlistQuestion, leadIdeaId: l.leadIdeaId, supportingIdeaIds: l.supportingIdeaIds,
  territory: l.territory, researchStatus: l.researchStatus, screenplayReadiness: l.screenplayReadiness,
  review: { ...l.review }, sections: l.sections.map((s) => ({ ...s })), ...overrides,
});

/* ---------------------------------------------------------------- 1 + 2: save round-trip */
const files = fs.readdirSync(LEADS).filter((f) => /^SL-SQ\d{2}-\d{3}.*\.md$/.test(f));
const leads = files.map((f) => parseLead(fs.readFileSync(path.join(LEADS, f), "utf8"), f)).filter(Boolean);
ok("All lead cards parse", leads.length === files.length && leads.length > 0, `${leads.length} of ${files.length}`);

let changed = [];
let oldBugWouldChange = 0;
for (const l of leads) {
  const sq = shortlist.get(l.shortlistQuestion);
  if (sq && (sq.lead !== l.leadIdeaId || sq.territory !== l.territory)) oldBugWouldChange++;
  const r = applyLeadEdit(l, inputFrom(l), ctx(l.shortlistQuestion));
  if (!r.lead) { changed.push(`${l.id}: ${r.error}`); continue; }
  const back = parseLead(serializeLead(r.lead));
  const same = back.leadIdeaId === l.leadIdeaId && back.supportingIdeaIds.join() === l.supportingIdeaIds.join()
    && back.territory === l.territory && JSON.stringify(back.review) === JSON.stringify(l.review)
    && back.extraFrontMatter.join("\n") === l.extraFrontMatter.join("\n")
    && JSON.stringify(back.sections) === JSON.stringify(l.sections);
  if (!same) changed.push(l.id);
}
ok("Saving any existing lead unchanged keeps every researched mapping and section", changed.length === 0,
  changed.length ? changed.slice(0, 5).join("; ") : `${leads.length} cards round-tripped; the old editor would have overwritten the idea or territory of ${oldBugWouldChange}`);

const probe = leads.find((l) => shortlist.get(l.shortlistQuestion)?.lead !== l.leadIdeaId);
if (probe) {
  const r = applyLeadEdit(probe, inputFrom(probe, { supportingIdeaIds: [...probe.supportingIdeaIds] }), ctx(probe.shortlistQuestion));
  ok("A lead whose idea differs from its question's default keeps its own idea on save", r.lead?.leadIdeaId === probe.leadIdeaId,
    `${probe.id}: card ${probe.leadIdeaId}, question default ${shortlist.get(probe.shortlistQuestion).lead}, saved ${r.lead?.leadIdeaId}`);
}
const fresh = applyLeadEdit(null, { ...inputFrom(leads[0]), originalId: "", id: "SL-SQ05-999", leadIdeaId: "", supportingIdeaIds: [], territory: "", review: {} }, ctx("SQ05"));
ok("A NEW lead with blank mapping takes the question's defaults", fresh.lead?.leadIdeaId === shortlist.get("SQ05").lead && fresh.lead?.territory === shortlist.get("SQ05").territory);

const extra = parseLead(fs.readFileSync(path.join(LEADS, files[0]), "utf8").replace("last_updated:", "custom_note: kept by hand\nlast_updated:"));
const extraBack = parseLead(serializeLead(applyLeadEdit(extra, inputFrom(extra), ctx(extra.shortlistQuestion)).lead));
ok("Unknown front-matter keys survive a save", extraBack.extraFrontMatter.includes("custom_note: kept by hand"));

const ver = applyLeadEdit(leads[0], inputFrom(leads[0], { researchStatus: "verified" }), ctx(leads[0].shortlistQuestion));
ok("A lead cannot be saved as verified without a supported claim, subject, consent and access", Boolean(ver.error), ver.error ?? "accepted");

/* ---------------------------------------------------------------- 3: app vs Python outputs */
function parseCsv(text) {
  const rows = []; let row = []; let cell = ""; let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; }
    else if (c === '"') q = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; row.push(cell); rows.push(row); row = []; cell = ""; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [head, ...body] = rows.filter((r) => r.length > 1);
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h, r[i]])));
}
const stories = JSON.parse(fs.readFileSync(path.join(SERIES, "data", "stories.json"), "utf8"));
const csvRows = parseCsv(fs.readFileSync(path.join(SERIES, "EPISODE-MATRIX.csv"), "utf8"));
const byLead = new Map(leads.map((l) => [l.id, l]));
const derived = [];
let ep = 2;
for (const s of stories.seasons) s.eps.forEach((lid, i) => derived.push({ lid, ep: ep++, season: s.id, pos: i + 1 }));
const mism = [];
for (const d of derived) {
  const st = stories.stories[d.lid]; const l = byLead.get(d.lid); const row = csvRows.find((r) => r.story_id === st.story_id);
  if (!row || !l) { mism.push(`${st.story_id}: missing ${row ? "card" : "CSV row"}`); continue; }
  const f = leadFields(l); const lad = ladderFor(l, f);
  const want = {
    episode: String(d.ep), season: d.season, position_in_season: String(d.pos), lead_id: d.lid, primary_idea: l.leadIdeaId,
    supporting_ideas: l.supportingIdeaIds.join("; "), territory: l.territory, research_question: l.shortlistQuestion,
    research_status: l.researchStatus, research_stage: lad.stageLabel, sources_opened: String(lad.opened), sources_total: String(lad.total),
    claim_review: l.review.claim_review, subject_identified: l.review.subject_identified, consent_status: l.review.consent_status,
    filming_access: l.review.filming_access, main_missing_item: mainMissing({ candidateStatus: st.candidate_status, ladder: lad }),
    main_unresolved_dependency: f.unresolved, premise: st.premise,
  };
  for (const [k, v] of Object.entries(want)) if (row[k] !== v) mism.push(`${st.story_id}.${k}: app "${v}" vs CSV "${row[k]}"`);
  if (premiseProblem(st.premise, f.situation)) mism.push(`${st.story_id}: premise problem`);
}
ok("Episodes 2-99 each appear once in release order", derived.map((d) => d.ep).join() === Array.from({ length: 98 }, (_, i) => i + 2).join());
ok("The app's derived values match EPISODE-MATRIX.csv from tools/build.py", csvRows.length === 98 && mism.length === 0,
  mism.length ? mism.slice(0, 4).join("; ") : `${csvRows.length} rows × 19 fields`);

/* ---------------------------------------------------------------- 4: save, then rebuild, on a copy */
const py = process.env.PYTHON ?? (process.platform === "win32" ? "python" : "python3");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "cwh-check-"));
try {
  for (const d of ["03-idea-bank", "04-story-discovery", "05-story-leads", "06-series-architecture"]) {
    fs.cpSync(path.join(CONTENT, d), path.join(tmp, d), { recursive: true });
  }
  const tLeads = path.join(tmp, "05-story-leads");
  const target = probe ?? leads[0];
  const file = fs.readdirSync(tLeads).find((f) => f.startsWith(target.id));
  const before = parseLead(fs.readFileSync(path.join(tLeads, file), "utf8"));
  const sec5 = before.sections.findIndex((s) => s.heading.startsWith("5. "));
  const edited = inputFrom(before, {
    review: { ...before.review, consent_status: "partial" },
    sections: before.sections.map((s, i) => (i === sec5 ? { ...s, content: s.content + "\n\nEdited in the explorer during the data check." } : s)),
  });
  const saved = applyLeadEdit(before, edited, ctx(before.shortlistQuestion)).lead;
  fs.writeFileSync(path.join(tLeads, safeFileName(saved.id, saved.description)), serializeLead(saved));
  const cardBefore = fs.readFileSync(path.join(tLeads, safeFileName(saved.id, saved.description)), "utf8");
  const r = spawnSync(py, [path.join(tmp, "06-series-architecture", "tools", "rebuild.py")], { encoding: "utf8" });
  const cardAfter = fs.readFileSync(path.join(tLeads, safeFileName(saved.id, saved.description)), "utf8");
  ok("Rebuild runs after a save", r.status === 0, r.status === 0 ? "" : (r.stdout + r.stderr).split("\n").filter(Boolean).slice(-3).join(" | "));
  ok("Rebuild leaves the saved lead card byte-for-byte unchanged", cardBefore === cardAfter);
  const reread = parseLead(cardAfter);
  ok("The researched mapping survives save + rebuild", reread.leadIdeaId === target.leadIdeaId && reread.territory === target.territory
    && reread.supportingIdeaIds.join() === target.supportingIdeaIds.join(), `${reread.leadIdeaId} / ${reread.territory}`);
  const row = parseCsv(fs.readFileSync(path.join(tmp, "06-series-architecture", "EPISODE-MATRIX.csv"), "utf8")).find((x) => x.lead_id === target.id);
  ok("The edit reaches the regenerated outputs", row?.consent_status === "partial" && row?.primary_idea === target.leadIdeaId,
    `consent_status=${row?.consent_status}, primary_idea=${row?.primary_idea}`);
  for (const seed of ["architect.py", "connections.py", "b01.py"]) {
    const s = spawnSync(py, [path.join(tmp, "06-series-architecture", "tools", seed)], { encoding: "utf8" });
    ok(`Seed script ${seed} refuses to run`, s.status === 2);
  }
  const w = spawnSync(py, [path.join(tmp, "06-series-architecture", "tools", "write_leads.py")], { encoding: "utf8" });
  ok("write_leads.py never overwrites an existing card", fs.readFileSync(path.join(tLeads, safeFileName(saved.id, saved.description)), "utf8") === cardAfter, w.stdout.trim());
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}

console.log(failures ? `\n${failures} check(s) failed.` : "\nAll checks passed.");
process.exit(failures ? 1 : 0);
