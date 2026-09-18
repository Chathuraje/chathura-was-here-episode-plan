# -*- coding: utf-8 -*-
import os as _os, sys as _sys; _sys.path.insert(0, _os.path.dirname(_os.path.abspath(__file__)))
import _seedguard  # noqa: E402,F401  -- one-time seed; refuses to run. See _seedguard.py.
import json, os
D=os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),"data"); A="2026-09-18"
def S(r,t,ti,u,p,s,c): return {"ref":r,"type":t,"title":ti,"url":u,"published":p,"accessed":A,"supports":s,"confirmed":c}
L=[]
def lead(**k):
    k.setdefault("batch","B06"); k.setdefault("decision","advance"); L.append(k)

lead(lead_id="SL-SQ10-005", sq="SQ10", title="An exam taken at ten",
 subject="Children preparing for the Grade 5 scholarship examination, their families and the tuition system around it",
 place="Island-wide", district="all", province="all",
 situation="The Grade 5 scholarship examination is a national selection test taken by children around the age of ten. Recent research reports an independent association between early examination exposure and anxiety, with examination-exposed children showing longer tuition hours, reduced non-academic activity, and a dose-response relationship between tuition duration and anxiety. The examination has been the subject of a long public argument, including a presidential announcement of a decision to abolish it and sustained argument from others that it should be reformed rather than removed because it is one of the few mechanisms that levels an unequal school system.",
 activity="Tuition classes, home study, the exam day, and the results.",
 change="An annual, dated event with a live policy argument attached.",
 candidate_status="evidenced-situation", territory="T06",
 primary_idea="C001-I02", supporting_ideas=["C094-I03","C087-I01","C076-I01"],
 sources=[
  S("S1","preprint","Psychological consequences of academic demands linked to the Grade 5 scholarship examination: experience from Sri Lanka - Research Square","https://www.researchsquare.com/article/rs-9173497/v1",None,"Association between early examination exposure and anxiety; longer tuition hours; reduced non-academic activity; dose-response between tuition duration and anxiety. A preprint, and its peer-review status must be checked before it is cited publicly.","search-result"),
  S("S2","newspaper opinion","Grade 5 scholarship examination: make it smarter, abolish not - Daily FT","https://www.ft.lk/Columnists/Grade-5-Scholarship-Examination-Make-it-smarter-abolish-not/4-675521",None,"The argument that the examination levels an unequal system and should be reformed rather than abolished.","search-result"),
  S("S3","newspaper","Govt has decided to abolish Grade 5 scholarship examination: President - Daily FT","https://www.ft.lk/News/Govt-has-decided-to-abolish-Grade-5-Scholarship-Examination-President/56-675340",None,"A presidential announcement of a decision to abolish the examination. Whether it was carried out must be checked; the examination appears still to be held.","search-result")],
 unresolved="Whether the abolition was ever enacted. The sources conflict, and the current legal position has not been established.",
 access="No contact made. Schools require ministry and principal approval.",
 ethics="Very high. The subjects are ten-year-old children who cannot consent for themselves. Parental consent is not sufficient on its own for filming a child under examination stress. No child's results may be filmed or reported. A child must never be shown failing.")

lead(lead_id="SL-SQ04-001", sq="SQ04", title="Seventeen years to a verdict",
 subject="Litigants, remand prisoners and the courts in a system with a backlog of over a million cases",
 place="Courts island-wide; prisons including Welikada, Colombo Remand, Magazine and Negombo", district="multiple", province="multiple",
 situation="The Ministerial Consultative Committee on Justice recorded 1,131,818 pending cases across the courts at its meeting of 27 February 2025. Reporting describes criminal prosecutions typically taking around seventeen years and civil litigation running for decades. Prison figures reported alongside this describe a system designed for around 10,000 inmates holding over 40,000, with roughly two-thirds awaiting trial, and around 8,500 inmates held because of delays in Government Analyst reports. A reform package has been proposed, including more appellate judges, new High Courts, provincial appellate courts and additional court staff, and the Supreme Court held its first fully paperless trial on 26 March.",
 activity="Court corridors and adjournment, the file itself, a family travelling to a hearing, and the reform process.",
 change="A live reform attempt against a measured backlog, with dated official figures.",
 candidate_status="evidenced-situation", territory="T03",
 primary_idea="C020-I03", supporting_ideas=["C066-I01","C098-I01","C052-I02"],
 sources=[
  S("S1","news","Sri Lanka: over 1.13 million cases pending: justice committee reviews delays in judicial system - Sri Lanka Brief","https://srilankabrief.org/sri-lanak-over-1-13-million-cases-pending-justice-committee-reviews-delays-in-judicial-system/","2025","1,131,818 pending cases recorded at the Ministerial Consultative Committee on Justice and National Integration on 27 February 2025.","search-result"),
  S("S2","newspaper","Justice reforms: the challenge of clearing 1.1 million pending cases - The Morning","https://www.themorning.lk/articles/K6TV8HMID0mDbek4kCum",None,"Criminal prosecutions taking around seventeen years; civil litigation running for decades; the link to prison overcrowding; the proportion of remand prisoners; delays in Government Analyst reports.","search-result"),
  S("S3","news agency","Sri Lanka's government proposes contentious judicial reform package - FMT","https://www.freemalaysiatoday.com/category/world/2026/08/18/sri-lanka-s-government-proposes-contentious-judicial-reform-package","2026-08-18","The proposed expansion of the Court of Appeal, new High Courts, provincial appellate courts, retirement-age change and additional staff.","search-result"),
  S("S4","magazine","Sri Lanka prison riot exposes intertwined crises of drugs, crime and overcrowding - The Diplomat","https://thediplomat.com/2026/07/sri-lanka-prison-riot-exposes-intertwined-crises-of-drugs-crime-and-overcrowding/","2026-07","Prison-by-prison capacity and occupancy figures before the July riots; arrests on narcotics charges since October 2025.","search-result")],
 unresolved="Whether any individual case could be followed, and whether a court would permit filming at all. Court filming is heavily restricted.",
 access="No contact made.",
 ethics="High. A person awaiting trial is presumed innocent and identifying them can do lasting harm. Remand prisoners are in custody and cannot freely consent. Nothing may be filmed that prejudices a live case.",
 merged_from=["a separate prison-overcrowding lead opened in the same batch"],
 merge_note="A separate lead on prison overcrowding was opened and then merged into this one. The two are the same situation seen from its two ends: the pending case and the person waiting for it. Keeping them apart would have produced two episodes with the same cause, the same figures and the same institutional sources.")

lead(lead_id="SL-SQ04-002", sq="SQ04", title="The thing that waits",
 subject="People in residential drug treatment, and the services treating them",
 place="Treatment and rehabilitation centres including those run by the National Dangerous Drugs Control Board", district="Colombo, Kandy, Galle, Gampaha and elsewhere", province="multiple",
 situation="The National Dangerous Drugs Control Board runs treatment and rehabilitation centres with counselling and residential facilities, concentrated in the Colombo, Kandy, Galle and Gampaha districts, alongside designated and private centres. Peer-reviewed work on residential treatment in Sri Lanka found all participants to be poly-drug users, with cannabis most common followed by heroin, methamphetamine and cocaine. Reporting in 2025 and 2026 records new centres planned, including one for people under 21 in Kandy with construction scheduled from January 2026, and records criticism that some existing facilities rely on military-style drill rather than treatment.",
 activity="Counselling sessions, the daily routine of a residential centre, family visits, and discharge.",
 change="A documented expansion of provision alongside documented criticism of the existing model.",
 candidate_status="evidenced-situation", territory="T03",
 primary_idea="C074-I01", supporting_ideas=["C081-I01","C082-I01","C014-I01"],
 sources=[
  S("S1","peer-reviewed journal","The pattern of substance use and characteristics of individuals enrolled in residential treatment at selected rehabilitation centers in Sri Lanka - PMC","https://pmc.ncbi.nlm.nih.gov/articles/PMC9130826/",None,"All participants poly-drug users; cannabis most common, followed by heroin, methamphetamine and cocaine.","search-result"),
  S("S2","state body","Treatment and rehabilitation division - National Dangerous Drugs Control Board","https://www.nddcb.gov.lk/treatment-and-rehabilitation-division.php",None,"Four treatment and rehabilitation centres under the board, with counselling and residential facilities, focused on the Colombo, Kandy, Galle and Gampaha districts.","search-result"),
  S("S3","news agency","Sri Lanka to open 3 new drug rehabilitation centers in 2025 - Xinhua","https://english.news.cn/20251007/d81357a7bdd340ed96cae1746545a0e7/c.html","2025-10-07","Planned new centres including one for people under 21 in Kandy, with construction scheduled from January 2026.","search-result"),
  S("S4","newspaper","Narcotics addiction: govt urged to rethink rehab, correction models - The Morning","https://www.themorning.lk/articles/NlRP17zHxp2znUpQq0rr",None,"Criticism that rehabilitation at some facilities consists of military-style drill that does not address addiction.","search-result")],
 unresolved="How many people in these centres are there voluntarily and how many under court order or detention. This determines whether anyone there can consent at all.",
 access="No contact made.",
 ethics="Among the highest here. **Nobody held under compulsion may be filmed**, because consent given inside a closed institution by a person whose release may depend on cooperation is not consent. Relapse must never be filmed as a dramatic turn. No participant may be identified in a way that follows them afterwards. A safeguarding protocol and a clinician's involvement are required before any approach.")

lead(lead_id="SL-SQ02-006", sq="SQ02", title="Watching a very large place with very few people",
 subject="Wildlife beat officers and rangers enforcing protection in the national parks",
 place="Yala and Wilpattu national parks and their beat offices, including Kukulkatuwa", district="Hambantota, Monaragala, Puttalam, Anuradhapura", province="Southern, Uva, North Western, North Central",
 situation="Reporting records wildlife officers from the Kukulkatuwa beat office of Wilpattu arresting five suspects over the killing of a pregnant deer, with a firearm, ammunition, a knife, motorcycles and a torch recovered; an armed confrontation between wildlife officers and suspected poachers in Yala in August 2026; and, in September 2026, the poisoning of shrinking water holes during drought to kill animals for meat. Peer-reviewed work in the journal PARKS examines the position of rangers in Sri Lanka and describes it as a cautionary case.",
 activity="Night patrol, beat-office work, evidence handling, and the waterholes themselves during drought.",
 change="Currently reported incidents, including a drought-linked pattern reported in September 2026.",
 candidate_status="evidenced-situation", territory="T01",
 primary_idea="C013-I01", supporting_ideas=["C075-I01","C003-I02","C096-I01"],
 sources=[
  S("S1","peer-reviewed journal","Defenders of wildlife conservation in Sri Lanka: a cautionary note for the future of rangers - PARKS (IUCN)","https://parksjournal.com/wp-content/uploads/2021/11/10.2305IUCN.CH_.2021.PARKS-27-2SLP.en-Prakash-et-al.pdf","2021-11","Peer-reviewed assessment of the conditions, risks and prospects of wildlife rangers in Sri Lanka.","search-result"),
  S("S2","newspaper","Wildlife officers arrest five in Wilpattu poaching raid - The Island","https://island.lk/wildlife-officers-arrest-five-in-wilpattu-poaching-raid/",None,"The Kukulkatuwa beat office arrest and the items recovered.","search-result"),
  S("S3","environmental news","As drought shrinks Sri Lanka's water holes, poisoning poses threat to wildlife - Mongabay","https://news.mongabay.com/2026/09/as-drought-shrinks-sri-lankas-water-holes-poisoning-poses-threat-to-wildlife/","2026-09","Poisoning of water holes during drought to kill animals for meat, reported in and around several protected areas.","search-result"),
  S("S4","news","Suspected poacher shot and arrested following armed confrontation with wildlife officers in Yala - Lanka Newspapers","https://www.lankanewspapers.com/2026/08/12/suspected-poacher-shot-and-arrested-following-armed-confrontation-with-wildlife-officers-in-yala","2026-08-12","The August 2026 armed confrontation in Yala.","search-result")],
 unresolved="Ranger numbers, pay and equipment relative to the area patrolled. The PARKS paper must be read in full for this.",
 access="No contact made. Only the Department of Wildlife Conservation can authorise any of this.",
 ethics="High. Filming enforcement means being present when people are arrested, and suspects are presumed innocent. Poachers are often local people under economic pressure and must not be presented as a category of villain. Night patrol with armed officers is dangerous for a crew and may compromise the operation.")

lead(lead_id="SL-SQ10-006", sq="SQ10", title="Training where there is nothing to train with",
 subject="Young athletes and coaches outside the main cities, and the national system that is meant to find them",
 place="Regional coaching in Gampaha, Hettipola and Jaffna; district-level academies", district="multiple", province="multiple",
 situation="Peer-reviewed work on Sri Lankan sport policy records that resources are centralised in urban areas and that most divisional secretaries do not receive sufficient funding to develop sport or identify talented athletes. Coach education has been delivered regionally, including in Gampaha, Hettipola and Jaffna, through an overseas partner federation. Regional academies exist in cricket and football.",
 activity="Training sessions on whatever ground exists, a selection trial, and the travel between a village and a city meet.",
 change="Not established as an event. A selection trial or a national meet would provide one, and none has been identified.",
 candidate_status="unverified-lead", territory="T06",
 primary_idea="C085-I01", supporting_ideas=["C076-I01","C003-I02","C089-I01"],
 sources=[
  S("S1","peer-reviewed journal","The difficulties of making sport policy succeed: a case study of Sri Lanka - International Review for the Sociology of Sport","https://journals.sagepub.com/doi/10.1177/09720634231196941","2023","Centralisation of resources to urban areas; insufficient funding at divisional level for developing sport and identifying athletes.","search-result"),
  S("S2","national federation","Helping develop athletics in Sri Lanka - Australian Athletics","https://www.athletics.com.au/news/helping-develop-athletics-in-sri-lanka/",None,"Coach education courses delivered in Gampaha, Hettipola and Jaffna.","search-result"),
  S("S3","government ministry","Athletics - Ministry of Youth Affairs and Sports","https://www.moys.gov.lk/our-sports-inner/185/Athletics",None,"Official account of the national athletics structure.","search-result")],
 unresolved="No athlete, coach or club has been identified. Without one this is a policy finding, not a documentary.",
 access="No contact made.",
 ethics="High if any athlete is under eighteen. A young athlete's hopes must not be used to build suspense, and a failure to qualify must not be filmed as a climax.")

lead(lead_id="SL-SQ23-008", sq="SQ23", title="The person who opens the sluice",
 subject="Farmer organisations and water masters allocating tank water in dry-zone villages",
 place="Dry-zone villages with working small tanks", district="multiple dry-zone districts", province="North Central, North Western, Uva, Eastern",
 situation="Sri Lanka is described as retaining around 10,000 village tanks of this type, many still irrigating paddy. Historically a vel vidane, a water master, administered the tank, received a share of each farmer's harvest and was responsible for coordinating maintenance and opening the sluice. Farmer Organisations in their current form came into operation in the 1980s, combining a committee with a water master role, with representative farmers meeting regularly to decide water allocation. Published work records that changes in accountability and custom contributed to canal decay, diminishing supplies and village conflict, and that some farmers start late or over-cultivate, making bulk allocation difficult.",
 activity="The kanna meeting where the season's water is agreed, the sluice being opened, the canal, and the fields that are at the end of it.",
 change="Seasonal and recurring: each cultivation season begins with a decision that has to be made and enforced by people who live together.",
 candidate_status="evidenced-situation", territory="T14",
 primary_idea="C052-I02", supporting_ideas=["C052-I01","C098-I01","C091-I03"],
 sources=[
  S("S1","university research project","Water supply and use in the case study village - Exploring tank systems, Freie Universitat Berlin Department of Earth Sciences","https://www.geo.fu-berlin.de/en/v/tanks-in-the-dryzone-of-sri-lanka/exploring-tank-systems/vulnerability/exploring-village/water-supply/index.html",None,"The vel vidane's historical role, payment in a share of the harvest, responsibility for maintenance and the sluice; Farmer Organisations from the 1980s combining committee and water-master roles; regular meetings on allocation; conflicts from late or over-cultivation.","search-result"),
  S("S2","peer-reviewed journal","A review on water governance in Sri Lanka: lessons learnt for future water policy formulation - Water Policy","https://iwaponline.com/wp/article/23/2/255/80096/A-review-on-water-governance-in-Sri-Lanka-the","2021","Peer-reviewed account of water governance including the decay of customary arrangements.","search-result"),
  S("S3","UN agency","Water is wealth for Sri Lankan farmers - International Labour Organization","https://www.ilo.org/asia/media-centre/articles/WCMS_726936/lang--en/index.htm",None,"Account of farmer organisations and tank-based livelihoods.","search-result")],
 unresolved="Which village, and whether its next season's allocation meeting falls within a filming window. Not established.",
 access="No contact made. The Department of Agrarian Development registers farmer organisations and is the formal route.",
 ethics="Moderate to high. A water dispute filmed on one side can harden it. Consent should come from the organisation as well as from individuals, and the film must not adjudicate who is right.")

lead(lead_id="SL-SQ24-003", sq="SQ24", title="Asking the chart before asking each other",
 subject="Families using porondam horoscope matching and nekath timings before a marriage, and the astrologers they consult",
 place="Not established", district="not established", province="not established",
 situation="Published descriptions record that families identify a nekath, an auspicious moment, before weddings, housewarmings, business openings and journeys, and that porondam matching, a structured compatibility analysis of two birth horoscopes, is widely treated as an early step before marriage. The same sources record that matching is now also offered online.",
 activity="A consultation, the drawing or reading of a chart, and the family conversation that follows it.",
 change="None established. The research so far reached only commercial astrology services, which is not evidence of how families actually decide.",
 candidate_status="direction", territory="T14",
 primary_idea="C076-I03", supporting_ideas=["C086-I02","C052-I02","C020-I01"],
 sources=[
  S("S1","commercial guide","Porondam matching: Sri Lankan horoscope guide - Lakpura","https://www.lakpura.com/pages/porondam",None,"Description of porondam matching as a structured compatibility analysis and of its place before marriage. A commercial source describing its own service.","search-result"),
  S("S2","commercial guide","Sri Lankan astrology: history and traditions - Lakpura","https://www.lakpura.com/pages/astrology",None,"The nekath practice before weddings, housewarmings, business openings and journeys. Same caveat.","search-result")],
 unresolved="Everything. No independent or scholarly source on current practice was found, no family or astrologer has been identified, and nothing is known about how often a match actually decides an outcome. This must not be advanced until there is a non-commercial source.",
 access="No contact made.",
 ethics="High if a marriage is actually affected. A couple whose match was refused must not be filmed as an illustration, and the film must neither endorse nor debunk the practice.")

out=os.path.join(D,"leads.json"); ex=json.load(open(out)); have={x["lead_id"] for x in ex}
d=[x["lead_id"] for x in L if x["lead_id"] in have]; assert not d,d
ex.extend(L); json.dump(ex,open(out,"w"),indent=1,ensure_ascii=False); print("batch:",len(L),"total:",len(ex))
