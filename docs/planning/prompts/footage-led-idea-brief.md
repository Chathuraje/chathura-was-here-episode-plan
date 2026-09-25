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

## Cinema and a story, not a working analogy

Chathura's standard, given on 2026-09-25 after reviewing the first group: **a location has to deliver a
cinematic look and a rich philosophical story.** Both, in the same place.

The first pass failed this. It preferred small working sites — gem pits, salt pans, a brass lane, a
lagoon outlet — on the principle that little-known working places beat landmarks. They are honest and
they film adequately, but they carry the philosophy only by *analogy*: the place happens to resemble
what the concept says. Chathura rejected or set aside ten of twelve in the first group.

What replaced them are places where **the history is the argument**. The test is no longer "does this
place resemble the concept?" but:

- **Is there a real story here — chronicled, inscribed, excavated or disputed — that already turns on
  the same question the concept asks?** A riddle about whether a name and a thing are separate, put to
  a king before he was taught. A statue whose famous legend the stones disprove by four centuries. Seven
  colossal figures whose names, dates and even tradition nobody agrees on. That story does work no
  analogy can, because it is what actually happened.
- **Does the place carry a frame worth flying a drone for?** Scale, relief, light, weather, water,
  ruin. A concept demonstrated on a carved threshold stone is true and unwatchable.

The floor below still holds without exception. Scale is not a licence: a monument crowded with
worshippers or visitors raises the same consent and dignity limits as anywhere else, and a site whose
history includes war, conquest or the destruction of somebody's temple is recorded as layers, never
adjudicated, and never narrated as anyone's grievance or anyone's due.

**Landmarks are now allowed where the story earns them**, which reverses the earlier preference. What
is *not* allowed is repetition: two rock-citadel films, two ruined-forest-monastery films, two
gem-washing films. Check `08-the-footage-led-slate.md` for archetypes as well as place names — a fourth
railway film is a repeat even at a different station.

## The historical thread

Where a film rests on a story, that story lives in `suggested_location.historical_thread`:

- `story` — what is recorded or disputed, in plain prose, with the proper nouns.
- `how_it_binds` — why this history asks the concept's own question. If this paragraph is a stretch, the
  location is wrong.
- `what_is_certain` / `what_is_disputed` — kept apart. A disputed identification or an impossible legend
  is usually the most valuable thing on the site; it is never smoothed into fact.
- `sources`.

The place-name rule is unchanged: **no real place name in the prose**, only inside `suggested_location`.
The voice may name a historical person, a king or a chronicle, because that is how the story is told;
it still does not name the place.

## Differentiation: tradition, kind of place, and style

Three rules Chathura added on 2026-09-25 after the second pass on the first group. The full reasoning is
in `../10-standing-creative-decisions.md`, which is the authority where this brief is unclear.

**No monoculture of site type.** The second pass fixed the analogy problem and immediately made a new
one: eight of the first group's twelve films were ancient Buddhist monuments, two of them rock
monasteries with cave shrines in the same district. Before finishing a group, list its films by
tradition (Theravāda, Mahāyāna, Hindu, Muslim, Christian, multi-faith, secular), by period
(prehistoric, Anuradhapura, Polonnaruwa, medieval, colonial, modern) and by kind of place (monument,
temple in use, citadel, fort, engineering work, natural landform, wild coast, excavated site, working
place). If one cell holds more than about a third of the group, replace the weakest occupants. The
island's deep history clusters in the dry-zone Buddhist monuments; that is a fact about the record, not
a licence.

**Merge two places into one film where the merge tells the story better** — and only there, never as a
default. Merge when two films would otherwise be near-duplicates *and* the pair says something neither
could alone. State the reasoning in `concept_merge` and in the `review` note, record the absorbed idea
in `selection.merged_with`, and add a `connections` entry to both records.

**No two films in a group share a visual approach.** Every film in the second pass had drifted to the
same treatment: a monument, an aerial reveal, golden hour, a slow push — correct philosophy, identical
cinema. Each film gets a distinct treatment, written into `place` and `two_layers` so it is visible in
the idea itself. Vary time of day, weather, lens length, whether the camera moves at all, whether there
is a drone, whether the payoff is a shot or a cut, wide against macro, crowd against emptiness,
interior against exterior, land against water.

## Locations

Real Sri Lankan places, researched with search, with real coordinates and the district named early in
`region`. Small, little-known working places were once preferred over landmarks; that preference is
withdrawn — see the two sections above. Spread still matters (all 25 districts are covered), but a
monument whose history carries the concept now beats a working site that only resembles it. Name the place *only* inside `suggested_location`: the prose describes
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
