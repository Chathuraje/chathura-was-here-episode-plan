# -*- coding: utf-8 -*-
"""usage: python3 crop.py <page> <x0> <y0> <x1> <y1> [width]

Coordinates are fractions of the full-resolution page image (0..1).

Writes a uniquely-named PNG under crops/ and prints its path. The name is
unique per invocation on purpose: several ranges are transcribed at once, and
a single shared output path means one agent reads another agent's crop.
"""
import os
import sys

import pymupdf
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
HERE = os.path.dirname(os.path.abspath(__file__))
PDF = r'/Users/ropedigital/Desktop/chathura-was-here-notes/Abhidhammattha Pradeepika Book 4.pdf'
doc = pymupdf.open(PDF)

page = int(sys.argv[1])
x0, y0, x1, y1 = (float(a) for a in sys.argv[2:6])
width = int(sys.argv[6]) if len(sys.argv) > 6 else 1500

xref = doc[page - 1].get_images(full=True)[0][0]
pix = pymupdf.Pixmap(doc, xref)
if pix.n > 1:
    pix = pymupdf.Pixmap(pymupdf.csGRAY, pix)
im = Image.frombytes('L', (pix.width, pix.height), pix.samples)
w, h = im.size
im = im.crop((int(w * x0), int(h * y0), int(w * x1), int(h * y1)))
cw, ch = im.size
im = im.resize((width, max(1, int(round(width * ch / float(cw))))), Image.LANCZOS)

out = os.path.join(HERE, 'crops')
os.makedirs(out, exist_ok=True)
dst = os.path.join(out, 'p%03d_%s_%s_%s_%s_%d.png' % (page, x0, y0, x1, y1, os.getpid()))
im.save(dst)
print(dst, im.size)
