# -*- coding: utf-8 -*-
"""Write story-lead cards into content/05-story-leads/ in the existing template format.
No episode, season, coordinate, object or chronology data is written into a lead card."""
import json, os, re
H=os.path.dirname(os.path.dirname(os.path.abspath(__file__))); D=os.path.join(H,"data")
REPO=os.path.dirname(os.path.dirname(H)); OUT=os.path.join(REPO,"content","05-story-leads")
S=json.load(open(os.path.join(D,"stories.json")))
LEADS=json.load(open(os.path.join(D,"leads.json")))
sid={k:v["story_id"] for k,v in S["stories"].items()}
STATUS={"evidenced-situation":"in research","evidenced-subject":"in research",
        "unverified-lead":"unverified","direction":"unverified","production-ready":"verified"}
TODAY="2026-09-18"

def fname(lid,desc):
    d=re.sub(r'[\\/:*?"<>|\r\n]+'," ",desc); d=re.sub(r"\s+"," ",d).strip()[:80]
    return "%s - %s.md"%(lid,d or "untitled")

def card(l):
    st = "on hold" if l["decision"]=="hold" else ("rejected" if l["decision"]=="rejected" else STATUS[l["candidate_status"]])
    story = sid.get(l["lead_id"])
    banner=("> **Status: IN RESEARCH.** Reliable published sources support the core situation described below. "
            "**No fact here has been confirmed on the ground, no person has been contacted and nothing is verified "
            "in the sense section 20 requires.** Do not treat any statement as fact unless it appears under "
            "*Verified facts* with a source, and read the caveat there.") if st=="in research" else (
           "> **Status: %s.** This lead has not been verified. Do not treat any statement below as fact unless it "
           "appears under *Verified facts* with a source."%st.upper())
    srcs=l["sources"]
    fm="\n".join(["---","lead_id: %s"%l["lead_id"],"date_opened: %s"%TODAY,
      "researcher: desk research - series-architecture v1","shortlist_question: %s"%l["sq"],
      "lead_idea_id: %s"%l["primary_idea"],
      "supporting_idea_ids: [%s]"%", ".join(l["supporting_ideas"]),
      "human_territory: %s"%l["territory"],
      "research_status: %s   # unverified | in research | verified | on hold | rejected"%st,
      "screenplay_readiness: not ready   # not ready | ready for selection review",
      "last_updated: %s"%TODAY,"---",""])
    B=[]
    B.append("# %s — %s\n"%(l["lead_id"],l["title"]))
    B.append(banner+"\n")
    B.append("## 1. Idea connection\n")
    B.append("**Lead idea ID:** `%s`  \n**Supporting idea IDs:** %s  \n**Human territory:** %s\n"
      %(l["primary_idea"], ", ".join("`%s`"%i for i in l["supporting_ideas"]) or "none", l["territory"]))
    B.append("**Open question (as carried from the shortlist):**\n> %s\n"%l["sq"])
    if story:
        B.append("**Series-architecture story ID:** `%s`. That layer lives in `content/06-series-architecture/` and is "
          "keyed to this lead by that ID. **No episode number, season, coordinate, object or chronology position is "
          "recorded in this card**, because the research-agent instruction for this stage forbids it.\n"%story)
    else:
        B.append("**Series-architecture story ID:** not assigned. This lead was not placed in the episode portfolio.\n")
    B.append("*The philosophy is private guidance for the research team. It is never shared with participants as an "
      "explanation of their lives.*\n")
    B.append("## 2. Person or community\n")
    B.append("%s\n\nNo individual has been identified and nobody has been contacted. The description above is of a "
      "kind of subject, drawn from published sources.\n"%l["subject"])
    B.append("- **Consent to be named:** not yet asked\n- **Relationship to the situation:** not established\n"
      "- **Other people affected who have not been contacted:** everyone; no contact of any kind has been made\n")
    B.append("## 3. Location\n")
    B.append("- **Place:** %s (%s; %s province)\n- **Why this place matters to the situation:** the situation "
      "described in section 5 is specific to this place and is documented there.\n- **Access to the place (practical, "
      "legal, seasonal):** %s\n"%(l["place"],l["district"],l["province"],l["access"]))
    B.append("## 4. Why the story exists independently\n")
    B.append("%s\n\nIf every reference to the idea bank, to the series structure and to the philosophy were removed, "
      "what would remain is the situation in section 5 and the activity in section 9. That is the test this lead has "
      "to pass, and it is the reason the lead was opened.\n"%l["situation"][:600])
    B.append("## 5. What is happening now\n")
    B.append("Every point below is **reported by a published source**, not observed. None has been checked on the "
      "ground.\n\n%s\n"%l["situation"])
    B.append("## 6. What is changing or at risk\n\n%s\n"%l["change"])
    B.append("## 7. Chathura's natural point of entry\n")
    B.append("Not established, and deliberately not invented. The honest route into this world is the one in section "
      "15: %s No pretext should be constructed and no encounter staged.\n"%l["access"])
    B.append("## 8. Journey potential\n")
    B.append("Only movement that exists in reality should be listed here. From the sources so far: %s\n"%l["activity"])
    B.append("## 9. Visual world\n")
    B.append("**Nothing below has been filmed and none of it is known to exist as footage.** It is a description of "
      "what is present in this situation according to the sources.\n\n%s\n"%l["activity"])
    B.append("## 10. Important objects\n")
    B.append("| Object | What it is | Why it matters to the participants | Verified? |\n|---|---|---|---|\n"
      "| not yet established | | | no |\n")
    B.append("## 11. Verified facts\n")
    B.append("**Read this first.** The rows below are claims supported by a published source that was located and "
      "recorded. **That is not the same as verification.** None has been confirmed by field research, by a second "
      "independent method, or by anyone on the ground, and several of the sources were seen only as search results "
      "and have not been opened in full. This section cannot support a `verified` status on its own.\n")
    B.append("| # | Claim | Source (section 18 ref) | Date checked | How far it was checked |\n|---|---|---|---|---|")
    for i,s_ in enumerate(srcs,1):
        B.append("| F%d | %s | %s | %s | %s |"%(i,s_["supports"].replace("|","/"),s_["ref"],s_["accessed"],
          "page opened and read" if s_["confirmed"]=="fetched" else "search result only; page not opened in full"))
    B.append("\n## 12. Participant accounts\n")
    B.append("| # | Who (role or name with consent) | Account | Date | Context |\n|---|---|---|---|---|\n"
      "| A1 | none | **No participant has been spoken to.** | not applicable | not applicable |\n")
    B.append("## 13. Unverified claims\n")
    B.append("| # | Claim | Source of claim | What would verify or refute it | Status |\n|---|---|---|---|---|")
    B.append("| U1 | %s | the sources in section 18 | field research; see section 19 | unverified |"%l["unresolved"].replace("|","/"))
    B.append("| U2 | That the situation described in section 5 is still current | published sources of varying dates | "
      "a current check with a named local contact | unverified |")
    B.append("\n## 14. Alternative interpretations\n")
    B.append("1. **The economic reading.** What the idea card frames as a matter of attention, intention or attachment "
      "may be fully explained by price, wage, debt, law or access to land. Research must test this first.\n"
      "2. **The participants' own reading.** Not known, because nobody has been asked. Whatever it is, it stands, and "
      "it is recorded as theirs.\n"
      "3. **The idea card's own limits.** The card `%s` records limits on its own claim, and those limits are carried "
      "forward here rather than left behind in the idea bank.\n"%l["primary_idea"])
    B.append("## 15. Access status\n")
    B.append("- **Contact made:** no\n- **Gatekeepers or permissions needed:** %s\n- **Language and translation needs:** "
      "not established; assume Sinhala or Tamil is required and that a translator is needed for consent as well as for "
      "interviews\n- **Practical constraints (season, safety, travel):** see section 3\n- **Current access level:** none\n"%l["access"])
    B.append("## 16. Consent considerations\n")
    B.append("- **Who has given what kind of consent, and how it was recorded:** nobody; none\n"
      "- **Who has not been asked but is affected:** everyone in section 2\n"
      "- **Right to withdraw explained:** not applicable; no one has been approached\n"
      "- **Minors or people who may not be able to consent:** see section 17\n"
      "- **Privacy concerns (health, legal, financial, family):** see section 17\n"
      "- **How participants will see and respond to material about them:** to be agreed before any filming, not after\n")
    B.append("## 17. Ethical risks\n")
    B.append("%s\n"%l["ethics"])
    B.append("\n| Risk | Who could be harmed | Likelihood | Mitigation | Owner |\n|---|---|---|---|---|\n"
      "| As described above | the people in section 2 | not assessable without contact | to be agreed with participants "
      "before any approach | commissioning person |\n")
    B.append("Check against the global rules:\n"
      "- [x] No karma, past-life or rebirth explanation of anyone's circumstances.\n"
      "- [x] No caste, racial, gendered or group-stigmatising claim.\n"
      "- [x] No temperament typing and no moral label.\n"
      "- [x] No doctrine presented as science; no supernatural claim presented as fact.\n"
      "- [x] No diagnosis or inference of inner state from behaviour.\n"
      "- [ ] Safeguarding protocol in place where required. **Not in place. Desk stage only.**\n"
      "- [x] No participant approached because their suffering is dramatic. Nobody has been approached at all.\n")
    B.append("## 18. Source links\n")
    B.append("| Ref | Type | Link or location | Accessed | Notes |\n|---|---|---|---|---|")
    for s_ in srcs:
        B.append("| %s | %s%s | <%s> | %s | %s |"%(s_["ref"],s_["type"],
          (", published %s"%s_["published"]) if s_.get("published") else "", s_["url"], s_["accessed"],
          (s_["title"]+(" — page opened and read" if s_["confirmed"]=="fetched" else " — search result only")).replace("|","/")))
    B.append("\n## 19. Next research action\n")
    B.append("- **Action:** open every source in section 18 in full and record which claims survive; then establish the "
      "single unresolved question in section 13 (U1); then identify one named local organisation, not an individual, "
      "as a first point of contact.\n- **Owner:** unassigned\n- **By (date):** unassigned\n")
    B.append("## 20. Research status\n")
    B.append("`unverified` | `in research` | `verified` | `on hold` | `rejected`\n")
    B.append("**Current status:** %s  \n**Status history:**\n- %s — opened from desk research; sources recorded; "
      "no contact made.\n"%(st,TODAY))
    B.append("## 21. Rejection or hold reason\n")
    if l["decision"]=="hold": B.append("**On hold.** %s\n"%l["hold_reason"])
    elif l["decision"]=="rejected": B.append("**Rejected.** %s\n"%l.get("reject_reason",""))
    else: B.append("Not on hold and not rejected.\n")
    B.append("## 22. Screenplay readiness\n")
    B.append("**Readiness:** not ready\n\nThis stays `not ready` until:\n"
      "- [ ] Research status is `verified`.\n- [ ] Informed consent is documented for all central participants.\n"
      "- [ ] Ethical risks have agreed mitigations.\n- [ ] The story is worth telling without any philosophical "
      "explanation.\n- [ ] A separate human story-selection decision has been made.\n\n"
      "**None of these is met.** Placement in the series-architecture layer is not a selection decision and does not "
      "change this.\n")
    return fm+"\n".join(B)

os.makedirs(OUT,exist_ok=True)
n=0
for l in LEADS:
    open(os.path.join(OUT,fname(l["lead_id"],l["title"])),"w",encoding="utf-8").write(card(l))
    n+=1
log=["# Research log — series-architecture desk research, 2026-09-18","",
 "Instruction version: `series-architecture v1 (2026-09-18)`. Repository commit inspected: `43559b5`.","",
 "## What this was","",
 "Fourteen batches of desk research opening %d leads across all 24 shortlist questions and all 14 human territories, "
 "carried out to support the series-architecture layer in `content/06-series-architecture/`. "
 "**No contact was made with any person or organisation.** No message was sent, no booking made and no consent sought."%len(LEADS),"",
 "## Method","",
 "- Each batch took a theme and a geographic or thematic gap identified by the previous batch.",
 "- Web search in English only. **Sinhala and Tamil sources were not searched**, which is a real limitation of every "
 "lead here and the first thing a Sri Lanka-based researcher should correct.",
 "- Sources were recorded with type, URL, publication date where the source gave one, access date and the specific "
 "claim each one supports.",
 "- Two pages were opened and read in full. Everything else was recorded from search results and is marked as such in "
 "each card's section 11 and 18.",
 "- Leads were merged where two would have produced the same episode, and the merges are recorded on the surviving card.","",
 "## Dead ends and things deliberately not pursued","",
 "- Weekly village *pola* markets: merged into the Dambulla wholesale market lead; the same mechanism.",
 "- A prison-overcrowding lead: merged into the court-backlog lead; the same figures and the same institutions.",
 "- Schools used as shelters after Cyclone Ditwah: merged into the Ditwah recovery lead.",
 "- The school big match: merged into the sport-access lead rather than given its own episode.",
 "- Spice smallholders: dropped. The catalogue already carries tea, rubber, cinnamon, dairy, rice and vegetables, and "
 "a seventh crop-price story would have repeated a shape rather than added one.",
 "- Kite flying and new-year games; village post offices; inland reservoir fish stocking: all considered and dropped "
 "for thin evidence, before a card was opened.","",
 "## Statuses","",
 "No lead in this folder is `verified`. Online research cannot establish that a situation is still current, that "
 "anyone is willing to take part, that filming access exists, or that production is feasible. Those are four separate "
 "questions and none of them has been touched.",""]
open(os.path.join(OUT,"research-log-series-architecture-2026-09-18.md"),"w",encoding="utf-8").write("\n".join(log)+"\n")
print("lead cards written:",n)
