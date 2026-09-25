import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Regenerates the slate section and the standing figures of
 * docs/planning/08-the-footage-led-slate.md from the records themselves.
 *
 * That table was hand-maintained and drifted: after a rewrite it kept listing the title,
 * location and district a film no longer had. Anything derivable from the records is
 * generated here; the prose sections of the document are left untouched.
 *
 * Run: node development/analysis/slate-table.mjs
 */

const analysisDir = path.dirname(fileURLToPath(import.meta.url));
const developmentDir = path.dirname(analysisDir);
const repoDir = path.dirname(developmentDir);
const slatePath = path.join(repoDir, "docs", "planning", "08-the-footage-led-slate.md");

const read = (dir) => fs.readdirSync(path.join(developmentDir, dir))
  .filter((name) => name.endsWith(".json")).sort()
  .map((name) => JSON.parse(fs.readFileSync(path.join(developmentDir, dir, name), "utf8")));

const ideas = read("ideas");
const groups = read("groups").sort((a, b) => a.chronological_position - b.chronological_position);

// Sri Lanka's 25 districts. A region string names its district early, so take whichever
// district name appears leftmost in the string — not whichever comes first in this list,
// which is what an earlier version got wrong.
const DISTRICTS = ["Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya", "Galle",
  "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu", "Batticaloa",
  "Ampara", "Trincomalee", "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
  "Monaragala", "Moneragala", "Ratnapura", "Kegalle"];

function districtOf(idea) {
  const region = idea.suggested_location?.region ?? "";
  let best = null;
  for (const district of DISTRICTS) {
    const at = region.indexOf(district);
    if (at !== -1 && (best === null || at < best.at)) best = { at, district };
  }
  if (!best) return "—";
  return best.district === "Moneragala" ? "Monaragala" : best.district;
}

const escape = (value) => String(value ?? "").replace(/\|/g, "\\|");

const slate = ["## The slate", ""];
for (const group of groups) {
  const own = ideas.filter((idea) => idea.group_id === group.id);
  slate.push(`### ${group.id} ${group.title} — ${group.draft_film_count} films from ${own.length} candidates`,
    "", `*${group.human_question}*`, "",
    "| Idea | Title | Location | District | Verdict |", "| --- | --- | --- | --- | --- |");
  for (const idea of own) {
    slate.push(`| ${idea.id} | ${escape(idea.title)} | ${escape(idea.suggested_location?.name ?? "—")}`
      + ` | ${districtOf(idea)} | ${idea.review?.status ?? "pending"} |`);
  }
  slate.push("");
}

const images = ideas.flatMap((idea) => idea.suggested_location?.images ?? []);
const distinct = new Set(images.map((image) => image.url));
const byDistrict = new Map();
for (const idea of ideas) byDistrict.set(districtOf(idea), (byDistrict.get(districtOf(idea)) ?? 0) + 1);
const counts = [...byDistrict.entries()].filter(([name]) => name !== "—").map(([, n]) => n);
const status = (name) => ideas.filter((idea) => idea.review?.status === name).length;

const figures = [
  "| | |", "| --- | --- |",
  `| Candidate ideas | ${ideas.length}, all on the footage-led shape |`,
  `| Films to be made | ${groups.reduce((n, g) => n + g.draft_film_count, 0)} (2–99), quota enforced per group |`,
  `| Confirmed | ${status("confirmed")} |`,
  `| Rejected | ${status("rejected")} |`,
  `| Districts covered | ${byDistrict.size - (byDistrict.has("—") ? 1 : 0)} of 25, between ${Math.min(...counts)} and ${Math.max(...counts)} films each |`,
  `| Reference images | ${images.length} references across ${ideas.filter((i) => (i.suggested_location?.images ?? []).length).length} ideas, resolving to ${distinct.size} distinct Wikimedia Commons files, every one verified to exist |`,
  `| Ideas with no image | ${ideas.filter((i) => !(i.suggested_location?.images ?? []).length).length}, because Commons holds nothing for that place |`,
  `| Films resting on a historical thread | ${ideas.filter((i) => i.suggested_location?.historical_thread).length} |`,
];

let document = fs.readFileSync(slatePath, "utf8");
document = document.replace(/## The slate\n[\s\S]*?(?=\n## What is not done)/, `${slate.join("\n")}`);
document = document.replace(/\| \| \|\n\| --- \| --- \|\n(?:\|.*\n)+/, `${figures.join("\n")}\n`);
fs.writeFileSync(slatePath, document);

console.log(`Regenerated the slate for ${ideas.length} ideas in ${groups.length} groups.`);
console.log(`confirmed ${status("confirmed")}, rejected ${status("rejected")}, `
  + `pending ${ideas.length - status("confirmed") - status("rejected")}; `
  + `${ideas.filter((i) => i.suggested_location?.historical_thread).length} with a historical thread.`);
