// Development-only: seeds realistic sample data for screenshots/QA via the
// deep link marigold://demo?lang=en|tr|es|de|fr|pt&week=20, or wipes the app
// back to onboarding with marigold://demo?reset=1. Does nothing in release
// builds.

import { useEffect } from 'react';
import { LogBox, View } from 'react-native';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';
import { addDays, dueDateForCurrentWeek, startOfDay, toISODate } from '@/lib/pregnancy';
import { SUPPORTED_LANGS, type LangCode } from '@/i18n';
import { colors } from '@/theme/colors';

export default function Demo() {
  const params = useLocalSearchParams<{ lang?: string; week?: string; reset?: string }>();
  if (!__DEV__) return <Redirect href="/" />;
  if (params.reset) return <Resetter />;
  const lang = SUPPORTED_LANGS.some((l) => l.code === params.lang) ? (params.lang as LangCode) : 'en';
  return <Seeder lang={lang} week={Number(params.week ?? 20)} />;
}

type DemoText = {
  name: string;
  baby: string;
  care: string;
  phone: string;
  scan: string;
  hospital: string;
  doctor: string;
  q: [string, string, string];
  klass: string;
  klassWhere: string;
  vit: string;
  vitD: string;
  note1: string;
  note2: string;
  favs: string[];
  recent: string[];
};

const DEMO: Record<LangCode, DemoText> = {
  en: {
    name: 'Emma', baby: 'Peanut', care: 'Maternity triage', phone: '+44 20 0000 0000',
    scan: 'Anomaly scan', hospital: 'St Mary’s Hospital', doctor: 'Dr. Patel',
    q: ['Where is the placenta lying?', 'When should I do the glucose test?', 'Which vaccines do you recommend?'],
    klass: 'Antenatal class', klassWhere: 'Community centre', vit: 'Prenatal vitamin', vitD: 'Vitamin D',
    note1: 'Felt the first proper kick today! Right after breakfast — like a tiny hello.',
    note2: 'Dear Peanut, we painted your room cream and sunshine yellow today.',
    favs: ['Olivia', 'Isla', 'Ava'], recent: ['sushi', 'pineapple', 'paracetamol'],
  },
  tr: {
    name: 'Elif', baby: 'Fıstık', care: 'Doğumhane', phone: '+90 212 000 00 00',
    scan: 'Detaylı ultrason', hospital: 'Şehir Hastanesi', doctor: 'Dr. Yılmaz',
    q: ['Plasenta nerede konumlanmış?', 'Glukoz testini ne zaman yapmalıyım?', 'Hangi aşıları öneriyorsunuz?'],
    klass: 'Doğuma hazırlık sınıfı', klassWhere: 'Online', vit: 'Gebelik vitamini', vitD: 'D vitamini',
    note1: 'Bugün ilk kez belirgin bir tekme hissettim! Kahvaltıdan hemen sonra, sanki merhaba dedi.',
    note2: 'Sevgili Fıstık, odanı sarı ve krem renge boyadık. Seni beklerken her şey daha anlamlı.',
    favs: ['Defne', 'Ada', 'Zeynep'], recent: ['sushi', 'turkish-coffee', 'pineapple'],
  },
  es: {
    name: 'Lucía', baby: 'Garbancito', care: 'Urgencias de maternidad', phone: '+34 910 000 000',
    scan: 'Ecografía morfológica', hospital: 'Hospital La Paz', doctor: 'Dra. García',
    q: ['¿Dónde está situada la placenta?', '¿Cuándo debo hacer la prueba de glucosa?', '¿Qué vacunas me recomiendas?'],
    klass: 'Clase de preparación al parto', klassWhere: 'Centro de salud', vit: 'Vitamina prenatal', vitD: 'Vitamina D',
    note1: '¡Hoy he notado la primera patadita de verdad! Justo después de desayunar, como un pequeño hola.',
    note2: 'Querido Garbancito, hoy hemos pintado tu cuarto de color crema y amarillo sol.',
    favs: ['Lucía', 'Martina', 'Sofía'], recent: ['jamon-curado', 'pineapple', 'paracetamol'],
  },
  de: {
    name: 'Lena', baby: 'Böhnchen', care: 'Kreißsaal', phone: '+49 30 0000000',
    scan: 'Organscreening', hospital: 'Klinikum am Park', doctor: 'Dr. Schneider',
    q: ['Wo liegt die Plazenta?', 'Wann sollte ich den Zuckertest machen?', 'Welche Impfungen empfehlen Sie?'],
    klass: 'Geburtsvorbereitungskurs', klassWhere: 'Hebammenpraxis', vit: 'Schwangerschaftsvitamin', vitD: 'Vitamin D',
    note1: 'Heute den ersten richtigen Tritt gespürt! Direkt nach dem Frühstück – wie ein kleines Hallo.',
    note2: 'Liebes Böhnchen, heute haben wir dein Zimmer cremeweiß und sonnengelb gestrichen.',
    favs: ['Emilia', 'Mia', 'Ella'], recent: ['matjes', 'pineapple', 'paracetamol'],
  },
  fr: {
    name: 'Chloé', baby: 'Petit Pois', care: 'Urgences maternité', phone: '+33 1 00 00 00 00',
    scan: 'Échographie morphologique', hospital: 'Maternité des Lilas', doctor: 'Dr Martin',
    q: ['Où se situe le placenta ?', 'Quand dois-je faire le test du glucose ?', 'Quels vaccins me conseillez-vous ?'],
    klass: 'Préparation à la naissance', klassWhere: 'Cabinet de sage-femme', vit: 'Vitamine prénatale', vitD: 'Vitamine D',
    note1: "J'ai senti le premier vrai coup de pied aujourd'hui ! Juste après le petit-déjeuner, comme un petit coucou.",
    note2: "Cher Petit Pois, aujourd'hui nous avons peint ta chambre en crème et jaune soleil.",
    favs: ['Jade', 'Louise', 'Ambre'], recent: ['rillettes', 'pineapple', 'paracetamol'],
  },
  pt: {
    name: 'Ana', baby: 'Feijãozinho', care: 'Pronto-socorro obstétrico', phone: '+55 11 0000-0000',
    scan: 'Ultrassom morfológico', hospital: 'Maternidade Santa Clara', doctor: 'Dra. Souza',
    q: ['Onde está a placenta?', 'Quando devo fazer o teste de glicose?', 'Quais vacinas você recomenda?'],
    klass: 'Curso de gestantes', klassWhere: 'Unidade de saúde', vit: 'Vitamina pré-natal', vitD: 'Vitamina D',
    note1: 'Hoje senti o primeiro chutinho de verdade! Logo depois do café da manhã, como um oizinho.',
    note2: 'Querido Feijãozinho, hoje pintamos o seu quarto de creme e amarelo-sol.',
    favs: ['Helena', 'Alice', 'Laura'], recent: ['acai', 'pineapple', 'paracetamol'],
  },
};

function Seeder({ lang, week }: { lang: LangCode; week: number }) {
  useEffect(() => {
    // Keep dev warnings out of store screenshots.
    LogBox.ignoreAllLogs(true);
    const now = Date.now();
    const day = 86_400_000;
    const today = startOfDay(new Date());
    const due = toISODate(dueDateForCurrentWeek(week, 3));
    const D = DEMO[lang];
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
        name: D.name,
        stage: 'pregnant',
        dueDate: due,
        week,
        babySex: 'girl',
        babyName: D.baby,
        units: 'metric',
        lossMode: false,
        babyBornAt: null,
        prePregnancyKg: 62,
        heightCm: 168,
        careName: D.care,
        carePhone: D.phone,
      },
      appointments: [
        {
          id: 'demo-a1',
          kind: 'scan',
          title: D.scan,
          at: at(2, 10, 30),
          location: D.hospital,
          provider: D.doctor,
          questions: [
            { id: 'q1', text: D.q[0], done: false },
            { id: 'q2', text: D.q[1], done: false },
            { id: 'q3', text: D.q[2], done: false },
          ],
          remind: 'both',
        },
        {
          id: 'demo-a2',
          kind: 'class',
          title: D.klass,
          at: at(9, 18, 0),
          location: D.klassWhere,
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
        { id: 'demo-p1', name: D.vit, times: ['08:00'], reminders: true },
        { id: 'demo-p2', name: D.vitD, times: ['09:00'], reminders: true },
      ],
      pillLog: { [toISODate(today)]: ['demo-p1'] },
      diary: [
        {
          id: 'demo-d1',
          kind: 'note',
          at: now - 2 * 3600_000,
          week,
          mood: 5,
          text: D.note1,
        },
        {
          id: 'demo-d2',
          kind: 'note',
          at: now - 3 * day,
          week: week - 1,
          mood: 4,
          text: D.note2,
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
      favoriteNames: D.favs,
      safetyRecent: D.recent,
      safetySaved: ['brie'],
    });
  }, [lang, week]);
  return <View style={{ flex: 1, backgroundColor: colors.base }}><Redirect href="/(tabs)" /></View>;
}

function Resetter() {
  useEffect(() => {
    useAppStore.getState().resetAll();
    useAppStore.setState({ onboarded: false, legal: { acceptedAt: null, version: '' } });
  }, []);
  return <View style={{ flex: 1, backgroundColor: colors.base }}><Redirect href="/onboarding" /></View>;
}
