# GRP-02 reassignment — the standard, and the nine locations

Chathura's verdict, **2026-09-26**: every group except GRP-01 lacks variety and lacks locations worth
filming. The cause is recorded in `../10-standing-creative-decisions.md`: later passes started from the
existing film and asked what could be saved, instead of doing what GRP-01 did.

## What GRP-01 did, as a procedure

1. **Ignore the existing location completely.** Ask only: what does this concept need in order to be *seen*?
2. **Find the place where a documented or disputed story already asks the concept's question** — and where
   the place has scale, relief, light, weather or ruin worth travelling to photograph.
3. **Require both.** A great story in a shed is rejected. A magnificent place with no story is rejected.
   A perfect doctrinal fit in an ordinary location is the specific mistake that produced this rework.
4. **Prefer destinations.** Monuments, citadels, colossal works, caves, capes, forts, inscriptions, high
   country. The old preference for obscure working places is withdrawn.
5. **Write the whole record fresh.** Not a patch.
6. Every film gets a distinct treatment; audit the group by tradition, period and kind of place.

## Rules that apply to every row below

- Read `footage-led-idea-brief.md` in full first, and `../10-standing-creative-decisions.md`. Both binding.
- Model depth and field order on `development/ideas/IDEA-0001.json`. A thin rewrite is a failure.
- Read the digests for your concepts (`development/digests/Cxxx.json`): summary_en,
  human_interpretation_en, key_terms, does_not_transfer, uncertainties, evidence. **Skip
  sinhala_explanation.**
- Keep `id`, `record_type`, `group_id`, `created_at`, `created_by`, `schema_version` and the
  **concept_ids**. Bump `version`; `updated_at` "2026-09-26"; `updated_by` "claude".
- `review` resets to `{"status":"pending","note":"<full paragraph: why the old film went, the historical
  binding, the guards>","decided_at":null,"decided_by":null}`. `selection.recommendation` stays "keep".
- `suggested_location` carries name, region (district named early), coordinates, why_here, what_to_film,
  access, best_time, images, sources, research_note, `historical_thread` (story / how_it_binds /
  what_is_certain / what_is_disputed / sources), proposed_by "claude", proposed_at "2026-09-26". **No
  `confirmation` key.** Figures that differ between sources go in `what_is_disputed`, never averaged.
- **Citations are machine-checked**, range-aware, against that concept's own digest evidence. Off-by-one
  fails. Only cite lines you have read and checked against the claim they carry.
- 5–8 `sequence` beats, each with BOTH `on_screen` and `voice`; concept_ids only from the linked concepts.
- **No real place name outside `suggested_location`.** Historical persons, kings, dynasties, chronicles,
  colonial powers, companies and deities may be named in the voice.
- Images: Commons **search API** with a descriptive user agent (a bare Mozilla UA returns HTTP 429);
  confirm every file with `action=query&titles=` before writing its URL. Never write an unconfirmed URL.
  If Commons holds nothing honest, leave `images: []` and say so in `research_note`.
- Write with Python `json.dumps(obj, indent=2, ensure_ascii=False) + "\n"`.
- Finish with `cd app && node scripts/check-data.mjs`. Never `git add`/`commit`. Never touch `content/`,
  another idea file, or app source.
- **The floor applies in full every time** (see the brief): nobody in frame is an exhibit, no worship
  interrupted or lit, nobody who cannot meaningfully refuse a camera, no kamma-as-fate, no C061
  remembrance or legacy register, colonial and contested history recorded and never adjudicated.

## The group's hazard

GRP-02's concepts are the **greed-rooted minds**. A camera cannot show greed. No identifiable person may
be framed as greedy, acquisitive, devout, desperate or covetous — in narration *or* in framing. Every film
here moves the wanting into landscape, architecture, documents or institutions so that no face carries it.

---

## The nine

### IDEA-0013 → Galle Fort · C006 primary, C004, C032 · title "Built For a Smell"
A walled town two empires built and held because of the taste and smell of a tree's bark. Portuguese
fortification in the 16th c.; Dutch capture 1640 and the fort that stands; British 1796; the VOC's
principal stronghold, and the cinnamon monopoly its reason. Research the trade, the warehouses, the
ramparts, the lighthouse, and what the walled town is now (inhabited, World Heritage).
**Guards:** IDEA-0009 (Jaffna Fort) is the slate's other colonial fort — that film is an inventory of
*what a wall is made of*, dusk, macro cross-section. Share none of it: no wall-fabric argument, no macro
masonry, no dusk. Yours is a whole inhabited town and a commodity. The cinnamon peelers were a caste-bound
workforce under the Dutch: state it once if the record establishes it, characterise no caste, and do not
duplicate the slate's separate cinnamon film. **This record currently holds an executed merge with
IDEA-0021 — clear `selection.merged_with` to `[]` and record that the roadside material leaves the slate.**
**Treatment:** the urban film — street and rampart level, hard coastal light, salt, walls, sea on three sides.

### IDEA-0014 → Dambulla cave temple · C004 primary, C005, C006 · title "Nothing In Here Is Plain"
Five caves under one overhang, on the order of 150 statues, thousands of square metres of painting — and
**the paint follows the rock's own contour**, so the ceiling is the rock's shape painted rather than a flat
surface carrying an image. Tradition ties it to a king who sheltered here in exile and endowed it on his
return; establish the real dated phases. Research the counts, the painted area, the five caves, and the
**water that seeps from one ceiling and is collected** — what is documented, whether it runs year-round.
**Guards:** IDEA-0003 (Sigiriya) is 17 km away — that film is an ascent, a plastered wall of visitors'
verses, a gateway's paws, a summit. Share none of it. **Check what C005 actually exempts before implying a
verdict on a room built to be beautiful; if the digests exempt it, say so — that is the better film.** No
artificial light on painted surfaces: a frame that cannot be exposed on available light is lost, not lit.
Filming inside may be refused; say what survives if it is.
**Treatment:** the interior film — enclosed, dim, available light, surfaces close, the ceiling's curve.

### IDEA-0016 → Kataragama · C004 primary, C005 · title "Everyone Here Came to Ask"
The island's principal place of petition: the Maha Devale, the river pilgrims bathe in before approach, the
offering stalls. Venerated by Buddhists, Hindus, Muslims and reportedly Vedda communities. Research the
site's disputed antiquity, the Esala festival, the vow-and-offering practice, and the numbers.
**Guards — the severest in the group.** No individual pilgrim is a subject: crowds as crowds, no held
faces, nobody followed or filmed at the moment of a vow, nobody praying or weeping. **No bodily
austerities filmed at all** — no fire-walking, hook-hanging, kavadi piercing or trance. Do not rank the
traditions sharing the site. Do not adjudicate whether petition works, and do not narrate it as
superstition or as faith rewarded; C005's digest forbids using its categories to grade real religious
practice. The slate already has a Poson almsgiving road and a temple chariot festival — differentiate.
**Treatment:** the night film — oil light, camphor, drums, crowds as mass and texture, offerings close.

### IDEA-0019 → Yapahuwa · C021 primary, C006 · title "Eleven Years of It"
A rock ~100 m above the plain, made a capital **1273–1284**, about eleven years. Bhuvanekabahu moved here
with the Tooth Relic; after his death in 1284 a Pandyan invasion took the relic to South India, recovered
by negotiation c. 1288. Celebrated for its **ornamental stairway**, among the finest medieval Sinhalese
stone carving; a perforated stone window survives in a museum; the summit was never completed.
**Guards:** IDEA-0003 (Sigiriya) is the same archetype — rock citadel, grand stairway, abandoned summit.
**This is the hardest constraint in the group.** No lion-as-absence argument, no visitors' inscriptions, no
dawn ascent, no summit payoff, no night. Yours is carved stone in flat daylight and a **duration**; the
payoff is one riser of the stairway, not a view. The relic's capture is stated once, factually, never as a
wound or a triumph. Effort is not a virtue — find the digest's line comparing effort to a boat on a current
and use it. Do not chalk, wet, light or enhance the carving.
**Treatment:** carved stone in flat high daylight, low and still, figures a hand's width across.

### IDEA-0020 → Ridi Viharaya · C021 primary, C032 · title "Found While Looking For Something Else"
A 2nd-century-BCE temple ~18 km north-east of Kurunegala. **The silver ore that completed the great stupa
at the old capital was found here**, and the temple is recorded in the chronicles as built in gratitude.
It also holds **Dutch delft tiles carrying Bible scenes, gifted by the Dutch and laid in a Buddhist
shrine**, plus a reclining image and a rock-cut shrine. Research the chronicle accounts, the tiles' date
and how many survive, and the temple's structures.
**Guards:** IDEA-0014 is the group's other cave shrine — that one is saturation and scale; yours is a floor
of imported tiles and an accident of discovery. Do not narrate a king's merit or the Dutch gift as
tolerance. A living temple: the floor in full.
**Treatment:** close and enclosed — a tiled floor at raking angle, a shrine interior, small things.

### IDEA-0022 → KEEP the location, ADD a historical thread · C032 primary, C004
Passara–Lunugala tea country stays: hill tea country is a genuine shooting location and the film's argument
(a flavour made of weather, kept nowhere) is sound. It lacks history. Research the industry's origin — the
coffee blight, the first tea planting and by whom, the estate where it began, and how the eastern-slope
districts came to be worth more. **Additive only**: write the `historical_thread`, and revise other fields
only where research changes what is true. Do not rewrite logline, two_layers, sequence or concept_merge
unless something is factually wrong. Do not add citations. Do not narrate plantation labour history
decoratively, and do not elegise.

### IDEA-0023 → Kandy Lake (Kiri Muhuda) · C021 primary, C005 · title "A Hundred Who Said No"
Made by **Sri Wickrama Rajasinha**, the last king (r. 1798–1815), by converting paddy fields known as
Tigolwela into an ornamental lake — dated 1807 in some accounts, 1810–12 in others — using **rajakariya,
compulsory labour**, expressly to increase the palace complex's beauty. An island in the middle carries a
royal summer house. Accounts state that when **about a hundred chiefs objected, the king had them impaled
on the bund**. The kingdom fell in 1815.
**Test the impalement hard** — who records it, how early, contemporary or colonial-era, whether the number
and manner are consistent. If it is only late and secondary, say so and stand the film on the forced labour
and the purpose, which are not in doubt.
**Guards:** state the atrocity once, flat, no dwelling, no reconstruction, no shot framed to evoke it. No
verdict on the king and none on the kingdom's fall — **kamma is not fate.** The Temple of the Tooth stands
on this lake: do not film inside it, build no beat on it, film no worship; a distant roofline at most.
**Treatment:** water in a city — a closed circuit walked at ground level, mist at first light, an island
that cannot be reached.

### IDEA-0024 → Horton Plains · C004 primary, C032 · title "Nothing To See For Most of It"
A plateau at ~2,100–2,300 m ending in an escarpment where the ground drops on the order of 870 m. Older
name Mahaeliya. Research: the colonial hunting history and the resthouse named after a person; national
park (reported 1988) and World Heritage (reported 2010); the two montane ecosystems; the **unexplained
montane forest dieback**; and the **cloud** — the view is reported open only briefly after dawn and closed
most of the day and year. Find real figures.
**Guards:** C032's neutral feeling is **not** calm or equanimity — that distinction is load-bearing, and
making cold or emptiness a spiritual lesson is the obvious trap. Colonial hunting: one factual mention at
most, no animal killing as spectacle. The dieback is recorded as unexplained, not as a warning or an
indictment. A strictly protected national park: research the entry regime, and treat drone as prohibited.
Separate it clearly from IDEA-0018, the group's other cold film — that is mist over imported grass in a
built town; this is wilderness at two thousand metres.
**Treatment:** the high cold film — cloud at ground level, wet tussock, wind, no colour, long grey holds,
and one short window in which the drop appears and closes.

### IDEA-0026 → Delft island (Neduntheevu) · C005 primary, C021 · title "Still Here Without Us"
An island ~10 km off the peninsula, reached by ferry. **Horses were brought by the Portuguese in the 16th
century, then bred and traded by the Dutch from about 1660, and the British continued the practice.**
Roughly **five hundred feral descendants** still range the plains, inside **coral walls built in the Dutch
period, probably to pen them**. There is a baobab with a hollow trunk ~52 ft round. Research the stud farm,
the walls, the island's other remains, the ferry, the water, and the horses' present status and ownership.
**Guards:** IDEA-0044 (GRP-03) is currently also on this island — it is being replaced in that pass; note
the overlap in `connections` and in your report. Animal welfare: film the horses at distance, never driven,
baited, cornered or chased, and do not present them as symbols of freedom. The island's people are not
local colour. Do not narrate the empire's appetite as irony.
**Treatment:** the empty film — flat windswept plain, coral walls, salt scrub, horses at long lens, a
baobab, the sea on all sides. The group's only animal film and its only island.
