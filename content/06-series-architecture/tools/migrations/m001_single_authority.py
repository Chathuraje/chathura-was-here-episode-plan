# -*- coding: utf-8 -*-
"""Migration 001 (2026-09-18): one authoritative source per entity.

Run once. It is kept so the change can be reviewed and reproduced; running it again is refused.

What it does
------------
data/stories.json
  * Removes fields that were copies of lead-card fields (ideas, territory, question, place, situation text, sources,
    access, ethics). The lead card in content/05-story-leads/ is the only source for them now. Every removed value is
    first checked against the card; the migration stops if any differs, so nothing researched is lost.
  * Removes fields derivable from `seasons[].eps` and `anchors` (episode, season, position, anchor flag, season piece),
    so the release order is stored once.
  * Replaces the 400-character mechanical cut in `premise` with a reviewed one-sentence summary (from --premises).
  * Records the calendar conflicts explicitly, as unresolved.
  * Marks anchors, seasons and phases as proposals and rewrites anchor evidence notes that claimed more than the
    sources support.
data/connections.json
  * Gives every connection a stored, stable ID (CX-001 ... in the existing order) instead of a list position.
  * Replaces `established fact` with an evidence status that matches what was checked: `proposal`,
    `source-reported` (reported by sources seen only as search results), or `source-checked`.
content/05-story-leads/*.md
  * Section 1: the open question carried only the question ID (`> SQ19`). It now carries the question text.
  * Section 4: text cut mid-sentence at 600 characters now ends at the last complete sentence.

Nothing else in a lead card changes. No ID, file name, source, idea mapping or status changes.

Follow-up done by hand after this script ran (same day): the `DIFF` notes that were hard-coded in tools/build.py
(how two stories led by the same idea differ) were moved verbatim into data/stories.json as `idea_differentiation`,
so the generator holds no editorial content.
"""
import argparse, json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import series  # noqa: E402

D, CONTENT = series.D, series.CONTENT
MARK = os.path.join(D, ".migrations")

ap = argparse.ArgumentParser()
ap.add_argument("--premises", required=True, help="JSON object: lead_id -> reviewed one-sentence premise")
args = ap.parse_args()

done = open(MARK).read().split() if os.path.exists(MARK) else []
if "m001" in done:
    sys.exit("m001 has already been applied (data/.migrations). Refusing to run it twice.")

S = json.load(open(os.path.join(D, "stories.json"), encoding="utf-8"))
CX = json.load(open(os.path.join(D, "connections.json"), encoding="utf-8"))
ARCHIVE = {l["lead_id"]: l for l in json.load(open(os.path.join(D, "leads.json"), encoding="utf-8"))}
cards = series.load_lead_cards()
premises = json.load(open(args.premises, encoding="utf-8"))

# ------------------------------------------------------------------ safety checks before removing anything
problems = []
for lid, st in S["stories"].items():
    c = cards.get(lid)
    if not c:
        problems.append("%s: no lead card" % lid); continue
    for f_story, f_card in [("primary_idea", "primary_idea"), ("supporting_ideas", "supporting_ideas"),
                            ("territory", "territory"), ("sq", "sq")]:
        if st[f_story] != c[f_card]:
            problems.append("%s: %s differs (story %r, card %r)" % (lid, f_story, st[f_story], c[f_card]))
    a = ARCHIVE[lid]
    for f in ("place", "district", "province", "activity", "change", "unresolved", "access", "ethics", "sources"):
        if st[f] != a[f]:
            problems.append("%s: %s differs from the desk-research archive" % (lid, f))
    if lid not in premises or not premises[lid].strip():
        problems.append("%s: no reviewed premise supplied" % lid)
ep = 2
for s in S["seasons"]:
    for pos, lid in enumerate(s["eps"], 1):
        st = S["stories"][lid]
        if (st["episode"], st["season"], st["pos_in_season"], st["season_piece"]) != (ep, s["id"], pos, s["piece"]):
            problems.append("%s: stored episode fields disagree with seasons[].eps" % lid)
        if (st["anchor"] == "yes") != (lid in S["anchors"]):
            problems.append("%s: anchor flag disagrees with anchors" % lid)
        ep += 1
if problems:
    sys.exit("Migration stopped; nothing written:\n  " + "\n  ".join(problems))

# ------------------------------------------------------------------ stories.json
LEAD_OWNED = ["territory", "sq", "primary_idea", "supporting_ideas", "place", "district", "province", "activity",
              "change", "unresolved", "access", "ethics", "sources"]
DERIVED = ["episode", "season", "pos_in_season", "season_size", "anchor", "season_piece"]
stories = {}
for lid, st in S["stories"].items():
    new = {k: v for k, v in st.items() if k not in LEAD_OWNED + DERIVED}
    new["premise"] = premises[lid].strip()
    stories[lid] = new

ANCHOR_EVIDENCE = {
    "SL-SQ02-001": "Drum making at these settlements is reported in published sources seen only as search results. "
                   "Following one specific drum from the making to a later performance is a production plan and has not happened.",
    "SL-SQ05-001": "The annual pilgrimage is reported in published sources seen only as search results. Joining a section "
                   "of it, and using its route as the spine of the hidden chronology, are production proposals.",
    "SL-SQ11-001": "The season's opening and closing full moons are reported in published sources seen only as search "
                   "results. The out-of-season climb is a proposed second shoot.",
    "SL-SQ10-001": "The weaving is reported in published sources seen only as search results. No piece has been acquired. "
                   "Its later appearance in Episode 100 would be a production arrangement and must be labelled as one.",
    "SL-SQ16-001": "Releases and post-release monitoring by the Department of Wildlife Conservation are reported in "
                   "published sources seen only as search results. Access to monitoring data, and whether the same "
                   "animals can be found again, are not established. The return visit is a proposal.",
    "SL-SQ03-005": "The cyclone and the damage attributed to it are reported in published sources seen only as search "
                   "results. Its links to other episodes (CX-010 to CX-012) must be confirmed with the operator or "
                   "employer. Using its date as the series' chronological marker is a proposal.",
    "SL-SQ20-001": "Cascade tank systems are reported in published sources seen only as search results. Which cascade "
                   "any other filming location sits in has not been surveyed, so the physical link between episodes "
                   "is not established.",
    "SL-SQ18-001": "The annual stop on 26 December is reported in published sources seen only as search results. The "
                   "ordinary-day footage is a proposed second shoot.",
    "SL-SQ22-005": "The line's destruction and reconstruction are reported in published sources seen only as search "
                   "results. Holding back the terminus footage for the release-order ending is a production proposal.",
}
anchors = {}
for lid, a in S["anchors"].items():
    a = {k: v for k, v in a.items() if k != "observed"}
    a["status"] = "proposed"
    a["evidence"] = ANCHOR_EVIDENCE[lid]
    anchors[lid] = a

sid = {lid: st["story_id"] for lid, st in S["stories"].items()}
conflicts = [
    dict(id="CC-01", status="unresolved", title="Phase P3 is placed before P4, but its Esala dates fall after the Pada Yatra",
         stories=[sid["SL-SQ24-002"], sid["SL-SQ05-001"]],
         detail="The Esala Perahera lead reports the 2025 procession as running from 30 July to 9 August (phase P3). "
                "The Pada Yatra lead records a walk of roughly May to July, arriving at Kataragama for the festival "
                "(phase P4). In a single year the P3 story happens after the P4 story, which contradicts the proposed "
                "phase order. Either the journey spans more than one year, or one of these stories moves phase.",
         needs="Decide whether the hidden journey spans more than one year, then place both stories."),
    dict(id="CC-02", status="unresolved", title="Phase P2 holds dates at opposite ends of the year",
         stories=[sid["SL-SQ01-001"], sid["SL-SQ18-001"], sid["SL-SQ01-004"]],
         detail="Phase P2 contains temple puppet performances recorded as traditionally held in May and June, the "
                "Peraliya commemoration on 26 December, and bird ringing recorded in December and February. One pass "
                "along the south coast cannot include both May-June and late December without covering at least "
                "seven months.",
         needs="Decide whether P2 is one stay or several visits; do not assign dates until filming is planned."),
    dict(id="CC-03", status="unresolved", title="Two northern festivals overlap in August",
         stories=[sid["SL-SQ13-002"], sid["SL-SQ06-001"]],
         detail="The Madhu lead records the largest gathering on 15 August in Mannar. The Nallur lead records "
                "twenty-five consecutive days in August or September in Jaffna. Both are in phase P5 and may overlap "
                "in the same year.",
         needs="Check the year's festival dates before placing either; they may need separate years or crews."),
    dict(id="CC-04", status="unresolved", title="Dated stories with no phase",
         stories=[sid[l] for l in ("SL-SQ03-005", "SL-SQ12-003", "SL-SQ10-006", "SL-SQ10-005", "SL-SQ15-003", "SL-SQ24-005")],
         detail="These stories carry a date or recurring calendar point (for example 28 November, Vesak in May, the "
                "March big match) but sit in P7, which claims no position. Their place relative to the other phases "
                "and to the framing segments is unknown.",
         needs="Assign a phase once the places and filming years are known, or leave them unplaced."),
    dict(id="CC-05", status="unresolved", title="One journey or several",
         stories=[],
         detail="Taken together the calendar constraints cannot be met in one pass through the island in one year. "
                "The owner has not decided whether the hidden journey is one journey over more than one year, or "
                "several journeys. Episode 100 depends on this decision.",
         needs="Owner decision before Episode 100 is planned."),
]

phases = [dict(id=p[0], name=p[1], description=p[2], status="proposed" if p[0] != "P7" else "unassigned")
          for p in S["phases"]]
seasons = []
for s in S["seasons"]:
    s = dict(s)
    s["status"] = "proposed"
    seasons.append(s)
segments = {}
for k, v in S["segments"].items():
    v = dict(v)
    v["status"] = "user-supplied canon"
    segments[k] = v

out = {
    "schema": 2,
    "about": ("Authoritative planning record for the series-architecture layer. Edit by hand, then run "
              "`python3 tools/rebuild.py`. Research fields (ideas, territory, place, sources, access, status) are "
              "NOT stored here: they come from the lead card named by lead_id. Release order is `seasons[].eps` "
              "(lead IDs, in episode order from Episode 2); episode numbers are derived from it. Every season, "
              "phase, anchor and chronology position is a proposal unless its status says otherwise."),
    "rejected": S["rejected"],
    "seasons": seasons,
    "phases": phases,
    "calendar_conflicts": conflicts,
    "anchors": anchors,
    "stories": stories,
    "segments": segments,
}
json.dump(out, open(os.path.join(D, "stories.json"), "w", encoding="utf-8"), indent=1, ensure_ascii=False)

# ------------------------------------------------------------------ connections.json
SOURCE_REPORTED = {10, 11, 12, 17, 48}
REBASIS = {
    5: "Proposal for future filming. Post-release tracking by the Department of Wildlife Conservation is reported in "
       "sources seen only as search results; whether the same animals can be found again is unknown.",
    6: "Proposal for how Episode 100 uses the date. The cyclone and the damage attributed to it are reported in sources "
       "seen only as search results.",
    7: "Proposal. Which cascade the other locations sit in has not been surveyed, so the physical link is not established.",
    10: "Reported: both situations appear in the same published reporting, seen only as search results. The specific "
        "damage has not been confirmed with the operator.",
    11: "Reported: both situations appear in the same published reporting, seen only as search results. The specific "
        "damage has not been confirmed with the employer.",
    12: "Reported: both appear in the same published reporting, seen only as search results. That they are one water "
        "system is an interpretation to be checked.",
    17: "Reported: a published mortality study, seen only as a search result, locates snare deaths in plantation mosaics "
        "in Nuwara Eliya. Any revisit is a proposal.",
    47: "Editorial parallel. Each situation is reported in its own sources, seen only as search results.",
    48: "Reported at population level in published research, seen only as a search result and not opened. Sensitive: "
        "this connection must never be drawn about a named person, and a clinical adviser must approve any use of it.",
    49: "Editorial pairing. Each trend is reported with separate figures in its own sources, seen only as search results.",
}
newcx = []
for i, x in enumerate(CX, 1):
    y = {"id": "CX-%03d" % i}
    y.update(x)
    y["status"] = "source-reported" if i in SOURCE_REPORTED else "proposal"
    if i in REBASIS:
        y["basis"] = REBASIS[i]
    newcx.append(y)
json.dump(newcx, open(os.path.join(D, "connections.json"), "w", encoding="utf-8"), indent=1, ensure_ascii=False)

# ------------------------------------------------------------------ lead cards: two mechanical defects
sq_questions = {}
md = open(os.path.join(CONTENT, "04-story-discovery", "research-shortlist.md"), encoding="utf-8").read().replace("\r\n", "\n")
for m in re.finditer(r"^## (SQ\d{2}) — .+?\n(.*?)(?=^## |\Z)", md, re.S | re.M):
    body = m.group(2)
    q = re.search(r"^### Open human question\s*\n+(.*?)(?=\n### |\Z)", body, re.S | re.M)
    qs = q.group(1) if q else ""
    refined = re.search(r"\*\*Research form[^*]*\*\*\s*(.+)", qs)
    text = refined.group(1) if refined else re.split(r"\n\s*\n", qs.strip())[0]
    sq_questions[m.group(1)] = " ".join(text.split())

changed = 0
for f in sorted(os.listdir(series.LEADS_DIR)):
    if not series.LEAD_FILE_RE.match(f):
        continue
    p = os.path.join(series.LEADS_DIR, f)
    raw = open(p, encoding="utf-8").read()
    crlf = "\r\n" in raw
    t = raw.replace("\r\n", "\n")
    orig = t
    # 1. open question
    def fix_q(m):
        q = sq_questions.get(m.group(2))
        return m.group(1) + "> " + q if q else m.group(0)
    t = re.sub(r"(\*\*Open question \(as carried from the shortlist\):\*\*\n)> (SQ\d{2})[ \t]*$", fix_q, t, flags=re.M)
    # 2. section 4 cut at 600 characters
    lid = series.LEAD_FILE_RE.match(f).group(1)
    sit = ARCHIVE.get(lid, {}).get("situation", "")
    if len(sit) > 600:
        cut = sit[:600]
        if cut in t:
            ends = [m.end() for m in re.finditer(r"[.!?][\"'”’)]?(?=\s)", cut)]
            whole = cut[:ends[-1]] if ends and ends[-1] >= 150 else sit
            t = t.replace("## 4. Why the story exists independently\n\n" + cut + "\n",
                          "## 4. Why the story exists independently\n\n" + whole + "\n", 1)
    if t != orig:
        open(p, "w", encoding="utf-8", newline="").write(t.replace("\n", "\r\n") if crlf else t)
        changed += 1

open(MARK, "a").write("m001\n")
print("m001 applied: %d stories, %d connections, %d lead cards corrected." % (len(stories), len(newcx), changed))
