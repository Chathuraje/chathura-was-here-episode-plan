# Batch Q — C064 to C066

Instruction version: concept-to-idea v1 (2026-09-17). Source snapshot: `ef70024`. Duplicate checking covered every idea card present in `content/03-idea-bank/ideas/` at the time of writing (C001–C075 cards from other batches, as far as written) and this batch.

## Coverage

| Concept | File | Lines read / total | Coverage |
|---|---|---|---|
| C064 | `content/02-concepts/Chapter 6/Concept 64 - මහාභූත රූප සතර/sources/Abhidhammattha Pradeepika.md` | 1–217 / 217 | complete |
| C064 | `content/02-concepts/Chapter 6/Concept 64 - මහාභූත රූප සතර/sources/Abhidharma Margaya.md` | 1–47 / 47 | complete |
| C065 | `content/02-concepts/Chapter 6/Concept 65 - ගෝචර රූප පස/sources/Abhidhammattha Pradeepika.md` | 1–241 / 241 (read as 1–185, 185–241) | complete |
| C065 | `content/02-concepts/Chapter 6/Concept 65 - ගෝචර රූප පස/sources/Abhidharma Margaya.md` | 1–43 / 43 | complete |
| C066 | `content/02-concepts/Chapter 6/Concept 66 - අනිෂ්පන්න රූප දශය/sources/Abhidhammattha Pradeepika.md` | 1–149 / 149 | complete |
| C066 | `content/02-concepts/Chapter 6/Concept 66 - අනිෂ්පන්න රූප දශය/sources/Abhidharma Margaya.md` | 1–29 / 29 | complete |

Totals are `wc -l` counts. The Read tool reported 242 lines for the C065 Pradeepika file, because the file ends with a trailing newline, but the last text line is 241. No `Abhidhammattha Pradeepika Book 4.md` exists for these concepts.

## Outputs

| Concept | Source note | Ideas | Status |
|---|---|---|---|
| C064 | `source-notes/C064 - The four great elements.md` | none | no suitable idea |
| C065 | `source-notes/C065 - The five sense-object forms of matter.md` | C065-I01 (accepted), C065-I02 (held) | ready |
| C066 | `source-notes/C066 - The ten non-concretely-produced forms of matter.md` | C066-I01, C066-I02, C066-I03 (all accepted) | ready |

## Held questions

1. **C065-I02 — Taking one sense's view for the whole thing.** Held as a possible merge into C020-I02 (Seeing only one side of something at once). The viewpoint and appearance mechanism is the same. The only distinct content is Margaya's hand/eye point (C065 Margaya line 25). Coordinator decision: merge (add C065 sources to C020-I02 and set C065-I02 to merged) or keep as a separate cross-sense card.
2. **C064 no suitable idea.** Is the "fire both ripens and wears down" passage (C064 Margaya line 15; Pradeepika line 78) adequately represented as a supporting concept for C066-I03, or should C064 carry its own card? This batch judged a separate card a duplicate.
3. **C066-I02 applications.** The application to recorded voices of the dead is my extension of a technical remark (C066 Pradeepika line 54). A reviewer should confirm that this counts as a limited analogy and not a distortion.
4. **Sensitive material not carried forward.** The C065 sex-faculty section (Pradeepika lines 110–138) ties gendered tasks to sex and attributes sex change to unwholesome karma. The heart-base argument (lines 158–162) rejects the brain as the seat of mind. Both are recorded in the source note as unsafe premises. Future batches on related concepts should apply the same caution.

## Suspected source text errors

- All three Pradeepika files, line 9: the inclusion note refers to `data.md`, which was renamed `Abhidharma Margaya.md` in commit ef70024. This is a stale reference, not a textual error.
- C064 `Abhidharma Margaya.md` line 21: "අනික් ධාතු ධාතුව උත්සන්න ගින්නෙහි ද" appears garbled. It likely should read "…යකඩයෙහි ද ගලෙහි ද, තේජෝ ධාතුව උත්සන්න ගින්නෙහි ද" (words dropped between the earth and fire examples).
- C064 `Abhidhammattha Pradeepika.md` line 42: "සණව" / "සණ නොවී", probably ඝනව / ඝන නොවී. Line 108: "4 **ලක්ෂණ" is missing a full stop after 4. Line 209: "උන්පත්ති", probably උත්පත්ති; "සසභාර කාය", probably සසම්භාර.
- C065 `Abhidhammattha Pradeepika.md` line 72: "ඝාණප්‍රසාදයාගේ පිරිසිඳීමක් ඒ තිබේනම්", probably පිරිහීමක් (impairment), given the sense. Line 88: "දුර්ලය", probably දුබලය. Line 142: "ධාතුවයට", probably ධාතුද්වයට. Line 148: "අඩි හෝ අනඬ හෝ හඳන්ද, පුරන්ද" is garbled (possibly හඬන්ද / සිනාසෙන්ද). Its meaning is uncertain, and it is not used.
- C066 `Abhidharma Margaya.md` line 11: "සොලව්නනට", probably සොලවන්නට. Line 7: the heading `## විකාර රූප` is empty and followed directly by `## කාය විඤ්ඤත්තිය`, a heading-level issue in extraction.
- C066 `Abhidhammattha Pradeepika.md` line 64: a very compressed technical sentence that may be corrupted. It is not used.

## Source disagreements noted

- C066: unbounded space (අජටාකාශ). Margaya line 5 treats it as the world-cavity containing all things. Pradeepika line 32 says the visible sky is full of air, and unbounded space is only where there is no air, light or temperature.
- C065: food. Margaya line 41 says food suits each being's body. Pradeepika lines 235–239 give a hierarchy of coarse-to-refined food across animals, social classes and gods. These are complementary, but the hierarchy is not carried forward.
- C064: size of the eye-sensitivity region. Pradeepika line 157 compares it to a louse's head. Margaya line 31 gives this and "another opinion", a mung-bean husk.

## Possible overlaps

| This batch | Existing or same-batch idea | Relationship |
|---|---|---|
| C065-I02 | C020-I02 Seeing only one side of something at once | Same mechanism for viewpoint. Held for merge. |
| C065-I02 | C001-I01 When a whole is only its parts arranged | Related, different mechanism (partial access vs. arrangement) |
| C065-I01 | C009-I01 Most of what meets the eye goes unseen | Shared idea that wanting or expectation selects what is perceived. C065-I01 kept for touch and the body as baseline. A reviewer may merge. |
| C065-I01 | C036-I01 Seeing through the marks we already know; C046-I01 Reacting to what we recognise, not what we see | Related (expectation shaping perception) |
| C066-I01 | C006-I03 Needing a push to do what you already want; C003-I02 When a tired body makes every act need pushing; C037-I01 Needing another's voice for the first step | Related (starting to act), but C066-I01 is the step from intention to bodily movement |
| C066-I02 | C036-I01 (sounds recognised because heard before); C047-I01 Remembering a place versus remembering being there | Related (familiarity; memory) |
| C066-I03 | C039-I01 When steady replacement looks like staying the same | Related (hidden continuous change becoming visible) |
| Rejected C066 candidate (lightness, softness, workability) | C069-I01 When mind, food and weather make the body heavy | Same mechanism. C066 Pradeepika lines 80–106 and Margaya line 19 could be added to C069-I01 as supporting sources. |
