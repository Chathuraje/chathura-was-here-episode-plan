# -*- coding: utf-8 -*-
"""The one safe regeneration command.

    python3 tools/rebuild.py          regenerate every readable file, then validate
    python3 tools/rebuild.py --check  change nothing; fail if any generated file is out of date or a check fails

It reads the authoritative records (lead cards, data/stories.json, data/connections.json, idea cards) and writes only
generated files: the .csv tables, the generated .md files, the generated block of PROGRESS.md and
VALIDATION-REPORT.md. It never writes a lead card or anything in data/. Seed scripts are not part of it.
"""
import os, subprocess, sys

T = os.path.dirname(os.path.abspath(__file__))
check = "--check" in sys.argv
steps = ([["build.py", "--check"], ["progress.py", "--check"]] if check else [["build.py"], ["progress.py"]]) + [["validate.py"]]
for step in steps:
    if check and step == ["validate.py"]:
        # validate.py rewrites VALIDATION-REPORT.md; in check mode compare instead of writing.
        rep = os.path.join(os.path.dirname(T), "VALIDATION-REPORT.md")
        before = open(rep, encoding="utf-8").read() if os.path.exists(rep) else None
        r = subprocess.run([sys.executable, os.path.join(T, "validate.py")], capture_output=True, text=True)
        after = open(rep, encoding="utf-8").read()
        if before is not None and before != after:
            open(rep, "w", encoding="utf-8", newline="").write(before)
            print("VALIDATION-REPORT.md is out of date; run tools/rebuild.py")
            sys.exit(1)
        print(r.stdout, end="")
        if r.returncode:
            sys.exit(r.returncode)
        continue
    r = subprocess.run([sys.executable, os.path.join(T, step[0])] + step[1:])
    if r.returncode:
        print("%s failed (exit %d)" % (" ".join(step), r.returncode))
        sys.exit(r.returncode)
print("rebuild %s." % ("check passed" if check else "complete"))
