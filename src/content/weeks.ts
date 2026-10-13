// Week-by-week pregnancy content for gestational weeks 1–42, bilingual (EN/TR).
//
// Facts come from the NHS week-by-week guide, ACOG, Mayo Clinic, Cleveland
// Clinic, NICE and T.C. Sağlık Bakanlığı. Every week cites the pages it relies on.
//
// Sizes are approximate averages from the widely published fetal growth table
// that the NHS guide also uses: crown–rump length up to week 19, crown–heel
// length from week 20 (the NHS switches to head-to-heel measuring at week 20).
// Size comparisons are illustrative only. Healthy babies vary a lot in size.

import type { WeekContent } from './types';

export const WEEKS: WeekContent[] = [
  {
    week: 1,
    size: { emoji: "🌸", name: { en: "a fresh start", tr: "yeni bir başlangıç" } },
    lengthCm: null,
    weightG: null,
    baby: {
      en: "Pregnancy is counted from the first day of your last period, so in week 1 there is no baby yet. Conception usually happens about two weeks later. Right now your body is starting a new cycle, and in your ovaries several tiny follicles, each holding an egg, are beginning to grow.",
      tr: "Gebelik, son adetinin ilk gününden itibaren sayılır; bu yüzden 1. haftada henüz bir bebek yok. Döllenme genellikle bundan yaklaşık iki hafta sonra gerçekleşir. Şu anda vücudun yeni bir döngüye başlıyor ve yumurtalıklarında her biri bir yumurta taşıyan birkaç küçük folikül büyümeye başlıyor.",
    },
    body: {
      en: "This week you have your period, as your body sheds the lining of the womb and starts to build a fresh one. If you're hoping to conceive, it's a good moment to look after your health and habits. Tiredness, cramps or low mood around your period are common and usually ease within a few days.",
      tr: "Bu hafta adet görüyorsun; vücudun rahim iç zarını döküyor ve yenisini oluşturmaya başlıyor. Bebek sahibi olmayı umuyorsan sağlığına ve alışkanlıklarına özen göstermek için güzel bir zaman. Adet döneminde yorgunluk, kramp ya da keyifsizlik sık görülür ve genellikle birkaç gün içinde hafifler.",
    },
    tips: {
      en: [
        "If you're trying to conceive, take 400 mcg of folic acid daily and continue until 12 weeks of pregnancy.",
        "Stopping alcohol and smoking before you conceive gives your future baby the best start.",
        "If you take regular medicines, talk to your doctor before trying rather than stopping them yourself.",
      ],
      tr: [
        "Bebek planlıyorsan her gün 400 mcg folik asit al ve gebeliğin 12. haftasına kadar devam et.",
        "Gebe kalmadan önce alkolü ve sigarayı bırakmak, bebeğine en iyi başlangıcı sağlar.",
        "Düzenli ilaç kullanıyorsan kendi başına bırakmak yerine denemeye başlamadan önce doktorunla konuş.",
      ],
    },
    todo: {
      en: ["Note the date your last period started; it's used to estimate your due date."],
      tr: ["Son adetinin başladığı tarihi not et; tahmini doğum tarihin buna göre hesaplanır."],
    },
    sources: [
      { name: "ACOG: How your fetus grows during pregnancy", url: "https://www.acog.org/womens-health/faqs/how-your-fetus-grows-during-pregnancy" },
      { name: "T.C. Sağlık Bakanlığı: Gebelik izlemi (Etlik Zübeyde Hanım Hastanesi)", url: "https://ezheah.saglik.gov.tr/TR,397140/gebelik-izlemi-icin-genel-bilgilendirme.html" },
    ],
  },
  {
    week: 2,
    size: { emoji: "✨", name: { en: "a spark of hope", tr: "bir umut kıvılcımı" } },
    lengthCm: null,
    weightG: null,
    baby: {
      en: "There's still no baby this week, but an egg is getting ready. Ovulation, when a mature egg is released from an ovary, usually happens about 14 days before your next period is due, so around the end of this week in a 28-day cycle. Once released, the egg can be fertilised for roughly 12 to 24 hours.",
      tr: "Bu hafta da henüz bir bebek yok ama bir yumurta hazırlanıyor. Olgun bir yumurtanın yumurtalıktan salınması anlamına gelen yumurtlama, genellikle bir sonraki adetinden yaklaşık 14 gün önce, yani 28 günlük bir döngüde bu haftanın sonlarına doğru gerçekleşir. Salınan yumurta yaklaşık 12 ila 24 saat boyunca döllenebilir.",
    },
    body: {
      en: "The lining of your womb is thickening, ready to welcome a fertilised egg. Around ovulation, some people notice clearer, slippery discharge or a brief twinge on one side of the lower tummy. Many notice nothing at all, which is completely normal.",
      tr: "Rahim iç zarın, döllenmiş bir yumurtayı karşılamaya hazırlanmak için kalınlaşıyor. Yumurtlama döneminde bazı kişiler daha berrak ve kaygan bir akıntı ya da karnın altında tek taraflı, kısa bir sızı fark eder. Hiçbir şey fark etmemek de tamamen normaldir.",
    },
    tips: {
      en: [
        "Trying naturally? Having sex every 2 to 3 days covers your fertile window without perfect timing.",
        "Keep taking 400 mcg of folic acid daily; it matters most in the very first weeks.",
        "Ovulation tests can help, but cycles vary, so go easy on yourself if timing feels stressful.",
      ],
      tr: [
        "Doğal yolla mı deniyorsun? 2–3 günde bir ilişkiye girmek, kusursuz zamanlama olmadan doğurgan dönemini kapsar.",
        "Her gün 400 mcg folik asit almaya devam et; en çok ilk haftalarda önemlidir.",
        "Yumurtlama testleri yardımcı olabilir ama döngüler değişkendir; zamanlama seni geriyorsa kendine yüklenme.",
      ],
    },
    todo: { en: [], tr: [] },
    sources: [
      { name: "Cleveland Clinic: Conception", url: "https://my.clevelandclinic.org/health/articles/11585-conception" },
      { name: "NHS: Trying to get pregnant", url: "https://www.nhs.uk/pregnancy/trying-for-a-baby/trying-to-get-pregnant/" },
    ],
  },
  {
    week: 3,
    size: { emoji: "🫧", name: { en: "a tiny ball of cells", tr: "minicik bir hücre kümesi" } },
    lengthCm: null,
    weightG: null,
    baby: {
      en: "If an egg and sperm meet in a fallopian tube, fertilisation creates a single cell carrying a full set of genetic instructions. Over the next few days it divides again and again as it travels to the womb, becoming a tiny ball of cells called a blastocyst. Towards the end of this week or early next week, it begins to attach to the lining of the womb, which is called implantation.",
      tr: "Yumurta ve sperm fallop tüplerinden birinde buluşursa döllenme gerçekleşir ve tüm genetik bilgiyi taşıyan tek bir hücre oluşur. Bu hücre sonraki birkaç gün içinde rahme doğru ilerlerken defalarca bölünür ve blastosist adı verilen minicik bir hücre kümesine dönüşür. Bu haftanın sonuna ya da gelecek haftanın başına doğru rahim iç zarına tutunmaya başlar; buna implantasyon (yerleşme) denir.",
    },
    body: {
      en: "Most people feel no different this week, and it's still too early for a home pregnancy test to give a reliable result. Some notice mild cramps or light spotting around implantation, but many don't. If you're waiting to find out, try to fill the days with things that help you feel calm.",
      tr: "Çoğu kişi bu hafta kendini farklı hissetmez ve evde yapılan gebelik testinin güvenilir bir sonuç vermesi için henüz erkendir. Bazı kişiler yerleşme sırasında hafif kramp ya da hafif lekelenme fark eder, ama çoğu fark etmez. Sonucu bekliyorsan günlerini seni sakinleştiren şeylerle doldurmaya çalış.",
    },
    tips: {
      en: [
        "Home tests are most reliable from the first day of a missed period, so waiting a little can save worry.",
        "Keep taking folic acid daily; your baby's neural tube forms over the next few weeks.",
        "Skip alcohol while you wait to find out; no amount is known to be safe in pregnancy.",
      ],
      tr: [
        "Ev testleri en güvenilir sonucu adetinin geciktiği ilk günden itibaren verir; biraz beklemek endişeni azaltabilir.",
        "Folik asidi her gün almaya devam et; bebeğinin nöral tüpü önümüzdeki birkaç hafta içinde oluşur.",
        "Sonucu beklerken alkolden uzak dur; gebelikte güvenli olduğu bilinen bir miktar yok.",
      ],
    },
    todo: { en: [], tr: [] },
    sources: [
      { name: "Cleveland Clinic: Conception", url: "https://my.clevelandclinic.org/health/articles/11585-conception" },
      { name: "Mayo Clinic: Fetal development, the first trimester", url: "https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-care/art-20045302" },
    ],
  },
  {
    week: 4,
    size: { emoji: "🌱", name: { en: "a poppy seed", tr: "haşhaş tohumu" } },
    lengthCm: 0.2,
    weightG: null,
    baby: {
      en: "Your baby, now called an embryo, has settled into the lining of your womb and is about 2 mm long. It's protected by a fluid-filled amniotic sac, and a tiny yolk sac is providing nourishment for now. The outer layer of cells is starting to form the placenta, which will later supply oxygen and nutrients.",
      tr: "Artık embriyo olarak adlandırılan bebeğin rahim iç zarına yerleşti ve yaklaşık 2 mm uzunluğunda. Onu sıvı dolu amniyon kesesi koruyor; beslenmesini şimdilik minicik bir yolk kesesi sağlıyor. Dıştaki hücre tabakası, ileride oksijen ve besin taşıyacak olan plasentayı oluşturmaya başladı.",
    },
    body: {
      en: "Your period may be due around now, and a missed period is often the first sign. Some people notice tender breasts, tiredness, mild cramps or light spotting, while others feel nothing yet. If you have bleeding, or tummy pain that worries you, especially on one side, contact a doctor or midwife.",
      tr: "Adetinin gelmesi gereken zaman yaklaşıyor olabilir; adet gecikmesi çoğu zaman ilk işarettir. Bazı kişiler göğüslerde hassasiyet, yorgunluk, hafif kramp ya da hafif lekelenme fark eder, bazıları ise henüz hiçbir şey hissetmez. Kanaman olursa ya da özellikle tek taraflı, seni endişelendiren bir karın ağrın varsa bir doktora veya ebeye başvur.",
    },
    tips: {
      en: [
        "If you haven't already, start 400 mcg of folic acid daily now and continue until 12 weeks.",
        "Keep caffeine under 200 mg a day, which is about two mugs of instant coffee.",
        "If you take regular medicines, tell your doctor you're pregnant, and don't stop them without advice.",
      ],
      tr: [
        "Henüz başlamadıysan şimdi her gün 400 mcg folik asit almaya başla ve 12. haftaya kadar sürdür.",
        "Kafeini günde 200 mg'ın altında tut; bu yaklaşık iki kupa hazır kahveye denk gelir.",
        "Düzenli ilaç kullanıyorsan doktoruna gebe olduğunu söyle ve ilaçlarını danışmadan bırakma.",
      ],
    },
    todo: {
      en: [
        "Take a home pregnancy test if your period is late.",
        "Contact a doctor or midwife to start your pregnancy care.",
      ],
      tr: [
        "Adetin geciktiyse evde gebelik testi yap.",
        "Gebelik takibini başlatmak için bir doktor ya da ebeyle iletişime geç.",
      ],
    },
    sources: [
      { name: "NHS: Week 4 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/1st-trimester/week-4/" },
      { name: "Cleveland Clinic: Fetal development", url: "https://my.clevelandclinic.org/health/articles/7247-fetal-development-stages-of-growth" },
    ],
  },
  {
    week: 5,
    size: { emoji: "🌾", name: { en: "a sesame seed", tr: "susam tanesi" } },
    lengthCm: 0.3,
    weightG: null,
    baby: {
      en: "Your baby's neural tube, which will become the brain and spinal cord, is forming quickly. A simple heart is taking shape and may start to beat around now, though it's usually too early to see on a scan. Tiny blood vessels are appearing too, and some will become the umbilical cord.",
      tr: "Bebeğinin ileride beynini ve omuriliğini oluşturacak nöral tüpü hızla gelişiyor. Basit bir kalp şekilleniyor ve bu sıralarda atmaya başlayabilir; ancak ultrasonda görmek için genellikle henüz erken. Minicik kan damarları da oluşuyor; bunların bir kısmı göbek kordonuna dönüşecek.",
    },
    body: {
      en: "Many people find out they're pregnant around now. Rising hormones can make you feel tired or queasy, need to pee more often or notice sore breasts. It's normal to feel a mix of excitement and worry, so talk to someone you trust if it feels like a lot.",
      tr: "Birçok kişi gebe olduğunu bu sıralarda öğrenir. Yükselen hormonlar nedeniyle yorgun hissedebilir, midende hafif bulantı olabilir, daha sık tuvalete gidebilir ya da göğüslerinde hassasiyet fark edebilirsin. Heyecan ve endişenin bir arada olması çok normal; içinden geçenler ağır geliyorsa güvendiğin biriyle konuş.",
    },
    tips: {
      en: [
        "Keep taking 400 mcg of folic acid daily to support your baby's developing nervous system.",
        "Avoid alcohol and smoking; if you'd like support to stop, your doctor or midwife can help.",
        "Rest when you can; early tiredness is real and often eases after the first trimester.",
      ],
      tr: [
        "Bebeğinin gelişen sinir sistemini desteklemek için her gün 400 mcg folik asit almaya devam et.",
        "Alkol ve sigaradan uzak dur; bırakmak için desteğe ihtiyacın olursa doktorun ya da eben yardımcı olabilir.",
        "Fırsat buldukça dinlen; erken dönem yorgunluğu gerçektir ve çoğu zaman ilk üç aydan sonra hafifler.",
      ],
    },
    todo: {
      en: ["List any medicines and supplements you take, to discuss at your first appointment."],
      tr: ["İlk randevunda konuşmak üzere kullandığın ilaç ve takviyelerin listesini çıkar."],
    },
    sources: [
      { name: "NHS: Week 5 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/1st-trimester/week-5/" },
      { name: "Mayo Clinic: Fetal development, the first trimester", url: "https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-care/art-20045302" },
    ],
  },
  {
    week: 6,
    size: { emoji: "🫛", name: { en: "a sweet pea", tr: "bezelye tanesi" } },
    lengthCm: 0.6,
    weightG: null,
    baby: {
      en: "Your baby is about 6 mm long, with a curved shape and a small tail that will later disappear. Buds that will become arms and legs are appearing, and there are tiny dents where the ears will be. A flickering heartbeat can sometimes be seen on an early vaginal ultrasound.",
      tr: "Bebeğin yaklaşık 6 mm uzunluğunda; kıvrık bir duruşu ve ileride kaybolacak küçük bir kuyruğu var. Kol ve bacak olacak tomurcuklar beliriyor, kulakların oluşacağı yerlerde de minik çukurlar var. Erken dönemde yapılan vajinal ultrasonda bazen titreşen bir kalp atışı görülebilir.",
    },
    body: {
      en: "Nausea often starts around now and can strike at any time of day, not just the morning. Eating small amounts often, resting and sipping fluids can help, and some people find ginger useful. If you can't keep food or drink down, contact your doctor or midwife, as safe treatments are available.",
      tr: "Bulantı genellikle bu sıralarda başlar ve yalnızca sabahları değil, günün her saatinde ortaya çıkabilir. Az az ve sık yemek, dinlenmek ve yudum yudum sıvı almak işe yarayabilir; bazı kişiler zencefili de faydalı bulur. Yiyecek ya da içecekleri midende tutamıyorsan doktoruna veya ebene başvur; güvenli tedavi seçenekleri var.",
    },
    tips: {
      en: [
        "Keep plain crackers by your bed and nibble a few before getting up if mornings feel queasy.",
        "Try ginger tea or ginger biscuits; many people find ginger settles nausea.",
        "Sip water through the day; small, frequent drinks are easier when you feel sick.",
      ],
      tr: [
        "Sabahları miden bulanıyorsa yatağının yanında sade kraker bulundur ve kalkmadan önce birkaç tane ye.",
        "Zencefil çayı ya da zencefilli bisküvi dene; birçok kişi zencefilin bulantıya iyi geldiğini söyler.",
        "Gün boyunca su iç; miden bulanırken küçük ve sık yudumlar daha kolay gelir.",
      ],
    },
    todo: {
      en: ["Book your first pregnancy (booking) appointment; it usually takes place between 8 and 12 weeks."],
      tr: ["İlk gebelik randevunu al; bu randevu genellikle 8. ile 12. haftalar arasında yapılır."],
    },
    sources: [
      { name: "NHS: Week 6 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/1st-trimester/week-6/" },
      { name: "ACOG: Morning sickness", url: "https://www.acog.org/womens-health/faqs/morning-sickness-nausea-and-vomiting-of-pregnancy" },
    ],
  },
  {
    week: 7,
    size: { emoji: "🫐", name: { en: "a blueberry", tr: "yaban mersini" } },
    lengthCm: 1.0,
    weightG: null,
    baby: {
      en: "Your baby is now about 1 cm long from head to bottom. The brain is growing fast, so the head looks large compared with the body, and small dimples mark where the nose and ears will form. The arm buds are lengthening, and their flattened ends will soon become hands.",
      tr: "Bebeğin artık baştan popoya yaklaşık 1 cm uzunluğunda. Beyni hızla büyüdüğü için başı vücuduna göre iri görünüyor; burnun ve kulakların oluşacağı yerlerde küçük çukurlar var. Kol tomurcukları uzuyor ve yassı uçları yakında ellere dönüşecek.",
    },
    body: {
      en: "Your blood volume is rising to support the pregnancy, which can make you thirstier than usual. Tiredness, nausea and mood swings can make this a demanding week, and that's very common. Your womb is growing too, though most people won't look pregnant for several more weeks.",
      tr: "Gebeliği desteklemek için kan hacmin artıyor; bu da her zamankinden daha çok susamana yol açabilir. Yorgunluk, bulantı ve duygu dalgalanmaları bu haftayı yorucu kılabilir; bu çok yaygın bir durum. Rahmin de büyüyor ama çoğu kişide karın birkaç hafta daha belirgin olmaz.",
    },
    tips: {
      en: [
        "Aim for about 8 glasses of fluid a day; water, milk and fruit teas all count.",
        "Eat little and often to keep nausea in check; an empty stomach can make it worse.",
        "When you share your news is entirely up to you.",
      ],
      tr: [
        "Günde yaklaşık 8 bardak sıvı almaya çalış; su, süt ve meyve çayları da sayılır.",
        "Bulantıyı kontrol altında tutmak için az az ve sık ye; aç karnına bulantı artabilir.",
        "Haberini ne zaman paylaşacağın tamamen sana kalmış.",
      ],
    },
    todo: {
      en: ["Ask which screening tests you'll be offered in the first trimester, so you have time to think about them."],
      tr: ["İlk üç ayda sana hangi tarama testlerinin önerileceğini sor; böylece düşünmek için zamanın olur."],
    },
    sources: [
      { name: "NHS: Week 7 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/1st-trimester/week-7/" },
      { name: "Mayo Clinic: Fetal development, the first trimester", url: "https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/prenatal-care/art-20045302" },
    ],
  },
  {
    week: 8,
    size: { emoji: "🫘", name: { en: "a kidney bean", tr: "fasulye tanesi" } },
    lengthCm: 1.6,
    weightG: 1,
    baby: {
      en: "Your baby is about 1.6 cm long and growing very quickly. The arms and legs are getting longer, and fingers are beginning to form. The placenta is developing tiny branches that help it attach firmly to the wall of your womb.",
      tr: "Bebeğin yaklaşık 1,6 cm uzunluğunda ve çok hızlı büyüyor. Kolları ve bacakları uzuyor, parmakları oluşmaya başlıyor. Plasenta, rahim duvarına sıkıca tutunmasını sağlayan minicik dallar geliştiriyor.",
    },
    body: {
      en: "You may feel bloated and notice your breasts feel fuller or tender. As your womb grows it presses on your bladder, so needing to pee more often is common. Feeling low or anxious at times is normal too, and your midwife or doctor is there to talk things through.",
      tr: "Şişkinlik hissedebilir, göğüslerinin dolgunlaştığını ya da hassaslaştığını fark edebilirsin. Büyüyen rahmin mesanene baskı yaptığı için daha sık tuvalete gitmek yaygındır. Zaman zaman kendini hüzünlü ya da kaygılı hissetmek de normal; eben ya da doktorun bunları konuşmak için yanında.",
    },
    tips: {
      en: [
        "If bathroom trips wake you at night, drink more earlier in the day and a little less in the evening.",
        "Choose pasteurised milk and cheese, and cook meat until it's steaming hot with no pink.",
        "Avoid liver and supplements containing vitamin A (retinol), as too much can harm your baby.",
      ],
      tr: [
        "Gece tuvalete kalkmak uykunu bölüyorsa sıvıyı daha çok gün içinde, akşamları ise biraz daha az iç.",
        "Pastörize süt ve peynir seç; eti pembe kısmı kalmayana ve buharı tütene kadar iyice pişir.",
        "Ciğerden ve A vitamini (retinol) içeren takviyelerden kaçın; fazlası bebeğine zarar verebilir.",
      ],
    },
    todo: {
      en: ["Your first antenatal (booking) appointment usually happens between 8 and 12 weeks; check yours is booked."],
      tr: ["İlk gebelik kontrolün genellikle 8. ile 12. haftalar arasında yapılır; randevunun alındığından emin ol."],
    },
    sources: [
      { name: "NHS: Week 8 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/1st-trimester/week-8/" },
      { name: "NHS: Your antenatal care and appointments", url: "https://www.nhs.uk/pregnancy/your-pregnancy-care/your-antenatal-care-and-appointments/" },
    ],
  },
  {
    week: 9,
    size: { emoji: "🍒", name: { en: "a cherry", tr: "kiraz" } },
    lengthCm: 2.3,
    weightG: 2,
    baby: {
      en: "Your baby is now about 2.3 cm long, and the face is becoming more recognisable, with eyelids, a small mouth and a tongue with tiny taste buds. Hands and feet are developing, and all the major organs, including the heart, brain, lungs and kidneys, are growing. Bones are starting to form.",
      tr: "Bebeğin artık yaklaşık 2,3 cm uzunluğunda; göz kapakları, küçük bir ağzı ve minik tat tomurcuklarıyla bir dili olan yüzü giderek belirginleşiyor. Elleri ve ayakları gelişiyor; kalp, beyin, akciğerler ve böbrekler dahil tüm ana organları büyüyor. Kemikleri de oluşmaya başlıyor.",
    },
    body: {
      en: "Pregnancy hormones such as hCG are around their peak, which may be why nausea and tiredness can feel strongest now. Your breasts may be bigger and your waist a little thicker. For many people, symptoms start to ease over the coming weeks.",
      tr: "Gebelik hormonları, özellikle hCG, zirveye yakın; bulantı ve yorgunluğun şu sıralar en yoğun hissedilmesinin nedeni bu olabilir. Göğüslerin büyümüş, belin biraz kalınlaşmış olabilir. Birçok kişide belirtiler önümüzdeki haftalarda hafiflemeye başlar.",
    },
    tips: {
      en: [
        "Healthy snacks like hummus with carrot sticks or a boiled egg can keep your energy steady.",
        "Accept offers of help; it's okay to do less while your body works this hard.",
        "Wash fruit, vegetables and salad well, and wash your hands after handling raw meat.",
      ],
      tr: [
        "Havuç çubuklarıyla humus ya da haşlanmış yumurta gibi sağlıklı atıştırmalıklar enerjini dengede tutabilir.",
        "Yardım tekliflerini kabul et; vücudun bu kadar çalışırken daha az şey yapman sorun değil.",
        "Meyve, sebze ve yeşillikleri iyice yıka; çiğ etle temas ettikten sonra ellerini yıka.",
      ],
    },
    todo: { en: [], tr: [] },
    sources: [
      { name: "NHS: Week 9 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/1st-trimester/week-9/" },
      { name: "Cleveland Clinic: Fetal development", url: "https://my.clevelandclinic.org/health/articles/7247-fetal-development-stages-of-growth" },
    ],
  },
  {
    week: 10,
    size: { emoji: "🍓", name: { en: "a strawberry", tr: "çilek" } },
    lengthCm: 3.1,
    weightG: 4,
    baby: {
      en: "Your baby is about 3 cm long and has moved from the embryo stage to the fetal stage. Fingers and toes are no longer webbed, the elbows can bend, and tiny buds for future teeth sit in the jaw. Small jerky movements can be seen on a scan, though you won't feel them for a while yet.",
      tr: "Bebeğin yaklaşık 3 cm uzunluğunda ve embriyo döneminden fetüs dönemine geçti. Parmakları artık perdeli değil, dirsekleri bükülebiliyor ve çenesinde ileride çıkacak dişlerin minik tomurcukları var. Ultrasonda küçük, kesik kesik hareketleri görülebilir ama sen bunları bir süre daha hissetmeyeceksin.",
    },
    body: {
      en: "Bloating, wind and heartburn are common, because the hormone progesterone relaxes the muscles of your digestive system. Smaller meals, eating slowly and a short walk after eating may help. Your clothes may start to feel tighter around the waist, even before a bump shows.",
      tr: "Progesteron hormonu sindirim sistemindeki kasları gevşettiği için şişkinlik, gaz ve mide ekşimesi sık görülür. Daha küçük öğünler, yavaş yemek ve yemekten sonra kısa bir yürüyüş işe yarayabilir. Karnın henüz belirginleşmeden bile kıyafetlerin belden dar gelmeye başlayabilir.",
    },
    tips: {
      en: [
        "Try six small meals a day instead of three large ones, and avoid eating right before bed.",
        "If it feels comfortable, gentle walking or swimming counts towards about 150 active minutes a week.",
        "Write down questions as they come up, so they're ready for your next appointment.",
      ],
      tr: [
        "Üç büyük öğün yerine günde altı küçük öğün dene ve yatmadan hemen önce yemek yemekten kaçın.",
        "Rahat hissediyorsan hafif yürüyüş ya da yüzme, haftada yaklaşık 150 dakikalık aktivite hedefine sayılır.",
        "Aklına gelen soruları not al; böylece bir sonraki randevunda hazır olurlar.",
      ],
    },
    todo: {
      en: ["Ask about first-trimester screening: the combined test (usually 10 to 14 weeks) or NIPT, available from 10 weeks."],
      tr: ["İlk üç ay taramasını sor: kombine test (ikili tarama, genellikle 10–14. haftalar) ya da 10. haftadan itibaren yapılabilen NIPT."],
    },
    sources: [
      { name: "NHS: Week 10 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/1st-trimester/week-10/" },
      { name: "ACOG: Prenatal genetic screening tests", url: "https://www.acog.org/womens-health/faqs/prenatal-genetic-screening-tests" },
    ],
  },
  {
    week: 11,
    size: { emoji: "🌰", name: { en: "a chestnut", tr: "kestane" } },
    lengthCm: 4.1,
    weightG: 7,
    baby: {
      en: "Your baby is about 4 cm long. The head is still large for the body, but the body is catching up quickly. Fingers and toes have separated, tiny nails are starting to form, and your baby can open and close their hands, though you won't feel any movement yet.",
      tr: "Bebeğin yaklaşık 4 cm uzunluğunda. Başı vücuduna göre hâlâ büyük ama vücudu hızla yetişiyor. El ve ayak parmakları ayrıldı, minik tırnaklar oluşmaya başladı; bebeğin ellerini açıp kapatabiliyor ama sen henüz bir hareket hissetmeyeceksin.",
    },
    body: {
      en: "Your body is now pumping much more blood than before, which can make you feel warm or a little dizzy at times. As your womb grows, stretching muscles and ligaments may cause mild aches low in your tummy. If pain is severe or doesn't settle, or you have any bleeding, contact your doctor or midwife.",
      tr: "Vücudun artık eskisinden çok daha fazla kan pompalıyor; bu da zaman zaman sıcak basmasına ya da hafif baş dönmesine yol açabilir. Rahmin büyüdükçe esneyen kas ve bağlar karnının alt kısmında hafif sızılara neden olabilir. Ağrı şiddetliyse ya da geçmiyorsa veya herhangi bir kanaman olursa doktoruna ya da ebene başvur.",
    },
    tips: {
      en: [
        "Stand up slowly, and sit down if you feel faint; keep water and a snack handy.",
        "Ask someone else to empty the cat litter, or wear gloves and wash your hands afterwards.",
        "Up to 2 portions of oily fish a week is good for you; avoid shark, swordfish and marlin.",
      ],
      tr: [
        "Yavaşça ayağa kalk, baygınlık hissedersen otur; yanında su ve bir atıştırmalık bulundur.",
        "Kedi kumunu başkasının temizlemesini iste ya da eldiven giy ve ardından ellerini yıka.",
        "Haftada en fazla 2 porsiyon yağlı balık sana iyi gelir; köpek balığı, kılıç balığı ve marlinden kaçın.",
      ],
    },
    todo: { en: [], tr: [] },
    sources: [
      { name: "NHS: Week 11 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/1st-trimester/week-11/" },
      { name: "Cleveland Clinic: Fetal development", url: "https://my.clevelandclinic.org/health/articles/7247-fetal-development-stages-of-growth" },
    ],
  },
  {
    week: 12,
    size: { emoji: "🥝", name: { en: "a kiwi", tr: "kivi" } },
    lengthCm: 5.4,
    weightG: 14,
    baby: {
      en: "Your baby is about 5.4 cm long and weighs around 14 g. All the major organs, muscles and limbs are in place and will keep growing and maturing. Fingernails are forming, and the heartbeat can be picked up on an ultrasound scan.",
      tr: "Bebeğin yaklaşık 5,4 cm uzunluğunda ve 14 g civarında. Tüm ana organları, kasları ve uzuvları yerinde; büyümeye ve olgunlaşmaya devam edecekler. Tırnakları oluşuyor ve kalp atışı ultrasonda görülebiliyor.",
    },
    body: {
      en: "Many people start to feel a little better around now as nausea and tiredness ease, though for some it takes a few more weeks. Your waist may be thickening, and you may feel hungrier. There's no need to eat for two; a varied, balanced diet is what matters.",
      tr: "Bulantı ve yorgunluk hafifledikçe birçok kişi bu sıralarda kendini biraz daha iyi hissetmeye başlar; bazıları için bu birkaç hafta daha sürebilir. Belin kalınlaşıyor olabilir ve daha sık acıkabilirsin. İki kişilik yemene gerek yok; önemli olan çeşitli ve dengeli beslenmek.",
    },
    tips: {
      en: [
        "Folic acid matters most until 12 weeks; ask whether to continue a pregnancy multivitamin after that.",
        "Ask about vitamin D; many people are advised to take a daily supplement during pregnancy.",
        "Start pelvic floor exercises: squeeze and lift, hold for a few seconds, then relax. Repeat daily.",
      ],
      tr: [
        "Folik asit en çok 12. haftaya kadar önemlidir; sonrasında gebelik multivitaminine devam edip etmeyeceğini sor.",
        "D vitaminini sor; gebelikte birçok kişiye her gün takviye alması önerilir.",
        "Pelvik taban egzersizine başla: kasları sık ve yukarı çek, birkaç saniye tut, sonra gevşet. Her gün tekrarla.",
      ],
    },
    todo: {
      en: [
        "Your dating scan (usually 10 to 14 weeks) checks your baby's development and confirms your due date.",
        "Start thinking about where you'd like to give birth; you can always change your mind later.",
      ],
      tr: [
        "Tarihlendirme ultrasonun (genellikle 10–14. haftalar) bebeğinin gelişimini kontrol eder ve tahmini doğum tarihini netleştirir.",
        "Nerede doğum yapmak istediğini düşünmeye başla; fikrini daha sonra her zaman değiştirebilirsin.",
      ],
    },
    sources: [
      { name: "NHS: Week 12 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/1st-trimester/week-12/" },
      { name: "NHS: 12-week scan", url: "https://www.nhs.uk/pregnancy/your-pregnancy-care/12-week-scan/" },
    ],
  },
  {
    week: 13,
    size: { emoji: "🍑", name: { en: "a peach", tr: "şeftali" } },
    lengthCm: 7.4,
    weightG: 23,
    baby: {
      en: "Your baby is about 7.4 cm long, and the body is starting to grow faster than the head. Vocal cords are forming, and bones are beginning to harden, starting with the skull and the long bones of the arms and legs. Your baby moves around a lot, and some babies already suck their thumbs.",
      tr: "Bebeğin yaklaşık 7,4 cm uzunluğunda ve vücudu artık başından daha hızlı büyümeye başladı. Ses telleri oluşuyor; kemikleri de kafatasından ve kol ile bacaklardaki uzun kemiklerden başlayarak sertleşiyor. Bebeğin bolca hareket ediyor; hatta bazı bebekler şimdiden parmağını emiyor.",
    },
    body: {
      en: "You're nearing the end of the first trimester, and many people notice more energy now. As your womb rises out of your pelvis, a small bump may appear and the urge to pee often may ease. Swollen or bleeding gums are common in pregnancy, so keep brushing gently twice a day.",
      tr: "İlk üç ayın sonuna yaklaşıyorsun ve birçok kişi bu dönemde daha enerjik hissetmeye başlar. Rahmin leğen kemiğinden yukarı yükseldikçe küçük bir karın belirebilir ve sık tuvalete gitme isteği azalabilir. Gebelikte diş etlerinin şişmesi ya da kanaması sık görülür; dişlerini günde iki kez nazikçe fırçalamaya devam et.",
    },
    tips: {
      en: [
        "Use a soft toothbrush, and see a dentist for a check-up; let them know you're pregnant.",
        "If you're sick, rinse your mouth with plain water to protect your teeth.",
        "Avoid anyone with chickenpox or rubella, and tell your midwife or doctor if you've been exposed.",
      ],
      tr: [
        "Yumuşak bir diş fırçası kullan ve diş hekimine kontrole git; gebe olduğunu söylemeyi unutma.",
        "Kustuğunda dişlerini korumak için ağzını sade suyla çalkala.",
        "Su çiçeği ya da kızamıkçık geçiren biriyle temastan kaçın; temas olursa ebene ya da doktoruna haber ver.",
      ],
    },
    todo: { en: [], tr: [] },
    sources: [
      { name: "NHS: Week 13 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-13/" },
      { name: "Mayo Clinic: Fetal development, the 2nd trimester", url: "https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/fetal-development/art-20046151" },
    ],
  },
  {
    week: 14,
    size: { emoji: "🍋", name: { en: "a lemon", tr: "limon" } },
    lengthCm: 8.5,
    weightG: 43,
    baby: {
      en: "Welcome to the second trimester. Your baby is about 8.5 cm long, and the head is becoming rounder and more in proportion with the body. Your baby swallows small amounts of amniotic fluid, and the kidneys pass it back out as urine, which is good practice for later.",
      tr: "İkinci üç aya hoş geldin. Bebeğin yaklaşık 8,5 cm uzunluğunda; başı yuvarlaklaşıyor ve vücuduyla daha orantılı hale geliyor. Bebeğin az miktarda amniyon sıvısı yutuyor, böbrekleri de bu sıvıyı idrar olarak geri çıkarıyor; bu, ileride işine yarayacak güzel bir alıştırma.",
    },
    body: {
      en: "Many people feel more energetic in the second trimester, and your appetite may return. Your baby doesn't need extra calories yet, so healthy snacks are a good way to handle hunger between meals. You might notice yellowish marks in your bra; this is usually colostrum, the first milk.",
      tr: "İkinci üç ayda birçok kişi kendini daha enerjik hisseder ve iştahın geri gelebilir. Bebeğinin henüz ekstra kaloriye ihtiyacı yok; öğün aralarındaki açlık için sağlıklı atıştırmalıklar iyi bir seçenek. Sütyeninde sarımsı lekeler fark edebilirsin; bu genellikle ilk süt olan kolostrumdur (ağız sütü).",
    },
    tips: {
      en: [
        "Reach for yoghurt, fruit or a handful of unsalted nuts when hunger strikes between meals.",
        "Stay active in ways you enjoy, and stop if you feel too hot, dizzy or unwell.",
        "If worries are weighing on you, talking to your partner, a friend or your midwife can help.",
      ],
      tr: [
        "Öğün aralarında acıktığında yoğurt, meyve ya da bir avuç tuzsuz kuruyemişe uzan.",
        "Sevdiğin şekillerde aktif kal; aşırı ısınırsan, başın dönerse ya da kendini kötü hissedersen dur.",
        "Endişeler seni yoruyorsa partnerinle, bir arkadaşınla ya da ebenle konuşmak iyi gelebilir.",
      ],
    },
    todo: {
      en: ["Missed first-trimester screening? Ask about the second-trimester blood test, usually done around 15 to 20 weeks."],
      tr: ["İlk üç ay taramasını kaçırdıysan, genellikle 15–20. haftalarda yapılan ikinci üç ay kan testini (üçlü/dörtlü tarama) sor."],
    },
    sources: [
      { name: "NHS: Week 14 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-14/" },
      { name: "ACOG: Prenatal genetic screening tests", url: "https://www.acog.org/womens-health/faqs/prenatal-genetic-screening-tests" },
    ],
  },
  {
    week: 15,
    size: { emoji: "🍎", name: { en: "an apple", tr: "elma" } },
    lengthCm: 10.1,
    weightG: 70,
    baby: {
      en: "Your baby is about 10 cm long and is growing a fine, soft layer of hair called lanugo. Eyebrows and eyelashes are starting to develop, and the eyes are sensitive to light even though the eyelids are closed. Around now, your baby may begin to hear sounds such as your heartbeat.",
      tr: "Bebeğin yaklaşık 10 cm uzunluğunda ve lanugo adı verilen ince, yumuşak bir tüy tabakası geliştiriyor. Kaşları ve kirpikleri oluşmaya başladı; göz kapakları kapalı olsa da gözleri ışığa duyarlı. Bu sıralarda bebeğin kalp atışın gibi sesleri duymaya başlayabilir.",
    },
    body: {
      en: "As your bump grows, you might feel sharp, brief twinges on the sides of your tummy, known as round ligament pain; resting usually helps. More vaginal discharge is common too. See your doctor or midwife if it changes colour, smells unpleasant, or you feel itchy or sore.",
      tr: "Karnın büyüdükçe karnının yanlarında yuvarlak bağ ağrısı denen kısa ve keskin sızılar hissedebilirsin; dinlenmek genellikle iyi gelir. Vajinal akıntının artması da yaygındır. Akıntının rengi değişirse, kötü kokarsa ya da kaşıntı veya yanma hissedersen doktoruna ya da ebene görün.",
    },
    tips: {
      en: [
        "Loose cotton clothing and an unperfumed moisturiser can soothe itchy, stretching skin.",
        "Move slowly when you change position to ease round ligament twinges.",
        "Don't hesitate to ask for a seat on public transport; your balance is changing.",
      ],
      tr: [
        "Bol pamuklu kıyafetler ve parfümsüz bir nemlendirici, gerilip kaşınan cildini rahatlatabilir.",
        "Yuvarlak bağ sızılarını hafifletmek için pozisyon değiştirirken yavaş hareket et.",
        "Toplu taşımada oturacak yer istemekten çekinme; dengen değişiyor.",
      ],
    },
    todo: { en: [], tr: [] },
    sources: [
      { name: "NHS: Week 15 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-15/" },
      { name: "ACOG: How your fetus grows during pregnancy", url: "https://www.acog.org/womens-health/faqs/how-your-fetus-grows-during-pregnancy" },
    ],
  },
  {
    week: 16,
    size: { emoji: "🥑", name: { en: "an avocado", tr: "avokado" } },
    lengthCm: 11.6,
    weightG: 100,
    baby: {
      en: "Your baby is about 11.6 cm long and weighs around 100 g. The nervous system is developing fast, so the arms and legs move more, and your baby can make fists. Facial expressions come and go too, though they're random for now while muscle control develops.",
      tr: "Bebeğin yaklaşık 11,6 cm uzunluğunda ve 100 g civarında. Sinir sistemi hızla geliştiği için kollarını ve bacaklarını daha çok hareket ettiriyor ve yumruk yapabiliyor. Yüz ifadeleri de belirip kayboluyor; ancak kas kontrolü gelişene kadar bunlar şimdilik rastgele.",
    },
    body: {
      en: "You may have an antenatal check around now, including your blood pressure and a urine test. Constipation is common, and fibre, fluids and gentle exercise can help. Some people feel the first flutters of movement between 16 and 24 weeks, often later in a first pregnancy.",
      tr: "Bu sıralarda tansiyonunun ölçüldüğü ve idrar testi yapıldığı bir kontrolün olabilir. Kabızlık sık görülür; lifli besinler, bol sıvı ve hafif egzersiz yardımcı olabilir. Bazı kişiler ilk kıpırtıları 16. ile 24. haftalar arasında hisseder; ilk gebelikte bu genellikle daha geç olur.",
    },
    tips: {
      en: [
        "Fill up on fibre: wholegrains, fruit, vegetables, beans and lentils help keep things moving.",
        "Test your home carbon monoxide alarm; it protects you and your baby.",
        "Sex is safe in pregnancy unless your doctor or midwife has advised otherwise.",
      ],
      tr: [
        "Lifli beslen: tam tahıllar, meyve, sebze, fasulye ve mercimek bağırsaklarının düzenli çalışmasına yardım eder.",
        "Evindeki karbonmonoksit dedektörünü test et; seni ve bebeğini korur.",
        "Doktorun ya da eben aksini söylemediyse gebelikte cinsel ilişki güvenlidir.",
      ],
    },
    todo: {
      en: ["Ask about the whooping cough (pertussis) vaccine — usually given between 16 and 32 weeks in the UK or 27–36 weeks in the US."],
      tr: ["Boğmaca (pertussis) aşısını sor; genellikle İngiltere'de 16–32., ABD'de 27–36. haftalar arasında yapılır."],
    },
    sources: [
      { name: "NHS: Week 16 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-16/" },
      { name: "NHS: Whooping cough vaccination in pregnancy", url: "https://www.nhs.uk/pregnancy/keeping-well/whooping-cough-vaccination/" },
    ],
  },
  {
    week: 17,
    size: { emoji: "🍐", name: { en: "a pear", tr: "armut" } },
    lengthCm: 13.0,
    weightG: 140,
    baby: {
      en: "Your baby is about 13 cm long and is starting to lay down a little fat under the skin. Fingernails are growing, and the ridges that will become unique fingerprints are forming. Your baby can move their eyes and may react to loud noises.",
      tr: "Bebeğin yaklaşık 13 cm uzunluğunda ve derisinin altında biraz yağ depolamaya başlıyor. Tırnakları uzuyor ve ona özgü parmak izlerini oluşturacak çizgiler şekilleniyor. Bebeğin gözlerini hareket ettirebiliyor ve yüksek seslere tepki verebilir.",
    },
    body: {
      en: "Your waist is gradually disappearing as your womb moves up and out, so you may look more obviously pregnant. Stretch marks may appear on your tummy, breasts or thighs; they're very common and usually fade after the birth. Hormones can make small worries feel bigger, so share how you're feeling.",
      tr: "Rahmin yukarı ve öne doğru büyüdükçe belin yavaş yavaş kayboluyor ve gebeliğin daha belirgin görünebilir. Karnında, göğüslerinde ya da uyluklarında çatlaklar belirebilir; bunlar çok yaygındır ve genellikle doğumdan sonra solar. Hormonlar küçük endişeleri büyütebilir; nasıl hissettiğini paylaş.",
    },
    tips: {
      en: [
        "Moisturising won't prevent stretch marks, but it can ease dry, itchy skin.",
        "Start comparing where you'd like to give birth: hospital, birth centre or home, where available.",
        "Wear a supportive, comfortable bra; your breasts may have gone up a size.",
      ],
      tr: [
        "Nemlendirmek çatlakları önlemez ama kuru ve kaşınan cildini rahatlatabilir.",
        "Nerede doğum yapmak istediğini karşılaştırmaya başla: hastane, doğum merkezi ya da imkân varsa ev.",
        "Destekleyici ve rahat bir sütyen giy; göğüslerin bir beden büyümüş olabilir.",
      ],
    },
    todo: {
      en: ["If you work, look into your maternity leave rights and when you need to tell your employer."],
      tr: ["Çalışıyorsan doğum izni haklarını ve işverenine ne zaman haber vermen gerektiğini araştır."],
    },
    sources: [
      { name: "NHS: Week 17 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-17/" },
      { name: "Cleveland Clinic: Fetal development", url: "https://my.clevelandclinic.org/health/articles/7247-fetal-development-stages-of-growth" },
    ],
  },
  {
    week: 18,
    size: { emoji: "🫑", name: { en: "a bell pepper", tr: "dolmalık biber" } },
    lengthCm: 14.2,
    weightG: 190,
    baby: {
      en: "Your baby is about 14 cm long and very active, wriggling and moving their arms and legs. Hearing is developing, along with reflexes such as swallowing and sucking. Your baby may have periods of sleep and wakefulness, and loud noises might wake them.",
      tr: "Bebeğin yaklaşık 14 cm uzunluğunda ve çok hareketli; kıpırdanıyor, kollarını ve bacaklarını oynatıyor. İşitmesi, yutma ve emme refleksleriyle birlikte gelişiyor. Bebeğinin uyku ve uyanıklık dönemleri olabilir; yüksek sesler onu uyandırabilir.",
    },
    body: {
      en: "You might feel your baby move for the first time, often as fluttering or bubbling that's easy to mistake for wind. Your blood pressure may be a little lower than usual, so get up slowly if you feel dizzy. A dark line down your tummy, called the linea nigra, is normal and usually fades after the birth.",
      tr: "Bebeğinin hareketlerini ilk kez hissedebilirsin; bunlar genellikle gazla karıştırılması kolay kıpırtılar ya da baloncuklar gibidir. Tansiyonun normalden biraz düşük olabilir; başın dönerse yavaşça kalk. Karnının ortasında linea nigra denen koyu bir çizgi belirmesi normaldir ve genellikle doğumdan sonra solar.",
    },
    tips: {
      en: [
        "Get out of bed by rolling onto your side first, then pushing up with your arms.",
        "If you'd rather not know your baby's sex at the scan, tell the sonographer before it starts.",
        "Sleep with a pillow between your knees if your hips or back ache at night.",
      ],
      tr: [
        "Yataktan kalkarken önce yan dön, sonra kollarınla kendini yukarı it.",
        "Ultrasonda bebeğinin cinsiyetini öğrenmek istemiyorsan, işlem başlamadan önce bunu söyle.",
        "Geceleri kalçan ya da belin ağrıyorsa dizlerinin arasına bir yastık koyarak uyu.",
      ],
    },
    todo: {
      en: ["Your detailed anomaly (anatomy) scan is usually done between about 18 and 22 weeks; check it's booked."],
      tr: ["Ayrıntılı ultrason (anomali taraması) genellikle 18. ile 22. haftalar arasında yapılır; randevunu kontrol et."],
    },
    sources: [
      { name: "NHS: Week 18 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-18/" },
      { name: "NHS: 20-week screening scan", url: "https://www.nhs.uk/pregnancy/your-pregnancy-care/20-week-scan/" },
    ],
  },
  {
    week: 19,
    size: { emoji: "🍅", name: { en: "a large tomato", tr: "iri bir domates" } },
    lengthCm: 15.3,
    weightG: 240,
    baby: {
      en: "Your baby is about 15 cm long and steadily putting on weight. A protective, waxy coating called vernix is starting to cover the skin. Behind the first set of tooth buds, the buds for adult teeth are beginning to form.",
      tr: "Bebeğin yaklaşık 15 cm uzunluğunda ve düzenli olarak kilo alıyor. Derisini verniks adı verilen koruyucu, mumsu bir tabaka kaplamaya başladı. İlk diş tomurcuklarının arkasında kalıcı dişlerin tomurcukları da oluşmaya başlıyor.",
    },
    body: {
      en: "The hormone relaxin is loosening your ligaments, so some activities, such as running, may start to feel uncomfortable. Sleep can be harder to come by, and aches in your back, hips or pelvis are common. If pelvic pain makes walking or turning over in bed difficult, mention it, as physiotherapy can help.",
      tr: "Relaksin hormonu bağlarını gevşetiyor; bu yüzden koşu gibi bazı aktiviteler rahatsız etmeye başlayabilir. Uyumak zorlaşabilir; sırt, kalça ya da leğen kemiği ağrıları sık görülür. Leğen ağrısı yürümeni ya da yatakta dönmeni zorlaştırıyorsa bunu söyle; fizyoterapi yardımcı olabilir.",
    },
    tips: {
      en: [
        "Swap high-impact exercise for swimming, walking or pregnancy yoga if your joints feel loose.",
        "Use pillows to support your bump and back; lying on your side with knees bent is often most comfortable.",
        "Wear flat, supportive shoes to help your balance and ease back strain.",
      ],
      tr: [
        "Eklemlerin gevşek hissediyorsa yüksek tempolu egzersiz yerine yüzme, yürüyüş ya da gebe yogası dene.",
        "Karnını ve sırtını yastıklarla destekle; dizler bükülü yan yatmak çoğu zaman en rahatıdır.",
        "Dengene yardımcı olması ve belini rahatlatması için düz tabanlı, destekleyici ayakkabılar giy.",
      ],
    },
    todo: { en: [], tr: [] },
    sources: [
      { name: "NHS: Week 19 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-19/" },
      { name: "NHS: Pelvic pain in pregnancy", url: "https://www.nhs.uk/pregnancy/common-symptoms/pelvic-pain/" },
    ],
  },
  {
    week: 20,
    size: { emoji: "🍌", name: { en: "a banana", tr: "muz" } },
    lengthCm: 25.6,
    weightG: 300,
    baby: {
      en: "You're halfway there. From now on, babies are usually measured from head to heel, and yours is about 25.6 cm long and weighs around 300 g. Your baby is covered in a creamy layer called vernix and may suck their thumb, which helps develop the sucking reflex.",
      tr: "Yolun yarısındasın. Bundan sonra bebekler genellikle baştan topuğa ölçülür; bebeğin yaklaşık 25,6 cm boyunda ve 300 g civarında. Derisi verniks denen kremsi bir tabakayla kaplı; parmağını emiyor olabilir, bu da emme refleksinin gelişmesine yardım eder.",
    },
    body: {
      en: "Your bump is growing steadily, and you may wake at night with sudden calf cramps; pulling your toes up towards you can ease them. Many people notice their baby's movements more clearly from around now. If your anomaly scan hasn't happened yet, it's likely to be around this time.",
      tr: "Karnın düzenli olarak büyüyor ve geceleri ani baldır kramplarıyla uyanabilirsin; ayak parmaklarını kendine doğru çekmek krampı hafifletebilir. Birçok kişi bu sıralarda bebeğinin hareketlerini daha net fark etmeye başlar. Ayrıntılı ultrasonun henüz yapılmadıysa muhtemelen bu dönemde olacak.",
    },
    tips: {
      en: [
        "Stretch your calves gently before bed and stay active during the day to help prevent cramps.",
        "Iron-rich foods like red meat, beans, lentils and leafy greens help keep your energy up.",
        "Talk or sing to your bump if you like; your baby is starting to hear sounds from outside.",
      ],
      tr: [
        "Krampları önlemek için yatmadan önce baldırlarını nazikçe esnet ve gün içinde aktif kal.",
        "Kırmızı et, fasulye, mercimek ve yeşil yapraklı sebzeler gibi demirden zengin besinler enerjini korur.",
        "İstersen karnınla konuş ya da ona şarkı söyle; bebeğin dışarıdaki sesleri duymaya başlıyor.",
      ],
    },
    todo: {
      en: [
        "If you work, ask your doctor or midwife for any pregnancy certificate you need for maternity leave or pay.",
        "Not had the whooping cough vaccine yet? In the UK it's often offered around now, so ask about it.",
      ],
      tr: [
        "Çalışıyorsan doğum izni ya da ödemeler için gereken gebelik raporunu veya belgeleri doktorundan ya da ebenden iste.",
        "Boğmaca aşısını henüz olmadın mı? İngiltere'de genellikle bu sıralarda öneriliyor; sormayı unutma.",
      ],
    },
    sources: [
      { name: "NHS: Week 20 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-20/" },
      { name: "NHS: 20-week screening scan", url: "https://www.nhs.uk/pregnancy/your-pregnancy-care/20-week-scan/" },
    ],
  },
  {
    week: 21,
    size: { emoji: "🥕", name: { en: "a carrot", tr: "havuç" } },
    lengthCm: 26.7,
    weightG: 360,
    baby: {
      en: "Your baby is about 26.7 cm long and now weighs more than the placenta. Movements are becoming stronger and more coordinated, and your baby is settling into patterns of sleeping and waking. Your baby can now hear noises and voices from outside the womb.",
      tr: "Bebeğin yaklaşık 26,7 cm boyunda ve artık plasentadan daha ağır. Hareketleri güçleniyor ve daha uyumlu hale geliyor; uyku ve uyanıklık düzenleri oluşuyor. Bebeğin artık rahim dışından gelen sesleri ve konuşmaları duyabiliyor.",
    },
    body: {
      en: "Your centre of gravity is shifting and your joints are looser, so you may feel a little unsteady. If you have a fall, try not to panic, as your baby is well protected, but do let your midwife or doctor know. You may also notice your baby is busiest just as you settle down to rest.",
      tr: "Ağırlık merkezin değişiyor ve eklemlerin gevşiyor; bu yüzden kendini biraz dengesiz hissedebilirsin. Düşersen paniğe kapılmamaya çalış, bebeğin iyi korunuyor; yine de ebene ya da doktoruna haber ver. Bebeğinin tam sen dinlenmeye çekildiğinde en hareketli olduğunu da fark edebilirsin.",
    },
    tips: {
      en: [
        "Aim for at least 5 portions of fruit and vegetables a day, choosing wholegrains where you can.",
        "Nap when you can to make up for disturbed nights.",
        "Hold handrails on stairs and take extra care on wet or icy ground.",
      ],
      tr: [
        "Günde en az 5 porsiyon meyve ve sebze yemeye çalış; mümkün olduğunda tam tahılları seç.",
        "Bölünen gecelerin açığını kapatmak için fırsat buldukça kestir.",
        "Merdivenlerde tırabzana tutun; ıslak ya da buzlu zeminde ekstra dikkatli ol.",
      ],
    },
    todo: { en: [], tr: [] },
    sources: [
      { name: "NHS: Week 21 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-21/" },
      { name: "Cleveland Clinic: Fetal development", url: "https://my.clevelandclinic.org/health/articles/7247-fetal-development-stages-of-growth" },
    ],
  },
  {
    week: 22,
    size: { emoji: "🍠", name: { en: "a sweet potato", tr: "tatlı patates" } },
    lengthCm: 27.8,
    weightG: 430,
    baby: {
      en: "Your baby is about 27.8 cm long. The lungs are developing, and your baby practises breathing movements and swallows small amounts of amniotic fluid. Taste buds are developing too, and your baby's grip is getting stronger.",
      tr: "Bebeğin yaklaşık 27,8 cm boyunda. Akciğerleri gelişiyor; bebeğin nefes alma hareketleriyle alıştırma yapıyor ve az miktarda amniyon sıvısı yutuyor. Tat tomurcukları da gelişiyor ve kavrama gücü artıyor.",
    },
    body: {
      en: "Stretch marks, an achy back and occasional tightening across your bump are all common now. Aches and pains are normal in pregnancy, but if you're unsure whether something is serious, check with your midwife or doctor. Call straight away if you have severe pain or any bleeding from the vagina.",
      tr: "Çatlaklar, bel ağrısı ve karnında ara sıra hissedilen sertleşme şu sıralar sık görülür. Gebelikte ağrı ve sızılar normaldir; ama bir şeyin ciddi olup olmadığından emin değilsen ebene ya da doktoruna danış. Şiddetli ağrın ya da vajinal kanaman olursa hemen ara.",
    },
    tips: {
      en: [
        "Sit with your back supported, and take breaks from standing to ease backache.",
        "Make a simple wellbeing plan: what helps you feel calm, and who you can call on tough days.",
        "If you smoke, it's never too late to stop, and support services can make it much easier.",
      ],
      tr: [
        "Bel ağrını hafifletmek için sırtın destekli otur ve uzun süre ayakta kalmaya ara ver.",
        "Basit bir iyi oluş planı yap: seni neyin sakinleştirdiğini ve zor günlerde kimi arayabileceğini yaz.",
        "Sigara içiyorsan bırakmak için asla geç değil; destek hizmetleri bunu çok kolaylaştırabilir.",
      ],
    },
    todo: {
      en: ["Look into antenatal (birth preparation) classes; many book up a few weeks ahead."],
      tr: ["Doğuma hazırlık sınıflarını (gebe okulu) araştır; birçoğunda birkaç hafta önceden yer ayırtmak gerekir."],
    },
    sources: [
      { name: "NHS: Week 22 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-22/" },
      { name: "ACOG: How your fetus grows during pregnancy", url: "https://www.acog.org/womens-health/faqs/how-your-fetus-grows-during-pregnancy" },
    ],
  },
  {
    week: 23,
    size: { emoji: "🥭", name: { en: "a large mango", tr: "iri bir mango" } },
    lengthCm: 28.9,
    weightG: 500,
    baby: {
      en: "Your baby is about 28.9 cm long, and the limbs are now in proportion with the body. They're practising breathing, settling into sleeping and waking patterns, and starting to gain fat more quickly. Over the coming weeks you may see your tummy move when your baby kicks.",
      tr: "Bebeğin yaklaşık 28,9 cm boyunda; kolları ve bacakları artık vücuduyla orantılı. Nefes alma alıştırması yapıyor, uyku ve uyanıklık düzenine oturuyor ve daha hızlı yağ depolamaya başlıyor. Önümüzdeki haftalarda bebeğin tekmeledikçe karnının hareket ettiğini görebilirsin.",
    },
    body: {
      en: "You may feel more breathless as your growing womb presses upwards, and your ribs may ache as your rib cage expands. Your breasts might leak a little colostrum. Start getting to know your baby's usual pattern of movements, and contact your midwife or maternity unit if it slows down or changes.",
      tr: "Büyüyen rahmin yukarıya baskı yaptıkça nefesin daha çabuk daralabilir, göğüs kafesin genişledikçe kaburgaların ağrıyabilir. Göğüslerinden biraz kolostrum sızabilir. Bebeğinin olağan hareket düzenini tanımaya başla; hareketler yavaşlar ya da değişirse ebeni veya doğumhaneyi ara.",
    },
    tips: {
      en: [
        "Swap some cups of tea or coffee for water or fruit tea to stay under 200 mg of caffeine a day.",
        "Your skin burns more easily in pregnancy, so use a high-factor sunscreen and seek shade at midday.",
        "Put your feet up and rest when you feel breathless.",
      ],
      tr: [
        "Kafeini günde 200 mg'ın altında tutmak için bazı çay ya da kahvelerini su veya meyve çayıyla değiştir.",
        "Gebelikte cildin daha kolay yanar; yüksek faktörlü güneş kremi kullan ve öğle saatlerinde gölgede kal.",
        "Nefesin daraldığında ayaklarını uzat ve dinlen.",
      ],
    },
    todo: { en: [], tr: [] },
    sources: [
      { name: "NHS: Week 23 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-23/" },
      { name: "NHS: Your baby's movements", url: "https://www.nhs.uk/pregnancy/keeping-well/your-babys-movements/" },
    ],
  },
  {
    week: 24,
    size: { emoji: "🌽", name: { en: "an ear of corn", tr: "mısır koçanı" } },
    lengthCm: 30.0,
    weightG: 600,
    baby: {
      en: "Your baby is about 30 cm long and weighs around 600 g. The lungs are formed but not yet ready to work on their own, and the skin is still thin and a little wrinkled while fat builds up underneath. Babies born from around now can be cared for in a neonatal unit, though every extra week in the womb makes a real difference.",
      tr: "Bebeğin yaklaşık 30 cm boyunda ve 600 g civarında. Akciğerleri oluştu ama henüz kendi başına çalışmaya hazır değil; derisi hâlâ ince ve biraz buruşuk, altında yağ birikiyor. Bu dönemden itibaren doğan bebekler yenidoğan yoğun bakım ünitesinde desteklenebilir; yine de rahimde geçen her ek hafta büyük fark yaratır.",
    },
    body: {
      en: "Aches around your ribs, back or bump are common as your ligaments loosen and your baby grows. From now on, get urgent advice if you have a severe headache, blurred vision or flashing lights, pain just below your ribs, or sudden swelling of your face, hands or feet. These can be signs of pre-eclampsia, which needs checking quickly.",
      tr: "Bağların gevşedikçe ve bebeğin büyüdükçe kaburgalarında, belinde ya da karnında ağrılar sık görülür. Bundan sonra şiddetli baş ağrısı, bulanık görme ya da gözünün önünde ışık çakmaları, kaburgalarının hemen altında ağrı veya yüzünde, ellerinde ya da ayaklarında ani şişlik olursa hemen tıbbi destek al. Bunlar hızla kontrol edilmesi gereken preeklampsinin belirtileri olabilir.",
    },
    tips: {
      en: [
        "Don't use a home doppler to check on your baby; if you're worried about movements, call your maternity unit.",
        "Save your maternity unit's phone number in your phone and keep a copy in your bag.",
        "It's a nice time to start thinking about what matters to you for the birth.",
      ],
      tr: [
        "Bebeğini kontrol etmek için evde doppler cihazı kullanma; hareketlerden endişelenirsen doğumhaneyi ara.",
        "Doğumhanenin telefon numarasını telefonuna kaydet, bir kopyasını da çantanda taşı.",
        "Doğumda senin için neyin önemli olduğunu düşünmeye başlamak için güzel bir zaman.",
      ],
    },
    todo: {
      en: ["A glucose test for gestational diabetes is often done between 24 and 28 weeks; ask if it's recommended for you."],
      tr: ["Gebelik diyabeti için şeker yükleme testi genellikle 24. ile 28. haftalar arasında yapılır; sana önerilip önerilmediğini sor."],
    },
    sources: [
      { name: "NHS: Week 24 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-24/" },
      { name: "NHS: Pre-eclampsia", url: "https://www.nhs.uk/conditions/pre-eclampsia/" },
    ],
  },
  {
    week: 25,
    size: { emoji: "🥒", name: { en: "a cucumber", tr: "salatalık" } },
    lengthCm: 34.6,
    weightG: 660,
    baby: {
      en: "Your baby is about 34.6 cm long and filling out as more fat is laid down, so the skin looks smoother. A loud noise might make your baby jump, and you may feel the occasional rhythmic jerk of hiccups. Your baby passes urine into the amniotic fluid, which helps keep it at the right level.",
      tr: "Bebeğin yaklaşık 34,6 cm boyunda ve yağ depoladıkça dolgunlaşıyor, derisi de daha pürüzsüz görünüyor. Yüksek bir ses bebeğini irkiltebilir; zaman zaman hıçkırığın ritmik sıçramalarını hissedebilirsin. Bebeğin amniyon sıvısına idrar yapıyor; bu da sıvının yeterli düzeyde kalmasına yardım ediyor.",
    },
    body: {
      en: "Mild swelling of your feet and ankles is common, especially in warm weather or at the end of the day. Mention any swelling to your midwife or doctor, and seek urgent advice if it comes on suddenly or affects your face or hands. Heartburn may also flare as your baby takes up more room.",
      tr: "Özellikle sıcak havalarda ya da gün sonunda ayaklarda ve ayak bileklerinde hafif şişlik sık görülür. Her türlü şişliği ebene ya da doktoruna söyle; şişlik aniden ortaya çıkarsa ya da yüzünü veya ellerini etkilerse hemen tıbbi destek al. Bebeğin daha fazla yer kapladıkça mide ekşimesi de artabilir.",
    },
    tips: {
      en: [
        "Put your feet up when you can, and avoid standing still for long periods.",
        "For heartburn, eat smaller meals, sit upright while eating and avoid lying down soon afterwards.",
        "If your partner plans to take leave around the birth, now is a good time for them to check their rights.",
      ],
      tr: [
        "Fırsat buldukça ayaklarını yukarı kaldır ve uzun süre hareketsiz ayakta durmaktan kaçın.",
        "Mide ekşimesi için küçük öğünler ye, yemek yerken dik otur ve yemekten hemen sonra uzanma.",
        "Partnerin doğum döneminde izin almayı planlıyorsa, haklarını kontrol etmesi için de güzel bir zaman.",
      ],
    },
    todo: {
      en: ["If you work, check you've told your employer in time for maternity leave and pay; deadlines vary by country."],
      tr: ["Çalışıyorsan doğum izni ve ödemeler için işverenine zamanında haber verdiğinden emin ol; süreler ülkeye göre değişir."],
    },
    sources: [
      { name: "NHS: Week 25 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-25/" },
      { name: "Cleveland Clinic: Fetal development", url: "https://my.clevelandclinic.org/health/articles/7247-fetal-development-stages-of-growth" },
    ],
  },
  {
    week: 26,
    size: { emoji: "🍇", name: { en: "a bunch of grapes", tr: "bir salkım üzüm" } },
    lengthCm: 35.6,
    weightG: 760,
    baby: {
      en: "Your baby is about 35.6 cm long, and around now the eyes open for the first time. The lungs are starting to make surfactant, a substance that will help them breathe after birth. Your baby is also making melanin, which gives colour to the skin and eyes.",
      tr: "Bebeğin yaklaşık 35,6 cm boyunda ve bu sıralarda gözlerini ilk kez açıyor. Akciğerleri, doğumdan sonra nefes almasına yardım edecek sürfaktan adlı maddeyi üretmeye başlıyor. Bebeğin ayrıca deriye ve gözlere rengini veren melanini de üretiyor.",
    },
    body: {
      en: "As you approach the third trimester, you may feel more tired, clumsy or forgetful, which is understandable with so much going on. Leg cramps may wake you at night. If you ever feel your baby's movements slow down or stop, contact your midwife or maternity unit straight away rather than waiting.",
      tr: "Üçüncü üç aya yaklaşırken daha yorgun, sakar ya da unutkan hissedebilirsin; bu kadar şey olurken bu çok anlaşılır. Bacak krampları geceleri seni uyandırabilir. Bebeğinin hareketlerinin yavaşladığını ya da durduğunu hissedersen beklemeden hemen ebeni veya doğumhaneyi ara.",
    },
    tips: {
      en: [
        "Give yourself extra time for everyday things; your body is doing a lot.",
        "Circle your feet and flex your ankles a few times a day to ease cramps and swelling.",
        "Lists and phone reminders can help with forgetfulness.",
      ],
      tr: [
        "Günlük işler için kendine ekstra zaman tanı; vücudun çok çalışıyor.",
        "Kramp ve şişliği hafifletmek için günde birkaç kez ayaklarını daire çizerek çevir ve bileklerini esnet.",
        "Listeler ve telefon hatırlatıcıları unutkanlığa iyi gelir.",
      ],
    },
    todo: { en: [], tr: [] },
    sources: [
      { name: "NHS: Week 26 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-26/" },
      { name: "Cleveland Clinic: Fetal development", url: "https://my.clevelandclinic.org/health/articles/7247-fetal-development-stages-of-growth" },
    ],
  },
  {
    week: 27,
    size: { emoji: "🥦", name: { en: "a head of broccoli", tr: "bir baş brokoli" } },
    lengthCm: 36.6,
    weightG: 875,
    baby: {
      en: "Your baby is about 36.6 cm long and getting plumper every day as fat fills out the skin. The lungs and nervous system keep maturing, and your baby can open their eyes and blink. This is the last week of the second trimester.",
      tr: "Bebeğin yaklaşık 36,6 cm boyunda ve yağ depoladıkça her gün biraz daha dolgunlaşıyor. Akciğerleri ve sinir sistemi olgunlaşmaya devam ediyor; gözlerini açıp kırpabiliyor. Bu, ikinci üç ayın son haftası.",
    },
    body: {
      en: "Bloating and constipation are common now, as your growing baby squeezes your stomach and progesterone slows digestion. Snoring may start too, because the lining of your nose can swell in pregnancy. Nap when you can if tiredness is catching up with you.",
      tr: "Büyüyen bebeğin mideni sıkıştırdığı ve progesteron sindirimini yavaşlattığı için şişkinlik ve kabızlık şu sıralar sık görülür. Gebelikte burnunun içi şişebildiği için horlamaya da başlayabilirsin. Yorgunluk birikiyorsa fırsat buldukça kestir.",
    },
    tips: {
      en: [
        "From 28 weeks, go to sleep on your side; if you wake up on your back, simply turn over.",
        "Planning to fly? Check your airline's rules, as many ask for a letter from your doctor or midwife later on.",
        "Choose wholegrain bread and pasta and drink plenty of water to help with constipation.",
      ],
      tr: [
        "28. haftadan itibaren yan yatarak uykuya dal; sırtüstü uyanırsan sadece yan dön.",
        "Uçmayı mı planlıyorsun? Havayolunun kurallarına bak; birçoğu ilerleyen haftalarda doktor raporu ister.",
        "Kabızlığa iyi gelmesi için tam buğday ekmeği ve makarna seç, bol su iç.",
      ],
    },
    todo: {
      en: ["If your blood group is Rh (D) negative, ask about anti-D; it's often offered around 28 weeks."],
      tr: ["Kan grubun Rh (D) negatifse anti-D iğnesini sor; genellikle 28. hafta civarında önerilir."],
    },
    sources: [
      { name: "NHS: Week 27 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/2nd-trimester/week-27/" },
      { name: "ACOG: The Rh factor and pregnancy", url: "https://www.acog.org/womens-health/faqs/the-rh-factor-how-it-can-affect-your-pregnancy" },
    ],
  },
  {
    week: 28,
    size: { emoji: "🍆", name: { en: "an aubergine", tr: "patlıcan" } },
    lengthCm: 37.6,
    weightG: 1000,
    baby: {
      en: "Welcome to the third trimester. Your baby is about 37.6 cm long and weighs around 1 kg. Their heart beats at about 140 beats a minute, still much faster than yours, and the eyelids can open and close.",
      tr: "Üçüncü üç aya hoş geldin. Bebeğin yaklaşık 37,6 cm boyunda ve 1 kg civarında. Kalbi dakikada yaklaşık 140 kez atıyor, yani hâlâ seninkinden çok daha hızlı; göz kapaklarını açıp kapatabiliyor.",
    },
    body: {
      en: "Over the coming weeks you may feel more tired and uncomfortable, with heartburn, backache or nosebleeds. Swelling in your ankles, feet or face is often due to water retention, but get it checked in case it's pre-eclampsia. Rest helps with many symptoms, and your midwife or doctor is there if anything worries you.",
      tr: "Önümüzdeki haftalarda mide ekşimesi, bel ağrısı ya da burun kanamasıyla birlikte daha yorgun ve rahatsız hissedebilirsin. Ayak bileklerindeki, ayaklarındaki ya da yüzündeki şişlik çoğu zaman sıvı tutulmasından kaynaklanır; yine de preeklampsi ihtimaline karşı kontrol ettir. Dinlenmek birçok belirtiye iyi gelir; seni endişelendiren bir şey olursa eben ya da doktorun yanında.",
    },
    tips: {
      en: [
        "Go to sleep on your side, including for naps; research shows it's safer for your baby.",
        "Wash your hands often, especially after contact with young children, to lower your risk of infections.",
        "For a nosebleed, sit up, lean forward and pinch just above your nostrils for 10 to 15 minutes.",
      ],
      tr: [
        "Kısa uykular dahil yan yatarak uykuya dal; araştırmalar bunun bebeğin için daha güvenli olduğunu gösteriyor.",
        "Enfeksiyon riskini azaltmak için ellerini sık sık, özellikle küçük çocuklarla temastan sonra yıka.",
        "Burnun kanarsa dik otur, öne eğil ve burun deliklerinin hemen üstünü 10–15 dakika sıkıca tut.",
      ],
    },
    todo: {
      en: [
        "Ask about the RSV vaccine: offered from 28 weeks in the UK, or at 32 to 36 weeks during RSV season in the US.",
        "If you're Rh (D) negative, you may be offered anti-D around now.",
      ],
      tr: [
        "RSV aşısını sor: İngiltere'de 28. haftadan itibaren, ABD'de ise RSV mevsiminde 32–36. haftalar arasında öneriliyor.",
        "Kan grubun Rh (D) negatifse bu sıralarda anti-D iğnesi önerilebilir.",
      ],
    },
    sources: [
      { name: "NHS: Week 28 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-28/" },
      { name: "NHS: RSV vaccine", url: "https://www.nhs.uk/vaccinations/rsv-vaccine/" },
    ],
  },
  {
    week: 29,
    size: { emoji: "🥥", name: { en: "a coconut", tr: "hindistan cevizi" } },
    lengthCm: 38.6,
    weightG: 1150,
    baby: {
      en: "Your baby is about 38.6 cm long and fully formed; the coming weeks are about maturing organs and gaining weight. The soft, downy hair called lanugo is starting to disappear. Kicks may feel more like pokes and jabs as space gets tighter.",
      tr: "Bebeğin yaklaşık 38,6 cm boyunda ve tüm yapıları oluştu; önümüzdeki haftalar organlarının olgunlaşması ve kilo almasıyla geçecek. Lanugo denen ince, yumuşak tüyler kaybolmaya başlıyor. Yer daraldıkça tekmeler daha çok dürtme ve itme gibi hissedilebilir.",
    },
    body: {
      en: "You may feel breathless as your baby pushes up against your lungs, and you might need the toilet more at night. Your baby has their own sleep and wake pattern, often busiest when you lie down. Get to know that pattern, and contact your midwife or maternity unit straight away if it changes or slows down.",
      tr: "Bebeğin akciğerlerine doğru ittikçe nefesin daralabilir, geceleri daha sık tuvalete gitmen gerekebilir. Bebeğinin kendine özgü bir uyku ve uyanıklık düzeni var; çoğu zaman sen uzandığında en hareketli olur. Bu düzeni tanı; değişir ya da yavaşlarsa hemen ebeni veya doğumhaneyi ara.",
    },
    tips: {
      en: [
        "Support your bump with a pillow and place another between your knees for more comfortable sleep.",
        "Start a birth plan: think about pain relief options and who you'd like as your birth partner.",
        "Calcium-rich foods like dairy or fortified alternatives support your baby's growing bones.",
      ],
      tr: [
        "Daha rahat uyumak için karnını bir yastıkla destekle, dizlerinin arasına da bir yastık koy.",
        "Doğum planına başla: ağrı kesici seçeneklerini ve doğumda yanında kimin olmasını istediğini düşün.",
        "Süt ürünleri ya da kalsiyumla zenginleştirilmiş alternatifler, bebeğinin gelişen kemiklerini destekler.",
      ],
    },
    todo: { en: [], tr: [] },
    sources: [
      { name: "NHS: Week 29 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-29/" },
      { name: "Mayo Clinic: Fetal development, the 3rd trimester", url: "https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/fetal-development/art-20045997" },
    ],
  },
  {
    week: 30,
    size: { emoji: "🥬", name: { en: "a cabbage", tr: "lahana" } },
    lengthCm: 39.9,
    weightG: 1320,
    baby: {
      en: "Your baby is about 39.9 cm long, and their eyes can now focus, though vision will keep developing after birth. The brain is growing quickly, and your baby is getting better at controlling their own body temperature. Fat continues to build up under the skin.",
      tr: "Bebeğin yaklaşık 39,9 cm boyunda ve gözleri artık odaklanabiliyor; görmesi doğumdan sonra da gelişmeye devam edecek. Beyni hızla büyüyor ve vücut ısısını kendi kendine düzenlemede giderek ustalaşıyor. Derisinin altında yağ birikmeye devam ediyor.",
    },
    body: {
      en: "Climbing stairs may leave you out of breath, and sleep can be patchy. Vivid or unsettling dreams are common, fuelled by hormones and the big changes ahead, and talking them through can help. If stress or low mood is building, let your midwife or doctor know.",
      tr: "Merdiven çıkmak seni nefes nefese bırakabilir, uykun da bölük pörçük olabilir. Hormonlar ve önündeki büyük değişiklikler nedeniyle canlı ya da huzursuz edici rüyalar görmek yaygın; bunları biriyle konuşmak iyi gelebilir. Stres ya da çökkünlük artıyorsa ebene veya doktoruna söyle.",
    },
    tips: {
      en: [
        "Read up on the stages of labour so you know what to expect; every birth is different.",
        "Gather a few newborn basics; babies outgrow first-size clothes quickly, so you don't need many.",
        "A short evening walk or gentle stretches can help you sleep better.",
      ],
      tr: [
        "Ne bekleyeceğini bilmek için doğumun evrelerini oku; her doğum farklıdır.",
        "Birkaç temel yenidoğan ihtiyacını hazırla; bebekler ilk bedenleri çabuk büyür, o yüzden çok fazlasına gerek yok.",
        "Akşamları kısa bir yürüyüş ya da hafif esneme hareketleri daha iyi uyumana yardım edebilir.",
      ],
    },
    todo: {
      en: ["Plan where your baby will sleep: a cot or Moses basket with a firm, flat, well-fitting mattress is safest."],
      tr: ["Bebeğinin nerede uyuyacağını planla: sert, düz ve tam oturan bir yatağı olan beşik en güvenlisidir."],
    },
    sources: [
      { name: "NHS: Week 30 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-30/" },
      { name: "Cleveland Clinic: Fetal development", url: "https://my.clevelandclinic.org/health/articles/7247-fetal-development-stages-of-growth" },
    ],
  },
  {
    week: 31,
    size: { emoji: "🍍", name: { en: "a pineapple", tr: "ananas" } },
    lengthCm: 41.1,
    weightG: 1500,
    baby: {
      en: "Your baby is about 41.1 cm long and very active, with somersaults, stretches and finger-sucking. Day by day they look plumper and less wrinkled. Your baby is starting to recognise voices from outside the womb, so loved ones can talk to the bump too.",
      tr: "Bebeğin yaklaşık 41,1 cm boyunda ve çok hareketli; takla atıyor, geriniyor ve parmağını emiyor. Gün geçtikçe daha dolgun ve daha az buruşuk görünüyor. Bebeğin rahim dışından gelen sesleri tanımaya başlıyor; sevdiklerin de karnınla konuşabilir.",
    },
    body: {
      en: "You may notice your bump tightening for 20 to 30 seconds and then relaxing. These are Braxton Hicks, or practice contractions, and they shouldn't hurt. If tightenings become painful or regular before 37 weeks, contact your midwife or maternity unit, as it could be early labour.",
      tr: "Karnının 20–30 saniye boyunca sertleşip sonra gevşediğini fark edebilirsin. Bunlar Braxton Hicks denen alıştırma kasılmalarıdır ve ağrı yapmamalıdır. 37. haftadan önce kasılmalar ağrılı ya da düzenli hale gelirse erken doğum başlangıcı olabileceği için ebeni veya doğumhaneyi ara.",
    },
    tips: {
      en: [
        "Think about how you'd like to feed your baby; your midwife can talk you through breast, bottle or both.",
        "If Braxton Hicks feel uncomfortable, try changing position or having a warm bath.",
        "Keep up gentle exercise if it feels good; swimming takes the weight off your joints.",
      ],
      tr: [
        "Bebeğini nasıl beslemek istediğini düşün; eben anne sütü, mama ya da ikisi hakkında seni bilgilendirebilir.",
        "Braxton Hicks kasılmaları rahatsız ediyorsa pozisyon değiştirmeyi ya da ılık bir banyo yapmayı dene.",
        "İyi geliyorsa hafif egzersize devam et; yüzme eklemlerindeki yükü azaltır.",
      ],
    },
    todo: { en: [], tr: [] },
    sources: [
      { name: "NHS: Week 31 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-31/" },
      { name: "ACOG: How to tell when labor begins", url: "https://www.acog.org/womens-health/faqs/how-to-tell-when-labor-begins" },
    ],
  },
  {
    week: 32,
    size: { emoji: "🍈", name: { en: "a small melon", tr: "küçük bir kavun" } },
    lengthCm: 42.4,
    weightG: 1700,
    baby: {
      en: "Your baby is about 42.4 cm long, fully formed, and now mainly putting on weight. Much of the fat gained over the next few weeks will help your baby stay warm after birth. Many babies have turned head down by now, but there's still time if yours hasn't.",
      tr: "Bebeğin yaklaşık 42,4 cm boyunda, tüm yapıları oluşmuş ve artık ağırlıklı olarak kilo alıyor. Önümüzdeki haftalarda kazanacağı yağın büyük kısmı, doğumdan sonra sıcak kalmasına yardım edecek. Birçok bebek bu sıralarda baş aşağı pozisyona döner; seninki henüz dönmediyse de hâlâ zaman var.",
    },
    body: {
      en: "Walking may feel more like a waddle as your body adjusts to the extra weight. Your baby has less room, but you should keep feeling movements in the same pattern right up until labour. If movements slow down, change or stop, contact your midwife or maternity unit immediately, day or night.",
      tr: "Vücudun artan ağırlığa uyum sağladıkça yürüyüşün paytaklaşabilir. Bebeğinin yeri daraldı ama doğuma kadar hareketlerini aynı düzende hissetmeye devam etmelisin. Hareketler yavaşlar, değişir ya da durursa gece gündüz demeden hemen ebeni veya doğumhaneyi ara.",
    },
    tips: {
      en: [
        "Avoid heavy lifting, and ask for extra breaks and a seat at work if you need them.",
        "Read about vitamin K for newborns, so you can decide in advance how you'd like it given.",
        "Rest with your feet up for a while each day.",
      ],
      tr: [
        "Ağır kaldırmaktan kaçın; gerekirse iş yerinde ekstra mola ve oturacak yer iste.",
        "Yenidoğanlara yapılan K vitamini hakkında bilgi edin; nasıl uygulanmasını istediğine önceden karar verebilirsin.",
        "Her gün bir süre ayaklarını yukarı kaldırarak dinlen.",
      ],
    },
    todo: {
      en: [
        "Write your birth plan and share it with your midwife or doctor; you can change it at any time.",
        "If you haven't had the whooping cough vaccine yet, ask about it now.",
      ],
      tr: [
        "Doğum planını yaz ve eben ya da doktorunla paylaş; istediğin zaman değiştirebilirsin.",
        "Boğmaca aşısını henüz olmadıysan şimdi sor.",
      ],
    },
    sources: [
      { name: "NHS: Week 32 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-32/" },
      { name: "NHS: Your baby's movements", url: "https://www.nhs.uk/pregnancy/keeping-well/your-babys-movements/" },
    ],
  },
  {
    week: 33,
    size: { emoji: "🥬", name: { en: "a romaine lettuce", tr: "bir marul" } },
    lengthCm: 43.7,
    weightG: 1920,
    baby: {
      en: "Your baby is about 43.7 cm long, and the brain and nervous system are well developed. The bones are hardening, except for the skull, which stays soft and flexible to help your baby through birth. Your baby's pupils can now change size in response to light.",
      tr: "Bebeğin yaklaşık 43,7 cm boyunda; beyni ve sinir sistemi iyice gelişti. Kemikleri sertleşiyor; yalnızca kafatası, doğumda kolaylık sağlamak için yumuşak ve esnek kalıyor. Bebeğinin göz bebekleri artık ışığa göre küçülüp büyüyebiliyor.",
    },
    body: {
      en: "Feeling heavy and tired is very understandable now. Braxton Hicks may become more frequent as your womb gets ready for birth. A heavy feeling low in your pelvis can be a sign your baby is settling head down.",
      tr: "Şu sıralar kendini ağır ve yorgun hissetmen çok anlaşılır. Rahmin doğuma hazırlandıkça Braxton Hicks kasılmaları sıklaşabilir. Leğen kemiğinin alt kısmında hissedilen ağırlık, bebeğinin baş aşağı yerleştiğinin bir işareti olabilir.",
    },
    tips: {
      en: [
        "Save your maternity unit's number, your birth partner's number and the hospital address in your phone.",
        "Plan how you'll get to the hospital; it isn't safe to drive yourself while in labour.",
        "Short, frequent rests are fine; you don't need to push through tiredness.",
      ],
      tr: [
        "Doğumhanenin ve doğum partnerinin numarasını, hastanenin adresini de telefonuna kaydet.",
        "Hastaneye nasıl gideceğini planla; doğum sancısı varken kendin araba kullanman güvenli değil.",
        "Kısa ve sık molalar vermek çok normal; yorgunluğa direnmek zorunda değilsin.",
      ],
    },
    todo: {
      en: [
        "Start packing your hospital bag, so you're ready if your baby comes early.",
        "Choose a car seat for the journey home, ideally a new one, and practise fitting it.",
      ],
      tr: [
        "Bebeğin erken gelirse hazır olmak için hastane çantanı hazırlamaya başla.",
        "Eve dönüş yolculuğu için tercihen yeni bir ana kucağı (bebek oto koltuğu) seç ve takmayı dene.",
      ],
    },
    sources: [
      { name: "NHS: Week 33 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-33/" },
      { name: "Mayo Clinic: Fetal development, the 3rd trimester", url: "https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/fetal-development/art-20045997" },
    ],
  },
  {
    week: 34,
    size: { emoji: "🍈", name: { en: "a cantaloupe", tr: "kavun" } },
    lengthCm: 45.0,
    weightG: 2150,
    baby: {
      en: "Your baby is about 45 cm long and curled up with legs bent towards the chest, as space is getting tight. The fingernails have reached the fingertips. You should still feel your baby shifting about and see your bump change shape.",
      tr: "Bebeğin yaklaşık 45 cm boyunda; yer daraldığı için bacakları göğsüne doğru bükülü, kıvrılmış duruyor. Tırnakları parmak uçlarına ulaştı. Bebeğinin kıpırdandığını hissetmeye ve karnının şekil değiştirdiğini görmeye devam etmelisin.",
    },
    body: {
      en: "If your baby moves down into your pelvis, breathing and heartburn may ease, though you may need to pee more often. This doesn't mean birth is about to happen; it may still be weeks away. Leaking a little colostrum is normal, and a supportive bra can help with tender breasts.",
      tr: "Bebeğin leğen kemiğine doğru inerse nefes almak kolaylaşabilir, mide ekşimesi hafifleyebilir ama daha sık tuvalete gitmen gerekebilir. Bu, doğumun hemen kapıda olduğu anlamına gelmez; birkaç hafta daha olabilir. Biraz kolostrum sızması normaldir; destekleyici bir sütyen hassas göğüslerine iyi gelir.",
    },
    tips: {
      en: [
        "Keep moving gently each day, even if it's just a short walk.",
        "If you work, plan your maternity leave start date; many people stop around now.",
        "Stock up on maternity pads for after the birth.",
      ],
      tr: [
        "Kısa bir yürüyüş bile olsa her gün nazikçe hareket etmeye devam et.",
        "Çalışıyorsan doğum izninin başlangıç tarihini planla; birçok kişi bu sıralarda işi bırakır.",
        "Doğum sonrası için lohusa pedi stokla.",
      ],
    },
    todo: {
      en: ["Talk to your midwife or doctor about pain relief options for labour, and note your preferences in your birth plan."],
      tr: ["Doğumdaki ağrı kesici seçeneklerini eben ya da doktorunla konuş ve tercihlerini doğum planına ekle."],
    },
    sources: [
      { name: "NHS: Week 34 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-34/" },
      { name: "Mayo Clinic: Fetal development, the 3rd trimester", url: "https://www.mayoclinic.org/healthy-lifestyle/pregnancy-week-by-week/in-depth/fetal-development/art-20045997" },
    ],
  },
  {
    week: 35,
    size: { emoji: "🎃", name: { en: "a small pumpkin", tr: "küçük bir bal kabağı" } },
    lengthCm: 46.2,
    weightG: 2380,
    baby: {
      en: "Your baby is about 46.2 cm long and getting chubbier, which will help them stay warm after birth. The brain is still growing fast. It's cramped in there now, but you should feel movements as strongly and regularly as before.",
      tr: "Bebeğin yaklaşık 46,2 cm boyunda ve tombullaşıyor; bu, doğumdan sonra sıcak kalmasına yardım edecek. Beyni hâlâ hızla büyüyor. Rahim artık oldukça dar ama hareketleri eskisi kadar güçlü ve düzenli hissetmelisin.",
    },
    body: {
      en: "Sore ribs are common as your baby kicks from a head-down position. Severe pain under the ribs, though, can be a sign of pre-eclampsia, so call your midwife or doctor if you notice it. Many people start maternity leave around now; do what feels right for you.",
      tr: "Baş aşağı pozisyondaki bebeğin tekmeledikçe kaburgalarının ağrıması yaygındır. Ancak kaburgaların altındaki şiddetli ağrı preeklampsi belirtisi olabilir; böyle bir ağrı fark edersen ebeni ya da doktorunu ara. Birçok kişi bu sıralarda doğum iznine çıkar; sana hangisi doğru geliyorsa onu yap.",
    },
    tips: {
      en: [
        "Practise slow breathing now, in through your nose and out through your mouth; it can help in labour.",
        "Consider a well-fitting nursing bra and some breast pads.",
        "Batch-cook a few meals for the freezer while you have the energy.",
      ],
      tr: [
        "Şimdiden yavaş nefes almayı çalış: burnundan al, ağzından ver; doğumda işine yarayabilir.",
        "Tam oturan bir emzirme sütyeni ve birkaç göğüs pedi almayı düşün.",
        "Enerjin varken dondurucuya koymak için birkaç öğün yemek hazırla.",
      ],
    },
    todo: {
      en: ["Pack your hospital bag: notes, comfy clothes, nightwear, maternity pads, snacks, baby clothes and nappies."],
      tr: ["Hastane çantanı hazırla: gebelik dosyan, rahat kıyafetler, gecelik, lohusa pedleri, atıştırmalıklar, bebek kıyafetleri ve bezleri."],
    },
    sources: [
      { name: "NHS: Week 35 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-35/" },
      { name: "NHS: Hospital bag checklist", url: "https://www.nhs.uk/best-start-in-life/pregnancy/preparing-for-labour-and-birth/hospital-bag-checklist/" },
    ],
  },
  {
    week: 36,
    size: { emoji: "🍉", name: { en: "a mini watermelon", tr: "mini bir karpuz" } },
    lengthCm: 47.4,
    weightG: 2620,
    baby: {
      en: "Your baby is about 47.4 cm long, and the lungs are probably mature enough to breathe without help. The soft lanugo hair is mostly gone, and your baby may have hair on their head. Many babies have now settled head down, ready for birth.",
      tr: "Bebeğin yaklaşık 47,4 cm boyunda ve akciğerleri büyük olasılıkla yardım almadan nefes alabilecek kadar olgunlaştı. Yumuşak lanugo tüyleri büyük ölçüde döküldü; bebeğinin başında saçları olabilir. Birçok bebek artık baş aşağı pozisyona yerleşmiş, doğuma hazır.",
    },
    body: {
      en: "Your check-up around now will look at your blood pressure, urine and the size of your bump, so try to keep these appointments even when getting there feels like an effort. If your baby isn't head down, you may be offered a procedure to help them turn. A little leaking of urine when you laugh or cough is common, and pelvic floor exercises help.",
      tr: "Bu sıralardaki kontrolünde tansiyonuna, idrarına ve karnının büyüklüğüne bakılacak; oraya gitmek zahmetli gelse de bu randevuları kaçırmamaya çalış. Bebeğin baş aşağı değilse dönmesine yardımcı olacak bir işlem önerilebilir. Gülerken ya da öksürürken biraz idrar kaçırmak yaygındır; pelvik taban egzersizleri yardımcı olur.",
    },
    tips: {
      en: [
        "Keep your notes, birth plan and important numbers somewhere easy to grab.",
        "Do your pelvic floor exercises daily; they help now and with recovery after the birth.",
        "Take a few quiet minutes each day to relax your body and mind.",
      ],
      tr: [
        "Gebelik dosyanı, doğum planını ve önemli numaraları kolayca alabileceğin bir yerde tut.",
        "Pelvik taban egzersizlerini her gün yap; hem şimdi hem de doğum sonrası iyileşmede yardımcı olur.",
        "Bedenini ve zihnini dinlendirmek için her gün birkaç sessiz dakika ayır.",
      ],
    },
    todo: {
      en: [
        "Check your hospital bag is packed and the car seat is ready for the journey home.",
        "Ask about group B strep (GBS); in the US, testing is usually done between 36 and 38 weeks.",
      ],
      tr: [
        "Hastane çantanın hazır, ana kucağının da eve dönüş için kullanıma hazır olduğundan emin ol.",
        "B grubu streptokoku (GBS) sor; ABD'de test genellikle 36. ile 38. haftalar arasında yapılır.",
      ],
    },
    sources: [
      { name: "NHS: Week 36 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-36/" },
      { name: "ACOG: Group B strep and pregnancy", url: "https://www.acog.org/womens-health/faqs/group-b-strep-and-pregnancy" },
    ],
  },
  {
    week: 37,
    size: { emoji: "🥬", name: { en: "a bunch of swiss chard", tr: "bir demet pazı" } },
    lengthCm: 48.6,
    weightG: 2860,
    baby: {
      en: "Your baby is about 48.6 cm long and, if born now, would no longer be considered premature. Around 95% of babies are head down by this point. Your baby is trying out facial expressions such as frowning and smiling, and the toenails have reached the tips of the toes.",
      tr: "Bebeğin yaklaşık 48,6 cm boyunda ve şimdi doğarsa artık prematüre sayılmaz. Bebeklerin yaklaşık %95'i bu dönemde baş aşağı pozisyondadır. Bebeğin kaşlarını çatmak ve gülümsemek gibi yüz ifadelerini deniyor; ayak tırnakları da parmak uçlarına ulaştı.",
    },
    body: {
      en: "You may notice more discharge and more Braxton Hicks, along with a sudden urge to clean and organise, known as nesting. Signs that labour may be starting include regular contractions, a show (a plug of sticky mucus), backache or your waters breaking. Call your midwife or maternity unit if your waters break, you have any bleeding, or your baby's movements change.",
      tr: "Akıntının ve Braxton Hicks kasılmalarının arttığını, bir de yuva yapma içgüdüsüyle ani bir temizlik ve düzen isteği duyduğunu fark edebilirsin. Doğumun başlayabileceğini gösteren işaretler arasında düzenli kasılmalar, nişan gelmesi (yapışkan bir mukus tıkacı), bel ağrısı ya da suyunun gelmesi var. Suyun gelirse, kanaman olursa ya da bebeğinin hareketleri değişirse ebeni veya doğumhaneyi ara.",
    },
    tips: {
      en: [
        "Nesting is natural, but pace yourself and rest as much as you can.",
        "Learn the signs of labour and when your maternity unit would like you to call.",
        "Read about the baby blues and postnatal depression, and share what you learn with your partner or a close friend.",
      ],
      tr: [
        "Yuva yapma isteği doğal ama kendini yorma ve olabildiğince dinlen.",
        "Doğumun belirtilerini ve doğumhanenin seni ne zaman aramanı istediğini öğren.",
        "Doğum sonrası hüzün ve lohusalık depresyonu hakkında oku; öğrendiklerini partnerinle ya da bir yakınınla paylaş.",
      ],
    },
    todo: {
      en: ["Plan who will look after any other children or pets when labour starts."],
      tr: ["Doğum başladığında diğer çocuklarına ya da evcil hayvanlarına kimin bakacağını planla."],
    },
    sources: [
      { name: "NHS: Week 37 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-37/" },
      { name: "NHS: Signs that labour has begun", url: "https://www.nhs.uk/pregnancy/labour-and-birth/signs-that-labour-has-begun/" },
    ],
  },
  {
    week: 38,
    size: { emoji: "🍈", name: { en: "a honeydew melon", tr: "bal kavunu" } },
    lengthCm: 49.8,
    weightG: 3080,
    baby: {
      en: "Your baby is about 49.8 cm long and weighs around 3 kg. Most of the lanugo has gone, and the bowels are storing meconium, which will be your baby's first poo. Reflexes such as grasping and sucking are ready for life outside.",
      tr: "Bebeğin yaklaşık 49,8 cm boyunda ve 3 kg civarında. Lanugo tüylerinin çoğu döküldü; bağırsaklarında, ilk kakası olacak mekonyum birikiyor. Kavrama ve emme gibi refleksleri dış dünyaya hazır.",
    },
    body: {
      en: "Waiting can bring a mix of impatience, excitement and nerves, and all of that is normal. At your appointment around now, your blood pressure, urine and bump will be checked, and you may talk about what happens if you go past your due date. A short walk and some fresh air can help the time pass.",
      tr: "Beklemek sabırsızlık, heyecan ve gerginliği bir arada getirebilir; hepsi çok normal. Bu sıralardaki kontrolünde tansiyonun, idrarın ve karnın kontrol edilecek; tahmini doğum tarihini geçersen neler olacağını da konuşabilirsiniz. Kısa bir yürüyüş ve biraz temiz hava zamanın geçmesine yardım edebilir.",
    },
    tips: {
      en: [
        "Take your maternity notes with you whenever you go out.",
        "Keep easy snacks and drinks ready for early labour, like bananas or yoghurt.",
        "Put a waterproof sheet on your mattress if you're worried about your waters breaking at night.",
      ],
      tr: [
        "Dışarı çıktığında gebelik dosyanı her zaman yanında taşı.",
        "Doğumun erken evresi için muz ya da yoğurt gibi kolay atıştırmalıklar ve içecekler hazır olsun.",
        "Suyunun gece gelmesinden endişe ediyorsan yatağına su geçirmez bir örtü ser.",
      ],
    },
    todo: {
      en: ["Ask what your care team offers if you go past your due date, such as a membrane sweep or induction."],
      tr: ["Tahmini doğum tarihini geçersen sağlık ekibinin neler önerdiğini sor; örneğin membran sıyırma ya da doğumun başlatılması (indüksiyon)."],
    },
    sources: [
      { name: "NHS: Week 38 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-38/" },
      { name: "Cleveland Clinic: Fetal development", url: "https://my.clevelandclinic.org/health/articles/7247-fetal-development-stages-of-growth" },
    ],
  },
  {
    week: 39,
    size: { emoji: "🍉", name: { en: "a small watermelon", tr: "küçük bir karpuz" } },
    lengthCm: 50.7,
    weightG: 3290,
    baby: {
      en: "Your baby is about 50.7 cm long and is now full term. The skin has developed a thicker outer layer that helps protect the body and control temperature. Some vernix may remain on the skin at birth, or most of it may be gone.",
      tr: "Bebeğin yaklaşık 50,7 cm boyunda ve artık miadında. Derisi, vücudunu korumaya ve ısısını düzenlemeye yardım eden daha kalın bir dış tabaka geliştirdi. Doğumda derisinde biraz verniks kalmış olabilir ya da büyük kısmı gitmiş olabilir.",
    },
    body: {
      en: "More discharge, pressure low in your bump and backache are common as your baby moves down. Call your midwife or maternity unit if your waters break, you have any bleeding, or your baby's movements change. Call urgently, too, for a severe headache, vision problems, pain below the ribs, sudden swelling, severe itching or a fever.",
      tr: "Bebeğin aşağı indikçe akıntının artması, karnının alt kısmında baskı hissi ve bel ağrısı sık görülür. Suyun gelirse, kanaman olursa ya da bebeğinin hareketleri değişirse ebeni veya doğumhaneyi ara. Şiddetli baş ağrısı, görme sorunları, kaburgaların altında ağrı, ani şişlik, şiddetli kaşıntı ya da ateş olursa da hemen ara.",
    },
    tips: {
      en: [
        "Contractions lasting about 60 seconds, every 5 minutes, are a common cue to call; follow your unit's advice.",
        "If your waters break, note the time and the colour of the fluid, then call your maternity unit.",
        "Rest when you can; early labour can take a while, and sleep helps you save energy.",
      ],
      tr: [
        "Yaklaşık 60 saniye süren ve 5 dakikada bir gelen kasılmalar genellikle arama işaretidir; doğumhanenin önerisine uy.",
        "Suyun gelirse saati ve sıvının rengini not et, sonra doğumhaneyi ara.",
        "Fırsat buldukça dinlen; doğumun erken evresi uzun sürebilir ve uyku enerjini korumana yardım eder.",
      ],
    },
    todo: {
      en: ["Confirm how you'll get to the hospital and who will come with you."],
      tr: ["Hastaneye nasıl gideceğini ve yanında kimin olacağını netleştir."],
    },
    sources: [
      { name: "NHS: Week 39 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-39/" },
      { name: "NHS: Signs that labour has begun", url: "https://www.nhs.uk/pregnancy/labour-and-birth/signs-that-labour-has-begun/" },
    ],
  },
  {
    week: 40,
    size: { emoji: "🎃", name: { en: "a pumpkin", tr: "bal kabağı" } },
    lengthCm: 51.2,
    weightG: 3400,
    baby: {
      en: "Your baby is about 51.2 cm long and weighs around 3.4 kg, though healthy babies come in a wide range of sizes. It's snug in there, but your baby should still be moving in their usual pattern. Only about 1 in 20 babies arrive on their due date, so any day around now is right on time.",
      tr: "Bebeğin yaklaşık 51,2 cm boyunda ve 3,4 kg civarında; yine de sağlıklı bebekler çok farklı boyutlarda olabilir. İçerisi epey dar ama bebeğin olağan düzeninde hareket etmeye devam etmeli. Bebeklerin yalnızca yaklaşık 20'de 1'i tam tahmini doğum tarihinde doğar; yani bu günlerde gelmesi tam zamanında demek.",
    },
    body: {
      en: "If this is your first baby, you'll usually have a check this week with blood pressure, urine and bump measurements. Real contractions tend to become stronger, longer and closer together, while Braxton Hicks stay irregular. Your baby's movements shouldn't slow down or stop; if they do, contact your maternity unit straight away, at any hour.",
      tr: "İlk bebeğinse bu hafta genellikle tansiyon, idrar ve karın ölçümünü içeren bir kontrolün olur. Gerçek kasılmalar giderek güçlenir, uzar ve sıklaşır; Braxton Hicks kasılmaları ise düzensiz kalır. Bebeğinin hareketleri yavaşlamamalı ya da durmamalı; böyle bir şey olursa saat kaç olursa olsun hemen doğumhaneyi ara.",
    },
    tips: {
      en: [
        "If contractions start at night, try to rest or sleep through the early ones.",
        "During the day, staying upright and moving around can help labour progress.",
        "There's no proven way to safely bring on labour at home, so check with your midwife before trying anything.",
      ],
      tr: [
        "Kasılmalar gece başlarsa ilk kasılmalar boyunca dinlenmeye ya da uyumaya çalış.",
        "Gündüz dik durmak ve hareket etmek doğumun ilerlemesine yardım edebilir.",
        "Doğumu evde güvenle başlatmanın kanıtlanmış bir yolu yok; bir şey denemeden önce ebene danış.",
      ],
    },
    todo: {
      en: ["Discuss a membrane sweep with your midwife or doctor; it's often offered around 40 to 41 weeks."],
      tr: ["Membran sıyırma işlemini eben ya da doktorunla konuş; genellikle 40–41. haftalar civarında önerilir."],
    },
    sources: [
      { name: "NHS: Week 40 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-40/" },
      { name: "ACOG: How your fetus grows during pregnancy", url: "https://www.acog.org/womens-health/faqs/how-your-fetus-grows-during-pregnancy" },
    ],
  },
  {
    week: 41,
    size: { emoji: "🍉", name: { en: "a watermelon", tr: "karpuz" } },
    lengthCm: 51.7,
    weightG: 3600,
    baby: {
      en: "Your baby is simply taking a little extra time, which is common, especially in a first pregnancy. Most babies weigh around 3 to 4 kg by now, and the fastest growth is behind them. Babies born after their due date often have dry, peeling skin, which settles on its own within a few days.",
      tr: "Bebeğin yalnızca biraz daha zamana ihtiyaç duyuyor; bu, özellikle ilk gebeliklerde sık görülür. Bebeklerin çoğu artık 3 ila 4 kg civarında ve en hızlı büyüme dönemi geride kaldı. Tahmini tarihten sonra doğan bebeklerde derinin kuru olması ve soyulması yaygındır; birkaç gün içinde kendiliğinden düzelir.",
    },
    body: {
      en: "Going past your due date can feel frustrating, so be gentle with yourself. From 41 weeks the risks, while still small, start to rise, so your midwife or doctor will talk with you about extra monitoring, a membrane sweep or induction. Keep paying attention to your baby's movements, and call straight away if they change.",
      tr: "Tahmini doğum tarihini geçmek can sıkıcı olabilir; kendine karşı nazik ol. 41. haftadan itibaren riskler hâlâ küçük olsa da artmaya başlar; bu yüzden eben ya da doktorun seninle ek takip, membran sıyırma ya da doğumun başlatılması (indüksiyon) seçeneklerini konuşacak. Bebeğinin hareketlerini takip etmeye devam et; bir değişiklik olursa hemen ara.",
    },
    tips: {
      en: [
        "Ask as many questions as you need about induction; it's a decision you make together with your care team.",
        "Keep your phone charged and your bag by the door.",
        "Gentle walks, warm baths and plenty of rest can help you stay comfortable while you wait.",
      ],
      tr: [
        "Doğumun başlatılmasıyla ilgili istediğin kadar soru sor; bu, sağlık ekibinle birlikte vereceğin bir karar.",
        "Telefonunu şarjlı, çantanı da kapının yanında tut.",
        "Beklerken hafif yürüyüşler, ılık banyolar ve bolca dinlenmek daha rahat hissetmeni sağlayabilir.",
      ],
    },
    todo: {
      en: ["Talk through your options with your midwife or doctor: extra monitoring, a membrane sweep or a date for induction."],
      tr: ["Seçeneklerini eben ya da doktorunla konuş: ek takip, membran sıyırma ya da doğumun başlatılması için bir tarih."],
    },
    sources: [
      { name: "NHS: Week 41 of pregnancy", url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/3rd-trimester/week-41/" },
      { name: "ACOG: When pregnancy goes past your due date", url: "https://www.acog.org/womens-health/faqs/when-pregnancy-goes-past-your-due-date" },
    ],
  },
  {
    week: 42,
    size: { emoji: "🎃", name: { en: "a large pumpkin", tr: "iri bir bal kabağı" } },
    lengthCm: 51.7,
    weightG: 3700,
    baby: {
      en: "Your baby is fully developed and simply taking their time. Babies born after 42 weeks may have long nails, dry or peeling skin and little vernix left; the skin usually settles within a few days. Your care team will keep a close eye on you both.",
      tr: "Bebeğin tamamen gelişti ve yalnızca acele etmiyor. 42 haftadan sonra doğan bebeklerin tırnakları uzun, derileri kuru ya da soyulmuş ve verniksi az olabilir; deri genellikle birkaç gün içinde düzelir. Sağlık ekibin ikinizi de yakından takip edecek.",
    },
    body: {
      en: "A pregnancy that continues beyond 42 weeks is called post-term, and induction is usually recommended by this point. If you've chosen to wait, you'll usually be offered closer monitoring, such as checks of your baby's heart rate and the fluid around them. Contact your maternity unit straight away if your baby's movements change, your waters break, or you have any bleeding.",
      tr: "42 haftayı aşan gebeliğe miadı geçmiş (post-term) gebelik denir ve bu noktada genellikle doğumun başlatılması önerilir. Beklemeyi seçtiysen genellikle bebeğinin kalp atışının ve çevresindeki sıvının kontrol edildiği daha yakın bir takip önerilir. Bebeğinin hareketleri değişirse, suyun gelirse ya da kanaman olursa hemen doğumhaneyi ara.",
    },
    tips: {
      en: [
        "It's okay to feel impatient or fed up; lean on the people who support you.",
        "Ask your care team to explain each option, with its benefits and risks, so you can decide together.",
        "Keep eating regularly and drinking water so you have energy for labour.",
      ],
      tr: [
        "Sabırsız ya da bıkkın hissetmen çok normal; sana destek olan insanlara yaslan.",
        "Birlikte karar verebilmeniz için sağlık ekibinden her seçeneği yararları ve riskleriyle açıklamasını iste.",
        "Doğum için enerjin olsun diye düzenli yemeye ve su içmeye devam et.",
      ],
    },
    todo: {
      en: ["If you haven't already, agree a plan with your care team for induction or closer monitoring."],
      tr: ["Henüz yapmadıysan doğumun başlatılması ya da daha yakın takip için sağlık ekibinle bir plan üzerinde anlaş."],
    },
    sources: [
      { name: "ACOG: When pregnancy goes past your due date", url: "https://www.acog.org/womens-health/faqs/when-pregnancy-goes-past-your-due-date" },
      { name: "NICE: Inducing labour (NG207)", url: "https://www.nice.org.uk/guidance/ng207" },
    ],
  },
];
