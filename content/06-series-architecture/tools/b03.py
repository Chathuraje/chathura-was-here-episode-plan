# -*- coding: utf-8 -*-
import os as _os, sys as _sys; _sys.path.insert(0, _os.path.dirname(_os.path.abspath(__file__)))
import _seedguard  # noqa: E402,F401  -- one-time seed; refuses to run. See _seedguard.py.
import json, os
D = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
A = "2026-09-18"
def S(r,t,ti,u,p,s,c): return {"ref":r,"type":t,"title":ti,"url":u,"published":p,"accessed":A,"supports":s,"confirmed":c}
L=[]
def lead(**k):
    k.setdefault("batch","B03"); k.setdefault("decision","advance"); L.append(k)

lead(lead_id="SL-SQ02-004", sq="SQ02", title="Two thousand hectares and one breath",
 subject="Monks at a forest monastery of the aranya senasana tradition",
 place="Na Uyana Aranya on the Dummiya range; comparable aranyas at Ritigala, Nissarana Vanaya and elsewhere", district="Kurunegala", province="North Western",
 situation="Na Uyana Aranya Senasanaya is a forest monastery spread over more than 2,000 hectares and described as home to roughly 150 monks, associated with the Sri Kalyani Yogasrama Samstha, with meditation practice following the Pa-Auk method. Cave dwellings with Brahmi inscriptions and stupa ruins at the site date to the third century BCE.",
 activity="Walking between kutis, alms round, the day's timetable, and long sitting. The observable material is the forest, the routine and the silence, not anyone's inner state.",
 change="Not established as an event. The monastery is a continuing institution, and a documentary would have to find its subject in a specific person's arrival, ordination or departure, which has not been identified.",
 candidate_status="evidenced-situation", territory="T01",
 primary_idea="C094-I01", supporting_ideas=["C013-I02", "C001-I03"],
 sources=[
  S("S1","reference","Na Uyana Aranya - Wikipedia","https://en.wikipedia.org/wiki/Na_Uyana_Aranya",None,"Over 2,040 hectares on the Dummiya range; about 150 resident monks; association with the Sri Kalyani Yogasrama Samstha; Pa-Auk meditation method; third-century-BCE cave dwellings with Brahmi inscriptions.","search-result"),
  S("S2","monastery","Na Uyana Monastery - official site","https://nauyana.org/na-uyana-english/",None,"The monastery's own account of its practice, timetable and residency conditions.","search-result"),
  S("S3","directory","Buddhist forest monasteries and meditation centres in Sri Lanka - BuddhaNet","https://www.buddhanet.net/pdf_file/Monasteries-Meditation-Sri-Lanka2013.pdf","2013","A compiled directory of forest monasteries, useful for identifying alternatives and for checking affiliations.","search-result")],
 unresolved="Whether any monastery would permit filming at all, and on what terms. Several aranyas do not admit visitors during the rains retreat.",
 access="No contact made. Permission runs through the monastery's chief incumbent and, for the Yogasrama group, through the parent body.",
 ethics="Nobody's meditative attainment may be described, implied or ranked. The project must not film a monk in a way that presents him as an example of the philosophy that privately guides the series, which is precisely the trap this subject sets.",
 note="This lead is a real forest monastery found by research. It is NOT the monastery of Episode 1. The Episode 1 monastery is user-supplied canon that is not documented in this repository, and the two must never be conflated.")

lead(lead_id="SL-SQ17-001", sq="SQ17", title="Calling something by a name so it can be sent away",
 subject="Yakadura practitioners and families who hold a thovil, particularly the sanni yakuma, in the low country",
 place="Low-country villages of the south and south-west", district="Galle, Matara, Kalutara and neighbouring districts", province="Southern and Western",
 situation="Thovil is the general Sinhala term for these ritual performances. The sanni yakuma, also called daha ata sanniya, consists of eighteen masked dances, each associated with a particular affliction. The lead practitioner, the yakadura, determines whether a patient is affected and sets an auspicious day and time. Published accounts state that the ritual is still held in some households.",
 activity="An all-night ritual at a household: the building of the ritual enclosure, drumming, masked dance, the patient's presence, and daybreak.",
 change="Not established. Whether a thovil is scheduled anywhere in a given period is a matter of finding one, and none has been found.",
 candidate_status="unverified-lead", territory="T10",
 primary_idea="C047-I02", supporting_ideas=["C030-I02", "C020-I01"],
 sources=[
  S("S1","reference","Sanni Yakuma - Wikipedia","https://en.wikipedia.org/wiki/Sanni_Yakuma",None,"Eighteen dances each depicting an ailment; the yakadura determines the affliction and sets an auspicious time; part of the pahatharata low-country dance tradition.","search-result"),
  S("S2","academic resource","Mask performances, the yaktovil and the sanni yakuma - Asian Traditional Theatre and Dance, Theatre Academy Helsinki","https://disco.teak.fi/asia/mask-performances-the-yaktovil-and-the-sanni-yakuma/",None,"Scholarly description of the ritual structure and its performers.","search-result"),
  S("S3","feature","The eighteen masks: dance exorcisms of the low country - Roar Media (archive)","https://archive.roar.media/english/life/culture-identities/the-eighteen-masks-dance-exorcisms-of-the-low-country",None,"Popular account of the eighteen sanni and their associated ailments.","search-result")],
 unresolved="No practitioner, household or scheduled ritual has been identified. Nothing was found on whether the practice is declining, despite that being widely assumed.",
 access="No contact made. A ritual is held for a sick person, not for a camera, and the patient's consent is the controlling one.",
 ethics="Very high. A person's illness is the occasion for the ritual. Their consent, separate from the household's, is essential, and it may not be possible to obtain meaningfully. The film must neither present demons as fact nor treat the participants' beliefs as superstition to be corrected, and it must not imply that the ritual heals or fails to heal.")

lead(lead_id="SL-SQ13-002", sq="SQ13", title="One shrine, several communities",
 subject="Pilgrims at the Shrine of Our Lady of Madhu and the community that keeps it",
 place="Madhu, in the Mannar diocese", district="Mannar", province="Northern",
 situation="Madhu is described as the principal Catholic Marian shrine in Sri Lanka, with a history of more than four hundred years, drawing Tamil and Sinhala Catholics and also Buddhist and Muslim visitors. The official feast day is 2 July, but the largest gathering is on the Feast of the Assumption on 15 August, when the statue is carried in procession; the August festival is described as drawing hundreds of thousands. Pilgrims often stay several days in hostels at the site.",
 activity="Arrival and encampment, the procession, hostel life, and the ordinary work of feeding and housing a very large temporary population.",
 change="A fixed annual date with a very large, observable gathering, in a district with a war history.",
 candidate_status="evidenced-situation", territory="T08",
 primary_idea="C095-I01", supporting_ideas=["C047-I01", "C005-I01"],
 sources=[
  S("S1","academic project","Catholics, Buddhists, Muslims honor Mary at Madhu Shrine, Sri Lanka - Catholics and Cultures, College of the Holy Cross","https://www.catholicsandcultures.org/sri-lanka/our-lady-madhu-shrine",None,"2 July as the official feast and 15 August as the largest gathering; the procession; multi-community attendance; pilgrims staying in hostels.","search-result"),
  S("S2","reference","Shrine of Our Lady of Madhu - Wikipedia","https://en.wikipedia.org/wiki/Shrine_of_Our_Lady_of_Madhu",None,"Over 400 years of history; Mannar district; significance for Tamil and Sinhala Catholics; the shrine's position during the civil war.","search-result")],
 unresolved="Attendance figures vary widely between sources and none is official. The shrine's wartime history, including the shelling of the area and the displacement of the statue, needs checking against a documented record before any of it is stated.",
 access="No contact made. Permission runs through the Diocese of Mannar.",
 ethics="A major religious gathering in a post-war district. Filming must not turn a devotional crowd into a symbol of reconciliation for the film's convenience; whether people there experience it that way is for them to say, not for the film to assert.")

lead(lead_id="SL-SQ11-001", sq="SQ11", title="The stalls that stay open all night",
 subject="Tea-stall and shop keepers working the Sri Pada trail through the pilgrimage season",
 place="The Sri Pada trail, principally the Dalhousie route", district="Nuwara Eliya and Ratnapura", province="Central and Sabaragamuwa",
 situation="The pilgrimage season runs from the Unduwap full moon in December to the Vesak full moon in May, with the heaviest period in January and February. The main route is described as roughly 5,500 steps over about 7 km from Dalhousie, with stalls and tea shops open through the night selling tea, short eats, roti and sundries, and with shrines and rest areas along the way. Outside the season the route is described as unlit and unstaffed.",
 activity="Carrying stock up the mountain, running a stall through the night, the continuous stream of climbers, and the closing of the route at the end of the season.",
 change="A livelihood with a hard seasonal boundary: a business that exists for five months and then does not.",
 candidate_status="evidenced-situation", territory="T07",
 primary_idea="C005-I01", supporting_ideas=["C005-I03", "C023-I02"],
 sources=[
  S("S1","guidebook publisher","Adam's Peak - Rough Guides","https://www.roughguides.com/sri-lanka/kandy/adams-peak/",None,"Stalls and teashops open through the night during the season to serve climbers.","search-result"),
  S("S2","dedicated site","Adam's Peak: the ascent - sripada.org","http://sripada.org/adams-peak-ascent.htm",None,"Route description, the step count and the facilities along the way.","search-result"),
  S("S3","travel guide","Adam's Peak season guide","https://lankanstays.com/blog/adams-peak-season-guide",None,"Season from the Unduwap full moon in December to the Vesak full moon in May, busiest in January and February; the route unlit and unstaffed out of season.","search-result")],
 unresolved="Who holds the right to run a stall on the route, how it is allocated and what it costs. Nothing found.",
 access="No contact made.",
 ethics="Stallholders carry heavy loads up the mountain. Their labour should not be reduced to atmosphere behind pilgrims. Pilgrims themselves must not be filmed at the summit in ways that intrude on a private act.")

lead(lead_id="SL-SQ24-002", sq="SQ24", title="An argument conducted around an animal",
 subject="The elephants of the Kandy Esala Perahera, the people responsible for them, and the public argument about their use",
 place="Kandy", district="Kandy", province="Central",
 situation="The Esala Perahera runs for ten nights ending on the Esala full moon; in 2025 it is reported as running from 30 July to 9 August. The Maligawa tusker carries the casket associated with the Tooth Relic. Reports describe elephant numbers rising to a hundred or more during the Randoli nights. The welfare argument around the use of captive elephants was NOT documented by the research done so far and remains an assumption at this stage.",
 activity="Preparation and caparisoning, the nightly processions, the mahouts' work, and whatever oversight or veterinary process exists.",
 change="A fixed annual event of very large scale. Whether anything is currently changing about how the elephants are used is not established.",
 candidate_status="unverified-lead", territory="T14",
 primary_idea="C086-I02", supporting_ideas=["C024-I03", "C020-I02"],
 sources=[
  S("S1","festival site","Kandy Esala Perahera guide","https://esalaperahera.com/",None,"Structure of the ten nights, the Kumbal and Randoli phases and the role of the Maligawa tusker.","search-result"),
  S("S2","listing","Kandy Esala Perahera 2025 dates","https://thehiddensrilanka.com/kandy-esala-perahera-2025/","2025","Reported 2025 dates of 30 July to 9 August.","search-result"),
  S("S3","specialist site","Kandy Esala Perahera and elephants","https://www.srilankantusckers.com/articles/kandy-esala-perahera-and-elephants-the-majestic-guardians-of-kandy",None,"Account of the elephants' role, including the count during the Randoli nights. A partisan source on a contested subject.","search-result")],
 unresolved="Everything about welfare, regulation, ownership and veterinary oversight. Without that, this is a spectacle, not a documentary, and it should not be scheduled on the strength of the procession alone.",
 access="No contact made. The Sri Dalada Maligawa administers the procession and controls access.",
 ethics="High and two-sided. The procession is a religious event of great importance to many people, and the captive-elephant question is genuinely contested. A film that arrives with a verdict on either side would be dishonest. Mahouts must not be made to answer for a national policy.")

lead(lead_id="SL-SQ03-003", sq="SQ03", title="The law that turned a livelihood into an offence",
 subject="Wanniya-laeto (Vedda) families at Dambana and their relationship to the forest and the national park",
 place="Dambana, near Mahiyanganaya, on the edge of the Maduru Oya National Park", district="Badulla and Ampara border area", province="Uva",
 situation="Dambana is described as the most accessible Wanniya-laeto settlement, home to around 350 families. Reporting records that over the past sixty years forested areas the community lived in were converted into sanctuaries, reservoirs and national parks, restricting hunting, honey gathering and chena cultivation. The Maduru Oya National Park was declared on 9 November 1983. A 2011 agreement is reported to have given access to a major national park while still forbidding hunting and cultivation there. The community's chief is quoted describing that change as turning hunters and gatherers into poachers.",
 activity="Honey gathering, forest walking, the settlement itself, and the daily reality of visitors who come to see the community.",
 change="A long, documented legal displacement with dated instruments, and a continuing negotiation over access.",
 candidate_status="evidenced-situation", territory="T02",
 primary_idea="C084-I01", supporting_ideas=["C006-I02", "C047-I01"],
 sources=[
  S("S1","news agency","Environmental conservation in Sri Lanka hurts indigenous livelihoods - Global Press Journal","https://globalpressjournal.com/asia/sri_lanka/environmental-conservation-in-sri-lanka-hurts-indigenous-livelihoods/",None,"Conversion of forest to sanctuaries, reservoirs and national parks over sixty years; restrictions on hunting, honey gathering and chena; the 2011 agreement giving park access while forbidding hunting and cultivation; the chief's statement about being turned into poachers; the 9 November 1983 declaration of Maduru Oya National Park.","search-result"),
  S("S2","peer-reviewed journal","The media impact on Sri Lanka's indigenous people: Wanniyalaeto (Vedda) of Dambana - Vidyodaya Journal of Humanities and Social Sciences","https://journals.sjp.ac.lk/index.php/vjhss/article/download/6421/4612","2023","Scholarly assessment of how media coverage has affected this community. Essential reading before approaching them.","search-result"),
  S("S3","heritage site","Dambana Vaddah Village - AmazingLanka","https://amazinglanka.com/wp/dambana-vaddah-village/",None,"Location relative to Mahiyanganaya and the Maduru Oya reservation; approximate family count.","search-result")],
 unresolved="The community's own current position on being filmed, which the scholarship suggests is not simple. Whether a new access agreement is under negotiation.",
 access="No contact made. Any approach must go through the community's own leadership, not through a tour operator.",
 ethics="Very high. This community is among the most filmed and least served by filming in Sri Lanka, and there is peer-reviewed work on exactly that harm. The project should read that work first and be prepared to conclude that it should not add to the pile. No performance of traditional life should be commissioned or paid for as though it were daily life.")

lead(lead_id="SL-SQ06-001", sq="SQ06", title="Twenty-five days of a promise",
 subject="Devotees keeping vows through the annual festival at the Nallur Kandaswamy temple",
 place="Nallur, Jaffna", district="Jaffna", province="Northern",
 situation="The Nallur festival runs for twenty-five consecutive days in August or September and is described as the longest continuous religious festival in the country, drawing very large numbers including Tamil expatriates returning to fulfil vows. Devotees are described as observing rigorous personal vows, many walking barefoot throughout, and some carrying kavadi. Festival events include the chariot festival, the kavadi festival, the water-cutting festival and the fire-walking festival.",
 activity="Daily processions over twenty-five days, kavadi carrying, barefoot walking, the arrival of returning family members, and the household preparation behind all of it.",
 change="A fixed, long, annually repeated period in which an individual undertaking is carried out in public.",
 candidate_status="evidenced-situation", territory="T04",
 primary_idea="C006-I01", supporting_ideas=["C077-I03", "C047-I01"],
 sources=[
  S("S1","religious magazine","Join in Nallur Temple's awesome annual festival - Hinduism Today","https://www.hinduismtoday.com/temples-and-pilgrimage/join-in-nallur-temples-awesome-annual-festival/",None,"Twenty-five-day duration; the scale of attendance; kavadi and the festival's sequence of events.","search-result"),
  S("S2","regional tourism authority","Nallur Kovil annual grand festival - Tourism North","https://tourismnorth.lk/festivals/nallur-kovil-annual-grand-festival",None,"Official regional listing of the festival and its timing.","search-result"),
  S("S3","local account","Annual festival of the Nallur Kandaswamy temple, Jaffna","https://thambuillam.com/jaffna-festival/annual-festival-of-the-nallur-kandaswamy-temple-jaffna-sri-lanka/",None,"Account of expatriates returning to pay vows during the festival.","search-result")],
 unresolved="Exact 2027 dates. Whether the temple permits filming inside, which many Murugan temples restrict, and whether men are required to enter bare-chested, which affects who can film and how.",
 access="No contact made. Temple administration controls access and the restrictions are strict.",
 ethics="Body piercing and fire-walking are part of some devotees' vows. Filming them as spectacle would be a betrayal of the subject. Nobody's vow may be characterised as extreme, and no explanation of why a person took a vow may be supplied by the film.")

lead(lead_id="SL-SQ19-002", sq="SQ19", title="An offering for someone who cannot receive it",
 subject="Families holding the seventh-day almsgiving, the matakadanaya, after a death",
 place="Not established; the practice is general", district="not established", province="not established",
 situation="Published descriptions of Sri Lankan Buddhist funeral practice record an almsgiving on the seventh day after a death, at which monks are invited and merit is transferred to the deceased, with further observances at three months and at one year. Descriptions also record a preceding evening observance in which a place is prepared and a sermon is given.",
 activity="Cooking and serving the alms, the monks' visit, the chanting, and the gathering of relatives and neighbours.",
 change="A dated observance that always follows a specific event, and which the family will be doing whether or not anyone films it.",
 candidate_status="unverified-lead", territory="T12",
 primary_idea="C089-I03", supporting_ideas=["C056-I01", "C091-I01"],
 sources=[
  S("S1","scholarly compilation","Buddhist funeral rites of Sri Lanka - Buddhist Ceremonies and Rituals of Sri Lanka (wisdomlib)","https://www.wisdomlib.org/history/book/buddhist-ceremonies-and-rituals-of-sri-lanka/d/doc1460892.html",None,"The seventh-day matakadanaya, its place in the sequence of observances, and the practice of merit transfer.","search-result"),
  S("S2","feature","Dealing with death: funeral rituals in Sri Lanka - Roar Media (archive)","https://archive.roar.media/english/life/in-the-know/dealing-with-death-funeral-rituals-sri-lanka",None,"Popular account of the sequence of funeral observances including the third-month and one-year alms.","search-result")],
 unresolved="No family has been identified and none should be sought in advance of a death. This lead can only become real through an existing relationship, which is a slow and honest route rather than a plannable one.",
 access="No contact made.",
 ethics="Very high. Approaching a bereaved family is only acceptable if the relationship exists first and the approach comes from them or through someone close to them. Nobody should be filmed grieving because grief is affecting. The doctrinal explanation of merit transfer is the participants' framework and must be reported as theirs, not asserted by the film.")

lead(lead_id="SL-SQ16-001", sq="SQ16", title="Care that has to stay at a distance",
 subject="Keepers and veterinarians at the Udawalawe Elephant Transit Home, and the orphaned calves they prepare for release",
 place="Udawalawe, adjoining Udawalawe National Park", district="Ratnapura and Monaragala border area", province="Sabaragamuwa and Uva",
 situation="The transit home was established by the government in 1995 and is run by the Department of Wildlife Conservation. Its stated purpose is to rehabilitate orphaned calves for release. Published accounts describe care given with deliberately minimal human interaction so the calves keep their natural behaviour, release in small bonded groups, radio collars for post-release monitoring, and a pre-release procedure in which the animals are washed with dung to remove human scent. Over 200 elephants are reported to have been cared for and released.",
 activity="Feeding rounds at set times, veterinary work, the release procedure itself, and post-release tracking in the park.",
 change="Releases happen on a schedule and are discrete, datable events with an uncertain outcome for each animal.",
 candidate_status="evidenced-situation", territory="T10",
 primary_idea="C095-I03", supporting_ideas=["C005-I02", "C030-I01"],
 sources=[
  S("S1","reference","Udawalawe Elephant Transit Home - Wikipedia","https://en.wikipedia.org/wiki/Udawalawe_Elephant_Transit_Home",None,"Established 1995; run by the Department of Wildlife Conservation; purpose of rehabilitation and release.","search-result"),
  S("S2","conservation programme","Uda Walawe wildlife programme - Dilmah Conservation","https://www.dilmahconservation.org/initiatives/biodiversity/udawalawa-wildlife-program.html",None,"Programme description including post-release monitoring.","search-result"),
  S("S3","feature","Snapshot: Udawalawe Elephant Transit Home","https://www.inspiringvacations.com/us/blog/destinations/snapshot-udawalawe-elephant-transit-home",None,"Minimal-human-interaction policy, release in bonded groups, radio collars, and the dung wash before release; over 200 animals released since 1995.","search-result")],
 unresolved="Release success rates and post-release survival, which are the measures that decide whether the policy works. Not found, and they must not be assumed to be good.",
 access="No contact made. The Department of Wildlife Conservation is the permission-holder and its process is formal.",
 ethics="Moderate. The facility is a visitor attraction as well as a rehabilitation centre, and the film should not become promotional. Any failure or death during the filming period must be reportable, which should be agreed in advance rather than discovered later.")

lead(lead_id="SL-SQ11-002", sq="SQ11", title="Watering a tree for twenty-three centuries",
 subject="The custodians and ritual officers of the Jaya Sri Maha Bodhi and the daily observances there",
 place="Jaya Sri Maha Bodhi, Anuradhapura", district="Anuradhapura", province="North Central",
 situation="The site is administered by the Chief High Priest of the Atamasthana and the Atamasthana Palakasabha. Published accounts describe continuous custodial care, daily Buddha pujas by pilgrims, and vows made to a guardian deity through a lay intermediary. Seasonal observances include the Duruthu festival in January, at which the first portion of the newly harvested rice is offered, and an observance a week before the Sinhala New Year at which fruit, herbal drinks, flowers and incense are offered with drumming.",
 activity="Cleaning, watering, lamp lighting, the drummed processions of the seasonal observances, and the engineering of props and supports that keep the tree standing.",
 change="Not a single event but a calendar. The Duruthu new-rice offering is a fixed, datable observance that ties the site to the harvest.",
 candidate_status="evidenced-situation", territory="T07",
 primary_idea="C011-I02", supporting_ideas=["C005-I01", "C039-I01"],
 sources=[
  S("S1","national library","Rituals and offerings for the Sacred Jaya Sri Maha Bodhi - National Library of Sri Lanka","http://www.natlib.lk/pdf/Rituals%20and%20offerings.pdf",None,"Documented account of the rituals and offerings, including the seasonal observances.","search-result"),
  S("S2","reference","Jaya Sri Maha Bodhi - Wikipedia","https://en.wikipedia.org/wiki/Jaya_Sri_Maha_Bodhi",None,"Administration by the Chief High Priest of Atamasthana and the Atamasthana Palakasabha; historical royal appointment of guardians; the Duruthu new-rice offering and the pre-New-Year observance.","search-result")],
 unresolved="Who the present custodians are, how the role is filled, and whether any of them would speak. Not established.",
 access="No contact made. Permission runs through the Atamasthana administration, and the site is among the most restricted in the country.",
 ethics="One of the most venerated sites in Sri Lanka. Filming must follow the site's own rules exactly, and the film must not treat devotion as anthropological material.")

lead(lead_id="SL-SQ22-003", sq="SQ22", title="A script with fewer and fewer readers",
 subject="Arwi manuscripts held in Sri Lankan Muslim towns, and whoever can still read them",
 place="Beruwala, Kattankudy and Puttalam", district="Kalutara, Batticaloa, Puttalam", province="Western, Eastern, North Western",
 situation="Arwi, Tamil written in an adapted Arabic script, is described as having been used in early Sri Lankan madrasas for teaching Arabic and by merchants for correspondence and contracts, with manuscripts preserved in Beruwala, Kattankudy and Puttalam. Sri Lankan Moor communities trace their origins to Arab and Persian trade across the Indian Ocean, with Beruwala, Galle and Trincomalee as early ports.",
 activity="Not established. Any filming depends on locating a specific collection and a reader, neither of which has been done.",
 change="None established.",
 candidate_status="unverified-lead", territory="T13",
 primary_idea="C091-I01", supporting_ideas=["C089-I02", "C100-I02"],
 sources=[
  S("S1","opinion and analysis site","Bridges across the bay: Indian Muslim contribution to Sri Lankan Muslims - Colombo Telegraph","https://www.colombotelegraph.com/index.php/bridges-across-the-bay-indian-muslim-contribution-to-sri-lankan-muslims/",None,"Arwi used in early madrasas and in merchant correspondence and contracts; manuscripts preserved in Beruwala, Kattankudy and Puttalam.","search-result"),
  S("S2","reference","Kattankudy - Wikipedia","https://en.wikipedia.org/wiki/Kattankudy",None,"Basic demographic and economic facts about the town, including textile trading, small manufacturing and fishing.","search-result")],
 unresolved="Whether any institution holds a catalogued Arwi collection, and whether anyone currently reads Arwi as a working skill. Both are unknown, and the second one decides whether there is a film here.",
 access="No contact made.",
 ethics="Kattankudy has a difficult recent history in national coverage. The film must not arrive there via that history, and the community's own priorities should shape whether this is worth doing at all.")

out=os.path.join(D,"leads.json"); ex=json.load(open(out)); have={x["lead_id"] for x in ex}
d=[x["lead_id"] for x in L if x["lead_id"] in have]; assert not d, d
ex.extend(L); json.dump(ex, open(out,"w"), indent=1, ensure_ascii=False)
print("batch:", len(L), "total:", len(ex))
