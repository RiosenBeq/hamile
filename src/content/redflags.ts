// "When to get help now" — always-visible emergency warning signs.
//
// Based on the NHS "Pregnancy symptoms you need to get help for" guidance,
// CDC Hear Her urgent maternal warning signs, and RCOG patient information.
// Text never hard-codes a phone number; the screen pairs "emergency services"
// with the user's local number from EMERGENCY_NUMBERS.

import type { L10n } from './types';

export const RED_FLAGS: { id: string; emoji: string; title: L10n; detail: L10n }[] = [
  {
    id: 'heavy-bleeding',
    emoji: '🩸',
    title: { en: 'Heavy bleeding from your vagina', tr: 'Vajinadan yoğun kanama' },
    detail: {
      en: 'Bleeding that soaks a pad soon after you put it on, or comes with clots, severe pain, dizziness or fainting. Call emergency services.',
      tr: 'Taktıktan kısa süre sonra pedi dolduran ya da pıhtı, şiddetli ağrı, baş dönmesi veya bayılmayla gelen kanama. Acil yardım hattını ara.',
    },
  },
  {
    id: 'severe-tummy-pain',
    emoji: '😖',
    title: { en: 'Severe or constant tummy pain', tr: 'Şiddetli ya da geçmeyen karın ağrısı' },
    detail: {
      en: 'Strong pain that doesn\'t ease with rest, especially with bleeding, a hard tummy, shoulder-tip pain or feeling faint. Call your maternity unit or emergency services now.',
      tr: 'Dinlenmekle geçmeyen güçlü ağrı; özellikle kanama, sert bir karın, omuz ucu ağrısı ya da bayılma hissiyle birlikteyse. Hemen doğum servisini ya da acil yardım hattını ara.',
    },
  },
  {
    id: 'pre-eclampsia-signs',
    emoji: '👁️',
    title: { en: 'Severe headache, vision changes or sudden swelling', tr: 'Şiddetli baş ağrısı, görme değişikliği ya da ani şişlik' },
    detail: {
      en: 'A headache that won\'t go away, blurred vision or flashing lights, pain under your ribs, or sudden swelling of your face, hands or feet. These can be signs of pre-eclampsia: call your maternity unit or doctor now.',
      tr: 'Geçmeyen baş ağrısı, bulanık görme ya da ışık çakmaları, kaburga altında ağrı veya yüzde, ellerde ya da ayaklarda ani şişlik. Bunlar preeklampsi belirtisi olabilir: hemen doktorunu ya da doğum servisini ara.',
    },
  },
  {
    id: 'reduced-movements',
    emoji: '👣',
    title: { en: 'Baby moving less, or not at all', tr: 'Bebeğin daha az hareket etmesi ya da hiç hareket etmemesi' },
    detail: {
      en: 'Any change to your baby\'s usual pattern of movements. Call your maternity unit immediately, even at night. Don\'t wait until tomorrow, and don\'t rely on a home heartbeat monitor.',
      tr: 'Bebeğinin alışılmış hareket düzeninde herhangi bir değişiklik. Gece bile olsa hemen doğum servisini ara. Yarını bekleme ve evde kalp sesi dinleme cihazına güvenme.',
    },
  },
  {
    id: 'waters-before-37-weeks',
    emoji: '🌊',
    title: { en: 'Waters breaking or contractions before 37 weeks', tr: '37. haftadan önce su gelmesi ya da kasılmalar' },
    detail: {
      en: 'A gush or trickle of fluid, or regular tightenings or period-like pains before 37 weeks. Wear a pad, not a tampon, and call your maternity unit now.',
      tr: '37. haftadan önce ani ya da sızıntı şeklinde sıvı gelmesi, düzenli kasılmalar veya adet sancısı gibi ağrılar. Tampon değil ped kullan ve hemen doğum servisini ara.',
    },
  },
  {
    id: 'fever',
    emoji: '🌡️',
    title: { en: 'Fever of 38°C (100.4°F) or higher', tr: '38°C ya da üzerinde ateş' },
    detail: {
      en: 'Feeling hot, shivery and very unwell counts too. Infections need quick treatment in pregnancy, so call your doctor or maternity unit today.',
      tr: 'Kendini sıcak, titrek ve çok hasta hissetmen de buna dahil. Gebelikte enfeksiyonlar hızlı tedavi gerektirir; bugün doktorunu ya da doğum servisini ara.',
    },
  },
  {
    id: 'breathlessness-chest-pain',
    emoji: '🫁',
    title: { en: 'Sudden breathlessness or chest pain', tr: 'Ani nefes darlığı ya da göğüs ağrısı' },
    detail: {
      en: 'Struggling to breathe, chest pain or tightness, coughing up blood, or a racing heart with faintness. Call emergency services.',
      tr: 'Nefes almakta zorlanma, göğüste ağrı ya da sıkışma, kanlı öksürük veya bayılma hissiyle birlikte hızlı kalp atışı. Acil yardım hattını ara.',
    },
  },
  {
    id: 'swollen-calf',
    emoji: '🦵',
    title: { en: 'Painful, swollen leg on one side', tr: 'Tek bacakta ağrı ve şişlik' },
    detail: {
      en: 'Throbbing pain, swelling, warmth or redness in one calf or thigh can be a blood clot. Get seen the same day, or call emergency services if you\'re also breathless.',
      tr: 'Tek baldırda ya da uylukta zonklayan ağrı, şişlik, sıcaklık veya kızarıklık pıhtı olabilir. Aynı gün muayene ol; nefes darlığın da varsa acil yardım hattını ara.',
    },
  },
  {
    id: 'fainting',
    emoji: '💫',
    title: { en: 'Fainting, collapse or a seizure', tr: 'Bayılma, yığılma ya da nöbet' },
    detail: {
      en: 'Passing out, having a fit, or feeling so dizzy you can\'t stand, especially with pain or bleeding. Call emergency services.',
      tr: 'Bayılma, nöbet geçirme ya da özellikle ağrı veya kanamayla birlikte ayakta duramayacak kadar baş dönmesi. Acil yardım hattını ara.',
    },
  },
  {
    id: 'intense-itching',
    emoji: '🤲',
    title: { en: 'Intense itching, especially of hands and feet', tr: 'Özellikle el ve ayaklarda yoğun kaşıntı' },
    detail: {
      en: 'Itching on your palms or soles, often worse at night and without a rash, can be a liver condition called ICP. Call your maternity unit or doctor today for a blood test.',
      tr: 'Avuç içlerinde ya da ayak tabanlarında, çoğu zaman geceleri artan ve döküntüsüz kaşıntı, gebelik kolestazı denen bir karaciğer sorunu olabilir. Kan tahlili için bugün doktorunu ya da doğum servisini ara.',
    },
  },
  {
    id: 'thoughts-of-harm',
    emoji: '🫂',
    title: { en: 'Thoughts of harming yourself or your baby', tr: 'Kendine ya da bebeğine zarar verme düşünceleri' },
    detail: {
      en: 'You\'re not alone, and it isn\'t your fault. Tell someone near you, and call emergency services or a crisis line now if you feel unsafe.',
      tr: 'Yalnız değilsin ve bu senin suçun değil. Yakınındaki birine söyle; kendini güvende hissetmiyorsan hemen acil yardım hattını ya da bir kriz hattını ara.',
    },
  },
  {
    id: 'severe-vomiting',
    emoji: '🤮',
    title: { en: 'Vomiting and can\'t keep fluids down', tr: 'Kusma ve sıvıları midende tutamama' },
    detail: {
      en: 'Being sick so much you can\'t keep food or fluids down for 24 hours, very dark pee, not peeing for 8 hours, or feeling faint. You may need fluids: call your doctor now.',
      tr: '24 saat boyunca yiyecek ya da sıvıyı midende tutamayacak kadar kusma, çok koyu idrar, 8 saattir idrara çıkmama ya da bayılacak gibi olma. Sıvı tedavisi gerekebilir: hemen doktorunu ara.',
    },
  },
];

/**
 * Emergency numbers by ISO 3166-1 alpha-2 country code: one dialable number
 * for a medical emergency each. Where a country has a dedicated ambulance
 * line we show that (FR 15 SAMU, AT/CH 144, NO 113, BR 192 SAMU, AR 107,
 * CL 131, PE 106, AZ 103); 112 also works from any mobile phone in Europe.
 */
export const EMERGENCY_NUMBERS: Record<string, { country: L10n; number: string }> = {
  TR: { country: { en: 'Türkiye', tr: 'Türkiye', es: 'Turquía', de: 'Türkei', fr: 'Turquie', pt: 'Turquia' }, number: '112' },
  US: { country: { en: 'United States', tr: 'Amerika Birleşik Devletleri', es: 'Estados Unidos', de: 'Vereinigte Staaten', fr: 'États-Unis', pt: 'Estados Unidos' }, number: '911' },
  GB: { country: { en: 'United Kingdom', tr: 'Birleşik Krallık', es: 'Reino Unido', de: 'Vereinigtes Königreich', fr: 'Royaume-Uni', pt: 'Reino Unido' }, number: '999' },
  IE: { country: { en: 'Ireland', tr: 'İrlanda', es: 'Irlanda', de: 'Irland', fr: 'Irlande', pt: 'Irlanda' }, number: '112' },
  CA: { country: { en: 'Canada', tr: 'Kanada', es: 'Canadá', de: 'Kanada', fr: 'Canada', pt: 'Canadá' }, number: '911' },
  AU: { country: { en: 'Australia', tr: 'Avustralya', es: 'Australia', de: 'Australien', fr: 'Australie', pt: 'Austrália' }, number: '000' },
  NZ: { country: { en: 'New Zealand', tr: 'Yeni Zelanda', es: 'Nueva Zelanda', de: 'Neuseeland', fr: 'Nouvelle-Zélande', pt: 'Nova Zelândia' }, number: '111' },
  DE: { country: { en: 'Germany', tr: 'Almanya', es: 'Alemania', de: 'Deutschland', fr: 'Allemagne', pt: 'Alemanha' }, number: '112' },
  AT: { country: { en: 'Austria', tr: 'Avusturya', es: 'Austria', de: 'Österreich', fr: 'Autriche', pt: 'Áustria' }, number: '144' },
  CH: { country: { en: 'Switzerland', tr: 'İsviçre', es: 'Suiza', de: 'Schweiz', fr: 'Suisse', pt: 'Suíça' }, number: '144' },
  FR: { country: { en: 'France', tr: 'Fransa', es: 'Francia', de: 'Frankreich', fr: 'France', pt: 'França' }, number: '15' },
  BE: { country: { en: 'Belgium', tr: 'Belçika', es: 'Bélgica', de: 'Belgien', fr: 'Belgique', pt: 'Bélgica' }, number: '112' },
  LU: { country: { en: 'Luxembourg', tr: 'Lüksemburg', es: 'Luxemburgo', de: 'Luxemburg', fr: 'Luxembourg', pt: 'Luxemburgo' }, number: '112' },
  NL: { country: { en: 'Netherlands', tr: 'Hollanda', es: 'Países Bajos', de: 'Niederlande', fr: 'Pays-Bas', pt: 'Países Baixos' }, number: '112' },
  ES: { country: { en: 'Spain', tr: 'İspanya', es: 'España', de: 'Spanien', fr: 'Espagne', pt: 'Espanha' }, number: '112' },
  PT: { country: { en: 'Portugal', tr: 'Portekiz', es: 'Portugal', de: 'Portugal', fr: 'Portugal', pt: 'Portugal' }, number: '112' },
  IT: { country: { en: 'Italy', tr: 'İtalya', es: 'Italia', de: 'Italien', fr: 'Italie', pt: 'Itália' }, number: '112' },
  SE: { country: { en: 'Sweden', tr: 'İsveç', es: 'Suecia', de: 'Schweden', fr: 'Suède', pt: 'Suécia' }, number: '112' },
  NO: { country: { en: 'Norway', tr: 'Norveç', es: 'Noruega', de: 'Norwegen', fr: 'Norvège', pt: 'Noruega' }, number: '113' },
  DK: { country: { en: 'Denmark', tr: 'Danimarka', es: 'Dinamarca', de: 'Dänemark', fr: 'Danemark', pt: 'Dinamarca' }, number: '112' },
  FI: { country: { en: 'Finland', tr: 'Finlandiya', es: 'Finlandia', de: 'Finnland', fr: 'Finlande', pt: 'Finlândia' }, number: '112' },
  PL: { country: { en: 'Poland', tr: 'Polonya', es: 'Polonia', de: 'Polen', fr: 'Pologne', pt: 'Polônia' }, number: '112' },
  GR: { country: { en: 'Greece', tr: 'Yunanistan', es: 'Grecia', de: 'Griechenland', fr: 'Grèce', pt: 'Grécia' }, number: '112' },
  CY: { country: { en: 'Cyprus', tr: 'Kıbrıs', es: 'Chipre', de: 'Zypern', fr: 'Chypre', pt: 'Chipre' }, number: '112' },
  AZ: { country: { en: 'Azerbaijan', tr: 'Azerbaycan', es: 'Azerbaiyán', de: 'Aserbaidschan', fr: 'Azerbaïdjan', pt: 'Azerbaijão' }, number: '103' },
  MX: { country: { en: 'Mexico', tr: 'Meksika', es: 'México', de: 'Mexiko', fr: 'Mexique', pt: 'México' }, number: '911' },
  AR: { country: { en: 'Argentina', tr: 'Arjantin', es: 'Argentina', de: 'Argentinien', fr: 'Argentine', pt: 'Argentina' }, number: '107' },
  CO: { country: { en: 'Colombia', tr: 'Kolombiya', es: 'Colombia', de: 'Kolumbien', fr: 'Colombie', pt: 'Colômbia' }, number: '123' },
  CL: { country: { en: 'Chile', tr: 'Şili', es: 'Chile', de: 'Chile', fr: 'Chili', pt: 'Chile' }, number: '131' },
  PE: { country: { en: 'Peru', tr: 'Peru', es: 'Perú', de: 'Peru', fr: 'Pérou', pt: 'Peru' }, number: '106' },
  EC: { country: { en: 'Ecuador', tr: 'Ekvador', es: 'Ecuador', de: 'Ecuador', fr: 'Équateur', pt: 'Equador' }, number: '911' },
  UY: { country: { en: 'Uruguay', tr: 'Uruguay', es: 'Uruguay', de: 'Uruguay', fr: 'Uruguay', pt: 'Uruguai' }, number: '911' },
  VE: { country: { en: 'Venezuela', tr: 'Venezuela', es: 'Venezuela', de: 'Venezuela', fr: 'Venezuela', pt: 'Venezuela' }, number: '911' },
  CR: { country: { en: 'Costa Rica', tr: 'Kosta Rika', es: 'Costa Rica', de: 'Costa Rica', fr: 'Costa Rica', pt: 'Costa Rica' }, number: '911' },
  DO: { country: { en: 'Dominican Republic', tr: 'Dominik Cumhuriyeti', es: 'República Dominicana', de: 'Dominikanische Republik', fr: 'République dominicaine', pt: 'República Dominicana' }, number: '911' },
  BR: { country: { en: 'Brazil', tr: 'Brezilya', es: 'Brasil', de: 'Brasilien', fr: 'Brésil', pt: 'Brasil' }, number: '192' },
};
