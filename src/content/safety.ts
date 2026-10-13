// "Can I … while pregnant?" — bundled, bilingual safety library.
//
// Verdicts:
//   safe    — generally fine in pregnancy
//   caution — fine with conditions (cooked through, pasteurised, limited
//             amounts, the right product, or after checking with a clinician)
//   avoid   — best avoided in pregnancy
//
// Tone is calm and conservative without being alarmist. Guidance follows
// mainstream bodies (NHS, ACOG, CDC, FDA, WHO, RCOG, MotherToBaby, BUMPS/UKTIS,
// Mayo Clinic). Where UK and US advice differ, the entry says so in `details`
// rather than picking a side silently.
//
// Medicines: no doses (only widely published public limits such as caffeine
// under 200 mg a day, folic acid and vitamin D), every medicine entry carries
// the "check with your doctor, midwife or pharmacist" tip, and nothing ever
// tells someone to stop a prescribed medicine — only not to stop it without
// talking to their doctor.
//
// Every source URL below was checked to resolve in October 2026.

import type { SafetyItem, Source } from "./types";

const src = (name: string, url: string): Source => ({ name, url });

const NHS = "https://www.nhs.uk";
const BUMPS = "https://www.medicinesinpregnancy.org/leaflets-a-z";
const M2B = "https://mothertobaby.org/fact-sheets";
const MAYO = "https://www.kuh.ku.edu.tr/mayo-clinic-care-network/mayo-clinic-health-information-library/faqs";

const S = {
  // NHS (UK)
  nhsFoods: src("NHS: Foods to avoid in pregnancy", `${NHS}/pregnancy/keeping-well/foods-to-avoid/`),
  nhsDiet: src("NHS: Have a healthy diet in pregnancy", `${NHS}/pregnancy/keeping-well/have-a-healthy-diet/`),
  nhsVitamins: src("NHS: Pregnancy vitamins and supplements", `${NHS}/pregnancy/keeping-well/pregnancy-vitamins-and-supplements/`),
  nhsMedicines: src("NHS: Medicines in pregnancy", `${NHS}/pregnancy/keeping-well/medicines/`),
  nhsAlcohol: src("NHS: Drinking alcohol while pregnant", `${NHS}/pregnancy/keeping-well/drinking-alcohol-while-pregnant/`),
  nhsSmoking: src("NHS: Stop smoking in pregnancy", `${NHS}/pregnancy/keeping-well/stop-smoking/`),
  nhsExercise: src("NHS: Exercise in pregnancy", `${NHS}/pregnancy/keeping-well/exercise/`),
  nhsTravel: src("NHS: Travelling in pregnancy", `${NHS}/pregnancy/keeping-well/travelling/`),
  nhsInfections: src("NHS: Infections that may affect your baby", `${NHS}/pregnancy/keeping-well/infections-that-may-affect-your-baby/`),
  nhsVaccines: src("NHS: Vaccinations in pregnancy", `${NHS}/pregnancy/keeping-well/vaccinations/`),
  nhsWhoopingCough: src("NHS: Whooping cough vaccination in pregnancy", `${NHS}/pregnancy/keeping-well/whooping-cough-vaccination/`),
  nhsHairDye: src("NHS Best Start in Life: Using hair dye in pregnancy", `${NHS}/best-start-in-life/pregnancy/using-hair-dye-in-pregnancy-is-it-safe/`),
  nhsCommonProblems: src("NHS: Common health problems in pregnancy", `${NHS}/pregnancy/common-symptoms/common-health-problems/`),
  nhsBackPain: src("NHS: Back pain in pregnancy", `${NHS}/pregnancy/common-symptoms/back-pain/`),
  nhsHeadaches: src("NHS: Headaches in pregnancy", `${NHS}/pregnancy/common-symptoms/headaches/`),
  nhsHeartburn: src("NHS: Indigestion and heartburn in pregnancy", `${NHS}/pregnancy/common-symptoms/indigestion-and-heartburn/`),
  nhsSickness: src("NHS: Vomiting and morning sickness", `${NHS}/pregnancy/common-symptoms/vomiting-and-morning-sickness/`),
  nhsThrush: src("NHS: Thrush in pregnancy", `${NHS}/pregnancy/common-symptoms/thrush/`),
  nhsDepression: src("NHS: Depression in pregnancy", `${NHS}/pregnancy/mental-health-in-pregnancy-and-after-the-birth/depression/`),
  nhsDiabetes: src("NHS: Diabetes in pregnancy", `${NHS}/pregnancy/existing-health-conditions/diabetes/`),
  nhsAntacids: src("NHS: Antacids", `${NHS}/medicines/antacids/`),
  nhsAntibiotics: src("NHS: Antibiotics", `${NHS}/medicines/antibiotics/`),
  nhsAntidepressants: src("NHS: Antidepressants", `${NHS}/medicines/antidepressants/`),
  nhsAntihistamines: src("NHS: Antihistamines", `${NHS}/medicines/antihistamines/`),
  nhsAspirin: src("NHS: Aspirin, including low-dose aspirin", `${NHS}/medicines/aspirin/`),
  nhsBeclometasone: src("NHS: Beclometasone nasal spray in pregnancy", `${NHS}/medicines/beclometasone-nasal-spray/pregnancy-breastfeeding-and-fertility-while-using-beclometasone-nasal-spray/`),
  nhsBenzoylPeroxide: src("NHS: Benzoyl peroxide", `${NHS}/medicines/benzoyl-peroxide/`),
  nhsDiclofenac: src("NHS: Diclofenac in pregnancy", `${NHS}/medicines/diclofenac/pregnancy-breastfeeding-and-fertility-while-taking-or-using-diclofenac/`),
  nhsFolicAcid: src("NHS: Folic acid", `${NHS}/medicines/folic-acid/`),
  nhsGaviscon: src("NHS: Gaviscon in pregnancy", `${NHS}/medicines/gaviscon/pregnancy-breastfeeding-and-fertility-while-taking-gaviscon/`),
  nhsHydrocortisonePiles: src("NHS: Hydrocortisone for piles in pregnancy", `${NHS}/medicines/hydrocortisone-for-piles-and-itchy-bottom/pregnancy-breastfeeding-and-fertility-while-using-hydrocortisone-for-piles-and-itchy-bottom/`),
  nhsIsotretinoin: src("NHS: Isotretinoin (Roaccutane)", `${NHS}/medicines/isotretinoin-roaccutane/`),
  nhsLactulose: src("NHS: Lactulose", `${NHS}/medicines/lactulose/`),
  nhsLevothyroxine: src("NHS: Levothyroxine", `${NHS}/medicines/levothyroxine/`),
  nhsLoperamide: src("NHS: Loperamide in pregnancy", `${NHS}/medicines/loperamide/pregnancy-breastfeeding-and-fertility-while-taking-loperamide/`),
  nhsMelatonin: src("NHS: Melatonin in pregnancy", `${NHS}/medicines/melatonin/pregnancy-breastfeeding-and-fertility-while-taking-melatonin/`),
  nhsNaproxen: src("NHS: Naproxen", `${NHS}/medicines/naproxen/`),
  nhsOmeprazole: src("NHS: Omeprazole", `${NHS}/medicines/omeprazole/`),
  nhsPseudoephedrine: src("NHS: Pseudoephedrine", `${NHS}/medicines/pseudoephedrine/`),
  nhsSumatriptan: src("NHS: Sumatriptan", `${NHS}/medicines/sumatriptan/`),
  nhsTramadol: src("NHS: Tramadol in pregnancy", `${NHS}/medicines/tramadol/pregnancy-breastfeeding-and-fertility-while-taking-tramadol/`),
  nhsVitaminA: src("NHS: Vitamin A", `${NHS}/conditions/vitamins-and-minerals/vitamin-a/`),
  nhsIodine: src("NHS: Iodine", `${NHS}/conditions/vitamins-and-minerals/iodine/`),
  nhsCalcium: src("NHS: Calcium", `${NHS}/conditions/vitamins-and-minerals/calcium/`),
  nhsOtherMinerals: src("NHS: Other vitamins and minerals (including magnesium)", `${NHS}/conditions/vitamins-and-minerals/others/`),
  nhsProbiotics: src("NHS: Probiotics", `${NHS}/tests-and-treatments/probiotics/`),
  nhsIronAnaemia: src("NHS: Iron deficiency anaemia", `${NHS}/conditions/iron-deficiency-anaemia/`),
  nhsToxo: src("NHS: Toxoplasmosis", `${NHS}/conditions/toxoplasmosis/`),
  nhsZika: src("NHS: Zika virus", `${NHS}/conditions/zika/`),
  nhsMalaria: src("NHS: Malaria", `${NHS}/conditions/malaria/`),
  nhsHeadLice: src("NHS: Head lice and nits", `${NHS}/conditions/head-lice-and-nits/`),
  nhsCO: src("NHS: Carbon monoxide poisoning", `${NHS}/conditions/carbon-monoxide-poisoning/`),
  nhsCough: src("NHS: Cough", `${NHS}/symptoms/cough/`),
  nhsCT: src("NHS: CT scan", `${NHS}/tests-and-treatments/ct-scan/`),
  nhsTeethWhitening: src("NHS: Teeth whitening", `${NHS}/tests-and-treatments/teeth-whitening/`),
  nhsSun: src("NHS: Sunscreen and sun safety", `${NHS}/live-well/seasonal-health/sunscreen-and-sun-safety/`),
  nhsFish: src("NHS: Fish and shellfish", `${NHS}/live-well/eat-well/food-types/fish-and-shellfish-nutrition/`),
  nhsDairy: src("NHS: Milk and dairy in your diet", `${NHS}/live-well/eat-well/food-types/milk-and-dairy-nutrition/`),
  nhsDrinks: src("NHS: Water, drinks and your health", `${NHS}/live-well/eat-well/food-guidelines-and-food-labels/water-drinks-nutrition/`),
  nhsSalt: src("NHS: Salt in your diet", `${NHS}/live-well/eat-well/food-types/salt-in-your-diet/`),
  nhsBabyFoods: src("NHS: Foods to avoid giving babies (honey)", `${NHS}/baby/weaning-and-feeding/foods-to-avoid-giving-babies-and-young-children/`),

  // BUMPS — Best Use of Medicines in Pregnancy (UK Teratology Information Service)
  bumpsIbuprofen: src("BUMPS: Ibuprofen in pregnancy", `${BUMPS}/ibuprofen/`),
  bumpsAspirinPain: src("BUMPS: Aspirin for pain in pregnancy", `${BUMPS}/aspirin-for-pain/`),
  bumpsColds: src("BUMPS: Colds and flu in pregnancy", `${BUMPS}/colds-and-flu/`),
  bumpsDecongestants: src("BUMPS: Decongestants in pregnancy", `${BUMPS}/decongestants/`),
  bumpsPPIs: src("BUMPS: Proton pump inhibitors in pregnancy", `${BUMPS}/proton-pump-inhibitors/`),
  bumpsLoperamide: src("BUMPS: Loperamide in pregnancy", `${BUMPS}/loperamide/`),
  bumpsCodeine: src("BUMPS: Codeine in pregnancy", `${BUMPS}/codeine/`),
  bumpsTriptans: src("BUMPS: Triptans in pregnancy", `${BUMPS}/triptans/`),
  bumpsMigraine: src("BUMPS: Treating migraine in pregnancy", `${BUMPS}/migraine/`),
  bumpsInsulin: src("BUMPS: Insulin in pregnancy", `${BUMPS}/insulin/`),
  bumpsPiles: src("BUMPS: Treating piles in pregnancy", `${BUMPS}/piles/`),
  bumpsHeadLice: src("BUMPS: Treating head lice in pregnancy", `${BUMPS}/head-lice/`),
  bumpsNausea: src("BUMPS: Nausea and vomiting in pregnancy", `${BUMPS}/nausea--vomiting/`),
  bumpsFluVaccine: src("BUMPS: Flu vaccine in pregnancy", `${BUMPS}/flu-vaccine/`),
  bumpsTopicalRetinoids: src("BUMPS: Retinoid creams and gels in pregnancy", `${BUMPS}/isotretinoin-gel/`),
  bumpsBotox: src("BUMPS: Botox in pregnancy", `${BUMPS}/botox-botulinum-toxin/`),
  bumpsEssentialOils: src("BUMPS: Essential oils in pregnancy", `${BUMPS}/essential-oils/`),
  bumpsInsectRepellents: src("BUMPS: Insect repellents in pregnancy", `${BUMPS}/insect-repellents/`),
  bumpsVaping: src("BUMPS: Vaping in pregnancy", `${BUMPS}/vaping/`),

  // ACOG (US)
  acogAcetaminophen: src("ACOG: Acetaminophen in pregnancy (FAQ)", "https://www.acog.org/clinical/resources/physician-faqs/acetaminophen-in-pregnancy"),
  acogCoffee: src("ACOG: How much coffee can I drink while pregnant?", "https://www.acog.org/womens-health/experts-and-stories/ask-acog/how-much-coffee-can-i-drink-while-pregnant"),
  acogSushi: src("ACOG: Can I eat sushi while I'm pregnant?", "https://www.acog.org/womens-health/experts-and-stories/ask-acog/can-i-eat-sushi-while-im-pregnant"),
  acogHeat: src("ACOG: Extreme heat and pregnancy", "https://www.acog.org/womens-health/experts-and-stories/ask-acog/what-should-i-know-about-extreme-heat-and-pregnancy"),
  acogRSV: src("ACOG: Should I get the RSV vaccine during pregnancy?", "https://www.acog.org/womens-health/experts-and-stories/ask-acog/should-i-get-the-rsv-vaccine-during-pregnancy"),
  acogExercise: src("ACOG: Exercise during pregnancy", "https://www.acog.org/womens-health/faqs/exercise-during-pregnancy"),
  acogTravel: src("ACOG: Travel during pregnancy", "https://www.acog.org/womens-health/faqs/travel-during-pregnancy"),
  acogSkin: src("ACOG: Skin conditions during pregnancy", "https://www.acog.org/womens-health/faqs/skin-conditions-during-pregnancy"),
  acogBackPain: src("ACOG: Back pain during pregnancy", "https://www.acog.org/womens-health/faqs/back-pain-during-pregnancy"),
  acogImaging: src("ACOG: Diagnostic imaging during pregnancy", "https://www.acog.org/clinical/guidance/committee-opinion/2017/10/guidelines-for-diagnostic-imaging-during-pregnancy-and-lactation"),

  // CDC (US)
  cdcListeriaPrevention: src("CDC: Preventing Listeria infection", "https://www.cdc.gov/listeria/prevention/index.html"),
  cdcToxo: src("CDC: Preventing toxoplasmosis", "https://www.cdc.gov/toxoplasmosis/prevention/index.html"),
  cdcRawMilk: src("CDC: Raw milk", "https://www.cdc.gov/food-safety/foods/raw-milk.html"),
  cdcAlcohol: src("CDC: Alcohol use during pregnancy", "https://www.cdc.gov/alcohol-pregnancy/about/index.html"),
  cdcPregnantTravelers: src("CDC Yellow Book: Pregnant travelers", "https://www.cdc.gov/yellow-book/hcp/family-travel/pregnant-travelers.html"),

  // FDA (US)
  fdaFish: src("FDA: Advice about eating fish", "https://www.fda.gov/food/consumers/advice-about-eating-fish"),
  fdaEggs: src("FDA: Egg safety", "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety"),
  fdaFlour: src("FDA: Handling flour safely", "https://www.fda.gov/food/buy-store-serve-safe-food/handling-flour-safely-what-you-need-know"),
  fdaProduce: src("FDA: Selecting and serving produce safely", "https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-produce-safely"),
  fdaSafeFood: src("FDA: Safe food handling", "https://www.fda.gov/food/buy-store-serve-safe-food/safe-food-handling"),
  fdaJuice: src("FDA: Juice safety", "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-juice-safety"),
  fdaCaffeine: src("FDA: How much caffeine is too much?", "https://www.fda.gov/consumers/consumer-updates/spilling-beans-how-much-caffeine-too-much"),
  fdaNSAIDs: src("FDA: Avoid NSAIDs from 20 weeks of pregnancy", "https://www.fda.gov/drugs/drug-safety-and-availability/fda-recommends-avoiding-use-nsaids-pregnancy-20-weeks-or-later-because-they-can-result-low-amniotic"),
  fdaMedicinePregnancy: src("FDA: Medicine and pregnancy", "https://www.fda.gov/consumers/womens-health-topics/medicine-and-pregnancy"),
  fdaSupplements: src("FDA: Dietary supplements", "https://www.fda.gov/food/dietary-supplements"),
  fdaHairSmoothing: src("FDA: Hair smoothing products that release formaldehyde", "https://www.fda.gov/cosmetics/cosmetic-products/hair-smoothing-products-release-formaldehyde-when-heated"),
  fdaHairDyes: src("FDA: Hair dyes, henna and black henna", "https://www.fda.gov/cosmetics/cosmetic-products/hair-dyes"),
  fdaNails: src("FDA: Nail care products", "https://www.fda.gov/cosmetics/cosmetic-products/nail-care-products"),
  fdaSunless: src("FDA: Sunless tanners and bronzers", "https://www.fda.gov/cosmetics/cosmetic-products/sunless-tanners-bronzers"),
  fdaSunscreen: src("FDA: Sunscreen", "https://www.fda.gov/drugs/understanding-over-counter-medicines/sunscreen-how-help-protect-your-skin-sun"),
  fdaFragrance: src("FDA: Fragrances in cosmetics", "https://www.fda.gov/cosmetics/cosmetic-ingredients/fragrances-cosmetics"),
  fdaFillers: src("FDA: Dermal fillers", "https://www.fda.gov/medical-devices/aesthetic-cosmetic-devices/dermal-fillers-soft-tissue-fillers"),
  fdaTattoos: src("FDA: Think before you ink (tattoo safety)", "https://www.fda.gov/consumers/consumer-updates/think-you-ink-tattoo-safety"),
  fdaXray: src("FDA: X-rays, pregnancy and you", "https://www.fda.gov/radiation-emitting-products/medical-x-ray-imaging/x-rays-pregnancy-and-you"),
  fdaScreening: src("FDA: Security screening of people", "https://www.fda.gov/radiation-emitting-products/security-systems/products-security-screening-people"),
  fdaMicrowave: src("FDA: Microwave ovens", "https://www.fda.gov/radiation-emitting-products/resources-you-radiation-emitting-products/microwave-ovens"),
  fdaCellPhones: src("FDA: Cell phones", "https://www.fda.gov/radiation-emitting-products/home-business-and-entertainment-products/cell-phones"),

  // MotherToBaby (OTIS)
  m2bCaffeine: src("MotherToBaby: Caffeine", `${M2B}/caffeine-pregnancy/`),
  m2bHerbal: src("MotherToBaby: Herbal products", `${M2B}/herbal-products-pregnancy/`),
  m2bHyperthermia: src("MotherToBaby: Fever and hyperthermia (overheating)", `${M2B}/hyperthermia-pregnancy/`),
  m2bMercury: src("MotherToBaby: Methylmercury", `${M2B}/methylmercury-pregnancy/`),
  m2bVibrio: src("MotherToBaby: Vibrio (raw shellfish)", `${M2B}/vibrio-pregnancy/`),
  m2bSalmonella: src("MotherToBaby: Salmonella", `${M2B}/salmonella-pregnancy/`),
  m2bToxo: src("MotherToBaby: Toxoplasmosis", `${M2B}/toxoplasmosis-pregnancy/`),
  m2bRawMeats: src("MotherToBaby: Raw, undercooked or cold meats and seafood", `${M2B}/eating-raw-undercooked-or-cold-meats-and-seafood/`),
  m2bVitaminA: src("MotherToBaby: Vitamin A", `${M2B}/vitamin-a/`),
  m2bVitaminC: src("MotherToBaby: Vitamin C", `${M2B}/vitamin-c/`),
  m2bVitaminD: src("MotherToBaby: Vitamin D", `${M2B}/vitamin-d/`),
  m2bIron: src("MotherToBaby: Iron", `${M2B}/iron/`),
  m2bIodine: src("MotherToBaby: Iodine", `${M2B}/iodine-pregnancy/`),
  m2bMelatonin: src("MotherToBaby: Melatonin", `${M2B}/melatonin/`),
  m2bGinger: src("MotherToBaby: Ginger", `${M2B}/ginger-pregnancy/`),
  m2bStJohns: src("MotherToBaby: St John's wort", `${M2B}/st-johns-wort/`),
  m2bIsotretinoin: src("MotherToBaby: Isotretinoin", `${M2B}/isotretinoin-accutane-pregnancy/`),
  m2bTramadol: src("MotherToBaby: Tramadol", `${M2B}/tramadol/`),
  m2bTdap: src("MotherToBaby: Tdap vaccine", `${M2B}/tetanus-diphtheria-pertussis-tdap-vaccine-pregnancy/`),
  m2bHairTreatments: src("MotherToBaby: Hair treatments", `${M2B}/hair-treatments-pregnancy/`),
  m2bTretinoin: src("MotherToBaby: Tretinoin (Retin-A)", `${M2B}/tretinoin-retin-a-pregnancy/`),
  m2bTopicalAcne: src("MotherToBaby: Topical acne treatments", `${M2B}/topical-acne-treatments-pregnancy/`),
  m2bSunlessTanners: src("MotherToBaby: Sunless tanners", `${M2B}/sunless-tanners/`),
  m2bNailSalon: src("MotherToBaby: Nail salon products", `${M2B}/working-nail-salon-pregnancy/`),
  m2bPhysicalTrauma: src("MotherToBaby: Physical trauma", `${M2B}/physical-trauma/`),
  m2bPaint: src("MotherToBaby: Paint", `${M2B}/paint-pregnancy/`),
  m2bPesticides: src("MotherToBaby: Pesticides", `${M2B}/pesticides-pregnancy/`),
  m2bMold: src("MotherToBaby: Mold", `${M2B}/mold-pregnancy/`),
  m2bMRI: src("MotherToBaby: MRI", `${M2B}/magnetic-resonance-imaging-mri/`),
  m2bCO: src("MotherToBaby: Carbon monoxide", `${M2B}/carbon-monoxide-pregnancy/`),
  m2bDEET: src("MotherToBaby: DEET insect repellent", `${M2B}/deet-nn-ethyl-m-toluamide-pregnancy/`),

  // Mayo Clinic Health Library (hosted by Koç University Hospital, Mayo Clinic Care Network)
  mayoKombucha: src("Mayo Clinic: Kombucha tea", `${MAYO}/kombucha-tea-does-it-have-health-benefits`),
  mayoAspirin: src("Mayo Clinic: Aspirin during pregnancy", `${MAYO}/aspirin-during-pregnancy-is-it-safe`),
  mayoAllergyMeds: src("Mayo Clinic: Allergy medicines and pregnancy", `${MAYO}/allergy-medications-and-pregnancy-what-s-safe`),
  mayoAntibiotics: src("Mayo Clinic: Antibiotics and pregnancy", `${MAYO}/antibiotics-and-pregnancy-what-s-safe`),
  mayoConstipation: src("Mayo Clinic: Pregnancy constipation and stool softeners", `${MAYO}/pregnancy-constipation-are-stool-softeners-safe`),
  mayoYeast: src("Mayo Clinic: Yeast infection treatment in pregnancy", `${MAYO}/yeast-infection-during-pregnancy-over-the-counter-treatment-ok`),
  mayoAcne: src("Mayo Clinic: Treating pregnancy acne", `${MAYO}/pregnancy-acne-what-s-the-best-treatment`),
  mayoHeadaches: src("Mayo Clinic: Headaches during pregnancy", `${MAYO}/headaches-during-pregnancy-what-s-the-best-treatment`),
  mayoFalls: src("Mayo Clinic: Falling during pregnancy", `${MAYO}/falling-during-pregnancy-reason-to-worry`),
  mayoXray: src("Mayo Clinic: X-rays during pregnancy", `${MAYO}/x-ray-during-pregnancy-is-it-safe`),

  // WHO, RCOG and other official sources
  whoZika: src("WHO: Zika virus", "https://www.who.int/news-room/fact-sheets/detail/zika-virus"),
  whoTobacco: src("WHO: Tobacco", "https://www.who.int/news-room/fact-sheets/detail/tobacco"),
  whoListeriosis: src("WHO: Listeriosis", "https://www.who.int/news-room/fact-sheets/detail/listeriosis"),
  whoEMF: src("WHO: Electromagnetic fields and health", "https://www.who.int/news-room/questions-and-answers/item/radiation-electromagnetic-fields"),
  whoCalcium: src("WHO: Calcium supplements in pregnancy", "https://www.who.int/tools/elena/interventions/calcium-pregnancy"),
  rcogAirTravel: src("RCOG: Air travel and pregnancy", "https://www.rcog.org.uk/for-the-public/browse-our-patient-information/air-travel-and-pregnancy/"),
  mhraRetinoids: src("MHRA: Oral retinoids and pregnancy prevention", "https://www.gov.uk/drug-safety-update/oral-retinoid-medicines-revised-and-simplified-pregnancy-prevention-educational-materials-for-healthcare-professionals-and-women"),
  nidirectSex: src("NI Direct: Sex during pregnancy", "https://www.nidirect.gov.uk/articles/sex-during-pregnancy"),
  khChemicals: src("Nemours KidsHealth: Household chemicals during pregnancy", "https://kidshealth.org/en/parents/chemicals-pregnancy.html"),
  bjnPapaya: src("British Journal of Nutrition: Papaya in pregnancy (animal study)", "https://www.cambridge.org/core/journals/british-journal-of-nutrition/article/papaya-carica-papaya-consumption-is-unsafe-in-pregnancy-fact-or-fable-scientific-evaluation-of-a-common-belief-in-some-parts-of-asia-using-a-rat-model/D07C5CC7993552C35D68A5AB770C19EF"),
};

// Shared tips for medicine entries.
const ASK = {
  en: "Check with your doctor, midwife or pharmacist before taking any medicine.",
  tr: "Herhangi bir ilaç almadan önce doktoruna, ebene ya da eczacına danış.",
};
const KEEP = {
  en: "Don't stop a prescribed medicine without talking to your doctor first.",
  tr: "Reçeteli bir ilacı doktorunla konuşmadan bırakma.",
};

export const SAFETY: SafetyItem[] = [
  // ── Food ───────────────────────────────────────────────────────────────────
  // Cheese and dairy

  {
    id: "brie",
    category: "food",
    emoji: "🧀",
    name: { en: "Brie", tr: "Brie peyniri" },
    aliases: {
      en: ["brie cheese", "soft cheese", "mould-ripened cheese", "mold-ripened cheese", "baked brie"],
      tr: ["brie", "yumuşak peynir", "küflü peynir", "beyaz kabuklu peynir", "fırında brie"],
    },
    verdict: "caution",
    summary: {
      en: "Only when it's cooked until steaming hot, like baked brie; skip it cold on a cheese board.",
      tr: "Yalnızca fırında brie gibi dumanı tütene kadar pişirildiğinde; peynir tabağında soğuk yeme.",
    },
    details: {
      en: "Brie is a soft, mould-ripened cheese, and its moist, low-acid texture can let listeria grow. Listeria infection is rare but can cause miscarriage, stillbirth or serious illness in a newborn, and thorough cooking kills it. UK advice is to cook brie whether or not it's pasteurised, while US advice focuses on avoiding soft cheese made from unpasteurised milk.",
      tr: "Brie, yüzeyi küfle olgunlaşan yumuşak bir peynirdir; nemli ve asitliği düşük dokusu listeria bakterisinin üremesine izin verebilir. Listeria enfeksiyonu nadirdir ama düşüğe, ölü doğuma ya da yenidoğanda ciddi hastalığa yol açabilir; iyice pişirmek bakteriyi öldürür. İngiltere'deki öneri brie'yi pastörize olsun olmasın pişirmek yönünde; ABD ise daha çok pastörize edilmemiş sütten yapılan yumuşak peynirlerden kaçınmaya odaklanıyor.",
    },
    tips: {
      en: ["Bake or grill it until it's steaming hot all the way through.", "For a cold cheese board, choose hard cheeses like cheddar or parmesan."],
      tr: ["Fırında ya da ızgarada her yeri dumanı tütene kadar ısıt.", "Soğuk peynir tabağı için çedar ya da parmesan gibi sert peynirleri seç."],
    },
    sources: [S.nhsFoods, S.cdcListeriaPrevention],
  },
  {
    id: "camembert",
    category: "food",
    emoji: "🧀",
    name: { en: "Camembert", tr: "Camembert peyniri" },
    aliases: {
      en: ["camembert cheese", "baked camembert", "white rind cheese", "soft cheese"],
      tr: ["camembert", "kamember", "fırında camembert", "beyaz kabuklu peynir", "yumuşak peynir"],
    },
    verdict: "caution",
    summary: {
      en: "Only when it's baked or cooked until bubbling hot; cold camembert is best skipped, even if pasteurised.",
      tr: "Yalnızca fırında ya da tavada fokurdayana kadar pişirildiğinde; soğuk camembert'i pastörize olsa bile atla.",
    },
    details: {
      en: "Like brie, camembert is a mould-ripened soft cheese with a white rind, a type that can harbour listeria. UK guidance says these cheeses must be thoroughly cooked, whether or not they're made with pasteurised milk. A whole baked camembert is fine once it's bubbling hot in the middle.",
      tr: "Camembert de brie gibi beyaz kabuklu, küfle olgunlaşan yumuşak bir peynirdir ve bu tür peynirler listeria barındırabilir. İngiltere'deki rehberler, pastörize sütten yapılmış olsun ya da olmasın bu peynirlerin iyice pişirilmesini öneriyor. Fırında bütün camembert, ortası fokurdayacak kadar ısındığında yenebilir.",
    },
    tips: {
      en: ["Bake until the centre is bubbling, not just soft.", "Eat it hot, straight away, rather than letting it cool and sit out."],
      tr: ["Ortası sadece yumuşamakla kalmasın, fokurdayana kadar pişir.", "Soğuyup beklemesine izin vermeden, sıcakken hemen ye."],
    },
    sources: [S.nhsFoods, S.cdcListeriaPrevention],
  },
  {
    id: "feta",
    category: "food",
    emoji: "🧀",
    name: { en: "Feta", tr: "Feta peyniri" },
    aliases: {
      en: ["feta cheese", "greek cheese", "salad cheese", "greek salad"],
      tr: ["feta", "yunan peyniri", "salata peyniri", "yunan salatası"],
    },
    verdict: "caution",
    summary: {
      en: "Yes, if it's made from pasteurised milk, as most supermarket feta is, so check the label.",
      tr: "Pastörize sütten yapılmışsa evet; marketteki fetaların çoğu öyledir, yine de etiketi kontrol et.",
    },
    details: {
      en: "Pasteurised feta is on both the NHS and CDC lists of safer cheeses in pregnancy. The risk comes from feta made with raw (unpasteurised) milk, which can carry listeria. Traditional or homemade feta at markets and in some restaurants may not be pasteurised.",
      tr: "Pastörize feta, hem NHS'in hem de CDC'nin hamilelikte daha güvenli peynirler listesinde yer alır. Risk, listeria taşıyabilen çiğ (pastörize edilmemiş) sütten yapılan fetada. Pazarda ya da bazı restoranlarda satılan geleneksel veya ev yapımı fetalar pastörize olmayabilir.",
    },
    tips: {
      en: ["Look for 'made with pasteurised milk' on the pack.", "In restaurants, ask if the feta is pasteurised, or choose a cooked dish."],
      tr: ["Pakette 'pastörize sütten üretilmiştir' ibaresini ara.", "Restoranda fetanın pastörize olup olmadığını sor ya da pişmiş bir yemek seç."],
    },
    sources: [S.nhsFoods, S.cdcListeriaPrevention],
  },
  {
    id: "halloumi",
    category: "food",
    emoji: "🧀",
    name: { en: "Halloumi", tr: "Hellim" },
    aliases: {
      en: ["halloumi cheese", "hellim", "grilled halloumi", "fried halloumi"],
      tr: ["hellim", "hellim peyniri", "halloumi", "ızgara hellim"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, pasteurised halloumi is fine, whether it's grilled, fried or eaten cold.",
      tr: "Evet, pastörize hellim ızgara, kızartma ya da soğuk, her şekilde yenebilir.",
    },
    details: {
      en: "Halloumi is a firm, brined cheese, and the NHS lists pasteurised halloumi among the cheeses that are safe in pregnancy. Almost all halloumi sold in shops is made from pasteurised milk. Grilling or frying it adds an extra layer of safety.",
      tr: "Hellim sert dokulu, salamura bir peynirdir ve NHS pastörize hellimi hamilelikte güvenli peynirler arasında sayar. Marketlerde satılan hellimin neredeyse tamamı pastörize sütten yapılır. Izgarada ya da tavada pişirmek ek bir güvence sağlar.",
    },
    tips: {
      en: ["If it's from a market stall or small producer, check that it says pasteurised."],
      tr: ["Pazardan ya da küçük üreticiden alıyorsan 'pastörize' yazdığından emin ol."],
    },
    sources: [S.nhsFoods],
  },
  {
    id: "mozzarella",
    category: "food",
    emoji: "🧀",
    name: { en: "Mozzarella & burrata", tr: "Mozzarella ve burrata" },
    aliases: {
      en: ["mozzarella", "burrata", "buffalo mozzarella", "pizza cheese", "bocconcini", "caprese"],
      tr: ["mozzarella", "manda mozzarellası", "burrata", "pizza peyniri", "dil peyniri", "örgü peyniri"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, pasteurised mozzarella and burrata are safe, fresh or melted on a pizza.",
      tr: "Evet, pastörize mozzarella ve burrata taze ya da pizzada eritilmiş olarak güvenlidir.",
    },
    details: {
      en: "Although mozzarella is soft and fresh, the NHS lists pasteurised mozzarella and burrata as safe, and the CDC includes pasteurised mozzarella among its safer choices. Shop-bought mozzarella is almost always pasteurised. As with any fresh cheese, keep it chilled and eat it by the use-by date.",
      tr: "Mozzarella yumuşak ve taze bir peynir olsa da NHS pastörize mozzarella ve burratayı güvenli sayar; CDC de pastörize mozzarellayı daha güvenli seçenekler arasında gösterir. Marketteki mozzarella neredeyse her zaman pastörizedir. Her taze peynirde olduğu gibi buzdolabında sakla ve son tüketim tarihinden önce tüket.",
    },
    tips: {
      en: ["Keep it chilled and follow the 'once opened, eat within' advice on the pack."],
      tr: ["Buzdolabında sakla ve paketteki 'açıldıktan sonra tüketim süresi' uyarısına uy."],
    },
    sources: [S.nhsFoods, S.cdcListeriaPrevention],
  },
  {
    id: "parmesan",
    category: "food",
    emoji: "🧀",
    name: { en: "Parmesan", tr: "Parmesan" },
    aliases: {
      en: ["parmigiano reggiano", "grana padano", "pecorino", "hard cheese", "aged cheese"],
      tr: ["parmesan peyniri", "parmigiano", "grana padano", "sert peynir", "olgun peynir"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, parmesan and other hard cheeses are safe, even when they're made from unpasteurised milk.",
      tr: "Evet, parmesan ve diğer sert peynirler çiğ sütten yapılmış olsalar bile güvenlidir.",
    },
    details: {
      en: "Hard, aged cheeses like parmesan contain very little moisture, so listeria is unlikely to grow in them. That's why the NHS says hard cheeses are safe in pregnancy whether or not they're pasteurised. Parmigiano Reggiano is traditionally made with raw milk and is still considered fine.",
      tr: "Parmesan gibi uzun süre olgunlaştırılmış sert peynirlerde çok az nem bulunur, bu yüzden listeria üreme olasılığı düşüktür. NHS de bu nedenle sert peynirlerin pastörize olsun olmasın hamilelikte güvenli olduğunu söyler. Geleneksel Parmigiano Reggiano çiğ sütle yapılır ve yine de güvenli kabul edilir.",
    },
    tips: {
      en: ["Grate it freely over pasta, soups or salads."],
      tr: ["Makarnaya, çorbaya ya da salataya gönül rahatlığıyla rendele."],
    },
    sources: [S.nhsFoods],
  },
  {
    id: "cheddar",
    category: "food",
    emoji: "🧀",
    name: { en: "Cheddar & hard cheeses", tr: "Çedar ve sert peynirler" },
    aliases: {
      en: ["cheddar", "gruyere", "emmental", "manchego", "gouda", "edam", "hard cheese"],
      tr: ["çedar", "cheddar", "gravyer", "gouda", "edam", "sert peynir", "dilimli peynir"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, cheddar and other hard cheeses are safe, and pasteurised semi-hard ones like edam are too.",
      tr: "Evet, çedar ve diğer sert peynirler güvenlidir; edam gibi pastörize yarı sert peynirler de öyle.",
    },
    details: {
      en: "The NHS lists cheddar, gruyère and other hard cheeses as safe in pregnancy, pasteurised or not, because their low moisture makes listeria growth unlikely. Semi-hard cheeses such as edam and gouda are fine when made with pasteurised milk. Hard cheeses are also a handy source of calcium and protein.",
      tr: "NHS çedar, gravyer ve diğer sert peynirleri pastörize olsun olmasın hamilelikte güvenli sayar, çünkü düşük nem listeria üremesini zorlaştırır. Edam ve gouda gibi yarı sert peynirler pastörize sütten yapıldığında sorun değildir. Sert peynirler aynı zamanda pratik bir kalsiyum ve protein kaynağıdır.",
    },
    tips: {
      en: ["Pair it with fruit or wholegrain crackers for an easy snack."],
      tr: ["Meyve ya da tam tahıllı krakerle birlikte pratik bir ara öğün yap."],
    },
    sources: [S.nhsFoods],
  },
  {
    id: "blue-cheese",
    category: "food",
    emoji: "🧀",
    name: { en: "Blue cheese", tr: "Küflü (mavi) peynir" },
    aliases: {
      en: ["gorgonzola", "roquefort", "danish blue", "blue-veined cheese", "blue cheese dressing"],
      tr: ["küflü peynir", "rokfor", "gorgonzola", "mavi peynir", "mavi küflü peynir"],
    },
    verdict: "caution",
    summary: {
      en: "Soft blue cheeses like gorgonzola and roquefort are fine only when cooked until steaming hot.",
      tr: "Gorgonzola ve rokfor gibi yumuşak mavi küflü peynirler yalnızca dumanı tütene kadar pişirildiğinde uygundur.",
    },
    details: {
      en: "Soft blue-veined cheeses are moist and mould-ripened, which makes them more likely to contain listeria. The NHS advises cooking them thoroughly, whether pasteurised or not. A gorgonzola sauce heated until bubbling is fine, but crumbled cold blue cheese on a salad is best skipped.",
      tr: "Yumuşak, mavi damarlı peynirler nemlidir ve küfle olgunlaşır; bu da listeria içerme olasılıklarını artırır. NHS, pastörize olsun olmasın bunların iyice pişirilmesini önerir. Fokurdayana kadar ısıtılmış gorgonzola sos sorun değil, ama salataya soğuk ufalanmış küflü peyniri şimdilik atla.",
    },
    tips: {
      en: ["Use it in sauces or bakes that are heated until bubbling.", "When eating out, ask for dressings without blue cheese."],
      tr: ["Fokurdayana kadar ısıtılan sos ve fırın yemeklerinde kullan.", "Dışarıda yerken sosların küflü peynirsiz olmasını iste."],
    },
    sources: [S.nhsFoods],
  },
  {
    id: "goats-cheese",
    category: "food",
    emoji: "🐐",
    name: { en: "Goat's cheese", tr: "Keçi peyniri" },
    aliases: {
      en: ["goat cheese", "goats cheese", "chevre", "chèvre", "rindless goat cheese", "goat cheese log"],
      tr: ["keçi peyniri", "keçi sütü peyniri", "chevre", "rulo keçi peyniri", "kabuksuz keçi peyniri"],
    },
    verdict: "caution",
    summary: {
      en: "Rindless, pasteurised goat's cheese is fine, but the white-rinded kind must be cooked until steaming hot.",
      tr: "Kabuksuz ve pastörize keçi peyniri sorun değil, ama dışı beyaz kabuklu olanı dumanı tütene kadar pişirilmeli.",
    },
    details: {
      en: "The NHS lists pasteurised goat's cheese without a white coating (rind) as safe. Mould-ripened goat's cheese with a white rind, such as chèvre logs, is treated like brie: it can harbour listeria, so it needs thorough cooking. Any goat's cheese made from unpasteurised milk should also be cooked.",
      tr: "NHS, dışında beyaz kaplama (kabuk) olmayan pastörize keçi peynirini güvenli sayar. Rulo chèvre gibi beyaz kabuklu, küfle olgunlaşan keçi peynirleri brie gibi değerlendirilir: listeria barındırabildikleri için iyice pişirilmeleri gerekir. Pastörize edilmemiş sütten yapılan her keçi peyniri de pişirilerek yenmeli.",
    },
    tips: {
      en: ["Grilled goat's cheese on toast is fine once it's hot right through.", "For soft, rindless types, check the label says pasteurised."],
      tr: ["Ekmek üstünde ızgara keçi peyniri, içi tamamen ısındığında yenebilir.", "Yumuşak, kabuksuz türlerde etikette 'pastörize' yazısını ara."],
    },
    sources: [S.nhsFoods],
  },
  {
    id: "cottage-cheese",
    category: "food",
    emoji: "🥣",
    name: { en: "Cottage cheese", tr: "Cottage peyniri" },
    aliases: {
      en: ["cottage cheese", "curd cheese", "low-fat cheese"],
      tr: ["cottage", "taneli peynir", "kotaj peyniri", "diyet peynir"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, cottage cheese made from pasteurised milk is safe and a good source of protein.",
      tr: "Evet, pastörize sütten yapılan cottage peyniri güvenlidir ve iyi bir protein kaynağıdır.",
    },
    details: {
      en: "Both the NHS and the CDC list pasteurised cottage cheese as a safe choice in pregnancy. Shop-bought cottage cheese is made from pasteurised milk. Keep it chilled and eat it before the use-by date.",
      tr: "Hem NHS hem de CDC pastörize cottage peynirini hamilelikte güvenli seçenekler arasında sayar. Marketteki cottage peynirleri pastörize sütten yapılır. Buzdolabında sakla ve son tüketim tarihinden önce tüket.",
    },
    tips: {
      en: ["Try it with fruit or on toast for a protein-rich snack."],
      tr: ["Protein dolu bir ara öğün için meyveyle ya da kızarmış ekmek üstünde dene."],
    },
    sources: [S.nhsFoods, S.cdcListeriaPrevention],
  },
  {
    id: "cream-cheese",
    category: "food",
    emoji: "🥯",
    name: { en: "Cream cheese & mascarpone", tr: "Krem peynir ve mascarpone" },
    aliases: {
      en: ["cream cheese", "philadelphia", "mascarpone", "cheese spread", "cheesecake", "frosting"],
      tr: ["krem peynir", "labne", "sürülebilir peynir", "mascarpone", "cheesecake", "üçgen peynir"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, pasteurised cream cheese and mascarpone are safe, including baked into cheesecake.",
      tr: "Evet, pastörize krem peynir ve mascarpone, fırında cheesecake içinde de dahil olmak üzere güvenlidir.",
    },
    details: {
      en: "The NHS and the CDC both list pasteurised cream cheese as safe in pregnancy, and the NHS includes mascarpone and processed cheese spreads too. Shop-bought spreads are made from pasteurised milk. Desserts are a separate question: some no-bake cheesecakes and mousses also contain raw egg.",
      tr: "NHS ve CDC pastörize krem peyniri hamilelikte güvenli sayar; NHS bu listeye mascarpone ve işlenmiş sürülebilir peynirleri de ekler. Marketteki sürülebilir peynirler pastörize sütten yapılır. Tatlılar ise ayrı bir konu: pişmeyen bazı cheesecake ve muslarda çiğ yumurta da bulunabilir.",
    },
    tips: {
      en: ["For no-bake desserts, check whether the recipe uses raw eggs."],
      tr: ["Pişirilmeyen tatlılarda tarifte çiğ yumurta olup olmadığına bak."],
    },
    sources: [S.nhsFoods, S.cdcListeriaPrevention],
  },
  {
    id: "ricotta",
    category: "food",
    emoji: "🧀",
    name: { en: "Ricotta", tr: "Ricotta" },
    aliases: {
      en: ["ricotta cheese", "cannoli", "lasagne", "stuffed pasta"],
      tr: ["ricotta peyniri", "rikota", "lazanya", "dolgulu makarna"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, pasteurised ricotta is safe, fresh or baked into dishes like lasagne.",
      tr: "Evet, pastörize ricotta taze ya da lazanya gibi fırın yemeklerinde güvenlidir.",
    },
    details: {
      en: "The NHS lists pasteurised ricotta among the soft cheeses that are safe in pregnancy, and supermarket ricotta is made from pasteurised milk. Fresh cheeses sold loose or made at home are more likely to be contaminated after making. Stick to sealed packs and eat them before the use-by date.",
      tr: "NHS pastörize ricottayı hamilelikte güvenli yumuşak peynirler arasında sayar ve marketteki ricotta pastörize sütten yapılır. Açıkta satılan ya da evde yapılan taze peynirlerin üretimden sonra kirlenme olasılığı daha yüksektir. Kapalı paketleri tercih et ve son tüketim tarihinden önce tüket.",
    },
    tips: {
      en: ["Choose sealed, chilled packs over loose ricotta from a deli counter."],
      tr: ["Şarküteri tezgahındaki açık ricotta yerine kapalı ve soğukta tutulan paketleri seç."],
    },
    sources: [S.nhsFoods],
  },
  {
    id: "paneer",
    category: "food",
    emoji: "🧀",
    name: { en: "Paneer", tr: "Paneer" },
    aliases: {
      en: ["paneer cheese", "indian cheese", "palak paneer", "paneer tikka"],
      tr: ["paneer peyniri", "hint peyniri", "paneer tikka"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, paneer made from pasteurised milk is safe, cooked or uncooked.",
      tr: "Evet, pastörize sütten yapılan paneer pişmiş ya da çiğ, güvenle yenebilir.",
    },
    details: {
      en: "The NHS includes pasteurised paneer among the soft cheeses that are safe in pregnancy. Paneer is usually cooked in curries or grilled, which adds extra safety. If you make it at home, use pasteurised milk or milk you've brought to the boil.",
      tr: "NHS pastörize paneeri hamilelikte güvenli yumuşak peynirler arasında sayar. Paneer genellikle körili yemeklerde pişirilir ya da ızgara yapılır, bu da ek güvence sağlar. Evde yapıyorsan pastörize süt ya da kaynatılmış süt kullan.",
    },
    tips: {
      en: ["Making paneer at home? Start with pasteurised or boiled milk."],
      tr: ["Evde paneer mi yapıyorsun? Pastörize ya da kaynatılmış sütle başla."],
    },
    sources: [S.nhsFoods],
  },
  {
    id: "fresh-cheese",
    category: "food",
    emoji: "🥛",
    name: { en: "Lor, çökelek & fresh curd cheese", tr: "Lor, çökelek ve taze peynirler" },
    aliases: {
      en: ["lor", "cokelek", "labneh", "queso fresco", "queso blanco", "requeson", "farmer's cheese", "fresh cheese"],
      tr: ["lor peyniri", "çökelek", "ev yapımı labne", "taze peynir", "köy loru", "süzme peynir"],
    },
    verdict: "caution",
    summary: {
      en: "Packaged, pasteurised and well chilled is fine, but skip loose or homemade fresh cheese unless it's cooked until hot.",
      tr: "Paketli, pastörize ve soğukta saklanmış olanlar uygundur; açık ya da ev yapımı taze peyniri pişirmeden yeme.",
    },
    details: {
      en: "Fresh, moist cheeses like lor, çökelek, labneh and queso fresco can easily pick up listeria after they're made, even when the milk was heat-treated. The CDC advises heating queso fresco-type cheeses until steaming hot. Baking them into dishes like börek until piping hot removes the risk.",
      tr: "Lor, çökelek, labne ve queso fresco gibi nemli taze peynirlere, süt ısıl işlem görmüş olsa bile üretimden sonra kolayca listeria bulaşabilir. ABD'deki CDC, bu tür taze peynirlerin dumanı tütene kadar ısıtılmasını önerir. Börek gibi yemeklerde iyice ısınana kadar pişirmek riski ortadan kaldırır.",
    },
    tips: {
      en: ["Buy sealed packs from known brands and keep them in the fridge.", "Use loose or village lor in baked dishes like börek, cooked until hot."],
      tr: ["Bilinen markaların kapalı paketlerini al ve buzdolabında sakla.", "Açık ya da köy lorunu börek gibi fırın yemeklerinde iyice ısınana kadar pişirerek kullan."],
    },
    sources: [S.cdcListeriaPrevention, S.nhsFoods],
  },
  {
    id: "beyaz-peynir",
    category: "food",
    emoji: "🧀",
    name: { en: "Turkish white cheese (beyaz peynir)", tr: "Beyaz peynir" },
    aliases: {
      en: ["beyaz peynir", "turkish feta", "white cheese", "brined white cheese", "ezine cheese"],
      tr: ["tam yağlı beyaz peynir", "ezine peyniri", "salamura peynir", "kahvaltılık peynir", "açık peynir", "teneke peyniri"],
    },
    verdict: "caution",
    summary: {
      en: "Yes if it's pasteurised, as most packaged brands are; avoid loose or unpasteurised white cheese unless it's cooked.",
      tr: "Pastörize ise evet, paketli markaların çoğu öyledir; açık ya da pastörize olmayan beyaz peyniri pişirmeden yeme.",
    },
    details: {
      en: "Beyaz peynir is a brined cheese similar to feta. Made from pasteurised milk, it's a safe breakfast staple, but cheese made from raw milk can carry listeria and other bacteria. Loose cheese sold from tins at markets, or bought straight from villages, may not be pasteurised.",
      tr: "Beyaz peynir fetaya benzeyen salamura bir peynirdir. Pastörize sütten yapıldığında güvenle yenebilecek bir kahvaltılıktır; ancak çiğ sütten yapılan peynir listeria ve başka bakteriler taşıyabilir. Pazarda tenekeden açık satılan ya da doğrudan köyden alınan peynirler pastörize olmayabilir.",
    },
    tips: {
      en: ["Look for 'pastörize sütten' on the label.", "Use unpasteurised cheese only in dishes cooked until steaming, like börek or menemen."],
      tr: ["Etikette 'pastörize sütten üretilmiştir' ibaresini ara.", "Pastörize olmayan peyniri yalnızca börek ya da menemen gibi iyice pişen yemeklerde kullan."],
    },
    sources: [S.nhsFoods, S.cdcListeriaPrevention],
  },
  {
    id: "kasar",
    category: "food",
    emoji: "🧀",
    name: { en: "Kaşar cheese", tr: "Kaşar peyniri" },
    aliases: {
      en: ["kasar", "kashkaval", "turkish melting cheese", "toastie cheese"],
      tr: ["kaşar", "taze kaşar", "eski kaşar", "tost peyniri", "kaşarlı tost"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, pasteurised kaşar is safe, cold at breakfast or melted in a toastie.",
      tr: "Evet, pastörize kaşar kahvaltıda soğuk ya da tostta eritilmiş olarak güvenlidir.",
    },
    details: {
      en: "Kaşar is a semi-hard cheese, and the NHS lists pasteurised semi-hard cheeses as safe in pregnancy. Most kaşar sold in shops is made from pasteurised milk. Aged (eski) kaşar is harder and drier, which makes listeria growth even less likely.",
      tr: "Kaşar yarı sert bir peynirdir ve NHS pastörize yarı sert peynirleri hamilelikte güvenli sayar. Marketlerde satılan kaşarın çoğu pastörize sütten yapılır. Eski kaşar daha sert ve kurudur; bu da listeria üremesini daha da zorlaştırır.",
    },
    tips: {
      en: ["If it's homemade from raw milk, enjoy it melted until hot."],
      tr: ["Çiğ sütten ev yapımıysa, iyice ısınıp eriyene kadar pişirerek tüket."],
    },
    sources: [S.nhsFoods],
  },
  {
    id: "tulum",
    category: "food",
    emoji: "🧀",
    name: { en: "Tulum cheese", tr: "Tulum peyniri" },
    aliases: {
      en: ["tulum", "erzincan tulum", "goatskin cheese", "crumbly turkish cheese"],
      tr: ["tulum", "erzincan tulumu", "izmir tulumu", "deri tulum", "ufalanan peynir"],
    },
    verdict: "caution",
    summary: {
      en: "Choose pasteurised tulum, and eat traditional raw-milk tulum only cooked, for example baked into börek.",
      tr: "Pastörize tulum peynirini seç; çiğ sütten yapılan geleneksel tulumu yalnızca börek gibi pişmiş yemeklerde tüket.",
    },
    details: {
      en: "Many traditional tulum cheeses are made from raw sheep's or goat's milk. Unpasteurised cheese can carry listeria, which is rare but can cause miscarriage or serious illness in a newborn. Industrially made tulum is often pasteurised, so check the label.",
      tr: "Pek çok geleneksel tulum peyniri çiğ koyun ya da keçi sütünden yapılır. Pastörize edilmemiş peynir listeria taşıyabilir; bu enfeksiyon nadirdir ama düşüğe ya da yenidoğanda ciddi hastalığa yol açabilir. Fabrikada üretilen tulum peyniri çoğu zaman pastörizedir, etiketi kontrol et.",
    },
    tips: {
      en: ["Check for 'pastörize' on the pack.", "Bake raw-milk tulum into börek or pide until steaming hot."],
      tr: ["Pakette 'pastörize' ibaresini ara.", "Çiğ sütten tulumu börek ya da pide içinde dumanı tütene kadar pişir."],
    },
    sources: [S.nhsFoods, S.cdcListeriaPrevention],
  },
  {
    id: "village-cheese",
    category: "food",
    emoji: "🧀",
    name: { en: "Unpasteurised village cheese", tr: "Köy peyniri (çiğ sütten)" },
    aliases: {
      en: ["raw milk cheese", "unpasteurised cheese", "unpasteurized cheese", "farm cheese", "koy peyniri", "artisan cheese"],
      tr: ["köy peyniri", "çiğ süt peyniri", "pastörize olmayan peynir", "ev yapımı peynir", "pazar peyniri"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid soft or crumbly raw-milk cheese unless it's cooked until steaming hot; hard, aged cheese is lower risk.",
      tr: "Çiğ sütten yapılan yumuşak ya da ufalanan peyniri dumanı tütene kadar pişirmeden yeme; sert, olgun peynirler daha az risklidir.",
    },
    details: {
      en: "Cheese made from raw milk can carry listeria and other harmful bacteria. Listeria infection can cause miscarriage, stillbirth or a very unwell newborn, even when you only feel mildly ill. Cooking the cheese until steaming hot makes it safe, and hard, aged cheeses are low risk even when unpasteurised.",
      tr: "Çiğ sütten yapılan peynir listeria ve başka zararlı bakteriler taşıyabilir. Listeria enfeksiyonu, sen kendini sadece hafif hasta hissetsen bile düşüğe, ölü doğuma ya da bebeğin ağır hastalanmasına yol açabilir. Peyniri dumanı tütene kadar pişirmek onu güvenli hale getirir; sert ve olgunlaşmış peynirler pastörize olmasa da düşük risklidir.",
    },
    tips: {
      en: ["Ask the seller whether the milk was pasteurised or boiled.", "Bake village cheese into börek or gözleme until it's steaming hot."],
      tr: ["Satıcıya sütün pastörize edilip edilmediğini ya da kaynatılıp kaynatılmadığını sor.", "Köy peynirini börek ya da gözleme içinde dumanı tütene kadar pişirerek ye."],
    },
    sources: [S.nhsFoods, S.cdcRawMilk],
  },
  {
    id: "kaymak",
    category: "food",
    emoji: "🍯",
    name: { en: "Kaymak (clotted cream)", tr: "Kaymak" },
    aliases: {
      en: ["clotted cream", "kaymak", "buffalo cream", "qaimar", "eishta", "fresh cream"],
      tr: ["manda kaymağı", "afyon kaymağı", "bal kaymak", "kaymaklı kahvaltı", "taze krema"],
    },
    verdict: "caution",
    summary: {
      en: "Packaged, pasteurised kaymak is fine, but take care with loose kaymak from markets and small dairies.",
      tr: "Paketli ve pastörize kaymak sorun değil; pazarda ya da küçük mandıralarda açık satılan kaymağa dikkat et.",
    },
    details: {
      en: "Traditional kaymak is made from heated milk, but it's rich and moist and is often handled and sold loose, so it can pick up bacteria such as listeria afterwards. The NHS says pasteurised cream is safe and unpasteurised cream should be avoided. Packaged kaymak from a known brand, kept chilled, is the safest choice.",
      tr: "Geleneksel kaymak ısıtılmış sütten yapılır; ancak yağlı ve nemlidir, çoğu zaman elde işlenip açıkta satılır, bu yüzden sonradan listeria gibi bakteriler bulaşabilir. NHS pastörize kremanın güvenli olduğunu, pastörize edilmemiş kremadan ise kaçınılması gerektiğini söyler. Bilinen bir markanın paketli ve soğukta saklanan kaymağı en güvenli seçimdir.",
    },
    tips: {
      en: ["Buy sealed packs and keep them in the fridge.", "Skip kaymak that has been sitting out at room temperature."],
      tr: ["Kapalı paketleri al ve buzdolabında sakla.", "Oda sıcaklığında bekletilmiş kaymağı yeme."],
    },
    sources: [S.nhsFoods, S.cdcListeriaPrevention],
  },

  // Eggs

  {
    id: "runny-eggs",
    category: "food",
    emoji: "🍳",
    name: { en: "Runny eggs", tr: "Rafadan ve akışkan yumurta" },
    aliases: {
      en: ["soft-boiled egg", "fried egg", "sunny side up", "poached egg", "dippy egg", "eggs benedict", "jammy egg", "runny yolk"],
      tr: ["rafadan yumurta", "kayısı kıvamında yumurta", "sahanda yumurta", "göz yumurta", "poşe yumurta", "çılbır", "akışkan sarılı yumurta"],
    },
    verdict: "caution",
    summary: {
      en: "Only with UK eggs carrying the British Lion or Laid in Britain mark; elsewhere, cook eggs until the yolk is firm.",
      tr: "Yalnızca İngiltere'de British Lion ya da Laid in Britain damgalı yumurtalarla; başka yerlerde sarısı katılaşana kadar pişir.",
    },
    details: {
      en: "Undercooked eggs can carry salmonella, which rarely harms the baby but can give you severe food poisoning. In the UK, eggs produced under the British Lion or Laid in Britain schemes are considered low risk and can be eaten runny. Elsewhere, including the US, the advice is to cook eggs until both the white and the yolk are firm.",
      tr: "Az pişmiş yumurta salmonella taşıyabilir; bu bebeğe nadiren zarar verir ama sende ağır besin zehirlenmesine yol açabilir. İngiltere'de British Lion ya da Laid in Britain programlarıyla üretilen yumurtalar düşük riskli kabul edilir ve akışkan yenebilir. ABD dahil diğer ülkelerde ise öneri, yumurtanın hem beyazı hem sarısı katılaşana kadar pişirilmesidir.",
    },
    tips: {
      en: ["Boil eggs a little longer, or flip fried eggs, until the yolk is set.", "For çılbır or eggs Benedict, use pasteurised eggs or skip the runny yolk."],
      tr: ["Yumurtayı biraz daha uzun haşla ya da sahandakini çevir, sarısı katılaşsın.", "Çılbır ya da benedikt yumurta için pastörize yumurta kullan ya da akışkan sarıyı atla."],
    },
    sources: [S.nhsFoods, S.fdaEggs],
  },
  {
    id: "raw-eggs",
    category: "food",
    emoji: "🥚",
    name: { en: "Raw eggs", tr: "Çiğ yumurta" },
    aliases: {
      en: ["raw egg", "mousse", "eggnog", "caesar dressing", "hollandaise", "raw egg smoothie", "royal icing"],
      tr: ["çiğ yumurtalı tatlı", "mus", "sezar sos", "hollandez sos", "yumurtalı smoothie", "ev yapımı krema"],
    },
    verdict: "caution",
    summary: {
      en: "Only if the eggs are pasteurised (or UK Lion-marked); otherwise skip raw-egg foods like mousse and Caesar dressing.",
      tr: "Yalnızca pastörize (ya da İngiltere'de Lion damgalı) yumurtayla; aksi halde mus ve sezar sos gibi çiğ yumurtalı yiyecekleri atla.",
    },
    details: {
      en: "Raw and lightly cooked eggs can carry salmonella, which can cause vomiting, diarrhoea and fever, and the FDA lists pregnant women among those at greater risk of severe illness. For dishes served with raw egg, the FDA advises using pasteurised eggs or pasteurised egg products. Shop-bought products like mayonnaise and dressings are made with pasteurised egg.",
      tr: "Çiğ ya da az pişmiş yumurta kusma, ishal ve ateşe yol açabilen salmonella taşıyabilir; FDA hamileleri ağır hastalık açısından daha yüksek risk taşıyanlar arasında sayar. Çiğ yumurtayla servis edilen yemekler için FDA pastörize yumurta ya da pastörize yumurta ürünleri kullanılmasını önerir. Mayonez ve sos gibi hazır ürünler pastörize yumurtayla yapılır.",
    },
    tips: {
      en: ["Ask restaurants whether homemade sauces and desserts contain raw egg.", "At home, use pasteurised eggs for anything that won't be cooked."],
      tr: ["Restoranda ev yapımı sos ve tatlılarda çiğ yumurta olup olmadığını sor.", "Evde pişmeyecek her şey için pastörize yumurta kullan."],
    },
    sources: [S.fdaEggs, S.nhsFoods],
  },
  {
    id: "homemade-mayonnaise",
    category: "food",
    emoji: "🥚",
    name: { en: "Homemade mayonnaise & aioli", tr: "Ev yapımı mayonez ve aioli" },
    aliases: {
      en: ["home made mayo", "fresh mayonnaise", "aioli", "garlic mayo", "house mayo"],
      tr: ["ev yapımı mayonez", "evde mayonez", "sarımsaklı mayonez", "aioli", "taze mayonez"],
    },
    verdict: "caution",
    summary: {
      en: "Only if it's made with pasteurised eggs (or UK Lion eggs); otherwise it's best skipped.",
      tr: "Yalnızca pastörize (ya da İngiltere'de Lion damgalı) yumurtayla yapılmışsa; aksi halde yememek en iyisi.",
    },
    details: {
      en: "Homemade mayonnaise and aioli use raw egg yolk, which can carry salmonella. The NHS says mayonnaise made with British Lion or Laid in Britain eggs is fine, while US advice is to use pasteurised eggs for raw-egg recipes. Restaurant 'house mayo' and aioli are often made fresh, so it's worth asking.",
      tr: "Ev yapımı mayonez ve aiolide salmonella taşıyabilen çiğ yumurta sarısı kullanılır. NHS, British Lion ya da Laid in Britain yumurtalarıyla yapılan mayonezin sorun olmadığını söyler; ABD'nin önerisi ise çiğ yumurtalı tariflerde pastörize yumurta kullanmaktır. Restoranların kendi mayonez ve aiolileri çoğu zaman taze yapılır, sormakta fayda var.",
    },
    tips: {
      en: ["Ask whether house sauces are made fresh with raw egg.", "Shop-bought jars are a safe swap."],
      tr: ["Restoranın kendi soslarının çiğ yumurtayla taze yapılıp yapılmadığını sor.", "Hazır kavanoz mayonez güvenli bir alternatiftir."],
    },
    sources: [S.nhsFoods, S.fdaEggs],
  },
  {
    id: "mayonnaise",
    category: "food",
    emoji: "🥪",
    name: { en: "Mayonnaise (shop-bought)", tr: "Hazır mayonez" },
    aliases: {
      en: ["mayo", "jarred mayonnaise", "salad cream", "tartar sauce", "coleslaw dressing"],
      tr: ["mayonez", "kavanoz mayonez", "tartar sos", "rus salatası", "mayonezli salata"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, jarred, shop-bought mayonnaise is made with pasteurised egg and is safe.",
      tr: "Evet, kavanozda satılan hazır mayonez pastörize yumurtayla yapılır ve güvenlidir.",
    },
    details: {
      en: "Commercially made mayonnaise uses pasteurised egg, so it doesn't carry the raw-egg risk of homemade versions. Once opened, keep the jar in the fridge. Take more care with ready-made salads and sandwiches containing mayonnaise, which the NHS says should be kept chilled and eaten before the use-by date.",
      tr: "Fabrikada üretilen mayonezde pastörize yumurta kullanılır; bu yüzden ev yapımı mayonezdeki çiğ yumurta riskini taşımaz. Açtıktan sonra kavanozu buzdolabında sakla. Mayonezli hazır salata ve sandviçlerde daha dikkatli ol; NHS bunların soğukta saklanıp son tüketim tarihinden önce yenmesi gerektiğini söyler.",
    },
    tips: {
      en: ["Refrigerate after opening and don't leave mayo dishes out in the heat."],
      tr: ["Açtıktan sonra buzdolabına koy; mayonezli yemekleri sıcakta bekletme."],
    },
    sources: [S.nhsFoods, S.fdaEggs],
  },
  {
    id: "tiramisu",
    category: "food",
    emoji: "🍰",
    name: { en: "Tiramisu", tr: "Tiramisu" },
    aliases: {
      en: ["tiramisu", "mascarpone dessert", "coffee dessert", "zabaglione", "trifle"],
      tr: ["tiramisu", "mascarponeli tatlı", "kahveli tatlı", "kup tiramisu"],
    },
    verdict: "caution",
    summary: {
      en: "Shop-bought tiramisu made with pasteurised egg is usually fine, but homemade versions often use raw egg and alcohol.",
      tr: "Pastörize yumurtayla yapılan hazır tiramisu genellikle sorun değil; ev yapımlarında ise çoğu zaman çiğ yumurta ve alkol bulunur.",
    },
    details: {
      en: "Classic tiramisu is made with raw egg, which can carry salmonella, and it often includes Marsala, rum or coffee liqueur. Many supermarket versions use pasteurised egg and no alcohol, so check the label. The coffee adds a little caffeine to your daily total as well.",
      tr: "Klasik tiramisu salmonella taşıyabilen çiğ yumurtayla yapılır ve sıklıkla Marsala, rom ya da kahve likörü içerir. Marketlerdeki pek çok tiramisu pastörize yumurtayla ve alkolsüz yapılır, etiketi kontrol et. İçindeki kahve de günlük kafein toplamına biraz eklenir.",
    },
    tips: {
      en: ["Check labels for pasteurised egg and no alcohol.", "At home, use pasteurised egg or an egg-free recipe."],
      tr: ["Etikette pastörize yumurta ve alkolsüz ibaresine bak.", "Evde pastörize yumurta ya da yumurtasız bir tarif kullan."],
    },
    sources: [S.nhsFoods, S.fdaEggs],
  },
  {
    id: "cookie-dough",
    category: "food",
    emoji: "🍪",
    name: { en: "Raw cookie dough & cake batter", tr: "Çiğ kurabiye ve kek hamuru" },
    aliases: {
      en: ["cookie dough", "cake batter", "raw dough", "raw flour", "brownie batter", "licking the spoon"],
      tr: ["çiğ hamur", "kurabiye hamuru", "kek hamuru", "çiğ un", "kaşık yalamak"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid tasting raw dough or batter, because both raw flour and raw egg can carry harmful bacteria.",
      tr: "Çiğ hamurun ya da kek karışımının tadına bakma, çünkü hem çiğ un hem çiğ yumurta zararlı bakteriler taşıyabilir.",
    },
    details: {
      en: "Raw flour isn't treated to kill germs and has been linked to E. coli outbreaks, and raw egg can carry salmonella. Baking or cooking kills both. Edible cookie dough sold as ready-to-eat is made with heat-treated flour and no raw egg, so check the label.",
      tr: "Çiğ un mikropları öldürecek bir işlemden geçmez ve E. coli salgınlarıyla ilişkilendirilmiştir; çiğ yumurta da salmonella taşıyabilir. Fırınlamak ya da pişirmek ikisini de öldürür. Çiğ yenebilir diye satılan hazır kurabiye hamurları ısıl işlem görmüş un ile ve çiğ yumurtasız yapılır, etiketi kontrol et.",
    },
    tips: {
      en: ["Resist licking the spoon: bake first, taste after.", "Wash hands and surfaces after handling raw flour."],
      tr: ["Kaşığı yalama isteğine diren: önce pişir, sonra tat.", "Çiğ unla çalıştıktan sonra ellerini ve tezgahı yıka."],
    },
    sources: [S.fdaFlour, S.fdaEggs],
  },

  // Fish and seafood

  {
    id: "sushi",
    category: "food",
    emoji: "🍣",
    name: { en: "Sushi with raw fish", tr: "Çiğ balıklı suşi" },
    aliases: {
      en: ["sushi", "sashimi", "nigiri", "raw fish", "poke", "ceviche", "crudo", "raw salmon", "tuna tartare"],
      tr: ["suşi", "sushi", "sashimi", "çiğ balık", "poke", "ceviche", "çiğ somon"],
    },
    verdict: "avoid",
    summary: {
      en: "Skip sushi and sashimi made with raw fish or shellfish; sushi with cooked fish or vegetables is fine.",
      tr: "Çiğ balık ya da kabuklu deniz ürünüyle yapılan suşi ve sashimiyi atla; pişmiş balıklı ya da sebzeli suşi sorun değil.",
    },
    details: {
      en: "Raw fish can carry listeria, parasites and other bacteria that cooking would kill. ACOG advises avoiding all raw or undercooked fish in pregnancy, and the NHS now says this applies even if the fish was frozen first. Rolls made with cooked fish, cooked prawns, crab sticks or vegetables are fine.",
      tr: "Çiğ balık listeria, parazitler ve pişirmenin öldüreceği başka bakteriler taşıyabilir. ACOG hamilelikte çiğ ya da az pişmiş tüm balıklardan kaçınılmasını önerir; NHS de artık bunun balık önceden dondurulmuş olsa bile geçerli olduğunu söylüyor. Pişmiş balık, pişmiş karides, yengeç çubuğu ya da sebzeyle yapılan rulolar sorun değil.",
    },
    tips: {
      en: ["Try cooked options like tempura prawn, eel, cooked salmon or avocado rolls.", "Ask the chef which rolls contain raw fish."],
      tr: ["Tempura karides, yılan balığı, pişmiş somon ya da avokadolu rulolar gibi pişmiş seçenekleri dene.", "Hangi rulolarda çiğ balık olduğunu şefe sor."],
    },
    sources: [S.acogSushi, S.nhsFoods],
  },
  {
    id: "sushi-cooked",
    category: "food",
    emoji: "🍱",
    name: { en: "Sushi with cooked fish or veg", tr: "Pişmiş balıklı ya da sebzeli suşi" },
    aliases: {
      en: ["cooked sushi", "california roll", "vegetarian sushi", "veggie sushi", "tempura roll", "unagi", "cucumber roll", "avocado roll"],
      tr: ["pişmiş suşi", "kaliforniya rulo", "sebzeli suşi", "vejetaryen suşi", "tempura rulo", "avokadolu suşi"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, sushi made with cooked fish, cooked shellfish or vegetables is safe in pregnancy.",
      tr: "Evet, pişmiş balık, pişmiş kabuklu deniz ürünü ya da sebzeyle yapılan suşi hamilelikte güvenlidir.",
    },
    details: {
      en: "The NHS lists sushi made with cooked fish or cooked shellfish as safe to eat. The usual food-safety rules still apply: sushi should be kept chilled, and pre-packed sushi eaten before its use-by date. Smoked salmon rolls count as uncooked fish, so skip those.",
      tr: "NHS pişmiş balık ya da pişmiş kabuklu deniz ürünüyle yapılan suşiyi güvenli sayar. Genel gıda güvenliği kuralları yine geçerli: suşi soğukta tutulmalı, paketli suşi son tüketim tarihinden önce yenmeli. Füme somonlu rulolar pişmemiş balık sayılır, onları atla.",
    },
    tips: {
      en: ["Choose freshly made rolls from busy places with good hygiene.", "Go easy on soy sauce if you're watching your salt."],
      tr: ["Hijyenine güvendiğin, kalabalık yerlerde taze hazırlanan rulolar seç.", "Tuz tüketimini izliyorsan soya sosunu az kullan."],
    },
    sources: [S.nhsFoods, S.acogSushi],
  },
  {
    id: "smoked-salmon",
    category: "food",
    emoji: "🐟",
    name: { en: "Smoked salmon & cured fish", tr: "Füme somon ve tuzlanmış balık" },
    aliases: {
      en: ["smoked salmon", "lox", "gravlax", "cold-smoked fish", "smoked trout", "lakerda", "cured fish", "kippers"],
      tr: ["füme somon", "lakerda", "tütsülenmiş balık", "gravlaks", "füme alabalık", "tuzlanmış balık"],
    },
    verdict: "caution",
    summary: {
      en: "Only when it's cooked until steaming hot, as in a hot pasta or quiche; skip cold smoked salmon, gravlax and lakerda.",
      tr: "Yalnızca sıcak makarna ya da kiş gibi yemeklerde dumanı tütene kadar pişirildiğinde; soğuk füme somonu, gravlaksı ve lakerdayı atla.",
    },
    details: {
      en: "Cold-smoked and cured fish isn't cooked, so it can carry listeria. The NHS advises cooking it until steaming hot, and the CDC advises avoiding refrigerated smoked fish unless it's in a cooked dish. Canned or shelf-stable smoked fish in sealed packs is lower risk.",
      tr: "Soğuk tütsülenmiş ve tuzlanmış balık pişirilmez, bu yüzden listeria taşıyabilir. NHS bunların dumanı tütene kadar pişirilmesini, CDC de buzdolabında saklanan füme balığın ancak pişmiş bir yemeğin içinde yenmesini önerir. Konserve ya da oda sıcaklığında saklanabilen kapalı paketteki füme balık daha düşük risklidir.",
    },
    tips: {
      en: ["Stir smoked salmon into hot pasta or scrambled eggs and heat it through.", "Even hot-smoked fish, like smoked mackerel, is safest eaten hot."],
      tr: ["Füme somonu sıcak makarnaya ya da çırpılmış yumurtaya ekleyip iyice ısıt.", "Füme uskumru gibi sıcak tütsülenmiş balığı da ısıtarak yemek en güvenlisi."],
    },
    sources: [S.nhsFoods, S.cdcListeriaPrevention],
  },
  {
    id: "tuna-canned",
    category: "food",
    emoji: "🥫",
    name: { en: "Canned tuna", tr: "Ton balığı konservesi" },
    aliases: {
      en: ["tinned tuna", "tuna can", "tuna salad", "tuna sandwich", "light tuna", "albacore", "skipjack"],
      tr: ["konserve ton balığı", "ton balığı", "ton balıklı sandviç", "ton balıklı salata", "ton balıklı makarna"],
    },
    verdict: "caution",
    summary: {
      en: "Yes, in moderation: the UK limit is 4 cans a week, and US advice favours light tuna over albacore.",
      tr: "Evet, ölçülü olarak: İngiltere'de sınır haftada 4 kutu, ABD ise albacore yerine 'light' ton balığını öneriyor.",
    },
    details: {
      en: "Tuna contains more mercury than most fish, and too much mercury can affect a baby's developing nervous system. The NHS sets a limit of 4 cans a week. The FDA lists canned light tuna as a 'best choice' (2 to 3 servings a week of best-choice fish) and albacore as a 'good choice' (1 serving a week).",
      tr: "Ton balığı çoğu balıktan daha fazla cıva içerir ve fazla cıva bebeğin gelişmekte olan sinir sistemini etkileyebilir. NHS haftada en fazla 4 kutu sınırı koyar. FDA ise konserve 'light' ton balığını 'en iyi seçim' (en iyi seçimlerden haftada 2–3 porsiyon), albacore ton balığını da 'iyi seçim' (haftada 1 porsiyon) olarak gösterir.",
    },
    tips: {
      en: ["Mix it up with lower-mercury fish like salmon, sardines or anchovies.", "Keep shop-bought tuna sandwiches chilled and eat them by the use-by date."],
      tr: ["Somon, sardalya ya da hamsi gibi daha az cıva içeren balıklarla dönüşümlü tüket.", "Hazır ton balıklı sandviçleri soğukta sakla ve son tüketim tarihinden önce ye."],
    },
    sources: [S.nhsFoods, S.fdaFish],
  },
  {
    id: "tuna-steak",
    category: "food",
    emoji: "🐟",
    name: { en: "Tuna steak", tr: "Ton balığı biftek" },
    aliases: {
      en: ["fresh tuna", "seared tuna", "yellowfin tuna", "ahi tuna", "bigeye tuna", "tuna tataki"],
      tr: ["taze ton balığı", "ızgara ton balığı", "ton tataki", "mühürlenmiş ton balığı"],
    },
    verdict: "caution",
    summary: {
      en: "Yes, cooked through and in moderation (no more than 2 steaks a week in the UK), but avoid seared or raw tuna.",
      tr: "Evet, iyice pişmiş ve ölçülü olarak (İngiltere'de haftada en fazla 2 biftek); dışı mühürlenmiş ya da çiğ tonu yeme.",
    },
    details: {
      en: "Fresh tuna is higher in mercury than most fish, so the NHS limits it to 2 steaks a week, and the FDA advises avoiding bigeye tuna altogether. Seared tuna and tataki are rare in the middle, so they carry the same risks as raw fish. Cook steaks until they're opaque all the way through.",
      tr: "Taze ton balığı çoğu balıktan daha fazla cıva içerdiği için NHS haftalık sınırı 2 biftek olarak belirler; FDA ise büyük gözlü (bigeye) ton balığından tamamen kaçınılmasını önerir. Dışı mühürlenmiş ton ve tatakinin ortası çiğ kalır, bu yüzden çiğ balıkla aynı riskleri taşır. Bifteği her yeri opaklaşana kadar pişir.",
    },
    tips: {
      en: ["Ask for it cooked through, with no pink in the middle.", "Mix in lower-mercury fish like salmon, trout or sardines."],
      tr: ["Ortası pembe kalmayacak şekilde iyice pişmiş iste.", "Somon, alabalık ya da sardalya gibi az cıvalı balıklarla dönüşümlü tüket."],
    },
    sources: [S.nhsFoods, S.fdaFish],
  },
  {
    id: "swordfish",
    category: "food",
    emoji: "🐟",
    name: { en: "Swordfish & marlin", tr: "Kılıç balığı ve marlin" },
    aliases: {
      en: ["swordfish", "swordfish steak", "marlin", "high-mercury fish"],
      tr: ["kılıç balığı", "kılıç şiş", "marlin", "yüksek cıvalı balık"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid them, because swordfish and marlin are high in mercury, which can harm a baby's developing nervous system.",
      tr: "Kaçın, çünkü kılıç balığı ve marlin yüksek oranda cıva içerir; bu da bebeğin gelişen sinir sistemine zarar verebilir.",
    },
    details: {
      en: "Large predatory fish build up mercury over their long lives, and swordfish and marlin are on both the NHS and FDA lists of fish to avoid in pregnancy. Mercury crosses the placenta and can affect brain and nerve development. Plenty of other fish give you the same omega-3 benefits with far less mercury.",
      tr: "Uzun ömürlü büyük yırtıcı balıklar vücutlarında cıva biriktirir; kılıç balığı ve marlin de hem NHS'in hem FDA'nın hamilelikte kaçınılacak balıklar listesindedir. Cıva plasentayı geçer ve beyin ile sinir gelişimini etkileyebilir. Aynı omega-3 faydasını çok daha az cıvayla sağlayan pek çok balık var.",
    },
    tips: {
      en: ["Swap kılıç şiş for grilled sea bass, sea bream or salmon."],
      tr: ["Kılıç şiş yerine ızgara levrek, çipura ya da somon seç."],
    },
    sources: [S.nhsFoods, S.fdaFish],
  },
  {
    id: "shark",
    category: "food",
    emoji: "🦈",
    name: { en: "Shark", tr: "Köpek balığı" },
    aliases: {
      en: ["shark steak", "dogfish", "rock salmon", "huss", "flake"],
      tr: ["köpek balığı", "camgöz balığı", "köpek balığı eti"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid it, because shark is one of the highest-mercury fish and is on both UK and US avoid lists.",
      tr: "Kaçın, çünkü köpek balığı en çok cıva içeren balıklardan biridir ve hem İngiltere'nin hem ABD'nin kaçınılacaklar listesindedir.",
    },
    details: {
      en: "Sharks are long-lived predators that accumulate high levels of mercury. In pregnancy, mercury can pass to the baby and affect the developing brain and nervous system. Both the NHS and the FDA advise avoiding shark completely while pregnant or planning a pregnancy.",
      tr: "Köpek balıkları uzun yaşayan yırtıcılardır ve vücutlarında yüksek düzeyde cıva birikir. Hamilelikte cıva bebeğe geçerek gelişen beyni ve sinir sistemini etkileyebilir. NHS ve FDA, hamileyken ya da hamilelik planlarken köpek balığından tamamen kaçınılmasını önerir.",
    },
    tips: {
      en: ["In fish restaurants, choose sea bass, sea bream, cod or haddock instead."],
      tr: ["Balık restoranlarında bunun yerine levrek, çipura, morina ya da mezgit seç."],
    },
    sources: [S.nhsFoods, S.fdaFish],
  },
  {
    id: "king-mackerel",
    category: "food",
    emoji: "🐟",
    name: { en: "King mackerel", tr: "Kral uskumru" },
    aliases: {
      en: ["king mackerel", "kingfish", "tilefish", "orange roughy", "bigeye tuna"],
      tr: ["kral uskumru", "king mackerel", "tilefish", "yüksek cıvalı balık"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid king mackerel; ordinary Atlantic mackerel (uskumru) is a different, low-mercury fish and is fine.",
      tr: "Kral uskumrudan kaçın; bildiğimiz Atlantik uskumrusu farklı ve cıvası düşük bir balıktır, güvenle yenebilir.",
    },
    details: {
      en: "King mackerel is a large ocean fish that the FDA lists among the highest-mercury species to avoid in pregnancy, along with bigeye tuna, swordfish, shark, marlin, orange roughy and tilefish from the Gulf of Mexico. Atlantic mackerel, by contrast, is on the FDA's 'best choices' list. In the UK, mackerel counts toward your 2 portions of oily fish a week.",
      tr: "Kral uskumru, FDA'nın hamilelikte kaçınılmasını önerdiği en yüksek cıvalı türler arasındadır; bu listede büyük gözlü ton, kılıç balığı, köpek balığı, marlin, orange roughy ve Meksika Körfezi'nden tilefish de var. Atlantik uskumrusu ise FDA'nın 'en iyi seçimler' listesindedir. İngiltere'de uskumru, haftalık 2 porsiyonluk yağlı balık sınırına sayılır.",
    },
    tips: {
      en: ["Check the species name on menus and at fish counters.", "Enjoy regular uskumru, grilled and cooked through."],
      tr: ["Menüde ve balık tezgahında türün adını kontrol et.", "Bildiğimiz uskumruyu ızgarada iyice pişirerek gönül rahatlığıyla ye."],
    },
    sources: [S.fdaFish, S.m2bMercury],
  },
  {
    id: "salmon",
    category: "food",
    emoji: "🐟",
    name: { en: "Salmon (cooked)", tr: "Somon (pişmiş)" },
    aliases: {
      en: ["salmon fillet", "baked salmon", "grilled salmon", "trout", "oily fish", "fish"],
      tr: ["somon", "fırında somon", "ızgara somon", "alabalık", "yağlı balık", "balık"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, cooked salmon is a great choice, and UK advice is up to 2 portions of oily fish a week.",
      tr: "Evet, pişmiş somon harika bir seçim; İngiltere'nin önerisi haftada en fazla 2 porsiyon yağlı balık.",
    },
    details: {
      en: "Salmon is low in mercury and rich in omega-3 fats, which are good for you and your baby's development. The NHS recommends 2 portions of fish a week, one of them oily, but no more than 2 portions of oily fish because it can contain pollutants. The FDA lists salmon among its 'best choices'.",
      tr: "Somonun cıva içeriği düşüktür ve hem sana hem de bebeğinin gelişimine iyi gelen omega-3 yağlarından zengindir. NHS haftada biri yağlı olmak üzere 2 porsiyon balık önerir; ancak yağlı balık kirletici içerebileceği için haftada en fazla 2 porsiyonla sınırlamayı söyler. FDA da somonu 'en iyi seçimler' arasında sayar.",
    },
    tips: {
      en: ["Cook it until it flakes easily and is opaque all the way through.", "Smoked salmon is different: it needs cooking until steaming hot."],
      tr: ["Kolayca ayrılana ve her yeri opaklaşana kadar pişir.", "Füme somon farklıdır: dumanı tütene kadar pişirilmesi gerekir."],
    },
    sources: [S.nhsDiet, S.fdaFish],
  },
  {
    id: "anchovies",
    category: "food",
    emoji: "🐟",
    name: { en: "Anchovies & sardines (hamsi)", tr: "Hamsi ve sardalya" },
    aliases: {
      en: ["hamsi", "anchovy", "sardines", "pilchards", "herring", "atlantic mackerel", "uskumru"],
      tr: ["hamsi tava", "hamsi buğulama", "hamsili pilav", "sardalya", "uskumru", "ringa"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, cooked, since they're low-mercury oily fish; UK advice is up to 2 portions of oily fish a week.",
      tr: "Evet, pişmiş olarak; cıvası düşük yağlı balıklardır ve İngiltere'nin önerisi haftada en fazla 2 porsiyon yağlı balık.",
    },
    details: {
      en: "Anchovies, sardines and Atlantic mackerel are on the FDA's 'best choices' list for low mercury and are rich in omega-3. The NHS counts them as oily fish and suggests no more than 2 portions a week because oily fish can contain pollutants. Eat them cooked, as marinated raw anchovies carry the same risks as other raw fish.",
      tr: "Hamsi, sardalya ve Atlantik uskumrusu düşük cıva içerikleriyle FDA'nın 'en iyi seçimler' listesindedir ve omega-3 açısından zengindir. NHS bunları yağlı balık sayar ve yağlı balıklar kirletici içerebileceği için haftada en fazla 2 porsiyon önerir. Pişmiş olarak ye; çiğ marine edilmiş hamsi, diğer çiğ balıklarla aynı riskleri taşır.",
    },
    tips: {
      en: ["Hamsi tava, buğulama or grilled sardines are all great choices.", "Canned sardines are cooked and count toward your oily fish too."],
      tr: ["Hamsi tava, buğulama ya da ızgara sardalya harika seçenekler.", "Konserve sardalya pişmiştir ve o da yağlı balık hakkına sayılır."],
    },
    sources: [S.fdaFish, S.nhsFoods],
  },
  {
    id: "prawns",
    category: "food",
    emoji: "🍤",
    name: { en: "Prawns & shrimp", tr: "Karides" },
    aliases: {
      en: ["shrimp", "prawn cocktail", "king prawns", "scampi", "shrimp cocktail", "garlic prawns"],
      tr: ["karides güveç", "tereyağlı karides", "kokteyl karides", "jumbo karides", "karides tava"],
    },
    verdict: "caution",
    summary: {
      en: "Yes when they're cooked and served hot; heat cold ready-to-eat prawns, as in prawn cocktail, until steaming.",
      tr: "Pişmiş ve sıcak servis edildiğinde evet; kokteyl karides gibi soğuk, hazır pişmiş karidesleri dumanı tütene kadar ısıt.",
    },
    details: {
      en: "Cooked shellfish such as prawns are safe and a good source of protein. The NHS now advises heating cold, pre-cooked ready-to-eat prawns until steaming hot because they can carry listeria. Raw prawns, as in some ceviche or sushi, should be avoided.",
      tr: "Karides gibi pişmiş kabuklu deniz ürünleri güvenlidir ve iyi bir protein kaynağıdır. NHS artık soğuk, önceden pişirilip hazır satılan karideslerin listeria taşıyabileceği için dumanı tütene kadar ısıtılmasını öneriyor. Bazı ceviche ya da suşilerdeki gibi çiğ karidesten kaçınılmalı.",
    },
    tips: {
      en: ["Cook raw prawns until pink and opaque all the way through.", "Karides güveç straight from the oven is a perfect choice."],
      tr: ["Çiğ karidesleri her yeri pembe ve opak olana kadar pişir.", "Fırından yeni çıkmış karides güveç mükemmel bir seçim."],
    },
    sources: [S.nhsFoods],
  },
  {
    id: "oysters",
    category: "food",
    emoji: "🦪",
    name: { en: "Raw oysters & raw shellfish", tr: "Çiğ istiridye ve çiğ kabuklu deniz ürünleri" },
    aliases: {
      en: ["oysters", "raw clams", "raw mussels", "raw scallops", "oyster bar", "sea urchin", "raw shellfish"],
      tr: ["istiridye", "çiğ midye", "çiğ deniz ürünü", "deniz kestanesi", "akivades", "çiğ tarak"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid raw shellfish, though cooked oysters, mussels and clams are fine once they're hot and their shells have opened.",
      tr: "Çiğ kabuklu deniz ürünlerinden kaçın; pişmiş istiridye, midye ve akivades ise sıcak servis edilip kabukları açıldığında sorun değil.",
    },
    details: {
      en: "Raw shellfish can carry bacteria such as vibrio, as well as toxins, which can cause severe food poisoning. The NHS advises avoiding raw shellfish in pregnancy, while cooked shellfish is safe. Throw away any mussels or clams that stay closed after cooking.",
      tr: "Çiğ kabuklu deniz ürünleri vibrio gibi bakteriler ve toksinler taşıyabilir; bu da ağır besin zehirlenmesine yol açabilir. NHS hamilelikte çiğ kabuklu deniz ürünlerinden kaçınılmasını önerir; pişmiş olanlar ise güvenlidir. Pişirdikten sonra kabuğu açılmayan midye ve akivadesleri at.",
    },
    tips: {
      en: ["Order grilled or baked oysters instead of raw ones."],
      tr: ["Çiğ yerine ızgara ya da fırında istiridye sipariş et."],
    },
    sources: [S.nhsFoods, S.m2bVibrio],
  },
  {
    id: "midye-dolma",
    category: "food",
    emoji: "🦪",
    name: { en: "Midye dolma (stuffed mussels)", tr: "Midye dolma" },
    aliases: {
      en: ["stuffed mussels", "midye", "street mussels", "midye tava", "fried mussels"],
      tr: ["midye dolma", "midye tava", "seyyar midye", "sokak midyesi", "midyeci"],
    },
    verdict: "caution",
    summary: {
      en: "Only when freshly made at a clean, trusted place; street mussels kept unchilled for hours are best skipped.",
      tr: "Yalnızca temiz ve güvendiğin bir yerde taze yapılmışsa; saatlerce soğutulmadan bekleyen sokak midyelerini atla.",
    },
    details: {
      en: "The mussels and rice in midye dolma are cooked, so the main risk is how they're stored afterwards. Left at room temperature for hours, especially in summer, they can grow bacteria that cause food poisoning, and shellfish can also carry toxins. Food poisoning is especially draining in pregnancy and can lead to dehydration.",
      tr: "Midye dolmadaki midye ve pilav pişirilir; asıl risk sonrasında nasıl saklandığıdır. Özellikle yazın saatlerce oda sıcaklığında bekletildiğinde besin zehirlenmesine yol açan bakteriler üreyebilir; kabuklu deniz ürünleri ayrıca toksin de taşıyabilir. Besin zehirlenmesi hamilelikte özellikle yıpratıcıdır ve sıvı kaybına yol açabilir.",
    },
    tips: {
      en: ["Choose busy places that keep them chilled, and skip them in hot weather.", "Midye tava, fried hot to order, is a safer pick."],
      tr: ["Midyeleri soğukta tutan kalabalık yerleri seç; sıcak havalarda hiç alma.", "Siparişle sıcak kızartılan midye tava daha güvenli bir seçim."],
    },
    sources: [S.nhsFoods, S.m2bVibrio],
  },

  // Meat and poultry

  {
    id: "deli-meat",
    category: "food",
    emoji: "🥪",
    name: { en: "Deli meats & cold cuts", tr: "Şarküteri ürünleri ve soğuk et" },
    aliases: {
      en: ["deli meat", "cold cuts", "lunch meat", "sliced ham", "turkey slices", "luncheon meat", "ham sandwich", "bologna"],
      tr: ["jambon", "hindi füme", "dilimli hindi", "tavuk jambon", "salam", "soğuk et", "şarküteri"],
    },
    verdict: "caution",
    summary: {
      en: "Safest heated until steaming: UK advice allows chilled, in-date packs, while US advice says heat them first.",
      tr: "En güvenlisi dumanı tütene kadar ısıtmak: İngiltere soğukta saklanan, tarihi geçmemiş paketlere izin verir, ABD önce ısıtmayı önerir.",
    },
    details: {
      en: "Ready-to-eat meats like ham, turkey slices and salam can carry listeria, which can grow slowly even in the fridge. The NHS says cold pre-cooked meats are fine if kept chilled and eaten before the use-by date, while the CDC advises reheating deli meat until steaming hot. Heating it in a toastie or a pan removes the risk.",
      tr: "Jambon, hindi füme ve salam gibi hazır etler listeria taşıyabilir; bu bakteri buzdolabında bile yavaşça üreyebilir. NHS soğukta saklanan ve son tüketim tarihi geçmemiş pişmiş soğuk etlerin sorun olmadığını söylerken CDC şarküteri etlerinin dumanı tütene kadar yeniden ısıtılmasını önerir. Tostta ya da tavada ısıtmak riski ortadan kaldırır.",
    },
    tips: {
      en: ["Make it a hot toastie or panini, heated right through.", "Skip sliced meats that have been sitting out on open deli counters."],
      tr: ["Sıcak tost ya da panini yap, içi tamamen ısınsın.", "Açık şarküteri tezgahında bekleyen dilimli etleri alma."],
    },
    sources: [S.nhsFoods, S.cdcListeriaPrevention],
  },
  {
    id: "salami",
    category: "food",
    emoji: "🍕",
    name: { en: "Salami & cured meats", tr: "Salami ve kurutulmuş etler" },
    aliases: {
      en: ["salami", "pepperoni", "chorizo", "prosciutto", "parma ham", "serrano ham", "cured meat", "charcuterie"],
      tr: ["italyan salamı", "salami", "pepperoni", "chorizo", "prosciutto", "parma jambonu", "kurutulmuş et"],
    },
    verdict: "caution",
    summary: {
      en: "Cook it until steaming hot, as on a pizza, and skip cold slices of salami, chorizo or prosciutto.",
      tr: "Pizzadaki gibi dumanı tütene kadar pişmişse olur; soğuk salami, chorizo ya da prosciutto dilimlerini atla.",
    },
    details: {
      en: "Cured meats aren't cooked, so they can carry listeria and the toxoplasma parasite. The NHS now advises cooking cold cured meats until steaming hot before eating them, and the CDC says to avoid unheated dry or fermented sausages. On a hot, freshly baked pizza they're fine.",
      tr: "Kurutulmuş ve fermente etler pişirilmez; bu yüzden listeria ve toksoplazma paraziti taşıyabilir. NHS artık soğuk kurutulmuş etlerin yenmeden önce dumanı tütene kadar pişirilmesini öneriyor; CDC de ısıtılmamış kuru ya da fermente sosislerden kaçınılmasını söylüyor. Fırından yeni çıkmış sıcak bir pizzada sorun değil.",
    },
    tips: {
      en: ["Pepperoni pizza is fine when it's hot from the oven.", "On a charcuterie board, stick to the cooked items and hard cheeses."],
      tr: ["Pepperonili pizza fırından sıcak çıktığında sorun değil.", "Şarküteri tabağında pişmiş ürünlere ve sert peynirlere yönel."],
    },
    sources: [S.nhsFoods, S.cdcListeriaPrevention],
  },
  {
    id: "sucuk",
    category: "food",
    emoji: "🌭",
    name: { en: "Sucuk (Turkish sausage)", tr: "Sucuk" },
    aliases: {
      en: ["sujuk", "sucuk", "turkish sausage", "spicy beef sausage", "sucuk and eggs"],
      tr: ["sucuklu yumurta", "kangal sucuk", "fermente sucuk", "ısıl işlem görmüş sucuk", "sucuk ekmek", "kasap sucuk"],
    },
    verdict: "caution",
    summary: {
      en: "Yes when it's fried or grilled until cooked through and sizzling hot, but don't eat it raw or barely warmed.",
      tr: "Tavada ya da ızgarada iyice pişip cızırdayana kadar ısıtıldığında evet; çiğ ya da hafif ısıtılmış yeme.",
    },
    details: {
      en: "Traditional sucuk is a fermented, dried sausage that isn't cooked during making, so like salami it can carry listeria and toxoplasma. Frying or grilling it until it's hot all the way through makes it safe. Heat-treated (ısıl işlem görmüş) sucuk has been cooked during production, but it's still best eaten hot.",
      tr: "Geleneksel sucuk, üretimde pişirilmeden fermente edilip kurutulan bir et ürünüdür; bu yüzden salami gibi listeria ve toksoplazma taşıyabilir. Tavada ya da ızgarada her yeri ısınana kadar pişirmek onu güvenli hale getirir. Isıl işlem görmüş sucuk üretimde ısıtılır, yine de sıcak yemek en iyisi.",
    },
    tips: {
      en: ["Sucuklu yumurta is fine: cook until the egg is set and the sucuk is sizzling.", "Sucuk is salty and fatty, so keep portions moderate."],
      tr: ["Sucuklu yumurta olur: yumurta katılaşsın, sucuk cızırdasın.", "Sucuk tuzlu ve yağlıdır, porsiyonu ölçülü tut."],
    },
    sources: [S.nhsFoods, S.cdcListeriaPrevention],
  },
  {
    id: "pastirma",
    category: "food",
    emoji: "🥩",
    name: { en: "Pastırma (cured beef)", tr: "Pastırma" },
    aliases: {
      en: ["pastirma", "basturma", "cured beef", "air-dried beef", "bresaola"],
      tr: ["kayseri pastırması", "pastırmalı yumurta", "pastırmalı humus", "kuru et", "çemenli et"],
    },
    verdict: "caution",
    summary: {
      en: "Skip thin cold slices, but pastırma cooked until steaming hot, as in pastırmalı yumurta, is fine.",
      tr: "İnce soğuk dilimleri atla; pastırmalı yumurtadaki gibi dumanı tütene kadar pişmiş pastırma ise sorun değil.",
    },
    details: {
      en: "Pastırma is air-dried, cured beef that's usually eaten without cooking, so it carries the same risks as other cured meats: toxoplasma and listeria. The NHS advises cooking cured meats until steaming hot. In normal amounts, the çemen (fenugreek) coating isn't the concern; the uncooked meat is.",
      tr: "Pastırma, genellikle pişirilmeden yenen, kurutulmuş ve tuzlanmış bir sığır etidir; bu yüzden diğer kurutulmuş etlerle aynı riskleri taşır: toksoplazma ve listeria. NHS kurutulmuş etlerin dumanı tütene kadar pişirilmesini önerir. Normal miktardaki çemen kaplaması değil, pişmemiş et asıl sorundur.",
    },
    tips: {
      en: ["Cook pastırmalı yumurta until the eggs are firm and everything is hot.", "Pastırmalı humus is baked hot, so it's fine straight from the oven."],
      tr: ["Pastırmalı yumurtayı yumurtalar katılaşıp her şey iyice ısınana kadar pişir.", "Fırında sıcak pişen pastırmalı humus, fırından çıkar çıkmaz yenebilir."],
    },
    sources: [S.nhsFoods, S.m2bRawMeats],
  },
  {
    id: "hot-dogs",
    category: "food",
    emoji: "🌭",
    name: { en: "Hot dogs & frankfurters", tr: "Sosis" },
    aliases: {
      en: ["hot dog", "frankfurter", "wiener", "vienna sausage", "corn dog", "cocktail sausages"],
      tr: ["sosis", "sosisli sandviç", "hot dog", "kokteyl sosis", "piliç sosis"],
    },
    verdict: "caution",
    summary: {
      en: "Only when they're heated until steaming hot all the way through, never straight from the pack.",
      tr: "Yalnızca her yeri dumanı tütene kadar ısıtıldığında; asla paketten çıkar çıkmaz yeme.",
    },
    details: {
      en: "Hot dogs are pre-cooked, but listeria can contaminate them after cooking and keep growing in the fridge. The CDC advises reheating hot dogs until steaming hot. Liquid from the packet can also spread bacteria, so keep it away from other foods.",
      tr: "Sosisler önceden pişirilir; ancak pişirildikten sonra listeria bulaşabilir ve bakteri buzdolabında bile üremeye devam edebilir. CDC sosislerin dumanı tütene kadar yeniden ısıtılmasını önerir. Paketteki sıvı da bakteri yayabilir, diğer yiyeceklere bulaşmasına izin verme.",
    },
    tips: {
      en: ["Boil or grill them until piping hot in the middle.", "Wash your hands after opening and handling the pack."],
      tr: ["Ortası iyice ısınana kadar haşla ya da ızgara yap.", "Paketi açıp sosisleri tuttuktan sonra ellerini yıka."],
    },
    sources: [S.cdcListeriaPrevention, S.nhsFoods],
  },
  {
    id: "pate",
    category: "food",
    emoji: "🍞",
    name: { en: "Pâté", tr: "Pate" },
    aliases: {
      en: ["pate", "liver pate", "chicken liver pate", "foie gras", "meat spread", "terrine"],
      tr: ["ciğer ezmesi", "tavuk ciğeri pate", "kaz ciğeri", "foie gras", "et ezmesi", "sürülebilir et"],
    },
    verdict: "avoid",
    summary: {
      en: "Best avoided, because liver pâté is very high in vitamin A and chilled pâté can carry listeria.",
      tr: "Kaçınmak en iyisi, çünkü ciğer patesi çok yüksek miktarda A vitamini içerir ve soğukta saklanan pate listeria taşıyabilir.",
    },
    details: {
      en: "Liver pâté contains so much vitamin A (retinol) that it can harm a baby's development, so the NHS advises avoiding all liver products. Chilled pâtés and meat spreads can also carry listeria. Pâté without liver is treated differently: the NHS says keep it chilled and eat it before the use-by date, while the CDC says choose canned or shelf-stable pâté.",
      tr: "Ciğer patesi o kadar çok A vitamini (retinol) içerir ki bebeğin gelişimine zarar verebilir; bu yüzden NHS tüm ciğer ürünlerinden kaçınılmasını önerir. Buzdolabında saklanan pate ve et ezmeleri ayrıca listeria taşıyabilir. Ciğer içermeyen pateler farklı değerlendirilir: NHS soğukta saklanıp son tüketim tarihinden önce yenmesini söylerken CDC konserve ya da raf ömürlü patelerin seçilmesini önerir.",
    },
    tips: {
      en: ["Check labels for liver, which is in foie gras and many chicken pâtés.", "Canned, shelf-stable pâté without liver is the safer pick."],
      tr: ["Etikette ciğer olup olmadığına bak; foie gras ve çoğu tavuk patesi ciğer içerir.", "Ciğer içermeyen konserve, raf ömürlü pate daha güvenli bir seçim."],
    },
    sources: [S.nhsFoods, S.cdcListeriaPrevention],
  },
  {
    id: "liver",
    category: "food",
    emoji: "🍢",
    name: { en: "Liver", tr: "Ciğer" },
    aliases: {
      en: ["calf liver", "lamb liver", "chicken liver", "liver and onions", "liver sausage", "haggis", "offal"],
      tr: ["arnavut ciğeri", "ciğer şiş", "ciğer sote", "tavuk ciğeri", "kuzu ciğeri", "dana ciğeri", "ciğer kavurma"],
    },
    verdict: "avoid",
    summary: {
      en: "Best avoided, because liver is extremely high in vitamin A and too much can harm a developing baby.",
      tr: "Kaçınmak en iyisi, çünkü ciğer aşırı yüksek miktarda A vitamini içerir ve fazlası gelişen bebeğe zarar verebilir.",
    },
    details: {
      en: "Liver stores large amounts of vitamin A as retinol, and high intakes in pregnancy have been linked to birth defects. The NHS advises avoiding liver and liver products completely, while US advice focuses on not going over safe vitamin A limits. That includes popular dishes like Arnavut ciğeri and ciğer şiş.",
      tr: "Ciğer, A vitaminini retinol şeklinde yüksek miktarda depolar; hamilelikte yüksek alım doğum kusurlarıyla ilişkilendirilmiştir. NHS ciğer ve ciğer ürünlerinden tamamen kaçınılmasını önerirken ABD'deki öneriler güvenli A vitamini sınırının aşılmamasına odaklanır. Buna Arnavut ciğeri ve ciğer şiş gibi sevilen yemekler de dahil.",
    },
    tips: {
      en: ["Get iron from red meat, lentils, chickpeas and leafy greens instead."],
      tr: ["Demiri bunun yerine kırmızı et, mercimek, nohut ve yeşil yapraklı sebzelerden al."],
    },
    sources: [S.nhsFoods, S.m2bVitaminA],
  },
  {
    id: "rare-steak",
    category: "food",
    emoji: "🥩",
    name: { en: "Rare or pink steak", tr: "Az pişmiş biftek" },
    aliases: {
      en: ["rare steak", "medium rare", "pink lamb", "steak", "roast beef", "lamb chops", "blue steak"],
      tr: ["az pişmiş et", "orta pişmiş biftek", "kanlı et", "biftek", "pirzola", "antrikot", "bonfile"],
    },
    verdict: "caution",
    summary: {
      en: "Safest well done: UK advice allows whole steaks well cooked on the outside, while US advice says cook to 63°C.",
      tr: "En güvenlisi iyi pişmiş olması: İngiltere dışı iyice pişmiş bütün bifteğe izin verir, ABD 63°C'ye kadar pişirmeyi önerir.",
    },
    details: {
      en: "Raw and undercooked meat can carry the toxoplasma parasite, which can harm a baby if you catch it for the first time in pregnancy. Germs on whole cuts sit mostly on the surface, and the NHS now says steaks and cutlets cooked thoroughly on the outside are fine. The CDC recommends cooking whole cuts to 63°C (145°F) with a 3-minute rest.",
      tr: "Çiğ ve az pişmiş et toksoplazma paraziti taşıyabilir; bu enfeksiyonu hamilelikte ilk kez geçirirsen bebeğe zarar verebilir. Bütün et parçalarında mikroplar daha çok yüzeyde bulunur ve NHS artık dışı iyice pişmiş biftek ve pirzolanın sorun olmadığını söylüyor. CDC ise bütün et parçalarının 63°C'ye (145°F) kadar pişirilip 3 dakika dinlendirilmesini önerir.",
    },
    tips: {
      en: ["If you're unsure, order it medium-well to well done.", "Mince, burgers and köfte always need cooking all the way through."],
      tr: ["Emin değilsen orta-iyi ya da iyi pişmiş iste.", "Kıyma, burger ve köfte her zaman tamamen pişirilmeli."],
    },
    sources: [S.nhsFoods, S.cdcToxo],
  },
  {
    id: "raw-meat",
    category: "food",
    emoji: "🥩",
    name: { en: "Raw meat (tartare, carpaccio)", tr: "Çiğ et (tartar, carpaccio)" },
    aliases: {
      en: ["steak tartare", "beef carpaccio", "kibbeh nayyeh", "raw beef", "raw lamb", "mett"],
      tr: ["tartar", "carpaccio", "çiğ et", "çiğ kıyma", "çiğ dana"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid them, because raw meat dishes can carry toxoplasma, listeria and E. coli.",
      tr: "Kaçın, çünkü çiğ et yemekleri toksoplazma, listeria ve E. coli taşıyabilir.",
    },
    details: {
      en: "Steak tartare, carpaccio and similar dishes are never cooked, so any parasites or bacteria in the meat survive. Toxoplasmosis caught for the first time in pregnancy can cause miscarriage or serious problems for the baby. The NHS advises avoiding raw or undercooked meat while you're pregnant.",
      tr: "Tartar, carpaccio ve benzeri yemekler hiç pişirilmez; bu yüzden etteki parazit ya da bakteriler hayatta kalır. Hamilelikte ilk kez geçirilen toksoplazmoz düşüğe ya da bebek için ciddi sorunlara yol açabilir. NHS hamilelikte çiğ ya da az pişmiş etten kaçınılmasını önerir.",
    },
    tips: {
      en: ["Wash your hands, boards and knives after handling raw meat."],
      tr: ["Çiğ etle çalıştıktan sonra ellerini, kesme tahtasını ve bıçakları yıka."],
    },
    sources: [S.nhsFoods, S.nhsToxo],
  },
  {
    id: "cig-kofte-meat",
    category: "food",
    emoji: "🧆",
    name: { en: "Çiğ köfte with raw meat", tr: "Etli çiğ köfte" },
    aliases: {
      en: ["cig kofte", "raw meatballs", "etli cig kofte", "traditional cig kofte"],
      tr: ["etli çiğ köfte", "geleneksel çiğ köfte", "ev yapımı çiğ köfte", "çiğ köfte"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid it, because traditional çiğ köfte is made with raw minced meat, which can carry toxoplasma and E. coli.",
      tr: "Kaçın, çünkü geleneksel çiğ köfte toksoplazma ve E. coli taşıyabilen çiğ kıymayla yapılır.",
    },
    details: {
      en: "The traditional recipe kneads raw minced beef or lamb with bulgur and spices, and neither the spices nor the kneading kill parasites or bacteria. Mince is riskier than whole cuts because surface germs get mixed all the way through. Homemade versions are the ones most likely to contain meat.",
      tr: "Geleneksel tarifte çiğ dana ya da kuzu kıyması bulgur ve baharatlarla yoğrulur; ne baharat ne de yoğurma parazitleri ya da bakterileri öldürür. Kıyma bütün etten daha risklidir, çünkü yüzeydeki mikroplar etin her yerine karışır. Et içerme olasılığı en yüksek olanlar ev yapımı çiğ köftelerdir.",
    },
    tips: {
      en: ["Ask whether it's etli or etsiz before you eat it.", "Meatless çiğ köfte is a safe alternative."],
      tr: ["Yemeden önce etli mi etsiz mi olduğunu sor.", "Etsiz çiğ köfte güvenli bir alternatif."],
    },
    sources: [S.nhsFoods, S.m2bToxo],
  },
  {
    id: "cig-kofte",
    category: "food",
    emoji: "🧆",
    name: { en: "Meatless çiğ köfte", tr: "Etsiz çiğ köfte" },
    aliases: {
      en: ["vegan cig kofte", "bulgur kofte", "etsiz cig kofte", "cig kofte wrap"],
      tr: ["etsiz çiğ köfte", "çiğ köfte dürüm", "bulgur köftesi", "vegan çiğ köfte"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, meatless çiğ köfte made from bulgur and spices is fine, as long as you wash the lettuce and herbs served with it.",
      tr: "Evet, bulgur ve baharatla yapılan etsiz çiğ köfte sorun değil; yeter ki yanındaki marul ve yeşillikleri yıka.",
    },
    details: {
      en: "Most shop-bought çiğ köfte today is meatless, made from bulgur, tomato and pepper paste and spices, so the raw-meat risk doesn't apply. Bulgur is already boiled during processing. The greens served alongside should be well washed, as soil on unwashed produce can carry harmful germs.",
      tr: "Bugün satılan çiğ köftelerin çoğu bulgur, domates ve biber salçası ile baharatlardan yapılan etsiz çiğ köftedir; bu yüzden çiğ et riski yoktur. Bulgur üretim sırasında zaten haşlanır. Yanında servis edilen yeşillikler iyice yıkanmalı, çünkü yıkanmamış sebzelerdeki toprak zararlı mikroplar taşıyabilir.",
    },
    tips: {
      en: ["It can be very spicy, so go easy if you have heartburn.", "Buy it from clean places where it's freshly made."],
      tr: ["Çok acı olabilir, mide yanman varsa az ye.", "Taze hazırlandığı, temiz yerlerden al."],
    },
    sources: [S.nhsFoods, S.nhsHeartburn],
  },
  {
    id: "doner-kebab",
    category: "food",
    emoji: "🥙",
    name: { en: "Döner & kebabs", tr: "Döner ve kebap" },
    aliases: {
      en: ["doner", "doner kebab", "shawarma", "gyros", "shish kebab", "adana kebab", "iskender"],
      tr: ["döner", "tavuk döner", "et döner", "iskender", "adana kebap", "şiş kebap", "dürüm", "şavurma"],
    },
    verdict: "caution",
    summary: {
      en: "Yes when it's freshly cooked, cooked through and piping hot; avoid pink chicken or meat that's been sitting out.",
      tr: "Taze, tamamen pişmiş ve sıcacık olduğunda evet; pembe kalmış tavuktan ya da bekletilmiş etten kaçın.",
    },
    details: {
      en: "Döner is cooked in layers on a rotating spit, so slices can occasionally be undercooked if they're cut too fast or too thick. Undercooked meat can carry toxoplasma, and undercooked chicken can carry bacteria such as salmonella. A busy, clean place that slices thin, well-browned meat is the safest bet.",
      tr: "Döner dönen bir şişte katman katman pişirilir; bu yüzden çok hızlı ya da kalın kesildiğinde dilimler bazen az pişmiş kalabilir. Az pişmiş et toksoplazma, az pişmiş tavuk ise salmonella gibi bakteriler taşıyabilir. İnce ve iyice kızarmış dilimler kesen, kalabalık ve temiz bir yer en güvenli seçimdir.",
    },
    tips: {
      en: ["Ask for well-cooked, crispy slices from the outside of the spit.", "Check chicken is white all the way through, with no pink."],
      tr: ["Şişin dışından iyice pişmiş, kıtır dilimler iste.", "Tavuğun içinin tamamen beyaz olduğundan, pembe kalmadığından emin ol."],
    },
    sources: [S.nhsFoods, S.m2bSalmonella],
  },
  {
    id: "burgers",
    category: "food",
    emoji: "🍔",
    name: { en: "Burgers & meatballs (köfte)", tr: "Burger ve köfte" },
    aliases: {
      en: ["burger", "hamburger", "meatballs", "kofte", "minced meat", "ground beef", "sausages"],
      tr: ["köfte", "ızgara köfte", "hamburger", "burger", "kıyma", "inegöl köfte", "kasap köfte"],
    },
    verdict: "caution",
    summary: {
      en: "Yes when they're cooked all the way through, with no pink in the middle and juices that run clear.",
      tr: "Her yeri pişmiş, ortasında pembe kalmamış ve suyu berrak aktığında evet.",
    },
    details: {
      en: "Mincing spreads any bacteria from the surface of meat all the way through, so burgers and köfte need cooking right to the centre. The NHS says minced meat, burgers and sausages should have no trace of pink or blood. The CDC recommends cooking ground meat to 71°C (160°F).",
      tr: "Kıyma yapılırken etin yüzeyindeki bakteriler her yere karışır; bu yüzden burger ve köfte tam ortasına kadar pişirilmelidir. NHS kıyma, burger ve sosislerde hiç pembelik ya da kan izi kalmaması gerektiğini söyler. CDC de kıymanın 71°C'ye (160°F) kadar pişirilmesini önerir.",
    },
    tips: {
      en: ["Order burgers well done, as many restaurants serve them pink by default.", "Cut the thickest köfte open to check before eating."],
      tr: ["Burgeri iyi pişmiş iste; pek çok restoran varsayılan olarak ortası pembe servis eder.", "Yemeden önce en kalın köfteyi ortadan kesip kontrol et."],
    },
    sources: [S.nhsFoods, S.cdcToxo],
  },
  {
    id: "chicken",
    category: "food",
    emoji: "🍗",
    name: { en: "Chicken & poultry", tr: "Tavuk ve kümes hayvanları" },
    aliases: {
      en: ["chicken", "turkey", "duck", "poultry", "chicken breast", "rotisserie chicken", "chicken wings"],
      tr: ["tavuk", "hindi", "ördek", "tavuk göğsü", "tavuk şiş", "çevirme tavuk", "tavuk kanat"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, as long as it's cooked all the way through, with no pink meat and juices that run clear.",
      tr: "Evet, her yeri pişmiş, pembe kısım kalmamış ve suyu berrak olduğu sürece.",
    },
    details: {
      en: "Thoroughly cooked chicken, turkey and duck are safe and a great source of protein. Undercooked poultry can carry bacteria such as salmonella, which cause food poisoning. The CDC recommends cooking poultry to 74°C (165°F), and the NHS says there should be no trace of pink.",
      tr: "İyice pişmiş tavuk, hindi ve ördek güvenlidir ve harika bir protein kaynağıdır. Az pişmiş kümes hayvanı eti, besin zehirlenmesine yol açan salmonella gibi bakteriler taşıyabilir. CDC kümes hayvanı etinin 74°C'ye (165°F) kadar pişirilmesini önerir; NHS de hiç pembelik kalmaması gerektiğini söyler.",
    },
    tips: {
      en: ["Use a separate chopping board for raw chicken.", "Reheat leftovers until they're steaming hot."],
      tr: ["Çiğ tavuk için ayrı bir kesme tahtası kullan.", "Artan yemekleri dumanı tütene kadar ısıt."],
    },
    sources: [S.nhsFoods, S.cdcToxo],
  },
  {
    id: "kokorec",
    category: "food",
    emoji: "🥖",
    name: { en: "Kokoreç", tr: "Kokoreç" },
    aliases: {
      en: ["kokorec", "kokoretsi", "grilled intestines", "lamb intestines", "offal"],
      tr: ["yarım ekmek kokoreç", "çeyrek kokoreç", "kokoreç dürüm", "sakatat"],
    },
    verdict: "caution",
    summary: {
      en: "Only if it's freshly grilled, piping hot and cooked through, from a clean place you trust.",
      tr: "Yalnızca temiz ve güvendiğin bir yerde taze ızgara edilmiş, iyice pişmiş ve sıcacıksa.",
    },
    details: {
      en: "Kokoreç is made from lamb intestines, which need very careful cleaning and thorough cooking to be safe. Undercooked offal can carry bacteria that cause food poisoning. Good kokoreç is chopped and fried again on the griddle just before serving, which helps make sure it's hot all the way through.",
      tr: "Kokoreç kuzu bağırsağından yapılır; güvenli olması için çok iyi temizlenmesi ve iyice pişirilmesi gerekir. Az pişmiş sakatat besin zehirlenmesine yol açan bakteriler taşıyabilir. İyi bir kokoreç servis edilmeden hemen önce doğranıp sacda yeniden kızartılır; bu da her yerinin sıcacık olmasını sağlar.",
    },
    tips: {
      en: ["Choose busy places where it's re-griddled hot as you order.", "Skip it in hot weather or from stalls where hygiene looks doubtful."],
      tr: ["Siparişle sacda yeniden ısıtıldığı kalabalık yerleri seç.", "Sıcak havalarda ya da hijyeninden emin olmadığın tezgahlarda alma."],
    },
    sources: [S.nhsFoods, S.fdaSafeFood],
  },

  // Fruit, vegetables and other foods

  {
    id: "raw-sprouts",
    category: "food",
    emoji: "🌱",
    name: { en: "Raw sprouts", tr: "Çiğ filizler" },
    aliases: {
      en: ["bean sprouts", "alfalfa sprouts", "mung bean sprouts", "broccoli sprouts", "radish sprouts"],
      tr: ["filiz", "soya filizi", "fasulye filizi", "yonca filizi", "çimlendirilmiş tohum"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid them raw or lightly cooked; sprouts cooked until steaming hot, as in a stir-fry, are fine.",
      tr: "Çiğ ya da az pişmiş yeme; sote gibi dumanı tütene kadar pişmiş filizler sorun değil.",
    },
    details: {
      en: "Sprouts grow in warm, humid conditions that are ideal for bacteria such as salmonella, listeria and E. coli, and washing doesn't reliably remove them. The CDC advises people at higher risk, including pregnant women, to avoid raw or lightly cooked sprouts. Cooking them thoroughly kills the bacteria.",
      tr: "Filizler, salmonella, listeria ve E. coli gibi bakteriler için ideal olan sıcak ve nemli ortamda büyür; yıkamak da bunları güvenilir şekilde gidermez. CDC, hamileler dahil yüksek risk grubundakilerin çiğ ya da az pişmiş filizlerden kaçınmasını önerir. İyice pişirmek bakterileri öldürür.",
    },
    tips: {
      en: ["Ask for no sprouts on sandwiches, salads and noodle dishes.", "Add them to stir-fries early so they cook through."],
      tr: ["Sandviç, salata ve erişte yemeklerinde filiz koymamalarını iste.", "Sotelere erken ekle ki iyice pişsinler."],
    },
    sources: [S.cdcListeriaPrevention, S.fdaProduce],
  },
  {
    id: "unwashed-salad",
    category: "food",
    emoji: "🥗",
    name: { en: "Salad & raw vegetables", tr: "Salata ve çiğ sebzeler" },
    aliases: {
      en: ["salad", "lettuce", "unwashed vegetables", "bagged salad", "salad bar", "fresh herbs", "raw vegetables"],
      tr: ["salata", "marul", "yeşillik", "çoban salata", "roka", "yıkanmamış sebze", "hazır salata"],
    },
    verdict: "caution",
    summary: {
      en: "Yes, once it's thoroughly washed; keep pre-packed salads chilled and eat them before the use-by date.",
      tr: "Evet, iyice yıkandıktan sonra; paketli hazır salataları soğukta sakla ve son tüketim tarihinden önce ye.",
    },
    details: {
      en: "Soil on unwashed vegetables and herbs can carry the toxoplasma parasite and bacteria, so wash all salad leaves and raw vegetables well. The NHS also flags pre-packed salads and sandwiches as a small listeria risk if they aren't kept cold. Eating plenty of vegetables is still one of the best things you can do in pregnancy.",
      tr: "Yıkanmamış sebze ve yeşilliklerdeki toprak toksoplazma paraziti ve bakteriler taşıyabilir; bu yüzden tüm salata yapraklarını ve çiğ sebzeleri iyice yıka. NHS, soğukta tutulmayan paketli salata ve sandviçlerin de küçük bir listeria riski taşıdığını belirtir. Bol sebze yemek yine de hamilelikte yapabileceğin en iyi şeylerden biri.",
    },
    tips: {
      en: ["Wash leaves under running water, even if they look clean.", "At salad bars, choose places that keep everything well chilled."],
      tr: ["Yaprakları temiz görünseler bile akan suyun altında yıka.", "Salata barlarında her şeyi iyi soğutan yerleri tercih et."],
    },
    sources: [S.nhsFoods, S.nhsInfections],
  },
  {
    id: "pre-cut-fruit",
    category: "food",
    emoji: "🍉",
    name: { en: "Pre-cut fruit & melon", tr: "Kesilmiş meyve ve kavun" },
    aliases: {
      en: ["cut melon", "fruit salad", "fruit cup", "watermelon slices", "cantaloupe", "fruit platter"],
      tr: ["kesilmiş meyve", "meyve salatası", "dilim karpuz", "kavun", "meyve tabağı", "paket meyve"],
    },
    verdict: "caution",
    summary: {
      en: "Fine if it's kept chilled and eaten by the use-by date, but skip cut fruit that's been sitting out in the warmth.",
      tr: "Soğukta tutulup son tüketim tarihinden önce yenirse sorun yok; sıcakta bekletilmiş kesik meyveyi yeme.",
    },
    details: {
      en: "Once fruit is cut, bacteria such as listeria can grow on it, and melon is a known risk. The CDC advises throwing away cut melon that's been left out for more than 2 hours (1 hour above 32°C) or kept in the fridge for over a week. Whole fruit that you wash and cut yourself is the safest choice.",
      tr: "Meyve kesildikten sonra üzerinde listeria gibi bakteriler üreyebilir; kavun bu konuda bilinen bir risktir. CDC, 2 saatten (32°C'nin üstünde 1 saatten) uzun dışarıda kalan ya da bir haftadan uzun buzdolabında bekleyen kesik kavunun atılmasını önerir. En güvenli seçenek, kendi yıkayıp kestiğin bütün meyvedir.",
    },
    tips: {
      en: ["Wash melons before cutting, as the knife carries surface germs inside.", "Put leftovers in the fridge straight away."],
      tr: ["Kavun ve karpuzu kesmeden önce yıka; bıçak yüzeydeki mikropları içeri taşır.", "Artanları hemen buzdolabına koy."],
    },
    sources: [S.nhsFoods, S.cdcListeriaPrevention],
  },
  {
    id: "papaya",
    category: "food",
    emoji: "🥭",
    name: { en: "Papaya (ripe vs unripe)", tr: "Papaya (olgun ve ham)" },
    aliases: {
      en: ["pawpaw", "green papaya", "unripe papaya", "ripe papaya", "som tam", "green papaya salad"],
      tr: ["yeşil papaya", "ham papaya", "olgun papaya", "papaya salatası"],
    },
    verdict: "caution",
    summary: {
      en: "Ripe papaya is fine, but avoid unripe (green) papaya, such as in green papaya salad.",
      tr: "Olgun papaya sorun değil, ama yeşil papaya salatasındaki gibi ham (yeşil) papayadan kaçın.",
    },
    details: {
      en: "Unripe papaya contains latex, which triggered uterine contractions in an animal study, while ripe papaya juice did not. Evidence in humans is limited, but green papaya is easy to avoid, so it's a sensible precaution. Ripe, yellow-orange papaya is a good source of vitamin C.",
      tr: "Ham papaya lateks içerir; bir hayvan çalışmasında bu lateks rahim kasılmalarını tetiklemiş, olgun papaya suyu ise tetiklememiştir. İnsanlarda kanıt sınırlıdır; ancak yeşil papayadan kaçınmak kolay olduğu için mantıklı bir önlemdir. Olgun, sarı-turuncu papaya iyi bir C vitamini kaynağıdır.",
    },
    tips: {
      en: ["Choose papaya with yellow-orange skin that gives slightly when pressed.", "Ask about green papaya in Thai salads and pickles."],
      tr: ["Kabuğu sarı-turuncu olan ve hafifçe bastırınca yumuşayan papaya seç.", "Tay salatalarında ve turşularda yeşil papaya olup olmadığını sor."],
    },
    sources: [S.bjnPapaya, S.nhsFoods],
  },
  {
    id: "pineapple",
    category: "food",
    emoji: "🍍",
    name: { en: "Pineapple", tr: "Ananas" },
    aliases: {
      en: ["pineapple juice", "fresh pineapple", "bromelain"],
      tr: ["ananas suyu", "taze ananas", "bromelain"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, pineapple in normal amounts is safe; the idea that it causes miscarriage is a myth.",
      tr: "Evet, normal miktarda ananas güvenlidir; düşüğe yol açtığı fikri bir efsanedir.",
    },
    details: {
      en: "Pineapple contains an enzyme called bromelain, but no health authority lists the fruit as a food to avoid, and normal portions haven't been shown to cause miscarriage or labour. Like other fruit, it's part of a healthy, varied diet. Its acidity can make heartburn worse for some people.",
      tr: "Ananas bromelain adlı bir enzim içerir; ancak hiçbir sağlık otoritesi bu meyveyi kaçınılacak yiyecekler arasında saymaz ve normal porsiyonların düşük ya da doğum başlattığı gösterilmemiştir. Diğer meyveler gibi sağlıklı ve çeşitli beslenmenin bir parçasıdır. Asitliği bazı kişilerde mide yanmasını artırabilir.",
    },
    tips: {
      en: ["Wash the outside before cutting.", "If it gives you heartburn, eat it with a meal rather than on its own."],
      tr: ["Kesmeden önce dışını yıka.", "Mide yanması yapıyorsa tek başına değil, yemekle birlikte ye."],
    },
    sources: [S.nhsFoods, S.nhsHeartburn],
  },
  {
    id: "grapes",
    category: "food",
    emoji: "🍇",
    name: { en: "Grapes", tr: "Üzüm" },
    aliases: {
      en: ["red grapes", "green grapes", "raisins", "grape juice", "resveratrol"],
      tr: ["siyah üzüm", "yeşil üzüm", "kuru üzüm", "üzüm suyu", "pekmez"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, grapes are safe in pregnancy, so just wash them well.",
      tr: "Evet, üzüm hamilelikte güvenlidir; sadece iyice yıka.",
    },
    details: {
      en: "Some online myths warn against grapes, but no health authority lists them as a food to avoid. As with all fruit, wash them thoroughly to remove soil and residues. Grapes and raisins are high in natural sugar, so keep portions sensible if you have gestational diabetes.",
      tr: "İnternette üzümle ilgili bazı efsaneler dolaşsa da hiçbir sağlık otoritesi üzümü kaçınılacak yiyecekler arasında saymaz. Tüm meyveler gibi toprak ve kalıntılardan arınması için iyice yıka. Üzüm ve kuru üzüm doğal şeker açısından zengindir; gebelik şekerin varsa porsiyonları makul tut.",
    },
    tips: {
      en: ["Rinse them under running water just before eating."],
      tr: ["Yemeden hemen önce akan suyun altında yıka."],
    },
    sources: [S.nhsFoods, S.nhsDiet],
  },
  {
    id: "liquorice",
    category: "food",
    emoji: "🍬",
    name: { en: "Liquorice root (meyan kökü)", tr: "Meyan kökü" },
    aliases: {
      en: ["licorice", "liquorice", "licorice root", "black licorice", "liquorice tea", "glycyrrhizin", "meyan"],
      tr: ["meyan şerbeti", "meyan çayı", "meyan balı", "meyan şekeri", "meyan kökü özü"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid liquorice root and drinks like meyan şerbeti, though the odd small liquorice sweet is unlikely to matter.",
      tr: "Meyan kökünden ve meyan şerbeti gibi içeceklerden kaçın; ara sıra yenen küçük bir meyan şekeri büyük olasılıkla sorun olmaz.",
    },
    details: {
      en: "Liquorice root contains a compound called glycyrrhizin, and the NHS advises avoiding herbal teas containing liquorice root because it may be harmful to a baby's development. Meyan şerbeti, popular in southeastern Turkey, is made from the root. Many liquorice-flavoured sweets contain only small amounts, or use aniseed instead.",
      tr: "Meyan kökü glisirizin adlı bir bileşik içerir; NHS, bebeğin gelişimine zararlı olabileceği için meyan kökü içeren bitki çaylarından kaçınılmasını önerir. Güneydoğu Anadolu'da sevilen meyan şerbeti de bu kökten yapılır. Meyan aromalı şekerlemelerin çoğu ya çok az miktarda içerir ya da bunun yerine anason kullanır.",
    },
    tips: {
      en: ["Check herbal tea blends for liquorice root on the label.", "Skip liquorice-flavoured nicotine products too."],
      tr: ["Bitki çayı karışımlarının etiketinde meyan kökü olup olmadığına bak.", "Meyan aromalı nikotin ürünlerinden de uzak dur."],
    },
    sources: [S.nhsFoods, S.nhsSmoking],
  },
  {
    id: "honey",
    category: "food",
    emoji: "🍯",
    name: { en: "Honey", tr: "Bal" },
    aliases: {
      en: ["raw honey", "manuka honey", "honeycomb", "unpasteurised honey"],
      tr: ["çiçek balı", "petek bal", "çam balı", "süzme bal", "ham bal"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, honey, including raw honey, is safe for you in pregnancy, since the no-honey rule is for babies under 1.",
      tr: "Evet, ham bal dahil bal hamilelikte senin için güvenlidir; bal yasağı 1 yaşından küçük bebekler içindir.",
    },
    details: {
      en: "Honey can contain bacterial spores that cause infant botulism, which is why babies under 12 months shouldn't have it. An adult's mature gut deals with these spores, and honey isn't on the NHS list of foods to avoid in pregnancy. It's still a sugar, so keep amounts moderate, especially if you have gestational diabetes.",
      tr: "Bal, bebeklerde botulizme yol açan bakteri sporları içerebilir; bu yüzden 12 aydan küçük bebeklere verilmez. Yetişkinlerin gelişmiş sindirim sistemi bu sporlarla baş eder ve bal, NHS'in hamilelikte kaçınılacak yiyecekler listesinde yer almaz. Yine de bir şekerdir; özellikle gebelik şekerin varsa miktarı ölçülü tut.",
    },
    tips: {
      en: ["A spoonful of honey with lemon in warm water can soothe a sore throat."],
      tr: ["Ilık suya bir kaşık bal ve limon eklemek boğaz ağrısına iyi gelebilir."],
    },
    sources: [S.nhsBabyFoods, S.nhsFoods],
  },
  {
    id: "peanuts",
    category: "food",
    emoji: "🥜",
    name: { en: "Peanuts & nuts", tr: "Yer fıstığı ve kuruyemiş" },
    aliases: {
      en: ["peanuts", "peanut butter", "nuts", "almonds", "walnuts", "cashews", "pistachios", "hazelnuts"],
      tr: ["fıstık", "yer fıstığı", "fıstık ezmesi", "ceviz", "badem", "fındık", "antep fıstığı", "kuruyemiş"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, peanuts and other nuts are safe unless you're allergic or your doctor has told you otherwise.",
      tr: "Evet, alerjin yoksa ya da doktorun aksini söylemediyse yer fıstığı ve diğer kuruyemişler güvenlidir.",
    },
    details: {
      en: "The NHS says peanuts and other nuts are safe to eat in pregnancy unless you're allergic or your doctor or midwife has advised you otherwise. Nuts provide protein, healthy fats and fibre. Unsalted versions are best for everyday snacking.",
      tr: "NHS, alerjin yoksa ya da doktorun veya eben aksini söylemediyse yer fıstığı ve diğer kuruyemişlerin hamilelikte güvenle yenebileceğini belirtir. Kuruyemişler protein, sağlıklı yağlar ve lif sağlar. Günlük atıştırma için tuzsuz olanlar en iyisi.",
    },
    tips: {
      en: ["A small handful of unsalted nuts makes a filling snack."],
      tr: ["Bir avuç tuzsuz kuruyemiş doyurucu bir ara öğündür."],
    },
    sources: [S.nhsFoods],
  },
  {
    id: "chocolate",
    category: "food",
    emoji: "🍫",
    name: { en: "Chocolate", tr: "Çikolata" },
    aliases: {
      en: ["dark chocolate", "milk chocolate", "cocoa", "hot chocolate", "brownies"],
      tr: ["bitter çikolata", "sütlü çikolata", "kakao", "sıcak çikolata", "çikolatalı kek"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, in moderation, but it contains a little caffeine that counts toward your 200 mg daily limit.",
      tr: "Evet, ölçülü olarak; ama günlük 200 mg sınırına sayılan biraz kafein içerir.",
    },
    details: {
      en: "The NHS estimates under 25 mg of caffeine in a 50 g bar of plain dark chocolate and under 10 mg in a 50 g bar of milk chocolate. That's small, but it adds up alongside coffee, tea and cola. Chocolate is also high in sugar and fat, so enjoy it as a treat.",
      tr: "NHS'e göre 50 gramlık sade bitter çikolatada 25 mg'den az, 50 gramlık sütlü çikolatada ise 10 mg'den az kafein bulunur. Bu az bir miktar, ama kahve, çay ve kolayla birlikte toplandığında artar. Çikolata ayrıca şeker ve yağ açısından zengindir; onu keyiflik bir ikram olarak tüket.",
    },
    tips: {
      en: ["If you also drink coffee or tea, count chocolate in your caffeine total."],
      tr: ["Kahve ya da çay da içiyorsan çikolatayı kafein toplamına ekle."],
    },
    sources: [S.nhsFoods],
  },
  {
    id: "spicy-food",
    category: "food",
    emoji: "🌶️",
    name: { en: "Spicy food", tr: "Acılı yemekler" },
    aliases: {
      en: ["chilli", "chili", "hot sauce", "curry", "jalapeno", "spicy"],
      tr: ["acı", "acılı yemek", "pul biber", "isot", "acı biber", "acı sos", "köri"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, spicy food won't harm your baby, though it can make heartburn worse.",
      tr: "Evet, acılı yemekler bebeğine zarar vermez, ama mide yanmasını artırabilir.",
    },
    details: {
      en: "Spicy food isn't on any pregnancy 'avoid' list, so it's about comfort rather than safety. Rich, spicy or fatty foods can trigger indigestion and heartburn, which are common in pregnancy, and the NHS suggests cutting down if they bother you. Smaller, more frequent meals can also help.",
      tr: "Acılı yemekler hamilelikte kaçınılacaklar listelerinde yer almaz; yani mesele güvenlik değil, rahatlık. Ağır, acılı ya da yağlı yiyecekler hamilelikte sık görülen hazımsızlık ve mide yanmasını tetikleyebilir; NHS rahatsız ediyorsa bunları azaltmayı önerir. Daha küçük ve sık öğünler de yardımcı olabilir.",
    },
    tips: {
      en: ["If you get heartburn at night, avoid spicy meals close to bedtime."],
      tr: ["Geceleri mide yanması oluyorsa acılı yemekleri yatmadan hemen önce yeme."],
    },
    sources: [S.nhsHeartburn],
  },
  {
    id: "pickles",
    category: "food",
    emoji: "🥒",
    name: { en: "Pickles (turşu)", tr: "Turşu" },
    aliases: {
      en: ["pickles", "gherkins", "pickled vegetables", "sauerkraut", "kimchi", "pickle juice", "tursu"],
      tr: ["turşu suyu", "salatalık turşusu", "lahana turşusu", "karışık turşu", "kornişon", "acılı turşu"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, pickles are safe, but keep an eye on the salt, especially if your blood pressure is high.",
      tr: "Evet, turşu güvenlidir; ama özellikle tansiyonun yüksekse tuza dikkat et.",
    },
    details: {
      en: "Pickled and fermented vegetables are fine in pregnancy, and pickle cravings are very common. Pickles and turşu suyu are very salty, and most adults already eat more salt than is recommended. If you have high blood pressure or swelling, ask your midwife or doctor how much salt is right for you.",
      tr: "Turşu ve fermente sebzeler hamilelikte sorun değildir; turşu isteği de çok yaygındır. Turşu ve turşu suyu çok tuzludur ve çoğu yetişkin zaten önerilenden fazla tuz tüketir. Tansiyonun yüksekse ya da ödemin varsa senin için ne kadar tuzun uygun olduğunu ebene ya da doktoruna sor.",
    },
    tips: {
      en: ["Rinse pickles, or choose lower-salt versions.", "Enjoy turşu alongside meals rather than drinking lots of the brine."],
      tr: ["Turşuyu yıkayarak ye ya da az tuzlu olanları seç.", "Turşu suyunu bol bol içmek yerine turşuyu yemeğin yanında tüket."],
    },
    sources: [S.nhsSalt, S.nhsDiet],
  },
  {
    id: "kombucha",
    category: "food",
    emoji: "🫖",
    name: { en: "Kombucha", tr: "Kombu çayı" },
    aliases: {
      en: ["kombucha", "fermented tea", "booch", "scoby"],
      tr: ["kombucha", "kombu çayı", "fermente çay", "mantar çayı"],
    },
    verdict: "avoid",
    summary: {
      en: "Best avoided, because it's often unpasteurised and homebrewed batches can grow harmful bacteria.",
      tr: "Kaçınmak en iyisi, çünkü çoğu zaman pastörize değildir ve evde mayalananlarda zararlı bakteriler üreyebilir.",
    },
    details: {
      en: "Kombucha is tea fermented with bacteria and yeast, so it naturally contains some caffeine and can contain a little alcohol. Mayo Clinic notes it has caused stomach upsets, infections and allergic reactions, and advises people who are pregnant or breastfeeding to avoid it. There's no proven health benefit to make up for those risks.",
      tr: "Kombu çayı bakteri ve mayayla fermente edilmiş çaydır; bu yüzden doğal olarak bir miktar kafein ve biraz alkol içerebilir. Mayo Clinic, bazı kişilerde mide rahatsızlığına, enfeksiyona ve alerjik reaksiyonlara yol açtığını belirtir ve hamile ya da emziren kişilerin bundan kaçınmasını önerir. Bu riskleri dengeleyecek kanıtlanmış bir sağlık faydası da yok.",
    },
    tips: {
      en: ["For something fizzy, try sparkling water with lemon or a splash of juice."],
      tr: ["Gazlı bir şey istersen limonlu soda ya da biraz meyve suyu katılmış maden suyu dene."],
    },
    sources: [S.mayoKombucha],
  },
  {
    id: "kefir",
    category: "food",
    emoji: "🥛",
    name: { en: "Kefir", tr: "Kefir" },
    aliases: {
      en: ["milk kefir", "fermented milk", "kefir drink", "probiotic drink"],
      tr: ["ev yapımı kefir", "fermente süt", "probiyotik içecek", "kefir mayası"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, shop-bought kefir made from pasteurised milk is fine, but avoid homemade kefir made from raw milk.",
      tr: "Evet, pastörize sütten yapılan hazır kefir sorun değil; çiğ sütten yapılan ev kefirinden ise kaçın.",
    },
    details: {
      en: "Kefir is a fermented milk drink, and versions made with pasteurised milk are considered as safe as yoghurt. The risk comes from kefir made with unpasteurised milk, which can carry listeria and other bacteria. If you make it at home, start with pasteurised or boiled milk and keep it chilled.",
      tr: "Kefir fermente bir süt içeceğidir; pastörize sütle yapılanlar yoğurt kadar güvenli kabul edilir. Risk, listeria ve başka bakteriler taşıyabilen pastörize edilmemiş sütle yapılan kefirde. Evde yapıyorsan pastörize ya da kaynatılmış sütle başla ve buzdolabında sakla.",
    },
    tips: {
      en: ["Check the label says pasteurised milk.", "Plain kefir has less sugar than flavoured versions."],
      tr: ["Etikette pastörize süt yazdığından emin ol.", "Sade kefir, aromalılardan daha az şeker içerir."],
    },
    sources: [S.nhsFoods, S.nhsDairy],
  },
  {
    id: "yogurt-ayran",
    category: "food",
    emoji: "🥛",
    name: { en: "Yoghurt & ayran", tr: "Yoğurt ve ayran" },
    aliases: {
      en: ["yogurt", "yoghurt", "ayran", "greek yogurt", "strained yogurt", "lassi", "tzatziki", "cacik"],
      tr: ["süzme yoğurt", "ev yoğurdu", "cacık", "haydari", "açık ayran", "yayık ayranı"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, yoghurt and ayran made from pasteurised or boiled milk are safe and a great source of calcium.",
      tr: "Evet, pastörize ya da kaynatılmış sütten yapılan yoğurt ve ayran güvenlidir ve harika bir kalsiyum kaynağıdır.",
    },
    details: {
      en: "The NHS lists pasteurised yoghurt as safe in pregnancy, and shop-bought ayran is made from it. Homemade yoghurt is fine too, as long as the milk was pasteurised or brought to the boil first. Only yoghurt made from raw, unboiled milk should be avoided.",
      tr: "NHS pastörize yoğurdu hamilelikte güvenli sayar; hazır ayran da bundan yapılır. Ev yoğurdu da süt pastörize edilmiş ya da önce kaynatılmışsa sorun değildir. Yalnızca çiğ, kaynatılmamış sütten yapılan yoğurttan kaçınılmalı.",
    },
    tips: {
      en: ["Ayran is salty, so choose lower-salt versions if you have swelling or high blood pressure."],
      tr: ["Ayran tuzludur; ödemin ya da yüksek tansiyonun varsa az tuzlu olanları seç."],
    },
    sources: [S.nhsFoods, S.nhsDairy],
  },
  {
    id: "raw-milk",
    category: "food",
    emoji: "🐄",
    name: { en: "Raw (unpasteurised) milk", tr: "Çiğ süt" },
    aliases: {
      en: ["raw milk", "unpasteurised milk", "unpasteurized milk", "farm milk", "fresh cow's milk", "raw goat milk"],
      tr: ["sokak sütü", "köy sütü", "pastörize olmayan süt", "günlük süt", "keçi sütü", "manda sütü"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid unpasteurised milk, or bring it to a rolling boil before drinking or cooking with it.",
      tr: "Pastörize edilmemiş sütten kaçın ya da içmeden veya yemekte kullanmadan önce iyice kaynat.",
    },
    details: {
      en: "Raw milk can carry listeria, salmonella, E. coli and campylobacter, and the CDC lists pregnant women among those at higher risk of serious illness. The NHS advises avoiding unpasteurised milk, cream and yoghurt from cows, sheep and goats. Boiling kills these bacteria, which is why boiled village milk is a safe alternative.",
      tr: "Çiğ süt listeria, salmonella, E. coli ve kampilobakter taşıyabilir; CDC hamileleri ciddi hastalık açısından yüksek risk grubunda sayar. NHS inek, koyun ve keçiden elde edilen pastörize edilmemiş süt, krema ve yoğurttan kaçınılmasını önerir. Kaynatmak bu bakterileri öldürür; bu yüzden kaynatılmış köy sütü güvenli bir alternatiftir.",
    },
    tips: {
      en: ["Bring village or farm milk to a rolling boil before using it.", "When shopping, choose pasteurised or UHT milk."],
      tr: ["Köy ya da çiftlik sütünü kullanmadan önce taşana kadar iyice kaynat.", "Alışverişte pastörize ya da UHT süt seç."],
    },
    sources: [S.nhsFoods, S.cdcRawMilk],
  },
  {
    id: "ice-cream",
    category: "food",
    emoji: "🍨",
    name: { en: "Ice cream", tr: "Dondurma" },
    aliases: {
      en: ["gelato", "frozen yogurt", "sorbet", "maras ice cream", "dondurma", "homemade ice cream"],
      tr: ["maraş dondurması", "külah dondurma", "kaymaklı dondurma", "ev yapımı dondurma", "paket dondurma"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, pasteurised ice cream is safe, but avoid homemade ice cream made with raw egg or raw milk.",
      tr: "Evet, pastörize dondurma güvenlidir; ama çiğ yumurta ya da çiğ sütle yapılmış ev dondurmasından kaçın.",
    },
    details: {
      en: "The NHS lists pasteurised ice cream as safe in pregnancy, and commercially made ice cream uses pasteurised milk. Some homemade recipes use raw egg or unpasteurised milk, which can carry salmonella or listeria. Soft serve from machines is a slightly different case, covered separately.",
      tr: "NHS pastörize dondurmayı hamilelikte güvenli sayar; fabrikada üretilen dondurmalarda da pastörize süt kullanılır. Bazı ev tariflerinde salmonella ya da listeria taşıyabilen çiğ yumurta veya pastörize edilmemiş süt kullanılır. Makineden akan yumuşak dondurma biraz farklı bir durumdur ve ayrıca ele alınmıştır.",
    },
    tips: {
      en: ["Keep it frozen, and don't refreeze ice cream that has melted."],
      tr: ["Dondurucuda sakla; erimiş dondurmayı yeniden dondurma."],
    },
    sources: [S.nhsFoods, S.fdaEggs],
  },
  {
    id: "soft-serve",
    category: "food",
    emoji: "🍦",
    name: { en: "Soft serve ice cream", tr: "Makine dondurma" },
    aliases: {
      en: ["soft-serve", "mr whippy", "frozen custard", "machine ice cream", "sundae", "mcflurry"],
      tr: ["makine dondurma", "yumuşak dondurma", "soft dondurma", "külah makine dondurması"],
    },
    verdict: "caution",
    summary: {
      en: "Usually fine from busy, clean outlets, though machines that aren't cleaned well can harbour listeria.",
      tr: "Kalabalık ve temiz yerlerde genellikle sorun yok; ama iyi temizlenmeyen makinelerde listeria barınabilir.",
    },
    details: {
      en: "Soft serve is made from a pasteurised mix, but listeria can survive in machines that aren't properly cleaned, because it's able to grow at cold temperatures. It's a small risk, but listeria infection can be serious in pregnancy. Packaged ice cream is the lower-risk choice.",
      tr: "Makine dondurması pastörize bir karışımdan yapılır; ancak listeria soğukta da üreyebildiği için iyi temizlenmeyen makinelerde hayatta kalabilir. Risk küçüktür ama listeria enfeksiyonu hamilelikte ciddi olabilir. Paketli dondurma daha düşük riskli bir seçimdir.",
    },
    tips: {
      en: ["Choose places with high turnover and visibly clean machines."],
      tr: ["Satışı yoğun olan ve makinesi gözle görülür derecede temiz yerleri seç."],
    },
    sources: [S.whoListeriosis, S.nhsFoods],
  },
  {
    id: "parsley",
    category: "food",
    emoji: "🌿",
    name: { en: "Parsley & herbs in large amounts", tr: "Maydanoz ve bol miktarda ot" },
    aliases: {
      en: ["parsley", "parsley juice", "parsley tea", "herbs", "tabbouleh", "coriander", "dill", "sage"],
      tr: ["maydanoz", "maydanoz suyu", "maydanoz kürü", "kısır", "tabule", "dereotu", "nane", "adaçayı"],
    },
    verdict: "caution",
    summary: {
      en: "Herbs in normal cooking amounts are fine, but avoid parsley juices, 'cures' and strong herb teas in large amounts.",
      tr: "Yemeklerdeki normal miktarlarda otlar sorun değil; ama maydanoz suyu, maydanoz kürü ve bol miktarda koyu ot çayından kaçın.",
    },
    details: {
      en: "Using parsley, dill, mint, sage or coriander in dishes like kısır or tabbouleh is perfectly safe. Concentrated forms are different: juices, teas, oils and extracts deliver far larger amounts, and MotherToBaby notes that some herbal products have been shown to cause uterine contractions. Folk remedies such as parsley 'cures' are best left until after pregnancy.",
      tr: "Maydanoz, dereotu, nane, adaçayı ya da kişnişi kısır veya tabule gibi yemeklerde kullanmak tamamen güvenlidir. Yoğun formlar ise farklıdır: meyve suyu, çay, yağ ve özütler çok daha fazla miktar içerir; MotherToBaby de bazı bitkisel ürünlerin rahim kasılmalarına yol açtığının gösterildiğini belirtir. Maydanoz kürü gibi halk uygulamalarını doğumdan sonraya bırak.",
    },
    tips: {
      en: ["Enjoy herbs as food, not as remedies or detox cures."],
      tr: ["Otları ilaç ya da detoks kürü olarak değil, yemek olarak tüket."],
    },
    sources: [S.m2bHerbal, S.nhsMedicines],
  },
  {
    id: "cinnamon",
    category: "food",
    emoji: "🍂",
    name: { en: "Cinnamon", tr: "Tarçın" },
    aliases: {
      en: ["cassia", "cinnamon tea", "cinnamon supplement", "cinnamon water"],
      tr: ["tarçın çayı", "tarçınlı süt", "tarçın suyu", "tarçın takviyesi", "çin tarçını"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, in normal food amounts, but avoid cinnamon supplements, oils and large daily 'remedy' doses.",
      tr: "Evet, yemeklerdeki normal miktarlarda; ama tarçın takviyelerinden, yağından ve her gün yüksek dozda kür kullanımından kaçın.",
    },
    details: {
      en: "Cinnamon sprinkled on sütlaç or porridge, or used in baking, is fine in pregnancy. Supplements, concentrated oils and daily 'cinnamon water' remedies deliver much larger amounts, and herbal products at medicinal doses haven't been well studied in pregnancy. Check with your doctor before using cinnamon to manage blood sugar.",
      tr: "Sütlacın ya da yulaf lapasının üzerine serpilen veya hamur işlerinde kullanılan tarçın hamilelikte sorun değil. Takviyeler, yoğun yağlar ve her gün içilen tarçın suyu kürleri çok daha yüksek miktarlar içerir; tıbbi dozlardaki bitkisel ürünler de hamilelikte yeterince araştırılmamıştır. Kan şekerini düzenlemek için tarçın kullanmadan önce doktoruna danış.",
    },
    tips: {
      en: ["If you have gestational diabetes, follow your care team's plan, not online remedies."],
      tr: ["Gebelik şekerin varsa internetteki kürleri değil, sağlık ekibinin planını izle."],
    },
    sources: [S.m2bHerbal],
  },
  {
    id: "garlic",
    category: "food",
    emoji: "🧄",
    name: { en: "Garlic", tr: "Sarımsak" },
    aliases: {
      en: ["raw garlic", "garlic supplement", "garlic pills", "black garlic"],
      tr: ["çiğ sarımsak", "sarımsak hapı", "siyah sarımsak", "sarımsaklı yoğurt", "sarımsak kürü"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, garlic in cooking, even raw in cacık, is fine, but ask before taking garlic supplements.",
      tr: "Evet, yemeklerdeki, hatta cacıktaki çiğ sarımsak bile sorun değil; ama sarımsak takviyesi almadan önce danış.",
    },
    details: {
      en: "Garlic as a food is safe in pregnancy and adds lots of flavour. Concentrated garlic supplements are a different matter: herbal products at medicinal doses haven't been well studied in pregnancy, and some can interact with medicines. Tell your doctor or pharmacist about any supplements you take.",
      tr: "Sarımsak bir besin olarak hamilelikte güvenlidir ve yemeklere bolca lezzet katar. Yoğun sarımsak takviyeleri ise farklıdır: tıbbi dozlardaki bitkisel ürünler hamilelikte yeterince araştırılmamıştır ve bazıları ilaçlarla etkileşebilir. Kullandığın takviyeleri doktoruna ya da eczacına söyle.",
    },
    tips: {
      en: ["Skip daily raw-garlic 'cures' and stick to garlic as an ingredient."],
      tr: ["Her gün çiğ sarımsak kürü yapmak yerine sarımsağı yemeklerde malzeme olarak kullan."],
    },
    sources: [S.m2bHerbal, S.nhsMedicines],
  },
  {
    id: "ginger",
    category: "food",
    emoji: "🫚",
    name: { en: "Ginger", tr: "Zencefil" },
    aliases: {
      en: ["ginger tea", "ginger biscuits", "ginger ale", "fresh ginger", "crystallised ginger", "ginger shot"],
      tr: ["zencefil çayı", "taze zencefil", "zencefilli kurabiye", "zencefil şekerlemesi", "zencefil shot"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, ginger in food and drinks is safe and may help with morning sickness.",
      tr: "Evet, yiyecek ve içeceklerdeki zencefil güvenlidir ve bulantıya iyi gelebilir.",
    },
    details: {
      en: "The NHS says there's some evidence that foods or drinks containing ginger may reduce nausea and vomiting in pregnancy. Ginger tea, ginger biscuits or fresh ginger in cooking are all fine. Ginger supplements are stronger, so the NHS advises checking with a pharmacist before taking them.",
      tr: "NHS, zencefil içeren yiyecek ve içeceklerin hamilelikteki bulantı ve kusmayı azaltabileceğine dair bazı kanıtlar olduğunu söyler. Zencefil çayı, zencefilli bisküvi ya da yemeklerde taze zencefil sorun değil. Zencefil takviyeleri daha güçlüdür; NHS bunları almadan önce eczacıya danışılmasını önerir.",
    },
    tips: {
      en: ["When you feel queasy, sip ginger tea slowly or nibble a ginger biscuit."],
      tr: ["Midende bulantı olduğunda zencefil çayını yudum yudum iç ya da bir zencefilli bisküvi kemir."],
    },
    sources: [S.nhsSickness, S.bumpsNausea],
  },
  {
    id: "fenugreek",
    category: "food",
    emoji: "🌾",
    name: { en: "Fenugreek (çemen)", tr: "Çemen otu" },
    aliases: {
      en: ["fenugreek", "methi", "cemen", "fenugreek tea", "fenugreek seeds", "fenugreek capsules"],
      tr: ["çemen", "çemen çayı", "boy otu", "çemen tohumu", "çemen kapsülü"],
    },
    verdict: "caution",
    summary: {
      en: "Fine in normal cooking amounts, but avoid fenugreek teas, capsules and large medicinal doses.",
      tr: "Yemeklerdeki normal miktarlarda sorun değil; ama çemen çayından, kapsüllerinden ve yüksek tıbbi dozlardan kaçın.",
    },
    details: {
      en: "Fenugreek is used as a spice, including in the çemen paste on pastırma, and small cooking amounts aren't a concern. In medicinal amounts it hasn't been shown to be safe in pregnancy, and MotherToBaby notes that some herbal products can cause uterine contractions. It's often sold to boost breast milk, which is something for after the birth, not during pregnancy.",
      tr: "Çemen otu baharat olarak kullanılır (pastırmanın üzerindeki çemen ezmesi de bundan yapılır) ve yemeklerdeki küçük miktarlar sorun değildir. Tıbbi miktarlarda hamilelikte güvenli olduğu gösterilmemiştir; MotherToBaby de bazı bitkisel ürünlerin rahim kasılmalarına yol açabildiğini belirtir. Genellikle süt artırıcı olarak satılır; bu da hamilelik değil, doğum sonrası için bir konudur.",
    },
    tips: {
      en: ["Keep fenugreek in the spice rack, not the supplement cupboard, until after birth."],
      tr: ["Doğuma kadar çemeni takviye dolabında değil, baharat rafında tut."],
    },
    sources: [S.m2bHerbal, S.nhsMedicines],
  },

  // ── Drinks ─────────────────────────────────────────────────────────────────

  {
    id: "coffee",
    category: "drink",
    emoji: "☕",
    name: { en: "Coffee", tr: "Kahve" },
    aliases: {
      en: ["filter coffee", "instant coffee", "latte", "cappuccino", "flat white", "americano", "iced coffee", "caffeine"],
      tr: ["filtre kahve", "hazır kahve", "latte", "kapuçino", "americano", "soğuk kahve", "kafein"],
    },
    verdict: "caution",
    summary: {
      en: "Yes, but keep your total caffeine under 200 mg a day, which is roughly 2 mugs of instant coffee.",
      tr: "Evet, ama toplam kafeini günde 200 mg'nin altında tut; bu yaklaşık 2 kupa hazır kahve eder.",
    },
    details: {
      en: "Both the NHS and ACOG advise keeping caffeine below 200 mg a day, because too much caffeine has been linked to a higher chance of miscarriage. The NHS estimates around 100 mg in a mug of instant coffee, while filter and coffee-shop coffee can contain more. Caffeine in tea, cola, energy drinks and chocolate counts too.",
      tr: "Hem NHS hem ACOG kafeinin günde 200 mg'nin altında tutulmasını önerir, çünkü fazla kafein daha yüksek düşük olasılığıyla ilişkilendirilmiştir. NHS bir kupa hazır kahvede yaklaşık 100 mg kafein olduğunu, filtre ve kafe kahvelerinde bunun daha fazla olabileceğini belirtir. Çay, kola, enerji içeceği ve çikolatadaki kafein de bu toplama dahildir.",
    },
    tips: {
      en: ["Ask for a single shot or a smaller size at coffee shops.", "Switch some cups to decaf to stay well under the limit."],
      tr: ["Kafelerde tek shot ya da küçük boy iste.", "Sınırın rahatça altında kalmak için bazı fincanları kafeinsize çevir."],
    },
    sources: [S.nhsFoods, S.acogCoffee],
  },
  {
    id: "turkish-coffee",
    category: "drink",
    emoji: "☕",
    name: { en: "Turkish coffee", tr: "Türk kahvesi" },
    aliases: {
      en: ["turkish coffee", "greek coffee", "arabic coffee", "cezve coffee", "menengic"],
      tr: ["türk kahvesi", "orta şekerli kahve", "sade kahve", "köpüklü kahve", "menengiç kahvesi", "dibek kahvesi"],
    },
    verdict: "caution",
    summary: {
      en: "Yes, a cup is fine, but it counts toward your 200 mg daily caffeine limit along with tea and other drinks.",
      tr: "Evet, bir fincan sorun değil; ama çay ve diğer içeceklerle birlikte günlük 200 mg kafein sınırına sayılır.",
    },
    details: {
      en: "Turkish coffee is served in a small cup, but it's strong, and the caffeine varies with how much coffee is used and how it's brewed. The 200 mg daily caffeine limit from the NHS and ACOG covers all sources, so a couple of cups plus several glasses of çay can add up quickly. Menengiç is made from terebinth rather than coffee beans and is naturally caffeine-free, though some blends add coffee.",
      tr: "Türk kahvesi küçük bir fincanda servis edilir ama serttir; kafein miktarı kullanılan kahveye ve pişirme şekline göre değişir. NHS ve ACOG'un günlük 200 mg kafein sınırı tüm kaynakları kapsar; bu yüzden birkaç fincan kahve ve birkaç bardak çay hızla toplanabilir. Menengiç kahvesi kahve çekirdeğinden değil, menengiç meyvesinden yapılır ve doğal olarak kafeinsizdir; ama bazı karışımlara kahve eklenir.",
    },
    tips: {
      en: ["Keep to one or two cups and count your çay too.", "Menengiç or decaf Turkish coffee makes a good swap."],
      tr: ["Bir iki fincanla sınırla ve içtiğin çayı da hesaba kat.", "Menengiç ya da kafeinsiz Türk kahvesi iyi bir alternatif."],
    },
    sources: [S.nhsFoods, S.acogCoffee],
  },
  {
    id: "espresso",
    category: "drink",
    emoji: "☕",
    name: { en: "Espresso", tr: "Espresso" },
    aliases: {
      en: ["espresso", "double espresso", "ristretto", "macchiato", "cortado", "doppio"],
      tr: ["espresso", "duble espresso", "ristretto", "macchiato", "cortado"],
    },
    verdict: "caution",
    summary: {
      en: "Yes, but count every shot, as double shots and large coffee-shop drinks use up your 200 mg limit fast.",
      tr: "Evet, ama her shot'ı say; duble shot'lar ve büyük boy kafe içecekleri 200 mg sınırını hızla doldurur.",
    },
    details: {
      en: "Espresso is concentrated, and many coffee-shop drinks contain two or more shots. The NHS and ACOG both advise keeping total caffeine below 200 mg a day in pregnancy. The FDA notes that caffeine content varies widely between drinks, so it's worth checking the café's information.",
      tr: "Espresso yoğundur ve kafelerdeki pek çok içecek iki ya da daha fazla shot içerir. NHS ve ACOG hamilelikte toplam kafeinin günde 200 mg'nin altında tutulmasını önerir. FDA, kafein miktarının içecekten içeceğe çok değiştiğini belirtir; bu yüzden kafenin verdiği bilgilere bakmakta fayda var.",
    },
    tips: {
      en: ["Order single shots, or ask for half-decaf.", "Many chains publish caffeine content per drink, so check before you order."],
      tr: ["Tek shot iste ya da yarı kafeinsiz yapmalarını rica et.", "Pek çok zincir kafe içecek başına kafein miktarını paylaşır, sipariş öncesi kontrol et."],
    },
    sources: [S.nhsFoods, S.fdaCaffeine],
  },
  {
    id: "decaf",
    category: "drink",
    emoji: "☕",
    name: { en: "Decaf coffee & tea", tr: "Kafeinsiz kahve ve çay" },
    aliases: {
      en: ["decaf", "decaffeinated coffee", "decaf tea", "caffeine-free"],
      tr: ["kafeinsiz", "kafeinsiz kahve", "kafeinsiz çay", "decaf"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, decaf has only a small amount of caffeine and is a good way to enjoy coffee or tea in pregnancy.",
      tr: "Evet, kafeinsizde yalnızca çok az kafein bulunur; hamilelikte kahve ve çayın tadını çıkarmanın iyi bir yoludur.",
    },
    details: {
      en: "Decaffeinated coffee and tea still contain a little caffeine, but far less than regular versions, so they leave plenty of room under the 200 mg daily limit. MotherToBaby notes that caffeine is found in many foods and drinks, so swapping some cups to decaf is an easy way to cut down.",
      tr: "Kafeinsiz kahve ve çay yine de biraz kafein içerir, ancak normal hallerinden çok daha az; bu da günlük 200 mg sınırının altında bolca pay bırakır. MotherToBaby, kafeinin pek çok yiyecek ve içecekte bulunduğunu belirtir; bazı fincanları kafeinsize çevirmek azaltmanın kolay bir yoludur.",
    },
    tips: {
      en: ["Try half-and-half blends if you're cutting down gradually."],
      tr: ["Yavaş yavaş azaltıyorsan yarı kafeinli karışımları dene."],
    },
    sources: [S.nhsFoods, S.m2bCaffeine],
  },
  {
    id: "cay",
    category: "drink",
    emoji: "🫖",
    name: { en: "Black tea (çay)", tr: "Çay (siyah çay)" },
    aliases: {
      en: ["tea", "black tea", "turkish tea", "cay", "english breakfast", "earl grey", "builder's tea", "iced tea"],
      tr: ["çay", "siyah çay", "demli çay", "açık çay", "rize çayı", "ince belli bardak", "buzlu çay"],
    },
    verdict: "caution",
    summary: {
      en: "Yes, but strong (demli) tea adds caffeine fast, so count your glasses and drink it between meals.",
      tr: "Evet, ama demli çay kafeini hızla artırır; bardakları say ve çayı yemekle birlikte değil, öğün aralarında iç.",
    },
    details: {
      en: "The NHS estimates about 75 mg of caffeine in a mug of tea, and it counts toward the 200 mg daily limit. A tulip glass of Turkish tea is smaller than a mug, but several strong glasses a day can add up. Tea with meals can also reduce how much iron you absorb, which matters because iron needs rise in pregnancy.",
      tr: "NHS bir kupa çayda yaklaşık 75 mg kafein olduğunu tahmin eder ve bu günlük 200 mg sınırına sayılır. İnce belli bir bardak çay kupadan küçüktür ama gün içinde içilen birkaç demli bardak toplanabilir. Yemekle birlikte içilen çay demir emilimini de azaltabilir; hamilelikte demir ihtiyacı arttığı için bu önemlidir.",
    },
    tips: {
      en: ["Choose açık (weaker) tea and alternate with water or herbal drinks.", "Drink tea between meals rather than with them to help iron absorption."],
      tr: ["Açık çay tercih et ve suyla ya da bitki çaylarıyla dönüşümlü iç.", "Demir emilimine yardım etmek için çayı yemekle birlikte değil, öğün aralarında iç."],
    },
    sources: [S.nhsFoods, S.nhsIronAnaemia],
  },
  {
    id: "green-tea",
    category: "drink",
    emoji: "🍵",
    name: { en: "Green tea", tr: "Yeşil çay" },
    aliases: {
      en: ["green tea", "sencha", "jasmine tea", "green tea extract"],
      tr: ["yeşil çay", "yasemin çayı", "yeşil çay özü", "sencha"],
    },
    verdict: "caution",
    summary: {
      en: "Yes in moderation, but green tea contains caffeine that counts toward your 200 mg limit.",
      tr: "Ölçülü olarak evet; ama yeşil çay da 200 mg sınırına sayılan kafein içerir.",
    },
    details: {
      en: "Green tea isn't caffeine-free: the NHS estimates about 75 mg in a cup of black or green tea. A few cups a day can fit within the 200 mg limit if you count your other drinks too. Concentrated green tea extracts and supplements are a different matter and haven't been shown to be safe in pregnancy.",
      tr: "Yeşil çay kafeinsiz değildir: NHS bir fincan siyah ya da yeşil çayda yaklaşık 75 mg kafein olduğunu tahmin eder. Diğer içeceklerini de sayarsan günde birkaç fincan 200 mg sınırına sığabilir. Yoğun yeşil çay özütleri ve takviyeleri ise farklı bir konudur ve hamilelikte güvenli oldukları gösterilmemiştir.",
    },
    tips: {
      en: ["Skip green tea extract capsules and weight-loss blends."],
      tr: ["Yeşil çay özü kapsüllerinden ve zayıflama karışımlarından uzak dur."],
    },
    sources: [S.nhsFoods, S.m2bCaffeine],
  },
  {
    id: "matcha",
    category: "drink",
    emoji: "🍵",
    name: { en: "Matcha", tr: "Matcha" },
    aliases: {
      en: ["matcha latte", "matcha tea", "powdered green tea", "iced matcha"],
      tr: ["matcha latte", "matcha çayı", "toz yeşil çay", "buzlu matcha"],
    },
    verdict: "caution",
    summary: {
      en: "Yes in moderation, but matcha is usually stronger than regular green tea, so count it toward 200 mg a day.",
      tr: "Ölçülü olarak evet; ama matcha genellikle normal yeşil çaydan daha serttir, günlük 200 mg'ye say.",
    },
    details: {
      en: "Matcha is made from whole powdered tea leaves, so a serving usually contains more caffeine than a cup of brewed green tea. The amount depends on how many scoops are used. The FDA notes that caffeine content varies widely between drinks, so treat a matcha latte more like a coffee than a cup of tea.",
      tr: "Matcha, toz haline getirilmiş bütün çay yapraklarından yapılır; bu yüzden bir porsiyonu genellikle demlenmiş bir fincan yeşil çaydan daha fazla kafein içerir. Miktar, kullanılan kaşık sayısına bağlıdır. FDA kafein miktarının içecekten içeceğe çok değiştiğini belirtir; matcha latteyi bir fincan çaydan çok bir kahve gibi düşün.",
    },
    tips: {
      en: ["Ask for a single scoop and count it as you would a coffee."],
      tr: ["Tek ölçek iste ve onu bir kahve gibi hesaba kat."],
    },
    sources: [S.nhsFoods, S.fdaCaffeine],
  },
  {
    id: "chamomile",
    category: "drink",
    emoji: "🌼",
    name: { en: "Chamomile tea", tr: "Papatya çayı" },
    aliases: {
      en: ["chamomile", "camomile", "herbal tea", "sleepy tea"],
      tr: ["papatya", "papatya çayı", "bitki çayı", "uyku çayı"],
    },
    verdict: "caution",
    summary: {
      en: "Yes in moderation; the NHS suggests no more than 4 cups of herbal tea a day.",
      tr: "Ölçülü olarak evet; NHS günde en fazla 4 fincan bitki çayı öneriyor.",
    },
    details: {
      en: "There's not much research on herbal teas in pregnancy, so the NHS advises limiting them to about 4 cups a day. Chamomile is naturally caffeine-free, which makes it a popular evening drink. Avoid blends that contain liquorice root, and check mixed teas for other herbs.",
      tr: "Hamilelikte bitki çayları üzerine fazla araştırma yok; bu yüzden NHS bunları günde yaklaşık 4 fincanla sınırlamayı önerir. Papatya doğal olarak kafeinsizdir, bu da onu sevilen bir akşam içeceği yapar. Meyan kökü içeren karışımlardan kaçın ve karışık çaylarda başka hangi otların olduğunu kontrol et.",
    },
    tips: {
      en: ["Use plain chamomile tea bags rather than mixed 'wellness' blends."],
      tr: ["Karışık 'wellness' çayları yerine sade papatya poşet çay kullan."],
    },
    sources: [S.nhsFoods],
  },
  {
    id: "peppermint-tea",
    category: "drink",
    emoji: "🌿",
    name: { en: "Peppermint tea", tr: "Nane çayı" },
    aliases: {
      en: ["peppermint", "mint tea", "fresh mint tea", "moroccan mint"],
      tr: ["nane", "nane çayı", "taze nane çayı", "ıhlamur nane", "nane limon"],
    },
    verdict: "caution",
    summary: {
      en: "Yes in moderation, within the NHS guide of no more than 4 cups of herbal tea a day.",
      tr: "Ölçülü olarak evet; NHS'in günde en fazla 4 fincan bitki çayı önerisi içinde kal.",
    },
    details: {
      en: "Peppermint tea is caffeine-free and a common choice in pregnancy, but because there's little research on herbal teas, the NHS advises no more than 4 cups a day. Some people find it soothing for nausea. Nane-limon made at home with fresh mint and lemon is fine within the same limit.",
      tr: "Nane çayı kafeinsizdir ve hamilelikte sık tercih edilir; ancak bitki çayları hakkında az araştırma olduğu için NHS günde en fazla 4 fincan önerir. Bazı kişiler bulantıya iyi geldiğini düşünür. Evde taze nane ve limonla yapılan nane-limon da aynı sınır içinde sorun değil.",
    },
    tips: {
      en: ["Fresh mint leaves in hot water make an easy, gentle tea."],
      tr: ["Sıcak suya birkaç taze nane yaprağı atmak kolay ve hafif bir çay olur."],
    },
    sources: [S.nhsFoods],
  },
  {
    id: "raspberry-leaf-tea",
    category: "drink",
    emoji: "🍃",
    name: { en: "Raspberry leaf tea", tr: "Ahududu yaprağı çayı" },
    aliases: {
      en: ["raspberry leaf", "red raspberry leaf tea", "labour tea", "raspberry leaf capsules"],
      tr: ["ahududu yaprağı", "ahududu yaprağı çayı", "doğum çayı", "ahududu kapsülü"],
    },
    verdict: "caution",
    summary: {
      en: "It's only for late pregnancy, and only if your midwife or doctor agrees; don't use it earlier.",
      tr: "Yalnızca hamileliğin son döneminde ve eben ya da doktorun onaylarsa; daha erken kullanma.",
    },
    details: {
      en: "Raspberry leaf tea is traditionally used in late pregnancy in the hope of preparing the womb for labour, but there's little good evidence that it works. MotherToBaby notes that some herbal products can cause uterine contractions, and most herbal products haven't been well studied in pregnancy. That's why it's best kept to late pregnancy and discussed with your midwife first.",
      tr: "Ahududu yaprağı çayı, rahmi doğuma hazırlaması umuduyla geleneksel olarak hamileliğin son döneminde kullanılır; ancak işe yaradığına dair güçlü kanıt yoktur. MotherToBaby, bazı bitkisel ürünlerin rahim kasılmalarına yol açabildiğini ve çoğunun hamilelikte yeterince incelenmediğini belirtir. Bu yüzden son döneme bırakmak ve önce ebenle konuşmak en iyisi.",
    },
    tips: {
      en: ["Ask your midwife before starting, especially if you've had a previous caesarean or early labour."],
      tr: ["Başlamadan önce ebene sor; özellikle daha önce sezaryen ya da erken doğum yaşadıysan."],
    },
    sources: [S.m2bHerbal, S.nhsFoods],
  },
  {
    id: "sage-tea",
    category: "drink",
    emoji: "🌿",
    name: { en: "Sage tea (adaçayı)", tr: "Adaçayı" },
    aliases: {
      en: ["sage tea", "adacayi", "sage", "greek mountain tea"],
      tr: ["adaçayı", "adaçayı çayı", "ada çayı", "dağ çayı"],
    },
    verdict: "avoid",
    summary: {
      en: "Best avoided as a regular tea in pregnancy, though a little sage used in cooking is fine.",
      tr: "Hamilelikte düzenli içilen bir çay olarak kaçınmak en iyisi; yemeklerde kullanılan biraz adaçayı ise sorun değil.",
    },
    details: {
      en: "Sage contains thujone, a compound that can be harmful in large amounts, and sage tea hasn't been shown to be safe in pregnancy. Adaçayı is often drunk by the glass in Turkey, especially for sore throats, so the amounts can add up. A pinch of sage in cooking is a different, much smaller exposure.",
      tr: "Adaçayı, yüksek miktarlarda zararlı olabilen tuyon adlı bir bileşik içerir ve adaçayı çayının hamilelikte güvenli olduğu gösterilmemiştir. Türkiye'de özellikle boğaz ağrısı için bardak bardak içildiği için miktarlar artabilir. Yemeğe atılan bir tutam adaçayı ise çok daha küçük ve farklı bir maruziyettir.",
    },
    tips: {
      en: ["For a sore throat, try warm water with honey and lemon instead.", "Check herbal blends and lozenges for sage."],
      tr: ["Boğaz ağrısı için bunun yerine ballı limonlu ılık su dene.", "Bitki çayı karışımlarında ve pastillerde adaçayı olup olmadığına bak."],
    },
    sources: [S.m2bHerbal, S.nhsFoods],
  },
  {
    id: "linden-tea",
    category: "drink",
    emoji: "🍵",
    name: { en: "Linden tea (ıhlamur)", tr: "Ihlamur" },
    aliases: {
      en: ["linden", "lime blossom tea", "tilia", "ihlamur"],
      tr: ["ıhlamur", "ıhlamur çayı", "kış çayı", "ballı ıhlamur"],
    },
    verdict: "caution",
    summary: {
      en: "Probably fine in moderation, as one of your up to 4 cups of herbal tea a day, though it's little studied.",
      tr: "Ölçülü olarak büyük olasılıkla sorun değil; günde en fazla 4 fincan bitki çayının biri olarak iç, ama az araştırılmıştır.",
    },
    details: {
      en: "Ihlamur is a much-loved winter drink in Turkey, and there's no specific evidence that it's harmful in normal amounts. Like most herbal teas, though, it hasn't been well studied in pregnancy, so the NHS advice to keep herbal teas to about 4 cups a day applies. Strong, concentrated brews taken as a remedy are best avoided.",
      tr: "Ihlamur Türkiye'de çok sevilen bir kış içeceğidir ve normal miktarlarda zararlı olduğuna dair özel bir kanıt yoktur. Yine de çoğu bitki çayı gibi hamilelikte yeterince incelenmemiştir; bu yüzden NHS'in bitki çaylarını günde yaklaşık 4 fincanla sınırlama önerisi geçerlidir. İlaç gibi içilen çok koyu demlemelerden kaçınmak en iyisi.",
    },
    tips: {
      en: ["Keep it light and stick to a cup or two, not a whole pot."],
      tr: ["Açık demle ve bir demlik yerine bir iki fincanla sınırla."],
    },
    sources: [S.nhsFoods, S.m2bHerbal],
  },
  {
    id: "fennel-tea",
    category: "drink",
    emoji: "🌿",
    name: { en: "Fennel tea (rezene)", tr: "Rezene çayı" },
    aliases: {
      en: ["fennel", "fennel seed tea", "rezene", "anise tea", "gripe water"],
      tr: ["rezene", "rezene çayı", "anason çayı", "gaz çayı"],
    },
    verdict: "caution",
    summary: {
      en: "Occasional cups are unlikely to matter, but skip daily or strong fennel tea and fennel supplements.",
      tr: "Ara sıra içilen bir fincan büyük olasılıkla sorun olmaz; ama her gün ya da koyu rezene çayından ve takviyelerinden kaçın.",
    },
    details: {
      en: "Fennel and aniseed contain natural plant compounds whose safety in pregnancy hasn't been established in medicinal amounts. As with other herbal teas, the NHS suggests limiting herbal tea to about 4 cups a day. Fennel used as a spice in cooking is fine.",
      tr: "Rezene ve anason, tıbbi miktarlarda hamilelikte güvenliği kanıtlanmamış doğal bitki bileşenleri içerir. Diğer bitki çaylarında olduğu gibi NHS bitki çayını günde yaklaşık 4 fincanla sınırlamayı önerir. Yemeklerde baharat olarak kullanılan rezene sorun değil.",
    },
    tips: {
      en: ["For bloating, try gentle walks and smaller meals first."],
      tr: ["Şişkinlik için önce hafif yürüyüşleri ve küçük öğünleri dene."],
    },
    sources: [S.nhsFoods, S.m2bHerbal],
  },
  {
    id: "energy-drinks",
    category: "drink",
    emoji: "⚡",
    name: { en: "Energy drinks", tr: "Enerji içecekleri" },
    aliases: {
      en: ["red bull", "monster", "energy drink", "guarana", "taurine", "pre-workout"],
      tr: ["enerji içeceği", "red bull", "monster", "guarana", "taurin", "pre-workout"],
    },
    verdict: "avoid",
    summary: {
      en: "Best avoided, since they pack a lot of caffeine, often with other stimulants and plenty of sugar.",
      tr: "Kaçınmak en iyisi, çünkü yüksek kafein, çoğu zaman başka uyarıcılar ve bolca şeker içerirler.",
    },
    details: {
      en: "The NHS estimates about 80 mg of caffeine in a 250 ml can, and larger cans contain more, all counting toward the 200 mg daily limit. Many also contain guarana, which adds extra caffeine, plus other ingredients whose safety in pregnancy hasn't been studied. If you do have one, count it in your caffeine total.",
      tr: "NHS 250 ml'lik bir kutuda yaklaşık 80 mg kafein olduğunu tahmin eder; büyük kutularda daha fazlası bulunur ve hepsi günlük 200 mg sınırına sayılır. Pek çoğu ayrıca ek kafein sağlayan guarana ve hamilelikte güvenliği araştırılmamış başka bileşenler içerir. Yine de içersen kafein toplamına mutlaka ekle.",
    },
    tips: {
      en: ["For an energy dip, try a snack, water and a short walk instead."],
      tr: ["Enerjin düştüğünde bunun yerine bir ara öğün, su ve kısa bir yürüyüş dene."],
    },
    sources: [S.nhsFoods, S.fdaCaffeine],
  },
  {
    id: "cola",
    category: "drink",
    emoji: "🥤",
    name: { en: "Cola", tr: "Kola" },
    aliases: {
      en: ["coke", "diet coke", "pepsi", "coca-cola", "fizzy drinks", "soda"],
      tr: ["kola", "diyet kola", "gazlı içecek", "asitli içecek", "şekerli içecek"],
    },
    verdict: "caution",
    summary: {
      en: "Yes occasionally: a can has about 40 mg of caffeine, so count it toward your 200 mg limit.",
      tr: "Ara sıra evet: bir kutuda yaklaşık 40 mg kafein vardır, bunu 200 mg sınırına say.",
    },
    details: {
      en: "The NHS estimates around 40 mg of caffeine in a can of cola, and diet versions contain caffeine too. Regular cola is also high in sugar, which matters if you're watching weight gain or have gestational diabetes. Fizzy drinks can make heartburn worse for some people.",
      tr: "NHS bir kutu kolada yaklaşık 40 mg kafein olduğunu tahmin eder; diyet kolalar da kafein içerir. Normal kola ayrıca şeker açısından zengindir; kilo alımını izliyorsan ya da gebelik şekerin varsa bu önemlidir. Gazlı içecekler bazı kişilerde mide yanmasını artırabilir.",
    },
    tips: {
      en: ["Try sparkling water with fruit for the fizz without the caffeine."],
      tr: ["Kafeinsiz bir ferahlık için meyveli soda dene."],
    },
    sources: [S.nhsFoods, S.nhsHeartburn],
  },
  {
    id: "alcohol",
    category: "drink",
    emoji: "🍷",
    name: { en: "Alcohol", tr: "Alkol" },
    aliases: {
      en: ["wine", "beer", "spirits", "cocktails", "champagne", "prosecco", "raki", "glass of wine"],
      tr: ["şarap", "bira", "rakı", "kokteyl", "şampanya", "viski", "votka"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid it: there's no known safe amount of alcohol at any stage of pregnancy.",
      tr: "Kaçın: hamileliğin hiçbir döneminde bilinen güvenli bir alkol miktarı yoktur.",
    },
    details: {
      en: "Alcohol passes through the placenta to the baby, whose liver can't process it well. Drinking in pregnancy can cause long-term harm, including fetal alcohol spectrum disorders, and the CDC says there's no known safe amount or safe time to drink. If you drank before you knew you were pregnant, the risk of harm is likely to be low, so talk to your midwife or doctor if you're worried.",
      tr: "Alkol plasentadan bebeğe geçer ve bebeğin karaciğeri onu iyi işleyemez. Hamilelikte alkol, fetal alkol spektrum bozuklukları dahil uzun süreli zararlara yol açabilir; CDC güvenli bir miktar ya da güvenli bir zaman olmadığını söyler. Hamile olduğunu bilmeden önce içtiysen zarar riski muhtemelen düşüktür; endişeleniyorsan eben ya da doktorunla konuş.",
    },
    tips: {
      en: ["Alcohol-free (0.0%) drinks and mocktails are good swaps.", "If you find it hard to stop, ask your midwife or doctor for support."],
      tr: ["Alkolsüz (%0,0) içecekler ve mocktail'ler iyi alternatifler.", "Bırakmakta zorlanıyorsan eben ya da doktorundan destek iste."],
    },
    sources: [S.nhsAlcohol, S.cdcAlcohol],
  },
  {
    id: "non-alcoholic-beer",
    category: "drink",
    emoji: "🍺",
    name: { en: "Non-alcoholic beer", tr: "Alkolsüz bira" },
    aliases: {
      en: ["alcohol-free beer", "0.0 beer", "low alcohol beer", "near beer", "alcohol-free wine"],
      tr: ["alkolsüz bira", "%0 bira", "alkolsüz şarap", "düşük alkollü bira", "malt içeceği"],
    },
    verdict: "caution",
    summary: {
      en: "Choose drinks labelled 0.0%, since 'non-alcoholic' ones can still contain up to 0.5% alcohol.",
      tr: "%0,0 etiketli içecekleri seç; 'alkolsüz' yazanlar bile %0,5'e kadar alkol içerebilir.",
    },
    details: {
      en: "Health bodies advise avoiding alcohol completely in pregnancy because no safe amount is known. Drinks labelled 'non-alcoholic' or 'alcohol-free' can contain small amounts of alcohol depending on the country, while 0.0% versions contain virtually none. An occasional low-alcohol drink is very unlikely to cause harm, but 0.0% takes the guesswork out.",
      tr: "Sağlık kuruluşları, güvenli bir miktar bilinmediği için hamilelikte alkolden tamamen kaçınılmasını önerir. 'Alkolsüz' etiketli içecekler ülkeye göre değişen küçük miktarlarda alkol içerebilir; %0,0 olanlar ise neredeyse hiç içermez. Ara sıra içilen düşük alkollü bir içeceğin zarar vermesi çok olası değildir, ama %0,0 kafa karışıklığını ortadan kaldırır.",
    },
    tips: {
      en: ["Read the label for '0.0%' rather than 'alcohol-free' or 'low alcohol'."],
      tr: ["Etikette 'alkolsüz' ya da 'düşük alkollü' yerine '%0,0' ibaresini ara."],
    },
    sources: [S.nhsAlcohol, S.cdcAlcohol],
  },
  {
    id: "mineral-water",
    category: "drink",
    emoji: "💧",
    name: { en: "Mineral & sparkling water", tr: "Maden suyu ve soda" },
    aliases: {
      en: ["sparkling water", "mineral water", "soda water", "seltzer", "fizzy water"],
      tr: ["maden suyu", "soda", "sade soda", "meyveli soda", "gazlı su"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, mineral and sparkling water are fine, though some brands are high in sodium, so vary them with plain water.",
      tr: "Evet, maden suyu ve soda sorun değil; bazı markalar sodyum açısından yüksek olduğu için sade suyla dönüşümlü iç.",
    },
    details: {
      en: "Staying hydrated matters more in pregnancy, and water, including sparkling and mineral water, is a great choice. Some natural mineral waters contain a fair amount of sodium, which is worth noting if you have high blood pressure or swelling. Fizzy drinks can worsen bloating or heartburn for some people.",
      tr: "Hamilelikte yeterli sıvı almak daha da önemlidir; soda ve maden suyu dahil su harika bir seçimdir. Bazı doğal maden suları azımsanmayacak miktarda sodyum içerir; yüksek tansiyonun ya da ödemin varsa bunu göz önünde bulundur. Gazlı içecekler bazı kişilerde şişkinlik ya da mide yanmasını artırabilir.",
    },
    tips: {
      en: ["Check the sodium content on the label and alternate brands."],
      tr: ["Etiketteki sodyum miktarına bak ve markaları değiştirerek iç."],
    },
    sources: [S.nhsDrinks],
  },
  {
    id: "salep",
    category: "drink",
    emoji: "🥛",
    name: { en: "Salep", tr: "Salep" },
    aliases: {
      en: ["sahlep", "sahlab", "hot milk drink", "orchid drink"],
      tr: ["salep", "tarçınlı salep", "hazır salep", "sıcak süt"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, salep is a hot milk drink and is fine in pregnancy; just mind the sugar.",
      tr: "Evet, salep sıcak bir süt içeceğidir ve hamilelikte sorun değil; sadece şekerine dikkat et.",
    },
    details: {
      en: "Salep is made by heating milk with salep powder and sugar, so the milk is well heated and there's no raw-milk concern. It's caffeine-free and adds some calcium. Instant mixes and café versions are often very sweet, which matters if you have gestational diabetes.",
      tr: "Salep, sütün toz salep ve şekerle birlikte ısıtılmasıyla yapılır; süt iyice ısındığı için çiğ süt endişesi yoktur. Kafeinsizdir ve biraz kalsiyum katar. Hazır karışımlar ve kafelerde satılanlar çoğu zaman çok şekerlidir; gebelik şekerin varsa bu önemlidir.",
    },
    tips: {
      en: ["Make it at home with less sugar and a sprinkle of cinnamon."],
      tr: ["Evde daha az şekerle yap ve üzerine biraz tarçın serp."],
    },
    sources: [S.nhsFoods, S.nhsDrinks],
  },
  {
    id: "boza",
    category: "drink",
    emoji: "🥣",
    name: { en: "Boza", tr: "Boza" },
    aliases: {
      en: ["boza", "fermented millet drink", "bosa", "millet drink"],
      tr: ["boza", "leblebili boza", "tarçınlı boza", "darı bozası"],
    },
    verdict: "caution",
    summary: {
      en: "An occasional small glass from a trusted maker is unlikely to matter, but boza can contain a little alcohol.",
      tr: "Güvendiğin bir üreticiden ara sıra küçük bir bardak büyük olasılıkla sorun olmaz; ama boza biraz alkol içerebilir.",
    },
    details: {
      en: "Boza is a fermented grain drink, and the fermentation can produce small amounts of alcohol that vary from batch to batch. Since no safe level of alcohol in pregnancy is known, it's best kept occasional. Boza is also high in sugar and calories.",
      tr: "Boza fermente bir tahıl içeceğidir; fermantasyon, partiden partiye değişen küçük miktarlarda alkol oluşturabilir. Hamilelikte güvenli bir alkol düzeyi bilinmediği için ara sıraya bırakmak en iyisi. Boza ayrıca şeker ve kalori açısından yüksektir.",
    },
    tips: {
      en: ["Choose fresh boza from a known maker and keep it to a small glass."],
      tr: ["Bilinen bir üreticiden taze boza seç ve küçük bir bardakla sınırla."],
    },
    sources: [S.nhsAlcohol, S.cdcAlcohol],
  },
  {
    id: "fresh-juice",
    category: "drink",
    emoji: "🍊",
    name: { en: "Fresh, unpasteurised juice", tr: "Taze sıkılmış (pastörize olmayan) meyve suyu" },
    aliases: {
      en: ["fresh orange juice", "cold-pressed juice", "smoothie", "juice bar", "street juice", "unpasteurized juice"],
      tr: ["taze sıkma portakal suyu", "sıkma meyve suyu", "soğuk sıkım", "smoothie", "seyyar meyve suyu"],
    },
    verdict: "caution",
    summary: {
      en: "Fine if you make it at home from washed fruit and drink it straight away; take care with unpasteurised juice from stalls.",
      tr: "Evde yıkanmış meyveden yapıp hemen içersen sorun değil; tezgahlarda satılan pastörize olmayan meyve suyuna dikkat et.",
    },
    details: {
      en: "Juice that hasn't been pasteurised or otherwise treated can carry bacteria such as E. coli and salmonella from the fruit's surface. The FDA advises pregnant women to choose pasteurised or treated juices. Juice you squeeze yourself from well-washed fruit and drink right away is a lower risk.",
      tr: "Pastörize edilmemiş ya da başka bir işlemden geçmemiş meyve suyu, meyvenin yüzeyinden gelen E. coli ve salmonella gibi bakteriler taşıyabilir. FDA hamilelere pastörize edilmiş ya da işlem görmüş meyve sularını seçmelerini önerir. İyice yıkanmış meyveden kendi sıktığın ve hemen içtiğin meyve suyu daha düşük risklidir.",
    },
    tips: {
      en: ["Wash fruit well before squeezing, even oranges.", "Shop-bought juices are usually pasteurised; check the label."],
      tr: ["Sıkmadan önce meyveyi, portakal bile olsa, iyice yıka.", "Hazır meyve suları genellikle pastörizedir, etikete bak."],
    },
    sources: [S.fdaJuice],
  },
  {
    id: "coconut-water",
    category: "drink",
    emoji: "🥥",
    name: { en: "Coconut water", tr: "Hindistan cevizi suyu" },
    aliases: {
      en: ["coconut water", "fresh coconut", "coconut drink"],
      tr: ["hindistan cevizi suyu", "taze hindistan cevizi", "kokos suyu"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, packaged coconut water is fine, and it's a refreshing way to stay hydrated.",
      tr: "Evet, paketli hindistan cevizi suyu sorun değil ve sıvı almanın ferahlatıcı bir yolu.",
    },
    details: {
      en: "Coconut water is naturally low in calories and contains some potassium. Packaged versions are usually pasteurised; freshly opened coconuts are fine too if they're cut cleanly and drunk straight away. Plain water is still the best everyday drink, and flavoured versions can contain added sugar.",
      tr: "Hindistan cevizi suyu doğal olarak düşük kalorilidir ve bir miktar potasyum içerir. Paketli olanlar genellikle pastörizedir; temiz şekilde açılıp hemen içilen taze hindistan cevizi de sorun değil. Yine de en iyi günlük içecek sade sudur; aromalı versiyonlar ilave şeker içerebilir.",
    },
    tips: {
      en: ["Choose unsweetened versions and keep opened packs in the fridge."],
      tr: ["Şekersiz olanları seç ve açılmış paketi buzdolabında sakla."],
    },
    sources: [S.nhsDrinks, S.fdaJuice],
  },

  // ── Medicine ───────────────────────────────────────────────────────────────
  // No doses here on purpose: dosing is for the prescriber or pharmacist.

  {
    id: "paracetamol",
    category: "medicine",
    emoji: "💊",
    name: { en: "Paracetamol (acetaminophen)", tr: "Parasetamol" },
    aliases: {
      en: ["acetaminophen", "tylenol", "panadol", "calpol", "painkiller", "fever reducer", "apap"],
      tr: ["parasetamol", "parol", "minoset", "tylol", "calpol", "panadol", "ağrı kesici", "ateş düşürücü"],
    },
    verdict: "caution",
    summary: {
      en: "It's the usual first choice for pain or fever in pregnancy: use the lowest effective dose for the shortest time.",
      tr: "Hamilelikte ağrı ya da ateş için genellikle ilk tercihtir: en düşük etkili dozu en kısa süre kullan.",
    },
    details: {
      en: "Paracetamol is the best-studied painkiller in pregnancy, and the NHS and ACOG consider it the first choice for pain or fever when treatment is needed. Public guidance in some countries was reviewed in 2025, and major medical bodies, including ACOG and the UK's medicines regulator, continue to consider it appropriate when needed. A high temperature in pregnancy should be treated, so ask your doctor if you need paracetamol for more than a few days.",
      tr: "Parasetamol hamilelikte en çok araştırılmış ağrı kesicidir; NHS ve ACOG tedavi gerektiğinde ağrı ya da ateş için onu ilk tercih olarak görür. Bazı ülkelerde kamuya yönelik öneriler 2025'te yeniden değerlendirildi; ACOG ve İngiltere'nin ilaç düzenleyicisi dahil büyük tıp kuruluşları gerektiğinde kullanımını uygun görmeye devam ediyor. Hamilelikte yüksek ateş tedavi edilmeli; birkaç günden uzun süre parasetamole ihtiyaç duyarsan doktoruna danış.",
    },
    tips: {
      en: ["Use the lowest effective dose for the shortest possible time.", "Check combination cold remedies so you don't take paracetamol twice.", ASK.en],
      tr: ["En düşük etkili dozu mümkün olan en kısa süre kullan.", "Parasetamolü iki kez almamak için kombine soğuk algınlığı ilaçlarının içeriğine bak.", ASK.tr],
    },
    sources: [S.nhsMedicines, S.acogAcetaminophen],
  },
  {
    id: "ibuprofen",
    category: "medicine",
    emoji: "💊",
    name: { en: "Ibuprofen", tr: "İbuprofen" },
    aliases: {
      en: ["advil", "nurofen", "motrin", "brufen", "nsaid", "anti-inflammatory"],
      tr: ["ibuprofen", "nurofen", "advil", "brufen", "dolven", "pedifen", "iltihap giderici"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid it unless a doctor advises it, especially from 20 weeks, when it can affect the baby and the fluid around them.",
      tr: "Doktor önermedikçe kaçın; özellikle 20. haftadan itibaren bebeği ve etrafındaki sıvıyı etkileyebilir.",
    },
    details: {
      en: "Ibuprofen is an NSAID. The FDA warns that from around 20 weeks NSAIDs can cause rare but serious kidney problems in the baby, leading to low amniotic fluid, and later in pregnancy they can affect the baby's heart and blood vessels. UK advice is to avoid ibuprofen in pregnancy unless a doctor recommends it, though taking some before 20 weeks is unlikely to have caused harm.",
      tr: "İbuprofen bir NSAİİ'dir (steroid olmayan iltihap giderici). FDA, yaklaşık 20. haftadan itibaren NSAİİ'lerin bebekte nadir ama ciddi böbrek sorunlarına ve buna bağlı amniyon sıvısı azlığına yol açabileceği, daha ileri haftalarda ise bebeğin kalbini ve damarlarını etkileyebileceği konusunda uyarır. İngiltere'deki öneri, doktor önermedikçe hamilelikte ibuprofenden kaçınmaktır; yine de 20. haftadan önce aldıysan bunun zarar vermiş olması olası değildir.",
    },
    tips: {
      en: ["Paracetamol is usually the safer choice for pain or fever.", "Check cold and flu remedies, which may contain ibuprofen.", ASK.en],
      tr: ["Ağrı ya da ateş için genellikle daha güvenli seçenek parasetamoldür.", "İbuprofen içerebilen grip ve soğuk algınlığı ilaçlarının içeriğine bak.", ASK.tr],
    },
    sources: [S.bumpsIbuprofen, S.fdaNSAIDs],
  },
  {
    id: "naproxen",
    category: "medicine",
    emoji: "💊",
    name: { en: "Naproxen", tr: "Naproksen" },
    aliases: {
      en: ["aleve", "naprosyn", "naproxen sodium", "period pain tablets", "nsaid"],
      tr: ["naproksen", "apranax", "naprosyn", "naproksen sodyum", "adet sancısı ilacı"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid it unless your doctor specifically recommends it, because it's an NSAID like ibuprofen.",
      tr: "Doktorun özellikle önermediği sürece kaçın, çünkü ibuprofen gibi bir NSAİİ'dir.",
    },
    details: {
      en: "Naproxen belongs to the same family as ibuprofen and carries the same concerns: the FDA advises avoiding NSAIDs from 20 weeks because they can reduce amniotic fluid, and they can affect the baby's circulation later in pregnancy. The NHS advises avoiding naproxen in pregnancy unless a doctor or pharmacist advises it. It's often sold for period pain, so check before reaching for old supplies.",
      tr: "Naproksen ibuprofenle aynı ilaç ailesindendir ve aynı endişeleri taşır: FDA, amniyon sıvısını azaltabildikleri için NSAİİ'lerden 20. haftadan itibaren kaçınılmasını önerir; ilerleyen haftalarda bebeğin dolaşımını da etkileyebilirler. NHS, doktor ya da eczacı önermedikçe hamilelikte naproksenden kaçınılmasını önerir. Sıklıkla adet sancısı için satılır; evde kalan eski kutulara uzanmadan önce kontrol et.",
    },
    tips: {
      en: ["Paracetamol is usually the first choice for pain in pregnancy.", ASK.en],
      tr: ["Hamilelikte ağrı için ilk tercih genellikle parasetamoldür.", ASK.tr],
    },
    sources: [S.nhsNaproxen, S.fdaNSAIDs],
  },
  {
    id: "nsaids-other",
    category: "medicine",
    emoji: "💊",
    name: { en: "Diclofenac & other NSAIDs", tr: "Diklofenak ve diğer NSAİİ'ler" },
    aliases: {
      en: ["diclofenac", "voltaren", "cataflam", "flurbiprofen", "dexketoprofen", "ketoprofen", "meloxicam", "etodolac", "celecoxib", "anti-inflammatory gel"],
      tr: ["diklofenak", "voltaren", "dikloron", "cataflam", "majezik", "flurbiprofen", "arveles", "deksketoprofen", "ketoprofen", "fastum jel", "romatizma kremi"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid them unless a doctor prescribes them, and check painkiller labels for diclofenac, flurbiprofen or ketoprofen.",
      tr: "Doktorun reçete etmediği sürece kaçın; Majezik, Arveles ve Dikloron gibi yaygın ilaçlar da bu gruptadır.",
    },
    details: {
      en: "Diclofenac, flurbiprofen, dexketoprofen, ketoprofen and meloxicam are all NSAIDs, so the FDA's advice to avoid NSAIDs from 20 weeks applies to them too. The NHS says diclofenac is not usually recommended in pregnancy because it can affect the baby's circulation and reduce the fluid around the baby. Gels are absorbed less, but it's still best to ask before using them, especially later in pregnancy or over large areas.",
      tr: "Diklofenak, flurbiprofen, deksketoprofen, ketoprofen ve meloksikam birer NSAİİ'dir; bu yüzden FDA'nın NSAİİ'lerden 20. haftadan itibaren kaçınma önerisi bunlar için de geçerlidir. NHS, bebeğin dolaşımını etkileyip etrafındaki sıvıyı azaltabileceği için diklofenağın hamilelikte genellikle önerilmediğini belirtir. Jeller daha az emilir; ama özellikle ilerleyen haftalarda ya da geniş alanlarda kullanmadan önce yine de danışmak en iyisi.",
    },
    tips: {
      en: ["Check the active ingredient on painkillers, gels and period-pain tablets.", ASK.en],
      tr: ["Ağrı kesici, jel ve adet sancısı ilaçlarının etken maddesine bak.", ASK.tr],
    },
    sources: [S.nhsDiclofenac, S.fdaNSAIDs],
  },
  {
    id: "aspirin",
    category: "medicine",
    emoji: "💊",
    name: { en: "Aspirin for pain", tr: "Ağrı için aspirin" },
    aliases: {
      en: ["aspirin", "disprin", "high-dose aspirin", "acetylsalicylic acid", "excedrin"],
      tr: ["aspirin", "asetilsalisilik asit", "ağrı kesici aspirin", "yüksek doz aspirin"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid aspirin at pain-relief doses unless your doctor advises it; low-dose aspirin prescribed in pregnancy is different.",
      tr: "Ağrı kesici dozlarındaki aspirinden doktorun önermediği sürece kaçın; hamilelikte reçete edilen düşük doz aspirin ise farklıdır.",
    },
    details: {
      en: "At the doses used for pain or fever, aspirin acts as an NSAID, and the FDA advises avoiding NSAIDs from 20 weeks of pregnancy. Mayo Clinic notes that higher doses may raise the risk of pregnancy loss early on and, used for long periods, bleeding risks for premature babies. Low-dose aspirin, which doctors sometimes prescribe to lower the risk of pre-eclampsia, is a separate case.",
      tr: "Ağrı ya da ateş için kullanılan dozlarda aspirin bir NSAİİ gibi etki eder ve FDA hamileliğin 20. haftasından itibaren NSAİİ'lerden kaçınılmasını önerir. Mayo Clinic, yüksek dozların erken dönemde gebelik kaybı riskini artırabileceğini, uzun süre kullanıldığında ise erken doğan bebeklerde kanama riskini yükseltebileceğini belirtir. Doktorların bazen preeklampsi riskini azaltmak için reçete ettiği düşük doz aspirin ise ayrı bir durumdur.",
    },
    tips: {
      en: ["For pain or fever, paracetamol is usually the first choice.", ASK.en],
      tr: ["Ağrı ya da ateş için ilk tercih genellikle parasetamoldür.", ASK.tr],
    },
    sources: [S.bumpsAspirinPain, S.mayoAspirin],
  },
  {
    id: "low-dose-aspirin",
    category: "medicine",
    emoji: "💊",
    name: { en: "Low-dose aspirin", tr: "Düşük doz aspirin" },
    aliases: {
      en: ["baby aspirin", "low dose aspirin", "aspirin for pre-eclampsia", "aspirin for preeclampsia"],
      tr: ["bebek aspirini", "coraspin", "ecopirin", "preeklampsi aspirini", "kan sulandırıcı aspirin"],
    },
    verdict: "caution",
    summary: {
      en: "Only if your doctor or midwife recommends it, and if they have, keep taking it exactly as advised.",
      tr: "Yalnızca doktorun ya da eben önerdiyse; önerdilerse tam da söyledikleri gibi kullanmaya devam et.",
    },
    details: {
      en: "Low-dose aspirin is commonly prescribed in pregnancy to women at higher risk of pre-eclampsia, and sometimes for other conditions. Mayo Clinic notes that low-dose aspirin is considered safe in pregnancy when it's recommended. It's different from aspirin taken for pain, so don't start it on your own, and don't stop it without talking to your care team.",
      tr: "Düşük doz aspirin, hamilelikte preeklampsi riski yüksek olan kadınlara ve bazen başka durumlarda sıklıkla reçete edilir. Mayo Clinic, önerildiğinde düşük doz aspirinin hamilelikte güvenli kabul edildiğini belirtir. Ağrı için alınan aspirinden farklıdır; kendi kendine başlama ve sağlık ekibinle konuşmadan bırakma.",
    },
    tips: {
      en: [KEEP.en, ASK.en],
      tr: [KEEP.tr, ASK.tr],
    },
    sources: [S.nhsAspirin, S.mayoAspirin],
  },
  {
    id: "antihistamines",
    category: "medicine",
    emoji: "🤧",
    name: { en: "Antihistamines", tr: "Antihistaminikler (alerji ilaçları)" },
    aliases: {
      en: ["loratadine", "claritin", "cetirizine", "zyrtec", "chlorphenamine", "piriton", "hay fever tablets", "allergy pills"],
      tr: ["loratadin", "claritine", "setirizin", "zyrtec", "aerius", "xyzal", "avil", "alerji ilacı", "saman nezlesi ilacı"],
    },
    verdict: "caution",
    summary: {
      en: "Some, like loratadine and cetirizine, are commonly used in pregnancy, but check with a pharmacist first.",
      tr: "Loratadin ve setirizin gibi bazıları hamilelikte yaygın olarak kullanılır; yine de önce eczacına danış.",
    },
    details: {
      en: "The NHS says loratadine is usually recommended if you need an antihistamine in pregnancy, and cetirizine can also be taken. Older, drowsy antihistamines such as chlorphenamine are sometimes used too, but they can make you sleepy. Non-drug options like saline nasal spray and avoiding triggers are worth trying first.",
      tr: "NHS, hamilelikte antihistaminik gerekirse genellikle loratadinin önerildiğini, setirizinin de kullanılabildiğini belirtir. Klorfeniramin gibi uyku yapan eski antihistaminikler de bazen kullanılır ama uykunu getirebilir. Önce tuzlu su burun spreyi ve tetikleyicilerden uzak durmak gibi ilaçsız yolları denemeye değer.",
    },
    tips: {
      en: ["Try saline nasal spray and avoiding your triggers first.", ASK.en],
      tr: ["Önce tuzlu su burun spreyini ve tetikleyicilerden uzak durmayı dene.", ASK.tr],
    },
    sources: [S.nhsAntihistamines, S.mayoAllergyMeds],
  },
  {
    id: "decongestants",
    category: "medicine",
    emoji: "👃",
    name: { en: "Decongestants (tablets & sprays)", tr: "Burun açıcılar (tablet ve sprey)" },
    aliases: {
      en: ["pseudoephedrine", "sudafed", "phenylephrine", "xylometazoline", "oxymetazoline", "otrivine", "afrin", "nasal spray", "blocked nose"],
      tr: ["psödoefedrin", "sudafed", "fenilefrin", "ksilometazolin", "oksimetazolin", "otrivine", "iliadin", "burun spreyi", "burun tıkanıklığı"],
    },
    verdict: "avoid",
    summary: {
      en: "UK advice is to avoid decongestant tablets and sprays in pregnancy, so try saline sprays and steam instead.",
      tr: "İngiltere'nin önerisi hamilelikte burun açıcı tablet ve spreylerden kaçınmak; bunun yerine tuzlu su spreyi ve buhar dene.",
    },
    details: {
      en: "The NHS says pseudoephedrine isn't recommended in pregnancy because it can reduce blood flow to the baby, and the UK's BUMPS service advises avoiding decongestant tablets, sprays and drops. Some US sources allow short-term use of certain decongestants after the first trimester, but only on medical advice. Many cold remedies contain hidden decongestants, so check labels.",
      tr: "NHS, bebeğe giden kan akışını azaltabileceği için psödoefedrinin hamilelikte önerilmediğini söyler; İngiltere'deki BUMPS servisi de burun açıcı tablet, sprey ve damlalardan kaçınılmasını önerir. ABD'deki bazı kaynaklar belirli burun açıcıların ilk üç aydan sonra kısa süreli kullanımına izin verir, ama yalnızca hekim önerisiyle. Pek çok soğuk algınlığı ilacı gizli burun açıcı içerir, etiketleri kontrol et.",
    },
    tips: {
      en: ["Saline sprays, steam and raising your head at night can ease a blocked nose.", ASK.en],
      tr: ["Tuzlu su spreyi, buhar ve gece başını yükseltmek burun tıkanıklığını rahatlatabilir.", ASK.tr],
    },
    sources: [S.nhsPseudoephedrine, S.bumpsDecongestants],
  },
  {
    id: "cold-flu-remedies",
    category: "medicine",
    emoji: "🤒",
    name: { en: "Combination cold & flu remedies", tr: "Kombine grip ve soğuk algınlığı ilaçları" },
    aliases: {
      en: ["cold and flu tablets", "lemsip", "theraflu", "dayquil", "nyquil", "coldrex", "multi-symptom cold medicine"],
      tr: ["grip ilacı", "tylol hot", "theraflu", "gripin", "coldrex", "katarin", "soğuk algınlığı ilacı", "sıcak içilen grip ilacı"],
    },
    verdict: "avoid",
    summary: {
      en: "Best avoided, as multi-ingredient remedies often contain decongestants or extra caffeine, so treat symptoms one by one.",
      tr: "Kaçınmak en iyisi, çünkü çok bileşenli ilaçlar sıklıkla burun açıcı ya da ek kafein içerir; belirtileri tek tek tedavi et.",
    },
    details: {
      en: "Many cold and flu products combine paracetamol with decongestants, antihistamines, caffeine or cough medicines, and decongestants should be avoided in pregnancy. It's also easy to double up on paracetamol if you take a combination product alongside plain tablets. Rest, fluids and plain paracetamol if needed are usually enough for a cold, but call your doctor if you think you have flu.",
      tr: "Pek çok grip ve soğuk algınlığı ürünü parasetamolü burun açıcı, antihistaminik, kafein ya da öksürük ilaçlarıyla birleştirir; burun açıcılardan ise hamilelikte kaçınılmalıdır. Kombine bir ürünü sade tabletlerle birlikte alırsan farkında olmadan iki kat parasetamol almak da kolaydır. Soğuk algınlığında genellikle dinlenmek, bol sıvı ve gerekirse sade parasetamol yeterlidir; grip olduğunu düşünüyorsan doktorunu ara.",
    },
    tips: {
      en: ["Read the active ingredients on every box and sachet.", "Get flu symptoms checked early, as antiviral treatment may be offered.", ASK.en],
      tr: ["Her kutu ve şaşenin etken maddelerini oku.", "Grip belirtilerini erkenden kontrol ettir; antiviral tedavi önerilebilir.", ASK.tr],
    },
    sources: [S.bumpsColds, S.nhsMedicines],
  },
  {
    id: "cough-syrup",
    category: "medicine",
    emoji: "🥄",
    name: { en: "Cough syrups & lozenges", tr: "Öksürük şurupları ve pastiller" },
    aliases: {
      en: ["cough medicine", "cough syrup", "dextromethorphan", "guaifenesin", "simple linctus", "robitussin", "benylin", "throat lozenges", "strepsils"],
      tr: ["öksürük şurubu", "öksürük ilacı", "boğaz pastili", "dekstrometorfan", "guaifenesin", "sinecod", "prospan", "bronchostop", "strepsils"],
    },
    verdict: "caution",
    summary: {
      en: "Some simple remedies can be used, but avoid codeine-based and multi-ingredient syrups and ask a pharmacist first.",
      tr: "Bazı basit ürünler kullanılabilir; ama kodeinli ve çok bileşenli şuruplardan kaçın, önce eczacına danış.",
    },
    details: {
      en: "Coughs from colds usually clear up on their own within 3 to 4 weeks, and honey and lemon in warm water can soothe them. BUMPS says standard Strepsils lozenges can be used in pregnancy, while products with several active ingredients may contain decongestants, which are best avoided. Codeine-based cough medicines should only be used if a doctor recommends them.",
      tr: "Soğuk algınlığına bağlı öksürük genellikle 3–4 hafta içinde kendiliğinden geçer; ılık suda bal ve limon rahatlatabilir. BUMPS, standart Strepsils pastillerinin hamilelikte kullanılabileceğini belirtir; birden çok etken madde içeren ürünlerde ise kaçınılması gereken burun açıcılar bulunabilir. Kodeinli öksürük ilaçları yalnızca doktor önerirse kullanılmalıdır.",
    },
    tips: {
      en: ["Try warm drinks with honey and lemon first.", "See a doctor if a cough lasts more than 3 weeks or you're short of breath.", ASK.en],
      tr: ["Önce ballı limonlu sıcak içecekleri dene.", "Öksürük 3 haftadan uzun sürerse ya da nefesin daralırsa doktora görün.", ASK.tr],
    },
    sources: [S.bumpsColds, S.nhsCough],
  },
  {
    id: "antacids",
    category: "medicine",
    emoji: "🔥",
    name: { en: "Antacids (Gaviscon, Rennie)", tr: "Mide ilaçları (Gaviscon, Rennie)" },
    aliases: {
      en: ["gaviscon", "rennie", "tums", "antacid", "heartburn medicine", "indigestion tablets", "calcium carbonate"],
      tr: ["gaviscon", "rennie", "talcid", "antiasit", "mide yanması ilacı", "hazımsızlık ilacı", "kalsiyum karbonat"],
    },
    verdict: "caution",
    summary: {
      en: "Usually fine for heartburn in pregnancy, as long as you follow the pack and check with a pharmacist first.",
      tr: "Hamilelikte mide yanması için genellikle uygundur; prospektüse uy ve önce eczacına danış.",
    },
    details: {
      en: "The NHS says you can take Gaviscon while you're pregnant, and most antacids are considered safe in pregnancy, though it's best to get advice first. Antacids can affect how well other medicines work, including iron tablets, so the NHS advises leaving 2 to 4 hours between them. If heartburn isn't controlled, your doctor may suggest another medicine.",
      tr: "NHS hamileyken Gaviscon kullanılabileceğini, çoğu antiasidin de hamilelikte güvenli kabul edildiğini söyler; yine de önce danışmak en iyisi. Antiasitler demir tabletleri dahil başka ilaçların etkisini azaltabilir; bu yüzden NHS aralarında 2–4 saat bırakılmasını önerir. Mide yanması geçmezse doktorun başka bir ilaç önerebilir.",
    },
    tips: {
      en: ["Smaller meals and not eating late in the evening can ease heartburn too.", ASK.en],
      tr: ["Küçük öğünler ve akşam geç saatte yemek yememek de mide yanmasını hafifletir.", ASK.tr],
    },
    sources: [S.nhsGaviscon, S.nhsAntacids],
  },
  {
    id: "omeprazole",
    category: "medicine",
    emoji: "💊",
    name: { en: "Omeprazole & other PPIs", tr: "Omeprazol ve diğer mide koruyucular (PPI)" },
    aliases: {
      en: ["omeprazole", "prilosec", "losec", "esomeprazole", "nexium", "lansoprazole", "pantoprazole", "ppi", "acid reflux medicine"],
      tr: ["omeprazol", "losec", "nexium", "lansoprazol", "lansor", "pantoprazol", "pantpas", "mide koruyucu", "reflü ilacı"],
    },
    verdict: "caution",
    summary: {
      en: "It can usually be used in pregnancy if heartburn needs more than antacids, but check with your doctor first.",
      tr: "Mide yanması antiasitlerle geçmiyorsa hamilelikte genellikle kullanılabilir; ama önce doktoruna danış.",
    },
    details: {
      en: "The NHS says you can usually take omeprazole in pregnancy, but to check with a pharmacist or doctor first. BUMPS notes that omeprazole is the preferred proton pump inhibitor in pregnancy because there's the most safety information about it, and others can be used if a doctor advises. Lifestyle changes and antacids are usually tried first.",
      tr: "NHS hamilelikte omeprazolün genellikle kullanılabileceğini, ancak önce eczacıya ya da doktora danışılması gerektiğini söyler. BUMPS, güvenliği hakkında en fazla bilgi olduğu için hamilelikte tercih edilen proton pompası inhibitörünün omeprazol olduğunu, diğerlerinin de doktor önerirse kullanılabileceğini belirtir. Genellikle önce yaşam tarzı değişiklikleri ve antiasitler denenir.",
    },
    tips: {
      en: ["Raising the head of your bed and eating earlier in the evening can help.", ASK.en],
      tr: ["Yatağının baş tarafını yükseltmek ve akşam yemeğini erken yemek yardımcı olabilir.", ASK.tr],
    },
    sources: [S.nhsOmeprazole, S.bumpsPPIs],
  },
  {
    id: "laxatives",
    category: "medicine",
    emoji: "💊",
    name: { en: "Laxatives", tr: "Müshiller (laksatifler)" },
    aliases: {
      en: ["lactulose", "duphalac", "fybogel", "ispaghula", "psyllium", "metamucil", "senna", "movicol", "macrogol", "stool softener", "constipation medicine"],
      tr: ["laksatif", "müshil", "laktüloz", "duphalac", "movicol", "makrogol", "senna", "lif takviyesi", "kabızlık ilacı", "dışkı yumuşatıcı"],
    },
    verdict: "caution",
    summary: {
      en: "Fibre, fluids and activity come first, and some laxatives can then be used, so ask which one suits you.",
      tr: "Önce lif, sıvı ve hareket; ardından bazı laksatifler kullanılabilir, hangisinin sana uygun olduğunu sor.",
    },
    details: {
      en: "Constipation is very common in pregnancy, and the NHS says lactulose can be taken if needed, after checking with a pharmacist or doctor. Mayo Clinic notes that bulk-forming fibre laxatives and stool softeners are generally considered safe because very little is absorbed. Iron tablets can make constipation worse, so mention them if you're taking them.",
      tr: "Kabızlık hamilelikte çok yaygındır; NHS gerekirse eczacıya ya da doktora danıştıktan sonra laktülozun kullanılabileceğini söyler. Mayo Clinic, lif bazlı laksatiflerin ve dışkı yumuşatıcıların çok az emildikleri için genellikle güvenli kabul edildiğini belirtir. Demir tabletleri kabızlığı artırabilir; kullanıyorsan bunu da belirt.",
    },
    tips: {
      en: ["Drink plenty of water and get fibre from fruit, vegetables and wholegrains.", ASK.en],
      tr: ["Bol su iç; meyve, sebze ve tam tahıllarla lif al.", ASK.tr],
    },
    sources: [S.nhsLactulose, S.mayoConstipation],
  },
  {
    id: "loperamide",
    category: "medicine",
    emoji: "💊",
    name: { en: "Loperamide (Imodium)", tr: "Loperamid (ishal ilacı)" },
    aliases: {
      en: ["imodium", "diarrhoea tablets", "diarrhea medicine", "anti-diarrhoeal", "upset stomach"],
      tr: ["loperamid", "imodium", "ishal ilacı", "ishal kesici", "mide bozulması"],
    },
    verdict: "caution",
    summary: {
      en: "It's not a first choice in pregnancy, so focus on fluids and only take it if a doctor or pharmacist advises it.",
      tr: "Hamilelikte ilk tercih değildir; sıvı almaya odaklan ve yalnızca doktor ya da eczacı önerirse kullan.",
    },
    details: {
      en: "The NHS says loperamide isn't usually recommended in pregnancy because there isn't enough information to say it's safe. BUMPS notes it's occasionally used when there's no suitable alternative, and short bouts of diarrhoea are usually managed with rest and plenty of fluids. Diarrhoea with fever, blood or signs of dehydration needs medical advice.",
      tr: "NHS, güvenli olduğunu söylemek için yeterli bilgi bulunmadığından loperamidin hamilelikte genellikle önerilmediğini söyler. BUMPS, uygun bir alternatif olmadığında ara sıra kullanıldığını belirtir; kısa süren ishal genellikle dinlenme ve bol sıvıyla yönetilir. Ateş, kan ya da sıvı kaybı belirtileriyle birlikte olan ishal için hekime başvur.",
    },
    tips: {
      en: ["Sip water or oral rehydration drinks little and often.", ASK.en],
      tr: ["Suyu ya da ağızdan sıvı tuzu çözeltisini sık sık ve azar azar iç.", ASK.tr],
    },
    sources: [S.nhsLoperamide, S.bumpsLoperamide],
  },
  {
    id: "antibiotics",
    category: "medicine",
    emoji: "💊",
    name: { en: "Antibiotics", tr: "Antibiyotikler" },
    aliases: {
      en: ["amoxicillin", "augmentin", "penicillin", "cephalexin", "nitrofurantoin", "azithromycin", "doxycycline", "tetracycline", "uti antibiotics"],
      tr: ["antibiyotik", "amoksisilin", "augmentin", "amoklavin", "largopen", "penisilin", "sefalosporin", "nitrofurantoin", "doksisiklin"],
    },
    verdict: "caution",
    summary: {
      en: "Many antibiotics are safe and important in pregnancy, but some aren't, so only take ones prescribed for you now.",
      tr: "Pek çok antibiyotik hamilelikte güvenli ve önemlidir, ama bazıları değildir; yalnızca şu an sana reçete edilenleri kullan.",
    },
    details: {
      en: "Penicillins such as amoxicillin and cephalosporins are commonly used in pregnancy, while tetracyclines like doxycycline are generally avoided because they can affect the baby's bones and teeth. Treating infections such as urinary tract infections promptly matters for you and your baby. Always tell the prescriber you're pregnant, and don't take leftover antibiotics.",
      tr: "Amoksisilin gibi penisilinler ve sefalosporinler hamilelikte sıklıkla kullanılırken doksisiklin gibi tetrasiklinlerden, bebeğin kemik ve dişlerini etkileyebildikleri için genellikle kaçınılır. İdrar yolu enfeksiyonu gibi enfeksiyonları zamanında tedavi etmek hem senin hem bebeğin için önemlidir. Reçete eden hekime her zaman hamile olduğunu söyle ve evde kalan antibiyotikleri kullanma.",
    },
    tips: {
      en: ["Take it exactly as prescribed, and tell every prescriber that you're pregnant.", ASK.en],
      tr: ["Tam reçete edildiği gibi kullan ve reçete eden her hekime hamile olduğunu söyle.", ASK.tr],
    },
    sources: [S.nhsAntibiotics, S.mayoAntibiotics],
  },
  {
    id: "isotretinoin",
    category: "medicine",
    emoji: "🚫",
    name: { en: "Isotretinoin (Roaccutane)", tr: "İzotretinoin (Roaccutane)" },
    aliases: {
      en: ["accutane", "roaccutane", "absorica", "acne tablets", "vitamin a acne pills"],
      tr: ["izotretinoin", "roaccutane", "zoretanin", "akne ilacı", "sivilce hapı", "a vitamini hapı"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid it: isotretinoin can cause serious birth defects, so contact your prescriber straight away if you could be pregnant.",
      tr: "Kaçın: izotretinoin ciddi doğum kusurlarına yol açabilir; hamile olabileceğini düşünüyorsan hemen reçete eden hekime başvur.",
    },
    details: {
      en: "Isotretinoin is a vitamin A-based acne medicine that can cause miscarriage and serious problems with how a baby develops. In the UK it's only prescribed within a pregnancy prevention programme, and the NHS advises waiting at least one month after the last dose before trying for a baby. If you become pregnant while taking it, your prescriber needs to know urgently.",
      tr: "İzotretinoin, A vitamini bazlı bir akne ilacıdır ve düşüğe ya da bebeğin gelişiminde ciddi sorunlara yol açabilir. İngiltere'de yalnızca bir gebelik önleme programı kapsamında reçete edilir ve NHS son dozdan sonra hamile kalmaya çalışmadan önce en az bir ay beklenmesini önerir. İlacı kullanırken hamile kalırsan reçete eden hekimin bunu acilen bilmeli.",
    },
    tips: {
      en: ["Use reliable contraception while taking it, as your prescriber advises.", ASK.en],
      tr: ["Kullanırken hekiminin önerdiği şekilde güvenilir bir doğum kontrol yöntemi kullan.", ASK.tr],
    },
    sources: [S.nhsIsotretinoin, S.m2bIsotretinoin],
  },
  {
    id: "oral-retinoids",
    category: "medicine",
    emoji: "🚫",
    name: { en: "Retinoid tablets (acitretin, alitretinoin)", tr: "Retinoid tabletler (asitretin, alitretinoin)" },
    aliases: {
      en: ["acitretin", "neotigason", "soriatane", "alitretinoin", "toctino", "psoriasis tablets", "eczema tablets"],
      tr: ["asitretin", "neotigason", "alitretinoin", "toctino", "sedef ilacı", "egzama hapı", "retinoid"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid them: these vitamin A-based tablets can seriously harm a developing baby and need careful pregnancy planning.",
      tr: "Kaçın: A vitamini bazlı bu tabletler gelişen bebeğe ciddi zarar verebilir ve dikkatli gebelik planlaması gerektirir.",
    },
    details: {
      en: "Like isotretinoin, oral acitretin (for psoriasis) and alitretinoin (for severe hand eczema) are retinoids that can cause birth defects, so the UK medicines regulator requires a pregnancy prevention programme. Acitretin stays in the body for a long time, and pregnancy checks continue for 3 years after stopping it. Talk to your prescriber before planning a pregnancy.",
      tr: "İzotretinoin gibi ağızdan alınan asitretin (sedef hastalığı için) ve alitretinoin (ağır el egzaması için) de doğum kusurlarına yol açabilen retinoidlerdir; bu yüzden İngiltere'nin ilaç düzenleyicisi gebelik önleme programı şart koşar. Asitretin vücutta uzun süre kalır ve bırakıldıktan sonra 3 yıl boyunca gebelik kontrolleri sürer. Hamilelik planlamadan önce reçete eden hekiminle konuş.",
    },
    tips: {
      en: ["If you could be pregnant while taking one, contact your prescriber urgently.", ASK.en],
      tr: ["Bu ilaçlardan birini kullanırken hamile olabileceğini düşünüyorsan hekimine acilen başvur.", ASK.tr],
    },
    sources: [S.mhraRetinoids, S.m2bVitaminA],
  },
  {
    id: "codeine",
    category: "medicine",
    emoji: "💊",
    name: { en: "Codeine", tr: "Kodein" },
    aliases: {
      en: ["co-codamol", "solpadeine", "tylenol with codeine", "codeine phosphate", "opioid painkiller", "codeine cough syrup"],
      tr: ["kodein", "kodeinli ağrı kesici", "kodeinli şurup", "opioid", "parasetamol kodein"],
    },
    verdict: "avoid",
    summary: {
      en: "Don't use it unless your doctor prescribes it, because codeine isn't suitable for self-treatment in pregnancy.",
      tr: "Doktorun reçete etmediği sürece kullanma, çünkü kodein hamilelikte kendi kendine tedavi için uygun değildir.",
    },
    details: {
      en: "Codeine is an opioid. The NHS advises avoiding painkillers containing codeine in pregnancy unless they're prescribed, and BUMPS notes that use close to delivery can cause withdrawal symptoms and breathing problems in the newborn. Sometimes a doctor will decide it's the right option after weighing up the risks and benefits.",
      tr: "Kodein bir opioiddir. NHS, reçete edilmedikçe hamilelikte kodein içeren ağrı kesicilerden kaçınılmasını önerir; BUMPS de doğuma yakın kullanımın yenidoğanda yoksunluk belirtilerine ve solunum sorunlarına yol açabileceğini belirtir. Bazen doktor riskleri ve faydaları tartıp bunun doğru seçenek olduğuna karar verebilir.",
    },
    tips: {
      en: ["Check combination painkillers and cough syrups for codeine.", KEEP.en, ASK.en],
      tr: ["Kombine ağrı kesicilerde ve öksürük şuruplarında kodein olup olmadığına bak.", KEEP.tr, ASK.tr],
    },
    sources: [S.nhsHeadaches, S.bumpsCodeine],
  },
  {
    id: "tramadol",
    category: "medicine",
    emoji: "💊",
    name: { en: "Tramadol", tr: "Tramadol" },
    aliases: {
      en: ["ultram", "zydol", "opioid painkiller", "strong painkiller"],
      tr: ["contramal", "güçlü ağrı kesici", "opioid ağrı kesici"],
    },
    verdict: "caution",
    summary: {
      en: "Only if your doctor prescribes it for severe pain, ideally for just a few days; never take it on your own.",
      tr: "Yalnızca doktorun şiddetli ağrı için reçete ederse ve tercihen birkaç günlüğüne; asla kendi kendine kullanma.",
    },
    details: {
      en: "Tramadol is an opioid painkiller. The NHS says it may sometimes be the best option for severe pain in pregnancy and isn't known to cause problems with the baby's development, though more research is needed. Used regularly, especially near the birth, opioids can cause withdrawal symptoms in the newborn.",
      tr: "Tramadol opioid bir ağrı kesicidir. NHS, hamilelikte şiddetli ağrı için bazen en iyi seçenek olabileceğini ve bebeğin gelişiminde sorun yarattığının bilinmediğini, ancak daha fazla araştırma gerektiğini söyler. Düzenli kullanıldığında, özellikle doğuma yakın dönemde, opioidler yenidoğanda yoksunluk belirtilerine yol açabilir.",
    },
    tips: {
      en: ["Never use someone else's or leftover prescription painkillers.", KEEP.en, ASK.en],
      tr: ["Başkasına ait ya da evde kalan reçeteli ağrı kesicileri asla kullanma.", KEEP.tr, ASK.tr],
    },
    sources: [S.nhsTramadol, S.m2bTramadol],
  },
  {
    id: "triptans",
    category: "medicine",
    emoji: "💊",
    name: { en: "Triptans (sumatriptan)", tr: "Triptanlar (sumatriptan)" },
    aliases: {
      en: ["sumatriptan", "imigran", "imitrex", "rizatriptan", "maxalt", "zolmitriptan", "zomig", "eletriptan", "relpax", "migraine tablets"],
      tr: ["sumatriptan", "imigran", "rizatriptan", "maxalt", "zolmitriptan", "relpax", "eletriptan", "migren hapı"],
    },
    verdict: "caution",
    summary: {
      en: "Sumatriptan can be used in pregnancy if needed, but decide with your doctor rather than on your own.",
      tr: "Sumatriptan gerekirse hamilelikte kullanılabilir; ama kendi başına değil, doktorunla birlikte karar ver.",
    },
    details: {
      en: "BUMPS says sumatriptan has been well studied and isn't known to pose a risk to the baby, and there are no concerns that other triptans cause harm, though there's less information about them. The NHS advises asking your doctor before taking sumatriptan in pregnancy. Migraines often ease in the second and third trimesters.",
      tr: "BUMPS, sumatriptanın iyi araştırıldığını ve bebek için bilinen bir risk taşımadığını, diğer triptanlarla ilgili bilgi daha az olsa da zarar verdiklerine dair bir endişe bulunmadığını belirtir. NHS hamilelikte sumatriptan almadan önce doktora danışılmasını önerir. Migren sıklıkla hamileliğin ikinci ve üçüncü üç ayında hafifler.",
    },
    tips: {
      en: ["Keep a headache diary to spot triggers like missed meals or poor sleep.", ASK.en],
      tr: ["Öğün atlama ya da uykusuzluk gibi tetikleyicileri fark etmek için baş ağrısı günlüğü tut.", ASK.tr],
    },
    sources: [S.bumpsTriptans, S.nhsSumatriptan],
  },
  {
    id: "migraine",
    category: "medicine",
    emoji: "🤕",
    name: { en: "Migraine treatment", tr: "Migren tedavisi" },
    aliases: {
      en: ["migraine", "migraine medicine", "migraine prevention", "headache tablets", "topiramate", "propranolol"],
      tr: ["migren", "migren ilacı", "migren önleyici", "baş ağrısı ilacı", "topiramat", "propranolol"],
    },
    verdict: "caution",
    summary: {
      en: "Many migraine treatments can be used in pregnancy but some can't, so make a plan with your doctor early on.",
      tr: "Pek çok migren tedavisi hamilelikte kullanılabilir ama bazıları kullanılamaz; erkenden doktorunla bir plan yap.",
    },
    details: {
      en: "Paracetamol can be used throughout pregnancy, and triptans such as sumatriptan may be continued if they work well, while NSAIDs should be avoided from 20 weeks. BUMPS notes that some preventive medicines, including sodium valproate and topiramate, are avoided in pregnancy, while others such as propranolol or amitriptyline can be used. If you take a daily preventive, ask your doctor to review it urgently.",
      tr: "Parasetamol hamileliğin her döneminde kullanılabilir; sumatriptan gibi triptanlar da iyi işe yarıyorsa sürdürülebilir, NSAİİ'lerden ise 20. haftadan itibaren kaçınılmalıdır. BUMPS, sodyum valproat ve topiramat gibi bazı koruyucu ilaçlardan hamilelikte kaçınıldığını, propranolol ya da amitriptilin gibi bazılarının ise kullanılabildiğini belirtir. Her gün koruyucu bir ilaç kullanıyorsan doktorunun bunu acilen gözden geçirmesini iste.",
    },
    tips: {
      en: ["Get a severe or sudden headache, or one with vision changes or swelling, checked urgently.", KEEP.en, ASK.en],
      tr: ["Şiddetli ya da ani başlayan, görme bozukluğu veya şişlikle birlikte olan baş ağrısını acilen kontrol ettir.", KEEP.tr, ASK.tr],
    },
    sources: [S.bumpsMigraine, S.nhsHeadaches],
  },
  {
    id: "antidepressants",
    category: "medicine",
    emoji: "💊",
    name: { en: "Antidepressants", tr: "Antidepresanlar" },
    aliases: {
      en: ["sertraline", "zoloft", "lustral", "fluoxetine", "prozac", "citalopram", "escitalopram", "cipralex", "ssri", "anxiety medication"],
      tr: ["antidepresan", "sertralin", "lustral", "fluoksetin", "prozac", "essitalopram", "cipralex", "ssri", "kaygı ilacı"],
    },
    verdict: "caution",
    summary: {
      en: "Don't stop suddenly: many antidepressants are used in pregnancy, so weigh up the benefits and risks with your doctor.",
      tr: "Birden bırakma: pek çok antidepresan hamilelikte kullanılır; faydaları ve riskleri doktorunla birlikte değerlendir.",
    },
    details: {
      en: "The NHS says some antidepressants can be taken in pregnancy; sertraline, for example, can be used if needed. Coming off antidepressants should be done gradually with your doctor's help to avoid withdrawal symptoms, and untreated depression or anxiety can affect both you and your baby. Your doctor can help you weigh up the options and may adjust your treatment.",
      tr: "NHS bazı antidepresanların hamilelikte kullanılabildiğini, örneğin sertralinin gerekirse kullanılabileceğini söyler. Yoksunluk belirtilerini önlemek için antidepresanlar doktor yardımıyla kademeli olarak bırakılmalıdır; tedavi edilmeyen depresyon ya da kaygı da hem seni hem bebeğini etkileyebilir. Doktorun seçenekleri tartmana yardım edebilir ve tedavini ayarlayabilir.",
    },
    tips: {
      en: ["Tell your midwife how you're feeling, as emotional support is part of your care.", KEEP.en, ASK.en],
      tr: ["Nasıl hissettiğini ebene anlat; duygusal destek de bakımının bir parçası.", KEEP.tr, ASK.tr],
    },
    sources: [S.nhsAntidepressants, S.nhsDepression],
  },
  {
    id: "thyroid-medication",
    category: "medicine",
    emoji: "💊",
    name: { en: "Thyroid medication (levothyroxine)", tr: "Tiroid ilacı (levotiroksin)" },
    aliases: {
      en: ["levothyroxine", "thyroxine", "synthroid", "eltroxin", "euthyrox", "underactive thyroid", "hypothyroidism"],
      tr: ["levotiroksin", "euthyrox", "levotiron", "tiroid hapı", "hipotiroidi", "haşimoto"],
    },
    verdict: "caution",
    summary: {
      en: "Keep taking it: levothyroxine can be taken in pregnancy, though your dose may need adjusting with extra blood tests.",
      tr: "Kullanmaya devam et: levotiroksin hamilelikte kullanılabilir, ama ek kan tahlilleriyle dozunun ayarlanması gerekebilir.",
    },
    details: {
      en: "Thyroid hormone is important for your baby's development, and the NHS says levothyroxine can be taken during pregnancy if needed. You may need more frequent blood tests and a dose change, ideally as soon as your pregnancy is confirmed. Calcium and iron supplements can interfere with levothyroxine, so take them at different times.",
      tr: "Tiroid hormonu bebeğinin gelişimi için önemlidir ve NHS gerekirse levotiroksinin hamilelikte kullanılabileceğini söyler. Daha sık kan tahlili ve doz değişikliği gerekebilir; bunun ideal olarak hamilelik doğrulanır doğrulanmaz yapılması iyi olur. Kalsiyum ve demir takviyeleri levotiroksinin etkisini bozabilir, bu yüzden bunları farklı saatlerde al.",
    },
    tips: {
      en: ["Tell your doctor as soon as you know you're pregnant.", KEEP.en, ASK.en],
      tr: ["Hamile olduğunu öğrenir öğrenmez doktoruna haber ver.", KEEP.tr, ASK.tr],
    },
    sources: [S.nhsLevothyroxine],
  },
  {
    id: "insulin",
    category: "medicine",
    emoji: "💉",
    name: { en: "Insulin", tr: "İnsülin" },
    aliases: {
      en: ["novorapid", "humalog", "lantus", "levemir", "gestational diabetes", "type 1 diabetes", "diabetes injections"],
      tr: ["insülin", "insülin iğnesi", "novorapid", "humalog", "lantus", "levemir", "gebelik şekeri", "tip 1 diyabet"],
    },
    verdict: "caution",
    summary: {
      en: "Keep taking it: insulin is widely used for diabetes in pregnancy, and your team will adjust your doses as you go.",
      tr: "Kullanmaya devam et: insülin hamilelikte diyabet için yaygın olarak kullanılır ve ekibin dozlarını süreç içinde ayarlar.",
    },
    details: {
      en: "Insulin is used to treat type 1, type 2 and gestational diabetes in pregnancy, and BUMPS notes that it lowers the risks linked to poorly controlled blood sugar, such as miscarriage, a very large baby and delivery complications. Your doses usually change as pregnancy progresses. The NHS notes that tighter control can mean more hypos, which are harmless for the baby but need managing.",
      tr: "İnsülin hamilelikte tip 1, tip 2 ve gebelik diyabetinin tedavisinde kullanılır; BUMPS, insülinin düşük, çok iri bebek ve doğum komplikasyonları gibi kontrolsüz kan şekeriyle ilişkili riskleri azalttığını belirtir. Dozların genellikle hamilelik ilerledikçe değişir. NHS, daha sıkı kontrolün daha fazla hipoglisemi anlamına gelebileceğini; bunların bebek için zararsız olduğunu ama yönetilmesi gerektiğini belirtir.",
    },
    tips: {
      en: ["Keep hypo treatments with you and make sure your partner knows what to do.", KEEP.en, ASK.en],
      tr: ["Şeker düşmesine karşı yanında atıştırmalık taşı ve partnerinin ne yapacağını bildiğinden emin ol.", KEEP.tr, ASK.tr],
    },
    sources: [S.bumpsInsulin, S.nhsDiabetes],
  },
  {
    id: "nasal-steroid-spray",
    category: "medicine",
    emoji: "👃",
    name: { en: "Steroid nasal sprays", tr: "Steroidli burun spreyleri" },
    aliases: {
      en: ["beclometasone", "beconase", "fluticasone", "flonase", "flixonase", "avamys", "mometasone", "nasonex", "hay fever spray"],
      tr: ["beklometazon", "flutikazon", "flixonase", "avamys", "mometazon", "nasonex", "alerji spreyi", "kortizonlu burun spreyi"],
    },
    verdict: "caution",
    summary: {
      en: "They're generally fine in pregnancy because very little reaches your bloodstream, but check with a pharmacist first.",
      tr: "Kana çok az geçtikleri için hamilelikte genellikle uygundurlar; yine de önce eczacına danış.",
    },
    details: {
      en: "The NHS says beclometasone nasal spray is safe to use in pregnancy because very little of the medicine gets into your blood and almost none reaches the baby. Mayo Clinic notes that steroid sprays such as fluticasone or mometasone may be recommended for moderate to severe allergy symptoms. Use the lowest dose that controls your symptoms.",
      tr: "NHS, ilacın çok azı kana geçtiği ve bebeğe neredeyse hiç ulaşmadığı için beklometazon burun spreyinin hamilelikte güvenle kullanılabileceğini söyler. Mayo Clinic, orta ve ağır alerji belirtilerinde flutikazon ya da mometazon gibi steroid spreylerin önerilebileceğini belirtir. Belirtilerini kontrol altında tutan en düşük dozu kullan.",
    },
    tips: {
      en: ["Pregnancy itself can cause a stuffy nose, so mention it if it doesn't improve.", ASK.en],
      tr: ["Hamilelik de burun tıkanıklığı yapabilir; geçmezse bunu doktoruna belirt.", ASK.tr],
    },
    sources: [S.nhsBeclometasone, S.mayoAllergyMeds],
  },
  {
    id: "hemorrhoid-cream",
    category: "medicine",
    emoji: "🧴",
    name: { en: "Haemorrhoid (piles) creams", tr: "Hemoroid (basur) kremleri" },
    aliases: {
      en: ["hemorrhoid cream", "haemorrhoid cream", "piles cream", "anusol", "preparation h", "hydrocortisone cream", "suppositories"],
      tr: ["hemoroid kremi", "basur kremi", "basur fitili", "anusol", "faktu", "hidrokortizonlu krem", "fitil"],
    },
    verdict: "caution",
    summary: {
      en: "Most piles creams can be used for short periods in pregnancy, but check with a pharmacist first.",
      tr: "Basur kremlerinin çoğu hamilelikte kısa süreli kullanılabilir; ama önce eczacına danış.",
    },
    details: {
      en: "Piles are common in pregnancy and are often linked to constipation. The NHS says hydrocortisone creams, ointments and suppositories for piles can be used in pregnancy, as only a small amount gets into the blood. BUMPS notes there's no evidence that the available treatments pose a risk to the baby.",
      tr: "Basur (hemoroid) hamilelikte yaygındır ve sıklıkla kabızlıkla ilişkilidir. NHS, basur için hidrokortizonlu krem, merhem ve fitillerin kana çok az geçtiği için hamilelikte kullanılabileceğini söyler. BUMPS da mevcut tedavilerin bebek için risk oluşturduğuna dair bir kanıt olmadığını belirtir.",
    },
    tips: {
      en: ["Fibre, fluids and not straining help stop piles from coming back.", ASK.en],
      tr: ["Lif, sıvı ve ıkınmamak basurun tekrarlamasını önlemeye yardım eder.", ASK.tr],
    },
    sources: [S.nhsHydrocortisonePiles, S.bumpsPiles],
  },
  {
    id: "thrush-treatment",
    category: "medicine",
    emoji: "🧴",
    name: { en: "Thrush treatment (clotrimazole)", tr: "Vajinal mantar tedavisi (klotrimazol)" },
    aliases: {
      en: ["clotrimazole", "canesten", "miconazole", "monistat", "yeast infection cream", "pessary", "fluconazole", "diflucan"],
      tr: ["klotrimazol", "canesten", "mikonazol", "gyno-daktarin", "vajinal mantar kremi", "ovül", "flukonazol", "mantar hapı"],
    },
    verdict: "caution",
    summary: {
      en: "Creams and pessaries like clotrimazole are used in pregnancy, but avoid thrush tablets and see a doctor or midwife first.",
      tr: "Klotrimazol gibi krem ve ovüller hamilelikte kullanılır; ama mantar haplarından kaçın ve önce doktoruna ya da ebene danış.",
    },
    details: {
      en: "Thrush is common in pregnancy and isn't harmful to the baby. The NHS advises seeing a GP or midwife before treating it and says it can be treated with a clotrimazole cream or pessary, while anti-thrush tablets such as fluconazole shouldn't be taken in pregnancy. Mayo Clinic notes that seven-day vaginal treatments tend to work best.",
      tr: "Vajinal mantar hamilelikte yaygındır ve bebeğe zarar vermez. NHS tedavi etmeden önce aile hekimine ya da ebeye görünmeyi önerir; klotrimazol içeren krem ya da ovülle tedavi edilebileceğini, flukonazol gibi mantar haplarının ise hamilelikte alınmaması gerektiğini söyler. Mayo Clinic yedi günlük vajinal tedavilerin daha iyi sonuç verdiğini belirtir.",
    },
    tips: {
      en: ["Get any new discharge or itching checked, as other infections can look similar.", ASK.en],
      tr: ["Yeni başlayan akıntı ya da kaşıntıyı kontrol ettir; başka enfeksiyonlar da benzer görünebilir.", ASK.tr],
    },
    sources: [S.nhsThrush, S.mayoYeast],
  },
  {
    id: "lice-treatment",
    category: "medicine",
    emoji: "🪮",
    name: { en: "Head lice treatment", tr: "Bit tedavisi" },
    aliases: {
      en: ["head lice", "nits", "lice shampoo", "dimeticone", "hedrin", "permethrin", "malathion", "wet combing"],
      tr: ["bit", "sirke", "bit şampuanı", "dimetikon", "permetrin", "bit tarağı", "ıslak tarama"],
    },
    verdict: "caution",
    summary: {
      en: "Wet combing is the first choice, and physical treatments like dimeticone can also be used in pregnancy.",
      tr: "İlk tercih ıslak taramadır; dimetikon gibi fiziksel etkili ürünler de hamilelikte kullanılabilir.",
    },
    details: {
      en: "UK guidance suggests pregnant women use wet combing with conditioner and a fine-toothed comb, which avoids chemicals altogether. BUMPS says physical treatments such as dimeticone work by coating the lice and don't enter the bloodstream in amounts that could affect the baby. Chemical insecticides like malathion are best kept for when other methods haven't worked.",
      tr: "İngiltere'deki rehberler hamile kadınlara saç kremi ve sık dişli tarakla ıslak tarama yapmayı önerir; bu yöntem kimyasal kullanımını tamamen ortadan kaldırır. BUMPS, dimetikon gibi fiziksel etkili ürünlerin bitleri kaplayarak işe yaradığını ve bebeği etkileyecek miktarda kana geçmediğini söyler. Malation gibi kimyasal böcek öldürücüler ise diğer yöntemler işe yaramadığında kullanılmalıdır.",
    },
    tips: {
      en: ["Check and treat everyone in the household at the same time.", ASK.en],
      tr: ["Evdeki herkesi aynı anda kontrol et ve tedavi et.", ASK.tr],
    },
    sources: [S.bumpsHeadLice, S.nhsHeadLice],
  },
  {
    id: "anti-sickness",
    category: "medicine",
    emoji: "🤢",
    name: { en: "Anti-sickness medicines", tr: "Bulantı ilaçları" },
    aliases: {
      en: ["anti-sickness", "nausea medicine", "cyclizine", "promethazine", "metoclopramide", "ondansetron", "zofran", "xonvea", "diclegis", "hyperemesis"],
      tr: ["bulantı ilacı", "kusma ilacı", "metoklopramid", "metpamid", "ondansetron", "zofran", "prometazin", "hiperemezis"],
    },
    verdict: "caution",
    summary: {
      en: "Several are safely prescribed in pregnancy, so if sickness is affecting your daily life, ask your doctor about treatment.",
      tr: "Bazıları hamilelikte güvenle reçete edilir; bulantı günlük hayatını etkiliyorsa doktoruna tedaviyi sor.",
    },
    details: {
      en: "Nausea and vomiting affect most pregnant women, and BUMPS notes there are several medicines that can be used safely when lifestyle changes aren't enough. Severe vomiting, where you can't keep food or fluids down, can be hyperemesis gravidarum and needs prompt medical care. You don't have to struggle on, and getting help early makes it easier to manage.",
      tr: "Bulantı ve kusma hamile kadınların çoğunu etkiler; BUMPS, yaşam tarzı değişiklikleri yetmediğinde güvenle kullanılabilecek birkaç ilaç olduğunu belirtir. Yiyecek ya da sıvıyı tutamadığın şiddetli kusma hiperemezis gravidarum olabilir ve hızlı tıbbi bakım gerektirir. Tek başına katlanmak zorunda değilsin; erken yardım almak yönetmeyi kolaylaştırır.",
    },
    tips: {
      en: ["Small, frequent snacks and sipping fluids little and often can help.", "Seek help if you can't keep food or fluids down for 24 hours.", ASK.en],
      tr: ["Küçük ve sık atıştırmalıklar ile azar azar sıvı almak yardımcı olabilir.", "24 saat boyunca yiyecek ya da sıvı tutamıyorsan yardım iste.", ASK.tr],
    },
    sources: [S.bumpsNausea, S.nhsSickness],
  },
  {
    id: "prescription-medicines",
    category: "medicine",
    emoji: "📋",
    name: { en: "Prescription medicines", tr: "Reçeteli ilaçlar" },
    aliases: {
      en: ["prescription", "regular medication", "long-term medicine", "epilepsy medicine", "blood pressure medicine", "asthma inhaler", "my medicine"],
      tr: ["reçeteli ilaç", "düzenli ilaç", "sürekli ilaç", "epilepsi ilacı", "tansiyon ilacı", "astım spreyi", "kullandığım ilaç"],
    },
    verdict: "caution",
    summary: {
      en: "Ask before you start, stop or change any prescription, and never stop one suddenly on your own.",
      tr: "Herhangi bir reçeteli ilaca başlamadan, bırakmadan ya da dozunu değiştirmeden önce sor; asla kendi kendine birden bırakma.",
    },
    details: {
      en: "Most medicines cross the placenta, so the NHS advises checking with your doctor, midwife or pharmacist before taking any medicine in pregnancy. But stopping a medicine that keeps you well, such as one for epilepsy, asthma or high blood pressure, can be more harmful than continuing it. Ideally, review long-term medicines before trying to conceive or as soon as you know you're pregnant.",
      tr: "İlaçların çoğu plasentadan geçer; bu yüzden NHS hamilelikte herhangi bir ilaç almadan önce doktora, ebeye ya da eczacıya danışılmasını önerir. Ama epilepsi, astım ya da yüksek tansiyon gibi bir durum için seni sağlıklı tutan bir ilacı bırakmak, devam etmekten daha zararlı olabilir. Uzun süreli ilaçlarını ideal olarak hamile kalmaya çalışmadan önce ya da hamile olduğunu öğrenir öğrenmez gözden geçirt.",
    },
    tips: {
      en: ["Tell every doctor, dentist and pharmacist that you're pregnant.", KEEP.en, ASK.en],
      tr: ["Her doktora, diş hekimine ve eczacıya hamile olduğunu söyle.", KEEP.tr, ASK.tr],
    },
    sources: [S.nhsMedicines, S.fdaMedicinePregnancy],
  },
  {
    id: "flu-vaccine",
    category: "medicine",
    emoji: "💉",
    name: { en: "Flu vaccine", tr: "Grip aşısı" },
    aliases: {
      en: ["flu jab", "flu shot", "influenza vaccine", "seasonal flu vaccine"],
      tr: ["influenza aşısı", "mevsimsel grip aşısı", "grip iğnesi"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, the flu vaccine is recommended in pregnancy and helps protect both you and your newborn.",
      tr: "Evet, grip aşısı hamilelikte önerilir ve hem seni hem yenidoğan bebeğini korumaya yardım eder.",
    },
    details: {
      en: "Pregnant women are more likely to have complications from flu, such as pneumonia, and to need hospital care. The NHS recommends the inactivated flu vaccine in pregnancy, and BUMPS notes that thousands of vaccinated pregnant women have been studied without concerns for the baby. Antibodies also cross the placenta and help protect your baby in their first weeks.",
      tr: "Hamile kadınlarda zatürre gibi grip komplikasyonları daha sık görülür ve hastanede tedavi gerekme olasılığı daha yüksektir. NHS hamilelikte inaktif grip aşısını önerir; BUMPS da aşılanan binlerce hamile kadının incelendiğini ve bebek açısından bir endişe görülmediğini belirtir. Antikorlar plasentadan geçerek bebeğini ilk haftalarında korumaya da yardım eder.",
    },
    tips: {
      en: ["Ask your midwife, GP or pharmacist about it as soon as flu season starts."],
      tr: ["Grip mevsimi başlar başlamaz ebene, aile hekimine ya da eczacına sor."],
    },
    sources: [S.nhsVaccines, S.bumpsFluVaccine],
  },
  {
    id: "whooping-cough-vaccine",
    category: "medicine",
    emoji: "💉",
    name: { en: "Whooping cough vaccine (Tdap)", tr: "Boğmaca aşısı (Tdap)" },
    aliases: {
      en: ["whooping cough", "pertussis vaccine", "tdap", "boostrix", "repevax"],
      tr: ["boğmaca", "tdap", "boostrix", "karma aşı", "boğmaca aşısı"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, it's recommended in every pregnancy to protect your baby in their first weeks of life.",
      tr: "Evet, bebeğini hayatının ilk haftalarında korumak için her hamilelikte önerilir.",
    },
    details: {
      en: "Whooping cough can be very serious for young babies. Vaccination in pregnancy lets you pass antibodies to your baby until they can have their own vaccines. In the UK it's offered from 16 weeks, usually around 20 weeks, while US guidance recommends it between 27 and 36 weeks.",
      tr: "Boğmaca küçük bebekler için çok ciddi olabilir. Hamilelikte aşılanmak, bebeğin kendi aşılarını olana kadar ona antikor geçirmeni sağlar. İngiltere'de 16. haftadan itibaren, genellikle 20. hafta civarında yapılır; ABD ise 27. ile 36. haftalar arasını önerir.",
    },
    tips: {
      en: ["Ask your midwife or GP when it's due for you."],
      tr: ["Senin için ne zaman yapılması gerektiğini ebene ya da aile hekimine sor."],
    },
    sources: [S.nhsWhoopingCough, S.m2bTdap],
  },
  {
    id: "rsv-vaccine",
    category: "medicine",
    emoji: "💉",
    name: { en: "RSV vaccine", tr: "RSV aşısı" },
    aliases: {
      en: ["abrysvo", "respiratory syncytial virus", "bronchiolitis vaccine", "rsv jab"],
      tr: ["rsv", "abrysvo", "solunum sinsityal virüsü", "bronşiolit aşısı"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, it's recommended in pregnancy to protect your baby from serious RSV illness in their first months.",
      tr: "Evet, bebeğini ilk aylarında ağır RSV hastalığından korumak için hamilelikte önerilir.",
    },
    details: {
      en: "RSV is a common virus that can cause serious lung infections such as bronchiolitis in young babies. Having the vaccine in pregnancy passes protection to your baby for about their first 6 months. The UK offers it from 28 weeks at any time of year, while in the US ACOG recommends it at 32 to 36 weeks during RSV season.",
      tr: "RSV, küçük bebeklerde bronşiolit gibi ciddi akciğer enfeksiyonlarına yol açabilen yaygın bir virüstür. Hamilelikte aşı olmak bebeğine yaklaşık ilk 6 ayı boyunca koruma sağlar. İngiltere aşıyı yılın her döneminde 28. haftadan itibaren sunarken ABD'de ACOG, RSV sezonunda 32–36. haftalar arasında önerir.",
    },
    tips: {
      en: ["Ask your midwife whether it's offered where you live, and when."],
      tr: ["Yaşadığın yerde sunulup sunulmadığını ve ne zaman yapıldığını ebene sor."],
    },
    sources: [S.nhsVaccines, S.acogRSV],
  },

  // ── Supplements ────────────────────────────────────────────────────────────

  {
    id: "folic-acid",
    category: "supplement",
    emoji: "💊",
    name: { en: "Folic acid", tr: "Folik asit" },
    aliases: {
      en: ["folate", "vitamin b9", "methylfolate", "neural tube", "spina bifida"],
      tr: ["folat", "b9 vitamini", "folbiol", "folik asit hapı", "spina bifida"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, it's recommended: take 400 micrograms a day from before conception until 12 weeks of pregnancy.",
      tr: "Evet, önerilir: hamilelikten önce başlayıp 12. haftaya kadar günde 400 mikrogram al.",
    },
    details: {
      en: "Folic acid reduces the chance of neural tube defects such as spina bifida. The NHS recommends 400 micrograms a day while you're trying to conceive and until you're 12 weeks pregnant, and some women, such as those with diabetes or a family history of neural tube defects, need a higher dose prescribed by a doctor. If you didn't take it before conceiving, start as soon as you find out you're pregnant.",
      tr: "Folik asit, spina bifida gibi nöral tüp defektlerinin olasılığını azaltır. NHS, hamile kalmaya çalışırken ve 12. haftaya kadar günde 400 mikrogram önerir; diyabeti olan ya da ailesinde nöral tüp defekti bulunan kadınlar gibi bazıları için doktorun reçete ettiği daha yüksek bir doz gerekir. Hamile kalmadan önce başlamadıysan hamile olduğunu öğrenir öğrenmez başla.",
    },
    tips: {
      en: ["Pregnancy multivitamins usually contain the right amount, so check the label.", "Ask your GP if you might need the higher dose."],
      tr: ["Hamilelik multivitaminleri genellikle doğru miktarı içerir, etiketi kontrol et.", "Daha yüksek doza ihtiyacın olup olmadığını aile hekimine sor."],
    },
    sources: [S.nhsVitamins, S.nhsFolicAcid],
  },
  {
    id: "vitamin-d",
    category: "supplement",
    emoji: "☀️",
    name: { en: "Vitamin D", tr: "D vitamini" },
    aliases: {
      en: ["vitamin d3", "cholecalciferol", "sunshine vitamin", "vitamin d drops"],
      tr: ["d3 vitamini", "kolekalsiferol", "devit-3", "d vitamini damlası", "güneş vitamini"],
    },
    verdict: "safe",
    summary: {
      en: "Yes: UK advice is 10 micrograms a day, at least from October to March, and all year if you get little sun.",
      tr: "Evet: İngiltere'nin önerisi, en azından ekimden marta kadar günde 10 mikrogram; güneşe az çıkıyorsan tüm yıl.",
    },
    details: {
      en: "Vitamin D helps your baby's bones and teeth develop. The NHS recommends a daily 10 microgram supplement in autumn and winter, and all year if you usually cover most of your skin outdoors, spend a lot of time indoors or have darker skin. Don't take more than 100 micrograms a day, as too much can be harmful.",
      tr: "D vitamini bebeğinin kemik ve dişlerinin gelişmesine yardım eder. NHS sonbahar ve kış aylarında günde 10 mikrogramlık bir takviye önerir; dışarıda cildinin çoğunu örtüyorsan, vaktinin çoğunu kapalı alanda geçiriyorsan ya da cildin koyuysa tüm yıl boyunca. Fazlası zararlı olabileceği için günde 100 mikrogramdan fazla alma.",
    },
    tips: {
      en: ["Many pregnancy multivitamins already include vitamin D, so don't double up.", "Ask your midwife or doctor if you're unsure how much you need."],
      tr: ["Pek çok hamilelik multivitamini zaten D vitamini içerir, iki kat alma.", "Ne kadar ihtiyacın olduğundan emin değilsen ebene ya da doktoruna sor."],
    },
    sources: [S.nhsVitamins, S.m2bVitaminD],
  },
  {
    id: "iron",
    category: "supplement",
    emoji: "🩸",
    name: { en: "Iron supplements", tr: "Demir takviyesi" },
    aliases: {
      en: ["iron tablets", "ferrous sulfate", "ferrous fumarate", "iron deficiency", "anaemia", "anemia"],
      tr: ["demir", "demir hapı", "ferro sanol", "ferrum hausmann", "kansızlık", "anemi", "demir eksikliği"],
    },
    verdict: "caution",
    summary: {
      en: "Take them if they're recommended for you: iron needs rise in pregnancy, and low iron is common and treatable.",
      tr: "Sana önerildiyse kullan: hamilelikte demir ihtiyacı artar; demir eksikliği yaygındır ve tedavi edilebilir.",
    },
    details: {
      en: "Iron helps make red blood cells for you and your baby, and low levels can leave you very tired. In the UK, iron is checked with routine blood tests and supplements are recommended if levels are low, while in the US prenatal vitamins usually include iron routinely. Iron tablets can cause constipation, so tell your midwife if they upset your stomach.",
      tr: "Demir, senin ve bebeğin için kırmızı kan hücreleri üretilmesine yardım eder; düşük olduğunda kendini çok yorgun hissedebilirsin. İngiltere'de demir düzeyi rutin kan tahlilleriyle kontrol edilir ve düşükse takviye önerilir; ABD'de ise hamilelik vitaminleri genellikle rutin olarak demir içerir. Demir tabletleri kabızlık yapabilir; miden bozulursa ebene söyle.",
    },
    tips: {
      en: ["Take it at a different time from tea, coffee and antacids.", "Store iron tablets well out of children's reach."],
      tr: ["Çay, kahve ve antiasitlerden farklı bir saatte al.", "Demir tabletlerini çocukların ulaşamayacağı bir yerde sakla."],
    },
    sources: [S.nhsVitamins, S.m2bIron],
  },
  {
    id: "prenatal-vitamins",
    category: "supplement",
    emoji: "💊",
    name: { en: "Pregnancy multivitamins", tr: "Hamilelik vitaminleri" },
    aliases: {
      en: ["prenatal vitamins", "pregnancy vitamins", "pregnacare", "elevit", "materna", "multivitamin"],
      tr: ["hamilelik vitamini", "gebelik vitamini", "pregnacare", "elevit", "materna", "multivitamin"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, a pregnancy-specific multivitamin is an easy way to get folic acid and vitamin D, but avoid ones with retinol.",
      tr: "Evet, hamileliğe özel bir multivitamin folik asit ve D vitamini almanın kolay bir yoludur; ama retinol içerenlerden kaçın.",
    },
    details: {
      en: "The NHS recommends folic acid and vitamin D in pregnancy, and pregnancy multivitamins are designed to provide these without too much vitamin A. Ordinary multivitamins may contain retinol (vitamin A), which can harm a baby's development at high doses. A healthy, varied diet is still the main source of nutrients.",
      tr: "NHS hamilelikte folik asit ve D vitamini önerir; hamilelik multivitaminleri de bunları fazla A vitamini içermeden sağlamak için tasarlanmıştır. Sıradan multivitaminler, yüksek dozda bebeğin gelişimine zarar verebilen retinol (A vitamini) içerebilir. Sağlıklı ve çeşitli beslenme yine de besin öğelerinin ana kaynağıdır.",
    },
    tips: {
      en: ["Check the label for vitamin A as retinol, and don't take two multivitamins together."],
      tr: ["Etikette retinol şeklinde A vitamini olup olmadığına bak ve iki multivitamini birlikte alma."],
    },
    sources: [S.nhsVitamins, S.m2bVitaminA],
  },
  {
    id: "vitamin-a",
    category: "supplement",
    emoji: "🥕",
    name: { en: "Vitamin A (retinol) supplements", tr: "A vitamini (retinol) takviyeleri" },
    aliases: {
      en: ["vitamin a", "retinol", "retinyl palmitate", "high-dose vitamin a", "beta carotene"],
      tr: ["a vitamini", "retinol", "retinil palmitat", "yüksek doz a vitamini", "beta karoten"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid supplements containing vitamin A as retinol, since too much can harm your baby's development.",
      tr: "Retinol şeklinde A vitamini içeren takviyelerden kaçın, çünkü fazlası bebeğinin gelişimine zarar verebilir.",
    },
    details: {
      en: "High intakes of vitamin A in the form of retinol have been linked to birth defects, so the NHS advises against vitamin A supplements in pregnancy and recommends always checking labels. Beta-carotene, the form found in carrots and other orange vegetables, isn't the same concern. Liver and cod liver oil are also very high in retinol.",
      tr: "Retinol şeklinde yüksek miktarda A vitamini alımı doğum kusurlarıyla ilişkilendirilmiştir; bu yüzden NHS hamilelikte A vitamini takviyelerine karşı uyarır ve etiketlerin her zaman kontrol edilmesini önerir. Havuç ve diğer turuncu sebzelerde bulunan beta karoten aynı endişeyi taşımaz. Ciğer ve balık karaciğeri yağı da çok yüksek miktarda retinol içerir.",
    },
    tips: {
      en: ["Check every supplement label, including hair and skin vitamins, for retinol."],
      tr: ["Saç ve cilt vitaminleri dahil her takviyenin etiketinde retinol olup olmadığına bak."],
    },
    sources: [S.nhsVitamins, S.m2bVitaminA],
  },
  {
    id: "fish-oil",
    category: "supplement",
    emoji: "🐟",
    name: { en: "Fish oil & omega-3", tr: "Balık yağı ve omega-3" },
    aliases: {
      en: ["omega-3", "omega 3", "fish oil capsules", "dha", "epa", "algae oil", "krill oil"],
      tr: ["omega 3", "balık yağı", "balık yağı kapsülü", "dha", "epa", "alg yağı"],
    },
    verdict: "caution",
    summary: {
      en: "Fish body oil is generally fine, but avoid fish liver oil, such as cod liver oil, which is high in vitamin A.",
      tr: "Balık gövde yağı genellikle uygundur; ama morina karaciğeri yağı gibi A vitamini yüksek balık karaciğeri yağlarından kaçın.",
    },
    details: {
      en: "The NHS advises against cod liver oil and other supplements containing vitamin A (retinol) in pregnancy. Omega-3 supplements made from fish body oil or algae don't have this problem, though eating oily fish within the recommended limits is the main way to get omega-3. Choose a reputable brand and check the label for vitamin A.",
      tr: "NHS hamilelikte morina karaciğeri yağına ve A vitamini (retinol) içeren diğer takviyelere karşı uyarır. Balık gövde yağından ya da algden yapılan omega-3 takviyelerinde bu sorun yoktur; yine de omega-3 almanın ana yolu önerilen sınırlar içinde yağlı balık yemektir. Güvenilir bir marka seç ve etikette A vitamini olup olmadığına bak.",
    },
    tips: {
      en: ["If you don't eat fish, ask your midwife about an algae-based omega-3."],
      tr: ["Balık yemiyorsan alg bazlı bir omega-3 hakkında ebene danış."],
    },
    sources: [S.nhsVitamins, S.nhsFish],
  },
  {
    id: "cod-liver-oil",
    category: "supplement",
    emoji: "🐟",
    name: { en: "Cod liver oil", tr: "Morina balığı karaciğeri yağı" },
    aliases: {
      en: ["fish liver oil", "halibut liver oil", "shark liver oil"],
      tr: ["balık karaciğeri yağı", "morina yağı", "balık yağı şurubu", "köpek balığı karaciğer yağı"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid it in pregnancy, because it's high in vitamin A (retinol), which can harm your baby's development.",
      tr: "Hamilelikte kaçın, çünkü bebeğinin gelişimine zarar verebilen yüksek miktarda A vitamini (retinol) içerir.",
    },
    details: {
      en: "The NHS specifically advises against taking cod liver oil in pregnancy because of its high vitamin A content. Too much retinol has been linked to birth defects. If you'd like an omega-3 supplement, choose one made from fish body oil or algae instead.",
      tr: "NHS, yüksek A vitamini içeriği nedeniyle hamilelikte morina balığı karaciğeri yağı kullanılmamasını özellikle önerir. Fazla retinol doğum kusurlarıyla ilişkilendirilmiştir. Omega-3 takviyesi istiyorsan bunun yerine balık gövde yağından ya da algden yapılan birini seç.",
    },
    tips: {
      en: ["Check family and children's supplements in the cupboard before taking them."],
      tr: ["Dolaptaki aile ve çocuk takviyelerini kullanmadan önce kontrol et."],
    },
    sources: [S.nhsVitamins, S.nhsVitaminA],
  },
  {
    id: "magnesium",
    category: "supplement",
    emoji: "💊",
    name: { en: "Magnesium", tr: "Magnezyum" },
    aliases: {
      en: ["magnesium citrate", "magnesium glycinate", "magnesium oxide", "leg cramps", "magnesium spray"],
      tr: ["magnezyum sitrat", "magnezyum takviyesi", "magnezyum spreyi", "bacak krampı", "kramp"],
    },
    verdict: "caution",
    summary: {
      en: "Food comes first, and a modest-dose magnesium supplement is unlikely to cause harm, but check with your midwife.",
      tr: "Önce besinler gelir; ölçülü dozda magnezyum takviyesinin zarar vermesi olası değil, ama ebene danış.",
    },
    details: {
      en: "Magnesium is found in leafy greens, nuts, seeds and wholegrains, and most people can get enough from a varied diet. The NHS says magnesium supplements at modest doses are unlikely to cause harm, while high doses can cause diarrhoea. It's sometimes suggested for leg cramps, so talk to your midwife about whether it's right for you.",
      tr: "Magnezyum yeşil yapraklı sebzelerde, kuruyemişlerde, tohumlarda ve tam tahıllarda bulunur; çoğu kişi çeşitli bir beslenmeyle yeterince alabilir. NHS ölçülü dozlarda magnezyum takviyesinin zarar vermesinin olası olmadığını, yüksek dozların ise ishal yapabileceğini söyler. Bazen bacak krampları için önerilir; senin için uygun olup olmadığını ebenle konuş.",
    },
    tips: {
      en: ["Tell your midwife about every supplement you take, including sprays and powders."],
      tr: ["Sprey ve tozlar dahil kullandığın tüm takviyeleri ebene söyle."],
    },
    sources: [S.nhsOtherMinerals],
  },
  {
    id: "calcium",
    category: "supplement",
    emoji: "🦴",
    name: { en: "Calcium supplements", tr: "Kalsiyum takviyesi" },
    aliases: {
      en: ["calcium", "calcium carbonate", "calcium citrate", "calcium and vitamin d"],
      tr: ["kalsiyum", "kalsiyum hapı", "calcium sandoz", "kalsiyum d vitamini"],
    },
    verdict: "caution",
    summary: {
      en: "Get calcium from food where you can; supplements help if your intake is low or your doctor recommends them.",
      tr: "Kalsiyumu mümkünse besinlerden al; alımın düşükse ya da doktorun önerirse takviyeler faydalı olabilir.",
    },
    details: {
      en: "Calcium helps build your baby's bones and teeth, and dairy, fortified plant milks, tahini and leafy greens are good sources. The WHO recommends calcium supplements in pregnancy for women whose diets are low in calcium, to help lower the risk of pre-eclampsia. Check with your midwife before taking high doses.",
      tr: "Kalsiyum bebeğinin kemik ve dişlerinin oluşmasına yardım eder; süt ürünleri, kalsiyumla zenginleştirilmiş bitkisel sütler, tahin ve yeşil yapraklı sebzeler iyi kaynaklardır. DSÖ, beslenmesinde kalsiyum düşük olan hamile kadınlar için preeklampsi riskini azaltmaya yardımcı olması amacıyla kalsiyum takviyesi önerir. Yüksek doz almadan önce ebene danış.",
    },
    tips: {
      en: ["Yoghurt, ayran, cheese and tahini are easy calcium boosts."],
      tr: ["Yoğurt, ayran, peynir ve tahin kalsiyumu artırmanın kolay yollarıdır."],
    },
    sources: [S.nhsCalcium, S.whoCalcium],
  },
  {
    id: "iodine",
    category: "supplement",
    emoji: "🧂",
    name: { en: "Iodine", tr: "İyot" },
    aliases: {
      en: ["potassium iodide", "kelp", "seaweed supplement", "iodised salt", "iodized salt"],
      tr: ["iyotlu tuz", "potasyum iyodür", "deniz yosunu takviyesi", "kelp"],
    },
    verdict: "caution",
    summary: {
      en: "You need more iodine in pregnancy, but advice differs: the UK says get it from food, the US says take a prenatal with iodine.",
      tr: "Hamilelikte daha çok iyot gerekir, ama öneriler farklı: İngiltere besinlerden, ABD iyotlu bir hamilelik vitamininden almanı önerir.",
    },
    details: {
      en: "Iodine is needed for your baby's brain development. The NHS says most people can get enough from a varied diet including dairy and fish, and warns against kelp or seaweed supplements because their iodine content can be too high. In the US, experts recommend a prenatal vitamin containing iodine, and in many countries, including Turkey, table salt is iodised.",
      tr: "İyot bebeğinin beyin gelişimi için gereklidir. NHS, çoğu kişinin süt ürünleri ve balık içeren çeşitli bir beslenmeyle yeterince alabileceğini söyler ve iyot içeriği aşırı yüksek olabileceği için deniz yosunu (kelp) takviyelerine karşı uyarır. ABD'de uzmanlar iyot içeren bir hamilelik vitamini önerir; Türkiye dahil pek çok ülkede ise sofra tuzu iyotludur.",
    },
    tips: {
      en: ["Use iodised salt, but keep your overall salt intake moderate.", "Skip kelp and seaweed supplements."],
      tr: ["İyotlu tuz kullan ama toplam tuz tüketimini ölçülü tut.", "Deniz yosunu (kelp) takviyelerinden uzak dur."],
    },
    sources: [S.nhsIodine, S.m2bIodine],
  },
  {
    id: "probiotics",
    category: "supplement",
    emoji: "🦠",
    name: { en: "Probiotics", tr: "Probiyotikler" },
    aliases: {
      en: ["probiotic", "lactobacillus", "bifidobacterium", "gut health supplement", "prebiotics"],
      tr: ["probiyotik", "laktobasil", "bağırsak sağlığı takviyesi", "prebiyotik"],
    },
    verdict: "safe",
    summary: {
      en: "Probiotic foods like yoghurt and kefir are fine, and supplements appear safe for most healthy people.",
      tr: "Yoğurt ve kefir gibi probiyotik besinler sorun değil; takviyeler de sağlıklı kişilerin çoğu için güvenli görünüyor.",
    },
    details: {
      en: "The NHS says probiotics appear to be safe for most people with a healthy immune system, but because they're classed as food rather than medicine, they don't go through the same testing. Evidence for many of the claimed benefits is limited. Choose fermented foods made with pasteurised milk, and check that supplements don't contain added herbs.",
      tr: "NHS, probiyotiklerin bağışıklık sistemi sağlıklı olan çoğu kişi için güvenli göründüğünü, ancak ilaç değil gıda sayıldıkları için aynı testlerden geçmediklerini belirtir. İddia edilen pek çok faydanın kanıtı sınırlıdır. Pastörize sütle yapılan fermente besinleri seç ve takviyelerde ilave bitki bulunmadığından emin ol.",
    },
    tips: {
      en: ["Tell your midwife about any supplements you take, including probiotics."],
      tr: ["Probiyotikler dahil kullandığın tüm takviyeleri ebene söyle."],
    },
    sources: [S.nhsProbiotics, S.nhsFoods],
  },
  {
    id: "melatonin",
    category: "supplement",
    emoji: "🌙",
    name: { en: "Melatonin", tr: "Melatonin" },
    aliases: {
      en: ["melatonin gummies", "sleep gummies", "sleep supplement", "circadin", "jet lag pills"],
      tr: ["melatonin", "uyku hapı", "uyku takviyesi", "uyku gummy", "jet lag hapı"],
    },
    verdict: "avoid",
    summary: {
      en: "Not usually recommended in pregnancy, because little is known about its effects on babies.",
      tr: "Hamilelikte genellikle önerilmez, çünkü bebekler üzerindeki etkileri hakkında çok az şey biliniyor.",
    },
    details: {
      en: "The NHS says melatonin isn't usually recommended during pregnancy because little is known about its effect on babies. Sleep problems are very common in pregnancy, and simple changes like a regular routine, a cool dark room and side-sleeping with pillows often help. If you were taking melatonin when you became pregnant, talk to your doctor about whether to carry on.",
      tr: "NHS, bebekler üzerindeki etkisi hakkında çok az şey bilindiği için melatoninin hamilelikte genellikle önerilmediğini söyler. Uyku sorunları hamilelikte çok yaygındır; düzenli bir rutin, serin ve karanlık bir oda ve yastıklarla yan yatmak gibi basit değişiklikler çoğu zaman işe yarar. Hamile kaldığında melatonin kullanıyorduysan devam edip etmemeyi doktorunla konuş.",
    },
    tips: {
      en: ["Try winding down without screens for an hour before bed."],
      tr: ["Yatmadan önceki bir saati ekransız geçirerek gevşemeyi dene."],
    },
    sources: [S.nhsMelatonin, S.m2bMelatonin],
  },
  {
    id: "herbal-supplements",
    category: "supplement",
    emoji: "🌿",
    name: { en: "Herbal supplements & remedies", tr: "Bitkisel takviyeler ve kürler" },
    aliases: {
      en: ["herbal remedies", "natural remedies", "black cohosh", "dong quai", "echinacea", "evening primrose oil", "ashwagandha", "detox tea"],
      tr: ["bitkisel takviye", "bitkisel ilaç", "aktar karışımı", "doğal kür", "detoks çayı", "ashwagandha", "çuha çiçeği yağı", "ekinezya"],
    },
    verdict: "avoid",
    summary: {
      en: "Best avoided unless your doctor or pharmacist says a specific product is OK, because 'natural' doesn't mean safe.",
      tr: "Doktorun ya da eczacın belirli bir ürünün uygun olduğunu söylemediği sürece kaçınmak en iyisi, çünkü 'doğal' güvenli demek değildir.",
    },
    details: {
      en: "Most herbal products haven't been well studied in pregnancy, and MotherToBaby notes that some have been shown to cause hormone changes or uterine contractions. The NHS warns that some remedies may be of poor quality and can contain other substances, such as lead. Mixed remedies from herbal shops (aktar) can be especially hard to check.",
      tr: "Bitkisel ürünlerin çoğu hamilelikte yeterince incelenmemiştir; MotherToBaby bazılarının hormon değişikliklerine ya da rahim kasılmalarına yol açtığının gösterildiğini belirtir. NHS, bazı ürünlerin kalitesinin düşük olabileceği ve kurşun gibi başka maddeler içerebileceği konusunda uyarır. Aktarlarda satılan karışımları kontrol etmek özellikle zordur.",
    },
    tips: {
      en: ["Show your midwife or pharmacist the label of anything you're considering.", "Avoid detox teas and weight-loss blends."],
      tr: ["Kullanmayı düşündüğün her ürünün etiketini ebene ya da eczacına göster.", "Detoks çaylarından ve zayıflama karışımlarından uzak dur."],
    },
    sources: [S.m2bHerbal, S.nhsMedicines],
  },
  {
    id: "ginger-capsules",
    category: "supplement",
    emoji: "🫚",
    name: { en: "Ginger supplements", tr: "Zencefil takviyesi" },
    aliases: {
      en: ["ginger capsules", "ginger tablets", "ginger extract", "ginger supplement"],
      tr: ["zencefil kapsülü", "zencefil tableti", "zencefil özü", "zencefil hapı"],
    },
    verdict: "caution",
    summary: {
      en: "They may help with morning sickness, but check with a pharmacist before taking them, as the NHS advises.",
      tr: "Bulantıya iyi gelebilir; ama NHS'in önerdiği gibi kullanmadan önce eczacına danış.",
    },
    details: {
      en: "The NHS says there's some evidence that ginger may reduce nausea and vomiting in pregnancy, and advises checking with a pharmacist before taking ginger supplements. MotherToBaby has information on ginger in pregnancy, and the strength of supplements varies between products. Ginger in food and drinks is a gentler place to start.",
      tr: "NHS, zencefilin hamilelikte bulantı ve kusmayı azaltabileceğine dair bazı kanıtlar olduğunu söyler ve zencefil takviyesi almadan önce eczacıya danışılmasını önerir. MotherToBaby'de hamilelikte zencefil hakkında bilgi bulunur; takviyelerin gücü de ürüne göre değişir. Yiyecek ve içeceklerdeki zencefil başlamak için daha hafif bir yoldur.",
    },
    tips: {
      en: ["If sickness stops you eating or drinking, see your doctor rather than relying on supplements."],
      tr: ["Bulantı yemeni içmeni engelliyorsa takviyelere güvenmek yerine doktoruna görün."],
    },
    sources: [S.nhsSickness, S.m2bGinger],
  },
  {
    id: "collagen",
    category: "supplement",
    emoji: "✨",
    name: { en: "Collagen supplements", tr: "Kolajen takviyesi" },
    aliases: {
      en: ["collagen powder", "collagen peptides", "beauty supplement", "hair skin nails"],
      tr: ["kolajen", "kolajen tozu", "kolajen içeceği", "saç cilt tırnak vitamini"],
    },
    verdict: "caution",
    summary: {
      en: "There's little research in pregnancy; plain collagen is probably low risk, but check blends for vitamin A, herbs or caffeine.",
      tr: "Hamilelikte az araştırılmıştır; sade kolajen büyük olasılıkla düşük risklidir, ama karışımlarda A vitamini, bitki ya da kafein var mı bak.",
    },
    details: {
      en: "Collagen is a protein, and plain collagen powder hasn't been linked to specific harms, but it hasn't been studied in pregnancy either. Many 'beauty' blends add vitamin A, biotin, herbal extracts or caffeine, and the FDA notes that supplements don't need approval before they're sold. A varied diet with enough protein supports your skin and your baby.",
      tr: "Kolajen bir proteindir; sade kolajen tozu belirli bir zararla ilişkilendirilmemiştir, ama hamilelikte incelenmemiştir de. Pek çok 'güzellik' karışımına A vitamini, biyotin, bitki özütleri ya da kafein eklenir; FDA de takviyelerin satışa çıkmadan önce onay gerektirmediğini belirtir. Yeterli protein içeren çeşitli bir beslenme hem cildini hem bebeğini destekler.",
    },
    tips: {
      en: ["If you use one, choose an unflavoured, single-ingredient product.", "Show the label to your pharmacist or midwife."],
      tr: ["Kullanacaksan aromasız, tek bileşenli bir ürün seç.", "Etiketi eczacına ya da ebene göster."],
    },
    sources: [S.fdaSupplements, S.nhsVitamins],
  },
  {
    id: "protein-powder",
    category: "supplement",
    emoji: "🥤",
    name: { en: "Protein powders & shakes", tr: "Protein tozu ve shake'ler" },
    aliases: {
      en: ["whey protein", "protein shake", "meal replacement", "plant protein", "protein bar"],
      tr: ["protein tozu", "whey protein", "protein shake", "öğün yerine geçen içecek", "bitkisel protein", "protein bar"],
    },
    verdict: "caution",
    summary: {
      en: "A plain protein powder is usually fine to top up your diet, but avoid blends with caffeine, herbs or 'fat burners'.",
      tr: "Sade bir protein tozu beslenmeni desteklemek için genellikle uygundur; ama kafein, bitki ya da 'yağ yakıcı' içeren karışımlardan kaçın.",
    },
    details: {
      en: "Most people can meet their protein needs in pregnancy with foods such as meat, fish, eggs, dairy, beans and lentils. If you use a powder, choose a simple one without added caffeine, herbal extracts or weight-loss ingredients, as the FDA doesn't approve supplements before they're sold. Meal-replacement shakes aren't designed for pregnancy.",
      tr: "Çoğu kişi hamilelikte protein ihtiyacını et, balık, yumurta, süt ürünleri, kuru baklagiller ve mercimek gibi besinlerle karşılayabilir. Toz kullanacaksan ilave kafein, bitki özütü ya da zayıflama bileşeni içermeyen sade bir ürün seç, çünkü FDA takviyeleri satışa çıkmadan önce onaylamaz. Öğün yerine geçen shake'ler hamilelik için tasarlanmamıştır.",
    },
    tips: {
      en: ["Look for third-party tested products with a short ingredient list."],
      tr: ["Bağımsız kuruluşlarca test edilmiş, içerik listesi kısa ürünleri seç."],
    },
    sources: [S.fdaSupplements, S.nhsDiet],
  },
  {
    id: "st-johns-wort",
    category: "supplement",
    emoji: "🌼",
    name: { en: "St John's wort", tr: "Sarı kantaron" },
    aliases: {
      en: ["st john's wort", "st johns wort", "hypericum", "herbal antidepressant"],
      tr: ["kantaron", "kantaron çayı", "kantaron kapsülü", "binbirdelik otu"],
    },
    verdict: "avoid",
    summary: {
      en: "Best avoided in pregnancy; if you're feeling low, talk to your doctor or midwife about treatments with more safety data.",
      tr: "Hamilelikte kaçınmak en iyisi; kendini kötü hissediyorsan güvenlik verisi daha fazla olan tedaviler için doktoruna ya da ebene danış.",
    },
    details: {
      en: "St John's wort is taken for low mood, but there's limited information on its safety in pregnancy, and it interacts with many medicines. MotherToBaby notes that herbal products aren't regulated like medicines, so their strength and contents can vary. Depression in pregnancy is common and treatable, so it's worth getting proper support.",
      tr: "Sarı kantaron moral bozukluğu için kullanılır; ancak hamilelikte güvenliği hakkında sınırlı bilgi vardır ve pek çok ilaçla etkileşir. MotherToBaby, bitkisel ürünlerin ilaçlar gibi denetlenmediğini, bu yüzden güç ve içeriklerinin değişebileceğini belirtir. Hamilelikte depresyon yaygındır ve tedavi edilebilir; gerçek destek almaya değer.",
    },
    tips: {
      en: ["Tell your doctor if you've been using it, especially alongside other medicines."],
      tr: ["Özellikle başka ilaçlarla birlikte kullandıysan doktoruna söyle."],
    },
    sources: [S.m2bStJohns, S.nhsDepression],
  },
  {
    id: "black-seed-oil",
    category: "supplement",
    emoji: "🌿",
    name: { en: "Black seed oil (çörek otu)", tr: "Çörek otu yağı" },
    aliases: {
      en: ["black seed", "nigella sativa", "black cumin oil", "kalonji", "corek otu"],
      tr: ["çörek otu", "çörekotu kapsülü", "çörekotu yağı", "nigella"],
    },
    verdict: "caution",
    summary: {
      en: "The seeds sprinkled on bread are fine, but skip black seed oil and capsules in pregnancy unless your doctor agrees.",
      tr: "Ekmek üstüne serpilen çörek otu sorun değil; ama doktorun onaylamadığı sürece hamilelikte çörek otu yağı ve kapsüllerini kullanma.",
    },
    details: {
      en: "Black seed is a common topping on simit and poğaça, and these small amounts aren't a concern. Concentrated oils and capsules provide much larger doses and, like most herbal products, haven't been well studied in pregnancy. MotherToBaby notes that some herbal products can cause uterine contractions, so medicinal amounts are best avoided.",
      tr: "Çörek otu simit ve poğaçalarda sık kullanılan bir süslemedir ve bu küçük miktarlar sorun değildir. Yoğun yağlar ve kapsüller çok daha yüksek doz sağlar ve çoğu bitkisel ürün gibi hamilelikte yeterince incelenmemiştir. MotherToBaby bazı bitkisel ürünlerin rahim kasılmalarına yol açabildiğini belirtir; bu yüzden tıbbi miktarlardan kaçınmak en iyisi.",
    },
    tips: {
      en: ["Keep it as a seasoning rather than a daily spoonful."],
      tr: ["Her gün kaşıkla içmek yerine baharat olarak kullan."],
    },
    sources: [S.m2bHerbal, S.nhsMedicines],
  },

  // ── Beauty ─────────────────────────────────────────────────────────────────

  {
    id: "hair-dye",
    category: "beauty",
    emoji: "💇‍♀️",
    name: { en: "Hair dye", tr: "Saç boyası" },
    aliases: {
      en: ["hair colour", "hair color", "permanent dye", "box dye", "hair bleach", "root touch-up", "semi-permanent dye"],
      tr: ["saç boyatmak", "kök boya", "kalıcı boya", "saç açıcı", "oksidan", "yarı kalıcı boya", "dip boya"],
    },
    verdict: "caution",
    summary: {
      en: "Generally fine, since very little dye is absorbed through the scalp, though some wait until after 12 weeks to be extra careful.",
      tr: "Genellikle sorun değil, çünkü saç derisinden çok az boya emilir; yine de bazıları ekstra önlem olarak 12. haftadan sonrasını bekler.",
    },
    details: {
      en: "The NHS says your scalp doesn't absorb much hair dye, especially if it's healthy, and some people choose to wait until after the first 12 weeks, when the risk of chemicals affecting the baby is lower. MotherToBaby notes that the amount absorbed through healthy skin is small when products are used as directed. Pregnancy can change how your hair takes colour, so results may differ.",
      tr: "NHS, özellikle sağlıklıysa saç derisinin çok az boya emdiğini söyler; bazıları kimyasalların bebeği etkileme riskinin daha düşük olduğu ilk 12 haftadan sonrasını beklemeyi tercih eder. MotherToBaby, ürünler talimatlara uygun kullanıldığında sağlıklı ciltten emilen miktarın az olduğunu belirtir. Hamilelik saçının boyayı alışını değiştirebilir, bu yüzden sonuç farklı çıkabilir.",
    },
    tips: {
      en: ["Do a strand test and a patch test first.", "Wear gloves, ventilate the room and don't leave dye on longer than instructed."],
      tr: ["Önce tutam testi ve alerji testi yap.", "Eldiven tak, odayı havalandır ve boyayı önerilenden uzun bekletme."],
    },
    sources: [S.nhsHairDye, S.m2bHairTreatments],
  },
  {
    id: "highlights",
    category: "beauty",
    emoji: "💇‍♀️",
    name: { en: "Highlights & balayage", tr: "Röfle ve balyaj" },
    aliases: {
      en: ["highlights", "lowlights", "balayage", "foils", "streaks", "ombre"],
      tr: ["röfle", "balyaj", "meç", "ombre", "folyo röfle"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, highlights are a lower-exposure option, because the colour goes on the hair rather than the scalp.",
      tr: "Evet, renk saç derisine değil saça uygulandığı için röfle daha az maruziyet içeren bir seçenektir.",
    },
    details: {
      en: "The NHS says highlighting, where dye is applied only to strands of hair, reduces any risk, because the chemicals are absorbed by the hair rather than your scalp or bloodstream. MotherToBaby agrees that techniques like highlights, lowlights and streaking don't touch the skin. Salons can be heavy with fumes, so good ventilation helps if you feel queasy.",
      tr: "NHS, boyanın yalnızca saç tutamlarına uygulandığı röflenin riski azalttığını, çünkü kimyasalların saç derisi ya da kan yerine saç tarafından emildiğini söyler. MotherToBaby de röfle ve meç gibi tekniklerde boyanın cilde temas etmediğini belirtir. Kuaförlerde koku yoğun olabilir; midende bulantı varsa iyi havalandırma yardımcı olur.",
    },
    tips: {
      en: ["Tell your stylist you're pregnant and ask for a patch test."],
      tr: ["Kuaförüne hamile olduğunu söyle ve alerji testi iste."],
    },
    sources: [S.nhsHairDye, S.m2bHairTreatments],
  },
  {
    id: "keratin-treatment",
    category: "beauty",
    emoji: "💇‍♀️",
    name: { en: "Keratin & Brazilian blowout", tr: "Keratin bakımı ve Brezilya fönü" },
    aliases: {
      en: ["keratin treatment", "brazilian blowout", "hair smoothing", "chemical straightening", "japanese straightening", "formaldehyde hair"],
      tr: ["keratin", "keratin bakımı", "brezilya fönü", "saç düzleştirme", "kalıcı fön", "formaldehitli bakım"],
    },
    verdict: "avoid",
    summary: {
      en: "Best avoided, as many smoothing treatments release formaldehyde when they're heated with straighteners.",
      tr: "Kaçınmak en iyisi, çünkü pek çok düzleştirme işlemi düzleştiriciyle ısıtıldığında formaldehit açığa çıkarır.",
    },
    details: {
      en: "The FDA warns that some hair smoothing products release formaldehyde gas when heated, even when they're labelled formaldehyde-free. MotherToBaby notes that some studies of people who work around formaldehyde have suggested a higher chance of miscarriage. The fumes are strongest in the salon chair during flat-ironing, so it's best to wait until after pregnancy.",
      tr: "FDA, bazı saç düzleştirme ürünlerinin 'formaldehitsiz' etiketli olsalar bile ısıtıldığında formaldehit gazı saldığı konusunda uyarır. MotherToBaby, formaldehite maruz kalan çalışanlarla yapılan bazı araştırmaların daha yüksek düşük olasılığına işaret ettiğini belirtir. Koku en yoğun düzleştirme sırasında koltukta olur, bu yüzden hamilelik sonrasını beklemek en iyisi.",
    },
    tips: {
      en: ["Ask for a regular blow-dry without chemicals instead."],
      tr: ["Bunun yerine kimyasal içermeyen normal bir fön iste."],
    },
    sources: [S.fdaHairSmoothing, S.m2bHairTreatments],
  },
  {
    id: "henna",
    category: "beauty",
    emoji: "🌿",
    name: { en: "Henna (kına)", tr: "Kına" },
    aliases: {
      en: ["henna", "mehndi", "henna tattoo", "black henna", "kina", "henna hair dye"],
      tr: ["kına gecesi", "kına dövmesi", "siyah kına", "saça kına", "hint kınası", "elle kına yakmak"],
    },
    verdict: "caution",
    summary: {
      en: "Pure natural henna is a gentler option, but avoid 'black henna', which can contain the harsh dye chemical PPD.",
      tr: "Saf doğal kına daha hafif bir seçenektir; ama sert bir boya kimyasalı olan PPD içerebilen 'siyah kına'dan kaçın.",
    },
    details: {
      en: "The NHS suggests a semi-permanent pure vegetable dye like henna as a gentler alternative to hair dye. The FDA warns that temporary tattoos sold as 'black henna' often contain PPD, a hair-dye chemical that isn't meant for skin and can cause allergic reactions. Natural henna stains reddish-brown, so very dark or fast-staining pastes are a warning sign.",
      tr: "NHS, saç boyasına daha hafif bir alternatif olarak kına gibi yarı kalıcı, saf bitkisel boyaları önerir. FDA, 'siyah kına' adıyla satılan geçici dövmelerin sıklıkla cilt için olmayan ve alerjik reaksiyona yol açabilen bir saç boyası kimyasalı olan PPD içerdiği konusunda uyarır. Doğal kına kızıl-kahve renk verir; çok koyu ya da çok hızlı boyayan karışımlar uyarı işaretidir.",
    },
    tips: {
      en: ["For a kına gecesi, use plain natural henna and skip dark 'black' pastes.", "Patch test first, as your skin can be more sensitive in pregnancy."],
      tr: ["Kına gecesinde sade doğal kına kullan, koyu 'siyah' karışımları atla.", "Hamilelikte cilt daha hassas olabileceği için önce küçük bir alanda dene."],
    },
    sources: [S.nhsHairDye, S.fdaHairDyes],
  },
  {
    id: "nail-polish",
    category: "beauty",
    emoji: "💅",
    name: { en: "Nail polish & gel nails", tr: "Oje ve kalıcı oje" },
    aliases: {
      en: ["nail varnish", "gel polish", "gel manicure", "shellac", "manicure", "pedicure", "nail polish remover"],
      tr: ["oje", "kalıcı oje", "jel oje", "manikür", "pedikür", "aseton", "oje çıkarıcı"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, painting your nails is fine, as long as you use products in a well-ventilated room.",
      tr: "Evet, oje sürmek sorun değil; yeter ki iyi havalandırılan bir odada kullan.",
    },
    details: {
      en: "Occasional use of nail polish and remover involves only small exposures. The FDA advises good ventilation when using nail products, and some polishes contain ingredients such as formaldehyde or toluene that some people prefer to avoid. MotherToBaby notes that the higher exposures are for salon workers who are around these products all day.",
      tr: "Ara sıra oje ve oje çıkarıcı kullanmak yalnızca küçük maruziyetler içerir. FDA tırnak ürünlerini kullanırken iyi havalandırma önerir; bazı ojeler formaldehit ya da toluen gibi bazı kişilerin kaçınmayı tercih ettiği bileşenler içerir. MotherToBaby, yüksek maruziyetin gün boyu bu ürünlerle çalışan salon çalışanları için geçerli olduğunu belirtir.",
    },
    tips: {
      en: ["Open a window, and choose formaldehyde- and toluene-free polishes if you like.", "Pick salons that are well ventilated."],
      tr: ["Pencere aç; istersen formaldehit ve toluen içermeyen ojeleri seç.", "İyi havalandırılan salonları tercih et."],
    },
    sources: [S.fdaNails, S.m2bNailSalon],
  },
  {
    id: "acrylic-nails",
    category: "beauty",
    emoji: "💅",
    name: { en: "Acrylic & dip powder nails", tr: "Protez (akrilik) tırnak" },
    aliases: {
      en: ["acrylic nails", "acrylics", "fake nails", "nail extensions", "dip powder", "polygel"],
      tr: ["protez tırnak", "akrilik tırnak", "tırnak uzatma", "jel tırnak", "dip powder", "poligel"],
    },
    verdict: "caution",
    summary: {
      en: "Probably fine occasionally, but the strong fumes are worth limiting, so choose a well-ventilated salon.",
      tr: "Ara sıra büyük olasılıkla sorun değil; ama yoğun kokuyu sınırlamakta fayda var, iyi havalandırılan bir salon seç.",
    },
    details: {
      en: "Acrylic and dip systems use methacrylate liquids, adhesives and solvents with strong smells. MotherToBaby notes that the air in nail salons can contain chemicals such as methyl methacrylate, toluene and formaldehyde, which are mainly a concern for workers exposed all day. For customers, short, well-ventilated visits keep exposure low.",
      tr: "Akrilik ve dip sistemleri, kokusu güçlü metakrilat sıvıları, yapıştırıcılar ve çözücüler kullanır. MotherToBaby, tırnak salonlarının havasında metil metakrilat, toluen ve formaldehit gibi kimyasallar bulunabildiğini ve bunların asıl olarak gün boyu maruz kalan çalışanlar için endişe yarattığını belirtir. Müşteriler için kısa ve iyi havalandırılan ziyaretler maruziyeti düşük tutar.",
    },
    tips: {
      en: ["Book quieter times and sit near an open window or extraction.", "Consider plain polish until after the birth."],
      tr: ["Sakin saatlerde randevu al ve açık bir pencerenin ya da havalandırmanın yanına otur.", "Doğuma kadar sade ojeyi düşünebilirsin."],
    },
    sources: [S.m2bNailSalon, S.fdaNails],
  },
  {
    id: "retinol",
    category: "beauty",
    emoji: "🧴",
    name: { en: "Retinol & retinoid creams", tr: "Retinol ve retinoid kremler" },
    aliases: {
      en: ["retinol", "retinal", "retinaldehyde", "retinyl palmitate", "adapalene", "differin", "anti-ageing cream", "night serum"],
      tr: ["retinol", "retinal", "retinoid", "adapalen", "differin", "yaşlanma karşıtı krem", "gece serumu"],
    },
    verdict: "avoid",
    summary: {
      en: "Best avoided in pregnancy, so swap retinol and other retinoid creams for pregnancy-friendly alternatives.",
      tr: "Hamilelikte kaçınmak en iyisi; retinol ve diğer retinoid kremleri hamilelik dostu alternatiflerle değiştir.",
    },
    details: {
      en: "Retinoids are forms of vitamin A, and retinoid tablets are known to cause birth defects. Only small amounts are absorbed from creams, but ACOG advises avoiding topical retinoids in pregnancy as a precaution, and they're found in many over-the-counter products. If you used some before you knew you were pregnant, the risk is thought to be very low, but mention it to your midwife.",
      tr: "Retinoidler A vitamininin türevleridir ve retinoid tabletlerin doğum kusurlarına yol açtığı bilinir. Kremlerden yalnızca küçük miktarlar emilir; ama ACOG önlem olarak hamilelikte topikal retinoidlerden kaçınılmasını önerir ve bunlar reçetesiz pek çok üründe bulunur. Hamile olduğunu bilmeden önce kullandıysan riskin çok düşük olduğu düşünülür, yine de ebene söyle.",
    },
    tips: {
      en: ["Check ingredient lists for retinol, retinal and retinyl.", "Azelaic acid or glycolic acid products can be pregnancy-friendly swaps."],
      tr: ["İçerik listesinde retinol, retinal ve retinil ifadelerini ara.", "Azelaik asit ya da glikolik asit içeren ürünler hamilelik dostu alternatifler olabilir."],
    },
    sources: [S.acogSkin, S.bumpsTopicalRetinoids],
  },
  {
    id: "tretinoin",
    category: "beauty",
    emoji: "🧴",
    name: { en: "Tretinoin (Retin-A)", tr: "Tretinoin (Retin-A)" },
    aliases: {
      en: ["retin-a", "tretinoin cream", "tazarotene", "prescription retinoid", "acne cream", "tri-luma"],
      tr: ["tretinoin", "retin-a", "tazaroten", "reçeteli retinoid", "akne kremi", "sivilce kremi"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid prescription retinoid creams like tretinoin in pregnancy, and ask your doctor about alternatives.",
      tr: "Tretinoin gibi reçeteli retinoid kremlerden hamilelikte kaçın; alternatifleri doktoruna sor.",
    },
    details: {
      en: "BUMPS says prescribed creams and gels containing retinoids such as tretinoin or adapalene shouldn't be used in pregnancy. While only tiny amounts usually reach the baby, some people absorb more than others, and case reports can't rule out a link with birth defects. Other acne treatments that aren't retinoids can be used instead.",
      tr: "BUMPS, tretinoin ya da adapalen gibi retinoid içeren reçeteli krem ve jellerin hamilelikte kullanılmaması gerektiğini söyler. Bebeğe genellikle çok az miktar ulaşsa da bazı kişiler daha fazla emer ve vaka bildirimleri doğum kusurlarıyla bir bağlantıyı dışlayamaz. Bunun yerine retinoid olmayan başka akne tedavileri kullanılabilir.",
    },
    tips: {
      en: ["Ask your dermatologist for a pregnancy-safe acne plan.", "If you used it before you knew you were pregnant, mention it to your midwife."],
      tr: ["Dermatoloğundan hamilelikte uygun bir akne planı iste.", "Hamile olduğunu bilmeden kullandıysan ebene söyle."],
    },
    sources: [S.bumpsTopicalRetinoids, S.m2bTretinoin],
  },
  {
    id: "salicylic-acid",
    category: "beauty",
    emoji: "🧴",
    name: { en: "Salicylic acid", tr: "Salisilik asit" },
    aliases: {
      en: ["bha", "beta hydroxy acid", "acne wash", "spot treatment", "salicylic peel", "chemical peel"],
      tr: ["bha", "akne jeli", "yüz temizleme jeli", "salisilik peeling", "kimyasal peeling", "sivilce kremi"],
    },
    verdict: "caution",
    summary: {
      en: "Low-strength cleansers and spot treatments are fine, but skip strong salicylic acid peels and large-area use.",
      tr: "Düşük oranlı temizleyiciler ve sivilce bakımları sorun değil; ama güçlü salisilik asit peelinglerini ve geniş alanlara kullanımı atla.",
    },
    details: {
      en: "ACOG lists topical salicylic acid among the over-the-counter acne ingredients that can be used in pregnancy. MotherToBaby notes that only a small amount of topical acne products is absorbed, but more can be absorbed over large areas, on broken skin or with frequent use. That's why strong professional peels are best saved for after pregnancy.",
      tr: "ACOG, topikal salisilik asidi hamilelikte kullanılabilecek reçetesiz akne bileşenleri arasında sayar. MotherToBaby, topikal akne ürünlerinden yalnızca küçük bir miktarın emildiğini, ancak geniş alanlarda, tahriş olmuş ciltte ya da sık kullanımda daha fazlasının emilebileceğini belirtir. Bu yüzden güçlü profesyonel peelingleri hamilelik sonrasına saklamak en iyisi.",
    },
    tips: {
      en: ["Use wash-off or spot products rather than all-over leave-on peels."],
      tr: ["Tüm yüze bırakılan peelingler yerine durulanan ya da noktasal ürünleri kullan."],
    },
    sources: [S.acogSkin, S.m2bTopicalAcne],
  },
  {
    id: "benzoyl-peroxide",
    category: "beauty",
    emoji: "🧴",
    name: { en: "Benzoyl peroxide", tr: "Benzoil peroksit" },
    aliases: {
      en: ["acne gel", "spot gel", "panoxyl", "acnecide", "clearasil"],
      tr: ["benzoil peroksit", "benzac", "sivilce jeli", "akne jeli"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, ACOG lists benzoyl peroxide among the acne treatments that can be used in pregnancy.",
      tr: "Evet, ACOG benzoil peroksiti hamilelikte kullanılabilecek akne tedavileri arasında sayar.",
    },
    details: {
      en: "Very little benzoyl peroxide is absorbed through the skin, and ACOG includes it in its list of over-the-counter acne ingredients that can be used in pregnancy. The NHS says it can usually be used in pregnancy but suggests checking first. It can bleach fabrics and irritate skin, so start with a lower strength.",
      tr: "Benzoil peroksit ciltten çok az emilir ve ACOG onu hamilelikte kullanılabilecek reçetesiz akne bileşenleri listesine dahil eder. NHS de genellikle hamilelikte kullanılabileceğini, ama önce danışılmasını önerir. Kumaşları ağartabilir ve cildi tahriş edebilir; düşük oranlı bir ürünle başla.",
    },
    tips: {
      en: ["Start with a low-strength product a few times a week.", "Check with your doctor or pharmacist if you're using a prescription strength."],
      tr: ["Haftada birkaç kez, düşük oranlı bir ürünle başla.", "Reçeteli güçte bir ürün kullanıyorsan doktoruna ya da eczacına danış."],
    },
    sources: [S.acogSkin, S.nhsBenzoylPeroxide],
  },
  {
    id: "azelaic-acid",
    category: "beauty",
    emoji: "🧴",
    name: { en: "Azelaic acid", tr: "Azelaik asit" },
    aliases: {
      en: ["finacea", "skinoren", "rosacea cream", "pigmentation cream", "acne cream"],
      tr: ["azelaik asit", "skinoren", "leke kremi", "rozasea kremi", "sivilce izi kremi"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, azelaic acid is one of the acne treatments that can be used in pregnancy.",
      tr: "Evet, azelaik asit hamilelikte kullanılabilen akne tedavilerinden biridir.",
    },
    details: {
      en: "ACOG lists azelaic acid among the over-the-counter acne ingredients that can be used in pregnancy, and Mayo Clinic mentions it as an option for pregnancy acne. Very little is absorbed through the skin. Using daily sunscreen alongside it helps stop pregnancy-related dark patches from getting worse.",
      tr: "ACOG azelaik asidi hamilelikte kullanılabilecek reçetesiz akne bileşenleri arasında sayar; Mayo Clinic de onu hamilelik aknesi için bir seçenek olarak anar. Ciltten çok az emilir. Yanında her gün güneş kremi kullanmak, hamileliğe bağlı koyu lekelerin artmasını önlemeye yardım eder.",
    },
    tips: {
      en: ["Pair it with daily sunscreen to protect against pregnancy dark patches (melasma)."],
      tr: ["Hamilelik lekelerine (melazma) karşı her gün güneş kremiyle birlikte kullan."],
    },
    sources: [S.acogSkin, S.mayoAcne],
  },
  {
    id: "glycolic-acid",
    category: "beauty",
    emoji: "🧴",
    name: { en: "Glycolic acid & AHA peels", tr: "Glikolik asit ve AHA peelingleri" },
    aliases: {
      en: ["glycolic acid", "aha", "alpha hydroxy acid", "lactic acid", "exfoliating toner", "chemical peel"],
      tr: ["glikolik asit", "aha", "laktik asit", "peeling tonik", "kimyasal peeling", "peeling"],
    },
    verdict: "caution",
    summary: {
      en: "Everyday glycolic acid products are fine, but save strong professional chemical peels for after pregnancy.",
      tr: "Günlük glikolik asit ürünleri sorun değil; ama güçlü profesyonel kimyasal peelingleri hamilelik sonrasına sakla.",
    },
    details: {
      en: "ACOG lists glycolic acid among the over-the-counter skin ingredients that can be used in pregnancy. Absorption through the skin is low, but MotherToBaby notes that more is absorbed when products are used over large areas, often, or on irritated skin. Pregnancy skin can also be more sensitive, so patch test first.",
      tr: "ACOG glikolik asidi hamilelikte kullanılabilecek reçetesiz cilt bileşenleri arasında sayar. Ciltten emilim düşüktür; ama MotherToBaby ürünler geniş alanlarda, sık ya da tahriş olmuş ciltte kullanıldığında daha fazla emilim olduğunu belirtir. Hamilelikte cilt daha hassas olabilir, bu yüzden önce küçük bir alanda dene.",
    },
    tips: {
      en: ["Use AHAs a few nights a week, and always wear sunscreen the next day."],
      tr: ["AHA'ları haftada birkaç gece kullan ve ertesi gün mutlaka güneş kremi sür."],
    },
    sources: [S.acogSkin, S.m2bTopicalAcne],
  },
  {
    id: "vitamin-c-serum",
    category: "beauty",
    emoji: "🍊",
    name: { en: "Vitamin C serum", tr: "C vitamini serumu" },
    aliases: {
      en: ["vitamin c", "ascorbic acid serum", "brightening serum", "antioxidant serum"],
      tr: ["c vitamini", "askorbik asit", "aydınlatıcı serum", "antioksidan serum"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, vitamin C serums are fine in pregnancy and can be part of a gentle skincare routine.",
      tr: "Evet, C vitamini serumları hamilelikte sorun değil ve nazik bir cilt bakımının parçası olabilir.",
    },
    details: {
      en: "Vitamin C is an everyday nutrient, and only a small amount is absorbed through the skin from a serum. It isn't on any list of skincare ingredients to avoid in pregnancy. Combined with daily sunscreen, it can be part of a routine to manage the dark patches (melasma) that pregnancy can bring.",
      tr: "C vitamini günlük bir besin öğesidir ve serumdan ciltten yalnızca küçük bir miktar emilir. Hamilelikte kaçınılması gereken cilt bakım bileşenleri listelerinde yer almaz. Günlük güneş kremiyle birlikte, hamileliğin getirebileceği koyu lekelerle (melazma) başa çıkma rutininin parçası olabilir.",
    },
    tips: {
      en: ["Check that 'brightening' or 'anti-ageing' serums don't also contain retinol."],
      tr: ["'Aydınlatıcı' ya da 'yaşlanma karşıtı' serumların retinol içermediğinden emin ol."],
    },
    sources: [S.acogSkin, S.m2bVitaminC],
  },
  {
    id: "hyaluronic-acid",
    category: "beauty",
    emoji: "💧",
    name: { en: "Hyaluronic acid", tr: "Hyalüronik asit" },
    aliases: {
      en: ["hydrating serum", "moisturiser", "moisturizer", "sodium hyaluronate", "stretch mark cream"],
      tr: ["hyalüronik asit", "nemlendirici serum", "nemlendirici", "sodyum hyalüronat", "çatlak kremi"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, hyaluronic acid serums and moisturisers are fine to use in pregnancy.",
      tr: "Evet, hyalüronik asitli serumlar ve nemlendiriciler hamilelikte kullanılabilir.",
    },
    details: {
      en: "Hyaluronic acid is a moisturising ingredient that's naturally found in skin, and it isn't on any list of skincare ingredients to avoid in pregnancy. ACOG notes that moisturisers can help keep skin soft, though no cream has been shown to prevent stretch marks. Injectable hyaluronic acid fillers are a different matter.",
      tr: "Hyalüronik asit, ciltte doğal olarak bulunan nemlendirici bir bileşendir ve hamilelikte kaçınılması gereken cilt bakım bileşenleri listelerinde yer almaz. ACOG, nemlendiricilerin cildi yumuşak tutmaya yardım edebileceğini, ama hiçbir kremin çatlakları önlediğinin gösterilmediğini belirtir. Enjeksiyonla yapılan hyalüronik asit dolguları ise farklı bir konudur.",
    },
    tips: {
      en: ["Injectable fillers are best postponed until after pregnancy."],
      tr: ["Enjeksiyonla yapılan dolguları hamilelik sonrasına ertelemek en iyisi."],
    },
    sources: [S.acogSkin],
  },
  {
    id: "sunscreen",
    category: "beauty",
    emoji: "🧴",
    name: { en: "Sunscreen", tr: "Güneş kremi" },
    aliases: {
      en: ["sun cream", "spf", "mineral sunscreen", "zinc oxide", "titanium dioxide", "sunblock"],
      tr: ["spf", "mineral filtreli güneş kremi", "çinko oksit", "titanyum dioksit", "güneş koruyucu"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, use it every day, as sunscreen helps stop the dark patches (melasma) that pregnancy can trigger.",
      tr: "Evet, her gün kullan; güneş kremi hamileliğin tetikleyebileceği koyu lekelerin (melazma) önlenmesine yardım eder.",
    },
    details: {
      en: "Pregnancy hormones can cause melasma, brown patches on the face, and ACOG recommends sunscreen and a wide-brimmed hat every day outdoors to stop it getting worse. Mineral sunscreens with zinc oxide or titanium dioxide are a good option if your skin is sensitive. Reapply as directed, especially after sweating or swimming.",
      tr: "Hamilelik hormonları yüzde kahverengi lekeler olan melazmaya yol açabilir; ACOG bunun artmaması için dışarıdayken her gün güneş kremi ve geniş kenarlı şapka önerir. Cildin hassassa çinko oksit ya da titanyum dioksit içeren mineral filtreli güneş kremleri iyi bir seçenektir. Özellikle terledikten ya da yüzdükten sonra talimatlara göre yeniden sür.",
    },
    tips: {
      en: ["Choose a broad-spectrum, high-SPF sunscreen and add a wide-brimmed hat."],
      tr: ["Geniş spektrumlu, yüksek SPF'li bir güneş kremi seç ve geniş kenarlı bir şapka ekle."],
    },
    sources: [S.acogSkin, S.fdaSunscreen],
  },
  {
    id: "self-tanner",
    category: "beauty",
    emoji: "🧴",
    name: { en: "Self-tanner & spray tan", tr: "Bronzlaştırıcı losyon ve sprey" },
    aliases: {
      en: ["fake tan", "self tan", "spray tan", "tanning lotion", "tanning mousse", "tanning drops"],
      tr: ["bronzlaştırıcı", "sahte bronzluk", "sprey bronzlaştırıcı", "bronzlaştırıcı losyon", "bronzlaştırıcı köpük"],
    },
    verdict: "caution",
    summary: {
      en: "Self-tan lotions are considered low risk, but avoid breathing in spray tans, so lotions are the better choice.",
      tr: "Bronzlaştırıcı losyonlar düşük riskli kabul edilir; ama sprey bronzlaştırıcıyı solumaktan kaçın, losyon daha iyi bir seçimdir.",
    },
    details: {
      en: "The active ingredient in sunless tanners, DHA, stays mostly on the skin's surface, and MotherToBaby notes that less than 1% is absorbed. However, DHA isn't approved for inhalation or for use near the eyes and lips, so spray-tan booths and mists are harder to control. Self-tan doesn't protect you from the sun.",
      tr: "Bronzlaştırıcılardaki etken madde DHA çoğunlukla cilt yüzeyinde kalır ve MotherToBaby emilen miktarın %1'den az olduğunu belirtir. Ancak DHA'nın solunması ya da göz ve dudak çevresinde kullanılması onaylı değildir; bu yüzden sprey kabinleri ve buğular daha zor kontrol edilir. Bronzlaştırıcılar seni güneşten korumaz.",
    },
    tips: {
      en: ["Choose a lotion or mousse and apply it in a ventilated room.", "If you do have a spray tan, ask for eye, nose and lip protection."],
      tr: ["Losyon ya da köpük seç ve havalandırılan bir odada uygula.", "Yine de sprey yaptırırsan göz, burun ve dudak koruması iste."],
    },
    sources: [S.m2bSunlessTanners, S.fdaSunless],
  },
  {
    id: "sunbeds",
    category: "beauty",
    emoji: "☀️",
    name: { en: "Sunbeds & tanning salons", tr: "Solaryum" },
    aliases: {
      en: ["sunbed", "tanning bed", "solarium", "tanning salon", "sunlamp"],
      tr: ["solaryum", "bronzlaşma yatağı", "solaryum kabini", "ultraviyole lamba"],
    },
    verdict: "avoid",
    summary: {
      en: "Best avoided: sunbeds carry skin cancer risks for anyone, and in pregnancy they add overheating and darker patches.",
      tr: "Kaçınmak en iyisi: solaryum herkes için cilt kanseri riski taşır; hamilelikte buna aşırı ısınma ve koyu lekeler de eklenir.",
    },
    details: {
      en: "The NHS says sunbeds can be more dangerous than natural sunlight because they use a concentrated source of UV radiation, and the advice is not to use them at all. In pregnancy, the heat can also push up your body temperature, which MotherToBaby says is worth limiting. UV exposure can make pregnancy-related dark patches (melasma) worse.",
      tr: "NHS, yoğunlaştırılmış bir UV kaynağı kullandıkları için solaryumların doğal güneş ışığından daha tehlikeli olabileceğini ve hiç kullanılmamaları gerektiğini söyler. Hamilelikte sıcaklık vücut ısını da yükseltebilir; MotherToBaby bunun sınırlanması gerektiğini belirtir. UV ışınları hamileliğe bağlı koyu lekeleri (melazma) de artırabilir.",
    },
    tips: {
      en: ["Try a self-tan lotion instead for a safer glow."],
      tr: ["Daha güvenli bir bronzluk için bunun yerine bronzlaştırıcı losyon dene."],
    },
    sources: [S.nhsSun, S.m2bHyperthermia],
  },
  {
    id: "waxing",
    category: "beauty",
    emoji: "🦵",
    name: { en: "Waxing (ağda)", tr: "Ağda" },
    aliases: {
      en: ["bikini wax", "sugaring", "hair removal", "threading", "tweezing", "shaving", "epilator"],
      tr: ["sir ağda", "şeker ağda", "bikini ağda", "iple alma", "cımbız", "tıraş", "epilatör"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, ACOG says tweezing, waxing and shaving are safe ways to remove hair in pregnancy.",
      tr: "Evet, ACOG cımbız, ağda ve tıraşın hamilelikte güvenli tüy alma yöntemleri olduğunu söyler.",
    },
    details: {
      en: "Pregnancy hormones can make hair grow faster or in new places, and ACOG says it's safe to use tweezing, waxing and shaving during pregnancy. Your skin may be more sensitive than usual, so waxing can sting more. Avoid waxing over varicose veins, broken skin or rashes.",
      tr: "Hamilelik hormonları tüylerin daha hızlı ya da yeni yerlerde çıkmasına yol açabilir; ACOG hamilelikte cımbız, ağda ve tıraşın güvenle kullanılabileceğini söyler. Cildin her zamankinden hassas olabilir, bu yüzden ağda daha çok acıtabilir. Varisli damarların, açık yaraların ya da döküntülerin üzerine ağda yapma.",
    },
    tips: {
      en: ["Test a small patch first, as sensitivity can change in pregnancy.", "Check the temperature of hot wax first to avoid burns."],
      tr: ["Hamilelikte hassasiyet değişebileceği için önce küçük bir alanda dene.", "Yanık olmaması için sıcak ağdanın ısısını önce kontrol et."],
    },
    sources: [S.acogSkin],
  },
  {
    id: "laser-hair-removal",
    category: "beauty",
    emoji: "✨",
    name: { en: "Laser hair removal", tr: "Lazer epilasyon" },
    aliases: {
      en: ["laser epilation", "ipl", "diode laser", "alexandrite laser", "laser hair"],
      tr: ["lazer epilasyon", "ipl", "buz lazer", "diode lazer", "aleksandrit lazer"],
    },
    verdict: "avoid",
    summary: {
      en: "Best postponed, as there's little safety data in pregnancy and shaving, waxing or tweezing are recommended instead.",
      tr: "Ertelemek en iyisi; hamilelikte güvenlik verisi çok az ve bunun yerine tıraş, ağda ya da cımbız öneriliyor.",
    },
    details: {
      en: "Laser and IPL hair removal haven't been studied in pregnancy. ACOG lists tweezing, waxing and shaving as safe ways to remove unwanted hair during pregnancy. Extra hair growth from pregnancy usually settles within about 6 months of the birth, so waiting may also save you sessions.",
      tr: "Lazer ve IPL ile tüy alma hamilelikte araştırılmamıştır. ACOG, hamilelikte istenmeyen tüyleri almak için cımbız, ağda ve tıraşın güvenli yollar olduğunu belirtir. Hamilelikte artan tüylenme genellikle doğumdan sonraki yaklaşık 6 ay içinde normale döner; beklemek seans sayısından da tasarruf ettirebilir.",
    },
    tips: {
      en: ["Pause your course of treatment and pick it up again after the birth."],
      tr: ["Devam eden seanslarına ara ver ve doğumdan sonra kaldığın yerden devam et."],
    },
    sources: [S.acogSkin],
  },
  {
    id: "botox-fillers",
    category: "beauty",
    emoji: "💉",
    name: { en: "Botox & fillers", tr: "Botoks ve dolgu" },
    aliases: {
      en: ["botox", "botulinum toxin", "dermal fillers", "lip filler", "hyaluronic acid filler", "anti-wrinkle injections"],
      tr: ["botoks", "dolgu", "dudak dolgusu", "yüz dolgusu", "hyalüronik asit dolgusu", "kırışıklık iğnesi"],
    },
    verdict: "avoid",
    summary: {
      en: "Best postponed: cosmetic Botox isn't recommended in pregnancy, and fillers haven't been shown to be safe.",
      tr: "Ertelemek en iyisi: kozmetik botoks hamilelikte önerilmez, dolguların da güvenli olduğu gösterilmemiştir.",
    },
    details: {
      en: "BUMPS says that, as a precaution, cosmetic Botox treatments aren't recommended in pregnancy because they have no medical benefit, even though no risks have been identified. The FDA states that the safety of dermal fillers during pregnancy is unknown. Botox used for medical reasons, such as severe migraine, is a separate decision for your doctor.",
      tr: "BUMPS, herhangi bir risk saptanmamış olsa da tıbbi bir faydası olmadığı için önlem olarak kozmetik botoks uygulamalarının hamilelikte önerilmediğini söyler. FDA, dermal dolguların hamilelikte güvenliğinin bilinmediğini belirtir. Şiddetli migren gibi tıbbi nedenlerle yapılan botoks ise doktorunun vereceği ayrı bir karardır.",
    },
    tips: {
      en: ["If you had a treatment before you knew you were pregnant, mention it to your midwife."],
      tr: ["Hamile olduğunu bilmeden önce uygulama yaptırdıysan ebene söyle."],
    },
    sources: [S.bumpsBotox, S.fdaFillers],
  },
  {
    id: "teeth-whitening",
    category: "beauty",
    emoji: "🦷",
    name: { en: "Teeth whitening", tr: "Diş beyazlatma" },
    aliases: {
      en: ["tooth bleaching", "whitening strips", "whitening kit", "laser whitening", "whitening toothpaste"],
      tr: ["diş beyazlatma", "beyazlatma bandı", "diş beyazlatma kiti", "lazerle beyazlatma", "beyazlatıcı diş macunu"],
    },
    verdict: "avoid",
    summary: {
      en: "Best postponed until after pregnancy, as the NHS notes whitening may not be suitable while you're pregnant.",
      tr: "Hamilelik sonrasına ertelemek en iyisi; NHS hamilelikte beyazlatmanın uygun olmayabileceğini belirtir.",
    },
    details: {
      en: "The NHS lists pregnancy and breastfeeding among the reasons teeth whitening may not be suitable. It's a cosmetic treatment with no medical benefit, and pregnancy can make gums more sensitive. Regular check-ups and cleaning are still important, so keep up your dental care.",
      tr: "NHS, hamileliği ve emzirmeyi diş beyazlatmanın uygun olmayabileceği durumlar arasında sayar. Tıbbi faydası olmayan kozmetik bir işlemdir ve hamilelik diş etlerini daha hassas hale getirebilir. Düzenli kontroller ve temizlik yine de önemlidir, diş bakımını sürdür.",
    },
    tips: {
      en: ["Keep up regular dental check-ups, and tell your dentist you're pregnant."],
      tr: ["Düzenli diş kontrollerine devam et ve diş hekimine hamile olduğunu söyle."],
    },
    sources: [S.nhsTeethWhitening],
  },
  {
    id: "perfume",
    category: "beauty",
    emoji: "🌸",
    name: { en: "Perfume & fragrance", tr: "Parfüm ve kolonya" },
    aliases: {
      en: ["perfume", "fragrance", "body spray", "eau de toilette", "scented products", "deodorant"],
      tr: ["parfüm", "deodorant", "vücut spreyi", "kolonya", "kokulu ürünler"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, everyday perfume is fine, though you may find strong scents harder to tolerate.",
      tr: "Evet, günlük parfüm kullanımı sorun değil; sadece yoğun kokulara tahammülün azalabilir.",
    },
    details: {
      en: "BUMPS notes that the small amounts of essential oils in everyday perfumes, cosmetics and toiletries are very unlikely to harm a baby. Many people develop a stronger sense of smell in pregnancy, and some fragrances can trigger nausea or headaches. The FDA notes that fragrance ingredients can cause allergic reactions in some people.",
      tr: "BUMPS, günlük parfüm, kozmetik ve banyo ürünlerindeki küçük miktarlarda uçucu yağın bebeğe zarar vermesinin çok olası olmadığını belirtir. Pek çok kişinin hamilelikte koku alma duyusu güçlenir ve bazı kokular bulantı ya da baş ağrısını tetikleyebilir. FDA, koku bileşenlerinin bazı kişilerde alerjik reaksiyonlara yol açabildiğini belirtir.",
    },
    tips: {
      en: ["Spray it on clothes rather than skin if your skin feels sensitive."],
      tr: ["Cildin hassaslaştıysa parfümü cilde değil kıyafetlerine sık."],
    },
    sources: [S.bumpsEssentialOils, S.fdaFragrance],
  },
  {
    id: "essential-oils",
    category: "beauty",
    emoji: "🌿",
    name: { en: "Essential oils & aromatherapy", tr: "Uçucu yağlar ve aromaterapi" },
    aliases: {
      en: ["essential oils", "aromatherapy", "diffuser", "lavender oil", "peppermint oil", "eucalyptus oil", "tea tree oil", "clary sage"],
      tr: ["uçucu yağ", "esansiyel yağ", "aromaterapi", "difüzör", "lavanta yağı", "nane yağı", "okaliptüs yağı", "çay ağacı yağı"],
    },
    verdict: "caution",
    summary: {
      en: "Diluted oils in massage or a diffuser are generally fine, but never swallow them or use them undiluted on skin.",
      tr: "Masajda ya da difüzörde seyreltilmiş yağlar genellikle uygundur; ama asla yutma ya da cilde seyreltmeden sürme.",
    },
    details: {
      en: "BUMPS says diluted essential oils are commonly used in pregnancy massage without problems, but a few specific oils are best avoided at any stage because of a theoretical risk of contractions. Undiluted oils can irritate skin and are toxic if swallowed. The NHS advises telling your midwife if you use aromatherapy and seeing a qualified practitioner.",
      tr: "BUMPS, seyreltilmiş uçucu yağların hamilelik masajında yaygın olarak sorunsuz kullanıldığını, ancak kasılma yapabileceğine dair teorik bir risk nedeniyle birkaç yağın hamileliğin hiçbir döneminde kullanılmaması gerektiğini belirtir. Seyreltilmemiş yağlar cildi tahriş edebilir ve yutulursa zehirlidir. NHS aromaterapi kullanıyorsan ebene söylemeni ve kalifiye bir uygulayıcıya gitmeni önerir.",
    },
    tips: {
      en: ["Tell your massage therapist or aromatherapist that you're pregnant.", "Keep bottles away from children, as swallowing even small amounts is dangerous."],
      tr: ["Masöre ya da aromaterapiste hamile olduğunu söyle.", "Şişeleri çocuklardan uzak tut; az miktarını yutmak bile tehlikelidir."],
    },
    sources: [S.bumpsEssentialOils, S.nhsMedicines],
  },
  {
    id: "tattoos-piercings",
    category: "beauty",
    emoji: "🎨",
    name: { en: "Tattoos & piercings", tr: "Dövme ve piercing" },
    aliases: {
      en: ["tattoo", "piercing", "belly button piercing", "microblading", "permanent makeup", "cosmetic tattoo"],
      tr: ["dövme", "piercing", "göbek piercingi", "kalıcı makyaj", "microblading", "kaş kontürü", "dudak renklendirme"],
    },
    verdict: "avoid",
    summary: {
      en: "Best postponed until after the birth, mainly because of the infection risk from needles and inks.",
      tr: "Doğum sonrasına ertelemek en iyisi; bunun başlıca nedeni iğne ve mürekkeplerden kaynaklanan enfeksiyon riski.",
    },
    details: {
      en: "Tattoos, permanent make-up and piercings haven't been studied in pregnancy. The FDA warns that unsterile equipment and contaminated inks can cause infections, and the NHS notes that infections such as hepatitis B, hepatitis C and HIV spread through contact with infected blood and can be passed to a baby. New piercings near the bump can also become uncomfortable as it grows.",
      tr: "Dövme, kalıcı makyaj ve piercing hamilelikte araştırılmamıştır. FDA, steril olmayan ekipman ve kirlenmiş mürekkeplerin enfeksiyona yol açabileceği konusunda uyarır; NHS de hepatit B, hepatit C ve HIV gibi enfeksiyonların enfekte kanla temasla bulaştığını ve bebeğe geçebildiğini belirtir. Karnın yakınındaki yeni piercingler de karın büyüdükçe rahatsız edici hale gelebilir.",
    },
    tips: {
      en: ["If you had one done before you knew you were pregnant, tell your midwife so they can check for infection."],
      tr: ["Hamile olduğunu bilmeden yaptırdıysan ebene söyle; enfeksiyon açısından kontrol edebilir."],
    },
    sources: [S.fdaTattoos, S.nhsInfections],
  },

  // ── Activity ───────────────────────────────────────────────────────────────

  {
    id: "walking",
    category: "activity",
    emoji: "🚶‍♀️",
    name: { en: "Walking", tr: "Yürüyüş" },
    aliases: {
      en: ["walk", "brisk walking", "hiking", "nordic walking", "steps"],
      tr: ["yürümek", "tempolu yürüyüş", "doğa yürüyüşü", "adım"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, walking is one of the best exercises in pregnancy and is easy on your joints.",
      tr: "Evet, yürüyüş hamilelikteki en iyi egzersizlerden biridir ve eklemlerini yormaz.",
    },
    details: {
      en: "The NHS and ACOG recommend about 150 minutes of moderate activity a week in pregnancy, and brisk walking is a simple way to get there. Moderate means you can talk but not sing. Regular activity may lower the risk of gestational diabetes and pre-eclampsia and can help with sleep and mood.",
      tr: "NHS ve ACOG hamilelikte haftada yaklaşık 150 dakika orta yoğunlukta aktivite önerir; tempolu yürüyüş buna ulaşmanın basit bir yoludur. Orta yoğunluk, konuşabildiğin ama şarkı söyleyemediğin tempo demektir. Düzenli aktivite gebelik şekeri ve preeklampsi riskini azaltabilir; uykuya ve ruh haline de iyi gelir.",
    },
    tips: {
      en: ["Wear supportive shoes and take water with you.", "Short walks spread over the day count too."],
      tr: ["Destekleyici ayakkabı giy ve yanına su al.", "Güne yayılmış kısa yürüyüşler de sayılır."],
    },
    sources: [S.nhsExercise, S.acogExercise],
  },
  {
    id: "running",
    category: "activity",
    emoji: "🏃‍♀️",
    name: { en: "Running & jogging", tr: "Koşu" },
    aliases: {
      en: ["running", "jogging", "treadmill", "parkrun", "marathon training"],
      tr: ["koşmak", "hafif koşu", "koşu bandı", "maraton antrenmanı"],
    },
    verdict: "caution",
    summary: {
      en: "If you ran before pregnancy, you can usually keep going at a comfortable pace, but don't start running now.",
      tr: "Hamilelikten önce koşuyorsan genellikle rahat bir tempoda devam edebilirsin; ama koşuya şimdi başlama.",
    },
    details: {
      en: "ACOG says experienced runners may be able to keep running in pregnancy with their ob-gyn's agreement, while the NHS advises against starting a new vigorous activity such as running. As your bump grows, your balance shifts and your joints loosen, so many people switch to brisk walking later on. Stop if you feel pain, dizziness or leak fluid.",
      tr: "ACOG, deneyimli koşucuların doktorlarının onayıyla hamilelikte koşmaya devam edebileceğini söylerken NHS koşu gibi yeni ve yoğun bir aktiviteye başlanmamasını önerir. Karnın büyüdükçe dengen değişir ve eklemlerin gevşer; bu yüzden pek çok kişi ilerleyen haftalarda tempolu yürüyüşe geçer. Ağrı, baş dönmesi ya da sıvı gelmesi olursa dur.",
    },
    tips: {
      en: ["Run at a pace where you can still hold a conversation.", "Avoid running in the heat and drink plenty of water."],
      tr: ["Hâlâ sohbet edebileceğin bir tempoda koş.", "Sıcakta koşma ve bol su iç."],
    },
    sources: [S.nhsExercise, S.acogExercise],
  },
  {
    id: "swimming",
    category: "activity",
    emoji: "🏊‍♀️",
    name: { en: "Swimming", tr: "Yüzme" },
    aliases: {
      en: ["swim", "aqua aerobics", "aquanatal", "water aerobics", "pool"],
      tr: ["yüzmek", "su aerobiği", "havuz", "hamile su egzersizi"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, swimming is ideal in pregnancy, because the water supports your weight and eases pressure on your joints.",
      tr: "Evet, yüzme hamilelik için idealdir, çünkü su ağırlığını taşır ve eklemlerindeki baskıyı hafifletir.",
    },
    details: {
      en: "ACOG lists swimming and water workouts among the safest exercises in pregnancy, and the NHS notes that water relieves pressure on your muscles and joints. Aquanatal classes are designed for pregnancy. Avoid diving or jumping in, and choose comfortably cool pools rather than very warm ones.",
      tr: "ACOG yüzme ve su egzersizlerini hamilelikteki en güvenli egzersizler arasında sayar; NHS de suyun kaslarındaki ve eklemlerindeki baskıyı hafiflettiğini belirtir. Hamilelere özel su egzersizi sınıfları da vardır. Suya atlama ya da dalış yapma; çok ılık havuzlar yerine rahat serinlikteki havuzları seç.",
    },
    tips: {
      en: ["Use the steps rather than jumping in.", "Take care on slippery poolside floors."],
      tr: ["Atlamak yerine merdiveni kullan.", "Havuz kenarındaki kaygan zeminlere dikkat et."],
    },
    sources: [S.nhsExercise, S.acogExercise],
  },
  {
    id: "yoga",
    category: "activity",
    emoji: "🧘‍♀️",
    name: { en: "Prenatal yoga", tr: "Hamile yogası" },
    aliases: {
      en: ["yoga", "pregnancy yoga", "prenatal yoga", "stretching", "breathing exercises"],
      tr: ["yoga", "hamile yogası", "doğum öncesi yoga", "esneme", "nefes egzersizi"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, especially prenatal classes, but avoid hot yoga and long spells lying flat on your back later on.",
      tr: "Evet, özellikle hamilelere özel derslerde; ama sıcak yogadan ve ilerleyen haftalarda uzun süre sırt üstü yatmaktan kaçın.",
    },
    details: {
      en: "ACOG says modified yoga reduces stress, improves flexibility and encourages focused breathing, and prenatal classes adapt poses to your changing balance. Avoid poses that keep you still or flat on your back for long periods, and don't overstretch, as pregnancy hormones loosen your joints. The NHS suggests prenatal yoga can help ease back pain.",
      tr: "ACOG, uyarlanmış yoganın stresi azalttığını, esnekliği artırdığını ve bilinçli nefesi desteklediğini söyler; hamile yogası dersleri de pozları değişen dengene göre uyarlar. Uzun süre hareketsiz ya da sırt üstü kalınan pozlardan kaçın ve aşırı esneme, çünkü hamilelik hormonları eklemlerini gevşetir. NHS hamile yogasının bel ağrısını hafifletebileceğini belirtir.",
    },
    tips: {
      en: ["Tell your teacher you're pregnant and how many weeks you are."],
      tr: ["Hocana hamile olduğunu ve kaç haftalık olduğunu söyle."],
    },
    sources: [S.acogExercise, S.nhsBackPain],
  },
  {
    id: "hot-yoga",
    category: "activity",
    emoji: "🔥",
    name: { en: "Hot yoga & hot Pilates", tr: "Sıcak yoga ve sıcak pilates" },
    aliases: {
      en: ["bikram", "bikram yoga", "hot pilates", "heated yoga", "infrared yoga"],
      tr: ["bikram yoga", "sıcak yoga", "sıcak pilates", "ısıtılmış salonda yoga"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid it, because exercising in a heated room can raise your body temperature too much.",
      tr: "Kaçın, çünkü ısıtılmış bir salonda egzersiz yapmak vücut ısını fazla yükseltebilir.",
    },
    details: {
      en: "ACOG specifically advises avoiding hot yoga and hot Pilates in pregnancy because they can cause overheating. MotherToBaby notes that a high body temperature in early pregnancy has been linked to a small increase in the chance of neural tube defects. Regular, room-temperature prenatal yoga gives you the same benefits.",
      tr: "ACOG, aşırı ısınmaya yol açabilecekleri için hamilelikte sıcak yoga ve sıcak pilatesten kaçınılmasını özellikle önerir. MotherToBaby, erken hamilelikte yüksek vücut ısısının nöral tüp defektleri olasılığında küçük bir artışla ilişkilendirildiğini belirtir. Normal sıcaklıktaki hamile yogası aynı faydaları sağlar.",
    },
    tips: {
      en: ["Switch to a regular prenatal class in a cool, airy room."],
      tr: ["Serin ve havadar bir salonda normal bir hamile yogası dersine geç."],
    },
    sources: [S.acogExercise, S.m2bHyperthermia],
  },
  {
    id: "pilates",
    category: "activity",
    emoji: "🤸‍♀️",
    name: { en: "Pilates", tr: "Pilates" },
    aliases: {
      en: ["pilates", "reformer pilates", "mat pilates", "core workout", "prenatal pilates"],
      tr: ["pilates", "reformer pilates", "mat pilates", "hamile pilatesi", "core çalışması"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, modified or prenatal Pilates is one of the exercises ACOG considers safest in pregnancy.",
      tr: "Evet, uyarlanmış ya da hamilelere özel pilates ACOG'un hamilelikte en güvenli saydığı egzersizler arasındadır.",
    },
    details: {
      en: "ACOG includes modified Pilates among the safest forms of exercise in pregnancy, and prenatal classes adapt moves to your shifting balance. Avoid exercises that keep you lying flat on your back for long periods, especially later on. Skip intense abdominal crunches, and stop if anything causes pain.",
      tr: "ACOG uyarlanmış pilatesi hamilelikteki en güvenli egzersiz türleri arasında sayar; hamilelere özel dersler hareketleri değişen dengene göre uyarlar. Özellikle ilerleyen haftalarda uzun süre sırt üstü yatmanı gerektiren egzersizlerden kaçın. Yoğun mekik çalışmalarını atla ve herhangi bir hareket ağrı yaparsa dur.",
    },
    tips: {
      en: ["Choose an instructor trained in pregnancy Pilates."],
      tr: ["Hamile pilatesi konusunda eğitimli bir eğitmen seç."],
    },
    sources: [S.acogExercise],
  },
  {
    id: "weight-lifting",
    category: "activity",
    emoji: "🏋️‍♀️",
    name: { en: "Weight lifting & strength training", tr: "Ağırlık ve kuvvet çalışması" },
    aliases: {
      en: ["weights", "gym", "strength training", "resistance training", "squats", "deadlifts", "crossfit"],
      tr: ["ağırlık kaldırma", "spor salonu", "fitness", "kuvvet antrenmanı", "squat", "deadlift", "crossfit"],
    },
    verdict: "caution",
    summary: {
      en: "Yes, strength training is encouraged, but use moderate weights, avoid straining and adapt moves as your bump grows.",
      tr: "Evet, kuvvet çalışması önerilir; ama orta ağırlıklar kullan, zorlanmaktan kaçın ve karnın büyüdükçe hareketleri uyarla.",
    },
    details: {
      en: "The NHS recommends 2 muscle-strengthening sessions a week, including gym strength training if you already do it. ACOG advises avoiding jerky, high-impact movements because pregnancy hormones loosen your joints, and avoiding lying flat on your back for long periods. Holding your breath while straining and lifting very heavy loads are best avoided.",
      tr: "NHS haftada 2 kas güçlendirme seansı önerir; zaten yapıyorsan spor salonunda kuvvet antrenmanı da buna dahildir. ACOG, hamilelik hormonları eklemlerini gevşettiği için sarsıntılı ve yüksek darbeli hareketlerden, ayrıca uzun süre sırt üstü yatmaktan kaçınmayı önerir. Zorlanırken nefesi tutmaktan ve çok ağır yükler kaldırmaktan kaçınmak en iyisi.",
    },
    tips: {
      en: ["Tell your trainer you're pregnant.", "Breathe out on the effort and keep a weight you can lift with good form."],
      tr: ["Antrenörüne hamile olduğunu söyle.", "Efor anında nefes ver ve doğru formla kaldırabileceğin bir ağırlık seç."],
    },
    sources: [S.nhsExercise, S.acogExercise],
  },
  {
    id: "hiit",
    category: "activity",
    emoji: "⏱️",
    name: { en: "HIIT & intense workouts", tr: "HIIT ve yoğun antrenmanlar" },
    aliases: {
      en: ["hiit", "high intensity interval training", "bootcamp", "circuit training", "burpees", "tabata"],
      tr: ["hiit", "yüksek yoğunluklu antrenman", "bootcamp", "devre antrenmanı", "tabata"],
    },
    verdict: "caution",
    summary: {
      en: "If you're used to it, a modified version is usually OK, but don't start HIIT now and avoid jumping and overheating.",
      tr: "Alışkınsan uyarlanmış bir versiyonu genellikle uygundur; ama HIIT'e şimdi başlama, zıplamadan ve aşırı ısınmadan kaçın.",
    },
    details: {
      en: "ACOG says very active women can usually continue their workouts with their ob-gyn's approval, but advises avoiding jerky, bouncy or high-impact moves and overheating. The NHS says it's not recommended to start a new vigorous activity in pregnancy. Keep the intensity where you can still talk, and swap jumps for low-impact versions.",
      tr: "ACOG, çok aktif kadınların doktorlarının onayıyla antrenmanlarına genellikle devam edebileceğini, ancak sarsıntılı, zıplamalı ya da yüksek darbeli hareketlerden ve aşırı ısınmadan kaçınılması gerektiğini söyler. NHS hamilelikte yeni ve yoğun bir aktiviteye başlanmasını önermez. Yoğunluğu hâlâ konuşabileceğin düzeyde tut ve zıplamaları düşük darbeli versiyonlarla değiştir.",
    },
    tips: {
      en: ["Swap burpees and jumps for step-outs and marching.", "Stop if you feel dizzy, breathless before starting, or have pain."],
      tr: ["Burpee ve zıplamaları yana adım ve yerinde yürüyüşle değiştir.", "Baş dönmesi, başlamadan nefes darlığı ya da ağrı olursa dur."],
    },
    sources: [S.acogExercise, S.nhsExercise],
  },
  {
    id: "cycling",
    category: "activity",
    emoji: "🚴‍♀️",
    name: { en: "Cycling (outdoors)", tr: "Bisiklet (dışarıda)" },
    aliases: {
      en: ["cycling", "bike ride", "road cycling", "mountain biking", "e-bike", "cycle to work"],
      tr: ["bisiklet sürmek", "yol bisikleti", "dağ bisikleti", "elektrikli bisiklet", "bisikletle işe gitmek"],
    },
    verdict: "caution",
    summary: {
      en: "Outdoor cycling carries a fall risk as your balance changes, so a stationary bike is the safer choice.",
      tr: "Dengen değiştikçe dışarıda bisiklet sürmek düşme riski taşır; sabit bisiklet daha güvenli bir seçimdir.",
    },
    details: {
      en: "ACOG notes that your growing bump affects your balance and makes falls more likely, so riding a standard bicycle can be risky and a stationary bike is a better choice. The NHS advises avoiding activities with a risk of falling, such as mountain biking. If you're an experienced cyclist, quiet, flat routes in early pregnancy are lower risk than busy roads or trails.",
      tr: "ACOG, büyüyen karnın dengeni etkilediğini ve düşme olasılığını artırdığını, bu yüzden normal bisiklet sürmenin riskli olabileceğini ve sabit bisikletin daha iyi bir seçim olduğunu belirtir. NHS dağ bisikleti gibi düşme riski taşıyan aktivitelerden kaçınılmasını önerir. Deneyimli bir bisikletçiysen erken hamilelikte sakin ve düz rotalar, kalabalık yollardan ya da arazi parkurlarından daha düşük risklidir.",
    },
    tips: {
      en: ["Swap mountain biking for a stationary bike or spin class.", "Always wear a helmet if you do ride outdoors."],
      tr: ["Dağ bisikleti yerine sabit bisiklete ya da spinning dersine geç.", "Dışarıda sürüyorsan mutlaka kask tak."],
    },
    sources: [S.acogExercise, S.nhsExercise],
  },
  {
    id: "spinning",
    category: "activity",
    emoji: "🚲",
    name: { en: "Spinning & stationary bike", tr: "Spinning ve sabit bisiklet" },
    aliases: {
      en: ["spin class", "stationary bike", "exercise bike", "peloton", "indoor cycling"],
      tr: ["spinning", "sabit bisiklet", "kondisyon bisikleti", "kapalı alan bisikleti"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, a stationary bike is one of the safest ways to do cardio in pregnancy, as long as you don't overheat.",
      tr: "Evet, sabit bisiklet hamilelikte kardiyo yapmanın en güvenli yollarından biridir; yeter ki aşırı ısınma.",
    },
    details: {
      en: "ACOG recommends stationary cycling over outdoor riding because there's no risk of falling. Spin classes can be hot and intense, and ACOG advises avoiding overheating, staying hydrated and exercising in a temperature-controlled room. Raise the handlebars as your bump grows, and keep to a pace where you can still talk.",
      tr: "ACOG, düşme riski olmadığı için sabit bisikleti dışarıda bisiklet sürmeye tercih eder. Spinning dersleri sıcak ve yoğun olabilir; ACOG aşırı ısınmamayı, bol sıvı almayı ve sıcaklığı kontrol edilen bir ortamda egzersiz yapmayı önerir. Karnın büyüdükçe gidonu yükselt ve hâlâ konuşabildiğin bir tempoda kal.",
    },
    tips: {
      en: ["Bring water, sit near a fan and ease off rather than following the class at full intensity."],
      tr: ["Yanına su al, vantilatöre yakın otur ve dersi tam yoğunlukta takip etmek yerine temponu düşür."],
    },
    sources: [S.acogExercise],
  },
  {
    id: "horse-riding",
    category: "activity",
    emoji: "🐎",
    name: { en: "Horse riding", tr: "Ata binmek" },
    aliases: {
      en: ["horseback riding", "equestrian", "riding lessons", "pony trekking"],
      tr: ["binicilik", "at binme", "at gezisi", "binicilik dersi"],
    },
    verdict: "avoid",
    summary: {
      en: "Best avoided, because a fall from a horse could seriously injure you and your baby.",
      tr: "Kaçınmak en iyisi, çünkü attan düşmek seni ve bebeğini ciddi şekilde yaralayabilir.",
    },
    details: {
      en: "ACOG lists horseback riding among the activities to avoid in pregnancy because of the risk of falling. Mayo Clinic notes that falls later in pregnancy, especially onto the belly, can lead to serious problems such as placental abruption. Even experienced riders can't control a horse's sudden movements.",
      tr: "ACOG düşme riski nedeniyle ata binmeyi hamilelikte kaçınılması gereken aktiviteler arasında sayar. Mayo Clinic, özellikle karın üzerine olan geç dönem düşüşlerin plasenta ayrılması gibi ciddi sorunlara yol açabileceğini belirtir. Deneyimli biniciler bile atın ani hareketlerini kontrol edemez.",
    },
    tips: {
      en: ["Groundwork with horses, without riding, is a gentler way to stay involved."],
      tr: ["Binmeden atlarla yerde ilgilenmek, işin içinde kalmanın daha nazik bir yolu."],
    },
    sources: [S.acogExercise, S.mayoFalls],
  },
  {
    id: "skiing",
    category: "activity",
    emoji: "⛷️",
    name: { en: "Skiing & snowboarding", tr: "Kayak ve snowboard" },
    aliases: {
      en: ["downhill skiing", "snowboarding", "ski holiday", "water skiing", "sledging"],
      tr: ["kayak", "snowboard", "kayak tatili", "su kayağı", "kızak"],
    },
    verdict: "avoid",
    summary: {
      en: "Best avoided, as downhill skiing and snowboarding carry a high risk of falls and collisions.",
      tr: "Kaçınmak en iyisi, çünkü kayak ve snowboard düşme ve çarpışma riskini yüksek oranda taşır.",
    },
    details: {
      en: "ACOG lists downhill snow skiing and water skiing among the activities to avoid in pregnancy because of the risk of falling. Many ski resorts are also above 6,000 feet (about 1,800 metres), and ACOG advises avoiding exercise at that altitude if you don't already live high up. Gentle walks in the snow are a safer way to enjoy the mountains.",
      tr: "ACOG düşme riski nedeniyle kar kayağını ve su kayağını hamilelikte kaçınılacak aktiviteler arasında sayar. Pek çok kayak merkezi ayrıca 6.000 fitin (yaklaşık 1.800 metre) üzerindedir ve ACOG, zaten yüksekte yaşamıyorsan bu rakımda egzersizden kaçınmanı önerir. Karda hafif yürüyüşler dağların tadını çıkarmanın daha güvenli bir yoludur.",
    },
    tips: {
      en: ["Enjoy the resort with gentle walks and plenty of rest at lower altitudes."],
      tr: ["Tatil yerinin keyfini daha alçak rakımlarda hafif yürüyüşler ve bol dinlenmeyle çıkar."],
    },
    sources: [S.acogExercise],
  },
  {
    id: "scuba-diving",
    category: "activity",
    emoji: "🤿",
    name: { en: "Scuba diving", tr: "Tüplü dalış" },
    aliases: {
      en: ["scuba", "diving", "deep sea diving", "padi", "free diving"],
      tr: ["dalış", "tüplü dalış", "serbest dalış", "derin dalış"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid it in pregnancy, as the NHS and CDC advise against scuba diving because of possible risks to the baby.",
      tr: "Hamilelikte kaçın; NHS ve CDC bebek için olası riskler nedeniyle tüplü dalışı önermez.",
    },
    details: {
      en: "The NHS advises not to scuba dive in pregnancy because it may be unsafe for your baby, and the CDC notes that diving's safety in pregnancy hasn't been established. The baby isn't protected from decompression problems the way you might be. Snorkelling at the surface is a lovely alternative.",
      tr: "NHS bebeğin için güvenli olmayabileceği gerekçesiyle hamilelikte tüplü dalış yapılmamasını önerir; CDC de dalışın hamilelikte güvenli olduğunun gösterilmediğini belirtir. Bebek, dekompresyon sorunlarına karşı senin kadar korunmuş olmayabilir. Su yüzeyinde şnorkelle yüzmek güzel bir alternatif."
    },
    tips: {
      en: ["Try snorkelling instead, staying at the surface and in calm water."],
      tr: ["Bunun yerine şnorkeli dene; su yüzeyinde ve sakin suda kal."],
    },
    sources: [S.nhsExercise, S.cdcPregnantTravelers],
  },
  {
    id: "contact-sports",
    category: "activity",
    emoji: "⚽",
    name: { en: "Contact sports", tr: "Temaslı sporlar" },
    aliases: {
      en: ["football", "soccer", "basketball", "rugby", "hockey", "boxing", "martial arts", "kickboxing", "volleyball"],
      tr: ["futbol", "basketbol", "voleybol", "boks", "dövüş sporları", "kick boks", "hentbol", "ragbi"],
    },
    verdict: "avoid",
    summary: {
      en: "Best avoided, because sports with a risk of being hit in the belly or falling could injure you or your baby.",
      tr: "Kaçınmak en iyisi, çünkü karına darbe alma ya da düşme riski olan sporlar seni ya da bebeğini yaralayabilir.",
    },
    details: {
      en: "ACOG advises avoiding contact sports such as ice hockey, boxing, soccer and basketball in pregnancy, and the NHS lists hockey and rugby among activities with a risk of bumping your tummy. Later in pregnancy, a blow to the abdomen can cause problems such as placental abruption. Non-contact training and skills drills can keep you involved.",
      tr: "ACOG hamilelikte buz hokeyi, boks, futbol ve basketbol gibi temaslı sporlardan kaçınılmasını önerir; NHS de hokey ve ragbiyi karına darbe alma riski taşıyan aktiviteler arasında sayar. Hamileliğin ilerleyen dönemlerinde karına alınan bir darbe plasenta ayrılması gibi sorunlara yol açabilir. Temassız antrenman ve teknik çalışmalar seni sporun içinde tutabilir.",
    },
    tips: {
      en: ["Swap matches for walking, swimming or a stationary bike."],
      tr: ["Maçların yerine yürüyüş, yüzme ya da sabit bisiklet koy."],
    },
    sources: [S.acogExercise, S.nhsExercise],
  },
  {
    id: "sauna",
    category: "activity",
    emoji: "🧖‍♀️",
    name: { en: "Sauna & steam room", tr: "Sauna ve buhar odası" },
    aliases: {
      en: ["sauna", "steam room", "infrared sauna", "spa", "banya"],
      tr: ["sauna", "buhar odası", "buhar banyosu", "kızılötesi sauna", "spa"],
    },
    verdict: "avoid",
    summary: {
      en: "Best avoided, especially in the first trimester, because overheating can be harmful in early pregnancy.",
      tr: "Kaçınmak en iyisi, özellikle ilk üç ayda; çünkü erken hamilelikte aşırı ısınma zararlı olabilir.",
    },
    details: {
      en: "MotherToBaby notes that a high body temperature before about 6 weeks of pregnancy has been linked to a small increase in the chance of neural tube defects, and advises limiting hot tub and sauna use. ACOG says a high body temperature in pregnancy is linked to birth defects and other complications. Saunas can also make you dizzy or faint, which raises the risk of falling.",
      tr: "MotherToBaby, hamileliğin yaklaşık 6. haftasından önce yüksek vücut ısısının nöral tüp defekti olasılığında küçük bir artışla ilişkilendirildiğini belirtir ve jakuzi ile sauna kullanımının sınırlanmasını önerir. ACOG, hamilelikte yüksek vücut ısısının doğum kusurları ve başka komplikasyonlarla ilişkili olduğunu söyler. Sauna ayrıca baş dönmesine ya da bayılmaya yol açarak düşme riskini artırabilir.",
    },
    tips: {
      en: ["If you're not sure you can skip it, keep any visit very short and leave if you feel hot or dizzy."],
      tr: ["Vazgeçemiyorsan ziyareti çok kısa tut; ısındığını ya da başının döndüğünü hissedersen hemen çık."],
    },
    sources: [S.m2bHyperthermia, S.acogHeat],
  },
  {
    id: "hot-tub",
    category: "activity",
    emoji: "🛁",
    name: { en: "Hot tub & jacuzzi", tr: "Jakuzi ve sıcak havuz" },
    aliases: {
      en: ["hot tub", "jacuzzi", "spa pool", "whirlpool", "hot spring", "thermal pool"],
      tr: ["jakuzi", "sıcak havuz", "kaplıca", "termal havuz", "spa havuzu"],
    },
    verdict: "avoid",
    summary: {
      en: "Best avoided, as sitting in hot water raises your core temperature quickly, which matters most in early pregnancy.",
      tr: "Kaçınmak en iyisi, çünkü sıcak suda oturmak vücut iç ısını hızla yükseltir ve bu en çok erken hamilelikte önemlidir.",
    },
    details: {
      en: "Hot tubs and thermal pools surround most of your body with hot water, so your core temperature can rise quickly. MotherToBaby advises limiting hot tub use in pregnancy, and notes that a high body temperature in early pregnancy has been linked to neural tube defects. Turkish kaplıca (thermal springs) are often very hot, so the same applies.",
      tr: "Jakuzi ve termal havuzlar vücudunun büyük kısmını sıcak suyla sarar, bu yüzden iç ısın hızla yükselebilir. MotherToBaby hamilelikte jakuzi kullanımının sınırlanmasını önerir ve erken hamilelikte yüksek vücut ısısının nöral tüp defektleriyle ilişkilendirildiğini belirtir. Kaplıcalar da çoğu zaman çok sıcaktır, aynı uyarı onlar için de geçerli.",
    },
    tips: {
      en: ["Dangle your legs in the water or choose a normal-temperature pool instead."],
      tr: ["Bunun yerine bacaklarını suya sarkıt ya da normal sıcaklıktaki bir havuzu seç."],
    },
    sources: [S.m2bHyperthermia, S.acogHeat],
  },
  {
    id: "hamam",
    category: "activity",
    emoji: "🧖‍♀️",
    name: { en: "Turkish bath (hamam)", tr: "Hamam" },
    aliases: {
      en: ["hammam", "turkish bath", "hamam", "steam bath", "kese", "foam massage"],
      tr: ["türk hamamı", "kese", "köpük masajı", "göbek taşı", "kurna", "hamam sefası"],
    },
    verdict: "caution",
    summary: {
      en: "Skip the hottest rooms and the heated marble (göbek taşı); a short visit to the warm, not hot, area is the most to aim for.",
      tr: "En sıcak bölümleri ve göbek taşını atla; en fazla, sıcak değil ılık bölümde kısa bir ziyaret hedefle.",
    },
    details: {
      en: "A traditional hamam combines hot, humid air with a heated marble slab, which can raise your body temperature much like a sauna. MotherToBaby advises limiting hot tub and sauna use, as a high body temperature in early pregnancy has been linked to neural tube defects. Wet marble floors are also slippery, and heat can make you dizzy, so falls are a real risk.",
      tr: "Geleneksel bir hamam sıcak ve nemli havayı ısıtılmış bir mermer taşla birleştirir; bu da tıpkı sauna gibi vücut ısını yükseltebilir. MotherToBaby, erken hamilelikte yüksek vücut ısısı nöral tüp defektleriyle ilişkilendirildiği için jakuzi ve sauna kullanımının sınırlanmasını önerir. Islak mermer zeminler kaygandır ve sıcaklık baş dönmesi yapabilir; yani düşme gerçek bir risktir.",
    },
    tips: {
      en: ["Avoid lying on the göbek taşı and keep to lukewarm water.", "Go with someone, keep it short and drink water.", "Ask for a gentle kese and no pressure on your bump."],
      tr: ["Göbek taşına uzanma ve ılık suyla yetin.", "Biriyle git, kısa tut ve su iç.", "Natırdan nazik bir kese iste ve karnına baskı yapılmasın."],
    },
    sources: [S.m2bHyperthermia, S.acogHeat],
  },
  {
    id: "hot-bath",
    category: "activity",
    emoji: "🛀",
    name: { en: "Hot baths", tr: "Sıcak banyo (küvet)" },
    aliases: {
      en: ["bath", "warm bath", "bathtub", "bubble bath", "soak"],
      tr: ["küvet", "ılık banyo", "köpük banyosu", "banyo yapmak"],
    },
    verdict: "caution",
    summary: {
      en: "A warm bath is fine and can ease aches, but keep the water warm rather than hot and don't overheat.",
      tr: "Ilık bir banyo sorun değil ve ağrıları hafifletebilir; ama suyu sıcak değil ılık tut ve aşırı ısınma.",
    },
    details: {
      en: "The NHS suggests a warm bath as a way to ease back pain in pregnancy. Very hot water can raise your body temperature, and MotherToBaby notes that high temperatures in early pregnancy have been linked to neural tube defects. Hot baths can also make you feel faint when you stand up, so get out slowly.",
      tr: "NHS hamilelikte bel ağrısını hafifletmek için ılık bir banyoyu önerir. Çok sıcak su vücut ısını yükseltebilir ve MotherToBaby erken hamilelikte yüksek sıcaklıkların nöral tüp defektleriyle ilişkilendirildiğini belirtir. Sıcak banyo ayağa kalkarken baş dönmesine de yol açabilir, bu yüzden yavaşça çık.",
    },
    tips: {
      en: ["Test the water with your elbow: it should feel warm, not hot.", "Use a non-slip mat and get out slowly."],
      tr: ["Suyu dirseğinle dene: sıcak değil, ılık hissettirmeli.", "Kaymaz paspas kullan ve küvetten yavaşça çık."],
    },
    sources: [S.nhsBackPain, S.m2bHyperthermia],
  },
  {
    id: "sex",
    category: "activity",
    emoji: "❤️",
    name: { en: "Sex", tr: "Cinsel ilişki" },
    aliases: {
      en: ["sex during pregnancy", "intercourse", "making love", "intimacy", "penetration"],
      tr: ["seks", "cinsel birliktelik", "ilişkiye girmek", "yakınlaşma", "hamilelikte seks"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, in a healthy pregnancy sex is safe and won't harm your baby, unless your doctor has advised otherwise.",
      tr: "Evet, sağlıklı bir hamilelikte cinsel ilişki güvenlidir ve doktorun aksini söylemediyse bebeğine zarar vermez.",
    },
    details: {
      en: "In most pregnancies, sex isn't a risk to you or your baby, who is protected by the amniotic fluid and the muscles of the womb. A doctor may advise against it in some situations, such as a placenta lying over the cervix (placenta praevia) or a risk of bleeding. It's normal for your sex drive to change, and new positions may feel more comfortable as your bump grows.",
      tr: "Çoğu hamilelikte cinsel ilişki senin ya da amniyon sıvısı ve rahim kaslarıyla korunan bebeğin için bir risk oluşturmaz. Doktor, plasentanın rahim ağzını örtmesi (plasenta previa) ya da kanama riski gibi bazı durumlarda ilişkiye girmemeni önerebilir. Cinsel isteğin değişmesi normaldir; karnın büyüdükçe farklı pozisyonlar daha rahat gelebilir.",
    },
    tips: {
      en: ["Use condoms with a new partner, as some infections can affect your baby.", "Contact your maternity team if you have bleeding, pain or leaking fluid afterwards."],
      tr: ["Yeni bir partnerle prezervatif kullan; bazı enfeksiyonlar bebeğini etkileyebilir.", "Sonrasında kanama, ağrı ya da sıvı gelmesi olursa doğum ekibine başvur."],
    },
    sources: [S.nidirectSex, S.nhsInfections],
  },
  {
    id: "orgasm",
    category: "activity",
    emoji: "💞",
    name: { en: "Orgasm", tr: "Orgazm" },
    aliases: {
      en: ["orgasm in pregnancy", "climax", "braxton hicks after sex", "contractions after sex"],
      tr: ["orgazm", "hamilelikte orgazm", "ilişki sonrası kasılma", "braxton hicks"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, orgasms are safe in a healthy pregnancy, and mild tightening afterwards is normal.",
      tr: "Evet, sağlıklı bir hamilelikte orgazm güvenlidir; sonrasında hafif kasılmalar olması normaldir.",
    },
    details: {
      en: "Later in pregnancy, an orgasm, or sex itself, can set off practice contractions known as Braxton Hicks. NI Direct says this is perfectly normal and nothing to worry about, and resting quietly usually helps them pass. If your doctor has advised you to avoid sex, ask whether that includes orgasm too.",
      tr: "Hamileliğin ilerleyen dönemlerinde orgazm ya da ilişkinin kendisi, Braxton Hicks denen alıştırma kasılmalarını tetikleyebilir. NI Direct bunun tamamen normal olduğunu ve endişe gerektirmediğini söyler; sakin bir şekilde dinlenmek genellikle geçmesine yardım eder. Doktorun ilişkiden kaçınmanı önerdiyse bunun orgazmı da kapsayıp kapsamadığını sor.",
    },
    tips: {
      en: ["Call your maternity team if tightenings become regular and painful before 37 weeks."],
      tr: ["37. haftadan önce kasılmalar düzenli ve ağrılı hale gelirse doğum ekibini ara."],
    },
    sources: [S.nidirectSex],
  },
  {
    id: "massage",
    category: "activity",
    emoji: "💆‍♀️",
    name: { en: "Massage", tr: "Masaj" },
    aliases: {
      en: ["pregnancy massage", "prenatal massage", "back massage", "foot massage", "spa treatment", "reflexology"],
      tr: ["hamile masajı", "doğum öncesi masaj", "sırt masajı", "ayak masajı", "spa", "refleksoloji"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, a gentle massage from a therapist trained in pregnancy is a good way to ease aches and stress.",
      tr: "Evet, hamilelik konusunda eğitimli bir terapistin yaptığı nazik bir masaj ağrıları ve stresi hafifletmenin iyi bir yoludur.",
    },
    details: {
      en: "The NHS suggests massage as one way to ease back pain in pregnancy, and Mayo Clinic lists it among relaxation techniques for headaches. Lie on your side rather than face down, and make sure the therapist knows you're pregnant. If essential oils are used, they should be diluted and suitable for pregnancy.",
      tr: "NHS hamilelikte bel ağrısını hafifletmenin yollarından biri olarak masajı önerir; Mayo Clinic de onu baş ağrısı için gevşeme teknikleri arasında sayar. Yüzüstü değil yan yat ve terapistin hamile olduğunu bildiğinden emin ol. Uçucu yağ kullanılacaksa seyreltilmiş ve hamileliğe uygun olmalı.",
    },
    tips: {
      en: ["Book with a therapist trained in pregnancy massage.", "Ask for side-lying positions with pillows for support."],
      tr: ["Hamile masajı konusunda eğitimli bir terapistten randevu al.", "Yastıklarla desteklenen yan yatış pozisyonları iste."],
    },
    sources: [S.nhsBackPain, S.mayoHeadaches],
  },
  {
    id: "chiropractor",
    category: "activity",
    emoji: "🦴",
    name: { en: "Chiropractor & osteopath", tr: "Kayropraktik ve osteopati" },
    aliases: {
      en: ["chiropractic", "chiropractor", "osteopath", "spinal manipulation", "back cracking", "adjustment"],
      tr: ["kayropraktör", "kayropraktik", "osteopat", "omurga manipülasyonu", "bel kütletme"],
    },
    verdict: "caution",
    summary: {
      en: "For back or pelvic pain, start with your midwife or a physiotherapist; if you see a chiropractor, choose one experienced in pregnancy.",
      tr: "Bel ya da kasık ağrısı için önce ebene ya da bir fizyoterapiste başvur; kayropraktöre gideceksen hamilelikte deneyimli birini seç.",
    },
    details: {
      en: "Spinal manipulation hasn't been well studied in pregnancy. For back pain, the NHS suggests your GP or midwife may refer you to an obstetric physiotherapist, and ACOG suggests a physical therapist once other causes have been ruled out. Back pain can sometimes signal labour or a urine infection, so get it checked first.",
      tr: "Omurga manipülasyonu hamilelikte yeterince araştırılmamıştır. NHS bel ağrısı için aile hekiminin ya da ebenin seni bir kadın sağlığı fizyoterapistine yönlendirebileceğini söyler; ACOG de diğer nedenler dışlandıktan sonra bir fizyoterapisti önerir. Bel ağrısı bazen doğum başlangıcının ya da idrar yolu enfeksiyonunun işareti olabilir; önce kontrol ettir.",
    },
    tips: {
      en: ["Tell any practitioner how many weeks pregnant you are.", "Stop if a treatment causes pain or tightening."],
      tr: ["Uygulayıcıya kaç haftalık hamile olduğunu söyle.", "Bir uygulama ağrı ya da kasılma yaparsa dur."],
    },
    sources: [S.nhsBackPain, S.acogBackPain],
  },
  {
    id: "sleeping-on-back",
    category: "activity",
    emoji: "🛌",
    name: { en: "Sleeping on your back", tr: "Sırt üstü uyumak" },
    aliases: {
      en: ["sleep position", "back sleeping", "lying on back", "supine", "sleeping position third trimester"],
      tr: ["uyku pozisyonu", "sırt üstü yatmak", "sırtüstü uyku", "hamilelikte nasıl yatılır"],
    },
    verdict: "caution",
    summary: {
      en: "From 28 weeks, go to sleep on your side, as back-sleeping is linked to a higher risk of stillbirth; before that, it's fine.",
      tr: "28. haftadan itibaren yan yatarak uyu, çünkü sırt üstü uyumak daha yüksek ölü doğum riskiyle ilişkilendirilmiştir; öncesinde sorun yok.",
    },
    details: {
      en: "The NHS advises avoiding going to sleep on your back after 28 weeks because it has been linked to a higher risk of stillbirth. Lying on your back later in pregnancy lets the womb press on a large blood vessel, which can make you feel faint and reduce blood flow. If you wake up on your back, don't worry: just turn onto your side.",
      tr: "NHS, daha yüksek ölü doğum riskiyle ilişkilendirildiği için 28. haftadan sonra sırt üstü uykuya dalmaktan kaçınılmasını önerir. İlerleyen haftalarda sırt üstü yatınca rahim büyük bir kan damarına bastırabilir; bu da baş dönmesi yapabilir ve kan akışını azaltabilir. Sırt üstü uyanırsan endişelenme, sadece yan dön.",
    },
    tips: {
      en: ["Put a pillow behind your back to help you stay on your side.", "Either side is fine, so choose whichever is more comfortable."],
      tr: ["Yan yatmayı sürdürebilmek için sırtına bir yastık koy.", "Hangi yan olduğu fark etmez, hangisi rahatsa onu seç."],
    },
    sources: [S.nhsCommonProblems, S.acogExercise],
  },
  {
    id: "sleeping-on-stomach",
    category: "activity",
    emoji: "😴",
    name: { en: "Sleeping on your stomach", tr: "Yüzüstü uyumak" },
    aliases: {
      en: ["front sleeping", "stomach sleeping", "lying on belly", "prone"],
      tr: ["yüzüstü yatmak", "karın üstü yatmak", "yüzükoyun uyumak"],
    },
    verdict: "safe",
    summary: {
      en: "Fine for as long as it's comfortable, as your baby is well protected, and most people switch to side-sleeping as the bump grows.",
      tr: "Rahat ettiğin sürece sorun yok, çünkü bebeğin iyi korunur; çoğu kişi karın büyüdükçe yan yatmaya geçer.",
    },
    details: {
      en: "In early pregnancy, the womb sits low behind the pelvic bone and your baby is cushioned by fluid, so lying on your front won't harm them. As your bump grows, front-sleeping usually becomes uncomfortable on its own. ACOG notes that side-sleeping with bent knees and pillows is the most comfortable position later in pregnancy.",
      tr: "Erken hamilelikte rahim leğen kemiğinin arkasında aşağıda durur ve bebeğin sıvıyla korunur; bu yüzden yüzüstü yatmak ona zarar vermez. Karnın büyüdükçe yüzüstü uyumak genellikle kendiliğinden rahatsız edici hale gelir. ACOG ilerleyen haftalarda dizler bükülü ve yastıklarla desteklenmiş yan yatışın en rahat pozisyon olduğunu belirtir.",
    },
    tips: {
      en: ["Try a pregnancy pillow to make the switch to side-sleeping easier."],
      tr: ["Yan yatmaya geçişi kolaylaştırmak için bir hamile yastığı dene."],
    },
    sources: [S.acogBackPain, S.mayoFalls],
  },
  {
    id: "roller-coasters",
    category: "activity",
    emoji: "🎢",
    name: { en: "Roller coasters & fairground rides", tr: "Hız treni ve lunapark" },
    aliases: {
      en: ["roller coaster", "theme park", "fairground rides", "amusement park", "water slides", "bumper cars", "go-karts"],
      tr: ["hız treni", "lunapark", "eğlence parkı", "su kaydırağı", "çarpışan araba", "go-kart"],
    },
    verdict: "avoid",
    summary: {
      en: "Best avoided, as sudden jolts, stops and impacts could harm your pregnancy.",
      tr: "Kaçınmak en iyisi, çünkü ani sarsıntılar, duruşlar ve darbeler hamileliğine zarar verebilir.",
    },
    details: {
      en: "Rides with sudden starts, stops and jolts can put force on your abdomen, much like a fall or a knock. Mayo Clinic notes that abdominal impacts later in pregnancy can cause problems such as placental abruption, and MotherToBaby explains how physical trauma can affect a pregnancy. Most theme parks advise pregnant visitors not to ride.",
      tr: "Ani kalkış, duruş ve sarsıntı içeren oyuncaklar, tıpkı bir düşme ya da çarpma gibi karnına kuvvet uygulayabilir. Mayo Clinic, hamileliğin ilerleyen dönemlerinde karına gelen darbelerin plasenta ayrılması gibi sorunlara yol açabileceğini belirtir; MotherToBaby de fiziksel travmanın hamileliği nasıl etkileyebileceğini açıklar. Çoğu eğlence parkı hamile ziyaretçilere bu oyuncaklara binmemelerini önerir.",
    },
    tips: {
      en: ["Choose gentle rides like the carousel or Ferris wheel instead."],
      tr: ["Bunun yerine atlıkarınca ya da dönme dolap gibi sakin oyuncakları seç."],
    },
    sources: [S.mayoFalls, S.m2bPhysicalTrauma],
  },
  {
    id: "trampolines",
    category: "activity",
    emoji: "🤸",
    name: { en: "Trampolines & bouncy castles", tr: "Trambolin ve şişme oyun alanları" },
    aliases: {
      en: ["trampoline", "trampoline park", "bouncy castle", "rebounder", "jumping"],
      tr: ["trambolin", "trambolin parkı", "şişme şato", "zıplama", "mini trambolin"],
    },
    verdict: "avoid",
    summary: {
      en: "Best avoided, because bouncing adds jolting and a real chance of falling or being knocked.",
      tr: "Kaçınmak en iyisi, çünkü zıplamak sarsıntı yaratır ve gerçek bir düşme ya da çarpışma riski taşır.",
    },
    details: {
      en: "ACOG advises avoiding jerky, bouncy and high-impact movements in pregnancy, as hormones loosen your joints and your changing balance makes falls more likely. Falls and knocks to the belly later in pregnancy can cause problems such as placental abruption. Bouncing alongside children also increases the chance of collisions.",
      tr: "ACOG, hormonlar eklemlerini gevşettiği ve değişen dengen düşmeyi kolaylaştırdığı için hamilelikte sarsıntılı, zıplamalı ve yüksek darbeli hareketlerden kaçınılmasını önerir. Hamileliğin ilerleyen dönemlerinde düşmeler ve karına alınan darbeler plasenta ayrılması gibi sorunlara yol açabilir. Çocuklarla birlikte zıplamak da çarpışma olasılığını artırır.",
    },
    tips: {
      en: ["Cheer from the side, and bring the kids' snacks."],
      tr: ["Kenardan tezahürat yap, çocukların atıştırmalıklarını sen getir."],
    },
    sources: [S.acogExercise, S.mayoFalls],
  },
  {
    id: "lifting-toddler",
    category: "activity",
    emoji: "🧒",
    name: { en: "Lifting a toddler", tr: "Çocuğunu kucağa almak" },
    aliases: {
      en: ["lifting children", "carrying toddler", "lifting heavy things", "carrying shopping", "picking up child"],
      tr: ["çocuk kucaklamak", "çocuk taşımak", "ağır kaldırmak", "alışveriş taşımak", "kucağa almak"],
    },
    verdict: "caution",
    summary: {
      en: "Usually fine with good technique: bend your knees, keep your back straight and avoid very heavy lifting.",
      tr: "Doğru teknikle genellikle sorun değil: dizlerini bük, sırtını düz tut ve çok ağır kaldırmaktan kaçın.",
    },
    details: {
      en: "The NHS counts carrying children and shopping as everyday muscle-strengthening activity, but advises bending your knees and keeping your back straight when lifting, and avoiding heavy objects. Pregnancy hormones loosen your ligaments, so your back and pelvis are more easily strained. If you have complications or pelvic pain, ask your midwife what's safe for you.",
      tr: "NHS çocuk ve alışveriş taşımayı günlük kas güçlendirme aktivitesi olarak sayar; ama kaldırırken dizlerini büküp sırtını düz tutmanı ve ağır eşyalardan kaçınmanı önerir. Hamilelik hormonları bağlarını gevşettiği için belin ve leğen kemiğin daha kolay zorlanır. Komplikasyonun ya da kasık ağrın varsa senin için neyin güvenli olduğunu ebene sor.",
    },
    tips: {
      en: ["Squat down to your toddler's level and let them climb onto your lap instead.", "Share the lifting with your partner where you can."],
      tr: ["Çocuğunun seviyesine çömel ve onun kucağına tırmanmasına izin ver.", "Mümkün olduğunda kaldırma işini partnerinle paylaş."],
    },
    sources: [S.nhsBackPain, S.nhsExercise],
  },
  {
    id: "cleaning-products",
    category: "activity",
    emoji: "🧽",
    name: { en: "Household cleaning", tr: "Ev temizliği ve temizlik ürünleri" },
    aliases: {
      en: ["cleaning products", "cleaning", "oven cleaner", "disinfectant", "bathroom cleaner", "air freshener", "spray cleaner"],
      tr: ["temizlik ürünleri", "temizlik yapmak", "fırın temizleyici", "dezenfektan", "banyo temizleyici", "oda spreyi", "kireç sökücü"],
    },
    verdict: "caution",
    summary: {
      en: "Everyday cleaning is fine with ventilation and gloves, but hand over oven cleaners and strong aerosols if you can.",
      tr: "Havalandırma ve eldivenle günlük temizlik sorun değil; ama fırın temizleyicileri ve güçlü spreyleri mümkünse başkasına bırak.",
    },
    details: {
      en: "Nemours KidsHealth notes that some household chemicals are safe to use in pregnancy while others, such as oven cleaners, paint thinners, air fresheners and aerosols, may be hazardous. Strong smells can also make nausea worse. Reading labels, opening windows and wearing rubber gloves keeps exposure low.",
      tr: "Nemours KidsHealth, bazı ev kimyasallarının hamilelikte güvenle kullanılabildiğini, fırın temizleyicileri, tiner, oda spreyleri ve aerosoller gibi bazılarının ise tehlikeli olabileceğini belirtir. Keskin kokular bulantıyı da artırabilir. Etiketleri okumak, pencereleri açmak ve lastik eldiven takmak maruziyeti düşük tutar.",
    },
    tips: {
      en: ["Open windows, wear gloves and wash your hands afterwards.", "Simple options like soap, vinegar and baking soda handle most jobs."],
      tr: ["Pencereleri aç, eldiven tak ve sonra ellerini yıka.", "Sabun, sirke ve karbonat gibi basit seçenekler çoğu işi görür."],
    },
    sources: [S.khChemicals],
  },
  {
    id: "painting",
    category: "activity",
    emoji: "🎨",
    name: { en: "Painting & decorating", tr: "Boya badana ve dekorasyon" },
    aliases: {
      en: ["painting nursery", "paint fumes", "decorating", "wallpaper stripping", "varnish", "lead paint"],
      tr: ["boya badana", "bebek odası boyamak", "boya kokusu", "duvar kağıdı sökmek", "vernik", "kurşunlu boya"],
    },
    verdict: "caution",
    summary: {
      en: "Light painting with water-based paint in a ventilated room is low risk, but let someone else strip old paint or use solvents.",
      tr: "Havalandırılan bir odada su bazlı boyayla hafif işler düşük risklidir; ama eski boyayı kazımayı ya da tiner kullanmayı başkasına bırak.",
    },
    details: {
      en: "MotherToBaby notes that a one-off household paint job usually means far less exposure than painting for work, and recommends good ventilation and airing the room for 2 to 3 days afterwards. Pregnant women shouldn't scrape, sand or strip old paint, because older homes may have lead paint. Ladders are also a fall risk as your balance changes.",
      tr: "MotherToBaby, evde bir kereliğine boya yapmanın genellikle iş için boya yapmaktan çok daha az maruziyet anlamına geldiğini belirtir; iyi havalandırmayı ve sonrasında odayı 2–3 gün havalandırmayı önerir. Eski evlerde kurşunlu boya bulunabileceği için hamileler eski boyayı kazımamalı, zımparalamamalı ya da sökmemelidir. Dengen değiştikçe merdiven de düşme riski yaratır.",
    },
    tips: {
      en: ["Choose water-based, low-VOC paint and keep windows open.", "Stay off ladders and let the room air out before you sleep in it."],
      tr: ["Su bazlı, düşük VOC'li boya seç ve pencereleri açık tut.", "Merdivene çıkma ve odada uyumadan önce iyice havalandır."],
    },
    sources: [S.m2bPaint, S.khChemicals],
  },
  {
    id: "gardening",
    category: "activity",
    emoji: "🌷",
    name: { en: "Gardening", tr: "Bahçe işleri" },
    aliases: {
      en: ["gardening", "soil", "weeding", "digging", "allotment", "potting plants"],
      tr: ["bahçe işi", "toprak", "ot ayıklamak", "kazma", "saksı", "bahçecilik"],
    },
    verdict: "caution",
    summary: {
      en: "Yes, gardening is good exercise, but wear gloves and wash your hands, as soil can carry toxoplasma.",
      tr: "Evet, bahçe işi iyi bir egzersizdir; ama toprak toksoplazma taşıyabileceği için eldiven tak ve ellerini yıka.",
    },
    details: {
      en: "ACOG counts general gardening like raking, weeding and digging as moderate activity. Soil can be contaminated with cat faeces carrying toxoplasma, so the NHS advises wearing gloves even if you don't have a cat, and washing your hands and gloves afterwards. Avoid using garden pesticides yourself.",
      tr: "ACOG, tırmıklama, ot ayıklama ve kazma gibi genel bahçe işlerini orta yoğunlukta aktivite olarak sayar. Toprak, toksoplazma taşıyan kedi dışkısıyla kirlenmiş olabilir; bu yüzden NHS kedin olmasa bile eldiven takmanı ve sonrasında ellerini ve eldivenlerini yıkamanı önerir. Bahçe ilaçlarını kendin kullanmaktan kaçın.",
    },
    tips: {
      en: ["Wear gloves and wash your hands well after gardening.", "Bend your knees when lifting pots and bags of compost."],
      tr: ["Eldiven tak ve bahçe işinden sonra ellerini iyice yıka.", "Saksı ve toprak torbalarını kaldırırken dizlerini bük."],
    },
    sources: [S.nhsInfections, S.acogExercise],
  },
  {
    id: "cat-litter",
    category: "activity",
    emoji: "🐈",
    name: { en: "Cleaning cat litter", tr: "Kedi kumu temizlemek" },
    aliases: {
      en: ["cat litter", "litter box", "litter tray", "cat poop", "toxoplasmosis", "cats"],
      tr: ["kedi kumu", "kum kabı", "kedi tuvaleti", "kedi dışkısı", "toksoplazma", "kedi"],
    },
    verdict: "avoid",
    summary: {
      en: "Ask someone else to do it; if you must, wear gloves and clean the tray every day.",
      tr: "Başkasından yapmasını iste; mecbursan eldiven tak ve kumu her gün temizle.",
    },
    details: {
      en: "Cat faeces can contain toxoplasma, a parasite that can harm your baby if you catch it for the first time in pregnancy. The NHS advises avoiding emptying cat litter trays while pregnant, or using disposable gloves and cleaning the tray daily if nobody else can. The CDC explains that the parasite only becomes infectious 1 to 5 days after it's passed, which is why daily cleaning helps.",
      tr: "Kedi dışkısı, hamilelikte ilk kez enfekte olursan bebeğine zarar verebilen toksoplazma parazitini içerebilir. NHS hamilelikte kedi kumunu boşaltmaktan kaçınmanı, başka kimse yapamıyorsa tek kullanımlık eldiven takıp kumu her gün temizlemeni önerir. CDC, parazitin dışkıyla atıldıktan 1–5 gün sonra bulaştırıcı hale geldiğini, bu yüzden her gün temizlemenin işe yaradığını açıklar.",
    },
    tips: {
      en: ["You don't need to rehome your cat; just hand over litter duty.", "Wash your hands after stroking cats and before eating."],
      tr: ["Kedini başka bir yere vermen gerekmez; sadece kum işini devret.", "Kedi sevdikten sonra ve yemekten önce ellerini yıka."],
    },
    sources: [S.nhsInfections, S.cdcToxo],
  },
  {
    id: "standing-long",
    category: "activity",
    emoji: "🧍‍♀️",
    name: { en: "Standing for long periods", tr: "Uzun süre ayakta durmak" },
    aliases: {
      en: ["standing all day", "standing at work", "on my feet", "shop work", "long shifts"],
      tr: ["ayakta çalışmak", "uzun süre ayakta kalmak", "ayakta durmak", "uzun vardiya"],
    },
    verdict: "caution",
    summary: {
      en: "It's fine in short spells, but standing still for long periods can make you dizzy and worsen swelling, so move often.",
      tr: "Kısa süreli sorun değil; ama uzun süre hareketsiz ayakta durmak baş dönmesi yapabilir ve şişliği artırabilir, sık sık hareket et.",
    },
    details: {
      en: "ACOG explains that standing still can cause blood to pool in your legs and feet, which can briefly lower your blood pressure and make you feel faint. It also advises moving around regularly if you must sit or stand for long periods, to ease varicose veins and swelling. If your job keeps you on your feet, ask your employer about breaks and adjustments.",
      tr: "ACOG, hareketsiz ayakta durmanın kanın bacaklarında ve ayaklarında birikmesine, bunun da kısa süreliğine tansiyonunu düşürüp baş dönmesine yol açabileceğini açıklar. Uzun süre oturman ya da ayakta durman gerekiyorsa varis ve şişliği hafifletmek için düzenli olarak hareket etmeni önerir. İşin seni ayakta tutuyorsa işvereninle molalar ve düzenlemeler hakkında konuş.",
    },
    tips: {
      en: ["Shift your weight, flex your calves and rest one foot on a low stool.", "Sit down quickly if you feel faint."],
      tr: ["Ağırlığını değiştir, baldırlarını çalıştır ve bir ayağını alçak bir taburenin üzerine koy.", "Baş dönmesi hissedersen hemen otur."],
    },
    sources: [S.acogExercise, S.acogSkin],
  },
  {
    id: "sunbathing",
    category: "activity",
    emoji: "🏖️",
    name: { en: "Sunbathing", tr: "Güneşlenmek" },
    aliases: {
      en: ["sunbathing", "tanning", "beach", "lying in the sun", "heat"],
      tr: ["güneşlenmek", "bronzlaşmak", "plaj", "güneşte yatmak", "sıcak hava"],
    },
    verdict: "caution",
    summary: {
      en: "Enjoy the outdoors in short spells, but avoid overheating and use sunscreen to prevent pregnancy dark patches.",
      tr: "Açık havanın tadını kısa sürelerle çıkar; ama aşırı ısınmaktan kaçın ve hamilelik lekelerine karşı güneş kremi kullan.",
    },
    details: {
      en: "ACOG notes that your body works harder to keep cool in pregnancy and that a high body temperature has been linked to complications, so avoid long spells in strong sun and heat. Sun exposure can also trigger or darken melasma, the brown patches pregnancy can cause. Shade, water and a hat make beach days much safer.",
      tr: "ACOG, hamilelikte vücudunun serin kalmak için daha çok çalıştığını ve yüksek vücut ısısının komplikasyonlarla ilişkilendirildiğini belirtir; bu yüzden güçlü güneşte ve sıcakta uzun süre kalmaktan kaçın. Güneş ayrıca hamileliğin yol açabildiği kahverengi lekeleri (melazma) tetikleyebilir ya da koyulaştırabilir. Gölge, su ve şapka plaj günlerini çok daha güvenli hale getirir.",
    },
    tips: {
      en: ["Avoid the midday sun and sit in the shade.", "Drink water regularly and wear a wide-brimmed hat."],
      tr: ["Öğle saatlerindeki güneşten kaçın ve gölgede otur.", "Düzenli su iç ve geniş kenarlı şapka tak."],
    },
    sources: [S.acogHeat, S.acogSkin],
  },
  {
    id: "pelvic-floor-exercises",
    category: "activity",
    emoji: "💪",
    name: { en: "Pelvic floor (Kegel) exercises", tr: "Pelvik taban (Kegel) egzersizleri" },
    aliases: {
      en: ["kegels", "kegel exercises", "pelvic floor", "squeezes", "bladder leaks"],
      tr: ["kegel", "kegel egzersizi", "pelvik taban", "idrar kaçırma", "sıkıştırma egzersizi"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, they're recommended in pregnancy and help prevent leaking when you cough, sneeze or laugh.",
      tr: "Evet, hamilelikte önerilir; öksürürken, hapşırırken ya da gülerken idrar kaçırmayı önlemeye yardım eder.",
    },
    details: {
      en: "Your pelvic floor muscles support your bladder, bowel and womb, and pregnancy and birth put extra strain on them. The NHS recommends pelvic floor exercises in pregnancy to help prevent leaks of urine, which are common. You can do them anywhere, sitting, standing or lying on your side.",
      tr: "Pelvik taban kasların mesaneni, bağırsağını ve rahmini destekler; hamilelik ve doğum bu kaslara ekstra yük bindirir. NHS, sık görülen idrar kaçırmayı önlemeye yardımcı olmak için hamilelikte pelvik taban egzersizleri önerir. Bu egzersizleri oturarak, ayakta ya da yan yatarak her yerde yapabilirsin.",
    },
    tips: {
      en: ["Squeeze as if stopping a wee, hold, then fully relax; repeat a few times a day.", "Ask your midwife to check your technique if you're unsure."],
      tr: ["Çişini tutar gibi sık, bekle, sonra tamamen gevşe; günde birkaç kez tekrarla.", "Tekniğinden emin değilsen ebenden kontrol etmesini iste."],
    },
    sources: [S.nhsCommonProblems],
  },

  // ── Travel ─────────────────────────────────────────────────────────────────

  {
    id: "flying",
    category: "travel",
    emoji: "✈️",
    name: { en: "Flying", tr: "Uçak yolculuğu" },
    aliases: {
      en: ["air travel", "plane", "flight", "flying pregnant", "airline", "fit to fly letter"],
      tr: ["uçak", "uçuş", "uçakla seyahat", "havayolu", "uçuş raporu", "uçabilir raporu"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, flying isn't harmful in a healthy pregnancy, but airlines restrict travel late on, so check before you book.",
      tr: "Evet, sağlıklı bir hamilelikte uçmak zararlı değildir; ama havayolları son haftalarda kısıtlama getirir, bilet almadan önce kontrol et.",
    },
    details: {
      en: "The NHS says flying isn't harmful to you or your baby, and the RCOG agrees that air travel is usually safe in an uncomplicated pregnancy. Many airlines don't let you fly after about 36 weeks (32 weeks with twins), and some ask for a letter confirming your due date after 28 weeks. Mid-pregnancy is often the most comfortable time to travel.",
      tr: "NHS uçmanın sana ya da bebeğine zarar vermediğini söyler; RCOG de komplikasyonsuz bir hamilelikte uçak yolculuğunun genellikle güvenli olduğunu belirtir. Pek çok havayolu yaklaşık 36. haftadan sonra (ikizlerde 32. hafta) uçmana izin vermez ve bazıları 28. haftadan sonra doğum tarihini doğrulayan bir yazı ister. Hamileliğin ortası seyahat için genellikle en rahat dönemdir.",
    },
    tips: {
      en: ["Check your airline's pregnancy policy before booking.", "Carry your pregnancy notes, plus a doctor's letter if you're past 28 weeks."],
      tr: ["Bilet almadan önce havayolunun hamilelik politikasını kontrol et.", "Hamilelik dosyanı yanında taşı; 28. haftayı geçtiysen doktorundan bir yazı da al."],
    },
    sources: [S.nhsTravel, S.rcogAirTravel],
  },
  {
    id: "long-haul-flights",
    category: "travel",
    emoji: "🛫",
    name: { en: "Long-haul flights & blood clots", tr: "Uzun uçuşlar ve pıhtı riski" },
    aliases: {
      en: ["long flight", "long-haul", "dvt", "deep vein thrombosis", "compression stockings", "flight socks"],
      tr: ["uzun uçuş", "dvt", "derin ven trombozu", "pıhtı", "varis çorabı", "kompresyon çorabı"],
    },
    verdict: "caution",
    summary: {
      en: "Usually fine, but pregnancy raises the risk of blood clots on journeys over 4 hours, so keep moving and drink water.",
      tr: "Genellikle sorun değil; ama hamilelik 4 saati aşan yolculuklarda pıhtı riskini artırır, hareket etmeye ve su içmeye devam et.",
    },
    details: {
      en: "Travel lasting 4 hours or more increases the risk of deep vein thrombosis (DVT), and pregnancy adds to that risk. ACOG and the RCOG advise drinking plenty of water, wearing loose clothing, and walking and flexing your legs regularly. Graduated compression stockings can help, but check with your doctor first, especially if you have other risk factors.",
      tr: "4 saat ya da daha uzun süren yolculuklar derin ven trombozu (DVT) riskini artırır ve hamilelik bu riske eklenir. ACOG ve RCOG bol su içmeyi, bol kıyafetler giymeyi ve düzenli olarak yürüyüp bacaklarını esnetmeyi önerir. Kademeli kompresyon çorapları yardımcı olabilir; ama özellikle başka risk etkenlerin varsa önce doktoruna danış.",
    },
    tips: {
      en: ["Book an aisle seat and walk around every 30 minutes or so.", "Get urgent help for a painful, swollen leg or sudden breathlessness."],
      tr: ["Koridor tarafında koltuk al ve yaklaşık her 30 dakikada bir dolaş.", "Ağrılı, şişmiş bir bacak ya da ani nefes darlığı olursa acil yardım al."],
    },
    sources: [S.acogTravel, S.rcogAirTravel],
  },
  {
    id: "travel-insurance",
    category: "travel",
    emoji: "📄",
    name: { en: "Travel insurance", tr: "Seyahat sigortası" },
    aliases: {
      en: ["health insurance abroad", "medical evacuation", "travel cover", "ehic", "ghic"],
      tr: ["seyahat sağlık sigortası", "yurt dışı sigorta", "tıbbi tahliye", "seyahat poliçesi"],
    },
    verdict: "caution",
    summary: {
      en: "Get a policy that clearly covers pregnancy, early birth and newborn care, as many standard policies don't.",
      tr: "Hamileliği, erken doğumu ve yenidoğan bakımını açıkça kapsayan bir poliçe al; standart poliçelerin çoğu kapsamaz.",
    },
    details: {
      en: "The CDC notes that many insurance policies don't cover pregnancy-related or newborn care abroad, and strongly recommends cover for these and for medical evacuation. ACOG suggests calling your insurer 4 to 6 weeks before an international trip to check what's included. Look out for week limits, as some policies stop covering pregnancy after a certain point.",
      tr: "CDC, pek çok sigorta poliçesinin yurt dışında hamilelikle ilgili ya da yenidoğan bakımını kapsamadığını belirtir ve bunları ve tıbbi tahliyeyi kapsayan bir poliçeyi şiddetle önerir. ACOG, yurt dışı yolculuğundan 4–6 hafta önce sigortacını arayıp nelerin dahil olduğunu kontrol etmeni önerir. Bazı poliçeler belli bir haftadan sonra hamileliği kapsamadığı için hafta sınırlarına dikkat et.",
    },
    tips: {
      en: ["Ask specifically about premature birth and newborn intensive care.", "Carry your policy details and your pregnancy notes."],
      tr: ["Erken doğumu ve yenidoğan yoğun bakımını özellikle sor.", "Poliçe bilgilerini ve hamilelik dosyanı yanında taşı."],
    },
    sources: [S.cdcPregnantTravelers, S.acogTravel],
  },
  {
    id: "zika-areas",
    category: "travel",
    emoji: "🦟",
    name: { en: "Travel to Zika areas", tr: "Zika riski olan bölgelere seyahat" },
    aliases: {
      en: ["zika", "zika virus", "mosquito areas", "caribbean travel", "brazil", "central america"],
      tr: ["zika", "zika virüsü", "sivrisinek bölgesi", "karayipler", "brezilya", "orta amerika"],
    },
    verdict: "avoid",
    summary: {
      en: "Postpone non-essential travel to areas with Zika, because infection in pregnancy can cause serious birth defects.",
      tr: "Zika görülen bölgelere zorunlu olmayan seyahatlerini ertele, çünkü hamilelikte enfeksiyon ciddi doğum kusurlarına yol açabilir.",
    },
    details: {
      en: "Zika is spread mainly by mosquitoes and can also be passed on through sex. Infection in pregnancy can cause birth defects, including microcephaly, so the NHS recommends postponing non-essential travel to high-risk areas. The risk varies by country and over time, so check up-to-date travel health advice before booking.",
      tr: "Zika çoğunlukla sivrisineklerle, ayrıca cinsel yolla da bulaşır. Hamilelikte enfeksiyon mikrosefali dahil doğum kusurlarına yol açabilir; bu yüzden NHS yüksek riskli bölgelere zorunlu olmayan seyahatlerin ertelenmesini önerir. Risk ülkeye ve zamana göre değişir; rezervasyondan önce güncel seyahat sağlığı önerilerini kontrol et.",
    },
    tips: {
      en: ["If your partner travels to a Zika area, use condoms for the rest of your pregnancy.", "If you must go, use DEET repellent and cover your arms and legs."],
      tr: ["Partnerin Zika bölgesine giderse hamileliğinin geri kalanında prezervatif kullanın.", "Gitmek zorundaysan DEET'li kovucu kullan ve kollarını, bacaklarını ört."],
    },
    sources: [S.nhsZika, S.whoZika],
  },
  {
    id: "malaria-areas",
    category: "travel",
    emoji: "🦟",
    name: { en: "Travel to malaria areas", tr: "Sıtma riski olan bölgelere seyahat" },
    aliases: {
      en: ["malaria", "malaria tablets", "antimalarials", "africa travel", "tropical travel", "safari"],
      tr: ["sıtma", "sıtma ilacı", "afrika seyahati", "tropik seyahat", "safari"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid or delay travel to malaria areas if you can, as malaria is more dangerous in pregnancy and some tablets aren't suitable.",
      tr: "Mümkünse sıtma bölgelerine seyahatten kaçın ya da ertele; sıtma hamilelikte daha tehlikelidir ve bazı ilaçlar uygun değildir.",
    },
    details: {
      en: "Malaria can be more severe in pregnancy and can harm the baby. The CDC advises avoiding or delaying travel to malaria areas in pregnancy, and the NHS notes that some anti-malaria tablets aren't safe to take while you're pregnant. If travel is unavoidable, get specialist advice well in advance.",
      tr: "Sıtma hamilelikte daha ağır seyredebilir ve bebeğe zarar verebilir. CDC hamilelikte sıtma bölgelerine seyahatten kaçınılmasını ya da ertelenmesini önerir; NHS de bazı sıtma ilaçlarının hamilelikte güvenli olmadığını belirtir. Seyahat kaçınılmazsa çok önceden uzman tavsiyesi al.",
    },
    tips: {
      en: ["See a travel clinic 4 to 6 weeks before you go.", "Sleep under a treated net and use DEET repellent."],
      tr: ["Yolculuktan 4–6 hafta önce bir seyahat sağlığı merkezine git.", "İlaçlı cibinlik altında uyu ve DEET'li kovucu kullan."],
    },
    sources: [S.cdcPregnantTravelers, S.nhsMalaria],
  },
  {
    id: "seatbelt",
    category: "travel",
    emoji: "🚗",
    name: { en: "Wearing a seatbelt", tr: "Emniyet kemeri takmak" },
    aliases: {
      en: ["seat belt", "car safety", "lap belt", "pregnancy belt adapter", "car crash"],
      tr: ["emniyet kemeri", "kemer takmak", "araç güvenliği", "hamile kemer aparatı", "trafik kazası"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, always wear it, with the lap belt below your bump and the shoulder strap between your breasts.",
      tr: "Evet, her zaman tak; kucak kemeri karnının altından, omuz kemeri ise göğüslerinin arasından geçsin.",
    },
    details: {
      en: "Seatbelts protect you and your baby in a crash, and road accidents are among the most common causes of injury in pregnancy. The NHS advises placing the cross strap between your breasts and the lap strap across your pelvis under your bump, not across it. ACOG adds that you should wear your seatbelt at all times.",
      tr: "Emniyet kemeri bir kazada seni ve bebeğini korur; trafik kazaları hamilelikte en sık görülen yaralanma nedenleri arasındadır. NHS çapraz kemerin göğüslerinin arasından, kucak kemerinin ise karnının üzerinden değil, altından leğen kemiğinin üzerinden geçmesini önerir. ACOG de kemerin her zaman takılması gerektiğini ekler.",
    },
    tips: {
      en: ["Get checked by your maternity team after any car accident, even if you feel fine."],
      tr: ["Kendini iyi hissetsen bile herhangi bir trafik kazasından sonra doğum ekibine görün."],
    },
    sources: [S.nhsTravel, S.acogTravel],
  },
  {
    id: "driving",
    category: "travel",
    emoji: "🚙",
    name: { en: "Driving", tr: "Araba kullanmak" },
    aliases: {
      en: ["driving pregnant", "car", "commute", "driving third trimester", "steering wheel"],
      tr: ["araç kullanmak", "direksiyon", "işe arabayla gitmek", "hamileyken araba kullanmak"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, you can drive throughout pregnancy if you feel well, but take breaks and adjust your seat as your bump grows.",
      tr: "Evet, kendini iyi hissediyorsan hamileliğin boyunca araba kullanabilirsin; mola ver ve karnın büyüdükçe koltuğunu ayarla.",
    },
    details: {
      en: "Tiredness and dizziness are common in pregnancy, so the NHS suggests stopping regularly, drinking water and eating snacks on long drives. Keep your seatbelt correctly positioned and move your seat back as far as you comfortably can while still reaching the pedals. Avoid driving if you feel faint or very tired.",
      tr: "Hamilelikte yorgunluk ve baş dönmesi sık görülür; bu yüzden NHS uzun yolculuklarda düzenli mola vermeyi, su içmeyi ve atıştırmayı önerir. Emniyet kemerini doğru konumda tut ve koltuğunu pedallara rahatça ulaşabileceğin kadar geriye al. Baygınlık ya da aşırı yorgunluk hissedersen araç kullanma.",
    },
    tips: {
      en: ["On long trips, share the driving and stop every hour or two to stretch."],
      tr: ["Uzun yolculuklarda direksiyonu paylaş ve esnemek için bir iki saatte bir mola ver."],
    },
    sources: [S.nhsTravel, S.acogTravel],
  },
  {
    id: "airport-scanners",
    category: "travel",
    emoji: "🛂",
    name: { en: "Airport security scanners", tr: "Havalimanı güvenlik tarayıcıları" },
    aliases: {
      en: ["body scanner", "airport security", "x-ray scanner", "millimeter wave", "metal detector"],
      tr: ["havalimanı x-ray", "güvenlik kontrolü", "tüm vücut tarayıcı", "metal dedektörü", "x-ray kapısı"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, metal detectors and body scanners are considered safe in pregnancy, as they use little or no radiation.",
      tr: "Evet, metal dedektörleri ve vücut tarayıcıları hamilelikte güvenli kabul edilir; çok az radyasyon kullanırlar ya da hiç kullanmazlar.",
    },
    details: {
      en: "The CDC notes that metal detectors aren't harmful in pregnancy and that the risk from body scanners is extremely low. The FDA explains that millimetre-wave scanners use non-ionising energy, and that the dose from an X-ray body scanner is less than you get from about 42 minutes of everyday natural background radiation. You can ask for a pat-down instead if you prefer.",
      tr: "CDC, metal dedektörlerinin hamilelikte zararsız olduğunu ve vücut tarayıcılarından kaynaklanan riskin son derece düşük olduğunu belirtir. FDA, milimetre dalga tarayıcıların iyonlaştırıcı olmayan enerji kullandığını ve x-ray vücut tarayıcısından alınan dozun, günlük hayatta yaklaşık 42 dakikada doğal kaynaklardan alınan radyasyondan daha az olduğunu açıklar. İstersen bunun yerine elle arama talep edebilirsin.",
    },
    tips: {
      en: ["If it reassures you, ask for a hand search instead."],
      tr: ["İçin rahat edecekse bunun yerine elle arama iste."],
    },
    sources: [S.cdcPregnantTravelers, S.fdaScreening],
  },
  {
    id: "high-altitude",
    category: "travel",
    emoji: "🏔️",
    name: { en: "High altitude", tr: "Yüksek rakım" },
    aliases: {
      en: ["altitude", "mountains", "hiking at altitude", "altitude sickness", "trekking"],
      tr: ["rakım", "dağ", "yayla", "yükseklik hastalığı", "trekking"],
    },
    verdict: "caution",
    summary: {
      en: "Short visits are usually fine, but avoid exercising above about 1,800 metres (6,000 feet) unless you live at altitude.",
      tr: "Kısa ziyaretler genellikle sorun değil; ama yüksek rakımda yaşamıyorsan yaklaşık 1.800 metrenin (6.000 fit) üzerinde egzersiz yapma.",
    },
    details: {
      en: "ACOG advises against exercising above 6,000 feet (about 1,800 metres) in pregnancy if you don't already live at high altitude. The CDC recommends going up slowly and allowing time to acclimatise, and notes that remote areas may be far from medical care. Very high-altitude trekking is best postponed.",
      tr: "ACOG, zaten yüksek rakımda yaşamıyorsan hamilelikte 6.000 fitin (yaklaşık 1.800 metre) üzerinde egzersiz yapmamanı önerir. CDC yavaş yavaş çıkmayı ve vücudun alışması için zaman tanımayı önerir; uzak bölgelerin tıbbi bakımdan uzak olabileceğini de belirtir. Çok yüksek rakımlı trekking'leri ertelemek en iyisi.",
    },
    tips: {
      en: ["Go up gradually and rest more than usual for the first few days.", "Get help for a severe headache, breathlessness or swelling."],
      tr: ["Kademeli çık ve ilk birkaç gün her zamankinden fazla dinlen.", "Şiddetli baş ağrısı, nefes darlığı ya da şişlik olursa yardım al."],
    },
    sources: [S.acogExercise, S.cdcPregnantTravelers],
  },
  {
    id: "cruise",
    category: "travel",
    emoji: "🛳️",
    name: { en: "Cruises & boat trips", tr: "Gemi turu ve tekne gezileri" },
    aliases: {
      en: ["cruise ship", "ferry", "boat trip", "seasickness", "sailing"],
      tr: ["gemi turu", "kruvaziyer", "feribot", "tekne turu", "deniz tutması", "mavi tur"],
    },
    verdict: "caution",
    summary: {
      en: "Often possible earlier in pregnancy, but most cruise lines won't carry you after about 24 weeks, and seasickness can be tough.",
      tr: "Erken dönemde çoğu zaman mümkün; ama çoğu gemi şirketi yaklaşık 24. haftadan sonra kabul etmez ve deniz tutması zorlayabilir.",
    },
    details: {
      en: "The CDC notes that most cruise lines restrict travel beyond 24 weeks and may ask for a doctor's note, and ferry companies have their own limits too. ACOG suggests checking that there's a doctor or nurse on board and medical facilities at the ports. Seasickness can make a cruise harder in pregnancy, so ask in advance which remedies you can use.",
      tr: "CDC, çoğu gemi şirketinin 24. haftadan sonra seyahati kısıtladığını ve doktor raporu isteyebileceğini belirtir; feribot şirketlerinin de kendi sınırları vardır. ACOG gemide bir doktor ya da hemşire bulunduğundan ve uğranacak limanlarda sağlık tesisi olduğundan emin olmanı önerir. Deniz tutması hamilelikte yolculuğu zorlaştırabilir; hangi ilaçları kullanabileceğini önceden sor.",
    },
    tips: {
      en: ["Check the cruise line's pregnancy policy before booking.", "Wash your hands often and carry hand sanitiser."],
      tr: ["Rezervasyondan önce gemi şirketinin hamilelik politikasını kontrol et.", "Ellerini sık sık yıka ve yanında el dezenfektanı taşı."],
    },
    sources: [S.cdcPregnantTravelers, S.acogTravel],
  },
  {
    id: "road-trips",
    category: "travel",
    emoji: "🛣️",
    name: { en: "Long car journeys", tr: "Uzun araba yolculukları" },
    aliases: {
      en: ["road trip", "long drive", "car journey", "bus journey", "coach travel", "train travel"],
      tr: ["uzun yol", "araba yolculuğu", "otobüs yolculuğu", "tren yolculuğu", "şehirlerarası yolculuk"],
    },
    verdict: "caution",
    summary: {
      en: "They're fine with planning: stop regularly to stretch, drink water and keep your seatbelt below your bump.",
      tr: "Planlamayla sorun değil: esnemek için düzenli mola ver, su iç ve emniyet kemerini karnının altından tak.",
    },
    details: {
      en: "The NHS suggests avoiding long car journeys where you can and, if you can't, stopping regularly to walk around. ACOG notes that any journey of 4 hours or more, by car, bus, train or plane, raises your risk of blood clots, and pregnancy adds to it. Flexing your feet and wiggling your toes while you're a passenger helps keep the blood moving.",
      tr: "NHS mümkünse uzun araba yolculuklarından kaçınmayı, kaçınamıyorsan dolaşmak için düzenli mola vermeyi önerir. ACOG, araba, otobüs, tren ya da uçakla 4 saat ve üzeri süren her yolculuğun pıhtı riskini artırdığını ve hamileliğin buna eklendiğini belirtir. Yolcuyken ayaklarını esnetip parmaklarını oynatmak kan dolaşımını sürdürmeye yardım eder.",
    },
    tips: {
      en: ["Plan stops every hour or two and walk for a few minutes.", "Pack water and healthy snacks, and try not to travel alone."],
      tr: ["Bir iki saatte bir mola planla ve birkaç dakika yürü.", "Su ve sağlıklı atıştırmalık al; mümkünse tek başına yolculuk etme."],
    },
    sources: [S.nhsTravel, S.acogTravel],
  },
  {
    id: "travel-vaccines",
    category: "travel",
    emoji: "💉",
    name: { en: "Travel vaccinations", tr: "Seyahat aşıları" },
    aliases: {
      en: ["travel vaccines", "yellow fever vaccine", "typhoid vaccine", "hepatitis a vaccine", "live vaccines", "travel jabs"],
      tr: ["seyahat aşısı", "sarı humma aşısı", "tifo aşısı", "hepatit a aşısı", "canlı aşı"],
    },
    verdict: "caution",
    summary: {
      en: "Non-live vaccines are generally safe in pregnancy, but most live vaccines aren't recommended, so get advice early.",
      tr: "Canlı olmayan aşılar hamilelikte genellikle güvenlidir; ama canlı aşıların çoğu önerilmez, erkenden danış.",
    },
    details: {
      en: "The NHS says inactivated (non-live) vaccines are safe in pregnancy, while most live vaccines aren't recommended, although some may be considered if the risk of infection is high. The CDC lists MMR, chickenpox and live typhoid among vaccines to avoid, with yellow fever needing a case-by-case decision. Plan a travel health appointment 4 to 6 weeks before your trip.",
      tr: "NHS inaktif (canlı olmayan) aşıların hamilelikte güvenli olduğunu, canlı aşıların çoğunun ise önerilmediğini, ancak enfeksiyon riski yüksekse bazılarının değerlendirilebileceğini söyler. CDC kızamık-kabakulak-kızamıkçık (KKK), suçiçeği ve canlı tifo aşısını kaçınılacak aşılar arasında sayar; sarı humma aşısı ise duruma göre değerlendirilir. Yolculuğundan 4–6 hafta önce bir seyahat sağlığı randevusu planla.",
    },
    tips: {
      en: ["Tell the travel clinic you're pregnant before any vaccine is given."],
      tr: ["Herhangi bir aşı yapılmadan önce seyahat sağlığı merkezine hamile olduğunu söyle."],
    },
    sources: [S.nhsTravel, S.cdcPregnantTravelers],
  },
  {
    id: "insect-repellent",
    category: "travel",
    emoji: "🦟",
    name: { en: "Insect repellent (DEET)", tr: "Sinek kovucu (DEET)" },
    aliases: {
      en: ["deet", "mosquito repellent", "insect spray", "icaridin", "picaridin", "bug spray", "ir3535"],
      tr: ["deet", "sinek kovucu", "sivrisinek spreyi", "ikaridin", "böcek kovucu", "sivrisinek losyonu"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, repellents like DEET are recommended in pregnancy where insect bites could spread serious illness.",
      tr: "Evet, sivrisinek ısırıklarının ciddi hastalık bulaştırabileceği yerlerde hamilelikte DEET gibi kovucular önerilir.",
    },
    details: {
      en: "BUMPS says there's no evidence that insect repellents harm the baby, and recommends using them in pregnancy where bites can spread illnesses such as malaria or Zika. Common active ingredients include DEET, icaridin, lemon eucalyptus oil and IR3535, and travel health services can advise which suits your destination. Use them as directed on the label.",
      tr: "BUMPS, sinek kovucuların bebeğe zarar verdiğine dair bir kanıt olmadığını söyler ve sıtma ya da Zika gibi hastalıkların ısırıklarla bulaşabildiği yerlerde hamilelikte kullanılmalarını önerir. Yaygın etken maddeler arasında DEET, ikaridin, limon okaliptüs yağı ve IR3535 bulunur; gideceğin yere hangisinin uygun olduğunu seyahat sağlığı servisleri söyleyebilir. Etiketteki talimatlara uygun kullan.",
    },
    tips: {
      en: ["Cover up with long, loose sleeves and trousers, especially at dusk and dawn."],
      tr: ["Özellikle alacakaranlıkta ve şafakta uzun, bol kollu kıyafetler ve pantolonlarla örtün."],
    },
    sources: [S.bumpsInsectRepellents, S.m2bDEET],
  },

  // ── Home ───────────────────────────────────────────────────────────────────

  {
    id: "microwave",
    category: "home",
    emoji: "🍿",
    name: { en: "Microwave ovens", tr: "Mikrodalga fırın" },
    aliases: {
      en: ["microwave", "microwave radiation", "standing near microwave", "reheating food"],
      tr: ["mikrodalga", "mikrodalga radyasyonu", "mikrodalga önünde durmak", "yemek ısıtmak"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, using a microwave that's in good condition is safe in pregnancy.",
      tr: "Evet, sağlam durumdaki bir mikrodalga fırını kullanmak hamilelikte güvenlidir.",
    },
    details: {
      en: "The FDA says microwave ovens that meet safety standards and are used according to the instructions are safe. The WHO notes that evaluations of everyday electromagnetic fields haven't found an increased risk of miscarriage, birth defects or other pregnancy problems. Microwaves can heat unevenly, so make sure food is steaming hot all the way through.",
      tr: "FDA, güvenlik standartlarını karşılayan ve talimatlara uygun kullanılan mikrodalga fırınların güvenli olduğunu söyler. DSÖ, günlük hayattaki elektromanyetik alanlarla ilgili değerlendirmelerin düşük, doğum kusuru ya da başka gebelik sorunları riskinde bir artış bulmadığını belirtir. Mikrodalga eşit ısıtmayabilir; yiyeceklerin her yerinin dumanı tütene kadar ısındığından emin ol.",
    },
    tips: {
      en: ["Stir food halfway through and let it stand so it heats evenly.", "Don't use an oven with a damaged door or seal."],
      tr: ["Eşit ısınması için yemeği yarısında karıştır ve biraz beklet.", "Kapağı ya da contası hasarlı bir fırını kullanma."],
    },
    sources: [S.fdaMicrowave, S.whoEMF],
  },
  {
    id: "mobile-phone-wifi",
    category: "home",
    emoji: "📱",
    name: { en: "Mobile phones, laptops & Wi-Fi", tr: "Cep telefonu, laptop ve Wi-Fi" },
    aliases: {
      en: ["mobile phone", "cell phone", "wifi", "wi-fi", "laptop on lap", "5g", "phone radiation", "bluetooth"],
      tr: ["cep telefonu", "telefon radyasyonu", "wifi", "modem", "laptop", "5g", "bluetooth"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, everyday use of phones, laptops and Wi-Fi hasn't been shown to harm a pregnancy.",
      tr: "Evet, telefonların, laptopların ve Wi-Fi'ın günlük kullanımının hamileliğe zarar verdiği gösterilmemiştir.",
    },
    details: {
      en: "The FDA says the weight of scientific evidence hasn't linked radio waves from mobile phones with health problems. The WHO notes that exposure to electromagnetic fields at typical everyday levels, from sources such as computer screens, hasn't been found to increase the risk of miscarriage, birth defects or low birth weight. A laptop resting on your lap can get warm, so use a table or cushion for comfort.",
      tr: "FDA, bilimsel kanıtların genel ağırlığının cep telefonlarından yayılan radyo dalgalarını sağlık sorunlarıyla ilişkilendirmediğini söyler. DSÖ, bilgisayar ekranları gibi kaynaklardan günlük düzeyde elektromanyetik alanlara maruz kalmanın düşük, doğum kusuru ya da düşük doğum ağırlığı riskini artırmadığını belirtir. Kucağındaki laptop ısınabilir; rahatlık için masa ya da bir yastık kullan.",
    },
    tips: {
      en: ["Put your phone down an hour before bed to help you sleep."],
      tr: ["Daha iyi uyumak için yatmadan bir saat önce telefonu bırak."],
    },
    sources: [S.fdaCellPhones, S.whoEMF],
  },
  {
    id: "electric-blanket",
    category: "home",
    emoji: "🛏️",
    name: { en: "Electric blankets & heating pads", tr: "Elektrikli battaniye ve ısıtıcı yastık" },
    aliases: {
      en: ["electric blanket", "heated blanket", "heating pad", "hot water bottle", "heated mattress pad"],
      tr: ["elektrikli battaniye", "ısıtıcı battaniye", "elektrikli yastık", "sıcak su torbası", "termofor"],
    },
    verdict: "caution",
    summary: {
      en: "Fine for warming the bed, but switch it off before you sleep so you don't overheat, and keep heating pads on low.",
      tr: "Yatağı ısıtmak için sorun değil; ama aşırı ısınmamak için uyumadan önce kapat ve ısıtıcı yastıkları düşük ayarda kullan.",
    },
    details: {
      en: "The WHO notes that electric blankets are among the everyday sources of electromagnetic fields that have been evaluated without finding an increased risk to pregnancy. The main thing to avoid is overheating, as MotherToBaby notes that a high body temperature in early pregnancy has been linked to neural tube defects. Heating pads are best used on a low setting, wrapped in a towel, for short periods.",
      tr: "DSÖ, elektrikli battaniyelerin değerlendirilen ve gebelik açısından risk artışı bulunmayan günlük elektromanyetik alan kaynakları arasında olduğunu belirtir. Asıl kaçınılması gereken aşırı ısınmadır; MotherToBaby erken hamilelikte yüksek vücut ısısının nöral tüp defektleriyle ilişkilendirildiğini belirtir. Isıtıcı yastıkları düşük ayarda, bir havluya sararak ve kısa süreli kullanmak en iyisi.",
    },
    tips: {
      en: ["Warm the bed, then switch the blanket off before you get in."],
      tr: ["Yatağı ısıt, sonra yatmadan önce battaniyeyi kapat."],
    },
    sources: [S.whoEMF, S.m2bHyperthermia],
  },
  {
    id: "x-rays",
    category: "home",
    emoji: "🦷",
    name: { en: "X-rays, including dental", tr: "Röntgen (diş röntgeni dahil)" },
    aliases: {
      en: ["x-ray", "dental x-ray", "chest x-ray", "radiograph", "panoramic x-ray", "bitewing", "mammogram"],
      tr: ["röntgen", "diş röntgeni", "panoramik röntgen", "akciğer grafisi", "film çekmek", "mamografi"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, if you need one: most X-rays, including dental ones, use very low doses and don't target your bump.",
      tr: "Evet, gerekiyorsa: diş röntgeni dahil çoğu röntgen çok düşük doz kullanır ve karnını hedeflemez.",
    },
    details: {
      en: "Mayo Clinic says the chance of an X-ray harming a baby is very small, and that X-rays of the teeth, head, arms, legs or chest don't directly expose the womb. X-rays of the abdomen or pelvis are different, but the FDA notes that even then the risk is very small and often outweighed by the benefit. Always tell staff you're pregnant so they can plan the safest approach.",
      tr: "Mayo Clinic, bir röntgenin bebeğe zarar verme olasılığının çok küçük olduğunu ve diş, baş, kol, bacak ya da göğüs röntgenlerinin rahmi doğrudan ışına maruz bırakmadığını söyler. Karın ya da leğen bölgesi röntgenleri farklıdır; ancak FDA bu durumda bile riskin çok küçük olduğunu ve çoğu zaman faydanın daha ağır bastığını belirtir. En güvenli yaklaşımı planlayabilmeleri için personele her zaman hamile olduğunu söyle.",
    },
    tips: {
      en: ["Don't put off necessary dental care, and tell your dentist you're pregnant."],
      tr: ["Gerekli diş tedavisini erteleme ve diş hekimine hamile olduğunu söyle."],
    },
    sources: [S.mayoXray, S.fdaXray],
  },
  {
    id: "mri",
    category: "home",
    emoji: "🧲",
    name: { en: "MRI scans", tr: "MR (manyetik rezonans)" },
    aliases: {
      en: ["mri scan", "magnetic resonance", "gadolinium", "contrast dye", "fetal mri"],
      tr: ["mr", "mr çekimi", "manyetik rezonans", "kontrast madde", "gadolinyum"],
    },
    verdict: "caution",
    summary: {
      en: "MRI can be used in pregnancy when needed, as it uses no radiation, but contrast dye is only given if really necessary.",
      tr: "MR radyasyon kullanmadığı için gerektiğinde hamilelikte çekilebilir; ama kontrast madde yalnızca gerçekten gerekliyse verilir.",
    },
    details: {
      en: "MRI uses magnets and radio waves rather than ionising radiation, and ACOG describes ultrasound and MRI as the imaging techniques of choice in pregnancy. MotherToBaby notes that a study of more than 1,700 pregnancies exposed to MRI in the first trimester didn't find an increased chance of birth defects. Contrast dye is used only when the expected benefit outweighs the possible risks.",
      tr: "MR iyonlaştırıcı radyasyon yerine mıknatıs ve radyo dalgaları kullanır; ACOG ultrason ve MR'ı hamilelikte tercih edilen görüntüleme yöntemleri olarak tanımlar. MotherToBaby, ilk üç ayda MR'a maruz kalan 1.700'den fazla gebelik üzerinde yapılan bir çalışmanın doğum kusuru olasılığında artış bulmadığını belirtir. Kontrast madde yalnızca beklenen fayda olası risklerden fazlaysa kullanılır.",
    },
    tips: {
      en: ["Tell the radiographer you're pregnant, and ask whether contrast is needed."],
      tr: ["Çekimi yapan teknisyene hamile olduğunu söyle ve kontrast madde gerekip gerekmediğini sor."],
    },
    sources: [S.m2bMRI, S.acogImaging],
  },
  {
    id: "ct-scan",
    category: "home",
    emoji: "🩻",
    name: { en: "CT scans", tr: "BT (bilgisayarlı tomografi)" },
    aliases: {
      en: ["ct scan", "cat scan", "computed tomography", "ct with contrast"],
      tr: ["tomografi", "bt", "bilgisayarlı tomografi", "kontrastlı tomografi"],
    },
    verdict: "caution",
    summary: {
      en: "If a CT is medically needed it shouldn't be delayed, but tell staff you're pregnant so they can keep the dose low.",
      tr: "Tıbben gerekliyse BT ertelenmemeli; ama dozu düşük tutabilmeleri için personele hamile olduğunu söyle.",
    },
    details: {
      en: "CT scans use X-rays, but ACOG notes that, with few exceptions, the radiation dose from diagnostic imaging is much lower than the level associated with harm to a baby, and that necessary scans shouldn't be withheld. Scans of the head, chest or limbs expose the womb much less than scans of the abdomen or pelvis. Your team may suggest ultrasound or MRI instead if they can answer the same question.",
      tr: "BT röntgen ışını kullanır; ancak ACOG birkaç istisna dışında tanısal görüntülemedeki radyasyon dozunun bebekte zararla ilişkili düzeyin çok altında olduğunu ve gerekli taramaların esirgenmemesi gerektiğini belirtir. Baş, göğüs ya da kol-bacak taramaları rahmi karın ya da leğen bölgesi taramalarından çok daha az etkiler. Aynı soruyu yanıtlayabilecekse ekibin bunun yerine ultrason ya da MR önerebilir.",
    },
    tips: {
      en: ["Mention your pregnancy every time imaging is discussed, including in emergencies."],
      tr: ["Acil durumlar dahil, her görüntüleme konuşulduğunda hamile olduğunu belirt."],
    },
    sources: [S.acogImaging, S.nhsCT],
  },
  {
    id: "bleach",
    category: "home",
    emoji: "🧴",
    name: { en: "Cleaning with bleach", tr: "Çamaşır suyuyla temizlik" },
    aliases: {
      en: ["bleach", "chlorine", "domestos", "disinfectant", "mould spray", "ammonia"],
      tr: ["çamaşır suyu", "klor", "domestos", "ace", "dezenfektan", "amonyak", "tuz ruhu"],
    },
    verdict: "caution",
    summary: {
      en: "Using diluted bleach in a ventilated room is generally fine, but never mix it with other cleaners.",
      tr: "Havalandırılan bir odada seyreltilmiş çamaşır suyu kullanmak genellikle sorun değil; ama asla başka temizleyicilerle karıştırma.",
    },
    details: {
      en: "Nemours KidsHealth, citing the March of Dimes, notes that chemicals like chlorine and ammonia may make you feel sick because of the smell but aren't toxic when used normally. Mixing bleach with ammonia or acidic cleaners such as limescale removers releases dangerous gases. Gloves and open windows keep exposure low.",
      tr: "Nemours KidsHealth, March of Dimes'a dayanarak klor ve amonyak gibi kimyasalların kokuları nedeniyle mideni bulandırabileceğini, ama normal kullanıldıklarında zehirli olmadığını belirtir. Çamaşır suyunu amonyakla ya da tuz ruhu, kireç sökücü gibi asidik temizleyicilerle karıştırmak tehlikeli gazlar açığa çıkarır. Eldiven ve açık pencereler maruziyeti düşük tutar.",
    },
    tips: {
      en: ["Never combine bleach with other products, especially limescale removers.", "Open windows, wear gloves and rinse surfaces well."],
      tr: ["Çamaşır suyunu asla başka ürünlerle, özellikle tuz ruhu ve kireç sökücülerle karıştırma.", "Pencereleri aç, eldiven tak ve yüzeyleri iyice durula."],
    },
    sources: [S.khChemicals],
  },
  {
    id: "mould",
    category: "home",
    emoji: "🦠",
    name: { en: "Mould & damp", tr: "Küf ve rutubet" },
    aliases: {
      en: ["mold", "mould", "damp", "black mould", "black mold", "condensation", "musty smell"],
      tr: ["küf", "rutubet", "nem", "kara küf", "duvarda küf", "küf kokusu"],
    },
    verdict: "caution",
    summary: {
      en: "Get mould removed promptly, ideally by someone else, and avoid scrubbing large patches yourself.",
      tr: "Küfü bir an önce, tercihen başkasına temizlet; büyük alanları kendin ovalamaktan kaçın.",
    },
    details: {
      en: "MotherToBaby notes that mould hasn't been well studied in pregnancy, but some moulds can cause symptoms like a stuffy nose, wheezing or skin irritation, especially if you have asthma. It advises having mould in your home removed as soon as possible. Fixing the source of the damp stops it coming back.",
      tr: "MotherToBaby, küfün hamilelikte yeterince incelenmediğini, ama bazı küflerin özellikle astımın varsa burun tıkanıklığı, hırıltı ya da cilt tahrişi gibi belirtilere yol açabileceğini belirtir. Evindeki küfün bir an önce temizlenmesini önerir. Rutubetin kaynağını gidermek küfün geri gelmesini önler.",
    },
    tips: {
      en: ["Air rooms daily, especially kitchens and bathrooms.", "Ask someone else to clean visible mould, wearing gloves and a mask."],
      tr: ["Odaları, özellikle mutfak ve banyoyu her gün havalandır.", "Görünen küfü eldiven ve maske takan başka birinin temizlemesini iste."],
    },
    sources: [S.m2bMold],
  },
  {
    id: "pets",
    category: "home",
    emoji: "🐕",
    name: { en: "Pets & dogs", tr: "Evcil hayvanlar ve köpekler" },
    aliases: {
      en: ["dog", "pets", "cat", "puppy", "rabbit", "reptiles", "farm animals", "lambing", "sheep"],
      tr: ["köpek", "evcil hayvan", "kedi", "yavru köpek", "tavşan", "sürüngen", "kuzu", "koyun"],
    },
    verdict: "safe",
    summary: {
      en: "Yes, living with dogs and other pets is fine with good hygiene, though cat litter and lambing need extra care.",
      tr: "Evet, iyi hijyenle köpek ve diğer evcil hayvanlarla yaşamak sorun değil; ama kedi kumu ve kuzulama ekstra dikkat ister.",
    },
    details: {
      en: "Most pets pose little risk in pregnancy if you wash your hands after handling them, their food or their mess. The NHS advises avoiding emptying cat litter because of toxoplasma, and avoiding lambing, milking ewes and contact with newborn lambs. Big, bouncy dogs can knock you over as your balance changes, so take care on walks.",
      tr: "Hayvanlara, mamalarına ya da dışkılarına dokunduktan sonra ellerini yıkarsan çoğu evcil hayvan hamilelikte çok az risk taşır. NHS toksoplazma nedeniyle kedi kumunu boşaltmamanı, ayrıca kuzulama, koyun sağma ve yeni doğmuş kuzularla temastan kaçınmanı önerir. Dengen değiştikçe büyük ve hareketli köpekler seni devirebilir, yürüyüşlerde dikkatli ol.",
    },
    tips: {
      en: ["Wash your hands after cleaning up after pets.", "Let someone else handle cat litter."],
      tr: ["Evcil hayvanlarının arkasını temizledikten sonra ellerini yıka.", "Kedi kumunu başkasına bırak."],
    },
    sources: [S.nhsInfections, S.cdcToxo],
  },
  {
    id: "pesticides",
    category: "home",
    emoji: "🐜",
    name: { en: "Pesticides & insect sprays", tr: "Böcek ve tarım ilaçları" },
    aliases: {
      en: ["pesticides", "bug spray", "insecticide", "weed killer", "fumigation", "flea treatment", "pest control"],
      tr: ["böcek ilacı", "ilaçlama", "tarım ilacı", "ot ilacı", "pire ilacı", "haşere ilaçlama", "hamam böceği ilacı"],
    },
    verdict: "caution",
    summary: {
      en: "Avoid mixing or applying pesticides yourself; a professional treatment is unlikely to be a problem if you follow their advice.",
      tr: "Böcek ilacını kendin karıştırma ya da uygulama; uzman bir ilaçlama, verilen talimatlara uyarsan büyük olasılıkla sorun olmaz.",
    },
    details: {
      en: "MotherToBaby advises avoiding mixing and applying pesticides yourself in pregnancy if possible. It notes that having your home treated by a professional exterminator is unlikely to lead to a high enough exposure to increase risks to a pregnancy. Washing produce and your hands before eating lowers exposure from food.",
      tr: "MotherToBaby, mümkünse hamilelikte böcek ilacını kendin karıştırıp uygulamamanı önerir. Evinin profesyonel bir ilaçlamacı tarafından ilaçlanmasının, hamilelik risklerini artıracak düzeyde bir maruziyete yol açmasının olası olmadığını belirtir. Yemeden önce sebze-meyveyi ve ellerini yıkamak besinlerden gelen maruziyeti azaltır.",
    },
    tips: {
      en: ["Stay out of treated rooms for as long as the label or technician advises, and air them well.", "Wear gloves when applying pet flea treatments."],
      tr: ["İlaçlanan odalara etiketin ya da ilaçlamacının söylediği süre boyunca girme ve iyice havalandır.", "Evcil hayvan pire ilaçlarını uygularken eldiven tak."],
    },
    sources: [S.m2bPesticides],
  },
  {
    id: "smoking",
    category: "home",
    emoji: "🚭",
    name: { en: "Smoking", tr: "Sigara içmek" },
    aliases: {
      en: ["cigarettes", "tobacco", "rolling tobacco", "nicotine", "quit smoking", "heated tobacco", "iqos", "cigars"],
      tr: ["sigara", "tütün", "sarma sigara", "nikotin", "sigarayı bırakmak", "ısıtılmış tütün", "iqos", "puro"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid it: stopping smoking is one of the best things you can do for your baby, and it's never too late to quit.",
      tr: "Kaçın: sigarayı bırakmak bebeğin için yapabileceğin en iyi şeylerden biridir ve bırakmak için asla geç değildir.",
    },
    details: {
      en: "Smoking in pregnancy increases the risk of miscarriage, stillbirth, premature birth and a baby who doesn't grow well, as well as sudden infant death. The WHO says all forms of tobacco use are harmful, including heated tobacco. The NHS says nicotine replacement therapy, such as patches or gum, can be used in pregnancy if it helps you stop.",
      tr: "Hamilelikte sigara içmek düşük, ölü doğum, erken doğum ve bebeğin yeterince büyümemesi riskini, ayrıca ani bebek ölümü riskini artırır. DSÖ, ısıtılmış tütün dahil tütünün her türlü kullanımının zararlı olduğunu söyler. NHS, sigarayı bırakmana yardım edecekse bant ya da sakız gibi nikotin replasman tedavisinin hamilelikte kullanılabileceğini belirtir.",
    },
    tips: {
      en: ["Ask your midwife or GP about free stop-smoking support.", "Make your home and car smoke-free for everyone."],
      tr: ["Ebenden ya da ALO 171 Sigara Bırakma Danışma Hattı'ndan destek iste.", "Evini ve arabanı herkes için dumansız hale getir."],
    },
    sources: [S.nhsSmoking, S.whoTobacco],
  },
  {
    id: "vaping",
    category: "home",
    emoji: "💨",
    name: { en: "Vaping & e-cigarettes", tr: "Elektronik sigara (vape)" },
    aliases: {
      en: ["vape", "e-cigarette", "e-cig", "juul", "elf bar", "disposable vape", "nicotine pouches"],
      tr: ["elektronik sigara", "e-sigara", "vape", "puff", "nikotin poşeti"],
    },
    verdict: "avoid",
    summary: {
      en: "Not recommended in pregnancy, though if it's helping you stay off cigarettes, it's far less harmful than smoking.",
      tr: "Hamilelikte önerilmez; ama sigaradan uzak durmana yardım ediyorsa sigara içmekten çok daha az zararlıdır.",
    },
    details: {
      en: "BUMPS says vaping isn't recommended in pregnancy and might increase the risk of premature birth and low birth weight. The NHS notes that e-cigarettes are much less risky than smoking, so if vaping has helped you quit cigarettes, it's still safer than going back to smoking. Nicotine replacement, such as patches or gum, is the recommended way to stop.",
      tr: "BUMPS hamilelikte vape kullanımının önerilmediğini ve erken doğum ile düşük doğum ağırlığı riskini artırabileceğini söyler. NHS ise e-sigaraların sigaradan çok daha az riskli olduğunu belirtir; yani vape sigarayı bırakmana yardım ettiyse sigaraya geri dönmekten yine de daha güvenlidir. Bırakmak için önerilen yol bant ya da sakız gibi nikotin replasman tedavisidir.",
    },
    tips: {
      en: ["Talk to your midwife about switching to patches or gum to come off nicotine."],
      tr: ["Nikotini bırakmak için bant ya da sakıza geçmeyi ebenle konuş."],
    },
    sources: [S.bumpsVaping, S.nhsSmoking],
  },
  {
    id: "second-hand-smoke",
    category: "home",
    emoji: "🚬",
    name: { en: "Second-hand smoke", tr: "Pasif içicilik" },
    aliases: {
      en: ["passive smoking", "secondhand smoke", "smoky rooms", "partner smoking", "third-hand smoke"],
      tr: ["pasif içicilik", "sigara dumanı", "partnerin sigara içmesi", "dumanlı ortam", "üçüncü el duman"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid it as much as you can, as other people's smoke can lower your baby's birth weight and affect their health.",
      tr: "Mümkün olduğunca uzak dur; başkalarının sigara dumanı bebeğinin doğum ağırlığını düşürebilir ve sağlığını etkileyebilir.",
    },
    details: {
      en: "The NHS says second-hand smoke can reduce your baby's birth weight and increase the risk of sudden infant death syndrome. The WHO states that there's no safe level of exposure to second-hand tobacco smoke. A smoke-free home and car protects you now and your baby after the birth.",
      tr: "NHS, pasif içiciliğin bebeğinin doğum ağırlığını azaltabileceğini ve ani bebek ölümü sendromu riskini artırabileceğini söyler. DSÖ, ikinci el tütün dumanına maruz kalmanın güvenli bir düzeyi olmadığını belirtir. Dumansız bir ev ve araba seni şimdi, bebeğini de doğumdan sonra korur.",
    },
    tips: {
      en: ["Ask partners and visitors to smoke outside, away from doors and windows.", "Choose smoke-free cafés and restaurants."],
      tr: ["Partnerinden ve misafirlerden kapı ve pencerelerden uzakta, dışarıda içmelerini iste.", "Dumansız kafe ve restoranları tercih et."],
    },
    sources: [S.nhsSmoking, S.whoTobacco],
  },
  {
    id: "shisha",
    category: "home",
    emoji: "💨",
    name: { en: "Shisha (hookah)", tr: "Nargile" },
    aliases: {
      en: ["hookah", "shisha", "waterpipe", "hubble bubble", "narghile", "shisha cafe"],
      tr: ["nargile", "nargile kafe", "nargile dumanı", "meyveli nargile"],
    },
    verdict: "avoid",
    summary: {
      en: "Avoid it: shisha is tobacco smoking, and the charcoal adds carbon monoxide, so steer clear of shisha cafés too.",
      tr: "Kaçın: nargile de tütün içmektir ve kömürü ek karbonmonoksit üretir; nargile kafelerden de uzak dur.",
    },
    details: {
      en: "The WHO lists waterpipe tobacco among tobacco products and says all forms of tobacco use are harmful, whatever the flavour. The charcoal used to heat shisha produces carbon monoxide, which MotherToBaby notes takes much longer to clear from a baby's blood than from an adult's. Smoky, enclosed shisha lounges also expose you to second-hand smoke.",
      tr: "DSÖ, nargile tütününü tütün ürünleri arasında sayar ve aroması ne olursa olsun tütünün her türlü kullanımının zararlı olduğunu söyler. Nargileyi yakmak için kullanılan kömür karbonmonoksit üretir; MotherToBaby bunun bebeğin kanından temizlenmesinin bir yetişkine göre çok daha uzun sürdüğünü belirtir. Kapalı ve dumanlı nargile salonları seni ayrıca pasif içiciliğe maruz bırakır.",
    },
    tips: {
      en: ["Meet friends in smoke-free places for now."],
      tr: ["Şimdilik arkadaşlarınla dumansız mekanlarda buluş."],
    },
    sources: [S.whoTobacco, S.m2bCO],
  },
  {
    id: "carbon-monoxide",
    category: "home",
    emoji: "⚠️",
    name: { en: "Carbon monoxide (stoves & heaters)", tr: "Karbonmonoksit (soba ve şofben)" },
    aliases: {
      en: ["carbon monoxide", "co poisoning", "gas heater", "boiler", "coal stove", "co alarm", "fumes"],
      tr: ["karbonmonoksit", "soba zehirlenmesi", "şofben", "kombi", "kömür sobası", "doğalgaz sobası", "karbonmonoksit dedektörü"],
    },
    verdict: "avoid",
    summary: {
      en: "Make sure stoves, boilers and water heaters are safe and fit a CO alarm, as carbon monoxide is especially harmful in pregnancy.",
      tr: "Soba, kombi ve şofbenlerin güvenli olduğundan emin ol ve karbonmonoksit dedektörü tak; karbonmonoksit hamilelikte özellikle zararlıdır.",
    },
    details: {
      en: "Carbon monoxide is an invisible, odourless gas released by faulty fuel-burning appliances such as stoves, boilers and gas water heaters. MotherToBaby notes that once it reaches the baby's blood, it takes much longer to clear than it does for an adult. Headaches, dizziness or nausea that ease when you leave the house can be a warning sign.",
      tr: "Karbonmonoksit; arızalı soba, kombi ve şofben gibi yakıt yakan cihazlardan çıkan, görünmeyen ve kokusuz bir gazdır. MotherToBaby, bebeğin kanına ulaştığında bunun bebekten temizlenmesinin bir yetişkine göre çok daha uzun sürdüğünü belirtir. Evden çıkınca hafifleyen baş ağrısı, baş dönmesi ya da bulantı bir uyarı işareti olabilir.",
    },
    tips: {
      en: ["Have stoves, chimneys and water heaters checked every year.", "If you suspect carbon monoxide, get into fresh air and seek urgent medical help."],
      tr: ["Soba, baca ve şofbenlerini her yıl kontrol ettir.", "Karbonmonoksitten şüphelenirsen hemen temiz havaya çık ve acil tıbbi yardım al."],
    },
    sources: [S.nhsCO, S.m2bCO],
  },
];
