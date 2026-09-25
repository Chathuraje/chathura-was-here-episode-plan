# Standing creative decisions

Chathura's decisions about how this series is made, in the order he gave them, with the reasoning and
how to apply them. **Read this before starting work on any group.** It exists because the first group
had to be rewritten twice: once when the model changed, and again when the second pass repeated a
different mistake. Each entry is here to stop that happening a third time.

`prompts/footage-led-idea-brief.md` is the working brief handed to whoever writes an idea. This file is
the record of *why* the brief says what it says, and it is the authority where the two disagree.

---

## 1. The films are footage-led, never biography

*Given 2026-09-20.*

Each film is primarily drone and ground video of **one real location**, with a voice explaining a piece
of Abhidhamma over footage that matches it. It is not a film about a person's life.

**Why:** Chathura's words — "i dont wants to explore the persons life though the series my main goal is
to show beautifull drone and normal video of a location primaraly and while i do that i use the voice
to explain the philoshopy while using matching footages."

**How to apply:** the location is the subject. No person is followed as a character. About forty ideas
lost their original subject to this and the series is better for it.

## 2. Claude proposes the location; Chathura confirms or rejects

*Given 2026-09-20.*

Every idea carries one proposed location in `suggested_location`, with coordinates, framing notes,
verified reference images and sources. It carries **no verdict of its own** — one `review` verdict
covers the idea and its place together. A per-group quota is enforced in the app: once a group has its
full count of confirmed films, no more can be confirmed.

**How to apply:** never record a location as Chathura's own choice. `proposed_by` is always `"claude"`.

## 3. Place names never appear in the prose

*Given 2026-09-20.*

The name of a real place appears **only inside `suggested_location`**. The logline, `place`,
`two_layers`, `sequence` and every other field describe a *kind* of place.

**Why:** so the writing is about the film and the philosophy, and a location can be swapped without
rewriting the idea.

**How to apply:** a historical person, king, scholar, chronicle or colonial power **may** be named in
the voice — that is how a story is told. The place may not. Where a place's own ancient name is the
subject of the film, refer to it in the voice by description ("a word meaning copper-coloured sand")
and keep the name itself inside `suggested_location`.

## 4. A location needs a cinematic look *and* a rich philosophical story

*Given 2026-09-25, after reviewing the first group.*

Both, in the same place. Chathura's words: "i need the location to have be able to get cinamatic look
also a rich philoshopical story."

**Why the first pass failed it:** it preferred small, little-known working sites — gem pits, salt pans,
a brass lane, a lagoon outlet — and carried the philosophy by **analogy**: the place happened to
resemble what the concept said. Ten of twelve films in the first group were rejected or set aside.

**How to apply:** the test is not "does this place resemble the concept?" but "is there a real story
here — chronicled, inscribed, excavated or disputed — that already turns on the same question the
concept asks?" A riddle put to a king about whether a name and a thing are separate. A legend the
stones disprove by centuries. Seven colossal figures whose names nobody agrees on. **And** the place
must carry a frame worth flying a drone for. A concept demonstrated on a carved threshold stone is true
and unwatchable.

**Landmarks are allowed where the story earns them.** The earlier preference for obscure working places
is withdrawn.

## 5. No monoculture of site type

*Given 2026-09-25, on reviewing the second pass: "dont pick only buddhist monestry add more
differentiation."*

**Why:** the second pass fixed the analogy problem and immediately created a new one. Eight of the
first group's twelve films were ancient Buddhist monuments, and two of those were rock monasteries with
cave shrines in the same district. It is the same "same-minded" failure as two gem-washing films, one
layer up.

**How to apply:** before finishing a group, list its films by **tradition** (Theravāda, Mahāyāna,
Hindu, Muslim, Christian, multi-faith, secular), by **period** (prehistoric, Anuradhapura, Polonnaruwa,
medieval, colonial, modern) and by **kind of place** (monument, temple in use, citadel, fort,
engineering work, natural landform, wild coast, excavated site, working place). If one cell holds more
than about a third of the group, replace the weakest occupants. Sri Lanka's deep history clusters in
the Buddhist monuments of the dry zone; that is a fact about the record, not a licence.

## 6. Merge two places into one film where the merge tells the story better

*Given 2026-09-25: "if you think some places can merge to say the philoshopical story better do that and
make the reson and idea behind it. but do not do that for all."*

**Not a default.** Merge only where two films would otherwise be near-duplicates **and** the pair says
something neither could alone.

**How to apply:** state the reasoning explicitly in `concept_merge` and in the `review` note, record
the absorbed idea in `selection.merged_with`, and add a `connections` entry to both records. Then the
freed record is repurposed for a differentiated film rather than deleted.

**The worked example (GRP-01):** two films were the closest pair in the group — a colonnade of 1,600
pillars whose palace is gone, and a stupa of 93 million bricks that lost half its height. Same city,
same concept pair, same argument from two sides. Merged, they say what neither could: *the name is
indifferent to which way its object fails* — it does not need the whole, and it does not need the size.
The freed record became a film on an empty red cape at the other end of the island.

## 7. No two films in a group share a visual approach

*Given 2026-09-25: "make some differentiation of style without being same minded."*

**Why:** every film in the second pass had drifted towards the same treatment — a monument, an aerial
reveal, golden hour, a slow push. Correct philosophy, identical cinema.

**How to apply:** assign each film in a group a distinct treatment and write it into `place` and
`two_layers` so it is visible in the idea, not only in a plan. Vary: time of day, weather, lens length,
whether the camera moves at all, whether there is a drone, whether the payoff is a shot or a cut, wide
versus macro, crowd versus emptiness, interior versus exterior, land versus water.

GRP-01's treatment map, as a model of the spread to aim for:

| Idea | Treatment |
| --- | --- |
| IDEA-0001 | night into dawn, handheld inside a crowd, a climb |
| IDEA-0002 | a traverse on foot between two monuments; hard geometry, vertical moves |
| IDEA-0003 | ascent plus extreme close texture — a film of surfaces |
| IDEA-0004 | the sea film: cliff, swell, salt, and if obtainable, underwater |
| IDEA-0005 | interiors, lamplight, monsoon — the wettest film, almost no drone |
| IDEA-0006 | the still film: one enormous held frame, then macro. Almost no movement, no drone |
| IDEA-0007 | water and air only; the highest and widest film |
| IDEA-0008 | steps and stone at first light; built on one question in the voice |
| IDEA-0009 | hard sun, raking walls — a film of edges |
| IDEA-0010 | one rock face, a slow reveal, ending on a pull-back |
| IDEA-0011 | the empty film: heat haze, red earth, no architecture, no people |
| IDEA-0012 | two sites, long lens; the payoff is a cut, not a shot |

## 8. Titles follow the film

*Given 2026-09-25: "you can change the titles if neded."*

When a film changes underneath its title, retitle it and keep the old title in `aliases`. A title
describing a location the film no longer visits is worse than a new one.

## 9. A rewritten body invalidates an older verdict

Standing rule, and it has cost work twice, so it is written down.

Rewriting an idea's body resets `review` to `pending`, **including a film Chathura had already
confirmed or rejected.** Adding research to `suggested_location` — a `historical_thread`, sources, a
`research_note` — does **not** reset it, because the film and its place are unchanged.

**How to apply:** tell him explicitly whenever a verdict has been reset and why, so he knows which
records need judging again. A rejection of a location that has since been replaced refers to nothing.

## 10. The floor is not negotiable, and scale is not a licence

See "The floor" in `prompts/footage-led-idea-brief.md`. Every line of it comes from a `does_not_transfer`
statement in the project's own digests. Nobody in frame is an exhibit; no disability, illness, dying or
medical setting; no bereavement or legacy framing; kamma is never fate; livelihoods are never destinies;
the unconditioned cannot be filmed; no children as characters.

Monuments raise their own versions: a crowded sacred site has the same consent limits as anywhere, and a
site whose history includes war, conquest or the destruction of somebody's temple is **recorded as
layers, never adjudicated, and never narrated as anyone's grievance or anyone's due**.

## 11. Keep the disputes

Where a site's history is contested, the dispute is usually the most valuable thing on it. Four rival
datings, an impossible legend, a name whose origin is unknown, an identification no two scholars share
— these go in `historical_thread.what_is_disputed`, held apart from `what_is_certain`, and they are
never smoothed into fact. Several of the strongest films in the first group rest on a disagreement.

---

## Applied so far

- **GRP-01 (2026-09-25).** Ten of twelve rewritten onto story-bound locations, then a second pass for
  differentiation after Chathura found eight of twelve were Buddhist monuments. One merge (a colonnade
  absorbed a stupa; the freed record became a wild cape). Buddhist monuments 8/12 → 4/12; nine districts;
  12/12 carry a historical thread. Two confirmed.
- **GRP-02 (2026-09-25).** All fourteen candidates were working places, markets or trades with no
  historical story between them, and five were about buying and selling. Six rewritten: a pearl fishery
  and a governor's ruin, a manor of low doorways, a planted hill town, a royal pleasure garden, an ancient
  port — plus one merge (two roadside produce strips, on C006's own prompted/spontaneous axis). One film
  was dropped outright because it duplicated IDEA-0059's almsgiving night. **Eight keepers still carry no
  historical thread**; they are good films but only half-meet the standard.

- **GRP-03 (2026-09-25).** Eleven of fourteen were working places with no historical story. Four
  rewritten: two Dutch forts of one 1761 war, a hill shrine whose name means the place of the oath, the
  ground of the last elephant kraal, and the katikāvata inscription. **No merge** — the only near-duplicate
  pair was two water-allocation films, and replacing one bought more differentiation than combining them
  would have, so the merge tool was left alone. One film also went for a second reason worth remembering:
  its engine was an unattributable injury to identifiable people in a former conflict zone, in a group
  whose concepts are the hate-rooted minds. **In a group about a defilement, a film whose subject is a
  real person's grievance breaks the floor no matter how it is narrated.** Ten keepers, four of which
  carry historical threads.

- **GRP-04 (2026-09-25).** The group was already in better shape — two films carried real history, and its
  handling of the two most dangerous concepts in the series is the best work on the slate: C049 and C086
  sort *persons* by type, and these films put the sorting onto forty tree species under one rain, onto
  hundreds of roadside stalls doing the same thing differently, and onto the way a charcoal burn ends, so
  nobody is typed. Two replacements only (a ruined citadel and a timber bridge), plus historical threads
  for the two strong films that lacked them. One replacement also removed a duplicate: two films were both
  about channels branching through a coastal wetland. No merge.

- **GRP-05 (2026-09-26).** The lightest pass of the five, and deliberately so. All sixteen candidates are
  working places — but here that register is *correct*: the group's subject is the mechanics of a single
  moment of perception, and its doctrinal fits are the best on the slate (a bagasse heap holding one height
  for five months while every part of it burns and is replaced within hours, against matter's
  seventeen-moment lifespan; drum patterns that exist first as spoken syllables, against the process
  charts). Replacing those would have damaged the group. **Three historical threads** (a rock temple where
  a recited canon was written down, a waterfall that runs on a gazetted schedule, a river where a bridge
  was built in 1957 in order to be destroyed) and **one replacement**, of the film that put a camera on
  villagers queuing for drinking water in a drought — its structure moved intact to a lighthouse and the
  exposure did not come with it.

**The lesson to carry:** *diagnose every group the same way, but do not assume every group needs the same
prescription.* Four groups needed locations replaced. This one needed research. Manufacturing changes to
match a previous group's shape would have made it worse.

### Two mistakes made in this session, recorded so they are not repeated

- **A duplicate archetype chosen with the evidence in hand.** GRP-05's replacement is a lighthouse, and
  GRP-06 already has one — the Great Basses tower. The Great Basses was in the taken-locations list that
  was consulted, and was even used as a reason to rule that reef out for another film, and a second
  lighthouse was chosen anyway. **Check the archetype, not just the place name, and check it against the
  whole slate rather than the group in hand.**
- **District concentration went unnoticed until a writer flagged it.** Matara District now carries six
  films. The slate table reports a district range but nothing warns when one district fills up. Worth a
  check in `slate-table.mjs` or a habit of reading the district column before choosing.

### A pattern in the concepts, worth carrying forward

Twice now — GRP-03's oath place and GRP-04's citadel and drawdown — a writer has found that the digests
**exempt** the very state a film looked like it was about. C008's harmful doubt is restricted to eight
named matters, and ordinary not-knowing about something one cannot yet investigate is explicitly not it;
C074 names that look-alike doubt and says it may not be unwholesome at all. So a film about a monument
nobody can explain, or about not knowing when a reservoir will fall, is filming the *exempt* case. That
is a better film than the accusing one and it is what the sources actually say. Expect it, and check for
an exemption before building a film on a defilement.

### What the research keeps catching

Three of the four GRP-03 rewrites corrected facts this project had accepted, and the pattern is worth
naming because it will recur:

- **Borrowed facts.** A swearing stone, a royal court tradition and a folk tale about a cobra all belong
  to a *different* temple in another district; search engines transfer them onto the site with the
  similar name. The same thing happened with a coastal-contact distance that belongs to a different
  prehistoric cave.
- **Press versions outliving scholarship.** The animal shot at the last kraal was not a tusker and not
  the herd's leader, the herd was sixteen rather than seventeen, and shooting elephants was lawful at the
  time — all three established in a 2008 scholarly paper and all three contradicted by the newspaper
  account that popular memory kept.
- **Unsourced formulas repeated verbatim.** The claim that a court still accepts an oath sworn at a
  particular hill appears on dozens of pages and in no statute, case or official document.

The discipline that catches all three is the same: read the primary source, name what could not be
sourced, and keep `what_is_certain` and `what_is_disputed` apart.

## Two things to settle

- **A group record's own gloss can be editorial compression.** GRP-02's `depth` asserts "pleasant feeling
  is where wanting begins". Checked against the digests, that is our summarising rather than doctrine —
  and the Mārgaya actually ranks flat wanting above glad wanting. Writers read these glosses, so a wrong
  one propagates. Every group record's `depth` and concept roles are still marked "draft gloss; verify in
  Step 2" and none has been verified.
- **`updated_at` conflates two different things.** It moves both when a film is rewritten and when
  metadata is tidied, which makes `stale-links.mjs` report false positives. Prefer leaving it alone for
  housekeeping edits.

## Running a group

1. Read the group record in `development/groups/` — its concepts, its `draft_film_count`, its arc.
2. Read each concept's digest fresh. Skip `sinhala_explanation`.
3. Read `08-the-footage-led-slate.md` for locations **and archetypes** already used. Repetition is the
   most common failure in this work, and a fourth railway film is a repeat even at a different station.
4. Choose locations yourself, against decisions 4, 5 and 7, before any writing starts. Pre-assign them
   if several writers work in parallel — writers left to choose converge on the same obvious answers,
   which cost five relocations in the first pass.
5. Write the ideas. Citations must resolve against digest evidence; the check enforces it, but only
   reading catches a real citation attached to the wrong claim.
6. Run `node development/analysis/slate-table.mjs`, `node development/analysis/concept-coverage.mjs`
   and `cd app && node scripts/check-data.mjs`.
7. Report to Chathura: what changed, which verdicts were reset, what is disputed, and what you could not
   verify.

## Open questions he has not settled

- **District concentration.** GRP-01 keeps three films in one district. Defensible, because the
  deep-name history is there; not resolved.
- **`LOC-0001` and `REV-0006`** are orphaned by the move to `suggested_location`. They are his own
  entries and were left in place rather than deleted.
- **Every proposed place is desk research.** No access, permission, participant or drone clearance has
  been verified anywhere.
