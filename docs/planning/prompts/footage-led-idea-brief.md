# Footage-led idea brief

You write or rewrite candidate ideas for *Chathura Was Here*. This replaces
`retired-idea-finalisation-brief.md`, which specifies a shape the project no longer uses.

## What a film is

Each film is primarily **drone and ground video of one real location**, with a voice explaining a
piece of Abhidhamma over footage that matches it. **It is not a film about a person's life.**

Two layers have to work at once:

- **Sound off** — a viewer with no interest in philosophy watches beautiful footage and gets a
  complete, satisfying piece with its own beginning, middle and payoff.
- **Sound on** — the voice turns that same footage into a demonstration of the concepts.

The standard to aim for: **the single most beautiful shot the location produces should also be the
clearest statement of the concept.** Not an illustration bolted onto pretty pictures — the same shot
doing both jobs. Where a film achieves this it is because the place genuinely does the thing: a
mountain's shadow really is a shape made of nothing; a trig mark really does wait without weakening
for whoever comes back.

## The shape

Read `development/ideas/IDEA-0140.json` and `IDEA-0157.json` as models and match their field order,
structure and depth. A thin rewrite is a failure. Fields:

- `place` — `what_kind_of_place`, `why_it_is_worth_watching`, `what_moves_or_changes`,
  `when_it_looks_best`
- `two_layers` — `without_the_philosophy`, `with_the_philosophy`
- `sequence` — 5–8 beats, each `{on_screen, voice, concept_id}`. `voice` is the narration line as it
  would be spoken. `concept_id` must be one the idea links. **Every beat pairs what is seen with what
  is said over it**; the data check fails a beat with one and not the other.
- `concept_merge`, `concept_links`, `what_the_viewer_could_understand`, `what_must_be_real`,
  `position_hint`, `risks`, `drop_if`, `connections`
- `selection` — `keep`; selection now happens through Chathura's `review` verdict, not here
- `review` — `{"status": "pending", ...}` on any rewrite; a rewritten body invalidates an older verdict
- `suggested_location` — `name`, `region` (district named early), `coordinates`, `why_here`,
  `what_to_film`, `access`, `best_time`, `images`, `sources`, `research_note`,
  `proposed_by: "claude"`. **No `confirmation` key**: one verdict covers the idea and its place.

There is no `situation` block and no separate `location` selection. Write files with
`json.dumps(obj, indent=2, ensure_ascii=False) + "\n"` so Pali diacritics stay literal.

## Read the digests fresh

Work out what each concept means from its digest — `summary_en`, `human_interpretation_en`,
`key_terms`, `does_not_transfer`, `uncertainties` — rather than inheriting an earlier idea's reading.
Skip `sinhala_explanation`; it is the bulk of the file and you do not need it.

Then test every link: does the digest actually support it? Rewrite each `why`, drop a link the digest
does not carry, and **write every `does_not_transfer` line that bears on the film into the link or
the risks**, not into a generic caution.

**Citations are machine-checked.** Every `Cxxx-P:Lnn` must resolve against that concept's own digest
evidence, using the same range-aware rule the lesson citations obey. A line that exists in the source
but is not represented in the digest's evidence will fail, and off-by-one ranges fail. What the check
*cannot* catch is a real line attached to the wrong claim — only reading catches that, and it has
happened more than once.

## The floor

None of these are stylistic. Each comes from a `does_not_transfer` line, and about forty ideas lost
their subject entirely to them.

- **Nobody in frame is an exhibit.** A camera cannot show which mental factor is present, and the
  digests say so. No identifiable person is presented as angry, envious, greedy, confused, kind,
  composed or attained.
- **No disability, illness, dying, patients or medical settings.** C071 and C051 forbid letting a
  doctrine about missing faculties touch a real person's impairment, whatever the narration says.
- **No bereavement, funerals or private grief**, and no "what they left behind": C061 states that
  legacy and remembrance are *not* the teaching.
- **Kamma is not fate.** No poverty, loss, illness or failure may read as deserved. C080: ageing and
  grief are conditioned by birth, not a verdict on anyone. C090: "good people are protected" would
  mean anyone harmed lacked goodness.
- **Livelihoods are not destinies.** The sources' examples of hunters, fishermen and butchers must
  never frame a real working community.
- **The unconditioned cannot be filmed.** Where the voice reaches for Nibbāna it must say what it
  cannot show.
- **No children as characters**, and nobody who cannot meaningfully refuse a camera.

If a concept cannot survive without its human subject, **say so plainly rather than forcing a weak
film.** That judgement has produced better films than compliance would have.

## Locations

Real Sri Lankan places, researched with search, with real coordinates and the district named early in
`region`. **Small, little-known working places are strongly preferred over landmarks** — that is why
all 25 districts are covered. Name the place *only* inside `suggested_location`: the prose describes
kinds of place, never a real name.

Before choosing, read `docs/planning/08-the-footage-led-slate.md` for the locations already taken and
the archetypes used up. **Repetition is the most common failure in this work.** When several writers
work in parallel on the same concept they converge on the obvious answer — five collisions had to be
relocated after the fact. If you are one of several, take an assigned district pool and stay in it.

## Images

Use the Commons **search API**; fetching image files directly returns HTTP 429 and wastes the budget:

```
curl -s --max-time 45 -A "chathura-notes-research/1.0" \
  "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=size&gsrsearch=<URL-ENCODED+TERM>"
```

Build `url` as `https://commons.wikimedia.org/wiki/Special:FilePath/<FILE_NAME>` and `source` as
`https://commons.wikimedia.org/wiki/File:<FILE_NAME>`, and confirm existence through
`action=query&titles=File:<NAME>&prop=imageinfo`. **Never write a URL you have not confirmed.**

Commons holds nothing for many small Sri Lankan working places — 18 ideas legitimately carry no
image. If you use a picture of the surrounding landform or the object type rather than the site, the
caption must say so explicitly. Otherwise leave `images` as `[]` and say so in `research_note`. A
photogenic picture of somewhere else is worse than none.

## Finish

Run `cd app && node scripts/check-data.mjs`. All checks pass before you start, so any failure naming
your files is yours. Never `git commit` or `git add`; never touch `content/`, another group's files,
or the app source.
