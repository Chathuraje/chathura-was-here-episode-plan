# GRP-03 reassignment — the standard, and the locations

Chathura's instruction, **2026-09-26**: do GRP-03 to the GRP-01 standard. Ten of its fourteen films were
working places carrying the concepts by resemblance; four were already replaced. These are the ten.

## What GRP-01 did, as a procedure — follow it

1. **Ignore the existing location completely.** Ask only: what does this concept need in order to be *seen*?
2. **Find the place where a documented or disputed story already asks the concept's question** — and where
   the place has scale, relief, light, weather or ruin worth travelling to photograph.
3. **Require both.** A great story in a shed is rejected; a magnificent place with no story is rejected.
   **A perfect doctrinal fit in an ordinary location is the specific mistake that caused this rework.**
4. **Prefer destinations.** The old preference for obscure working places is withdrawn.
5. **Write the whole record fresh**, not a patch.
6. **No two films in the group share a visual approach**, and no archetype already on the slate is repeated.
   Check `../08-the-footage-led-slate.md` for archetypes, not just place names — and read its **Films per
   district** table, which is generated: choose against the budget rather than auditing after.
   **But note what that table is.** It is generated from the records as they stand, so **its GRP-03 rows are
   still the OLD locations** — read literally it closes Ratnapura and opens Kandy and Gampaha, and both are
   wrong for this group. The post-rework projection, once all ten rows land: Anuradhapura 9 · Kegalle 7 ·
   Trincomalee 7 · Matale 7 · Monaragala 7 · Nuwara Eliya 7 · Galle, Hambantota, Kurunegala, Badulla, Matara,
   Kalutara, Ampara 6 · Mannar, Polonnaruwa, Gampaha, Kandy 5 · Ratnapura, Jaffna, Batticaloa, Mullaitivu,
   Vavuniya, Colombo 4 · Kilinochchi, Puttalam 3. **That projection is arithmetic, not generated — regenerate
   the table when the group is complete and trust the generator over this paragraph.**

## Rules for every row

- Read `footage-led-idea-brief.md` and `../10-standing-creative-decisions.md` in full. Both binding.
- Model depth and field order on `development/ideas/IDEA-0001.json`. A thin rewrite is a failure.
- Read the digests for your concepts: summary_en, human_interpretation_en, key_terms, does_not_transfer,
  uncertainties, evidence. **Skip sinhala_explanation.**
- Keep `id`, `record_type`, `group_id`, `created_at`, `created_by`, `schema_version`, and **the concepts in
  `concept_links` — same concepts, same order, the first one being the primary**. There is no `concept_ids`
  field on these records; an earlier version of this brief wrongly named one. Do not create it. Bump
  `version`; `updated_at` "2026-09-26"; `updated_by` "claude".
- `review` resets to pending with a full-paragraph note. `selection.recommendation` stays "keep".
- `suggested_location`: name, region (district named early), coordinates, why_here, what_to_film, access,
  best_time, images, sources, research_note, `historical_thread` (story / how_it_binds / what_is_certain /
  what_is_disputed / sources), proposed_by "claude", proposed_at "2026-09-26". **No `confirmation` key.**
  Variants between sources go in `what_is_disputed`, never averaged.
- **Citations are machine-checked**, range-aware, against that concept's own digest evidence. Off-by-one
  fails. Only cite lines you have read and checked against the claim they carry.
- 5–8 beats, each with BOTH `on_screen` and `voice`; concept_ids only from the linked concepts.
- **No real place name outside `suggested_location`.** Historical persons, kings, dynasties, chronicles,
  colonial powers and deities may be named in the voice.
- Images: Commons **search API** with a descriptive user agent (bare Mozilla returns 429); confirm every
  file with `action=query&titles=` before writing its URL. Never write an unconfirmed URL. `[]` is an
  acceptable answer if Commons holds nothing honest — say so in `research_note`.
- Write with Python `json.dumps(obj, indent=2, ensure_ascii=False) + "\n"`. Finish with
  `cd app && node scripts/check-data.mjs`. Never `git add`/`commit`; never touch `content/`, another idea
  file, or app source.
- **The notes below are a starting point you are expected to correct.** Across this rework, writers
  corrected the briefing notes in almost every film — nine corrections in one record. The recurring kinds:
  a chronicle that does not contain the story attributed to it; a founding legend carried only by texts
  centuries later, sometimes by the site's own monks; a figure repeated verbatim with no source; a claim
  belonging to a **different site** with a similar name; a date impossible on its own terms. Test everything
  and report what you corrected.

## The group's hazard

GRP-03's concepts are the **hate-rooted minds and the unwholesome factors**. **A camera cannot show anger.**
No identifiable person may be presented as angry, envious, proud, resentful or afraid — in narration *or* in
framing. Every film moves the aversion into landscape, architecture, documents or institutions so that no
face carries it. Four films in this rework independently found that a charge in the digests lands on
**looking** rather than on the people filmed, and turned it onto the camera. Look for that; do not force it.

**Already replaced and not yours:** IDEA-0033 (two Dutch forts of the 1761 war), IDEA-0034 (a hill shrine
whose name means the place of the oath), IDEA-0036 (the ground of the last elephant kraal), IDEA-0039 (the
katikāvata rock inscription). **Forts, an absence-as-subject clearing, an inscription-led film and a small
hill shrine are therefore all used.**

---

## IDEA-0035 → Kelaniya Raja Maha Vihara and the Kelani Ganga bank · C007 primary, C022 · Gampaha
**Title: "The Seat They Gave Up"**

The Mahāvaṃsa records the Buddha's second visit as going to settle a war between two nāga kings, Mahodara
and Cūlodara, **uncle and nephew, who had brought armies against each other over a gem-set throne**. The
throne was given up, and the nāga king Maṇiakkhika of Kelaniya asked for it and enshrined it here. The
temple lost land under Portuguese rule, was patronised in rebuilding by Kīrti Śrī Rājasiṃha, refurbished by
Helena Wijewardene in the early 20th century, and carries murals by Solias Mendis.

*Firm:* coordinates 6.953139 / 79.918528; the throne account **as a chronicle claim**; Kīrti Śrī's
patronage; the Wijewardene refurbishment; the Mendis murals; loss of land under the Portuguese.
*Repetition, test it:* the destruction date (1575/1578), the mural dates (commonly 1927–46), the stupa's
"heap of paddy" profile as a documented description, the Duruthu Perahera's history. **English Wikipedia's
"Kelaniya district" is wrong — it is Gampaha District.** Whether the Buddha visited is faith, not
archaeology, and the record must say so.

**Binding:** C007's sharpest case — wanting turns to hating the instant the wish becomes *remove the
obstacle*, and the obstacle is a living thing. Two kinsmen, one seat, each the other's only obstacle. The
digest also holds that the two hate-rooted minds differ **only** in spontaneous versus prompted: a quarrel
that arose between kin, and a standing-down that came only when a third party intervened. C022 supplies the
four constants and fear as aversion that has judged the thing too strong and wants away — which is what two
armies standing down actually is.
**Guards:** do not adjudicate the Portuguese period — **cut that line entirely if it competes with slot
0037's film.** No worship filmed; no perahera crowd as devout.
**Treatment:** dawn at water level; long static wides; no drone; payoff is a reflection breaking.

## IDEA-0037 → The Kalpitiya channel, Dutch Bay and the Puttalam lagoon · C007 primary, C028 · Puttalam
**Title: "A Thing Asked For"**

*(Munneswaram was withdrawn: it repeated IDEA-0004's archetype — a Hindu temple destroyed by the Portuguese
and later restored — and would have put a second coastal-hill temple beside it. This replacement shares
neither the kind of place nor the story shape.)*

A 28 × 12 km sheet of shallow lagoon — 327 km², average 1–2 m deep — closed from the ocean by a sand
peninsula, with one narrow entrance at its northern tip, sandbars and low islands outside it, the Bar Reef
beyond, and the hardest reliable cross-wind in the country. The Dutch fort commanding the entrance is at
**8.2356 N, 79.7661 E**; lagoon centre approx. 8.10 N, 79.77 E. Kalpitiya DS division. **Puttalam District,
joint-lowest on the slate at 3.**

*Firm:* Puttalam was the **King of Kandy's** port, an entrepôt for areca nut shipped to the Indian coast via
Kalpitiya; the Dutch had to ask his permission to trade there. The **Westerwolt Treaty, signed 23 May 1638 at
Batticaloa** by Rājasiṃha II — Dutch help against the Portuguese in exchange for a monopoly of the island's
principal trade goods and the king's promise to pay the Company's war expenses. The Portuguese expelled
1656–58. **The Company then kept the port it had taken**, on a claim of unpaid war expenses the literature
describes as vastly inflated and unpayable, and that claim delivered the cinnamon lands. The **fort built to
command the entrance**, blocking trade between the island and India and enforcing the monopoly; a **canal cut
from Puttalam through Negombo to Colombo** to move cinnamon on Company water. **1761:** Kīrti Śrī Rājasiṃha
overran most of the coast except Negombo. **1762:** he sent to the British East India Company; **John Pybus
landed 5 May, reached the king 24 May, stayed a month and left with nothing agreed — he had no authority to
make a treaty.** **14 February 1766:** by treaty the king relinquished the remaining coastal districts. The
kingdom lost its access to the sea outright. The British took the fort in **1795 without resistance.**
*Disputed, hold apart and do not average:* the fort's date — **1667** in the literature against **1676**
engraved above the main gate; the taking of the area, **1658 or 1659**; the war dated **1761–1765** in some
accounts and **1764–1766** in others, while the treaty is firmly 14 February 1766; and whether the 1638 treaty
was ever meant to be honoured at all — one standard reading has both parties playing a double game. Do not
adjudicate any of them.
*Not confirmed — do not speak:* that the fort's gateway was built to resemble a **church** to mislead the king
(carried everywhere with "reportedly", sourced nowhere); **the fort's present status** — one source makes it a
working naval base, another government-administered and open, with naval use during the civil war. **Establish
it: it decides access.** Whether "Dutch Bay" is the formal name of the lagoon's sea connection.

**Binding:** C007's occasions are led by **not getting what one wants**, and the Mārgaya adds **when one's
word is not accepted** and **when what one asks for is not given**. This channel is a hundred and twenty-eight
years of that clause, on the record, with **no face in any of it**: the aversion lives in a gap narrow enough
to shut, a monopoly, a ledger of war expenses and a treaty date. It also carries the digest's flattest point —
this state always arrives with painful feeling and never with any delight — which is why a monopoly is not
filmed as a triumph. C028 supplies the reason the film must not admire the engineering: **applied thought,
sustained examination and effort are present in every unwholesome mind**, and a blockade is made of nothing
else — a bill calculated, a monopoly drafted, a canal surveyed, a channel watched from a wall.

**Build the spine on Pybus, not on a demand you cannot source.** The search could not find a dated Kandyan
demand for the port's return in the VOC record, only encyclopaedic summary. **Do not write a beat that says
he asked, in writing, on a date, unless you can show the document.** You do not need it: the Pybus mission is
fully dated and is the better beat anyway — a king asks a second empire for help, a man arrives, stays a
month, and leaves because he has no authority to agree to anything. That is "one's word not accepted" with
every date attached.

**Keep C028's circling-doubt finding out of this film entirely** — IDEA-0045 owns it and this slot does not
need it.

**The turn onto the camera is available here without forcing it:** the instrument of the refusal was a place
from which water could be **watched**, and sustained examination sits inside every one of these minds by the
digest's own count. One line, late, and no more.

**Guards.** **No fort fabric** — no ramparts, bastion, gate or interior; forts are spent three times over
(IDEA-0009, IDEA-0033, GRP-02's walled town). The fort is a shape on a far shore and a fact in the voice,
never entered, never described as architecture. **The war is named once, flat, and is not the subject** —
IDEA-0033 has that war's forts. **No living community:** Kalpitiya's fishers, kite schools and dolphin
operators are not subjects and boats are transport; the post-2008 islands tourism-development dispute is live
and out of the film; and one source's phrase about Dutch control exercised "by controlling the Muslim merchant
community" **never enters the voice in any form** — it would make a real community an instrument. No bodily
effects of aversion as fact (C007's bar). Rājasiṃha II, Kīrti Śrī Rājasiṃha, Westerwolt, Coster and Pybus may
be named; none is described as angry, proud or humiliated. **No drone near the naval installation**, and
channel filming likely needs Navy clearance.
**Kīrti Śrī Rājasiṃha is named in the voice in THIS film only** — he also appears in IDEA-0035's and
IDEA-0221's research, and three films naming one king makes the group read as his biography.
**Treatment:** the only film in the group shot **from a moving boat** — gimbal at water level, horizon never
settled, spray left on the glass, wide throughout and **no long lens** (IDEA-0045 owns compressed water).
Hard mid-afternoon into the wind, ending on flat late glare. **One drone move only:** a low traverse along the
channel from the ocean inward, ending as the lagoon opens to a sheet with no exit in frame. Wind and hull, no
music. **Payoff:** stopped in the middle of the lagoon, one slow continuous **360° rotation that finds land on
every side** — an inland sea you can float on and cannot leave. Nothing else in the group rotates.
**Known weakness, stated:** this is the second Dutch–Kandyan subject in the group. The defence is that the
subject is the 128 years of refusal and not the war, that the war is one flat sentence, and that the place,
the element and the treatment share nothing with IDEA-0033. If it still reads as "the Dutch, again" when the
record is written, say so rather than defending it.
**Fallback if access kills it:** Kachchatheevu, the uninhabited island in the Palk Strait (Jaffna District —
**verify the district, it is got wrong constantly**), on the same Mārgaya clause: a claim advanced from 1921,
settled by treaty in 1974, and refused acceptance ever since, over a sandbar with nobody on it. Its cinema is
thin and it sits inside a live territorial row; take it only if the primary fails.

## IDEA-0038 → Somawathiya Chaitya and the Mahaweli flood plains · C007 primary, C022 · Polonnaruwa
**Title: "Nobody Is Refusing You"**

A stupa on the Mahaweli's deltaic flood plains, attributed by tradition to Princess Somāvatī and Prince
Abhaya under King Kāvantissa. It stood lost in forest until **1947**, when settlers newly moved into the
area reported seeing rays of light over a large mound and archaeologists identified it. The river's changed
course now floods the approach, and the site is inaccessible through the north-east monsoon, **December to
February**.

*Firm:* Polonnaruwa District; inside Somawathiya National Park (sanctuary 1966, park 1986) at the river's
fork; the 1947 identification; the monsoon inaccessibility with reported road closures.
*Repetition, test it:* the tooth-relic claim; "lost for eight centuries"; the rays of light (a report of what
settlers **said**, and it must stay that); coordinates (approx. 8.11 / 81.02 — check).

**Binding:** C007 names **not getting what one wants** at the head of its occasions, and the Mārgaya adds a
request refused and a thing asked for and not given; it widens the word to cover fear, dislike, discontent
and sorrow, and insists both minds always arrive with painful feeling. **This is that occasion with every
person removed from it: a refusal with no author, repeated annually.** C022 gives restlessness, one of the
four constants — and the film's own protection: ordinary uncertainty about matters one does not know is
**not** the unwholesome doubt [C022-P:L179; C022-M:L57], so nobody turned back at a flooded road carries a
defilement.
**Guards:** build no beat on whether the relic is inside — a film inviting doubt about the teaching, in a
group about the defilements, is the wrong film, and the digests exempt the honest case anyway. Elephants at
distance only, never driven or baited. **No disaster register:** these floods are seasonal, not catastrophe.
**Treatment:** the wet film — drone over inundated forest; payoff is a road that ends in water.

## IDEA-0040 → Girihandu Seya, Thiriyaya · C022 primary, C026 · Trincomalee
**Title: "The Stone Says Guilds"**

A **vaṭadāgē** — a circular relic house with concentric rings of stone pillars — on a hillock near the sea
47 km north of Trincomalee. A **7th-century Sanskrit inscription** at the site tells the story of the
merchants Thapassu and Bhalluka and says the stupa was built by **guilds of merchants** named Trapassuka and
Vallika; the 13th-century Pūjāvaliya says it was erected by **the two merchants themselves**, who received
hairs from the Buddha's head. Ambalantota in the south carries the same name and the same claim; the
Pūjāvaliya's topography fits Thiriyaya better, and that is as far as the evidence goes.

*Firm:* the vaṭadāgē and summit stupa; the 7th-century inscription and its merchant guilds; the Pūjāvaliya
attribution; the rival southern claim; c. 47 km north of the town.
*Not confirmed:* coordinates (est. 8.95 / 81.0); the stupa's dating independent of the inscription; **how the
vaṭadāgē was roofed — the class of building is not settled**; the "world's first Buddhist shrine" framing,
which is a claim and not a finding.

**Binding:** C022's list opens with delusion — what hides the real nature of the object — and the subject is
a building that will not tell you what it is: a circular house whose covering is gone and unreconstructible,
and a foundation story its **own inscription contradicts in the one detail that matters** (guilds, not two
men). The digest then supplies the exemption that makes this the good film rather than the accusing one:
ordinary uncertainty about unknown matters is **not** the doubt meant, which is specifically about the
teacher and the teaching. C026 gives the four constants and the line to say aloud: a camera cannot show
which factor is present, and this scheme is not a way of reading people.
**Guards:** do not make the rival claim into a quarrel — no record of one exists. Do not adjudicate primacy.
**Not an inscription-led film** — IDEA-0039 owns that; here the inscription is one fact in the voice and the
pillars are the picture. Keep clear of IDEA-0034 (a small hill shrine in use) and IDEA-0004 (a coastal
headland shrine in this same district) — say in your report how.
**Treatment:** late-afternoon climb; **drone directly overhead on the concentric rings**; ends on the sea.

## IDEA-0041 → The Panadura debate: Rankoth Viharaya and the Methodist church · C022 primary, C026 · Kalutara
**Title: "Written Down As It Was Said"**

On **12 June 1873** the Revd David de Silva preached against Buddhism at the Wesleyan church beside Rankoth
Viharaya; on **19 July** Mohoṭṭivattē Guṇānanda replied from the temple; in August the two sides met in
public and argued doctrine **for two days** before a large crowd. **Four documents survive at the temple** —
the correspondence negotiating the terms, and a **verbatim transcription of the whole exchange** — and they
are inscribed on UNESCO's **Memory of the World** register. The debate is generally held to have gone to the
Buddhist side and is credited with helping begin the Buddhist revival.

*Firm:* both institutions; the two 1873 sermons and their dates; the four documents including the full
transcript; the UNESCO inscription; a published Methodist account exists (Skuce, 2005).
*Disputed:* the debate's own dates — one account gives 26 and 28 August, another 24 and 26. **Resolve it or
record both.**
*Could not confirm:* audience figures; whether the ground is marked today; **whether the Christian side's
press also claimed victory** — do not write "both sides claimed they had won" until sourced.

**Binding:** the only location where the digests' own illustration exists as a primary document. C026 holds
that in an argument a person may switch between insisting on the facts and insisting on their standing, and
that **these are two different grips that cannot occupy the same moment** [C026-P:L35; C026-M:L17]. C022
defines both: wrong view as grasping things otherwise than they are, conceit as mis-measuring one's own
standing. **A stenographic transcript is a record of moments in sequence** — the one artefact in which that
alternation can be shown line by line without attributing a state to any living person.
**Guards — the heaviest in the group.** Do not adjudicate the doctrines; do not stage it as a contest with a
winner; record what each document says. **No community is a subject or an exhibit.** C022's
`does_not_transfer` forbids "questioning is a vice": say that the doubt the lists mean is not public
argument, and do not imply the questioners were in an unwholesome state. Nobody worshipping, in either
building.
**Treatment:** the documents film — interior daylight on paper, macro on print and hand; two long static
exteriors holding temple and church with nothing happening between them.

## IDEA-0042 → The Kadugannawa pass, the rock tunnel and the Balana ridge · C026 primary, C022 · Kandy
**Title: "A Place Called Look Out"**

The Kandyan kingdom survived three centuries behind mountain, forest and river barriers and a fortified pass
at **Balana — the name means "look out"** — first described in the mid-1590s; Portuguese attempts on Kandy
failed in **1594, 1603 and 1630**. From **1820**, under Governor Edward Barnes, **Captain William Francis
Dawson** drove the first modern Colombo–Kandy road through the pass, cutting a **tunnel through the rock
c. 1828–1830**. Dawson **died 28 March 1829** before it was finished; a pillar c. 38 m high was raised at
Kadugannawa in **1832**. The tunnel now carries almost nothing since a bypass was built.

*Firm:* Balana's name, function, mid-1590s description and attribution; the three failed attempts; the road
from 1820 under Barnes with Dawson; Dawson's death; the 1832 pillar; the tunnel dated c. 1828–30 in the
literature; its present disuse. Dawson Tower is in **Kandy District**.
*Unsourced repetition — flag, do not use as fact:* that routes into the kingdom were kept secret on pain of
death (it appears on a fan wiki with no citation; **Robert Knox's 1681 captivity account is the primary
source to read before writing that line**). Also unconfirmed: the tunnel's dimensions; the claim the rock
was pierced rather than blasted for symbolic reasons.

**Binding:** C022's stinginess is not about money — the sources give five kinds including not bearing one's
own things to be **used**, to be **matched**, or even to be **known about**, and extend it to knowledge and
skill [C022-P:L133–135]. **A kingdom whose defence was the unshareability of knowledge of its own ground is
that factor at the scale of a state.** C026 supplies the point that keeps it in this group rather than
GRP-02: stinginess springs from attachment to one's own yet **arises with aversion, not greed** — clutching
is felt as irritation [C026-M:L19]. And C026's hopeful inversion stands on the ridge with the name on it:
**while the danger can be seen, the harmful state cannot arise at all** [C026-M:L15].
**Guards:** no fort-fabric film and no ramparts as subject — IDEA-0009, IDEA-0033 and GRP-02's walled town
have that between them; Balana appears as a ridge and a name. The 1832 pillar is an object in the landscape,
**not a memorial** — C061 bars the remembrance register. Battles named once, flat, never adjudicated.
**Treatment:** cloud and long lens on a ridge; a drone climb through the gap; **payoff is a cut, not a shot**
— the ridge, then the tunnel mouth head-on.

## IDEA-0043 → Seema Malaka and Beira Lake · C026 primary, C022 · Colombo
**Title: "Inside the Line, or Not at All"**

Seema Malaka is the **boundary hall** of the Gangaramaya temple, standing on platforms in Beira Lake. The
late-19th-century original **sank into the water in the 1970s**. The present building was designed by
**Geoffrey Bawa** and built **1976–78**: a central plinth carrying the preaching hall, linked by an elevated
walkway to the land and to two smaller plinths. A *sīmā* is a consecrated boundary — certain formal acts of
the order are valid inside one and **do not occur at all** outside it, and a boundary laid on water cannot be
disputed the way a boundary on land can.

*Firm:* part of Gangaramaya; the original and its sinking; Bawa's design and the 1976–78 build; the plan;
the name's meaning as a boundary hall used for ordination; the reconstruction's funders.
*Not confirmed:* whether higher ordinations are performed there now; whether it is formally an
*udakukkhepa-sīmā*; coordinates (c. 6.9173 / 79.8558).

**Binding:** C026 is the association method — it asks **where** each factor can occur, and the answer is a
jurisdiction: these fourteen occur only in the twelve unwholesome minds and in none of the other seventy-seven
[C026-P:L25]; hate, envy, stinginess and remorse only in the two hate-rooted minds; sloth and torpor only in
the five prompted ones; doubt in one mind only. **A consecrated boundary on water is that claim as
architecture** — inside it an act happens; outside it the same act is not a lesser version of itself, it
simply does not occur. C022 supplies the contents and the exemptions that stop the film moralising.
**Guards:** the donation was made in memory of the donors' son — that belongs in the source note and
**never in the voice** (C061). No ordination filmed, no worship, no monk as a character: the building, the
walkway and the water. Keep clear of GRP-02's IDEA-0023 — that is dawn mist, a walked circuit and a royal
earthwork; yours is night, modern geometry and a fixed camera. Say how in your report.
**Treatment:** night; city light on black water; hard modern geometry; camera fixed; no drone.

## IDEA-0044 → The Maha Oya hot wells · C022 primary, C007 · Ampara
**Title: "Resting Is Not the Fault"**

**Seven hot springs** about 2 km from Maha Oya town, the hottest around **56 °C**, only two at a temperature
anyone can sit in. Sri Lanka has **no volcanism**: its thermal springs lie along the geological boundary
between the Highland and Vijayan complexes, and the heat is attributed to deep percolation reaching hot rock
and rising where the structure is weak. **The mechanism is still argued in the literature.**

*Firm:* seven springs, c. 2 km from the town, Ampara District; the hottest c. 56 °C; two bathable; the
non-volcanic origin and the complex boundary; that the formation mechanism is inferred, not settled.
*Not confirmed:* each well's temperature; coordinates (est. 7.54 / 81.37); management and ticketing; the
Rāvaṇa legend's provenance.

**Binding:** C022's `does_not_transfer` is the whole film — the Pradeepika **separates the body's need for
rest, which even the fully awakened have, from the mental sluggishness counted as unwholesome**
[C022-P:L171–175]. A place whose only function is bodies resting in warm water is the **exempt** case,
filmed as the exempt case. Around it sits restlessness, the factor present in every unwholesome moment
whatever else is there. C007 supplies the occasions of displeasure, which include heat and bodily
discomfort — **and the line the film must refuse:** the bodily effects the Pradeepika ascribes to anger are
traditional teaching, not medical fact, and may not be narrated as observable. That is exactly the trap a
film about heat would fall into.
**Guards:** no identifiable bather in frame — film before anyone comes, or water and stone only. **No health
or cure claims of any kind.** Do not let heat become a figure for anger's "burning" as though it were
physiology.
**Treatment:** pre-dawn; steam in available darkness; close on water and stone; sound-led.
**Known weakness:** the thinnest cinema of the ten — a walled bathing compound. If the frames will not
carry it, say so plainly rather than padding, and propose reopening the slot.

## IDEA-0045 → Koggala lake and the wartime flying-boat base · C028 primary, C022 · Galle
**Title: "Twenty Hours, Nothing Decided"**

The lake was used by seaplanes before the war; after 1942, with Malaya lost, the RAF marked a **water
runway** here and it became the largest flying-boat base in the east, with **over 800 personnel** by year's
end. **413 Squadron RCAF**'s first Catalina reached Koggala on **28 March 1942**; on **4 April** Squadron
Leader **Leonard Birchall** sighted and reported a large Japanese fleet south of Ceylon, was shot down and
taken prisoner with his crew's survivors. The island had the warning before the raid of **5 April**.

*Firm:* RAF Koggala in Galle District; pre-war seaplane use and the wartime water runway; the "largest in
the east" description and 800+ personnel; 413 Squadron's arrival; Birchall's sighting, loss, captivity and
DFC; the Easter Sunday Raid.
*Repetition, test it:* the 350-mile figure (accounts differ); "the attack was repulsed" (contested in the
literature); **the 1,000-families eviction in 24 hours (blog and fan-wiki sourcing — needs a documentary
source before it is spoken)**; the airport's present operating status.

**Binding:** C028's first finding is what the location is made of — fourteen factors are present in every
unwholesome mind and among them are **applied thought, sustained examination and effort** [C028-P:L27;
C028-M:L5], so nothing in such a state is lazy or thoughtless, and **a harmful act can be intelligent,
energetic and superbly organised and still be what it is.** Its second: **the doubting mind is the sparest
of the twelve** — no decision, no desire-to-act, no joy in it — and it simply **circles** [C028-P:L33]. That
is an accurate description of a twenty-hour search pattern over empty water. C022 supplies fear: aversion
once the mind judges the thing too strong and wants away, with the digest's warning that "fear is healthy
survival instinct" does not map onto the sources cleanly.
**Guards:** the eviction is recorded **once, flat**, as a fact of what the base cost, never as grievance nor
as anyone's due. **No fallen airmen, no bereavement, no legacy register.** Birchall may be named — a
historical person may be — but he is not a character and the film is not about his courage. **This is the
Second World War, not the civil war; do not let the later conflict in at any point.**
**Treatment:** the water-runway film — very long lens across flat water at first light; **payoff is an empty
horizon held past the point of comfort**, because that is the shot the job actually was.

## IDEA-0221 → Berendi Kovil, Sitawaka · C022 primary, C026 · Kegalle — **WRITTEN 2026-09-26**
**Final title: "They Said There Was No Price"** (retitled by the writer; the working title
"For Something He May Not Have Done" is kept in `aliases`.)

Record complete, checks pass. **My briefing notes for this row were wrong in nine places.** They are
corrected below because the same errors circulate about neighbouring sites and the next writer should not
inherit them.

- **The Rājāvaliya does not contain the atonement story.** The word *kovil* does not occur in it. Arittakīvendu
  Perumāl appears once, appointed Mannamperuma Mohotti, and the chronicle then follows him as a general. No
  guilt, no consultation, no kovil, no diverted river. Earliest reachable attestation of the atonement
  tradition is **Bell 1904**; the "diverting the river" form reaches the web through a newspaper travel piece
  that miscredits the chronicle. **It is local tradition, not a chronicle account.**
- **"Most of the surviving testimony denies the parricide" overstates it.** Only **Queyroz** positively denies
  it. Ribeiro does not mention it. The Rājāvaliya and the Alakeśvara Yuddhaya are **silent, not contradictory**
  — an argument from silence, repeatedly reported as testimony. The Alakeśvara Yuddhaya is in any case
  described in the literature as a late-16th-c. floating text with an unstable manuscript tradition.
- **The chronicle locus is Cūḷavaṃsa xciii.3ff., not the Mahāvaṃsa**, and it carries more than I gave it: the
  monks declared **atonement for such a crime was impossible**, and the king turned on them from there. That
  became the film's hinge and its title.
- **Who wrote the accusation and who carried it, both documentable.** The chapters covering this reign are the
  continuation attributed to **Tibbotuwawe Sri Siddhartha Buddharakkhita, writing under Kīrti Śrī Rājasiṃha
  (1747–1780)** — the king who reversed the Śaiva settlement of the pilgrimage mountain. The "Dutch envoy" is
  **Joris van Spilbergen**, received in May 1602 by **Vimaladharmasūriya I, formerly Konappu Bandāra, son of
  the Vīrasundara Bandāra whom Rājasiṃha I had had killed.** The rumour is first attested in the one court
  with the clearest motive and first written down under the king who undid his religion.
- **The death date is not firm.** Geiger's table gives the reign 1581–**1593**; popular sources state March
  1592 and 17 March 1593 with equal confidence. Both recorded; the film states no date.
- **The bamboo splinter is half the account.** The Rājāvaliya immediately adds an astrologer preventing the
  poison being drawn and a prince working magic on the wound, and later says flatly that the prince caused
  the death by witchcraft. **Tetanus is a modern hypothesis.**
- **Not the Portuguese.** The archaeological account (Bell, Abeyawardana) is that the materials were
  dismantled after abandonment for other nearby construction. Portuguese destruction is the travel piece's.
- **"The only stone monument surviving from the Sītāvaka kingdom" is travel phrasing** — the literature says
  one of the major survivals, and the palace/fort site at Pahala Maniyangama in the same DS division is
  separately gazetted.
- **The name's meaning is unsettled** (Bell: "the temple to get redemption"; another derivation from the
  bahirava faces), and the **"Polonnaruwa-period carving style" attribution names no scholar** and contradicts
  the same literature's description of the building as South Indian Vijayanagara work. Neither is usable.
- **The district was right, and was checked, not assumed:** the gazette entry, Bell's Kegalla District report
  and the monuments lists put it in **Kegalle/Sabaragamuwa**; two tourism sources place it in Colombo District
  because the site sits immediately across the river from a Colombo-District town. The item gazetted
  23 Feb 2007 (Gazette **1486 p.128**) is the **stone bridge on the approach**, in GN Division No. 118 Pahala
  Thalduwa; whether the shrine itself carries a declaration was not established.

**Two judgements I accepted.** The chronicle's killing of monks and the figure of 121 stay in the historical
thread and out of the voice — the writer's reasoning, which I agree with, is that a killing of identifiable
religious that no source lets anyone verify is not something a film in this group can carry, and the film's
subject is the payment, not the retaliation. And the Rājāvaliya's line in the king's mouth at his defeat,
"the power of my merits has declined" — superb testimony, and exactly the kamma-as-fate register the floor
forbids. Recorded with its reason; kept out.

**Open research gap, for whoever can reach the book:** the film's central chain rests on a reference-work
summary of **Cūḷavaṃsa xciii**, a chapter missing from the only reachable scan. Bell 1904 pp. 63–65,
Abeyawardana 2002 p.67 and Queyroz were also not read directly. **Someone should read Cv. xciii.**

**Commons holds no photograph of this monument** — eighteen search terms, all spelling variants, Sinhala and
Tamil forms. One image is carried for vegetation and light only, captioned in capitals that it is not the site.
No other site's stonework was substituted. **Kegalle 6 → 7 (closed); Galle 6 → 5.**

---

## District cost, stated

Every crowded district loses a film and none gains one. Two moderate districts reach 7: **Kegalle** (forced
— Berendi Kovil is the best fit on the list and Sitāvaka falls in Dehiovita division, not Colombo as first
assumed) and **Trincomalee** (softer; re-siting slot 0040 is the lever if Chathura will not spend it).
**Nothing is proposed in Kilinochchi or Mullaitivu:** everything destination-grade there is either the
conflict itself or already on the slate, and a film that is honestly unconnected to the war could not be
found. That is a refusal, not a gap.
