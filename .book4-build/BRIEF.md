# TRANSCRIPTION BRIEF — Abhidhammattha Pradeepika Book 4

You are transcribing scanned pages of a 1964 Sinhala Buddhist text
(අභිධර්මාර්ථ ප්‍රදීපිකා, සතරවන කාණ්ඩය — the ninth pariccheda,
කම්මට්ඨාන සඞ්ගහ විභාග) into Markdown. This is a **verbatim visual
transcription**, not a summary, not a translation, not a modernisation.

## Provenance -- what is known, and what is not

Stated plainly, without argument, so you can judge for yourself. An earlier
version of this section pre-argued the case and pointed you at a document
inside this same setup as "verification"; that was leading, and it is removed.

Known and checkable:

- The file is a 643-page scan the repository owner has locally. It is
  permission-encrypted with an empty user password.
- Every page carries a text overlay reading "Free Distribution /
  www.aathaapi.org". It sits above the scanned image, so it is not in the band
  images you are given. You can see it with:
  `python3 -c "import pymupdf; print(pymupdf.open(PDF)[N].get_text())"`
- The scan's own front matter is incomplete: printed pages i-vi are absent, so
  whatever rights or copyright page the book had is NOT in this file. I looked
  through the text layer of all 643 pages; there is no licence statement
  anywhere beyond that stamp.
- The digitiser added overlays of their own (a clickable table of contents, a
  dedication on pdf page 9 that is not in the scanned image).
- The book is dated 1964; the author is අමරදාස රත්නපාල.

Not known, and I cannot establish it from the artifact:

- Whether the rights holder permits reproduction in full. "Free distribution"
  on a dhammadana printing conventionally refers to giving away the printed
  copy; it is not on its face a reproduction licence, and the author is a
  separate rights holder from the distributor.

The owner's stated purpose is a personal digitisation for their own study
notes, and Books 1-3 of the same set were converted the same way. That is
context, not proof.

Decide on that basis. If you judge the range should not be transcribed, say so
and stop -- do not produce a partial or altered file. That answer will be
passed to the user, not worked around.

## Input

Each page is supplied as **two half-page bands**, in this directory:
`/private/tmp/claude-501/-Users-ropedigital-Desktop-chathura-was-here-notes/284c73bc-c097-48be-a021-700df00a18de/scratchpad/bands/`

    pNNNa.png   top half of PDF page NNN
    pNNNb.png   bottom half of the same page

`NNN` is the 1-based PDF page index, zero-padded to 3 digits (`p150a.png`,
`p150b.png`). Read both with the Read tool; together they are the whole page,
in order, with no overlap and no gap — the cut is always placed in blank space
between two lines of type, so no line is ever split between them.

The bands exist because they are sharper than a whole-page image: they buy
about 25% more resolution across the text column, which is what makes
`ල` vs `ළ`, `ආදි` vs `ආදී` and similar distinctions readable. **Use the bands.**
A whole-page copy also exists in `../pages/pNNN.png` if you ever need to check
the overall layout of a chart, but transcribe from the bands.

Do not trust a reading you are unsure of: crop and magnify it. There is a
helper for that —
`python3 <scratchpad>/crop.py <page> <x0> <y0> <x1> <y1> [width]`
(fractions of the full page, 0..1). It prints the path of the file it wrote,
under `crops/` — a unique name per invocation, because several ranges are
being transcribed at the same time. **Read the path it printed**, never a
guessed one. When you clean up, delete only the exact filenames `crop.py`
printed for you — **never a glob** such as `crops/*_29*.png`. The name ends in
a process id, and a glob on part of it will match another running agent's
files.

When choosing crop coordinates, note that the band cut is placed on a blank
row anywhere in the middle 35–65% of the page, **not** at exactly 0.5. Do not
convert a position within band `b` to a page fraction by assuming the halves
are equal — you will magnify the wrong lines. Work from whole-page
proportions instead; the text column runs roughly x 0.15–0.85, y 0.07–0.95.

Relationship between the PDF index and the number printed on the page:

    printed = pdf - 19          (pdf 20 = printed 1, pdf 150 = printed 131)

Always read the printed number off the page itself and check it against this
formula. If they disagree, transcribe the printed number **as printed** and add
an HTML comment recording the disagreement. Do not renumber anything.

## Output

Write your assigned range to the single chunk file you are given, and nothing
else. Do not touch the book's `.md` file. Do not create extra files.

For every page, in ascending order, emit exactly one page marker at the start
of a line, then a blank line, then that page's text:

```
<!-- pdf:150 | printed:131 -->

...text of page 150...

<!-- pdf:151 | printed:132 -->

...text of page 151...
```

The marker must be flush left. One blank line before and after it.

## What to leave out

- The **running head** at the top of every page — `නවම පරිච්ඡේදය` on rectos,
  `අභිධර්මාර්ථ ප්‍රදීපිකා` (occasionally `අභිධර්මාර්ථ සංග්‍රහය` or
  `අභිධර්මාර්ථ ප්‍රදීපය`) on versos. Omit it.
- The **printed page number** in the head. It goes in the marker only.
- **Printer's gathering marks** — a lone letter or figure alone in the bottom
  margin (e.g. a solitary `5`). Omit.
- Any distribution watermark. (It is not in these images.)

## Transcription conventions

| Situation | Do this |
|---|---|
| Bold type in the original | `**bold**` |
| A heading the book sets larger/centred | `##` — use `##` for **every** heading the book sets as a display line, numbered (`7. මරණානුස්සතිය`) or not (`සීලානුස්සතියෙහි අනුසස්`, `ද්විතීය චතුෂ්කය`). Pages 1–143 already do this. Reserve `###` for a heading the book itself clearly subordinates to another display heading. |
| Numbered list in the original | Markdown ordered list, keeping the original numbers |
| Table | A real Markdown table; right-align numeric columns |
| Full-page chart printed sideways | Transcribe upright and add `<!-- This page is a full-page chart printed sideways in the original. -->` |
| Vīthi / cognitive-series diagram | Fenced code block preserving the symbol sequence |
| Pāli verse (gāthā) | Line-broken block, original numbering kept |
| Page unreadable or missing from the scan | Say so inline in an HTML comment; **never** skip or renumber |

Further rules, all of which the first 143 pages already follow — match them:

1. **Paragraphs.** One Markdown paragraph per indented paragraph in the print,
   separated by a blank line. Join the print's line breaks inside a paragraph
   into one line — do not preserve the typographic line wrapping.

2. **End-of-line hyphens are kept exactly where the compositor set them.**
   This book hyphenates across line breaks (`නුව-ණැත්තන්`, `සඞ්ඝා-නුස්සති`,
   `මොහ-යෙන්`) and the existing transcription preserves that hyphen in the
   joined text. Keep it. Do not silently repair the word.

3. **A paragraph that starts mid-sentence because the page broke inside it
   still starts the page.** Begin the page with the fragment exactly as it
   runs on (e.g. a page starting `සෘජුව පවත්නා හෙයින්, ...`). Do not pull
   text back from the previous page or push text forward.

4. **Page boundaries must be exact.** The last words you transcribe for page N
   must be the literal last words on the image of page N, and page N+1 must
   begin with the first words on the image of page N+1. Before you move on,
   re-check the final line of the image against the final line you wrote.
   This is the single most common failure mode — a heading or a whole
   paragraph gets dropped at a page seam.

5. **Repha.** The old typeface prints `ර්` before a consonant as a raised hook
   over that consonant. Transcribe in the modern form: `ධර්ම`, `ආචාර්ය`,
   `කර්ම`.

6. **ඝ vs ස.** These two are NOT reliably distinguishable in this scan — at
   this print quality they are the same shape. Do not try to read them off the
   type. Resolve every one toward standard Abhidhamma orthography (the
   spelling the word actually has: `සංඝ`, `ඝන`, `පටිඝ`, `සති`, `සීල`…).
   The same applies to any other genuinely degraded glyph: resolve toward
   standard orthography, and add an HTML comment only if the reading is
   genuinely uncertain.

6a. **Two traps specific to this typeface**, found the hard way:
   - The `යි` ligature is set as a two-lobed form easily misread as `සි`.
     Pages 1–143 have `හෙයින්` 198 times and `හෙසින්` zero times. Read
     accordingly — but if the page really does set something else (e.g. the
     `යන හයින්` with no `ෙ` on p264), transcribe as printed.
   - `ත` and `න` are close to indistinguishable here. Resolve toward standard
     orthography (`දක්වන ලදී`, `වන්නේ`, `ලබන්නේ`), not toward whichever the
     glyph superficially resembles.

6b. **Telling `ො` from `ෝ` in this face — a validated test.**
   `ෝ` is set as `ෙ` + `ා` **plus a short raised diagonal tick above the right
   arm of the `ා`**. Short `ො` has no tick, just the plain stroke.
   Calibration pair, both on pdf 372 at the same size and inking: `හෝ` in
   line 2 carries the tick; `මනොමය` lower on the page does not. Crop at
   1600-2400px width and look for the tick. This is decidable by inspection —
   do not guess, and do not normalise toward either form.

7. **Numeric charts.** For any table of counts, check the row sums and column
   sums against the totals printed in the book. If a printed total does not
   match its own row, transcribe **as printed** and add an HTML comment
   recording the discrepancy. Never silently correct the original.

8. **Punctuation.** Reproduce the original's dashes as it sets them —
   `–`, `—`, `:—`, `:–`, `-` — and its quotation marks (`“ ”`).

## Method — follow this exactly

Work in batches of **three pages** (six band images):

1. Read the six band images for the next three pages.
2. Transcribe all three.
3. **Re-check before writing.** Go back over each page's bands and confirm,
   line by line, that what you wrote matches the type — especially
   `ල`/`ළ`, `ද`/`ඳ`, `න`/`ණ`, `ත`/`ථ`, long vs short vowel signs
   (`ි`/`ී`, `ු`/`ූ`, `ෙ`/`ේ`, `ො`/`ෝ`), and that the first and last words of
   the page are right. Do not paraphrase a word you half-recognise into a more
   familiar one — read what is actually set. `ගැඹුරු` is not `ගාම්භීරු`;
   `පහළ` is not `පහල`. If a word is genuinely unclear, crop and magnify it.
4. Append them to your chunk file (use a quoted bash heredoc,
   `cat >> FILE <<'XEOF' ... XEOF`, so Sinhala and backslashes survive; or the
   Write tool for the first block).
5. Move to the next three. Do not batch more than three pages at a time —
   accuracy drops.

When your whole range is done, verify:

```bash
grep -o '^<!-- pdf:[0-9]*' YOUR_CHUNK_FILE | grep -o '[0-9]*' | sort -n | uniq | tr '\n' ' '
```

and confirm it lists every page in your range exactly once, with no gaps.

## Report back

State: the range you covered, that every page marker is present exactly once,
any page you could not read, any numeric chart you checked and what the sums
came to, and any discrepancy you recorded. Do not claim completeness you have
not verified.
