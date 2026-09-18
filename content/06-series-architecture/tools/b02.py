# -*- coding: utf-8 -*-
import json, os
D = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
A = "2026-09-18"
def S(ref, typ, title, url, pub, supports, conf):
    return {"ref": ref, "type": typ, "title": title, "url": url, "published": pub,
            "accessed": A, "supports": supports, "confirmed": conf}
L = []
def lead(**k):
    k.setdefault("batch", "B02"); k.setdefault("decision", "advance"); L.append(k)

lead(lead_id="SL-SQ20-001", sq="SQ20", title="The tanks that were built for a drought nobody alive remembers",
 subject="Farmer organisations and restoration programmes working on the small village tank cascade systems of the dry zone",
 place="Dry-zone cascades including the Palugaswewa cascade", district="Anuradhapura and other dry-zone districts", province="North Central and others",
 situation="The FAO recognises Sri Lanka's cascaded tank village system as a Globally Important Agricultural Heritage System. Published accounts describe more than 14,000 small ancient village tanks supporting around 246,000 hectares of paddy, about 39 per cent of the irrigable area, with many others rendered dysfunctional by poor maintenance and under pressure from climate, land use and agricultural intensification. Around 200 tanks have been rehabilitated through FAO projects, and in 2016 over 3,000 forest plants were replanted in the upstream and downstream reservations of the Palugaswewa cascade with village participation.",
 activity="Desilting, bund repair, replanting the tank's forest belt, the seasonal filling and drawing down of a tank, and the farmer-organisation meetings where water is allocated.",
 change="Restoration work with dates, locations and participating communities, against a documented backdrop of neglect.",
 candidate_status="evidenced-situation", territory="T13",
 primary_idea="C052-I03", supporting_ideas=["C052-I01", "C001-I01"],
 sources=[
  S("S1","UN agency","Sri Lanka Cascaded Tank-Village System - FAO Globally Important Agricultural Heritage Systems","https://www.fao.org/giahs/giahs-around-the-world/sri-lanka-cascaded-tank-village-system/en",None,"Official GIAHS designation and description of the cascaded tank village system.","search-result"),
  S("S2","news","Sri Lanka aims to restore ancient irrigation tanks in climate change plan - Mongabay","https://news.mongabay.com/2023/04/sri-lanka-aims-to-restore-ancient-irrigation-tanks-in-climate-change-plan/","2023-04","More than 14,000 small ancient village tanks; about 246,000 hectares of paddy, roughly 39 per cent of the irrigable area; many tanks dysfunctional from poor maintenance.","search-result"),
  S("S3","research institute","Building back better: the ecological restoration of Sri Lanka's Village Tank Cascade Systems - Alliance of Bioversity International and CIAT","https://alliancebioversityciat.org/stories/ecological-restoration-sri-lanka-cascade-systems",None,"About 200 tanks rehabilitated through FAO projects; over 3,000 forest plants replanted at the Palugaswewa cascade in 2016 with village participation.","search-result"),
  S("S4","development bank","Sri Lanka's ancient treasure trove: rehabilitating tank cascades to champion climate resilience - World Bank","https://www.worldbank.org/en/news/feature/2023/03/22/sri-lanka-s-ancient-treasure-trove-rehabilitating-tank-cascades-to-champion-climate-resilience","2023-03-22","Independent confirmation of the rehabilitation programme and its climate rationale.","search-result")],
 unresolved="Which specific cascade has work scheduled in the coming season, and whether a farmer organisation would welcome filming. Not established.",
 access="No contact made. Farmer organisations and the Department of Agrarian Development are the formal routes.",
 ethics="Water allocation is a source of dispute between upstream and downstream users. Filming one meeting can expose a position. Consent must cover the organisation, not only an individual speaker.")

lead(lead_id="SL-SQ07-001", sq="SQ07", title="Twenty trees before the heat",
 subject="Palmyrah toddy tappers in the Jaffna peninsula",
 place="Jaffna peninsula", district="Jaffna", province="Northern",
 situation="Reporting describes toddy tapping as a traditional occupation facing extinction, with younger people unwilling to take on the risk, falls in rain and wind a known hazard, and a small market with co-operatives capping purchases so that sap brings little profit. One report states that about 10,000 people in Jaffna are engaged in growing and tapping palmyrah, with about 800 more working as helpers.",
 activity="Climbing before dawn, cutting and binding the inflorescence, collecting and lowering pots, the walk between trees, delivery to a co-operative.",
 change="A documented generational gap in an occupation whose daily physical demand is visible in the work itself.",
 candidate_status="evidenced-situation", territory="T05",
 primary_idea="C003-I02", supporting_ideas=["C073-I03", "C084-I01"],
 sources=[
  S("S1","news agency","Toddy tapping, a traditional Sri Lankan job, faces extinction - Global Press Journal","https://globalpressjournal.com/asia/sri_lanka/toddy-tapping-traditional-sri-lankan-job-faces-extinction/index.html",None,"Younger generations unwilling to take on the risk; numbers dwindling for decades; falls in rain and wind; adulterated toddy from imported synthetic materials.","search-result"),
  S("S2","newspaper","Top toddy: Sri Lanka's tree tapping trade reaches new heights - Daily News","https://archives1.dailynews.lk/2021/12/28/business/268587/top-toddy-sri-lanka%E2%80%99s-tree-tapping-trade-reaches-new-heights","2021-12-28","About 10,000 people in Jaffna engaged in growing and tapping palmyrah and about 800 working as helpers; co-operatives capping purchases; low profit from sap.","search-result"),
  S("S3","documentary photography","Toddy Tappers - Antoine Jonquiere","https://www.antoinejonquiere.com/toddy-tappers",None,"Existing photographic documentation of the work, useful for checking what has already been covered.","search-result")],
 unresolved="Current tapper numbers and ages. The 10,000 figure is from 2021 and covers growing as well as tapping.",
 access="No contact made. The palmyrah co-operatives and the Palmyrah Development Board are institutional routes.",
 ethics="This is alcohol production with a licensing regime and a public-health dimension, and the work involves real fall risk. Nobody should climb for the camera, and no climb should be repeated for a better angle.")

lead(lead_id="SL-SQ13-001", sq="SQ13", title="The animal on the other side of the fence",
 subject="Farming households guarding crops at night in areas of high human-elephant conflict, and the elephants involved",
 place="Dry-zone farming villages; one reported case at Makulpotha", district="multiple dry-zone districts", province="North Central, North Western, Uva, Eastern",
 situation="Reported figures for 2015 to 2024 are 1,195 people and 3,484 wild elephants killed, with further deaths reported in 2025. Reporting describes attacks on farmers rising from 60 in 2011 to 188 in 2023, and describes farmers sleeping in raised watch huts beside their fields, including a named 2024 case at Makulpotha in which a farmer was killed by a bull elephant.",
 activity="Building and occupying a raised watch hut, night noise-making, electric fence maintenance, crop harvesting under pressure, and the Department of Wildlife Conservation's response work.",
 change="An intensifying, currently reported conflict with official casualty figures on both sides.",
 candidate_status="evidenced-situation", territory="T08",
 primary_idea="C007-I01", supporting_ideas=["C058-I02", "C098-I01"],
 sources=[
  S("S1","broadcaster","Sri Lanka reports massive tolls in human-elephant conflicts - VOA News","https://www.voanews.com/a/sri-lanka-reports-massive-tolls-in-human-elephant-conflicts/7989844.html",None,"1,195 people and 3,484 wild elephants killed between 2015 and 2024; further deaths in January 2025.","search-result"),
  S("S2","public radio","Elephants eat their crops. Farmers strike back - WVIA / NPR","https://www.wvia.org/news/2026-05-16/elephants-eat-their-crops-farmers-strike-back-its-a-war-thats-only-getting-worse","2026-05-16","The named Makulpotha case of a farmer killed while guarding a vegetable plot from a raised hut; attacks on farmers rising from 60 in 2011 to 188 in 2023.","search-result"),
  S("S3","conservation society","Sri Lanka's elephant crisis - Wildlife and Nature Protection Society","https://www.wnpssl.org/news/elehec-aug25.html","2025-08","Conservation-sector assessment of the conflict and of proposed responses.","search-result"),
  S("S4","magazine","Human-elephant conflict is rising in Sri Lanka - New Lines Magazine","https://newlinesmag.com/spotlight/human-elephant-conflict-is-rising-in-sri-lanka/",None,"Long-form independent reporting on the conflict.","search-result")],
 unresolved="Which village would agree to be filmed, and whether a household that has lost someone would want that. Nothing is established.",
 access="No contact made. The Department of Wildlife Conservation is a necessary permission-holder for anything involving elephants.",
 ethics="High. Deaths and bereavement on one side and killing of a protected animal on the other. A safeguarding protocol is required before any approach, and filming at night near elephants is dangerous for a crew and can itself provoke an incident. No family should be approached because their loss is dramatic.")

lead(lead_id="SL-SQ23-003", sq="SQ23", title="The turbines and the fishing ground",
 subject="Artisanal fishing communities on Mannar Island and the expansion of wind power there",
 place="Mannar Island, between the Adam's Bridge Marine National Park and the Vankalai Ramsar wetland", district="Mannar", province="Northern",
 situation="The Thambapavani wind farm on Mannar Island, operated by the Ceylon Electricity Board, was built along fishing routes in 2020. A second phase involving Adani Green Energy has been proposed with 52 turbines of 5.2 MW each in an area between a marine national park and a Ramsar wetland. Reporting records fishermen saying they were not told the project would change their livelihoods, concerns in an environmental impact assessment that turbine noise could drive nearshore fish away, residents reporting flash floods, land demand and turbine noise, and protests that blocked the Mannar Bridge to stop turbine components reaching the island.",
 activity="Launching and landing small craft, net work, the turbines themselves, protest meetings, and the bird migration that makes the site internationally significant.",
 change="An active, contested, currently unfolding project with documented objections and a documented legal and environmental dimension.",
 candidate_status="evidenced-situation", territory="T14",
 primary_idea="C076-I03", supporting_ideas=["C098-I01", "C020-I02"],
 sources=[
  S("S1","newspaper","Gone with the wind: Mannar fisherfolk fear of being blown away by turbine project - The Sunday Times","https://www.sundaytimes.lk/240204/news/gone-with-the-wind-mannar-fisherfolk-fear-of-being-blown-away-by-turbine-project-547275.html","2024-02-04","Fishermen's objections; the account that residents were unaware the project would change their livelihoods; the 2020 construction along fishing routes.","search-result"),
  S("S2","environmental news","Respite, for now, for bird migration hotspot at heart of Sri Lanka's wind power dispute - Mongabay","https://news.mongabay.com/2025/08/respite-for-now-for-bird-migration-hotspot-at-heart-of-sri-lankas-wind-power-dispute/","2025-08","The proposed second phase, its location between the Adam's Bridge Marine National Park and the Vankalai Ramsar wetland, and the bird-migration significance.","search-result"),
  S("S3","fishworkers' network","Coastal livelihoods, communities bear fallout of Sri Lanka's wind energy push - ICSF","https://icsf.net/newss/coastal-livelihoods-communities-bear-fallout-of-sri-lankas-wind-energy-push/",None,"Fishers travelling further because of reduced nearshore catch; EIA concern about turbine noise; flash floods, land demand and noise reported by residents.","search-result"),
  S("S4","reference","Thambapavani Wind Farm - Wikipedia","https://en.wikipedia.org/wiki/Thambapavani_Wind_Farm",None,"Basic project facts and CEB operation, for cross-checking names and capacities.","search-result")],
 unresolved="Whether the second phase is proceeding as of 2026, and under which operator. Reporting is contested and politically charged, and allegations of cronyism appear in the press without being established.",
 access="No contact made. Fisher co-operative societies in Mannar are the appropriate first approach.",
 ethics="A live political dispute in a post-war district. Filming fishers who are in conflict with a state utility and a large investor can expose them. Allegations of cronyism reported in the press must not be repeated as fact or put to participants as though established.")

lead(lead_id="SL-SQ22-001", sq="SQ22", title="Listening for the singing fish",
 subject="The reported underwater sound of the Batticaloa lagoon, the people who say they have heard it, and the lagoon's condition now",
 place="Batticaloa lagoon, including the water near the Kallady bridge", district="Batticaloa", province="Eastern",
 situation="The Batticaloa lagoon is widely known as the place of the singing fish, a reported underwater sound heard on still nights. A recording made near the Kallady bridge in the 1950s by a priest, Father Lang, is the best-known documentation. Scientific literature records that the lagoon, Sri Lanka's third-largest brackish water body, has undergone habitat degradation and water-quality deterioration over the past thirty years. Whether the sound can still be heard today was not established.",
 activity="Night boats on the lagoon, listening with an oar or a hydrophone, the bridge, and the fishing that continues in the lagoon.",
 change="A remembered phenomenon against a documented decline in the water body itself.",
 candidate_status="unverified-lead", territory="T13",
 primary_idea="C047-I01", supporting_ideas=["C009-I01", "C036-I02"],
 sources=[
  S("S1","peer-reviewed journal","Fish diversity and assemblage in the Batticaloa lagoon, Sri Lanka - Journal of Fish Biology","https://onlinelibrary.wiley.com/doi/10.1111/jfb.15314","2023","Scientific survey of the lagoon's fish assemblage; records habitat degradation and water-quality deterioration over the past thirty years.","search-result"),
  S("S2","newspaper travel feature","In Sri Lanka's Batticaloa, you may hear singing fish - Khaleej Times","https://www.khaleejtimes.com/travel/in-sri-lankas-batticaloa-you-may-hear-singing-fish",None,"The tradition of the sound; the account of Father Lang's 1950s recording near the Kallady bridge using a stethoscope and reel-to-reel recorder.","search-result")],
 unresolved="Whether the sound is currently audible, whether any recording of it exists that can be licensed, and which species is responsible. None of this is established, and the premise collapses into folklore if nothing can be heard. That is itself a legitimate outcome for a documentary, but it must be planned for.",
 access="No contact made.",
 ethics="Low, except that a well-known local legend must not be presented as confirmed. If nothing is heard, the film says so.")

lead(lead_id="SL-SQ23-004", sq="SQ23", title="Whose forest the field is",
 subject="Chena cultivators in the Monaragala district and their relationship with the Forest Department",
 place="Monaragala district, including the Maligavila area", district="Monaragala", province="Uva",
 situation="Academic work on chena in Monaragala records the major problems reported by farmers as wildlife and cattle damage (83 per cent), legal action by the forest department (67 per cent), drought (65 per cent), pests and disease (54 per cent) and marketing (43 per cent), and records that around 74 per cent of respondents were willing to continue chena because they have no alternative livelihood. Satellite-based work on the Maligavila division records a marked increase in agricultural drought indicators between 2015 and 2023. Chena is described as covering about 18 per cent of the cultivated land area nationally.",
 activity="Clearing and burning before the north-east monsoon, sowing sesame, kurakkan, cowpea and maize, guarding against wildlife, and the harvest.",
 change="A seasonal cycle with a legal dispute running through it and a measured worsening of drought conditions.",
 candidate_status="evidenced-situation", territory="T09",
 primary_idea="C006-I02", supporting_ideas=["C052-I01", "C098-I01"],
 sources=[
  S("S1","conference paper","Economic analysis of chena cultivation in Monaragala district, Sri Lanka - International Forestry and Environment Symposium","https://journals.sjp.ac.lk/index.php/fesympo/article/view/198",None,"The percentages for wildlife damage, forest department legal action, drought, pests and marketing; and that about 74 per cent would continue for lack of an alternative.","search-result"),
  S("S2","reference","Chena cultivation - Wikipedia","https://en.wikipedia.org/wiki/Chena_cultivation",None,"Definition of chena, the slash-and-burn method, timing before the north-east monsoon, and the crop types.","search-result"),
  S("S3","UN agency","Sri Lankan women and men as bioresource managers - FAO","https://www.fao.org/4/ac791e/ac791e07.htm",None,"Chena practised extensively in the dry and arid zones, covering about 18 per cent of the cultivated land area.","search-result")],
 unresolved="Whether any of the filmed cultivation would be legally exposed. This decides whether the story can be made at all without putting a household at risk of prosecution.",
 access="No contact made.",
 ethics="High and specific. Filming cultivation that a state department treats as illegal could produce evidence against the participants. This must be resolved with the participants and, if necessary, with the department before any filming, and anonymity may not be enough.")

lead(lead_id="SL-SQ15-001", sq="SQ15", title="What the river is worth by night",
 subject="Communities along the Deduru Oya affected by river sand mining, and the enforcement of the ban on it",
 place="The Deduru Oya and its banks", district="Kurunegala and Puttalam", province="North Western",
 situation="Newspaper investigation describes more than two decades of illegal sand mining deepening the river bed, eroding banks, damaging livelihoods and threatening water security along the Deduru Oya, a main water source including for agriculture in the Puttalam district. Published analysis records that the Supreme Court banned river sand mining along the Maha Oya and Deduru Oya in 2004 and that enforcement has been weak. Technical sources record that sand mining lowers water tables, drying dug wells, putting root systems above the water table and increasing seawater intrusion and salinisation.",
 activity="River banks with visible scour, dug wells, night haulage, and the work of the community groups and officials who try to stop it.",
 change="A long-running, documented and legally prohibited activity with measurable physical effects.",
 candidate_status="evidenced-situation", territory="T09",
 primary_idea="C082-I02", supporting_ideas=["C023-I01", "C098-I01", "C052-I01"],
 sources=[
  S("S1","newspaper investigation","Politically-backed sand mining mafia wrecking Deduru Oya and livelihoods - The Sunday Times","https://www.sundaytimes.lk/210815/news/politically-backed-sand-mining-mafia-wrecking-deduru-oya-and-livelihoods-452394.html","2021-08-15","Two decades of illegal mining; deepened river bed; bank erosion; wrecked livelihoods; threat to water security; Deduru Oya as a main water source for Puttalam district agriculture.","search-result"),
  S("S2","international network","Curbing unregulated river sand mining in Sri Lanka - Global Water Partnership","https://www.gwp.org/en/we-act/change-and-impact/Impact-Stories/curbing-unregulated-river-sand-mining-in-sri-lanka/",None,"The 2004 Supreme Court ban on river sand mining along the Maha Oya and Deduru Oya, and weak enforcement.","search-result"),
  S("S3","civil society","Water integrity in action: curbing illegal sand mining in Sri Lanka - Water Integrity Network","https://www.waterintegritynetwork.net/post/water-integrity-in-action-curbing-illegal-sand-mining-in-sri-lanka",None,"Community mobilisation against illegal mining, and the governance dimension.","search-result"),
  S("S4","academic","Unregulated river sand mining in Sri Lanka: a way forward","https://www.researchgate.net/publication/369884336_UNREGULATED_RIVER_SAND_MINING_IN_SRI_LANKA_A_WAY_FORWARD_FOR_SUSTAINABLE_RIVER_SAND_MINING",None,"Technical account of water-table lowering, dry wells, root systems above the water table, and seawater intrusion.","search-result")],
 unresolved="Nothing about the present operators is established, and the word mafia comes from a newspaper headline, not from a finding.",
 access="No contact made.",
 ethics="Very high. This involves alleged organised illegality with alleged political protection. Filming at night at an active site would put a crew and any local guide at real risk, and anyone who speaks on camera could face retaliation. This lead may only proceed through established community organisations, with a security assessment, and possibly without identifying anyone.")

lead(lead_id="SL-SQ19-001", sq="SQ19", title="Planting back into the ponds",
 subject="Community mangrove restoration around Puttalam lagoon and the abandoned shrimp ponds it works in",
 place="Puttalam lagoon, including the Anawilundawa wetland sanctuary", district="Puttalam", province="North Western",
 situation="Published research records that over half the mangrove cover around Puttalam lagoon was removed between 1992 and 1998 for shrimp aquaculture, that shrimp-farm area increased dramatically over a nineteen-year period while mangrove area declined by about a third, and that more than 90 per cent of former shrimp ponds in the district are now abandoned after disease and poor management. Restoration is documented in both passive and active forms, including nursery-raised seedlings planted with local communities at Anawilundawa.",
 activity="Nursery beds, seedling planting in and around abandoned ponds, the derelict pond bunds themselves, and lagoon fishing.",
 change="A documented destruction followed by a documented, ongoing attempt at repair in the same physical place.",
 candidate_status="evidenced-situation", territory="T12",
 primary_idea="C055-I01", supporting_ideas=["C052-I03", "C100-I02"],
 sources=[
  S("S1","peer-reviewed journal","The impacts of shrimp farming on land-use and carbon storage around Puttalam lagoon, Sri Lanka - Ocean and Coastal Management (ScienceDirect)","https://www.sciencedirect.com/science/article/pii/S0964569115001258","2015","Quantified land-use change: large growth in shrimp-farm area against mangrove decline around Puttalam lagoon.","search-result"),
  S("S2","environmental news","Civil war didn't hurt this Sri Lankan mangrove forest, but shrimp farming might - Mongabay","https://news.mongabay.com/2020/07/civil-war-didnt-hurt-this-sri-lankan-mangrove-forest-but-shrimp-farming-might/","2020-07","Independent reporting on mangrove loss to shrimp farming and on the abandoned ponds.","search-result"),
  S("S3","fishworkers' network","Sri Lanka: revive mangroves degraded by shrimp farms - ICSF","https://icsf.net/newss/sri-lanka-revive-mangroves-degraded-by-shrimp-farms/",None,"Community planting at Anawilundawa with nursery-raised seedlings around abandoned shrimp farms; more than 90 per cent of former ponds abandoned.","search-result")],
 unresolved="Who owns the abandoned ponds, and whether restoration is legally settled or contested. Not established.",
 access="No contact made. Conservation organisations running the planting are an institutional route, but they are also interested parties and the film should not become their promotional material.",
 ethics="Moderate. Former shrimp farmers are part of this story and must not be cast as villains; many were smallholders who lost their investment to disease.")

lead(lead_id="SL-SQ23-005", sq="SQ23", title="Fifty-nine and a half acres",
 subject="Residents of Keppapilavu seeking the release of ancestral land held by the military",
 place="Keppapilavu", district="Mullaitivu", province="Northern",
 situation="Reporting records residents protesting for the release of 59.5 acres of residential land, with 171 acres in total under military control including 111 acres of agricultural land, and families unable to return for more than seventeen years. Reporting also records that officials raised the possibility of releasing 6.5 acres and establishing a district-level committee to decide the remainder, and that 44 of 55 civilian landowners are reported to have accepted alternative allotments in a model village with newly built houses.",
 activity="A long-running roadside protest, the fenced land itself, the model village, and the committee process.",
 change="An active dispute with dated meetings and specific acreages.",
 candidate_status="evidenced-situation", territory="T14",
 primary_idea="C052-I02", supporting_ideas=["C076-I03", "C047-I01"],
 sources=[
  S("S1","news outlet","Keppapilavu residents renew call for release of 171 acres still under military occupation - Tamil Guardian","https://www.tamilguardian.com/index.php/content/keppapilavu-protesters-call-release-171-acres-under-military-occupation",None,"171 acres under military control, comprising 59.5 acres of residential and 111 acres of agricultural land; the protest and its duration.","search-result"),
  S("S2","news outlet","Sri Lanka pledges land release in Mullaitivu - Tamil Guardian","https://www.tamilguardian.com/content/sri-lankan-deputy-defence-minister-announces-plans-release-military-held-lands-mullaitivu",None,"Official statements on release, the possibility of 6.5 acres, and a district-level committee.","search-result"),
  S("S3","academic/NGO","Returning home: land, displacement and the politics of resettlement in post-war Sri Lanka - Researching Internal Displacement","https://researchinginternaldisplacement.org/short_pieces/returning-home-land-displacement-and-the-politics-of-resettlement-in-post-war-sri-lanka/",None,"Scholarly framing of post-war resettlement and land politics, needed to avoid relying on any single partisan outlet.","search-result")],
 unresolved="Every source found so far is partisan on one side or the other. The acreages and the 44-of-55 figure need confirmation from an official record or a neutral monitor before any of them is used.",
 access="No contact made.",
 ethics="Very high. This is an active dispute involving the armed forces, displaced families and a contested post-war history. Participants could face consequences that outlast the film. Filming near military-held land may be unlawful. Sources so far are partisan in both directions.",
 decision="hold",
 hold_reason="Recorded as a real and well-documented situation, but held out of the episode portfolio at this stage. The risk to participants, the legal position on filming military-held land, and the absence of any non-partisan source all have to be resolved by people on the ground before this could responsibly be scheduled. It is kept rather than deleted because the situation is real and because deleting it would hide a decision that should be visible.")

lead(lead_id="SL-SQ03-002", sq="SQ03", title="A disease known by its signs",
 subject="Farming families in the dry zone living with chronic kidney disease of unknown or uncertain aetiology, and the researchers still trying to explain it",
 place="North Central dry zone, including Medawachchiya, Padaviya, Siripura and Horowpathana", district="Anuradhapura and neighbouring districts", province="North Central",
 situation="CKDu among paddy farmers was first reported in 1994 and is endemic in parts of the dry zone. Published prevalence figures in some districts run between about 15 and 23 per cent, associated with farming occupations. The recognised causes of chronic kidney disease, including hypertension, diabetes and glomerulonephritis, are not associated with it. Research has examined drinking water from wells, agrochemical exposure, groundwater chemistry and biomarkers, without an agreed cause.",
 activity="Clinic and dialysis sessions, water collection and household filtration, field work, and the sampling work of researchers.",
 change="A condition that has been recognised for three decades and still has no agreed cause, with research and water-supply interventions continuing.",
 candidate_status="evidenced-situation", territory="T02",
 primary_idea="C020-I01", supporting_ideas=["C080-I03", "C032-I02"],
 sources=[
  S("S1","peer-reviewed journal","Drinking well water and occupational exposure to herbicides is associated with chronic kidney disease in Padavi-Sripura, Sri Lanka - PMC","https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4417209/",None,"Association of well water and herbicide exposure with CKD in Padavi-Sripura.","search-result"),
  S("S2","peer-reviewed journal","Groundwater as a potential cause of chronic kidney disease of unknown etiology in Sri Lanka: a review - Journal of Water and Health","https://iwaponline.com/jwh/article/19/3/393/82216/Groundwater-as-a-potential-cause-of-Chronic-Kidney","2021","Review of groundwater hypotheses; endemic areas including Medawachchiya, Padaviya, Siripura and Horowpathana.","search-result"),
  S("S3","peer-reviewed journal","Chronic kidney disease of unknown etiology in Sri Lanka - PubMed","https://pubmed.ncbi.nlm.nih.gov/27399161/","2016","First reported among paddy farmers in 1994; traditional causes not associated; prevalence figures by district.","search-result"),
  S("S4","peer-reviewed journal","Early identification of patients with CKDu in Anuradhapura district using data science algorithms - PMC","https://pmc.ncbi.nlm.nih.gov/articles/PMC13267252/",None,"Recent work on early identification in the Anuradhapura district.","search-result")],
 unresolved="The cause. That is the point of the story, and it must not be resolved on screen by picking whichever hypothesis films best.",
 access="No contact made. Hospital and ministry permission would be required for any clinical filming, and that is a slow institutional process.",
 ethics="Very high. Serious illness, including in people who are dying. A safeguarding protocol is required. No patient may be filmed in a clinical setting without their own consent, separate from the hospital's. No treatment or cause may be presented as established, and the film must not become a platform for a contested agrochemical claim in either direction.")

lead(lead_id="SL-SQ23-006", sq="SQ23", title="Seventeen hundred and fifty",
 subject="Tea plantation workers and the structure of the wage they were granted",
 place="Up-country tea estates", district="Nuwara Eliya, Badulla, Kandy, Ratnapura and others", province="Central, Uva, Sabaragamuwa",
 situation="Reporting records an agreement signed in January 2026 raising the basic daily wage from 1,350 to 1,550 rupees with a further 200 rupees as a daily attendance allowance, giving 1,750 rupees in total, and records labour advocates warning that attendance-based incentives can still reduce what a worker actually earns. The same reporting notes that the governing party had campaigned on 2,000 rupees, and that floods in December 2025 cut off dozens of estates.",
 activity="Plucking and weighing, the weighing shed, estate housing, union meetings, and the muster that the attendance allowance depends on.",
 change="A very recent, dated wage change whose real effect is disputed and is measurable at the weighing shed.",
 candidate_status="evidenced-situation", territory="T14",
 primary_idea="C098-I01", supporting_ideas=["C052-I01", "C076-I03"],
 sources=[
  S("S1","magazine","An unfair trade: Sri Lanka's Tamil tea workers - The Diplomat","https://thediplomat.com/2026/01/an-unfair-trade-sri-lankas-tamil-tea-workers/","2026-01","The January 2026 agreement raising the basic wage from 1,350 to 1,550 rupees plus a 200-rupee attendance allowance; the warning that attendance-based incentives can reduce earnings; the 2,000-rupee campaign promise; December 2025 floods cutting off estates.","search-result"),
  S("S2","news aggregator","Sri Lanka raises daily wage of plantation workers to Rs. 1,750 - ONLANKA","https://www.onlanka.com/news/sri-lanka-raises-daily-wage-of-plantation-workers-to-rs-1750.html",None,"Independent report of the same wage figure.","search-result"),
  S("S3","NGO","Minimum daily wage raised on Sri Lankan tea plantations - Franciscans International","https://franciscansinternational.org/blog/minimum-daily-wage-raised-on-sri-lankan-tea-plantations/",None,"Civil-society account of the wage change and its limits.","search-result")],
 unresolved="What a worker actually received in a given month after the attendance condition. That is a payslip question and cannot be answered from reporting.",
 access="No contact made. Plantation companies control access to estates, which means the company is a gatekeeper to a story partly about the company.",
 ethics="High. Workers who speak about pay can face consequences from an employer who also controls their housing. Consent must include a clear account of that risk and a genuine option to withdraw or be unidentifiable. This community's history is also routinely told for it rather than by it, which the film should not repeat.")

lead(lead_id="SL-SQ05-001", sq="SQ05", title="Two months on foot to Kataragama",
 subject="Pilgrims walking the Pada Yatra from the north to Kataragama",
 place="From the Jaffna peninsula down the east coast through Okanda to Kataragama", district="Jaffna to Monaragala, via Eastern districts", province="Northern, Eastern, Uva",
 situation="The Pada Yatra is described as the oldest annual foot pilgrimage in Sri Lanka, taking roughly two months and timed to arrive at Kataragama for the festival, with pilgrims gathering in the Jaffna peninsula before setting out. Accounts record that it drew over a thousand pilgrims from Jaffna alone in the 1970s, that it was halted in 1983 after violence against pilgrims, and that it was revived subsequently. Kataragama is venerated by Hindus, Buddhists and Muslims.",
 activity="Walking, cooking and sleeping on the route, river crossings, the jungle stretch toward Okanda, and arrival at the shrine.",
 change="A real, annually recurring journey with a fixed season, a route across the whole island and a history of interruption.",
 candidate_status="evidenced-situation", territory="T04",
 primary_idea="C021-I02", supporting_ideas=["C047-I01", "C095-I01"],
 sources=[
  S("S1","dedicated site","Pada Yatra: foot pilgrimage from Jaffna to Kataragama","https://padayatra.org/",None,"The route, the two-month duration, the May to July timing and the gathering in the Jaffna peninsula.","search-result"),
  S("S2","dedicated site","Pada Yatra or foot pilgrimage to Kataragama in modern times","https://padayatra.org/yatra_history.htm",None,"Over a thousand pilgrims from Jaffna alone in the 1970s; cessation in 1983 after violence against pilgrims; subsequent revival with the Kataragama Devotees Trust.","search-result"),
  S("S3","magazine","Pada Yatra: foot pilgrimage from Jaffna to Kataragama - Serendib","http://serendib.btoptions.lk/article.php?issue=80&id=1861",None,"Independent magazine account of the pilgrimage.","search-result")],
 unresolved="Exact 2027 dates, current participant numbers, and whether the full northern route is walked or only the eastern section. Not established.",
 access="No contact made. The Kataragama Devotees Trust is named in the sources as an organising body and is an appropriate first approach.",
 ethics="A religious practice, not a spectacle. Pilgrims are not a cast. Part of the route passes through protected areas, needing Department of Wildlife Conservation permission, and the walk is physically demanding, which raises real duty-of-care questions for a crew travelling with pilgrims for weeks.")

lead(lead_id="SL-SQ12-001", sq="SQ12", title="Paid to be photographed doing it",
 subject="Stilt fishermen at Koggala and the arrangement by which they are paid by visitors",
 place="Koggala and neighbouring southern coast", district="Galle", province="Southern",
 situation="Reporting and visitor accounts describe the stilt-fishing area at Koggala as a place where fishermen charge for photographs, where some of those on the stilts hire them from actual fishermen, and where the practice functions largely as a cultural performance rather than as active fishing, while some genuine stilt fishing is still said to occur in season.",
 activity="Sitting the stilts at dawn and dusk, the negotiation with visitors, the huts where people wait, and whatever real fishing still happens.",
 change="A livelihood that has shifted from catching fish to being seen catching fish, in the same place and with the same equipment.",
 candidate_status="evidenced-situation", territory="T07",
 primary_idea="C097-I02", supporting_ideas=["C084-I01", "C020-I02"],
 sources=[
  S("S1","newspaper","Stilt fishing in Koggala - The Morning","https://www.themorning.lk/articles/8aaROnFk02ekNXAvd4vJ",None,"Sri Lankan press treatment of stilt fishing at Koggala and its present condition.","search-result"),
  S("S2","travel writing","The stilt fishermen and cave temple of Koggala - Maverick Bird","https://maverickbird.com/outside-india/asia/sri-lanka/the-stilt-fishermen-and-cave-temple-of-koggala/",None,"First-hand account of photograph charging and of people waiting in huts until visitors arrive.","search-result"),
  S("S3","industry body","Experience stilt fishing - Sri Lanka Convention Bureau","https://meetinsrilanka.com/experience-stilt-fishing-be-that-striking-silhouette-in-the-sunset/",None,"Official promotion of stilt fishing as a visitor experience, which is itself evidence of how the practice is now positioned.","search-result")],
 unresolved="Whether anyone at Koggala still fishes from stilts for a catch, and in which months. This decides whether the story has two sides or one.",
 access="No contact made. The arrangement is commercial and open, which makes contact straightforward and makes honesty about the film's subject essential.",
 ethics="The obvious framing, that the fishermen are faking, is unfair and must be refused. They are selling the only thing a visitor wants to buy. Nobody should be filmed in a way that mocks them, and the film must not pretend to show authentic fishing if it is filming a paid pose.")

lead(lead_id="SL-SQ22-002", sq="SQ22", title="Tracing a seed back through the people who kept it",
 subject="Farmers growing and multiplying traditional Sri Lankan rice varieties",
 place="Not established; sources refer to Anuradhapura-district farms and youth-led operations", district="not established", province="not established",
 situation="Traditional varieties including suwandel, kalu heenati, ma wee and dal wee are described as passed down by traditional farmers, with a documented resurgence driven by organic market demand and by younger growers adopting the System of Rice Intensification. Peer-reviewed work exists on element concentrations in traditional varieties grown on an Anuradhapura-district farm, which indicates that at least one identifiable farm is documented in the literature.",
 activity="Seed selection and storage, transplanting, threshing, and the handing on of seed from one grower to another.",
 change="A revival driven by market demand, which raises a real question about who benefits from it.",
 candidate_status="unverified-lead", territory="T13",
 primary_idea="C089-I02", supporting_ideas=["C047-I01", "C100-I02"],
 sources=[
  S("S1","peer-reviewed journal","Concentration and distribution of toxic and essential elements in traditional rice varieties of Sri Lanka grown on an Anuradhapura district farm - PMC","https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11052878/",None,"Existence of a documented Anuradhapura-district farm growing traditional varieties, and analytical work on them.","search-result"),
  S("S2","reference","Traditional rice of Sri Lanka - Wikipedia","https://en.wikipedia.org/wiki/Traditional_rice_of_Sri_Lanka",None,"Names and characteristics of the traditional varieties, for checking spellings and claims.","search-result"),
  S("S3","trade body","Heirloom rice varieties from Sri Lanka - Sri Lanka Export Development Board","https://www.srilankabusiness.com/food-and-beverages/heirloom-rice-from-sri-lanka.html",None,"Official promotion of heirloom varieties for export, evidence of the market driving the revival.","search-result")],
 unresolved="No individual seed-keeping farmer has been identified. Health claims attached to these varieties in trade and lifestyle sources are not established and must not be repeated.",
 access="No contact made.",
 ethics="Nutritional and medical claims are made about these varieties by sellers. The film must not repeat them.")

lead(lead_id="SL-SQ08-002", sq="SQ08", title="You cannot hurry the sun",
 subject="Salt pan workers and the salterns they harvest",
 place="Hambantota, Bundala and Palatupana in the south; Puttalam, Palavi, Kalpitiya and Karaithivu in the west; Elephant Pass and Chemmani in the north", district="Hambantota, Puttalam, Jaffna", province="Southern, North Western, Northern",
 situation="Salt production by solar evaporation of seawater followed by manual harvesting is described as a long-established Sri Lankan industry, with salterns at the locations above and national production of over 100,000 metric tons a year, most of it from Hambantota, Puttalam and Mannar. Lanka Salt Limited, formed in 1996 to manage the Hambantota salterns, is described as the largest producer, meeting about 70 per cent of national needs. Academic work documents the use of convict labour in the Hambantota salterns under British rule.",
 activity="Brine intake and movement between ponds, the crust forming, raking and heaping, loading, and the long intervals in which nothing can be done but wait.",
 change="Not established as a current event. The industry's structure and its colonial labour history are both documented.",
 candidate_status="evidenced-situation", territory="T05",
 primary_idea="C087-I01", supporting_ideas=["C096-I01", "C013-I01"],
 sources=[
  S("S1","peer-reviewed journal","Working the salterns: convict workers in the natural salt pans of Hambantota, in British colonial Sri Lanka - Labor History","https://www.tandfonline.com/doi/abs/10.1080/0023656X.2023.2252768","2023","Use of convict labour in the Hambantota salterns under British rule.","search-result"),
  S("S2","newspaper","Salt production in Sri Lanka and its current state - The Morning","https://www.themorning.lk/articles/IoKrcpsAHSZs2lhtx4ND",None,"Current state of the industry and the saltern locations at Elephant Pass, Chemmani, Puttalam, Palavi, Kalpitiya, Karaithivu, Hambantota, Bundala and Palatupana.","search-result"),
  S("S3","company","Lanka Salt Limited - about","https://lankasalt.lk/index.php/about/",None,"Company formed in 1996 to manage the Hambantota salterns; its share of national supply. A company's own account, recorded as such.","search-result")],
 unresolved="Whether harvesting is still manual at the main salterns or has been mechanised. Sources describe it as largely traditional but are not specific by site or year.",
 access="No contact made. The salterns are company-operated, so the company is the gatekeeper.",
 ethics="Heat exposure and heavy manual work. The colonial convict-labour history is real and should not be used as a cheap parallel to present-day workers.")

out = os.path.join(D, "leads.json")
existing = json.load(open(out))
have = {x["lead_id"] for x in existing}
dups = [x["lead_id"] for x in L if x["lead_id"] in have]
assert not dups, dups
existing.extend(L)
json.dump(existing, open(out, "w"), indent=1, ensure_ascii=False)
print("batch leads:", len(L), "total:", len(existing))
