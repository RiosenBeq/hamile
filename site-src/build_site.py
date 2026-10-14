#!/usr/bin/env python3
"""Build Marigold's website.

    python3 site-src/build_site.py                 # landing pages + web images into docs/
    python3 site-src/build_site.py --export DIR    # also export docs/ for babybloom.kids/marigold

docs/ is the canonical site (also served by GitHub Pages). The export copies
it into another site's static folder (e.g. babybloomsite/public/marigold) and
rewrites every relative link to an absolute, extension-less path under
/marigold, because that host uses clean URLs without trailing slashes.
"""
import html
import json
import re
import shutil
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
COPY = ROOT / "site-src" / "landing"
SHOTS = ROOT / "design" / "screenshots"
LANGS = ["en", "tr", "es", "de", "fr", "pt"]
LANG_NAMES = {"en": "English", "tr": "Türkçe", "es": "Español", "de": "Deutsch", "fr": "Français", "pt": "Português"}
HTML_LANG = {"en": "en", "tr": "tr", "es": "es", "de": "de", "fr": "fr", "pt": "pt-BR"}
APP_STORE = "https://apps.apple.com/app/id6822443743"
PUBLIC_BASE = "https://babybloom.kids/marigold"
FEATURE_ICONS = ["🌱", "🛡️", "🩺", "⏱️", "📔", "🌍"]
GALLERY = ["02-weeks", "03-check", "04-detail", "05-tools", "06-journal"]


def web_images(lang: str) -> bool:
    """Write docs/img/<lang>/*.jpg from the screenshot renders. Returns False if renders are missing."""
    out = DOCS / "img" / lang
    raw = SHOTS / "raw" / lang / "01-today.png"
    if not raw.exists():
        return False
    out.mkdir(parents=True, exist_ok=True)
    hero = Image.open(raw).convert("RGB")
    hero.resize((600, round(hero.height * 600 / hero.width)), Image.LANCZOS).save(out / "hero.jpg", quality=82, optimize=True, progressive=True)
    for name in GALLERY:
        src = SHOTS / "out" / lang / f"{name}.png"
        if src.exists():
            im = Image.open(src).convert("RGB")
            im.resize((480, round(im.height * 480 / im.width)), Image.LANCZOS).save(out / f"{name}.jpg", quality=80, optimize=True, progressive=True)
    return True


def page(lang: str, t: dict) -> str:
    e = {k: html.escape(v) for k, v in t.items()}
    root = "" if lang == "en" else "../"
    here = "" if lang == "en" else f"{lang}/"
    langs = " · ".join(
        f"<strong>{LANG_NAMES[l]}</strong>" if l == lang else f'<a href="{root}{"" if l == "en" else l + "/"}index.html">{LANG_NAMES[l]}</a>'
        for l in LANGS
    )
    feats = "\n".join(
        f'      <div class="feature"><div class="ficon">{FEATURE_ICONS[i]}</div><h3>{e[f"f{i + 1}t"]}</h3><p>{e[f"f{i + 1}b"]}</p></div>'
        for i in range(6)
    )
    shots = "\n".join(f'      <img src="img/{lang}/{n}.jpg" alt="{e["shotAlt"]}" loading="lazy" width="480" height="1043">'.replace('src="img/', f'src="{root}img/') for n in GALLERY)
    return f"""<!doctype html>
<html lang="{HTML_LANG[lang]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e['title']}</title>
<meta name="description" content="{e['metaDesc']}">
<meta name="apple-itunes-app" content="app-id=6822443743">
<meta property="og:type" content="website">
<meta property="og:title" content="{e['title']}">
<meta property="og:description" content="{e['metaDesc']}">
<meta property="og:image" content="{PUBLIC_BASE}/img/{lang}/hero.jpg">
<link rel="icon" href="{root}icon-256.png">
<link rel="apple-touch-icon" href="{root}icon-256.png">
<link rel="stylesheet" href="{root}style.css">
</head>
<body class="landing">
<div class="wrap wide">
  <header><a href="index.html"><img src="{root}icon-256.png" alt="Marigold"></a><div><div class="brand">Marigold</div><div class="sub">{e['tagline']}</div></div></header>
  <nav><a href="index.html">{e['nav_home']}</a><a href="privacy.html">{e['nav_privacy']}</a><a href="terms.html">{e['nav_terms']}</a><a href="support.html">{e['nav_support']}</a></nav>
  <p class="langs">{langs}</p>

  <section class="hero">
    <div class="hero-text">
      <h1>{e['heroTitle']}</h1>
      <p class="lead">{e['heroBody']}</p>
      <a class="store" href="{APP_STORE}">{e['cta']}</a>
      <p class="mute">{e['ctaNote']}</p>
    </div>
    <div class="phone"><img src="{root}img/{lang}/hero.jpg" alt="{e['shotAlt']}" width="600" height="1304"></div>
  </section>

  <h2 class="center">{e['featuresTitle']}</h2>
  <div class="features">
{feats}
  </div>

  <h2 class="center">{e['shotsTitle']}</h2>
  <div class="shots">
{shots}
  </div>

  <div class="grid2">
    <div class="card"><h3>🔒 {e['privacyTitle']}</h3><p>{e['privacyBody']}</p></div>
    <div class="card"><h3>✨ {e['plusTitle']}</h3><p>{e['plusBody']}</p></div>
  </div>

  <p class="card disclaimer">{e['disclaimer']}</p>
  <p class="sister">{e['sister']} <a href="https://babybloom.kids/">{e['sisterLink']} →</a></p>

  <footer>© 2026 Okan Berk Manavoğlu · <a href="privacy.html">{e['nav_privacy']}</a> · <a href="terms.html">{e['nav_terms']}</a> · <a href="support.html">{e['nav_support']}</a> · <a href="mailto:support@babybloom.kids">support@babybloom.kids</a></footer>
</div>
</body>
</html>
"""


def build():
    for lang in LANGS:
        src = COPY / f"{lang}.json"
        if not src.exists():
            print(f"skip {lang}: no copy")
            continue
        if not web_images(lang):
            print(f"warn {lang}: no screenshots yet")
        target = DOCS / ("index.html" if lang == "en" else f"{lang}/index.html")
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(page(lang, json.loads(src.read_text())))
        print(f"ok   {target.relative_to(ROOT)}")


LINK = re.compile(r'(href|src)="([^"]+)"')


def absolutize(file: Path, base: str) -> str:
    rel_dir = file.parent.relative_to(DOCS)

    def fix(m: re.Match) -> str:
        attr, url = m.group(1), m.group(2)
        if re.match(r"^(https?:|mailto:|tel:|#|/|data:)", url):
            return m.group(0)
        frag = ""
        if "#" in url:
            url, frag = url.split("#", 1)
            frag = "#" + frag
        parts = []
        for p in (rel_dir / url).parts:
            if p == "..":
                parts and parts.pop()
            elif p != ".":
                parts.append(p)
        path = "/".join(parts)
        if path.endswith(".html"):
            path = path[: -len(".html")]
            if path == "index":
                path = ""
            elif path.endswith("/index"):
                path = path[: -len("/index")]
        url = base + ("/" + path if path else "")
        return f'{attr}="{url}{frag}"'

    return LINK.sub(fix, file.read_text())


def export(dest: Path, base: str = "/marigold"):
    if dest.exists():
        shutil.rmtree(dest)
    for f in DOCS.rglob("*"):
        if f.is_dir():
            continue
        out = dest / f.relative_to(DOCS)
        out.parent.mkdir(parents=True, exist_ok=True)
        if f.suffix == ".html":
            out.write_text(absolutize(f, base))
        else:
            shutil.copy2(f, out)
    print(f"exported to {dest}")


if __name__ == "__main__":
    build()
    if "--export" in sys.argv:
        export(Path(sys.argv[sys.argv.index("--export") + 1]))
