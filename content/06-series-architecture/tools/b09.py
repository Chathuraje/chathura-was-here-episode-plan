# -*- coding: utf-8 -*-
import json, os
D=os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),"data"); A="2026-09-18"
def S(r,t,ti,u,p,s,c): return {"ref":r,"type":t,"title":ti,"url":u,"published":p,"accessed":A,"supports":s,"confirmed":c}
L=[]
def lead(**k):
    k.setdefault("batch","B09"); k.setdefault("decision","advance"); L.append(k)

lead(lead_id="SL-SQ03-005", sq="SQ03", title="A year after the water went down",
 subject="Households and institutions still recovering from Cyclone Ditwah",
 place="Central and south-central districts worst affected", district="Kandy, Badulla, Nuwara Eliya, Kurunegala, Matale and all 25 districts", province="all",
 situation="Cyclone Ditwah made landfall on the east coast on 28 November 2025, causing flooding and landslides across all 25 districts. Reported figures by mid-December 2025 were 643 deaths and 183 missing, with more than 107,000 homes damaged or destroyed. UN assessments put around 1.8 million people, about 8 per cent of the population, as affected, with more than a million still needing humanitarian assistance a month later, and UNDP analysis described about one fifth of the country as inundated. The World Bank estimated direct physical damage at USD 4.1 billion on 22 December 2025. More than 1,300 schools and six universities were damaged and around 500 schools were being used as shelters. Deaths were concentrated in the central and south-central districts.",
 activity="Rebuilding, a school that was a shelter, the silt line on a wall, and the second wave of rain that undid the first repairs.",
 change="The largest recent disaster in the country, still in recovery, with official figures and named agencies.",
 candidate_status="evidenced-situation", territory="T02",
 primary_idea="C034-I02", supporting_ideas=["C052-I03","C098-I01","C100-I02"],
 sources=[
  S("S1","UN body","Sri Lanka: Cyclone Ditwah situation report 3 - OCHA","https://www.unocha.org/publications/report/sri-lanka/sri-lanka-cyclone-ditwah-situation-report-3-23-december-2025","2025-12-23","Official humanitarian situation report with casualty, displacement and shelter figures.","search-result"),
  S("S2","UN news","Sri Lanka cyclone: more than a million still need aid weeks after Ditwah floods - UN News","https://news.un.org/en/story/2025/12/1166671","2025-12","643 deaths and 183 missing; more than 107,000 homes damaged or destroyed; about 1.8 million affected; more than 1,300 schools and six universities damaged; around 500 schools in use as shelters; concentration of deaths in the central and south-central districts.","search-result"),
  S("S3","development bank","Damage from Cyclone Ditwah in Sri Lanka estimated at $4.1 billion - World Bank","https://www.worldbank.org/en/news/press-release/2025/12/22/damage-from-cyclone-ditwah-in-sri-lanka-estimated-at-4-1-billion","2025-12-22","Direct physical damage estimate of USD 4.1 billion.","search-result"),
  S("S4","UN agency","One-fifth of Sri Lanka inundated by Cyclone Ditwah - UNDP","https://www.undp.org/asia-pacific/press-releases/one-fifth-sri-lanka-inundated-cyclone-ditwah-undp-analysis","2025-12","Satellite-based inundation analysis.","search-result"),
  S("S5","broadcaster","More heavy rain slows Sri Lanka's recovery after deadly cyclone - Al Jazeera","https://www.aljazeera.com/news/2025/12/5/more-heavy-rain-slows-sri-lankas-recovery-after-deadly-cyclone","2025-12-05","Fresh flooding and landslides slowing the return of displaced families.","search-result")],
 unresolved="What recovery looks like now, nine months on. Every figure above is from December 2025 and the current position has not been established.",
 access="No contact made.",
 ethics="Very high. Bereavement is recent and widespread. A film arriving a year later must not re-open losses for effect, and must not film in a shelter in a way that identifies a displaced family. This event also changes several other leads in this catalogue; the tea estates and the hill railway both appear in its damage reports, and those connections are real rather than devised.",
 merged_from=["a separate lead on schools used as shelters after Ditwah"],
 merge_note="A separate lead on schools serving as shelters was folded in here. It is the same event and the same sources, and splitting it would have produced two episodes competing for the same families.")

lead(lead_id="SL-SQ21-007", sq="SQ21", title="The house that used to have a garden in front of it",
 subject="Coastal households losing land to erosion, and the argument about what is causing it",
 place="Named affected stretches including the Negombo-Pitipana belt at Morawala, Udappuwa, Calido Beach at Kalutara, and the Mount Lavinia to Ratmalana coast; high-erosion sites at Vankalai, Naruvilikulam and Kondachchikudah", district="Gampaha, Puttalam, Kalutara, Colombo, Mannar, Trincomalee", province="Western, North Western, Northern, Eastern",
 situation="Published reporting records severe coastal erosion affecting beaches, infrastructure and livelihoods, with over 30 acres of land loss reported in the Kalutara area and maximum erosion rates of about 4.7 to 5.3 metres a year at named high-risk sites. Reporting records households along named coastal belts left unsafe after houses and property were lost to the sea, and families relocating in Trincomalee. Sea sand dredging is argued in reporting and by environmental groups to be accelerating the loss, alongside climate-driven causes; peer-reviewed work assesses physical and social vulnerability along the Kalutara coastal belt.",
 activity="A shoreline at high tide, a sea wall, a house with its foundation exposed, and a family deciding whether to move.",
 change="Measured, continuing loss with a contested cause and specific named places.",
 candidate_status="evidenced-situation", territory="T13",
 primary_idea="C066-I03", supporting_ideas=["C080-I03","C052-I01","C047-I01"],
 sources=[
  S("S1","newspaper","Coastal erosion: serious impact on Sri Lanka's coastline - The Morning","https://www.themorning.lk/articles/72o2iFFZkiA1NOoDcOZH",None,"Severity of erosion; named affected coastal belts; households left unsafe after losing houses and property.","search-result"),
  S("S2","peer-reviewed research","Physical and social vulnerability to coastal erosion: an assessment of the Kalutara coastal belt, Sri Lanka","https://www.researchgate.net/publication/366070787_Physical_and_social_vulnerability_to_coastal_erosion_An_assessment_of_Kalutara_Coastal_Belt_Sri_Lanka","2022","Academic assessment of erosion and vulnerability along the Kalutara coast.","search-result"),
  S("S3","environmental organisation","Sea sand dredging and coastal erosion: who is accelerating Sri Lanka's disappearing beaches - The Pearl Protectors","https://pearlprotectors.org/sea-sand-dredging-and-coastal-erosion-who-is-accelerating-sri-lankas-disappearing-beaches/",None,"The argument that sea sand dredging is accelerating erosion. An advocacy source, recorded as an argument rather than a finding.","search-result"),
  S("S4","journalism network","Sand dredging project on Sri Lanka's coast leads to erosion, livelihood loss - Earth Journalism Network","https://earthjournalism.net/stories/sand-dredging-project-on-sri-lankas-coast-leads-to-erosion-livelihood-loss",None,"Reported link between a dredging project and erosion and livelihood loss.","search-result")],
 unresolved="Attribution. Natural longshore processes, dredging, structures and sea-level rise are all in play and the sources disagree. The film must not settle this.",
 access="No contact made. The Coast Conservation Department is the authority and is also a party to the dispute.",
 ethics="Moderate to high. People losing a house are under real stress and may be in a compensation dispute. Nothing should be filmed that weakens a claim.")

lead(lead_id="SL-SQ08-005", sq="SQ08", title="Told your house is not safe",
 subject="Families living on land classified as high landslide risk, and the resettlement programme meant to move them",
 place="Fourteen districts identified as landslide-prone, with Badulla the highest risk", district="Badulla, Nuwara Eliya, Kandy, Matale, Kegalle, Ratnapura, Kalutara, Galle, Matara, Hambantota, Kurunegala, Monaragala, Gampaha, Colombo", province="multiple",
 situation="The National Building Research Organisation is reported as having identified 12,126 families living in high landslide-risk areas and recommended their resettlement, and as having identified 14,184 landslide-prone locations across fourteen districts, with Badulla the highest-risk district at 2,959 rural homes and estate buildings classified high risk. A home-owner-driven resettlement programme has been run through the disaster management ministry, under which about 4,700 families are reported to have been resettled. The organisation reports difficulty finding safe land for relocation as land becomes scarce. A landslide risk profile project ran from 2016 to 2020 in ten districts including Badulla and Kegalle, developing a database intended to deliver early warning to the last mile.",
 activity="A hazard assessment visit, a warning being issued, a house with a crack in it, and a family that has not moved.",
 change="A live programme with a documented gap between the number recommended for relocation and the number relocated.",
 candidate_status="evidenced-situation", territory="T05",
 primary_idea="C076-I02", supporting_ideas=["C098-I01","C052-I02","C102-I01"],
 sources=[
  S("S1","state body","Resettlement programme - National Building Research Organisation","https://www.nbro.gov.lk/index.php?option=com_content&view=article&id=317:resettlement-program&catid=2&Itemid=440&lang=en",None,"The 12,126 families identified for resettlement, the home-owner-driven approach, the roughly 4,700 families resettled, and the difficulty of finding safe land.","search-result"),
  S("S2","news","Sri Lanka: 14K+ landslide-prone spots identified; Kadugannawa at high risk - Sri Lanka Brief","https://srilankabrief.org/sri-lanka-14k-landslide-prone-spots-identified-kadugannawa-at-high-risk/",None,"14,184 landslide-prone locations across fourteen named districts; Badulla as the highest-risk district with 2,959 high-risk homes and estate buildings.","search-result"),
  S("S3","state body","Landslide risk profile development - National Building Research Organisation","https://nbri.gov.lk/index.php?option=com_content&view=article&id=202%3Alandslide-risk-profile-development&catid=2&Itemid=190&lang=en",None,"The 2016-2020 project in ten districts including Badulla and Kegalle and the last-mile early warning intention.","search-result"),
  S("S4","state body","Landslide early warning issued - National Building Research Organisation","https://www.nbro.gov.lk/index.php?option=com_content&view=article&id=436:landslide-early-warning-issued&catid=8&Itemid=190&lang=en",None,"The form and mechanism of a public landslide early warning.","search-result")],
 unresolved="Why families who are offered relocation do not take it. The sources give the numbers but not the reasons, and the reasons are the story.",
 access="No contact made. The organisation is a state body and reachable; the families are not reachable through it.",
 ethics="High. A family that stays on risky land may have no alternative, and must not be filmed as though they were being reckless. Identifying a household as unsafe on film could affect its property and its insurance.")

lead(lead_id="SL-SQ22-008", sq="SQ22", title="Villages with a water level over them",
 subject="People displaced by the Mahaweli reservoirs, and what stands in place of the villages",
 place="The Kotmale and Victoria reservoir areas and the resettlement areas people were sent to", district="Nuwara Eliya, Kandy and the dry-zone resettlement districts", province="Central and others",
 situation="Under the accelerated Mahaweli programme from 1977, the Victoria, Kotmale, Randenigala and Rantembe dams were built within a compressed period. Published accounts record approximately 8,000 families evicted from the Victoria reservoir area and about 3,200 from Kotmale, with accounts of inadequate compensation or land, and name the villages submerged at Kotmale, including Thispane, Morape, Pusulpitiya, Mawela, Maswela, Kadadora and others. Buddhist temples were submerged, and the Mahaweli Maha Seya was built as a memorial to the flooded shrines. Peer-reviewed work has studied long-term perceptions of people affected by the Kotmale dam.",
 activity="The reservoir at low water, the memorial, and the resettlement colonies where people were sent.",
 change="Not an event. The change is complete and the people who remember it are ageing, which puts a real clock on the story.",
 candidate_status="evidenced-situation", territory="T13",
 primary_idea="C047-I01", supporting_ideas=["C100-I02","C089-I02","C001-I01"],
 sources=[
  S("S1","peer-reviewed research","Long-term perceptions of project-affected persons: a case study of the Kotmale Dam in Sri Lanka","https://www.researchgate.net/publication/262864841_Long-term_perceptions_of_project-affected_persons_A_case_study_of_the_Kotmale_Dam_in_Sri_Lanka",None,"Academic study of how people displaced by the Kotmale dam assess the change decades later.","search-result"),
  S("S2","policy organisation","Lessons learned from communities displaced by the Mahaweli multipurpose development project - Centre for Poverty Analysis","https://v1.cepa.lk/content_images/publications/documents/752-S-Werellagama-Lessons%20Learned%20From%20Communities%20Displaced%20By%20the%20Mahaweli%20Multipurpose%20Dev.pdf",None,"Independent analysis of displacement and resettlement outcomes.","search-result"),
  S("S3","heritage site","Kotmale Reservoir - AmazingLanka","https://amazinglanka.com/wp/kothmale-reservoir/",None,"The named submerged villages, the submerged temples and the Mahaweli Maha Seya built as a memorial.","search-result")],
 unresolved="How many of the displaced are still alive and locatable, and where they were sent. The resettlement areas are scattered and no register was found.",
 access="No contact made. The Mahaweli Authority holds the records.",
 ethics="High. This is a grievance that was never fully settled and raising it can revive a compensation claim that the film cannot resolve. Nobody should be encouraged to narrate a loss for which the film can offer nothing.")

lead(lead_id="SL-SQ03-006", sq="SQ03", title="Two hours between the bite and the antivenom",
 subject="Snakebite patients, rural primary hospitals and the researchers working on treatment and diagnosis",
 place="Rural primary hospitals; research cohorts in the Anuradhapura and Kurunegala districts", district="multiple rural districts", province="multiple",
 situation="Peer-reviewed research records over 40,000 hospital admissions for snakebite annually in Sri Lanka, with most patients first presenting to small rural primary hospitals. Research records that most patients reach a first hospital within an hour of being bitten but that a further two hours typically pass before the first dose of antivenom, and identifies the absence of geographically specific antivenom, with envenoming by the hump-nosed pit viper lacking an effective antivenom. Other studies examine why patients seek or forgo allopathic treatment after a bite, and a cluster randomised trial has tested a brief educational intervention on guideline compliance in rural hospitals.",
 activity="A rural hospital ward at night, the identification problem, the research teams collecting data, and the fields where bites happen.",
 change="Active research including antivenom trials, against a measured treatment delay.",
 candidate_status="evidenced-situation", territory="T02",
 primary_idea="C020-I01", supporting_ideas=["C076-I03","C089-I01","C096-I02"],
 sources=[
  S("S1","peer-reviewed journal","Time delays in treatment of snakebite patients in rural Sri Lanka and the need for rapid diagnostic tests - PLOS Neglected Tropical Diseases","https://journals.plos.org/plosntds/article?id=10.1371%2Fjournal.pntd.0008914","2020","Most patients present within an hour but a further two hours pass before the first antivenom dose; the case for rapid diagnostic tests.","search-result"),
  S("S2","peer-reviewed journal","Determinants of seeking or foregoing allopathic treatment after snakebite: a population-based study from rural Sri Lanka - Transactions of the Royal Society of Tropical Medicine and Hygiene","https://academic.oup.com/trstmh/article/119/5/550/7932096","2025","Why rural patients do or do not seek hospital treatment after a bite.","search-result"),
  S("S3","peer-reviewed journal","A prospective cohort study of the effectiveness of the primary hospital management of all snakebites in Kurunegala district - PMC","https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5578683/",None,"The role of primary hospitals in snakebite management and the scale of admissions.","search-result"),
  S("S4","peer-reviewed journal","Antivenom for snakebite envenoming in Sri Lanka: the need for geographically specific antivenom and improved efficacy","https://www.researchgate.net/publication/235775672_Antivenom_for_snakebite_envenoming_in_Sri_Lanka_The_need_for_geographically_specific_antivenom_and_improved_efficacy",None,"The absence of geographically specific antivenom and the hump-nosed pit viper problem.","search-result")],
 unresolved="Whether the hump-nosed antivenom trials have reported, and what the current national guideline says. Not established.",
 access="No contact made. Hospital filming requires ministry approval and the patients are in an emergency.",
 ethics="High. A patient being treated for envenoming cannot meaningfully consent at the time. Traditional treatment is part of the picture and must be reported as what people do, without the film either endorsing it or ridiculing it, given that delay is measurably dangerous.")

lead(lead_id="SL-SQ23-009", sq="SQ23", title="The land under the settlement",
 subject="Families moved from Colombo's underserved settlements into high-rise housing, and the land they left",
 place="Colombo's underserved settlements and the relocation housing complexes", district="Colombo", province="Western",
 situation="A survey is reported to have identified 68,812 families across 1,499 underserved settlements lacking adequate water, electricity and sanitation, with a programme planning 50,000 units to relocate them. Published research records that relocation began by demolishing settlements on the most valuable land, that families were offered a standard two-bedroom unit in any available complex regardless of their previous situation or requests, and that the programme's relocation practice did not fully comply with national involuntary resettlement guidelines. The stated objective included freeing land for commercial and mixed development. Reporting in 2026 records residents of a Colombo housing complex protesting about its condition.",
 activity="A flat in a tower, the block's shared spaces, the ground where a settlement stood, and a residents' meeting.",
 change="A programme that has moved a large number of people, with a live dispute about the conditions they were moved into.",
 candidate_status="evidenced-situation", territory="T14",
 primary_idea="C052-I01", supporting_ideas=["C084-I01","C076-I03","C081-I03"],
 sources=[
  S("S1","peer-reviewed journal","Public housing in postwar Colombo's urban regeneration: pathology of housing discourse - Housing Policy Debate","https://www.tandfonline.com/doi/full/10.1080/10511482.2026.2624022","2026","Analysis of the relocation programme, the standard unit offered regardless of prior circumstances, and non-compliance with national involuntary resettlement guidelines.","search-result"),
  S("S2","peer-reviewed journal","Discourse of military-assisted urban regeneration in Colombo - Real Estate","https://doi.org/10.3390/realestate2030011",None,"The programme's institutional structure and the displacement of underserved communities.","search-result"),
  S("S3","state agency","Urban Regeneration Programme - Urban Development Authority","https://www.uda.gov.lk/urban-regeneration-programme.html",None,"The official programme description, the survey figures and the stated objective of freeing land for development.","search-result"),
  S("S4","newspaper","High life in a high-rise in Colombo - The Sunday Times","https://www.sundaytimes.lk/250504/plus/high-life-in-a-high-rise-in-colombo-596739.html","2025-05-04","Reporting on life inside the relocation high-rises.","search-result")],
 unresolved="What happened to the vacated land in each case. That is checkable in land records and has not been checked.",
 access="No contact made. Residents' committees in the complexes are the appropriate route rather than the authority.",
 ethics="High. Residents in state housing can be vulnerable to retaliation over tenancy. The word used for where they lived is itself contested and the film should use what residents use.")

out=os.path.join(D,"leads.json"); ex=json.load(open(out)); have={x["lead_id"] for x in ex}
d=[x["lead_id"] for x in L if x["lead_id"] in have]; assert not d,d
ex.extend(L); json.dump(ex,open(out,"w"),indent=1,ensure_ascii=False); print("batch:",len(L),"total:",len(ex))
