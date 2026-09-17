# SPLITTING A BOOK MARKDOWN INTO CONCEPT SOURCES

**Scope:** taking one finished book Markdown file (produced by
*PDF to Markdown Extraction Guide*) and distributing its content into
`Notes/Ideas/<Chapter>/<Concept ...>/sources/`.

The output is one new file per concept, named after the book
(e.g. `Abhidhammattha Pradeepika.md`), sitting beside the existing `data.md`.

---

## 0. Ground rules

- **Never modify the source book `.md`.** Verify its byte count and hash before
  and after; they must be identical.
- **Never modify any existing `data.md`.** Those come from a different source
  book and are the reference for what each concept means.
- Add only new files. Do not rename or move existing folders.
- Ignore any images inside `sources/` — they are unrelated to this task.
- The extract is a **verbatim copy** of the relevant passage, not a summary.

---

## 1. Decide which part of the book to use

Many Abhidhamma books present the same chapter three times:

1. the Pāli root text,
2. a literal Sinhala rendering of the root (`භාවය`),
3. the Sinhala commentary (the actual explanation).

**Confirm with the user which pass they want.** For this project it is the
**commentary only** — never the Pāli root, never the භාවය rendering.

Find where each pass begins by listing the top-level headings with line numbers:

```bash
grep -n '^## ' "BOOK.md"
```

Record the commentary span for each chapter as a **line range**, not a page
range. You will need `[start_line, end_line)` per chapter.

Watch the chapter end: the last commentary line usually sits a few lines before
the next chapter's `---` separator and Pāli title. Ending on the wrong line
silently pulls Pāli text into the last concept of every chapter.

---

## 2. Map the book's internal structure

List every heading inside the commentary spans with its line number:

```bash
awk '
/^<!-- pdf:[0-9]+/ { match($0,/pdf:[0-9]+/); p=substr($0,RSTART+4,RLENGTH-4)+0 }
/^#{3,5} / { if (p>=LO && p<=HI) printf "%-6d p%-4s %s\n", NR, p, $0 }
' "BOOK.md"
```

Do this at levels `###`, `####` **and** `#####`. Sub-sub-headings often carry
the real topic boundaries; missing them produces slices that are too coarse.

---

## 3. THE CRITICAL RULE — cut at meaning, not at page

**A single scanned page frequently holds the end of one topic and the start of
the next.** Slicing by page number will put the wrong half in the wrong concept.

Real example from Book 1: page 28 opens with the closing paragraph of the
prajñapti/paramattha discussion (belongs to Concept 1) and then continues with
the `### පරමාර්ථ ධර්ම සතර` heading (belongs to Concept 2).

So:

- Define every concept's extent as **line numbers**, anchored on headings or on
  a specific paragraph.
- When a slice does not begin on a page-marker line, prepend a notice so the
  reader knows the cut point:

```markdown
<!-- මෙම කොටස pdf:28 (මුද්‍රිත 17) පිටුව මැදින් ආරම්භ වේ -->
```

- Keep all `<!-- pdf:N -->` markers that fall inside the slice, for traceability.

Boundaries that were wrong at page level in Book 1, and had to be cut mid-page:
the citta-kkhaṇa passage, the ārammaṇa classification versus the vīthi symbol
table (same page), the three manodvāra topics, and the four chapter-end pages
that share a page with the next chapter's Pāli.

---

## 4. Route by meaning, and verify each destination

Chapter and section names repeat throughout these books, so **never match on
title alone.**

Before assigning a passage to a concept, read that concept's existing
`data.md` and check what it actually covers:

```bash
grep -E '^#{1,3} ' "Notes/Ideas/Chapter N/Concept M - .../sources/data.md"
```

This test repeatedly changed the answer during Book 1:

- Concepts 46 and 47 looked interchangeable by title. `data.md` showed
  Concept 46 is the vibhūta/avibhūta vīthis with diagrams and Concept 47 is the
  occasions — the opposite of the first assignment.
- Concept 43's `data.md` contains a section headed **නියාම ධර්ම**, which is what
  established that අර්පණා නියමය belongs there with the other niyama rules.
- Concept 48's `data.md` states that most Abhidhamma books place maraṇāsanna and
  appanā vīthi in chapter four — which explained a whole structural mismatch
  between the two source books.

Useful cross-check for whether a topic has any home at all:

```bash
for t in TOPIC1 TOPIC2; do
  echo -n "$t -> "; grep -rl "$t" "Notes/Ideas" --include=data.md | tr '\n' ' '; echo
done
```

**Overlap is allowed** when a passage genuinely serves two concepts. Record it
deliberately rather than letting it happen by accident.

---

## 5. Do not over-fit; collect what does not match

If a passage has no genuinely matching concept, **do not force it into the
nearest one.** Put it in a single collection document at the top of the vault,
e.g. `Notes/Ideas/Abandoned - <Book>.md`, with a header explaining why each
block is there.

Then, before finalising, **sweep the remaining chapters for exact matches.**
Material that looks orphaned relative to one chapter often has a precise home in
another. In Book 1 the appanā/magga/abhiññā/nirodha sections appeared orphaned
in Chapter 4 but matched Chapter 9's concepts almost one-to-one.

If that sweep empties the collection document, delete it rather than leaving an
empty stub — and say so in your report.

---

## 6. Implementation skeleton

Keep the routing table as data, so it is reviewable and re-runnable:

```python
# concept number -> (book chapter, [(start_line, end_line), ...], reason)
MAP = {
  1: (1, [(493, 531)],  'why this passage belongs to this concept'),
  2: (1, [(531, 556)],  '...'),
  19:(2, [(2179,2229), (2797,2890)], 'two non-adjacent ranges'),
}
```

Core mechanics:

```python
# 1. index every line with the page in effect at that point
MARK = re.compile(r'^<!-- pdf:(\d+) \| printed:(.*?)-->\s*$')
page_at = [None] * (len(lines) + 2)
cp = None
for i, ln in enumerate(lines, 1):
    m = MARK.match(ln)
    if m:
        cp = int(m.group(1))
    page_at[i] = cp

# 2. slice, and announce a mid-page start
def slice_body(a, b):
    seg = lines[a-1:b-1]
    out = []
    if seg and not MARK.match(seg[0]):
        out.append('<!-- මෙම කොටස pdf:%d පිටුව මැදින් ආරම්භ වේ -->' % page_at[a])
    out.append('\n'.join(seg).strip('\n'))
    return '\n\n'.join(out)
```

Give every output file front matter recording provenance and, importantly, the
**reason** it was routed there, so a later reviewer can challenge the decision:

```markdown
---
source_book: <book title>
source_section: <chapter>
source_pages: pdf 45–46 (මුද්‍රිත 34–35)
extract_scope: සිංහල විවරණය පමණි (පාලි මූලය හෝ භාවය ඇතුළත් නොවේ)
concept: Concept 5 - ...
---

> **මෙම කොටස මෙහි ඇතුළත් වන හේතුව:** <one line>
>
> කැපීම කර ඇත්තේ ඡේද/ශීර්ෂ මට්ටමින් මිස පිටු මට්ටමින් නොවේ.
> මෙය මුල් ග්‍රන්ථයේ වචනාර්ථ පිටපතකි; සාරාංශයක් නොවේ.
```

Also emit a **source map** document listing every concept, its page range and
its routing reason, so the whole set of judgment calls can be reviewed at once.

---

## 7. Verification — audit the written files, not the map

Re-reading your own routing table proves nothing. Read the files back from disk
and check:

1. **Originals untouched.** Book `.md` byte count and hash unchanged; `data.md`
   count unchanged.
2. **Coverage.** Every non-blank commentary line appears in some concept file or
   the collection document. Report the count of unplaced lines; it should be 0,
   or only structural artefacts you can name.
3. **Purity.** No output file contains the excluded passes. Check by
   **content**, not page number:

```bash
for h in 'අභිධම්මත්ථ සඞ්ගහො' 'අභිධර්මාර්ථ සංග්‍රහය' 'පඨමො පරිච්ඡේදො'; do
  echo "$h -> $(grep -rl "$h" Notes/Ideas --include='<BOOK>.md' | wc -l)"
done
```

   Page-range checks are **not** sufficient here, because chapter-boundary pages
   are shared between two passes. Content checks are.

4. **Well-formedness.** No file with an empty or near-empty body, none missing
   front matter, none opening mid-sentence.
5. **Alignment.** Produce a table of concept title beside the headings of the
   material assigned to it, and eyeball every row. Slices with no heading of
   their own need their opening sentence checked by hand.

---

## 8. Known traps

- A "missing page" in an audit is often a page whose slice starts mid-page, so
  the literal marker is absent while the content is present. Check for the
  mid-page notice before reporting a gap.
- An "out of span" page at a chapter boundary is usually a shared page, not a
  leak. Confirm by looking at what was actually copied.
- Do not print Sinhala to a Windows console; write reports to a UTF-8 file and
  print an ASCII-safe version.
- Put patch/edit scripts in files rather than piping UTF-8 into `python -`.
- Quote all paths in shell loops — concept folder names contain spaces, and
  unquoted `find | while read` loops will silently do nothing while appearing
  to succeed.

---

## 9. Report honestly

State: how many files written; how many concepts got nothing and why; what went
to the collection document and on what evidence; and which checks you actually
ran versus assumed. If a routing decision was a judgment call, name it and offer
to move it.
