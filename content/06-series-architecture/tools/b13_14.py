# -*- coding: utf-8 -*-
import json, os
D=os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),"data"); A="2026-09-18"
def S(r,t,ti,u,p,s,c): return {"ref":r,"type":t,"title":ti,"url":u,"published":p,"accessed":A,"supports":s,"confirmed":c}
L=[]
def lead(**k):
    k.setdefault("decision","advance"); L.append(k)

lead(batch="B13", lead_id="SL-SQ01-005", sq="SQ01", title="He points, and you see nothing",
 subject="Village guides working the Sinharaja rainforest, and the buffer-zone households they come from",
 place="Sinharaja Forest Reserve and its buffer zone", district="Ratnapura, Galle, Matara", province="Sabaragamuwa and Southern",
 situation="Sinharaja is a UNESCO World Heritage site. Published accounts record that every group entering from the two principal entrances must take a local guide, that guides are recruited from neighbouring villages and trained by the Forest Department, and that these are sought-after positions which have made nearby families stakeholders in the reserve. Buffer-zone households historically depended on shifting cultivation, home gardens and forest products, and some villages were reachable only on foot. Peer-reviewed work finds that complex smallholder agriculture in the buffer zone supports endemic birds.",
 activity="A walk into the forest with a guide who sees what visitors cannot, the home gardens of the buffer zone, and the training that turned forest knowledge into a licensed job.",
 change="Not a dated event. The change is in what forest knowledge is now for.",
 candidate_status="evidenced-situation", territory="T02",
 primary_idea="C034-I01", supporting_ideas=["C013-I01","C009-I01","C097-I02"],
 sources=[
  S("S1","UNESCO","Sinharaja Forest Reserve - UNESCO World Heritage Centre","https://whc.unesco.org/en/list/405/",None,"World Heritage inscription and the reserve's significance.","search-result"),
  S("S2","conservation magazine","Sinharaja: the heart of South Asian biodiversity - Sanctuary Nature Foundation","https://www.sanctuarynaturefoundation.org/article/sinharaja---the-heart-of-south-asian-biodiversity",None,"The compulsory local guide at the two principal entrances, recruitment from neighbouring villages, Forest Department training, and the guides' position as stakeholders.","search-result"),
  S("S3","peer-reviewed journal","Complex small-holder agriculture in rainforest buffer zone, Sri Lanka, supports endemic birds - Frontiers in Ecology and Evolution","https://www.frontiersin.org/journals/ecology-and-evolution/articles/10.3389/fevo.2021.608434/full","2021","Buffer-zone smallholder agriculture and its role in supporting endemic bird species.","search-result"),
  S("S4","research organisation","Sri Lanka Program for Forest Conservation - facilities","https://slpfc.org/facilities/",None,"The field research centre adjacent to the reserve and upstream of a traditional village.","search-result")],
 unresolved="How many guides there are, what they earn, and how the positions are allocated. Not established, and allocation of a scarce licensed job in a small village is exactly where the interesting material would be.",
 access="No contact made. The Forest Department controls entry and licences the guides.",
 ethics="Moderate. A guide's income depends on the department and on tour operators, which limits what they can safely say on camera.")

lead(batch="B13", lead_id="SL-SQ06-004", sq="SQ06", title="The tip that depends on a leopard",
 subject="Safari jeep drivers and trackers at Yala, and the leopards that have got used to them",
 place="Yala National Park, principally Block I", district="Hambantota and Monaragala", province="Southern and Uva",
 situation="Reporting records nearly 390,000 visitors to Block I in the first half of 2025 generating more than USD 5 million, and describes Block I as having one of the world's highest leopard densities. Drivers are reported to receive tips of USD 50 to 100 when a leopard is seen, while many drivers and trackers are paid very little and depend on those tips, which is reported to push them to chase and crowd sightings. Improved mobile reception and social media are reported to produce leopard jams. Leopards in Block I are described as habituated to vehicles. As of early 2024 only 552 registered jeeps are permitted, with fines and licence suspensions for breaches, and authorities plan to cap numbers and open other blocks.",
 activity="The queue at the gate before dawn, the radio traffic between drivers, a jam around one animal, and the drive back.",
 change="A live regulatory response to a measured pressure, with numbers on both sides.",
 candidate_status="evidenced-situation", territory="T04",
 primary_idea="C073-I02", supporting_ideas=["C007-I01","C086-I02","C098-I01"],
 sources=[
  S("S1","environmental news","In Sri Lanka, animals pay the price for overcrowding and speeding jeeps - Mongabay","https://news.mongabay.com/2026/04/in-sri-lanka-animals-pay-the-price-for-overcrowding-and-speeding-jeeps/","2026-04","Visitor numbers and revenue for Block I in the first half of 2025; the 552 licensed jeeps from early 2024; fines and licence suspensions; the tip structure and drivers' dependence on it; leopard habituation; plans to cap jeeps and open other blocks.","search-result"),
  S("S2","news magazine","Yala National Park leopard jams put wildlife at risk - Scroll","https://scroll.in/article/1092245/leopard-jams-in-sri-lanka-reserve-park-put-wildlife-at-risk",None,"Independent reporting on leopard jams and the role of mobile reception and social media.","search-result"),
  S("S3","industry body","Visitor management and overcrowding at Yala National Park - Sri Lanka Tourism Alliance","https://www.srilankatourismalliance.com/news-and-updates/opinion-pieces/visitor-management-and-overcrowding-at-yala-national-park/",None,"The industry's own assessment of the visitor-management problem.","search-result")],
 unresolved="What a driver actually earns without tips. Reported figures are secondhand.",
 access="No contact made. Jeep drivers' associations at the park entrances are reachable; the Department of Wildlife Conservation controls filming inside.",
 ethics="High. Drivers are low-paid people responding rationally to an incentive designed by others, and a film that makes them the villains would be dishonest. Filming inside the park makes the crew another vehicle in the jam, which has to be acknowledged on screen rather than hidden.")

lead(batch="B13", lead_id="SL-SQ22-009", sq="SQ22", title="A community that is mostly a surname now",
 subject="Burgher families, and Portuguese-creole-speaking communities in the east",
 place="Colombo; Portuguese Burgher neighbourhoods in Batticaloa including Koolavaddy, Mamangam, Uppodai, Dutch Bar and Akkaraipattu, and Palayuttu in Trincomalee", district="Colombo, Batticaloa, Trincomalee", province="Western and Eastern",
 situation="Burghers are described as descendants of Europeans who came under Dutch and earlier rule and of mixed marriages, making up around 0.3 per cent of the population. Published estimates put the number at around 40,000, with an argument that those still practising the community's own culture and customs number around 15,000, mostly in Colombo, and record migration and intermarriage as the reason for the decline. Sri Lankan Portuguese creole is recorded as spoken by the Portuguese Burgher community in named neighbourhoods of Batticaloa and Trincomalee.",
 activity="Not established beyond community gatherings and the creole still spoken in a few streets.",
 change="Not established as an event. The change is generational and is measurable only in language use.",
 candidate_status="unverified-lead", territory="T12",
 primary_idea="C081-I03", supporting_ideas=["C091-I01","C047-I01","C084-I01"],
 sources=[
  S("S1","reference","Burgher people - Wikipedia","https://en.wikipedia.org/wiki/Burgher_people",None,"Origins, the 0.3 per cent population share, and the composition of the community.","search-result"),
  S("S2","reference","Sri Lankan Portuguese creole - Wikipedia","https://en.wikipedia.org/wiki/Sri_Lankan_Portuguese_creole",None,"The named Batticaloa and Trincomalee neighbourhoods where the creole is spoken.","search-result"),
  S("S3","scholarly blog","The Dutch Burghers in Sri Lanka today - Michael Roberts","https://thuppahis.com/2021/01/24/the-dutch-burghers-in-sri-lanka-today/","2021-01-24","The estimates of around 40,000 and of around 15,000 still practising the community's customs, and the role of migration and intermarriage.","search-result")],
 unresolved="No family, association or event has been identified, and the population estimates are contested within the sources themselves. A community is not a story until something is happening in it.",
 access="No contact made. The Dutch Burgher Union is an organised body and would be the route.",
 ethics="High. Defining who counts as a member of this community is contested inside it, and a film should not adjudicate that. The eastern Portuguese Burgher communities are also economically marginal, unlike the Colombo association, and the two should not be merged into one picture.")

lead(batch="B13", lead_id="SL-SQ18-005", sq="SQ18", title="A sum of money instead of an answer",
 subject="Families of the Easter Sunday 2019 victims, principally at Katuwapitiya, and the continuing demand for a prosecution",
 place="St Sebastian's Church, Katuwapitiya, Negombo, and the other attacked sites", district="Gampaha, Colombo, Batticaloa", province="Western and Eastern",
 situation="The 2019 Easter Sunday bombings killed 279 people, with 117 killed at St Sebastian's Church in Negombo, the deadliest single site. Seven years on, reporting records survivors still carrying physical and emotional injuries and successive governments failing to deliver a prosecution. The Catholic Church has continued to call for a special prosecutor, including in October 2025, describing the investigation as long-stalled and politically sensitive. A court ordered the former president to pay 100 million rupees and former police and intelligence officials sums between 10 and 75 million rupees to victims' families. In 2025 the Vatican honoured the victims as Witnesses of the Faith and the Church approved a prayer for truth and justice for use in all churches.",
 activity="The anniversary at the church, the parish's continuing campaign, and the legal process that produced compensation without a conviction.",
 change="An annual date, an organised and public campaign, and a live demand with a named remedy.",
 candidate_status="evidenced-situation", territory="T11",
 primary_idea="C060-I01", supporting_ideas=["C022-I01","C055-I01","C052-I02"],
 sources=[
  S("S1","Vatican news service","Sri Lankan Church renews call for special prosecutor for Easter Sunday attacks - Vatican News","https://www.vaticannews.va/en/church/news/2025-10/sri-lanka-easter-sunday-attacks-investigation-interview-fr-rohan.html","2025-10","The October 2025 call for a special prosecutor and the description of the investigation as stalled.","search-result"),
  S("S2","news agency","Memories of Sri Lankan Easter Sunday bombings refuse to die - UCA News","https://www.ucanews.com/news/memories-of-sri-lankan-easter-sunday-bombings-refuse-to-die/112909",None,"The 117 killed at St Sebastian's Negombo; survivors seven years on; the compensation ordered against the former president and officials; the Vatican's 2025 recognition and the approved prayer.","search-result"),
  S("S3","reference","2019 Sri Lanka Easter bombings - Wikipedia","https://en.wikipedia.org/wiki/2019_Sri_Lanka_Easter_bombings",None,"The overall toll of 279 and the sequence of attacks, for checking figures.","search-result"),
  S("S4","news and analysis","Five years on: still seeking justice for Easter Sunday bombings - Groundviews","https://groundviews.org/2024/04/21/five-years-on-still-seeking-justice-for-easter-sunday-bombings/","2024-04-21","Independent account of the investigation's state and the families' position.","search-result")],
 unresolved="Whether any compensation ordered has been paid, and the current status of the criminal investigation. Neither was established.",
 access="No contact made. The parish and the Archdiocese are organised and public on this, which makes an approach possible through them rather than to individual families.",
 ethics="Very high. Bereaved families have been approached repeatedly for seven years. Nobody should be asked to describe the day. The allegations about who is responsible are politically contested and partly unresolved in court, and the film must report the legal position, not adopt a theory.")

lead(batch="B13", lead_id="SL-SQ08-007", sq="SQ08", title="Every roof that helps the house strains the line",
 subject="Rooftop solar households, installers and the grid operator",
 place="High-demand urban and suburban areas where new connections are being restricted", district="multiple", province="multiple",
 situation="Reporting records rooftop solar reaching about 9.5 per cent of national grid supply in 2025, against a state programme target of 1,000 MW by 2025 and 1,500 MW by 2030 and a Ceylon Electricity Board aim of 70 per cent renewable generation by 2030. The same reporting records the CEB restricting new rooftop connections in high-demand areas because the low-tension network trips from over-voltage, with the effect that the households best placed to invest are the ones being blocked. New solar tariffs approved by cabinet on 16 June 2025 are reported as reducing rates by 20 to 40 per cent against the previous regime, and existing customers are allowed a one-time migration between net metering, net accounting and net plus schemes.",
 activity="An installation, a meter, a distribution transformer, and the decision about who may connect.",
 change="A dated tariff change, a live connection restriction and a target that is being missed or met depending on who is counting.",
 candidate_status="evidenced-situation", territory="T05",
 primary_idea="C086-I03", supporting_ideas=["C080-I03","C098-I01","C096-I01"],
 sources=[
  S("S1","newspaper","Rooftop solar at crossroads as Sri Lanka shifts to distributed energy future - The Island","https://island.lk/rooftop-solar-at-crossroads-as-sri-lanka-shifts-to-distributed-energy-future/",None,"Rooftop solar at about 9.5 per cent of the grid in 2025; CEB restricting new connections in high-demand areas; low-tension network tripping from over-voltage.","search-result"),
  S("S2","law firm analysis","Sri Lanka's solar tariff reforms - Mayer Brown","https://www.mayerbrown.com/en/insights/publications/2025/06/sri-lankas-solar-tariff-reforms","2025-06","The cabinet approval of new solar tariffs on 16 June 2025 and the 20 to 40 per cent reduction.","search-result"),
  S("S3","state agency","Soorya Bala Sangramaya - Sri Lanka Sustainable Energy Authority","https://www.energy.gov.lk/en/soorya-bala-sangramaya",None,"The programme's official targets of 1,000 MW by 2025 and 1,500 MW by 2030.","search-result"),
  S("S4","business news","Sri Lanka roof top solar users can switch metering - EconomyNext","https://economynext.com/sri-lanka-roof-top-solar-users-can-switch-metering-financing-for-new-users-137580/",None,"The one-time migration between net metering, net accounting and net plus schemes.","search-result")],
 unresolved="Whether the 1,000 MW target was met. The sources state the target, not the outcome.",
 access="No contact made. Installers are commercial and reachable; the CEB is an institution.",
 ethics="Low. A household's electricity bill is private.")

lead(batch="B14", lead_id="SL-SQ17-003", sq="SQ17", title="The dog you feed and the ones you do not",
 subject="Street dogs, the households that half-own them, and the catch-neuter-vaccinate-release programmes",
 place="Anuradhapura, where a long-running zoned programme has been evaluated, and elsewhere", district="Anuradhapura and others", province="North Central and others",
 situation="A national strategic plan for eliminating dog-mediated human rabies through a One Health approach was developed with the WHO for 2022 to 2026. Peer-reviewed work evaluates a zoned catch-neuter-vaccinate-release programme in Anuradhapura running from 2021 to 2025, combining capture of free-roaming dogs along set routes with voluntary presentation of owned dogs and a peripheral buffer-zone strategy. Reported human rabies deaths fell from 288 in 1975 to 23 in 2017. Reporting in 2025 records that 1.8 million dogs would have needed vaccinating in 2024 for herd immunity and that a 2025 budget allocation for canine sterilisation had not been spent.",
 activity="A catching round, a mobile clinic, the release, and the households that feed a dog without owning it.",
 change="A dated national target with a documented implementation gap, and a five-year programme that has just been evaluated.",
 candidate_status="evidenced-situation", territory="T10",
 primary_idea="C030-I02", supporting_ideas=["C027-I01","C024-I03","C098-I01"],
 sources=[
  S("S1","peer-reviewed journal","Long-term evaluation of a zoned catch-neuter-vaccinate-release program integrating owner engagement and buffer zone strategies in Anuradhapura, Sri Lanka - PMC","https://pmc.ncbi.nlm.nih.gov/articles/PMC13500148/","2025","The 2021-2025 Anuradhapura programme, its method and its evaluation.","search-result"),
  S("S2","intergovernmental body","National strategic plan for elimination of dog mediated human rabies, Sri Lanka - WOAH","https://rr-asia.woah.org/app/uploads/2023/11/cm37481-sri-lanka_final-nsp.pdf","2023","The national strategic plan and its objectives.","search-result"),
  S("S3","newspaper","Rabies still bites: Sri Lanka's unfinished battle - Ceylon Today","https://ceylontoday.lk/2025/06/07/rabies-still-bites-sri-lankas-unfinished-battle/","2025-06-07","The 1.8 million vaccination requirement for 2024 and the unspent 2025 sterilisation allocation.","search-result"),
  S("S4","UN agency","Achieving zero rabies deaths through a One Health approach - WHO Sri Lanka","https://www.who.int/srilanka/news/detail/28-09-2022-achieving-zero-rabies-deaths-through-one-health-approach","2022-09-28","The decline in human rabies deaths and the One Health framing.","search-result")],
 unresolved="Whether the 2026 target date was met or moved. Not established.",
 access="No contact made. Local authorities and the veterinary services run the programmes.",
 ethics="Moderate. Animal handling must not be filmed in a way that misrepresents it as cruelty or conceals distress. A dog bite victim is a medical subject with the usual protections.")

lead(batch="B14", lead_id="SL-SQ03-008", sq="SQ03", title="Land that did not exist ten years ago",
 subject="Colombo Port City, the enterprises moving into it, and the city beside it",
 place="Colombo Port City, on reclaimed land off Colombo", district="Colombo", province="Western",
 situation="Land reclamation was completed in 2019. Public utility connections to the city grid were commissioned on 17 October 2025. The site operates as a special economic zone under its own commission and act, with a reported 146 registered enterprises. A USD 120 million marina development broke ground on 10 January 2025 with a three-year timeline and berthing for 200 vessels, and office space was handed to anchor tenants in May 2025. Reported new investment between November 2025 and March 2026 exceeds USD 900 million, while commentary questions the level of foreign investment actually arriving.",
 activity="Construction, the marina, the new streets, and the old city on the other side of the boundary.",
 change="Active construction on a dated timeline, with a contested investment record.",
 candidate_status="unverified-lead", territory="T02",
 primary_idea="C020-I02", supporting_ideas=["C052-I01","C047-I01","C080-I03"],
 sources=[
  S("S1","project authority","About us - Colombo Port City Economic Commission","https://www.portcitycolombo.gov.lk/port-city-colombo",None,"The special economic zone, its commission and the governing act.","search-result"),
  S("S2","business news","Port City Colombo reaches 11 years: developer reaffirms commitment - Ada Derana Biz","https://bizenglish.adaderana.lk/port-city-colombo-reaches-11-years-developer-reaffirms-commitment-to-further-project-progress/",None,"Reclamation completed 2019; utilities commissioned 17 October 2025; 146 registered enterprises; the marina groundbreaking on 10 January 2025 and the May 2025 handover.","search-result"),
  S("S3","opinion and analysis","Colombo Port City: rapid progress, but where is the foreign investment? - Colombo Telegraph","https://www.colombotelegraph.com/index.php/colombo-port-city-rapid-progress-but-where-is-the-foreign-investment/",None,"The counter-argument about the level of foreign investment.","search-result")],
 unresolved="Nobody has been identified whose life is at stake in this. Reporting on effects on fishing communities was sought and not found, which is a gap in the research rather than evidence of no effect. Without a human subject this is architecture.",
 access="No contact made.",
 ethics="Moderate. Most available material is either promotional or oppositional; almost none of it is neutral reporting, and the film would have to do its own work.")

lead(batch="B14", lead_id="SL-SQ22-010", sq="SQ22", title="Words the grandchildren can say but not use",
 subject="Sri Lanka Malay speakers and families, particularly where the language is still a community majority",
 place="Kirinda, where speakers are reported as a majority; Hambantota town; Colombo", district="Hambantota and Colombo", province="Southern and Western",
 situation="Sri Lanka Malay is a creole that developed among people brought from the Dutch East Indies roughly three centuries ago, shaped by Sinhala and Tamil. The community is reported at around 50,000, concentrated in Colombo, Hambantota and Kirinda, with speakers described as an absolute majority of the population in Kirinda. The language is listed as endangered; published accounts record that few children now speak it at home, that most speakers of all ages primarily use Sinhala or English, and that the language has no official status and no support in the school system.",
 activity="Household conversation, a community event, and a classroom where the language is not taught.",
 change="Not a dated event. The change is a generational handover that is documented as failing, and the people who can describe it are ageing.",
 candidate_status="evidenced-situation", territory="T13",
 primary_idea="C091-I01", supporting_ideas=["C066-I02","C089-I02","C081-I03"],
 sources=[
  S("S1","language documentation project","Sri Lanka Malay - Endangered Languages Project","https://endangeredlanguages.com/elp-language/3568",None,"Endangered status, speaker numbers and community locations.","search-result"),
  S("S2","linguistic survey","Sri Lankan Malay - Atlas of Pidgin and Creole Language Structures Online","https://apics-online.info/surveys/66",None,"Scholarly survey of the language's origins and structure.","search-result"),
  S("S3","reference","Sri Lanka Malay language - Wikipedia","https://en.wikipedia.org/wiki/Sri_Lanka_Malay_language",None,"Kirinda as a place where speakers are a majority; the community figure of around 50,000; few children speaking it at home; no official status or school support.","search-result"),
  S("S4","news","Sri Lanka's Malay language faces the silent threat of extinction - Lanka Newspapers","https://www.lankanewspapers.com/2026/07/29/sri-lanka-s-malay-language-faces-the-silent-threat-of-extinction","2026-07-29","Recent reporting on the language's position and on younger generations moving to Sinhala, Tamil and English.","search-result")],
 unresolved="Whether any teaching or documentation effort is currently running in Kirinda. Not established.",
 access="No contact made. Community and mosque associations in Kirinda and Hambantota are the route.",
 ethics="High. A film about a language dying can itself make speakers feel their language is finished. The community's own view of whether it is endangered, and whether it wants the attention, controls this.",
 relates_to=["SL-SQ22-003"],
 relation_note="Shares a mechanism with the Arwi manuscript lead: words that outlive the people who can use them. Kept separate because one is a written script in institutional custody and the other is a spoken language in daily households, and because the communities and regions differ.")

lead(batch="B14", lead_id="SL-SQ16-003", sq="SQ16", title="A season away on an island",
 subject="Migrant fishermen living in seasonal camps on the islands and sandbars off Kalpitiya",
 place="Kalpitiya peninsula and the islands of the Puttalam lagoon area, including Baththalangunduwa", district="Puttalam", province="North Western",
 situation="Kalpitiya is described as a predominantly Muslim fishing community at the mouth of the Puttalam lagoon, about 165 km north of Colombo. Accounts describe seasonal camps, wadiya, occupied by fishermen and workers who come from Negombo, Puttalam, Kalpitiya and further inland, with fish packed in ice under a trader who finances the operation. Spinner dolphins are reported in very large aggregations off Kalpitiya between November and March, and the same waters support a kitesurfing season.",
 activity="Camp life on a sandbar, the night's fishing, the ice and the trader's accounting, and the journey home at the end of a season.",
 change="A seasonal cycle with a defined start and end, and a journey built into it.",
 candidate_status="unverified-lead", territory="T10",
 primary_idea="C077-I02", supporting_ideas=["C102-I01","C052-I01","C005-I02"],
 sources=[
  S("S1","regional guide","Kalpitiya - Muslim fishing community located at Puttalam lagoon - Explore Lanka","https://explorelanka.com/places/north-western/kalpitiya.htm",None,"Kalpitiya's position at the mouth of the lagoon and its fishing community.","search-result"),
  S("S2","first-person account","Baththalangunduwa, Sri Lanka","https://vocal.media/journal/baththalangunduwa-sri-lanka",None,"Fishermen and workers coming from Negombo, Kalpitiya, Puttalam and Kandy; the ice wadiya and the trader who oversees it; migrant occupation of the islands. A personal account, and weak evidence on its own.","search-result"),
  S("S3","wildlife operator guide","Kalpitiya - Wildlife Worldwide","https://www.wildlifeworldwide.com/locations/kalpitiya",None,"The November to March spinner dolphin season.","search-result")],
 unresolved="The camps themselves are documented only in a personal account and in tourism material. Nothing reliable was found on how many people live in them, on what terms, or under what arrangement with the traders who finance them.",
 access="No contact made.",
 ethics="High if the financing arrangement involves debt bondage, which is a known pattern in seasonal fisheries and was neither confirmed nor excluded here. That must be established before anyone is filmed.")

lead(batch="B14", lead_id="SL-SQ17-004", sq="SQ17", title="Two hundred kilometres for a prescription",
 subject="Rural mental health services, community counsellors and the people they are meant to reach",
 place="Rural districts", district="multiple", province="multiple",
 situation="Published figures record around 3,000 suicides a year in Sri Lanka, roughly eight to nine a day, with a 2022 rate of about 15 per 100,000 overall and a large gap between men and women, and record that around 70 per cent of cases are rural. Research records that psychotropic medication is not available in rural clinics, requiring patients to travel 50 to 100 km to renew a prescription, and identifies farmers, daily wage labourers, female-headed households and foreign migrant households as populations at higher risk of attempted suicide. Increasing the number of trained lay community counsellors has been recommended, and the WHO has supported counsellor training and a district-level national helpline.",
 activity="A clinic day, the journey to reach it, a counsellor's round, and the helpline.",
 change="Live capacity-building work against a measured and persistent problem.",
 candidate_status="evidenced-situation", territory="T10",
 primary_idea="C032-I02", supporting_ideas=["C047-I02","C001-I03","C030-I01"],
 sources=[
  S("S1","university policy unit","Preventing suicide in Sri Lanka - PolicyBristol, University of Bristol","https://www.bristol.ac.uk/policybristol/policy-briefings/preventing-suicide-sri-lanka/",None,"Research-based policy briefing on suicide prevention in Sri Lanka.","search-result"),
  S("S2","peer-reviewed journal","Public mental healthcare and economic vulnerability in Sri Lanka - ScienceDirect","https://www.sciencedirect.com/science/article/pii/S2666560324000926","2024","The rural service gap including unavailability of psychotropic medication in rural clinics and the travel required; the populations identified as vulnerable.","search-result"),
  S("S3","UN agency","World Suicide Prevention Day 2025: changing the narrative on suicide in Sri Lanka - WHO","https://www.who.int/srilanka/news/detail/10-09-2025-world-suicide-prevention-day-2025--changing-the-narrative-on-suicide-in-sri-lanka","2025-09-10","WHO support for counsellor training and the district-level helpline, and the current framing of the problem.","search-result"),
  S("S4","clinical review","Critical review: Sri Lanka's mental health crisis - underfunding, stigma and service gaps - Centre for Research, National Hospital Kandy","https://c4rnhk.org/critical-review-sri-lankas-mental-health-crisis-underfunding-stigma-and-service-gaps/",None,"Assessment of underfunding, stigma and service gaps.","search-result")],
 unresolved="Current national figures. The rate cited is from 2022 and has not been updated here.",
 access="No contact made. The Ministry of Health and the National Institute of Mental Health control clinical access.",
 ethics="**The highest in this catalogue.** Suicide reporting is governed by established media guidelines on method, location and framing, and those guidelines apply to a documentary. No person in crisis may be filmed. No patient may be filmed in a clinical setting without their own consent taken when they are able to give it. A clinical adviser and a safeguarding protocol are required before any approach, and the project must be prepared to abandon the episode rather than compromise on this.")

lead(batch="B14", lead_id="SL-SQ01-006", sq="SQ01", title="The looking is what wears it away",
 subject="Conservators, wardens and visitors at Sigiriya",
 place="Sigiriya", district="Matale", province="Central",
 situation="Sigiriya is managed by the Central Cultural Fund. Published accounts describe the frescoes as the site's most fragile element, subject to conservation interventions since the early twentieth century, with current concerns including microbiological growth on the plaster and mechanical vibration from visitor footfall on the metal staircase. Access to the painting cavity is limited to a small viewing platform at a time and photography of the frescoes is prohibited and enforced by wardens. Documentation work includes 3D scanning and photogrammetry. Commentary argues that the site's other features, including the museum, water garden and caves, should be developed to distribute visitors away from the climb.",
 activity="The climb, the queue at the fresco gallery, the wardens enforcing the no-photography rule, and conservation monitoring.",
 change="Not a dated event. The tension is continuous and measurable: the number of people looking is the thing damaging what they came to look at.",
 candidate_status="evidenced-situation", territory="T01",
 primary_idea="C009-I01", supporting_ideas=["C013-I01","C040-I01","C027-I01"],
 sources=[
  S("S1","state agency","Sigiriya Rock Fortress - Central Cultural Fund","https://ccf.gov.lk/heritage-sites/sigiriya-rock-fortress/",None,"Official management of the site and its conservation remit.","search-result"),
  S("S2","industry body","Rethinking tourism in Sri Lanka's cultural triangle - Sri Lanka Tourism Alliance","https://www.srilankatourismalliance.com/news-and-updates/rethinking-tourism-in-sri-lankas-cultural-triangle/",None,"The argument for distributing visitors across the complex rather than concentrating them on the climb, and the impact of the climb on the frescoes and on safety.","search-result"),
  S("S3","travel guide","Sigiriya frescoes and ancient graffiti - Sri Lanka Tour Help","https://srilankatourhelp.org/articles/sigiriya-frescoes-ancient-graffiti","2026","Conservation interventions since the early twentieth century; microbiological growth on the plaster; mechanical vibration from footfall on the metal staircase; the limited viewing platform and the photography prohibition.","search-result")],
 unresolved="Visitor numbers, and whether any cap is under consideration. Not established. The conservation claims come partly from guide sources and should be confirmed with the Central Cultural Fund.",
 access="No contact made. The Central Cultural Fund controls all filming and would have to permit any filming of the frescoes, which visitors may not photograph.",
 ethics="Low for people, high for the site. A film crew at the fresco gallery is additional footfall and additional time on the staircase, and the project would be doing the thing it is describing.")

out=os.path.join(D,"leads.json"); ex=json.load(open(out)); have={x["lead_id"] for x in ex}
d=[x["lead_id"] for x in L if x["lead_id"] in have]; assert not d,d
ex.extend(L)
# update the sports lead with the stronger cricket evidence and record the merge
for x in ex:
    if x["lead_id"]=="SL-SQ10-006":
        x["title"]="Training where there is nothing to train with"
        x["situation"]+=(" School cricket provides a documented instance of the same concentration: the Royal-Thomian encounter, played annually since 1879 and described as the second-oldest uninterrupted school cricket series in the world, is scheduled for 12 to 14 March 2026 at the Sinhalese Sports Club with a day-night limited-overs fixture on 28 March 2026, while published analysis records that infrastructure, coaching and competitive exposure have historically been concentrated in elite urban schools, leaving many rural schools structurally confined to lower divisions.")
        x["sources"].extend([
          S("S4","peer-reviewed journal","Sri Lanka cricket: a narrative review of tourism potential, regional development and social impacts - Frontiers in Sustainable Tourism","https://www.frontiersin.org/journals/sustainable-tourism/articles/10.3389/frsut.2026.1736816/full","2026","Concentration of cricket infrastructure, coaching and competitive exposure in elite urban schools and the structural constraints on rural schools.","search-result"),
          S("S5","news","Royal-Thomian fever back in March, historic night game planned - Newswire","https://www.newswire.lk/2026/01/22/royal-thomian-fever-back-in-march-historic-night-game-planned/","2026-01-22","The 2026 fixture dates and the first day-night school fixture at the Sinhalese Sports Club.","search-result"),
          S("S6","reference","Royal-Thomian rivalry - Wikipedia","https://en.wikipedia.org/wiki/Royal%E2%80%93Thomian_rivalry",None,"The series running annually since 1879 and its standing as the second-oldest uninterrupted school cricket series.","search-result")])
        x["candidate_status"]="evidenced-situation"
        x["merged_from"]=["a separate lead on the school big match and cricket access"]
        x["merge_note"]=("A separate lead on the Royal-Thomian big match was opened and merged here rather than kept as its own episode. "
          "The big match is the most visible expression of the same concentration this lead is about, and two episodes would have split one argument. "
          "Note the risk in the merged form: the big match is a spectacle and could swallow the story of the schools that are not at it.")
json.dump(ex,open(out,"w"),indent=1,ensure_ascii=False); print("added:",len(L),"total:",len(ex))
