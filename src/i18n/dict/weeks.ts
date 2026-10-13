// Week-by-week tab.

const en = {
  'weeks.title': 'Week by week',
  'weeks.eyebrow': 'Your pregnancy',
  'weeks.early': 'Your journey is just beginning.',
  'weeks.baby': 'Your baby',
  'weeks.body': 'Your body',
  'weeks.tips': 'Tips for this week',
  'weeks.todo': 'To-do',
  'weeks.openChecklist': 'Open your checklist',
};

type Keys = keyof typeof en;

const tr: Record<Keys, string> = {
  'weeks.title': 'Hafta hafta',
  'weeks.eyebrow': 'Hamileliğin',
  'weeks.early': 'Yolculuğun daha yeni başlıyor.',
  'weeks.baby': 'Bebeğin',
  'weeks.body': 'Vücudun',
  'weeks.tips': 'Bu haftanın ipuçları',
  'weeks.todo': 'Yapılacaklar',
  'weeks.openChecklist': 'Yapılacaklar listeni aç',
};

export default { en, tr };
