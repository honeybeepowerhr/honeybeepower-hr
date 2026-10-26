# Honey Bee Power: redizajn stranice

Ovo je projekt stranice **honeybeepowerhr.com**. Radimo potpuni redizajn: novi izgled, novi sadržaj i iskrene tvrdnje, **u ovom postojećem projektu** i na postojećem kodu (košarica, upiti, B2B, cjenik, prijevodi i objava ostaju).

- Zadatak korak po korak: `redizajn/ZADATAK.md`
- Provjereni podaci o proizvodima (s deklaracija): `redizajn/podaci-deklaracije.json`
- Činjenice o proizvodu za Impeccable: `PRODUCT.md`
- Cijeli plan za klijenta: `redizajn/Honey Bee Power - plan nove stranice.docx`

## Projekt

- Next.js 15 (App Router), TypeScript strict, Tailwind CSS 4 + shadcn/ui, zustand (košarica), next-intl (hr bez prefiksa, /en/, /de/, /sl/, /pl/).
- Objava: Cloudflare Workers preko OpenNext (`pnpm deploy`). README spominje Vercel i zastario je.
- Upravitelj paketa: **pnpm**. Testovi: `pnpm test` (vitest).
- Podaci o proizvodima: `src/lib/products-data.ts`; službeni cjenik i pravni podaci obrta: `src/lib/cjenik-data.ts` (`LEGAL_ENTITY`); vodiči: `src/lib/guides-data.ts`; tekstovi sučelja: `src/messages/*.json`; strukturirani podaci: `src/lib/seo/schemas.ts`.

## Sigurnost rada

1. Sve promjene idu na granu **`redizajn`**. Nikad ne radi izravno na `main`.
2. **Nikad ne pokreći `pnpm deploy` ni `pnpm upload`** i ne objavljuj ništa bez mog izričitog odobrenja.
3. Ne čitaj i ne ispisuj `.env.local` ni `.dev.vars`. Ne diraj `inquiries-backup.json` (podaci kupaca) i ne dodaj ga u git.
4. Ne briši datoteke izvan onoga što zadatak traži. Ako nešto uklanjaš, napiši što i zašto u izvještaju.

## Apsolutna pravila za sadržaj

1. **Nikad ne izmišljaj dokaze**: recenzije, ocjene, citate kupaca, brojke prodaje, broj korisnika, nagrade, certifikate, autore ni titule. Postojeće ocjene (`reviewCount`, `averageRating`, `AggregateRating`) su lažne i uklanjaju se. Logotipe klubova koristi samo uz potvrđeno dopuštenje.
2. **Podaci o proizvodima samo iz `redizajn/podaci-deklaracije.json`.** Gdje podatak nedostaje (`null`), prikaži vidljivo `[UPIŠI: …]` i dodaj ga na popis u izvještaju.
3. **Podrijetlo**: proizvođač je P.P.H. APIMAR iz Poljske (honeybeepower.pl); Planet Bio je distributer za Hrvatsku. Nikad ne piši „hrvatski brend”, „domaći med” ni „domaći pčelinjaci”, ni u prijevodima.
4. **Zdravstvene tvrdnje**: samo odobrena tvrdnja s deklaracije (oporavak normalne funkcije mišića, s punim uvjetima) i druge odobrene prema EU Uredbi 1924/2006. Ne piši „sprječava grčeve”, „ne izaziva mučninu”, „idealan glikemijski odgovor”, „bolji od…”. Ne uspoređuj se s konkurencijom i ne napadaj maltodekstrin (izotonik ga vjerojatno sadrži).
5. **Upotreba gela**: deklaracija kaže „uzeti 1 obrok (40 g) nakon vježbanja ili fizičkog napora”. Ne preporučuj upotrebu tijekom utrke dok to proizvođač ne potvrdi.
6. **Kofein**: gelovi sadrže ekstrakt sjemenki guarane. Uz svaki gel prikaži upozorenje s deklaracije. Količina kofeina je `[UPIŠI]`.
7. **Whey** sadrži steviju i mlijeko (alergen). Nikad ne piši da je „zaslađen samo medom”.
8. **Elektroliti**: izotonik ima vrlo malo natrija; ne isticati „nadoknadu elektrolita”.
9. **Kupnja**: do odluke klijenta ostaje sadašnji model (upit preko WhatsAppa ili e-maila) i tako se jasno zove. Nikad ne lažiraj plaćanje.
10. **Cijene**: dok klijent ne odluči, ne prikazuj cijene koje se razlikuju od službenog cjenika; razliku navedi u izvještaju.
11. **Adrese**: postojeće rute ostaju; za svaku promijenjenu postavi trajno preusmjeravanje (301).

## Hrvatski pravopis

- Naslovi u rečeničnom obliku: veliko slovo samo na početku i u vlastitim imenima („Naša priča”, ne „Naša Priča”).
- Dijakritici svugdje: č, ć, đ, š, ž. Fontovi preko `next/font/google` s podskupom `latin-ext`.
- Decimalni zarez i razmak prije jedinice: 31,2 g · 1,80 € · 40 g.
- Hrvatski navodnici „ovako”.
- Prijevodi (en, de, sl, pl) slijede iste činjenice i označavaju se za provjeru.

## Skillovi, ovim redom

1. **impeccable**: kontekst; `PRODUCT.md` je već pripremljen, samo ga potvrdi.
2. **design-taste-frontend**: postupak za redizajn postojećeg projekta (snimi stanje prije, zadrži stack i ono što radi, novi smjer, izrada, provjera u pregledniku). Pojedinosti su u `redizajn/ZADATAK.md`.
3. **gsap-core, gsap-timeline, gsap-scrolltrigger, gsap-react**: animacije uz skrolanje i ulasci sekcija (`gsap` i `@gsap/react` dodaj preko pnpm-a).
4. **transitions-dev**: mikroanimacije (gumbi, česta pitanja, košarica, brojke u kalkulatoru).
5. **impeccable** `audit` i `critique`: revizija kad su stranice gotove.
6. **make-interfaces-feel-better**, **transitions-polish**, **gsap-performance**: završno poliranje.

## Prije nego kažeš da je gotovo

- `pnpm build:next` i `pnpm test` prolaze.
- Inspektor iz design-taste-frontend: 0 FAIL na 1440, 768 i 390 px.
- Lighthouse 90+ za performanse, pristupačnost, najbolje prakse i SEO.
- Pogledao si svaku snimku zaslona nakon zadnje promjene.
- U `redizajn/IZVJESTAJ.md` su popisani svi `[UPIŠI]`, sve uklonjene funkcije i sve tuđe fotografije s izvorom i licencom.
