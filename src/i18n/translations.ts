// Marigold translations. Two-letter ISO codes; the rest is a flat dict.
// New keys: add to BOTH `en` and `tr`, or `t()` falls back to the key string.

export type LangCode = 'en' | 'tr';

export const SUPPORTED_LANGS: { code: LangCode; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
];

type Dict = Record<string, string>;

const en: Dict = {
  // Tabs + general
  'tab.home': 'Home',
  'tab.library': 'Library',
  'tab.journal': 'Journal',
  'tab.profile': 'Profile',
  'common.save': 'Save',
  'common.cancel': 'Cancel',
  'common.done': 'Done',
  'common.start': 'Start',
  'common.stop': 'Stop',
  'common.reset': 'Reset',
  'common.back': 'Back',
  'common.minutes': 'min',
  'common.seconds': 's',
  'common.today': 'Today',
  'common.yesterday': 'Yesterday',
  'common.empty': 'Nothing here yet.',

  // Tools menu (Home)
  'tools.caption': 'Tools',
  'tools.title': "Today's tools",
  'tools.kicks.title': 'Kick counter',
  'tools.kicks.sub': 'Count 10 movements',
  'tools.contractions.title': 'Contractions',
  'tools.contractions.sub': 'Time the waves',
  'tools.health.title': 'Health log',
  'tools.health.sub': 'Weight · BP · glucose',
  'tools.all': 'See all tools',

  // Kick counter screen
  'kicks.caption': 'Kick counter',
  'kicks.title': 'Count ten movements.',
  'kicks.intro':
    "From week 28, doctors suggest noting ten distinct movements within two hours. Sit quietly, drink something cold, and tap when you feel one.",
  'kicks.bigTap': 'Tap for each kick',
  'kicks.countOf': '{n} of 10',
  'kicks.elapsed': 'Elapsed',
  'kicks.startedAt': 'Started {time}',
  'kicks.complete.title': 'Ten in {minutes} minutes.',
  'kicks.complete.body':
    'That falls within the expected range. If movements ever feel slower than usual, call your midwife — never wait.',
  'kicks.saveJournal': 'Save to journal',
  'kicks.restart': 'Start a new session',
  'kicks.recent': 'Recent sessions',
  'kicks.session.label': '{count} kicks · {minutes} min',
  'kicks.note':
    'This is a guide, not a diagnosis. Trust changes you feel.',

  // Contractions screen
  'contractions.caption': 'Contractions',
  'contractions.title': 'Time the waves.',
  'contractions.intro':
    'Hold to time a contraction. We log duration and the gap from the last one. Call your team when contractions are 5 minutes apart, lasting 1 minute, for 1 hour (5-1-1).',
  'contractions.hold': 'Hold during a contraction',
  'contractions.release': 'Release when it eases',
  'contractions.timing': 'Timing…',
  'contractions.empty':
    "We'll start tracking as soon as you feel the first wave.",
  'contractions.col.start': 'Start',
  'contractions.col.duration': 'Duration',
  'contractions.col.gap': 'Gap',
  'contractions.summary': 'Last hour',
  'contractions.summary.count': '{n} contractions',
  'contractions.summary.avgDuration': '{n}s average',
  'contractions.summary.avgGap': 'every {n} min',
  'contractions.callTime': 'Call your midwife',
  'contractions.clear': 'Clear session',
  'contractions.511':
    'You are in the 5-1-1 pattern. Time to ring your team.',

  // Health log screen
  'health.caption': 'Health log',
  'health.title': 'A quiet record.',
  'health.intro':
    "Weight, blood pressure and glucose readings — kept private, ready when your doctor asks.",
  'health.add': 'Add a reading',
  'health.weight': 'Weight',
  'health.systolic': 'Systolic',
  'health.diastolic': 'Diastolic',
  'health.glucose': 'Glucose',
  'health.notes': 'Notes',
  'health.notesPlaceholder': 'Anything worth remembering…',
  'health.kg': 'kg',
  'health.mmHg': 'mmHg',
  'health.mgdl': 'mg/dL',
  'health.empty':
    'No readings yet. Add one after your next appointment.',
  'health.section.weight': 'Weight',
  'health.section.bp': 'Blood pressure',
  'health.section.glucose': 'Glucose',
  'health.recent': 'Recent',
  'health.unit.select': 'Reading type',
  'health.type.weight': 'Weight',
  'health.type.bp': 'Blood pressure',
  'health.type.glucose': 'Glucose',
  'health.hint.bp':
    'Sit five minutes, feet flat, arm at heart height. Take two and write down the lower.',
  'health.hint.glucose':
    'Fasting reading first thing, or two hours after a meal — note which.',
  'health.hint.weight':
    'Same time of day, same scale. Trends matter more than single numbers.',
  'health.openDoctor': 'Add to doctor summary',

  // Language picker
  'lang.title': 'Your words.',
  'lang.sub':
    'We use the system language by default. Change it here without touching iOS or Android settings.',
  'lang.footer':
    'Verdicts come back in your chosen language — translated by Claude on the way out, never machine-translated cosmetic copy.',

  // Profile / settings
  'profile.you': 'You',
  'profile.hello': 'Hello, {name}.',
  'profile.weekCountry': 'Week {week} · {country}',
  'profile.sharingCaption': 'Your circle',
  'profile.sharingTitle': 'Sharing',
  'profile.partner': 'Partner',
  'profile.partner.linked': '{name} · linked',
  'profile.partner.invite': 'Invite {name}',
  'profile.doctorPdf': 'Doctor PDF',
  'profile.doctorPdf.sub': 'Last sent · 2 weeks ago',
  'profile.subscription': 'Subscription',
  'profile.subscription.sub': '9-month plan · $49',
  'profile.settingsCaption': 'Settings',
  'profile.settingsTitle': 'Preferences',
  'profile.country': 'Country & cuisine',
  'profile.health': 'Health profile',
  'profile.health.empty': 'No conditions logged',
  'profile.notifications': 'Notifications',
  'profile.notifications.sub': 'Daily intention · weekly milestone',
  'profile.privacy': 'Privacy',
  'profile.privacy.sub': 'On-device first · nothing sold',
  'profile.appearance': 'Appearance',
  'profile.appearance.sub': 'Auto',
  'profile.language': 'Language',
  'profile.tools': 'Tools',
  'profile.toolsCaption': 'Quick tools',
  'profile.footer': 'Marigold v1.0 · made with care',
};

const tr: Dict = {
  // Tabs + general
  'tab.home': 'Ana sayfa',
  'tab.library': 'Kütüphane',
  'tab.journal': 'Günlük',
  'tab.profile': 'Profil',
  'common.save': 'Kaydet',
  'common.cancel': 'Vazgeç',
  'common.done': 'Tamam',
  'common.start': 'Başlat',
  'common.stop': 'Durdur',
  'common.reset': 'Sıfırla',
  'common.back': 'Geri',
  'common.minutes': 'dk',
  'common.seconds': 'sn',
  'common.today': 'Bugün',
  'common.yesterday': 'Dün',
  'common.empty': 'Henüz bir şey yok.',

  // Tools menu (Home)
  'tools.caption': 'Araçlar',
  'tools.title': 'Bugünün araçları',
  'tools.kicks.title': 'Tekme sayacı',
  'tools.kicks.sub': '10 hareketi say',
  'tools.contractions.title': 'Kontraksiyonlar',
  'tools.contractions.sub': 'Dalgaları ölç',
  'tools.health.title': 'Sağlık kaydı',
  'tools.health.sub': 'Kilo · tansiyon · şeker',
  'tools.all': 'Tüm araçlar',

  // Kick counter screen
  'kicks.caption': 'Tekme sayacı',
  'kicks.title': 'On hareket say.',
  'kicks.intro':
    '28. haftadan itibaren doktorlar iki saatlik bir pencerede en az on belirgin hareket sayılmasını önerir. Sakin oturun, soğuk bir şey için, hissettiğinizde dokunun.',
  'kicks.bigTap': 'Her tekmede dokun',
  'kicks.countOf': '{n} / 10',
  'kicks.elapsed': 'Geçen süre',
  'kicks.startedAt': 'Başlangıç {time}',
  'kicks.complete.title': '{minutes} dakikada on hareket.',
  'kicks.complete.body':
    'Bu beklenen aralıkta. Hareketler her zamankinden yavaşsa hemen ebenizi/ doktorunuzu arayın — beklemeyin.',
  'kicks.saveJournal': 'Günlüğe kaydet',
  'kicks.restart': 'Yeni oturum başlat',
  'kicks.recent': 'Son oturumlar',
  'kicks.session.label': '{count} tekme · {minutes} dk',
  'kicks.note':
    'Bu bir rehberdir, tanı değil. Hissettiğiniz değişikliklere güvenin.',

  // Contractions screen
  'contractions.caption': 'Kontraksiyonlar',
  'contractions.title': 'Dalgaları ölç.',
  'contractions.intro':
    'Kontraksiyon süresince basılı tutun. Süre ve önceki ile aradaki boşluk kaydedilir. Kontraksiyonlar 5 dakika aralıklı, 1 dakika süren ve 1 saat boyunca devam ediyorsa ekibinizi arayın (5-1-1).',
  'contractions.hold': 'Kontraksiyon boyunca basılı tut',
  'contractions.release': 'Geçtiğinde bırak',
  'contractions.timing': 'Ölçülüyor…',
  'contractions.empty':
    'İlk dalgayı hissettiğinde takip etmeye başlayacağız.',
  'contractions.col.start': 'Başlangıç',
  'contractions.col.duration': 'Süre',
  'contractions.col.gap': 'Ara',
  'contractions.summary': 'Son bir saat',
  'contractions.summary.count': '{n} kontraksiyon',
  'contractions.summary.avgDuration': 'ort. {n}sn',
  'contractions.summary.avgGap': 'her {n} dk',
  'contractions.callTime': 'Ebene haber ver',
  'contractions.clear': 'Oturumu temizle',
  'contractions.511':
    '5-1-1 deseninde olabilirsiniz. Ekibinizi arama zamanı.',

  // Health log screen
  'health.caption': 'Sağlık kaydı',
  'health.title': 'Sessiz bir kayıt.',
  'health.intro':
    'Kilo, tansiyon ve şeker ölçümleri — gizli tutulur, doktorun sorduğunda hazır.',
  'health.add': 'Ölçüm ekle',
  'health.weight': 'Kilo',
  'health.systolic': 'Büyük tansiyon',
  'health.diastolic': 'Küçük tansiyon',
  'health.glucose': 'Şeker',
  'health.notes': 'Notlar',
  'health.notesPlaceholder': 'Hatırlamaya değer bir şey…',
  'health.kg': 'kg',
  'health.mmHg': 'mmHg',
  'health.mgdl': 'mg/dL',
  'health.empty':
    'Henüz ölçüm yok. Bir sonraki kontrolünden sonra ekleyebilirsin.',
  'health.section.weight': 'Kilo',
  'health.section.bp': 'Tansiyon',
  'health.section.glucose': 'Şeker',
  'health.recent': 'Son ölçümler',
  'health.unit.select': 'Ölçüm türü',
  'health.type.weight': 'Kilo',
  'health.type.bp': 'Tansiyon',
  'health.type.glucose': 'Şeker',
  'health.hint.bp':
    'Beş dakika oturun, ayaklar düz, kol kalp hizasında. İki ölçüm alın ve düşük olanı yazın.',
  'health.hint.glucose':
    'Sabah aç karnına ya da yemekten iki saat sonra — hangisi olduğunu not edin.',
  'health.hint.weight':
    'Aynı saat, aynı tartı. Tek bir sayıdan çok eğilim önemlidir.',
  'health.openDoctor': 'Doktor özetine ekle',

  // Language picker
  'lang.title': 'Senin dilin.',
  'lang.sub':
    'Varsayılan olarak sistem dilini kullanırız. iOS ya da Android ayarlarına dokunmadan buradan değiştirebilirsin.',
  'lang.footer':
    'Hükümler seçtiğin dilde dönüyor — Claude tarafından çevrildi, makine çevirisi kozmetik metin yok.',

  // Profile / settings
  'profile.you': 'Sen',
  'profile.hello': 'Merhaba, {name}.',
  'profile.weekCountry': '{week}. hafta · {country}',
  'profile.sharingCaption': 'Çevren',
  'profile.sharingTitle': 'Paylaşım',
  'profile.partner': 'Partner',
  'profile.partner.linked': '{name} · bağlı',
  'profile.partner.invite': '{name} davet et',
  'profile.doctorPdf': 'Doktor PDF',
  'profile.doctorPdf.sub': 'Son gönderim · 2 hafta önce',
  'profile.subscription': 'Abonelik',
  'profile.subscription.sub': '9 ay planı · $49',
  'profile.settingsCaption': 'Ayarlar',
  'profile.settingsTitle': 'Tercihler',
  'profile.country': 'Ülke ve mutfak',
  'profile.health': 'Sağlık profili',
  'profile.health.empty': 'Kaydedilmiş durum yok',
  'profile.notifications': 'Bildirimler',
  'profile.notifications.sub': 'Günlük niyet · haftalık dönüm noktası',
  'profile.privacy': 'Gizlilik',
  'profile.privacy.sub': 'Önce cihazda · hiçbir şey satılmaz',
  'profile.appearance': 'Görünüm',
  'profile.appearance.sub': 'Otomatik',
  'profile.language': 'Dil',
  'profile.tools': 'Araçlar',
  'profile.toolsCaption': 'Hızlı araçlar',
  'profile.footer': 'Marigold v1.0 · özenle yapıldı',
};

export const TRANSLATIONS: Record<LangCode, Dict> = { en, tr };

export type TranslationKey = keyof typeof en;
