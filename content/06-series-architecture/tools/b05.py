# -*- coding: utf-8 -*-
import os as _os, sys as _sys; _sys.path.insert(0, _os.path.dirname(_os.path.abspath(__file__)))
import _seedguard  # noqa: E402,F401  -- one-time seed; refuses to run. See _seedguard.py.
import json, os
D=os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),"data"); A="2026-09-18"
def S(r,t,ti,u,p,s,c): return {"ref":r,"type":t,"title":ti,"url":u,"published":p,"accessed":A,"supports":s,"confirmed":c}
L=[]
def lead(**k):
    k.setdefault("batch","B05"); k.setdefault("decision","advance"); L.append(k)

lead(lead_id="SL-SQ18-001", sq="SQ18", title="The train that stops there every December",
 subject="Survivors, bereaved families and railway staff at the annual commemoration of the 2004 tsunami train disaster",
 place="Peraliya, near Telwatta, on the Colombo-Galle line", district="Galle", province="Southern",
 situation="On 26 December 2004 the Ocean Queen Express was struck by the tsunami at Peraliya; reported death tolls are around 1,000, including passengers and local residents who had taken shelter in the train. Each year on the anniversary the same service stops at the spot for a commemoration; the twentieth anniversary was marked there on 26 December 2024. Reporting records that the same guard who survived the disaster, Wanigaratna Karunatilleke, continued working the line. A memorial, the Tsunami Honganji Viharaya, with an 18.5-metre Buddha figure, stands at the site.",
 activity="The annual stopping of the train, the memorial, the rebuilt village, and the ordinary service that runs past the spot on every other day of the year.",
 change="A fixed annual date twenty-two years after the event, at which the same people return to the same place.",
 candidate_status="evidenced-situation", territory="T11",
 primary_idea="C077-I01", supporting_ideas=["C047-I01","C092-I01"],
 sources=[
  S("S1","broadcaster","Sri Lanka train memorial honors tsunami tragedy - VOA News","https://www.voanews.com/a/sri-lanka-train-memorial-honors-tsunami-tragedy/7914416.html","2024-12","The annual stopping of the Ocean Queen at Peraliya; the twentieth-anniversary service on 26 December 2024; the reported toll of about 1,000 including residents who sheltered in the train.","search-result"),
  S("S2","reference","2004 Sri Lanka tsunami train wreck - Wikipedia","https://en.wikipedia.org/wiki/2004_Sri_Lanka_tsunami_train_wreck",None,"The sequence of the disaster; the train thrown more than 100 metres from the line; the Tsunami Honganji Viharaya memorial; the guard Wanigaratna Karunatilleke.","search-result"),
  S("S3","news agency","Sri Lanka train guard mourns tsunami dead 10 years on - Gulf News","https://gulfnews.com/amp/story/world%2Fasia%2Fsri-lanka-train-guard-mourns-tsunami-dead-10-years-on-1.1432406","2014","Independent earlier reporting on the same guard at the tenth anniversary, which allows the claim to be checked across two dates.","search-result")],
 unresolved="Whether the named guard is still alive and still working, twelve years after the 2014 report. This must be checked before any approach and the answer may end the lead.",
 access="No contact made. The commemoration is public, which does not make the mourners public property.",
 ethics="High. Peraliya has been visited by film crews for twenty years and the site appears on dark-tourism listings. The project should establish what the village has already given and what it got back, and should be willing to decide that enough has been taken.")

lead(lead_id="SL-SQ22-006", sq="SQ22", title="Refusing the certificate",
 subject="Families of people who disappeared during and after the civil war, and the state process offering certificates and compensation",
 place="Principally the Northern and Eastern provinces", district="multiple", province="Northern and Eastern",
 situation="Reporting records that families have been offered death or missing certificates and compensation through the Office on Missing Persons, that a families' association leader has accused the government of steering relatives toward accepting certificates instead of establishing what happened, and that many families say they have no trust in the office. Human Rights Watch reported in August 2025 that police were targeting families of the disappeared. The Office on Missing Persons publishes a list of missing and disappeared persons.",
 activity="A protest that has run for years, the offices where the certificates are issued, and the photographs families carry.",
 change="An active state process meeting sustained refusal.",
 candidate_status="evidenced-situation", territory="T13",
 primary_idea="C100-I03", supporting_ideas=["C052-I02","C076-I03","C066-I02"],
 sources=[
  S("S1","human rights organisation","Sri Lanka: police target families of disappeared - Human Rights Watch","https://www.hrw.org/news/2025/08/20/sri-lanka-police-target-families-of-disappeared","2025-08-20","Reported police targeting of families of the disappeared, including in connection with engagement with the UN.","search-result"),
  S("S2","UN body","Legacy of enforced disappearances haunts Sri Lanka - OHCHR","https://www.ohchr.org/en/stories/2024/05/legacy-enforced-disappearances-haunts-sri-lanka","2024-05","UN account of the scale and continuing effect of enforced disappearances.","search-result"),
  S("S3","state body","List of missing and disappeared persons - Office on Missing Persons","https://www.omp.gov.lk/missing-persons",None,"The official register, and evidence of the process the families are being asked to enter.","search-result"),
  S("S4","news outlet","Sri Lanka's decision to issue missing certificates to families of disappeared is met with outcry - Tamil Guardian","https://www.tamilguardian.com/content/sri-lankas-decision-issue-missing-certificates-families-disappeared-met-outcry",None,"Families' rejection of certificates and the association leader's accusation about being steered toward compensation.","search-result")],
 unresolved="Nothing about any individual family. Numbers of accepted and refused certificates are not published in a form that has been checked here.",
 access="No contact made.",
 ethics="Very high. A human rights organisation reported in 2025 that families in this position were being targeted by police. Filming them could expose them to that. Nothing about this can be planned from a desk.",
 decision="hold",
 hold_reason="Real, documented and important, and held out of the episode portfolio at this stage. The 2025 HRW report of police targeting means the ordinary safeguards are not enough. This decision is recorded openly because a pattern is forming: the two leads held so far are both Tamil, northern, and concern the state. That pattern is a bias in the portfolio, not a neutral outcome, and the owner needs to decide about it rather than inherit it silently.")

lead(lead_id="SL-SQ18-002", sq="SQ18", title="Sixteen beds and the last few weeks",
 subject="Staff, patients and families at Sri Lanka's palliative care services for terminally ill cancer patients",
 place="Shantha Sevana Hospice, adjacent to Apeksha Hospital, Maharagama", district="Colombo", province="Western",
 situation="Shantha Sevana, established in 1996, is described as the first palliative care unit in Sri Lanka, adjacent to the National Cancer Institute at Maharagama, offering free care to terminally ill cancer patients, with separate male and female wards of sixteen beds each and two private rooms. Published accounts give the most common reasons for admission as pain management, families being unable to care for a patient at home, and financial burden. A palliative care clinic has also been established within the National Cancer Institute, and national palliative-care consult services are listed by the health ministry.",
 activity="Ward rounds, pain management, family visits, and the transit homes where families of outpatients stay.",
 change="Not a single event. The live material is the ordinary week in a place organised around a known ending.",
 candidate_status="evidenced-situation", territory="T11",
 primary_idea="C062-I01", supporting_ideas=["C032-I02","C095-I03","C030-I01"],
 sources=[
  S("S1","newspaper","Shantha Sevana Hospice: a beacon of hope for cancer patients seeking comfort - Daily Mirror","https://www.dailymirror.lk/news-features/Shantha-Sevana-Hospice-A-beacon-of-hope-for-cancer-patients-seeking-comfort/131-301614",None,"Established 1996; first palliative care unit in Sri Lanka; adjacent to Apeksha Hospital; free care; sixteen beds in each of the male and female wards plus two private rooms; the three most common reasons for admission.","search-result"),
  S("S2","professional network","Palliative care clinic starts in National Cancer Institute, Maharagama - Asia Pacific Hospice Palliative Care Network","https://aphn.org/palliative-care-services-starts-on-sri-lanka/",None,"Establishment of a palliative care clinic within the National Cancer Institute.","search-result"),
  S("S3","health ministry","Palliative care consult services in Sri Lanka - National Cancer Control Programme","https://www.nccp.health.gov.lk/en/palliService",None,"Official listing of palliative care services nationally.","search-result"),
  S("S4","newspaper","The dearth of cancer-related palliative care in Sri Lanka - The Sunday Times","https://www.sundaytimes.lk/240609/education/the-dearth-of-cancer-related-palliative-care-in-sri-lanka-559350.html","2024-06-09","Independent account of the shortfall in palliative care provision nationally.","search-result")],
 unresolved="Whether any hospice would permit filming, and under what conditions. Realistically this may be refused, and refusal would be the correct answer.",
 access="No contact made. Ministry of Health and institutional approval would be needed on top of every individual consent.",
 ethics="The highest in this batch. Patients are dying and many are in pain. Consent must be taken from the patient, renewed, and revocable by anyone at any time including after filming; a family's consent cannot substitute for a patient's. A safeguarding protocol is mandatory. If a patient dies during filming, what happens to that material must be agreed in writing beforehand. The film must not present anyone's death as a lesson.")

lead(lead_id="SL-SQ09-002", sq="SQ09", title="Fifteen minutes and thirty-two seconds",
 subject="Emergency medical technicians of the 1990 Suwa Seriya national ambulance service",
 place="Island-wide", district="all", province="all",
 situation="Suwa Seriya is described as launching in July 2016 in the Southern and Western provinces and expanding island-wide, providing free pre-hospital emergency care with 297 ambulance units, a workforce of about 1,500, and a reported average response time of 15 minutes 32 seconds. A Diploma in Paramedical Sciences for emergency medical technicians was developed with the Faculty of Medicine at the University of Kelaniya and the Sri Lanka College of Emergency Physicians. Peer-reviewed work describes the system's development from no organised pre-hospital service in 2015.",
 activity="Dispatch, the drive, the handover at a hospital, and the training where the sequence is drilled before it is needed.",
 change="A service that did not exist eleven years ago and now covers the island, with measurable performance.",
 candidate_status="evidenced-situation", territory="T06",
 primary_idea="C089-I01", supporting_ideas=["C066-I01","C047-I02","C003-I02"],
 sources=[
  S("S1","peer-reviewed journal","1990 Suwa Seriya, the national pre-hospital care ambulance service of Sri Lanka: a narrative review - PMC","https://pmc.ncbi.nlm.nih.gov/articles/PMC11143911/","2024","Development from no organised pre-hospital system in 2015; the service's structure; emphasis on out-of-hospital cardiac arrest.","search-result"),
  S("S2","service foundation","About us - 1990 Suwa Seriya Foundation","https://www.1990.lk/about-us/",None,"297 ambulance units, a workforce of about 1,500, island-wide free service and the reported average response time. The service's own figures, recorded as such.","search-result"),
  S("S3","reference","Suwa Seriya Ambulance Service - Wikipedia","https://en.wikipedia.org/wiki/Suwa_Seriya_Ambulance_Service",None,"Launch in July 2016 in the Southern and Western provinces and subsequent expansion.","search-result")],
 unresolved="Response-time figures come from the service itself and have not been independently checked. Rural versus urban performance is not separated in what was found.",
 access="No contact made. The foundation is an institution and is reachable, but riding with a crew means being present at strangers' emergencies.",
 ethics="High. A patient in an emergency cannot give meaningful consent at the time. Nothing filmed during a call may be used without consent obtained afterwards, from the patient or, if they died, from the family, and the default must be that it is not used.")

lead(lead_id="SL-SQ18-003", sq="SQ18", title="Forty-eight acres of everybody",
 subject="Workers, gravediggers and guides at Colombo's general cemetery",
 place="Kanatte General Cemetery, Borella", district="Colombo", province="Western",
 situation="Kanatte, established in 1866, is described as the main burial ground and crematorium for Colombo: about 48 acres, more than 120,000 graves, 363 war graves, four crematoria, and sections for the different faiths of the city. Newspaper reporting has profiled a long-serving cemetery worker known as Kalu Aiya, said to have around forty years at the site including six years at the crematorium.",
 activity="Grave digging and preparation, cremations, the daily movement of funeral parties, and the guiding of visitors to particular graves.",
 change="Not an event. The material is a place where the same work is done every day for people who are there once.",
 candidate_status="evidenced-situation", territory="T11",
 primary_idea="C092-I02", supporting_ideas=["C092-I01","C084-I01"],
 sources=[
  S("S1","reference","Kanatte Cemetery - Wikipedia","https://en.wikipedia.org/wiki/Kanatte_Cemetery",None,"Established 1866; main burial ground and crematorium for Colombo; located in Borella.","search-result"),
  S("S2","Commonwealth War Graves Commission","Colombo (Kanatte) General Cemetery - CWGC","https://www.cwgc.org/visit-us/find-cemeteries-memorials/cemetery-details/49407/colombo-kanatte-general-cemetery/",None,"Official record of the war graves within the cemetery.","search-result"),
  S("S3","newspaper","Who goes there? - The Sunday Times","https://www.sundaytimes.lk/130929/plus/who-goes-there-63818.html","2013-09-29","Profile including the long-serving worker known as Kalu Aiya, around forty years at the cemetery and six at the crematorium.","search-result"),
  S("S4","site listing","Borella Kanatte General Cemetery - Atlas Obscura","https://www.atlasobscura.com/places/borella-kanatte-general-cemetery",None,"48 acres, more than 120,000 graves, four crematoria, sections for different faiths.","search-result")],
 unresolved="Whether the profiled worker is still there thirteen years later. Who employs the gravediggers and on what terms.",
 access="No contact made. The Colombo Municipal Council operates the cemetery.",
 ethics="High. Funerals in progress must not be filmed, and mourners must not appear in the background of a story about the workers. The workers' own dignity is the point, not the morbidity of the setting.")

lead(lead_id="SL-SQ21-005", sq="SQ21", title="A temple thrown into the sea and brought back",
 subject="The Koneswaram temple on Swami Rock and the fishing community below it",
 place="Swami Rock, Trincomalee", district="Trincomalee", province="Eastern",
 situation="Koneswaram stands on Swami Rock above Trincomalee and is one of the Pancha Ishwarams. Published accounts record that much of the original structure was destroyed by the Portuguese in the seventeenth century, with material dumped into the sea, and that the present temple is a later reconstruction. Fishing is described as a significant livelihood for Tamil communities in the surrounding area. No current change was established by the research done so far.",
 activity="Not established beyond the temple's daily worship and the fish market below.",
 change="None established. This is recorded as a research direction, not a story.",
 candidate_status="direction", territory="T13",
 primary_idea="C001-I01", supporting_ideas=["C055-I01","C047-I01"],
 sources=[
  S("S1","heritage site","Swami Rock and Koneswaram temple - AmazingLanka","https://amazinglanka.com/wp/koneswaram/",None,"Location on Swami Rock; the Portuguese destruction and the dumping of material into the sea; later reconstruction.","search-result"),
  S("S2","site listing","Koneswaram Temple in Trincomalee - Atlas Obscura","https://www.atlasobscura.com/places/koneswaram-temple",None,"Status as one of the Pancha Ishwarams and the contested dating of the site.","search-result")],
 unresolved="Everything that would make this a documentary rather than a monument: who is doing what there now, and what is at stake for them. Nothing found.",
 access="No contact made.",
 ethics="An active temple. Also a site with a difficult colonial and wartime history that cannot be summarised in passing.")

lead(lead_id="SL-SQ12-002", sq="SQ12", title="Giving the thing you need",
 subject="Voluntary blood donors and the mobile collection campaigns of the National Blood Transfusion Service",
 place="Mobile camps at workplaces, schools and temples; the National Blood Centre in Colombo", district="island-wide", province="all",
 situation="Blood donation in Sri Lanka is described as entirely voluntary and non-remunerated, coordinated by the National Blood Transfusion Service under the Ministry of Health, which holds a WHO Collaborating Centre designation and operates a network of blood banks across the country. Published figures describe around 450,000 units collected annually, with a large majority collected through mobile campaigns held in communities, schools, temples and workplaces.",
 activity="Setting up a camp, the queue, the donation itself, the processing at the centre, and the campaign organisers who assemble donors.",
 change="Not a single event. Each camp is a discrete, datable occasion with an organiser who has to persuade people.",
 candidate_status="evidenced-situation", territory="T07",
 primary_idea="C059-I02", supporting_ideas=["C005-I01","C011-I02"],
 sources=[
  S("S1","health ministry","National Blood Transfusion Service - Sri Lanka","https://nbts.health.gov.lk/",None,"Official service, its remit and its structure.","search-result"),
  S("S2","reference","Blood donation in Sri Lanka - Wikipedia","https://en.wikipedia.org/wiki/Blood_donation_in_Sri_Lanka",None,"Entirely voluntary non-remunerated donation; around 450,000 units annually; the large share collected through mobile campaigns; WHO Collaborating Centre designation.","search-result"),
  S("S3","humanitarian organisation","Blood donation campaign - Sri Lanka Red Cross","https://www.redcross.lk/branches/blood-donation-campaign/",None,"Independent account of how mobile campaigns are organised at community level.","search-result")],
 unresolved="Who organises a given camp and why. Whether the 100 per cent voluntary figure holds for every component, including plasma.",
 access="No contact made. The service and the Red Cross are straightforward institutional routes.",
 ethics="Moderate. Donors' medical information, including deferrals and test results, is confidential and must not be captured incidentally. **The philosophical reading may be wrong here, and that is worth filming.** The idea behind this lead concerns giving away what one would not keep; blood is something the donor does need, and the case may contradict the idea rather than illustrate it.")

lead(lead_id="SL-SQ11-003", sq="SQ11", title="An obligation that used to go without saying",
 subject="Older people and the adult children who care for them, including from abroad",
 place="Not established; sources cover southern Sri Lanka and national data", district="not established", province="not established",
 situation="Published demographic work describes Sri Lanka as one of the fastest-ageing populations in Asia, with the share aged 60 and above rising from around 12 per cent in 2012 to around 18 per cent by 2024 and projected to approach one in four by around 2040. Research records that elders are traditionally cared for in their adult children's homes and that this arrangement is under strain as adult children work abroad or in demanding jobs far from home, while institutional residences are described as rare and not considered desirable.",
 activity="A household where care is given, a video call, and whatever arrangements exist where no child is nearby.",
 change="A measured demographic shift meeting an inherited expectation.",
 candidate_status="evidenced-situation", territory="T07",
 primary_idea="C011-I02", supporting_ideas=["C005-I02","C077-I02","C102-I01"],
 sources=[
  S("S1","peer-reviewed journal","Caregiving expectations and challenges among elders and their adult children in southern Sri Lanka - PMC","https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4138525/",None,"The traditional expectation of care in adult children's homes, the strain on it, and the low acceptability of institutional care.","search-result"),
  S("S2","UN agency","Ageing population in Sri Lanka - UNFPA","https://srilanka.unfpa.org/en/publications/ageing-population-sri-lanka",None,"Demographic projections for the ageing of the Sri Lankan population.","search-result"),
  S("S3","development bank","Growing old before becoming rich: ageing population in Sri Lanka - Asian Development Bank","https://www.adb.org/sites/default/files/publication/557446/aging-population-sri-lanka.pdf",None,"Analysis of the ageing transition and the gaps in social security and institutional provision.","search-result")],
 unresolved="No household has been identified. The percentages come from different sources and years and must not be presented as one series.",
 access="No contact made.",
 ethics="High. Older people with cognitive impairment may not be able to consent. Family conflict about care is common and a film can inflame it. Nobody should be filmed being cared for in a way that removes their dignity.")

lead(lead_id="SL-SQ03-004", sq="SQ03", title="A word that outlasted the war",
 subject="Women heading households in the east, and the livelihood programmes directed at them",
 place="Batticaloa and Ampara districts", district="Batticaloa and Ampara", province="Eastern",
 situation="Published reporting and research record Batticaloa as having the highest proportion of women-headed households in the country at about 32.3 per cent, with a reported 25,732 women-headed families in the district living below the poverty line. Research records that most such households can only take low-paid informal or daily work, and identifies land ownership rules, lack of formal employment skills and underpayment as constraints, alongside a documented restoration of more conservative gender expectations within the community. Livelihood and self-employment programmes are recorded, including training for 800 women in Batticaloa.",
 activity="Daily wage work, a training programme, a land or title office, and household life.",
 change="Live programmes meeting documented structural constraints.",
 candidate_status="evidenced-situation", territory="T02",
 primary_idea="C084-I01", supporting_ideas=["C098-I01","C052-I02","C032-I02"],
 sources=[
  S("S1","peer-reviewed journal","Gendered nostalgia and post-war Sri Lanka: women's perspectives on loss and violence - International Feminist Journal of Politics","https://www.tandfonline.com/doi/full/10.1080/14616742.2025.2472218","2025","Recent scholarship on women's perspectives on post-war loss, including the restoration of conservative gender expectations.","search-result"),
  S("S2","journalism","Conflict over, but not for widows - The New Humanitarian","https://www.thenewhumanitarian.org/report/90880/sri-lanka-conflict-over-not-widows",None,"Batticaloa's proportion of women-headed households; the reported number living below the poverty line; low-paid informal work; the training programme for 800 women.","search-result"),
  S("S3","UN agency","Rural women in Sri Lanka's post-conflict rural economy - FAO","https://openknowledge.fao.org/server/api/core/bitstreams/0d36525c-07fd-4163-b827-8bdcdd009987/content/AG114E09.htm",None,"Constraints on women's livelihoods in the post-conflict rural economy, including land ownership.","search-result")],
 unresolved="Current figures. Most of the specific numbers found date from earlier post-war reporting and must be re-checked before use.",
 access="No contact made. Women's organisations in the east are the appropriate route, not district officials.",
 ethics="Very high. The label these women are known by is itself the subject, which means the film must not use it as a shorthand. Many have lost husbands in circumstances that are legally and politically unresolved, and asking about that may expose them. Filming must not identify a household as one without a man in it.")

out=os.path.join(D,"leads.json"); ex=json.load(open(out)); have={x["lead_id"] for x in ex}
d=[x["lead_id"] for x in L if x["lead_id"] in have]; assert not d, d
ex.extend(L); json.dump(ex,open(out,"w"),indent=1,ensure_ascii=False); print("batch:",len(L),"total:",len(ex))
