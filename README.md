# Chathura Was Here — Stories • Journeys • Memories

Research repository for a cinematic documentary project, mainly about Sri Lanka. It holds the Abhidhamma source material, the human ideas drawn from it, the story-discovery layer built on those ideas, and the interactive tool that connects everything.

The governing principle is **Story → Place → Experience**. The philosophy decides the questions Chathura carries. Real people and places decide the stories he finds.

## Structure

```
content/
  01-sources/            Book extracts, source maps and extraction guides
  02-concepts/           102 concept folders (Chapter 1–9), each with verbatim source extracts
  03-idea-bank/          172 idea cards, index, concept register, source notes, batch reports
  04-story-discovery/    Territories, overlap map, potential matrix, research shortlist, templates
  05-story-leads/        112 story-lead cards from desk research (authoritative research records)
  06-series-architecture/ 98 provisional episode candidates (Episodes 2–99): release order, chronology, connections
  PATH-MAP.md            Old notes/… paths → new content/… paths
instructions/        Agent instructions for each stage
app/                 Next.js research explorer (interactive tool)
```

Each stage only adds a layer. Nothing earlier is rewritten.

| Stage | What it establishes | What it does not |
|---|---|---|
| 01 Sources | What the books actually say, with page markers. | Nothing about real people. |
| 02 Concepts | One folder per concept, extracts unchanged. | No interpretation. |
| 03 Idea bank | Human ideas with mechanisms, open questions, limits and full source traces. | No verified story. |
| 04 Story discovery | Territories, overlaps, documentary-potential scores, 24 research questions. | No person, place or event. |
| 05 Story leads | Real possibilities, with facts, accounts and claims kept apart. | Nothing is a story until it is verified and selected. |
| 06 Series architecture | 98 provisional candidates arranged into ten seasons, a proposed hidden chronology and connections. | Not a commissioning decision, not verified, not production-ready. See its own README and canon file. |

## Where to start

- **The tool:** on the machine holding this repository, run `cd app`, `npm install`, `npm run dev`, then open http://localhost:3000 and go to **Episodes**. See [app/README.md](app/README.md).
- **The 98 episode candidates and what each still needs:** the app's `/episodes` and `/attention`, or [content/06-series-architecture/NEEDS-ATTENTION.md](content/06-series-architecture/NEEDS-ATTENTION.md).
- **Where each thing is recorded, and how to regenerate:** [content/06-series-architecture/README.md](content/06-series-architecture/README.md) (`python3 tools/rebuild.py`).
- **The research questions:** [content/04-story-discovery/research-shortlist.md](content/04-story-discovery/research-shortlist.md).
- **How ideas were made:** [instructions/concept-to-idea.md](instructions/concept-to-idea.md) and [instructions/CONCEPT_TO_IDEA_WORKFLOW.md](instructions/CONCEPT_TO_IDEA_WORKFLOW.md).
- **How stories are researched next:** [content/04-story-discovery/research-agent-instruction.md](content/04-story-discovery/research-agent-instruction.md).
- **What was checked and what is still open:** [content/04-story-discovery/processing-report.md](content/04-story-discovery/processing-report.md).

## Rules that hold across every stage

- Hypothetical directions in idea cards are **not** verified stories, and must never be passed downstream as if they were.
- Story research comes before screenplay development. A screenplay needs a verified lead, documented consent and a human selection decision.
- Never explain anyone's disability, poverty, social position, appearance or life circumstances by karma, past action or rebirth.
- Never type people by temperament or label anyone greedy, envious, hateful, proud or deluded.
- Doctrine is not science. Cosmology, rebirth and traditional physiology are recorded as doctrine only.
- Death, grief, illness, disability, addiction and self-harm need a safeguarding protocol and informed consent.
- A participant may understand their own experience differently from the philosophy. Their view stands.

## Working notes

- The source extracts are stored with Windows line endings, and the same Sinhala folder names can appear in two Unicode forms over SMB. Both are cosmetic; see the processing report.
- PDFs in `content/01-sources/` are ignored by git (`.gitignore`).
- **This repository is public, and the spoiler-sensitive series files have already been pushed to it.** The app's `EXPLORER_SPOILERS=hide` setting protects only the app's pages. See CONFLICT-04 in `content/06-series-architecture/SERIES-CANON.md`.
- Idea cards cite source snapshot `ef70024`, when these folders were still under `notes/`. [content/PATH-MAP.md](content/PATH-MAP.md) maps the old paths to the new ones.
