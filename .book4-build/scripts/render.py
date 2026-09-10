# -*- coding: utf-8 -*-
"""Render Book 4 scan pages to PNG.

usage: python3 render.py <start> <end> [target_width]

Extracts the single full-page image XObject from each page (this drops the
"Free Distribution / www.aathaapi.org" text watermark, which is a separate
text layer drawn over the scan), converts to greyscale and downsamples.
"""
import os
import sys

import pymupdf
from PIL import Image

Image.MAX_IMAGE_PIXELS = None

HERE = os.path.dirname(os.path.abspath(__file__))
PDF = r'/Users/ropedigital/Desktop/chathura-was-here-notes/Abhidhammattha Pradeepika Book 4.pdf'
OUT = os.path.join(HERE, 'pages')
os.makedirs(OUT, exist_ok=True)

doc = pymupdf.open(PDF)


def page_image(pno):
    """pno is 1-based."""
    page = doc[pno - 1]
    imgs = page.get_images(full=True)
    if len(imgs) != 1:
        raise RuntimeError('expected 1 image, got %d' % len(imgs))
    xref = imgs[0][0]
    pix = pymupdf.Pixmap(doc, xref)
    if pix.n > 1:
        pix = pymupdf.Pixmap(pymupdf.csGRAY, pix)
    im = Image.frombytes('L', (pix.width, pix.height), pix.samples)
    return im


def main():
    start = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    end = int(sys.argv[2]) if len(sys.argv) > 2 else doc.page_count
    target_w = int(sys.argv[3]) if len(sys.argv) > 3 else 1500
    fails = 0
    for p in range(start, end + 1):
        dst = os.path.join(OUT, 'p%03d.png' % p)
        if os.path.exists(dst) and os.path.getsize(dst) > 0:
            continue
        try:
            g = page_image(p)
            w, h = g.size
            nh = max(1, int(round(target_w * h / float(w))))
            g.resize((target_w, nh), Image.LANCZOS).save(dst, optimize=True)
        except Exception as ex:                       # noqa: BLE001
            fails += 1
            print('p%03d FAIL %r' % (p, ex), flush=True)
    print('DONE %d-%d fails=%d' % (start, end, fails), flush=True)


if __name__ == '__main__':
    main()
