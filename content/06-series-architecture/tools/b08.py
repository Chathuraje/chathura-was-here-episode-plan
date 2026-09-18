# -*- coding: utf-8 -*-
import json, os
D=os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),"data"); A="2026-09-18"
def S(r,t,ti,u,p,s,c): return {"ref":r,"type":t,"title":ti,"url":u,"published":p,"accessed":A,"supports":s,"confirmed":c}
L=[]
def lead(**k):
    k.setdefault("batch","B08"); k.setdefault("decision","advance"); L.append(k)

lead(lead_id="SL-SQ21-006", sq="SQ21", title="The building came back",
 subject="The Jaffna Public Library, its present users and staff, and what was lost in 1981",
 place="Jaffna Public Library", district="Jaffna", province="Northern",
 situation="The library was burned on the night of 31 May 1981. At the time it held a reported 97,000 volumes, including ola-leaf manuscripts. It was partially reopened in 1984 and fully restored by 2003 through a programme with a reported restoration cost of around 700 million rupees, with international contributions and roughly 25,000 books collected; accounts record that it reopened largely without books. The original collections, many of them unique, were not recoverable.",
 activity="The reading rooms as they are used now, the catalogue, and whatever remains of the pre-1981 holdings.",
 change="Not a current event. The live question is what a restored institution can and cannot restore, and that is answerable by looking at the shelves.",
 candidate_status="evidenced-situation", territory="T06",
 primary_idea="C100-I02", supporting_ideas=["C001-I01","C047-I01","C055-I01"],
 sources=[
  S("S1","reference","Burning of the Jaffna Public Library - Wikipedia","https://en.wikipedia.org/wiki/Burning_of_the_Jaffna_Public_Library",None,"The date of 31 May 1981; the reported 97,000 volumes and manuscripts; the restoration programme, its reported cost and funding, the 1984 partial reopening and the 2003 full reopening; the permanence of the loss.","search-result"),
  S("S2","news agency","Burnt, rebuilt: Jaffna library reminds of Sri Lanka conflict - Anadolu Agency","https://www.aa.com.tr/en/world/burnt-rebuilt-jaffna-library-reminds-of-sri-lanka-conflict/153795",None,"Independent reporting on the library's destruction and rebuilding.","search-result"),
  S("S3","academic institute","1981 burning of the Jaffna Public Library - American Institute for Sri Lankan Studies","https://www.aisls.org/teaching-about-the-sri-lankan-civil-war/1981-burning-of-the-jaffna-public-library/",None,"Scholarly teaching resource on the event and its historiography.","search-result")],
 unresolved="How many pre-1981 items survive, and whether any are catalogued as such. Attribution of responsibility for the burning is contested in the sources and must be reported as attributed, not asserted.",
 access="No contact made. The library is run by the Jaffna Municipal Council.",
 ethics="High. The event is part of a contested national history and any account of it will be read politically. The film should keep to what the library can show and to what the people who use it now say, rather than narrating the conflict over them.")

lead(lead_id="SL-SQ22-007", sq="SQ22", title="Thirty-two halls left",
 subject="Owners, projectionists and audiences of Sri Lanka's remaining cinemas",
 place="Single-screen cinemas across the country", district="multiple", province="multiple",
 situation="Published accounts record cinema attendance falling from a peak of 74.4 million in 1979 to 27.8 million in 1989 and to about 5.5 million by 2010, with a further 111 cinemas closing by the end of 2010, and record the number of active cinemas as having come down to around 32 by 2021. Reporting describes screenings cancelled because fewer than ten people attended, and records a pivot to streaming including the launch of a dedicated Sinhala-film service in early 2025.",
 activity="A screening with almost no one in it, the projection box, the front of house, and whatever the building is becoming.",
 change="A measured, continuing contraction with a dated alternative emerging beside it.",
 candidate_status="evidenced-situation", territory="T13",
 primary_idea="C032-I01", supporting_ideas=["C047-I01","C039-I01","C100-I02"],
 sources=[
  S("S1","academic journal","Charting the course of Sri Lankan cinema in the context of the ethnic war and its aftermath (1983-2010) - Carnets de recherches de l'ocean Indien","https://carnets-oi.univ-reunion.fr/1087",None,"Attendance falling from 74.4 million in 1979 to 27.8 million in 1989 and to about 5.5 million by 2010; 111 cinemas closing by the end of 2010; the causes identified as television, the conflict and the failure of state entrepreneurship in cinema.","search-result"),
  S("S2","news","Sri Lankan cinema in extinction: now only 32 halls for the whole country - Lankasara","https://lankasara.com/life/arts/sri-lankan-cinema-in-extinction-now-only-32-halls-for-the-whole-country/","2021","The reported figure of 32 active halls, and screenings cancelled for lack of audience.","search-result"),
  S("S3","trade press","Sri Lankan economic crisis puts film industry at indefinite standstill - Variety","https://variety.com/2022/film/global/sri-lanka-economic-crisis-film-tv-industry-1235322865/","2022","Independent trade reporting on the industry's condition during the economic crisis.","search-result")],
 unresolved="The current hall count. The 32 figure is from 2021 and both closures and refurbishments have happened since.",
 access="No contact made. Cinema owners are private businesses and are reachable.",
 ethics="Low. A business closing is a financial matter for its owner and staff and should not be filmed as elegy without their agreement.")

lead(lead_id="SL-SQ18-004", sq="SQ18", title="When there is nobody to interpret",
 subject="Deaf and hard-of-hearing Sri Lankans, sign language users, and the shortage of interpreters",
 place="Schools for the deaf, government offices, hospitals and markets", district="island-wide", province="all",
 situation="Published accounts record around 300,000 Sinhala-speaking people in Sri Lanka who are deaf or hard of hearing, a severe shortage of sign language interpreters, and the absence of a fully developed common sign language for the Sinhala-speaking deaf community, with few resources for teachers. Peer-reviewed research has examined sign language usage among deaf and hard-of-hearing Sri Lankans. The Sri Lanka Central Federation of the Deaf offers a three-month course in Sri Lankan Sign Language.",
 activity="A classroom, a hospital appointment without an interpreter, a sign language class, and conversation among fluent signers.",
 change="Not established as an event. The live material is the ordinary encounter where meaning does or does not get through.",
 candidate_status="evidenced-situation", territory="T11",
 primary_idea="C066-I02", supporting_ideas=["C091-I01","C032-I02","C096-I02"],
 sources=[
  S("S1","peer-reviewed journal","Sign language usage of deaf or hard of hearing Sri Lankans - Journal of Deaf Studies and Deaf Education","https://academic.oup.com/jdsde/article-abstract/29/2/187/7467297","2024","Peer-reviewed study of sign language usage in this community.","search-result"),
  S("S2","newspaper opinion","Sinhala Sign Language the main communication mode for the Deaf in Sri Lanka - Daily FT","https://www.ft.lk/opinion/Sinhala-Sign-Language-the-main-communication-mode-for-the-Deaf-in-Sri-Lanka/14-671078",None,"The figure of about 300,000 Sinhala-speaking deaf or hard-of-hearing people; the interpreter shortage; the lack of a fully developed common sign language and of resources for teachers.","search-result"),
  S("S3","community organisation","Sri Lanka Central Federation of the Deaf","https://slcfd.lk/",None,"The federation's training course and its own account of the community's position.","search-result")],
 unresolved="Whether Sri Lankan Sign Language has formal legal recognition, and the actual number of qualified interpreters. Neither was established.",
 access="No contact made. The federation is a deaf-led organisation and is the right first approach.",
 ethics="High. This story must be made with the community, not about it. Interpretation must be provided for the participants at every stage including consent, and the film must not be built to make hearing viewers feel moved by other people's difficulty.")

lead(lead_id="SL-SQ10-007", sq="SQ10", title="The syllables you stop needing",
 subject="Nadaswaram and thavil players in the temple tradition of the north",
 place="Jaffna, including the Nallur Kandaswamy temple", district="Jaffna", province="Northern",
 situation="The nadaswaram and thavil tradition is described as having been brought from South India and becoming established in northern Sri Lankan temple and wedding practice. Reporting on one Jaffna player records that his grandfather moved from Pudukottai in Tamil Nadu to Jaffna to play the nadaswaram and that his father served as a recognised temple musician at the Nallur Kandaswamy Kovil for forty years, and describes a career continued through the civil war. The instruments carry a hereditary tradition of learning.",
 activity="Temple service and processions, weddings, and the teaching itself, in which rhythmic syllables are spoken before they are played.",
 change="Not established as an event. The festival calendar supplies dates; whether the line of players is continuing is the research question.",
 candidate_status="evidenced-situation", territory="T06",
 primary_idea="C093-I01", supporting_ideas=["C073-I03","C085-I01","C011-I02"],
 sources=[
  S("S1","magazine","How a nadaswaram maestro made music amid Sri Lankan civil war - The Week","https://www.theweek.in/theweek/leisure/2023/12/15/the-nadaswaram-has-been-a-constant-note-in-yazhpanam-p-s-balamurugan-s-life.html","2023-12-15","The family's move from Pudukottai to Jaffna; the father's forty years as a recognised musician at Nallur; a playing career continued through the war.","search-result"),
  S("S2","magazine","Reverse Carnatic currents from Sri Lanka to southern India: Jaffna's young nadaswaram maestro - Outlook India","https://outlookindia.com/website/story/reverse-carnatic-currents-from-sri-lanka-to-southern-india-how-jaffnas-young-nad/305534",None,"Independent profile of the same tradition and player.","search-result"),
  S("S3","arts institution","Mangala Vadyam - National Centre for the Performing Arts","https://www.ncpamumbai.com/news/mangala-vadyam/",None,"Background on the nadaswaram and thavil tradition and its hereditary organisation.","search-result")],
 unresolved="Whether any of the players named in the reporting are currently based in Jaffna and would take part. Both sources profile the same person, which is not two sources on the tradition's state.",
 access="No contact made. Temple administrations engage the musicians and are a route, but the musicians are the subject.",
 ethics="The tradition's hereditary organisation is connected to caste in its South Indian origins. That must not be carried forward as an explanation of anyone's occupation. Temple filming needs the temple's permission separately from the musicians'.")

lead(lead_id="SL-SQ09-003", sq="SQ09", title="The night a dancer is allowed to wear it",
 subject="Kandyan dance students preparing for the ves initiation, and their teachers",
 place="Kandy and dance schools elsewhere, including the Chitrasena school tradition", district="Kandy, Colombo and others", province="Central and Western",
 situation="Published accounts describe the ves dance as performed by male dancers who have completed years of training and a ritual, the ves mangalya, that grants permission to wear the full costume, with the ves thattuwa placed on the initiate's head. A standardised teaching method has existed since the mid-1950s, and the first formal school opened in 1944, after which various gurus taught their own forms. The advanced student's debut, described as a rite of passage comparable to an arangetram, is a recognised stage.",
 activity="Class, rehearsal, the preparation of the costume, and the initiation itself.",
 change="A ceremony that happens on a date, to a named person, once.",
 candidate_status="evidenced-situation", territory="T06",
 primary_idea="C088-I03", supporting_ideas=["C016-I01","C094-I03","C073-I03"],
 sources=[
  S("S1","academic resource","The Kandyan dances - Asian Traditional Theatre and Dance, Theatre Academy Helsinki","https://disco.teak.fi/asia/the-kandyan-dances/",None,"Guru lineages; the standardised teaching method formulated since the mid-1950s; the twelve bar and non-bar exercises.","search-result"),
  S("S2","reference","Kandyan dance - Wikipedia","https://en.wikipedia.org/wiki/Kandyan_dance",None,"The ves costume, the ves mangalya initiation and the ves thattuwa; the requirement of years of training.","search-result"),
  S("S3","cultural heritage archive","Sri Lankan Pahim Path Mangalya - NY Living Traditions","https://nytraditions.org/digital-heritage/sri-lankan-pahim-path-mangalya",None,"The advanced student's debut as a recognised rite of passage.","search-result")],
 unresolved="Whether a ves mangalya is scheduled within a filming window, and whether the ritual may be filmed at all. Parts of it may not be.",
 access="No contact made. A dance school and the officiating teacher would both have to agree.",
 ethics="The ves is traditionally restricted to male dancers. That is a fact about the tradition and the film should neither hide it nor turn the episode into an argument about it without the participants' involvement. Ritual elements that practitioners consider private must stay private.")

out=os.path.join(D,"leads.json"); ex=json.load(open(out)); have={x["lead_id"] for x in ex}
d=[x["lead_id"] for x in L if x["lead_id"] in have]; assert not d,d
ex.extend(L); json.dump(ex,open(out,"w"),indent=1,ensure_ascii=False); print("batch:",len(L),"total:",len(ex))
