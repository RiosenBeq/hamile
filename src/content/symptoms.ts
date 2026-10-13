// "Is this normal?" — bundled, bilingual symptom guide.
//
// Tone: calm and honest. Each entry explains why a symptom happens and how
// common it is, lists safe self-care (no medicine names or doses), and spells
// out specific red flags. `urgent` marks symptoms that can themselves be an
// emergency sign. Emergency numbers are never hard-coded here — the UI pairs
// "emergency services" with the right number from EMERGENCY_NUMBERS.
//
// Every source URL below was checked to load in October 2026 (NHS moved its
// symptom pages from /pregnancy/related-conditions/… to /pregnancy/common-symptoms/…).

import type { Source, SymptomGuide } from './types';

const src = (name: string, url: string): Source => ({ name, url });

const S = {
  // NHS (UK)
  nhsSickness: src('NHS: Vomiting and morning sickness', 'https://www.nhs.uk/pregnancy/common-symptoms/vomiting-and-morning-sickness/'),
  nhsSevereVomiting: src('NHS: Severe vomiting in pregnancy', 'https://www.nhs.uk/pregnancy/complications/severe-vomiting/'),
  nhsTiredness: src('NHS: Tiredness and sleep problems in pregnancy', 'https://www.nhs.uk/pregnancy/common-symptoms/tiredness/'),
  nhsBleeding: src('NHS: Vaginal bleeding in pregnancy', 'https://www.nhs.uk/pregnancy/common-symptoms/vaginal-bleeding/'),
  nhsStomachPain: src('NHS: Stomach pain in pregnancy', 'https://www.nhs.uk/pregnancy/common-symptoms/stomach-pain/'),
  nhsBackPain: src('NHS: Back pain in pregnancy', 'https://www.nhs.uk/pregnancy/common-symptoms/back-pain/'),
  nhsPelvicPain: src('NHS: Pelvic pain in pregnancy', 'https://www.nhs.uk/pregnancy/common-symptoms/pelvic-pain/'),
  nhsHeadaches: src('NHS: Headaches in pregnancy', 'https://www.nhs.uk/pregnancy/common-symptoms/headaches/'),
  nhsHeartburn: src('NHS: Indigestion and heartburn in pregnancy', 'https://www.nhs.uk/pregnancy/common-symptoms/indigestion-and-heartburn/'),
  nhsPiles: src('NHS: Piles in pregnancy', 'https://www.nhs.uk/pregnancy/common-symptoms/piles/'),
  nhsStretchMarks: src('NHS: Stretch marks in pregnancy', 'https://www.nhs.uk/pregnancy/common-symptoms/stretch-marks/'),
  nhsSwelling: src('NHS: Swollen ankles, feet and fingers in pregnancy', 'https://www.nhs.uk/pregnancy/common-symptoms/swollen-ankles-feet-and-fingers/'),
  nhsThrush: src('NHS: Thrush in pregnancy', 'https://www.nhs.uk/pregnancy/common-symptoms/thrush/'),
  nhsDischarge: src('NHS: Vaginal discharge in pregnancy', 'https://www.nhs.uk/pregnancy/common-symptoms/vaginal-discharge/'),
  nhsCommon: src('NHS: Common health problems in pregnancy', 'https://www.nhs.uk/pregnancy/common-symptoms/common-health-problems/'),
  nhsGetHelp: src('NHS: Pregnancy symptoms you need to get help for', 'https://www.nhs.uk/pregnancy/common-symptoms/pregnancy-symptoms-you-need-to-get-help-for/'),
  nhsItching: src('NHS: Itching in pregnancy', 'https://www.nhs.uk/pregnancy/complications/itching-and-intrahepatic-cholestasis/'),
  nhsMovements: src('NHS: Your baby\'s movements', 'https://www.nhs.uk/pregnancy/keeping-well/your-babys-movements/'),
  nhsLabourSigns: src('NHS: Signs that labour has begun', 'https://www.nhs.uk/pregnancy/labour-and-birth/signs-that-labour-has-begun/'),
  nhsAnxiety: src('NHS: Anxiety in pregnancy', 'https://www.nhs.uk/pregnancy/mental-health-in-pregnancy-and-after-the-birth/anxiety-in-pregnancy/'),
  nhsDepression: src('NHS: Depression in pregnancy', 'https://www.nhs.uk/pregnancy/mental-health-in-pregnancy-and-after-the-birth/depression/'),
  nhsMentalHealth: src('NHS: Mental health in pregnancy', 'https://www.nhs.uk/pregnancy/mental-health-in-pregnancy-and-after-the-birth/mental-health/'),
  nhsPreEclampsia: src('NHS: Pre-eclampsia', 'https://www.nhs.uk/conditions/pre-eclampsia/'),
  nhsEctopic: src('NHS: Ectopic pregnancy', 'https://www.nhs.uk/conditions/ectopic-pregnancy/'),
  nhsDvt: src('NHS: DVT (deep vein thrombosis)', 'https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/'),
  nhsRestlessLegs: src('NHS: Restless legs syndrome', 'https://www.nhs.uk/conditions/restless-legs-syndrome/'),
  nhsCarpalTunnel: src('NHS: Carpal tunnel syndrome', 'https://www.nhs.uk/conditions/carpal-tunnel-syndrome/'),
  nhsPalpitations: src('NHS: Heart palpitations', 'https://www.nhs.uk/symptoms/heart-palpitations/'),
  nhsNosebleed: src('NHS: Nosebleed', 'https://www.nhs.uk/conditions/nosebleed/'),
  nhsUti: src('NHS: Urinary tract infections (UTIs)', 'https://www.nhs.uk/conditions/urinary-tract-infections-utis/'),
  nhsAcne: src('NHS: Acne', 'https://www.nhs.uk/conditions/acne/'),
  nhsSuicidalThoughts: src('NHS: Help for suicidal thoughts', 'https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/behaviours/help-for-suicidal-thoughts/'),

  // ACOG (US)
  acogSickness: src('ACOG: Morning sickness', 'https://www.acog.org/womens-health/faqs/morning-sickness-nausea-and-vomiting-of-pregnancy'),
  acogBleeding: src('ACOG: Bleeding during pregnancy', 'https://www.acog.org/womens-health/faqs/bleeding-during-pregnancy'),
  acogBackPain: src('ACOG: Back pain during pregnancy', 'https://www.acog.org/womens-health/faqs/back-pain-during-pregnancy'),
  acogSkin: src('ACOG: Skin conditions during pregnancy', 'https://www.acog.org/womens-health/faqs/skin-conditions-during-pregnancy'),
  acogPreeclampsia: src('ACOG: Preeclampsia and high blood pressure during pregnancy', 'https://www.acog.org/womens-health/faqs/preeclampsia-and-high-blood-pressure-during-pregnancy'),
  acogLabour: src('ACOG: How to tell when labor begins', 'https://www.acog.org/womens-health/faqs/how-to-tell-when-labor-begins'),
  acogDepression: src('ACOG: Depression during pregnancy', 'https://www.acog.org/womens-health/faqs/depression-during-pregnancy'),
  acogVaginitis: src('ACOG: Vaginitis', 'https://www.acog.org/womens-health/faqs/vaginitis'),

  // RCOG (UK)
  rcogSickness: src('RCOG: Pregnancy sickness and hyperemesis gravidarum', 'https://www.rcog.org.uk/for-the-public/browse-our-patient-information/pregnancy-sickness-nausea-and-vomiting-of-pregnancy-and-hyperemesis-gravidarum/'),
  rcogPgp: src('RCOG: Pelvic girdle pain and pregnancy', 'https://www.rcog.org.uk/for-the-public/browse-our-patient-information/pelvic-girdle-pain-and-pregnancy/'),
  rcogIcp: src('RCOG: Intrahepatic cholestasis of pregnancy', 'https://www.rcog.org.uk/for-the-public/browse-our-patient-information/intrahepatic-cholestasis-of-pregnancy/'),
  rcogMovements: src('RCOG: Your baby\'s movements in pregnancy', 'https://www.rcog.org.uk/for-the-public/browse-our-patient-information/your-babys-movements-in-pregnancy/'),
  rcogWaters: src('RCOG: When your waters break prematurely', 'https://www.rcog.org.uk/for-the-public/browse-our-patient-information/when-your-waters-break-prematurely/'),
  rcogClotRisk: src('RCOG: Reducing the risk of venous thrombosis in pregnancy', 'https://www.rcog.org.uk/for-the-public/browse-our-patient-information/reducing-the-risk-of-venous-thrombosis-in-pregnancy-and-after-birth/'),
  rcogClotTreatment: src('RCOG: Diagnosis and treatment of venous thrombosis in pregnancy', 'https://www.rcog.org.uk/for-the-public/browse-our-patient-information/diagnosis-and-treatment-of-venous-thrombosis-in-pregnancy-and-after-birth/'),
  rcogEctopic: src('RCOG: Ectopic pregnancy', 'https://www.rcog.org.uk/for-the-public/browse-our-patient-information/ectopic-pregnancy/'),

  // Cleveland Clinic (US)
  ccFirstTrimester: src('Cleveland Clinic: First trimester', 'https://my.clevelandclinic.org/health/articles/9699-first-trimester'),
  ccSecondTrimester: src('Cleveland Clinic: Second trimester', 'https://my.clevelandclinic.org/health/articles/16092-pregnancy-second-trimester'),
  ccThirdTrimester: src('Cleveland Clinic: Third trimester', 'https://my.clevelandclinic.org/health/articles/third-trimester'),
  ccFrequentUrination: src('Cleveland Clinic: Frequent urination', 'https://my.clevelandclinic.org/health/symptoms/15533-frequent-urination'),
  ccPregnancyPains: src('Cleveland Clinic: Abdominal pain and cramps during pregnancy', 'https://my.clevelandclinic.org/health/symptoms/pregnancy-pains'),
  ccRoundLigament: src('Cleveland Clinic: Round ligament pain', 'https://my.clevelandclinic.org/health/symptoms/21642-round-ligament-pain'),
  ccConstipation: src('Cleveland Clinic: Constipation during pregnancy', 'https://my.clevelandclinic.org/health/diseases/21895-pregnancy-constipation'),
  ccHemorrhoids: src('Cleveland Clinic: Hemorrhoids during pregnancy', 'https://my.clevelandclinic.org/health/diseases/23498-pregnancy-hemorrhoids'),
  ccFoodAversion: src('Cleveland Clinic: Food aversion', 'https://my.clevelandclinic.org/health/diseases/22948-food-aversion'),
  ccDysgeusia: src('Cleveland Clinic: Dysgeusia (altered taste)', 'https://my.clevelandclinic.org/health/diseases/22047-dysgeusia'),
  ccSaliva: src('Cleveland Clinic: Saliva', 'https://my.clevelandclinic.org/health/body/saliva'),
  ccNosebleeds: src('Cleveland Clinic: Nosebleeds during pregnancy', 'https://my.clevelandclinic.org/health/symptoms/22342-nosebleeds-while-pregnant'),
  ccGingivitis: src('Cleveland Clinic: Pregnancy gingivitis', 'https://my.clevelandclinic.org/health/diseases/22484-pregnancy-gingivitis'),
  ccRhinitis: src('Cleveland Clinic: Pregnancy rhinitis', 'https://my.clevelandclinic.org/health/diseases/pregnancy-rhinitis'),
  ccPalpitations: src('Cleveland Clinic: Heart palpitations in pregnancy', 'https://my.clevelandclinic.org/health/diseases/21941-heart-palpitations-in-pregnancy'),
  ccLegCramps: src('Cleveland Clinic: Leg cramps', 'https://my.clevelandclinic.org/health/diseases/14170-leg-cramps'),
  ccRestlessLegs: src('Cleveland Clinic: Restless legs syndrome', 'https://my.clevelandclinic.org/health/diseases/9497-restless-legs-syndrome'),
  ccVaricose: src('Cleveland Clinic: Varicose veins during pregnancy', 'https://my.clevelandclinic.org/health/diseases/23331-varicose-veins-in-pregnancy'),
  ccLineaNigra: src('Cleveland Clinic: Linea nigra', 'https://my.clevelandclinic.org/health/body/23488-linea-nigra'),
  ccPuppp: src('Cleveland Clinic: PUPPP rash', 'https://my.clevelandclinic.org/health/diseases/22374-puppp-rash'),
  ccUti: src('Cleveland Clinic: UTI during pregnancy', 'https://my.clevelandclinic.org/health/diseases/uti-during-pregnancy'),
  ccInsomnia: src('Cleveland Clinic: Pregnancy insomnia', 'https://my.clevelandclinic.org/health/diseases/pregnancy-insomnia'),
  ccMoodSwings: src('Cleveland Clinic: Mood swings', 'https://my.clevelandclinic.org/health/symptoms/mood-swings'),
  ccBrainFog: src('Cleveland Clinic: Brain fog', 'https://my.clevelandclinic.org/health/symptoms/brain-fog'),
  ccCarpalTunnel: src('Cleveland Clinic: Carpal tunnel syndrome', 'https://my.clevelandclinic.org/health/diseases/4005-carpal-tunnel-syndrome'),
  ccBraxtonHicks: src('Cleveland Clinic: Braxton Hicks contractions', 'https://my.clevelandclinic.org/health/symptoms/22965-braxton-hicks'),

  // CDC (US) and T.C. Sağlık Bakanlığı (TR)
  cdcWarningSigns: src('CDC Hear Her: Urgent maternal warning signs', 'https://www.cdc.gov/hearher/maternal-warning-signs/index.html'),
  hsgmNutrition: src('T.C. Sağlık Bakanlığı: Gebelik döneminde beslenme', 'https://hsgm.saglik.gov.tr/tr/beslenme/gebelik-donemi-beslenme.html'),
};

export const SYMPTOMS: SymptomGuide[] = [
  // ── Sickness, tiredness and early changes ────────────────────────────────
  {
    id: 'morning-sickness',
    emoji: '🤢',
    name: { en: 'Nausea and vomiting (morning sickness)', tr: 'Bulantı ve kusma (sabah bulantısı)' },
    aliases: {
      en: ['morning sickness', 'nausea', 'feeling sick', 'vomiting', 'throwing up', 'NVP'],
      tr: ['sabah bulantısı', 'mide bulantısı', 'kusma', 'midem bulanıyor', 'gebelik bulantısı', 'öğürme'],
    },
    trimesters: [1, 2],
    about: {
      en: 'Feeling sick is one of the most common pregnancy symptoms, affecting around 8 in 10 people. Rising hormones are the likely cause, and despite the name it can strike at any time of day or night. It usually starts between weeks 4 and 7 and settles by weeks 16 to 20 for most, and it does not harm your baby.',
      tr: 'Bulantı, gebeliğin en sık görülen belirtilerinden biri; yaklaşık her on kişiden sekizini etkiliyor. Büyük olasılıkla yükselen hormonlardan kaynaklanıyor ve adına rağmen günün ya da gecenin her saatinde ortaya çıkabiliyor. Genellikle 4-7. haftalarda başlar, çoğu kişide 16-20. haftalarda geçer ve bebeğine zarar vermez.',
    },
    relief: {
      en: [
        'Eat small, frequent snacks so your stomach is never empty; plain, starchy foods like crackers or toast are often easiest.',
        'Keep a plain biscuit by your bed and nibble it before you get up.',
        'Sip fluids little and often between meals rather than with them.',
        'Try ginger foods or drinks, and avoid smells that set you off; cold food often smells less.',
        'Rest when you can, as tiredness can make nausea worse.',
      ],
      tr: [
        'Miden hiç boş kalmasın diye az az ve sık ye; kraker, kuru ekmek gibi sade, nişastalı yiyecekler genelde daha kolay gider.',
        'Yatağının yanında sade bir bisküvi bulundur, kalkmadan önce birkaç ısırık al.',
        'Sıvıları öğünlerle birlikte değil, öğün aralarında yudum yudum iç.',
        'Zencefilli yiyecek ya da içecekleri dene, tetikleyen kokulardan uzak dur; soğuk yemekler daha az kokar.',
        'Fırsat buldukça dinlen; yorgunluk bulantıyı artırabilir.',
      ],
    },
    callDoctor: {
      en: [
        'Call your midwife or doctor the same day if you can\'t keep food or fluids down for 24 hours.',
        'Call the same day if your pee is very dark, you haven\'t peed for 8 hours, or you feel faint when you stand up.',
        'Call the same day if you have tummy pain or a fever with the sickness, or you\'re losing weight.',
        'Call your doctor straight away if you vomit blood.',
      ],
      tr: [
        '24 saat boyunca hiçbir yiyecek ya da sıvıyı midende tutamıyorsan aynı gün doktorunu ya da ebeni ara.',
        'İdrarın çok koyuysa, 8 saattir idrara çıkmadıysan ya da ayağa kalkınca bayılacak gibi oluyorsan aynı gün ara.',
        'Bulantıya karın ağrısı ya da ateş eşlik ediyorsa veya kilo kaybediyorsan aynı gün ara.',
        'Kan kusarsan vakit kaybetmeden doktorunu ara.',
      ],
    },
    urgent: false,
    sources: [S.nhsSickness, S.acogSickness],
  },
  {
    id: 'severe-vomiting',
    emoji: '🤮',
    name: { en: 'Severe vomiting (hyperemesis gravidarum)', tr: 'Şiddetli kusma (hiperemezis gravidarum)' },
    aliases: {
      en: ['hyperemesis gravidarum', 'HG', 'severe morning sickness', 'can\'t keep water down', 'dehydration', 'vomiting all day'],
      tr: ['hiperemezis gravidarum', 'aşırı kusma', 'şiddetli kusma', 'su bile içemiyorum', 'susuz kalma', 'sürekli kusma'],
    },
    trimesters: [1, 2],
    about: {
      en: 'Hyperemesis gravidarum is a severe form of pregnancy sickness that affects up to 3 in 100 pregnancies. Being sick many times a day can quickly leave you dehydrated and drained, so it needs medical treatment rather than just toughing it out. Effective, pregnancy-safe treatments exist, and asking for help early makes a real difference.',
      tr: 'Hiperemezis gravidarum, gebelik bulantısının ağır bir biçimi ve her 100 gebelikten 3 kadarını etkiliyor. Günde defalarca kusmak seni hızla susuz ve bitkin bırakabilir; bu yüzden dişini sıkıp katlanman değil, tedavi alman gerekir. Gebelikte güvenle kullanılabilen etkili tedaviler var ve erken yardım istemek gerçekten fark yaratır.',
    },
    relief: {
      en: [
        'Sip small amounts of water, diluted juice or ice chips often rather than drinking a lot at once.',
        'Rest as much as you can and accept practical help with work, meals and childcare.',
        'Keep a simple note of how often you\'re sick and what stays down, to share with your doctor.',
        'Ask your doctor about pregnancy-safe anti-sickness treatment; you don\'t have to wait until it\'s unbearable.',
      ],
      tr: [
        'Bir seferde çok içmek yerine sık sık küçük yudumlarla su, sulandırılmış meyve suyu ya da buz parçaları al.',
        'Elinden geldiğince dinlen; iş, yemek ve çocuk bakımı için gelen yardımı kabul et.',
        'Ne sıklıkla kustuğunu ve neyin midende kaldığını basitçe not al, doktorunla paylaş.',
        'Doktoruna gebelikte güvenli bulantı tedavilerini sor; dayanılmaz hale gelmesini beklemek zorunda değilsin.',
      ],
    },
    callDoctor: {
      en: [
        'Call your doctor or midwife now if you can\'t keep food or fluids down for 24 hours.',
        'Call now if your pee is dark or you haven\'t peed for 8 hours; these are signs of dehydration.',
        'Get help now if you feel very weak, dizzy or faint, or you\'re losing weight.',
        'Call emergency services if you vomit blood, faint, or feel confused.',
      ],
      tr: [
        '24 saat boyunca hiçbir yiyecek ya da sıvıyı midende tutamıyorsan hemen doktorunu ya da ebeni ara.',
        'İdrarın koyuysa ya da 8 saattir idrara çıkmadıysan hemen ara; bunlar susuz kalmanın işaretleri.',
        'Çok halsiz hissediyorsan, başın dönüyorsa, bayılacak gibiysen ya da kilo kaybediyorsan hemen yardım al.',
        'Kan kusarsan, bayılırsan ya da zihnin bulanıklaşırsa acil yardım hattını ara.',
      ],
    },
    urgent: true,
    sources: [S.nhsSevereVomiting, S.rcogSickness],
  },
  {
    id: 'tiredness',
    emoji: '😴',
    name: { en: 'Tiredness and exhaustion', tr: 'Yorgunluk ve bitkinlik' },
    aliases: {
      en: ['tiredness', 'fatigue', 'exhausted', 'always sleepy', 'no energy'],
      tr: ['yorgunluk', 'halsizlik', 'bitkinlik', 'uyku hali', 'enerjim yok'],
    },
    trimesters: [1, 3],
    about: {
      en: 'Feeling wiped out is very common, especially in the first 12 weeks, when hormone changes and all the extra work your body is doing can leave you exhausted. Energy often returns in the second trimester, then dips again as your bump grows and sleep gets harder. Tiredness itself won\'t harm you or your baby.',
      tr: 'Kendini tükenmiş hissetmek çok yaygın; özellikle ilk 12 haftada hormon değişiklikleri ve vücudunun yaptığı ekstra iş seni bitkin düşürebilir. Enerjin genellikle ikinci trimesterde geri gelir, karnın büyüdükçe ve uyumak zorlaştıkça yeniden azalabilir. Yorgunluğun kendisi sana da bebeğine de zarar vermez.',
    },
    relief: {
      en: [
        'Rest whenever you can, even 15 minutes with your feet up, and try going to bed a little earlier.',
        'Accept offers of help from family, friends and colleagues.',
        'Eat regular, balanced meals and keep healthy snacks handy to steady your energy.',
        'A short walk or gentle exercise can actually lift your energy.',
      ],
      tr: [
        'Fırsat buldukça dinlen, 15 dakika ayaklarını uzatmak bile iyi gelir; biraz daha erken yatmayı dene.',
        'Ailenden, arkadaşlarından ve iş arkadaşlarından gelen yardım tekliflerini kabul et.',
        'Enerjini dengede tutmak için düzenli, dengeli öğünler ye ve yanında sağlıklı atıştırmalıklar bulundur.',
        'Kısa bir yürüyüş ya da hafif egzersiz enerjini artırabilir.',
      ],
    },
    callDoctor: {
      en: [
        'Tell your midwife or doctor if you\'re also breathless, pale, dizzy or have a racing heart; they may check for anaemia.',
        'Talk to your midwife or doctor if tiredness comes with low mood, hopelessness or losing interest in things.',
        'Call the same day if exhaustion feels overwhelming or comes with fever, vomiting or feeling very unwell.',
      ],
      tr: [
        'Nefes darlığı, solukluk, baş dönmesi ya da çarpıntı da varsa doktoruna ya da ebene söyle; kansızlığa bakılabilir.',
        'Yorgunluğa çökkünlük, umutsuzluk ya da hiçbir şeyden zevk alamama eşlik ediyorsa doktorunla ya da ebenle konuş.',
        'Bitkinlik baş edilemez düzeydeyse ya da ateş, kusma veya kendini çok kötü hissetmeyle birlikteyse aynı gün ara.',
      ],
    },
    urgent: false,
    sources: [S.nhsTiredness, S.cdcWarningSigns],
  },
  {
    id: 'breast-tenderness',
    emoji: '👙',
    name: { en: 'Sore or tender breasts', tr: 'Göğüslerde hassasiyet ve ağrı' },
    aliases: {
      en: ['breast tenderness', 'sore breasts', 'sore nipples', 'swollen breasts', 'breast changes'],
      tr: ['göğüs hassasiyeti', 'meme ağrısı', 'göğüs ağrısı', 'meme ucu hassasiyeti', 'göğüslerde dolgunluk'],
    },
    trimesters: [1],
    about: {
      en: 'Tender, fuller, tingly breasts are often one of the very first signs of pregnancy. Rising hormones increase blood flow and start preparing your milk glands, so you may also notice more visible veins and darker nipples. The soreness usually eases after the first trimester as your body adjusts.',
      tr: 'Hassas, dolgun ve karıncalanan göğüsler genellikle gebeliğin ilk işaretlerinden biridir. Yükselen hormonlar kan akışını artırır ve süt bezlerini hazırlamaya başlar; bu yüzden damarların belirginleştiğini ve meme uçlarının koyulaştığını da fark edebilirsin. Vücudun alıştıkça ağrı genellikle ilk trimesterden sonra hafifler.',
    },
    relief: {
      en: [
        'Wear a soft, well-fitting, supportive bra; many find a cotton or sports bra comfier, including at night.',
        'A warm shower or a cool compress can ease the soreness.',
        'Ask your partner to be gentle, and sleep on your side rather than your front.',
      ],
      tr: [
        'Yumuşak, tam oturan, destekleyici bir sütyen giy; pamuklu ya da spor sütyenler genelde daha rahattır, geceleri de takabilirsin.',
        'Ilık bir duş ya da serin bir kompres ağrıyı hafifletebilir.',
        'Partnerinden nazik olmasını iste; yüzüstü değil yan yatarak uyu.',
      ],
    },
    callDoctor: {
      en: [
        'See your doctor if you notice a new lump, dimpled skin, or a red, hot, painful area on your breast.',
        'See your doctor if you have bloody or unusual nipple discharge, or a nipple that has newly turned inward.',
      ],
      tr: [
        'Göğsünde yeni bir kitle, ciltte çukurlaşma ya da kızarık, sıcak ve ağrılı bir bölge fark edersen doktoruna görün.',
        'Meme ucundan kanlı ya da alışılmadık bir akıntı gelirse veya meme ucun yeni içe çöktüyse doktoruna görün.',
      ],
    },
    urgent: false,
    sources: [S.ccFirstTrimester],
  },
  {
    id: 'frequent-urination',
    emoji: '🚽',
    name: { en: 'Needing to pee a lot', tr: 'Sık idrara çıkma' },
    aliases: {
      en: ['frequent urination', 'peeing a lot', 'weeing a lot', 'always need the toilet', 'night-time peeing'],
      tr: ['sık idrara çıkma', 'sık tuvalete gitme', 'sık işeme', 'gece tuvalete kalkma', 'çiş'],
    },
    trimesters: [1, 3],
    about: {
      en: 'Needing the loo more often usually starts early in pregnancy, as hormones and extra blood flow make your kidneys work harder. It often eases in the middle months, then returns later when your baby\'s head presses on your bladder. It\'s a normal, if annoying, part of pregnancy.',
      tr: 'Tuvalete daha sık gitme ihtiyacı genellikle gebeliğin başında başlar; hormonlar ve artan kan akışı böbreklerinin daha çok çalışmasına neden olur. Ortadaki aylarda çoğu zaman hafifler, sonra bebeğin başı mesanene bastırdıkça geri döner. Can sıkıcı olsa da gebeliğin olağan bir parçasıdır.',
    },
    relief: {
      en: [
        'Keep drinking plenty during the day, but cut down on drinks in the late evening.',
        'Cut back on caffeine (tea, coffee, cola), which makes you pee more.',
        'Lean forward or gently rock while peeing to help empty your bladder fully.',
        'Do pelvic floor exercises daily to help with leaks when you cough or sneeze.',
      ],
      tr: [
        'Gün içinde bol sıvı almaya devam et, ama akşam geç saatlerde içeceklerini azalt.',
        'Çay, kahve, kola gibi kafeinli içecekleri azalt; idrar söktürür.',
        'Mesaneni tam boşaltmak için tuvalette öne eğil ya da hafifçe öne arkaya sallan.',
        'Öksürürken ya da hapşırırken kaçırmayı azaltmak için her gün pelvik taban egzersizleri yap.',
      ],
    },
    callDoctor: {
      en: [
        'Contact your doctor within 24 hours if peeing burns or stings, or you see blood in your pee; it could be an infection.',
        'Call straight away if you also have a fever, shivers, or pain in your back or side.',
        'Mention it to your doctor if you\'re also very thirsty all the time; they may check your blood sugar.',
      ],
      tr: [
        'İdrar yaparken yanma ya da sızı varsa veya idrarında kan görürsen 24 saat içinde doktoruna ulaş; enfeksiyon olabilir.',
        'Buna ateş, titreme ya da sırtında veya böğründe ağrı eşlik ediyorsa hemen ara.',
        'Sürekli çok susuyorsan doktoruna söyle; kan şekerine bakmak isteyebilir.',
      ],
    },
    urgent: false,
    sources: [S.nhsCommon, S.ccFrequentUrination],
  },

  // ── Bleeding and tummy pain ──────────────────────────────────────────────
  {
    id: 'spotting',
    emoji: '🔴',
    name: { en: 'Spotting or light bleeding', tr: 'Lekelenme ya da hafif kanama' },
    aliases: {
      en: ['spotting', 'light bleeding', 'brown discharge', 'pink discharge', 'implantation bleeding', 'bleeding after sex'],
      tr: ['lekelenme', 'hafif kanama', 'kahverengi akıntı', 'pembe akıntı', 'yerleşme kanaması', 'ilişki sonrası kanama'],
    },
    trimesters: [1, 2, 3],
    about: {
      en: 'Light bleeding is fairly common, especially in early pregnancy, and many people who have it go on to have a healthy pregnancy. It can come from the embryo implanting, from a more sensitive cervix after sex or an internal exam, or from an infection. Because bleeding can sometimes signal a problem, it\'s always worth getting checked.',
      tr: 'Hafif kanama özellikle gebeliğin başında oldukça yaygındır ve yaşayanların çoğunun gebeliği sağlıklı şekilde devam eder. Embriyonun rahme yerleşmesinden, ilişki ya da muayene sonrası daha hassas olan rahim ağzından veya bir enfeksiyondan kaynaklanabilir. Kanama bazen bir sorunun işareti olabileceği için her zaman kontrol ettirmeye değer.',
    },
    relief: {
      en: [
        'Use a pad, not a tampon, so you can see how much you\'re bleeding and what colour it is.',
        'Note when it started, the colour and roughly how much, to tell your midwife or doctor.',
        'Rest, and avoid sex until you\'ve been checked and know the cause.',
      ],
      tr: [
        'Ne kadar kanadığını ve rengini görebilmek için tampon değil ped kullan.',
        'Ne zaman başladığını, rengini ve yaklaşık miktarını not et; doktoruna ya da ebene anlat.',
        'Kontrol edilip nedeni anlaşılana kadar dinlen ve cinsel ilişkiye ara ver.',
      ],
    },
    callDoctor: {
      en: [
        'Call your midwife or doctor the same day about any bleeding in pregnancy, even if it has stopped.',
        'Call straight away if bleeding comes with cramps, low back pain, pain when you pee or poo, or fluid leaking.',
        'Call emergency services if bleeding is heavy, or you have severe tummy pain, shoulder-tip pain or feel faint.',
      ],
      tr: [
        'Durmuş olsa bile gebelikteki her kanama için aynı gün doktorunu ya da ebeni ara.',
        'Kanamaya kramp, bel ağrısı, idrar ya da dışkılama sırasında ağrı veya su gelmesi eşlik ediyorsa hemen ara.',
        'Kanama yoğunsa, şiddetli karın ağrın ya da omuz ucunda ağrın varsa veya bayılacak gibiysen acil yardım hattını ara.',
      ],
    },
    urgent: false,
    sources: [S.nhsBleeding, S.acogBleeding],
  },
  {
    id: 'heavy-bleeding',
    emoji: '🩸',
    name: { en: 'Heavy bleeding', tr: 'Yoğun kanama' },
    aliases: {
      en: ['heavy bleeding', 'bleeding with clots', 'soaking a pad', 'haemorrhage', 'hemorrhage', 'miscarriage signs'],
      tr: ['yoğun kanama', 'şiddetli kanama', 'pıhtılı kanama', 'pedi dolduran kanama', 'düşük belirtisi', 'kanamam var'],
    },
    trimesters: [1, 2, 3],
    about: {
      en: 'Heavy bleeding means red blood that soaks a pad or comes with clots. It needs urgent assessment at any stage of pregnancy, because it can be linked to miscarriage, an ectopic pregnancy or problems with the placenta. Getting help fast gives you and your baby the best care, and you will never be wasting anyone\'s time.',
      tr: 'Yoğun kanama, pedi dolduran ya da pıhtılarla gelen kırmızı kan demektir. Düşük, dış gebelik veya plasentayla ilgili sorunlarla bağlantılı olabileceği için gebeliğin her döneminde acil değerlendirme gerektirir. Hızla yardım almak sana ve bebeğine en iyi bakımı sağlar; asla kimsenin vaktini boşa harcamış olmazsın.',
    },
    relief: {
      en: [
        'Call for help first, then lie down on your side while you wait.',
        'Use pads, not tampons, so the amount of bleeding can be judged.',
        'Don\'t drive yourself; ask someone to take you, or wait for the ambulance.',
        'Bring your pregnancy notes if you have them.',
      ],
      tr: [
        'Önce yardım çağır, beklerken yan yatarak uzan.',
        'Kanamanın miktarı anlaşılabilsin diye tampon değil ped kullan.',
        'Kendin araba kullanma; birinden seni götürmesini iste ya da ambulansı bekle.',
        'Varsa gebelik takip dosyanı yanına al.',
      ],
    },
    callDoctor: {
      en: [
        'Call emergency services if you\'re soaking a pad soon after putting it on, or passing large clots.',
        'Call emergency services if bleeding comes with severe tummy pain, shoulder-tip pain, dizziness or fainting.',
        'Call your maternity unit or doctor straight away about any bleeding in the second half of pregnancy, even if light.',
      ],
      tr: [
        'Pedi taktıktan kısa süre sonra dolduruyorsan ya da büyük pıhtılar geliyorsa acil yardım hattını ara.',
        'Kanamaya şiddetli karın ağrısı, omuz ucunda ağrı, baş dönmesi ya da bayılma eşlik ediyorsa acil yardım hattını ara.',
        'Gebeliğin ikinci yarısında hafif bile olsa her kanamada hemen doktorunu ya da doğum servisini ara.',
      ],
    },
    urgent: true,
    sources: [S.nhsBleeding, S.cdcWarningSigns],
  },
  {
    id: 'period-like-cramps',
    emoji: '🌀',
    name: { en: 'Cramps and period-like pain', tr: 'Kramplar ve adet sancısına benzer ağrı' },
    aliases: {
      en: ['cramps', 'cramping', 'period pain', 'tummy ache', 'stomach pain', 'lower abdominal pain'],
      tr: ['kramp', 'kasık ağrısı', 'adet sancısı gibi ağrı', 'karın ağrısı', 'alt karın ağrısı', 'sancı'],
    },
    trimesters: [1, 2, 3],
    about: {
      en: 'Mild cramps are common, especially early on as your womb grows and stretches. Trapped wind, constipation and stretching ligaments can also cause aches that come and go. Pain that\'s mild and eases when you rest, change position, pee, poo or pass wind is usually nothing to worry about.',
      tr: 'Hafif kramplar, özellikle başlarda rahmin büyüyüp gerildikçe çok yaygındır. Gaz, kabızlık ve gerilen bağlar da gelip giden ağrılara yol açabilir. Hafif olan ve dinlenince, pozisyon değiştirince, tuvalete gidince ya da gaz çıkarınca geçen ağrı genellikle endişe verici değildir.',
    },
    relief: {
      en: [
        'Rest, lie on your side or change position.',
        'Have a warm (not hot) bath or shower.',
        'Drink plenty of water and eat fibre to keep constipation and wind at bay.',
        'Empty your bladder regularly.',
      ],
      tr: [
        'Dinlen, yan yat ya da pozisyonunu değiştir.',
        'Ilık (sıcak değil) bir banyo ya da duş al.',
        'Kabızlığı ve gazı önlemek için bol su iç, lifli beslen.',
        'Mesaneni düzenli olarak boşalt.',
      ],
    },
    callDoctor: {
      en: [
        'Call your midwife or doctor straight away if pain comes with bleeding, unusual discharge or fluid leaking.',
        'Call straight away if the pain is severe or doesn\'t ease after resting for 30 to 60 minutes.',
        'Call straight away if you\'re under 37 weeks and having regular cramps or tightenings.',
        'Call straight away if it hurts to pee, or your pee is cloudy, pink, red or brown.',
      ],
      tr: [
        'Ağrıya kanama, alışılmadık akıntı ya da su gelmesi eşlik ediyorsa hemen doktorunu ya da ebeni ara.',
        'Ağrı şiddetliyse ya da 30-60 dakika dinlendikten sonra geçmiyorsa hemen ara.',
        '37. haftadan önceysen ve düzenli kramplar ya da kasılmalar oluyorsa hemen ara.',
        'İdrar yaparken acıyorsa ya da idrarın bulanık, pembe, kırmızı veya kahverengiyse hemen ara.',
      ],
    },
    urgent: false,
    sources: [S.nhsStomachPain, S.ccPregnancyPains],
  },
  {
    id: 'round-ligament-pain',
    emoji: '⚡',
    name: { en: 'Round ligament pain', tr: 'Yuvarlak bağ ağrısı' },
    aliases: {
      en: ['round ligament pain', 'growing pains', 'sharp pain in groin', 'stabbing side pain', 'pulling pain in belly'],
      tr: ['yuvarlak bağ ağrısı', 'bağ ağrısı', 'kasıkta batma', 'yan tarafta saplanma', 'karında çekilme hissi', 'büyüme ağrısı'],
    },
    trimesters: [2],
    about: {
      en: 'The round ligaments are rope-like bands that support your womb. As your bump grows they stretch, which can cause a brief, sharp or pulling pain on one or both sides of your lower belly or groin, often when you move suddenly, cough or stand up. It\'s very common in the second trimester and harmless.',
      tr: 'Yuvarlak bağlar rahmini destekleyen ip gibi bantlardır. Karnın büyüdükçe gerilirler; bu da özellikle ani hareket ettiğinde, öksürdüğünde ya da ayağa kalktığında alt karnının veya kasığının bir ya da iki yanında kısa süreli, keskin ya da çekici bir ağrıya yol açabilir. İkinci trimesterde çok yaygındır ve zararsızdır.',
    },
    relief: {
      en: [
        'Move slowly when you stand up, turn over in bed, or get out of a chair.',
        'Bend and flex your hips slightly before you cough, sneeze or laugh.',
        'Rest, use a warm (not hot) compress or bath, or try a maternity support belt.',
      ],
      tr: [
        'Ayağa kalkarken, yatakta dönerken ya da sandalyeden kalkarken yavaş hareket et.',
        'Öksürmeden, hapşırmadan ya da gülmeden önce kalçalarını hafifçe bük.',
        'Dinlen, ılık (sıcak değil) kompres ya da banyo dene veya gebelik destek kemeri kullan.',
      ],
    },
    callDoctor: {
      en: [
        'Call your midwife or doctor if the pain doesn\'t ease with rest or changing position.',
        'Call straight away if pain comes with bleeding, fever, chills, pain when peeing, or regular tightenings.',
        'Before 12 weeks, get one-sided pain checked the same day to rule out an ectopic pregnancy.',
      ],
      tr: [
        'Ağrı dinlenmekle ya da pozisyon değiştirmekle geçmiyorsa doktorunu ya da ebeni ara.',
        'Ağrıya kanama, ateş, titreme, idrarda yanma ya da düzenli kasılmalar eşlik ediyorsa hemen ara.',
        '12. haftadan önceki tek taraflı ağrıyı, dış gebeliği dışlamak için aynı gün kontrol ettir.',
      ],
    },
    urgent: false,
    sources: [S.ccRoundLigament, S.nhsStomachPain],
  },

  // ── Aches and pains ──────────────────────────────────────────────────────
  {
    id: 'back-pain',
    emoji: '💆‍♀️',
    name: { en: 'Back pain', tr: 'Sırt ve bel ağrısı' },
    aliases: {
      en: ['back pain', 'backache', 'lower back pain', 'sciatica', 'aching back'],
      tr: ['sırt ağrısı', 'bel ağrısı', 'siyatik', 'belim ağrıyor', 'sırtım ağrıyor'],
    },
    trimesters: [1, 2, 3],
    about: {
      en: 'Backache is very common in pregnancy. Hormones soften your ligaments to prepare for birth, which strains the joints of your lower back and pelvis, and your growing bump shifts your posture. It\'s uncomfortable but usually not a sign that anything is wrong.',
      tr: 'Sırt ağrısı gebelikte çok yaygındır. Hormonlar doğuma hazırlık için bağlarını yumuşatır; bu da bel ve leğen kemiği eklemlerini zorlar, büyüyen karnın da duruşunu değiştirir. Rahatsız edici olsa da genellikle bir sorun olduğu anlamına gelmez.',
    },
    relief: {
      en: [
        'Bend your knees and keep your back straight when lifting, and avoid heavy lifting.',
        'Wear flat, supportive shoes and sit with your back well supported.',
        'Try a warm bath, a massage, pregnancy yoga or swimming.',
        'Sleep on your side with a pillow between your knees and one under your bump.',
      ],
      tr: [
        'Bir şey kaldırırken dizlerini bük, sırtını dik tut; ağır yük kaldırmaktan kaçın.',
        'Düz tabanlı, destekleyici ayakkabılar giy; otururken sırtını iyi destekle.',
        'Ilık bir banyo, masaj, gebelik yogası ya da yüzme dene.',
        'Dizlerinin arasına bir yastık, karnının altına da bir yastık koyarak yan yat.',
      ],
    },
    callDoctor: {
      en: [
        'Call your midwife or doctor urgently if back pain comes in waves or with tightenings; it can be a sign of early labour.',
        'Call urgently if you also have a fever, bleeding from your vagina, pain when peeing, or pain under your ribs.',
        'Call emergency services if you lose feeling in your legs, bottom or genitals.',
      ],
      tr: [
        'Sırt ağrısı dalgalar halinde geliyorsa ya da kasılmalarla birlikteyse hemen doktorunu ya da ebeni ara; erken doğum belirtisi olabilir.',
        'Ateş, vajinal kanama, idrarda yanma ya da kaburgalarının altında ağrı da varsa hemen ara.',
        'Bacaklarında, kalçanda ya da genital bölgende his kaybı olursa acil yardım hattını ara.',
      ],
    },
    urgent: false,
    sources: [S.nhsBackPain, S.acogBackPain],
  },
  {
    id: 'pelvic-girdle-pain',
    emoji: '🦴',
    name: { en: 'Pelvic girdle pain (SPD)', tr: 'Pelvik kuşak ağrısı (SPD)' },
    aliases: {
      en: ['pelvic girdle pain', 'PGP', 'SPD', 'symphysis pubis dysfunction', 'pubic bone pain', 'pelvic pain'],
      tr: ['pelvik kuşak ağrısı', 'SPD', 'kasık kemiği ağrısı', 'leğen kemiği ağrısı', 'pubik ağrı', 'simfizis pubis'],
    },
    trimesters: [2, 3],
    about: {
      en: 'Pelvic girdle pain comes from stiffness or uneven movement of your pelvic joints. You may feel it over your pubic bone, across your lower back, between your legs or down your thighs, and it can be worse when walking, on stairs or turning over in bed. It\'s common, it doesn\'t harm your baby, and physiotherapy really helps.',
      tr: 'Pelvik kuşak ağrısı, leğen kemiği eklemlerinin sertleşmesi ya da dengesiz hareket etmesinden kaynaklanır. Kasık kemiğinin üstünde, belinde, bacak aranda ya da uyluklarında hissedebilirsin; yürürken, merdivende ya da yatakta dönerken artabilir. Yaygındır, bebeğine zarar vermez ve fizyoterapi gerçekten işe yarar.',
    },
    relief: {
      en: [
        'Keep your knees together when getting in and out of the car or bed.',
        'Sit down to get dressed, and avoid standing on one leg.',
        'Take stairs one step at a time, and avoid heavy lifting.',
        'Sleep with a pillow between your legs, and stay active within what feels comfortable.',
      ],
      tr: [
        'Arabaya ya da yatağa girip çıkarken dizlerini birbirine yakın tut.',
        'Giyinirken otur, tek ayak üstünde durmaktan kaçın.',
        'Merdivenleri basamak basamak çık, ağır yük kaldırma.',
        'Bacaklarının arasına yastık koyarak uyu; rahat hissettiğin ölçüde hareketli kal.',
      ],
    },
    callDoctor: {
      en: [
        'Ask your midwife or doctor for a physiotherapy referral if it\'s hard to walk, climb stairs or turn over in bed.',
        'Tell your midwife or doctor if the pain is affecting your sleep or mood; more support is available.',
      ],
      tr: [
        'Yürümek, merdiven çıkmak ya da yatakta dönmek zorlaşıyorsa doktorundan ya da ebenden fizyoterapi yönlendirmesi iste.',
        'Ağrı uykunu ya da ruh halini etkiliyorsa doktoruna ya da ebene söyle; daha fazla destek mümkün.',
      ],
    },
    urgent: false,
    sources: [S.nhsPelvicPain, S.rcogPgp],
  },
  {
    id: 'headache',
    emoji: '🤕',
    name: { en: 'Headaches', tr: 'Baş ağrısı' },
    aliases: {
      en: ['headache', 'migraine', 'head pain', 'tension headache'],
      tr: ['baş ağrısı', 'migren', 'başım ağrıyor', 'gerilim tipi baş ağrısı'],
    },
    trimesters: [1, 2],
    about: {
      en: 'Headaches are common in early pregnancy and usually improve as it goes on. Hormone changes, tiredness, dehydration, hunger and cutting down on caffeine can all play a part. They don\'t harm your baby, but a severe headache in the second half of pregnancy always needs checking.',
      tr: 'Baş ağrısı gebeliğin başında yaygındır ve genellikle ilerleyen haftalarda azalır. Hormon değişiklikleri, yorgunluk, susuz kalmak, açlık ve kafeini azaltmak rol oynayabilir. Bebeğine zarar vermez, ama gebeliğin ikinci yarısındaki şiddetli bir baş ağrısı her zaman kontrol edilmeli.',
    },
    relief: {
      en: [
        'Drink plenty of water and eat regular meals and snacks.',
        'Rest in a quiet, dark room and try relaxation or gentle neck and shoulder stretches.',
        'Get enough sleep and fresh air, and try a cool cloth on your forehead.',
        'Ask your pharmacist or midwife which pain relief is safe in pregnancy.',
      ],
      tr: [
        'Bol su iç, öğünlerini ve ara öğünlerini düzenli ye.',
        'Sessiz, karanlık bir odada dinlen; gevşeme egzersizleri ya da hafif boyun ve omuz esnemeleri dene.',
        'Yeterince uyu, temiz hava al, alnına serin bir bez koymayı dene.',
        'Gebelikte hangi ağrı kesicinin güvenli olduğunu eczacına ya da ebene sor.',
      ],
    },
    callDoctor: {
      en: [
        'Call your midwife or doctor straight away if you have a severe headache that won\'t go away, especially after 20 weeks.',
        'Call straight away if a headache comes with blurred vision, flashing lights, pain under your ribs or sudden swelling.',
        'Call emergency services if a headache is sudden and extremely severe, or comes with a fit, confusion or weakness.',
      ],
      tr: [
        'Özellikle 20. haftadan sonra geçmeyen şiddetli bir baş ağrın varsa hemen doktorunu ya da ebeni ara.',
        'Baş ağrısına bulanık görme, ışık çakmaları, kaburgalarının altında ağrı ya da ani şişlik eşlik ediyorsa hemen ara.',
        'Baş ağrısı aniden ve çok şiddetli başladıysa ya da nöbet, bilinç bulanıklığı veya güçsüzlükle birlikteyse acil yardım hattını ara.',
      ],
    },
    urgent: false,
    sources: [S.nhsHeadaches, S.nhsPreEclampsia],
  },
  {
    id: 'severe-headache-vision',
    emoji: '👁️',
    name: {
      en: 'Severe headache or vision changes (pre-eclampsia signs)',
      tr: 'Şiddetli baş ağrısı ya da görme değişiklikleri (preeklampsi belirtileri)',
    },
    aliases: {
      en: ['pre-eclampsia', 'preeclampsia', 'blurred vision', 'flashing lights', 'high blood pressure', 'pain under ribs', 'toxaemia'],
      tr: ['preeklampsi', 'gebelik zehirlenmesi', 'bulanık görme', 'gözde ışık çakması', 'yüksek tansiyon', 'kaburga altında ağrı'],
    },
    trimesters: [2, 3],
    about: {
      en: 'A severe headache that won\'t go away, blurred vision or flashing lights, pain just below your ribs, or sudden swelling of your face, hands or feet can be signs of pre-eclampsia. This blood pressure condition usually appears after 20 weeks and can also start in the weeks after birth. It\'s very treatable when caught early, so these symptoms always need checking straight away.',
      tr: 'Geçmeyen şiddetli bir baş ağrısı, bulanık görme ya da ışık çakmaları, kaburgalarının hemen altında ağrı veya yüzünde, ellerinde ya da ayaklarında ani şişlik preeklampsinin (gebelik zehirlenmesi) belirtileri olabilir. Bu tansiyon sorunu genellikle 20. haftadan sonra ortaya çıkar ve doğumdan sonraki haftalarda da başlayabilir. Erken yakalandığında iyi tedavi edilebilir; bu yüzden bu belirtiler her zaman hemen kontrol edilmeli.',
    },
    relief: {
      en: [
        'Stop what you\'re doing and call for help; don\'t wait to see if it passes.',
        'Rest lying on your side while you wait to be seen.',
        'Bring your pregnancy notes and any blood pressure readings you have.',
        'Don\'t drive yourself; ask someone to take you.',
      ],
      tr: [
        'Ne yapıyorsan bırak ve yardım iste; geçip geçmeyeceğini görmek için bekleme.',
        'Görülmeyi beklerken yan yatarak dinlen.',
        'Gebelik dosyanı ve elindeki tansiyon ölçümlerini yanına al.',
        'Kendin araba kullanma; birinden seni götürmesini iste.',
      ],
    },
    callDoctor: {
      en: [
        'Call your maternity unit or doctor straight away if you have any of these symptoms, day or night.',
        'Call straight away if you have heartburn that doesn\'t ease with the usual remedies, vomiting, or feel very unwell.',
        'Call emergency services if you have a fit (seizure), severe chest or tummy pain, or trouble breathing.',
      ],
      tr: [
        'Bu belirtilerden herhangi biri varsa gece gündüz demeden hemen doktorunu ya da doğum servisini ara.',
        'Her zamanki yöntemlerle geçmeyen mide yanması, kusma ya da kendini çok kötü hissetme varsa hemen ara.',
        'Nöbet geçirirsen, şiddetli göğüs ya da karın ağrın olursa veya nefes almakta zorlanırsan acil yardım hattını ara.',
      ],
    },
    urgent: true,
    sources: [S.nhsPreEclampsia, S.acogPreeclampsia],
  },
  {
    id: 'dizziness-fainting',
    emoji: '💫',
    name: { en: 'Dizziness and feeling faint', tr: 'Baş dönmesi ve bayılacak gibi olma' },
    aliases: {
      en: ['dizziness', 'lightheaded', 'feeling faint', 'fainting', 'vertigo', 'blacking out'],
      tr: ['baş dönmesi', 'sersemlik', 'bayılma hissi', 'göz kararması', 'bayılma', 'tansiyon düşmesi'],
    },
    trimesters: [1, 2, 3],
    about: {
      en: 'Feeling lightheaded is common in pregnancy. Hormones relax your blood vessels while your circulation works harder, so getting up quickly, standing for a long time, getting hot or going too long without food can make you woozy. Later on, lying flat on your back can do it too.',
      tr: 'Gebelikte sersemlik hissi yaygındır. Hormonlar kan damarlarını gevşetirken dolaşımın daha çok çalışır; bu yüzden hızlı ayağa kalkmak, uzun süre ayakta kalmak, çok ısınmak ya da uzun süre aç kalmak başını döndürebilir. İlerleyen haftalarda sırtüstü düz yatmak da buna yol açabilir.',
    },
    relief: {
      en: [
        'Get up slowly after sitting or lying down.',
        'If you feel faint, sit down or lie on your side straight away.',
        'Eat regularly, carry a snack, and drink plenty of water, especially when it\'s hot.',
        'From the third trimester, avoid lying flat on your back; turn onto your side.',
      ],
      tr: [
        'Oturduğun ya da yattığın yerden yavaşça kalk.',
        'Bayılacak gibi olursan hemen otur ya da yan yat.',
        'Düzenli ye, yanında atıştırmalık taşı ve özellikle sıcakta bol su iç.',
        'Üçüncü trimesterden itibaren sırtüstü düz yatma; yan dön.',
      ],
    },
    callDoctor: {
      en: [
        'Call your midwife or doctor the same day if you actually faint, or the dizziness keeps coming back.',
        'Call emergency services if dizziness or fainting comes with bleeding, severe tummy or shoulder-tip pain, or chest pain.',
        'Call emergency services if you\'re struggling to breathe, have a racing heart, or feel confused.',
      ],
      tr: [
        'Gerçekten bayılırsan ya da baş dönmesi sürekli tekrarlıyorsa aynı gün doktorunu ya da ebeni ara.',
        'Baş dönmesine ya da bayılmaya kanama, şiddetli karın ya da omuz ucu ağrısı veya göğüs ağrısı eşlik ediyorsa acil yardım hattını ara.',
        'Nefes almakta zorlanıyorsan, kalbin çok hızlı çarpıyorsa ya da zihnin bulanıksa acil yardım hattını ara.',
      ],
    },
    urgent: false,
    sources: [S.nhsCommon, S.cdcWarningSigns],
  },

  // ── Digestion, mouth and taste ───────────────────────────────────────────
  {
    id: 'heartburn',
    emoji: '🔥',
    name: { en: 'Heartburn and indigestion', tr: 'Mide yanması ve hazımsızlık' },
    aliases: {
      en: ['heartburn', 'indigestion', 'acid reflux', 'reflux', 'burning chest', 'burping'],
      tr: ['mide yanması', 'reflü', 'hazımsızlık', 'ekşime', 'göğüste yanma', 'geğirme'],
    },
    trimesters: [2, 3],
    about: {
      en: 'Heartburn is a burning feeling in your chest, often soon after eating. Pregnancy hormones relax the valve at the top of your stomach, and later your growing baby presses on your stomach, so acid comes back up more easily. It\'s very common from around 12 weeks and usually goes after the birth.',
      tr: 'Mide yanması, genellikle yemekten kısa süre sonra göğüste hissedilen yanma duygusudur. Gebelik hormonları midenin üst kısmındaki kapakçığı gevşetir, ilerleyen haftalarda da büyüyen bebeğin mideye baskı yapar; böylece asit daha kolay geri kaçar. Yaklaşık 12. haftadan itibaren çok yaygındır ve genellikle doğumdan sonra geçer.',
    },
    relief: {
      en: [
        'Eat small meals often instead of three big ones, and sit up straight while you eat.',
        'Try not to eat in the 3 hours before bed.',
        'Cut down on rich, spicy or fatty foods and caffeine if they set you off.',
        'Raise your head and shoulders in bed, and try sleeping on your left side.',
        'Ask your pharmacist about pregnancy-safe heartburn remedies.',
      ],
      tr: [
        'Üç büyük öğün yerine sık sık küçük öğünler ye; yerken dik otur.',
        'Yatmadan önceki 3 saat içinde yemek yememeye çalış.',
        'Ağır, baharatlı ya da yağlı yiyecekler ve kafein mideni yakıyorsa bunları azalt.',
        'Yatakta başını ve omuzlarını yükselt, sol tarafına yatmayı dene.',
        'Gebelikte güvenli mide yanması çözümlerini eczacına sor.',
      ],
    },
    callDoctor: {
      en: [
        'Call your midwife or doctor straight away if heartburn doesn\'t ease with the usual remedies, especially after 20 weeks.',
        'Call straight away if you also have pain just below your ribs, a severe headache, vision problems or vomiting.',
        'See your doctor if you have trouble swallowing, are losing weight, or your vomit or poo looks black or bloody.',
      ],
      tr: [
        'Mide yanması her zamanki yöntemlerle geçmiyorsa, özellikle 20. haftadan sonra, hemen doktorunu ya da ebeni ara.',
        'Kaburgalarının hemen altında ağrı, şiddetli baş ağrısı, görme sorunu ya da kusma da varsa hemen ara.',
        'Yutmakta zorlanıyorsan, kilo kaybediyorsan ya da kusmuğun veya dışkın siyah ya da kanlıysa doktoruna görün.',
      ],
    },
    urgent: false,
    sources: [S.nhsHeartburn, S.nhsPreEclampsia],
  },
  {
    id: 'constipation',
    emoji: '🧻',
    name: { en: 'Constipation', tr: 'Kabızlık' },
    aliases: {
      en: ['constipation', 'can\'t poo', 'hard stools', 'straining', 'bowel problems'],
      tr: ['kabızlık', 'tuvalete çıkamama', 'sert dışkı', 'ıkınma', 'bağırsak tembelliği'],
    },
    trimesters: [1, 2, 3],
    about: {
      en: 'Constipation is very common and can start early in pregnancy. Hormones relax the muscles of your gut so food moves through more slowly, and later your womb presses on your bowel. Iron supplements can make it worse too.',
      tr: 'Kabızlık çok yaygındır ve gebeliğin başında başlayabilir. Hormonlar bağırsak kaslarını gevşetir, böylece besinler daha yavaş ilerler; ilerleyen haftalarda rahmin de bağırsaklarına baskı yapar. Demir takviyeleri de durumu kötüleştirebilir.',
    },
    relief: {
      en: [
        'Eat plenty of fibre: wholegrain bread and cereals, fruit, vegetables, beans and lentils.',
        'Drink plenty of water through the day.',
        'Keep active; a daily walk or swim helps keep things moving.',
        'Don\'t ignore the urge to go, and try resting your feet on a small stool on the toilet.',
        'If you take iron supplements, ask your doctor or pharmacist about gentler options.',
      ],
      tr: [
        'Bol lifli beslen: tam tahıllı ekmek ve tahıllar, meyve, sebze, kuru fasulye ve mercimek.',
        'Gün boyunca bol su iç.',
        'Hareketli kal; günlük bir yürüyüş ya da yüzme bağırsaklarını çalıştırır.',
        'Tuvalet ihtiyacını erteleme; tuvalette ayaklarını küçük bir taburenin üstüne koymayı dene.',
        'Demir takviyesi kullanıyorsan doktoruna ya da eczacına daha yumuşak seçenekleri sor.',
      ],
    },
    callDoctor: {
      en: [
        'Talk to your midwife, doctor or pharmacist if diet changes haven\'t helped after a week or so; don\'t take laxatives without asking.',
        'Call your doctor if you have bleeding from your bottom, severe tummy pain, or vomiting.',
      ],
      tr: [
        'Beslenme değişiklikleri bir hafta kadar sonra işe yaramadıysa doktoruna, ebene ya da eczacına danış; sormadan müshil kullanma.',
        'Makattan kanama, şiddetli karın ağrısı ya da kusma olursa doktorunu ara.',
      ],
    },
    urgent: false,
    sources: [S.nhsCommon, S.ccConstipation],
  },
  {
    id: 'piles',
    emoji: '🧊',
    name: { en: 'Piles (haemorrhoids)', tr: 'Hemoroid (basur)' },
    aliases: {
      en: ['piles', 'haemorrhoids', 'hemorrhoids', 'itchy bottom', 'bleeding when pooing', 'lump near anus'],
      tr: ['hemoroid', 'basur', 'makatta kaşıntı', 'dışkıda kan', 'makatta şişlik', 'makat ağrısı'],
    },
    trimesters: [2, 3],
    about: {
      en: 'Piles are swollen blood vessels in or around your bottom. Pregnancy hormones, extra pressure from your womb and constipation all make them more likely, especially in the third trimester. They can itch, ache or bleed a little after a poo, but they\'re harmless and usually shrink after the birth.',
      tr: 'Hemoroid, makatın içinde ya da çevresinde şişmiş kan damarlarıdır. Gebelik hormonları, rahminin yaptığı ekstra baskı ve kabızlık özellikle üçüncü trimesterde olasılığını artırır. Kaşıntı, sızı ya da dışkılamadan sonra hafif kanamaya yol açabilir, ama zararsızdır ve genellikle doğumdan sonra küçülür.',
    },
    relief: {
      en: [
        'Keep your poo soft with plenty of fibre and water, and avoid straining.',
        'Hold a cloth wrung out in iced water gently against the area to ease pain.',
        'Use moist toilet paper, and pat rather than rub.',
        'Avoid standing or sitting for long periods.',
        'Ask your pharmacist or midwife about pregnancy-safe creams before using any.',
      ],
      tr: [
        'Bol lif ve suyla dışkını yumuşak tut, ıkınmaktan kaçın.',
        'Ağrıyı hafifletmek için buzlu suya batırılıp sıkılmış bir bezi bölgeye nazikçe tut.',
        'Nemli tuvalet kâğıdı kullan; silmek yerine hafifçe bastırarak temizle.',
        'Uzun süre ayakta kalmaktan ya da oturmaktan kaçın.',
        'Herhangi bir krem kullanmadan önce gebelikte güvenli seçenekleri eczacına ya da ebene sor.',
      ],
    },
    callDoctor: {
      en: [
        'See your doctor or midwife if piles are very painful, or a lump outside your bottom is hard and won\'t go back in.',
        'Call your doctor if you\'re bleeding a lot from your bottom, or the blood is dark or mixed into your poo.',
      ],
      tr: [
        'Hemoroid çok ağrılıysa ya da makatın dışındaki şişlik sertleşip içeri girmiyorsa doktoruna ya da ebene görün.',
        'Makattan çok kanaman varsa ya da kan koyu renkliyse veya dışkıya karışmışsa doktorunu ara.',
      ],
    },
    urgent: false,
    sources: [S.nhsPiles, S.ccHemorrhoids],
  },
  {
    id: 'bloating-gas',
    emoji: '🎈',
    name: { en: 'Bloating and wind', tr: 'Şişkinlik ve gaz' },
    aliases: {
      en: ['bloating', 'gas', 'wind', 'farting', 'trapped wind', 'swollen belly'],
      tr: ['şişkinlik', 'gaz', 'karın şişliği', 'gaz sancısı', 'midem şiş'],
    },
    trimesters: [1, 2, 3],
    about: {
      en: 'Feeling bloated and gassy is very common, especially early on. Pregnancy hormones slow down digestion, so food and gas linger in your gut, and constipation can add to it. Trapped wind can even cause sharp, crampy pains that ease once it passes.',
      tr: 'Şişkinlik ve gaz özellikle başlarda çok yaygındır. Gebelik hormonları sindirimi yavaşlatır, böylece besinler ve gaz bağırsaklarında daha uzun kalır; kabızlık da buna eklenebilir. Sıkışan gaz, çıktığında geçen keskin, kramp benzeri ağrılara bile yol açabilir.',
    },
    relief: {
      en: [
        'Eat smaller meals slowly, and chew well.',
        'Notice your triggers: fizzy drinks, beans, onions and cabbage are common culprits.',
        'Stay active; a gentle walk after meals helps move gas along.',
        'Keep constipation at bay with fibre and plenty of water.',
      ],
      tr: [
        'Daha küçük öğünleri yavaş ye ve iyice çiğne.',
        'Seni tetikleyenleri fark et: gazlı içecekler, kuru baklagiller, soğan ve lahana sık görülen sebeplerdir.',
        'Hareketli kal; yemekten sonra kısa bir yürüyüş gazın ilerlemesine yardım eder.',
        'Lif ve bol suyla kabızlığı önle.',
      ],
    },
    callDoctor: {
      en: [
        'Call your midwife or doctor if tummy pain is severe, doesn\'t ease after 30 to 60 minutes of rest, or comes with bleeding.',
        'Call straight away if you\'re under 37 weeks and the pain comes in regular waves or tightenings.',
        'See your doctor if you also have a fever, or diarrhoea or vomiting that won\'t settle.',
      ],
      tr: [
        'Karın ağrısı şiddetliyse, 30-60 dakika dinlendikten sonra geçmiyorsa ya da kanamayla birlikteyse doktorunu ya da ebeni ara.',
        '37. haftadan önceysen ve ağrı düzenli dalgalar ya da kasılmalar halinde geliyorsa hemen ara.',
        'Ateşin ya da geçmeyen ishal veya kusman da varsa doktoruna görün.',
      ],
    },
    urgent: false,
    sources: [S.nhsStomachPain, S.ccConstipation],
  },
  {
    id: 'cravings-aversions',
    emoji: '🥒',
    name: { en: 'Food cravings and aversions', tr: 'Aşerme ve yiyeceklerden tiksinme' },
    aliases: {
      en: ['cravings', 'food cravings', 'food aversions', 'can\'t stand the smell of food', 'pica', 'craving ice'],
      tr: ['aşerme', 'canım çekiyor', 'yemek isteği', 'yemekten tiksinme', 'kokulara hassasiyet', 'pika'],
    },
    trimesters: [1, 2],
    about: {
      en: 'Suddenly longing for certain foods, or not being able to face others, is very common and thought to be linked to pregnancy hormones and a sharper sense of smell. Around 7 in 10 people go off at least one food. It\'s fine to follow your cravings in moderation as long as your overall diet stays balanced.',
      tr: 'Bazı yiyecekleri birden çok istemek ya da bazılarına bakamamak çok yaygındır; gebelik hormonları ve keskinleşen koku duyusuyla bağlantılı olduğu düşünülüyor. Yaklaşık her on kişiden yedisi en az bir yiyecekten soğur. Genel beslenmen dengeli kaldığı sürece canının çektiklerini ölçülü yemekte sakınca yok.',
    },
    relief: {
      en: [
        'Swap sugary cravings for fruit or yoghurt sometimes, and keep healthy snacks handy.',
        'If you can\'t face a food, choose another with similar nutrients, like beans or eggs instead of meat.',
        'Keep cravings pregnancy-safe: choose pasteurised cheese and well-cooked meat and eggs.',
        'Cold or bland foods can be easier when smells put you off.',
      ],
      tr: [
        'Tatlı isteğini zaman zaman meyve ya da yoğurtla karşıla; yanında sağlıklı atıştırmalıklar bulundur.',
        'Bir yiyeceğe bakamıyorsan benzer besin değeri olan başka bir şey seç; örneğin et yerine kuru baklagil ya da yumurta.',
        'Canının çektiklerini güvenli seç: pastörize peyniri, iyi pişmiş et ve yumurtayı tercih et.',
        'Kokular rahatsız ediyorsa soğuk ya da sade yiyecekler daha kolay gelebilir.',
      ],
    },
    callDoctor: {
      en: [
        'Tell your midwife or doctor if you crave things that aren\'t food, like ice, soil, clay, chalk or soap; it can be linked to low iron.',
        'Talk to your midwife or doctor if aversions mean you\'re barely eating or are losing weight.',
      ],
      tr: [
        'Canın buz, toprak, kil, tebeşir, sabun gibi yiyecek olmayan şeyler çekiyorsa doktoruna ya da ebene söyle; demir eksikliği olabilir.',
        'Tiksinmeler yüzünden neredeyse hiç yiyemiyorsan ya da kilo kaybediyorsan doktorunla ya da ebenle konuş.',
      ],
    },
    urgent: false,
    sources: [S.ccFoodAversion, S.hsgmNutrition],
  },
  {
    id: 'metallic-taste',
    emoji: '🥄',
    name: { en: 'Metallic taste in your mouth', tr: 'Ağızda metal tadı' },
    aliases: {
      en: ['metallic taste', 'metal taste', 'taste of coins', 'dysgeusia', 'strange taste', 'bitter taste'],
      tr: ['ağızda metal tadı', 'demir tadı', 'bozuk para tadı', 'tat bozukluğu', 'ağızda acı tat', 'disguzi'],
    },
    trimesters: [1],
    about: {
      en: 'A sour or metallic taste, as if you\'ve been sucking coins, is a common early pregnancy change. It\'s thought to be caused by hormones affecting your sense of taste. It isn\'t harmful and usually fades as you move into the second trimester.',
      tr: 'Bozuk para emiyormuşsun gibi ekşi ya da metalik bir tat, gebeliğin başında sık görülen bir değişikliktir. Hormonların tat alma duyunu etkilemesinden kaynaklandığı düşünülüyor. Zararsızdır ve genellikle ikinci trimestere geçerken kaybolur.',
    },
    relief: {
      en: [
        'Try sharp, tangy flavours like citrus, pickles or foods with a vinegar dressing.',
        'Brush your teeth and tongue regularly, and rinse with a mild salt-water mouthwash.',
        'Use plastic or wooden cutlery if metal makes it worse.',
        'Chew sugar-free gum or suck sugar-free mints.',
      ],
      tr: [
        'Narenciye, turşu ya da sirkeli yiyecekler gibi ekşi tatları dene.',
        'Dişlerini ve dilini düzenli fırçala, hafif tuzlu suyla gargara yap.',
        'Metal çatal bıçak tadı kötüleştiriyorsa plastik ya da tahta olanları kullan.',
        'Şekersiz sakız çiğne ya da şekersiz nane şekeri em.',
      ],
    },
    callDoctor: {
      en: [
        'Mention it to your doctor if the taste lasts beyond the first trimester or comes with a dry or burning mouth.',
        'Tell your doctor or pharmacist if it started after a new medicine or supplement.',
      ],
      tr: [
        'Tat ilk trimesterden sonra da sürüyorsa ya da ağız kuruluğu veya yanmayla birlikteyse doktoruna söyle.',
        'Yeni bir ilaç ya da takviyeye başladıktan sonra ortaya çıktıysa doktoruna ya da eczacına söyle.',
      ],
    },
    urgent: false,
    sources: [S.ccDysgeusia],
  },
  {
    id: 'excess-saliva',
    emoji: '🤤',
    name: { en: 'Excess saliva', tr: 'Aşırı tükürük' },
    aliases: {
      en: ['excess saliva', 'drooling', 'too much spit', 'ptyalism', 'hypersalivation'],
      tr: ['aşırı tükürük', 'ağız sulanması', 'salya', 'ptiyalizm', 'çok tükürük'],
    },
    trimesters: [1, 2],
    about: {
      en: 'Some people make much more saliva in pregnancy, often alongside nausea. It\'s thought to happen because hormones overstimulate the salivary glands, and feeling sick can make it worse because swallowing becomes unpleasant. It\'s harmless, if unpleasant, and usually settles with time.',
      tr: 'Bazı kişiler gebelikte, çoğu zaman bulantıyla birlikte, çok daha fazla tükürük üretir. Hormonların tükürük bezlerini aşırı uyarmasından kaynaklandığı düşünülüyor; bulantı da yutmayı tatsız hale getirdiği için durumu kötüleştirebilir. Rahatsız edici olsa da zararsızdır ve genellikle zamanla azalır.',
    },
    relief: {
      en: [
        'Chew sugar-free gum or suck sugar-free sweets to make swallowing easier.',
        'Brush your teeth and rinse with an alcohol-free mouthwash a few times a day.',
        'Eat small, frequent meals to keep nausea down.',
        'Keep sipping water so you don\'t get dehydrated, and carry tissues if you need to spit.',
      ],
      tr: [
        'Yutmayı kolaylaştırmak için şekersiz sakız çiğne ya da şekersiz şeker em.',
        'Günde birkaç kez dişlerini fırçala, alkolsüz bir ağız gargarasıyla çalkala.',
        'Bulantıyı azaltmak için az az ve sık ye.',
        'Susuz kalmamak için yudum yudum su içmeyi sürdür; tükürmen gerekirse yanında mendil taşı.',
      ],
    },
    callDoctor: {
      en: [
        'Tell your midwife or doctor if it comes with severe vomiting, or you can\'t keep fluids down.',
        'See your doctor if your mouth or glands are swollen or painful, or it\'s affecting your sleep or eating.',
      ],
      tr: [
        'Şiddetli kusmayla birlikteyse ya da sıvıları midende tutamıyorsan doktoruna ya da ebene söyle.',
        'Ağzında ya da bezlerinde şişlik veya ağrı varsa, ya da uykunu veya beslenmeni etkiliyorsa doktoruna görün.',
      ],
    },
    urgent: false,
    sources: [S.ccSaliva],
  },
  {
    id: 'nosebleeds',
    emoji: '👃',
    name: { en: 'Nosebleeds', tr: 'Burun kanaması' },
    aliases: {
      en: ['nosebleed', 'nose bleeding', 'bloody nose', 'epistaxis'],
      tr: ['burun kanaması', 'burnum kanıyor', 'epistaksis'],
    },
    trimesters: [2, 3],
    about: {
      en: 'Nosebleeds are more common in pregnancy, because extra blood volume and hormones make the tiny blood vessels inside your nose swell and break more easily. They\'re usually brief and harmless.',
      tr: 'Burun kanaması gebelikte daha sık görülür; çünkü artan kan hacmi ve hormonlar burnunun içindeki minik damarları şişirir ve daha kolay çatlamalarına yol açar. Genellikle kısa sürer ve zararsızdır.',
    },
    relief: {
      en: [
        'Sit up, lean forward and pinch the soft part of your nose for 10 to 15 minutes, breathing through your mouth.',
        'Don\'t tip your head back, and avoid blowing or picking your nose for a day afterwards.',
        'Use a humidifier or a salt-water (saline) spray to keep the inside of your nose moist.',
      ],
      tr: [
        'Dik otur, öne eğil ve ağzından nefes alarak burnunun yumuşak kısmını 10-15 dakika sıkıca tut.',
        'Başını geriye yatırma; sonraki bir gün boyunca burnunu sümkürmekten ve karıştırmaktan kaçın.',
        'Burnunun içini nemli tutmak için nemlendirici ya da tuzlu su (serum fizyolojik) spreyi kullan.',
      ],
    },
    callDoctor: {
      en: [
        'Get urgent medical help if bleeding hasn\'t stopped after 10 to 15 minutes of pressure, or it\'s very heavy.',
        'Get urgent help if you feel weak or dizzy, or are having trouble breathing.',
        'See your doctor if you get nosebleeds often, or bruise easily.',
      ],
      tr: [
        '10-15 dakika bastırmana rağmen kanama durmadıysa ya da çok yoğunsa acil servise git.',
        'Halsizlik, baş dönmesi ya da nefes almada zorluk varsa hemen acil servise git.',
        'Sık sık burun kanaması oluyorsa ya da kolay morarıyorsan doktoruna görün.',
      ],
    },
    urgent: false,
    sources: [S.ccNosebleeds, S.nhsNosebleed],
  },
  {
    id: 'bleeding-gums',
    emoji: '🦷',
    name: { en: 'Swollen or bleeding gums', tr: 'Diş eti şişliği ve kanaması' },
    aliases: {
      en: ['bleeding gums', 'swollen gums', 'pregnancy gingivitis', 'sore gums', 'gum disease'],
      tr: ['diş eti kanaması', 'diş eti şişliği', 'gebelik diş eti iltihabı', 'gingivit', 'diş eti hassasiyeti'],
    },
    trimesters: [2, 3],
    about: {
      en: 'Pregnancy hormones increase blood flow to your gums and make them react more strongly to plaque, so they may look puffy and bleed when you brush. This pregnancy gingivitis affects more than half of pregnancies and usually settles after the birth.',
      tr: 'Gebelik hormonları diş etlerine giden kan akışını artırır ve onları plağa karşı daha hassas hale getirir; bu yüzden diş etlerin şişkin görünebilir ve fırçalarken kanayabilir. Gebelik diş eti iltihabı denen bu durum gebeliklerin yarısından fazlasını etkiler ve genellikle doğumdan sonra geçer.',
    },
    relief: {
      en: [
        'Brush gently twice a day with a soft toothbrush and fluoride toothpaste.',
        'Floss or use interdental brushes once a day.',
        'See your dentist for a check-up and clean while you\'re pregnant, and tell them you\'re pregnant.',
        'Cut down on sugary snacks and drinks.',
      ],
      tr: [
        'Yumuşak bir diş fırçası ve florürlü macunla günde iki kez nazikçe fırçala.',
        'Günde bir kez diş ipi ya da ara yüz fırçası kullan.',
        'Gebeyken kontrol ve temizlik için diş hekimine git; hamile olduğunu söyle.',
        'Şekerli atıştırmalık ve içecekleri azalt.',
      ],
    },
    callDoctor: {
      en: [
        'See your dentist if your gums are very swollen or painful, bleed a lot, or a tooth feels loose.',
        'See your dentist or doctor if a lump grows on your gum, or you have bad breath or pus that won\'t go away.',
      ],
      tr: [
        'Diş etlerin çok şiş ya da ağrılıysa, çok kanıyorsa veya bir dişin sallanıyorsa diş hekimine git.',
        'Diş etinde bir kabarıklık büyüyorsa ya da geçmeyen ağız kokusu veya iltihap varsa diş hekimine ya da doktoruna görün.',
      ],
    },
    urgent: false,
    sources: [S.ccGingivitis, S.ccSecondTrimester],
  },
  {
    id: 'stuffy-nose',
    emoji: '🤧',
    name: { en: 'Stuffy nose (pregnancy rhinitis)', tr: 'Burun tıkanıklığı (gebelik riniti)' },
    aliases: {
      en: ['stuffy nose', 'blocked nose', 'congestion', 'pregnancy rhinitis', 'runny nose', 'snoring'],
      tr: ['burun tıkanıklığı', 'tıkalı burun', 'gebelik riniti', 'burun akıntısı', 'horlama', 'nezle'],
    },
    trimesters: [2, 3],
    about: {
      en: 'A blocked or runny nose that lasts for weeks without a cold or allergy is called pregnancy rhinitis. Hormones and extra blood flow make the lining of your nose swell and produce more mucus. It\'s harmless, often worse at night, and usually clears within two weeks of giving birth.',
      tr: 'Soğuk algınlığı ya da alerji olmadan haftalarca süren burun tıkanıklığı veya akıntısına gebelik riniti denir. Hormonlar ve artan kan akışı burnunun iç zarını şişirir ve daha çok mukus üretmesine yol açar. Zararsızdır, geceleri genellikle daha kötüdür ve çoğunlukla doğumdan sonraki iki hafta içinde geçer.',
    },
    relief: {
      en: [
        'Use a salt-water (saline) nasal spray or rinse.',
        'Raise the head of your bed or use an extra pillow at night.',
        'Drink plenty of water, and try a humidifier or a steamy shower.',
        'Gentle exercise can help ease congestion.',
        'Ask your pharmacist about pregnancy-safe options before using any medicated nasal spray or cold remedy.',
      ],
      tr: [
        'Tuzlu su (serum fizyolojik) burun spreyi ya da burun yıkama kullan.',
        'Yatağının baş tarafını yükselt ya da geceleri fazladan bir yastık kullan.',
        'Bol su iç; nemlendirici ya da buharlı bir duş dene.',
        'Hafif egzersiz tıkanıklığı hafifletmeye yardım edebilir.',
        'İlaçlı bir burun spreyi ya da soğuk algınlığı ilacı kullanmadan önce gebelikte güvenli seçenekleri eczacına sor.',
      ],
    },
    callDoctor: {
      en: [
        'See your doctor if you have a fever, facial pain, or thick yellow or green mucus; it could be an infection.',
        'Talk to your doctor if loud snoring or a blocked nose is badly disturbing your sleep.',
      ],
      tr: [
        'Ateşin, yüz ağrın ya da koyu sarı veya yeşil akıntın varsa doktoruna görün; enfeksiyon olabilir.',
        'Yüksek sesli horlama ya da tıkanıklık uykunu çok bozuyorsa doktorunla konuş.',
      ],
    },
    urgent: false,
    sources: [S.ccRhinitis],
  },

  // ── Breathing, heart and circulation ─────────────────────────────────────
  {
    id: 'breathlessness',
    emoji: '😮‍💨',
    name: { en: 'Feeling short of breath', tr: 'Nefes darlığı hissi' },
    aliases: {
      en: ['shortness of breath', 'breathless', 'out of breath', 'can\'t take a deep breath', 'puffed out'],
      tr: ['nefes darlığı', 'nefes nefese kalma', 'derin nefes alamama', 'soluksuz kalma'],
    },
    trimesters: [2, 3],
    about: {
      en: 'Mild breathlessness is common. Early on, hormones make you breathe more deeply, so you notice your breathing more; later, your growing womb pushes up under your diaphragm and leaves your lungs less room. It\'s usually most noticeable when you exert yourself, and often eases a little when your baby moves down before birth.',
      tr: 'Hafif nefes darlığı yaygındır. Başlarda hormonlar daha derin nefes almana neden olur, bu yüzden nefesini daha çok fark edersin; ilerleyen haftalarda büyüyen rahmin diyaframını yukarı iter ve akciğerlerine daha az yer kalır. Genellikle efor sırasında belirginleşir ve doğumdan önce bebek aşağı indiğinde biraz rahatlayabilir.',
    },
    relief: {
      en: [
        'Slow down, take breaks, and pace yourself on stairs.',
        'Sit and stand up straight to give your lungs more room.',
        'Prop yourself up with pillows at night.',
        'Gentle, regular exercise like walking or swimming can help.',
      ],
      tr: [
        'Yavaşla, ara ver, merdivenleri kendi temponda çık.',
        'Akciğerlerine daha çok yer açmak için dik otur ve dik dur.',
        'Geceleri yastıklarla kendini yükselt.',
        'Yürüyüş ya da yüzme gibi düzenli, hafif egzersizler yardımcı olabilir.',
      ],
    },
    callDoctor: {
      en: [
        'Call emergency services if breathlessness comes on suddenly, or comes with chest pain or coughing up blood.',
        'Call your doctor the same day if you\'re breathless at rest or lying down, or it wakes you at night.',
        'Call the same day if you also have a racing heart or dizziness, or feel very tired and look pale.',
      ],
      tr: [
        'Nefes darlığı aniden başladıysa ya da göğüs ağrısı veya kanlı öksürükle birlikteyse acil yardım hattını ara.',
        'Dinlenirken ya da uzanırken nefesin daralıyorsa veya gece seni uyandırıyorsa aynı gün doktorunu ara.',
        'Çarpıntı ya da baş dönmesi de varsa veya çok yorgun ve soluk görünüyorsan aynı gün ara.',
      ],
    },
    urgent: false,
    sources: [S.nhsGetHelp, S.ccThirdTrimester],
  },
  {
    id: 'sudden-breathlessness',
    emoji: '🫁',
    name: { en: 'Sudden breathlessness or chest pain', tr: 'Ani nefes darlığı ya da göğüs ağrısı' },
    aliases: {
      en: ['sudden shortness of breath', 'chest pain', 'can\'t breathe', 'pulmonary embolism', 'blood clot in lung', 'coughing up blood'],
      tr: ['ani nefes darlığı', 'göğüs ağrısı', 'nefes alamıyorum', 'akciğer pıhtısı', 'pulmoner emboli', 'kanlı öksürük'],
    },
    trimesters: [1, 2, 3],
    about: {
      en: 'Breathlessness that comes on suddenly, chest pain or coughing up blood is different from the gradual puffiness of pregnancy. Pregnancy makes blood clot more easily, and a clot that travels to the lungs (pulmonary embolism) is rare but serious. Heart problems and severe infections can cause these symptoms too, so get help immediately.',
      tr: 'Aniden başlayan nefes darlığı, göğüs ağrısı ya da kanlı öksürük, gebeliğin yavaş yavaş gelen nefes nefese kalma hissinden farklıdır. Gebelik kanın daha kolay pıhtılaşmasına yol açar; akciğere giden bir pıhtı (pulmoner emboli) nadir ama ciddidir. Kalp sorunları ve ağır enfeksiyonlar da bu belirtilere neden olabilir; bu yüzden hemen yardım al.',
    },
    relief: {
      en: [
        'Call emergency services first, then sit upright and try to stay calm.',
        'Don\'t drive yourself to hospital.',
        'Unlock the door and keep your phone and pregnancy notes close.',
      ],
      tr: [
        'Önce acil yardım hattını ara, sonra dik otur ve sakin kalmaya çalış.',
        'Hastaneye kendin araba kullanarak gitme.',
        'Kapının kilidini aç; telefonunu ve gebelik dosyanı yakınında tut.',
      ],
    },
    callDoctor: {
      en: [
        'Call emergency services if you suddenly can\'t catch your breath, or have chest pain or tightness.',
        'Call emergency services if you cough up blood, or feel faint with a racing or pounding heart.',
        'Call emergency services if you\'re breathless and also have a painful, swollen leg.',
      ],
      tr: [
        'Nefesin aniden kesiliyorsa ya da göğsünde ağrı veya sıkışma varsa acil yardım hattını ara.',
        'Kan tükürürsen ya da kalbin hızla veya güm güm çarparken bayılacak gibi olursan acil yardım hattını ara.',
        'Nefes darlığına ağrılı, şiş bir bacak da eşlik ediyorsa acil yardım hattını ara.',
      ],
    },
    urgent: true,
    sources: [S.rcogClotTreatment, S.cdcWarningSigns],
  },
  {
    id: 'palpitations',
    emoji: '💓',
    name: { en: 'Heart palpitations', tr: 'Kalp çarpıntısı' },
    aliases: {
      en: ['palpitations', 'racing heart', 'heart pounding', 'fluttering heart', 'skipped beats', 'fast heartbeat'],
      tr: ['çarpıntı', 'kalp çarpıntısı', 'kalbim hızlı atıyor', 'kalp teklemesi', 'hızlı nabız'],
    },
    trimesters: [2, 3],
    about: {
      en: 'Your blood volume rises a lot in pregnancy and your heart works harder to pump it, so a faster resting heartbeat and the odd flutter or pounding beat are common. Palpitations are usually harmless, especially if they\'re brief and you otherwise feel well.',
      tr: 'Gebelikte kan hacmin belirgin şekilde artar ve kalbin onu pompalamak için daha çok çalışır; bu yüzden dinlenirken daha hızlı kalp atışı ve ara sıra çırpınma ya da güm güm atma hissi yaygındır. Çarpıntı, özellikle kısa sürüyorsa ve kendini genel olarak iyi hissediyorsan, genellikle zararsızdır.',
    },
    relief: {
      en: [
        'Sit, or lie down on your side, and breathe slowly until it settles.',
        'Drink plenty of water and cut down on caffeine.',
        'Get up slowly, and avoid getting overheated.',
      ],
      tr: [
        'Geçene kadar otur ya da yan yat ve yavaş nefes al.',
        'Bol su iç, kafeini azalt.',
        'Yavaşça kalk, aşırı ısınmaktan kaçın.',
      ],
    },
    callDoctor: {
      en: [
        'Call emergency services if palpitations come with chest pain, trouble breathing, fainting or confusion.',
        'Call your doctor the same day if palpitations last several minutes, keep coming back, or make you dizzy.',
        'Tell your doctor or midwife if you have a heart condition or have had palpitations before.',
      ],
      tr: [
        'Çarpıntıya göğüs ağrısı, nefes darlığı, bayılma ya da zihin bulanıklığı eşlik ediyorsa acil yardım hattını ara.',
        'Çarpıntı birkaç dakika sürüyorsa, sık tekrarlıyorsa ya da başını döndürüyorsa aynı gün doktorunu ara.',
        'Bir kalp rahatsızlığın varsa ya da daha önce çarpıntı yaşadıysan doktoruna ya da ebene söyle.',
      ],
    },
    urgent: false,
    sources: [S.ccPalpitations, S.nhsPalpitations],
  },
  {
    id: 'swelling',
    emoji: '🦶',
    name: { en: 'Swollen feet, ankles and fingers', tr: 'Ayak, bilek ve parmaklarda şişlik' },
    aliases: {
      en: ['swelling', 'swollen feet', 'swollen ankles', 'oedema', 'edema', 'puffy hands', 'tight rings'],
      tr: ['şişlik', 'ayak şişmesi', 'bilek şişmesi', 'ödem', 'parmaklarda şişlik', 'yüzük olmuyor'],
    },
    trimesters: [2, 3],
    about: {
      en: 'Mild swelling is very common, especially in the evening, in hot weather and later in pregnancy. Your body holds more water than usual, and your growing womb slows the blood flow back from your legs. Swelling that builds up gradually isn\'t harmful, but sudden swelling of your face, hands or feet needs checking straight away.',
      tr: 'Hafif şişlik, özellikle akşamları, sıcak havalarda ve gebeliğin ilerleyen döneminde çok yaygındır. Vücudun normalden fazla su tutar, büyüyen rahmin de bacaklarından dönen kan akışını yavaşlatır. Yavaş yavaş gelen şişlik zararsızdır; ama yüzünde, ellerinde ya da ayaklarında ani şişlik hemen kontrol edilmeli.',
    },
    relief: {
      en: [
        'Rest with your feet up when you can, and avoid standing for long periods.',
        'Walk regularly and do foot exercises: flex each foot up and down 30 times, then circle it 8 times each way.',
        'Wear comfortable shoes and socks without tight straps, and take off rings that are getting tight.',
      ],
      tr: [
        'Fırsat buldukça ayaklarını yukarı kaldırarak dinlen, uzun süre ayakta kalmaktan kaçın.',
        'Düzenli yürü ve ayak egzersizi yap: her ayağı 30 kez aşağı yukarı esnet, sonra iki yöne sekizer kez çevir.',
        'Sıkı bantları olmayan rahat ayakkabı ve çorap giy; sıkmaya başlayan yüzüklerini çıkar.',
      ],
    },
    callDoctor: {
      en: [
        'Call your maternity unit or doctor straight away if swelling in your face, hands or feet comes on suddenly.',
        'Call straight away if swelling comes with a severe headache, vision problems, pain under your ribs or vomiting.',
        'Call your doctor the same day if one leg is swollen, painful, warm or red; it could be a blood clot.',
      ],
      tr: [
        'Yüzünde, ellerinde ya da ayaklarında şişlik aniden başladıysa hemen doktorunu ya da doğum servisini ara.',
        'Şişliğe şiddetli baş ağrısı, görme sorunu, kaburga altında ağrı ya da kusma eşlik ediyorsa hemen ara.',
        'Tek bacağın şiş, ağrılı, sıcak ya da kızarıksa aynı gün doktorunu ara; pıhtı olabilir.',
      ],
    },
    urgent: false,
    sources: [S.nhsSwelling, S.nhsPreEclampsia],
  },
  {
    id: 'leg-cramps',
    emoji: '💢',
    name: { en: 'Leg cramps', tr: 'Bacak krampları' },
    aliases: {
      en: ['leg cramps', 'calf cramps', 'charley horse', 'night cramps', 'foot cramps'],
      tr: ['bacak krampı', 'baldır krampı', 'kramp', 'gece krampı', 'ayak krampı', 'kas kasılması'],
    },
    trimesters: [2, 3],
    about: {
      en: 'Sudden, painful tightening in your calf or foot, often at night, affects many pregnant people, perhaps as many as 4 in 10. The exact cause isn\'t clear, but the extra weight you\'re carrying and changes in circulation may play a part. Cramps are harmless and usually pass within minutes.',
      tr: 'Özellikle geceleri baldırda ya da ayakta ani, ağrılı kasılma gebelerin önemli bir kısmını, belki her on kişiden dördünü etkiler. Kesin nedeni bilinmiyor; taşıdığın ekstra ağırlık ve dolaşımdaki değişiklikler rol oynuyor olabilir. Kramplar zararsızdır ve genellikle birkaç dakikada geçer.',
    },
    relief: {
      en: [
        'During a cramp, pull your toes up towards your shin and rub the muscle firmly.',
        'Do foot and ankle exercises every day, and stretch your calves before bed.',
        'Stay active with regular walks, and drink plenty of water.',
        'A warm bath or gentle heat can help the muscle relax afterwards.',
      ],
      tr: [
        'Kramp sırasında ayak parmaklarını kaval kemiğine doğru çek ve kası sıkıca ov.',
        'Her gün ayak ve bilek egzersizleri yap, yatmadan önce baldırlarını esnet.',
        'Düzenli yürüyüşlerle hareketli kal ve bol su iç.',
        'Ilık bir banyo ya da hafif sıcaklık sonrasında kasın gevşemesine yardım edebilir.',
      ],
    },
    callDoctor: {
      en: [
        'Call your doctor the same day if pain in one calf doesn\'t go away, or the leg is swollen, warm or red.',
        'Tell your midwife or doctor if cramps are frequent and disturbing your sleep.',
      ],
      tr: [
        'Tek baldırındaki ağrı geçmiyorsa ya da bacağın şiş, sıcak veya kızarıksa aynı gün doktorunu ara.',
        'Kramplar sıksa ve uykunu bozuyorsa doktoruna ya da ebene söyle.',
      ],
    },
    urgent: false,
    sources: [S.nhsCommon, S.ccLegCramps],
  },
  {
    id: 'restless-legs',
    emoji: '🛌',
    name: { en: 'Restless legs', tr: 'Huzursuz bacaklar' },
    aliases: {
      en: ['restless legs', 'restless legs syndrome', 'RLS', 'creepy crawly legs', 'urge to move legs'],
      tr: ['huzursuz bacak sendromu', 'huzursuz bacaklar', 'bacaklarda karıncalanma', 'bacaklarımı oynatma isteği', 'HBS'],
    },
    trimesters: [2, 3],
    about: {
      en: 'Restless legs syndrome is an uncomfortable crawling or tingling feeling with an irresistible urge to move your legs, usually in the evening or at night. It\'s common in pregnancy, especially in the third trimester, and can be linked to low iron. Symptoms usually go away after the birth.',
      tr: 'Huzursuz bacak sendromu, genellikle akşamları ya da geceleri bacaklarda karıncalanma veya rahatsız edici bir his ve bacaklarını hareket ettirmek için karşı konulmaz bir istektir. Gebelikte, özellikle üçüncü trimesterde yaygındır ve demir eksikliğiyle bağlantılı olabilir. Belirtiler genellikle doğumdan sonra geçer.',
    },
    relief: {
      en: [
        'Keep a regular sleep routine and cut down on caffeine, especially later in the day.',
        'Stretch or massage your legs, or try a warm bath before bed.',
        'Get up and walk around for a few minutes when the urge hits.',
        'Gentle daytime exercise like walking or swimming may help.',
      ],
      tr: [
        'Düzenli bir uyku düzeni kur ve özellikle günün ilerleyen saatlerinde kafeini azalt.',
        'Yatmadan önce bacaklarını esnet ya da ov veya ılık bir banyo dene.',
        'İstek geldiğinde kalk ve birkaç dakika dolaş.',
        'Gün içinde yürüyüş ya da yüzme gibi hafif egzersizler yardımcı olabilir.',
      ],
    },
    callDoctor: {
      en: [
        'Ask your doctor or midwife to check your iron levels if restless legs are bothering you.',
        'Talk to your doctor if it\'s badly disturbing your sleep, and don\'t take sleep aids without checking first.',
      ],
      tr: [
        'Huzursuz bacaklar seni rahatsız ediyorsa doktorundan ya da ebenden demir düzeyine bakmasını iste.',
        'Uykunu çok bozuyorsa doktorunla konuş; danışmadan uyku ilacı kullanma.',
      ],
    },
    urgent: false,
    sources: [S.nhsRestlessLegs, S.ccRestlessLegs],
  },
  {
    id: 'varicose-veins',
    emoji: '🧦',
    name: { en: 'Varicose veins', tr: 'Varis' },
    aliases: {
      en: ['varicose veins', 'swollen veins', 'spider veins', 'vulval varicose veins', 'aching legs'],
      tr: ['varis', 'varisli damar', 'örümcek ağı damar', 'bacak damarları', 'bacak ağrısı'],
    },
    trimesters: [2, 3],
    about: {
      en: 'Varicose veins are swollen, bulging veins, usually in the legs, though they can also appear around the vulva. Extra blood volume, hormones that relax vein walls and pressure from your womb all contribute. They can ache or itch but aren\'t harmful, and usually improve after the birth.',
      tr: 'Varis, genellikle bacaklarda, bazen de vulva çevresinde görülen şişmiş, kabarık damarlardır. Artan kan hacmi, damar duvarlarını gevşeten hormonlar ve rahminin baskısı buna katkıda bulunur. Sızlayabilir ya da kaşınabilir ama zararsızdır ve genellikle doğumdan sonra düzelir.',
    },
    relief: {
      en: [
        'Avoid standing for long periods, and try not to sit with your legs crossed.',
        'Put your feet up when sitting, and raise your legs on pillows in bed.',
        'Try maternity compression stockings; they can ease aching and swelling.',
        'Walk, swim and do foot exercises to keep your blood moving.',
      ],
      tr: [
        'Uzun süre ayakta kalmaktan kaçın, bacak bacak üstüne atarak oturmamaya çalış.',
        'Otururken ayaklarını yukarı koy, yatakta bacaklarını yastıklarla yükselt.',
        'Gebeliğe uygun varis çorabı dene; sızlamayı ve şişliği hafifletebilir.',
        'Kan dolaşımını canlı tutmak için yürü, yüz ve ayak egzersizleri yap.',
      ],
    },
    callDoctor: {
      en: [
        'Call your doctor the same day if a vein becomes hard, hot, red or painful, or one leg swells; it could be a clot.',
        'Call emergency services if a leg is painful and swollen and you\'re also breathless or have chest pain.',
        'See your doctor if a varicose vein bleeds, or the skin over it changes or breaks down.',
      ],
      tr: [
        'Bir damar sertleşir, ısınır, kızarır ya da ağrırsa veya tek bacağın şişerse aynı gün doktorunu ara; pıhtı olabilir.',
        'Bacağın ağrılı ve şişse, ayrıca nefes darlığın ya da göğüs ağrın varsa acil yardım hattını ara.',
        'Varisli bir damar kanarsa ya da üstündeki cilt değişir veya yara açılırsa doktoruna görün.',
      ],
    },
    urgent: false,
    sources: [S.nhsCommon, S.ccVaricose],
  },

  // ── Skin ─────────────────────────────────────────────────────────────────
  {
    id: 'skin-changes',
    emoji: '🤎',
    name: { en: 'Skin darkening (melasma and linea nigra)', tr: 'Ciltte koyulaşma (melazma ve linea nigra)' },
    aliases: {
      en: ['melasma', 'chloasma', 'mask of pregnancy', 'linea nigra', 'dark line on belly', 'darker nipples', 'dark patches'],
      tr: ['melazma', 'gebelik maskesi', 'linea nigra', 'karında koyu çizgi', 'ciltte lekeler', 'yüzde lekeler', 'meme ucu koyulaşması'],
    },
    trimesters: [2, 3],
    about: {
      en: 'Pregnancy hormones boost melanin, the pigment in your skin. You may notice a dark line down your belly (linea nigra), darker nipples, freckles and moles, or brownish patches on your face called melasma, the mask of pregnancy. These changes are harmless and usually fade gradually after the birth.',
      tr: 'Gebelik hormonları cildine rengini veren melanin pigmentini artırır. Karnında aşağı doğru inen koyu bir çizgi (linea nigra), koyulaşan meme uçları, çiller ve benler ya da yüzünde gebelik maskesi denen melazma lekeleri fark edebilirsin. Bu değişiklikler zararsızdır ve genellikle doğumdan sonra yavaş yavaş solar.',
    },
    relief: {
      en: [
        'Use a high-factor sunscreen every day and wear a wide-brimmed hat, as sun makes the patches darker.',
        'Choose gentle, fragrance-free skincare.',
        'Ask your pharmacist or doctor before using any skin-lightening or spot creams in pregnancy.',
      ],
      tr: [
        'Her gün yüksek faktörlü güneş kremi sür ve geniş kenarlı şapka tak; güneş lekeleri koyulaştırır.',
        'Nazik, parfümsüz cilt bakım ürünleri seç.',
        'Gebelikte herhangi bir leke açıcı ya da sivilce kremi kullanmadan önce eczacına veya doktoruna sor.',
      ],
    },
    callDoctor: {
      en: [
        'See your doctor if a mole changes shape, size or colour, or starts to bleed or itch.',
        'See your doctor about a new rash, or patches that are spreading quickly.',
      ],
      tr: [
        'Bir benin şekli, boyutu ya da rengi değişirse, kanamaya ya da kaşınmaya başlarsa doktoruna görün.',
        'Yeni bir döküntü ya da hızla yayılan lekeler fark edersen doktoruna görün.',
      ],
    },
    urgent: false,
    sources: [S.acogSkin, S.ccLineaNigra],
  },
  {
    id: 'stretch-marks',
    emoji: '〰️',
    name: { en: 'Stretch marks', tr: 'Çatlaklar' },
    aliases: {
      en: ['stretch marks', 'striae', 'striae gravidarum', 'tiger stripes', 'skin stretching'],
      tr: ['çatlak', 'çatlaklar', 'stria', 'karın çatlağı', 'cilt çatlakları'],
    },
    trimesters: [2, 3],
    about: {
      en: 'Stretch marks are narrow streaks that can be pink, red, purple or brown, depending on your skin tone. They affect around 8 in 10 pregnant people, usually on the tummy, thighs or breasts, and whether you get them depends a lot on your skin type. They\'re harmless and usually fade to paler lines after the birth.',
      tr: 'Çatlaklar, ten rengine göre pembe, kırmızı, mor ya da kahverengi olabilen ince çizgilerdir. Gebelerin yaklaşık onda sekizinde, genellikle karın, uyluk ya da göğüslerde görülür; çıkıp çıkmayacağı büyük ölçüde cilt yapına bağlıdır. Zararsızdır ve doğumdan sonra genellikle daha açık renkli çizgilere dönüşür.',
    },
    relief: {
      en: [
        'Moisturise regularly to ease itching; no cream is proven to prevent stretch marks, but it can feel soothing.',
        'Aim for steady, healthy weight gain, which may help reduce new marks.',
        'Stay active and drink plenty of water to keep your skin comfortable.',
      ],
      tr: [
        'Kaşıntıyı hafifletmek için düzenli nemlendir; hiçbir kremin çatlağı önlediği kanıtlanmadı, ama rahatlatıcı olabilir.',
        'Kilo alımının dengeli ve sağlıklı olmasına özen göster; yeni çatlakları azaltabilir.',
        'Cildinin rahat olması için hareketli kal ve bol su iç.',
      ],
    },
    callDoctor: {
      en: [
        'Call your midwife or doctor the same day if itching is intense, especially on your palms or soles.',
      ],
      tr: [
        'Kaşıntı çok yoğunsa, özellikle avuç içlerinde ya da ayak tabanlarındaysa, aynı gün doktorunu ya da ebeni ara.',
      ],
    },
    urgent: false,
    sources: [S.nhsStretchMarks],
  },
  {
    id: 'itchy-skin',
    emoji: '🧴',
    name: { en: 'Itchy skin', tr: 'Cilt kaşıntısı' },
    aliases: {
      en: ['itchy skin', 'itching', 'itchy belly', 'itchy bump', 'rash', 'PUPPP'],
      tr: ['kaşıntı', 'cilt kaşıntısı', 'karın kaşıntısı', 'döküntü', 'kaşıntılı kabarıklık', 'PUPPP'],
    },
    trimesters: [2, 3],
    about: {
      en: 'Mild itching is common, affecting around 1 in 4 pregnant people, as hormones change and the skin over your bump stretches. Some people also get an itchy rash late in pregnancy that\'s uncomfortable but harmless to the baby. Itching usually stops after the birth, but intense itching of the hands or feet needs checking.',
      tr: 'Hafif kaşıntı yaygındır; hormonlar değiştikçe ve karnının üzerindeki cilt gerildikçe gebelerin yaklaşık dörtte birini etkiler. Bazı kişilerde gebeliğin sonlarına doğru rahatsız edici ama bebeğe zararı olmayan kaşıntılı bir döküntü de çıkabilir. Kaşıntı genellikle doğumdan sonra geçer; ama ellerde ya da ayaklarda yoğun kaşıntı kontrol edilmeli.',
    },
    relief: {
      en: [
        'Pat or tap itchy skin instead of scratching, and keep your nails short.',
        'Have cool or warm (not hot) showers, for no longer than 20 minutes.',
        'Use an unperfumed moisturiser often, and avoid perfumed soaps.',
        'Wear loose cotton clothes, and cut down on spicy food and caffeine if they make it worse.',
        'Ask your pharmacist about creams that are safe in pregnancy.',
      ],
      tr: [
        'Kaşımak yerine cildine hafifçe vur ya da bastır; tırnaklarını kısa tut.',
        'Serin ya da ılık (sıcak değil) duş al; 20 dakikadan uzun sürmesin.',
        'Parfümsüz bir nemlendiriciyi sık sık sür, parfümlü sabunlardan kaçın.',
        'Bol pamuklu giysiler giy; kaşıntıyı artırıyorsa baharatlı yiyecekleri ve kafeini azalt.',
        'Gebelikte güvenli kremleri eczacına sor.',
      ],
    },
    callDoctor: {
      en: [
        'Call your maternity unit or doctor the same day if your palms or soles itch, or the itching is worse at night.',
        'Call the same day if the itching keeps you awake, or comes with dark pee or pale poo.',
        'See your doctor about a new rash, blisters, or itching that\'s affecting your daily life.',
      ],
      tr: [
        'Avuç içlerin ya da ayak tabanların kaşınıyorsa veya kaşıntı geceleri artıyorsa aynı gün doktorunu ya da doğum servisini ara.',
        'Kaşıntı seni uyutmuyorsa ya da koyu renkli idrar veya açık renkli dışkıyla birlikteyse aynı gün ara.',
        'Yeni bir döküntü, kabarcıklar ya da günlük hayatını etkileyen kaşıntı için doktoruna görün.',
      ],
    },
    urgent: false,
    sources: [S.nhsItching, S.ccPuppp],
  },
  {
    id: 'itching-hands-feet',
    emoji: '🤲',
    name: {
      en: 'Intense itching of hands and feet (possible ICP)',
      tr: 'Ellerde ve ayaklarda yoğun kaşıntı (olası gebelik kolestazı)',
    },
    aliases: {
      en: ['intrahepatic cholestasis of pregnancy', 'ICP', 'obstetric cholestasis', 'itchy palms', 'itchy feet', 'itching at night'],
      tr: ['gebelik kolestazı', 'intrahepatik kolestaz', 'ICP', 'avuç içi kaşıntısı', 'ayak tabanı kaşıntısı', 'gece kaşıntısı'],
    },
    trimesters: [3],
    about: {
      en: 'Itching on the palms of your hands or soles of your feet, often worse at night and without a rash, can be a sign of intrahepatic cholestasis of pregnancy (ICP). In ICP the liver doesn\'t handle bile as it should, so bile acids build up in your blood. It affects fewer than 1 in 100 pregnancies and is very manageable, but it needs a blood test and close monitoring because it can affect your baby.',
      tr: 'Avuç içlerinde ya da ayak tabanlarında, çoğu zaman geceleri artan ve döküntü olmadan görülen kaşıntı, gebelik kolestazının (ICP) belirtisi olabilir. Bu durumda karaciğer safrayı olması gerektiği gibi işleyemez ve safra asitleri kanda birikir. Gebeliklerin yüzde birinden azını etkiler ve iyi yönetilebilir; ama bebeğini etkileyebileceği için kan tahlili ve yakın takip gerektirir.',
    },
    relief: {
      en: [
        'Keep your skin cool with lukewarm showers, cool flannels and loose cotton clothing.',
        'Use an unperfumed moisturiser, and pat rather than scratch.',
        'Keep your nails short to protect your skin at night.',
        'Keep track of your baby\'s movements and report any change straight away.',
      ],
      tr: [
        'Ilık duşlar, serin bezler ve bol pamuklu giysilerle cildini serin tut.',
        'Parfümsüz bir nemlendirici kullan; kaşımak yerine hafifçe bastır.',
        'Geceleri cildini korumak için tırnaklarını kısa tut.',
        'Bebeğinin hareketlerini takip et; herhangi bir değişikliği hemen bildir.',
      ],
    },
    callDoctor: {
      en: [
        'Call your maternity unit or doctor today if your palms or soles itch, even without a rash, and ask for a blood test.',
        'Call straight away if the itching is so bad it keeps you awake at night.',
        'Call straight away if you notice yellowing of your skin or eyes, dark pee or pale poo.',
        'Call your maternity unit immediately if your baby is moving less than usual.',
      ],
      tr: [
        'Döküntü olmasa bile avuç içlerin ya da ayak tabanların kaşınıyorsa bugün doktorunu ya da doğum servisini ara; kan tahlili iste.',
        'Kaşıntı seni geceleri uyutmayacak kadar kötüyse hemen ara.',
        'Cildinde ya da gözlerinde sararma, koyu renkli idrar ya da açık renkli dışkı fark edersen hemen ara.',
        'Bebeğin her zamankinden az hareket ediyorsa hemen doğum servisini ara.',
      ],
    },
    urgent: true,
    sources: [S.nhsItching, S.rcogIcp],
  },
  {
    id: 'acne',
    emoji: '🪞',
    name: { en: 'Spots and acne', tr: 'Sivilce ve akne' },
    aliases: {
      en: ['acne', 'spots', 'pimples', 'breakouts', 'oily skin', 'pregnancy acne'],
      tr: ['sivilce', 'akne', 'yağlı cilt', 'cilt döküntüsü', 'gebelik aknesi'],
    },
    trimesters: [1, 2],
    about: {
      en: 'Hormone changes in pregnancy can make your skin oilier and trigger breakouts, even if you haven\'t had spots for years. It\'s most common in the first and second trimesters and usually settles after the birth.',
      tr: 'Gebelikteki hormon değişiklikleri cildini yağlandırabilir ve yıllardır sivilcen olmasa bile sivilce çıkmasına yol açabilir. En çok birinci ve ikinci trimesterde görülür ve genellikle doğumdan sonra düzelir.',
    },
    relief: {
      en: [
        'Wash your face twice a day with a mild, fragrance-free cleanser and lukewarm water.',
        'Choose oil-free, non-comedogenic moisturiser and make-up.',
        'Try not to pick or squeeze spots, which can cause scarring.',
        'Check with your pharmacist or doctor before using any acne product, as some aren\'t safe in pregnancy.',
      ],
      tr: [
        'Yüzünü günde iki kez hafif, parfümsüz bir temizleyici ve ılık suyla yıka.',
        'Yağsız, gözenek tıkamayan nemlendirici ve makyaj ürünleri seç.',
        'Sivilceleri koparmamaya ve sıkmamaya çalış; iz bırakabilir.',
        'Herhangi bir akne ürünü kullanmadan önce eczacına ya da doktoruna danış; bazıları gebelikte güvenli değil.',
      ],
    },
    callDoctor: {
      en: [
        'See your doctor if acne is severe, painful or scarring, so you can find a pregnancy-safe treatment.',
        'If you were using a prescription acne treatment when you got pregnant, stop it and check with your doctor straight away.',
      ],
      tr: [
        'Akne şiddetli, ağrılı ya da iz bırakıyorsa gebelikte güvenli bir tedavi için doktoruna görün.',
        'Gebe kaldığında reçeteli bir akne tedavisi kullanıyorsan bırak ve hemen doktoruna danış.',
      ],
    },
    urgent: false,
    sources: [S.acogSkin, S.nhsAcne],
  },

  // ── Intimate health and bladder ──────────────────────────────────────────
  {
    id: 'vaginal-discharge',
    emoji: '💧',
    name: { en: 'Changes in vaginal discharge', tr: 'Vajinal akıntıda değişiklik' },
    aliases: {
      en: ['vaginal discharge', 'discharge', 'white discharge', 'mucus', 'show', 'mucus plug'],
      tr: ['vajinal akıntı', 'akıntı', 'beyaz akıntı', 'mukus', 'nişan', 'mukus tıkacı'],
    },
    trimesters: [1, 2, 3],
    about: {
      en: 'Having more discharge than usual is normal in pregnancy and helps stop infections travelling up into the womb. Healthy discharge is thin, clear or milky white and doesn\'t smell unpleasant. Near the end you may notice thick, jelly-like mucus, sometimes streaked with pink: this is the show, a sign your body is getting ready for labour.',
      tr: 'Gebelikte normalden fazla akıntı olması olağandır ve enfeksiyonların rahme ilerlemesini önlemeye yardım eder. Sağlıklı akıntı ince, berrak ya da süt beyazıdır ve kötü kokmaz. Sona doğru bazen pembe çizgili, kalın, jöle kıvamında bir mukus fark edebilirsin: buna nişan denir ve vücudunun doğuma hazırlandığının işaretidir.',
    },
    relief: {
      en: [
        'Wear cotton underwear and loose clothes, and change panty liners often.',
        'Wash the outside of your vulva with plain water; avoid perfumed soaps, wipes and douching.',
        'Wipe from front to back after using the toilet.',
        'Use panty liners rather than tampons while you\'re pregnant.',
      ],
      tr: [
        'Pamuklu iç çamaşırı ve bol giysiler giy, günlük pedleri sık değiştir.',
        'Vulvanın dışını sadece suyla yıka; parfümlü sabun, ıslak mendil ve vajinal duştan kaçın.',
        'Tuvaletten sonra önden arkaya doğru sil.',
        'Gebeyken tampon yerine günlük ped kullan.',
      ],
    },
    callDoctor: {
      en: [
        'Call your midwife or doctor if discharge smells unpleasant, is green or yellow, or you feel itchy or sore.',
        'Call your midwife or doctor if it hurts to pee.',
        'Call straight away if you have any bleeding, or a gush or steady trickle of watery fluid.',
      ],
      tr: [
        'Akıntı kötü kokuyorsa, yeşil ya da sarıysa veya kaşıntı ya da yanma hissediyorsan doktorunu ya da ebeni ara.',
        'İdrar yaparken acıyorsa doktorunu ya da ebeni ara.',
        'Herhangi bir kanaman varsa ya da sulu bir sıvı birden geliyor veya sürekli sızıyorsa hemen ara.',
      ],
    },
    urgent: false,
    sources: [S.nhsDischarge, S.acogVaginitis],
  },
  {
    id: 'thrush',
    emoji: '🧫',
    name: { en: 'Thrush (yeast infection)', tr: 'Vajinal mantar enfeksiyonu' },
    aliases: {
      en: ['thrush', 'yeast infection', 'candida', 'vaginal itching', 'cottage cheese discharge'],
      tr: ['mantar enfeksiyonu', 'vajinal mantar', 'kandida', 'vajinal kaşıntı', 'peynirimsi akıntı'],
    },
    trimesters: [2, 3],
    about: {
      en: 'Thrush is a common yeast infection that\'s more likely in pregnancy, especially in the third trimester, because hormones change the natural balance in the vagina. It can cause thick white discharge, itching, soreness and stinging. It\'s easily treated, and there\'s no evidence it harms your baby.',
      tr: 'Vajinal mantar enfeksiyonu yaygın bir maya enfeksiyonudur; hormonlar vajinanın doğal dengesini değiştirdiği için gebelikte, özellikle üçüncü trimesterde daha sık görülür. Kalın beyaz akıntı, kaşıntı, hassasiyet ve yanmaya yol açabilir. Kolayca tedavi edilir ve bebeğine zarar verdiğine dair bir kanıt yoktur.',
    },
    relief: {
      en: [
        'Wear loose cotton underwear, and avoid tight trousers or tights.',
        'Wash with plain water or an unperfumed emollient cream instead of soap, and skip bubble baths.',
        'Pat the area dry gently after washing.',
        'See your doctor, midwife or pharmacist before using any thrush treatment, as not all are suitable in pregnancy.',
      ],
      tr: [
        'Bol pamuklu iç çamaşırı giy, dar pantolon ya da külotlu çoraptan kaçın.',
        'Yıkanırken sabun yerine sade su ya da parfümsüz bir yumuşatıcı krem kullan; köpük banyosundan kaçın.',
        'Yıkandıktan sonra bölgeyi hafifçe bastırarak kurula.',
        'Herhangi bir mantar tedavisi kullanmadan önce doktoruna, ebene ya da eczacına danış; hepsi gebelikte uygun değil.',
      ],
    },
    callDoctor: {
      en: [
        'See your doctor or midwife before treating it yourself, especially if it\'s the first time you\'ve had these symptoms.',
        'See your doctor if treatment hasn\'t worked within a week, or it keeps coming back.',
        'Call your midwife or doctor if discharge smells bad, is green or yellow, or it hurts to pee.',
      ],
      tr: [
        'Kendi kendine tedavi etmeden önce, özellikle bu belirtileri ilk kez yaşıyorsan, doktoruna ya da ebene görün.',
        'Tedavi bir hafta içinde işe yaramadıysa ya da sık tekrarlıyorsa doktoruna görün.',
        'Akıntı kötü kokuyorsa, yeşil ya da sarıysa veya idrar yaparken acıyorsa doktorunu ya da ebeni ara.',
      ],
    },
    urgent: false,
    sources: [S.nhsThrush, S.acogVaginitis],
  },
  {
    id: 'uti-symptoms',
    emoji: '🦠',
    name: { en: 'Burning when you pee (UTI)', tr: 'İdrar yaparken yanma (idrar yolu enfeksiyonu)' },
    aliases: {
      en: ['UTI', 'urinary tract infection', 'burning pee', 'cystitis', 'bladder infection', 'kidney infection', 'blood in urine'],
      tr: ['idrar yolu enfeksiyonu', 'idrarda yanma', 'sistit', 'mesane iltihabı', 'böbrek enfeksiyonu', 'idrarda kan'],
    },
    trimesters: [1, 2, 3],
    about: {
      en: 'Urinary tract infections are more common in pregnancy because hormones relax the urinary tract and your growing womb presses on your bladder. Signs include burning or stinging when you pee, needing to go urgently, and cloudy, smelly or bloody pee. A UTI in pregnancy should always be treated promptly, because it can spread to the kidneys.',
      tr: 'İdrar yolu enfeksiyonları gebelikte daha sık görülür; çünkü hormonlar idrar yollarını gevşetir, büyüyen rahmin de mesanene baskı yapar. İdrar yaparken yanma ya da sızı, ani sıkışma ve bulanık, kötü kokulu ya da kanlı idrar belirtiler arasındadır. Gebelikte idrar yolu enfeksiyonu böbreklere yayılabileceği için her zaman vakit kaybetmeden tedavi edilmeli.',
    },
    relief: {
      en: [
        'Drink plenty of water to help flush your system and dilute your pee.',
        'Pee when you need to and empty your bladder fully, including after sex.',
        'Wipe from front to back, and wear cotton underwear.',
        'Don\'t take any medicines without checking they\'re safe in pregnancy.',
      ],
      tr: [
        'İdrar yollarını temizlemeye ve idrarını seyreltmeye yardım etmesi için bol su iç.',
        'İhtiyacın olduğunda tuvalete git ve ilişkiden sonra da dahil mesaneni tamamen boşalt.',
        'Önden arkaya doğru sil ve pamuklu iç çamaşırı giy.',
        'Gebelikte güvenli olduğundan emin olmadan hiçbir ilaç kullanma.',
      ],
    },
    callDoctor: {
      en: [
        'Contact your doctor or midwife within 24 hours if peeing burns or stings, or you see blood in your pee.',
        'Call your doctor straight away if you have a fever, shivers, or pain in your back or side; it may be a kidney infection.',
        'Call your maternity unit straight away if you also have cramps or regular tightenings.',
      ],
      tr: [
        'İdrar yaparken yanma ya da sızı varsa veya idrarında kan görürsen 24 saat içinde doktoruna ya da ebene ulaş.',
        'Ateş, titreme ya da sırtında veya böğründe ağrı varsa hemen doktorunu ara; böbrek enfeksiyonu olabilir.',
        'Buna kramplar ya da düzenli kasılmalar da eşlik ediyorsa hemen doğum servisini ara.',
      ],
    },
    urgent: false,
    sources: [S.ccUti, S.nhsUti],
  },
  {
    id: 'leaking-urine',
    emoji: '🩲',
    name: { en: 'Leaking urine', tr: 'İdrar kaçırma' },
    aliases: {
      en: ['leaking urine', 'incontinence', 'stress incontinence', 'wetting myself', 'pee when I sneeze', 'bladder leaks'],
      tr: ['idrar kaçırma', 'inkontinans', 'stres inkontinansı', 'hapşırınca idrar kaçırma', 'öksürünce kaçırma', 'mesane kaçırma'],
    },
    trimesters: [2, 3],
    about: {
      en: 'Leaking a little pee when you cough, sneeze, laugh or move suddenly is common in pregnancy. Hormones relax your pelvic floor muscles, and your growing baby presses on your bladder. It often improves after the birth, and pelvic floor exercises help a lot.',
      tr: 'Öksürürken, hapşırırken, gülerken ya da ani hareket ederken biraz idrar kaçırmak gebelikte yaygındır. Hormonlar pelvik taban kaslarını gevşetir, büyüyen bebeğin de mesanene baskı yapar. Çoğu zaman doğumdan sonra düzelir ve pelvik taban egzersizleri çok yardımcı olur.',
    },
    relief: {
      en: [
        'Do pelvic floor exercises every day: squeeze as if holding in wind and pee, hold for a few seconds, then relax.',
        'Empty your bladder regularly, and lean forward to empty it fully.',
        'Keep drinking plenty; cutting back makes pee more concentrated, which can irritate your bladder.',
        'Cut down on caffeine and fizzy drinks, which can irritate your bladder.',
      ],
      tr: [
        'Her gün pelvik taban egzersizi yap: gazını ve çişini tutuyormuş gibi kaslarını sık, birkaç saniye bekle, sonra gevşet.',
        'Mesaneni düzenli boşalt; tam boşaltmak için öne eğil.',
        'Bol sıvı içmeyi sürdür; azaltmak idrarı yoğunlaştırır ve mesaneni tahriş edebilir.',
        'Mesaneni tahriş edebilecek kafeini ve gazlı içecekleri azalt.',
      ],
    },
    callDoctor: {
      en: [
        'Call your maternity unit straight away if you\'re not sure whether it\'s pee or your waters, especially if it keeps trickling.',
        'Call your doctor if it burns or stings when you pee, or your pee is cloudy or bloody.',
        'Ask your midwife or doctor about pelvic floor physiotherapy if leaks are bothering you.',
      ],
      tr: [
        'Gelenin idrar mı yoksa amniyon sıvısı mı olduğundan emin değilsen, özellikle sızıntı sürüyorsa, hemen doğum servisini ara.',
        'İdrar yaparken yanma ya da sızı varsa veya idrarın bulanık ya da kanlıysa doktorunu ara.',
        'Kaçırma seni rahatsız ediyorsa doktorundan ya da ebenden pelvik taban fizyoterapisi iste.',
      ],
    },
    urgent: false,
    sources: [S.nhsCommon, S.rcogWaters],
  },

  // ── Sleep, mind and mood ─────────────────────────────────────────────────
  {
    id: 'insomnia',
    emoji: '🌙',
    name: { en: 'Trouble sleeping', tr: 'Uyku sorunları' },
    aliases: {
      en: ['insomnia', 'can\'t sleep', 'trouble sleeping', 'waking at night', 'sleep problems', 'sleeping position'],
      tr: ['uykusuzluk', 'uyuyamama', 'gece uyanma', 'uyku sorunu', 'uyku pozisyonu'],
    },
    trimesters: [1, 3],
    about: {
      en: 'Sleep problems are very common, affecting around a quarter of people early in pregnancy and most by the end. Hormones, needing to pee, heartburn, cramps, a busy mind and a growing bump all make it harder to get comfortable. Poor sleep is frustrating, but it won\'t harm your baby.',
      tr: 'Uyku sorunları çok yaygındır; gebeliğin başında yaklaşık dörtte birini, sonlarına doğru ise çoğunu etkiler. Hormonlar, sık tuvalet ihtiyacı, mide yanması, kramplar, durmayan düşünceler ve büyüyen karın rahat bir pozisyon bulmayı zorlaştırır. Kötü uyku can sıkıcıdır ama bebeğine zarar vermez.',
    },
    relief: {
      en: [
        'From 28 weeks, go to sleep on your side; if you wake up on your back, just turn over.',
        'Support your bump with pillows and put one between your knees.',
        'Avoid caffeine in the evening and long naps late in the day.',
        'Wind down with a relaxing routine, breathing exercises or a warm bath.',
        'Gentle daytime activity, like a lunchtime walk, can help you sleep.',
      ],
      tr: [
        '28. haftadan itibaren yan yatarak uykuya dal; sırtüstü uyanırsan sadece yan dön.',
        'Karnını yastıklarla destekle, dizlerinin arasına da bir yastık koy.',
        'Akşamları kafeinden, günün geç saatlerinde de uzun şekerlemelerden kaçın.',
        'Rahatlatıcı bir rutin, nefes egzersizleri ya da ılık bir banyoyla gevşe.',
        'Öğle yürüyüşü gibi gün içindeki hafif hareketler uykuna yardım edebilir.',
      ],
    },
    callDoctor: {
      en: [
        'Talk to your midwife or doctor if lack of sleep is making it hard to cope, or comes with anxiety or low mood.',
        'Mention loud snoring, gasping or pauses in your breathing at night, or very restless legs.',
        'Check with your doctor before taking any sleep aid, including herbal remedies.',
      ],
      tr: [
        'Uykusuzluk baş etmeni zorlaştırıyorsa ya da kaygı veya çökkünlükle birlikteyse doktorunla ya da ebenle konuş.',
        'Gece yüksek sesli horlama, nefesin kesilmesi ya da nefes nefese uyanma veya çok huzursuz bacaklar varsa söyle.',
        'Bitkisel olanlar dahil herhangi bir uyku ilacı kullanmadan önce doktoruna danış.',
      ],
    },
    urgent: false,
    sources: [S.ccInsomnia, S.nhsTiredness],
  },
  {
    id: 'vivid-dreams',
    emoji: '💭',
    name: { en: 'Vivid dreams and nightmares', tr: 'Canlı rüyalar ve kabuslar' },
    aliases: {
      en: ['vivid dreams', 'strange dreams', 'nightmares', 'weird dreams', 'pregnancy dreams'],
      tr: ['canlı rüyalar', 'garip rüyalar', 'kabus', 'tuhaf rüyalar', 'gebelik rüyaları'],
    },
    trimesters: [2, 3],
    about: {
      en: 'Many people have unusually vivid, strange or worrying dreams in pregnancy, often about the baby or the birth. Hormones, waking more often (so you remember your dreams) and the big emotional changes you\'re going through all play a part. It\'s normal, and dreaming something doesn\'t mean it will happen.',
      tr: 'Gebelikte birçok kişi, çoğu zaman bebek ya da doğumla ilgili, alışılmadık derecede canlı, tuhaf ya da endişe verici rüyalar görür. Hormonlar, daha sık uyanmak (böylece rüyalarını hatırlarsın) ve yaşadığın büyük duygusal değişimler rol oynar. Bu normaldir ve bir şeyi rüyanda görmen onun gerçekleşeceği anlamına gelmez.',
    },
    relief: {
      en: [
        'Talk about your dreams with your partner, a friend or your midwife.',
        'Try relaxation or breathing exercises before bed, and keep a calm bedtime routine.',
        'Writing your worries down before sleep can help clear your mind.',
      ],
      tr: [
        'Rüyalarını partnerinle, bir arkadaşınla ya da ebenle konuş.',
        'Yatmadan önce gevşeme ya da nefes egzersizleri dene, sakin bir uyku rutini sürdür.',
        'Uyumadan önce endişelerini yazmak zihnini boşaltmana yardım edebilir.',
      ],
    },
    callDoctor: {
      en: [
        'Talk to your midwife or doctor if nightmares are frequent and distressing, or come with constant worry or low mood.',
      ],
      tr: [
        'Kabuslar sık ve çok sarsıcıysa ya da sürekli endişe veya çökkünlükle birlikteyse doktorunla ya da ebenle konuş.',
      ],
    },
    urgent: false,
    sources: [S.nhsTiredness],
  },
  {
    id: 'mood-swings',
    emoji: '🎢',
    name: { en: 'Mood swings', tr: 'Duygu durum dalgalanmaları' },
    aliases: {
      en: ['mood swings', 'emotional', 'crying a lot', 'irritable', 'feeling overwhelmed', 'weepy'],
      tr: ['duygu durum değişiklikleri', 'ruh hali değişimleri', 'çabuk ağlama', 'sinirlilik', 'duygusallık', 'alınganlık'],
    },
    trimesters: [1, 3],
    about: {
      en: 'Feeling tearful one minute and irritable or elated the next is very common, especially in the first trimester and towards the end. Shifting hormones, tiredness, physical discomfort and the sheer size of this life change all play a part. Ups and downs are normal, but feeling low most of the time is not something you just have to put up with.',
      tr: 'Bir an ağlamaklı, bir sonraki an sinirli ya da çok mutlu hissetmek, özellikle ilk trimesterde ve sona doğru çok yaygındır. Değişen hormonlar, yorgunluk, bedensel rahatsızlıklar ve hayatındaki bu büyük değişimin kendisi rol oynar. İnişler çıkışlar normaldir; ama zamanının çoğunda kendini kötü hissetmek katlanmak zorunda olduğun bir şey değildir.',
    },
    relief: {
      en: [
        'Tell the people close to you how you\'re feeling; you don\'t have to explain every tear.',
        'Rest, eat regularly, and get outdoors for some daylight and gentle movement.',
        'Make time for small things you enjoy, and lower the bar on chores.',
        'Antenatal classes or groups can connect you with people going through the same thing.',
      ],
      tr: [
        'Yakınlarına nasıl hissettiğini anlat; her gözyaşını açıklamak zorunda değilsin.',
        'Dinlen, düzenli ye, gün ışığı ve hafif hareket için dışarı çık.',
        'Sevdiğin küçük şeylere zaman ayır, ev işlerinde çıtayı düşür.',
        'Doğuma hazırlık sınıfları ya da grupları seni aynı süreçten geçen insanlarla buluşturabilir.',
      ],
    },
    callDoctor: {
      en: [
        'Talk to your midwife or doctor if you feel low, hopeless or anxious most days for two weeks or more.',
        'Get help the same day if you\'re struggling to cope with daily life, to eat or to sleep.',
        'If you have thoughts of harming yourself or your baby, call emergency services or a crisis line now.',
      ],
      tr: [
        'İki hafta ya da daha uzun süre çoğu gün kendini çökkün, umutsuz ya da kaygılı hissediyorsan doktorunla ya da ebenle konuş.',
        'Günlük hayatla baş etmekte, yemek yemekte ya da uyumakta zorlanıyorsan aynı gün yardım al.',
        'Kendine ya da bebeğine zarar verme düşüncelerin varsa hemen acil yardım hattını ya da bir kriz hattını ara.',
      ],
    },
    urgent: false,
    sources: [S.ccMoodSwings, S.nhsMentalHealth],
  },
  {
    id: 'anxiety',
    emoji: '😟',
    name: { en: 'Anxiety and worry', tr: 'Kaygı ve endişe' },
    aliases: {
      en: ['anxiety', 'worry', 'panic attacks', 'stress', 'nervous', 'perinatal anxiety'],
      tr: ['kaygı', 'endişe', 'anksiyete', 'panik atak', 'stres', 'gerginlik'],
    },
    trimesters: [1, 2, 3],
    about: {
      en: 'Some worry in pregnancy is natural, whether about the baby, the birth, money or how life will change. When anxiety is there most of the time, is hard to control or stops you doing everyday things, it\'s called perinatal anxiety, and it\'s common and treatable. You may notice a racing heart, restlessness, poor sleep or a constant sense that something bad will happen.',
      tr: 'Gebelikte bebek, doğum, para ya da hayatın nasıl değişeceği hakkında biraz endişelenmek doğaldır. Kaygı zamanının çoğunda varsa, kontrol etmesi zorsa ya da günlük işlerini yapmanı engelliyorsa buna perinatal kaygı denir; yaygındır ve tedavi edilebilir. Hızlı kalp atışı, huzursuzluk, kötü uyku ya da sürekli kötü bir şey olacakmış gibi bir his fark edebilirsin.',
    },
    relief: {
      en: [
        'Share your worries with your partner, a friend or your midwife; saying them out loud often helps.',
        'Try slow breathing for a few minutes: breathe in for a count of 4, out for a count of 6.',
        'Stay active: walking, swimming or pregnancy yoga can ease stress.',
        'Limit endless scrolling, and stick to trusted sources of pregnancy information.',
      ],
      tr: [
        'Endişelerini partnerinle, bir arkadaşınla ya da ebenle paylaş; onları dile getirmek çoğu zaman iyi gelir.',
        'Birkaç dakika yavaş nefes almayı dene: dörde kadar sayarak nefes al, altıya kadar sayarak ver.',
        'Hareketli kal: yürüyüş, yüzme ya da gebelik yogası stresi azaltabilir.',
        'Sonu gelmeyen ekran kaydırmayı sınırla; güvenilir gebelik bilgi kaynaklarına bağlı kal.',
      ],
    },
    callDoctor: {
      en: [
        'Talk to your midwife or doctor if you feel anxious most of the time, or worry is affecting your daily life.',
        'Get help the same day if you\'re having panic attacks, or can\'t eat or sleep because of worry.',
        'Call emergency services now if you have thoughts of harming yourself, or feel you can\'t keep yourself safe.',
      ],
      tr: [
        'Zamanının çoğunda kaygılı hissediyorsan ya da endişe günlük hayatını etkiliyorsa doktorunla ya da ebenle konuş.',
        'Panik ataklar yaşıyorsan ya da endişeden yiyemiyor veya uyuyamıyorsan aynı gün yardım al.',
        'Kendine zarar verme düşüncelerin varsa ya da kendini güvende tutamayacağını hissediyorsan hemen acil yardım hattını ara.',
      ],
    },
    urgent: false,
    sources: [S.nhsAnxiety],
  },
  {
    id: 'low-mood',
    emoji: '🌧️',
    name: { en: 'Low mood and depression', tr: 'Çökkünlük ve depresyon' },
    aliases: {
      en: ['depression', 'low mood', 'antenatal depression', 'perinatal depression', 'feeling hopeless', 'sad all the time'],
      tr: ['depresyon', 'çökkünlük', 'doğum öncesi depresyon', 'perinatal depresyon', 'umutsuzluk', 'sürekli üzgün hissetmek'],
    },
    trimesters: [1, 2, 3],
    about: {
      en: 'Depression during pregnancy (antenatal or perinatal depression) is common, affecting about 1 in 10 pregnant people. It isn\'t your fault and it doesn\'t mean you\'ll be a bad parent. Signs include feeling sad, tearful, hopeless or numb much of the time, losing interest in things, and changes in sleep and appetite. It\'s treatable, and getting help early protects both you and your baby.',
      tr: 'Gebelikte depresyon (doğum öncesi ya da perinatal depresyon) yaygındır ve gebelerin yaklaşık onda birini etkiler. Bu senin suçun değildir ve kötü bir ebeveyn olacağın anlamına gelmez. Zamanının çoğunda üzgün, ağlamaklı, umutsuz ya da duygusuz hissetmek, hiçbir şeyden zevk alamamak, uyku ve iştahta değişiklikler belirtiler arasındadır. Tedavi edilebilir ve erken yardım almak hem seni hem bebeğini korur.',
    },
    relief: {
      en: [
        'Tell someone you trust how you really feel; you don\'t have to carry this alone.',
        'Gentle activity, daylight and regular meals can lift your mood a little each day.',
        'Ask your midwife or doctor about talking therapies and local perinatal mental health support.',
        'Contact a mental health helpline or peer support group if you need to talk to someone today.',
      ],
      tr: [
        'Güvendiğin birine gerçekte nasıl hissettiğini anlat; bu yükü tek başına taşımak zorunda değilsin.',
        'Hafif hareket, gün ışığı ve düzenli öğünler ruh halini her gün biraz iyileştirebilir.',
        'Doktoruna ya da ebene konuşma terapilerini ve yakınındaki perinatal ruh sağlığı desteğini sor.',
        'Bugün biriyle konuşmaya ihtiyacın varsa bir ruh sağlığı destek hattına ya da akran destek grubuna ulaş.',
      ],
    },
    callDoctor: {
      en: [
        'Talk to your midwife or doctor if you\'ve felt low or lost interest in things for more than two weeks.',
        'Contact your doctor urgently if you see or hear things others don\'t, or have strong beliefs others don\'t share.',
        'Call emergency services now if you think you might harm yourself or your baby.',
      ],
      tr: [
        'İki haftadan uzun süredir kendini çökkün hissediyorsan ya da hiçbir şeye ilgi duymuyorsan doktorunla ya da ebenle konuş.',
        'Başkalarının görmediğini görüyor, duymadığını duyuyorsan ya da kimsenin paylaşmadığı güçlü inançların varsa hemen doktoruna ulaş.',
        'Kendine ya da bebeğine zarar verebileceğini düşünüyorsan hemen acil yardım hattını ara.',
      ],
    },
    urgent: false,
    sources: [S.nhsDepression, S.acogDepression],
  },
  {
    id: 'self-harm-thoughts',
    emoji: '🫂',
    name: { en: 'Thoughts of harming yourself or your baby', tr: 'Kendine ya da bebeğine zarar verme düşünceleri' },
    aliases: {
      en: ['suicidal thoughts', 'thoughts of self-harm', 'wanting to die', 'harming the baby', 'intrusive thoughts', 'crisis'],
      tr: ['intihar düşüncesi', 'kendine zarar verme', 'ölmek istemek', 'bebeğe zarar verme düşüncesi', 'istenmeyen düşünceler', 'kriz'],
    },
    trimesters: [1, 2, 3],
    about: {
      en: 'If you\'re having thoughts of ending your life, hurting yourself or harming your baby, you are not alone and you are not a bad person. These thoughts can be a symptom of a treatable illness such as perinatal depression, anxiety or, rarely, psychosis. Help works, and reaching out right now is the strongest, safest thing you can do.',
      tr: 'Hayatına son vermeyi, kendini incitmeyi ya da bebeğine zarar vermeyi düşünüyorsan yalnız değilsin ve kötü bir insan değilsin. Bu düşünceler perinatal depresyon, kaygı ya da nadiren psikoz gibi tedavi edilebilir bir hastalığın belirtisi olabilir. Yardım işe yarar; hemen şimdi birine ulaşmak atabileceğin en güçlü ve en güvenli adımdır.',
    },
    relief: {
      en: [
        'Tell someone near you now, such as a partner, friend, family member or neighbour, and ask them to stay with you.',
        'Move away from anything you could use to hurt yourself.',
        'Call a crisis line or mental health helpline if you need to talk to someone straight away.',
      ],
      tr: [
        'Hemen yakınındaki birine, partnerine, bir arkadaşına, ailenden birine ya da komşuna söyle ve yanında kalmasını iste.',
        'Kendine zarar vermek için kullanabileceğin her şeyden uzaklaş.',
        'Hemen biriyle konuşman gerekiyorsa bir kriz hattını ya da ruh sağlığı destek hattını ara.',
      ],
    },
    callDoctor: {
      en: [
        'Call emergency services now if you feel you might act on these thoughts, or can\'t keep yourself safe.',
        'Contact your doctor or midwife today if these thoughts come and go, even if you don\'t plan to act on them.',
        'Get emergency help if you\'re seeing or hearing things others don\'t, or feel very confused.',
      ],
      tr: [
        'Bu düşüncelere göre davranabileceğini ya da kendini güvende tutamayacağını hissediyorsan hemen acil yardım hattını ara.',
        'Bu düşünceler gelip gidiyorsa, harekete geçmeyi planlamasan bile bugün doktoruna ya da ebene ulaş.',
        'Başkalarının görmediği ya da duymadığı şeyleri görüyor veya duyuyorsan ya da zihnin çok karışıksa acil yardım al.',
      ],
    },
    urgent: true,
    sources: [S.cdcWarningSigns, S.nhsSuicidalThoughts],
  },
  {
    id: 'baby-brain',
    emoji: '🧠',
    name: { en: 'Forgetfulness (baby brain)', tr: 'Unutkanlık (gebelik beyni)' },
    aliases: {
      en: ['baby brain', 'pregnancy brain', 'forgetfulness', 'brain fog', 'can\'t concentrate', 'momnesia'],
      tr: ['unutkanlık', 'gebelik beyni', 'dalgınlık', 'zihin bulanıklığı', 'odaklanamama', 'beyin sisi'],
    },
    trimesters: [1, 3],
    about: {
      en: 'Feeling foggy, forgetful or easily distracted is something many pregnant people notice. Hormone changes, poor sleep, tiredness and having a lot on your mind are all likely to play a part. It\'s real, it\'s common, and it\'s temporary.',
      tr: 'Kafanın bulanık olması, unutkanlık ya da dikkatinin kolay dağılması birçok gebenin fark ettiği bir durumdur. Hormon değişiklikleri, kötü uyku, yorgunluk ve aklındaki onca şey büyük olasılıkla rol oynar. Gerçektir, yaygındır ve geçicidir.',
    },
    relief: {
      en: [
        'Use lists, calendar reminders and phone alarms for appointments and tasks.',
        'Keep your keys, wallet and phone in the same place every time.',
        'Prioritise sleep and rest where you can.',
        'Be kind to yourself, and let others help carry the mental load.',
      ],
      tr: [
        'Randevular ve işler için listeler, takvim hatırlatıcıları ve telefon alarmları kullan.',
        'Anahtarlarını, cüzdanını ve telefonunu hep aynı yere koy.',
        'Fırsat buldukça uykuya ve dinlenmeye öncelik ver.',
        'Kendine nazik davran, zihinsel yükü taşımada başkalarının da yardım etmesine izin ver.',
      ],
    },
    callDoctor: {
      en: [
        'Talk to your doctor if forgetfulness is severe, getting worse, or comes with low mood or anxiety.',
        'Call emergency services if you suddenly become confused, especially with a severe headache or vision changes.',
      ],
      tr: [
        'Unutkanlık çok belirginse, giderek artıyorsa ya da çökkünlük veya kaygıyla birlikteyse doktorunla konuş.',
        'Özellikle şiddetli baş ağrısı ya da görme değişiklikleriyle birlikte aniden zihin karışıklığı yaşarsan acil yardım hattını ara.',
      ],
    },
    urgent: false,
    sources: [S.ccBrainFog],
  },
  {
    id: 'carpal-tunnel',
    emoji: '✋',
    name: { en: 'Tingling or numb hands (carpal tunnel)', tr: 'Ellerde karıncalanma ve uyuşma (karpal tünel)' },
    aliases: {
      en: ['carpal tunnel syndrome', 'numb hands', 'tingling fingers', 'pins and needles', 'wrist pain', 'weak grip'],
      tr: ['karpal tünel sendromu', 'elde uyuşma', 'parmaklarda karıncalanma', 'el uyuşması', 'bilek ağrısı', 'kavrama güçsüzlüğü'],
    },
    trimesters: [2, 3],
    about: {
      en: 'Swelling in pregnancy can squeeze the nerve that runs through your wrist, causing tingling, numbness or pain in your thumb and fingers, often worse at night or first thing in the morning. Carpal tunnel syndrome is common later in pregnancy and usually gets better on its own after the birth.',
      tr: 'Gebelikteki şişlik bileğinden geçen siniri sıkıştırabilir; bu da başparmağında ve diğer parmaklarında, çoğu zaman geceleri ya da sabah uyandığında artan karıncalanma, uyuşma veya ağrıya yol açar. Karpal tünel sendromu gebeliğin ilerleyen döneminde yaygındır ve genellikle doğumdan sonra kendiliğinden düzelir.',
    },
    relief: {
      en: [
        'Wear a wrist splint at night to keep your wrist straight; ask a pharmacist or physiotherapist.',
        'Avoid bending your wrist repeatedly or gripping hard, and take breaks from typing or phone use.',
        'Shake out your hands, or gently move your fingers and wrists, when symptoms come on.',
        'Raise your hands on a pillow when you rest.',
      ],
      tr: [
        'Bileğini düz tutmak için geceleri bilek ateli tak; eczacına ya da fizyoterapistine danış.',
        'Bileğini sürekli bükmekten ya da sıkıca kavramaktan kaçın; klavye ve telefon kullanırken ara ver.',
        'Belirtiler başladığında ellerini silkele ya da parmaklarını ve bileklerini nazikçe hareket ettir.',
        'Dinlenirken ellerini bir yastıkla yükselt.',
      ],
    },
    callDoctor: {
      en: [
        'See your doctor or midwife if numbness is constant, your hand feels weak, or you keep dropping things.',
        'Call your midwife or doctor straight away if tingling comes with sudden swelling of your face or hands, or a severe headache.',
      ],
      tr: [
        'Uyuşma sürekliyse, elin güçsüz hissettiriyorsa ya da sık sık bir şeyler düşürüyorsan doktoruna ya da ebene görün.',
        'Karıncalanmaya yüzünde ya da ellerinde ani şişlik veya şiddetli baş ağrısı eşlik ediyorsa hemen doktorunu ya da ebeni ara.',
      ],
    },
    urgent: false,
    sources: [S.nhsCarpalTunnel, S.ccCarpalTunnel],
  },

  // ── Baby, labour and later pregnancy ─────────────────────────────────────
  {
    id: 'braxton-hicks',
    emoji: '🤰',
    name: { en: 'Braxton Hicks (practice contractions)', tr: 'Braxton Hicks (alıştırma kasılmaları)' },
    aliases: {
      en: ['Braxton Hicks', 'practice contractions', 'false labour', 'false labor', 'tightening of bump', 'hard belly'],
      tr: ['Braxton Hicks', 'yalancı sancı', 'alıştırma kasılmaları', 'sahte doğum sancısı', 'karın sertleşmesi', 'karnım taş gibi oluyor'],
    },
    trimesters: [2, 3],
    about: {
      en: 'Braxton Hicks are irregular tightenings of your womb, when your bump goes hard for a minute or so and then relaxes. They\'re your body\'s practice for labour and can start in the second trimester, becoming more noticeable later on. Unlike labour contractions, they\'re usually painless or only mildly uncomfortable, don\'t get stronger or closer together, and ease when you change what you\'re doing.',
      tr: 'Braxton Hicks, karnının bir dakika kadar sertleşip sonra gevşediği düzensiz rahim kasılmalarıdır. Vücudunun doğum için yaptığı alıştırmalardır; ikinci trimesterde başlayabilir ve sonlara doğru daha belirgin hale gelir. Doğum kasılmalarının aksine genellikle ağrısızdır ya da yalnızca hafif rahatsızlık verir, güçlenmez ya da sıklaşmaz ve yaptığın şeyi değiştirdiğinde geçer.',
    },
    relief: {
      en: [
        'Change position: walk if you\'ve been sitting, or lie down on your side if you\'ve been active.',
        'Drink a glass or two of water, as being dehydrated can trigger them.',
        'Empty your bladder, and try a warm bath or slow breathing.',
        'If you\'re unsure, time them for an hour: labour contractions become regular, longer and stronger.',
      ],
      tr: [
        'Pozisyon değiştir: oturuyorsan yürü, hareketliysen yan yatarak dinlen.',
        'Bir iki bardak su iç; susuz kalmak bu kasılmaları tetikleyebilir.',
        'Mesaneni boşalt; ılık bir banyo ya da yavaş nefes almayı dene.',
        'Emin değilsen bir saat boyunca süre tut: doğum kasılmaları düzenli, uzun ve güçlü hale gelir.',
      ],
    },
    callDoctor: {
      en: [
        'Call your maternity unit straight away if you\'re under 37 weeks and the tightenings become regular or painful.',
        'Call straight away if tightenings come with bleeding, fluid leaking, or your baby moving less.',
        'Call if contractions are about 5 minutes apart or closer, or too strong to talk through.',
      ],
      tr: [
        '37. haftadan önceysen ve kasılmalar düzenli ya da ağrılı hale gelirse hemen doğum servisini ara.',
        'Kasılmalara kanama, su gelmesi ya da bebeğinin daha az hareket etmesi eşlik ediyorsa hemen ara.',
        'Kasılmalar yaklaşık 5 dakikada bir ya da daha sık geliyorsa veya konuşamayacağın kadar güçlüyse ara.',
      ],
    },
    urgent: false,
    sources: [S.ccBraxtonHicks, S.acogLabour],
  },
  {
    id: 'reduced-movements',
    emoji: '👣',
    name: { en: 'Baby moving less than usual', tr: 'Bebeğin her zamankinden az hareket etmesi' },
    aliases: {
      en: ['reduced fetal movements', 'baby not moving', 'fewer kicks', 'baby quiet', 'kick counts', 'change in movements'],
      tr: ['bebek hareketlerinde azalma', 'bebek kıpırdamıyor', 'tekmeler azaldı', 'bebek sessiz', 'tekme sayma', 'hareket değişikliği'],
    },
    trimesters: [2, 3],
    about: {
      en: 'You\'ll usually start to feel your baby move between 16 and 24 weeks, and from then on you\'ll get to know their own pattern. There\'s no set number of kicks to count, but fewer movements, or a change in the pattern, can be an early sign that your baby needs checking. Most of the time all is well, but checking quickly could save your baby\'s life. You should feel movements right up to and during labour.',
      tr: 'Bebeğinin hareketlerini genellikle 16-24. haftalar arasında hissetmeye başlarsın ve o andan itibaren onun kendine özgü düzenini tanırsın. Sayman gereken belirli bir tekme sayısı yoktur; ama hareketlerin azalması ya da düzenin değişmesi, bebeğinin kontrol edilmesi gerektiğinin erken bir işareti olabilir. Çoğu zaman her şey yolundadır, ama hızlı kontrol bebeğinin hayatını kurtarabilir. Doğuma kadar, hatta doğum sırasında bile hareketlerini hissetmelisin.',
    },
    relief: {
      en: [
        'Call straight away, even in the middle of the night; don\'t wait until tomorrow.',
        'Don\'t use a home heartbeat monitor (doppler) to reassure yourself; it isn\'t reliable.',
        'Don\'t wait to see whether a cold drink, a snack or lying down gets your baby moving.',
      ],
      tr: [
        'Gecenin bir yarısı bile olsa hemen ara; yarını bekleme.',
        'Kendini rahatlatmak için evde kalp sesi dinleme cihazı (doppler) kullanma; güvenilir değil.',
        'Soğuk bir içecek, bir atıştırmalık ya da uzanmak bebeğini hareketlendirecek mi diye bekleme.',
      ],
    },
    callDoctor: {
      en: [
        'Call your maternity unit or doctor immediately if your baby is moving less, or the pattern of movements has changed.',
        'Call immediately if you can\'t feel your baby moving at all.',
        'Call again every time it happens, however often; you are never wasting anyone\'s time.',
        'Tell your midwife or doctor if you haven\'t felt any movements by 24 weeks.',
      ],
      tr: [
        'Bebeğin daha az hareket ediyorsa ya da hareketlerinin düzeni değiştiyse hemen doğum servisini ya da doktorunu ara.',
        'Bebeğinin hiç hareket etmediğini hissediyorsan hemen ara.',
        'Bu her yaşandığında, kaç kez olursa olsun yeniden ara; asla kimsenin vaktini boşa harcamış olmazsın.',
        '24. haftaya kadar hiç hareket hissetmediysen ebene ya da doktoruna söyle.',
      ],
    },
    urgent: true,
    sources: [S.nhsMovements, S.rcogMovements],
  },
  {
    id: 'fluid-leaking',
    emoji: '🌊',
    name: { en: 'Fluid leaking (waters breaking)', tr: 'Su gelmesi (amniyon sıvısı sızıntısı)' },
    aliases: {
      en: ['waters breaking', 'water breaking', 'water broke', 'leaking fluid', 'amniotic fluid', 'PROM', 'gush of fluid', 'trickle of fluid'],
      tr: ['su gelmesi', 'su geldi', 'suyum geldi', 'su kesesi açıldı', 'amniyon sıvısı', 'erken su gelmesi', 'sıvı sızıntısı', 'zar yırtılması'],
    },
    trimesters: [2, 3],
    about: {
      en: 'Your waters (the fluid around your baby) can break with a sudden gush or a slow, steady trickle. Near your due date it\'s often a sign that labour is starting, but before 37 weeks it can mean premature labour and a higher risk of infection, so it always needs checking straight away. Waters are usually clear or pale straw-coloured. Leaking a little pee is also common in pregnancy, so if you\'re unsure, get checked.',
      tr: 'Bebeğini saran sıvı (amniyon sıvısı) ani bir boşalma ya da yavaş ve sürekli bir sızıntı şeklinde gelebilir. Doğum tarihine yakın bu genellikle doğumun başladığının işaretidir; ama 37. haftadan önce erken doğum ve daha yüksek enfeksiyon riski anlamına gelebilir, bu yüzden her zaman hemen kontrol edilmeli. Bu sıvı genellikle berrak ya da soluk saman rengindedir. Gebelikte biraz idrar kaçırmak da yaygındır; emin değilsen kontrol ettir.',
    },
    relief: {
      en: [
        'Put on a pad, not a tampon, so you can see the colour and amount of fluid.',
        'Note the time it started and what colour it is.',
        'Avoid sex until you\'ve been checked.',
      ],
      tr: [
        'Sıvının rengini ve miktarını görebilmek için tampon değil ped kullan.',
        'Başladığı saati ve rengini not et.',
        'Kontrol edilene kadar cinsel ilişkiden kaçın.',
      ],
    },
    callDoctor: {
      en: [
        'Call your maternity unit or doctor straight away if your waters break or you think you\'re leaking fluid, at any stage.',
        'Call immediately if the fluid is green, brown, bloody or smelly, or you have a fever or feel unwell.',
        'If you\'re under 37 weeks, call your maternity unit now; don\'t wait for contractions to start.',
        'Call emergency services if you can feel or see the umbilical cord, or you\'re bleeding heavily.',
      ],
      tr: [
        'Hangi haftada olursan ol, suyun geldiyse ya da sıvı sızdırdığını düşünüyorsan hemen doğum servisini ya da doktorunu ara.',
        'Sıvı yeşil, kahverengi, kanlı ya da kötü kokuluysa veya ateşin varsa ya da kendini kötü hissediyorsan hemen ara.',
        '37. haftadan önceysen kasılmaların başlamasını beklemeden hemen doğum servisini ara.',
        'Göbek kordonunu hissediyor ya da görüyorsan veya yoğun kanaman varsa acil yardım hattını ara.',
      ],
    },
    urgent: true,
    sources: [S.rcogWaters, S.nhsLabourSigns],
  },
  {
    id: 'fever',
    emoji: '🌡️',
    name: { en: 'Fever or high temperature', tr: 'Ateş ya da yüksek vücut ısısı' },
    aliases: {
      en: ['fever', 'high temperature', 'chills', 'shivering', 'flu', 'infection', 'sepsis'],
      tr: ['ateş', 'yüksek ateş', 'titreme', 'üşüme', 'grip', 'enfeksiyon', 'sepsis'],
    },
    trimesters: [1, 2, 3],
    about: {
      en: 'A temperature of 38°C (100.4°F) or above usually means your body is fighting an infection. Most infections are minor, but in pregnancy they can become serious more quickly and a high fever can affect your baby, so it\'s important to get checked rather than wait it out. Feeling hot and shivery, or very unwell, counts too, even if you haven\'t measured it.',
      tr: '38°C ya da üzeri vücut ısısı genellikle vücudunun bir enfeksiyonla savaştığı anlamına gelir. Çoğu enfeksiyon hafiftir; ama gebelikte daha hızlı ciddileşebilir ve yüksek ateş bebeğini etkileyebilir, bu yüzden geçmesini beklemek yerine kontrol ettirmek önemlidir. Ölçmemiş olsan bile kendini sıcak ve titrek ya da çok hasta hissetmen de bu kapsamdadır.',
    },
    relief: {
      en: [
        'Rest, and drink plenty of fluids little and often.',
        'Wear light clothing and keep the room cool.',
        'Ask your pharmacist or doctor which medicine is safe to bring a temperature down in pregnancy.',
        'Keep track of your baby\'s movements and report any change.',
      ],
      tr: [
        'Dinlen ve sık sık, azar azar bol sıvı iç.',
        'İnce giysiler giy ve odayı serin tut.',
        'Gebelikte ateşi düşürmek için hangi ilacın güvenli olduğunu eczacına ya da doktoruna sor.',
        'Bebeğinin hareketlerini takip et; herhangi bir değişikliği bildir.',
      ],
    },
    callDoctor: {
      en: [
        'Call your midwife or doctor the same day if your temperature is 38°C (100.4°F) or above, or you feel hot and shivery.',
        'Call straight away if fever comes with tummy pain, smelly discharge, leaking fluid or your baby moving less.',
        'Call straight away if you have a fever with pain when peeing, back pain, a rash or a bad cough.',
        'Call emergency services if you\'re breathless, confused, very drowsy, have cold blotchy skin, or feel extremely unwell.',
      ],
      tr: [
        'Ateşin 38°C ya da üzerindeyse veya kendini sıcak ve titrek hissediyorsan aynı gün doktorunu ya da ebeni ara.',
        'Ateşe karın ağrısı, kötü kokulu akıntı, su gelmesi ya da bebeğinin daha az hareket etmesi eşlik ediyorsa hemen ara.',
        'Ateşle birlikte idrarda yanma, sırt ağrısı, döküntü ya da kötü bir öksürük varsa hemen ara.',
        'Nefes darlığı, zihin bulanıklığı, aşırı uyku hali, soğuk ve alacalı cilt varsa ya da çok kötüysen acil yardım hattını ara.',
      ],
    },
    urgent: true,
    sources: [S.nhsGetHelp, S.cdcWarningSigns],
  },
  {
    id: 'signs-of-labour',
    emoji: '⏱️',
    name: { en: 'Signs of labour', tr: 'Doğum belirtileri' },
    aliases: {
      en: ['labour', 'labor', 'contractions', 'the show', 'mucus plug', 'going into labour', 'early labour'],
      tr: ['doğum belirtileri', 'doğum sancısı', 'kasılmalar', 'nişan', 'mukus tıkacı', 'doğum başlıyor', 'sancı'],
    },
    trimesters: [3],
    about: {
      en: 'Labour often starts gradually. Signs include tightenings that become regular, stronger and closer together, a show (the plug of mucus from your cervix coming away), backache, an urge to poo as your baby\'s head presses down, and your waters breaking. The early (latent) phase can last hours or even days, and you\'re usually best at home for much of it.',
      tr: 'Doğum çoğu zaman yavaş yavaş başlar. Düzenli, güçlü ve sıklaşan kasılmalar, nişan gelmesi (rahim ağzındaki mukus tıkacının düşmesi), sırt ağrısı, bebeğin başı aşağı bastırdıkça tuvalete gitme isteği ve suyun gelmesi belirtiler arasındadır. Erken (latent) evre saatler, hatta günler sürebilir ve bu sürenin büyük kısmında genellikle evde olmak en iyisidir.',
    },
    relief: {
      en: [
        'Time your contractions from the start of one to the start of the next.',
        'Stay upright and moving, and try a warm bath or shower.',
        'Keep sipping water, and eat light snacks if you feel like it.',
        'Use slow breathing, massage and a calm, dim space to help you relax.',
      ],
      tr: [
        'Kasılmaların arasını birinin başlangıcından diğerinin başlangıcına kadar ölç.',
        'Dik dur ve hareket et; ılık bir banyo ya da duş dene.',
        'Yudum yudum su içmeye devam et, canın isterse hafif atıştırmalıklar ye.',
        'Rahatlamak için yavaş nefes, masaj ve sakin, loş bir ortamdan yararlan.',
      ],
    },
    callDoctor: {
      en: [
        'Call your maternity unit if your contractions are regular and about every 5 minutes, or you think you\'re in labour.',
        'Call straight away if your waters break, you\'re bleeding, or your baby is moving less than usual.',
        'Call straight away if labour starts before 37 weeks, a contraction lasts over 2 minutes, or you have 6 or more in 10 minutes.',
        'Call emergency services if you have a strong urge to push and think your baby is coming now.',
      ],
      tr: [
        'Kasılmaların düzenliyse ve yaklaşık 5 dakikada bir geliyorsa ya da doğumun başladığını düşünüyorsan doğum servisini ara.',
        'Suyun geldiyse, kanaman varsa ya da bebeğin her zamankinden az hareket ediyorsa hemen ara.',
        'Doğum 37. haftadan önce başlıyorsa, bir kasılma 2 dakikadan uzun sürüyorsa ya da 10 dakikada 6 veya daha fazla kasılma oluyorsa hemen ara.',
        'Güçlü bir ıkınma isteği duyuyorsan ve bebeğin şimdi geldiğini düşünüyorsan acil yardım hattını ara.',
      ],
    },
    urgent: false,
    sources: [S.nhsLabourSigns, S.acogLabour],
  },
  {
    id: 'calf-pain',
    emoji: '🦵',
    name: { en: 'Pain or swelling in one calf (possible blood clot)', tr: 'Tek baldırda ağrı ya da şişlik (olası pıhtı)' },
    aliases: {
      en: ['DVT', 'deep vein thrombosis', 'blood clot', 'calf pain', 'swollen leg', 'one leg swollen', 'leg pain'],
      tr: ['derin ven trombozu', 'DVT', 'pıhtı', 'baldır ağrısı', 'bacakta şişlik', 'tek bacak şiş', 'bacak ağrısı'],
    },
    trimesters: [1, 2, 3],
    about: {
      en: 'Throbbing pain, swelling, warmth or redness in one leg, usually in the calf or thigh, can be a sign of deep vein thrombosis (DVT), a blood clot in a vein. Pregnancy and the first weeks after birth make clots more likely, although they are still uncommon. A clot can travel to the lungs, so it needs checking the same day; treatment is safe and effective in pregnancy.',
      tr: 'Tek bacakta, genellikle baldırda ya da uylukta zonklayan ağrı, şişlik, sıcaklık ya da kızarıklık, derin ven trombozunun (DVT), yani bir damarda pıhtının işareti olabilir. Gebelik ve doğumdan sonraki ilk haftalar pıhtı olasılığını artırır, yine de nadirdir. Pıhtı akciğerlere gidebileceği için aynı gün kontrol edilmeli; gebelikte tedavisi güvenli ve etkilidir.',
    },
    relief: {
      en: [
        'Don\'t rub or massage the painful leg.',
        'Stay active day to day and drink plenty of water to lower your risk of clots.',
        'On journeys over 4 hours, walk around when you can, wear loose clothing and keep drinking water.',
      ],
      tr: [
        'Ağrıyan bacağını ovma ya da ona masaj yapma.',
        'Pıhtı riskini azaltmak için günlük hayatta hareketli kal ve bol su iç.',
        '4 saatten uzun yolculuklarda fırsat buldukça yürü, bol giysiler giy ve su içmeyi sürdür.',
      ],
    },
    callDoctor: {
      en: [
        'Call your doctor or maternity unit the same day if one leg is painful, swollen, warm or red.',
        'Call emergency services if you also feel short of breath, have chest pain or cough up blood.',
      ],
      tr: [
        'Tek bacağın ağrılı, şiş, sıcak ya da kızarıksa aynı gün doktorunu ya da doğum servisini ara.',
        'Buna nefes darlığı, göğüs ağrısı ya da kanlı öksürük de eşlik ediyorsa acil yardım hattını ara.',
      ],
    },
    urgent: true,
    sources: [S.nhsDvt, S.rcogClotRisk],
  },
  {
    id: 'one-sided-pain-early',
    emoji: '📍',
    name: {
      en: 'One-sided tummy pain in early pregnancy (possible ectopic)',
      tr: 'Erken gebelikte tek taraflı karın ağrısı (olası dış gebelik)',
    },
    aliases: {
      en: ['ectopic pregnancy', 'tubal pregnancy', 'one-sided pain', 'pain on one side', 'shoulder tip pain', 'early pregnancy pain'],
      tr: ['dış gebelik', 'ektopik gebelik', 'tüp gebeliği', 'tek taraflı ağrı', 'omuz ucu ağrısı', 'erken gebelikte ağrı'],
    },
    trimesters: [1],
    about: {
      en: 'Pain low down on one side of your tummy between about 4 and 12 weeks, especially with spotting or a brown watery discharge, can be a sign of an ectopic pregnancy, where the pregnancy grows outside the womb, usually in a fallopian tube. It affects around 1 in 90 pregnancies. Pain can have harmless causes too, but because an ectopic pregnancy can be serious, it always needs checking promptly.',
      tr: 'Yaklaşık 4. ile 12. haftalar arasında karnının bir yanında, alt kısımda hissedilen ağrı, özellikle lekelenme ya da kahverengi sulu bir akıntıyla birlikteyse, dış gebeliğin işareti olabilir; yani gebelik rahim dışında, genellikle tüplerden birinde gelişiyor olabilir. Yaklaşık her 90 gebelikten birinde görülür. Ağrının zararsız nedenleri de olabilir; ama dış gebelik ciddi olabileceği için her zaman vakit kaybetmeden kontrol edilmeli.',
    },
    relief: {
      en: [
        'Don\'t wait to see if the pain settles; get checked the same day.',
        'Ask someone to take you rather than driving yourself.',
        'Note when the pain started, where it is and any bleeding, to tell the medical team.',
      ],
      tr: [
        'Ağrının geçip geçmeyeceğini görmek için bekleme; aynı gün kontrol ettir.',
        'Kendin araba kullanmak yerine birinin seni götürmesini iste.',
        'Ağrının ne zaman başladığını, nerede olduğunu ve varsa kanamayı not et; sağlık ekibine anlat.',
      ],
    },
    callDoctor: {
      en: [
        'Call your doctor or early pregnancy unit the same day if you have one-sided tummy pain in early pregnancy.',
        'Call the same day if pain or spotting comes with shoulder-tip pain, or discomfort when you pee or poo.',
        'Call emergency services for sudden, sharp, severe tummy pain, or if you feel very dizzy, faint, sick or look very pale.',
      ],
      tr: [
        'Erken gebelikte karnının bir yanında ağrın varsa aynı gün doktorunu ya da kadın doğum acil servisini ara.',
        'Ağrıya ya da lekelenmeye omuz ucu ağrısı veya idrar ya da dışkılama sırasında rahatsızlık eşlik ediyorsa aynı gün ara.',
        'Ani, keskin, çok şiddetli karın ağrısı ya da ağır baş dönmesi, bayılma, bulantı veya aşırı solukluk varsa acil yardım hattını ara.',
      ],
    },
    urgent: true,
    sources: [S.nhsEctopic, S.rcogEctopic],
  },
];
