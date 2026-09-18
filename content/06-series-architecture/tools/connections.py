# -*- coding: utf-8 -*-
import json, os
H=os.path.dirname(os.path.dirname(os.path.abspath(__file__))); D=os.path.join(H,"data")
S=json.load(open(os.path.join(D,"stories.json")))
sid={l:v["story_id"] for l,v in S["stories"].items()}
C=[]
def c(a,b,typ,expl,basis,status,first,later,needs,spoiler):
    C.append(dict(from_id=sid.get(a,a), to_id=sid.get(b,b), type=typ, explanation=expl,
                  basis=basis, status=status, first_reading=first, later_reading=later,
                  required=needs, spoiler=spoiler))

F="established fact"; P="proposal"

# ---- Episode 1 / 100 completion: the nine anchors ----
c("SL-SQ02-001","SEG-E100A","object continuity",
  "A drum made on screen is one of the ten objects shown together in the room before the departure.",
  "Production plan. The making is real; the object's later presence is arranged.",P,
  "A craft episode with no apparent connection to anything.",
  "The first of the ten objects the audience has already seen being made.",
  "Mark and retain the specific instrument; film it again in the room sequence.","high")
c("SL-SQ10-001","SEG-E100A","object continuity",
  "A woven hana piece is among the ten objects.","Production plan, same as above.",P,
  "An episode about the last weaving households.",
  "The second object, and the one that dates the journey furthest back.",
  "Acquire the piece honestly and at a fair price; record the transaction.","high")
c("SL-SQ05-001","SEG-E100B","chronological continuation",
  "The pilgrimage route is the spine of the underlying journey. Episode 100 Part B shows where Chathura joined it and where he left it.",
  "Real annual event; the joining and leaving are production facts to be recorded as they happen.",P,
  "A documentary about a two-month walk.",
  "The walk that put him within reach of everything in seasons four to nine.","Log dates and positions on the route during filming.","high")
c("SL-SQ11-001","SEG-E100A","revisited person or place",
  "The Sri Pada trail is climbed once in season and once out of it. The empty climb belongs to Episode 100.",
  "Two real shoots months apart.",P,
  "An episode about the stallholders.",
  "The same steps with nobody on them, immediately before the departure sequence.",
  "A second, out-of-season ascent with the same lenses and route.","high")
c("SL-SQ16-001","SEG-E100B","revisited person or place",
  "The elephants released on screen are looked for again in the reconstruction.",
  "Observed. The Department of Wildlife Conservation already tracks released animals by collar.",F,
  "An episode about preparing orphans for release.",
  "A return that may find them or may not, and either answer is the point.",
  "Access to post-release monitoring data and a second visit.","medium")
c("SL-SQ03-005","SEG-E100B","context revealed later",
  "The cyclone of 28 November 2025 is the one hard dated marker the series has. Episode 100 uses it to sort the other episodes into before and after.",
  "Observed. The damage appears independently in the hill railway, tea estate and eastern fisheries material.",F,
  "An episode about recovery from a disaster.",
  "The line that cuts the whole catalogue in two.","Consistent date logging on every shoot.","high")
c("SL-SQ20-001","SEG-E100B","context revealed later",
  "One cascade physically links two episodes filmed months apart and presented as unrelated places.",
  "Observed hydrological connection.",F,
  "An episode about restoring a tank system.",
  "Two villages the audience met separately are on the same water.",
  "Survey which cascade the other locations sit in before filming either.","medium")
c("SL-SQ18-001","SEG-E100A","visual or sound echo",
  "The ordinary-day footage of the line at Peraliya runs under the departure sequence.",
  "Production plan.",P,
  "An episode about a commemoration.",
  "The same rails, without the ceremony and without the crowd.",
  "Film the location on a non-anniversary day.","high")
c("SL-SQ22-005","SEG-E100B","chronological continuation",
  "The last episode of the public journey is revealed to have happened long before the audience was shown it.",
  "Production plan resting on a real journey.",P,
  "The series ending: a train to the end of a rebuilt line.",
  "Not an ending at all, and not last.","Hold the terminus footage from public release until Episode 100.","high")

# ---- observed chronological consequences of the cyclone ----
for tgt,why in [("SL-SQ21-004","The December 2025 floods are the damage the hill-line restoration episode is restoring."),
                ("SL-SQ23-006","Reporting on the January 2026 wage agreement records that the same floods cut off dozens of estates."),
                ("SL-SQ22-008","Central-district flooding and reservoir operation are part of the same water system.")]:
    c("SL-SQ03-005",tgt,"chronological continuation",why,"Observed; both appear in the same reporting.",F,
      "Two unrelated episodes in different seasons.",
      "The second is a consequence of the first, and the audience saw them in the wrong order.",
      "Confirm the specific damage with the operator or employer before claiming the link.","medium")

# ---- object and sound continuity inside the 98 ----
c("SL-SQ02-001","SL-SQ24-002","object continuity",
  "A drum made in the first episode is played in the procession.","Production plan; both events are real.",P,
  "Two separate films about a craft and a festival.","The same instrument.",
  "Track the instrument from workshop to a named player in the procession.","low")
c("SL-SQ02-001","SL-SQ09-003","visual or sound echo",
  "The drum that accompanies the initiation is the one the audience watched being tuned.","Production plan.",P,
  "Unconnected.","A sound the audience already knows.","Same instrument or same maker.","low")
c("SL-SQ02-001","SL-SQ17-001","visual or sound echo",
  "Low-country ritual drumming and Kandyan drum making are different traditions using related instruments; the episodes should not pretend otherwise.",
  "Editorial. The difference is the point.",P,
  "Similar-sounding drums.","Two distinct traditions the series has been careful not to blur.",
  "A musicologist check before either is cut.","low")

# ---- revisited place ----
c("SL-SQ01-006","SL-SQ06-004","shared human question",
  "Both are places where the number of people who come to look is the thing damaging what they came for.",
  "Editorial, resting on documented visitor pressure at both sites.",P,
  "A heritage episode and a wildlife episode.","One argument, made twice in different materials.",
  "Nothing beyond scheduling them apart.","low")
c("SL-SQ15-004","SL-SQ23-006","revisited person or place",
  "The snares that kill leopards are set in the estate landscape where the wage episode is filmed.",
  "Observed. The published mortality study locates deaths in plantation mosaics in Nuwara Eliya.",F,
  "A conservation episode and a labour episode.",
  "The same hillside, and the same people, seen from two directions.",
  "Do not film both in the same village without telling the community.","medium")
c("SL-SQ13-001","SL-SQ16-001","philosophical contrast",
  "One episode watches people whose lives are threatened by elephants; the other watches people whose whole work is raising them.",
  "Editorial contrast between two documented situations.",P,
  "Two elephant episodes.","A single unresolved national relationship, from both ends.",
  "Nothing; they must not be cut together in a way that lectures either side.","low")
c("SL-SQ20-001","SL-SQ23-008","philosophical development",
  "The first shows a system being physically restored; the second shows the human arrangement that decides who gets the water in it.",
  "Editorial, resting on the same documented institution.",P,
  "An engineering story and a governance story.",
  "The restoration was the easy half.","Ideally the same cascade.","low")
c("SL-SQ23-008","SL-SQ04-001","philosophical contrast",
  "A village that hands one person the power to decide, against a national system in which a million cases wait for a decision.",
  "Editorial contrast; both institutions are documented.",P,
  "Unrelated.","Two answers to the same problem, at opposite scales.","Nothing.","low")

# ---- philosophical contrast / development pairs ----
pairs=[
 ("SL-SQ01-001","SL-SQ01-006","philosophical development",
  "Attention that is deliberately directed away from the mechanism, and attention so concentrated it damages its object.",
  "The audience learns that not looking can be part of the art.","Looking has a cost in both directions."),
 ("SL-SQ01-002","SL-SQ17-002","philosophical development",
  "Work nobody looks at, in a material everyone uses, and then work nobody looks at that everyone would rather not.",
  "Two episodes about unseen labour.","The second is what the first becomes when the material is worthless."),
 ("SL-SQ03-002","SL-SQ03-006","shared human question",
  "One condition recognised for thirty years without a cause; one bite that must be identified in minutes without the snake.",
  "Two medical episodes.","Recognition without understanding, at two speeds."),
 ("SL-SQ09-001","SL-SQ09-002","philosophical contrast",
  "A skill with a window of weeks against a skill with a window of minutes.",
  "An agriculture episode and an emergency-services episode.","The same question about arriving in time."),
 ("SL-SQ10-002","SL-SQ10-003","philosophical development",
  "A skill that lives in the fingers and cannot be described, against a skill gated by permission before a person may begin.",
  "Two craft episodes.","Two different things that the word training covers."),
 ("SL-SQ09-003","SL-SQ02-005","philosophical contrast",
  "A dancer whose progress is certified by a teacher on a set night, against a keeper whose work nobody assesses at all.",
  "A ceremony and an isolation.","Two conditions under which a person decides they are doing it properly."),
 ("SL-SQ12-002","SL-SQ12-003","philosophical contrast",
  "Giving something the body needs and remakes, against giving away everything a stall produces for one night.",
  "Two episodes about generosity.","Two different economies of giving."),
 ("SL-SQ12-001","SL-SQ11-001","philosophical contrast",
  "Fishermen paid for appearing to fish, against stallholders whose devotion is also a trade.",
  "One looks like a fake and one looks sincere.","Both are people making a living out of what visitors want."),
 ("SL-SQ15-002","SL-SQ15-001","philosophical development",
  "A miner alone underground with a stone, against a riverbed mined at night under a court order that is not enforced.",
  "A craft episode and a crime episode.","Restraint at two scales, one of which has no witness and one of which has too many."),
 ("SL-SQ14-001","SL-SQ15-004","philosophical contrast",
  "Men paid to protect what they used to take, against a landscape where a wire set for one animal kills another.",
  "Two conservation episodes.","Harm you intend and harm you leave behind."),
 ("SL-SQ16-001","SL-SQ17-003","philosophical development",
  "Care deliberately withheld so an animal can survive without people, against care given to the one animal a street happens to know.",
  "Two episodes about animals.","Two shapes of care, neither of which is closeness."),
 ("SL-SQ16-002","SL-SQ11-003","philosophical contrast",
  "A woman who leaves the country so her family can stay in it, against families working out who will look after a parent.",
  "A migration episode and an ageing episode.","One obligation, met by leaving and by staying."),
 ("SL-SQ19-002","SL-SQ18-005","philosophical contrast",
  "A family doing something for someone who cannot receive it, against families refusing a payment because it answers the wrong question.",
  "A ritual and a campaign.","Two responses to an ending that will not close."),
 ("SL-SQ19-001","SL-SQ19-003","philosophical contrast",
  "A community replanting what a local industry destroyed, against a court ordering a foreign company to pay for what it destroyed.",
  "Two environmental episodes.","Repair by hand and repair by judgment, and what each one can actually reach."),
 ("SL-SQ21-001","SL-SQ21-002","philosophical contrast",
  "A workshop in its fifth generation that looks unchanged, against a casting method in which the original must be destroyed to make the object.",
  "Two craft episodes.","Two accounts of how a thing stays itself."),
 ("SL-SQ21-004","SL-SQ22-005","philosophical development",
  "A railway that stays the same by being continuously replaced, against a railway destroyed and rebuilt on its own formation.",
  "Two railway episodes.","Continuity by replacement and continuity by return, and the difference between them."),
 ("SL-SQ22-003","SL-SQ22-010","shared human question",
  "A script nobody reads and a language children can pronounce but not use.",
  "Two episodes about languages.","Words outliving the people who could use them, in writing and in speech."),
 ("SL-SQ10-005","SL-SQ10-008","philosophical contrast",
  "A ten-year-old preparing for a national selection examination, against a school with twelve children and one teacher covering five grades.",
  "Two education episodes.","The two ends of the same system, and the exam is what connects them."),
 ("SL-SQ07-003","SL-SQ07-002","shared human question",
  "A specialist leaving the country and a young woman leaving her province, both to be worth what somebody gave up.",
  "Two labour episodes.","One mechanism at two levels of privilege."),
 ("SL-SQ24-005","SL-SQ08-004","philosophical contrast",
  "A policy imposed quickly and paid for over years, against a target announced repeatedly and never reached.",
  "Two agriculture episodes.","Deciding too fast and not deciding at all."),
 ("SL-SQ23-003","SL-SQ08-007","philosophical contrast",
  "Turbines imposed on a fishing ground, against rooftop panels welcomed and then refused by the grid.",
  "Two energy episodes.","The same transition, resisted from below and constrained from above."),
 ("SL-SQ18-003","SL-SQ18-002","philosophical development",
  "A place where everyone ends up, against a place organised entirely around a known ending.",
  "Two episodes about death.","One is administration and one is attention."),
 ("SL-SQ04-002","SL-SQ04-001","shared human question",
  "A dormant pull waiting for its trigger, and a case waiting seventeen years for a hearing.",
  "Two episodes about waiting.","Two things that will not settle, one inside a person and one inside an institution."),
 ("SL-SQ22-007","SL-SQ22-004","philosophical development",
  "A cinema with eight people in it, against a market moved wholesale to a bigger site and emptied of its trade.",
  "Two episodes about decline.","Space is not the problem in either case."),
 ("SL-SQ06-002","SL-SQ24-004","philosophical development",
  "A price set by tasting in a room in Colombo, against a price agreed on a lorry park at three in the morning.",
  "Two market episodes.","Two ways a grower's year turns into a number."),
]
for a,b,t,e,first,later in pairs:
    c(a,b,t,e,"Editorial pairing between two independently researched situations.",P,first,later,"Scheduling only; no extra filming.","low")

# ---- shared question via the same shortlist question ----
c("SL-SQ23-001","SL-SQ23-009","shared human question",
  "Cane that requires a permit and land that becomes valuable: two cases of something held in common turning into something that can be taken.",
  "Both sit under the same research question, SQ23.",P,
  "A craft decline and a housing programme.","The same mechanism in a material and in a place.","Nothing.","low")
c("SL-SQ23-004","SL-SQ03-003","philosophical development",
  "Cultivators prosecuted for clearing forest, and a community whose hunting was made an offence by the same kind of instrument.",
  "Both documented as legal reclassification of an existing practice.",F,
  "Two episodes about forest rules.","One process, applied twice, forty years apart.",
  "Neither community should be filmed as an example of the other.","low")
c("SL-SQ17-004","SL-SQ24-005","context revealed later",
  "Research identifies farmers and daily wage labourers among the populations at higher risk of attempted suicide; the fertiliser episode is about farmers carrying debt.",
  "Observed in the published research. **This connection must never be drawn about a named person.**",F,
  "A mental health episode and an agriculture episode.",
  "A relationship the research records and the film must not turn into a story about an individual.",
  "A clinical adviser must approve any edit that places these near each other.","high")
c("SL-SQ07-004","SL-SQ23-006","shared human question",
  "Tapping and plucking, two skills leaving the plantations for the same reasons at the same time.",
  "Both documented, with separate figures.",F,
  "Two plantation episodes.","One labour story with two crops.","Nothing.","low")

# ---- visual / sound echoes ----
c("SL-SQ02-004","SEG-E001","visual or sound echo",
  "A forest monastery appears in season two. It is not the monastery of Episode 1, and the resemblance is deliberate.",
  "Editorial. The two places are different and the series must be able to prove it.",P,
  "A place that looks like the one in Episode 1.","A different monastery, which is what makes the point.",
  "Establish clearly on screen that these are two places, or the connection becomes a lie.","high")
c("SL-SQ01-003","SL-SQ22-005","visual or sound echo",
  "A boat moving at walking pace beside a road, and a train running to the end of a line. Two ways of crossing the same country slowly.",
  "Editorial.",P,"Unrelated transport.","A rhyme that closes the series.","Matching pace and lens treatment.","low")
c("SL-SQ22-008","SL-SQ20-001","visual or sound echo",
  "A reservoir that drowned villages and a tank system being restored: the same technology at two scales and two centuries.",
  "Editorial, resting on documented history.",P,
  "Two water episodes.","What the small system did without doing.","Nothing.","low")

json.dump(C, open(os.path.join(D,"connections.json"),"w"), indent=1, ensure_ascii=False)
ids=set(sid.values())|{"SEG-E001","SEG-E100A","SEG-E100B"}
bad=[x for x in C if x["from_id"] not in ids or x["to_id"] not in ids]
print("connections:",len(C),"invalid refs:",bad)
