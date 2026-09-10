# -*- coding: utf-8 -*-
"""Build a checkpoint: head_1_143 + every chunk page that is contiguous from 144.

usage: python3 checkpoint.py [--write]

Stops at the first gap, so a checkpoint is always a prefix of the book with no
holes. Partial chunks (an agent still writing) contribute only their leading
contiguous pages. Without --write it just reports and leaves the staged file
in the scratch dir for inspection.
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
HEAD = os.path.join(HERE, 'head_1_143.md')
CHUNKS = os.path.join(HERE, 'chunks')
STAGED = os.path.join(HERE, 'checkpoint.md')
TARGET = r'/Users/ropedigital/Desktop/chathura-was-here-notes/Abhidhammattha Pradeepika Book 4.md'

MARK = re.compile(r'^<!-- pdf:(\d+) \| printed:([^>]*?) -->[ \t]*$', re.M)


def blocks(text):
    """[(pdf, block_text_including_marker)]"""
    ms = list(MARK.finditer(text))
    out = []
    for i, m in enumerate(ms):
        end = ms[i + 1].start() if i + 1 < len(ms) else len(text)
        out.append((int(m.group(1)), text[m.start():end].rstrip()))
    return out


def main():
    pages = {}
    for name in sorted(os.listdir(CHUNKS)):
        if not re.match(r'^c\d+_\d+\.md$', name):
            continue
        text = open(os.path.join(CHUNKS, name), encoding='utf-8').read()
        for pdf, blk in blocks(text):
            if pdf in pages:
                print('WARNING: page %d appears in more than one chunk (%s)' % (pdf, name))
            pages[pdf] = blk

    p = 144
    ordered = []
    while p in pages:
        ordered.append(pages[p])
        p += 1
    last = p - 1
    if last < 144:
        print('nothing contiguous from 144')
        return 1

    head = open(HEAD, encoding='utf-8').read().rstrip('\n')
    doc = head + '\n\n' + '\n\n'.join(ordered) + '\n'
    open(STAGED, 'w', encoding='utf-8').write(doc)
    print('checkpoint covers pages 1-%d  (%d body pages from chunks)' % (last, len(ordered)))
    print('staged at %s' % STAGED)
    print('bytes %d' % len(doc.encode('utf-8')))

    if '--write' in sys.argv:
        open(TARGET, 'w', encoding='utf-8').write(doc)
        print('WROTE %s' % TARGET)
    return 0


if __name__ == '__main__':
    sys.exit(main())
