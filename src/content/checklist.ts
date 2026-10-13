// Practical pregnancy to-dos, grouped by trimester, bilingual (EN/TR).
//
// Trimesters match `trimesterForWeek` in src/lib/pregnancy.ts:
// 1 = weeks 1–13, 2 = weeks 14–27, 3 = week 28 onwards.
// `week` is the suggested week to surface an item. Timings follow NHS, ACOG
// and CDC guidance. Local schedules vary, so items stay neutral and point
// people back to their own midwife or doctor.

import type { ChecklistItem } from './types';

export const CHECKLIST: ChecklistItem[] = [
  // ── First trimester ──────────────────────────────────────────────────────
  {
    id: "take-pregnancy-test",
    trimester: 1,
    week: 4,
    title: { en: "Take a home pregnancy test", tr: "Evde gebelik testi yap" },
    detail: {
      en: "Most tests are reliable from the first day of a missed period. If it's negative but your period still doesn't come, test again a few days later.",
      tr: "Testlerin çoğu adetin geciktiği ilk günden itibaren güvenilirdir. Sonuç negatifse ama adetin hâlâ gelmediyse birkaç gün sonra tekrar test et.",
    },
  },
  {
    id: "start-folic-acid",
    trimester: 1,
    week: 4,
    title: { en: "Take folic acid every day", tr: "Her gün folik asit al" },
    detail: {
      en: "400 micrograms a day, ideally from before conception until 12 weeks. Your doctor may advise a higher dose in some situations.",
      tr: "Günde 400 mikrogram; ideal olarak gebelikten önce başlayıp 12. haftaya kadar. Bazı durumlarda doktorun daha yüksek bir doz önerebilir.",
    },
  },
  {
    id: "review-medicines",
    trimester: 1,
    week: 5,
    title: { en: "Review your medicines and supplements", tr: "İlaçlarını ve takviyelerini gözden geçir" },
    detail: {
      en: "Ask a doctor or pharmacist before starting or stopping anything, and avoid supplements containing vitamin A (retinol).",
      tr: "Bir şeye başlamadan ya da bir ilacı bırakmadan önce doktoruna veya eczacına danış; A vitamini (retinol) içeren takviyelerden kaçın.",
    },
  },
  {
    id: "stop-alcohol-and-smoking",
    trimester: 1,
    week: 5,
    title: { en: "Stop alcohol and smoking", tr: "Alkolü ve sigarayı bırak" },
    detail: {
      en: "No amount of alcohol is known to be safe in pregnancy. If you smoke, ask your doctor or midwife about support to quit.",
      tr: "Gebelikte güvenli olduğu bilinen bir alkol miktarı yok. Sigara içiyorsan bırakmak için doktorundan ya da ebenden destek iste.",
    },
  },
  {
    id: "limit-caffeine",
    trimester: 1,
    week: 5,
    title: { en: "Keep caffeine under 200 mg a day", tr: "Kafeini günde 200 mg'ın altında tut" },
    detail: {
      en: "That's about two mugs of instant coffee. Tea, cola, energy drinks and chocolate contain caffeine too.",
      tr: "Bu yaklaşık iki kupa hazır kahve demek. Çay, kola, enerji içecekleri ve çikolata da kafein içerir.",
    },
  },
  {
    id: "learn-food-safety",
    trimester: 1,
    week: 6,
    title: { en: "Learn which foods to avoid", tr: "Kaçınman gereken yiyecekleri öğren" },
    detail: {
      en: "Such as unpasteurised dairy, raw or undercooked meat, liver, and fish high in mercury like shark and swordfish.",
      tr: "Örneğin pastörize edilmemiş süt ürünleri, çiğ ya da az pişmiş et, ciğer ve köpek balığı, kılıç balığı gibi cıvası yüksek balıklar.",
    },
  },
  {
    id: "book-first-appointment",
    trimester: 1,
    week: 6,
    title: { en: "Book your first pregnancy appointment", tr: "İlk gebelik randevunu al" },
    detail: {
      en: "Often called the booking appointment, it usually happens between 8 and 12 weeks and covers your health history, tests and care options.",
      tr: "Genellikle 8. ile 12. haftalar arasında yapılan bu ilk kontrolde sağlık geçmişin, testlerin ve takip seçeneklerin konuşulur.",
    },
  },
  {
    id: "ask-about-vitamin-d",
    trimester: 1,
    week: 8,
    title: { en: "Ask about vitamin D", tr: "D vitaminini sor" },
    detail: {
      en: "Many people are advised to take a daily vitamin D supplement in pregnancy. Recommended amounts vary by country.",
      tr: "Gebelikte birçok kişiye her gün D vitamini takviyesi önerilir. Önerilen miktar ülkeden ülkeye değişir.",
    },
  },
  {
    id: "first-blood-tests",
    trimester: 1,
    week: 8,
    title: { en: "Have your first blood tests", tr: "İlk kan testlerini yaptır" },
    detail: {
      en: "These usually check your blood group and Rh (D) status, iron levels and infections such as HIV, hepatitis B and syphilis.",
      tr: "Bu testlerde genellikle kan grubun ve Rh (D) durumun, demir düzeyin ve HIV, hepatit B, sifiliz gibi enfeksiyonlar kontrol edilir.",
    },
  },
  {
    id: "flu-and-covid-vaccines",
    trimester: 1,
    title: { en: "Ask about flu and COVID-19 vaccines", tr: "Grip ve COVID-19 aşılarını sor" },
    detail: {
      en: "The flu vaccine can be given at any stage of pregnancy during flu season. Ask whether a COVID-19 vaccine is advised for you.",
      tr: "Grip aşısı, grip mevsiminde gebeliğin her döneminde yapılabilir. COVID-19 aşısının senin için önerilip önerilmediğini sor.",
    },
  },
  {
    id: "decide-on-screening",
    trimester: 1,
    week: 10,
    title: { en: "Decide about screening tests", tr: "Tarama testlerine karar ver" },
    detail: {
      en: "You may be offered the combined test (about 10 to 14 weeks) or NIPT (from 10 weeks). Whether to have screening is your choice.",
      tr: "Sana kombine test (ikili tarama, yaklaşık 10–14. haftalar) ya da NIPT (10. haftadan itibaren) önerilebilir. Tarama yaptırıp yaptırmamak senin seçimin.",
    },
  },
  {
    id: "dating-scan",
    trimester: 1,
    week: 11,
    title: { en: "Have your dating scan", tr: "Tarihlendirme ultrasonunu yaptır" },
    detail: {
      en: "Usually between 10 and 14 weeks, it checks your baby's development and confirms your due date.",
      tr: "Genellikle 10. ile 14. haftalar arasında yapılır; bebeğinin gelişimini kontrol eder ve tahmini doğum tarihini netleştirir.",
    },
  },
  {
    id: "dental-check-up",
    trimester: 1,
    week: 12,
    title: { en: "Book a dental check-up", tr: "Diş kontrolü için randevu al" },
    detail: {
      en: "Gum problems are common in pregnancy. Let your dentist know you're pregnant.",
      tr: "Gebelikte diş eti sorunları sık görülür. Diş hekimine gebe olduğunu söyle.",
    },
  },

  // ── Second trimester ─────────────────────────────────────────────────────
  {
    id: "pelvic-floor-exercises",
    trimester: 2,
    week: 14,
    title: { en: "Start daily pelvic floor exercises", tr: "Her gün pelvik taban egzersizi yap" },
    detail: {
      en: "Squeeze and lift the muscles you'd use to hold in pee, hold for a few seconds, then relax. They help prevent leaks now and after birth.",
      tr: "İdrarını tutarken kullandığın kasları sık ve yukarı çek, birkaç saniye tut, sonra gevşet. Bu egzersizler hem şimdi hem de doğumdan sonra idrar kaçırmayı önlemeye yardımcı olur.",
    },
  },
  {
    id: "whooping-cough-vaccine",
    trimester: 2,
    week: 16,
    title: { en: "Ask about the whooping cough vaccine", tr: "Boğmaca aşısını sor" },
    detail: {
      en: "Usually given between 16 and 32 weeks in the UK or 27–36 weeks in the US. It helps protect your baby in the first weeks of life.",
      tr: "Genellikle İngiltere'de 16–32., ABD'de 27–36. haftalar arasında yapılır. Bebeğini hayatının ilk haftalarında korumaya yardımcı olur.",
    },
  },
  {
    id: "choose-birth-place",
    trimester: 2,
    week: 17,
    title: { en: "Think about where to give birth", tr: "Nerede doğum yapacağını düşün" },
    detail: {
      en: "Options such as a hospital, birth centre or home birth vary by area. You can change your mind later.",
      tr: "Hastane, doğum merkezi ya da evde doğum gibi seçenekler bölgeye göre değişir. Fikrini daha sonra değiştirebilirsin.",
    },
  },
  {
    id: "maternity-leave-rights",
    trimester: 2,
    week: 17,
    title: { en: "Look into maternity leave and pay", tr: "Doğum izni ve ödemelerini araştır" },
    detail: {
      en: "Rules and deadlines vary by country and employer. Note when you need to tell your employer and claim any pay.",
      tr: "Kurallar ve süreler ülkeye ve işverene göre değişir. İşverenine ne zaman haber vermen ve ödemeler için ne zaman başvurman gerektiğini not et.",
    },
  },
  {
    id: "anomaly-scan",
    trimester: 2,
    week: 19,
    title: { en: "Have your anomaly (anatomy) scan", tr: "Ayrıntılı ultrasonunu (anomali taraması) yaptır" },
    detail: {
      en: "This detailed scan, usually between about 18 and 22 weeks, checks how your baby is growing and developing.",
      tr: "Genellikle 18. ile 22. haftalar arasında yapılan bu ayrıntılı ultrason, bebeğinin büyümesini ve gelişimini kontrol eder.",
    },
  },
  {
    id: "pregnancy-certificate",
    trimester: 2,
    week: 20,
    title: { en: "Get a pregnancy certificate for work", tr: "İş için gebelik belgeni al" },
    detail: {
      en: "Some employers and benefit schemes need a certificate from your doctor or midwife, such as the MAT B1 form in the UK.",
      tr: "Bazı işverenler ve destek programları doktorundan ya da ebenden alınmış bir belge ister; örneğin İngiltere'deki MAT B1 formu.",
    },
  },
  {
    id: "pre-eclampsia-signs",
    trimester: 2,
    week: 20,
    title: { en: "Learn the warning signs of pre-eclampsia", tr: "Preeklampsinin uyarı işaretlerini öğren" },
    detail: {
      en: "A severe headache, vision problems, pain just below the ribs or sudden swelling of the face, hands or feet need urgent checking.",
      tr: "Şiddetli baş ağrısı, görme sorunları, kaburgaların hemen altında ağrı ya da yüzde, ellerde veya ayaklarda ani şişlik acilen kontrol edilmelidir.",
    },
  },
  {
    id: "book-antenatal-classes",
    trimester: 2,
    week: 22,
    title: { en: "Book antenatal classes", tr: "Doğuma hazırlık sınıfına kaydol" },
    detail: {
      en: "Classes on labour, birth and feeding can help you feel prepared. Popular ones fill up early.",
      tr: "Doğum ve bebek beslenmesi üzerine dersler kendini hazır hissetmene yardımcı olabilir. Gebe okulları ve popüler sınıflar erken dolabilir.",
    },
  },
  {
    id: "glucose-test",
    trimester: 2,
    week: 24,
    title: { en: "Glucose test for gestational diabetes", tr: "Gebelik diyabeti için şeker yükleme testi" },
    detail: {
      en: "Often done between 24 and 28 weeks, either for everyone or if you have risk factors, depending on where you live.",
      tr: "Yaşadığın yere göre herkese ya da yalnızca risk faktörü olanlara, genellikle 24. ile 28. haftalar arasında yapılır.",
    },
  },
  {
    id: "know-baby-movements",
    trimester: 2,
    week: 24,
    title: { en: "Get to know your baby's movements", tr: "Bebeğinin hareketlerini tanı" },
    detail: {
      en: "There's no set number of kicks to count. If movements slow down, change or stop, call your maternity unit straight away.",
      tr: "Sayman gereken belirli bir tekme sayısı yok. Hareketler yavaşlar, değişir ya da durursa hemen doğumhaneyi ara.",
    },
  },
  {
    id: "partner-leave",
    trimester: 2,
    week: 25,
    title: { en: "Check leave for your partner", tr: "Partnerinin izin haklarına göz at" },
    detail: {
      en: "If your partner plans time off around the birth, they may need to tell their employer by a set date.",
      tr: "Partnerin doğum döneminde izin almayı planlıyorsa, işverenine belirli bir tarihe kadar haber vermesi gerekebilir.",
    },
  },
  {
    id: "baby-essentials-list",
    trimester: 2,
    week: 26,
    title: { en: "Make a list of baby essentials", tr: "Bebek ihtiyaçları listesi hazırla" },
    detail: {
      en: "Start with a safe place to sleep, a car seat, clothes, nappies and feeding supplies. Borrowed items are fine, but use a new mattress if you can.",
      tr: "Güvenli bir uyku alanı, ana kucağı, kıyafetler, bezler ve beslenme malzemeleriyle başla. Ödünç eşyalar olabilir ama mümkünse yeni bir yatak kullan.",
    },
  },

  // ── Third trimester ──────────────────────────────────────────────────────
  {
    id: "anti-d-if-rh-negative",
    trimester: 3,
    week: 28,
    title: { en: "Anti-D if you're Rh (D) negative", tr: "Rh (D) negatifsen anti-D" },
    detail: {
      en: "If your blood group is Rh (D) negative, you may be offered anti-D injections, often around 28 weeks.",
      tr: "Kan grubun Rh (D) negatifse genellikle 28. hafta civarında anti-D iğnesi önerilebilir.",
    },
  },
  {
    id: "rsv-vaccine",
    trimester: 3,
    week: 28,
    title: { en: "Ask about the RSV vaccine", tr: "RSV aşısını sor" },
    detail: {
      en: "Offered from 28 weeks in the UK, or at 32 to 36 weeks during RSV season in the US. It helps protect your baby in their first months.",
      tr: "İngiltere'de 28. haftadan itibaren, ABD'de RSV mevsiminde 32–36. haftalar arasında önerilir. Bebeğini ilk aylarında korumaya yardımcı olur.",
    },
  },
  {
    id: "sleep-on-side",
    trimester: 3,
    week: 28,
    title: { en: "Go to sleep on your side", tr: "Yan yatarak uyu" },
    detail: {
      en: "From 28 weeks, side-sleeping is safest for your baby, including naps. If you wake on your back, just turn onto your side.",
      tr: "28. haftadan itibaren kısa uykular dahil yan yatarak uyumak bebeğin için en güvenlisidir. Sırtüstü uyanırsan yan dönmen yeterli.",
    },
  },
  {
    id: "safe-sleep-space",
    trimester: 3,
    week: 30,
    title: { en: "Prepare a safe sleep space", tr: "Güvenli bir uyku alanı hazırla" },
    detail: {
      en: "A cot or Moses basket with a firm, flat, well-fitting mattress, and no pillows, bumpers or duvets.",
      tr: "Sert, düz ve tam oturan bir yatağı olan, içinde yastık, kenar koruyucu ya da yorgan bulunmayan bir beşik.",
    },
  },
  {
    id: "feeding-plan",
    trimester: 3,
    week: 31,
    title: { en: "Think about feeding your baby", tr: "Bebeğini nasıl besleyeceğini düşün" },
    detail: {
      en: "Learn about breastfeeding, bottle feeding or both, and where to find support in the first days.",
      tr: "Anne sütü, mama ya da ikisi hakkında bilgi edin; ilk günlerde nereden destek alabileceğini öğren.",
    },
  },
  {
    id: "write-birth-plan",
    trimester: 3,
    week: 32,
    title: { en: "Write your birth plan", tr: "Doğum planını yaz" },
    detail: {
      en: "Note your preferences for pain relief, birth partners and the first hours after birth, and share it with your midwife or doctor.",
      tr: "Ağrı kesici, doğum partneri ve doğumdan sonraki ilk saatlerle ilgili tercihlerini yaz ve eben ya da doktorunla paylaş.",
    },
  },
  {
    id: "save-key-contacts",
    trimester: 3,
    week: 33,
    title: { en: "Save key numbers and plan your journey", tr: "Önemli numaraları kaydet, yolculuğunu planla" },
    detail: {
      en: "Keep your maternity unit, birth partner and transport details in your phone and on paper. It isn't safe to drive yourself in labour.",
      tr: "Doğumhane, doğum partnerin ve ulaşım bilgilerini hem telefonunda hem de kâğıtta tut. Doğum sancısı varken kendin araba kullanman güvenli değil.",
    },
  },
  {
    id: "install-car-seat",
    trimester: 3,
    week: 34,
    title: { en: "Install the car seat", tr: "Ana kucağını tak" },
    detail: {
      en: "Choose a rear-facing seat that suits your baby's weight, fit it in advance and practise taking it in and out.",
      tr: "Bebeğinin kilosuna uygun, arkaya bakan bir koltuk seç; önceden tak ve takıp çıkarmayı dene.",
    },
  },
  {
    id: "pack-hospital-bag",
    trimester: 3,
    week: 35,
    title: { en: "Pack your hospital bag", tr: "Hastane çantanı hazırla" },
    detail: {
      en: "Include your notes, comfy clothes, nightwear, maternity pads, snacks, a phone charger, baby clothes and nappies.",
      tr: "Gebelik dosyan, rahat kıyafetler, gecelik, lohusa pedleri, atıştırmalıklar, telefon şarj aleti, bebek kıyafetleri ve bezleri ekle.",
    },
  },
  {
    id: "group-b-strep",
    trimester: 3,
    week: 36,
    title: { en: "Ask about group B strep", tr: "B grubu streptokoku sor" },
    detail: {
      en: "In the US, testing is usually done between 36 and 38 weeks; in the UK it isn't routine. Ask what applies to you.",
      tr: "ABD'de test genellikle 36. ile 38. haftalar arasında yapılır; İngiltere'de ise rutin değildir. Senin için hangisinin geçerli olduğunu sor.",
    },
  },
  {
    id: "learn-labour-signs",
    trimester: 3,
    week: 36,
    title: { en: "Learn the signs of labour", tr: "Doğumun belirtilerini öğren" },
    detail: {
      en: "Regular contractions, a show, backache or your waters breaking. Know when your maternity unit wants you to call.",
      tr: "Düzenli kasılmalar, nişan gelmesi, bel ağrısı ya da suyun gelmesi. Doğumhanenin seni ne zaman aramanı istediğini öğren.",
    },
  },
  {
    id: "postnatal-support-plan",
    trimester: 3,
    week: 37,
    title: { en: "Plan support for after the birth", tr: "Doğum sonrası için destek planla" },
    detail: {
      en: "Think about meals, help at home and who you can call. Learn the signs of postnatal depression, which can affect anyone.",
      tr: "Yemekleri, evdeki yardımı ve kimi arayabileceğini düşün. Herkesi etkileyebilen lohusalık depresyonunun belirtilerini öğren.",
    },
  },
  {
    id: "past-due-date-options",
    trimester: 3,
    week: 39,
    title: { en: "Discuss going past your due date", tr: "Tahmini doğum tarihini geçme ihtimalini konuş" },
    detail: {
      en: "Ask about membrane sweeps, induction and extra monitoring, so you know your options before 41 weeks.",
      tr: "Membran sıyırma, doğumun başlatılması ve ek takip seçeneklerini sor; böylece 41. haftadan önce seçeneklerini bilirsin.",
    },
  },
];
