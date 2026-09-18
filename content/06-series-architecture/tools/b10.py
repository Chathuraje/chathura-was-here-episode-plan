# -*- coding: utf-8 -*-
import json, os
D=os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),"data"); A="2026-09-18"
def S(r,t,ti,u,p,s,c): return {"ref":r,"type":t,"title":ti,"url":u,"published":p,"accessed":A,"supports":s,"confirmed":c}
L=[]
def lead(**k):
    k.setdefault("batch","B10"); k.setdefault("decision","advance"); L.append(k)

lead(lead_id="SL-SQ03-007", sq="SQ03", title="The tune before the bread",
 subject="Choon paan mobile bakery vendors and the households on their routes",
 place="Streets and lanes across the country", district="island-wide", province="all",
 situation="Choon paan vendors sell bread and short eats from converted three-wheelers and vans fitted with glass display cases, announcing themselves with a recurring tune, most commonly Fur Elise. Published accounts describe vendors setting out from bakeries before dawn, from around 5.30 in the morning, running fixed routes with a regular customer base, typically appearing between about 6.30 and 8.30 in the morning and again in the late afternoon.",
 activity="Loading at the bakery before dawn, the route itself, the doors that open when the tune is heard, and the end of the round.",
 change="Not established as an event. The material is a daily round in which an entire transaction is triggered by a sound.",
 candidate_status="evidenced-situation", territory="T02",
 primary_idea="C046-I01", supporting_ideas=["C101-I02","C011-I02","C040-I01"],
 sources=[
  S("S1","reference","Choon Paan - Wikipedia","https://en.wikipedia.org/wiki/Choon_Paan",None,"The name and its meaning; the converted vehicle; the recurring tune.","search-result"),
  S("S2","broadcaster food desk","The choon paan men: Sri Lanka's bread tuk tuks - SBS Food","https://www.sbs.com.au/food/article/the-choon-paan-men-sri-lankas-bread-tuk-tuks/7g4l19aew",None,"Vendors setting out before dawn from around 5.30; fixed routes and a loyal customer base; the goods carried.","search-result"),
  S("S3","feature","The resilience of Sri Lanka's musical, mobile bakeries - Atlas Obscura","https://www.atlasobscura.com/articles/sri-lankas-musical-mobile-bakeries",None,"Morning and afternoon rounds; the range of tunes used; the vendors' relationship with their routes.","search-result")],
 unresolved="What a vendor earns on a round, and whether the vehicle and stock are owned or taken on credit from a bakery. Not established, and it decides whether this is a small business or piece work.",
 access="No contact made. Vendors are on the street daily and are easy to approach, which makes it more important, not less, that the approach is honest about what the film is.",
 ethics="Low. The obvious risk is whimsy: a charming tune over a long, hard, low-paid round.")

lead(lead_id="SL-SQ21-008", sq="SQ21", title="Named after a tree it is mostly no longer made from",
 subject="Toddy tappers, licensed tavern keepers and distillers working coconut toddy and arrack",
 place="Licensed coastal taverns around Negombo, Kalpitiya and the outskirts of Galle", district="Gampaha, Puttalam, Galle", province="Western, North Western, Southern",
 situation="Toddy, locally ra, is the fermented sap of the coconut palm, tapped by climbers and sold through taverns licensed by the Excise Department, with coastal taverns described around Negombo, Kalpitiya and the Galle outskirts. Published accounts describe pressure on the trade from urbanisation reducing coconut-grove acreage on the western coast and from younger people being less willing to take the physical risk, and record that industrial arrack production increasingly uses molasses rather than palm sap. The Excise Department publishes tavern licensing decisions.",
 activity="Tapping, collection, the tavern itself, and the distillery where the same name is applied to a different base material.",
 change="Not established as a dated event. The change is in the product's composition and in who still climbs.",
 candidate_status="evidenced-situation", territory="T13",
 primary_idea="C039-I01", supporting_ideas=["C001-I01","C084-I01","C003-I02"],
 sources=[
  S("S1","policy institute","Alcohol policy research paper, working paper series no. 19 - Institute of Policy Studies","https://www.ips.lk/wp-content/uploads/2017/01/Alcohol-paper.pdf","2013-12","Independent policy analysis of the Sri Lankan alcohol sector including the toddy trade and its regulation.","search-result"),
  S("S2","state body","Revise license fees for toddy taverns - Excise Department of Sri Lanka","https://www.excise.gov.lk/index.php?option=com_content&view=article&id=169",None,"Official confirmation that toddy taverns are separately licensed and regulated.","search-result"),
  S("S3","travel and food writing","Sri Lankan toddy and arrack - HIDMC","https://www.hidmc.com/blog-posts/sri-lankan-toddy-and-arrack-unique-local-drinks-you-must-try",None,"Urbanisation reducing grove acreage; younger people unwilling to take the climbing risk; industrial arrack increasingly produced from molasses rather than palm sap.","search-result")],
 unresolved="What proportion of arrack sold as coconut arrack is actually made from palm sap. This is the question the premise rests on and it is not answered by any source found.",
 access="No contact made. The Excise Department licenses taverns; distillers are private companies.",
 ethics="Moderate. This is alcohol, with real public-health consequences. The film must not romanticise the tavern, and the tappers face the same fall risk as their palmyrah counterparts in the north.",
 relates_to=["SL-SQ07-001"],
 relation_note="Adjacent to the Jaffna palmyrah tapping lead but not the same story. That one is about who still climbs in the north; this one is about what the product has become in the west and south. Kept separate because the region, the palm, the regulation and the question all differ.")

lead(lead_id="SL-SQ11-004", sq="SQ11", title="The shop that is also the meeting",
 subject="Rural kade and buth kade keepers and their customers",
 place="Not established", district="not established", province="not established",
 situation="Published descriptions record the kade as a small rural shop selling a wide range of goods with tea and short eats, largely gone from urban areas but still common in rural ones, and record buth kade, rice shops, as providing affordable lunch packets. No specific shop, keeper or current change has been identified.",
 activity="Not established.",
 change="None established.",
 candidate_status="direction", territory="T07",
 primary_idea="C005-I01", supporting_ideas=["C011-I02","C077-I02"],
 sources=[
  S("S1","food writing","The Sri Lankan kade","https://ankierenique.wordpress.com/2014/11/21/the-sri-lankan-kade/","2014-11-21","Descriptive account of the kade as a rural institution. A personal blog, and weak evidence.","search-result"),
  S("S2","food guide","Sri Lankan food: a complete guide - Lakpura","https://www.lakpura.com/pages/food",None,"The buth kade and the lunch packet. A commercial guide.","search-result")],
 unresolved="Everything. No shop, no keeper, no change, and no source better than travel and food writing.",
 access="No contact made.",
 ethics="Nothing specific.",
 decision="hold",
 hold_reason="Held for insufficient evidence, not for risk. A rural shop is a plausible and attractive setting, but nothing found so far identifies a subject, a situation or anything happening. It is kept because a located shop with something at stake would be a strong episode, and it must not be scheduled on the strength of the setting alone.")

lead(lead_id="SL-SQ15-003", sq="SQ15", title="What the seniors do because the seniors did it",
 subject="University students, administrators and the courts, in the aftermath of a Supreme Court order on ragging",
 place="State universities", district="multiple", province="multiple",
 situation="On 9 July 2025 the Supreme Court issued a judgment and guidelines directed at ending ragging in state universities, following an incident at the University of Sri Jayewardenepura in which a first-year student sustained severe injuries. The judgment is reported as stating that ragging corrupts the core intent of free education and as citing suicide, psychological trauma and academic dropout among victims. The Ministry of Higher Education and the University Grants Commission were required to report back to the court within six months on enforcement, budget allocation and bylaw drafting. Peer-reviewed research has measured prevalence, self-perceived health consequences and help-seeking behaviour.",
 activity="A campus at the start of an academic year, an orientation, a disciplinary process, and the court reporting deadline.",
 change="A dated court order with a compliance deadline, and an academic year in which the effect will or will not show.",
 candidate_status="evidenced-situation", territory="T09",
 primary_idea="C082-I02", supporting_ideas=["C086-I02","C023-I01","C084-I01"],
 sources=[
  S("S1","news and analysis","Supreme Court's bold move to end university ragging - Groundviews","https://groundviews.org/2025/07/17/supreme-courts-bold-move-to-end-university-ragging/","2025-07-17","The 9 July 2025 judgment; the Sri Jayewardenepura incident and the named injured student; the quoted finding on free education; the six-month reporting requirement on the ministry and the UGC.","search-result"),
  S("S2","news","Supreme Court of Sri Lanka issues landmark guidelines to eradicate university ragging - Sri Lanka Brief","https://srilankabrief.org/supreme-court-of-sri-lanka-issues-landmark-guidelines-to-eradicate-university-ragging/","2025","Independent report of the same judgment and guidelines.","search-result"),
  S("S3","peer-reviewed journal","Ragging, a form of university violence in Sri Lanka: prevalence, self-perceived health consequences, help-seeking behaviour and associated factors - PMC","https://pmc.ncbi.nlm.nih.gov/articles/PMC9318855/","2022","Measured prevalence and health consequences, and help-seeking behaviour among students.","search-result")],
 unresolved="Whether the ministry and the UGC reported on time, and what changed. That is checkable and has not been checked.",
 access="No contact made. Universities are controlled by the UGC and campus filming needs approval.",
 ethics="Very high. The injured student is named in reporting; that does not make him available, and he must not be approached except through his family and only if they initiate it. Students who describe ragging can be identified and retaliated against on a small campus. Nobody who took part in ragging should be filmed in a way that creates a criminal record from the film itself, and nobody who was raggged should be asked to re-enact or describe it for effect.")

lead(lead_id="SL-SQ06-003", sq="SQ06", title="Earning in a currency your neighbours do not use",
 subject="Sri Lankans working online for overseas clients, and the tax and payment system around them",
 place="Home offices and co-working spaces across the country", district="island-wide", province="all",
 situation="Reported figures describe nearly 150,000 freelancers in Sri Lanka as of 2022 and over 100,000 Sri Lankans freelancing globally in 2026, with earnings ranging from about USD 100 to 300 a month for entry-level administrative work up to much higher figures for a small proportion. Reporting notes that an experienced freelancer earning USD 1,500 a month takes home more than many salaried local roles. From 1 April 2025 service exporters became liable to income tax of up to 15 per cent, reversing a largely tax-free position, and reporting records that Sri Lankan gig workers lack the foreign-currency withdrawal facilities available in neighbouring countries.",
 activity="A working day on someone else's clock, the payment problem, and the household around a person who earns in dollars.",
 change="A dated tax change on 1 April 2025 and an unresolved payments problem.",
 candidate_status="evidenced-situation", territory="T04",
 primary_idea="C077-I03", supporting_ideas=["C088-I02","C001-I03","C076-I01"],
 sources=[
  S("S1","newspaper","The rise of the gig economy in Sri Lanka - The Morning","https://www.themorning.lk/articles/q4VI3ypwaWrlLnH1Rykw",None,"Scale of the freelance workforce and its economic significance.","search-result"),
  S("S2","academic paper","Opportunities and challenges of the gig economy in Sri Lanka - Wayamba University","https://fbsf.wyb.ac.lk/wp-content/uploads/2026/03/OPPORTUNITIES-AND-CHALLENGES-OF-THE-GIG-ECONOMY-IN-SRI-LANKA.pdf","2026-03","Academic assessment of the sector's structure and constraints.","search-result"),
  S("S3","research institute","Exploring the online freelance workforce in Sri Lanka - LIRNEasia","https://lirneasia.net/wp-content/uploads/2015/05/1_BPO_Sri-Lanka-Report_v6.pdf","2015","Earlier research establishing the sector's shape, useful as a baseline against the current figures.","search-result"),
  S("S4","industry blog","Earning USD as a freelancer in Sri Lanka: currency, payments, tax guide","https://lankawebsites.com/blog/freelancing/earning-usd-as-a-freelancer-in-sri-lanka-currency-payments-tax-guide-2026","2026","The 1 April 2025 change making service exporters liable to income tax of up to 15 per cent, and the absence of PayPal and similar withdrawal facilities. An industry blog, and the tax position must be confirmed against the Inland Revenue Department before use.","search-result")],
 unresolved="Earnings figures come from blogs and marketing sources and are not reliable. The tax position must be confirmed from the revenue authority.",
 access="No contact made. Freelancers are reachable and often willing to talk, which makes verifying their income claims harder, not easier.",
 ethics="Moderate. Income and tax are private and could expose someone to enforcement. Nobody's earnings should be stated on film without documentary support and their agreement.")

lead(lead_id="SL-SQ15-004", sq="SQ15", title="A wire left in a tea estate",
 subject="Leopards dying in snares in the central highlands, and the people who live and work in that landscape",
 place="Tea estate mosaics and forest patches of the central highlands", district="Nuwara Eliya and neighbouring hill districts", province="Central and Uva",
 situation="A peer-reviewed study of 17 years of mortality records (2008-2024) reports that wire snares accounted for 62.3 per cent of recorded leopard deaths, that the central highlands accounted for 46.9 per cent of all records with Nuwara Eliya district alone contributing 38.4 per cent, and that human-caused deaths averaged about 9.65 records a year, dominated by adult males and concentrated in plantation landscapes. The study's conclusion reported in the press is that leopard conservation can no longer focus only on protected areas.",
 activity="Estate and forest edge, snare removal patrols, and the work that goes on in the same landscape every day.",
 change="A recently published study with a clear and unwelcome finding, and conservation practice that has not yet caught up with it.",
 candidate_status="evidenced-situation", territory="T09",
 primary_idea="C024-I01", supporting_ideas=["C027-I01","C007-I01","C080-I03"],
 sources=[
  S("S1","peer-reviewed journal","Human-caused leopard deaths in Sri Lanka are concentrated in central highlands' estate mosaics: evidence from 17 years of mortality records - Wiley","https://onlinelibrary.wiley.com/doi/10.1002/wll2.70040","2026","Snares as 62.3 per cent of recorded mortality; central highlands 46.9 per cent and Nuwara Eliya 38.4 per cent of records; about 9.65 human-caused deaths a year over 2008-2024; concentration in plantation landscapes.","search-result"),
  S("S2","newspaper","Human-caused leopard deaths soar in Sri Lanka's central highlands, new study warns - The Island","https://island.lk/human-caused-leopard-deaths-soar-in-sri-lankas-central-highlands-new-study-warns/",None,"Independent reporting of the study and its conclusions.","search-result"),
  S("S3","environmental news","Sri Lanka leopard deaths prevalent in region where humans and big cats overlap - Mongabay","https://news.mongabay.com/2026/06/sri-lanka-leopard-deaths-prevalent-in-region-where-humans-and-big-cats-overlap/","2026-06","Independent reporting on the overlap between leopard range and human land use.","search-result")],
 unresolved="Who sets the snares and what for. The study records the cause of death, not the intention behind it, and most snares are understood to be set for other animals. This distinction is the story and must not be collapsed.",
 access="No contact made. Estate companies control the land and conservation organisations work on it; both are gatekeepers with positions.",
 ethics="High. Snaring is illegal, and filming in a community where it happens could produce evidence against people who are also among the poorest workers in the country. Nobody should be asked on camera whether they set snares.")

out=os.path.join(D,"leads.json"); ex=json.load(open(out)); have={x["lead_id"] for x in ex}
d=[x["lead_id"] for x in L if x["lead_id"] in have]; assert not d,d
ex.extend(L); json.dump(ex,open(out,"w"),indent=1,ensure_ascii=False); print("batch:",len(L),"total:",len(ex))
