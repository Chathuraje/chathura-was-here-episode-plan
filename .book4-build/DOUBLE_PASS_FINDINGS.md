# Double-pass measurement — pages 339–350

Two independent transcriptions of the same pages, by agents that could not see
each other's work and used different range boundaries. Machine-diffed word by
word, each pass's own HTML comments excluded.

This is the first *measured* accuracy figure for this project. Everything
before it was assertion.

## The numbers

    pages compared      7  (339–342, 348–350)
    words (pass A)      1397
    diff spans          96
    raw disagreement    6.87% of words

Classified:

| class | spans | share |
|---|---:|---:|
| vowel / diacritic only (`තෙජෝ`/`තෙජො`, `ධාතූහු`/`ධාතුහු`) | 49 | 51.0% |
| bold or punctuation only | 9 | 9.4% |
| **substantive — different letters or words** | **38** | **39.6%** |

So the substantive disagreement rate is **38 spans / 1397 words ≈ 2.7%**.

Of those 38, many are the same systematic difference repeated:
`ප්‍රත්‍යයයෙන්` vs `ප්‍රත්‍යයෙන්` (7×), hyphen vs en-dash (3×),
`කරන`/`කරණ` (3×), `කර්ම`/`කම්ම` (3×). The genuinely different-word cases are
about a dozen.

## Adjudicated against the scan (p339)

| disputed | pass A | pass B | correct | verdict |
|---|---|---|---|---|
| shape list, 5th item | `සපිරය` | `ස්ථිරය` | `සපිරය` | **A** — glyph is ස+පි+ර+ය, crisp, no `ථ` |
| `පිටි ___ සේ` | `පිඩක්` | `පිඬක්` | `පිඩක්` | **A** |
| `ලිඞ්ගාදී` | `ලිඞ්ගාදී` | `ලිඞ්ගාදි` | `ලිඞ්ගාදී` | **A** |
| `වාතයෙන් ___ ලද` | `හමින` | `හමමන` | `හම්මන` | **NEITHER** |
| `නො ___ සේ` | `විසිදෙන` | `විහිදෙන` | `විහිදෙන` | **B** |

Note that pass A wrote a defensive HTML comment arguing for `විසිදෙන`,
magnifying the glyph and comparing it against a known `ෙද` — and was still
wrong. Confident reasoning in a transcriber's report is not evidence of a
correct reading.

## What this means

1. **Neither pass dominates.** A was right 3 of 5, B 1 of 5, and on one both
   were wrong. A second pass is not a "check" of a better first pass; the two
   are peers and the scan is the only arbiter.
2. **Single-pass work carries a real substantive error rate.** If roughly half
   of the ~2.7% substantive disagreements are errors in any given pass, a
   single pass is running at roughly **1% of words wrong** — on a ~1300-word
   page, ten or so questionable words.
3. **Pages 144–338 in the delivered file are single-pass.** They are not
   verified to the standard this measurement implies. They pass every
   structural check, and the two pages I spot-read were clean, but the
   measurement above says clean spot-reads do not establish a clean range.
4. **Half the noise is convention drift, not error.** Pinning a house style in
   the brief — `ෝ` vs `ො` in `තෙජෝ`, `කර්ම` vs `කම්ම`, whether to double the
   `ය` in `ප්‍රත්‍යයයෙන්` — would remove ~60% of the diff volume and make the
   real disagreements stand out.

## Recommendation

Do the convention-pinning first (cheap, removes most of the noise), then
double-pass. Adjudication is affordable because only the diffs need looking at
— about a dozen genuine cases per 7 pages, each settled by one magnified crop.

Whether to go back and double-pass 144–338 is a scope decision for the owner:
it means re-reading 195 already-merged pages.
