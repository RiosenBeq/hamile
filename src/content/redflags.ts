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
 * Emergency numbers by ISO 3166-1 alpha-2 country code. One dialable number
 * each (112 also works across the EU and from most mobile phones).
 */
export const EMERGENCY_NUMBERS: Record<string, { country: L10n; number: string }> = {
  TR: { country: { en: 'Türkiye', tr: 'Türkiye' }, number: '112' },
  US: { country: { en: 'United States', tr: 'Amerika Birleşik Devletleri' }, number: '911' },
  GB: { country: { en: 'United Kingdom', tr: 'Birleşik Krallık' }, number: '999' },
  DE: { country: { en: 'Germany', tr: 'Almanya' }, number: '112' },
  FR: { country: { en: 'France', tr: 'Fransa' }, number: '112' },
  NL: { country: { en: 'Netherlands', tr: 'Hollanda' }, number: '112' },
  ES: { country: { en: 'Spain', tr: 'İspanya' }, number: '112' },
  IT: { country: { en: 'Italy', tr: 'İtalya' }, number: '112' },
  AU: { country: { en: 'Australia', tr: 'Avustralya' }, number: '000' },
  CA: { country: { en: 'Canada', tr: 'Kanada' }, number: '911' },
  IE: { country: { en: 'Ireland', tr: 'İrlanda' }, number: '112' },
  SE: { country: { en: 'Sweden', tr: 'İsveç' }, number: '112' },
};
