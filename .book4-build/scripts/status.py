# -*- coding: utf-8 -*-
"""Report real coverage of the Book 4 rebuild, and refresh TODO_RANGES.txt.

Coverage is computed from the page markers actually present in each chunk
file, never from the file's name -- a chunk being written by a running agent
is named for its full assigned range long before it holds it.

usage: python3 status.py [--sync]
       --sync also copies scratch chunks into the durable build dir first.
"""
import os
import re
import shutil
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SCRATCH_CHUNKS = os.path.join(HERE, 'chunks')
BUILD = r'/Users/ropedigital/Desktop/chathura-was-here-notes/.book4-build'
BUILD_CHUNKS = os.path.join(BUILD, 'chunks')
FIRST, LAST = 144, 643

MARK = re.compile(r'^<!-- pdf:(\d+)', re.M)


def runs_of(pages):
    out, s, e = [], None, None
    for p in sorted(pages):
        if s is None:
            s = e = p
        elif p == e + 1:
            e = p
        else:
            out.append((s, e)); s = e = p
    if s is not None:
        out.append((s, e))
    return out


def fmt(rs):
    return ", ".join('%d-%d' % r if r[0] != r[1] else '%d' % r[0] for r in rs)


def main():
    if '--sync' in sys.argv:
        os.makedirs(BUILD_CHUNKS, exist_ok=True)
        for n in os.listdir(SCRATCH_CHUNKS):
            if n.endswith('.md'):
                shutil.copy2(os.path.join(SCRATCH_CHUNKS, n),
                             os.path.join(BUILD_CHUNKS, n))

    have, partial = set(), []
    for n in sorted(os.listdir(BUILD_CHUNKS)):
        m = re.match(r'^c(\d+)_(\d+)\.md$', n)
        if not m:
            continue
        lo, hi = int(m.group(1)), int(m.group(2))
        text = open(os.path.join(BUILD_CHUNKS, n), encoding='utf-8').read()
        nums = [int(x) for x in MARK.findall(text)]
        # trust only a contiguous run starting at lo
        good = []
        want = lo
        for v in nums:
            if v != want:
                break
            good.append(v); want += 1
        have |= set(good)
        if good != list(range(lo, hi + 1)):
            partial.append((n, good[-1] if good else None, hi))

    todo = [p for p in range(FIRST, LAST + 1) if p not in have]
    print('done    : %d / %d' % (len(have), LAST - FIRST + 1))
    print('todo    : %d' % len(todo))
    contig = FIRST - 1
    while contig + 1 in have:
        contig += 1
    print('contig  : %d-%d' % (FIRST, contig) if contig >= FIRST else 'contig  : none')
    if partial:
        print('in-flight/partial:')
        for n, last, hi in partial:
            print('  %-16s reaches %s of %d' % (n, last, hi))
    print('todo ranges: ' + fmt(runs_of(todo)))
    with open(os.path.join(BUILD, 'TODO_RANGES.txt'), 'w') as fh:
        fh.write("\n".join('%d-%d' % r for r in runs_of(todo)) + "\n")


if __name__ == '__main__':
    main()
