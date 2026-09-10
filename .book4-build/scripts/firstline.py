# -*- coding: utf-8 -*-
"""Stack the first text line of each page into one strip image.

usage: python3 firstline.py <first> <last> [out.png]

Alignment between the file and the scan is decided by one question per page:
does the file's text for marker N begin with the words at the top of image N?
Reading a whole page to answer that is wasteful; the first line is enough.

This crops the band just below the running head from each page and stacks the
crops in page order with a thin rule between them, so one image covers ten or
more pages. Compare each line, in order, against the file's opening words for
those pages. A mismatch is a displacement.
"""
import os
import sys

import pymupdf
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
HERE = os.path.dirname(os.path.abspath(__file__))
PDF = r'/Users/ropedigital/Desktop/chathura-was-here-notes/Abhidhammattha Pradeepika Book 4.pdf'
WIDTH = 1500
Y0, Y1 = 0.105, 0.165          # first text line, below the running head

doc = pymupdf.open(PDF)


def page_strip(pno):
    """Head + first two body lines, anchored on the page's own first inked row.

    A fixed window misfires: pages without a running head (the Pali section)
    start higher, so the window lands on line three and looks like a mismatch.
    Anchoring on the ink makes the strip mean the same thing on every page, and
    including the running head lets the printed page number be read off it as a
    check on which physical page the strip came from.
    """
    xref = doc[pno - 1].get_images(full=True)[0][0]
    pix = pymupdf.Pixmap(doc, xref)
    if pix.n > 1:
        pix = pymupdf.Pixmap(pymupdf.csGRAY, pix)
    im = Image.frombytes('L', (pix.width, pix.height), pix.samples)
    w, h = im.size
    probe = im.crop((int(w * 0.10), 0, int(w * 0.95), int(h * 0.45)))
    probe = probe.resize((200, int(200 * probe.size[1] / float(probe.size[0]))),
                         Image.LANCZOS)
    px = probe.load()
    pw, ph = probe.size
    top = 0
    for y in range(ph):
        if sum(1 for x in range(pw) if px[x, y] < 128) >= 3:
            top = y
            break
    y0 = max(0.0, (top / float(ph)) * 0.45 - 0.012)
    y1 = min(0.98, y0 + 0.125)
    im = im.crop((int(w * 0.10), int(h * y0), int(w * 0.95), int(h * y1)))
    cw, ch = im.size
    return im.resize((WIDTH, max(1, int(round(WIDTH * ch / float(cw))))), Image.LANCZOS)


def main():
    first, last = int(sys.argv[1]), int(sys.argv[2])
    out = sys.argv[3] if len(sys.argv) > 3 else os.path.join(HERE, 'strips.png')
    strips = []
    for p in range(first, last + 1):
        try:
            strips.append(page_strip(p))
        except Exception as ex:                       # noqa: BLE001
            print('p%03d FAIL %r' % (p, ex))
    gap = 6
    total = sum(s.size[1] for s in strips) + gap * len(strips)
    canvas = Image.new('L', (WIDTH, total), 255)
    y = 0
    for s in strips:
        canvas.paste(s, (0, y))
        y += s.size[1]
        for yy in range(y + 2, y + 4):
            for xx in range(0, WIDTH, 2):
                canvas.putpixel((xx, min(yy, total - 1)), 0)
        y += gap
    canvas.save(out, optimize=True)
    print('%s  %dx%d  pages %d-%d (%d strips, in order)'
          % (out, canvas.size[0], canvas.size[1], first, last, len(strips)))


if __name__ == '__main__':
    main()
