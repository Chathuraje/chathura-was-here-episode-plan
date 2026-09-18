# -*- coding: utf-8 -*-
import json, os
D = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
A = "2026-09-18"
def S(r,t,ti,u,p,s,c): return {"ref":r,"type":t,"title":ti,"url":u,"published":p,"accessed":A,"supports":s,"confirmed":c}
out=os.path.join(D,"leads.json"); ex=json.load(open(out))
by={x["lead_id"]:x for x in ex}

# --- corrections from re-reading the idea cards ---
by["SL-SQ19-002"]["primary_idea"]="C066-I02"
by["SL-SQ19-002"]["supporting_ideas"]=["C089-I03","C056-I01","C091-I01"]
by["SL-SQ19-002"]["correction"]="Primary idea changed from C089-I03 to C066-I02 after re-reading both cards. C089-I03 is specifically about a harsh remark and the wish to be forgiven; the seventh-day alms is not an apology. C066-I02, on speech as an act of meaning that needs a listener who can receive it, is the accurate match. C089-I03 is kept as supporting for the case where a family does have something to repair."
by["SL-SQ08-003"] = None  # placeholder removed; not previously created

L=[]
def lead(**k):
    k.setdefault("batch","B04"); k.setdefault("decision","advance"); L.append(k)

lead(lead_id="SL-SQ22-004", sq="SQ22", title="The market that moved and kept its name",
 subject="Wholesale traders of the Manning Market, moved from Pettah to a new complex at Peliyagoda",
 place="Pettah, Colombo, and the new complex at Peliyagoda", district="Colombo and Gampaha", province="Western",
 situation="The old Manning Market was established in Pettah more than 180 years ago and is described as the country's oldest public market and economic centre. A decision taken in 2011 to relocate it to Peliyagoda was carried out in 2020, during the pandemic. The new complex covers about 15 acres against about 2 acres in Pettah and comprises more than 1,100 shops and trading spaces, with cool rooms, banks, rest areas and parking. Some vendors report that business has fallen significantly compared with Pettah.",
 activity="Pre-dawn unloading and auction, porter work, the emptied Pettah site, and the new complex's scale.",
 change="A completed move whose consequences for individual traders are still being worked out, with a documented complaint about lost trade.",
 candidate_status="evidenced-situation", territory="T12",
 primary_idea="C081-I03", supporting_ideas=["C047-I01","C039-I01","C001-I01"],
 sources=[
  S("S1","news","New Manning Market complex in Peliyagoda declared open - Ada Derana","https://adaderana.lk/news/69298/new-manning-market-complex-in-peliyagoda-declared-open",None,"Opening of the new complex, its facilities and scale.","search-result"),
  S("S2","state engineering body","Relocation of the Manning Market from Pettah to Peliyagoda - Central Engineering Consultancy Bureau","https://www.cecb.lk/relocation-of-the-manning-market-from-pettah-to-peliyagoda/",None,"Official project record: the 2011 decision, the 15-acre site, more than 1,100 shops and trading spaces, cool rooms and other facilities.","search-result"),
  S("S3","policy institute","Beyond pomp and pageantry: looking at public markets as lived spaces - Centre for a Smart Future","https://www.csf-asia.org/beyond-pomp-and-pageantry-looking-at-public-markets-as-lived-spaces/",None,"Analysis of the relocation as a change to a lived space, and vendor reports of reduced business.","search-result"),
  S("S4","feature","Colombo's dying market place: the Manning Market - Roar Media (archive)","https://archive.roar.media/english/life/srilanka-life/colombos-dying-market-place-the-manning-market",None,"Account of the Pettah market before the move.","search-result")],
 unresolved="How many of the original traders actually made the move, and how many stopped. Not established.",
 access="No contact made. The market is a public commercial space, which makes observation easy and makes filming individual traders' business a matter for their consent.",
 ethics="Traders' takings are commercially sensitive. Porters are among the lowest-paid people in the chain and should not be used only as movement in the frame.")

lead(lead_id="SL-SQ07-002", sq="SQ07", title="The room shared four ways",
 subject="Garment workers in the Katunayake free trade zone and the boarding houses they live in",
 place="Katunayake free trade zone and the surrounding boarding-house areas", district="Gampaha", province="Western",
 situation="Reporting describes Katunayake as a destination for young women from the country's poorer provinces for about forty years, working across more than eighty factories in the zone, most living in crowded boarding houses or rented rooms with shared facilities. 2025 reporting gives an average monthly wage of around 35,000 rupees, against a living-wage estimate from the Asia Floor Wage Alliance of around 94,000 rupees. Reporting also describes long hours and production targets that push workers into overtime.",
 activity="The shift change at the zone gates, boarding-house life, the money-transfer counters, and the journey home at new year.",
 change="Not a single event. The live material is the ordinary week and the monthly remittance, and the gap between the wage and the living-wage estimate is documented.",
 candidate_status="evidenced-situation", territory="T05",
 primary_idea="C076-I01", supporting_ideas=["C001-I03","C077-I02"],
 sources=[
  S("S1","human rights resource centre","Sri Lanka: garment workers' wages among lowest in Asia-Oceania region - Business and Human Rights Resource Centre","https://www.business-humanrights.org/en/latest-news/sri-lanka-garment-workers-wages-among-lowest-in-asia-oceania-region/",None,"Wage levels in the Sri Lankan garment sector relative to the region.","search-result"),
  S("S2","campaign organisation","Sri Lanka's poverty wages - Labour Behind the Label","https://labourbehindthelabel.org/next-factory-closure-wages-sri-lanka/",None,"Average monthly wage of about 35,000 rupees against an Asia Floor Wage Alliance living-wage estimate of about 94,000 rupees; boarding-house conditions; the zone as a destination for young women from poorer provinces; more than eighty factories.","search-result"),
  S("S3","academic","Work and life of Sri Lankan garment factory workers","https://www.researchgate.net/publication/382137511_Work_and_Life_of_Sri_Lankan_Garment_Factory_Workers","2024","Academic study of working and living conditions, needed to check campaign-sourced figures.","search-result")],
 unresolved="The hours figures in the sources vary widely and one is from a partisan outlet. Independent confirmation is needed before any hours claim is used.",
 access="No contact made. Factories are inside a controlled zone and will not give access to a film about wages. The boarding houses are outside it and are where a story could actually be made, with residents' consent.",
 ethics="Very high. Workers who speak about pay or hours can be dismissed, and the zone's history includes retaliation against organisers. Anonymity must be a real option. Young women living away from their families must not be filmed in their rooms in ways that expose them.")

lead(lead_id="SL-SQ16-002", sq="SQ16", title="Leaving with a list of what would bring you back",
 subject="Sri Lankan women going to and returning from domestic work in the Middle East, and the families they leave",
 place="Departure through Katunayake; home districts across the island", district="multiple", province="multiple",
 situation="Central Bank and policy-institute figures record 310,915 departures for foreign employment in 2025, with the Middle East the leading destination and Kuwait, the UAE and Saudi Arabia the top three. Worker remittances reached a record USD 8.076 billion in 2025, 22.8 per cent above 2024, with about half originating in the Middle East. Policy analysis records 7,448 complaints made by migrant workers in 2024, of which 76 per cent came from female domestic workers in Middle Eastern countries, and records regional conflict discouraging new departures and influencing some workers to return.",
 activity="Departure at the airport, the recruitment and training centres, the household left behind, the money transfer, and a return.",
 change="Departures and returns are discrete, datable events, and the conflict-driven return trend is currently live.",
 candidate_status="evidenced-situation", territory="T10",
 primary_idea="C102-I01", supporting_ideas=["C077-I02","C005-I02","C076-I01"],
 sources=[
  S("S1","central bank","Workers' remittances and labour migration bulletin 2025 Q3 - Central Bank of Sri Lanka","https://www.cbsl.gov.lk/sites/default/files/cbslweb_documents/statistics/workers_remittances_and_labour_migration_bulletin_2025_q3_e.pdf","2025","Official remittance and labour migration statistics.","search-result"),
  S("S2","policy institute","Middle East conflict: the impact on migration and remittances in Sri Lanka - Institute of Policy Studies talkingeconomics","https://www.ips.lk/talkingeconomics/2026/03/24/middle-east-conflict-the-impact-on-migration-and-remittances-in-sri-lanka/","2026-03-24","310,915 departures in 2025; estimated regional stock of about 660,000; Kuwait, UAE and Saudi Arabia as top destinations; conflict discouraging departures and influencing returns.","search-result"),
  S("S3","policy institute","Record remittances to Sri Lanka: hidden realities behind the headlines - Institute of Policy Studies","https://www.ips.lk/talkingeconomics/2026/02/06/record-remittances-to-sri-lanka-hidden-realities-behind-the-headlines/","2026-02-06","Record USD 8.076 billion in 2025, up 22.8 per cent; 7,448 complaints in 2024, 76 per cent from female domestic workers in the Middle East.","search-result")],
 unresolved="No individual worker or family has been identified. Complaint figures describe reported cases only and cannot be read as a rate of harm.",
 access="No contact made. The Sri Lanka Bureau of Foreign Employment and the recruitment agencies are institutional routes, and both are interested parties.",
 ethics="High. Some returning workers have experienced serious abuse, and a safeguarding protocol is required before any approach. Children left behind must not be filmed as illustrations of absence, and no family should be asked on camera whether the money was worth it.")

lead(lead_id="SL-SQ23-007", sq="SQ23", title="Who gets to name the reason the fare changed",
 subject="Three-wheeler drivers and app-based ride-hailing in tourist towns and in Colombo",
 place="Ella, Weligama, Sigiriya and the Western Province", district="multiple", province="multiple",
 situation="Reporting describes renewed protests by three-wheeler drivers in the last two weeks of December 2025 at Ella, Weligama and Sigiriya against app-based platforms, on the argument that their expansion is eroding livelihoods. Reporting also records the passenger complaints that preceded the apps' growth, including refusal to use meters, inconsistent fares, sudden special charges and reluctance to take short trips, and describes PickMe as holding a large majority of the Western Province market with more than 100,000 registered drivers across vehicle types.",
 activity="A three-wheeler stand, the protest itself, a driver's phone, and the negotiation at a tourist site.",
 change="A currently live dispute with dated protests and an unresolved regulatory question.",
 candidate_status="evidenced-situation", territory="T14",
 primary_idea="C080-I03", supporting_ideas=["C076-I03","C098-I01"],
 sources=[
  S("S1","news","They are running at a lower price than us: story behind recent protests - Newswire","https://www.newswire.lk/2025/12/30/they-are-running-at-a-lower-price-than-us-story-behind-recent-protests/","2025-12-30","December 2025 protests at Ella, Weligama and Sigiriya; drivers' account of price competition; the passenger complaints that preceded app adoption.","search-result"),
  S("S2","newspaper","Tuk-tuks and apps: calls for better regulations as a showdown nears - The Morning","https://www.themorning.lk/articles/eY1KlavKnSfZEeBiCO34",None,"The regulatory dispute between three-wheeler unions and app platforms.","search-result"),
  S("S3","technology journalism","How Uber's Sri Lanka rival PickMe grew despite economic crisis - Rest of World","https://restofworld.org/2024/sri-lanka-pickme/","2024","Independent reporting on PickMe's growth, driver numbers and market position.","search-result")],
 unresolved="Actual earnings before and after, on both sides of the argument. Neither drivers' nor platforms' figures have been independently checked.",
 access="No contact made. Three-wheeler associations at specific stands are an easy and appropriate first approach.",
 ethics="Moderate. The drivers' own past practice is part of the story and must be included without turning the film into a prosecution. A driver's earnings are private.")

lead(lead_id="SL-SQ22-005", sq="SQ22", title="A line put back where it was",
 subject="The reconstructed Northern railway line and the people who use and maintain it",
 place="Omanthai to Kankesanthurai and Medawachchiya to Talaimannar Pier", district="Vavuniya, Kilinochchi, Jaffna, Mannar", province="Northern",
 situation="The northern railway between Omanthai and Kankesanthurai and between Medawachchiya and Talaimannar Pier was destroyed during the war. Reconstruction of the 265 km northern line was carried out with a line of credit from the Government of India and executed by an Indian state-owned contractor. The Jaffna to Kankesanthurai section reopened on 2 January 2015 after the station had not functioned between 1990 and 2015, and services from Madhu Road to Talaimannar Pier were opened in March 2015.",
 activity="The working line today, the stations rebuilt on old sites, the Talaimannar Pier terminus, and the ordinary journeys people now make on it.",
 change="Not a current event. The change is complete, which makes this a story about what a restored thing carries rather than about a restoration in progress.",
 candidate_status="evidenced-situation", territory="T13",
 primary_idea="C014-I02", supporting_ideas=["C089-I02","C047-I01","C039-I01"],
 sources=[
  S("S1","reference","Northern line (Sri Lanka) - Wikipedia","https://en.wikipedia.org/wiki/Northern_line_(Sri_Lanka)",None,"Destruction of the Omanthai to Kankesanthurai and Medawachchiya to Talaimannar Pier sections during the war, and the reconstruction project.","search-result"),
  S("S2","reference","Kankesanthurai railway station - Wikipedia","https://en.wikipedia.org/wiki/Kankesanthurai_railway_station",None,"The station did not function between 1990 and 2015; the line reopened on 2 January 2015.","search-result"),
  S("S3","newspaper","Indian PM Modi to inaugurate rail track to Talaimannar - Daily FT","https://www.ft.lk/News/indian-pm-modi-to-inaugurate-rail-track-to-talai-mannar/56-395906","2015-03","Opening of the Madhu Road to Talaimannar Pier section in March 2015; the 63 km final segment of the 265 km project; Indian line of credit and contractor.","search-result")],
 unresolved="Whether anyone now working the line also worked it before 1990. That single question would turn a piece of infrastructure into a person, and it has not been answered.",
 access="No contact made. Sri Lanka Railways permission would be required for anything beyond public platforms.",
 ethics="This route runs through places where a great deal happened. It must not be used as a scenic corridor past other people's losses, and the war should not be narrated over the window.")

lead(lead_id="SL-SQ21-004", sq="SQ21", title="A railway that stays the same by being replaced",
 subject="Permanent-way and restoration work on the hill-country line, including after the December 2025 floods",
 place="The Main Line to Badulla, including the Demodara loop", district="Nuwara Eliya and Badulla", province="Central and Uva",
 situation="Sri Lanka Railways publishes a disaster recovery and restoration status page, with a version dated 29 December 2025, indicating that restoration work following the December 2025 floods was being tracked at that date. The hill line includes the Demodara loop, where the line passes through a tunnel beneath its own station, and Demodara station is 292.3 km from Colombo. Reporting elsewhere records that the December 2025 floods cut off dozens of up-country estates.",
 activity="Track and bund repair, slips and clearance, the loop and tunnel, and the trains running through a worksite.",
 change="Restoration after a dated disaster, with an official status record.",
 candidate_status="evidenced-situation", territory="T13",
 primary_idea="C039-I01", supporting_ideas=["C014-I02","C096-I01"],
 sources=[
  S("S1","state operator","Programme for disaster recovery and restoration status as at 29-12-2025 - Sri Lanka Railways","https://www.railway.gov.lk/web/index.php?option=com_content&view=article&id=917&Itemid=217&lang=en","2025-12-29","Official record that disaster recovery and restoration was being tracked as at 29 December 2025.","search-result"),
  S("S2","reference","Demodara railway station - Wikipedia","https://en.wikipedia.org/wiki/Demodara_railway_station",None,"Demodara is 292.3 km from Colombo; the loop where the line runs through a tunnel beneath the station.","search-result"),
  S("S3","heritage site","Demodara loop - AmazingLanka","https://amazinglanka.com/wp/demodara-loop/",None,"Description of the loop's engineering.","search-result")],
 unresolved="What was actually damaged in December 2025 and what remains unrestored. The status page must be read in full, and its current version checked, before anything is claimed.",
 access="No contact made. Sri Lanka Railways is the permission-holder and trackside filming needs a safety arrangement.",
 ethics="The December 2025 floods caused deaths and displacement. Railway restoration must not be told as an engineering story that steps over that.")

lead(lead_id="SL-SQ02-005", sq="SQ02", title="One light and a great deal of sea",
 subject="Lighthouse keepers at the offshore reef towers of the southern coast",
 place="Great Basses and Little Basses reef lighthouses; Dondra Head lighthouse on shore", district="Hambantota and Matara", province="Southern",
 situation="Great Basses Reef Lighthouse is an offshore Scottish granite tower built in 1873, about 37 metres tall, operated and maintained by the Sri Lanka Ports Authority. Published accounts state that the offshore towers at Great Basses and Little Basses are staffed by keepers and are not open to visitors, while most Sri Lankan lighthouses have been automated. Dondra Head, built in 1889, is the tallest lighthouse in the country and is also operated by the Ports Authority.",
 activity="The relief run out to the reef, the tower's routine, the sea, and the changeover of keepers.",
 change="Not established. Whether the towers are still staffed in 2026 is the question the whole lead depends on.",
 candidate_status="unverified-lead", territory="T01",
 primary_idea="C094-I02", supporting_ideas=["C013-I01","C001-I03"],
 sources=[
  S("S1","reference","Great Basses Reef Lighthouse - Wikipedia","https://en.wikipedia.org/wiki/Great_Basses_Reef_Lighthouse",None,"Built 1873; Scottish granite; about 37 metres; operated and maintained by the Sri Lanka Ports Authority.","search-result"),
  S("S2","reference","Dondra Head Lighthouse - Wikipedia","https://en.wikipedia.org/wiki/Dondra_Head_Lighthouse",None,"Built 1889; tallest in Sri Lanka; operated by the Sri Lanka Ports Authority.","search-result"),
  S("S3","guide","Lighthouses of Sri Lanka - Lakpura","https://www.lakpura.com/pages/lighthouses",None,"General account including the statement that the offshore reef towers are staffed and closed to visitors, and that most others are automated. A commercial guide, and the staffing claim needs confirming with the Ports Authority.","search-result")],
 unresolved="Staffing, rotation length and whether access is ever granted. All unknown. The reef is also only approachable in a short calm season, which may make this impossible.",
 access="No contact made. Only the Sri Lanka Ports Authority can answer any of this.",
 ethics="Low, other than crew safety. Landing at Great Basses is genuinely hazardous and must not be attempted for a shot.")

lead(lead_id="SL-SQ17-002", sq="SQ17", title="The people who work the mountain nobody looks at",
 subject="Informal waste pickers and the communities living beside Colombo's dump sites",
 place="Karadiyana at Boralesgamuwa-Borupana; Meethotamulla; Kolonnawa", district="Colombo", province="Western",
 situation="In April 2017 a garbage mound at Meethotamulla collapsed, killing 32 people, destroying more than 140 homes and displacing hundreds. The Karadiyana site occupies about 25 acres of wetland adjacent to the Weras Ganga, which flows into Bolgoda Lake, and in early 2019 the National Building Research Organisation reported a risk of collapse if dumping continued at the then rate. Published analysis records that an informal waste economy emerged around uncontrolled dumping, that waste pickers experience stigma and marginalisation, and that the informal recycling sector has been sidelined as processing plants are built.",
 activity="Sorting and carrying, the weighing and sale of recovered material, the site itself, and the new plants going up alongside it.",
 change="A documented transition to formal waste processing that is displacing an existing informal livelihood.",
 candidate_status="evidenced-situation", territory="T10",
 primary_idea="C032-I02", supporting_ideas=["C084-I01","C052-I01","C040-I01"],
 sources=[
  S("S1","environmental news","Open dumping and failed reforms bury Sri Lankan cities in waste problem - Mongabay","https://news.mongabay.com/2026/04/open-dumping-failed-reforms-bury-sri-lankan-cities-in-waste-problem/","2026-04","Current state of open dumping and reform failure; marginalisation of informal collectors; the informal recycling sector sidelined by new plants.","search-result"),
  S("S2","environmental NGO","Karadiyana garbage dump - Environment Foundation (Guarantee) Limited","https://efl.lk/karadiyana-garbage-dump/",None,"The 25-acre wetland site at Boralesgamuwa-Borupana adjacent to the Weras Ganga flowing into Bolgoda Lake; the 2019 National Building Research Organisation warning of possible collapse.","search-result"),
  S("S3","environmental NGO","Status of waste management in Sri Lanka - Environment Foundation (Guarantee) Limited","https://efl.lk/status-waste-management-sri-lanka/",None,"The 2017 Meethotamulla collapse: 32 killed, more than 140 homes destroyed, hundreds displaced.","search-result")],
 unresolved="How many people currently make a living at Karadiyana, and whether any transition support exists for them. Not established.",
 access="No contact made. The site is operated by a local authority; the people who work it are not employed by it, which makes consent a question for them, not for the authority.",
 ethics="Very high. Stigma is documented, and a film can deepen it. Nobody should be filmed in a way that makes their work look degrading, children must not be filmed at the site at all, and the 2017 deaths are within living memory for the same neighbourhoods.")

ex=[x for x in ex if x]
have={x["lead_id"] for x in ex}
d=[x["lead_id"] for x in L if x["lead_id"] in have]; assert not d, d
ex.extend(L); json.dump(ex, open(out,"w"), indent=1, ensure_ascii=False)
print("batch:",len(L),"total:",len(ex))
