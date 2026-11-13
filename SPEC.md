# Investorská platforma — geometrický kontrakt rekonstrukce

MODE = REPLICA. Zdrojový snímek 2048 × 1334. Oříznuté prezentační okolí: crop (46, 38, 2018, 1334), rozměr 1972 × 1296. Viditelný obsah končí hned za pěti kartami; originální footer není vidět.

REFERENCE_WIDTH = 1440px; GUTTER = 34px; CONTAINER_MAX = 1368px; GRID = 5 kol, mezera 12px. Poměr zdrojové stránky po cropu = 1296/1972 => při 1440 šířka odpovídá výšce 946px. Doplňkový footer pod viditelnou částí má 160px, celková implementovaná výška 1106px.

TYPOGRAPHY at 1440: serif high-contrast, Georgia, 'Times New Roman', serif; sans Inter, system-ui, Arial, sans-serif. H1 61px/700/1.03/-2px; H2 34px/700/1.12/-1px; body 18px/400/1.45; small 11px; H1:body ratio 3.4.

COLORS from screenshot (approx sampled): text #0a1e29; muted #34465a; bg #f8f7f5; surface #fffefd; border #e5e7e8; accent #157b81; dark teal #033b40; CTA #efcd9f; CTA text #0f1b20.

SECTIONS at 1440:
- header.site-header: 70px, white translucent background; left mark+logo/subtitle; middle 5 nav links; right language and members CTA.
- section#hero: 526px, left reading column ~58% and architecture photograph filling entire hero beneath gradient, dominant building right ~48%; headline left x 55px, y 86px; two exact lines 'Smysluplné investice' / 'do českého developmentu'; intro three lines; CTA 240×52px radius 9px; video link; bottom three trust claims.
- section#branches: 350px, near-white/light beige background, top eyebrow then title; five photographic cards in one row, 255×208px nominal at 1440, gap 12px, radius 9px; card labels and overlay.
- footer.site-footer: 160px (off-image, clearly inferred): sparse legal/demo footer.

Hero project panel: right: 314×227px, white surface rgba, corner 11px, at right 43px, top 203px; subhead, heading, info lines.

Header logo mark: four simple rising geometric rectangles drawn in SVG (icon/logo), wordmark text.

Six separate photographs: hero modern architecture, card 1 construction site, card 2 financial laptop, card 3 residential property, card 4 coin stacks, card 5 private club living room. Images cannot contain text or UI. Crop with cover; subjects anchored per manifest.

Responsive values are derived: 2-column tablet and 1-column mobile; mobile drawer menu, natural section heights under 1000px only.

CSS token lock:
```css
:root{--ink:#0a1e29;--muted:#34465a;--bg:#f8f7f5;--surface:#fffefd;--border:#e5e7e8;--teal:#157b81;--darkteal:#033b40;--cta:#efcd9f;--cta-ink:#0f1b20;--header-h:70px;--hero-h:526px;--branches-h:350px;--footer-h:160px;--gutter:34px;--content-max:1368px;--card-radius:9px;--card-gap:12px;--serif:Georgia,'Times New Roman',serif;--sans:Inter,system-ui,Arial,sans-serif}
```
