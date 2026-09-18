# -*- coding: utf-8 -*-
"""Stops a one-time seeding script from running again.

The research batches (b01 ... b13_14), architect.py and connections.py created the first version of data/ on
2026-09-18. Since migration m001, data/stories.json, data/connections.json and the lead cards in
content/05-story-leads/ are the authoritative records and are edited by hand or in the app. Re-running a seed script
would replace researched and edited data with the hard-coded values inside the script, and would write the pre-m001
schema. The scripts are kept only so every lead and every planning decision can be traced to where it came from.

Safe regeneration commands are listed in ../README.md (`python3 tools/rebuild.py`).
"""
import os, sys

name = os.path.basename(sys.argv[0]) or "this script"
sys.stderr.write(
    "%s is a one-time seeding script and has already been applied (2026-09-18).\n"
    "It is kept for provenance only. Running it would overwrite authoritative data with hard-coded values.\n"
    "To regenerate readable files from the current data, run:  python3 tools/rebuild.py\n" % name)
sys.exit(2)
