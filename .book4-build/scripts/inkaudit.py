# -*- coding: utf-8 -*-
"""Find pages where transcribed text does not account for the ink on the scan.

usage: python3 inkaudit.py <book.md> [first] [last]

The failure that structural checks cannot see is a page transcribed only
partly — the markers are right, the printed number is right, the seam looks
plausible, but half the page never made it into the file. Page 101 was exactly
that, and it survived nine sampled boundary checks.

This measures each page's ink directly from the scan and compares it with how
many characters the file has for that page. Pages where the ratio is far below
the book's own norm are the candidates for a dropped paragraph or column.

It is a screen, not a verdict: display headings, verse and tables all shift the
ratio legitimately. It ranks pages for a human/vision look.
"""
import os
import re
import sys

from PIL import Image

Image.MAX_IMAGE_PIXELS = None
HERE = os.path.dirname(os.path.abspath(__file__))
PAGES = os.path.join(HERE, 'pages')
MARK = re.compile(r'^<!-- pdf:(\d+) \| printed:([^>]*?) -->[ \t]*$', re.M)
COMMENT = re.compile(r'<!--.*?-->', re.S)


def ink_fraction(path):
    im = Image.open(path).convert('L')
    im = im.resize((300, int(300 * im.size[1] / im.size[0])), Image.LANCZOS)
    px = im.load()
    w, h = im.size
    dark = 0
    for y in range(h):
        for x in range(w):
            if px[x, y] < 128:
                dark += 1
    return dark / float(w * h)


def main():
    path = sys.argv[1]
    first = int(sys.argv[2]) if len(sys.argv) > 2 else 1
    last = int(sys.argv[3]) if len(sys.argv) > 3 else 10 ** 9

    doc = open(path, encoding='utf-8').read()
    ms = list(MARK.finditer(doc))
    text = {}
    for i, m in enumerate(ms):
        e = ms[i + 1].start() if i + 1 < len(ms) else len(doc)
        body = COMMENT.sub('', doc[m.end():e]).strip()
        text[int(m.group(1))] = body

    rows = []
    for p in sorted(text):
        if not (first <= p <= last):
            continue
        img = os.path.join(PAGES, 'p%03d.png' % p)
        if not os.path.exists(img):
            continue
        ink = ink_fraction(img)
        n = len(text[p])
        rows.append((p, ink, n, (n / ink) if ink > 0.0005 else None))

    good = [r for r in rows if r[3] is not None and r[1] > 0.01]
    if not good:
        print('no comparable pages')
        return 0
    ratios = sorted(r[3] for r in good)
    med = ratios[len(ratios) // 2]

    print('pages measured : %d  (%d-%d)' % (len(rows), rows[0][0], rows[-1][0]))
    print('median chars per unit ink : %.0f' % med)
    print()
    print('SUSPECT pages — ink present but text well below the norm')
    print('(ratio = chars / ink; a page missing content scores low)')
    print()
    print('%6s %8s %8s %10s %7s' % ('page', 'ink', 'chars', 'ratio', 'vs med'))
    flagged = 0
    for p, ink, n, r in sorted(good, key=lambda x: x[3]):
        frac = r / med
        if frac < 0.62:
            flagged += 1
            print('%6d %8.4f %8d %10.0f %6.2fx' % (p, ink, n, r, frac))
    if not flagged:
        print('  (none below 0.62x of median)')
    print()
    print('flagged: %d of %d' % (flagged, len(good)))
    return 0


if __name__ == '__main__':
    sys.exit(main())
