#!/usr/bin/env python3
"""Compose App Store screenshots (6.9" — 1320×2868) from raw simulator captures.

    python3 design/screenshots/make_shots.py            # all languages
    python3 design/screenshots/make_shots.py en tr      # some

Raw captures live in design/screenshots/raw/<lang>/<NN-name>.png (taken with
`xcrun simctl io booted screenshot` on an iPhone 17 Pro Max after seeding the
demo data via marigold://demo?lang=<lang>&week=24). Output goes to
design/screenshots/out/<lang>/<NN-name>.png.
"""
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
FONTS = ROOT / "node_modules" / "@expo-google-fonts"
SERIF = FONTS / "source-serif-4" / "SourceSerif4_600SemiBold.ttf"
SANS = FONTS / "manrope" / "Manrope_500Medium.ttf"

W, H = 1320, 2868
INK = (42, 37, 34)
MUTE = (118, 103, 94)
ACCENT = (192, 105, 75)

# Caption per screen: (headline, subline). Keep headlines ≤ 2 lines.
CAPTIONS = {
    "en": {
        "01-today": ("Your pregnancy,\nday by day", "Your week, baby’s size and what’s next"),
        "02-weeks": ("Watch your\nbaby grow", "Week-by-week development, explained simply"),
        "03-check": ("“Can I…?”\nanswered", "Foods, medicines and activities — with sources"),
        "04-detail": ("Clear answers,\nreal sources", "Every answer links to NHS, ACOG, WHO and more"),
        "05-tools": ("Gentle tools\nfor every day", "Kick counter, contractions, water, vitamins"),
        "06-journal": ("Your private\nbump journal", "No account. Your data stays on your phone."),
    },
    "tr": {
        "01-today": ("Hamileliğin,\ngün gün", "Haftan, bebeğinin boyu ve sırada ne var"),
        "02-weeks": ("Bebeğinin\nbüyümesini izle", "Hafta hafta gelişim, sade bir dille"),
        "03-check": ("“Bu olur mu?”\nsorusuna yanıt", "Yiyecek, ilaç ve aktiviteler — kaynaklarıyla"),
        "04-detail": ("Net yanıtlar,\ngerçek kaynaklar", "Her yanıt NHS, ACOG, WHO ve dahasına bağlanır"),
        "05-tools": ("Her gün için\nnazik araçlar", "Tekme sayacı, kasılmalar, su, vitaminler"),
        "06-journal": ("Sana özel\nhamilelik günlüğü", "Hesap yok. Verilerin telefonunda kalır."),
    },
    "es": {
        "01-today": ("Tu embarazo,\ndía a día", "Tu semana, el tamaño del bebé y lo que viene"),
        "02-weeks": ("Mira cómo\ncrece tu bebé", "Su desarrollo semana a semana, explicado fácil"),
        "03-check": ("¿Puedo…?\nRespondido", "Alimentos, medicinas y actividades, con fuentes"),
        "04-detail": ("Respuestas claras,\nfuentes reales", "Cada respuesta enlaza a la OMS, NHS, ACOG…"),
        "05-tools": ("Herramientas\npara cada día", "Patadas, contracciones, agua y vitaminas"),
        "06-journal": ("Tu diario de\nembarazo privado", "Sin cuenta. Tus datos se quedan en tu móvil."),
    },
    "de": {
        "01-today": ("Deine Schwanger-\nschaft, Tag für Tag", "Deine Woche, Babys Größe und was als Nächstes kommt"),
        "02-weeks": ("Sieh dein Baby\nwachsen", "Die Entwicklung Woche für Woche, einfach erklärt"),
        "03-check": ("„Darf ich…?“\nbeantwortet", "Essen, Medikamente und Aktivitäten – mit Quellen"),
        "04-detail": ("Klare Antworten,\necht belegt", "Jede Antwort verlinkt NHS, ACOG, WHO und mehr"),
        "05-tools": ("Sanfte Helfer\nfür jeden Tag", "Tritte, Wehen, Wasser und Vitamine"),
        "06-journal": ("Dein privates\nBauchtagebuch", "Kein Konto. Deine Daten bleiben auf dem Handy."),
    },
    "fr": {
        "01-today": ("Ta grossesse,\njour après jour", "Ta semaine, la taille de bébé et la suite"),
        "02-weeks": ("Regarde ton\nbébé grandir", "Son développement semaine après semaine"),
        "03-check": ("« Est-ce que\nje peux… ? »", "Aliments, médicaments, activités — avec sources"),
        "04-detail": ("Des réponses claires\net sourcées", "Chaque réponse renvoie à l’OMS, NHS, ACOG…"),
        "05-tools": ("Des outils doux\npour chaque jour", "Mouvements, contractions, eau, vitamines"),
        "06-journal": ("Ton journal de\ngrossesse privé", "Sans compte. Tes données restent sur ton téléphone."),
    },
    "pt": {
        "01-today": ("Sua gravidez,\ndia a dia", "Sua semana, o tamanho do bebê e o que vem aí"),
        "02-weeks": ("Veja seu bebê\ncrescer", "O desenvolvimento semana a semana, explicado"),
        "03-check": ("“Posso…?”\nrespondido", "Alimentos, remédios e atividades — com fontes"),
        "04-detail": ("Respostas claras,\nfontes reais", "Cada resposta tem links da OMS, NHS, ACOG…"),
        "05-tools": ("Ferramentas para\ntodos os dias", "Chutes, contrações, água e vitaminas"),
        "06-journal": ("Seu diário de\ngravidez privado", "Sem conta. Seus dados ficam no seu celular."),
    },
}


def background() -> Image.Image:
    img = Image.new("RGB", (W, H), (251, 246, 240))
    # Soft warm blobs (marigold, blush, lavender) blurred together.
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.ellipse((-380, -300, 900, 900), fill=(248, 214, 170, 170))
    d.ellipse((620, 120, 1700, 1180), fill=(244, 205, 196, 150))
    d.ellipse((-300, 1500, 800, 2700), fill=(232, 222, 242, 150))
    d.ellipse((700, 2000, 1700, 3100), fill=(246, 222, 206, 140))
    layer = layer.filter(ImageFilter.GaussianBlur(160))
    img.paste(layer, (0, 0), layer)
    return img


def rounded(im: Image.Image, r: int) -> Image.Image:
    mask = Image.new("L", im.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, im.size[0] - 1, im.size[1] - 1), r, fill=255)
    out = im.convert("RGBA")
    out.putalpha(mask)
    return out


def fit_font(path: Path, text: str, max_w: int, size: int, min_size: int) -> ImageFont.FreeTypeFont:
    while size > min_size:
        f = ImageFont.truetype(str(path), size)
        widest = max(f.getbbox(line)[2] for line in text.split("\n"))
        if widest <= max_w:
            return f
        size -= 4
    return ImageFont.truetype(str(path), min_size)


def compose(raw: Path, head: str, sub: str, out: Path):
    img = background()
    d = ImageDraw.Draw(img)

    hf = fit_font(SERIF, head, W - 160, 124, 84)
    y = 170
    for line in head.split("\n"):
        w = hf.getbbox(line)[2]
        d.text(((W - w) / 2, y), line, font=hf, fill=INK)
        y += int(hf.size * 1.12)
    sf = fit_font(SANS, sub, W - 180, 50, 36)
    w = sf.getbbox(sub)[2]
    d.text(((W - w) / 2, y + 26), sub, font=sf, fill=MUTE)

    # Device: the raw capture with rounded corners, a slim dark bezel and shadow.
    shot = Image.open(raw).convert("RGB")
    sw = 1000
    sh = round(shot.size[1] * sw / shot.size[0])
    shot = shot.resize((sw, sh), Image.LANCZOS)
    bezel = 22
    top = 720
    left = (W - sw) // 2

    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle(
        (left - bezel + 10, top - bezel + 40, left + sw + bezel - 10, top + sh + bezel + 40), 150, fill=(91, 70, 54, 90)
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(50))
    img.paste(shadow, (0, 0), shadow)

    frame = Image.new("RGBA", (sw + bezel * 2, sh + bezel * 2), (0, 0, 0, 0))
    ImageDraw.Draw(frame).rounded_rectangle((0, 0, frame.size[0] - 1, frame.size[1] - 1), 150, fill=(30, 27, 25, 255))
    img.paste(frame, (left - bezel, top - bezel), frame)
    screen = rounded(shot, 128)
    img.paste(screen, (left, top), screen)

    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, "PNG", optimize=True)


def main(langs: list[str]):
    for lang in langs:
        for key, (head, sub) in CAPTIONS[lang].items():
            raw = HERE / "raw" / lang / f"{key}.png"
            if not raw.exists():
                print(f"skip {lang}/{key} (no raw capture)")
                continue
            compose(raw, head, sub, HERE / "out" / lang / f"{key}.png")
            print(f"ok   {lang}/{key}")


if __name__ == "__main__":
    main(sys.argv[1:] or list(CAPTIONS))
