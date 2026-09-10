# PDF → MARKDOWN EXTRACTION GUIDE

**Scope:** converting one scanned Sinhala Abhidhamma book (PDF) into a single
faithful Markdown file. This covers extraction only. It does **not** cover
routing content into concept folders — that is a separate task.

This procedure was derived from converting *Abhidhammattha Pradeepika Book 1*
(545 pages). Follow it for Book 2 or any similarly scanned volume.

---

## 0. Ground rules

- **Never modify the source PDF.**
- The output is **one** Markdown file next to the PDF, named after it
  (e.g. `Abhidhammattha Pradeepika Book 2.md`).
- The output is a **verbatim transcription**, not a summary, not a translation.
- Work in a scratch directory for all scripts and rendered images. Do not leave
  PNGs or helper scripts in the user's project folder.
- Report honestly. If a page is unreadable or missing from the scan, say so in
  the file and in your final report. Never silently skip or renumber.

---

## 1. Determine whether the PDF has a text layer

Run this first. It decides everything that follows.

```bash
python -c "
import re
d=open(r'PATH/TO/BOOK.pdf','rb').read()
print('bytes', len(d))
for k in [b'/FontFile', b'/ToUnicode', b'CCITTFaxDecode', b'/DCTDecode',
          b'/JBIG2Decode', b'FlateDecode', b'/Image']:
    print(k.decode(), d.count(k))
"
```

- Many `/FontFile` + `/ToUnicode` → there **is** a text layer. Try a text
  extractor first; this guide's vision path may be unnecessary.
- Zero `/FontFile`, many `CCITTFaxDecode` / `/DCTDecode` / `/JBIG2Decode` →
  **scanned images, no text layer**. Continue with this guide.

Also check what tooling exists before writing your own:

```bash
for t in pdftotext pdfimages mutool gs magick convert tesseract; do
  command -v $t >/dev/null && echo "have $t" || echo "MISSING $t"
done
python -c "import fitz" 2>/dev/null && echo "have PyMuPDF" || echo "no PyMuPDF"
python -c "import pypdf" 2>/dev/null && echo "have pypdf"  || echo "no pypdf"
python -c "import PIL,sys; print('PIL', PIL.__version__)"
```

On the machine this was written for, **none** of the PDF tools existed and only
PIL was available, so steps 2–3 hand-roll a PDF parser and renderer. If real
tools are present, use them instead and skip to step 4.

---

## 1a. Check whether the PDF is encrypted

Do this before writing any parser. Book 1 was a plain scanned PDF; **Book 2 is
permission-encrypted**, and the first symptom is a `zlib.error: incorrect
header check` the moment step 2 tries to inflate an object stream.

```bash
python -c "
d=open(r'PATH/TO/BOOK.pdf','rb').read()
print('Encrypt' , b'/Encrypt' in d)
"
```

If the trailer has an `/Encrypt` entry, dump the encryption dictionary (object
number comes from `trailer['Encrypt']`). Book 2 reports:

```
CF = {'StdCF': {'CFM': ('name','AESV2'), 'Length': 16, ...}}
Filter = Standard   R = 4   V = 4   Length = 128   P = -1340
StmF = StdCF        StrF = StdCF
```

That is **AES-128-CBC with an empty user password** — the file is locked
against printing/copying, not against opening. Everything can be decrypted
without asking the user for anything.

What this means in practice:

- Every stream **except the cross-reference streams** is encrypted. Object
  streams (which hold the page tree) must be decrypted *before* inflating, and
  each image XObject must be decrypted before it is handed to the renderer.
- Per-object key: `md5(filekey + num[3 bytes LE] + gen[2 bytes LE] + b'sAlT')`,
  truncated to `min(len(filekey)+5, 16)`. The `sAlT` suffix is AES-only.
- File key: PDF 1.7 Algorithm 2 — `md5(PAD + O + P as '<i' + ID[0])`, then
  50 rounds of `md5(key[:n])` for R >= 3, `n = Length/8`. Verify it with
  Algorithm 6 before trusting it; if the empty password is rejected, stop and
  tell the user a real password is needed.
- **Unescape the `/O` and `/U` strings** before use. A naive PDF literal-string
  parser leaves backslash-escape pairs in place and you get a 33-byte `/O` instead of 32,
  which silently produces a wrong key.

There was no crypto library on this machine and `pip install pycryptodome`
could not reach the network, so `aespy.py` in the scratch dir is a pure-Python
AES-128 (table-driven equivalent inverse cipher). **Test it against the
FIPS-197 vector before using it**:

```
key 000102030405060708090a0b0c0d0e0f
ct  69c4e0d86a7b0430d8cdb78070b4c55a
pt  00112233445566778899aabbccddeeff
```

It decrypts at roughly 0.2 MB/s, which is ~1 s per scanned page — fine, since
rendering dominates anyway. Reuse `aespy.py` and `pdfdec.py` from the Book 2
scratch directory rather than rewriting them.

## 2. Build the page map

Write this to `<scratch>/pdfpages.py`. It walks the real page tree (never guess
page count from a `/Type /Page` regex — that overcounts) and emits
`pagemap.json` describing each page's image.

Use the **Write tool** for Python scripts. Do not create them with bash
heredocs — quoting breaks on regex and backslashes.

```python
# -*- coding: utf-8 -*-
import re, zlib, struct, sys, os, json
PDF = r'PATH/TO/BOOK.pdf'
d = open(PDF, 'rb').read()
HERE = os.path.dirname(os.path.abspath(__file__))


def unpredict(data, pred, colors, bpc, columns):
    if pred < 10:
        return data
    bpp = max(1, (colors * bpc + 7) // 8)
    rowlen = (columns * colors * bpc + 7) // 8
    out, prev, i = bytearray(), bytearray(rowlen), 0
    while i < len(data):
        ft = data[i]; i += 1
        row = bytearray(data[i:i + rowlen]); i += rowlen
        if len(row) < rowlen:
            row += bytearray(rowlen - len(row))
        if ft == 1:
            for j in range(bpp, rowlen):
                row[j] = (row[j] + row[j - bpp]) & 0xFF
        elif ft == 2:
            for j in range(rowlen):
                row[j] = (row[j] + prev[j]) & 0xFF
        elif ft == 3:
            for j in range(rowlen):
                left = row[j - bpp] if j >= bpp else 0
                row[j] = (row[j] + ((left + prev[j]) >> 1)) & 0xFF
        elif ft == 4:
            for j in range(rowlen):
                a = row[j - bpp] if j >= bpp else 0
                b = prev[j]
                c = prev[j - bpp] if j >= bpp else 0
                p = a + b - c
                pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
                pr = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                row[j] = (row[j] + pr) & 0xFF
        out += row; prev = row
    return bytes(out)


DELIM = b'/<>[]() \t\r\n'


def skip_ws(s, i):
    while i < len(s):
        c = s[i:i + 1]
        if c in b' \t\r\n\x00\x0c':
            i += 1
        elif c == b'%':
            while i < len(s) and s[i:i + 1] not in b'\r\n':
                i += 1
        else:
            return i
    return i


def parse_dict(s, i):
    i += 2; res = {}
    while True:
        i = skip_ws(s, i)
        if s[i:i + 2] == b'>>':
            return res, i + 2
        j = i + 1
        while j < len(s) and s[j:j + 1] not in DELIM:
            j += 1
        key = s[i + 1:j].decode('latin1')
        res[key], i = parse_obj(s, j)


def parse_obj(s, i):
    i = skip_ws(s, i); c = s[i:i + 1]
    if s[i:i + 2] == b'<<':
        return parse_dict(s, i)
    if c == b'[':
        i += 1; arr = []
        while True:
            i = skip_ws(s, i)
            if s[i:i + 1] == b']':
                return arr, i + 1
            v, i = parse_obj(s, i); arr.append(v)
    if c == b'/':
        j = i + 1
        while j < len(s) and s[j:j + 1] not in DELIM:
            j += 1
        return ('name', s[i + 1:j].decode('latin1')), j
    if c == b'(':
        depth, j, buf = 0, i, b''
        while j < len(s):
            ch = s[j:j + 1]
            if ch == b'\\':
                buf += s[j:j + 2]; j += 2; continue
            if ch == b'(':
                depth += 1
            elif ch == b')':
                depth -= 1
                if depth == 0:
                    return ('str', buf[1:]), j + 1
            buf += ch; j += 1
        return ('str', buf), j
    if c == b'<':
        j = s.index(b'>', i)
        return ('hex', s[i + 1:j]), j + 1
    m = re.match(rb'(\d+)\s+(\d+)\s+R(?![a-zA-Z])', s[i:i + 40])
    if m:
        return ('ref', int(m.group(1)), int(m.group(2))), i + m.end()
    m = re.match(rb'[+-]?\d*\.?\d+', s[i:i + 40])
    if m:
        t = m.group(0)
        return (float(t) if b'.' in t else int(t)), i + m.end()
    m = re.match(rb'(true|false|null)', s[i:i + 10])
    if m:
        return {b'true': True, b'false': False, b'null': None}[m.group(1)], i + m.end()
    raise ValueError('tok? ' + repr(s[i:i + 40]))


def filters_of(dic):
    f = dic.get('Filter')
    if f is None:
        return []
    if isinstance(f, tuple) and f[0] == 'name':
        return [f[1]]
    if isinstance(f, list):
        return [x[1] for x in f if isinstance(x, tuple) and x[0] == 'name']
    return []


def get_stream_data(dic, raw):
    data = raw
    dp = dic.get('DecodeParms') or dic.get('DP')
    for f in filters_of(dic):
        if f == 'FlateDecode':
            data = zlib.decompress(data)
            p = dp if isinstance(dp, dict) else (
                dp[0] if isinstance(dp, list) and dp and isinstance(dp[0], dict) else None)
            if p and p.get('Predictor', 1) > 1:
                data = unpredict(data, int(p['Predictor']), int(p.get('Colors', 1)),
                                 int(p.get('BitsPerComponent', 8)), int(p.get('Columns', 1)))
        else:
            return data, f
    return data, None


def read_obj_at(off):
    m = re.match(rb'\s*(\d+)\s+(\d+)\s+obj', d[off:off + 64])
    if not m:
        return None
    i = off + m.end()
    obj, i = parse_obj(d, i)
    i = skip_ws(d, i)
    if d[i:i + 6] == b'stream':
        i += 6
        if d[i:i + 2] == b'\r\n':
            i += 2
        elif d[i:i + 1] in (b'\n', b'\r'):
            i += 1
        return ('stream', obj, i)
    return ('obj', obj, None)


xref, trailer, seen = {}, {}, set()
m = re.search(rb'startxref\s+(\d+)', d[-2048:])
queue = [int(m.group(1))]
while queue:
    pos = queue.pop(0)
    if pos in seen or pos <= 0 or pos >= len(d):
        continue
    seen.add(pos)
    if re.match(rb'\s*xref', d[pos:pos + 16]):
        i = skip_ws(d, pos) + 4
        while True:
            i = skip_ws(d, i)
            mm = re.match(rb'(\d+)\s+(\d+)\s*', d[i:i + 40])
            if not mm:
                break
            st, cnt = int(mm.group(1)), int(mm.group(2)); i += mm.end()
            for k in range(cnt):
                ent = d[i:i + 20]; i += 20
                if ent[17:18] == b'n' and (st + k) not in xref:
                    xref[st + k] = ('off', int(ent[0:10]))
        i = skip_ws(d, i)
        if d[i:i + 7] == b'trailer':
            td, _ = parse_dict(d, skip_ws(d, i + 7))
            for k, v in td.items():
                trailer.setdefault(k, v)
            if 'XRefStm' in td:
                queue.append(int(td['XRefStm']))
            if 'Prev' in td:
                queue.append(int(td['Prev']))
    else:
        r = read_obj_at(pos)
        if not r or r[0] != 'stream':
            continue
        _, dic, soff = r
        data, _ = get_stream_data(dic, d[soff:soff + int(dic['Length'])])
        W = [int(x) for x in dic['W']]
        size = int(dic['Size'])
        index = [int(x) for x in dic.get('Index', [0, size])]
        rowlen = sum(W); p = 0
        for a in range(0, len(index), 2):
            st, cnt = index[a], index[a + 1]
            for k in range(cnt):
                if p + rowlen > len(data):
                    break
                f, q = [], p
                for wl in W:
                    v = 0
                    for bb in data[q:q + wl]:
                        v = (v << 8) | bb
                    f.append(v); q += wl
                p += rowlen
                ty = f[0] if W[0] else 1
                num = st + k
                if num in xref:
                    continue
                if ty == 1:
                    xref[num] = ('off', f[1])
                elif ty == 2:
                    xref[num] = ('in', f[1], f[2])
        for k, v in dic.items():
            trailer.setdefault(k, v)
        if 'Prev' in dic:
            queue.append(int(dic['Prev']))

print('xref entries: %d' % len(xref), file=sys.stderr)
objstm_cache, cache = {}, {}


def load_objstm(num):
    if num in objstm_cache:
        return objstm_cache[num]
    _, dic, soff = read_obj_at(xref[num][1])
    data, _ = get_stream_data(dic, d[soff:soff + int(dic['Length'])])
    n, first = int(dic['N']), int(dic['First'])
    hdr = data[:first].split()
    tbl = [(int(hdr[2 * i]), int(hdr[2 * i + 1])) for i in range(n)]
    objstm_cache[num] = (data, first, tbl)
    return objstm_cache[num]


def getobj(num):
    if num in cache:
        return cache[num]
    loc = xref.get(num)
    if loc is None:
        cache[num] = None; return None
    if loc[0] == 'off':
        r = read_obj_at(loc[1])
        if r is None:
            cache[num] = None; return None
        kind, dic, soff = r
        val = (dic, soff if kind == 'stream' else None)
    else:
        data, first, tbl = load_objstm(loc[1])
        v, _ = parse_obj(data, first + tbl[loc[2]][1])
        val = (v, None)
    cache[num] = val
    return val


def resolve(v):
    n = 0
    while isinstance(v, tuple) and len(v) == 3 and v[0] == 'ref' and n < 32:
        o = getobj(v[1])
        if o is None:
            return None
        v = o[0]; n += 1
    return v


root = resolve(trailer['Root'])
pages_root = resolve(root['Pages'])
print('/Count in page tree: %s' % resolve(pages_root.get('Count')), file=sys.stderr)
order = []


def walk(node):
    node = resolve(node)
    if node is None:
        return
    t = node.get('Type')
    tn = t[1] if isinstance(t, tuple) and t[0] == 'name' else None
    if tn == 'Pages' or (tn != 'Page' and 'Kids' in node):
        for k in node['Kids']:
            walk(k)
    else:
        order.append(node)


walk(root['Pages'])
print('pages walked: %d' % len(order), file=sys.stderr)

recs = []
for pi, pg in enumerate(order):
    res = resolve(pg.get('Resources')) or {}
    xo = resolve(res.get('XObject')) or {}
    imgs = []
    for nm, ref in xo.items():
        if not (isinstance(ref, tuple) and len(ref) == 3 and ref[0] == 'ref'):
            continue
        o = getobj(ref[1])
        if not o or o[1] is None:
            continue
        dic, soff = o
        st = dic.get('Subtype')
        if not (isinstance(st, tuple) and st[0] == 'name' and st[1] == 'Image'):
            continue
        dp = resolve(dic.get('DecodeParms'))
        if isinstance(dp, list):
            dp = next((x for x in (resolve(y) for y in dp) if isinstance(x, dict)), {})
        if not isinstance(dp, dict):
            dp = {}
        imgs.append(dict(name=nm, obj=ref[1], off=soff,
                         length=int(resolve(dic['Length'])),
                         w=int(resolve(dic['Width'])), h=int(resolve(dic['Height'])),
                         bpc=int(resolve(dic.get('BitsPerComponent', 1)) or 1),
                         filt=','.join(filters_of(dic)),
                         K=int(resolve(dp.get('K', 0)) or 0),
                         cols=int(resolve(dp.get('Columns', 1728)) or 1728),
                         black1=bool(resolve(dp.get('BlackIs1', False)))))
    recs.append(dict(page=pi + 1, images=imgs))

json.dump(recs, open(os.path.join(HERE, 'pagemap.json'), 'w'))
import collections
print('img-per-page dist: %s' % dict(collections.Counter(len(r['images']) for r in recs)), file=sys.stderr)
print('filters: %s' % dict(collections.Counter(i['filt'] for r in recs for i in r['images'])), file=sys.stderr)
```

**Sanity gate before continuing:** `/Count in page tree` must equal
`pages walked`, and the per-page image count should be 1 for almost every page.
If not, stop and investigate.

---

## 3. Render every page to PNG

Write `<scratch>/render.py`. The key trick: a raw CCITT G4 stream cannot be fed
to PIL directly, so wrap it in a minimal TIFF container and let libtiff decode.

```python
# -*- coding: utf-8 -*-
import json, os, io, sys, struct, zlib
from PIL import Image

Image.MAX_IMAGE_PIXELS = None          # source pages are ~68 megapixels
HERE = os.path.dirname(os.path.abspath(__file__))
PDF = r'PATH/TO/BOOK.pdf'
OUT = os.path.join(HERE, 'pages')
os.makedirs(OUT, exist_ok=True)
TARGET_W = 1500                        # good legibility / size trade-off

d = open(PDF, 'rb').read()
recs = json.load(open(os.path.join(HERE, 'pagemap.json')))


def g4_to_tiff(raw, w, h, photometric):
    entries = []

    def e(tag, typ, cnt, val):
        entries.append(struct.pack('<HHLL', tag, typ, cnt, val))

    n = 10
    strip_off = 8 + (2 + n * 12 + 4)
    e(256, 4, 1, w); e(257, 4, 1, h); e(258, 3, 1, 1); e(259, 3, 1, 4)
    e(262, 3, 1, photometric); e(273, 4, 1, strip_off); e(277, 3, 1, 1)
    e(278, 4, 1, h); e(279, 4, 1, len(raw)); e(296, 3, 1, 2)
    ifd = struct.pack('<H', n) + b''.join(entries) + struct.pack('<L', 0)
    return struct.pack('<2sHL', b'II', 42, 8) + ifd + raw


def load_page_image(rec):
    it = rec['images'][0]
    raw = d[it['off']:it['off'] + it['length']]
    w, h = it['w'], it['h']
    if 'CCITTFaxDecode' in it['filt']:
        tif = g4_to_tiff(raw, w, h, 1 if it['black1'] else 0)
        im = Image.open(io.BytesIO(tif)); im.load()
        return im
    data = zlib.decompress(raw)
    if it['bpc'] == 1:
        return Image.frombytes('1', (w, h), data, 'raw', '1', 0, 1)
    stride = len(data) // h if h else 0
    ncomp = max(1, int(round(stride / float(w)))) if w else 1
    if ncomp >= 3:
        return Image.frombytes('RGB', (w, h), data[:w * h * 3], 'raw', 'RGB', 0, 1)
    return Image.frombytes('L', (w, h), data[:w * h], 'raw', 'L', 0, 1)


start = int(sys.argv[1]) if len(sys.argv) > 1 else 1
end = int(sys.argv[2]) if len(sys.argv) > 2 else len(recs)
for rec in recs:
    p = rec['page']
    if p < start or p > end:
        continue
    dst = os.path.join(OUT, 'p%03d.png' % p)
    if os.path.exists(dst) and os.path.getsize(dst) > 0:
        continue
    try:
        g = load_page_image(rec).convert('L')
        w, h = g.size
        nh = max(1, int(round(TARGET_W * h / float(w))))
        g.resize((TARGET_W, nh), Image.LANCZOS).save(dst, optimize=True)
        print('p%03d ok' % p, flush=True)
    except Exception as ex:
        print('p%03d FAIL %r' % (p, ex), flush=True)
print('DONE', flush=True)
```

Run it in the background over the whole book (`python render.py 1 <lastpage>`)
and confirm **0 failures** before transcribing.

---

## 4. Landscape charts and unreadable pages

Some pages are full-page tables printed sideways. Write `<scratch>/rot.py` and
re-render just those, rotated and larger.

```python
# -*- coding: utf-8 -*-
"""usage: python rot.py <page> [rotate_deg] [width] [crop_top] [crop_bottom]"""
import sys, os, io, json, struct, zlib
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
HERE = os.path.dirname(os.path.abspath(__file__))
PDF = r'PATH/TO/BOOK.pdf'
OUT = os.path.join(HERE, 'pages')
d = open(PDF, 'rb').read()
recs = json.load(open(os.path.join(HERE, 'pagemap.json')))
# reuse g4_to_tiff() and load_page_image() from render.py verbatim
page = int(sys.argv[1])
rot = int(sys.argv[2]) if len(sys.argv) > 2 else 0
width = int(sys.argv[3]) if len(sys.argv) > 3 else 2000
t0 = float(sys.argv[4]) if len(sys.argv) > 4 else 0.0
t1 = float(sys.argv[5]) if len(sys.argv) > 5 else 1.0
rec = next(r for r in recs if r['page'] == page)
im = load_page_image(rec).convert('L')
if rot:
    im = im.rotate(rot, expand=True)      # positive = counter-clockwise
w, h = im.size
if t0 > 0 or t1 < 1:
    im = im.crop((0, int(h * t0), w, int(h * t1))); w, h = im.size
nh = max(1, int(round(width * h / float(w))))
im = im.resize((width, nh), Image.LANCZOS)
name = 'hi_p%03d_r%d_%s_%s.png' % (page, rot, t0, t1)
im.save(os.path.join(OUT, name), optimize=True)
print(os.path.join(OUT, name), im.size)
```

Guidance:

- Rotation direction is not predictable per page. Read the page number's
  position and the first column header: after rotating, the bottom-left of the
  original should become the top-left. If the result is upside-down, use the
  opposite sign.
- For a dense chart, crop to a band (`0.28 0.46`) and enlarge to 2400–2600 px
  rather than trying to read the whole page at once.
- **Delete the temp renders** (`rm -f pages/hi_*.png`) after each chart.

---

## 5. Transcription

Work in **batches of about three pages**: read the PNGs, then append.

Append with a quoted bash heredoc — this avoids all escaping problems with
Sinhala text, backslashes and Markdown:

```bash
cat >> "PATH/TO/BOOK.md" <<'XEOF'

<!-- pdf:NNN | printed:N -->

...transcribed text...
XEOF
grep -o '<!-- pdf:[0-9]*' "PATH/TO/BOOK.md" | tail -1; wc -c "PATH/TO/BOOK.md"
```

### File header

Start the file once, before page 1:

```markdown
---
title: <Sinhala title>
title_translit: <Latin transliteration>
author: <author>
language: si
source_pdf: <filename>.pdf
source_pages: <N>
---

<!--
CONVERSION NOTES
- Source PDF has no text layer: all N pages are 1-bit scans.
  This Markdown is a page-by-page visual transcription of those scans.
- Page markers map each block back to the source:
      <!-- pdf:012 | printed:1 -.->
  "pdf" = 1-based index in the PDF; "printed" = the number printed on the page.
- Bold marks terms the original sets in bold type.
- Any distribution watermark stamped on every page is omitted; recorded once above.
- Printer's gathering marks (a lone letter in the bottom margin) are omitted.
-->
```

### Conventions

| Situation | Do this |
|---|---|
| Every page | Emit `<!-- pdf:N \| printed:M -->` before its text |
| Unnumbered page | `printed:` left blank |
| Original bold | `**bold**` |
| Headings | `###` / `####` / `#####` following the book's own hierarchy |
| Tables | Real Markdown tables; right-align numeric columns |
| Landscape chart | Transcribe upright, add `<!-- This page is a full-page chart printed sideways in the original. -->` |
| Vīthi diagrams | Fenced code block, preserving the symbol sequence |
| Pāli verse | Line-broken block, keep original numbering |
| Page missing from scan | Note inline; **do not** renumber |
| Degraded glyph | Resolve toward standard Abhidhamma orthography; note it if the reading is genuinely uncertain |

### Verify every numeric chart

This is the main accuracy control. For any table of counts, check row sums and
column sums against the totals printed in the book. If a printed total does not
match its own row, transcribe **as printed** and add an HTML comment recording
the discrepancy and the cross-reference that resolves it. Do not silently fix
the original.

---

## 6. Known traps

- **Do not** guess page count from `grep -c '/Type /Page'` — it overcounts.
  Use `/Count` from the parsed page tree.
- **`zlib.error: incorrect header check` while parsing means the PDF is
  encrypted**, not that the parser is wrong. See step 1a.
- **Do not** write Python scripts with bash heredocs; use the Write tool.
  (`unexpected EOF while looking for matching quote`.)
- If a heredoc append fails on size, write that chunk to a scratch `.md` with
  the Write tool and `cat chunk.md >> target.md`.
- **Do not print Sinhala to stdout** on Windows — the console is cp1252 and will
  raise `UnicodeEncodeError`. Write reports to a UTF-8 file and print an
  ASCII-safe version.
- Python 3.6 will not read a UTF-8 script from stdin without an encoding
  declaration. Put patch scripts in a file.
- markdownlint warnings in the IDE (MD029/MD036/MD041/MD060) are noise here.
  In particular MD029 is wrong: CommonMark honours `<ol start=N>`, so a list
  that resumes at `4.` across a page break renders correctly.

---

## 7. Final verification

Run all of these and report the numbers:

```bash
F="PATH/TO/BOOK.md"
# every page present exactly once, no gaps
grep -o '<!-- pdf:[0-9]*' "$F" | grep -o '[0-9]*' | sort -n | uniq > /tmp/got
seq 1 <LASTPAGE> > /tmp/want
diff /tmp/got /tmp/want && echo "OK: all pages present, no gaps, no duplicates"
wc -c "$F"; wc -l "$F"
```

Then state plainly in your final report:

1. Page count transcribed and confirmed against the PDF's `/Count`.
2. That every numeric chart was checked by row and column sums, and any
   discrepancy found in the original.
3. Any page missing from the scan, or any passage you could not read.
4. That ambiguous glyphs were resolved toward standard orthography.

Do not claim completeness you have not verified.
