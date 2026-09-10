# -*- coding: utf-8 -*-
"""Full integrity check for the assembled Book 4 markdown.

usage: python3 integrity.py <file.md> [--last N]

Checks, in order of how badly each would corrupt the book:

  1. page markers          present exactly once, ascending, no gaps
  2. printed numbers       printed = pdf - 19 across the body
  3. empty pages           a marker with no text under it
  4. seams                 a page ending mid-sentence must be followed by a
                           page starting lower-case/continuation, and a page
                           ending on a full stop should not be followed by an
                           obvious mid-sentence fragment
  5. heading levels        display headings should be ## (pages 1-143 style);
                           reports ### and #### so drift is visible
  6. duplicated text       identical long paragraphs repeated across a seam,
                           the signature of a chunk boundary transcribed twice
  7. dropped text          a page whose text is suspiciously short
  8. stray artifacts       scratch paths, crop filenames, TODO markers,
                           the distribution watermark leaking into the body
  9. encoding              stray replacement chars, NBSP, tabs

Output is ASCII-safe apart from quoted excerpts.
"""
import os
import re
import sys
import unicodedata
from collections import Counter

MARK = re.compile(r'^<!-- pdf:(\d+) \| printed:([^>]*?) -->[ \t]*$', re.M)
BODY_OFFSET = 19
SI = r'඀-෿'


def pages_of(doc):
    """[(pdf, printed, text)] in document order."""
    ms = list(MARK.finditer(doc))
    out = []
    for i, m in enumerate(ms):
        end = ms[i + 1].start() if i + 1 < len(ms) else len(doc)
        out.append((int(m.group(1)), m.group(2).strip(), doc[m.end():end].strip()))
    return out


def visible(s, n=70):
    s = ' '.join(s.split())
    return s[:n]


def main():
    path = sys.argv[1]
    last = None
    if '--last' in sys.argv:
        last = int(sys.argv[sys.argv.index('--last') + 1])
    doc = open(path, encoding='utf-8').read()
    pages = pages_of(doc)
    problems = []
    notes = []

    if not pages:
        print('FATAL: no page markers found')
        return 1
    nums = [p for p, _, _ in pages]
    if last is None:
        last = nums[-1]

    # 1. markers
    cnt = Counter(nums)
    dupes = sorted(n for n, c in cnt.items() if c > 1)
    missing = [n for n in range(1, last + 1) if n not in cnt]
    if dupes:
        problems.append('duplicate page markers: %s' % dupes)
    if missing:
        problems.append('missing page markers: %s' % missing)
    if nums != sorted(nums):
        problems.append('markers not in ascending order')

    # 2. printed numbers
    for pdf, printed, _ in pages:
        if pdf < 20:
            continue
        want = str(pdf - BODY_OFFSET)
        if printed != want:
            problems.append('pdf:%d printed:%s (formula: %s)' % (pdf, printed, want))

    # 3/7. empty or short pages
    lens = [(pdf, len(txt)) for pdf, _, txt in pages if pdf >= 20]
    for pdf, n in lens:
        if n == 0:
            problems.append('pdf:%d has NO text' % pdf)
    if lens:
        body = sorted(n for _, n in lens)
        med = body[len(body) // 2]
        for pdf, n in lens:
            if 0 < n < med * 0.35:
                notes.append('pdf:%d unusually short (%d chars vs median %d)' % (pdf, n, med))

    # 4. seams
    for i in range(len(pages) - 1):
        a_pdf, _, a = pages[i]
        b_pdf, _, b = pages[i + 1]
        if not a or not b or a_pdf < 20:
            continue
        a_tail = a.rstrip()
        b_head = b.lstrip()
        ends_sentence = a_tail.endswith(('.', '।', '"', '”', ':', '—', '–'))
        b_starts_marker = b_head.startswith(('#', '>', '|', '<!--', '**', '1.', '-'))
        if not ends_sentence and b_starts_marker and not b_head.startswith('**'):
            notes.append('seam %d->%d: page ends mid-sentence (%r) but next starts with a block element'
                         % (a_pdf, b_pdf, visible(a_tail[-40:], 40)))

    # 6. duplicated paragraphs across a seam
    for i in range(len(pages) - 1):
        a_pdf, _, a = pages[i]
        b_pdf, _, b = pages[i + 1]
        ap = [x.strip() for x in a.split('\n\n') if len(x.strip()) > 120]
        bp = [x.strip() for x in b.split('\n\n') if len(x.strip()) > 120]
        for x in ap:
            if x in bp:
                problems.append('seam %d->%d: identical paragraph appears on both pages: %r'
                                % (a_pdf, b_pdf, visible(x)))

    # 5. heading levels
    h = Counter(re.findall(r'^(#{1,6}) ', doc, re.M))
    notes.append('heading levels: ' + ', '.join('%s=%d' % (k, v) for k, v in sorted(h.items())))
    deep = re.findall(r'^(#{3,6}) +(.+)$', doc, re.M)
    if deep:
        notes.append('%d headings deeper than ##; first few: %s'
                     % (len(deep), '; '.join('%s %s' % (a, visible(b, 40)) for a, b in deep[:6])))

    # 8. stray artifacts
    for pat, label in [
        (r'/private/tmp', 'scratch path'),
        (r'crop[_\w]*\.png', 'crop filename'),
        (r'\bTODO\b', 'TODO marker'),
        (r'aathaapi\.org', 'watermark text'),
        (r'Free Distribution', 'watermark text'),
        (r'XEOF', 'heredoc sentinel'),
    ]:
        for m in re.finditer(pat, doc):
            line = doc.count('\n', 0, m.start()) + 1
            # the watermark is legitimately recorded once in the header notes
            if label == 'watermark text' and line < 60:
                continue
            problems.append('%s at line %d: %r' % (label, line, visible(m.group(0), 40)))

    # 9. encoding hygiene
    for ch, label in [('�', 'U+FFFD replacement char'),
                      (' ', 'non-breaking space'),
                      ('\t', 'tab')]:
        n = doc.count(ch)
        if n:
            problems.append('%s x%d' % (label, n))
    # unusual scripts in the body
    other = Counter()
    for c in doc:
        if unicodedata.category(c).startswith('L') and not re.match('[%s]' % SI, c) \
           and not ('a' <= c.lower() <= 'z'):
            other[c] += 1
    if other:
        notes.append('non-Sinhala non-Latin letters: %s'
                     % ', '.join('%r x%d' % (c, n) for c, n in other.most_common(8)))

    print('file        : %s' % os.path.basename(path))
    print('bytes       : %d' % len(doc.encode('utf-8')))
    print('pages       : %d (1..%d)' % (len(pages), last))
    print('body median : %d chars/page' % (med if lens else 0))
    print()
    if problems:
        print('PROBLEMS (%d)' % len(problems))
        for p in problems[:80]:
            print('  ! ' + p)
        if len(problems) > 80:
            print('  ... %d more' % (len(problems) - 80))
    else:
        print('PROBLEMS: none')
    print()
    print('NOTES (%d)' % len(notes))
    for n in notes[:40]:
        print('  - ' + n)
    if len(notes) > 40:
        print('  ... %d more' % (len(notes) - 40))
    return 1 if problems else 0


if __name__ == '__main__':
    sys.exit(main())
