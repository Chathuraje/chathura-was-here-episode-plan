import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const analysisDir = path.dirname(fileURLToPath(import.meta.url));
const developmentDir = path.dirname(analysisDir);

function readDirectory(directory) {
  return fs.readdirSync(path.join(developmentDir, directory))
    .filter((name) => name.endsWith(".json"))
    .sort()
    .map((name) => JSON.parse(fs.readFileSync(path.join(developmentDir, directory, name), "utf8")));
}

const groups = readDirectory("groups").sort((a, b) => a.chronological_position - b.chronological_position);
const episodes = readDirectory("episodes").sort((a, b) => a.chronology.global_position - b.chronology.global_position);
const digests = readDirectory("digests");
const digestByConcept = new Map(digests.map((digest) => [digest.concept_id, digest]));
const episodeById = new Map(episodes.map((episode) => [episode.id, episode]));

const statusDefinitions = {
  missing: "The current slate provides no meaningful encounter with the concept or mechanism.",
  surface_only: "The idea is present mainly as image, theme, label, or analogy; a viewer is unlikely to reconstruct the mechanism.",
  introduced: "The sequence gives the viewer a legible first definition or distinction, but does not yet develop it cumulatively.",
  built: "More than one step, contrast, or application actively develops viewer understanding.",
  integrated: "The teaching is built and then connected to earlier or later systems so it participates in a larger Abhidhamma mental model.",
  dangerously_compressed: "The current narrative space carries more doctrinal structure than a viewer can reasonably make legible from the sequence.",
};

const statusIds = {
  integrated: ["C001", "C002", "C019", "C032", "C034", "C038", "C039", "C073", "C084"],
  built: [
    "C004", "C005", "C006", "C007", "C008", "C016", "C021", "C022", "C023", "C024", "C025", "C026",
    "C033", "C035", "C036", "C040", "C041", "C047", "C051", "C057", "C058", "C061", "C063",
    "C064", "C066", "C068", "C072", "C078", "C079", "C083", "C086", "C095", "C098", "C099",
  ],
  introduced: [
    "C003", "C009", "C020", "C027", "C029", "C037", "C042", "C043", "C046", "C048", "C050",
    "C065", "C070", "C071", "C087", "C091", "C092", "C093", "C094",
  ],
  surface_only: ["C010", "C052", "C059", "C067", "C069", "C089", "C090", "C101"],
  dangerously_compressed: [
    "C011", "C012", "C013", "C014", "C015", "C017", "C018", "C028", "C030", "C031", "C044",
    "C045", "C049", "C053", "C054", "C055", "C056", "C060", "C062", "C074", "C075", "C076",
    "C077", "C080", "C081", "C082", "C085", "C088", "C096", "C097", "C100", "C102",
  ],
};

const statusByConcept = new Map(Object.entries(statusIds).flatMap(([status, ids]) => ids.map((id) => [id, status])));

const mechanismDefinitions = [
  {
    id: "MECH-01", name: "Conventional vs ultimate reality",
    summary: "Separates useful names and concepts from the ultimate events or realities they designate.",
    concept_ids: ["C001", "C084"], status: "integrated", review_priority: "low",
    milestones: { first: "EPD-0001", development: ["EPD-0002", "EPD-0004", "EPD-0005", "EPD-0007"], integration: ["EPD-0008", "EPD-0039", "EPD-0063", "EPD-0084"], recall: ["EPD-0098"] },
    viewer: "The viewer can understand that a useful name is not an extra reality, and can reuse that distinction when looking at perception, body, continuity, and the unconditioned.",
    risk: "The early films are strong, but later recalls depend on the reviewer preserving the distinction instead of reducing it to 'nothing is real'.",
  },
  {
    id: "MECH-02", name: "The four ultimate realities",
    summary: "Uses mind, mental factors, matter, and Nibbāna as the organising map for the whole series.",
    concept_ids: ["C002", "C073"], status: "integrated", review_priority: "medium",
    milestones: { first: "EPD-0003", development: ["EPD-0005", "EPD-0007", "EPD-0009", "EPD-0019", "EPD-0028", "EPD-0043", "EPD-0051", "EPD-0060"], integration: ["EPD-0098"], recall: [] },
    viewer: "The viewer can place the long middle of the series inside a four-part map and recognise Nibbāna as the deliberately delayed fourth reality.",
    risk: "The map is structurally elegant, but the bridge from the three conditioned realities to the fourth depends heavily on Group 10.",
  },
  {
    id: "MECH-03", name: "Citta classification",
    summary: "Classifies consciousness by ethical quality, sphere, function, roots, result, and level of absorption.",
    concept_ids: ["C003", "C004", "C005", "C006", "C007", "C008", "C009", "C010", "C011", "C012", "C013", "C014", "C015", "C016", "C017", "C018", "C028", "C030", "C031", "C050"],
    status: "dangerously_compressed", review_priority: "high",
    milestones: { first: "EPD-0003", development: ["EPD-0009", "EPD-0019", "EPD-0028", "EPD-0038", "EPD-0048"], integration: ["EPD-0076", "EPD-0093"], recall: ["EPD-0098"] },
    viewer: "The viewer can understand that consciousness is not one uniform thing and can distinguish several major families, but is unlikely to retain the 121-fold architecture or how all classification axes fit together.",
    risk: "The whole map is announced early, while several large classes receive only one film each and the final supramundane expansion arrives in an already crowded group.",
  },
  {
    id: "MECH-04", name: "Cetasika / mental factors",
    summary: "Shows mind as consciousness accompanied by changing teams of universal, occasional, unwholesome, and beautiful factors.",
    concept_ids: ["C002", "C019", "C020", "C021", "C022", "C023", "C024", "C025", "C026", "C027", "C028", "C029", "C030", "C031", "C032", "C033"],
    status: "integrated", review_priority: "low",
    milestones: { first: "EPD-0003", development: ["EPD-0013", "EPD-0019", "EPD-0021", "EPD-0024", "EPD-0043", "EPD-0051", "EPD-0055"], integration: ["EPD-0056", "EPD-0057"], recall: ["EPD-0089"] },
    viewer: "The viewer can understand that a mind-state is assembled from factors, distinguish neutral factors from ethical ones, and see why wholesome and unwholesome minds feel and act differently.",
    risk: "The broad architecture is strong; the exact factor-by-mind matrices remain much more compressed than the experiential distinctions.",
  },
  {
    id: "MECH-05", name: "Wholesome vs unwholesome mind structure",
    summary: "Builds greed, hatred, and delusion and their associated factors before contrasting them with beautiful factors and good action.",
    concept_ids: ["C005", "C006", "C007", "C008", "C011", "C019", "C021", "C022", "C023", "C024", "C026", "C027", "C028", "C030", "C033", "C074", "C075"],
    status: "integrated", review_priority: "low",
    milestones: { first: "EPD-0009", development: ["EPD-0019", "EPD-0028", "EPD-0031", "EPD-0048", "EPD-0051"], integration: ["EPD-0054", "EPD-0072"], recall: ["EPD-0094"] },
    viewer: "The viewer can understand harmful and beautiful states as differently composed events rather than fixed character traits, and can see intention and attention as changing their quality.",
    risk: "Exact enumerations are weaker than the lived contrast, so the slate should preserve experiential clarity rather than imply the full matrices have been taught.",
  },
  {
    id: "MECH-06", name: "Feeling, contact, and craving sequence",
    summary: "Connects sensory contact and feeling tone to the arising of wanting, then places that sequence inside dependent origination.",
    concept_ids: ["C020", "C032", "C079", "C080", "C081"], status: "integrated", review_priority: "low",
    milestones: { first: "EPD-0010", development: ["EPD-0011", "EPD-0015", "EPD-0043"], integration: ["EPD-0081", "EPD-0084"], recall: [] },
    viewer: "The viewer can understand that every experience has a feeling tone and that pleasant feeling can become craving rather than treating wanting as an unexplained personality flaw.",
    risk: "The causal link is distributed across Groups 2, 5, and 9; the later review must make the recall explicit enough to feel cumulative.",
  },
  {
    id: "MECH-07", name: "Cognitive process (vīthi)",
    summary: "Turns apparently continuous seeing, remembering, choosing, dying, and absorption into ordered sequences of mind-moments.",
    concept_ids: ["C009", "C010", "C025", "C029", "C034", "C038", "C039", "C040", "C041", "C042", "C043", "C044", "C045", "C046", "C047", "C048", "C062", "C099", "C100", "C101", "C102"],
    status: "integrated", review_priority: "low",
    milestones: { first: "EPD-0007", development: ["EPD-0036", "EPD-0038", "EPD-0040", "EPD-0041", "EPD-0044", "EPD-0046", "EPD-0047"], integration: ["EPD-0062", "EPD-0075", "EPD-0089", "EPD-0092"], recall: ["EPD-0097"] },
    viewer: "The viewer can understand that seeing is a conditioned sequence rather than one continuous act, and can recognise the same process logic in memory, death, absorption, and path moments.",
    risk: "Group 5 teaches the core well, but later specialised processes are too brief to carry the same level of legibility.",
  },
  {
    id: "MECH-08", name: "Six doors, objects, bases, and functions",
    summary: "Coordinates where experience enters, what is known, the bodily support involved, and the function each mind performs.",
    concept_ids: ["C034", "C035", "C036", "C037", "C040", "C041", "C044", "C045", "C046", "C047", "C048", "C050", "C062", "C063", "C064", "C065", "C067", "C077"],
    status: "integrated", review_priority: "medium",
    milestones: { first: "EPD-0006", development: ["EPD-0036", "EPD-0039", "EPD-0040", "EPD-0041", "EPD-0045"], integration: ["EPD-0062", "EPD-0075", "EPD-0076"], recall: [] },
    viewer: "The viewer can understand that each sensory door takes a limited kind of object and that a sequence of distinct functions turns contact into an experienced event.",
    risk: "The core coordination is good, but the complete fourteen-function map and the plane-specific availability of doors remain compressed.",
  },
  {
    id: "MECH-09", name: "Javana / response point",
    summary: "Locates ethical response in impulsion after neutral sensory processing, without inventing a controller outside the process.",
    concept_ids: ["C005", "C021", "C025", "C034", "C038", "C041"], status: "built", review_priority: "medium",
    milestones: { first: "EPD-0040", development: ["EPD-0044", "EPD-0046", "EPD-0047"], integration: ["EPD-0049", "EPD-0073"], recall: ["EPD-0092"] },
    viewer: "The viewer can understand that sensing is ethically neutral up to a point and that response is conditioned but consequential at impulsion.",
    risk: "The idea is a hinge of the series but the term and its later applications may be too easy to lose after Group 5.",
  },
  {
    id: "MECH-10", name: "Rūpa / body / matter",
    summary: "Treats the body as conditioned material events rather than a single owned thing.",
    concept_ids: ["C002", "C037", "C039", "C063", "C064", "C065", "C066", "C067", "C068", "C069", "C070", "C071", "C072", "C093", "C094"],
    status: "integrated", review_priority: "low",
    milestones: { first: "EPD-0005", development: ["EPD-0037", "EPD-0058", "EPD-0060", "EPD-0062", "EPD-0064"], integration: ["EPD-0065", "EPD-0066"], recall: ["EPD-0085"] },
    viewer: "The viewer can understand the body as multiple kinds and streams of matter, dependent on mind, kamma, temperature, and nutriment, with decay built in.",
    risk: "The experiential body arc is strong; several classification subtopics appear only once and should not be mistaken for fully taught taxonomies.",
  },
  {
    id: "MECH-11", name: "Four great elements",
    summary: "Presents hardness, cohesion, temperature, and motion as inseparable material qualities in changing proportions.",
    concept_ids: ["C064"], status: "built", review_priority: "low",
    milestones: { first: "EPD-0060", development: ["EPD-0062", "EPD-0065"], integration: ["EPD-0066"], recall: [] },
    viewer: "The viewer can understand that material bodies are configurations of qualities that occur together, not collections of four separable substances.",
    risk: "Later episodes must preserve the qualities framing; otherwise the kiln analogy can harden into a literal four-substance model.",
  },
  {
    id: "MECH-12", name: "Material groups and origins of matter",
    summary: "Explains that matter arises in groups and through kamma, mind, temperature, and nutriment across a life.",
    concept_ids: ["C066", "C068", "C069", "C070", "C071", "C072"], status: "built", review_priority: "medium",
    milestones: { first: "EPD-0058", development: ["EPD-0059", "EPD-0060", "EPD-0061", "EPD-0064"], integration: ["EPD-0065", "EPD-0066"], recall: ["EPD-0085"] },
    viewer: "The viewer can understand that the body is continuously produced by several conditions and that material events do not arise one at a time in isolation.",
    risk: "The four origins become legible, but which material kinds arise from each origin and the group taxonomy remain only lightly supported.",
  },
  {
    id: "MECH-13", name: "Kamma and vipāka",
    summary: "Separates intentional action from fate and distinguishes results by function, weight, timing, and ethical quality.",
    concept_ids: ["C012", "C055", "C056", "C057", "C058", "C059", "C061", "C078", "C082", "C083"],
    status: "built", review_priority: "medium",
    milestones: { first: "EPD-0052", development: ["EPD-0067", "EPD-0070", "EPD-0072", "EPD-0073", "EPD-0075"], integration: ["EPD-0078", "EPD-0080"], recall: [] },
    viewer: "The viewer can understand kamma as intention with differently timed and conditioned results, and can see that later action can support, obstruct, or counter earlier action.",
    risk: "The central correction to fate is clear, but function and priority classifications each receive too little narrative space for confident recall.",
  },
  {
    id: "MECH-14", name: "Death process and rebirth-linking",
    summary: "Frames dying and a new beginning as causally connected processes with no entity travelling between lives.",
    concept_ids: ["C034", "C049", "C053", "C054", "C060", "C061", "C062", "C071", "C072"], status: "built", review_priority: "medium",
    milestones: { first: "EPD-0067", development: ["EPD-0069", "EPD-0074", "EPD-0075", "EPD-0078"], integration: ["EPD-0084"], recall: ["EPD-0097"] },
    viewer: "The viewer can understand continuity without a traveller: the last process conditions a new beginning that is neither the same life nor unrelated to it.",
    risk: "The no-traveller principle is repeated well, while the exact death and rebirth-linking classifications are compressed into individual films.",
  },
  {
    id: "MECH-15", name: "Planes of existence",
    summary: "Maps sense, fine-material, immaterial, and supramundane ranges and the kinds of mind available in them.",
    concept_ids: ["C003", "C013", "C014", "C015", "C050", "C051", "C052", "C053", "C054"], status: "dangerously_compressed", review_priority: "high",
    milestones: { first: "EPD-0068", development: ["EPD-0069", "EPD-0071", "EPD-0076"], integration: ["EPD-0089", "EPD-0090"], recall: [] },
    viewer: "The viewer can understand that the source system posits different planes with different available modes of mind, but not how the full cosmological and citta maps correspond.",
    risk: "Several plane and rebirth-linking classifications are each carried by one episode, while their relation to jhāna arrives much later and under heavy load.",
  },
  {
    id: "MECH-16", name: "Dependent origination",
    summary: "Re-reads earlier groups as a conditioned chain from ignorance through contact, feeling, craving, becoming, birth, ageing, and death.",
    concept_ids: ["C005", "C007", "C008", "C032", "C038", "C061", "C063", "C074", "C078", "C079", "C080", "C081"], status: "dangerously_compressed", review_priority: "high",
    milestones: { first: "EPD-0081", development: ["EPD-0082", "EPD-0084"], integration: ["EPD-0086"], recall: ["EPD-0094"] },
    viewer: "The viewer can recognise 'because of this, that' and connect several earlier experiences, but is unlikely to reconstruct the twelve links, periods, connections, rounds, and roots from the present sequence.",
    risk: "The mechanism is asked to integrate eight prior groups in only a few films, and C080's link meanings are concentrated in one episode.",
  },
  {
    id: "MECH-17", name: "Conditions / Paṭṭhāna",
    summary: "Distinguishes multiple ways one event can support another, rather than treating all causation as one simple chain.",
    concept_ids: ["C033", "C075", "C078", "C082", "C083"], status: "dangerously_compressed", review_priority: "high",
    milestones: { first: "EPD-0079", development: ["EPD-0080", "EPD-0083", "EPD-0085"], integration: ["EPD-0086"], recall: [] },
    viewer: "The viewer may understand that causes work in different ways and that mutual and external supports matter, but the twenty-four-condition logic is not yet reconstructable.",
    risk: "Agricultural and structural analogies multiply, yet the current sequence does not differentiate enough of the twenty-four conditions to justify calling the system taught.",
  },
  {
    id: "MECH-18", name: "Samatha",
    summary: "Presents calm as trained stabilisation through suitable meditation subjects, recollections, sublime abidings, and absorption.",
    concept_ids: ["C085", "C087", "C088", "C089", "C090", "C091", "C092", "C093", "C094", "C095"], status: "introduced", review_priority: "medium",
    milestones: { first: "EPD-0053", development: ["EPD-0054", "EPD-0059", "EPD-0063", "EPD-0077", "EPD-0088"], integration: ["EPD-0089", "EPD-0090"], recall: ["EPD-0096"] },
    viewer: "The viewer can understand that calm practice has different objects suited to different people and that steadiness supports clearer seeing.",
    risk: "Practices are distributed across four groups, but their shared samatha architecture is not explicitly consolidated before the rapid Group 10 ascent.",
  },
  {
    id: "MECH-19", name: "Vipassanā",
    summary: "Moves from direct contemplation of mind and matter toward insight, purification, and release.",
    concept_ids: ["C001", "C077", "C093", "C094", "C096", "C097"], status: "dangerously_compressed", review_priority: "high",
    milestones: { first: "EPD-0059", development: ["EPD-0063", "EPD-0088", "EPD-0091"], integration: ["EPD-0092", "EPD-0094"], recall: ["EPD-0098"] },
    viewer: "The viewer can understand that insight examines conditioned mind and matter and depends on conduct and steadiness, but cannot yet follow the insight knowledges or seven-purification progression.",
    risk: "The central liberating method receives two explicit Group 10 films while large maps of insight and purification are carried almost entirely by one of them.",
  },
  {
    id: "MECH-20", name: "Jhāna",
    summary: "Builds absorption as sustained attention that simplifies through mastered levels and conditions later capacities.",
    concept_ids: ["C013", "C014", "C015", "C031", "C075", "C085", "C087", "C088", "C089", "C099"], status: "built", review_priority: "high",
    milestones: { first: "EPD-0076", development: ["EPD-0088", "EPD-0089", "EPD-0090"], integration: ["EPD-0093", "EPD-0096", "EPD-0097"], recall: [] },
    viewer: "The viewer can understand absorption as trained, sustained, progressively simplified attention rather than a mystical mood.",
    risk: "The experiential progression works, but fine-material and immaterial citta classifications, factors, and processes are stacked into very few films.",
  },
  {
    id: "MECH-21", name: "Path and fruition",
    summary: "Distinguishes the path moment that uproots from fruition and from temporary suppression, across stages of noble personhood.",
    concept_ids: ["C016", "C017", "C075", "C076", "C097", "C098", "C100"], status: "dangerously_compressed", review_priority: "high",
    milestones: { first: "EPD-0087", development: ["EPD-0092", "EPD-0093", "EPD-0094", "EPD-0095"], integration: ["EPD-0098"], recall: [] },
    viewer: "The viewer can distinguish letting go from standing in the result and suppression from uprooting, but is unlikely to understand the full path/fruition process and four-stage architecture.",
    risk: "Several advanced maps converge in six films immediately before Nibbāna, with C100's process confined to one episode.",
  },
  {
    id: "MECH-22", name: "Nibbāna",
    summary: "Completes the opening map with the unconditioned fourth ultimate, described as neither a feeling nor a place nor something constructed.",
    concept_ids: ["C002", "C016", "C073", "C098", "C100", "C102"], status: "integrated", review_priority: "medium",
    milestones: { first: "EPD-0003", development: ["EPD-0087", "EPD-0097", "EPD-0098"], integration: ["EPD-0098"], recall: [] },
    viewer: "The viewer can understand Nibbāna as unconditioned and uncovered rather than manufactured, and can recognise it as the delayed completion of Group 1's map.",
    risk: "The bookend is strong, but the path/fruition and insight architecture immediately before it is compressed enough to weaken how the viewer understands the arrival.",
  },
];

const groupAnalysis = {
  "GRP-01": {
    status: "built", review_priority: "medium",
    strong: ["Conventional vs ultimate reality is developed through names, time, parts, absence, perception, and personhood.", "The four-ultimate map gives the full slate a clear opening promise."],
    weak: ["The 121-citta map is announced faster than a viewer can organise it.", "The all-things compendium bundles aggregates, bases, elements, and truths without a progressive internal map."],
    learns: "The viewer can separate a name from what is present and begin to see experience as passing mind-and-matter events rather than one solid person or thing.",
    risks: ["C018 and C077 carry large catalogues inside an otherwise lucid experiential arc."],
    recommendation: "Preserve the name/thing progression; review whether the map episode promises more classification knowledge than later films actually recall.",
  },
  "GRP-02": {
    status: "built", review_priority: "low",
    strong: ["Wanting is differentiated by feeling tone, prompting, view, aim, effort, and desire-to-act.", "Repeated ordinary situations make distinctions cumulative rather than merely symbolic."],
    weak: ["The complete 54 sense-sphere classification remains background rather than a viewer-held structure."],
    learns: "The viewer can understand that pleasant or neutral feeling can condition wanting, and that the wish to act is not automatically greed.",
    risks: ["Do not let the strong greed sequence imply that every desire-to-act is ethically unwholesome."],
    recommendation: "Likely adequate; preserve the contrasts and the bridge from feeling to later contact/process teaching.",
  },
  "GRP-03": {
    status: "built", review_priority: "low",
    strong: ["Anger, fear, stinginess, wrong view, conceit, prompting, and dullness are progressively differentiated.", "The sequence makes aversion's immediate suffering legible."],
    weak: ["The full factor make-up of all twelve unwholesome minds is not reconstructable from the final two films."],
    learns: "The viewer can understand resistance as a family of differently composed states, always painful at the hate-rooted core.",
    risks: ["C028 risks implying completion of a matrix that the films only sample."],
    recommendation: "Likely adequate at mechanism level; label the exact twelve-mind matrix as compressed during review.",
  },
  "GRP-04": {
    status: "introduced", review_priority: "high",
    strong: ["Doubt and restlessness become experientially distinct.", "The six roots and temperament idea prepare a non-fixed account of why people struggle differently."],
    weak: ["The defilement compendium's taints, floods, bonds, clingings, hindrances, tendencies, and fetters remain mostly vocabulary.", "Root-at-birth person types receive one film and carry sensitive doctrinal implications."],
    learns: "The viewer can recognise confusion as unsettled mind and see that harmful patterns can lie latent and recur under conditions.",
    risks: ["The group changes from lived confusion to several classification systems faster than it integrates them."],
    recommendation: "Needs review: retain the doubt/restlessness arc, but test whether C049 and C074 are understandable rather than merely named.",
  },
  "GRP-05": {
    status: "integrated", review_priority: "low",
    strong: ["Doors, objects, intensity, turning, mind-door recall, universal factors, full process, and javana form a real progressive sequence.", "The group converts an everyday claim such as 'I see' into an ordered mechanism."],
    weak: ["Special cases for great, slight, and very slight objects and the exact rootless-factor matrix receive single-film treatment."],
    learns: "The viewer can understand that seeing is a conditioned sequence, that names and values arrive after bare sensory contact, and that response occurs within the process without a controller outside it.",
    risks: ["The core is strong enough that peripheral classifications may look equally taught even when they are not."],
    recommendation: "Strong cumulative teaching; preserve this group's ordering and use it as the benchmark for later mechanism-building.",
  },
  "GRP-06": {
    status: "built", review_priority: "low",
    strong: ["Beautiful factors are shown as a team through refusal, joy, softness, calm, compassion, and balance.", "Compassion and sympathetic joy are distinguished rather than blended."],
    weak: ["Eight wholesome/resultant mind classifications and complete factor matrices are compressed."],
    learns: "The viewer can understand goodness as a differently composed mind with lightness, flexibility, restraint, and care, not just as a moral label.",
    risks: ["Kamma-result language begins here but is not fully explained until Group 8."],
    recommendation: "Likely adequate; preserve the factor-team logic and explicitly hand its result question to Group 8.",
  },
  "GRP-07": {
    status: "built", review_priority: "medium",
    strong: ["Matter, elements, origins, life-stream, decay, death, body contemplation, and breathing make a coherent vulnerability arc.", "The four origins are applied to concrete bodily functions rather than merely listed."],
    weak: ["The five objects, matter classifications, origin-by-kind mapping, and material-group taxonomy each receive limited support."],
    learns: "The viewer can understand the body as a continuously conditioned material process, always grouped, supported, changing, and already decaying.",
    risks: ["Several one-film classifications sit inside a very strong experiential body story and can be mistaken for full coverage."],
    recommendation: "Preserve the arc; review single-appearance material taxonomies and the bridge from material cessation to Group 8's mental continuity.",
  },
  "GRP-08": {
    status: "built", review_priority: "high",
    strong: ["Continuity without a traveller, timing of results, opposed action, intention, bedside conditions, and death recollection form a meaningful sequence.", "The group repeatedly resists fatalism."],
    weak: ["Planes, rebirth-linking types, kamma functions and priority, causes of death, and near-death process are often one-film classifications."],
    learns: "The viewer can understand kamma as intention and conditioned result, and rebirth as causal continuity rather than a person moving between lives.",
    risks: ["Fourteen concepts compete inside twelve films; the central mechanism is built, but many taxonomies are not."],
    recommendation: "Needs careful review: preserve the no-traveller and not-fate spine, and mark the surrounding classifications as introductions unless later films recall them.",
  },
  "GRP-09": {
    status: "dangerously_compressed", review_priority: "high",
    strong: ["The group attempts the right structural move: earlier groups become one conditioned story.", "Short/long causal accounts, mutual support, external support, and cessation introduce different causal shapes."],
    weak: ["The twelve-link meanings and structural analysis are concentrated in very few films.", "Twenty-four conditions are represented mainly through analogies and are not individually or systematically differentiable."],
    learns: "The viewer can understand that nothing stands alone and that removing support changes what can continue, but cannot yet reconstruct dependent origination or Paṭṭhāna as systems.",
    risks: ["The group can feel profound while leaving the mechanism below the understanding level.", "C075 adds another large compendium to an eight-film group."],
    recommendation: "Highest-priority mechanism review: test every episode against what causal distinction the viewer can state afterwards.",
  },
  "GRP-10": {
    status: "dangerously_compressed", review_priority: "high",
    strong: ["Calm, insight, jhāna, suppression, uprooting, path, fruition, cessation, and Nibbāna are given a deliberate ascent.", "Nibbāna completes Group 1's four-ultimate map and is protected from being framed as a feeling or place."],
    weak: ["Twenty concepts in twelve films create the slate's highest concept density.", "Insight, purifications, requisites, supramundane classifications, path process, direct knowledge, and cessation each need more than a single narrative touch to become mechanisms."],
    learns: "The viewer can understand that training progresses from steadiness toward insight and irreversible change, and that Nibbāna is unconditioned; the viewer is unlikely to grasp the full route architecture.",
    risks: ["A compelling emotional culmination may mask doctrinal compression.", "Path/fruition and vipassanā are not built to the same depth as the Group 5 cognitive process."],
    recommendation: "Highest-priority chronology review: preserve the ascent and final bookend, but identify which advanced maps are intentionally introduced versus truly taught.",
  },
};

const mechanismCoverage = {
  "MECH-01": { "GRP-01": "built", "GRP-05": "integrated", "GRP-07": "integrated", "GRP-09": "integrated", "GRP-10": "integrated" },
  "MECH-02": { "GRP-01": "introduced", "GRP-02": "built", "GRP-03": "built", "GRP-04": "introduced", "GRP-05": "built", "GRP-06": "built", "GRP-07": "built", "GRP-10": "integrated" },
  "MECH-03": { "GRP-01": "dangerously_compressed", "GRP-02": "built", "GRP-03": "built", "GRP-04": "introduced", "GRP-05": "built", "GRP-06": "introduced", "GRP-08": "introduced", "GRP-10": "dangerously_compressed" },
  "MECH-04": { "GRP-01": "introduced", "GRP-02": "built", "GRP-03": "built", "GRP-04": "introduced", "GRP-05": "built", "GRP-06": "built", "GRP-10": "dangerously_compressed" },
  "MECH-05": { "GRP-02": "built", "GRP-03": "built", "GRP-04": "built", "GRP-06": "built", "GRP-08": "integrated", "GRP-09": "integrated", "GRP-10": "integrated" },
  "MECH-06": { "GRP-02": "built", "GRP-05": "built", "GRP-09": "integrated" },
  "MECH-07": { "GRP-01": "introduced", "GRP-05": "built", "GRP-07": "integrated", "GRP-08": "integrated", "GRP-10": "dangerously_compressed" },
  "MECH-08": { "GRP-01": "introduced", "GRP-05": "built", "GRP-07": "integrated", "GRP-08": "introduced" },
  "MECH-09": { "GRP-02": "surface_only", "GRP-05": "built", "GRP-06": "integrated", "GRP-08": "integrated", "GRP-10": "surface_only" },
  "MECH-10": { "GRP-01": "introduced", "GRP-05": "introduced", "GRP-07": "built", "GRP-09": "surface_only" },
  "MECH-11": { "GRP-07": "built" },
  "MECH-12": { "GRP-07": "built", "GRP-09": "surface_only" },
  "MECH-13": { "GRP-06": "introduced", "GRP-08": "built", "GRP-09": "integrated" },
  "MECH-14": { "GRP-05": "introduced", "GRP-07": "introduced", "GRP-08": "built", "GRP-09": "integrated", "GRP-10": "surface_only" },
  "MECH-15": { "GRP-01": "surface_only", "GRP-08": "dangerously_compressed", "GRP-10": "introduced" },
  "MECH-16": { "GRP-02": "surface_only", "GRP-04": "surface_only", "GRP-05": "surface_only", "GRP-07": "surface_only", "GRP-08": "surface_only", "GRP-09": "dangerously_compressed" },
  "MECH-17": { "GRP-09": "dangerously_compressed" },
  "MECH-18": { "GRP-06": "introduced", "GRP-07": "introduced", "GRP-08": "introduced", "GRP-10": "built" },
  "MECH-19": { "GRP-01": "surface_only", "GRP-07": "introduced", "GRP-10": "dangerously_compressed" },
  "MECH-20": { "GRP-08": "surface_only", "GRP-09": "surface_only", "GRP-10": "built" },
  "MECH-21": { "GRP-09": "surface_only", "GRP-10": "dangerously_compressed" },
  "MECH-22": { "GRP-01": "introduced", "GRP-10": "integrated" },
};

const allConceptIds = groups.flatMap((group) => group.concepts.map((concept) => concept.id)).sort();
const classifiedConceptIds = [...statusByConcept.keys()].sort();
if (JSON.stringify(allConceptIds) !== JSON.stringify(classifiedConceptIds)) {
  const missing = allConceptIds.filter((id) => !statusByConcept.has(id));
  const unknown = classifiedConceptIds.filter((id) => !allConceptIds.includes(id));
  throw new Error(`Concept status coverage mismatch. Missing: ${missing.join(", ") || "none"}; unknown: ${unknown.join(", ") || "none"}.`);
}

const mechanismsByConcept = new Map();
for (const mechanism of mechanismDefinitions) {
  for (const conceptId of mechanism.concept_ids) {
    const ids = mechanismsByConcept.get(conceptId) ?? [];
    ids.push(mechanism.id);
    mechanismsByConcept.set(conceptId, ids);
  }
}

function conceptRationale(status, linkedEpisodes, role) {
  const count = linkedEpisodes.length;
  const episodePhrase = count === 1
    ? `It is carried by one episode (${linkedEpisodes[0].id}), so the judgment does not treat linkage as cumulative teaching.`
    : `It is carried by ${count} episodes (${linkedEpisodes.map((episode) => episode.id).join(", ")}), assessed as a sequence rather than by count alone.`;
  const statusPhrase = {
    surface_only: "The episode imagery touches the topic, but the lesson sequence does not make its internal structure reconstructable.",
    introduced: "The lessons make a first distinction legible, but do not provide a later contrast or application strong enough to count as built.",
    built: "The linked lessons add contrasts or applications, so viewer understanding develops rather than merely repeating a label.",
    integrated: "The linked lessons are developed and later reused inside a broader mechanism or cross-group handoff.",
    dangerously_compressed: "The assigned role contains a broad taxonomy or advanced process that the available narrative space cannot make fully legible.",
  }[status];
  return `${episodePhrase} ${statusPhrase} Project role assessed: ${role}`;
}

function conceptViewerSummary(status, title, role) {
  if (status === "surface_only") return `The viewer may recognise imagery associated with ${title}, but cannot yet explain ${role.charAt(0).toLowerCase()}${role.slice(1)}`;
  if (status === "introduced") return `The viewer can form a first working distinction for ${title}, but is unlikely to place its complete structure within the wider system.`;
  if (status === "built") return `The viewer can explain the central distinction in ${title} and recognise it in more than one situation.`;
  if (status === "integrated") return `The viewer can connect ${title} to earlier or later teaching and use it as part of a broader Abhidhamma model.`;
  return `The viewer may remember the subject of ${title}, but the current span asks them to absorb more structure than the sequence develops.`;
}

function conceptRisk(status, linkedEpisodes) {
  if (status === "dangerously_compressed") return "High: do not describe this concept as taught in full during chronology review; inspect whether its internal distinctions are actually visible.";
  if (status === "surface_only") return "High: thematic presence may be mistaken for understanding-level coverage.";
  if (status === "introduced") return linkedEpisodes.length === 1
    ? "Medium: a single appearance has no later reinforcement."
    : "Medium: repeated presence does not yet form a clearly cumulative mechanism.";
  if (status === "built") return "Low: preserve the current contrasts and applications; avoid removing the steps that create cumulative understanding.";
  return "Low: preserve the cross-group recalls that make this concept structural rather than local.";
}

const conceptRecords = groups.flatMap((group) => group.concepts.map((concept) => {
  const digest = digestByConcept.get(concept.id);
  const linkedEpisodes = episodes.filter((episode) => episode.concept_ids.includes(concept.id));
  const status = statusByConcept.get(concept.id);
  return {
    concept_id: concept.id,
    title: digest?.title_en ?? concept.id,
    title_si: digest?.title_si ?? "",
    group_id: group.id,
    linked_episode_ids: linkedEpisodes.map((episode) => episode.id),
    linked_episodes: linkedEpisodes.map((episode) => ({
      id: episode.id,
      global_position: episode.chronology.global_position,
      title: episode.title,
      lesson_in_simple_terms: episode.lesson?.in_simple_terms ?? "",
    })),
    depth_status: status,
    depth_reason: conceptRationale(status, linkedEpisodes, concept.role),
    viewer_understanding_summary: conceptViewerSummary(status, digest?.title_en ?? concept.id, concept.role),
    risks: [conceptRisk(status, linkedEpisodes)],
    related_mechanism_ids: mechanismsByConcept.get(concept.id) ?? [],
    review_priority: ["surface_only", "dangerously_compressed"].includes(status) ? "high" : status === "introduced" ? "medium" : "low",
    teaching_risk: status === "dangerously_compressed" ? "over-compression" : status === "surface_only" ? "analogy-without-mechanism" : status === "introduced" ? "insufficient-reinforcement" : "none-identified",
    notes_for_chathura_review: conceptRisk(status, linkedEpisodes),
  };
})).sort((a, b) => a.concept_id.localeCompare(b.concept_id));

const mechanismRecords = mechanismDefinitions.map((mechanism) => {
  const milestoneIds = [mechanism.milestones.first, ...mechanism.milestones.development, ...mechanism.milestones.integration, ...mechanism.milestones.recall];
  return {
    mechanism_id: mechanism.id,
    name: mechanism.name,
    summary: mechanism.summary,
    concept_ids: mechanism.concept_ids,
    first_introduced_episode: mechanism.milestones.first,
    development_episodes: mechanism.milestones.development,
    integration_episodes: mechanism.milestones.integration,
    recall_episodes: mechanism.milestones.recall,
    current_depth_status: mechanism.status,
    viewer_understanding_summary: mechanism.viewer,
    compression_risks: [mechanism.risk],
    review_priority: mechanism.review_priority,
    group_coverage: groups.map((group) => ({
      group_id: group.id,
      status: mechanismCoverage[mechanism.id]?.[group.id] ?? "missing",
      episode_ids: episodes
        .filter((episode) => episode.chronology.group_id === group.id
          && (milestoneIds.includes(episode.id) || episode.concept_ids.some((id) => mechanism.concept_ids.includes(id))))
        .map((episode) => episode.id),
    })),
    notes: "Derived only from the repository's concept roles, episode/group lessons, loglines, and chronology; not an external doctrinal correction.",
  };
});

const groupRecords = groups.map((group) => {
  const analysis = groupAnalysis[group.id];
  const groupConcepts = conceptRecords.filter((concept) => concept.group_id === group.id);
  const relevantMechanisms = mechanismRecords
    .map((mechanism) => ({ mechanism_id: mechanism.mechanism_id, name: mechanism.name, status: mechanismCoverage[mechanism.mechanism_id]?.[group.id] ?? "missing" }))
    .filter((mechanism) => mechanism.status !== "missing");
  return {
    group_id: group.id,
    title: group.title,
    chronological_position: group.chronological_position,
    emotional_stage: group.emotional_stage,
    concept_count: groupConcepts.length,
    episode_count: episodes.filter((episode) => episode.chronology.group_id === group.id).length,
    overall_teaching_depth_status: analysis.status,
    status_counts: Object.fromEntries(Object.keys(statusDefinitions).map((status) => [status, groupConcepts.filter((concept) => concept.depth_status === status).length])),
    strong_areas: analysis.strong,
    weak_or_compressed_areas: analysis.weak,
    what_a_viewer_likely_learns: analysis.learns,
    internal_progression_assessment: analysis.status === "integrated"
      ? "The internal sequence builds a mechanism and connects it to wider teaching."
      : analysis.status === "built"
        ? "The internal sequence contains real cumulative steps, with some subtopics remaining introductory."
        : analysis.status === "introduced"
          ? "The experiential spine is legible, but several classifications change the topic faster than understanding accumulates."
          : "The group carries too many advanced structures for its current film count, even where the emotional arc is coherent.",
    handoff_assessment: group.lesson?.hands_to_next ?? group.hands_off,
    strongest_mechanisms: relevantMechanisms.filter((mechanism) => ["built", "integrated"].includes(mechanism.status)),
    most_compressed_mechanisms: relevantMechanisms.filter((mechanism) => mechanism.status === "dangerously_compressed"),
    risks: analysis.risks,
    readiness_for_chronology_review: analysis.review_priority === "low" ? "likely_adequate" : "needs_review",
    review_priority: analysis.review_priority,
    recommendation_summary: analysis.recommendation,
  };
});

const statusCounts = Object.fromEntries(Object.keys(statusDefinitions).map((status) => [status, conceptRecords.filter((concept) => concept.depth_status === status).length]));
const depthMap = {
  schema_version: 1,
  id: "ANALYSIS-ABHIDHAMMA-DEPTH-MAP",
  record_type: "teaching_depth_analysis",
  title: "Abhidhamma Depth Map",
  status: "draft_analysis_for_chathura_review",
  generated_at: "2026-09-19",
  analytical_boundary: "This is a non-destructive recommendation layer. It does not approve, reject, reorder, retitle, or rewrite any film and does not import outside Buddhist knowledge.",
  source_inputs: [
    "development/digests/C001-C102.json",
    "development/groups/GRP-01-GRP-10.json",
    "development/episodes/EPD-0001-EPD-0098.json",
    "development/slate-notes.md",
    "docs/planning/01-current-state-audit.md",
    "docs/planning/05-episode-001-100-continuity.md",
    "docs/planning/06-master-roadmap.md",
  ],
  methodology: {
    lens: "After the relevant episodes, what can the viewer understand that they could not understand before?",
    levels: {
      experience: "The viewer feels or notices the teaching through an event, image, or situation.",
      understanding: "The viewer can state a distinction or causal mechanism in simple terms.",
      structure: "The viewer can place that mechanism inside a larger Abhidhamma system and recall it later.",
    },
    status_definitions: statusDefinitions,
    rules: [
      "Concept linkage alone never counts as depth.",
      "Repeated analogies without a new distinction do not count as cumulative development.",
      "Built requires a visible progression, contrast, or later application.",
      "Integrated requires connection to an earlier or later mechanism.",
      "Dangerously compressed is used when narrative space is carrying an advanced process or broad taxonomy without enough steps for reconstruction.",
    ],
  },
  summary: {
    verdict: "mixed_with_real_depth_and_serious_late_compression",
    verdict_text: "The slate is not merely surface-level: it genuinely builds several core mechanisms, especially mind-state composition, cognitive process, and matter. It does not yet teach the deeper architecture evenly. Broad taxonomies and the late dependent-origination, Paṭṭhāna, vipassanā, path/fruition, and plane structures are too compressed to count as fully taught.",
    total_concepts: conceptRecords.length,
    total_episodes: episodes.length,
    total_groups: groupRecords.length,
    major_mechanisms_assessed: mechanismRecords.length,
    concept_status_counts: statusCounts,
    concepts_with_adequate_depth: statusCounts.built + statusCounts.integrated,
    high_risk_concepts: conceptRecords.filter((concept) => concept.review_priority === "high").map((concept) => concept.concept_id),
    high_risk_mechanisms: mechanismRecords.filter((mechanism) => mechanism.review_priority === "high").map((mechanism) => mechanism.mechanism_id),
    strongest_groups: ["GRP-02", "GRP-03", "GRP-05", "GRP-06", "GRP-07"],
    first_review_groups: ["GRP-09", "GRP-10", "GRP-08", "GRP-04"],
  },
  recommendations: [
    { priority: "high", target: "GRP-09", category: "potentially_over_compressed", text: "Review dependent origination and Paṭṭhāna by asking what distinct causal relation each film makes stateable, not merely felt." },
    { priority: "high", target: "GRP-10", category: "potentially_over_compressed", text: "Separate what is intentionally introduced from what the slate claims to build across insight, purification, jhāna, path, fruition, direct knowledge, cessation, and Nibbāna." },
    { priority: "high", target: "GRP-08", category: "needs_review", text: "Preserve the strong no-traveller/not-fate spine while checking every one-film kamma, plane, death, and rebirth classification." },
    { priority: "medium", target: "GRP-04", category: "needs_review", text: "Test whether root-at-birth person types and the defilement compendium are understandable or only named." },
    { priority: "low", target: "GRP-05", category: "strong_cumulative_teaching", text: "Preserve the sensory-door to object to determination to javana progression as the series benchmark." },
    { priority: "low", target: "GRP-02/03/06/07", category: "likely_adequate", text: "Preserve the repeated contrasts that build wanting, resistance, beautiful factors, and matter over several episodes." },
    { priority: "medium", target: "Cross-group handoffs", category: "needs_clearer_bridge", text: "Protect explicit recalls from feeling to contact, from cognitive process to death process, and from earlier groups into dependent origination." },
  ],
  concepts: conceptRecords,
  mechanisms: mechanismRecords,
  groups: groupRecords,
};

fs.writeFileSync(path.join(analysisDir, "abhidhamma-depth-map.json"), `${JSON.stringify(depthMap, null, 2)}\n`);
console.log(`Wrote ${conceptRecords.length} concepts, ${mechanismRecords.length} mechanisms, and ${groupRecords.length} groups.`);
