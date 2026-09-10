# Items needing a second look before the file is considered final

Each was transcribed as printed (or flagged uncertain in-file); none was
silently "fixed". Re-verify against the scan at high magnification.

Rebuilt 2026-09-09 after this file was lost from `.book4-build/` — cause
unknown, not diagnosed. Contents reconstructed from the transcription agents'
reports, so treat it as complete for everything reported up to page 341 and
add to it as later ranges land.

## CONFIRMED DEFECT IN THE PRE-EXISTING PAGES 1-143

- **p101** — the whole bottom half of the page is missing from the original
  transcription: two complete display-headed sections, `වායෝ කසිණ භාවනාව`
  and `නීල කසිණ භාවනාව`. Verified against the scan — p101 ends mid-sentence at
  `...මැද සිදුරෙන්` and p102 genuinely opens with the `පීත කසිණය` heading, so
  the continuation is nowhere in the file.
  Found by `integrity.py`'s seam check, **not** by boundary sampling — the page
  markers were all correct, only the content was short. This is why pages
  1–143 need a full audit rather than spot checks, and why re-transcribing
  that range is probably safer than checking it.

## SYSTEMATIC: `ො` vs `ෝ` — the type is now decidable

**A validated diagnostic exists.** `ෝ` = `ෙ` + `ා` **plus a short raised
diagonal tick above the right arm of the `ා`**; short `ො` has no tick.
Calibration pair on pdf 372, same line size and inking: `හෝ` shows the tick,
`මනොමය` does not. Confirmed by inspection at 2400px crop width.

Applying the test to the disputed word on p351: `ආපො` has **no tick** — the
1964 type sets the **short** form there.

**But that is a question about the type, not about what the file should say.**
Modern standard Sinhala orthography is `ආපෝ` / `තෙජෝ` / `වායෝ`. The owner has
said the form is "not short", which is correct as orthography. So there are two
defensible policies and it is the owner's call:

- **transcribe as printed** (short where the type has no tick) — what the
  project's brief currently mandates, and what pages 1-354 mostly do; or
- **normalise to standard orthography** (long throughout) — cleaner for study
  use, at the cost of no longer being a verbatim record of this printing.

Until that is decided, **nothing has been normalised in either direction.**
Current counts in the merged file: `තෙජෝ` 16, `ආපෝ` 6, `වායෝ` 9, `තේජෝ` 2,
`තේජො` 2 against short forms in the hundreds. Whichever policy is chosen, the
minority forms need sweeping to match it.

## Unresolved on p353 (my own pass, flagged rather than guessed)

- `පරම සම්බාධ වූ, ___ ප්‍රතිලාභයට යෝග්‍ය වූ නවවන ක්ෂණයයි` — I read `අෂ්ට`,
  the second pass read `අත්ථි`. Neither is obviously right in context.
  Not yet magnified.
- `එබදු ___ අදහස්` — the type appears to set `උදර`; I wrote `උදාර` on the
  grounds that `උදර අදහස්` is not a phrase. Not verified by crop.

Settled on p353 by magnification: `ප්‍රඥනා` (not `ප්‍රාර්ථනා` — its ඥ matches
the ඥ of `අභිඥවන්` beside it); `පූර්හේතු` (repha over හ — **both** passes were
wrong, one guessing `පුබ්හේතු`, the other `පුරිමහේතු`); `කරන්තේ`/`උපදවන්තේ`
(the book really does use the archaic -න්තේ: corpus has කරන්තේ 34, වන්තේ 49).

## Genuinely uncertain readings

- **p285** `චිත්තයාගේ ___ ක්‍රියා ය` — written as `සැඥනොවූ`, glyph-by-glyph
  ස + ැ + ඥ්/ඤ් + නො + වූ. The transcriber explicitly asked for a second eye.
  Highest priority.
- **p291** Pāli gāthā of the aṭṭhārasa buddhadhammā — badly degraded; several
  word divisions remain doubtful even after anchoring to the standard formula.
- **p282** — ink blot over one glyph in each of the first two lines
  (`සිය▮ගණනින්`, `මිනිසුන්▮කැ යුතු`).
- **p326** `හිතනිපාදදී` in `යම්සේ ___ වශයෙන් සිටවන ලද කණුද` — flagged inline
  by the transcriber as genuinely unclear.

## Seam conflict between adjacent chunks

- **p179 last words** — the 177–179 agent reports `...යට හනුයෙහි සමය`;
  the 180–188 agent quoted it as `...යටි හනුයෙහි සමය`. `යට` vs `යටි`.
  Settle against the image.

## Unfamiliar but crisply-printed words (left as printed, no in-file comment)

- **p314** `එවිකායෙන්` in `පාත්‍රය එවිකායෙන් මෑතට ගෙණ` — glyphs unambiguous,
  word unfamiliar. Wants a lexical check, not a re-read of the scan.

## Printer's errors transcribed as printed — do NOT "correct" these

- p155 `ප්‍රසිද්ධ දූ` where sense requires `වූ`.
- p231 `ආශ්වාස` where the pattern requires `ප්‍රශ්වාස`.
- p250 `බල ඇති ඇති ඔහු` — `ඇති` really is set twice.
- p277 counts: 20 anodhiso + 28 odhiso + 280 disā stated as totalling 480
  (`සාරසිය අසුවක්`); the arithmetic gives 328.
- p280 anisaṃsa list numbered 7, 8, **8**, 10 (the second `8` should be 9).
- p291 `කුළුණු` in items 1–3 vs `කරුණු` in the item-4 recap.
- p292 arūpa-jhāna list numbered 1, 2, 3, **3**.
- p298 `අරූප පමාපත්තියට` — ප set for ස, confirmed against a correctly-set
  `සමාපත්තියට` two lines above.
- p301 — full stop missing after `සිත සමාහිත වෙයි` before `ඉදින්`; the
  parallel sentence on p299 does carry it.
- p306 `තැරවී` where sense requires `තැවරී`.
- p312 `ඛාසිත` where standard orthography is `ඛායිත`; the neighbouring
  `සායිත` uses a clearly different glyph.
- p328 — the second of four methods is printed `1.`, repeating the first
  method's number; the third and fourth are correctly `3.` and `4.`.
- p345 — compound set as `මහන්තභාතුභාවාදි`; transcribed as the standard
  `මහන්තභූතභාවාදී` with an inline note.

## Ranges transcribed before the crop.py race was fixed

Concurrent agents were overwriting each other's magnified crops, so some
glyphs there were resolved from the band images plus standard orthography
rather than from magnification. Worth a verification pass:

144–152, 153–161, 162–170, 171–176, 180–188, 189–194, 198–203,
207–215, 216–224, 225–233, 234–242, 243–251, 252–260.

## Done

- Heading depth drift — fixed 2026-09-09. Three `###` display headings in the
  rebuilt range (`ආනා පාන සතිය වඩන පිළිවෙල` p202, `ද්විතීය චතුෂ්කය` p225,
  `තෘතීය චතුෂ්කය` p230) normalised to `##`. The `ආනා පාන සතිය` heading was
  checked against the scan and is a full-size centred display heading.
  All remaining `###`/`####` are legitimate front-matter nesting in 1–143.
- Seams 244→245 and 29/39 — checked against the scan, false positives.
  p244 genuinely ends without a full stop.
