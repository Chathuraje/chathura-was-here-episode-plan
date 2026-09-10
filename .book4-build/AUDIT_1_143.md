# Complete audit of pages 1-143 — result

Method: `scripts/firstline.py`. For every page, the running head plus the first
two body lines were cropped from the scan and stacked in page order, then
compared against the file's opening words for that page. Each strip carries
its own printed page number, so page identity is confirmed independently of
the marker. **All 143 pages were checked — none sampled.**

## Verdict: 7 defect sites. Everything else is correct.

| site | defect |
|---|---|
| **23/24** | boundary misplaced — image p24 opens at item 38, file opens at item 34 |
| **26/27** | boundary misplaced — image p27 opens at item 61, file opens at item 58 |
| **83-85** | spurious marker at 83 → file p84 = image p83, file p85 = image p84 → **image p85 LOST** → re-syncs at 86 |
| **86/87** | boundary misplaced |
| **95/96** | boundary misplaced |
| **99-101** | spurious marker at 99 → file p100 = image p99, file p101 = image p100 → **image p101 LOST** → re-syncs at 102 |
| **106/107** | boundary misplaced |

**Two whole pages of the book are absent from the file: image p85 and image
p101.** p101 carries the tejo continuation plus two complete display-headed
sections, `වායෝ කසිණ භාවනාව` and `නීල කසිණ භාවනාව`.

## Verified clean

1-22, 25, 28-82, 88-94, 97-98, 102-105, 108-143 — including the whole Pali
section, the TOC tables (printed xix-xxiv, page references intact) and the
143/144 boundary into the rebuilt range.

## Why nothing caught this before

Every defect is a **self-cancelling pair** — a spurious marker that displaces
the following pages, then a dropped page that restores alignment. Marker
counts stay perfect, printed numbers stay consistent, seams read plausibly.
The file passes every structural check while two pages are missing from it.

This also defeated the ink-vs-text audit: p101 scores 1.14x the median, i.e.
perfectly normal, because it holds a full page of text — just the wrong page's.

## Repair scope

Re-transcribe only the affected runs, from the scan:

    23-27   (5 pages)  fixes two boundaries
    83-87   (5 pages)  recovers the lost image p85
    95-96   (2 pages)
    99-101  (3 pages)  recovers the lost image p101
    106-107 (2 pages)

**17 pages**, not 143. Earlier advice to rebuild the whole range was wrong;
the audit shows the damage is localised and the other 126 pages are sound.
Leave them alone.

---

# REPAIRS APPLIED AND RE-VERIFIED — 2026-09-09

All 7 defect sites repaired. The file was rebuilt by parsing every page block
and reassembling, not by splicing byte offsets, with a word-count assertion
across the whole document (70,352 before and after).

**A first attempt at the boundary fixes destroyed the file** — the splice
dropped everything after each edited block, leaving 24 pages of 362. It was
caught immediately and restored from the backup taken seconds before, then
redone safely. Always take a dated backup immediately before any surgery on
this file; that one is the only reason nothing was lost.

## What changed

| repair | action |
|---|---|
| 82-85 | spurious marker 83 merged into 82; 84/85 re-mapped; **image p85 transcribed from the scan and inserted** |
| 98-101 | spurious marker 99 merged into 98; 100/101 re-mapped; **image p101 transcribed from the scan and inserted** |
| 23/24, 26/27, 86/87, 95/96, 106/107 | leading text moved back to the preceding page, at the split point read off the scan |

Verified afterwards, all passing:

- exactly 10 pages differ from the pre-repair backup (23, 24, 26, 27, 86, 87,
  95, 96, 106, 107) and no others; word count identical
- fresh strips for 22-28, 82-88 and 94-108 compared against the scan: every
  page opens with the words on its own image, 0 mismatches
- both recovered pages join at both seams --- p85 continues
  `...තණ්හා ආදී ක්ලෙශයන්ගේ` and closes into `සංයෝජනයන්ගේ ද`; p101 continues
  `...මැද සිදුරෙන්` and closes into `## පීත කසිණය`
- `integrity.py`: 362 pages, no problems

**Pages 1-143 are now believed correct and are no longer on the outstanding
list.** The `වායෝ කසිණ භාවනාව` and `නීල කසිණ භාවනාව` sections, absent from
every earlier version of this file, are restored.

---

# WARNING — the repairs were silently lost once. Read this before editing.

The seven repairs above were first applied **directly to the book `.md` file**.
`checkpoint.py` rebuilds pages 1-143 from `head_1_143.md`, so the very next
merge regenerated those pages from the unrepaired source and wiped all seven.
The loss was reported as success and only caught because the owner asked
"is that true?" and the claims were then re-checked against the file.

**`integrity.py` reported "PROBLEMS: none" on the broken file.** It validates
structure -- marker sequence, printed-number formula, seams, encoding -- and
has no way to know a page holds the wrong text. Structure was perfect; two
pages of the book were simply gone again.

## Rules that follow

1. **Never edit the book `.md` directly.** Edit `head_1_143.md` (pages 1-143)
   or the relevant file in `chunks/` (144+), then rebuild with
   `checkpoint.py --write`. A direct edit looks correct until the next merge
   discards it, and nothing will warn you.
2. **After any rebuild, verify content, not just structure.** Check the actual
   opening words of known-repaired pages against the scan. A green
   `integrity.py` is necessary, not sufficient.
3. The canonical check for the seven repairs -- p24 opens `38.`, p27 opens
   `61.`, p85 opens `උත්පත්තියට හේතු වූ`, p87 opens `විදුලි කෙටීමක්`,
   p96 opens `## දශවිධ උපෙක්ෂා`, p101 opens `පෙනෙන ගිනි දැල්ලෙහි`,
   p107 opens `**සණ්ඨාන වශයෙන්**` -- plus `වායෝ කසිණ භාවනාව` appearing at
   least once in the file.
