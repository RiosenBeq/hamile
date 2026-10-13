"""Generates the Marigold app icon as SVG (1024x1024).

A rounded marigold bloom holding a small terracotta heart in its cream
centre, on a coral-to-terracotta gradient. Run:
    python3 design/icon/make_icon.py design/icon/icon.svg
    rsvg-convert -w 1024 -h 1024 design/icon/icon.svg -o assets/icon.png
"""
import math, sys

S = 1024
CX, CY = 512, 512

def blob_petal(cx, cy, ang, dist, r_along, r_across):
    """An ellipse-ish petal centred `dist` away from the bloom centre."""
    a = math.radians(ang)
    px, py = cx + math.cos(a) * dist, cy + math.sin(a) * dist
    return f'<ellipse cx="{px:.1f}" cy="{py:.1f}" rx="{r_along:.1f}" ry="{r_across:.1f}" transform="rotate({ang:.1f} {px:.1f} {py:.1f})"'

def ring(n, dist, r_along, r_across, rot, fill, extra=''):
    return '\n'.join(f'{blob_petal(CX, CY, rot + i * 360 / n, dist, r_along, r_across)} fill="{fill}" {extra}/>' for i in range(n))

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{S}" height="{S}" viewBox="0 0 {S} {S}">
  <defs>
    <linearGradient id="bg" x1="0.1" y1="0" x2="0.9" y2="1">
      <stop offset="0" stop-color="#F3A27F"/>
      <stop offset="0.55" stop-color="#DE7A59"/>
      <stop offset="1" stop-color="#BE573C"/>
    </linearGradient>
    <radialGradient id="sheen" cx="0.3" cy="0.18" r="0.75">
      <stop offset="0" stop-color="#FFE9D9" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#FFE9D9" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="outer" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FFF9F1"/>
      <stop offset="1" stop-color="#FCE9D6"/>
    </linearGradient>
    <linearGradient id="mid" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="#FFD98E"/>
      <stop offset="1" stop-color="#F3AE4B"/>
    </linearGradient>
    <radialGradient id="heart" cx="0.45" cy="0.4" r="0.6">
      <stop offset="0" stop-color="#FFFBF5"/>
      <stop offset="1" stop-color="#FCEBDB"/>
    </radialGradient>
    <linearGradient id="seed" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#D9714E"/>
      <stop offset="1" stop-color="#B4502F"/>
    </linearGradient>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="22"/>
    </filter>
    <filter id="petalShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#9E4429" flood-opacity="0.18"/>
    </filter>
  </defs>
  <rect width="{S}" height="{S}" fill="url(#bg)"/>
  <rect width="{S}" height="{S}" fill="url(#sheen)"/>
  <g transform="translate({CX} {CY}) scale(1.12) translate({-CX} {-CY})">
  <circle cx="{CX}" cy="{CY + 40}" r="300" fill="#8E3A22" opacity="0.28" filter="url(#shadow)"/>
  <g filter="url(#petalShadow)">
    {ring(10, 196, 128, 92, -90, 'url(#outer)')}
  </g>
  <g filter="url(#petalShadow)">
    {ring(10, 132, 98, 70, -90 + 18, 'url(#mid)')}
  </g>
  <circle cx="{CX}" cy="{CY}" r="112" fill="url(#heart)"/>
  <!-- a small, soft heart in the warm centre -->
  <g transform="translate({CX} {CY + 6}) scale(1.05)">
    <path d="M 0,40
             C -10,32 -58,2 -58,-24
             C -58,-46 -40,-60 -22,-60
             C -10,-60 -2,-52 0,-44
             C 2,-52 10,-60 22,-60
             C 40,-60 58,-46 58,-24
             C 58,2 10,32 0,40 Z" fill="url(#seed)"/>
    <ellipse cx="-24" cy="-36" rx="12" ry="8" fill="#FFE4D3" opacity="0.45" transform="rotate(-30 -24 -36)"/>
  </g>
  </g>
</svg>'''

out = sys.argv[1] if len(sys.argv) > 1 else 'design/icon/icon.svg'
if '--bloom-only' in sys.argv:
    # Transparent background, no shadow — for the splash screen / adaptive icon.
    svg = svg.replace('<rect width="1024" height="1024" fill="url(#bg)"/>', '')
    svg = svg.replace('<rect width="1024" height="1024" fill="url(#sheen)"/>', '')
    svg = svg.replace('<circle cx="512" cy="552" r="300" fill="#8E3A22" opacity="0.28" filter="url(#shadow)"/>',
                      '<circle cx="512" cy="552" r="300" fill="#C0694B" opacity="0.16" filter="url(#shadow)"/>')
open(out, 'w').write(svg)
print('wrote', out)
