# -*- coding: utf-8 -*-
"""Diff two independent transcription passes of the same pages.

usage: python3 diffpass.py [first] [last]

Pass A lives in chunks/, pass B in chunksB/. For every page present in both,
the two texts are compared word by word; pages that agree exactly are reported
as clean, pages that differ get their disagreements listed so they can be
adjudicated against the scan.

This is the double-keying check: the error class that matters here is a real
Sinhala word misread as a different real Sinhala word, which no structural
check can see. Two independent reads disagreeing is the signal.
"""
import difflib
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
A = os.path.join(HERE, 'chunks')
B = os.path.join(HERE, 'chunksB')
MARK = re.compile(r'^<!-- pdf:(\d+) \| printed:([^>]*?) -->[ \t]*$', re.M)

# HTML comments are each pass's own editorial notes; they legitimately differ
COMMENT = re.compile(r'<!--.*?-->', re.S)


def load(d):
    pages = {}
    if not os.path.isdir(d):
        return pages
    for n in sorted(os.listdir(d)):
        if not re.match(r'^c\d+_\d+\.md$', n):
            continue
        text = open(os.path.join(d, n), encoding='utf-8').read()
        ms = list(MARK.finditer(text))
        for i, m in enumerate(ms):
            e = ms[i + 1].start() if i + 1 < len(ms) else len(text)
            pages[int(m.group(1))] = text[m.end():e].strip()
    return pages


def norm(t):
    t = COMMENT.sub(' ', t)
    return t.split()


def main():
    first = int(sys.argv[1]) if len(sys.argv) > 1 else 0
    last = int(sys.argv[2]) if len(sys.argv) > 2 else 10 ** 9
    a, b = load(A), load(B)
    both = sorted(p for p in a if p in b and first <= p <= last)
    only_a = sorted(p for p in a if p not in b and first <= p <= last)
    only_b = sorted(p for p in b if p not in a and first <= p <= last)

    if not both:
        print('no pages present in both passes for %d-%d' % (first, last))
        if only_a:
            print('pass A only: %s' % only_a)
        if only_b:
            print('pass B only: %s' % only_b)
        return 0

    clean, dirty, total_diffs = [], [], 0
    report = []
    for p in both:
        wa, wb = norm(a[p]), norm(b[p])
        if wa == wb:
            clean.append(p)
            continue
        dirty.append(p)
        sm = difflib.SequenceMatcher(a=wa, b=wb, autojunk=False)
        items = []
        for tag, i1, i2, j1, j2 in sm.get_opcodes():
            if tag == 'equal':
                continue
            ctx = ' '.join(wa[max(0, i1 - 4):i1])
            items.append((tag, ctx, ' '.join(wa[i1:i2]), ' '.join(wb[j1:j2])))
        total_diffs += len(items)
        report.append((p, items))

    print('pages compared : %d  (%d-%d)' % (len(both), both[0], both[-1]))
    print('identical      : %d' % len(clean))
    print('with differences: %d' % len(dirty))
    print('total diff spans: %d' % total_diffs)
    if both:
        wc = sum(len(norm(a[p])) for p in both)
        print('word count (A) : %d' % wc)
        print('disagreement   : %.3f%% of words' % (100.0 * total_diffs / max(1, wc)))
    if only_a:
        print('pass A only    : %s' % only_a)
    if only_b:
        print('pass B only    : %s' % only_b)
    print()
    for p, items in report:
        print('--- page %d : %d difference(s)' % (p, len(items)))
        for tag, ctx, x, y in items:
            print('    after: ...%s' % ctx)
            print('      A: %s' % (x if x else '(nothing)'))
            print('      B: %s' % (y if y else '(nothing)'))
    return 0


if __name__ == '__main__':
    sys.exit(main())
