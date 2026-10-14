#!/usr/bin/env python3
"""Collect the App Store listing per locale from store/metadata*.md into
store/listing.json (used when filling App Store Connect)."""
import json
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
SITE = "https://babybloom.kids/marigold"
FIELDS = (("name", "Name"), ("subtitle", "Subtitle"), ("promo", "Promotional text"), ("keywords", "Keywords"), ("description", "Description"))


def grab(text: str, label: str):
    m = re.search(r"\*\*" + re.escape(label) + r"[^*]*\*\*\s*(.*?)(?=\n\*\*|\n## |\n---|\Z)", text, re.S)
    return m.group(1).strip() if m else None


def section(text: str, header: str) -> str:
    i = text.index(header)
    j = text.find("\n## ", i + 3)
    return text[i : j if j > 0 else None]


main = (HERE / "metadata.md").read_text()
out = {}
for loc, header in (("en-US", "## English (U.S.)"), ("tr", "## Turkish")):
    sec = section(main, header)
    out[loc] = {k: grab(sec, label) for k, label in FIELDS}
for lang, locales in (("es", ["es-ES", "es-MX"]), ("de", ["de-DE"]), ("fr", ["fr-FR", "fr-CA"]), ("pt", ["pt-BR"])):
    text = (HERE / f"metadata.{lang}.md").read_text()
    rec = {k: grab(text, label) for k, label in FIELDS}
    for loc in locales:
        out[loc] = dict(rec)

folder = {"en-US": "", "tr": "tr/", "es-ES": "es/", "es-MX": "es/", "de-DE": "de/", "fr-FR": "fr/", "fr-CA": "fr/", "pt-BR": "pt/"}
problems = []
for loc, r in out.items():
    f = folder[loc]
    r["privacyUrl"] = f"{SITE}/{f}privacy"
    r["supportUrl"] = f"{SITE}/{f}support"
    r["marketingUrl"] = f"{SITE}/{f.rstrip('/')}" if f else SITE
    limits = {"name": 30, "subtitle": 30, "promo": 170, "description": 4000}
    for k, lim in limits.items():
        if not r.get(k) or len(r[k]) > lim:
            problems.append(f"{loc}.{k} length {len(r.get(k) or '')}/{lim}")
    if not r.get("keywords") or len(r["keywords"].encode()) > 100:
        problems.append(f"{loc}.keywords bytes {len((r.get('keywords') or '').encode())}/100")

(HERE / "listing.json").write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n")
print("\n".join(problems) or f"ok — {len(out)} locales")
