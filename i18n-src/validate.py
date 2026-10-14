#!/usr/bin/env python3
"""Check generated translations against the English sources in i18n-src/en.

Run from the repo root:  python3 i18n-src/validate.py
Exits non-zero on any structural problem (missing keys, placeholder drift,
array-length mismatch, empty strings, numbers that disappeared).
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
EN = ROOT / "i18n-src" / "en"
LANGS = ["es", "de", "fr", "pt"]
PLACEHOLDER = re.compile(r"\{\w+\}|%ld|%@|%d|%s")
NUMBER = re.compile(r"\d+")

errors: list[str] = []
warnings: list[str] = []


def load(p: Path):
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except FileNotFoundError:
        errors.append(f"missing file {p.relative_to(ROOT)}")
    except json.JSONDecodeError as e:
        errors.append(f"bad JSON {p.relative_to(ROOT)}: {e}")
    return None


def numbers(s: str) -> set[str]:
    return set(NUMBER.findall(s))


def cmp_str(where: str, en: str, tr: str, check_numbers: bool):
    if not isinstance(tr, str) or not tr.strip():
        errors.append(f"{where}: empty or not a string")
        return
    if sorted(PLACEHOLDER.findall(en)) != sorted(PLACEHOLDER.findall(tr)):
        errors.append(f"{where}: placeholders {PLACEHOLDER.findall(en)} vs {PLACEHOLDER.findall(tr)}")
    if check_numbers:
        missing = numbers(en) - numbers(tr)
        if missing:
            warnings.append(f"{where}: numbers missing {sorted(missing)}")


def cmp_list(where: str, en: list, tr, check_numbers: bool, same_len=True):
    if not isinstance(tr, list):
        errors.append(f"{where}: not a list")
        return
    if same_len and len(en) != len(tr):
        errors.append(f"{where}: length {len(en)} vs {len(tr)}")
        return
    for i, (a, b) in enumerate(zip(en, tr)):
        cmp_str(f"{where}[{i}]", a, b, check_numbers)


def cmp_records(lang: str, name: str, fields: dict[str, str]):
    """fields: field -> 'str' | 'list' | 'aliases' (free-length list)."""
    en = load(EN / f"{name}.json")
    tr = load(ROOT / "src/content/locales" / lang / f"{name}.json")
    if en is None or tr is None:
        return
    if set(en) != set(tr):
        errors.append(f"{lang}/{name}: id mismatch, missing {sorted(set(en) - set(tr))[:5]}, extra {sorted(set(tr) - set(en))[:5]}")
    for key, rec in en.items():
        t = tr.get(key)
        if not isinstance(t, dict):
            continue
        for field, kind in fields.items():
            if field not in rec and field not in t:
                continue
            where = f"{lang}/{name}/{key}.{field}"
            if field not in t:
                errors.append(f"{where}: missing")
            elif field not in rec:
                # Target-only fields (sizeTitle/sizePhrase): just need a value.
                if not isinstance(t[field], str) or not t[field].strip():
                    errors.append(f"{where}: empty")
            elif kind == "str":
                cmp_str(where, rec[field], t[field], True)
            elif kind == "list":
                cmp_list(where, rec[field], t[field], True)
            elif kind == "aliases":
                if not isinstance(t[field], list):
                    errors.append(f"{where}: aliases not a list")


for lang in LANGS:
    ui_en = load(EN / "ui.json")
    ui = load(ROOT / "src/i18n/locales" / f"{lang}.json")
    if ui_en and ui:
        if set(ui_en) != set(ui):
            errors.append(f"{lang}/ui: key mismatch, missing {sorted(set(ui_en) - set(ui))[:5]}, extra {sorted(set(ui) - set(ui_en))[:5]}")
        for k, v in ui_en.items():
            if k in ui:
                cmp_str(f"{lang}/ui/{k}", v, ui[k], False)

    cmp_records(lang, "weeks", {"baby": "str", "body": "str", "tips": "list", "todo": "list", "sizeTitle": "str", "sizePhrase": "str"})
    cmp_records(lang, "safety-1", {"name": "str", "summary": "str", "details": "str", "tips": "list", "aliases": "aliases"})
    cmp_records(lang, "safety-2", {"name": "str", "summary": "str", "details": "str", "tips": "list", "aliases": "aliases"})
    cmp_records(lang, "symptoms", {"name": "str", "about": "str", "relief": "list", "callDoctor": "list", "aliases": "aliases"})
    cmp_records(lang, "checklist", {"title": "str", "detail": "str"})
    cmp_records(lang, "redflags", {"title": "str", "detail": "str"})

    aff_en = load(EN / "affirmations.json")
    aff = load(ROOT / "src/content/locales" / lang / "affirmations.json")
    if aff_en and aff:
        cmp_list(f"{lang}/affirmations", aff_en, aff, False)

    names_en = load(EN / "names.json")
    names = load(ROOT / "src/content/locales" / lang / "names.json")
    if names_en and names:
        if set(names_en["meanings"]) != set(names.get("meanings", {})):
            errors.append(f"{lang}/names: meaning keys differ")
        if set(names_en["origins"]) - set(names.get("origins", {})):
            errors.append(f"{lang}/names: origins missing {sorted(set(names_en['origins']) - set(names.get('origins', {})))[:5]}")

    local = load(ROOT / "src/content/locales" / lang / "local-safety.json")
    if isinstance(local, list):
        for item in local:
            for f in ("id", "category", "emoji", "verdict", "name", "summary", "details", "tips", "sources"):
                if f not in item:
                    errors.append(f"{lang}/local-safety/{item.get('id')}: missing {f}")
            for f in ("name", "summary", "details"):
                for l in ("en", "tr", lang):
                    if not (item.get(f) or {}).get(l):
                        errors.append(f"{lang}/local-safety/{item.get('id')}.{f}.{l}: missing")
            if item.get("verdict") not in ("safe", "caution", "avoid"):
                errors.append(f"{lang}/local-safety/{item.get('id')}: bad verdict")
            if not item.get("sources"):
                errors.append(f"{lang}/local-safety/{item.get('id')}: no sources")

    ln = load(ROOT / "src/content/locales" / lang / "names-local.json")
    if isinstance(ln, dict):
        for a in ln.get("add", []):
            if a.get("gender") not in ("f", "m", "u") or not a.get("name") or not (a.get("meaning") or {}).get("en"):
                errors.append(f"{lang}/names-local: bad entry {a.get('name')}")

for w in warnings:
    print("warn:", w)
for e in errors:
    print("ERROR:", e)
print(f"\n{len(errors)} errors, {len(warnings)} warnings")
sys.exit(1 if errors else 0)
