# Marigold translation brief

Marigold is an offline iOS pregnancy companion (week-by-week, "Can I…?" safety
library, symptom guide, tools, journal). Source language is English
(`i18n-src/en/*.json`). Turkish already exists in the codebase and is not part
of this job.

## Target languages and voice

| code | market | address | clinician words |
|---|---|---|---|
| `es` | Spain + Latin America + US Hispanics (neutral Spanish, no regional slang) | **tú** | "tu médico o tu matrona", "ginecólogo/a", "profesional sanitario" |
| `de` | Germany, Austria, Switzerland | **du** | "deine Hebamme", "deine Frauenärztin / dein Frauenarzt", "Ärztin oder Arzt" |
| `fr` | France, Belgium, Switzerland, Canada | **tu** | "ta sage-femme", "ton médecin", "ton/ta gynécologue" |
| `pt` | Brazil (pt-BR) | **você** | "seu médico ou sua obstetra", "profissional de saúde", "enfermeira obstétrica" |

Tone: warm, calm, plain-language, never alarmist and never toxic-positive.
Gender-inclusive where natural (the user is pregnant; a partner can be any
gender). Keep it short — UI labels must stay about as short as the English
(buttons, tabs, chips).

## Hard rules (medical safety + legal)

1. **Translate faithfully. Do not add, remove or strengthen medical claims.**
   Keep every hedge ("usually", "generally", "talk to your midwife"), every
   number, unit and limit (200 mg caffeine, 400 micrograms folic acid, weeks).
2. Never invent doses. Never tell anyone to stop a prescribed medicine.
3. Keep the meaning of verdicts: safe / caution / avoid.
4. Red-flag / "call your doctor" text must stay just as urgent and explicit.
5. Do **not** translate source names or URLs (they are English pages).
6. Keep placeholders exactly: `{name}`, `{n}`, `{item}`, `{emoji}`, `%ld`, `%@`
   etc. must appear in the translation unchanged (you may move them).
7. Keep JSON keys and structure identical; arrays keep the same length and
   order. Every value must be a non-empty string in the target language.
8. Brand names stay as-is: "Marigold", "Marigold Plus", "Pregnancy Pass"
   (you may write "Pregnancy Pass" as is — it is the product name).
9. Where English says "999/911/112" literally, keep it — the app shows the
   right local number elsewhere. Where English mentions a UK/US-only service
   by name (NHS 111…), translate generically ("your local health line")
   ONLY in UI text, never in medical content sources.
10. Use correct typography for the language (French non-breaking space before
    `? ! : ;` is NOT needed — use a normal space; German „…“ quotes are fine
    but plain quotes are OK; Spanish ¿…? and ¡…!).

## Baby size phrases (weeks.json)

The app shows `today.sizeOf` with `{item}` = the size phrase, and a heading
with the bare noun. For every week produce BOTH:

- `sizeTitle` — capitalised noun, no article ("Mazorca de maíz", "Maiskolben", "Épi de maïs", "Espiga de milho")
- `sizePhrase` — the exact words that fit into the language's `today.sizeOf` template below

| lang | `today.sizeOf` (use exactly this) | example `sizePhrase` |
|---|---|---|
| es | `Tu bebé tiene más o menos el tamaño de {item}` | `una mazorca de maíz` |
| de | `Dein Baby ist etwa so groß wie {item}` | `ein Maiskolben` |
| fr | `Ton bébé a à peu près la taille {item}` | `d'un épi de maïs` (include de/d'/du/de la/des) |
| pt | `Seu bebê tem mais ou menos o tamanho de {item}` | `uma espiga de milho` |

The same `{item}` also appears in `notif.week.body` and `pt.msg.size` — word
those UI strings so the same phrase fits (e.g. fr `… la taille {item}`).

## Output locations

- UI: `src/i18n/locales/<lang>.json` (same keys as `i18n-src/en/ui.json`)
- Content: `src/content/locales/<lang>/<file>.json` with the same file names
  as `i18n-src/en/` (weeks.json, safety-1.json, …) and these shapes:
  - weeks: `{ "<week>": { "sizeTitle", "sizePhrase", "baby", "body", "tips": [], "todo": [] } }`
  - safety-*: `{ "<id>": { "name", "aliases": [], "summary", "details", "tips": [] } }`
    (drop `category`/`verdict`; aliases = search terms people in that market
    actually type: local names, brand names, common misspellings — 0-6 items)
  - symptoms: `{ "<id>": { "name", "aliases": [], "about", "relief": [], "callDoctor": [] } }`
  - checklist: `{ "<id>": { "title", "detail"? } }`
  - redflags: `{ "<id>": { "title", "detail" } }`
  - affirmations: `[ "…", … ]` (same length; each ≤ 90 characters)
  - names: `{ "origins": { "<English origin>": "<translated>" }, "meanings": { "<Name>": "<meaning>" } }`
  - misc: same shape as en

Write valid UTF-8 JSON (2-space indent). Validate each file with
`python3 -c "import json,sys; json.load(open(sys.argv[1]))" <file>` before you
finish. Work in chunks if a file is long (write part files, then merge them
with a small python script) — but the final file must be complete.
