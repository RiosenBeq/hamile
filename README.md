# Marigold — Pregnancy Safety Companion

A calm, evidence-based pregnancy companion. Scan a label, a menu or describe an
activity and get a warm, second-opinion verdict in seconds. Tracks your week,
keeps a private journal, and exports a doctor-ready PDF.

This repo is a faithful React Native (Expo) port of the
[Marigold design bundle](./design-source/) — same palette, typography, motion
and screens — packaged so it ships to **both the iOS App Store and Google
Play** from a single codebase.

> Tap to scan · hold for help.

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Runtime | **Expo SDK 51** + React Native 0.74 | One codebase → iOS + Android (+ web preview) |
| Routing | **expo-router** | File-based routing with native modal presentation |
| Styling | Design tokens in `src/theme/` (colors, typography, spacing) | Single source of truth, no global CSS layer |
| Motion | **react-native-reanimated 3** + `expo-blur` | Spring verdict reveal, scan-line sweep, drift |
| Icons | Custom 1.5px-stroke SVG set in `src/components/Icon.tsx` | Never SF defaults; matches design exactly |
| Camera | **expo-camera** | Real viewfinder for Quick Scan |
| AI | **Anthropic Claude (Haiku 4.5)** via Supabase Edge Function | Server-side key, fallback bank for offline |
| Backend | **Supabase** (Postgres + Auth + Edge Functions) | Optional — app is offline-first |
| Storage | `@react-native-async-storage/async-storage` + `zustand/persist` | Always works, even with no network |
| PDF | `expo-print` + `expo-sharing` | One-tap doctor summary |
| Build | **EAS Build** + **EAS Submit** | TestFlight + Play Store internal track |

## Screens

| Route | Purpose |
| --- | --- |
| `/onboarding` | 5-step flow: stage, due week, conditions, country |
| `/(tabs)` (Home) | Week ring, today's intention, recent checks, reminders, doctor nudge |
| `/(tabs)/library` | Search with rotating placeholder, browse-by-category, trending |
| `/(tabs)/journal` | Verdict-filterable, week-grouped log + PDF export |
| `/(tabs)/profile` | Sharing, settings, privacy footer |
| `/scan` | Live camera + 5 modes (Food / Menu / Medication / Cosmetic / Activity) |
| `/verdict` | AI verdict — pill, illustration, headline, body, action card, sources |
| `/menu-mode` | "We read the menu." — 10 dishes with verdict dots and a tally |
| `/activity` | Trimester-aware activity check, searchable |
| `/baby` | Week-fruit metaphor, length / weight / heart rate cards |
| `/emergency` | Two-step calm flow: describe → grounded next steps |
| `/pdf` | Doctor summary, exports as real PDF via `expo-print` |
| `/partner` | QR-code invite + "what they will see" privacy list |
| `/paywall` | 9-month / monthly / family plans |

## Quickstart

```bash
# 1. Install
npm install

# 2. Configure (optional — without env vars the app runs offline)
cp .env.example .env
# Fill in EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY

# 3. Run on a device
npx expo start --tunnel
# Press `i` for iOS simulator, `a` for Android emulator, or scan the QR
# code with Expo Go on your phone.
```

The app is **fully usable with no backend wired up** — journals persist via
AsyncStorage and verdicts come from the local bank. Wire up Supabase + the
edge function when you want sync and live AI verdicts.

## Backend

```bash
# 1. Create a Supabase project, then
supabase link --project-ref <your-project-ref>

# 2. Apply the schema
supabase db push

# 3. Deploy the verdict edge function (set ANTHROPIC_API_KEY first)
supabase functions secrets set ANTHROPIC_API_KEY=sk-ant-...
supabase functions deploy verdict
```

The schema (`supabase/migrations/20260507000000_init.sql`) sets up:
`profiles`, `journal_entries`, `partner_links`, `reminders`, all with row-level
security so users only ever see their own data. The trigger on `auth.users`
auto-creates a `profile` row on sign-up.

## Building for the stores

EAS handles both stores from one workflow:

```bash
# iOS — first build
eas build --platform ios --profile production
eas submit --platform ios   # sends the latest build to TestFlight

# Android — first build
eas build --platform android --profile production
eas submit --platform android   # uploads .aab to the internal track on Google Play
```

Before the first run:

1. `eas init` — links the project to your Expo org and writes the projectId into `app.json`.
2. iOS: set `appleId`, `ascAppId`, `appleTeamId` in `eas.json`. EAS handles certs and provisioning.
3. Android: place a Google Play **service account** JSON at `.secrets/play-service-account.json`. Don't commit it — `.gitignore` already excludes `.secrets/`.

The Android build is configured as an `app-bundle` (`.aab`) so Play Store
delivers an optimised split per device. The iOS build is App Store ready,
including the Camera + Microphone usage strings the App Review team requires.

## Design fidelity

Mapped 1:1 from the prototype in `design-source/ios-uygulama/project/`:

- **Palette** — `src/theme/colors.ts` mirrors the Tailwind config
  (cream `#FBF7F2`, terracotta `#C77B5C`, sage / amber / coral verdicts,
  lavender milestones).
- **Typography** — Source Serif 4 (display) + Manrope (UI) loaded via
  `@expo-google-fonts`.
- **Verdicts** — color **and** icon **and** label, never colour alone, sizes
  `sm` / `md` / `lg`.
- **Watercolor blobs** — radial-gradient SVG composited in `Blob.tsx`. No
  bitmaps, no cartoons.
- **Motion** — spring verdict reveal, scan-line sweep, week count-up, week
  ring sweep, drift on empty-state, soft pulse for thinking, shimmer for
  loading.
- **Accessibility** — 44×44 hit targets, `prefers-reduced-motion` honored
  by reanimated, body text ≥ 15pt, color+icon+label verdicts.

## Things this build adds beyond the prototype

The design is the spec; we kept everything you saw in the mocks. We also
included a few small upgrades that made sense once the prototype became a
shippable app:

- **Real camera** with permission fallback (faux viewfinder if denied).
- **Real PDF export** via `expo-print` (the prototype just rendered the page).
- **Local-first** journal that syncs to Supabase when configured.
- **Anthropic Claude Haiku 4.5** verdict route so the experience is genuinely
  helpful past the demo bank.
- **Haptics** on tab switch, scan press and emergency long-press.
- **Deep link** for partner invites (`marigold.app/j/<token>`).
- **Trimester-aware** week metaphors (`src/data/sample.ts → WEEK_METAPHORS`).

## Repository layout

```
app/                    Expo Router tree (tabs + modals)
  (tabs)/               Home, Library, Journal, Profile
  scan.tsx              Quick Scan (camera)
  verdict.tsx           AI verdict modal
  menu-mode.tsx         Restaurant menu read
  activity.tsx          Activity check
  emergency.tsx         Calm two-step help flow
  baby.tsx              Week fruit metaphor sheet
  pdf.tsx               Doctor summary + PDF export
  partner.tsx           QR invite + privacy explainer
  paywall.tsx           Plans
  onboarding.tsx        5-step setup
src/
  theme/                Colours + typography tokens
  components/           Icon set, Card, Btn, Verdict, WeekRing, Drift, etc.
  data/                 Sample data + verdict bank + activity catalog
  store/                Zustand store with AsyncStorage persistence
  lib/                  Supabase client, AI route, sync glue
supabase/
  migrations/           Initial schema with RLS
  functions/verdict/    Edge function that calls Claude Haiku 4.5
assets/                 Placeholder marigold icon, splash, adaptive-icon, favicon
```

## License

Internal/private — adjust as needed before publishing.
