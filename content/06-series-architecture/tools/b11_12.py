# -*- coding: utf-8 -*-
import os as _os, sys as _sys; _sys.path.insert(0, _os.path.dirname(_os.path.abspath(__file__)))
import _seedguard  # noqa: E402,F401  -- one-time seed; refuses to run. See _seedguard.py.
import json, os
D=os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),"data"); A="2026-09-18"
def S(r,t,ti,u,p,s,c): return {"ref":r,"type":t,"title":ti,"url":u,"published":p,"accessed":A,"supports":s,"confirmed":c}
L=[]
def lead(**k):
    k.setdefault("decision","advance"); L.append(k)

# ---------------- B11 ----------------
lead(batch="B11", lead_id="SL-SQ01-003", sq="SQ01", title="The slow way between two towns",
 subject="People using and maintaining the Hamilton canal and the older Dutch canal system",
 place="The canal from the Kelani river to Negombo, through the Muthurajawela wetland", district="Colombo, Gampaha", province="Western",
 situation="The waterway, known locally as the Dutch canal, runs about 14.5 km in the Negombo section of a longer system reaching Puttalam and Colombo. Dutch works extended an older canal as far as Negombo, recorded by 1706; the British-built Hamilton canal from the Kelani river to Negombo was completed in 1802, named after a revenue agent, and was built partly to drain the Muthurajawela wetland. Flat-bottomed padda boats were the traditional cargo craft. A restoration effort was launched in 2012 by the Sri Lanka Land Reclamation and Development Corporation with Japanese funding, and stretches now carry small boat tours alongside fishing.",
 activity="A boat moving at walking pace beside a main road, fishing in the canal, and the wetland it drains.",
 change="Not a current event. The material is a 200-year-old piece of infrastructure still in use for something other than what it was built for.",
 candidate_status="evidenced-situation", territory="T01",
 primary_idea="C008-I01", supporting_ideas=["C013-I01","C014-I02","C047-I01"],
 sources=[
  S("S1","heritage site","A ride through the historic Hamilton canal - AmazingLanka","https://amazinglanka.com/wp/hamilton-canal/",None,"The Dutch extension recorded by 1706; the British canal completed in 1802 and named after a revenue agent; two-way boat traffic; the padda boats.","search-result"),
  S("S2","magazine","The Hamilton canal: a past and future waterway - Explore Sri Lanka","https://exploresrilanka.lk/the-hamilton-canal-a-past-and-future-waterway/",None,"The 2012 restoration by the Sri Lanka Land Reclamation and Development Corporation with Japanese funding, and the canal's present uses.","search-result")],
 unresolved="Whether any cargo still moves on the canal, and who lives on its banks. The sources are heritage and tourism accounts and none describes present-day users.",
 access="No contact made.",
 ethics="Low. Muthurajawela is a protected wetland with its own access rules.")

lead(batch="B11", lead_id="SL-SQ01-004", sq="SQ01", title="Counting a flock one bird at a time",
 subject="Bird ringers and counters working the migratory season in the southern wetlands",
 place="Bundala National Park and Kumana National Park", district="Hambantota and Ampara", province="Southern and Eastern",
 situation="Bundala's lagoons became Sri Lanka's first Ramsar site in 1990 and the park is described as an internationally important wintering ground for migratory water birds; Kumana was designated a Ramsar wetland on 29 October 2010. The National Bird Ringing Programme was launched at Bundala in 2005 by the Department of Wildlife Conservation with the Field Ornithology Group of Sri Lanka; published accounts describe ringing twice in a migratory season, in December and February, with around 150 birds of various species ringed at a session. The migratory period runs roughly September to March, and the Field Ornithology Group has run a December bird count since 2008.",
 activity="Mist netting and ringing at dawn, the count itself, and the lagoons filling and emptying with the season.",
 change="A fixed seasonal calendar with dated sessions, and a measurable record built one bird at a time over twenty years.",
 candidate_status="evidenced-situation", territory="T01",
 primary_idea="C003-I01", supporting_ideas=["C013-I01","C009-I01","C089-I02"],
 sources=[
  S("S1","reference","Bundala National Park - Wikipedia","https://en.wikipedia.org/wiki/Bundala_National_Park",None,"First Ramsar site in Sri Lanka in 1990; importance as a wintering ground; the National Bird Ringing Programme launched there in 2005 with the Department of Wildlife Conservation and the Field Ornithology Group; December and February ringing with around 150 birds at a session.","search-result"),
  S("S2","reference","Kumana National Park - Wikipedia","https://en.wikipedia.org/wiki/Kumana_National_Park",None,"Ramsar designation on 29 October 2010 and the park's importance for migratory waterfowl.","search-result"),
  S("S3","conservation union","Guide to Bundala: a guide to the biodiversity of Bundala National Park, a Ramsar wetland - IUCN","https://iucn.org/resources/publication/guide-bundala-guide-biodiversity-bundala-national-park-ramsar-wetland-sri",None,"Authoritative biodiversity guide to the site.","search-result"),
  S("S4","reference","Field Ornithology Group of Sri Lanka - Wikipedia","https://en.wikipedia.org/wiki/Field_Ornithology_Group_of_Sri_Lanka",None,"The group's December bird count run since 2008.","search-result")],
 unresolved="Whether a ringing session falls within a filming window, and what the twenty-year data actually shows about numbers. Not established.",
 access="No contact made. The Department of Wildlife Conservation and the Field Ornithology Group would both have to agree.",
 ethics="Moderate. Handling wild birds is licensed work and a camera must not add stress or delay to a bird in the hand.")

lead(batch="B11", lead_id="SL-SQ05-002", sq="SQ05", title="Living inside a designation",
 subject="Families who live within the walls of Galle Fort, and the property market around them",
 place="Galle Fort", district="Galle", province="Southern",
 situation="Galle Fort became a UNESCO World Heritage Site in 1988. Published accounts describe 272 families living within the 52-hectare fort. Property material describes heritage houses inside the fort as scarce and priced for international buyers, serving as private retreats or hospitality businesses. No source found establishes how many resident families have sold and left, or what heritage rules actually require of a resident owner.",
 activity="Not established beyond the ordinary life of a walled town that is also a destination.",
 change="Not established. The premise that resident families are being displaced by value is plausible and is not evidenced by anything found.",
 candidate_status="unverified-lead", territory="T04",
 primary_idea="C100-I01", supporting_ideas=["C097-I02","C052-I01","C039-I01"],
 sources=[
  S("S1","property analysis","How much does a luxury Galle Fort villa cost? A real estate breakdown for international buyers - CeylonLanka","https://www.ceylonlanka.info/2026/07/luxury-galle-fort-villa-cost-real-estate-breakdown.html","2026-07","Fort property positioned for international buyers as retreat or hospitality business; the scarcity of genuine heritage houses. A commercial property source and no substitute for records.","search-result")],
 unresolved="Almost everything, including the 272-family figure, its date, and whether any conservation authority tracks resident ownership. Only one usable source was found and it is a property marketing piece. **This lead must not be developed further on this evidence.**",
 access="No contact made.",
 ethics="Moderate. A story about property values in a place where people live can affect those values. Residents' financial positions are private.")

lead(batch="B11", lead_id="SL-SQ08-006", sq="SQ08", title="Judging the heat by eye",
 subject="Village blacksmiths making and repairing tools",
 place="Not established; sources name Waikkal for traditional iron work and the Kandy region for knives", district="Gampaha, Kandy and elsewhere", province="Western and Central",
 situation="Published accounts describe an established Sri Lankan metalworking tradition, with blacksmiths and foundry workers making everyday utensils, images and tools, and record historic iron smelting and steel tempering in villages near Balangoda, in southern districts and at Kandy. Waikkal is named as known for traditional iron work, and simple knives with wooden or horn handles are described as common in the Kandy region. No working smith has been identified.",
 activity="Not established. Forge work would be highly filmable if a working smith were located.",
 change="None established.",
 candidate_status="unverified-lead", territory="T05",
 primary_idea="C087-I03", supporting_ideas=["C073-I03","C065-I01","C096-I01"],
 sources=[
  S("S1","encyclopaedia entry","Brassware and metalware of Sri Lanka - Asia InCH","https://asiainch.org/craft/brassware-metalware/",None,"The metalworking tradition, the blacksmith and foundry roles, the historic smelting and tempering centres, and the commonness of simple knives in the Kandy region.","search-result"),
  S("S2","academic journal","Crucible steelmaking in Sri Lanka - Historical Metallurgy","https://www.hmsjournal.org/index.php/home/article/view/303",None,"Scholarly record of historic crucible steelmaking, for separating documented history from craft-tourism claims.","search-result"),
  S("S3","reference","Waikkal - Wikipedia","https://en.wikipedia.org/wiki/Waikkal",None,"Waikkal as known for tiles and traditional iron work.","search-result")],
 unresolved="Whether any village smith still works to order for farmers rather than for visitors. Nothing found.",
 access="No contact made.",
 ethics="Low. Forge safety for a crew.")

# ---------------- B12 ----------------
lead(batch="B12", lead_id="SL-SQ19-003", sq="SQ19", title="A billion dollars and the pellets still coming ashore",
 subject="Coastal fishing communities affected by the X-Press Pearl disaster, and the compensation ordered for it",
 place="The west coast affected by the 2021 sinking and the fishing ban", district="Colombo, Gampaha, Kalutara, Puttalam", province="Western and North Western",
 situation="On 24 July 2025 the Supreme Court ordered the ship's owners and operators to pay USD 1 billion in compensation, with a first instalment of USD 250 million ordered by 23 September 2025. The casualty released an estimated 75 billion plastic pellets, described as the world's worst marine plastic spill, and reported wildlife deaths in the following weeks included 417 sea turtles, 48 dolphins and eight whales. A year-long fishing ban along the affected coast affected the livelihoods of thousands. Cleanup of pellets continues, with buried pellets still washing ashore.",
 activity="Beach cleaning that is still going on, the fishing that resumed, and the compensation process.",
 change="A landmark judgment with dated payment obligations, against a physical contamination that has not ended.",
 candidate_status="evidenced-situation", territory="T12",
 primary_idea="C055-I01", supporting_ideas=["C052-I02","C027-I01","C100-I02"],
 sources=[
  S("S1","environmental news","Sri Lanka Supreme Court orders $1 bn payment in X-Press Pearl marine disaster - Mongabay","https://news.mongabay.com/2025/07/sri-lanka-supreme-court-orders-1-bn-payment-in-x-press-pearl-marine-disaster/","2025-07","The 24 July 2025 order; the USD 1 billion sum; the first instalment of USD 250 million due by 23 September 2025; the estimated 75 billion pellets; reported wildlife deaths; the year-long fishing ban; continuing cleanup.","search-result"),
  S("S2","law firm analysis","Supreme Court of Sri Lanka assigns liability for MV X-Press Pearl disaster - Reed Smith","https://www.reedsmith.com/en/perspectives/2025/08/supreme-court-of-sri-lanka-assigns-liability-mv-x-press-pearl-disaster","2025-08","Legal analysis of how liability was assigned and what the order requires.","search-result"),
  S("S3","journalism centre","Sri Lankan Supreme Court orders $1bn compensation over X-Press Pearl disaster - Pulitzer Center","https://pulitzercenter.org/stories/sri-lankan-supreme-court-orders-1-bn-compensation-over-x-press-pearl-disaster","2025","Independent reporting on the ruling and the affected communities.","search-result"),
  S("S4","research institution","X-Press Pearl spill fact sheet - Woods Hole Oceanographic Institution","https://www.whoi.edu/wp-content/uploads/2021/06/Fact-Sheet-XPressPearlSpill24Jun.pdf","2021-06-24","Contemporaneous scientific fact sheet on the spill, useful for separating measured effects from later claims.","search-result")],
 unresolved="Whether the first instalment was actually paid, and whether any of it has reached a fisher. That is the whole question and it has not been answered.",
 access="No contact made. Fisher co-operative societies on the affected coast are the appropriate route.",
 ethics="Moderate to high. Compensation claims are live; nothing filmed should weaken a claim. Fishers have been interviewed repeatedly since 2021 and may reasonably be tired of it.")

lead(batch="B12", lead_id="SL-SQ24-005", sq="SQ24", title="A decision taken quickly and paid for slowly",
 subject="Paddy farmers recovering from the 2021 agrochemical ban",
 place="Paddy-growing districts", district="multiple", province="multiple",
 situation="In April 2021 the government banned synthetic agrochemicals including chemical fertilisers, and lifted the ban in November 2021. A 2023 survey is reported as finding an average paddy yield loss of 53 per cent, with 62 per cent of farmers reporting more than 50 per cent loss, and a 32 per cent post-ban decline in rice yields against the previous nine years while the cultivated area was unchanged. Published analysis records that domestic biomass could not supply the organic fertiliser required. Reporting four years on describes output still below the pre-ban level, fertiliser costing about three times more than before, and farmers carrying debt from the period.",
 activity="A field being prepared, the shop where fertiliser is bought, and the debt paperwork.",
 change="A completed policy reversal whose effects are still being carried, with measured figures on both sides.",
 candidate_status="evidenced-situation", territory="T14",
 primary_idea="C021-I01", supporting_ideas=["C080-I03","C096-I01","C076-I03"],
 sources=[
  S("S1","peer-reviewed journal","On the feasibility of an agricultural revolution: Sri Lanka's ban of chemical fertilizers in 2021 - Food Security","https://link.springer.com/article/10.1007/s12571-025-01528-6","2025","Peer-reviewed analysis of the ban, the yield outcomes and the biomass constraint.","search-result"),
  S("S2","peer-reviewed journal","The transition that wasn't: why Sri Lanka's organic farming approach failed - Sustainability: Science, Practice and Policy","https://www.tandfonline.com/doi/full/10.1080/15487733.2026.2629055","2026","Analysis of why the transition failed, including the decision process.","search-result"),
  S("S3","research institute","What Sri Lanka's ban of chemical fertilizers in 2021 can teach the world - International Water Management Institute","https://www.iwmi.org/blogs/challenges-and-opportunities-for-an-agro-ecological-transformation/",None,"The 2023 survey figures on yield loss and the share of farmers affected.","search-result"),
  S("S4","news agency","Four years after Sri Lanka's failed organic push, rice farmers struggle to rebuild","https://uk.marketscreener.com/news/four-years-after-sri-lanka-s-failed-organic-push-rice-farmers-struggle-to-rebuild-ce7d5edbd88df422",None,"Output still below pre-ban levels; fertiliser costing about three times more; farmers in debt.","search-result")],
 unresolved="Whether any compensation scheme reached farmers, and what a household's debt actually looks like now. Not established.",
 access="No contact made. Farmer organisations are the route.",
 ethics="High. This is a politically charged failure and a film can easily become a partisan argument. Farmers' debts are private, and the organic-versus-chemical argument must not be settled on the back of one household's difficulty.")

lead(batch="B12", lead_id="SL-SQ07-003", sq="SQ07", title="Trained here, working somewhere else",
 subject="Doctors and nurses leaving the public health service, and the colleagues who stay",
 place="Public hospitals across the country", district="multiple", province="multiple",
 situation="Figures attributed to the Health Minister at the 78th World Health Assembly record 4,642 health workers leaving between 2022 and 2025, including 726 specialist doctors, 1,116 medical officers and 2,800 nurses. Reporting records destinations shifting from the Middle East to the UK, Canada and Australia, an annual flow of doctors leaving for compulsory overseas training and not returning, and university medical departments at risk from the loss of senior staff. Analysis records that skilled workers accounted for 76.5 per cent of departures for foreign employment in the first nine months of 2025, up from 66 per cent in 2022. Reporting also links the shortage to reduced emergency response capacity during the December 2025 floods.",
 activity="A ward running short-staffed, a departure, and the training that produced both.",
 change="A measured and worsening flow with official figures and a named recent consequence.",
 candidate_status="evidenced-situation", territory="T05",
 primary_idea="C076-I01", supporting_ideas=["C102-I01","C098-I01","C030-I01"],
 sources=[
  S("S1","peer-reviewed journal","The exodus and its toll: Sri Lanka's economic crisis and the migration of doctors - PubMed","https://pubmed.ncbi.nlm.nih.gov/40671185/","2025","Peer-reviewed account of doctor migration following the economic crisis.","search-result"),
  S("S2","policy organisation","Crisis-driven migration or something more? Decent work deficits and the migration of health workers from Sri Lanka - Centre for Poverty Analysis","https://www.cepa.lk/blog/crisis-driven-migration-or-something-more-decent-work-deficits-and-the-migration-of-health-workers-from-sri-lanka/",None,"Analysis arguing that working conditions, not only the crisis, drive the departures.","search-result"),
  S("S3","newspaper","Addressing brain drain in the health sector - The Morning","https://www.themorning.lk/articles/p3NzzsaWoDm2jC7lzz6E",None,"The 2022-2025 figures by category, destination shifts and the effect on medical faculties.","search-result"),
  S("S4","news service","As rich countries poach their medical professionals, Sri Lanka's health system struggles to help flood victims - IDN","https://indepthnews.net/as-rich-countries-poach-their-medical-professionals-sri-lankas-health-system-struggles-to-help-flood-victims/",None,"The link between staff shortages and the capacity to respond to the December 2025 floods.","search-result")],
 unresolved="The 4,642 figure is reported from a ministerial statement and the underlying dataset has not been seen. The share who return later is not established.",
 access="No contact made. Hospital filming needs ministry approval; professional associations are a separate and more open route.",
 ethics="High. A doctor who says publicly that they intend to leave can face consequences in a public service. Nobody who stays should be filmed as a moral example, and nobody who leaves should be filmed as a defector.")

lead(batch="B12", lead_id="SL-SQ10-008", sq="SQ10", title="Five grades in one room",
 subject="Teachers and children in very small rural schools, and the plan to reorganise them",
 place="Small rural and remote primary schools", district="multiple", province="multiple",
 situation="Reporting records 1,471 schools with fewer than 50 students, mostly rural and remote primary schools teaching grades 1 to 5, and allegations that around 100 such schools are at risk of permanent closure, alongside a Ministry of Education statement that no decision to close any school had been made. Budget 2025 allocated 500 million rupees to review the school system and prepare a national relocation plan, against a stated policy of a primary school within a 3 km radius of a child's home or a parent's workplace. Reporting also describes schools with only 10 to 20 pupils in difficult rural areas alongside classrooms of 50 to 60 elsewhere.",
 activity="A school day with a handful of children, the teacher moving between grades, and the journey some children make to get there.",
 change="A live policy review with money attached and a contested claim about closures.",
 candidate_status="evidenced-situation", territory="T06",
 primary_idea="C096-I02", supporting_ideas=["C085-I01","C013-I01","C001-I02"],
 sources=[
  S("S1","newspaper","Education sector reforms: over 1,400 schools have fewer than 50 students - The Morning","https://www.themorning.lk/articles/hVGc9mBT2Q8p9FCGjJBW",None,"1,471 schools with fewer than 50 students; the allegation about 100 at risk of closure; the ministry's denial that any closure decision has been made; the 500 million rupee allocation and the 3 km policy.","search-result"),
  S("S2","news agency","One third of schools at risk of closure or merger - AsiaNews","https://www.asianews.it/en/south-asia/sri-lanka/one-third-of-schools-at-risk-of-closure-or-merger",None,"Independent report of the scale of the reorganisation question.","search-result"),
  S("S3","government ministry","Ministry of Education 2025","https://moe.gov.lk/en/2025/",None,"The ministry's own published material for the year, for checking the policy position directly.","search-result")],
 unresolved="Whether any school has actually closed. The reporting and the ministry disagree, and that disagreement has not been resolved.",
 access="No contact made. Zonal education offices and principals are the route, and ministry approval is needed.",
 ethics="Very high. The subjects include children who cannot consent for themselves. A school must not be identified as failing, and no child should be shown in a way that marks them as coming from a poor school.")

lead(batch="B12", lead_id="SL-SQ07-004", sq="SQ07", title="Three in the morning, every morning",
 subject="Rubber tappers and smallholders as yields and the workforce both fall",
 place="Rubber-growing areas", district="Kegalle, Ratnapura, Kalutara, Monaragala and others", province="Sabaragamuwa, Western, Uva",
 situation="Reporting records productivity in major rubber plantation companies falling by around half in 2025, with yields of about 608 to 659 kg per hectare against 1,235 to 1,380 in 2020, against rising wage and agrochemical costs without matching price increases. Reporting also records tappers leaving the industry over inadequate wages and a lack of social recognition, and a long-term fall in national production from about 130,000 tonnes in 2002 to around 70,000 tonnes.",
 activity="Pre-dawn tapping, the cup collection round, the smoke house, and the trees that are not being tapped.",
 change="A measured collapse in yield within five years, with a documented labour cause.",
 candidate_status="evidenced-situation", territory="T05",
 primary_idea="C003-I02", supporting_ideas=["C084-I01","C077-I03","C080-I03"],
 sources=[
  S("S1","newspaper","What ails Sri Lanka's rubber industry? - The Sunday Times","https://www.sundaytimes.lk/260426/business-times/what-ails-sri-lankas-rubber-industry-639529.html","2026-04-26","Productivity down about 50 per cent in 2025; yields of 608 to 659 kg per hectare against 1,235 to 1,380 in 2020; rising wage and agrochemical costs with no matching price rise.","search-result"),
  S("S2","newspaper","Shortage of skilled rubber tappers impacts thriving industry - The Morning","https://www.themorning.lk/articles/obvPjHF0V1fc99P0sFTF",None,"Tappers leaving over inadequate wages and lack of social recognition; the labour shortage in tapping.","search-result"),
  S("S3","newspaper column","The elasticity of truth: will Sri Lanka's rubber industry bounce back? - Daily FT","https://www.ft.lk/columns/The-elasticity-of-truth-Will-Sri-Lanka-s-rubber-industry-bounce-back/4-701846",None,"Long-term production decline from about 130,000 tonnes in 2002 to around 70,000 tonnes.","search-result")],
 unresolved="What a tapper is actually paid per tree or per kilogram now. Not established.",
 access="No contact made. Plantation companies control estate access; smallholders do not need that permission.",
 ethics="High. As with tea, an estate company is both a gatekeeper and a party to the wage question. Lack of social recognition is part of the documented problem, and the film must not reproduce it by treating tappers as background.",
 relates_to=["SL-SQ23-006","SL-SQ07-001"],
 relation_note="Shares a wage-and-recognition mechanism with the tea plantation lead and a pre-dawn physical-skill mechanism with the palmyrah tapping lead. Kept separate: different crop, different ownership structure, different measured trend, and in the tea case a dated national wage agreement that rubber does not have.")

lead(batch="B12", lead_id="SL-SQ12-003", sq="SQ12", title="A stall that gives away everything it makes",
 subject="Volunteers running dansal during the Vesak period",
 place="Roadsides and temple areas, most visibly in Colombo and Kandy", district="island-wide", province="all",
 situation="Dansal are temporary stalls set up during Vesak by families, businesses, religious organisations and community groups, staffed by volunteers who commonly donate both their time and the cost of the ingredients, giving away food and drink without charge. The same period features handmade lanterns and large illuminated pandals depicting Jataka stories, with named concentrations in Colombo including Bauddhaloka Mawatha, Galle Face Green and the Beira lake area, and activity concentrated in the evening.",
 activity="Cooking at scale through the night, the queue, the pandal being built, and the accounting that a group does afterwards.",
 change="A fixed annual date, and an organising effort that starts weeks earlier.",
 candidate_status="evidenced-situation", territory="T07",
 primary_idea="C005-I03", supporting_ideas=["C011-I02","C074-I03","C005-I01"],
 sources=[
  S("S1","cultural guide","Vesak dansal: Sri Lanka's tradition of giving - Lakpura","https://www.lakpura.com/pages/vesak-dansal",None,"Dansal as temporary free food stalls set up by families, businesses and community groups, staffed by volunteers donating time and ingredients.","search-result"),
  S("S2","cultural guide","Vesak pandals - Lakpura","https://lakpura.com/pages/vesak-pandals",None,"The pandal tradition and its Jataka subject matter.","search-result"),
  S("S3","travel feature","A traveller's guide to Vesak in Sri Lanka - Pineapple Press","https://pineapplepress.news/a-travellers-guide-to-vesak-in-sri-lanka/",None,"The named Colombo locations and the evening concentration of activity.","search-result")],
 unresolved="Who funds a large dansal and what it costs. Sources are cultural guides and none addresses the money.",
 access="No contact made. Dansal organising groups are local and reachable in the weeks before Vesak.",
 ethics="Low, with one real trap. Dansal and pandals are also competitive and sponsored, and a supporting idea in this lead is about giving turning into outdoing others. **That is a possible reading, not a finding**, and it must not be imposed on volunteers who may simply be feeding people. If the evidence points the other way, the film says so.")

out=os.path.join(D,"leads.json"); ex=json.load(open(out)); have={x["lead_id"] for x in ex}
d=[x["lead_id"] for x in L if x["lead_id"] in have]; assert not d,d
ex.extend(L); json.dump(ex,open(out,"w"),indent=1,ensure_ascii=False); print("added:",len(L),"total:",len(ex))
