// Development-only: seeds realistic sample data for screenshots/QA via the
// deep link marigold://demo?lang=en|tr&week=20. Does nothing in release builds.

import { useEffect } from 'react';
import { View } from 'react-native';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';
import { addDays, dueDateForCurrentWeek, startOfDay, toISODate } from '@/lib/pregnancy';
import { colors } from '@/theme/colors';

export default function Demo() {
  const params = useLocalSearchParams<{ lang?: string; week?: string }>();
  if (!__DEV__) return <Redirect href="/" />;
  return <Seeder lang={params.lang === 'tr' ? 'tr' : 'en'} week={Number(params.week ?? 20)} />;
}

function Seeder({ lang, week }: { lang: 'en' | 'tr'; week: number }) {
  useEffect(() => {
    const now = Date.now();
    const day = 86_400_000;
    const today = startOfDay(new Date());
    const due = toISODate(dueDateForCurrentWeek(week, 3));
    const tr = lang === 'tr';
    const at = (d: number, h: number, m = 0) => {
      const x = addDays(today, d);
      x.setHours(h, m, 0, 0);
      return x.getTime();
    };
    useAppStore.setState({
      onboarded: true,
      language: lang,
      languageSet: true,
      lastSeenWeek: week,
      firstOpenAt: now,
      paywallNudged: true,
      profile: {
        ...useAppStore.getState().profile,
        name: tr ? 'Elif' : 'Emma',
        stage: 'pregnant',
        dueDate: due,
        week,
        babySex: 'girl',
        babyName: tr ? 'Fıstık' : 'Peanut',
        units: tr ? 'metric' : 'metric',
        lossMode: false,
        babyBornAt: null,
        prePregnancyKg: 62,
        heightCm: 168,
        careName: tr ? 'Doğumhane' : 'Maternity triage',
        carePhone: '+90 212 000 00 00',
      },
      appointments: [
        {
          id: 'demo-a1',
          kind: 'scan',
          title: tr ? 'Detaylı ultrason' : 'Anomaly scan',
          at: at(2, 10, 30),
          location: tr ? 'Şehir Hastanesi' : 'St Mary’s Hospital',
          provider: tr ? 'Dr. Yılmaz' : 'Dr. Patel',
          questions: [
            { id: 'q1', text: tr ? 'Plasenta nerede konumlanmış?' : 'Where is the placenta lying?', done: false },
            { id: 'q2', text: tr ? 'Glukoz testini ne zaman yapmalıyım?' : 'When should I do the glucose test?', done: false },
            { id: 'q3', text: tr ? 'Hangi aşıları öneriyorsunuz?' : 'Which vaccines do you recommend?', done: false },
          ],
          remind: 'both',
        },
        {
          id: 'demo-a2',
          kind: 'class',
          title: tr ? 'Doğuma hazırlık sınıfı' : 'Antenatal class',
          at: at(9, 18, 0),
          location: tr ? 'Online' : 'Community centre',
          questions: [],
          remind: '1d',
        },
      ],
      weights: [0, 7, 14, 21, 28, 35].map((d, i) => ({
        id: `demo-w${i}`,
        week: week - i,
        kg: 67.4 - i * 0.45,
        at: now - d * day,
      })),
      waterByDay: { [toISODate(today)]: 5 },
      waterGoal: 8,
      pills: [
        { id: 'demo-p1', name: tr ? 'Gebelik vitamini' : 'Prenatal vitamin', times: ['08:00'], reminders: true },
        { id: 'demo-p2', name: tr ? 'D vitamini' : 'Vitamin D', times: ['09:00'], reminders: true },
      ],
      pillLog: { [toISODate(today)]: ['demo-p1'] },
      diary: [
        {
          id: 'demo-d1',
          kind: 'note',
          at: now - 2 * 3600_000,
          week,
          mood: 5,
          text: tr
            ? 'Bugün ilk kez belirgin bir tekme hissettim! Kahvaltıdan hemen sonra, sanki merhaba dedi.'
            : 'Felt the first proper kick today! Right after breakfast — like a tiny hello.',
        },
        {
          id: 'demo-d2',
          kind: 'note',
          at: now - 3 * day,
          week: week - 1,
          mood: 4,
          text: tr
            ? 'Sevgili Fıstık, odanı sarı ve krem renge boyadık. Seni beklerken her şey daha anlamlı.'
            : 'Dear Peanut, we painted your room cream and sunshine yellow today.',
        },
      ],
      symptoms: [0, 1, 2, 3, 4, 5].map((d) => ({
        id: `demo-s${d}`,
        at: now - d * day,
        week: week - Math.floor(d / 7),
        mood: (d % 3 === 0 ? 5 : 4) as 4 | 5,
        nausea: (d > 3 ? 1 : 0) as 0 | 1,
        sleep: 4 as const,
        cramps: 0 as const,
        energy: (d % 2 === 0 ? 4 : 3) as 3 | 4,
      })),
      checklistDone: { 'book-anomaly-scan': true },
      favoriteNames: tr ? ['Defne', 'Ada', 'Zeynep'] : ['Olivia', 'Isla', 'Ava'],
      safetyRecent: ['sushi', 'paracetamol', 'turkish-coffee'],
      safetySaved: ['brie'],
    });
  }, [lang, week]);
  return <View style={{ flex: 1, backgroundColor: colors.base }}><Redirect href="/(tabs)" /></View>;
}
