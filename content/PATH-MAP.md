# Path Map

On 2026-09-17 the repository was reorganised from `notes/` into a numbered pipeline under `content/`. File names and the contents of the sources were not changed. Only folder locations moved.

| Old path (commits up to `49fb181`) | New path |
|---|---|
| `notes/original-sources/` | `content/01-sources/` |
| `notes/concepts/` | `content/02-concepts/` |
| `notes/idea-bank/` | `content/03-idea-bank/` |
| `notes/story-discovery/` | `content/04-story-discovery/` |
| `notes/story-discovery/leads/` (planned, never created) | `content/05-story-leads/` |

## Effect on source traces

Idea cards cite **snapshot `ef70024`**. At that commit the concept sources lived under `notes/concepts/`. The folder paths inside every source trace, source note and batch report were rewritten to `content/02-concepts/…`. Headings, line numbers and PDF or printed page locators are unchanged, because the source files themselves were not edited.

To check a citation against the original snapshot, replace the new prefix with the old one:

```
content/02-concepts/Chapter 1/Concept 6 - …/sources/Abhidhammattha Pradeepika.md
→ notes/concepts/Chapter 1/Concept 6 - …/sources/Abhidhammattha Pradeepika.md   (at ef70024)
```

## Not rewritten

- Git commands in the processing report that refer to commits made before the move.
- `Notes/Ideas/` in `01-sources/Splitting a Book MD into Concepts.md` and in `instructions/CONCEPT_TO_IDEA_WORKFLOW.md`. It is a historical reference to an older plan and never existed in this repository.
