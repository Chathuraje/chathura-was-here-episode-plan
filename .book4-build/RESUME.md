# Book 4 rebuild — resume state

Stopped at the user's request after the midway checkpoint, 2026-09-09.

## Current state of the book file

`Abhidhammattha Pradeepika Book 4.md` now contains **pages 1–329** and passes
`integrity.py` with zero problems. It was 1–149 (with defects) before this
checkpoint. Backups in this directory:

- `Book4.backup.md` — the file as originally found (1–149).
- `Book4.before-checkpoint-*.md` — same content, taken immediately before the
  checkpoint was written.

## Progress

- Rebuilt and merged: **144–329**
- Transcribed but not yet merged: **330–338** (in `chunks/`)
- Remaining: **339–643** — see `TODO_RANGES.txt`

Two agents were still running when work stopped; their partial chunks
(`c333_341.md` reaching 338, `c351_359.md` reaching 353) are in `chunks/` and
are safe to use — `checkpoint.py` only ever takes a contiguous prefix, so a
partial chunk contributes its complete leading pages and nothing else.

## Why 144–643 is being rebuilt rather than appended to

The original file's markers ran 1–149 with no gaps, but its content was not
aligned with the scan past page 143:

- `pdf:145` sat about four paragraphs too early, inside the real page 144.
- The `## 5. චාගානුස්සතිය` heading and its opening paragraph were dropped.
- `pdf:148` was a spurious marker splitting real page 147 in two.
- So `pdf:149` actually held page 148's content, and the file really ended at
  148, not 149.

Pages 1–143 were kept as `head_1_143.md`, truncated immediately before the
`pdf:144` marker — a boundary verified against the scan (143 ends mid-sentence
at `... ඒ සීලය,`; 144 opens `පිට හෝ කුස හෝ නැංගාවූ ...`).

## Pages 1–143 are NOT clean — see REVIEW_QUEUE.md

The checkpoint's seam check found that **the entire bottom half of page 101 is
missing** from the original transcription: two complete display-headed
sections. Boundary sampling had missed it because the page markers were
correct and only the content was short. A full audit of 1–143 is outstanding,
and re-transcribing is probably safer than checking.

## To resume

1. Re-render images if the scratch dir is gone (~10 min, ~520 MB, not stored
   here — run from a scratch directory, the scripts locate themselves):

       python3 scripts/render.py 144 643 1500     # whole pages
       python3 scripts/bands.py  144 643          # half-page bands, the input

2. For each range in `TODO_RANGES.txt`, run a transcription agent against
   `BRIEF.md`, writing `chunks/c<lo>_<hi>.md`. Keep ranges to about 9 pages.
   **Four to five concurrent agents is the sustainable ceiling** — 16 at once
   exhausted the session limit earlier in this job.

3. Checkpoint and verify at intervals:

       python3 scripts/status.py --sync      # real coverage, from markers
       python3 scripts/checkpoint.py         # stage a contiguous prefix
       python3 scripts/integrity.py <staged file>
       python3 scripts/checkpoint.py --write # merge into the book file

   Always take a dated backup of the book file before `--write`.

## Tooling notes

- `status.py` computes coverage from the page markers actually present, never
  from chunk filenames — an agent names its file for the full assigned range
  from its first write, so filenames overstate progress.
- `integrity.py` checks markers, the `printed = pdf - 19` formula, empty and
  short pages, seam continuity, heading levels, paragraphs duplicated across a
  chunk boundary, scratch-path and watermark leakage, and encoding hygiene.
  Its seam warnings include false positives (a page legitimately ending
  without a full stop); check each against the scan before acting.
- `crop.py` writes a unique filename per invocation. Delete crops by exact
  name — a glob on the pid suffix can match another agent's files.

## Note on this directory

`REVIEW_QUEUE.md`, `RESUME.md`, `BRIEF.md`, `head_1_143.md`, `Book4.backup.md`
and `scripts/` disappeared from this directory once during the run, around the
time of the checkpoint write; the cause was not diagnosed. Everything was
restored from the scratch copies except `REVIEW_QUEUE.md`, which was rebuilt
from the agents' reports. If files go missing again, the scratch directory is
the fallback — and if it too is gone, only `chunks/` and the book file matter.
