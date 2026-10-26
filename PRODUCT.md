# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Rekreativni i natjecateljski trkači, biciklisti, triatlonci i planinari u Hrvatskoj koji traže sportsku prehranu s jednostavnim sastavom.
- Ljudi koji vježbaju u teretani i traže whey protein sa sušenim medom.
- Sportski klubovi, teretane, trgovine i ljekarne koji naručuju veće količine (B2B).

## Product Purpose

Predstavljanje i prodaja Honey Bee Power energetskih gelova, izotoničnih napitaka i whey proteina na hrvatskom tržištu (uz prijevode za EN, DE, SL i PL). Stranica objašnjava što je u proizvodu, pomaže sportašu odlučiti koliko mu treba i olakšava narudžbu, i pojedincima i klubovima. Uspjeh: upiti i narudžbe, promet s Googlea na pretrage o sportskoj prehrani.

## Positioning

Gel s tri ili četiri sastojka: višecvjetni med (91–95,5 %), liofilizirano voće, ekstrakt sjemenki guarane i morska sol (malina je bez soli). Bez sukraloze i umjetnih boja. Proizvođač je P.P.H. APIMAR iz Poljske (honeybeepower.pl); med je s poljskih pčelinjaka. Gelovi s dugim popisom sastojaka to ne mogu tvrditi za sebe.

## Operating Context

- Planet Bio (obrt, Našice) je distributer za Hrvatsku; skladište u Krndijskoj 4, dostava 1–3 radna dana nakon dogovora.
- Kupnja je na upit: košarica se šalje WhatsAppom ili e-mailom, a cijena dostave i plaćanje (pouzeće, virman) dogovaraju se osobno.
- Brend je prisutan na utrkama (promo pult na Vukovarskom maratonu) i surađuje s klubovima (RK NEXE, ŽRK Brod, KBK Impact Našice); vrsta suradnje nije potvrđena.
- Deklaracija gela: „Prirodna energetska krema”, 40 g; odobrena tvrdnja o oporavku normalne funkcije mišića; način primjene „1 obrok nakon vježbanja ili fizičkog napora”; upozorenje za osobe osjetljive na kofein, trudnice, dojilje i djecu.
- Službeni digitalni cjenik je zakonska obveza i već postoji (`/cjenik`, `src/lib/cjenik-data.ts`).

## Capabilities and Constraints

- Postojeći kod zadržava: košaricu (zustand), upit preko WhatsAppa i e-maila, B2B obrazac, cjenik s CSV i XML izvozom, privolu za kolačiće i analitiku, next-intl prijevode, objavu na Cloudflareu (OpenNext).
- Model kupnje je otvorena odluka: A (plaćanje online; Stripe je u kodu, ali nije dovršen), B (upit, kao sada) ili C (kombinacija).
- Otvoreno: cijene (cjenik 1,80 € po gelu, kod 2,49 €), smije li se gel preporučivati tijekom napora, količina kofeina, puni sastav izotonika, deklaracija wheyja.
- Postojeće rute ostaju; promijenjene dobivaju preusmjeravanje 301.

## Brand Commitments

- Ime i logotip Honey Bee Power (`public/images/logo.png`, `logo-white.png`) su proizvođačevi i ostaju.
- Društvene mreže: Instagram @planet__bio, TikTok @honeybeepowerhrvatska, Facebook.
- Stari izgled (saće, ambijentalne pozadine, kartice s ikonama) ne obvezuje i zamjenjuje se.

## Evidence on Hand

- Deklaracije na poleđini pakiranja: `public/images/products/*-zadnja.png`; prepisano u `redizajn/podaci-deklaracije.json`.
- Fotografije proizvoda (prednja strana, paketi, vrećice): `public/images/products/`.
- 25 fotografija s događaja (`public/images/events/`), bez datuma i opisa.
- Video proizvoda: `public/videos/product-showcase.mp4` i `.webm`.
- Logotipi partnera: `public/images/partners/` (dopuštenje za korištenje nepotvrđeno).
- PDF prezentacije na četiri jezika: `public/presentations/` (vrijednosti za malinu u njima su pogrešne).
- **Ne postoji i ne smije se izmisliti**: recenzije i ocjene (one u kodu su lažne), citati kupaca ili sportaša, statistike prodaje, nagrade, certifikati, stručni autori (autor „Dr. sc. Ante Horvat” nije potvrđen), količina kofeina, B2B uvjeti, popis događaja s datumima, potvrda suradnje s klubovima.

## Product Principles

1. Iskrenost ispred svega: na stranici su samo stvarni podaci i stvarni dokazi.
2. Deklaracija je glavni argument: tri ili četiri sastojka govore više od pridjeva.
3. Korisno prije prodajnog: kalkulator i vodiči pomažu i onome tko još ne kupuje.
4. Kupac uvijek zna kako narudžba ide, koliko košta i kada stiže.

## Accessibility & Inclusion

WCAG 2.2 AA. Poštivanje postavke `prefers-reduced-motion`. Ispravan `lang` po jeziku, opisni alt tekstovi.
