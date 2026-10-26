# -*- coding: utf-8 -*-
"""Sitni dodaci: traka fotografija u podnožju i napomena uz broj proizvoda."""

FOOTER = {
    'hr': dict(photoStrip='Fotografije s događaja: pogledaj sve'),
    'en': dict(photoStrip='Photos from events: see all'),
    'de': dict(photoStrip='Fotos von Veranstaltungen: alle ansehen'),
    'sl': dict(photoStrip='Fotografije z dogodkov: oglej si vse'),
    'pl': dict(photoStrip='Zdjęcia z wydarzeń: zobacz wszystkie'),
}

PP = {
    'hr': dict(countNote='cijene iz službenog cjenika, kupnja na upit'),
    'en': dict(countNote='prices from the official price list, buying by enquiry'),
    'de': dict(countNote='Preise laut offizieller Preisliste, Kauf per Anfrage'),
    'sl': dict(countNote='cene iz uradnega cenika, nakup s povpraševanjem'),
    'pl': dict(countNote='ceny z oficjalnego cennika, zakup przez zapytanie'),
}

SECTIONS = {'footer': FOOTER, 'productPage': PP}
