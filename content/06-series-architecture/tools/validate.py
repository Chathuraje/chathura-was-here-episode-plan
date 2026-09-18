# -*- coding: utf-8 -*-
"""Run the checks and write VALIDATION-REPORT.md. Exits non-zero if any machine check fails.

Reads the authoritative records only (see series.py). Writes VALIDATION-REPORT.md and nothing else.
"""
import collections, csv, io, os, re, subprocess, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import series  # noqa: E402

H = series.H
d = series.load()
ST, CX, SEAS, ANCH, SEG, CARDS, IDEAS = d["stories"], d["CX"], d["seasons"], d["anchors"], d["segments"], d["cards"], d["ideas"]
ACC = {k for k, v in IDEAS.items() if v["status"] == "accepted for research"}
R = []; fails = []


def chk(name, ok, detail):
    R.append((name, "PASS" if ok else "FAIL", detail))
    if not ok:
        fails.append(name)


def note(name, detail):
    R.append((name, "NOTE", detail))


# ---------------------------------------------------------------- shape
eps = sorted(v["episode"] for v in ST.values())
dup = [e for e, c in collections.Counter(eps).items() if c > 1]
chk("Episodes 2 to 99 each appear exactly once", eps == list(range(2, 100)),
    "min %s, max %s, count %d, duplicates: %s." % (eps[0] if eps else "-", eps[-1] if eps else "-", len(eps), dup or "none"))
leads_in_order = [l for s in SEAS for l in s["eps"]]
chk("Exactly 98 primary candidate rows, each with a distinct story and lead",
    len(ST) == 98 and len(set(leads_in_order)) == 98 == len(leads_in_order) and set(leads_in_order) == set(d["raw"]["stories"]),
    "%d story rows, %d distinct story IDs, %d lead IDs placed, %d story records." % (len(ST), len(set(ST)), len(set(leads_in_order)), len(d["raw"]["stories"])))
bad_ids = [s for s in ST if not re.match(r"^ST-\d{3}$", s)]
chk("Story IDs are stable ST-nnn identifiers", not bad_ids, "invalid: %s" % (bad_ids or "none"))
tot = sum(s["episodes"] for s in SEAS)
mism = ["%s declares %d, holds %d" % (s["id"], s["episodes"], len(s["eps"]) + (1 if s["id"] == "S01" else 0))
        for s in SEAS if s["episodes"] != len(s["eps"]) + (1 if s["id"] == "S01" else 0)]
chk("Ten seasons totalling 99 core episodes including Episode 1", len(SEAS) == 10 and tot == 99 and not mism,
    "%d seasons; declared counts sum to %d; Season 1 = Episode 1 + %d stories; declared vs placed mismatches: %s."
    % (len(SEAS), tot, len(SEAS[0]["eps"]), mism or "none"))
chk("Episode 100 is not one of the 98", "SEG-E100A" in SEG and "SEG-E100B" in SEG and 100 not in eps,
    "Episode 100 exists only as the two framing segments.")
chk("Eight to ten continuity anchors, all inside the 98", 8 <= len(ANCH) <= 10 and all(a in d["sid_of"] for a in ANCH),
    "%d anchors, %d of them placed stories; statuses: %s." % (len(ANCH), sum(1 for a in ANCH if a in d["sid_of"]),
                                                                dict(collections.Counter(a.get("status") for a in ANCH.values()))))
order = [(k, v["chron_order"]) for k, v in SEG.items()]
seq = [SEG[k]["chron_order"] for k in ("SEG-E100A", "SEG-E001", "SEG-E100B")]
chk("Episode 100 Part A -> Episode 1 -> Episode 100 Part B is preserved",
    seq[0] < seq[1] < seq[2] and all(SEG[k].get("status") == "user-supplied canon" for k in SEG),
    "chronology order values %s; all three marked user-supplied canon." % seq)
phase_ids = [p["id"] for p in d["phases"]]
badph = [s for s, v in ST.items() if v["chron_phase"] not in phase_ids]
chk("Every story sits in a known chronology phase, and no phase is claimed as confirmed",
    not badph and all(p["status"] in ("proposed", "unassigned") for p in d["phases"]),
    "unknown phases: %s; phase statuses: %s." % (badph or "none", sorted({p["status"] for p in d["phases"]})))

# ---------------------------------------------------------------- references
missing_card = [v["lead_id"] for v in ST.values() if not v["lead"]]
chk("Every story has a parseable lead card", not missing_card, "missing: %s" % (missing_card or "none"))
wrong_story = ["%s names %s" % (v["lead_id"], v["lead"]["card_story_id"]) for s, v in ST.items()
               if v["lead"] and v["lead"]["card_story_id"] not in ("", s)]
chk("Every lead card names the story that points at it", not wrong_story, "mismatches: %s" % (wrong_story or "none"))
badp = ["%s:%s" % (s, v["primary_idea"]) for s, v in ST.items() if v["primary_idea"] not in ACC]
chk("Every primary idea exists and is accepted for research", not badp,
    "invalid: %s. %d distinct accepted ideas lead the 98." % (badp or "none", len({v["primary_idea"] for v in ST.values()})))
bads = sorted({"%s:%s" % (s, i) for s, v in ST.items() for i in v["supporting_ideas"] if i not in ACC})
chk("Every supporting idea exists and is accepted for research", not bads,
    "invalid: %s. %d distinct ideas used as primary or supporting." % (bads or "none",
    len({v["primary_idea"] for v in ST.values()} | {i for v in ST.values() for i in v["supporting_ideas"]})))
valid = set(ST) | set(SEG)
cxids = [x.get("id", "") for x in CX]
badc = [x.get("id") for x in CX if x["from_id"] not in valid or x["to_id"] not in valid]
chk("Every connection has a unique stable ID and references valid story or segment IDs",
    not badc and len(set(cxids)) == len(cxids) and all(re.match(r"^CX-\d{3}$", i) for i in cxids),
    "%d connections; invalid references: %s." % (len(CX), badc or "none"))
badst = [x["id"] for x in CX if x["status"] not in series.CX_STATUSES]
seg_not_prop = [x["id"] for x in CX if (x["from_id"].startswith("SEG-") or x["to_id"].startswith("SEG-")) and x["status"] != "proposal"]
chk("Connection evidence status is honest", not badst and not seg_not_prop,
    "statuses %s; unknown values: %s; framing-segment links not marked proposal: %s. No connection is labelled an "
    "established fact, because no connection's sources have been opened and checked."
    % (dict(collections.Counter(x["status"] for x in CX)), badst or "none", seg_not_prop or "none"))
badcc = [c["id"] for c in d["conflicts"] if any(s not in ST for s in c.get("stories", []))]
chk("Calendar conflicts reference valid stories", not badcc, "%d conflicts recorded, %d unresolved; invalid: %s."
    % (len(d["conflicts"]), sum(1 for c in d["conflicts"] if c["status"] != "resolved"), badcc or "none"))

# ---------------------------------------------------------------- honesty of the data
pp = ["%s: %s" % (s, series.premise_problem(v)) for s, v in ST.items() if series.premise_problem(v)]
chk("No premise is empty, cut off or mechanically truncated", not pp, "%s" % (pp or "98 of 98 premises are complete sentences."))
review_bad = ["%s %s=%s" % (k, f, c[f]) for k, c in CARDS.items() for f, vals in series.REVIEW_VALUES.items() if c[f] not in vals]
chk("Lead review fields use known values", not review_bad, "invalid: %s" % (review_bad or "none"))
ver_bad = [k for k, c in CARDS.items() if c["research_status"] == "verified" and not (
    c["claim_review"] == "supported" and c["consent_status"] == "documented" and c["filming_access"] == "confirmed" and c["subject_identified"] == "yes")]
chk("No lead is `verified` without a supported claim, an identified subject, documented consent and confirmed access",
    not ver_bad, "violations: %s" % (ver_bad or "none"))
ooo = ["%s: %s" % (s, ", ".join(v["ladder"]["out_of_order"])) for s, v in ST.items() if v["ladder"]["out_of_order"]]
chk("No readiness step is recorded ahead of an earlier unmet step", not ooo, "out of order: %s" % (ooo or "none"))
noep = [k for k, c in CARDS.items() if re.search(r"^(episode|season|coordinate|chronolog)", "\n".join(
    l for l in open(os.path.join(series.REPO, c["file"]), encoding="utf-8").read().replace("\r\n", "\n").split("---")[1].split("\n")), re.I | re.M)]
chk("No lead card carries episode, season, coordinate or chronology data in its front matter", not noep,
    "0 of %d." % len(CARDS) if not noep else str(noep))
few = [s for s, v in ST.items() if len(v["sources"]) < 2]
chk("Every candidate cites at least two sources", not few, "%d citations across the 98, minimum %d."
    % (sum(len(v["sources"]) for v in ST.values()), min(len(v["sources"]) for v in ST.values())))

# ---------------------------------------------------------------- generated outputs agree with the records
b = subprocess.run([sys.executable, os.path.join(H, "tools", "build.py"), "--check"], capture_output=True, text=True)
chk("Every generated file agrees with the authoritative records", b.returncode == 0, b.stdout.strip() or b.stderr.strip())
rows = list(csv.DictReader(io.StringIO(open(os.path.join(H, "EPISODE-MATRIX.csv"), encoding="utf-8").read())))
csvbad = [r["story_id"] for r in rows if r["story_id"] not in ST or r["primary_idea"] != ST[r["story_id"]]["primary_idea"]
          or r["lead_id"] != ST[r["story_id"]]["lead_id"] or int(r["episode"]) != ST[r["story_id"]]["episode"]]
chk("EPISODE-MATRIX.csv rows match the lead cards and the release order", len(rows) == 98 and not csvbad,
    "%d rows; disagreements: %s." % (len(rows), csvbad or "none"))
drift = [k for k, c in CARDS.items() if k in d["archive"] and (c["primary_idea"] != d["archive"][k]["primary_idea"]
         or c["territory"] != d["archive"][k]["territory"])]
note("Lead cards compared with the frozen desk-research archive",
     "%d of %d cards now differ from `data/leads.json` in primary idea or territory. The card is authoritative; the "
     "archive records what the desk research found on 2026-09-18 and is not updated. %s"
     % (len(drift), len(CARDS), ("Changed: " + ", ".join(drift)) if drift else "No card has changed since the archive was written."))

# ---------------------------------------------------------------- judgements
fixed = [s for s, v in ST.items() if v["chron_confidence"] == "fixed-date"]
note("Calendar conflicts", "%d of 98 are labelled `fixed-date`. %d conflicts are recorded as unresolved in "
     "data/stories.json (%s). No date has been invented to resolve them." % (len(fixed), len(d["conflicts"]), ", ".join(c["id"] for c in d["conflicts"])))
note("Documented season counts", "No season count is documented anywhere in this repository (CONFLICT-02). Season 1 "
     "at 8 episodes is a proposal.")
rep = collections.Counter(v["primary_idea"] for v in ST.values())
mult = [k for k, n in rep.items() if n > 1]
undiff = [k for k in mult if k not in d["raw"].get("idea_differentiation", {})]
chk("Every idea that leads more than one story has a recorded differentiation", not undiff,
    "%d ideas lead more than one story; missing differentiation: %s." % (len(mult), undiff or "none"))

n_ev = sum(1 for v in ST.values() if v["candidate_status"] == "evidenced-situation")
n_un = sum(1 for v in ST.values() if v["candidate_status"] == "unverified-lead")
opened = sum(v["ladder"]["opened"] for v in ST.values()); total = sum(v["ladder"]["total"] for v in ST.values())
T = ["<!-- GENERATED by tools/validate.py. Run tools/rebuild.py after any change to the records. -->", "",
     "# Validation Report", "",
     "Regenerate with `python3 tools/rebuild.py` (or `python3 tools/validate.py`).", "",
     "## Counts, kept apart", "",
     "| Count | Value |", "|---|---|",
     "| Candidates **catalogued** (Episodes 2-99) | **%d** |" % len(ST),
     "| Core situation reported in published sources (`evidenced-situation`) | **%d** |" % n_ev,
     "| Specific possibility awaiting confirmation (`unverified-lead`) | **%d** |" % n_un,
     "| Source citations **opened and checked** | **%d of %d** |" % (opened, total),
     "| Candidates whose **evidence has been reviewed** | **%d** |" % sum(1 for v in ST.values() if v["claim_review"] != "not reviewed"),
     "| Candidates with a **claim supported** | **%d** |" % sum(1 for v in ST.values() if v["claim_review"] == "supported"),
     "| **Subjects identified** | **%d** |" % sum(1 for v in ST.values() if v["subject_identified"] == "yes"),
     "| **Consent** documented | **%d** |" % sum(1 for v in ST.values() if v["consent_status"] == "documented"),
     "| **Filming access** confirmed | **%d** |" % sum(1 for v in ST.values() if v["filming_access"] == "confirmed"),
     "| **Production-ready** | **%d** |" % sum(1 for v in ST.values() if v["ladder"]["stage"] == len(series.LADDER)), "",
     "**A catalogue of %d provisional candidates is not %d finished stories.**" % (len(ST), len(ST)), "",
     "## Checks", "", "| # | Check | Result | Detail |", "|---|---|---|---|"]
for n, (name, res, detail) in enumerate(R, 1):
    T.append("| %d | %s | **%s** | %s |" % (n, name, res, str(detail).replace("|", "/")))
T += ["", "## Machine result", "",
      ("**All %d machine checks pass.**" % sum(1 for r in R if r[1] == "PASS")) if not fails else ("**FAILED:** " + ", ".join(fails)),
      "", "Items marked **NOTE** are judgements or records, not machine checks.", "",
      "## Things a reader should not skip", "",
      "1. **The original channel plan is not in this repository.** See section 1 of [SERIES-CANON.md](SERIES-CANON.md).",
      "2. **This repository is public and this folder has been pushed to it**, including the spoiler-sensitive files. "
      "The app's spoiler setting does not change that. This is the owner's decision.",
      "3. **The research was English-only, and almost every source has only been seen as a search result.** Expect some "
      "of it to be overturned.", ""]
open(os.path.join(H, "VALIDATION-REPORT.md"), "w", encoding="utf-8", newline="").write("\n".join(T) + "\n")
print("\n".join("%-5s %s" % (r[1], r[0]) for r in R))
sys.exit(1 if fails else 0)
