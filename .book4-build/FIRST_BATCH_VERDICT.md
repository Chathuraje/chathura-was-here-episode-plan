# Verdict on pages 1-143 (the inherited batch): BAD — re-transcribe, do not patch

Method: `scripts/firstline.py` crops the running head plus the first two body
lines of each scanned page and stacks them in page order, so one image covers
8-12 pages. Each strip therefore carries its own printed page number, and the
question per page is simply: does the file's text for marker N begin with the
words at the top of image N?

Two earlier attempts were discarded as unreliable and should not be revived:

- **Ink-vs-character audit** (`inkaudit.py`) — flags a page that LOST text, but
  is blind to a page whose text is complete and simply belongs to a different
  page. p101 scores 1.14x the median, i.e. perfectly normal, while actually
  holding image page 100's text. Zero flags across the rebuilt 144-362, so it
  is at least free of false positives, but it cannot see displacement.
- **Statistical offset detector** (`offsetaudit.py`) — produced three false
  "displaced" hits inside the known-good 200-362 control. Ink per character
  varies too much between prose, verse, headings and tables for a five-page
  window to discriminate a one-page shift. Not trustworthy.

## Confirmed defects

**pdf 99-101 — a spurious marker plus a whole page lost.**
`pdf:99` splits image page 98, which displaces everything after it by one:
file `pdf:100` holds image page 99, file `pdf:101` holds image page 100
(verified word-for-word, including the `තෙජො කසිණ භාවනාව` heading and the
identical ending `මැද සිදුරෙන්`). The offset is then cancelled by dropping
image page 101 entirely — its tejo continuation and its two display-headed
sections, `වායෝ කසිණ භාවනාව` and `නීල කසිණ භාවනාව`, are nowhere in the file.
`pdf:102` is correctly aligned again. Because the insert and the deletion
cancel, the marker count stays right and every structural check passes.

**pdf 23/24 — boundary misplaced.** Image page 24 (printed 5) opens at
numbered item 38; the file's `pdf:24` opens at item 34. Items 34-37 belong to
page 23 and have been pushed forward. `pdf:25` is aligned again.

**pdf 26/27 — boundary misplaced.** Image page 27 (printed 8) opens at item
61; the file's `pdf:27` opens at item 58.

**pdf 144-149 — found earlier, same family.** `pdf:145` placed about four
paragraphs early; the `## 5. චාගානුස්සතිය` heading and its opening paragraph
dropped; `pdf:148` a spurious split of image page 147. This is why the rebuild
started at 144.

## Scale

Sampled 18 pages across two windows (20-27 and 97-106) and found four boundary
defects and one whole-page content loss. That is roughly a **20-25% defect rate
on page boundaries**, and the defects are individually invisible to marker
counts, printed-number checks and seam heuristics, because they come in
self-cancelling pairs.

## Recommendation

Re-transcribe 1-143 rather than repairing it. At a one-in-four boundary defect
rate, every page has to be checked against the scan anyway, and checking costs
almost as much as transcribing. The rebuilt 144-362 shows what the current
pipeline produces: zero ink-audit flags, clean seams, verified charts.

Keep `Book4.backup.md` regardless — it is the only copy of the original.
