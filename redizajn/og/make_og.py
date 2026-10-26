# -*- coding: utf-8 -*-
"""
Slike za dijeljenje (Open Graph), 1200 × 630, za glavne stranice.
Pokretanje: python redizajn/og/make_og.py <put/do/BodoniModa.ttf> <put/do/Jost.ttf>
(fontovi: Google Fonts, licenca OFL). Izlaz: public/images/og/*.jpg
"""
import io, os, struct, sys
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PUB = os.path.join(ROOT, 'public')
OUT = os.path.join(PUB, 'images', 'og')
os.makedirs(OUT, exist_ok=True)
BODONI, JOST = sys.argv[1], sys.argv[2]
GROUND, INK, HONEY = (230, 227, 221), (11, 11, 10), (234, 162, 33)
W, H = 1200, 630


def open_img(path):
    b = open(path, 'rb').read()
    if b[:8] == b'\x89PNG\r\n\x1a\n':
        out, i = [b[:8]], 8
        while i < len(b):
            ln = struct.unpack('>I', b[i:i + 4])[0]
            if b[i + 4:i + 8] != b'eXIf':
                out.append(b[i:i + 12 + ln])
            i += 12 + ln
        b = b''.join(out)
    return ImageOps.exif_transpose(Image.open(io.BytesIO(b)))


def font(path, size, weight):
    f = ImageFont.truetype(path, size)
    try:
        axes = f.get_variation_axes()
        vals = []
        for a in axes:
            n = a['name'].decode() if isinstance(a['name'], bytes) else a['name']
            vals.append(weight if n.lower().startswith('weight') else min(max(size, a['minimum']), a['maximum']))
        f.set_variation_by_axes(vals)
    except Exception:
        pass
    return f


def wrap(draw, text, f, width):
    words, lines, cur = text.replace(' %', ' %').replace(' g ', ' g ').split(' '), [], ''
    for w in words:
        test = f'{cur} {w}'.strip()
        if draw.textlength(test, font=f) <= width:
            cur = test
        else:
            lines.append(cur)
            cur = w
    lines.append(cur)
    return lines


def make(name, title, sub, image, fit='cover', field=None, position=(0.5, 0.5)):
    canvas = Image.new('RGB', (W, H), GROUND)
    right = (560, 0, W, H)
    rw, rh = right[2] - right[0], right[3] - right[1]
    img = open_img(os.path.join(PUB, image.lstrip('/'))).convert('RGBA')
    panel = Image.new('RGB', (rw, rh), field or GROUND)
    if fit == 'cover':
        fitted = ImageOps.fit(img, (rw, rh), Image.LANCZOS, centering=position)
        panel.paste(fitted, (0, 0), fitted)
    else:
        img.thumbnail((int(rw * 0.86), int(rh * 0.86)), Image.LANCZOS)
        panel.paste(img, ((rw - img.width) // 2, (rh - img.height) // 2), img)
    canvas.paste(panel, (right[0], right[1]))
    d = ImageDraw.Draw(canvas)
    size = 92
    f = font(BODONI, size, 900)
    lines = wrap(d, title, f, 470)
    while len(lines) > 3 and size > 56:
        size -= 6
        f = font(BODONI, size, 900)
        lines = wrap(d, title, f, 470)
    y = 70
    for ln in lines:
        d.text((48, y), ln, font=f, fill=INK)
        y += int(size * 0.98)
    fs = font(JOST, 28, 400)
    sy = max(y + 24, 400)
    for ln in wrap(d, sub, fs, 470)[:3]:
        d.text((48, sy), ln, font=fs, fill=INK)
        sy += 38
    d.rectangle((48, H - 70, 48 + 160, H - 64), fill=HONEY)
    fb = font(JOST, 22, 500)
    d.text((48, H - 52), 'honeybeepowerhr.com', font=fb, fill=INK)
    canvas.save(os.path.join(OUT, f'{name}.jpg'), quality=86, optimize=True, progressive=True)
    print('og', name)


make('naslovnica', 'Gel od meda.', 'Tri ili četiri sastojka. Proizvodi APIMAR iz Poljske, šalje Planet Bio iz Našica.', '/images/found/sace.jpg')
make('proizvodi', 'Gel, izotonik i whey', 'Cijene iz službenog cjenika, narudžba na upit.', '/images/hero/product-showcase-poster.jpg')
make('gel-naranca', 'Energy gel naranča', '31,2 g ugljikohidrata u 40 g. Med 95,5 %, naranča, guarana, morska sol.', '/images/products/gelnaranca-prednja.png', fit='contain', field=(240, 138, 28))
make('gel-limun', 'Energy gel limun', '29 g ugljikohidrata u 40 g. Med 94,5 %, limun, guarana, morska sol.', '/images/products/gellimun-prednja.png', fit='contain', field=(242, 210, 27))
make('gel-malina', 'Energy gel malina', '32,8 g ugljikohidrata u 40 g. Med 91 %, malina, guarana.', '/images/products/gelmalina-prednja.png', fit='contain', field=(195, 32, 63))
make('izotonik', 'Izotonični napitak', '13,5 g ugljikohidrata u porciji od 15 g. Limun i naranča.', '/images/products/isolimun-prednja.png', fit='contain', field=(242, 210, 27))
make('whey', 'Whey protein', 'Oko 22 g proteina u 33 g. Sušeni med i stevija. Sadrži mlijeko.', '/images/products/proteincokolada700g.png', fit='contain', field=(255, 255, 255))
make('oporavak', 'Oporavi se.', 'Koliko ugljikohidrata trebaš nakon napora: 4 g po kilogramu u prva 4 sata.', '/images/events-web/event-12.jpg', position=(0.5, 0.3))
make('sport', 'Sport', 'Trčanje, biciklizam, triatlon, planinarenje, teretana i ekipni sportovi.', '/images/events-web/event-24.jpg')
make('vodici', 'Vodiči', 'Sportska prehrana s izvorima: gel, tekućina, protein.', '/images/found/med-zlica.jpg')
make('prica', 'Od Baranówa do Našica', 'Poljski proizvođač APIMAR, distributer za Hrvatsku Planet Bio.', '/images/found/na-pcelinjaku-1905.jpg')
make('b2b', 'Za klubove i trgovine', 'Upit s proizvodima i količinama, uvjete dogovaramo izravno.', '/images/events-web/event-4.jpg')
make('dogadaji', 'Na stazi', 'Promo pult na Vukovarskom maratonu, treninzi i utakmice.', '/images/events-web/event-11.jpg')
make('kontakt', '+385 97 709 7962', 'info@planetbio.hr · Krndijska 4, Našice', '/images/events-web/event-16.jpg')
