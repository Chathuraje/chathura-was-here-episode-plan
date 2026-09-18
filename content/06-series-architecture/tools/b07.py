# -*- coding: utf-8 -*-
import json, os
D=os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),"data"); A="2026-09-18"
def S(r,t,ti,u,p,s,c): return {"ref":r,"type":t,"title":ti,"url":u,"published":p,"accessed":A,"supports":s,"confirmed":c}
L=[]
def lead(**k):
    k.setdefault("batch","B07"); k.setdefault("decision","advance"); L.append(k)

lead(lead_id="SL-SQ06-002", sq="SQ06", title="A price decided by a mouthful",
 subject="Tea tasters, brokers and smallholder growers around the Colombo tea auction",
 place="Colombo auction floor; smallholder growing areas and bought-leaf factories", district="Colombo; Galle, Matara, Ratnapura, Kegalle and others", province="Western and the tea-growing provinces",
 situation="The Colombo tea auction is held every Tuesday and Wednesday, conducted by the Colombo Tea Traders' Association since 1975, with around six million kilograms offered weekly and eight brokers licensed by the Sri Lanka Tea Board. The Tea Board's green leaf pricing formula sets what a smallholder is paid as a percentage of each factory's tea sales average, computed from monthly average auction prices. Weekly market reports are published for each sale.",
 activity="Tasting rooms and the spitting line, the auction itself, the weighing of green leaf at a collection point, and a smallholder learning the month's rate.",
 change="Weekly and dated. Every sale sets a number that reaches a grower's hands a month later.",
 candidate_status="evidenced-situation", territory="T04",
 primary_idea="C077-I03", supporting_ideas=["C020-I02","C013-I01","C052-I02"],
 sources=[
  S("S1","industry association","Colombo Tea Traders' Association","https://ctta.lk/",None,"The association's role in conducting the auction and its history.","search-result"),
  S("S2","industry body","Colombo Tea Auction - Tea Exporters Association","https://teasrilanka.org/tea-auction",None,"Auction held Tuesdays and Wednesdays; about six million kilograms weekly; eight licensed brokers.","search-result"),
  S("S3","broker report","Tea market report, sale no. 15, 21-22 April 2026 - John Keells PLC","https://ceylonblacktea.com/pdf/John-Keells-PLC-Tea-Market-Report.pdf","2026-04","A dated weekly market report, showing the auction running in 2026 and the form the price information takes.","search-result"),
  S("S4","regulator","Sri Lanka Tea Board","https://srilankateaboard.lk/",None,"The regulator that sets and maintains the green leaf pricing formula.","search-result")],
 unresolved="What a smallholder actually received per kilogram in the most recent month, and how closely that tracks the formula. Not established.",
 access="No contact made. The auction is run by a private association; access to the floor is a matter for it.",
 ethics="Moderate. Smallholder incomes are private. The film should not let the auction room stand for the whole industry while the growers appear only as scenery.")

lead(lead_id="SL-SQ15-002", sq="SQ15", title="What happens underground when nobody is watching",
 subject="Gem pit miners working on the traditional share system around Ratnapura",
 place="Gem-bearing alluvial ground around Ratnapura", district="Ratnapura", province="Sabaragamuwa",
 situation="Published accounts describe gem mining in Sri Lanka as commonly worked by small partnerships, locally called attus, in which investors put up money and miners put in labour, with finds shared by long-standing agreement more often sealed by handshake than on paper. One account gives the customary division as one fifth to the landowner, one fifth to the financier and the remainder to the workers. A pit is typically worked by about four people: one filling baskets with the gem-bearing gravel called illam, one lifting, one receiving and one carrying to the washing point.",
 activity="Descending the pit, filling and hauling illam, washing and sorting at the surface, and the moment a stone is found.",
 change="Not an event. The live tension is structural and continuous: an agreement with no document, and a find that only one person sees first.",
 candidate_status="evidenced-situation", territory="T09",
 primary_idea="C023-I01", supporting_ideas=["C024-I02","C052-I01","C020-I02"],
 sources=[
  S("S1","gemmological institute","Sri Lanka: from mine to market, part 1 - GIA","https://www.gia.edu/gia-news-research-sri-lanka-mining-part1",None,"Mining methods, the illam gravels, pit organisation and the trade structure.","search-result"),
  S("S2","artisanal mining network","Sri Lanka national factsheet: small-scale gemstone mining - CASM","http://artisanalmining.org/Repository/01/The_CASM_Files/CASM_Database_documents/Sri_Lank_-_factsheet_of_small_scale_gemstone_mining.pdf",None,"Independent sector documentation of small-scale gemstone mining, including labour arrangements.","search-result"),
  S("S3","mineral database","Gem gravels, Ratnapura - Mindat","https://www.mindat.org/loc-3147.html",None,"The share division of one fifth to the landowner, one fifth to the financier and the remainder to the workers, and the four-person pit organisation.","search-result")],
 unresolved="Whether the share figures still hold, and whether pits are licensed. The National Gem and Jewellery Authority licenses mining and that framework has not been checked.",
 access="No contact made.",
 ethics="High. Pit mining is dangerous and some pits are unlicensed; filming could expose an operation to enforcement. Nobody should be asked on camera whether they have ever kept a stone. The question the film is interested in must not become an accusation aimed at a named person.")

lead(lead_id="SL-SQ14-001", sq="SQ14", title="Paid to guard what they used to sell",
 subject="Nest protectors on the turtle nesting beach at Rekawa, and the hatchery industry along the coast",
 place="Rekawa; hatcheries along the south and south-west coast", district="Hambantota, Galle, Matara, Kalutara", province="Southern and Western",
 situation="Published accounts record that close to all turtle eggs at Rekawa were formerly collected for sale or consumption, and that an in-situ nest protection project begun in 1996 employed former egg collectors as nest protectors, after which almost all nests were protected. Reported results over roughly four years include 827 nesting females, 3,328 nests, 372,107 eggs and 305,128 hatchlings released. Separate published work raises continuing concern about the number and management practices of commercial turtle hatcheries and calls for licensing and monitoring.",
 activity="Night patrol of the beach, nest marking, the release, and the very different scene at a commercial hatchery.",
 change="A documented change of livelihood on the same beach, and an unresolved regulatory question about hatcheries.",
 candidate_status="evidenced-situation", territory="T09",
 primary_idea="C097-I03", supporting_ideas=["C055-I01","C005-I01","C024-I02"],
 sources=[
  S("S1","specialist newsletter","Turtle hatcheries in Sri Lanka: boon or bane? - Marine Turtle Newsletter 60","http://www.seaturtle.org/mtn/archives/mtn60/mtn60p19.shtml",None,"Nests excavated along the south-west coast for consumption or sale to hatcheries; poorly run hatcheries reducing hatchling survival; the call for national guidelines, licensing and monitoring.","search-result"),
  S("S2","specialist newsletter","Care for the wild in Sri Lanka - Marine Turtle Newsletter 67","https://www.seaturtle.org/mtn/archives/mtn67/mtn67p16b.shtml",None,"The 1996 in-situ nest protection project at Rekawa employing former egg collectors; the reported nesting females, nests, eggs and hatchlings over the grant period.","search-result"),
  S("S3","specialist journal","Unregulated numbers and management practices of sea turtle hatcheries: an ongoing concern in Sri Lanka - Indian Ocean Turtle Newsletter 27","https://iotn.org/iotn27-03-unregulated-numbers-and-management-practices-of-sea-turtle-hatcheries-an-ongoing-concern-in-sri-lanka/",None,"That hatchery numbers and practices remain an unresolved concern.","search-result"),
  S("S4","project","Turtle Watch Rekawa","https://www.turtlewatchrekawa.org/",None,"The current project's own account of nest protection and night watch at Rekawa.","search-result")],
 unresolved="Whether protection at Rekawa outlasted the grants that paid for it, and what the protectors earn now. This is the question the lead turns on and it has not been answered.",
 access="No contact made.",
 ethics="Moderate to high. Nobody should be asked to describe past egg collection in a way that could be used against them. Turtle nesting must not be disturbed by lighting, and the commercial hatcheries are businesses that will resist scrutiny.")

lead(lead_id="SL-SQ24-004", sq="SQ24", title="The price that is agreed at three in the morning",
 subject="Farmers, commission agents and buyers at the Dambulla Dedicated Economic Centre",
 place="Dambulla Dedicated Economic Centre", district="Matale", province="Central",
 situation="The Dambulla centre, established in 1999 to decentralise produce marketing and give farmers better access, is described as the country's largest wholesale vegetable and fruit market, operating from early morning to midnight. Published accounts record farmers as about 36 per cent of weekly arrivals, with stall owners acting as intermediaries on commission, and describe the centre as having the lowest commission rates in the country. Produce is weighed and priced there before onward distribution.",
 activity="Lorries arriving through the night, unloading and weighing, the commission stalls, and the price being settled.",
 change="Nightly and dated. A farmer's whole season resolves into one number on one night.",
 candidate_status="evidenced-situation", territory="T14",
 primary_idea="C086-I02", supporting_ideas=["C080-I03","C052-I01","C098-I01"],
 sources=[
  S("S1","market operator","Dambulla Dedicated Economic Centre - official site","https://dambulladec.com/",None,"The centre's own account of its establishment, purpose and operating hours.","search-result"),
  S("S2","tourism board affiliate","Dambulla Produce Market - Love Sri Lanka","https://www.lovesrilanka.org/dambulla-produce-market/",None,"Establishment in 1999 to decentralise the market; farmers as about 36 per cent of weekly arrivals; commission intermediaries and comparatively low commission rates.","search-result"),
  S("S3","newspaper","Dambulla merry-go-round makes jaws drop on veggie prices - Sunday Times","https://www.pressreader.com/sri-lanka/sunday-times-sri-lanka/20200301/281943134924200","2020-03-01","Newspaper investigation of price formation at the centre and the spread between farm gate and retail.","search-result")],
 unresolved="Who actually sets the opening price each night, and how. The mechanism is described differently by the operator and by the press.",
 access="No contact made. The centre is a public market, which makes observation straightforward.",
 ethics="Moderate. A farmer who criticises a commission agent may need to sell to that agent again next week. Anonymity must be offered.",
 merged_from=["a separate lead on weekly village pola markets"],
 merge_note="A separate lead on the weekly village pola was opened and merged here. The pola is the retail end of the same chain and would have produced a second market episode with the same mechanism. If a distinct pola story emerges later it should turn on something the wholesale market does not have, such as the seller who is also the grower.")

lead(lead_id="SL-SQ08-004", sq="SQ08", title="Forty per cent of the milk",
 subject="Dairy smallholders, their collection societies and the state milk company",
 place="Collection centres and factories at Colombo, Polonnaruwa, Badalgama, Ambewela and Kandy, and the farms that supply them", district="multiple", province="multiple",
 situation="Published accounts describe the state company Milco operating a network of around 95 to 97 milk collection centres and five factories, linked to about 1,423 farmer-managed societies with roughly 14,500 registered dairy farmers supplying directly. Reported figures put local production at about 40 per cent of annual liquid milk demand, with the rest imported as milk powder, and record an annual milk import bill in the region of USD 300 million. Self-sufficiency has been a stated government aim.",
 activity="The morning delivery to a collection centre, testing and weighing, the society's records, and the imported powder on the same shop shelf.",
 change="A repeatedly stated national target against a measured import dependence.",
 candidate_status="evidenced-situation", territory="T05",
 primary_idea="C066-I01", supporting_ideas=["C096-I01","C080-I03","C052-I02"],
 sources=[
  S("S1","newspaper","SOE reforms: Milco reports progress in the midst of debt - The Morning","https://www.themorning.lk/articles/JPNz16LJxHJ5GJKUX26T",None,"Milco's collection network, farmer-managed societies, registered supplier numbers and its financial position.","search-result"),
  S("S2","trade press","Sri Lanka government looks to milk self-sufficiency in four years - DairyReporter","https://www.dairyreporter.com/Article/2021/02/11/Sri-Lanka-government-looks-to-milk-self-sufficiency-in-four-years/","2021-02-11","The stated self-sufficiency aim and the scale of import dependence.","search-result"),
  S("S3","UN agency","Sri Lanka: opportunities for dairy sector growth - FAO","https://www.fao.org/4/i0588e/i0588e08.htm",None,"Sector analysis of smallholder dairy production and collection.","search-result"),
  S("S4","company","Our factories - Milco","https://milco.lk/our-factories/",None,"The five factory locations.","search-result")],
 unresolved="Current farm-gate price per litre and whether it covers a smallholder's feed cost. Not established.",
 access="No contact made. Farmer-managed societies are local bodies and are a realistic first approach.",
 ethics="Moderate. Animal welfare will be visible and must be reported as seen, not avoided and not sensationalised.")

lead(lead_id="SL-SQ14-002", sq="SQ14", title="Fifteen nautical miles",
 subject="Blue whales in Sri Lankan waters, the ships that pass through them, and the whale-watching boats that follow",
 place="The southern coast off Mirissa and the shipping lane beyond it", district="Matara and Hambantota", province="Southern",
 situation="Sri Lanka lies on one of the world's busiest shipping routes, with reported figures of up to 50,000 ships a year and 20 to 30 transiting near Mirissa daily. Reported whale deaths include five blue whales and two sperm whales washed ashore with propeller injuries in 2011 and three further blue whale deaths in 2012, and a 2017 study is reported as finding that half of recorded whale deaths in Sri Lankan waters resulted from ship strikes. Published analysis holds that moving the shipping lane about 15 nautical miles further south would reduce collision risk by up to 95 per cent, and industry bodies and the International Whaling Commission have called for the government to propose that relocation. The whale-watching fleet at Mirissa is described as growing and as effectively unregulated.",
 activity="The pre-dawn departure of the watching fleet, the whales themselves, the ships on the horizon, and the science that produced the 15-mile figure.",
 change="A specific, proposable and currently unmade decision, with a measurable consequence either way.",
 candidate_status="evidenced-situation", territory="T09",
 primary_idea="C027-I01", supporting_ideas=["C024-I03","C098-I01","C096-I01"],
 sources=[
  S("S1","environmental news","Shipping lane change could be sea change for Sri Lanka's blue whales - Mongabay","https://news.mongabay.com/2022/10/shipping-lane-change-could-be-sea-change-for-sri-lankas-blue-whales/","2022-10","The proposed 15-nautical-mile shift and the reported reduction in collision risk; the calls from shipping bodies and the IWC.","search-result"),
  S("S2","conservation organisation","Research into blue whale ship strikes off Sri Lanka offers solution to deadly threat - IFAW","https://www.ifaw.org/international/journal/research-into-blue-whale-ship-strikes-off-sri-lanka-offers-solution-to-deadly-threat",None,"The research basis for the lane-relocation proposal.","search-result"),
  S("S3","environmental news","Blue whale decline in Sri Lanka tied to climate and human activity - Mongabay","https://news.mongabay.com/2025/04/blue-whale-decline-in-sri-lanka-tied-to-climate-and-human-activity/","2025-04","Recent reporting on population decline and its attributed causes.","search-result"),
  S("S4","newspaper","Ocean Watch: the threat of ship strikes to Lankan whales - The Morning","https://www.themorning.lk/articles/FOJnJUTqKwfTgXqC0hyy",None,"Sri Lankan reporting on ship strikes, the shipping density near Mirissa and the state of whale-watching regulation.","search-result")],
 unresolved="Whether Sri Lanka has submitted any proposal to the International Maritime Organization, and what the current regulatory position on whale-watching boats is. Neither was established.",
 access="No contact made. Going to sea with the watching fleet is straightforward and commercial; that is also the part of the story that is being criticised.",
 ethics="Moderate. Filming from a boat that is itself crowding whales makes the film part of the problem. Boat operators are people whose livelihood depends on the practice under question and must not be ambushed with it.")

out=os.path.join(D,"leads.json"); ex=json.load(open(out)); have={x["lead_id"] for x in ex}
d=[x["lead_id"] for x in L if x["lead_id"] in have]; assert not d,d
ex.extend(L); json.dump(ex,open(out,"w"),indent=1,ensure_ascii=False); print("batch:",len(L),"total:",len(ex))
