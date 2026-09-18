"""Merge partial digests scratchpad/parts/<CID>-partN.json into development/digests/<CID>.json.
Usage: python3 merge_parts.py C080 [C082 ...]"""
import glob, json, os, sys, unicodedata

S = os.path.dirname(os.path.abspath(__file__)) + "/"
REPO = "/Volumes/chathura-pc/chathura-was-here-notes"
TITLES_EN = {
    "C076": "The thirty-seven requisites of enlightenment",
    "C080": "The meaning of dependent origination",
    "C082": "The Paṭṭhāna method: twenty-four conditions",
    "C085": "The compendium of meditation subjects",
    "C089": "Arising of the direct knowledges",
    "C097": "The seven purifications",
}

def uniq(seq, key=lambda x: x):
    seen, out = set(), []
    for x in seq:
        k = key(x)
        if k not in seen:
            seen.add(k)
            out.append(x)
    return out

def group_of(cid):
    for f in glob.glob(f"{REPO}/development/groups/*.json"):
        g = json.load(open(f))
        if any(c["id"] == cid for c in g["concepts"]):
            return g["id"]

def title_si(cid):
    for ch in os.listdir(f"{REPO}/content/02-concepts"):
        for c in os.listdir(f"{REPO}/content/02-concepts/{ch}"):
            n = unicodedata.normalize("NFC", c)
            if int(n.split()[1]) == int(cid[1:]):
                return n.split(" - ", 1)[1].strip()

def merge(cid):
    files = sorted(glob.glob(f"{S}parts/{cid}-part*.json"), key=lambda p: int(p.rsplit("part", 1)[1].split(".")[0]))
    parts = [json.load(open(p)) for p in files]
    if not parts:
        raise SystemExit(f"no parts for {cid}")
    # Combine line ranges per source ref.
    by_ref = {}
    for p in parts:
        for s in p["sources_read"]:
            e = by_ref.setdefault(s["ref"], {"ref": s["ref"], "path": s["path"], "ranges": [], "markers": []})
            e["ranges"].append(s["lines"])
            if s.get("markers"):
                e["markers"].append(s["markers"])
    sources = [{"ref": r["ref"], "path": r["path"], "lines": ", ".join(r["ranges"]), "complete": True,
                "markers": f"Read in {len(parts)} parts. " + " | ".join(r["markers"][:1])} for r in by_ref.values()]
    n = len(parts)
    d = {
        "schema_version": 1, "id": f"DIG-{cid}", "record_type": "concept_digest", "concept_id": cid, "group_id": group_of(cid),
        "title_si": title_si(cid), "title_en": TITLES_EN.get(cid, cid),
        "status": "draft", "version": 1, "created_at": "2026-09-18", "updated_at": "2026-09-18", "created_by": "claude", "updated_by": "claude",
        "sources_read": sources,
        "summary_en": " ".join(p["summary_en"] for p in parts),
        "sinhala_explanation": [{"heading": f"{i + 1}/{n} · {s['heading']}", "text": s["text"]} for i, p in enumerate(parts) for s in p["sinhala_explanation"]],
        "key_terms": uniq([t for p in parts for t in p["key_terms"]], key=lambda t: t["term_si"]),
        "human_interpretation_en": [s for p in parts for s in p["human_interpretation_en"]],
        "does_not_transfer": uniq([x for p in parts for x in p["does_not_transfer"]]),
        "story_seeds": [s for p in parts for s in p["story_seeds"]],
        "cross_source_notes": uniq([x for p in parts for x in p["cross_source_notes"]]),
        "uncertainties": uniq([x for p in parts for x in p["uncertainties"]]),
        "evidence_class_note": f"sinhala_explanation and summary_en = source teaching; human_interpretation_en and story_seeds = editorial interpretation; nothing here is documentary evidence. Drafted in {n} parts and merged.",
    }
    out = f"{REPO}/development/digests/{cid}.json"
    with open(out, "w", encoding="utf-8") as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(cid, f"{n} parts ->", out, len(d["sinhala_explanation"]), "sections")

for cid in sys.argv[1:]:
    merge(cid)
