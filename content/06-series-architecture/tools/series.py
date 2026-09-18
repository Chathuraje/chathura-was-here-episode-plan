# -*- coding: utf-8 -*-
"""Shared loader for the series-architecture layer.

Reads each entity from its one authoritative source and derives everything else:

    lead research fields   content/05-story-leads/SL-*.md        (the lead card; the app's lead editor writes it)
    story planning         content/06-series-architecture/data/stories.json
    connections            content/06-series-architecture/data/connections.json
    ideas                  content/03-idea-bank/ideas/*.md
    desk-research archive  content/06-series-architecture/data/leads.json   (frozen; history only)

Episode numbers, season positions and anchor flags are derived from `seasons[].eps` and `anchors` in stories.json.
They are never stored twice. The app's loader (app/src/lib/series.ts and lead-format.ts) mirrors these rules, and
app/scripts/check-data.mjs checks that both produce the same values.
"""
import json, os, re, collections

H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))          # 06-series-architecture
D = os.path.join(H, "data")
CONTENT = os.path.dirname(H)
REPO = os.path.dirname(CONTENT)
LEADS_DIR = os.path.join(CONTENT, "05-story-leads")
IDEAS_DIR = os.path.join(CONTENT, "03-idea-bank", "ideas")

# --------------------------------------------------------------------------------------------------------------
# Lead cards
# --------------------------------------------------------------------------------------------------------------

LEAD_FILE_RE = re.compile(r"^(SL-SQ\d{2}-\d{3}).*\.md$")

# Optional review fields on a lead card. Absent means the conservative default; nothing is inferred from prose.
REVIEW_DEFAULTS = {
    "subject_identified": "no",          # no | yes
    "consent_status": "none",            # none | partial | documented
    "filming_access": "none",            # none | requested | confirmed
    "claim_review": "not reviewed",      # not reviewed | partly supported | supported | contradicted
}
REVIEW_VALUES = {
    "subject_identified": ["no", "yes"],
    "consent_status": ["none", "partial", "documented"],
    "filming_access": ["none", "requested", "confirmed"],
    "claim_review": ["not reviewed", "partly supported", "supported", "contradicted"],
}


def _read(p):
    return open(p, encoding="utf-8").read().replace("\r\n", "\n")


def parse_front_matter(text):
    m = re.match(r"^---\n(.*?)\n---\n?(.*)$", text, re.S)
    if not m:
        return {}, text
    fm = {}
    for line in m.group(1).split("\n"):
        mm = re.match(r"^([A-Za-z_][\w-]*):\s*(.*)$", line)
        if not mm:
            continue
        val = re.sub(r"\s+#.*$", "", mm.group(2)).strip()
        if val.startswith("[") and val.endswith("]"):
            val = [x.strip().strip("'\"") for x in val[1:-1].split(",") if x.strip()]
        else:
            val = val.strip("'\"")
        fm[mm.group(1)] = val
    return fm, m.group(2)


def split_sections(body):
    out, cur, buf = collections.OrderedDict(), None, []
    for line in body.split("\n"):
        m = re.match(r"^##\s+(\d+)\.\s+(.+)$", line)
        if m:
            if cur is not None:
                out[cur] = "\n".join(buf).strip()
            cur, buf = int(m.group(1)), []
        elif cur is not None:
            buf.append(line)
    if cur is not None:
        out[cur] = "\n".join(buf).strip()
    return out


def _paras(s):
    return [p.strip() for p in re.split(r"\n\s*\n", s or "") if p.strip()]


def _table(s):
    rows = []
    for line in (s or "").split("\n"):
        if not line.startswith("|") or re.match(r"^\|\s*-", line):
            continue
        rows.append([c.strip() for c in line.strip().strip("|").split(" | ")])
    return rows[1:] if rows else []          # drop the header row


def _line(s, label):
    m = re.search(r"\*\*%s:\*\*\s*(.*)" % re.escape(label), s or "")
    return m.group(1).strip() if m else ""


def source_review(notes):
    """'opened' only when the card says so explicitly. Anything else is a search result."""
    n = (notes or "").lower()
    if "not opened" in n or "search result only" in n:
        return "search-only"
    if re.search(r"opened and (read|checked)", n):
        return "opened"
    return "search-only"


def parse_lead_card(path):
    text = _read(path)
    fm, body = parse_front_matter(text)
    secs = split_sections(body)
    title = ""
    m = re.search(r"^#\s+.+?—\s*(.+)$", body, re.M)
    if m:
        title = m.group(1).strip()

    s2 = _paras(secs.get(2, ""))
    subject = s2[0] if s2 and not s2[0].startswith("-") else ""

    place = district = province = ""
    pl = _line(secs.get(3, ""), "Place")
    mm = re.match(r"^(.*)\s\(([^;()]*);\s*([^()]*?)\s+province\)$", pl)
    if mm:
        place, district, province = mm.group(1).strip(), mm.group(2).strip(), mm.group(3).strip()
    else:
        place = pl

    s5 = _paras(secs.get(5, ""))
    if s5 and s5[0].startswith("Every point below"):
        s5 = s5[1:]
    situation = "\n\n".join(s5)

    s9 = _paras(secs.get(9, ""))
    if s9 and s9[0].startswith("**Nothing below"):
        s9 = s9[1:]
    activity = "\n\n".join(s9)

    sources = []
    for r in _table(secs.get(18, "")):
        if len(r) < 5 or not re.match(r"^S\d+", r[0]):
            continue
        url = re.search(r"<([^>]+)>", r[2])
        sources.append(dict(ref=r[0], type=r[1], url=url.group(1) if url else r[2], accessed=r[3], notes=r[4],
                            review=source_review(r[4])))
    claims = []
    for r in _table(secs.get(11, "")):
        if len(r) < 5 or not re.match(r"^F\d+", r[0]):
            continue
        claims.append(dict(ref=r[0], claim=r[1], source=r[2], checked=r[3], how=r[4]))
    unresolved = ""
    for r in _table(secs.get(13, "")):
        if r and r[0] == "U1" and len(r) > 1:
            unresolved = r[1]
    s15 = secs.get(15, "")
    s17 = secs.get(17, "")
    ethics = s17.split("\n|")[0].strip() if s17 else ""
    s19 = secs.get(19, "")
    story_m = re.search(r"\*\*Series-architecture story ID:\*\*\s*`(ST-\d{3})`", secs.get(1, ""))

    review = {k: str(fm.get(k, v) or v) for k, v in REVIEW_DEFAULTS.items()}
    return dict(
        lead_id=fm.get("lead_id", ""), file=os.path.relpath(path, REPO).replace(os.sep, "/"), title=title,
        sq=fm.get("shortlist_question", ""), primary_idea=fm.get("lead_idea_id", ""),
        supporting_ideas=fm.get("supporting_idea_ids", []) or [], territory=fm.get("human_territory", ""),
        research_status=fm.get("research_status", "unverified"),
        screenplay_readiness=fm.get("screenplay_readiness", "not ready"),
        subject=subject, place=place, district=district, province=province, situation=situation,
        change=secs.get(6, ""), activity=activity, sources=sources, claims=claims, unresolved=unresolved,
        contact_made=_line(s15, "Contact made"), access=_line(s15, "Gatekeepers or permissions needed"),
        access_level=_line(s15, "Current access level"), ethics=ethics,
        next_action=_line(s19, "Action"), next_owner=_line(s19, "Owner"), next_by=_line(s19, "By (date)"),
        hold_reason=secs.get(21, ""), card_story_id=story_m.group(1) if story_m else "",
        sections=secs, **review)


def load_lead_cards():
    out = {}
    for f in sorted(os.listdir(LEADS_DIR)):
        m = LEAD_FILE_RE.match(f)
        if not m:
            continue
        c = parse_lead_card(os.path.join(LEADS_DIR, f))
        if c["lead_id"] == m.group(1):
            out[c["lead_id"]] = c
    return out


# --------------------------------------------------------------------------------------------------------------
# Idea bank
# --------------------------------------------------------------------------------------------------------------

def load_ideas():
    out = {}
    for f in sorted(os.listdir(IDEAS_DIR)):
        if not f.endswith(".md"):
            continue
        t = _read(os.path.join(IDEAS_DIR, f))
        fm, body = parse_front_matter(t)
        i = fm.get("id", "")

        def sec(name):
            m = re.search(r"^## %s\s*\n+(.*?)(?=\n## |\Z)" % re.escape(name), body, re.S | re.M)
            return m.group(1) if m else ""
        sc = fm.get("supporting_concepts", [])
        out[i] = dict(id=i, title=str(fm.get("title", "")).strip('"'), status=fm.get("status", ""),
                      primary_concept=fm.get("primary_concept", ""),
                      supporting_concepts=re.findall(r"C\d{3}", " ".join(sc) if isinstance(sc, list) else sc),
                      question=" ".join(sec("Open human question").split("\n\n")[0].split()),
                      limits=" ".join(sec("Limits and alternatives").split()),
                      core=" ".join(sec("Core idea").split("\n\n")[0].split()))
    return out


# --------------------------------------------------------------------------------------------------------------
# Readiness ladder: seven separate questions, never inferred from prose
# --------------------------------------------------------------------------------------------------------------

LADDER = [
    ("found", "Source found through search"),
    ("opened", "Source opened and checked"),
    ("claim", "Claim supported"),
    ("subject", "Subject identified"),
    ("consent", "Consent confirmed"),
    ("access", "Filming access confirmed"),
    ("ready", "Ready for production"),
]


def ladder(lead):
    src = lead["sources"] if lead else []
    opened = sum(1 for s in src if s["review"] == "opened")
    met = {
        "found": len(src) > 0,
        "opened": len(src) > 0 and opened == len(src),
        "claim": bool(lead) and lead["claim_review"] == "supported",
        "subject": bool(lead) and lead["subject_identified"] == "yes",
        "consent": bool(lead) and lead["consent_status"] == "documented",
        "access": bool(lead) and lead["filming_access"] == "confirmed",
    }
    met["ready"] = all(met.values()) and bool(lead) and lead["research_status"] == "verified" \
        and lead["screenplay_readiness"] == "ready for selection review"
    stage = 0
    for k, _ in LADDER:
        if not met[k]:
            break
        stage += 1
    out_of_order = [LADDER[i][1] for i in range(stage + 1, len(LADDER)) if met[LADDER[i][0]]]
    return dict(met=met, stage=stage, stage_label=LADDER[stage - 1][1] if stage else "No source recorded",
                opened=opened, total=len(src), out_of_order=out_of_order)


# --------------------------------------------------------------------------------------------------------------
# Connections
# --------------------------------------------------------------------------------------------------------------

FAMILY = {
    "philosophical contrast": "philosophical", "philosophical development": "philosophical",
    "shared human question": "philosophical",
    "chronological continuation": "chronological", "context revealed later": "chronological",
    "object continuity": "continuity", "revisited person or place": "continuity", "visual or sound echo": "continuity",
}
CX_STATUSES = ["proposal", "source-reported", "source-checked"]


# --------------------------------------------------------------------------------------------------------------
# Everything together
# --------------------------------------------------------------------------------------------------------------

def load():
    S = json.load(open(os.path.join(D, "stories.json"), encoding="utf-8"))
    CX = json.load(open(os.path.join(D, "connections.json"), encoding="utf-8"))
    cards = load_lead_cards()
    ideas = load_ideas()
    archive = {l["lead_id"]: l for l in json.load(open(os.path.join(D, "leads.json"), encoding="utf-8"))}

    anchors = S["anchors"]
    stories = collections.OrderedDict()
    ep = 2
    for s in S["seasons"]:
        for pos, lid in enumerate(s["eps"], 1):
            base = S["stories"][lid]
            lead = cards.get(lid)
            st = dict(base)
            st.update(episode=ep, season=s["id"], pos_in_season=pos, season_len=len(s["eps"]),
                      season_piece=s.get("piece", ""), anchor="yes" if lid in anchors else "no",
                      lead=lead)
            for k in ("title", "sq", "primary_idea", "supporting_ideas", "territory", "place", "district", "province",
                      "situation", "change", "activity", "unresolved", "access", "ethics", "sources", "subject",
                      "research_status", "subject_identified", "consent_status", "filming_access", "claim_review"):
                if k == "title":
                    continue                     # the working title belongs to the story
                st[k] = lead[k] if lead else ([] if k in ("supporting_ideas", "sources") else "")
            st["ladder"] = ladder(lead)
            stories[base["story_id"]] = st
            ep += 1
    for sid, st in stories.items():
        st["connections"] = [x for x in CX if sid in (x["from_id"], x["to_id"])]
    return dict(raw=S, CX=CX, cards=cards, ideas=ideas, archive=archive, stories=stories,
                seasons=S["seasons"], phases=S["phases"], anchors=anchors, segments=S["segments"],
                rejected=S["rejected"], conflicts=S.get("calendar_conflicts", []),
                lead_of={v["story_id"]: v["lead_id"] for v in stories.values()},
                sid_of={v["lead_id"]: v["story_id"] for v in stories.values()})


# --------------------------------------------------------------------------------------------------------------
# Needs attention: generated from records only
# --------------------------------------------------------------------------------------------------------------

ISSUE_TYPES = [
    ("premise", "Incomplete premise"),
    ("unverified-lead", "Core situation not yet evidenced"),
    ("subject", "Subject not identified"),
    ("sources", "Sources not opened"),
    ("claim", "Claim awaiting verification"),
    ("access", "Access unknown"),
    ("continuity", "Continuity claim not yet supported"),
    ("calendar", "Calendar conflict"),
    ("reference", "Broken idea or lead reference"),
    ("next-action", "Next action missing or unassigned"),
    ("order", "Status recorded out of order"),
]


def premise_problem(st):
    p = (st.get("premise") or "").strip()
    sit = (st.get("situation") or "").strip()
    if not p:
        return "No premise recorded."
    if not re.search(r"[.!?][\"'”’)]?$", p):
        return "Premise does not end with a full sentence."
    if sit and len(p) < len(sit) and sit.startswith(p):
        return "Premise is a mechanical cut of the situation text."
    if len(p.split()) > 60:
        return "Premise is longer than 60 words."
    return ""


def issues_for(st, data):
    out = []
    add = lambda code, detail: out.append(dict(code=code, detail=detail))
    lead, lad = st["lead"], st["ladder"]
    pp = premise_problem(st)
    if pp:
        add("premise", pp)
    if st.get("candidate_status") in ("direction", "unverified-lead"):
        add("unverified-lead", "Candidate status is `%s`. %s" % (st["candidate_status"], st.get("unresolved") or ""))
    if not lead:
        add("reference", "No lead card found for %s." % st["lead_id"])
        return out
    if lead["card_story_id"] and lead["card_story_id"] != st["story_id"]:
        add("reference", "Lead card names %s, but this story is %s." % (lead["card_story_id"], st["story_id"]))
    ideas = data["ideas"]
    for i in [lead["primary_idea"]] + list(lead["supporting_ideas"]):
        if i not in ideas:
            add("reference", "Idea %s does not exist in the idea bank." % i)
        elif ideas[i]["status"] != "accepted for research":
            add("reference", "Idea %s is `%s`, not accepted for research." % (i, ideas[i]["status"]))
    if lead["subject_identified"] != "yes":
        add("subject", "No individual, family or group has been identified or contacted.")
    if lad["opened"] < lad["total"]:
        add("sources", "%d of %d cited sources opened and checked." % (lad["opened"], lad["total"]))
    if lead["claim_review"] != "supported":
        add("claim", "Core claim review: %s." % lead["claim_review"])
    if lead["filming_access"] != "confirmed":
        add("access", "Filming access: %s. Contact made: %s." % (lead["filming_access"], lead["contact_made"] or "not recorded"))
    for x in st["connections"]:
        if x["status"] == "source-reported":
            add("continuity", "%s rests on sources that have not been opened and checked." % x["id"])
        elif FAMILY.get(x["type"]) in ("continuity", "chronological") and x["status"] == "proposal":
            add("continuity", "%s is a proposal that depends on work not yet done: %s" % (x["id"], x.get("required") or "not stated"))
    for c in data["conflicts"]:
        if st["story_id"] in c.get("stories", []) and c.get("status") != "resolved":
            add("calendar", "%s: %s" % (c["id"], c["title"]))
    if not lead["next_action"]:
        add("next-action", "Section 19 has no next research action.")
    elif lead["next_owner"] in ("", "unassigned") or lead["next_by"] in ("", "unassigned"):
        add("next-action", "Next action has no owner or date (owner: %s; by: %s)." % (lead["next_owner"] or "none", lead["next_by"] or "none"))
    for step in lad["out_of_order"]:
        add("order", "“%s” is recorded while an earlier step is not met." % step)
    return out


def main_missing(st):
    lad = st["ladder"]
    if st.get("candidate_status") in ("direction", "unverified-lead"):
        return "Confirm the core situation (unverified lead)"
    if lad["stage"] >= len(LADDER):
        return "Nothing recorded as missing"
    key, label = LADDER[lad["stage"]]
    if key == "opened":
        return "Open and check sources (%d of %d opened)" % (lad["opened"], lad["total"])
    return {"found": "Find a source", "claim": "Check the core claim", "subject": "Identify a subject",
            "consent": "Obtain and document consent", "access": "Confirm filming access",
            "ready": "Human selection decision"}[key]
