# -*- coding: utf-8 -*-
"""Detect page-displacement: file text under marker N actually being page N-1.

usage: python3 offsetaudit.py <book.md> <first> <last>

The ink audit catches a page that lost content. It is blind to a page whose
text is complete but belongs to a *different* page — which is what happened
around pdf 101, where marker 101 holds image page 100's text and image page
101's text is absent altogether.

Method: each page's character count should track the ink on its own scan. If
the file is displaced by one, chars[N] will instead track ink[N-1]. For every
page we compute how far chars[N]/ink[N] and chars[N]/ink[N-1] sit from the
book's median ratio, then smooth over a window. Runs where the shifted
alignment fits consistently better are displacement candidates.

Like the ink audit this is a screen, not a verdict — it ranks pages for a look
at the actual scan.
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
WIN = 5


def ink_fraction(path, cache={}):
    if path in cache:
        return cache[path]
    im = Image.open(path).convert('L')
    im = im.resize((240, int(240 * im.size[1] / im.size[0])), Image.LANCZOS)
    px = im.load()
    w, h = im.size
    dark = sum(1 for y in range(h) for x in range(w) if px[x, y] < 128)
    cache[path] = dark / float(w * h)
    return cache[path]


def main():
    path, first, last = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
    doc = open(path, encoding='utf-8').read()
    ms = list(MARK.finditer(doc))
    chars = {}
    for i, m in enumerate(ms):
        e = ms[i + 1].start() if i + 1 < len(ms) else len(doc)
        chars[int(m.group(1))] = len(COMMENT.sub('', doc[m.end():e]).strip())

    ink = {}
    for p in range(first - 1, last + 1):
        f = os.path.join(PAGES, 'p%03d.png' % p)
        if os.path.exists(f):
            ink[p] = ink_fraction(f)

    pages = [p for p in range(first, last + 1)
             if p in chars and p in ink and ink[p] > 0.02 and chars[p] > 200]
    if len(pages) < WIN * 2:
        print('not enough comparable pages')
        return 0

    r0 = {p: chars[p] / ink[p] for p in pages}
    med = sorted(r0.values())[len(r0) // 2]
    dev0, dev1 = {}, {}
    for p in pages:
        dev0[p] = abs(r0[p] / med - 1.0)
        if (p - 1) in ink and ink[p - 1] > 0.02:
            dev1[p] = abs((chars[p] / ink[p - 1]) / med - 1.0)

    print('pages compared : %d  (%d-%d)' % (len(pages), pages[0], pages[-1]))
    print('median chars/ink : %.0f' % med)
    print()
    print('Windows where the SHIFTED alignment (text = previous page) fits better:')
    print('%8s %10s %10s %8s' % ('window', 'aligned', 'shifted', 'verdict'))
    hits = []
    for i in range(len(pages) - WIN + 1):
        w = pages[i:i + WIN]
        if not all(p in dev1 for p in w):
            continue
        a = sum(dev0[p] for p in w) / WIN
        b = sum(dev1[p] for p in w) / WIN
        if b < a * 0.72:
            hits.append((w[0], w[-1], a, b))
    if hits:
        merged = []
        for s, e, a, b in hits:
            if merged and s <= merged[-1][1] + 1:
                merged[-1] = (merged[-1][0], e, min(merged[-1][2], a), min(merged[-1][3], b))
            else:
                merged.append((s, e, a, b))
        for s, e, a, b in merged:
            print('%4d-%-4d %10.3f %10.3f   DISPLACED?' % (s, e, a, b))
    else:
        print('  (none — no run of %d pages fits the shifted alignment better)' % WIN)
    print()
    worst = sorted(pages, key=lambda p: -dev0[p])[:8]
    print('Individually worst-fitting pages (aligned):')
    for p in sorted(worst):
        s = ' shifted fits better' if p in dev1 and dev1[p] < dev0[p] * 0.6 else ''
        print('  p%-4d chars=%-5d ink=%.4f  dev=%.2f%s' % (p, chars[p], ink[p], dev0[p], s))
    return 0


if __name__ == '__main__':
    sys.exit(main())
