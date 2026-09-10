# -*- coding: utf-8 -*-
"""Stitch head_1_143.md + chunks/*.md into the book file and verify.

usage: python3 assemble.py [--write]

Without --write it only reports. Reports are ASCII-safe so they survive any
console encoding.
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
HEAD = os.path.join(HERE, 'head_1_143.md')
CHUNKS = os.path.join(HERE, 'chunks')
TARGET = r'/Users/ropedigital/Desktop/chathura-was-here-notes/Abhidhammattha Pradeepika Book 4.md'
LAST = 643
BODY_OFFSET = 19          # printed = pdf - 19 for the body

MARK = re.compile(r'^<!-- pdf:(\d+) \| printed:([^>]*?) -->\s*$', re.M)


def chunk_files():
    out = []
    for name in os.listdir(CHUNKS):
        m = re.match(r'^c(\d+)_(\d+)\.md$', name)
        if m:
            out.append((int(m.group(1)), int(m.group(2)), os.path.join(CHUNKS, name)))
    out.sort()
    return out


def main():
    problems = []
    head = open(HEAD, encoding='utf-8').read()
    parts = [head.rstrip('\n')]

    files = chunk_files()
    expect = 144
    for a, b, path in files:
        if a != expect:
            problems.append('RANGE GAP/OVERLAP: expected chunk starting %d, got %d-%d' % (expect, a, b))
        expect = b + 1
        parts.append(open(path, encoding='utf-8').read().strip('\n'))
    if expect != LAST + 1:
        problems.append('RANGES STOP AT %d, expected %d' % (expect - 1, LAST))

    doc = '\n\n'.join(parts) + '\n'

    nums = [int(m.group(1)) for m in MARK.finditer(doc)]
    seen = {}
    for n in nums:
        seen[n] = seen.get(n, 0) + 1
    dupes = sorted(n for n, c in seen.items() if c > 1)
    missing = [n for n in range(1, LAST + 1) if n not in seen]
    extra = sorted(n for n in seen if n < 1 or n > LAST)
    if dupes:
        problems.append('DUPLICATE page markers: %s' % dupes)
    if missing:
        problems.append('MISSING page markers: %s' % missing)
    if extra:
        problems.append('OUT-OF-RANGE page markers: %s' % extra)
    if nums != sorted(nums):
        problems.append('page markers are not in ascending order')

    # printed-number check over the body
    for m in MARK.finditer(doc):
        pdf = int(m.group(1))
        printed = m.group(2).strip()
        if pdf < 20:
            continue
        want = str(pdf - BODY_OFFSET)
        if printed != want:
            problems.append('pdf:%d says printed:%s, formula gives %s' % (pdf, printed, want))

    print('chunk files      : %d' % len(files))
    print('page markers     : %d (want %d)' % (len(nums), LAST))
    print('bytes            : %d' % len(doc.encode('utf-8')))
    print('lines            : %d' % doc.count('\n'))
    if problems:
        print('PROBLEMS (%d):' % len(problems))
        for p in problems[:60]:
            print('  - ' + p)
        if len(problems) > 60:
            print('  ... and %d more' % (len(problems) - 60))
    else:
        print('OK: all %d pages present exactly once, in order, printed numbers consistent' % LAST)

    if '--write' in sys.argv:
        if problems:
            print('REFUSING TO WRITE while problems remain')
            return 1
        open(TARGET, 'w', encoding='utf-8').write(doc)
        print('WROTE %s' % TARGET)
    return 0


if __name__ == '__main__':
    sys.exit(main())
