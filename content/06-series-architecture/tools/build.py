# -*- coding: utf-8 -*-
"""Regenerate every .md table and every .csv in this folder from data/."""
import json, os, csv, re, collections
H=os.path.dirname(os.path.dirname(os.path.abspath(__file__))); D=os.path.join(H,"data")
REPO=os.path.dirname(os.path.dirname(H))
S=json.load(open(os.path.join(D,"stories.json")))
CX=json.load(open(os.path.join(D,"connections.json")))
LEADS={l["lead_id"]:l for l in json.load(open(os.path.join(D,"leads.json")))}
ST=S["stories"]; SEAS=S["seasons"]; SEG=S["segments"]; ANCH=S["anchors"]; REJ=S["rejected"]
byid={v["story_id"]:v for v in ST.values()}
lead_of={v["story_id"]:k for k,v in ST.items()}
order=sorted(byid, key=lambda s: byid[s]["episode"])

# ---------- idea bank ----------
def ideabank():
    d=os.path.join(REPO,"content","03-idea-bank","ideas"); out={}
    for f in sorted(os.listdir(d)):
        if not f.endswith(".md"): continue
        t=open(os.path.join(d,f),encoding="utf-8").read().replace("\r\n","\n")
        m=re.match(r"^---\n(.*?)\n---\n(.*)$",t,re.S); fm,body=m.group(1),m.group(2)
        g=lambda k:(re.search(r"^%s:\s*(.*)$"%k,fm,re.M).group(1).strip() if re.search(r"^%s:\s*(.*)$"%k,fm,re.M) else "")
        i=g("id"); ci=re.search(r"^## Core idea\s*\n+(.*?)(?=\n## |\Z)",body,re.S|re.M)
        lim=re.search(r"^## Limits and alternatives\s*\n+(.*?)(?=\n## |\Z)",body,re.S|re.M)
        out[i]=dict(id=i,title=g("title").strip('"'),status=g("status"),
                    primary_concept=g("primary_concept"),
                    supporting_concepts=re.findall(r"C\d{3}",g("supporting_concepts")),
                    question=" ".join(re.search(r"^## Open human question\s*\n+(.*?)(?=\n## |\Z)",body,re.S|re.M).group(1).split("\n\n")[0].split()) if re.search(r"^## Open human question",body,re.M) else "",
                    limits=" ".join(lim.group(1).split()) if lim else "",
                    core=" ".join(ci.group(1).split("\n\n")[0].split()) if ci else "")
    pm=open(os.path.join(REPO,"content","04-story-discovery","philosophy-map.md"),encoding="utf-8").read()
    app=pm.split("## Appendix A")[1].split("## Appendix B")[0]
    for line in app.split("\n"):
        if not line.startswith("| "): continue
        cells=[c.strip() for c in line.strip().strip("|").split(" | ")]
        ids=re.findall(r"C\d{3}-I\d{2}",cells[0])
        if ids and ids[0] in out and len(cells)>2: out[ids[0]]["territory"]=cells[2]
    mx=open(os.path.join(REPO,"content","04-story-discovery","documentary-potential-matrix.md"),encoding="utf-8").read()
    for line in mx.split("\n"):
        if not line.startswith("| C"): continue
        cells=[c.strip() for c in line.strip().strip("|").split(" | ")]
        if len(cells)>=15 and cells[0] in out: out[cells[0]]["tier"]=cells[12].replace("*","").strip()
    return out
IB=ideabank()
ACCEPTED=[i for i in IB.values() if i["status"]=="accepted for research"]

DIFF={
 "C003-I02":"ST-026 is about the daily climb of a palmyrah tapper in the north, where the sources record the physical risk driving young people away. ST-029 is about a rubber tapper's pre-dawn start in the south-west, where the sources record wages and status driving them away. The body is the site in both, but the pressure on it is different and so is the region and the crop.",
 "C009-I01":"ST-001 is about attention deliberately steered away from a mechanism: an audience watching a puppet and not the hand. ST-006 is about attention so concentrated on one object that the concentration damages it. One is a craft depending on not being seen; the other is a site being worn by being seen.",
 "C011-I02":"ST-046 is an inherited institutional routine at a site where the practice is centuries old and the custodial role is formal. ST-047 is a domestic expectation that used to go without saying and is now being renegotiated across distance. One is a rite; the other is an obligation.",
 "C020-I01":"ST-013 is a condition recognised by its signs for three decades with no agreed cause. ST-017 is a bite that has to be identified in minutes, usually without the animal. Same mechanism, opposite timescales, and in the second case the not-knowing is measurably lethal.",
 "C032-I02":"ST-062 concerns work that is in plain sight and looked away from. ST-064 concerns distress that is not in sight at all and that the service system is not positioned to find. The first is avoidance; the second is absence.",
 "C039-I01":"ST-074 is a workshop whose people are replaced generation by generation. ST-077 is a railway whose physical components are replaced continuously. ST-080 is a product whose name survives a change of substance. Person, material and name: three different things being replaced under one appearance.",
 "C047-I01":"ST-081 is about a sound people remember hearing in a place that may no longer produce it. ST-086 is about villages that are physically under water and can only be remembered. One tests whether a memory still has a referent; the other knows it does not.",
 "C052-I01":"ST-088 is a raw material held in common that now requires a permit. ST-095 is land in common use that became valuable enough to clear. Material and ground; a licence and a demolition.",
 "C055-I01":"ST-070 is repair done by hand by the community that lives with the damage. ST-072 is repair ordered by a court against a foreign company. The card's point, that later good changes the weight of the past without erasing it, is tested in the first by labour and in the second by money.",
 "C066-I02":"ST-068 is about speech that cannot reach a listener because there is no interpreter. ST-071 is about speech addressed to someone who cannot receive it at all. One is a solvable gap; the other is not meant to be solved.",
 "C066-I03":"ST-076 is a workshop that noticed its age when no new weaver arrived. ST-079 is a coastline whose wearing was masked while it was also accreting. One is a human institution; the other is a physical process, and the second is the card read literally.",
 "C073-I03":"ST-038 is a skill that lives in the hands and cannot be conveyed in words. ST-039 is a skill gated by permission, where a long apprenticeship precedes being allowed to begin at all. Inarticulable technique and controlled access are different problems.",
 "C076-I01":"ST-027 is a young woman whose family's sacrifice is domestic and immediate. ST-028 is a doctor whose training was paid for publicly by people they will never meet. Private debt and public investment.",
 "C077-I03":"ST-023 is a palate calibrated by what it has already tasted, deciding a price. ST-024 is an income measured against the wages of everyone nearby. Sensory calibration and social comparison.",
 "C080-I03":"ST-089 is a decline attributed to plastic when clay scarcity, cost and labour are also documented. ST-093 is a dispute in which drivers, passengers and platforms each name a different single cause. One is a received explanation; the other is a live argument between parties.",
 "C082-I02":"ST-055 is an illegal extraction continuing for two decades after a court banned it. ST-057 is a practice inside an institution that renews itself each academic year. Both are escalation, one across time and one across cohorts.",
 "C084-I01":"ST-014 is a label created by a statute, which converted an existing practice into an offence. ST-015 is a label created by an event, which has outlived the event by more than fifteen years. Law and history, doing the same work to a name.",
 "C086-I02":"ST-096 is a public argument in which positions are largely taken over from the surrounding discourse. ST-097 is a price that is taken over from what other buyers are doing on the same night. Moral judgement and market judgement.",
 "C089-I01":"ST-034 is a national shortage of a skill with a harvest window measured in weeks. ST-035 is an individual skill with a window measured in minutes. The scale and the clock are different, and so is who bears the cost of being late.",
 "C091-I01":"ST-082 is a written script whose readers have gone. ST-087 is a spoken language whose younger speakers can produce the words without using them. Writing and speech, and in the second case the speakers are present.",
 "C100-I02":"ST-037 is a craft counting how many households still practise it. ST-078 is an institution counting what survived a destruction. One is attrition; the other is a single night.",
}

def sup_ideas(sid): return byid[sid]["supporting_ideas"]
conns_from=collections.defaultdict(list); conns_to=collections.defaultdict(list)
for x in CX:
    conns_from[x["from_id"]].append(x); conns_to[x["to_id"]].append(x)
def connected(sid):
    out=[]
    for x in conns_from[sid]: out.append(x["to_id"])
    for x in conns_to[sid]: out.append(x["from_id"])
    return sorted(set(out))
def seg_link(sid, seg):
    for x in conns_from[sid]+conns_to[sid]:
        if seg in (x["from_id"],x["to_id"]):
            return "%s: %s" % (x["type"], x["explanation"])
    return "not applicable"
def role(sid):
    v=byid[sid]; s=[x for x in SEAS if x["id"]==v["season"]][0]
    n=len(s["eps"]); p=v["pos_in_season"]
    if p==1: r="Opens the season. Puts the season's question on the table: %s"%s["question"]
    elif p==n: r="Closes the season. Carries the shift: %s"%s["shift"].split(".")[0]+"."
    else: r="Develops the season's contrast."
    if v["anchor"]=="yes": r+=" Also a continuity anchor (rank %d)."%ANCH[lead_of[sid]]["rank"]
    return r
def mech(sid):
    i=byid[sid]["primary_idea"]; k=IB.get(i,{})
    return "%s - %s" % (k.get("title",""), k.get("core",""))
def obs(sid):
    return "Interpretation, not a finding. Observable in: %s" % byid[sid]["activity"]

W=lambda p,t: open(os.path.join(H,p),"w",encoding="utf-8").write(t)

# ---------------- EPISODE-MATRIX.csv ----------------
cols=["story_id","lead_id","working_title","premise","candidate_status","episode","season",
 "position_in_season","territory","research_question","primary_idea","supporting_ideas",
 "philosophical_mechanism","observable_basis","role_in_season","chronology_phase",
 "chronology_confidence","calendar_constraint","continuity_role","connected_ids",
 "episode_1_connection","episode_100_payoff","access_status","main_unresolved_dependency"]
with open(os.path.join(H,"EPISODE-MATRIX.csv"),"w",newline="",encoding="utf-8") as f:
    w=csv.writer(f,quoting=csv.QUOTE_ALL); w.writerow(cols)
    for sid in order:
        v=byid[sid]; lid=lead_of[sid]
        ep100 = seg_link(sid,"SEG-E100A")
        if ep100=="not applicable": ep100=seg_link(sid,"SEG-E100B")
        w.writerow([sid,lid,v["title"],v["premise"],v["candidate_status"],v["episode"],v["season"],
          v["pos_in_season"],v["territory"],v["sq"],v["primary_idea"],"; ".join(v["supporting_ideas"]),
          mech(sid),obs(sid),role(sid),v["chron_phase"],v["chron_confidence"],
          v["calendar"] or "none",
          ("primary continuity anchor (rank %d, %s)"%(ANCH[lid]["rank"],ANCH[lid]["kind"]) if v["anchor"]=="yes" else "standalone"),
          "; ".join(connected(sid)) or "none",
          seg_link(sid,"SEG-E001"), ep100,
          "no contact made; nobody approached; no consent and no filming access anywhere",
          v["unresolved"]])

# ---------------- STORY-CONNECTIONS.csv ----------------
with open(os.path.join(H,"STORY-CONNECTIONS.csv"),"w",newline="",encoding="utf-8") as f:
    w=csv.writer(f,quoting=csv.QUOTE_ALL)
    w.writerow(["connection_id","from_id","to_id","relationship_type","explanation",
      "source_or_planning_basis","established_fact_or_proposal","initial_audience_interpretation",
      "later_interpretation","required_footage_or_research","spoiler_visibility"])
    for i,x in enumerate(CX,1):
        w.writerow(["CX-%03d"%i,x["from_id"],x["to_id"],x["type"],x["explanation"],x["basis"],
          x["status"],x["first_reading"],x["later_reading"],x["required"],x["spoiler"]])

# ---------------- IDEA-COVERAGE.csv ----------------
prim=collections.defaultdict(list); supp=collections.defaultdict(list)
for sid in order:
    prim[byid[sid]["primary_idea"]].append(sid)
    for i in byid[sid]["supporting_ideas"]: supp[i].append(sid)
with open(os.path.join(H,"IDEA-COVERAGE.csv"),"w",newline="",encoding="utf-8") as f:
    w=csv.writer(f,quoting=csv.QUOTE_ALL)
    w.writerow(["idea_id","idea_title","tier","territory","primary_story_ids","supporting_story_ids",
      "use","how_the_uses_differ","unused_or_deferred","repetition_or_interpretation_concern"])
    for i in sorted(ACCEPTED,key=lambda x:x["id"]):
        k=i["id"]; p=prim.get(k,[]); s=supp.get(k,[])
        if p and s: use="primary and supporting"
        elif p: use="primary"
        elif s: use="supporting only"
        else: use="not used"
        diff=DIFF.get(k,"")
        if not diff and len(p)==1: diff="Single use as primary."
        if not diff and not p and s: diff="Used only to widen the reading of stories led by another idea."
        if not diff and not p and not s: diff="not applicable"
        conc=""
        if len(p)>2: conc="Used as the primary idea of %d episodes. Watch for the series repeating one shape of story."%len(p)
        elif len(p)==2: conc="Used twice as primary. The two uses are distinguished in the previous column; if that distinction weakens in the edit, one should be re-led by another idea."
        if k=="C093-I02": conc=(conc+" ").strip()+" Marked *Do not advance* in the documentary potential matrix and is correctly unused here."
        if i.get("tier")=="Tier C" and p: conc=(conc+" ").strip()+" Tier C card leading an episode: the matrix rates it as a supporting lens, so the episode must stand on its situation, not on the idea."
        w.writerow([k,i["title"],i.get("tier",""),i.get("territory",""),
          "; ".join(p) or "none","; ".join(s) or "none",use,diff,
          "in use" if (p or s) else "not used; kept visible and available",conc or "none"])
print("CSV written")

# ================= Markdown documents =================
SPOILER=("> **SPOILER-SENSITIVE.** This file contains the hidden structure of the series.\n"
 "> The label is an editorial marker for the team and enforces nothing. **This repository is public** "
 "(checked 2026-09-18: `\"private\": false`), so anything committed and pushed here is world-readable and may be "
 "indexed and cached even if it is later deleted. See CONFLICT-04 in [SERIES-CANON.md](SERIES-CANON.md).\n")

HEAD=("<!-- GENERATED by tools/build.py from data/. Edit data/, then rebuild. -->\n\n")

# ---- SEASON-ARC-MAP.md ----
t=[HEAD,"# Season Arc Map\n",
 "Ten seasons, 99 core episodes including Episode 1. Episode 100 is separate and is not counted here.\n",
 "**Everything in this file is a proposal.** Season 1's episode count is not documented anywhere in this "
 "repository (CONFLICT-02), the ten season pieces are not documented either (CONFLICT-03), and no transformation "
 "in Chathura's own life is claimed. The progression is a way of arranging real documentaries so that watching them "
 "in order does something; it is not a ladder and it does not end in enlightenment. It ends by returning to the "
 "question it started with.\n",
 "## Shape\n","| Season | Title | Episodes | Range | Stories | Anchors | Season piece slot |","|---|---|---|---|---|---|---|"]
tot=0
for s in SEAS:
    eps=[ST[l]["episode"] for l in s["eps"]]; a=sum(1 for l in s["eps"] if l in ANCH); tot+=s["episodes"]
    rng="E%d-E%d"%(min(eps) if s["id"]!="S01" else 1, max(eps))
    t.append("| %s | %s | %d | %s | %d | %d | %s |"%(s["id"],s["title"],s["episodes"],rng,len(s["eps"]),a,s["piece"]))
t.append("| **Total** | | **%d** | E1-E99 | **%d** | **%d** | 10 slots |"%(tot,sum(len(s["eps"]) for s in SEAS),len(ANCH)))
t.append("\nSeason 1 contains Episode 1 plus 7 stories; every other season is entirely stories. "
 "Season lengths vary between 8 and 11, as the user's requirements allow.\n")
t.append("**Season pieces.** `SP-01` to `SP-10` are empty slots. No object is assigned to any of them, because no "
 "season piece is described anywhere in this repository. They are recorded so that the ten pieces and the nine "
 "continuity anchors stay visibly separate counts, which the user's requirements state they are.\n")
for s in SEAS:
    eps=[ST[l] for l in s["eps"]]
    t.append("\n---\n\n## %s - %s\n"%(s["id"],s["title"]))
    t.append("**Central human question.** %s\n"%s["question"])
    t.append("**Where the season starts.** %s\n"%s["assumption"])
    t.append("**Contrasts inside the season.** %s\n"%s["contrasts"])
    t.append("**The shift its closing stories make possible.** %s\n"%s["shift"])
    t.append("**How it prepares the next season.** %s\n"%s["prepares"])
    t.append("**What it changes about Episode 1.** %s\n"%s["ep1_effect"])
    t.append("**Proposed episode count.** %d%s\n"%(s["episodes"]," (Episode 1 plus 7 stories)" if s["id"]=="S01" else ""))
    t.append("**Continuity contribution.** %s\n"%(", ".join("%s (%s)"%(ST[l]["story_id"],ANCH[l]["kind"]) for l in s["eps"] if l in ANCH) or "none; this season carries no anchor, which is deliberate - the pattern is not one per season"))
    t.append("**Season piece slot.** %s - no object assigned.\n"%s["piece"])
    t.append("| Ep | Story | Title | Territory | Primary idea | Status |")
    t.append("|---|---|---|---|---|---|")
    if s["id"]=="S01": t.append("| 1 | `SEG-E001` | Episode 1 (user-supplied canon) | not applicable | not applicable | canon |")
    for v in eps:
        t.append("| %d | `%s` | %s%s | %s | `%s` | %s |"%(v["episode"],v["story_id"],v["title"],
          " **(anchor)**" if v["anchor"]=="yes" else "",v["territory"],v["primary_idea"],v["candidate_status"]))
W("SEASON-ARC-MAP.md","\n".join(t)+"\n")

# ---- CONTINUITY-ANCHORS.md ----
t=[HEAD,"# Continuity Anchors\n",SPOILER,
 "\n## Why nine\n",
 "The requirement is 8 to 10. **Nine is the recommendation**, and the reasoning is as follows.\n",
 "- Ten would invite the audience, and the production, to read one anchor per season. That turns the pattern into a "
 "formula, and it also collides with the ten season pieces, which the user's requirements state are a separate count.\n",
 "- Eight leaves a stretch of more than a dozen consecutive episodes with nothing carrying forward, which is where "
 "a long series loses its thread.\n",
 "- Nine allows an uneven distribution. Two seasons carry two anchors, five carry one, and **Seasons 4 and 7 carry "
 "none**. A viewer cannot predict where the next one falls, and a season is never obliged to manufacture one.\n",
 "- Nine anchors plus the three framing segments gives twelve nodes for Episode 100 to reconstruct, which is enough "
 "to build a sequence from and few enough that the reconstruction is not a checklist.\n",
 "The other 89 episodes may carry quiet echoes, and several do in the connection table, but none of them depends on "
 "another episode to make sense. **No episode in this catalogue is a puzzle piece first.**\n",
 "\n## What counts as an anchor here\n",
 "Each of the nine has a complete documentary premise of its own, a justifiable place in the underlying journey, at "
 "least one connection to another story or framing segment, a clear difference between what the audience sees first "
 "and what Episode 100 later clarifies, and a practical requirement on filming or editing. Where the connection is "
 "something that really happens in the world it is marked **observed**; where it is something the production would "
 "arrange, it is marked **planned**. **No event in any subject's life is invented to create a link.**\n",
 "\n| Rank | Story | Episode | Season | Kind | Observed or planned |","|---|---|---|---|---|---|"]
for l,a in sorted(ANCH.items(), key=lambda kv: kv[1]["rank"]):
    v=ST[l]; kind="observed" if a["observed"].startswith(("Observed","Entirely observed","The pilgrimage is real","The making and the later")) else "planned"
    t.append("| %d | `%s` %s | E%d | %s | %s | %s |"%(a["rank"],v["story_id"],v["title"],v["episode"],v["season"],a["kind"],kind))
for l,a in sorted(ANCH.items(), key=lambda kv: kv[1]["rank"]):
    v=ST[l]
    t.append("\n---\n\n### %d. `%s` - %s\n"%(a["rank"],v["story_id"],v["title"]))
    t.append("- **Episode / season:** E%d, %s, position %d\n- **Lead:** `%s`\n- **Candidate status:** %s\n- **Continuity kind:** %s\n"
             %(v["episode"],v["season"],v["pos_in_season"],l,v["candidate_status"],a["kind"]))
    t.append("**Place in the underlying journey.** Chronology phase %s, confidence `%s`.%s\n"
             %(v["chron_phase"],v["chron_confidence"],(" Calendar constraint: %s"%v["calendar"]) if v["calendar"] else ""))
    t.append("**What the audience sees first.** %s\n"%a["audience_first"])
    t.append("**What Episode 100 later clarifies.** %s\n"%a["ep100_later"])
    t.append("**Practical requirement.** %s\n"%a["requirement"])
    t.append("**Observed or planned.** %s\n"%a["observed"])
    cs=[x for x in CX if v["story_id"] in (x["from_id"],x["to_id"])]
    t.append("**Connections (%d).**\n"%len(cs))
    for x in cs:
        t.append("- `%s` to `%s` - *%s* (%s). %s"%(x["from_id"],x["to_id"],x["type"],x["status"],x["explanation"]))
t.append("\n---\n\n## What is not an anchor, on purpose\n")
t.append("The highest-risk stories in the catalogue are **not** anchors. Nothing that depends on a bereaved family, a "
 "patient, a person in treatment, a child or a community in a live dispute with the state has been given a structural "
 "job in the series. If such an episode cannot be made, the series must lose an episode, not a spine. That is a "
 "deliberate constraint on the architecture and it should not be relaxed later for neatness.\n")
W("CONTINUITY-ANCHORS.md","\n".join(t)+"\n")
print("season arc + anchors written")

# ---- HIDDEN-CHRONOLOGY.md ----
PH=dict((p[0],p) for p in S["phases"])
byph=collections.defaultdict(list)
for sid in order: byph[byid[sid]["chron_phase"]].append(sid)
t=[HEAD,"# Hidden Chronology\n",SPOILER,
 "\n## What this is, and what it is not\n",
 "This is a **provisional production plan**, not a record of when anything happened. Nothing here dates a real "
 "documentary event. No subject's life is placed on a timeline. When real filming happens, real dates will replace "
 "most of this, and the release order in [SEASON-ARC-MAP.md](SEASON-ARC-MAP.md) will not have to change, because the "
 "two orders are kept on separate keys.\n",
 "**The ordering is partial.** Phases are ordered relative to one another. Stories inside a phase are **not** ordered "
 "relative to one another, and no claim is made that they were filmed consecutively or even in the same year. Where a "
 "story's place is unknown it says so.\n",
 "\n## A contradiction that is not resolved here\n",
 "Twenty-two of the 98 stories are tied to a fixed point in the calendar: Nallur in August or September in the far "
 "north, the Pada Yatra arriving at Kataragama in the far south-east in July, Sri Pada between December and May in the "
 "hills, the Peraliya commemoration on 26 December in the south, the Esala procession in Kandy in July or August, "
 "Madhu on 15 August in Mannar, bird ringing in December and February in the deep south. **These cannot all be reached "
 "in one pass through the country.** The phases below therefore describe a journey that took more than one year, or "
 "several journeys, and the series must decide which before Episode 100 is cut. This is recorded rather than smoothed "
 "over, because smoothing it over would mean inventing dates.\n",
 "\n## Order\n","| # | Phase | What it covers | Stories |","|---|---|---|---|"]
for n,(pid,name,desc) in enumerate(S["phases"],1):
    t.append("| %d | `%s` %s | %s | %d |"%(n,pid,name,desc,len(byph.get(pid,[]))))
for k,seg in sorted(SEG.items(), key=lambda kv: kv[1]["chron_order"]):
    t.append("| %d | `%s` | %s | 1 segment |"%(seg["chron_order"],k,seg["name"]))
t.append("\nThe three framing segments are the only part of the chronology that is fixed, and it is fixed because the "
 "project owner supplied it:\n\n```\n... the 98 stories, partially ordered ...\n        |\n   SEG-E100A   Episode 100 Part A\n"
 "        |\n   SEG-E001    Episode 1\n        |\n   SEG-E100B   Episode 100 Part B\n```\n")
for pid,name,desc in S["phases"]:
    ss=byph.get(pid,[])
    t.append("\n---\n\n## `%s` %s\n\n%s\n\n**%d stories. Unordered within the phase.**\n"%(pid,name,desc,len(ss)))
    t.append("| Story | Ep | Title | Place | Confidence | Calendar constraint |")
    t.append("|---|---|---|---|---|---|")
    for sid in sorted(ss, key=lambda x: byid[x]["episode"]):
        v=byid[sid]
        t.append("| `%s` | %d | %s | %s | `%s` | %s |"%(sid,v["episode"],v["title"],v["place"][:60],
                 v["chron_confidence"],v["calendar"] or "none"))
t.append("\n---\n\n## Confidence values\n")
t.append("| Value | Meaning |\n|---|---|\n"
 "| `fixed-date` | Tied to a real recurring date or season that cannot be moved. |\n"
 "| `seasonal` | Constrained by weather, access or a work cycle, but not to a specific date. |\n"
 "| `unconstrained` | Could be filmed at any time of year. |\n"
 "| `unknown` | The place or the timing has not been established. Not disguised as anything else. |\n")
cnt=collections.Counter(byid[s]["chron_confidence"] for s in order)
t.append("\nAcross the 98: "+", ".join("`%s` %d"%(k,v) for k,v in sorted(cnt.items()))+".\n")
t.append("\n## Rules for using this file\n"
 "- A story's phase may change without its story ID changing. Nothing downstream should key on the phase.\n"
 "- A phase is not a shoot. Do not schedule from this file.\n"
 "- If real footage contradicts a phase, the phase is wrong. **Do not re-date the footage.**\n")
W("HIDDEN-CHRONOLOGY.md","\n".join(t)+"\n")

# ---- EPISODE-001-TO-100-CONNECTION.md ----
t=[HEAD,"# Episode 1 and Episode 100\n",SPOILER,
 "\n## The sequence\n",
 "Preserved exactly as the project owner supplied it. **None of it is documented anywhere in this repository**; it is "
 "recorded here as user-supplied canon and is never presented as something that was read in a file.\n",
 "```\nSEG-E100A  ->  SEG-E001  ->  SEG-E100B\n```\n",
 "| Segment | Content, as supplied |","|---|---|"]
for k in ["SEG-E100A","SEG-E001","SEG-E100B"]:
    t.append("| `%s` %s | %s |"%(k,SEG[k]["name"],SEG[k]["content"]))
t.append("\n**Episode 1 is the destination of the core chronological journey** and is released first. "
 "**Part B is its continuation and completion**, not an epilogue to be cut for neatness. Episode 100 is a completion "
 "and reconstruction episode and is **not** one of the 98 documentary stories.\n")
t.append("\n## Why segment-level chronology is used\n"
 "Episode 100's two parts fall on opposite sides of Episode 1, so the episode cannot occupy a single position in the "
 "event order. The three segments are therefore ordered as segments, and Episode 100 has two chronology entries rather "
 "than one.\n")
t.append("\n## Everything in the catalogue that touches the framing segments\n")
segs=[x for x in CX if x["from_id"].startswith("SEG-") or x["to_id"].startswith("SEG-")]
t.append("\n%d connections of 52 involve a framing segment. The remaining %d are between stories and do not depend on "
 "Episode 1 or Episode 100 at all.\n"%(len(segs),52-len(segs)))
t.append("\n| From | To | Type | Fact or proposal | What the audience reads first | What it becomes |")
t.append("|---|---|---|---|---|---|")
for x in segs:
    t.append("| `%s` | `%s` | %s | %s | %s | %s |"%(x["from_id"],x["to_id"],x["type"],x["status"],x["first_reading"],x["later_reading"]))
t.append("\n## What Episode 100 has to do, and what it must not do\n")
t.append("**Part A must supply**, in the order the owner gave: the crowded-location sequence; the return to the room; "
 "the ten accumulated objects shown together; the packing; the motorcycle departure; and the travel toward "
 "Hunnasgiriya and Meemure, until it meets the existing Episode 1 footage.\n")
t.append("\n**Two of the ten objects are already accounted for** by continuity anchors in this catalogue: the drum from "
 "`%s` and the woven piece from `%s`. The other eight are **not assigned**. No object has been invented for them, and "
 "none should be until the owner supplies the canon or the filming produces them honestly.\n"
 %(ST["SL-SQ02-001"]["story_id"],ST["SL-SQ10-001"]["story_id"]))
t.append("\n**Part B must continue** from the forest ending with the teacher and the meditation or conversation, and "
 "reconstruct the larger journey. The reconstruction has nine anchors and the cyclone date to work with. It does not "
 "need, and should not attempt, a callback to all 98.\n")
t.append("\n**It must not**: re-date any real documentary event to fit the sequence; imply that any participant was "
 "part of Chathura's journey in a way they were not; present an arranged object placement as an observed coincidence; "
 "or turn the 98 into a puzzle that the audience is expected to have been solving. Every episode was supposed to work "
 "on its own, and Episode 100 is the test of whether that was true.\n")
t.append("\n## The one thing that could break this\n")
t.append("Episode 1 exists already. If its footage contains anything that contradicts the Part A material - a season, a "
 "piece of clothing, a vehicle, a length of hair - then Part A has to bend, not Episode 1. Nothing in this repository "
 "describes the Episode 1 footage, so **this cannot be checked here** and it is the first thing to check with the "
 "person who has it.\n")
W("EPISODE-001-TO-100-CONNECTION.md","\n".join(t)+"\n")
print("chronology + ep1/100 written")

# ---- EPISODE-MATRIX.md ----
t=[HEAD,"# Episode Matrix\n",
 "98 primary story rows, one for each of Episodes 2 to 99. Episode 1 and Episode 100 are not story rows; "
 "Episode 1 is user-supplied canon and Episode 100 is the separate reconstruction. See "
 "[EPISODE-001-TO-100-CONNECTION.md](EPISODE-001-TO-100-CONNECTION.md).\n",
 "The same 98 rows are in [EPISODE-MATRIX.csv](EPISODE-MATRIX.csv) with every column in one place. "
 "They are split into four tables here because one table with twenty-four columns is not readable. "
 "Both are generated from `data/`, so they cannot disagree.\n",
 "> **Counts, kept separate.** 98 candidates are catalogued. **%d** are supported by reliable independent sources "
 "for the core situation (`evidenced-situation`). **%d** are specific possibilities still awaiting confirmation "
 "(`unverified-lead`). **0 are production-ready**, and none can be: nobody has been contacted, no participant has "
 "agreed to anything, and there is no filming access anywhere.\n"
 %(sum(1 for s in order if byid[s]["candidate_status"]=="evidenced-situation"),
   sum(1 for s in order if byid[s]["candidate_status"]=="unverified-lead")),
 "\n## A. Identity and placement\n",
 "| Ep | Season | Pos | Story | Lead | Working title | Status |","|---|---|---|---|---|---|---|"]
for sid in order:
    v=byid[sid]
    t.append("| %d | %s | %d | `%s` | `%s` | %s%s | %s |"%(v["episode"],v["season"],v["pos_in_season"],sid,
      lead_of[sid],v["title"]," **(anchor)**" if v["anchor"]=="yes" else "",v["candidate_status"]))
t.append("\n## B. Idea, mechanism and what can actually be seen\n")
t.append("The mechanism column is the hidden reading. **It is an interpretation held by the production team and is "
 "never told to a participant as an explanation of their life.** The observable column is what a camera could record; "
 "it is the only part of the pairing that is evidence.\n")
t.append("| Story | Terr. | SQ | Primary idea | Supporting | Hidden mechanism | Observable basis |")
t.append("|---|---|---|---|---|---|---|")
for sid in order:
    v=byid[sid]
    t.append("| `%s` | %s | %s | `%s` | %s | %s | %s |"%(sid,v["territory"],v["sq"],v["primary_idea"],
      ", ".join("`%s`"%i for i in v["supporting_ideas"]) or "none", mech(sid), obs(sid)))
t.append("\n## C. Structure: season role, chronology and continuity\n")
t.append("| Story | Role in the season | Chron. phase | Confidence | Continuity role | Connected | Ep 1 | Ep 100 |")
t.append("|---|---|---|---|---|---|---|---|")
for sid in order:
    v=byid[sid]; lid=lead_of[sid]
    e1=seg_link(sid,"SEG-E001"); e100=seg_link(sid,"SEG-E100A")
    if e100=="not applicable": e100=seg_link(sid,"SEG-E100B")
    t.append("| `%s` | %s | %s | `%s` | %s | %s | %s | %s |"%(sid,role(sid),v["chron_phase"],v["chron_confidence"],
      ("anchor %d"%ANCH[lid]["rank"]) if v["anchor"]=="yes" else "standalone",
      ", ".join("`%s`"%x for x in connected(sid)) or "none",
      "yes" if e1!="not applicable" else "not applicable",
      "yes" if e100!="not applicable" else "not applicable"))
t.append("\n**Reading the last two columns.** `not applicable` means exactly that: a standalone episode does not need "
 "an invented payoff, and %d of the 98 have none.\n"
 %sum(1 for sid in order if seg_link(sid,"SEG-E001")=="not applicable" and seg_link(sid,"SEG-E100A")=="not applicable" and seg_link(sid,"SEG-E100B")=="not applicable"))
t.append("\n## D. Production reality\n")
t.append("Access status is identical for all 98 rows and that is the honest value. It is repeated rather than "
 "summarised so that no row can be read as further along than it is.\n")
t.append("| Story | Place | District | Access status | Main unresolved dependency |")
t.append("|---|---|---|---|---|")
for sid in order:
    v=byid[sid]
    t.append("| `%s` | %s | %s | no contact made | %s |"%(sid,v["place"][:70],v["district"][:40],v["unresolved"]))
t.append("\n## Rejected, and why\n")
t.append("%d leads that reached candidate development were **not** placed in an episode. They are kept, not deleted.\n"%len(REJ))
t.append("\n| Lead | Title | Reason |\n|---|---|---|")
for lid,why in sorted(REJ.items()):
    t.append("| `%s` | %s | %s |"%(lid,LEADS[lid]["title"],why))
hold=[l for l in LEADS.values() if l["decision"]=="hold"]
t.append("\n## Held, and why\n")
t.append("%d leads are held out of the portfolio rather than rejected. Two of the three concern Tamil communities in "
 "the north in disputes with the state, and that pattern is itself a bias in the portfolio rather than a neutral "
 "outcome. It is recorded here so that the project owner decides about it rather than inheriting it.\n"%len(hold))
t.append("\n| Lead | Title | Reason for the hold |\n|---|---|---|")
for l in hold:
    t.append("| `%s` | %s | %s |"%(l["lead_id"],l["title"],l["hold_reason"]))
W("EPISODE-MATRIX.md","\n".join(t)+"\n")
print("episode matrix written")

# ---- STORY-CANDIDATE-CATALOG.md ----
def difficulty(v,l):
    txt=(l["access"]+" "+l["ethics"]+" "+v["place"]).lower(); pts=0; why=[]
    for k,w,lab in [("ministry",2,"ministry or national approval"),("department of wildlife",2,"wildlife department permit"),
      ("permission",1,"a named permission holder"),("gatekeep",1,"a gatekeeper who is also a party"),
      ("safeguarding",2,"a safeguarding protocol"),("children",2,"subjects who cannot consent for themselves"),
      ("child",1,"children present"),("consent",1,"consent that is hard to obtain"),("season",1,"a seasonal window"),
      ("dangerous",2,"physical danger"),("night",1,"night filming"),("remote",1,"remoteness"),
      ("company",1,"a corporate gatekeeper"),("clinic",2,"clinical access"),("hospital",2,"hospital access"),
      ("court",1,"legal restriction"),("military",3,"military-controlled ground"),("illegal",2,"activity that is unlawful")]:
        if k in txt: pts+=w; why.append(lab)
    if v["chron_confidence"]=="fixed-date": pts+=1; why.append("a fixed date that cannot be moved")
    lab="low" if pts<=2 else ("moderate" if pts<=5 else ("high" if pts<=8 else "very high"))
    return lab, (", ".join(sorted(set(why))) or "nothing beyond ordinary location filming")

t=[HEAD,"# Story Candidate Catalog\n",
 "The 98 developed documentary candidates, in release order. Each entry is a candidate, not a commission.\n",
 "> **What a catalogue entry is.** A premise supported by named sources for the core situation, with an identified "
 "place and an identified kind of activity. **It is not a verified story.** No person has agreed to take part. No "
 "filming access exists. Nothing labelled as visual or sound material has been filmed; it is a description of what "
 "exists in a place, offered as a proposed opportunity.\n",
 "> **The philosophical connection in each entry is an interpretation held by the production team.** It is never "
 "given to a participant as an explanation of their life, and every entry carries the idea card's own limits as "
 "evidence that could contradict it. Where reality contradicts the reading, reality wins and the entry changes.\n"]
sim=collections.defaultdict(list)
for sid in order:
    for oth in order:
        if oth!=sid and byid[oth]["primary_idea"]==byid[sid]["primary_idea"]: sim[sid].append(oth)
for x in CX:
    if x["type"] in ("philosophical contrast","philosophical development","shared human question"):
        if x["from_id"] in byid and x["to_id"] in byid:
            sim[x["from_id"]].append(x["to_id"]); sim[x["to_id"]].append(x["from_id"])
for sid in order:
    v=byid[sid]; lid=lead_of[sid]; l=LEADS[lid]; idea=IB.get(v["primary_idea"],{})
    dl,dw=difficulty(v,l)
    t.append("\n---\n\n## E%d - `%s` %s\n"%(v["episode"],sid,v["title"]))
    t.append("| | |\n|---|---|")
    t.append("| **Lead** | `%s` |"%lid)
    t.append("| **Release** | Episode %d, %s, position %d of %d |"%(v["episode"],v["season"],v["pos_in_season"],len(v and [x for x in SEAS if x['id']==v['season']][0]['eps'])))
    t.append("| **Candidate status** | `%s` |"%v["candidate_status"])
    t.append("| **Territory / question** | %s / %s |"%(v["territory"],v["sq"]))
    t.append("| **Primary idea** | `%s` - %s |"%(v["primary_idea"],idea.get("title","")))
    t.append("| **Supporting ideas** | %s |"%(", ".join("`%s` %s"%(i,IB.get(i,{}).get("title","")) for i in v["supporting_ideas"]) or "none"))
    t.append("| **Concept sources** | `%s`%s |"%(idea.get("primary_concept",""),
        (" supporting "+", ".join("`%s`"%c for c in idea.get("supporting_concepts",[]))) if idea.get("supporting_concepts") else ""))
    t.append("| **Continuity role** | %s |"%(("primary anchor, rank %d (%s)"%(ANCH[lid]["rank"],ANCH[lid]["kind"])) if v["anchor"]=="yes" else "standalone"))
    t.append("| **Chronology** | phase `%s`, confidence `%s`%s |"%(v["chron_phase"],v["chron_confidence"],
        (", calendar: "+v["calendar"]) if v["calendar"] else ""))
    t.append("| **Production difficulty** | **%s** - %s |"%(dl,dw))
    t.append("\n**Premise.** %s\n"%v["premise"])
    t.append("**Subject and location.** %s. %s (%s, %s province).\n"%(l["subject"],v["place"],v["district"],v["province"]))
    t.append("**Observable activity.** %s\n"%v["activity"])
    t.append("**Central human question.** %s\n"%(idea.get("question") or "not recorded on the idea card"))
    t.append("**Stakes and uncertainty.** %s\n"%v["change"])
    t.append("**Why filming would be meaningful now.** %s\n"%(
        ("There is a date: %s"%v["calendar"]) if v["calendar"] else
        ("The situation is constrained by a season or a work cycle, so there is a window rather than a date." if v["chron_confidence"]=="seasonal" else
         "No calendar forces this. What makes it current is the change described above, and if that change is not real the episode should not be made.")))
    t.append("**Proposed visual and sound material.** *Nothing below has been filmed or is known to exist as footage.* %s\n"%v["activity"])
    t.append("**Possible change, with no ending prescribed.** %s The episode does not know how this resolves and must not be cut as though it did.\n"%v["change"])
    t.append("**Evidence.**\n")
    for s_ in l["sources"]:
        t.append("- **%s** (%s%s, accessed %s%s): %s  \n  <%s>"%(s_["ref"],s_["type"],
          (", published %s"%s_["published"]) if s_.get("published") else "",s_["accessed"],
          ", confirmed by fetching the page" if s_["confirmed"]=="fetched" else ", seen in a search result and not yet opened in full",
          s_["supports"],s_["url"]))
    t.append("\n**Unresolved claims and gaps.** %s\n"%v["unresolved"])
    t.append("**Research and access route.** %s\n"%l["access"])
    t.append("**Consent and access status.** No contact has been made. No participant has been approached, no consent "
      "of any kind exists, and there is no filming access. Factual verification, whether the situation is still current, "
      "participant willingness, filming access and production feasibility are five separate questions and only the first "
      "two have been touched here.\n")
    t.append("**Ethical concerns.** %s\n"%l["ethics"])
    t.append("**How the philosophical reading works.** %s The reading is applied to the situation, not to any person's "
      "character or motive.\n"%mech(sid))
    t.append("**Evidence that could challenge that reading** (from the idea card's own limits). %s\n"%(idea.get("limits") or "The card records no limits."))
    others=sorted(set(sim[sid]))
    if others:
        t.append("**Similar candidates, and how they differ.**\n")
        for o in others:
            d=DIFF.get(byid[o]["primary_idea"],"") if byid[o]["primary_idea"]==v["primary_idea"] else ""
            rel=next((x for x in CX if {x["from_id"],x["to_id"]}=={sid,o}),None)
            t.append("- `%s` %s - %s"%(o,byid[o]["title"], d or (rel["explanation"] if rel else "shares an idea or a question; the subjects, places and stakes differ")))
    else:
        t.append("**Similar candidates.** None in the catalogue shares this candidate's primary idea or question.")
    if l.get("merge_note"): t.append("\n**Merge note.** %s"%l["merge_note"])
    if l.get("relation_note"): t.append("\n**Kept separate from a neighbouring lead.** %s"%l["relation_note"])
    if l.get("note"): t.append("\n**Note.** %s"%l["note"])
    if l.get("correction"): t.append("\n**Correction.** %s"%l["correction"])
W("STORY-CANDIDATE-CATALOG.md","\n".join(t)+"\n")
print("catalog written")
