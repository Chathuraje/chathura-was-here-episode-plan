# What still has to happen after all 643 pages are transcribed

Kept here so it survives session loss. Nothing in this list is done.
Ordered by how badly it affects the finished text.

## 1. Audit pages 1–143 (inherited, never verified) — HIGHEST PRIORITY

These came from the original file and were kept on the strength of nine
sampled page boundaries. That sampling was not sufficient:

- **p101 is missing its entire bottom half** — two complete display-headed
  sections, `වායෝ කසිණ භාවනාව` and `නීල කසිණ භාවනාව`. Confirmed against the
  scan. The page markers were correct; only the content was short, which is
  exactly what a marker check cannot see.

Assume more of the same. Re-transcribing this range is probably safer and not
much dearer than auditing it. It is 143 pages.

## 2. Decide the accuracy standard for 144–338, and act on it

195 pages, single-pass, already merged into the book file. The double-pass
measurement on 339–350 (see `DOUBLE_PASS_FINDINGS.md`) implies a single pass
runs at roughly **1% of words carrying a questionable reading** — about ten per
page. They pass every structural check and both pages spot-read were clean,
but the measurement says clean spot-reads do not establish a clean range.

Either accept that, or double-pass the range. Owner's call; it is a scope
decision, not a technical one.

## 3. Work the REVIEW_QUEUE.md backlog

Kept separately in `REVIEW_QUEUE.md`. Three groups:

- genuinely uncertain readings flagged in-file (p285, p291, p282, p326)
- one unresolved seam conflict (p179, `යට` vs `යටි`)
- thirteen ranges transcribed before the `crop.py` race was fixed, where some
  glyphs were settled from the bands plus orthography rather than magnification

Also in there: printer's errors deliberately transcribed **as printed**. Those
are not to be "fixed" — they are the book's own.

## 4. Adjudicate every outstanding double-pass diff

Wherever `chunks/` and `chunksB/` both hold a page, run
`scripts/diffpass.py <first> <last>` and settle each substantive disagreement
against the scan with a magnified crop. Neither pass is authoritative — in the
sample, pass A won 3, pass B won 1, and on one both were wrong.

## 5. Final whole-book verification

    python3 scripts/integrity.py "<book>.md"

Must report zero problems for all 643 pages. Then re-read its NOTES: seam
warnings include false positives (a page legitimately ending without a full
stop), and each needs checking against the scan rather than dismissing.

Confirm at the end, explicitly and honestly:

1. page count transcribed, checked against the PDF's own `/Count` of 643
2. that every numeric chart was checked by row and column sums, and what was
   found (e.g. p338's chart: 173 kalāpa and 1501 rūpa, both verified; p277's
   printed total of 480 against parts summing to 328, recorded as printed)
3. any page missing from the scan or passage that could not be read
4. that ambiguous glyphs were resolved toward standard orthography

Do not claim completeness that has not been verified.

## 6. Housekeeping

- The scan lacks printed pages i–vi entirely; the conversion notes say so and
  must keep saying so.
- Keep `Book4.backup.md` (the original file as found) indefinitely.
- The rendered images (~520 MB) live only in the scratch dir and are
  regenerable from the PDF via `scripts/render.py` and `scripts/bands.py`.

## House style — tiebreakers only

Derived from frequency across pages 1–338. These apply **only when the glyph
is genuinely ambiguous**; where the type is clear, transcribe what is printed,
because the book is internally inconsistent and that inconsistency is real.

| form | use | counts |
|---|---|---|
| `ප්‍රත්‍යයෙන්` | not `ප්‍රත්‍යයයෙන්` | 11 vs 0 |
| `ඕජා` | not `ඔජා` | 5 vs 0 |
| `භෙද` | not `භේද` | 54 vs 1 |
| `ධාතූහු` | not `ධාතුහු` | 17 vs 7 |
| `තෙජො` / `ආපො` / `වායො` | short `ො` | ~2:1 each |

`ආදි`/`ආදී` (155 vs 129) and `කර්ම`/`කම්ම` (185 vs 106) are genuinely mixed in
the original — read them off the page, do not normalise.
