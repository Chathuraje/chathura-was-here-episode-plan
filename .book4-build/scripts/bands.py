# -*- coding: utf-8 -*-
"""Render each page as two half-page bands at higher horizontal resolution.

usage: python3 bands.py <start> <end> [width]

A full page rendered to fit the reader's 2000px long-edge budget only gets
~1367px across the text column, which is marginal for ල/ළ, ආදි/ආදී and
similar. A half-page band is wide-and-short, so the same budget buys ~1700px
across the column.

The cut is placed on the widest run of blank pixel rows near the vertical
middle, so no line of type is ever split between the two bands.
"""
import os
import sys

import pymupdf
from PIL import Image

Image.MAX_IMAGE_PIXELS = None

HERE = os.path.dirname(os.path.abspath(__file__))
PDF = r'/Users/ropedigital/Desktop/chathura-was-here-notes/Abhidhammattha Pradeepika Book 4.pdf'
OUT = os.path.join(HERE, 'bands')
os.makedirs(OUT, exist_ok=True)
WIDTH = 1700

doc = pymupdf.open(PDF)


def page_image(pno):
    xref = doc[pno - 1].get_images(full=True)[0][0]
    pix = pymupdf.Pixmap(doc, xref)
    if pix.n > 1:
        pix = pymupdf.Pixmap(pymupdf.csGRAY, pix)
    return Image.frombytes('L', (pix.width, pix.height), pix.samples)


def find_cut(im):
    """Widest blank horizontal gap in the middle 30% of the page."""
    w, h = im.size
    small = im.resize((400, h // 8), Image.LANCZOS)
    sw, sh = small.size
    px = small.load()
    ink = []
    for y in range(sh):
        n = 0
        for x in range(sw):
            if px[x, y] < 128:
                n += 1
        ink.append(n)
    lo, hi = int(sh * 0.35), int(sh * 0.65)
    best, run_start, best_len = None, None, 0
    for y in range(lo, hi):
        if ink[y] <= 1:
            if run_start is None:
                run_start = y
            if y - run_start + 1 > best_len:
                best_len = y - run_start + 1
                best = run_start + best_len // 2
        else:
            run_start = None
    if best is None:
        best = sh // 2
    return int(best * h / float(sh))


def save(im, dst):
    w, h = im.size
    nh = max(1, int(round(WIDTH * h / float(w))))
    im.resize((WIDTH, nh), Image.LANCZOS).save(dst, optimize=True)


def main():
    start = int(sys.argv[1])
    end = int(sys.argv[2])
    global WIDTH
    if len(sys.argv) > 3:
        WIDTH = int(sys.argv[3])
    fails = 0
    for p in range(start, end + 1):
        a = os.path.join(OUT, 'p%03da.png' % p)
        b = os.path.join(OUT, 'p%03db.png' % p)
        if os.path.exists(a) and os.path.getsize(a) > 0 and \
           os.path.exists(b) and os.path.getsize(b) > 0:
            continue
        try:
            im = page_image(p)
            w, h = im.size
            cut = find_cut(im)
            save(im.crop((0, 0, w, cut)), a)
            save(im.crop((0, cut, w, h)), b)
        except Exception as ex:                       # noqa: BLE001
            fails += 1
            print('p%03d FAIL %r' % (p, ex), flush=True)
    print('DONE %d-%d fails=%d' % (start, end, fails), flush=True)


if __name__ == '__main__':
    main()
