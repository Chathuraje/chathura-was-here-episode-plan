# -*- coding: utf-8 -*-
import json, os
D = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
A = "2026-09-18"
def S(ref, typ, title, url, pub, supports, conf):
    return {"ref": ref, "type": typ, "title": title, "url": url, "published": pub,
            "accessed": A, "supports": supports, "confirmed": conf}

L = []
def lead(**k):
    k.setdefault("batch", "B01"); k.setdefault("decision", "advance"); L.append(k)

lead(lead_id="SL-SQ10-001", sq="SQ10", title="The last hana weavers of Henawala",
 subject="Kinnara-community weavers of hana (sann hemp) fibre mats and wall hangings in Henawala village",
 place="Henawala, Pata Dumbara", district="Kandy", province="Central",
 situation="Henawala is described as the last village in Sri Lanka where hana fibre weaving is still practised. Published accounts state that of roughly 95-100 families in the village, about 10 remain actively engaged in the weaving, and that several master weavers addressed as gurunanse are in their seventies and eighties.",
 activity="Fibre extraction and preparation, dyeing, and weaving on traditional looms; the counting and naming of pattern motifs; the daily work of the remaining households.",
 change="The count of active families against the count of households in the same village is itself the change, and it is measurable rather than inferred.",
 candidate_status="evidenced-situation", territory="T06",
 primary_idea="C100-I02", supporting_ideas=["C073-I03", "C039-I01"],
 sources=[
  S("S1","encyclopaedia entry","Handloom Weaving of Sri Lanka - Asia InCH Encyclopedia of Intangible Cultural Heritage","https://asiainch.org/craft/handloom-weaving/",None,"Dumbara mats are today produced in a solitary village, Henavala in the Pata Dumbara division of Kandy district; the mat-weaver community known as Kinnaras uses hana (Crotalaria juncea) fibre; the weavers descend from suppliers to the royal palace.","search-result"),
  S("S2","academic paper","Study of Traditional Sri Lankan Henavala Weaving (IJCRT)","https://www.ijcrt.org/papers/IJCRT1813385.pdf",None,"Academic treatment of the Henavala weaving technique; cited here as an independent source to be read in full before any fact is relied on.","search-result"),
  S("S3","magazine feature","Art of the Dumbara Weaver - Explore Sri Lanka","https://exploresrilanka.lk/art-of-the-dumbara-weaver/",None,"Henavala described as the last bastion of hana weavers; of 95-100 families about 10 are actively weaving; senior award-winning weavers addressed as gurunanse.","search-result")],
 unresolved="The 95-100 / 10 family figures are undated in the sources seen and must be re-counted on the ground. The community's own name for itself, and whether it wishes to be described by caste, must be settled with the community before anything is written.",
 access="No contact made. Entry would be through the village's own weavers' association or the Department of National Crafts; not yet identified.",
 ethics="Kinnara is a caste designation. The repository's rules forbid carrying forward caste claims. The craft can be filmed without making caste an explanation of anyone's circumstances, but the subject cannot be avoided either, and the participants must decide how it is handled.")

lead(lead_id="SL-SQ21-001", sq="SQ21", title="Five generations at the same mask bench",
 subject="Family mask-carving workshops at Ambalangoda, including the Wijesuriya workshop and museum associated with the carver Ariyapala Wijesuriya Gurunnanse",
 place="Ambalangoda", district="Galle", province="Southern",
 situation="Ambalangoda is the centre of Sri Lankan mask carving. Published accounts describe workshops held within one family across five generations, with carving, painting and a museum on the same premises.",
 activity="Drying and seasoning kaduru wood, roughing out the facial form with chisels, fine detail carving, paint preparation and painting; visitors passing through the museum while work continues behind it.",
 change="Not established. Whether the workshop is passing to a further generation, and on what terms, is exactly what research must find out rather than assume.",
 candidate_status="evidenced-situation", territory="T13",
 primary_idea="C039-I01", supporting_ideas=["C001-I01", "C093-I01"],
 sources=[
  S("S1","tourism/heritage listing","Ambalangoda Mask Factory and Museum - lanka.com","https://lanka.com/about/attractions/ambalangoda-mask-factory-museum/",None,"Ambalangoda is the heartland of Sri Lankan mask-making; family workshops have practised across multiple generations; carvers can be observed at work.","search-result"),
  S("S2","specialist site","Ambalangoda Mask Factory and Museum - srilankanmask.com","https://srilankanmask.com/ambalangoda/ambalangoda-mask-factory-and-museum-in-sri-lanka",None,"The workshop and museum has remained in the Wijesuriya family for five generations and is named after the ancestor Ariyapala Wijesuriya Gurunnanse.","search-result"),
  S("S3","travel guide","Traditional Masks in Sri Lanka","https://srilankatravellife.com/2026/06/10/traditional-masks-in-sri-lanka/","2026-06-10","Raksha and Sanni masks are carved from kaduru (Strychnos nux-vomica); the wood is dried to reduce cracking, then shaped with chisels before fine detail.","search-result")],
 unresolved="Whether any workshop other than the well-known museum ones still carves for ritual use rather than for sale. The five-generation claim comes from the workshop's own presentation and needs an independent check.",
 access="No contact made. The museum workshops receive visitors, which makes an approach possible but also means the filmed version of the craft is already a performance for visitors. That has to be handled, not ignored.",
 ethics="Sanni masks belong to a healing ritual tradition. Filming the carving is not the same as filming a ritual, and the two must not be conflated for effect.")

lead(lead_id="SL-SQ10-002", sq="SQ10", title="What the fingers know about beeralu",
 subject="Women lace-makers working beeralu (bobbin lace) in the southern coastal villages",
 place="Galle, Magalle, Makuluwa, Weligama, Mirissa, Gandara, Dikwella, Kottegoda", district="Galle and Matara", province="Southern",
 situation="Beeralu is a bobbin-lace technique introduced in the colonial period and worked mainly by women along the southern coast. Published accounts describe it as slowly disappearing because the work is long and arduous, alongside recent revival efforts including state promotion and use by fashion labels.",
 activity="Working a pillow of bobbins by hand at a household pace; pattern cards; selling at the fort; teaching demonstrations for visitors.",
 change="A craft being kept alive partly by demand from outside the community it belongs to. What that does to the work, and to what the maker is paid, is researchable.",
 candidate_status="evidenced-situation", territory="T06",
 primary_idea="C073-I03", supporting_ideas=["C032-I01"],
 sources=[
  S("S1","news feature","Art Of Lace: How Beeralu Is Being Kept Alive - Roar Media (archive)","https://archive.roar.media/english/life/culture-identities/art-of-lace-beeralu-kept-alive",None,"Beeralu is practised by women in Galle, Matara, Makuluwa, Gandara, Dikwella, Kottegoda, Mirissa, Magalle and Weligama; the craft is described as on the verge of being forgotten.","search-result"),
  S("S2","trade body blog","Dutch Lace Makers of Galle - Sri Lanka Export Development Board","https://www.srilankabusiness.com/blog/dutch-lace-making.html",None,"The term renda is Portuguese and beeralu derives from Portuguese; state initiatives promote the craft as a source of income for artisan women in coastal villages.","search-result"),
  S("S3","newspaper","Crafting Beeralu Lace - The Sunday Times (Funday Times)","https://www.sundaytimes.lk/150628/funday-times/crafting-beeralu-lace-154464.html","2015-06-28","Independent newspaper account of the technique and its practitioners.","search-result")],
 unresolved="How many women still work beeralu commercially, and what a piece earns against the hours it takes. No reliable current figure was found.",
 access="No contact made. Demonstration sessions for visitors exist at Galle Fort, which is a route in but is not the same as filming a working household.",
 ethics="Low-paid women's home work. Earnings must not be reported from a seller's figure, and no maker should be filmed in a way that implies she is content with the rate.")

lead(lead_id="SL-SQ02-001", sq="SQ02", title="Two skins, two voices",
 subject="Drum makers producing geta bera and other traditional drums for temples, schools and Kandyan dancers",
 place="Kuragandeniya, Menikhinna, and the drum-making settlements near Kandy", district="Kandy", province="Central",
 situation="Published accounts describe drum-making settlements near Kandy, one with about 33 families and over 200 artisans supplying schools, temples and dancers, and another at Kuragandeniya in Menikhinna with about 15 families. The same accounts report shortages of hides and of suitable wood.",
 activity="Hollowing a single block of jak, kohomba, ehela or red sandalwood; preparing and mounting two different vellums so that the two heads sound against each other; tensioning; testing by ear.",
 change="Raw-material scarcity, named in the sources as hides and wood, is an ongoing constraint that can be observed rather than asserted.",
 candidate_status="evidenced-situation", territory="T01",
 primary_idea="C101-I02", supporting_ideas=["C065-I01", "C073-I03"],
 sources=[
  S("S1","encyclopaedia entry","Musical Instruments of Sri Lanka - Asia InCH / Global InCH","https://globalinch.org/craft/musical-instruments-of-sri-lanka/",None,"About 33 families and over 200 artisans in one drum-making settlement; about 15 families at Kuragandeniya in Menikhinna; scarcity of deer, goat, rabbit and iguana hides and of suitable wood.","search-result"),
  S("S2","reference","Geta bera - Wikipedia","https://en.wikipedia.org/wiki/Geta_bera",None,"The geta bera is made from a single block of wood, commonly jak, with two contrasting vellums, and accompanies Kandyan dance.","search-result"),
  S("S3","magazine feature","The making of the Beraya - Explore Sri Lanka","https://exploresrilanka.lk/the-making-of-the-beraya/",None,"Descriptive account of the drum-making process.","search-result")],
 unresolved="Whether the hide shortage is a legal supply question, a wildlife-protection question or a price question. The sources name the shortage but not its cause.",
 access="No contact made. Schools and temples are named as customers, which gives a possible route through a dance school rather than through the workshop.",
 ethics="Animal hides are central to the craft. The subject must be handled factually, without either sensationalising it or concealing it, and the legal position on protected species must be checked before filming.")

lead(lead_id="SL-SQ23-001", sq="SQ23", title="Permits, cane and a road that used to be busy",
 subject="Cane craftsmen and shopkeepers of Weweldeniya and the inner village of Radawadunna, on the Colombo-Kandy road",
 place="Weweldeniya and Radawadunna", district="Gampaha", province="Western",
 situation="A dated newspaper investigation reports the cane village contracting from roughly 1,500 families a decade earlier to about 20 active families, with named officeholders and craftsmen interviewed, including the secretary of the Radawadunna Cane Craftsmen's Association. Raw cane requires government permits and comes from Polonnaruwa, Ampara and Mannar; the article reports allegations that larger operators obtain cane through political connections while smaller craftspeople face supply constraints, and that some businesses import cane from Malaysia.",
 activity="Soaking, splitting and weaving cane; a roadside shopping strip with most shops closed; permit paperwork; transport of raw cane from other districts.",
 change="Documented contraction with figures and named sources, plus a live question about who can get the raw material.",
 candidate_status="evidenced-situation", territory="T14",
 primary_idea="C052-I01", supporting_ideas=["C098-I01", "C080-I03"],
 sources=[
  S("S1","newspaper investigation","Weweldeniya, Sri Lanka's famous cane village, now a virtual ghost town - The Sunday Times","https://www.sundaytimes.lk/150614/business-times/weweldeniya-sri-lankas-famous-cane-village-now-a-virtual-ghost-town-153001.html","2015-06-14","Contraction from about 1,500 families to about 20; one workshop down from 40 workers to family only; permits required for raw cane, sourced from Polonnaruwa, Ampara and Mannar; allegations of political access to supply; imports from Malaysia; named interviewees including P.K.P. Ariyaratne of the Radawadunna Cane Craftsmen's Association.","fetched"),
  S("S2","newspaper","Weaving woes - The Sunday Times","https://www.sundaytimes.lk/200802/news/weaving-woes-411235.html","2020-08-02","Later report on cane craftsmen in Gampaha District struggling with raw-material shortage and low demand.","search-result"),
  S("S3","tourism board","Sri Lanka Tourism - Weweldeniya attraction entry","https://srilanka.travel/index.php?attraction_id=61&route=attractions%2Fattraction",None,"Official confirmation that Weweldeniya is recognised as a cane-craft location.","search-result")],
 unresolved="Every figure is from 2015 and must be re-counted for 2026. The allegation about political access to permits is an allegation reported by a newspaper; it is not established and must not be repeated as fact or put to anyone on camera as though it were.",
 access="No contact made. The craftsmen's association at Radawadunna is a plausible first approach and is a body rather than an individual.",
 ethics="The story touches on alleged corruption. Filming people who depend on permits, while that allegation is in the air, could expose them. Anonymity options must be settled before any approach.")

lead(lead_id="SL-SQ21-002", sq="SQ21", title="The model that has to be destroyed",
 subject="Brass casters working lost-wax and sand casting in the Kandy-district brass villages",
 place="Pilimathalawa, Kiriwavula, Gadaladeniya, Pamunuwa and the craft settlement at Nattarampotha", district="Kandy", province="Central",
 situation="Published accounts describe a concentration of brass and silver workers in these villages, working ornamental lamps, trays, kendi vessels and temple fittings by lost-wax and sand casting, with the trade handed down within families.",
 activity="Modelling in wax, investing the model, burning out, pouring, breaking the mould, chasing and polishing. In lost-wax casting the original is necessarily destroyed to produce the object.",
 change="Not established. Whether these workshops are producing for temples, for the domestic market or for tourist sale, and in what proportion, is a research question.",
 candidate_status="evidenced-situation", territory="T13",
 primary_idea="C001-I01", supporting_ideas=["C073-I03"],
 sources=[
  S("S1","encyclopaedia entry","Brassware and Metalware of Sri Lanka - Asia InCH","https://asiainch.org/craft/brassware-metalware/",None,"Brass workers are concentrated at Kiriwavula, Gadaladeniya, Pamunuwa and the craftspersons' housing estate of Kalapuraya at Nattarampotha; lost-wax and sand-casting methods are used.","search-result"),
  S("S2","reference","Pilimathalawa - Wikipedia","https://en.wikipedia.org/wiki/Pilimathalawa",None,"Pilimathalawa in the Kandy district is known for metal trays, kendi vessels, vases and oil lamps.","search-result"),
  S("S3","trade body","The Foundry Industry in Sri Lanka - Sri Lanka Export Development Board","https://www.srilankabusiness.com/light-engineering/the-foundry-industry.html",None,"Official description of the foundry and brass sector, useful for separating the craft workshops from industrial foundries.","search-result")],
 unresolved="Whether any workshop still casts by the full lost-wax method rather than reusing permanent moulds. This single question decides whether the premise holds, and it has not been answered.",
 access="No contact made. Pilimathalawa is a retail strip on a main road; the casting happens away from it.",
 ethics="Furnace work and molten metal. Safety and insurance for a crew, and for anyone asked to demonstrate a pour, must be settled first.")

lead(lead_id="SL-SQ23-002", sq="SQ23", title="Blaming the plastic pot",
 subject="Potting households of Molagoda and the clay-supply villages of the Kalutara district",
 place="Molagoda near Kegalle on the Kandy-Colombo road; Dediyawala, Anguruwatota and Polgampola for clay", district="Kegalle and Kalutara", province="Sabaragamuwa and Western",
 situation="Molagoda is described as one of the oldest continuously active clay-craft communities, with families whose pottery work descends from obligations under the rajakariya system. Published accounts attribute the industry's decline both to aluminium and plastic goods displacing clay cookware and to clay itself becoming scarce and expensive.",
 activity="Digging and preparing clay, wheel throwing, drying yards, open or kiln firing, roadside stalls.",
 change="At least two separate causes are documented for the same decline. The single-cause story that gets repeated is the plastic one.",
 candidate_status="evidenced-situation", territory="T14",
 primary_idea="C080-I03", supporting_ideas=["C052-I01", "C073-I03"],
 sources=[
  S("S1","encyclopaedia entry","Earthenware of Sri Lanka - Asia InCH","https://asiainch.org/craft/earthenware/",None,"A clay variety from Dediyawela in Kalutara district mixed with welimetta; pottery villages in Kalutara include Dediyawala, Anguruwatota and Polgampola.","search-result"),
  S("S2","heritage listing","Molagoda Pottery Village, Kegalle - Lakpura","https://www.lakpura.com/pages/molagoda-pottery-village",None,"Molagoda is about 12 km from Kegalle town on the Kandy-Colombo road; families have made clay pottery since the rajakariya period.","search-result"),
  S("S3","reference","Pottery of Sri Lanka - Wikipedia","https://en.wikipedia.org/wiki/Pottery_of_Sri_Lanka",None,"Demand for traditional cookware declined with aluminium and plastic goods; clay has become a scarce resource, raising production costs.","search-result")],
 unresolved="Who controls clay extraction licences, and whether construction demand is the competing use. Not established.",
 access="No contact made. Molagoda is a roadside pottery strip and is used to visitors, which again means the visible version may be the sales version.",
 ethics="Poverty is reported in the sources. It must not be filmed as picturesque, and no potter should be asked to perform hardship.")

lead(lead_id="SL-SQ01-001", sq="SQ01", title="The hand the audience does not watch",
 subject="String-puppet families of the Gamwari lineage performing Rukada Natya",
 place="Ambalangoda, Balapitiya and Mirissa", district="Galle and Matara", province="Southern",
 situation="UNESCO inscribed Rukada Natya on the Representative List of the Intangible Cultural Heritage of Humanity in 2018, the first Sri Lankan element on that list. The inscription records that it is performed by family groups belonging to or connected with the Gamwari lineage in these towns, that puppeteers make their own puppets and handwritten scripts, and that performances have traditionally been held at temple premises and community centres in May and June. Separate reporting describes the form as at risk and the younger generation moving away from it.",
 activity="Carving and stringing puppets; writing and reciting scripts; a small band; a performance where the audience watches the figure and not the hands above it.",
 change="An inscribed tradition with a declining number of practising families; the May-June performance season is a real, datable window.",
 candidate_status="evidenced-situation", territory="T01",
 primary_idea="C009-I01", supporting_ideas=["C040-I01", "C073-I03"],
 sources=[
  S("S1","UNESCO inscription","Rukada Natya, traditional string puppet drama in Sri Lanka - UNESCO ICH","https://ich.unesco.org/en/RL/rukada-natya-traditional-string-puppet-drama-in-sri-lanka-01370","2018","Inscribed 2018 on the Representative List (13.COM); performed by family groups of the Gamwari lineage around Ambalangoda, Balapitiya and Mirissa; puppeteers make their own puppets and handwritten scripts; performances traditionally at temples and community centres in May and June; the related nadagam form is described as extinct.","fetched"),
  S("S2","newspaper","Rukada Natya first from Lanka to be on UNESCO's List of Intangible Cultural Heritage of Humanity - Daily FT","https://www.ft.lk/front-page/R%C5%ABkada-N%C5%ABtya-first-from-Lanka-to-be-on-UNESCO-s-List-of-Intangible-Cultural-Heritage-of-Humanity/44-667885",None,"Independent confirmation that this was Sri Lanka's first inscription on the Representative List.","search-result"),
  S("S3","news interview","Puppetry hasn't been marketed properly - The Morning","https://www.themorning.lk/articles/hFMTOARGjLGZiH1LKFY5",None,"Reporting that puppetry is not a viable living and that younger people are leaving the form.","search-result")],
 unresolved="How many Gamwari families still perform, and whether any performance is scheduled in the coming May-June window. Not established.",
 access="No contact made. The UNESCO file names museums as a route, which is a formal and appropriate first approach.",
 ethics="An inscribed heritage element attracts attention that can distort it. Filming must not become another demand on a small number of families.")

lead(lead_id="SL-SQ10-003", sq="SQ10", title="Before you are allowed to write",
 subject="Preparation, inscription and conservation of ola (palm-leaf) manuscripts, in monastic collections and at the National Library's Preservation and Conservation Centre",
 place="National Library, Colombo; temple and monastic manuscript collections", district="Colombo and elsewhere", province="Western and elsewhere",
 situation="Published accounts describe a long training before a scribe was permitted to write on ola, and only very experienced writers being allowed to inscribe major works. The National Library's Preservation and Conservation Centre, inaugurated on 5 August 2015, works on palm-leaf manuscripts and produces a herbal oil used in their conservation. The writing tradition largely ended after printing was introduced.",
 activity="Cutting and boiling leaves with papaya pulp and pineapple leaves, sun drying, smoke storage, polishing on an areca cylinder, inscribing with a stylus, and the conservation work itself.",
 change="A skill that persists as conservation rather than as authorship. What is being preserved, and what has already been lost, is documented rather than guessed.",
 candidate_status="evidenced-situation", territory="T06",
 primary_idea="C073-I03", supporting_ideas=["C100-I02"],
 sources=[
  S("S1","government body","Ola Leaf Conservation - Department of Cultural Affairs","https://www.cultural.gov.lk/web/index.php?Itemid=72&catid=34%3Aleft&id=62%3Aola-leaf-conservation&lang=en&option=com_content&view=article",None,"Official description of ola leaf conservation work.","search-result"),
  S("S2","newspaper series","Palm leaf manuscripts of Sri Lanka - The Island","https://island.lk/palm-leaf-manuscripts-of-sri-lanka-part-iii/",None,"A scribe went through long training before being allowed to write on ola; only very experienced writers inscribed major works; leaf preparation by boiling with papaya pulp and pineapple leaves, sun drying, smoke storage and polishing on an areca cylinder.","search-result"),
  S("S3","library","IFLA - Traditional paper and manuscript preservation","https://www.ifla.org/traditional-paper-and-manuscript-preservation/",None,"International library-sector context for manuscript preservation practice.","search-result")],
 unresolved="Whether anyone today inscribes new text on ola as a working practice rather than a demonstration. Not established, and the premise weakens if the answer is no.",
 access="No contact made. Institutional permission would be needed for the conservation centre; temple collections need the incumbent's permission.",
 ethics="Monastic collections are religious property. Filming manuscripts is not automatically permitted because a library holds them.")

lead(lead_id="SL-SQ09-001", sq="SQ09", title="Not enough hands for the bark",
 subject="Cinnamon peelers and the households and training academies trying to replace them",
 place="Cinnamon-growing areas of the southern and south-western coast and interior", district="Galle, Matara, Hambantota, Ratnapura, Kalutara and Uva areas", province="Southern, Sabaragamuwa, Uva, Western",
 situation="Sector studies and press reporting describe a shortage of roughly 35,000 peelers, with the consequence that only about 35 per cent of the crop is harvested twice a year while about 65 per cent is harvested once. Reported figures put cinnamon at about 35,000 hectares with about 60,000 growers and about 300,000 workers, and the livelihood reaching roughly 350,000 families. A Cinnamon Training Academy has been training new peelers, and reporting connects the shortage to low pay and to social stigma attached to the work.",
 activity="Cutting, rubbing, slitting and peeling the bark; rolling quills; drying sheds; the training benches where new peelers learn on real sticks.",
 change="A skill with a time window: the bark peels properly only within a period, and the reported consequence of too few peelers is a halved harvest cycle. That is a measurable, currently live situation.",
 candidate_status="evidenced-situation", territory="T06",
 primary_idea="C089-I01", supporting_ideas=["C084-I01", "C073-I03"],
 sources=[
  S("S1","donor-funded sector study","Study and Master Plan for the Ceylon Cinnamon Value Chain in Sri Lanka - Standards and Trade Development Facility","https://standardsfacility.org/sites/default/files/PG_343_Study_Master_Plan_Final.pdf",None,"Shortage of about 35,000 peelers; non-recognition of skilled capability; workers migrating to non-agricultural work; about 35 per cent of the crop harvested twice a year and about 65 per cent once.","search-result"),
  S("S2","business press","Labour shortage hits cinnamon industry - Daily FT","https://www.ft.lk/Agriculture/labour-shortage-hits-cinnamon-industry/31-624902",None,"About 35,000 hectares, about 60,000 farmers and about 300,000 workers; training by the Cinnamon Training Academy under its chairman Sarada De Silva; social stigma attached to peeling.","search-result"),
  S("S3","government research institute","Present Situation and Prospects of Cinnamon Industry in Sri Lanka - HARTI report 203","https://www.harti.gov.lk/images/download/reasearch_report/report_203.pdf",None,"Official research on the industry including payment systems, where peelers are paid by a share of the harvest and the share differs by area.","search-result")],
 unresolved="Current (2026) peeler numbers and wage rates. The figures above come from different years and must not be presented as a single current picture.",
 access="No contact made. The training academy is an institution and is a realistic first approach; individual peeling households are not.",
 ethics="Low pay and occupational stigma are documented. The stigma is a fact about how the work is regarded; it must never be restated as a judgement about peelers, and no peeler should be asked on camera to comment on their own social standing without preparation and a right to withdraw.")

lead(lead_id="SL-SQ08-001", sq="SQ08", title="Wood, resin and what fits now",
 subject="Fishing households and boatyards choosing between traditional wooden craft and fibreglass hulls",
 place="Coastal fishing settlements and boatyards", district="multiple coastal districts", province="multiple",
 situation="The oru, a single-outrigger dugout, and the theppam are described as the traditional Sri Lankan fishing craft, historically built entirely of wood with coir fastenings. Fibreglass vessels were introduced and became dominant because of lower maintenance, less manpower and better seaworthiness, and fibreglass boatbuilding is now a substantial industry.",
 activity="Boatyard layup and finishing; repair of older wooden craft; launching; the differences in how each hull is handled on a beach.",
 change="A completed transition whose last practitioners may still be working. Whether any wooden craft are still being built, as opposed to maintained, is the research question.",
 candidate_status="unverified-lead", territory="T05",
 primary_idea="C096-I01", supporting_ideas=["C076-I02", "C039-I01"],
 sources=[
  S("S1","heritage/archaeology site","Vernacular Nautical Architecture in transition - AmazingLanka","https://amazinglanka.com/wp/sri-lankan-fishing-craft/",None,"The oru is a dual-element craft of dugout hull, spars and outrigger float, built of wood with coir rope fastenings by choice.","search-result"),
  S("S2","business press","From theppams to fiberglass: the story of a pioneer boat manufacturing company - Daily FT","https://www.ft.lk/Business/From-theppams-to-fiberglass-The-story-of-a-pioneer-boat-manufacturing-company/44-733612",None,"Fibreglass vessels replaced theppams; reasons given are reduced manpower, seaworthiness, higher yield and minimal maintenance against the wood cost and repair burden of traditional craft.","search-result"),
  S("S3","academic record","Records of native craft in Sri Lanka - the single outrigger fishing canoe oruwa","https://www.researchgate.net/publication/228039401_Records_of_native_craft_in_Sri_Lanka-I_The_single_outrigger_fishing_canoe_oruwa-Part_1_Sailing_oru",None,"Scholarly record of sailing oru construction, for checking any claim about traditional method.","search-result")],
 unresolved="No specific builder or settlement has been identified. This is a subject area with good evidence and no located subject, which is why it is not recorded as an evidenced situation.",
 access="No contact made.",
 ethics="Nothing specific identified yet. Fishing communities include people under economic stress; the general safeguards apply.")

lead(lead_id="SL-SQ02-002", sq="SQ02", title="Cut with a thumbnail",
 subject="Lacquer (laksha) workers using the niyapoten veda fingernail technique",
 place="Hapuwida in Matale; Angulmaduwa near Tangalle; Hurikaduwa near Kandy; Pallekanda near Balangoda", district="Matale, Hambantota, Kandy, Ratnapura", province="Central, Southern, Sabaragamuwa",
 situation="Laksha work applies resin from the lac insect to turned wood. In the niyapoten veda technique the lac is drawn out and severed with the thumbnail, and the finished piece is polished with a talipot leaf and coconut oil. Published accounts name Hapuwida in Matale as a village with a handful of remaining artisans, and at least one press piece is titled as being about Sri Lanka's last lacquer workers.",
 activity="Breeding and collecting the lac resin, washing, drying and filtering it; heating; laying colour on a turning piece; severing with the thumbnail; polishing.",
 change="A named technique with a named village and a small, countable number of practitioners.",
 candidate_status="evidenced-situation", territory="T01",
 primary_idea="C065-I01", supporting_ideas=["C073-I03", "C100-I02"],
 sources=[
  S("S1","newspaper","Sri Lanka's Last Lacquer Workers - The Sun (thesun.lk)","https://www.thesun.lk/front_page/AnchorSri-Lankas-Last-Lacquer-Workers/557-304461l",None,"Press treatment of the remaining lacquer workers; to be read in full before any number is used.","search-result"),
  S("S2","craft body","Traditional Laksha Industry in Sri Lanka - Ceylon Handicraft","https://ceylonhandicraft.lk/2021/06/01/traditional-laksha-industry-in-srilanka/","2021-06-01","The lac resin is secreted by an insect, bred on suitable trees, then scraped, washed, dried and filtered; the niyapoten veda technique uses the fingernail, and the piece is polished with a talipot leaf coated in coconut oil.","search-result"),
  S("S3","craft documentation","Documenting Sri Lanka's Traditional Crafts and Artisans - HIDMC","https://www.hidmc.com/blog-posts/documenting-sri-lankas-traditional-crafts-and-artisans",None,"Names Matale-Hapuvida, Tangalle-Angulmaduwa, Kandy-Hurikaduwa and Balangoda-Pallekanda as the main laksha centres.","search-result")],
 unresolved="How many artisans at Hapuwida still work niyapoten veda rather than brush or spray finishing. Not established.",
 access="No contact made.",
 ethics="The 'last practitioner' framing is used by several of these sources. It must be checked rather than adopted, because it is a framing that sells.")

lead(lead_id="SL-SQ03-001", sq="SQ03", title="Deciding which way a rough stone faces",
 subject="Gem cutters working the bow-driven hanaporuwa alongside modern faceting machines",
 place="Ratnapura, including the lapidary shops at Hakamuwa and the Demuwawatha area", district="Ratnapura", province="Sabaragamuwa",
 situation="The hanaporuwa is a bow-driven vertical-lap cutting device described as the traditional Sri Lankan gem-cutting machine. Published accounts report that both hanaporuwa and modern Sri Lankan-made machines are in use in Ratnapura lapidary shops, and that traditional methods remain prized for cabochon cutting of star sapphires. Formal cutting classes are recorded as beginning in the early 1970s at the Gem Bureau in Ratnapura.",
 activity="Orienting a rough stone, dopping, cutting against the lap, the bow's back-and-forth motion, and the moment a star appears or does not.",
 change="Two technologies side by side in the same street, with a specific job that the old one still does better. That is observable rather than nostalgic.",
 candidate_status="evidenced-situation", territory="T02",
 primary_idea="C020-I02", supporting_ideas=["C013-I01", "C073-I03"],
 sources=[
  S("S1","specialist blog","Hanaporuwa (Bow Cutting Machine): a traditional gem cutting technique in ancient Sri Lanka","https://gemnetsrilanka.wordpress.com/2025/03/09/hanaporuwa-bow-cutting-machine-a-traditional-gem-cutting-technique-in-ancient-sri-lanka/","2025-03-09","Description of the hanaporuwa as a bow-driven device with the stone held against a vertical lap spun by drawing the bow.","search-result"),
  S("S2","researcher article","The Modern History of Gemstone Faceting in Sri Lanka - Justin K Prim","https://medium.com/justin-k-prim/the-modern-history-of-gemstone-faceting-in-sri-lanka-c394a5a504c3",None,"A government cutting programme was proposed in 1939 but classes were not offered until the early 1970s at the Gem Bureau in Ratnapura under Badra Marapana, combining Sri Lankan, Japanese and European methods; Hakamuwa lapidary shops use both modern machines and hanaporuwa.","search-result"),
  S("S3","specialist blog","Ratnapura - Demuwawatha traditional gem cutting","https://gemnetsrilanka.wordpress.com/2018/10/03/ratnapura-demuwawatha-traditional-gem-cutting/","2018-10-03","Location-specific account of traditional cutting at Demuwawatha.","search-result")],
 unresolved="Whether a working cutter will let the orientation decision be filmed. It is the commercially sensitive moment in the trade, and refusal is likely.",
 access="No contact made.",
 ethics="The gem trade involves money and valuation. Nothing about a stone's worth should be filmed in a way that could expose a cutter or an owner, and mining labour is a separate subject with its own risks that must not be folded in casually.")

lead(lead_id="SL-SQ02-003", sq="SQ02", title="Five hundred carvings nobody has time to look at",
 subject="The carved wooden pillars of the Embekke Devalaya and the carvers working in the surrounding area",
 place="Embekke, near Gadaladeniya", district="Kandy", province="Central",
 situation="The Embekke Devalaya is a 14th-century shrine whose wooden pillars carry several hundred distinct carvings, widely described as among the finest wood carving in the country. Visitors pass through quickly. Whether a living carving practice continues in the surrounding villages was NOT established by the research done so far.",
 activity="Not established. Any filmable activity depends on finding working carvers, which has not been done.",
 change="None established.",
 candidate_status="unverified-lead", territory="T01",
 primary_idea="C013-I01", supporting_ideas=["C009-I01"],
 sources=[
  S("S1","archaeology site","Embekke Devalaya - an icon of Sri Lankan wood carvings - archaeology.lk","https://www.archaeology.lk/embekke-devalaya-wood-carvings/",None,"The shrine and its carvings; 14th century, under King Wickramabahu III.","search-result"),
  S("S2","reference","Embekka Devalaya - Wikipedia","https://en.wikipedia.org/wiki/Embekka_Devalaya",None,"Dedicated to Kataragama Deviyo, in the Kandy District, noted for wooden carvings.","search-result"),
  S("S3","encyclopaedia entry","Wood Carving and Wooden Architecture of Sri Lanka - Asia InCH","https://asiainch.org/craft/wood-carving-wooden-architecture/",None,"General account of Sri Lankan wood-carving transmission; does not establish current practice at Embekke.","search-result")],
 unresolved="Whether any carver near Embekke works in this tradition today. The search returned nothing on current apprenticeship at the site. Without that, this is a monument, not a documentary.",
 access="No contact made. The shrine is an active place of worship under archaeological protection; filming needs permission from both.",
 ethics="An active shrine. Worshippers are not scenery.")

lead(lead_id="SL-SQ21-003", sq="SQ21", title="The looms are still there",
 subject="Family handloom workshops, including those in the Thalagune weaving tradition, after the 2022 economic crisis",
 place="Handloom districts including Kurunegala and the Thalagune tradition areas", district="Kurunegala and others", province="North Western and others",
 situation="Press reporting describes small handloom factories and family-run businesses closing after the Covid period and the financial crisis when loan repayments became unmanageable, skilled weavers migrating abroad, experienced craftsmen retiring, and businesses operating at a fraction of previous capacity while demand remains. Sri Lankan weaving is described as divided between the Thalagune and migrant weaving traditions.",
 activity="Warping, threading, treadle weaving, dyeing; idle looms in the same room as working ones.",
 change="Documented closures and labour loss with a documented cause, and a documented gap between demand and capacity.",
 candidate_status="evidenced-situation", territory="T13",
 primary_idea="C066-I03", supporting_ideas=["C001-I01", "C100-I02"],
 sources=[
  S("S1","news feature","Sri Lanka's artisanal heritage on the brink: small-scale industries struggle against modernisation, economic challenges - The Morning","https://www.themorning.lk/articles/C4HknAWB2n6WMSCEDtuK",None,"Small handloom and family businesses shut after crisis-period debt; lack of financial support and market access.","search-result"),
  S("S2","news feature","Sri Lankan handloom: high potential, no vision - The Morning","https://www.themorning.lk/articles/fbABGI0DdNGYzR0bPvcj",None,"Weaver migration has produced a labour shortage and low production despite high demand; experienced craftsmen retiring.","search-result"),
  S("S3","trade body","The Traditional Handloom Industry in Sri Lanka - Sri Lanka Export Development Board","https://www.srilankabusiness.com/blog/handloom-industry-in-sri-lanka.html",None,"Official sector description including the Department of Textile Industries' role in yarn supply, training and export access.","search-result")],
 unresolved="No individual workshop has been identified. The Thalagune tradition is described in trade sources in terms that need checking against scholarship.",
 access="No contact made. The Department of Textile Industries is a route to workshops and is an institution rather than an individual.",
 ethics="Business failure and debt. People must not be asked to discuss their debts on camera without a clear and separate agreement.")

lead(lead_id="SL-SQ01-002", sq="SQ01", title="What the rope is made of",
 subject="Coir fibre and rope work in the Kalutara coastal villages",
 place="Pohaddaramulla, Waskaduwa, Narampitiyawa, Pothupitiya and Panadura", district="Kalutara", province="Western",
 situation="Coir craft is documented in these named Kalutara villages. Sector sources describe coir as a long-established cottage industry, with spinning and weaving employing large numbers regionally, many of them women working part-time, alongside about 10,000 direct and 20,000 indirect jobs in the Sri Lankan coir sector.",
 activity="Retting, beating and cleaning fibre, spinning yarn, twisting rope, drying yards; the difference between hand work and mill work in the same district.",
 change="Not established as a current event. The live question is what share of the work is still done by hand and by whom.",
 candidate_status="evidenced-situation", territory="T01",
 primary_idea="C040-I01", supporting_ideas=["C009-I01", "C032-I02"],
 sources=[
  S("S1","encyclopaedia entry","Mat weaving and other rush-ware, fibre-ware and leaf crafts of Sri Lanka - Global InCH","https://www.globalinch.org/craft/mat-weaving-other-rush-ware-fibre-ware-leaf-crafts/",None,"Coir craft in the Kalutara district in the villages of Pohaddaramulla, Waskaduwa, Narampitiyawa, Pothupitiya and Panadura.","search-result"),
  S("S2","government sector overview","Sector overview: coir and coir-based products - Ministry of Industry","https://www.industry.gov.lk/web/wp-content/uploads/2023/03/Sector-overview-coir-and-coir-based-products-sector.pdf","2023-03","Official sector overview of coir and coir-based products.","search-result"),
  S("S3","trade body","Coconut Coir Products from Sri Lanka - Sri Lanka Export Development Board","https://www.srilankabusiness.com/coconut/coconut-fibre-products.html",None,"Coir has been a major cottage industry for centuries; products include twines, ropes, mats, brushes and geotextiles.","search-result")],
 unresolved="Whether hand rope-twisting still happens in these villages or has moved entirely to mills. Not established. Employment figures come from mixed regional sources and must not be attributed to one village.",
 access="No contact made.",
 ethics="Retting work is wet, low-paid and often women's work. It must not be filmed as texture for a sequence about something else.")

lead(lead_id="SL-SQ10-004", sq="SQ10", title="The recipe that cannot tell you when",
 subject="Holders of paramparika vedakama family medical lineages and the ola-leaf prescription manuscripts they keep",
 place="Not established; lineages are described as dispersed and often remote", district="not established", province="not established",
 situation="Published accounts describe traditional medical knowledge transmitted within families through prescriptions written on ola-leaf manuscripts, much of it undocumented, held in the custody of practitioners. One account describes a practitioner as the 22nd generation of the Kottayawatta medical lineage. The Bhesajja Manjusa manuscript held at the Ayurveda Research Institute, Maharagama entered the UNESCO Memory of the World national register in 2016.",
 activity="Reading and handling manuscripts; preparing medicines; the consultation itself, where the judgement that the text cannot carry is exercised.",
 change="Not established. Whether a given lineage is about to end is precisely the kind of claim that must not be assumed in order to create urgency.",
 candidate_status="unverified-lead", territory="T05",
 primary_idea="C096-I01", supporting_ideas=["C073-I03", "C100-I02"],
 sources=[
  S("S1","peer-reviewed journal","Sri Lankan medical manuscripts: an untapped source of Ayurvedic research - PMC","https://pmc.ncbi.nlm.nih.gov/articles/PMC3336587/",None,"Palm-leaf manuscripts are the literary source of indigenous medicine and are preserved in the custody of traditional practitioners; much family knowledge remains undocumented.","search-result"),
  S("S2","cultural archive","Hela Weda Mahima: the glory of indigenous medicine in Sri Lanka - Google Arts and Culture / ICHCAP","https://artsandculture.google.com/story/hela-weda-mahima-the-glory-of-indigenous-medicine-in-sri-lanka-ichcap/aAVxCNJK9sDILw?hl=en",None,"Knowledge transferred generation to generation through prescriptions on ola-leaf manuscripts; remote holders of rare paramparika wedakama knowledge.","search-result"),
  S("S3","clinic's own site","Sandun Hela Paramparika Rohala - about us","https://jeewaayus.lk/about-us/",None,"A practitioner's own claim to be the 22nd generation of the Kottayawatta medical lineage. This is a self-description on a commercial site and is recorded here as a claim, not a fact.","search-result")],
 unresolved="The 22-generation claim is self-reported on a clinic website and is not independently corroborated. No lineage holder has been identified who would be willing to be filmed.",
 access="No contact made.",
 ethics="Medical claims. Nothing about treatment or efficacy may be presented as established, patients must never be filmed in consultation without their own separate consent, and the project must not function as advertising for a practice.")

lead(lead_id="SL-SQ24-001", sq="SQ24", title="The mask that is allowed to say it",
 subject="Kolam and Sokari folk theatre, in which masked performance carries social criticism within a village that knows everyone",
 place="Southern coastal districts for Kolam; upland areas for Sokari", district="not established", province="Southern and Central",
 situation="Published accounts describe Kolam as once very popular and now infrequently performed, and Sokari as still performed on rare occasions mostly in mountainous areas. Sokari is described as a vehicle for social criticism, including of caste hierarchy and ethnic relations.",
 activity="Not established for any current troupe. Any filming depends on locating a performance, which has not been done.",
 change="None established.",
 candidate_status="direction", territory="T14",
 primary_idea="C091-I03", supporting_ideas=["C086-I02", "C009-I01"],
 sources=[
  S("S1","scholarly essay","Kolam, Sokari and Nadagam theatre in Sri Lanka - A.J. Gunawardana","https://theatreroomasia.com/wp-content/uploads/2013/09/kolam-sakari-and-nadagan-theater-in-sri-lanka.pdf",None,"Scholarly account of the three folk theatre forms.","search-result"),
  S("S2","overview article","Sokari, Kolam and Nadagam - the living folk theatre of Sri Lanka","https://slvoyo.com/sokari-kolam-and-nadagam-the-living-folk-theatre-of-sri-lanka/",None,"Sokari serves as a medium for social criticism including caste hierarchy and ethnic relations; Kolam is infrequently performed now; Sokari is performed rarely, mostly in mountainous areas.","search-result")],
 unresolved="No troupe, village or scheduled performance has been identified. This is a research direction, not a lead to a subject.",
 access="No contact made.",
 ethics="Caste is explicitly part of Sokari's content. The repository's rules forbid carrying forward caste claims, and a form whose content is caste satire cannot be filmed without a worked-out position on that, agreed with the performers.")

out = os.path.join(D, "leads.json")
existing = json.load(open(out)) if os.path.exists(out) else []
have = {x["lead_id"] for x in existing}
added = [x for x in L if x["lead_id"] not in have]
existing.extend(added)
json.dump(existing, open(out, "w"), indent=1, ensure_ascii=False)
print("batch leads:", len(L), "added:", len(added), "total:", len(existing))
