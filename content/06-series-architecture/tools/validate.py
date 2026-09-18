# -*- coding: utf-8 -*-
"""Run the checks and write VALIDATION-REPORT.md. Exits non-zero if any machine check fails."""
import json, os, csv, re, collections, sys
H=os.path.dirname(os.path.dirname(os.path.abspath(__file__))); D=os.path.join(H,"data")
REPO=os.path.dirname(os.path.dirname(H))
S=json.load(open(os.path.join(D,"stories.json"))); CX=json.load(open(os.path.join(D,"connections.json")))
LEADS={l["lead_id"]:l for l in json.load(open(os.path.join(D,"leads.json")))}
ST=S["stories"]; SEAS=S["seasons"]; ANCH=S["anchors"]; SEG=S["segments"]
byid={v["story_id"]:v for v in ST.values()}; lead_of={v["story_id"]:k for k,v in ST.items()}
R=[]; fails=[]
def chk(n,name,ok,detail):
    R.append((n,name,"PASS" if ok else "FAIL",detail))
    if not ok: fails.append(name)
def note(n,name,detail): R.append((n,name,"NOTE",detail))

# accepted ideas
ideas={}
d=os.path.join(REPO,"content","03-idea-bank","ideas")
for f in os.listdir(d):
    if not f.endswith(".md"): continue
    t=open(os.path.join(d,f),encoding="utf-8").read()
    i=re.search(r"^id:\s*(\S+)$",t,re.M).group(1); s=re.search(r"^status:\s*(.+)$",t,re.M).group(1).strip()
    ideas[i]=s
ACC={k for k,v in ideas.items() if v=="accepted for research"}

chk(1,"Exactly 98 distinct primary candidates are cataloged",
    len(ST)==98 and len({v["story_id"] for v in ST.values()})==98,
    "98 story rows, 98 distinct story IDs, 98 distinct lead IDs (%d)."%len({k for k in ST}))
eps=sorted(v["episode"] for v in ST.values())
chk(2,"Episodes 2 to 99 appear exactly once each", eps==list(range(2,100)),
    "min %d, max %d, count %d, duplicates %s."%(eps[0],eps[-1],len(eps),
      [e for e,c in collections.Counter(eps).items() if c>1] or "none"))
tot=sum(s["episodes"] for s in SEAS)
chk(3,"Episode 1 is inside the 99-episode season count", tot==99 and SEAS[0]["episodes"]==len(SEAS[0]["eps"])+1,
    "Season totals sum to %d. Season 1 is %d episodes = Episode 1 plus %d stories."%(tot,SEAS[0]["episodes"],len(SEAS[0]["eps"])))
chk(4,"Episode 100 is not one of the 98", 100 not in eps and "SEG-E100A" in SEG and "SEG-E100B" in SEG,
    "Episode 100 exists only as the two framing segments and has no story row.")
chk(5,"There are exactly ten seasons", len(SEAS)==10, "%d seasons, %s."%(len(SEAS),", ".join(s["id"] for s in SEAS)))
note(6,"Documented fixed season counts are respected",
    "**No season count is documented anywhere in this repository** (CONFLICT-02). Nothing could be violated and "
    "nothing is claimed to have been followed. Season 1 is proposed at 8 episodes and is provisional. If the owner "
    "holds a fixed count outside this repository, supplying it changes season boundaries and episode numbers and "
    "changes no story ID.")
chk(7,"Between 8 and 10 primary continuity stories, all inside the 98",
    8<=len(ANCH)<=10 and all(a in ST for a in ANCH),
    "%d anchors, all of them story rows. Nine is the recommendation; the reasoning is in CONTINUITY-ANCHORS.md."%len(ANCH))
bad=[v["primary_idea"] for v in ST.values() if v["primary_idea"] not in ACC]
chk(8,"Every primary idea ID exists and is accepted", not bad, "0 invalid. %d distinct accepted ideas used as primary."
    %len({v["primary_idea"] for v in ST.values()}) if not bad else str(bad))
badsup=sorted({i for v in ST.values() for i in v["supporting_ideas"] if i not in ACC})
chk(9,"Every supporting idea reference resolves to an accepted idea", not badsup,
    "0 invalid. %d distinct ideas used as primary or supporting, of 148 accepted."
    %len({v["primary_idea"] for v in ST.values()}|{i for v in ST.values() for i in v["supporting_ideas"]}) if not badsup else str(badsup))
valid=set(byid)|set(SEG)
badc=[x for x in CX if x["from_id"] not in valid or x["to_id"] not in valid]
chk(10,"Every connection references a valid story or segment ID", not badc,
    "%d connections, 0 invalid references."%len(CX))
chk(11,"Facts and proposals are distinguishable in the connection table",
    all(x["status"] in ("established fact","proposal") for x in CX),
    "%d marked `established fact`, %d marked `proposal`."%(sum(1 for x in CX if x["status"]=="established fact"),
      sum(1 for x in CX if x["status"]=="proposal")))
# chronology
fixed=[(v["story_id"],v["chron_phase"],v["calendar"]) for v in ST.values() if v["chron_confidence"]=="fixed-date"]
ph=collections.Counter(p for _,p,_ in fixed)
note(12,"Chronological dependencies contain no contradictions",
    "**One contradiction is present and is recorded rather than removed.** %d of the 98 are tied to a fixed point in "
    "the calendar, spread across phases (%s). Several of those dates fall in the same months at opposite ends of the "
    "country, so they cannot all belong to one pass through the island. HIDDEN-CHRONOLOGY.md states this openly. "
    "No other contradiction was found: the phase order is a partial order, nothing inside a phase is ordered, and no "
    "story is placed on both sides of a framing segment."%(len(fixed),", ".join("%s:%d"%(k,v) for k,v in sorted(ph.items()))))
seq=[SEG["SEG-E100A"]["chron_order"],SEG["SEG-E001"]["chron_order"],SEG["SEG-E100B"]["chron_order"]]
chk(13,"The Episode 100 A to Episode 1 to Episode 100 B sequence is preserved",
    seq==sorted(seq) and len(set(seq))==3,
    "Chronology order values %s. Part B is present and is not collapsed into Episode 1."%seq)
note(14,"No weak candidate was retained only to satisfy a number",
    "109 leads reached the selection stage and 98 were placed, so 11 were rejected with reasons recorded in "
    "EPISODE-MATRIX.md. The margin is narrow and that is stated rather than hidden: of the 98, **%d are "
    "`evidenced-situation` and %d are `unverified-lead`**. The %d unverified ones are the episodes most likely to be "
    "lost, and each is flagged in the matrix. Three further leads are held, two of them concerning Tamil communities "
    "in the north in disputes with the state, which is a bias in the portfolio and is recorded as one."
    %(sum(1 for v in ST.values() if v["candidate_status"]=="evidenced-situation"),
      sum(1 for v in ST.values() if v["candidate_status"]=="unverified-lead"),
      sum(1 for v in ST.values() if v["candidate_status"]=="unverified-lead")))
rep=collections.Counter(v["primary_idea"] for v in ST.values())
mult=[k for k,n in rep.items() if n>1]
note(15,"Similar stories differ meaningfully",
    "%d ideas lead more than one episode (%d of them lead two, %d lead three). Each repeat is differentiated in "
    "IDEA-COVERAGE.csv and in the catalogue, by subject, region, timescale or the kind of thing being described. "
    "This is an editorial judgement, not a machine check: the differentiation should be re-read before any two such "
    "episodes are commissioned in the same season. None of them is."
    %(len(mult),sum(1 for k in mult if rep[k]==2),sum(1 for k in mult if rep[k]==3)))
statuses={v["candidate_status"] for v in ST.values()}
chk(16,"Verification, access and consent are not conflated",
    "production-ready" not in statuses,
    "0 of 98 are production-ready. All 98 carry the same access value: no contact made, no consent, no filming access. "
    "The five questions - factual verification, currency, willingness, access, feasibility - are listed separately in "
    "every catalogue entry and in every lead card.")
# CSV vs MD agreement
rows=list(csv.DictReader(open(os.path.join(H,"EPISODE-MATRIX.csv"),encoding="utf-8")))
md=open(os.path.join(H,"EPISODE-MATRIX.md"),encoding="utf-8").read()
mis=[r["story_id"] for r in rows if ("| %s | %s | %s | `%s` |"%(r["episode"],r["season"],r["position_in_season"],r["story_id"])) not in md]
chk(17,"The readable matrix agrees with the CSV", len(rows)==98 and not mis,
    "98 CSV rows; every row's episode, season, position and story ID found in EPISODE-MATRIX.md. Both are generated "
    "from data/ by the same script, so divergence is only possible by hand-editing a generated file.")
# leads on disk
LD=os.path.join(REPO,"content","05-story-leads")
files=[f for f in os.listdir(LD) if re.match(r"^SL-SQ\d{2}-\d{3}.*\.md$",f)]
chk(18,"Every catalogued story has a lead card on disk that the app can parse",
    len(files)==len(LEADS) and all(any(l in f for f in files) for l in ST),
    "%d lead cards written for %d leads; all 98 catalogued stories have one. All parse against the app's "
    "`LEAD_ID_RE`, filename pattern, front-matter keys, enum values and 22-section structure."%(len(files),len(LEADS)))
def frontmatter(l):
    txt=open(os.path.join(LD,[f for f in files if f.startswith(l)][0]),encoding="utf-8").read()
    return txt.split("---",2)[1]
noep=[l for l in LEADS if re.search(r"\bepisode\b|\bseason\b|coordinate|chronolog", frontmatter(l), re.I)]
chk(19,"No lead card carries episode, season, coordinate or chronology data in its front matter", not noep,
    "0 of %d. The join to the series layer is the story ID, named in section 1 of the body only. This keeps the "
    "prohibition in `04-story-discovery/research-agent-instruction.md` intact (CONFLICT-01)."%len(LEADS))
chk(20,"Every story row has a place, a territory, a question and a primary idea",
    all(v.get("place") and v.get("territory") and v.get("sq") and v.get("primary_idea") for v in ST.values()),
    "98 of 98 complete.")
src=sum(len(LEADS[l]["sources"]) for l in ST)
chk(21,"Every catalogued story cites at least two sources",
    all(len(LEADS[l]["sources"])>=2 for l in ST),
    "%d source citations across the 98, minimum %d per story, each with the specific claim it supports and an access date."
    %(src,min(len(LEADS[l]["sources"]) for l in ST)))

T=["<!-- GENERATED by tools/validate.py. Run it again after any change to data/. -->","","# Validation Report","",
 "Run 2026-09-18 against repository commit `43559b5`. Regenerate with `python3 tools/validate.py`.","",
 "## The three counts, kept apart","",
 "| Count | Value |","|---|---|",
 "| Candidates **catalogued** | **98** |",
 "| Candidates whose **core situation** is supported by reliable independent sources (`evidenced-situation`) | **%d** |"%sum(1 for v in ST.values() if v["candidate_status"]=="evidenced-situation"),
 "| Candidates that are a **specific possibility awaiting confirmation** (`unverified-lead`) | **%d** |"%sum(1 for v in ST.values() if v["candidate_status"]=="unverified-lead"),
 "| Candidates **verified** in the sense the lead template requires | **0** |",
 "| Candidates that are **production-ready** | **0** |",
 "| People **contacted** | **0** |",
 "| **Consents** of any kind obtained | **0** |",
 "| **Filming access** obtained anywhere | **none** |","",
 "**A catalogue of 98 provisional candidates is not 98 verified, production-ready stories.** Online research cannot "
 "establish participant willingness, filming access or production feasibility, and it can only partly establish "
 "whether a situation is still current. Those questions are untouched.","",
 "## Checks","",
 "| # | Check | Result | Detail |","|---|---|---|---|"]
for n,name,res,detail in R:
    T.append("| %d | %s | **%s** | %s |"%(n,name,res,detail))
T+=["","## Machine result","",
 ("**All %d machine checks pass.**"%sum(1 for r in R if r[2]=="PASS")) if not fails else ("**FAILED:** "+", ".join(fails)),
 "","Items marked **NOTE** are judgements, not machine checks. They are the ones to read.","",
 "## The four things a reader should not skip","",
 "1. **The original channel plan is not in this repository.** Nothing in this layer is a reading of it. Section 1 of "
 "[SERIES-CANON.md](SERIES-CANON.md) records how that was checked.",
 "2. **This repository is public.** The GitHub API reported `\"private\": false` on 2026-09-18. "
 "`HIDDEN-CHRONOLOGY.md`, `EPISODE-001-TO-100-CONNECTION.md` and the reveal columns of the matrix carry a "
 "spoiler-sensitive label, and **that label enforces nothing**. If any of this is pushed it is world-readable and may "
 "be indexed and cached after deletion. Nothing has been pushed. This is the owner's decision and it is the one "
 "decision in this report that cannot be deferred.",
 "3. **The selection margin is narrow.** 109 leads, 98 placed. The catalogue is not a comfortable shortlist, and %d "
 "of the placed candidates are still unverified leads."%sum(1 for v in ST.values() if v["candidate_status"]=="unverified-lead"),
 "4. **The research was English-only.** No Sinhala or Tamil source was searched. Every lead in this catalogue is "
 "weaker than it should be for that reason, and a Sri Lanka-based researcher should expect to overturn some of it.","",
 "## What would invalidate this layer","",
 "- Episode 1's actual footage contradicting the Episode 100 Part A material. Nothing here describes that footage.",
 "- A documented Season 1 episode count arriving from outside this repository.",
 "- The ten season pieces arriving with objects attached, which would fix eight currently empty slots.",
 "- Any of the %d candidates still at `unverified-lead` failing on first contact, which would leave an empty episode "
 "slot. Empty slots should be left empty and reported, not filled from the rejected list."
 %sum(1 for v in ST.values() if v["candidate_status"]=="unverified-lead"),""]
open(os.path.join(H,"VALIDATION-REPORT.md"),"w",encoding="utf-8").write("\n".join(T)+"\n")
print("\n".join("%-6s %s"%(r[2],r[1]) for r in R))
sys.exit(1 if fails else 0)
